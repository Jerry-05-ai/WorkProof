// server/controllers/hiringController.js
//
// ADDITIVE company-side hiring workflow. Lets a verified company discover an
// ex-employee whose profile is currently public and hire them, which:
//   1. creates a fresh employees row scoped to the hiring company,
//   2. re-points the person's single login account to the new active record,
//   3. flips their profile back to PRIVATE and removes it from public search,
//   4. records the new span in employment_links,
// while every verified skill / project / achievement / employment record from
// prior employers stays exactly where it was — permanent and read-only.
//
// None of this touches existing tables' structure, existing endpoints, existing
// controllers, or the frontend. It only reads existing data and writes new rows
// (plus the same privacy/visibility fields the existing end-employment and
// publish flows already write).

import pool, { query, queryOne } from '../config/database.js';
import { Employee } from '../models/Employee.js';
import { PublicProfile } from '../models/PublicProfile.js';
import { PrivacySettings } from '../models/PrivacySettings.js';
import { EmploymentLink } from '../models/EmploymentLink.js';
import { ApiError, requireFields, normalize, normalizeEmail, toBool } from '../utils/helpers.js';
import { sessionCompanyId } from '../middleware/auth.js';
import { audit, notify } from '../utils/events.js';

// GET /api/company/candidates?search=&skills=&location=&job_title=
// Company-facing search over PUBLIC, employee-controlled profiles only. An
// active employee (private profile) can never appear here — mirroring the
// recruiter talent search's public-only guarantee.
export async function searchCandidates(req, res) {
  sessionCompanyId(req); // ensure the caller belongs to a company

  const search = String(req.query.search ?? '').trim().toLowerCase();
  const wantedSkills = String(req.query.skills ?? '')
    .split(',')
    .map((s) => s.trim().toLowerCase())
    .filter(Boolean);
  const locationFilter = String(req.query.location ?? '').trim().toLowerCase();
  const titleFilter = String(req.query.job_title ?? '').trim().toLowerCase();

  const rows = await query(
    `SELECT e.*, pp.slug, pp.view_count
     FROM public_profiles pp
     JOIN employees e ON e.id = pp.employee_id
     WHERE pp.is_public = 1 AND e.deleted_at IS NULL`
  );

  const results = [];
  for (const emp of rows) {
    const employeeId = Number(emp.id);
    const privacy = await PrivacySettings.findByEmployee(employeeId);
    // Only genuinely public + employee-controlled profiles are hireable here.
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
      slug: emp.slug,
      name: view.name ?? null,
      role: view.role ?? null,
      location: emp.location ?? null,
      skills: publicSkills,
      view_count: Number(emp.view_count ?? 0),
    });
  }

  res.json({ success: true, candidates: results, count: results.length });
}

