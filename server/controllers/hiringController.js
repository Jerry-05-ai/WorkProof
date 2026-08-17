// server/controllers/hiringController.js
//
// ADDITIVE company-side hiring workflow. Lets a verified company discover an
// ex-employee whose profile is currently public and hire them.
//
// Rewritten to use Firebase Data Connect models instead of raw MySQL.

import { getDC } from '../config/dataconnect.js';
import {
  createEmployee as gqlCreateEmployee,
  createCompanyMembership,
  setUserCompanyAndEmployee,
  createPrivacySettings,
  updatePublicProfileVisibility,
  updatePrivacySettings,
  getEmployeeById,
  getEmployeeByEmail,
  getUserById,
  getUserByEmail,
  listPublicProfiles,
} from '@dataconnect/admin-generated';
import { Employee } from '../models/Employee.js';
import { PublicProfile } from '../models/PublicProfile.js';
import { PrivacySettings } from '../models/PrivacySettings.js';
import { EmploymentLink } from '../models/EmploymentLink.js';
import { ApiError, requireFields, normalize, normalizeEmail, toBool } from '../utils/helpers.js';
import { sessionCompanyId } from '../middleware/auth.js';
import { audit, notify } from '../utils/events.js';

// GET /api/company/candidates?search=&skills=&location=&job_title=
export async function searchCandidates(req, res) {
  sessionCompanyId(req);

  const search = String(req.query.search ?? '').trim().toLowerCase();
  const wantedSkills = String(req.query.skills ?? '')
    .split(',')
    .map((s) => s.trim().toLowerCase())
    .filter(Boolean);
  const locationFilter = String(req.query.location ?? '').trim().toLowerCase();
  const titleFilter = String(req.query.job_title ?? '').trim().toLowerCase();

  const { data } = await listPublicProfiles(getDC());
  const rows = data.publicProfiles || [];

  const results = [];
  for (const pp of rows) {
    const emp = pp.employee;
    if (!emp) continue;
    const employeeId = emp.id;
    const privacy = await PrivacySettings.findByEmployee(employeeId);
    if (!privacy || privacy.profile_visibility !== 'public') continue;
    if (!toBool(privacy.is_employee_controlled)) continue;

    const view = await PublicProfile.buildPublicView(emp, privacy);

    if (locationFilter && !String(emp.location ?? '').toLowerCase().includes(locationFilter)) continue;
    if (titleFilter && !String(view.role ?? '').toLowerCase().includes(titleFilter)) continue;

    const publicSkills = Array.isArray(view.skills) ? view.skills : [];
    if (wantedSkills.length) {
      const names = publicSkills.map((s) => String(s.name).toLowerCase());
      const anyMatch = wantedSkills.some((ws) => names.includes(ws));
      if (!anyMatch) continue;
    }

    if (search) {
      const haystack = [view.name, view.role, emp.location].join(' ').toLowerCase();
      if (!haystack.includes(search)) continue;
    }

    results.push({
      employee_id: employeeId,
      slug: pp.slug,
      name: view.name ?? null,
      role: view.role ?? null,
      location: emp.location ?? null,
      skills: publicSkills,
      view_count: Number(pp.viewCount ?? 0),
    });
  }

  res.json({ success: true, candidates: results, count: results.length });
}

// GET /api/company/candidates/:employeeId
export async function candidateProfile(req, res) {
  sessionCompanyId(req);
  const employeeId = req.params.employeeId;
  if (!employeeId) throw new ApiError(400, 'Candidate id required');

  const { data } = await getEmployeeById(getDC(), { id: employeeId });
  const emp = data.employee;
  if (!emp) throw new ApiError(404, 'Candidate not found');

  const privacy = await PrivacySettings.findByEmployee(employeeId);
  if (!privacy || privacy.profile_visibility !== 'public') {
    throw new ApiError(404, 'This candidate is not publicly discoverable');
  }

  const view = await PublicProfile.buildPublicView(emp, privacy);
  const timeline = await EmploymentLink.listForPerson(emp.email);

  res.json({
    success: true,
    candidate: {
      employee_id: employeeId,
      email: emp.email,
      view,
      career_timeline: timeline.map(EmploymentLink.publicShape),
    },
  });
}

