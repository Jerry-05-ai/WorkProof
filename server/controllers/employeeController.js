// server/controllers/employeeController.js
// Rewritten to use Firebase Data Connect models instead of raw MySQL.

import { getDC } from '../config/dataconnect.js';
import {
  getEmployeeById,
  getEmployeeEmploymentStatus,
  getPrivacyByEmployee,
  listBehaviorRatings,
  getEmployeeByEmail,
  findPlatformAdmins,
  updateVerificationCorrectionStatus,
} from '@dataconnect/admin-generated';
import { Skill } from '../models/Skill.js';
import { Project } from '../models/Project.js';
import { PerformanceReview } from '../models/PerformanceReview.js';
import { MonthlyReport } from '../models/MonthlyReport.js';
import { PrivacySettings } from '../models/PrivacySettings.js';
import { PublicProfile } from '../models/PublicProfile.js';
import { JobOpportunity } from '../models/JobOpportunity.js';
import { VerificationCorrection } from '../models/VerificationCorrection.js';
import { BehaviorRating } from '../models/BehaviorRating.js';
import { EmploymentLink } from '../models/EmploymentLink.js';
import { requireFields, ApiError, toBool, toFloatOrNull } from '../utils/helpers.js';
import { audit, notify } from '../utils/events.js';

// Resolve linked employee/company ids from the auth context or throw 400.
function employeeContext(req) {
  const employeeId = req.auth?.employeeId ?? null;
  const companyId = req.auth?.companyId ?? null;
  if (employeeId === null || companyId === null) {
    throw new ApiError(400, 'Employee record not linked');
  }
  return { employeeId, companyId };
}

async function employeeHasLeft(employeeId, companyId) {
  const { data } = await getEmployeeEmploymentStatus(getDC(), { employeeId });
  const employee = data.employee;
  if (!employee) {
    throw new ApiError(404, 'Employee not found');
  }
  return employee.employmentStatus !== 'active';
}

async function ensureEmployeeOwnership(employeeId, companyId) {
  if (await employeeHasLeft(employeeId, companyId)) {
    await PrivacySettings.transferOwnership(employeeId, companyId);
    return true;
  }
  return false;
}

// GET /api/employee/dashboard
export async function dashboard(req, res) {
  const { employeeId, companyId } = employeeContext(req);

  const { data: privacyData } = await getPrivacyByEmployee(getDC(), { employeeId });
  const privacy = privacyData.privacySettings?.[0] ?? null;

  const { data: empData } = await getEmployeeById(getDC(), { id: employeeId });
  const employee = empData.employee;
  if (!employee) throw new ApiError(404, 'Employee not found');

  const skills = await Skill.listForEmployee(employeeId);
  const projects = await Project.listForEmployee(employeeId, companyId);
  const reviews = await PerformanceReview.listForEmployee(employeeId, companyId);
  const reports = await MonthlyReport.listForEmployee(employeeId, companyId);
  const { data: behaviorData } = await listBehaviorRatings(getDC(), { employeeId, companyId });
  const behaviors = behaviorData.employeeBehaviorRatings || [];

  const companyName = employee.company?.name ?? '';

  res.json({
    success: true,
    employee: {
      id: employee.id,
      first_name: employee.firstName,
      last_name: employee.lastName,
      full_name: `${employee.firstName} ${employee.lastName}`.trim(),
      email: employee.email,
      job_title: employee.jobTitle,
      department: employee.department,
      employment_status: employee.employmentStatus,
      start_date: employee.startDate,
      location: employee.location,
      is_verified: toBool(employee.isVerified),
      company_name: companyName || '',
    },
    profile: {
      skills,
      projects,
      reviews,
      behaviors,
      reports,
    },
    privacy: privacy
      ? {
          profile_visibility: privacy.profileVisibility,
          is_employee_controlled: toBool(privacy.isEmployeeControlled),
        }
      : { profile_visibility: 'private', is_employee_controlled: false },
  });
}

// GET/PUT /api/employee/privacy
export async function privacy(req, res) {
  const userId = req.auth.userId;
  const { employeeId, companyId } = employeeContext(req);

  if (req.method === 'GET') {
    const settings = await PrivacySettings.ensure(employeeId, companyId);
    await ensureEmployeeOwnership(employeeId, companyId);
    const refreshed = await PrivacySettings.findByEmployee(employeeId);
    return res.json({ success: true, privacy: PrivacySettings.publicShape(refreshed) });
  }
 
  // PUT
  await ensureEmployeeOwnership(employeeId, companyId);
  const settings = await PrivacySettings.ensure(employeeId, companyId);
  if (!(await PrivacySettings.isEmployeeControlled(employeeId))) {
    throw new ApiError(403, 'Profile visibility is managed by your employer until your employment ends.');
  }
  const data = req.body || {};
  await PrivacySettings.update(employeeId, data);
  await audit(userId, 'employee', 'update_privacy', 'employee', employeeId, Object.keys(data), req);
  const updated = await PrivacySettings.findByEmployee(employeeId);
  res.json({ success: true, privacy: PrivacySettings.publicShape(updated) });
}

