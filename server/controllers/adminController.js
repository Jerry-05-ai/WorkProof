// server/controllers/adminController.js
// Rewritten to use Firebase Data Connect models instead of raw MySQL.

import { getDC } from '../config/dataconnect.js';
import {
  adminDashboardStats,
  adminListCompanies,
  findPlatformAdmins,
  allOpportunityStatuses,
  topSkills,
  companyEmployeeStats,
  listAuditLogs,
  countAuditLogs,
} from '@dataconnect/admin-generated';
import { Company } from '../models/Company.js';
import { AuditLog } from '../models/AuditLog.js';
import { ApiError } from '../utils/helpers.js';
import { audit, notify } from '../utils/events.js';

// GET /api/admin/dashboard
export async function dashboard(_req, res) {
  const { data } = await adminDashboardStats(getDC());
  const companies = data.companies || [];
  const employees = data.employees || [];
  const users = data.users || [];
  const publicProfiles = data.publicProfiles || [];

  // Company stats
  const companyStats = {
    total: companies.length,
    pending: companies.filter((c) => c.status === 'pending').length,
    approved: companies.filter((c) => c.status === 'approved').length,
    rejected: companies.filter((c) => c.status === 'rejected').length,
    suspended: companies.filter((c) => c.status === 'suspended').length,
  };

  // Employee stats
  const employeeStats = {
    total: employees.length,
    active: employees.filter((e) => e.employmentStatus === 'active').length,
    former: employees.filter((e) => e.employmentStatus === 'inactive' || e.employmentStatus === 'terminated').length,
  };

  const publicProfilesCount = publicProfiles.length;

  // Users by role
  const usersByRole = {};
  for (const u of users) {
    usersByRole[u.role] = (usersByRole[u.role] || 0) + 1;
  }

  // Recent audit activity
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
  const recent = auditData.auditLogs || [];

  res.json({
    success: true,
    companies: companyStats,
    employees: employeeStats,
    public_profiles: publicProfilesCount,
    users_by_role: usersByRole,
    recent_activity: recent.map((r) => ({
      action: r.action,
      entity_type: r.entityType,
      user: r.user?.fullName ?? null,
      role: r.role,
      at: r.createdAt,
    })),
  });
}

// GET /api/admin/companies  |  GET /api/admin/companies/pending
export async function companies(req, res) {
  const pendingOnly = req.path.endsWith('/pending');
  const status = pendingOnly ? 'pending' : (req.query.status ?? '');

  const { data } = await adminListCompanies(getDC(), {
    status: status !== '' ? status : null,
  });
  const rows = data.companies || [];

  // For each company, count employees
  const list = [];
  for (const c of rows) {
    const { data: empData } = await companyEmployeeStats(getDC(), { companyId: c.id });
    const empCount = empData.employees ? empData.employees.length : 0;
    list.push({
      ...Company.publicShape(c),
      admin_name: c.admin?.fullName ?? null,
      admin_email: c.admin?.email ?? null,
      employee_count: empCount,
      created_at: c.createdAt,
    });
  }

  res.json({ success: true, count: list.length, companies: list });
}

