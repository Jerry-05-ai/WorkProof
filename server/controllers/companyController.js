// server/controllers/companyController.js
// Rewritten to use Firebase Data Connect models instead of raw MySQL.

import { getDC } from '../config/dataconnect.js';
import {
  createUser,
  createEmployee as gqlCreateEmployee,
  createCompanyMembership,
  setUserCompanyAndEmployee,
  createPrivacySettings,
  companyEmployeeStats,
  listProjectsByCompany,
  companySkillDistribution,
  listAuditLogs,
  getEmployeeByEmail,
} from '@dataconnect/admin-generated';
import { Employee } from '../models/Employee.js';
import { Company } from '../models/Company.js';
import { Invitation } from '../models/Invitation.js';
import { Skill } from '../models/Skill.js';
import { Project } from '../models/Project.js';
import { Achievement } from '../models/Achievement.js';
import { BehaviorRating } from '../models/BehaviorRating.js';
import { PerformanceReview } from '../models/PerformanceReview.js';
import { MonthlyReport } from '../models/MonthlyReport.js';
import { PrivacySettings } from '../models/PrivacySettings.js';
import { VerificationCorrection } from '../models/VerificationCorrection.js';
import { EmploymentLink } from '../models/EmploymentLink.js';
import {
  requireFields, validateEmail, validatePassword, normalize, normalizeEmail, ApiError,
} from '../utils/helpers.js';
import { audit, notify } from '../utils/events.js';
import { sessionCompanyId } from '../middleware/auth.js';

// GET /api/company/dashboard
export async function dashboard(req, res) {
  const companyId = sessionCompanyId(req);

  const { data: empStatsData } = await companyEmployeeStats(getDC(), { companyId });
  const empRows = empStatsData.employees || [];

  const totals = {
    total: empRows.length,
    active_count: empRows.filter((e) => e.employmentStatus === 'active').length,
    inactive_count: empRows.filter((e) => e.employmentStatus === 'inactive').length,
    terminated_count: empRows.filter((e) => e.employmentStatus === 'terminated').length,
    verified_count: empRows.filter((e) => e.isVerified).length,
  };

  // Average performance from projects
  const { data: projData } = await listProjectsByCompany(getDC(), { companyId });
  const projectRows = projData.projects || [];
  const ratedProjects = projectRows.filter((p) => p.performanceRating !== null && p.performanceRating !== undefined);
  const avgPerf = ratedProjects.length
    ? Math.round((ratedProjects.reduce((acc, p) => acc + Number(p.performanceRating), 0) / ratedProjects.length) * 100) / 100
    : null;

  // Departments
  const deptCounts = {};
  for (const e of empRows) {
    const dept = e.department || 'Unspecified';
    deptCounts[dept] = (deptCounts[dept] || 0) + 1;
  }
  const departments = Object.entries(deptCounts)
    .map(([department, count]) => ({ department, count }))
    .sort((a, b) => b.count - a.count);

  // Skill distribution
  const { data: skillData } = await companySkillDistribution(getDC(), { companyId });
  const skillCounts = {};
  for (const es of skillData.employeeSkills || []) {
    const name = es.skill?.name ?? 'Unknown';
    skillCounts[name] = (skillCounts[name] || 0) + 1;
  }
  const skillDistribution = Object.entries(skillCounts)
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 10);

  // Recent activity
  const { data: auditData } = await listAuditLogs(getDC(), {
    action: null,
    role: null,
    entityType: null,
    userId: null,
    dateFrom: null,
    dateTo: null,
    limit: 10,
    offset: 0,
  });
  const recent = (auditData.auditLogs || []).filter((r) => r.user?.company?.id === companyId);

  res.json({
    success: true,
    stats: {
      total_employees: Number(totals.total ?? 0),
      active_employees: Number(totals.active_count ?? 0),
      inactive_employees: Number(totals.inactive_count ?? 0),
      terminated_employees: Number(totals.terminated_count ?? 0),
      verified_employees: Number(totals.verified_count ?? 0),
      average_performance: avgPerf !== null ? parseFloat(avgPerf) : null,
    },
    departments,
    skill_distribution: skillDistribution,
    recent_activity: recent.map((r) => ({
      action: r.action,
      entity_type: r.entityType,
      entity_id: r.entityId ?? null,
      user: r.user?.fullName ?? null,
      at: r.createdAt,
    })),
  });
}

