// server/controllers/internalProjectController.js
// Company-scoped internal project management + monthly project report data.
// Guarded by the same company_admin/platform_admin role as other company routes.

import { InternalProject } from '../models/InternalProject.js';
import { Company } from '../models/Company.js';
import { requireFields, ApiError } from '../utils/helpers.js';
import { audit } from '../utils/events.js';
import { sessionCompanyId } from '../middleware/auth.js';

// GET / POST  /api/company/projects
export async function listOrCreate(req, res) {
  const userId = req.auth.userId;
  const companyId = sessionCompanyId(req);

  if (req.method === 'GET') {
    const projects = await InternalProject.listForCompany(companyId);
    return res.json({ success: true, projects, count: projects.length });
  }

  // POST — create
  const data = req.body || {};
  requireFields(data, ['name']);

  const id = await InternalProject.create(companyId, userId, data);
  await audit(userId, req.auth.role, 'create_internal_project', 'internal_project', id, null, req);

  const created = await InternalProject.findForCompany(id, companyId);
  return res.status(201).json({ success: true, project: created });
}

// GET / PUT / DELETE  /api/company/projects/:id
export async function detail(req, res) {
  const userId = req.auth.userId;
  const companyId = sessionCompanyId(req);
  const id = Number(req.params.id);

  const existing = await InternalProject.findForCompany(id, companyId);
  if (!existing) throw new ApiError(404, 'Project not found');

  if (req.method === 'GET') {
    return res.json({ success: true, project: existing });
  }

  if (req.method === 'PUT') {
    await InternalProject.update(id, companyId, req.body || {});
    await audit(userId, req.auth.role, 'update_internal_project', 'internal_project', id, null, req);
    const updated = await InternalProject.findForCompany(id, companyId);
    return res.json({ success: true, project: updated });
  }

  // DELETE (soft)
  await InternalProject.softDelete(id, companyId);
  await audit(userId, req.auth.role, 'delete_internal_project', 'internal_project', id, null, req);
  return res.json({ success: true });
}

// GET  /api/company/projects/report?month=&year=
// Returns fully-computed report data from live values so the client can render
// the monthly project report (preview / PDF / print) without any client math.
export async function report(req, res) {
  const companyId = sessionCompanyId(req);
  const company = await Company.findById(companyId);
  if (!company) throw new ApiError(404, 'Company not found');

  const now = new Date();
  const month = clampMonth(req.query.month) ?? (now.getMonth() + 1);
  const year = clampYear(req.query.year) ?? now.getFullYear();

  const projects = await InternalProject.listForCompany(companyId);

  const byStatus = {
    not_started: 0, recruiting: 0, in_progress: 0, on_hold: 0, completed: 0,
  };
  let totalOpen = 0;
  let totalFilled = 0;
  let totalTasksDone = 0;
  let totalTasks = 0;
  let progressSum = 0;
  let assignedEmployeeCount = 0;

  for (const p of projects) {
    if (Object.prototype.hasOwnProperty.call(byStatus, p.status)) byStatus[p.status] += 1;
    totalOpen += Number(p.open_positions || 0);
    totalFilled += Number(p.filled_positions || 0);
    totalTasksDone += Number(p.tasks_completed || 0);
    totalTasks += Number(p.tasks_completed || 0) + Number(p.tasks_remaining || 0);
    progressSum += Number(p.progress || 0);
    assignedEmployeeCount += Array.isArray(p.assigned_employees) ? p.assigned_employees.length : 0;
  }

  const totalProjects = projects.length;
  const totalRoles = totalOpen + totalFilled; // total positions across projects
  const avgCompletion = totalProjects ? Math.round(progressSum / totalProjects) : 0;
  const recruitmentProgress = totalRoles ? Math.round((totalFilled / totalRoles) * 100) : 0;
  const taskProgress = totalTasks ? Math.round((totalTasksDone / totalTasks) * 100) : 0;
  const activeProjects = byStatus.recruiting + byStatus.in_progress;
  const employeeAllocation = totalProjects ? Math.round(assignedEmployeeCount / totalProjects) : 0;

  // Performance summary metrics.
  const recruitmentEfficiency = recruitmentProgress;
  const employeeUtilization = totalProjects
    ? Math.round((projects.filter((p) => (p.assigned_employees || []).length > 0).length / totalProjects) * 100)
    : 0;
  const overallCompanyProgress = Math.round((avgCompletion + recruitmentProgress + taskProgress) / 3);

  // Attention / behind schedule detection.
  const endOfMonth = new Date(year, month, 0); // last day of selected month
  const behindSchedule = projects.filter((p) => {
    if (p.status === 'completed') return false;
    if (!p.end_date) return false;
    const end = new Date(p.end_date);
    return !Number.isNaN(end.getTime()) && end < endOfMonth && p.progress < 100;
  });
  const needingAttention = projects.filter(
    (p) => p.status === 'on_hold' || (p.status !== 'completed' && p.remaining_positions > 0)
  );
  const completedProjects = projects.filter((p) => p.status === 'completed');

  res.json({
    success: true,
    generated_at: new Date().toISOString(),
    generated_by: req.auth.email || null,
    period: { month, year },
    company: {
      id: Number(company.id),
      name: company.name,
      industry: company.industry,
      country: company.country,
      city: company.city,
    },
    summary: {
      total_projects: totalProjects,
      active_projects: activeProjects,
      recruiting_projects: byStatus.recruiting,
      completed_projects: byStatus.completed,
      on_hold_projects: byStatus.on_hold,
      not_started_projects: byStatus.not_started,
      in_progress_projects: byStatus.in_progress,
    },
    overall_progress: {
      completion_percentage: avgCompletion,
      recruitment_progress: recruitmentProgress,
      employee_allocation: employeeAllocation,
      total_open_roles: totalOpen,
      total_filled_roles: totalFilled,
    },
    status_breakdown: {
      recruiting: byStatus.recruiting,
      in_progress: byStatus.in_progress,
      completed: byStatus.completed,
      on_hold: byStatus.on_hold,
      not_started: byStatus.not_started,
    },
    performance_summary: {
      average_project_completion: avgCompletion,
      recruitment_efficiency: recruitmentEfficiency,
      employee_utilization: employeeUtilization,
      overall_company_progress: overallCompanyProgress,
    },
    final_summary: {
      projects_needing_attention: needingAttention.map((p) => p.name),
      projects_completed: completedProjects.map((p) => p.name),
      projects_behind_schedule: behindSchedule.map((p) => p.name),
    },
    projects,
  });
}

function clampMonth(v) {
  const n = parseInt(v, 10);
  if (Number.isNaN(n) || n < 1 || n > 12) return null;
  return n;
}
function clampYear(v) {
  const n = parseInt(v, 10);
  if (Number.isNaN(n) || n < 2000 || n > 2100) return null;
  return n;
}