// POST /api/company/candidates/:employeeId/hire
export async function hireCandidate(req, res) {
  const userId = req.auth.userId;
  const hiringCompanyId = sessionCompanyId(req);
  const sourceEmployeeId = req.params.employeeId;
  if (!sourceEmployeeId) throw new ApiError(400, 'Candidate id required');

  const data = req.body || {};
  requireFields(data, ['job_title', 'department']);
  const jobTitle = normalize(data.job_title);
  const department = normalize(data.department);
  const startDate = data.start_date && data.start_date !== '' ? data.start_date : new Date().toISOString().slice(0, 10);

  // The candidate record being hired-from.
  const { data: sourceData } = await getEmployeeById(getDC(), { id: sourceEmployeeId });
  const source = sourceData.employee;
  if (!source) throw new ApiError(404, 'Candidate not found');

  const privacy = await PrivacySettings.findByEmployee(sourceEmployeeId);
  if (!privacy || privacy.profile_visibility !== 'public' || !toBool(privacy.is_employee_controlled)) {
    throw new ApiError(409, 'This candidate is not available to hire (profile is not public / employee-controlled)');
  }

  // A candidate who is currently active somewhere cannot be hired away here.
  const { data: activeData } = await getEmployeeByEmail(getDC(), { email: normalizeEmail(source.email) });
  const active = activeData.employees?.[0] ?? null;
  if (active && active.employmentStatus === 'active') {
    throw new ApiError(409, 'This person is already actively employed');
  }

  const canonicalEmail = normalizeEmail(source.email);
  const perCompanyEmail = await uniqueEmployeeEmail(canonicalEmail, hiringCompanyId);

  // Find the login user
  let loginUser = null;
  if (source.userId) {
    const { data: userData } = await getUserById(getDC(), { id: source.userId });
    loginUser = userData.user ?? null;
  } else {
    const { data: userData } = await getUserByEmail(getDC(), { email: canonicalEmail });
    loginUser = userData.users?.[0] ?? null;
  }

  // 1. New active employment record at the hiring company.
  const { data: empResult } = await gqlCreateEmployee(getDC(), {
    userId: loginUser ? loginUser.id : null,
    companyId: hiringCompanyId,
    firstName: source.firstName,
    lastName: source.lastName,
    email: perCompanyEmail,
    phone: source.phone ?? null,
    jobTitle,
    department,
    employmentType: 'full_time',
    employmentStatus: 'active',
    startDate,
    endDate: null,
    managerId: null,
    profilePhoto: null,
    location: source.location ?? null,
  });
  const newEmployeeId = empResult.employee_insert.id;

  // 2. Re-point the single login account to the new active company/record.
  if (loginUser) {
    await setUserCompanyAndEmployee(getDC(), {
      id: loginUser.id,
      companyId: hiringCompanyId,
      employeeRefId: newEmployeeId,
    });
    await createCompanyMembership(getDC(), {
      userId: loginUser.id,
      companyId: hiringCompanyId,
      role: 'employee',
      invitedBy: userId,
    });
  }

  // 3. Fresh privacy row for the new record: PRIVATE, company-controlled again.
  await createPrivacySettings(getDC(), {
    employeeId: newEmployeeId,
    companyId: hiringCompanyId,
    profileVisibility: 'private',
  });

  // 4. Auto-flip the OLD public profile to private and pull it from search.
  const oldProfile = await PublicProfile.findByEmployee(sourceEmployeeId);
  if (oldProfile) {
    await updatePublicProfileVisibility(getDC(), { profileId: oldProfile.id, isPublic: false });
  }
  const oldPrivacy = await PrivacySettings.findByEmployee(sourceEmployeeId);
  if (oldPrivacy?.privacy_id) {
    await updatePrivacySettings(getDC(), {
      privacyId: oldPrivacy.privacy_id,
      profileVisibility: 'private',
      isEmployeeControlled: false,
    });
  }

  // 5. Career-history bookkeeping (append-only + idempotent).
  await EmploymentLink.ensureLinkForEmployee(source, { source: 'backfill' });
  if (loginUser) await EmploymentLink.attachUserToPerson(canonicalEmail, loginUser.id);
  await EmploymentLink.create({
    personEmail: canonicalEmail,
    userId: loginUser ? loginUser.id : null,
    employeeId: newEmployeeId,
    companyId: hiringCompanyId,
    jobTitle,
    department,
    startedAt: startDate,
    source: 'rehire',
  });

  if (loginUser) {
    await notify(
      loginUser.id,
      'hired',
      'You have a new verified employer',
      'A company has hired you. Your profile is private again and visible only to you and your new employer.',
      '/employee/dashboard'
    );
  }
  await audit(userId, req.auth.role, 'hire_candidate', 'employee', newEmployeeId, {
    source_employee_id: sourceEmployeeId,
    hiring_company_id: hiringCompanyId,
  }, req);

  const created = await Employee.findForCompany(newEmployeeId, hiringCompanyId);
  res.status(201).json({
    success: true,
    message: 'Candidate hired. Their profile is now private and prior verified history is preserved.',
    employee: Employee.publicShape(created),
  });
}

// Build a per-company-unique email so the second employees row never collides
// with the globally-unique employees.email constraint.
async function uniqueEmployeeEmail(canonicalEmail, companyId) {
  const [local, domain] = canonicalEmail.split('@');
  const base = domain ? `${local}+wp${companyId}@${domain}` : `${canonicalEmail}+wp${companyId}`;
  let candidate = base;
  let n = 1;
  // eslint-disable-next-line no-constant-condition
  while (true) {
    const { data } = await getEmployeeByEmail(getDC(), { email: candidate });
    if (!data.employees?.length) return candidate;
    n += 1;
    candidate = domain ? `${local}+wp${companyId}-${n}@${domain}` : `${canonicalEmail}+wp${companyId}-${n}`;
  }
}