// POST /api/company/invitations
export async function createInvitation(req, res) {
  const userId = req.auth.userId;
  const companyId = req.auth?.companyId ?? null;
  if (companyId === null) throw new ApiError(404, 'No company associated with this account');

  const company = await Company.findById(companyId);
  if (!company || company.status !== 'approved') {
    throw new ApiError(403, 'Company must be approved before inviting employees');
  }

  const data = req.body || {};
  requireFields(data, ['email']);
  if (!validateEmail(data.email)) throw new ApiError(422, 'Invalid email address');

  const { data: userData } = await getEmployeeByEmail(getDC(), { email: normalizeEmail(data.email) });
  if (userData.employees?.length > 0) throw new ApiError(409, 'A user with this email already exists');

  if (await Invitation.pendingExistsForEmail(companyId, data.email)) {
    throw new ApiError(409, 'A pending invitation already exists for this email');
  }

  const { id: invId, rawToken } = await Invitation.create({
    company_id: companyId,
    email: data.email,
    invited_by: userId,
    first_name: data.first_name !== undefined ? normalize(data.first_name) : null,
    last_name: data.last_name !== undefined ? normalize(data.last_name) : null,
    job_title: data.job_title !== undefined ? normalize(data.job_title) : null,
    department: data.department !== undefined ? normalize(data.department) : null,
  });

  await audit(userId, 'company_admin', 'invite_employee', 'employee_invitation', invId, {
    email: normalizeEmail(data.email),
  }, req);

  const frontend = process.env.FRONTEND_ORIGIN?.split(',')[0]?.trim() || 'http://localhost:5173';
  const acceptUrl = `${frontend}/accept-invitation?token=${rawToken}`;

  res.status(201).json({
    success: true,
    message: 'Invitation created',
    invitation: { id: invId, email: normalizeEmail(data.email) },
    accept_url: acceptUrl,
    token: rawToken,
  });
}

// GET /api/company/invitations/verify?token=xxx
export async function verifyInvitation(req, res) {
  const token = req.query.token || '';
  if (token === '') throw new ApiError(422, 'Token is required');

  const inv = await Invitation.findValidByToken(token);
  if (!inv) throw new ApiError(404, 'Invalid or expired invitation');

  const company = await Company.findById(inv.company_id);
  const payload = Invitation.publicShape(inv);
  payload.company_name = company?.name ?? null;

  res.json({ success: true, invitation: payload });
}

// POST /api/company/invitations/accept
export async function acceptInvitation(req, res) {
  const data = req.body || {};
  requireFields(data, ['token', 'password', 'first_name', 'last_name']);

  const { validatePassword } = await import('../utils/helpers.js');
  const pwError = validatePassword(data.password);
  if (pwError !== null) throw new ApiError(422, pwError);

  const inv = await Invitation.findValidByToken(data.token);
  if (!inv) throw new ApiError(404, 'Invalid or expired invitation');

  const { data: userData } = await getEmployeeByEmail(getDC(), { email: normalizeEmail(inv.email) });
  if (userData.employees?.length > 0) throw new ApiError(409, 'An account with this email already exists');

  const companyId = inv.company_id;
  const firstName = normalize(data.first_name) || inv.first_name || '';
  const lastName = normalize(data.last_name) || inv.last_name || '';
  const jobTitle = inv.job_title || (data.job_title ? normalize(data.job_title) : 'Employee');
  const department = inv.department || (data.department ? normalize(data.department) : 'General');

  const bcrypt = (await import('bcryptjs')).default;
  const passwordHash = await bcrypt.hash(data.password, 10);

  // Create user
  const { data: userResult } = await createUser(getDC(), {
    email: normalizeEmail(inv.email),
    passwordHash,
    fullName: `${firstName} ${lastName}`.trim(),
    phone: data.phone ?? null,
    role: 'employee',
    companyId,
    employeeRefId: null,
  });
  const userId = userResult.user_insert.id;

  // Create employee
  const { data: empResult } = await gqlCreateEmployee(getDC(), {
    userId,
    companyId,
    firstName,
    lastName,
    email: normalizeEmail(inv.email),
    phone: data.phone ?? null,
    jobTitle,
    department,
    employmentType: 'full_time',
    employmentStatus: 'active',
    startDate: new Date().toISOString().slice(0, 10),
    endDate: null,
    managerId: null,
    profilePhoto: null,
    location: null,
  });
  const employeeId = empResult.employee_insert.id;

  // Link user to employee
  await setUserCompanyAndEmployee(getDC(), { id: userId, companyId, employeeRefId: employeeId });

  // Create membership
  await createCompanyMembership(getDC(), {
    userId,
    companyId,
    role: 'employee',
    invitedBy: inv.invited_by,
  });

  // Create privacy settings
  await createPrivacySettings(getDC(), {
    employeeId,
    companyId,
    profileVisibility: 'private',
  });

  // Mark invitation accepted
  await Invitation.markAccepted(inv.id);

  await audit(userId, 'employee', 'accept_invitation', 'employee', employeeId, { company_id: companyId }, req);
  await notify(
    inv.invited_by,
    'invitation_accepted',
    'Invitation accepted',
    `${`${firstName} ${lastName}`.trim()} has accepted the invitation and joined.`,
    '/company/employees'
  );

  res.status(201).json({ success: true, message: 'Account created successfully. You can now log in.' });
}