// POST /api/employee/profile/publish | /unpublish
export async function publishProfile(req, res) {
  const userId = req.auth.userId;
  const { employeeId, companyId } = employeeContext(req);

  const isUnpublish = req.path.endsWith('/unpublish');

  await ensureEmployeeOwnership(employeeId, companyId);
  if (!(await PrivacySettings.isEmployeeControlled(employeeId))) {
    throw new ApiError(403, 'Your profile privacy is managed by your employer until your employment ends.');
  }

  if (isUnpublish) {
    await PublicProfile.unpublish(employeeId);
    await audit(userId, 'employee', 'unpublish_profile', 'employee', employeeId, null, req);
    return res.json({ success: true, message: 'Profile unpublished' });
  }
 
  const { data: empData } = await getEmployeeById(getDC(), { id: employeeId });
  const employee = empData.employee;
  if (!employee) throw new ApiError(404, 'Employee not found');

  const nameBase = `${employee.firstName} ${employee.lastName}`;
  const profile = await PublicProfile.publish(employeeId, companyId, nameBase);

  await PrivacySettings.markPublished(employeeId);
  await audit(userId, 'employee', 'publish_profile', 'employee', employeeId, { slug: profile.slug }, req);

  res.json({
    success: true,
    message: 'Profile published',
    profile: PublicProfile.publicShape(profile),
    public_url: `/p/${profile.slug}`,
  });
}

// GET /api/employee/profile/public (preview of own filtered profile)
export async function profilePublic(req, res) {
  const { employeeId, companyId } = employeeContext(req);

  const { data: empData } = await getEmployeeById(getDC(), { id: employeeId });
  const employee = empData.employee;
  if (!employee) throw new ApiError(404, 'Employee not found');

  const privacy = await PrivacySettings.ensure(employeeId, companyId);
  const view = await PublicProfile.buildPublicView(employee, privacy);
  const profileRow = await PublicProfile.findByEmployee(employeeId);

  res.json({
    success: true,
    is_public: profileRow ? toBool(profileRow.is_public) : false,
    slug: profileRow?.slug ?? null,
    view,
  });
}

// GET /api/employee/reports
export async function reports(req, res) {
  const { employeeId, companyId } = employeeContext(req);
  const list = await MonthlyReport.listForEmployee(employeeId, companyId);
  res.json({ success: true, reports: list });
}

// GET /api/employee/progress
export async function progress(req, res) {
  const { employeeId, companyId } = employeeContext(req);
  const levelRank = { beginner: 1, intermediate: 2, advanced: 3, expert: 4 };

  const reportsList = await MonthlyReport.listForEmployee(employeeId, companyId);
  const timeline = [...reportsList].reverse();
  const timelinePoints = timeline.map((r) => ({
    month: r.month ?? null,
    year: r.year ?? null,
    performance_score: r.performance_score !== undefined ? toFloatOrNull(r.performance_score) : null,
    behavior_score: r.behavior_score !== undefined ? toFloatOrNull(r.behavior_score) : null,
    growth_percentage: r.growth_percentage !== undefined ? toFloatOrNull(r.growth_percentage) : null,
    promotion_readiness: r.promotion_readiness !== undefined ? toFloatOrNull(r.promotion_readiness) : null,
  }));

  const skills = await Skill.listForEmployee(employeeId);
  const skillGrowth = skills.map((s) => {
    const initial = s.initial_level ?? s.proficiency_level;
    const current = s.proficiency_level;
    const delta = (levelRank[current] ?? 0) - (levelRank[initial] ?? 0);
    return {
      name: s.name,
      category: s.category,
      initial_level: initial,
      current_level: current,
      levels_gained: delta,
      is_verified: s.is_verified,
    };
  });

  const reviews = await PerformanceReview.listForEmployee(employeeId, companyId);

  const latest = timelinePoints.length ? timelinePoints[timelinePoints.length - 1] : null;
  const totalLevelsGained = skillGrowth.reduce((acc, s) => acc + s.levels_gained, 0);

  res.json({
    success: true,
    summary: {
      reports_count: timelinePoints.length,
      skills_tracked: skillGrowth.length,
      total_levels_gained: totalLevelsGained,
      latest_performance: latest?.performance_score ?? null,
      latest_promotion: latest?.promotion_readiness ?? null,
    },
    performance_timeline: timelinePoints,
    skill_growth: skillGrowth,
    reviews,
  });
}

// GET /api/employee/opportunities
export async function opportunities(req, res) {
  const employeeId = req.auth?.employeeId ?? null;
  if (employeeId === null) throw new ApiError(400, 'Employee record not linked');
  res.json({ success: true, opportunities: await JobOpportunity.listForEmployee(employeeId) });
}

