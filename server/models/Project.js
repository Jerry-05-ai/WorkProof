// server/models/Project.js
import { query } from '../config/database.js';
import { normalize, toBool, toFloatOrNull } from '../utils/helpers.js';

export const Project = {
  async listForEmployee(employeeId, companyId) {
    const rows = await query(
      `SELECT * FROM projects
       WHERE employee_id = ? AND company_id = ?
       ORDER BY COALESCE(start_date, created_at) DESC`,
      [employeeId, companyId]
    );
    return rows.map(Project.publicShape);
  },

  async create(employeeId, companyId, data) {
    const result = await query(
      `INSERT INTO projects
        (employee_id, company_id, name, description, role, technologies,
         start_date, end_date, status, contribution_summary, performance_rating)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        employeeId,
        companyId,
        normalize(data.name),
        data.description ?? null,
        data.role ?? null,
        data.technologies ?? null,
        data.start_date ?? null,
        data.end_date ?? null,
        data.status ?? 'in_progress',
        data.contribution_summary ?? null,
        data.performance_rating ?? null,
      ]
    );
    return result.insertId;
  },

  async update(projectId, employeeId, companyId, data) {
    const allowed = [
      'name', 'description', 'role', 'technologies', 'start_date', 'end_date',
      'status', 'contribution_summary', 'performance_rating',
    ];
    const sets = [];
    const params = [];
    for (const field of allowed) {
      if (Object.prototype.hasOwnProperty.call(data, field)) {
        sets.push(`${field} = ?`);
        params.push(data[field] === '' ? null : data[field]);
      }
    }
    if (Object.prototype.hasOwnProperty.call(data, 'is_verified')) {
      sets.push('is_verified = ?');
      params.push(data.is_verified ? 1 : 0);
      sets.push(`verification_date = ${data.is_verified ? 'NOW()' : 'NULL'}`);
    }
    if (!sets.length) return;
    params.push(projectId, employeeId, companyId);
    await query(
      `UPDATE projects SET ${sets.join(', ')} WHERE id = ? AND employee_id = ? AND company_id = ?`,
      params
    );
  },

  publicShape(p) {
    return {
      id: Number(p.id),
      employee_id: Number(p.employee_id),
      name: p.name,
      description: p.description,
      role: p.role,
      technologies: p.technologies,
      start_date: p.start_date,
      end_date: p.end_date,
      status: p.status,
      contribution_summary: p.contribution_summary,
      performance_rating: toFloatOrNull(p.performance_rating),
      is_verified: toBool(p.is_verified),
      verification_date: p.verification_date,
    };
  },
};
