// server/models/PerformanceReview.js
// Rewritten to call Firebase Data Connect instead of raw MySQL.

import { getDC } from '../config/dataconnect.js';
import {
  listPerformanceReviews,
  getLatestPerformanceReview,
  createPerformanceReview as gqlCreatePerformanceReview,
} from '@dataconnect/admin-generated';
import { toFloatOrNull } from '../utils/helpers.js';

export const PerformanceReview = {
  async listForEmployee(employeeId, companyId) {
    const { data } = await listPerformanceReviews(getDC(), { employeeId, companyId });
    return (data.performanceReviews || []).map((r) => PerformanceReview.publicShape({
      ...r,
      reviewer_name: r.reviewer?.fullName ?? null,
    }));
  },

  async latestForEmployee(employeeId, companyId) {
    const { data } = await getLatestPerformanceReview(getDC(), { employeeId, companyId });
    return data.performanceReviews?.[0] ?? null;
  },

  async create(employeeId, companyId, reviewerId, data) {
    const { data: result } = await gqlCreatePerformanceReview(getDC(), {
      employeeId,
      companyId,
      reviewerId,
      period: data.period ?? new Date().toISOString().slice(0, 7),
      rating: toFloatOrNull(data.rating) ?? 0,
      comments: data.comments ?? null,
      strengths: data.strengths ?? null,
      areasForImprovement: data.areas_for_improvement ?? null,
      goalsCompleted: parseInt(data.goals_completed ?? 0, 10),
      goalsPending: parseInt(data.goals_pending ?? 0, 10),
    });
    return result.performanceReview_insert.id;
  },

  publicShape(r) {
    return {
      id: r.id,
      employee_id: r.employeeId,
      reviewer_id: r.reviewerId,
      reviewer_name: r.reviewer_name ?? null,
      period: r.period,
      rating: toFloatOrNull(r.rating),
      comments: r.comments,
      strengths: r.strengths,
      areas_for_improvement: r.areasForImprovement,
      goals_completed: parseInt(r.goalsCompleted ?? 0, 10),
      goals_pending: parseInt(r.goalsPending ?? 0, 10),
      review_date: r.reviewDate,
    };
  },
};