// PUT /api/employee/opportunities/:id/respond
export async function respondOpportunity(req, res) {
  const userId = req.auth.userId;
  const employeeId = req.auth?.employeeId ?? null;
  if (employeeId === null) throw new ApiError(400, 'Employee record not linked');

  const opportunityId = req.params.id;
  if (!opportunityId) throw new ApiError(400, 'Opportunity id required');

  const data = req.body || {};
  requireFields(data, ['status']);
  const status = data.status;
  if (!JobOpportunity.EMPLOYEE_TRANSITIONS.includes(status)) {
    throw new ApiError(422, `Employees may set status to: ${JobOpportunity.EMPLOYEE_TRANSITIONS.join(', ')}`);
  }

  const opp = await JobOpportunity.findById(opportunityId);
  if (!opp || String(opp.employee_id) !== String(employeeId)) {
    throw new ApiError(404, 'Opportunity not found');
  }

  await JobOpportunity.updateStatus(opportunityId, status);

  if (['interested', 'declined'].includes(status)) {
    await notify(
      opp.recruiter_id,
      'opportunity_response',
      `Candidate ${status}`,
      `A candidate marked your opportunity "${opp.title}" as ${status}.`,
      '/recruiter/opportunities',
      { opportunity_id: opportunityId }
    );
  }
  await audit(userId, 'employee', 'respond_opportunity', 'job_opportunity', opportunityId, { status }, req);

  const updated = await JobOpportunity.findById(opportunityId);
  res.json({ success: true, message: 'Response recorded', opportunity: JobOpportunity.publicShape(updated) });
}

// GET /api/employee/corrections
export async function corrections(req, res) {
  const employeeId = req.auth?.employeeId ?? null;
  if (employeeId === null) throw new ApiError(400, 'Employee record not linked');
  const status = req.query.status ?? null;
  const list = await VerificationCorrection.listForEmployee(employeeId, status);
  res.json({ success: true, corrections: list });
}

// POST /api/employee/corrections/:id/respond
export async function respondCorrection(req, res) {
  const userId = req.auth.userId;
  const employeeId = req.auth?.employeeId ?? null;
  if (employeeId === null) throw new ApiError(400, 'Employee record not linked');

  const correctionId = req.params.id;
  if (!correctionId) throw new ApiError(400, 'Correction id required');

  const data = req.body || {};
  requireFields(data, ['action']);
  const action = data.action;
  if (!['accept', 'reject'].includes(action)) throw new ApiError(422, 'Action must be accept or reject');

  const correction = await VerificationCorrection.findById(correctionId);
  if (!correction || String(correction.employee_id) !== String(employeeId)) {
    throw new ApiError(404, 'Correction not found');
  }
  if (correction.status !== 'pending') {
    throw new ApiError(409, 'This correction has already been resolved');
  }

  let notifTitle;
  let notifMsg;
  let auditAction;

  if (action === 'accept') {
    await VerificationCorrection.applyToEmployee(correction);
    await VerificationCorrection.setStatus(correctionId, 'approved', userId);
    notifTitle = 'Correction accepted';
    notifMsg = 'The employee accepted your correction request. The verified record has been updated.';
    auditAction = 'accept_correction';
  } else {
    await VerificationCorrection.setStatus(correctionId, 'rejected', userId);
    notifTitle = 'Correction rejected';
    notifMsg = 'The employee rejected your correction request. The dispute has been logged for admin review.';
    auditAction = 'reject_correction';
  }

  if (correction.requested_by) {
    await notify(
      correction.requested_by,
      `correction_${action === 'accept' ? 'accepted' : 'rejected'}`,
      notifTitle,
      notifMsg,
      '/company/corrections',
      { correction_id: correctionId }
    );
  }
  await audit(userId, 'employee', auditAction, 'verification_correction', correctionId, { field: correction.field_name }, req);

  const updated = await VerificationCorrection.findById(correctionId);
  res.json({
    success: true,
    message: action === 'accept' ? 'Correction accepted and applied' : 'Correction rejected',
    correction: VerificationCorrection.publicShape(updated),
  });
}

// GET /api/employee/career-history
export async function careerHistory(req, res) {
  const { employeeId } = employeeContext(req);
  const email = req.auth?.email ?? null;
  if (!email) throw new ApiError(400, 'Employee record not linked');

  // Ensure the currently-linked record is represented in the timeline.
  const { data: currentData } = await getEmployeeById(getDC(), { id: employeeId });
  const current = currentData.employee;
  if (current) await EmploymentLink.ensureLinkForEmployee(current, { source: 'backfill' });

  const timeline = await EmploymentLink.listForPerson(email);
  res.json({
    success: true,
    read_only: true,
    career_timeline: timeline.map(EmploymentLink.publicShape),
  });
}