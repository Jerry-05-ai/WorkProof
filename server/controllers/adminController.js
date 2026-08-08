// server/controllers/adminController.js
import pool, { query, queryOne } from '../config/database.js';
import { Company } from '../models/Company.js';
import { AuditLog } from '../models/AuditLog.js';
import { ApiError } from '../utils/helpers.js';
import { audit, notify } from '../utils/events.js';

// GET /api/admin/dashboard
export async function dashboard(_req, res) {
  const companyStats = await queryOne(
    `SELECT
        COUNT(*) AS total,
        SUM(status = 'pending') AS pending,
        SUM(status = 'approved') AS approved,
        SUM(status = 'rejected') AS rejected,
        SUM(status = 'suspended') AS suspended
     FROM companies WHERE deleted_at IS NULL`
  );

  const employeeStats = await queryOne(
    `SELECT
        COUNT(*) AS total,
        SUM(employment_status = 'active') AS active,
        SUM(employment_status IN ('inactive','terminated')) AS former
     FROM employees WHERE deleted_at IS NULL`
  );

  const publicProfilesRow = await queryOne('SELECT COUNT(*) AS c FROM public_profiles WHERE is_public = 1');
  const publicProfiles = Number(publicProfilesRow.c);

  const roleRows = await query("SELECT role, COUNT(*) AS c FROM users WHERE deleted_at IS NULL GROUP BY role");
  const usersByRole = {};
  for (const row of roleRows) usersByRole[row.role] = Number(row.c);

  const recent = await query(
    `SELECT al.action, al.entity_type, al.created_at, u.full_name, al.role
     FROM audit_logs al
     LEFT JOIN users u ON u.id = al.user_id
     ORDER BY al.created_at DESC LIMIT 10`
  );

  res.json({
    success: true,
    companies: {
      total: Number(companyStats?.total ?? 0),
      pending: Number(companyStats?.pending ?? 0),
      approved: Number(companyStats?.approved ?? 0),
      rejected: Number(companyStats?.rejected ?? 0),
      suspended: Number(companyStats?.suspended ?? 0),
    },
    employees: {
      total: Number(employeeStats?.total ?? 0),
      active: Number(employeeStats?.active ?? 0),
      former: Number(employeeStats?.former ?? 0),
    },
    public_profiles: publicProfiles,
    users_by_role: usersByRole,
    recent_activity: recent.map((r) => ({
      action: r.action,
      entity_type: r.entity_type,
      user: r.full_name,
      role: r.role,
      at: r.created_at,
    })),
  });
}

// GET /api/admin/companies  |  GET /api/admin/companies/pending
export async function companies(req, res) {
  const pendingOnly = req.path.endsWith('/pending');
  const status = pendingOnly ? 'pending' : (req.query.status ?? '');

  let sql = `
    SELECT c.*, u.full_name AS admin_name, u.email AS admin_email,
           (SELECT COUNT(*) FROM employees e WHERE e.company_id = c.id AND e.deleted_at IS NULL) AS employee_count
    FROM companies c
    LEFT JOIN users u ON u.id = c.admin_id
    WHERE c.deleted_at IS NULL`;
  const params = [];
  if (status !== '') {
    sql += ' AND c.status = ?';
    params.push(status);
  }
  sql += ' ORDER BY c.created_at DESC';

  const rows = await query(sql, params);
  const list = rows.map((c) => ({
    ...Company.publicShape(c),
    admin_name: c.admin_name ?? null,
    admin_email: c.admin_email ?? null,
    employee_count: Number(c.employee_count),
    created_at: c.created_at,
  }));

  res.json({ success: true, count: list.length, companies: list });
}

// POST /api/admin/companies/:id/:action
export async function companyAction(req, res) {
  const userId = req.auth.userId;
  const action = req.params.action;
  const companyId = Number(req.params.id);
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

  const conn = await pool.getConnection();
  try {
    await conn.beginTransaction();
    const isVerified = newStatus === 'approved' ? 1 : 0;
    await conn.execute(
      `UPDATE companies
       SET status = ?, is_verified = ?,
           verification_date = CASE WHEN ? = 'approved' THEN NOW() ELSE verification_date END
       WHERE id = ?`,
      [newStatus, isVerified, newStatus, companyId]
    );
    await conn.commit();
  } catch (e) {
    await conn.rollback();
    conn.release();
    throw new ApiError(500, 'Action failed');
  }
  conn.release();

  const notifMap = {
    approve: ['company_approved', 'Your company was approved', 'Your company registration has been approved. You can now manage employees.'],
    reject: ['company_rejected', 'Your company registration was rejected', `Your company registration was rejected.${reason ? ' Reason: ' + reason : ''}`],
    suspend: ['company_suspended', 'Your company has been suspended', `Your company account has been suspended.${reason ? ' Reason: ' + reason : ''}`],
    unsuspend: ['company_unsuspended', 'Your company has been reinstated', 'Your company account has been reinstated and is active again.'],
  };
  const [type, title, message] = notifMap[action];

  if (company.admin_id !== null) {
    await notify(Number(company.admin_id), type, title, message, '/company');
  }
  await audit(userId, 'platform_admin', `${action}_company`, 'company', companyId, reason ? { reason } : null, req);

  const updated = await Company.findById(companyId);
  res.json({ success: true, message: `Company ${action}d`, company: Company.publicShape(updated) });
}

// GET /api/admin/analytics
export async function analytics(_req, res) {
  const industry = await query(
    `SELECT COALESCE(NULLIF(industry,''),'Unspecified') AS industry, COUNT(*) AS c
     FROM companies WHERE deleted_at IS NULL
     GROUP BY industry ORDER BY c DESC`
  );

  const signups = await query(
    `SELECT DATE_FORMAT(created_at, '%Y-%m') AS month, COUNT(*) AS c
     FROM companies WHERE deleted_at IS NULL
     GROUP BY month ORDER BY month DESC LIMIT 12`
  );

  const funnelRows = await query("SELECT status, COUNT(*) AS c FROM job_opportunities GROUP BY status");
  const oppFunnel = {};
  for (const row of funnelRows) oppFunnel[row.status] = Number(row.c);

  const topSkills = await query(
    `SELECT s.name, COUNT(*) AS c
     FROM employee_skills es
     JOIN skills s ON s.id = es.skill_id
     GROUP BY s.id, s.name ORDER BY c DESC LIMIT 10`
  );

  const growthRows = await query(
    `SELECT DATE_FORMAT(created_at, '%Y-%m') AS month, COUNT(*) AS c
     FROM companies WHERE deleted_at IS NULL
     GROUP BY month ORDER BY month ASC`
  );
  const cumulative = [];
  let running = 0;
  for (const r of growthRows) {
    running += Number(r.c);
    cumulative.push({ month: r.month, total: running });
  }

  res.json({
    success: true,
    industry_distribution: industry.map((r) => ({ industry: r.industry, count: Number(r.c) })),
    monthly_signups: signups.map((r) => ({ month: r.month, count: Number(r.c) })),
    opportunity_funnel: oppFunnel,
    top_skills: topSkills.map((r) => ({ name: r.name, count: Number(r.c) })),
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