// GET & POST /api/company/employees
export async function listOrCreateEmployees(req, res) {
  const userId = req.auth.userId;
  const companyId = sessionCompanyId(req);

  if (req.method === 'GET') {
    const filters = {
      search: req.query.search ?? '',
      department: req.query.department ?? '',
      employment_status: req.query.employment_status ?? '',
      is_verified: req.query.is_verified ?? '',
    };
    const rows = await Employee.listForCompany(companyId, filters);
    return res.json({
      success: true,
      employees: rows.map(Employee.publicShape),
      count: rows.length,
    });
  }

  // POST
  const data = req.body || {};
  requireFields(data, ['first_name', 'last_name', 'email', 'job_title', 'department', 'password']);
  if (!validateEmail(data.email)) throw new ApiError(422, 'Invalid email address');
  if (await Employee.emailExistsInCompany(data.email, companyId)) {
    throw new ApiError(409, 'An employee with this email already exists');
  }
 
  const pwError = validatePassword(data.password);
  if (pwError !== null) throw new ApiError(422, pwError);
  const { User } = await import('../models/User.js');
  if (await User.emailExists(data.email)) {
    throw new ApiError(409, 'A login account with this email already exists');
  }

  const bcrypt = (await import('bcryptjs')).default;
  const firstName = normalize(data.first_name);
  const lastName = normalize(data.last_name);
  const blankToNull = (v) => (v === undefined || v === null || v === '' ? null : v);
  const startDate = blankToNull(data.start_date) ?? new Date().toISOString().slice(0, 10);

  // Create user
  const passwordHash = await bcrypt.hash(data.password, 10);
  const { data: userResult } = await createUser(getDC(), {
    email: normalizeEmail(data.email),
    passwordHash,
    fullName: `${firstName} ${lastName}`.trim(),
    phone: blankToNull(data.phone),
    role: 'employee',
    companyId,
    employeeRefId: null,
  });
  const newUserId = userResult.user_insert.id;

  // Create employee
  const { data: empResult } = await gqlCreateEmployee(getDC(), {
    userId: newUserId,
    companyId,
    firstName,
    lastName,
    email: normalizeEmail(data.email),
    phone: blankToNull(data.phone),
    jobTitle: normalize(data.job_title),
    department: normalize(data.department),
    employmentType: blankToNull(data.employment_type) ?? 'full_time',
    employmentStatus: 'active',
    startDate,
    endDate: null,
    managerId: null,
    profilePhoto: null,
    location: blankToNull(data.location),
  });
  const newEmployeeId = empResult.employee_insert.id;

  // Link user to employee
  await setUserCompanyAndEmployee(getDC(), { id: newUserId, companyId, employeeRefId: newEmployeeId });

  // Create membership
  await createCompanyMembership(getDC(), {
    userId: newUserId,
    companyId,
    role: 'employee',
    invitedBy: userId,
  });

  // Create privacy settings
  await createPrivacySettings(getDC(), {
    employeeId: newEmployeeId,
    companyId,
    profileVisibility: 'private',
  });

  await audit(userId, req.auth.role, 'create_employee', 'employee', newEmployeeId, { login_created: true }, req);
  const created = await Employee.findForCompany(newEmployeeId, companyId);
  res.status(201).json({
    success: true,
    employee: Employee.publicShape(created),
    login_created: true,
    message: 'Employee added with login access',
  });
}

