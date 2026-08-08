// server/models/Achievement.js
import { query } from '../config/database.js';
import { normalize, toBool } from '../utils/helpers.js';

export const Achievement = {
  async listForEmployee(employeeId, companyId) {
    const rows = await query(
      `SELECT * FROM achievements
       WHERE employee_id = ? AND company_id = ?
       ORDER BY COALESCE(date, created_at) DESC`,
      [employeeId, companyId]
    );
    return rows.map(Achievement.publicShape);
  },

  async create(employeeId, companyId, data) {
    const result = await query(
      `INSERT INTO achievements
        (employee_id, company_id, title, description, date, category, evidence_url)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [
        employeeId,
        companyId,
        normalize(data.title),
        data.description ?? null,
        data.date ?? null,
        data.category ?? 'other',
        data.evidence_url ?? null,
      ]
    );
    return result.insertId;
  },

  publicShape(a) {
    return {
      id: Number(a.id),
      employee_id: Number(a.employee_id),
      title: a.title,
      description: a.description,
      date: a.date,
      category: a.category,
      evidence_url: a.evidence_url,
      is_verified: toBool(a.is_verified),
      verification_date: a.verification_date,
    };
  },
};
