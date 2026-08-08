// server/models/BehaviorRating.js
import { query } from '../config/database.js';

export const BEHAVIOR_CATEGORIES = [
  'collaboration', 'communication', 'reliability', 'leadership',
  'problem_solving', 'adaptability', 'professional_growth',
];

export const BehaviorRating = {
  CATEGORIES: BEHAVIOR_CATEGORIES,

  async listForEmployee(employeeId, companyId) {
    const rows = await query(
      `SELECT * FROM employee_behavior_ratings
       WHERE employee_id = ? AND company_id = ?
       ORDER BY review_date DESC, id DESC`,
      [employeeId, companyId]
    );
    return rows.map(BehaviorRating.publicShape);
  },

  async create(employeeId, companyId, reviewerId, data) {
    const result = await query(
      `INSERT INTO employee_behavior_ratings
        (employee_id, company_id, category, rating, reviewer_id, review_date, comments)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [
        employeeId,
        companyId,
        data.category,
        parseInt(data.rating, 10),
        reviewerId,
        data.review_date ?? new Date().toISOString().slice(0, 10),
        data.comments ?? null,
      ]
    );
    return result.insertId;
  },

  // Latest rating per category + overall behavior score (average of categories).
  async summaryForEmployee(employeeId, companyId) {
    const rows = await query(
      `SELECT r.category, r.rating, r.review_date
       FROM employee_behavior_ratings r
       WHERE r.employee_id = ? AND r.company_id = ?
         AND r.id = (
           SELECT r2.id FROM employee_behavior_ratings r2
           WHERE r2.employee_id = r.employee_id
             AND r2.company_id = r.company_id
             AND r2.category = r.category
           ORDER BY r2.review_date DESC, r2.id DESC
           LIMIT 1
         )`,
      [employeeId, companyId]
    );

    const byCategory = {};
    for (const row of rows) {
      byCategory[row.category] = parseInt(row.rating, 10);
    }

    let score = null;
    const keys = Object.keys(byCategory);
    if (keys.length) {
      const sum = keys.reduce((acc, k) => acc + byCategory[k], 0);
      score = Math.round((sum / keys.length) * 100) / 100;
    }

    return {
      by_category: byCategory,
      behavior_score: score,
      rated_count: keys.length,
    };
  },

  publicShape(r) {
    return {
      id: Number(r.id),
      employee_id: Number(r.employee_id),
      category: r.category,
      rating: parseInt(r.rating, 10),
      reviewer_id: Number(r.reviewer_id),
      review_date: r.review_date,
      comments: r.comments,
    };
  },
};
