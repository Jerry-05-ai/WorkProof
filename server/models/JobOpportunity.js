// server/models/JobOpportunity.js
import { query, queryOne } from '../config/database.js';
import { normalize } from '../utils/helpers.js';

export const JOB_STATUSES = ['sent', 'viewed', 'interested', 'declined', 'interview', 'hired'];
export const EMPLOYEE_TRANSITIONS = ['viewed', 'interested', 'declined'];

export const JobOpportunity = {
  STATUSES: JOB_STATUSES,
  EMPLOYEE_TRANSITIONS,

  async create(recruiterId, employeeId, data) {
    const result = await query(
      `INSERT INTO job_opportunities
        (recruiter_id, employee_id, title, company_name, description, message, salary_range, location, status)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, 'sent')`,
      [
        recruiterId,
        employeeId,
        normalize(data.title),
        normalize(data.company_name),
        data.description ?? null,
        data.message ?? null,
        data.salary_range ?? null,
        data.location ?? null,
      ]
    );
    return result.insertId;
  },

  async findById(id) {
    return queryOne('SELECT * FROM job_opportunities WHERE id = ? LIMIT 1', [id]);
  },

  async listForRecruiter(recruiterId) {
    const rows = await query(
      `SELECT jo.*, e.first_name, e.last_name, e.job_title
       FROM job_opportunities jo
       JOIN employees e ON e.id = jo.employee_id
       WHERE jo.recruiter_id = ?
       ORDER BY jo.created_at DESC`,
      [recruiterId]
    );
    return rows.map(JobOpportunity.publicShape);
  },

  async listForEmployee(employeeId) {
    const rows = await query(
      `SELECT jo.*, u.full_name AS recruiter_name
       FROM job_opportunities jo
       JOIN users u ON u.id = jo.recruiter_id
       WHERE jo.employee_id = ?
       ORDER BY jo.created_at DESC`,
      [employeeId]
    );
    return rows.map(JobOpportunity.publicShape);
  },

  async updateStatus(id, status) {
    let extra = '';
    if (status === 'viewed') {
      extra = ', viewed_at = COALESCE(viewed_at, NOW())';
    } else if (['interested', 'declined', 'interview', 'hired'].includes(status)) {
      extra = ', responded_at = COALESCE(responded_at, NOW())';
    }
    await query(`UPDATE job_opportunities SET status = ? ${extra} WHERE id = ?`, [status, id]);
  },

  async analyticsForRecruiter(recruiterId) {
    const rows = await query(
      `SELECT status, COUNT(*) AS c
       FROM job_opportunities WHERE recruiter_id = ?
       GROUP BY status`,
      [recruiterId]
    );
    const counts = {};
    for (const s of JOB_STATUSES) counts[s] = 0;
    let total = 0;
    for (const row of rows) {
      counts[row.status] = Number(row.c);
      total += Number(row.c);
    }
    return { total, by_status: counts };
  },

  publicShape(o) {
    return {
      id: Number(o.id),
      recruiter_id: Number(o.recruiter_id),
      employee_id: Number(o.employee_id),
      title: o.title,
      company_name: o.company_name,
      description: o.description,
      message: o.message,
      salary_range: o.salary_range,
      location: o.location,
      status: o.status,
      sent_at: o.sent_at,
      viewed_at: o.viewed_at,
      responded_at: o.responded_at,
      candidate_name: o.first_name !== undefined ? `${o.first_name} ${o.last_name}`.trim() : null,
      candidate_title: o.job_title ?? null,
      recruiter_name: o.recruiter_name ?? null,
    };
  },
};
