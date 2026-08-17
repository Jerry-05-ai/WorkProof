// server/models/BehaviorRating.js
// Rewritten to call Firebase Data Connect instead of raw MySQL.

import { getDC } from '../config/dataconnect.js';
import {
  listBehaviorRatings,
  latestBehaviorRatings,
  createBehaviorRating as gqlCreateBehaviorRating,
} from '@dataconnect/admin-generated';

export const BEHAVIOR_CATEGORIES = [
  'collaboration', 'communication', 'reliability', 'leadership',
  'problem_solving', 'adaptability', 'professional_growth',
];

export const BehaviorRating = {
  CATEGORIES: BEHAVIOR_CATEGORIES,

  async listForEmployee(employeeId, companyId) {
    const { data } = await listBehaviorRatings(getDC(), { employeeId, companyId });
    return (data.employeeBehaviorRatings || []).map(BehaviorRating.publicShape);
  },

  async create(employeeId, companyId, reviewerId, data) {
    const { data: result } = await gqlCreateBehaviorRating(getDC(), {
      employeeId,
      companyId,
      category: data.category,
      rating: parseInt(data.rating, 10),
      reviewerId,
      reviewDate: data.review_date ?? new Date().toISOString().slice(0, 10),
      comments: data.comments ?? null,
    });
    return result.employeeBehaviorRating_insert.id;
  },

  // Latest rating per category + overall behavior score (average of categories).
  async summaryForEmployee(employeeId, companyId) {
    const { data } = await latestBehaviorRatings(getDC(), { employeeId, companyId });
    const rows = data.employeeBehaviorRatings || [];

    // Emulate MySQL's "latest per category" (ORDER BY review_date DESC, id DESC
    // then pick first per category, since Data Connect can't do DISTINCT ON).
    const byCategory = {};
    for (const row of rows) {
      if (!(row.category in byCategory)) {
        byCategory[row.category] = parseInt(row.rating, 10);
      }
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
      id: r.id,
      employee_id: r.employeeId,
      category: r.category,
      rating: parseInt(r.rating, 10),
      reviewer_id: r.reviewerId,
      review_date: r.reviewDate,
      comments: r.comments,
    };
  },
};