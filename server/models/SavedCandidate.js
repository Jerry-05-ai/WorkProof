// server/models/SavedCandidate.js
import { query, queryOne } from '../config/database.js';
import { toBool } from '../utils/helpers.js';

export const SavedCandidate = {
  async save(recruiterId, employeeId, notes = null) {
    const existing = await queryOne(
      'SELECT id FROM saved_candidates WHERE recruiter_id = ? AND employee_id = ? LIMIT 1',
      [recruiterId, employeeId]
    );
    if (existing) {
      await query('UPDATE saved_candidates SET notes = ? WHERE id = ?', [notes, existing.id]);
      return Number(existing.id);
    }
    const result = await query(
      'INSERT INTO saved_candidates (recruiter_id, employee_id, notes) VALUES (?, ?, ?)',
      [recruiterId, employeeId, notes]
    );
    return result.insertId;
  },

  async unsave(recruiterId, employeeId) {
    const result = await query(
      'DELETE FROM saved_candidates WHERE recruiter_id = ? AND employee_id = ?',
      [recruiterId, employeeId]
    );
    return result.affectedRows > 0;
  },

  async isSaved(recruiterId, employeeId) {
    const row = await queryOne(
      'SELECT 1 AS x FROM saved_candidates WHERE recruiter_id = ? AND employee_id = ? LIMIT 1',
      [recruiterId, employeeId]
    );
    return !!row;
  },

  async listForRecruiter(recruiterId) {
    const rows = await query(
      `SELECT sc.id AS saved_id, sc.notes, sc.saved_at,
              e.id AS employee_id, e.first_name, e.last_name, e.job_title, e.location,
              pp.slug, pp.is_public
       FROM saved_candidates sc
       JOIN employees e ON e.id = sc.employee_id
       LEFT JOIN public_profiles pp ON pp.employee_id = e.id
       WHERE sc.recruiter_id = ?
       ORDER BY sc.saved_at DESC`,
      [recruiterId]
    );
    return rows.map((r) => ({
      saved_id: Number(r.saved_id),
      employee_id: Number(r.employee_id),
      name: `${r.first_name} ${r.last_name}`.trim(),
      job_title: r.job_title,
      location: r.location,
      slug: r.slug,
      is_public: toBool(r.is_public),
      notes: r.notes,
      saved_at: r.saved_at,
    }));
  },
};