// GET /api/company/candidates/:employeeId — full public view for a hiring decision.
export async function candidateProfile(req, res) {
  sessionCompanyId(req);
  const employeeId = Number(req.params.employeeId);
  if (!employeeId) throw new ApiError(400, 'Candidate id required');

  const emp = await queryOne('SELECT * FROM employees WHERE id = ? AND deleted_at IS NULL LIMIT 1', [employeeId]);
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
// Body: { job_title, department, start_date? }
// Hires a public ex-employee into the calling company.
export async function hireCandidate(req, res) {
  const userId = req.auth.userId;
  const hiringCompanyId = sessionCompanyId(req);
  const sourceEmployeeId = Number(req.params.employeeId);
  if (!sourceEmployeeId) throw new ApiError(400, 'Candidate id required');

  const data = req.body || {};
  requireFields(data, ['job_title', 'department']);
  const jobTitle = normalize(data.job_title);
  const department = normalize(data.department);
  const startDate = data.start_date && data.start_date !== '' ? data.start_date : new Date().toISOString().slice(0, 10);

  // The candidate record being hired-from.
  const source = await queryOne('SELECT * FROM employees WHERE id = ? AND deleted_at IS NULL LIMIT 1', [sourceEmployeeId]);
  if (!source) throw new ApiError(404, 'Candidate not found');

  const privacy = await PrivacySettings.findByEmployee(sourceEmployeeId);
  if (!privacy || privacy.profile_visibility !== 'public' || !toBool(privacy.is_employee_controlled)) {
    throw new ApiError(409, 'This candidate is not available to hire (profile is not public / employee-controlled)');
  }

  // A candidate who is currently active somewhere cannot be hired away here.
  const active = await queryOne(
    `SELECT 1 AS x FROM employees WHERE email = ? AND employment_status = 'active' AND deleted_at IS NULL LIMIT 1`,
    [normalizeEmail(source.email)]
  );
  if (active) throw new ApiError(409, 'This person is already actively employed');

  // Already at THIS company (a prior stint)? Re-hire onto a new row rather than
  // colliding with the globally-unique employees.email. We keep the login email
  // canonical on the users row and give the per-company employees row a unique,
  // namespaced address so historical rows are never overwritten.
  const canonicalEmail = normalizeEmail(source.email);
  const perCompanyEmail = await uniqueEmployeeEmail(canonicalEmail, hiringCompanyId);

  const loginUser = source.user_id
    ? await queryOne('SELECT * FROM users WHERE id = ? LIMIT 1', [Number(source.user_id)])
    : await queryOne('SELECT * FROM users WHERE email = ? AND deleted_at IS NULL LIMIT 1', [canonicalEmail]);

  const conn = await pool.getConnection();
  let newEmployeeId;
  try {
    await conn.beginTransaction();

    // 1. New active employment record at the hiring company.
    const [empRes] = await conn.execute(
      `INSERT INTO employees
        (user_id, company_id, first_name, last_name, email, phone, job_title, department,
         employment_type, employment_status, start_date, location)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, 'full_time', 'active', ?, ?)`,
      [
        loginUser ? Number(loginUser.id) : null,
        hiringCompanyId,
        source.first_name,
        source.last_name,
        perCompanyEmail,
        source.phone ?? null,
        jobTitle,
        department,
        startDate,
        source.location ?? null,
      ]
    );
    newEmployeeId = empRes.insertId;

    // 2. Re-point the single login account to the new active company/record.
    if (loginUser) {
      await conn.execute('UPDATE users SET company_id = ?, employee_id = ? WHERE id = ?', [
        hiringCompanyId,
        newEmployeeId,
        Number(loginUser.id),
      ]);
      await conn.execute(
        `INSERT INTO company_memberships (user_id, company_id, role, invited_by, is_active)
         VALUES (?, ?, 'employee', ?, 1)
         ON DUPLICATE KEY UPDATE is_active = 1`,
        [Number(loginUser.id), hiringCompanyId, userId]
      );
    }

    // 3. Fresh privacy row for the new record: PRIVATE, company-controlled again.
    await conn.execute(
      `INSERT INTO privacy_settings (employee_id, company_id, profile_visibility, is_employee_controlled)
       VALUES (?, ?, 'private', 0)`,
      [newEmployeeId, hiringCompanyId]
    );

    // 4. Auto-flip the OLD public profile to private and pull it from search.
    //    (Ownership goes back to the company while employed.)
    await conn.execute(
      `UPDATE privacy_settings
         SET profile_visibility = 'private', is_employee_controlled = 0
       WHERE employee_id = ?`,
      [sourceEmployeeId]
    );
    await conn.execute('UPDATE public_profiles SET is_public = 0 WHERE employee_id = ?', [sourceEmployeeId]);

    await conn.commit();
  } catch (e) {
    await conn.rollback();
    conn.release();
    throw new ApiError(500, 'Failed to complete hire');
  }
  conn.release();

  // 5. Career-history bookkeeping (outside the tx; append-only + idempotent).
  //    Backfill the prior record's link if missing, then record the new span.
  await EmploymentLink.ensureLinkForEmployee(source, { source: 'backfill' });
  if (loginUser) await EmploymentLink.attachUserToPerson(canonicalEmail, Number(loginUser.id));
  await EmploymentLink.create({
    personEmail: canonicalEmail,
    userId: loginUser ? Number(loginUser.id) : null,
    employeeId: newEmployeeId,
    companyId: hiringCompanyId,
    jobTitle,
    department,
    startedAt: startDate,
    source: 'rehire',
  });

  if (loginUser) {
    await notify(
      Number(loginUser.id),
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
// with the globally-unique employees.email constraint. The login email on the
// users table is unchanged; this only affects the internal employees row.
async function uniqueEmployeeEmail(canonicalEmail, companyId) {
  const [local, domain] = canonicalEmail.split('@');
  const base = domain ? `${local}+wp${companyId}@${domain}` : `${canonicalEmail}+wp${companyId}`;
  let candidate = base;
  let n = 1;
  // Extremely unlikely to loop, but stay safe against repeated re-hires.
  // eslint-disable-next-line no-await-in-loop
  while (await queryOne('SELECT 1 AS x FROM employees WHERE email = ? LIMIT 1', [candidate])) {
    candidate = domain ? `${local}+wp${companyId}-${n}@${domain}` : `${canonicalEmail}+wp${companyId}-${n}`;
    n += 1;
  }
  return candidate;
}