// POST /api/admin/companies/:id/:action
export async function companyAction(req, res) {
  const userId = req.auth.userId;
  const action = req.params.action;
  const companyId = req.params.id;
  if (!companyId) throw new ApiError(400, 'Company id required');

  const validActions = ['approve', 'reject', 'suspend', 'unsuspend'];
  if (!validActions.includes(action)) throw new ApiError(400, 'Invalid action');

  const company = await Company.findById(companyId);
  if (!company) throw new ApiError(404, 'Company not found');

  const data = req.body || {};
  const reason = data.reason ?? null;

  const statusMap = {
    approve: 'approved',
    reject: 'rejected',
    suspend: 'suspended',
    unsuspend: 'approved',
  };
  const newStatus = statusMap[action];

  if (action === 'unsuspend' && company.status !== 'suspended') {
    throw new ApiError(409, 'Company is not suspended');
  }
  if (action === 'suspend' && company.status === 'suspended') {
    throw new ApiError(409, 'Company is already suspended');
  }

  await Company.updateStatus(companyId, newStatus);

  const notifMap = {
    approve: ['company_approved', 'Your company was approved', 'Your company registration has been approved. You can now manage employees.'],
    reject: ['company_rejected', 'Your company registration was rejected', `Your company registration was rejected.${reason ? ' Reason: ' + reason : ''}`],
    suspend: ['company_suspended', 'Your company has been suspended', `Your company account has been suspended.${reason ? ' Reason: ' + reason : ''}`],
    unsuspend: ['company_unsuspended', 'Your company has been reinstated', 'Your company account has been reinstated and is active again.'],
  };
  const [type, title, message] = notifMap[action];

  if (company.admin_id) {
    await notify(company.admin_id, type, title, message, '/company');
  }
  await audit(userId, 'platform_admin', `${action}_company`, 'company', companyId, reason ? { reason } : null, req);

  const updated = await Company.findById(companyId);
  res.json({ success: true, message: `Company ${action}d`, company: Company.publicShape(updated) });
}

// GET /api/admin/analytics
export async function analytics(_req, res) {
  const { data: dashboardData } = await adminDashboardStats(getDC());
  const companies = dashboardData.companies || [];

  // Industry distribution
  const industryCounts = {};
  for (const c of companies) {
    const ind = c.industry && c.industry !== '' ? c.industry : 'Unspecified';
    industryCounts[ind] = (industryCounts[ind] || 0) + 1;
  }
  const industry = Object.entries(industryCounts)
    .map(([industry, c]) => ({ industry, count: c }))
    .sort((a, b) => b.count - a.count);

  // Monthly signups
  const monthlyMap = {};
  for (const c of companies) {
    if (c.createdAt) {
      const month = String(c.createdAt).slice(0, 7);
      monthlyMap[month] = (monthlyMap[month] || 0) + 1;
    }
  }
  const signups = Object.entries(monthlyMap)
    .map(([month, c]) => ({ month, count: c }))
    .sort((a, b) => b.month.localeCompare(a.month))
    .slice(0, 12);

  // Opportunity funnel
  const { data: oppData } = await allOpportunityStatuses(getDC());
  const oppFunnel = {};
  for (const opp of oppData.jobOpportunities || []) {
    oppFunnel[opp.status] = (oppFunnel[opp.status] || 0) + 1;
  }

  // Top skills
  const { data: skillsData } = await topSkills(getDC(), { limit: 10 });
  const skillCounts = {};
  for (const es of skillsData.employeeSkills || []) {
    const name = es.skill?.name ?? 'Unknown';
    skillCounts[name] = (skillCounts[name] || 0) + 1;
  }
  const topSkillsArr = Object.entries(skillCounts)
    .map(([name, c]) => ({ name, count: c }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 10);

  // Growth trend (cumulative)
  const sortedMonths = Object.entries(monthlyMap).sort((a, b) => a[0].localeCompare(b[0]));
  const cumulative = [];
  let running = 0;
  for (const [month, count] of sortedMonths) {
    running += count;
    cumulative.push({ month, total: running });
  }

  res.json({
    success: true,
    industry_distribution: industry,
    monthly_signups: signups,
    opportunity_funnel: oppFunnel,
    top_skills: topSkillsArr,
    growth_trend: cumulative,
  });
}

// GET /api/admin/audit-logs
export async function auditLogs(req, res) {
  const filters = {
    action: req.query.action ?? '',
    role: req.query.role ?? '',
    entity_type: req.query.entity_type ?? '',
    user_id: req.query.user_id ?? '',
    date_from: req.query.date_from ?? '',
    date_to: req.query.date_to ?? '',
  };

  const limit = req.query.limit ? Math.max(1, Math.min(200, parseInt(req.query.limit, 10))) : 100;
  const page = req.query.page ? Math.max(1, parseInt(req.query.page, 10)) : 1;
  const offset = (page - 1) * limit;

  const logs = await AuditLog.query(filters, limit, offset);
  const total = await AuditLog.count(filters);

  res.json({ success: true, logs, total, page, limit });
}