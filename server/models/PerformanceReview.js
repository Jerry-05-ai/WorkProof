// server/models/PerformanceReview.js
import { query } from '../config/database.js';
import { toFloatOrNull } from '../utils/helpers.js';

export const PerformanceReview = {
  async listForEmployee(employeeId, companyId) {
    const rows = await query(
      `SELECT pr.*, u.full_name AS reviewer_name
       FROM performance_reviews pr
       LEFT JOIN users u ON u.id = pr.reviewer_id
       WHERE pr.employee_id = ? AND pr.company_id = ?
       ORDER BY pr.review_date DESC`,
      [employeeId, companyId]
    );
    return rows.map(PerformanceReview.publicShape);
  },

  async create(employeeId, companyId, reviewerId, data) {
    const result = await query(
      `INSERT INTO performance_reviews
        (employee_id, company_id, reviewer_id, period, rating, comments, strengths, areas_for_improvement, goals_completed, goals_pending)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        employeeId,
        companyId,
        reviewerId,
        data.period ?? new Date().toISOString().slice(0, 7),
        data.rating,
        data.comments ?? null,
        data.strengths ?? null,
        data.areas_for_improvement ?? null,
        parseInt(data.goals_completed ?? 0, 10),
        parseInt(data.goals_pending ?? 0, 10),
      ]
    );
    return result.insertId;
  },

  publicShape(r) {
    return {
      id: Number(r.id),
      employee_id: Number(r.employee_id),
      reviewer_id: Number(r.reviewer_id),
      reviewer_name: r.reviewer_name ?? null,
      period: r.period,
      rating: toFloatOrNull(r.rating),
      comments: r.comments,
      strengths: r.strengths,
      areas_for_improvement: r.areas_for_improvement,
      goals_completed: parseInt(r.goals_completed, 10),
      goals_pending: parseInt(r.goals_pending, 10),
      review_date: r.review_date,
    };
  },
};