// Helper: resolve employee within tenant or 404.
async function requireEmployee(companyId, employeeId) {
  const emp = await Employee.findForCompany(employeeId, companyId);
  if (!emp) throw new ApiError(404, 'Employee not found');
  return emp;
}

// GET/PUT/DELETE /api/company/employees/:id
export async function employeeDetail(req, res) {
  const userId = req.auth.userId;
  const companyId = sessionCompanyId(req);
  const employeeId = req.params.id;

  const employee = await requireEmployee(companyId, employeeId);

  if (req.method === 'GET') {
    return res.json({
      success: true,
      employee: Employee.publicShape(employee),
      profile: {
        skills: await Skill.listForEmployee(employeeId),
        projects: await Project.listForEmployee(employeeId, companyId),
        achievements: await Achievement.listForEmployee(employeeId, companyId),
        behavior: await BehaviorRating.listForEmployee(employeeId, companyId),
        behavior_summary: await BehaviorRating.summaryForEmployee(employeeId, companyId),
      },
    });
  }

  if (req.method === 'PUT') {
    if (await PrivacySettings.isEmployeeControlled(employeeId)) {
      throw new ApiError(403, 'This profile is employee-controlled. Use the correction workflow to request changes.');
    }
    const data = req.body || {};
    await Employee.update(employeeId, companyId, data);
    await audit(userId, req.auth.role, 'update_employee', 'employee', employeeId, Object.keys(data), req);
    const updated = await Employee.findForCompany(employeeId, companyId);
    return res.json({ success: true, employee: Employee.publicShape(updated) });
  }

  // DELETE
  await Employee.softDelete(employeeId, companyId);
  await audit(userId, req.auth.role, 'delete_employee', 'employee', employeeId, null, req);
  res.json({ success: true, message: 'Employee removed' });
}

// POST /api/company/employees/:id/skills  |  PUT .../skills/:skillId
export async function employeeSkills(req, res) {
  const userId = req.auth.userId;
  const companyId = sessionCompanyId(req);
  const employeeId = req.params.id;
  await requireEmployee(companyId, employeeId);

  const data = req.body || {};

  if (req.method === 'POST') {
    requireFields(data, ['name', 'proficiency_level']);
    const validLevels = ['beginner', 'intermediate', 'advanced', 'expert'];
    if (!validLevels.includes(data.proficiency_level)) throw new ApiError(422, 'Invalid proficiency level');
    await Skill.addToEmployee(employeeId, data);
    await audit(userId, req.auth.role, 'add_skill', 'employee', employeeId, { skill: data.name }, req);
    return res.status(201).json({ success: true, skills: await Skill.listForEmployee(employeeId) });
  }

  // PUT
  const employeeSkillId = req.params.skillId;
  if (!employeeSkillId) throw new ApiError(400, 'Skill id required');
  await Skill.updateEmployeeSkill(employeeSkillId, employeeId, data);
  await audit(userId, req.auth.role, 'update_skill', 'employee', employeeId, { employee_skill_id: employeeSkillId }, req);
  res.json({ success: true, skills: await Skill.listForEmployee(employeeId) });
}

// POST /api/company/employees/:id/projects  |  PUT .../projects/:projectId
export async function employeeProjects(req, res) {
  const userId = req.auth.userId;
  const companyId = sessionCompanyId(req);
  const employeeId = req.params.id;
  await requireEmployee(companyId, employeeId);

  const data = req.body || {};

  if (req.method === 'POST') {
    requireFields(data, ['name']);
    const validStatus = ['completed', 'in_progress', 'planned'];
    if (data.status !== undefined && !validStatus.includes(data.status)) {
      throw new ApiError(422, 'Invalid project status');
    }
    const id = await Project.create(employeeId, companyId, data);
    await audit(userId, req.auth.role, 'add_project', 'project', id, { employee_id: employeeId }, req);
    return res.status(201).json({ success: true, projects: await Project.listForEmployee(employeeId, companyId) });
  }

  // PUT
  const projectId = req.params.projectId;
  if (!projectId) throw new ApiError(400, 'Project id required');
  await Project.update(projectId, employeeId, companyId, data);
  await audit(userId, req.auth.role, 'update_project', 'project', projectId, { employee_id: employeeId }, req);
  res.json({ success: true, projects: await Project.listForEmployee(employeeId, companyId) });
}

// POST /api/company/employees/:id/achievements
export async function employeeAchievements(req, res) {
  const userId = req.auth.userId;
  const companyId = sessionCompanyId(req);
  const employeeId = req.params.id;
  await requireEmployee(companyId, employeeId);

  const data = req.body || {};
  requireFields(data, ['title']);
  const validCategories = ['certification', 'award', 'publication', 'other'];
  if (data.category !== undefined && !validCategories.includes(data.category)) {
    throw new ApiError(422, 'Invalid achievement category');
  }
  const id = await Achievement.create(employeeId, companyId, data);
  await audit(userId, req.auth.role, 'add_achievement', 'achievement', id, { employee_id: employeeId }, req);
  res.status(201).json({ success: true, achievements: await Achievement.listForEmployee(employeeId, companyId) });
}

// POST /api/company/employees/:id/behavior
export async function employeeBehavior(req, res) {
  const userId = req.auth.userId;
  const companyId = sessionCompanyId(req);
  const employeeId = req.params.id;
  await requireEmployee(companyId, employeeId);

  const data = req.body || {};
  requireFields(data, ['category', 'rating']);
  if (!BehaviorRating.CATEGORIES.includes(data.category)) throw new ApiError(422, 'Invalid behavior category');
  const rating = parseInt(data.rating, 10);
  if (rating < 1 || rating > 5) throw new ApiError(422, 'Rating must be between 1 and 5');

  await BehaviorRating.create(employeeId, companyId, userId, data);
  await audit(userId, req.auth.role, 'add_behavior_rating', 'employee', employeeId, { category: data.category, rating }, req);

  res.status(201).json({
    success: true,
    behavior: await BehaviorRating.listForEmployee(employeeId, companyId),
    behavior_summary: await BehaviorRating.summaryForEmployee(employeeId, companyId),
  });
}

// POST /api/company/employees/:id/performance-review
export async function employeePerformanceReview(req, res) {
  const userId = req.auth.userId;
  const companyId = sessionCompanyId(req);
  const employeeId = req.params.id;
  await requireEmployee(companyId, employeeId);

  const data = req.body || {};
  requireFields(data, ['rating']);
  const rating = parseFloat(data.rating);
  if (rating < 1 || rating > 5) throw new ApiError(422, 'Rating must be between 1 and 5');

  const id = await PerformanceReview.create(employeeId, companyId, userId, data);
  await audit(userId, req.auth.role, 'add_performance_review', 'performance_review', id, { employee_id: employeeId }, req);
  res.status(201).json({ success: true, reviews: await PerformanceReview.listForEmployee(employeeId, companyId) });
}

// POST /api/company/employees/:id/monthly-report  |  GET /api/company/employees/:id/reports
export async function employeeMonthlyReport(req, res) {
  const userId = req.auth.userId;
  const companyId = sessionCompanyId(req);
  const employeeId = req.params.id;
  await requireEmployee(companyId, employeeId);

  if (req.method === 'POST') {
    const data = req.body || {};
    const now = new Date();
    const month = data.month ?? String(now.getMonth() + 1).padStart(2, '0');
    const year = parseInt(data.year ?? now.getFullYear(), 10);

    const id = await MonthlyReport.generate(employeeId, companyId, month, year, false);
    await audit(userId, req.auth.role, 'generate_monthly_report', 'monthly_progress_report', id, { employee_id: employeeId, month, year }, req);
    const reports = await MonthlyReport.listForEmployee(employeeId, companyId);
    return res.status(201).json({ success: true, report_id: id, reports });
  }

  // GET
  const reports = await MonthlyReport.listForEmployee(employeeId, companyId);
  res.json({ success: true, reports });
}

// POST /api/company/employees/:id/verify-skill
export async function verifySkill(req, res) {
  const userId = req.auth.userId;
  const companyId = sessionCompanyId(req);
  const employeeId = req.params.id;
  await requireEmployee(companyId, employeeId);

  const data = req.body || {};
  requireFields(data, ['employee_skill_id']);
  const employeeSkillId = data.employee_skill_id;

  await Skill.updateEmployeeSkill(employeeSkillId, employeeId, { is_verified: true, verified_by: userId });
  await audit(userId, req.auth.role, 'verify_skill', 'employee', employeeId, { employee_skill_id: employeeSkillId }, req);

  res.json({ success: true, message: 'Skill verified', skills: await Skill.listForEmployee(employeeId) });
}

// POST /api/company/employees/:id/verify
export async function verifyEmployee(req, res) {
  const userId = req.auth.userId;
  const companyId = sessionCompanyId(req);
  const employeeId = req.params.id;
  const employee = await requireEmployee(companyId, employeeId);

  if (employee.isVerified) {
    throw new ApiError(409, 'Employee is already verified');
  }

  await Employee.setVerified(employeeId, companyId, userId);

  if (employee.userId) {
    await notify(
      employee.userId,
      'employee_verified',
      'Your employee record was verified',
      'Your company has verified your WorkProof employee record.',
      '/employee/dashboard',
      { employee_id: employeeId }
    );
  }
  await audit(userId, req.auth.role, 'verify_employee', 'employee', employeeId, null, req);

  const updated = await Employee.findForCompany(employeeId, companyId);
  res.json({
    success: true,
    message: 'Employee verified',
    employee: Employee.publicShape(updated),
  });
}

// POST /api/company/employees/:id/end-employment
export async function endEmployment(req, res) {
  const userId = req.auth.userId;
  const companyId = sessionCompanyId(req);
  const employeeId = req.params.id;
  const employee = await requireEmployee(companyId, employeeId);

  if (employee.employmentStatus !== 'active') {
    throw new ApiError(409, 'Employment has already ended');
  }

  const data = req.body || {};
  const endDate = data.end_date ?? new Date().toISOString().slice(0, 10);

  await Employee.endEmployment(employeeId, endDate);

  // Transfer ownership (ensure row exists + flag it).
  await PrivacySettings.ensure(employeeId, companyId);
  await PrivacySettings.transferOwnership(employeeId, companyId);

  // Career-history bookkeeping
  await EmploymentLink.ensureLinkForEmployee(employee, { source: 'backfill' });
  await EmploymentLink.markLeft(employeeId, endDate);

  if (employee.userId) {
    await notify(
      employee.userId,
      'ownership_transfer',
      'Your verified profile is now under your control',
      'Your employment record has been finalized. You now control the privacy and publication of your verified history.',
      '/employee/privacy'
    );
  }
  await audit(userId, req.auth.role, 'end_employment', 'employee', employeeId, { end_date: endDate }, req);

  const updated = await Employee.findForCompany(employeeId, companyId);
  res.json({
    success: true,
    message: 'Employment ended and ownership transferred to the employee',
    employee: Employee.publicShape(updated),
  });
}

// POST /api/company/correction/request
export async function correctionRequest(req, res) {
  const userId = req.auth.userId;
  const companyId = sessionCompanyId(req);

  const data = req.body || {};
  requireFields(data, ['employee_id', 'field_name', 'new_value', 'reason']);
  const employeeId = data.employee_id;

  const employee = await requireEmployee(companyId, employeeId);

  if (!VerificationCorrection.CORRECTABLE_FIELDS.includes(data.field_name)) {
    throw new ApiError(422, 'Field is not correctable');
  }

  const oldValue = data.old_value ?? (employee[data.field_name] ?? null);

  const id = await VerificationCorrection.create(employeeId, companyId, userId, {
    field_name: data.field_name,
    old_value: oldValue,
    new_value: data.new_value,
    reason: data.reason,
  });

  if (employee.userId) {
    await notify(
      employee.userId,
      'correction_request',
      'Correction requested on your verified profile',
      'Your former company has requested a change to your verified record. Please review and accept or reject it.',
      '/employee/corrections',
      { correction_id: id, field: data.field_name }
    );
  }
  await audit(userId, req.auth.role, 'request_correction', 'verification_correction', id, { employee_id: employeeId, field: data.field_name }, req);

  const created = await VerificationCorrection.findById(id);
  res.status(201).json({
    success: true,
    message: 'Correction request submitted for employee review',
    correction: VerificationCorrection.publicShape(created),
  });
}