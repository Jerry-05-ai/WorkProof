// server/models/Achievement.js
// Rewritten to call Firebase Data Connect (generated admin SDK) instead of raw MySQL.

import { getDC } from '../config/dataconnect.js';
import {
  listAchievements,
  createAchievement as gqlCreateAchievement,
} from '@dataconnect/admin-generated';
import { normalize, toBool } from '../utils/helpers.js';

export const Achievement = {
  async listForEmployee(employeeId, companyId) {
    const { data } = await listAchievements(getDC(), { employeeId, companyId });
    return (data.achievements || []).map(Achievement.publicShape);
  },

  async create(employeeId, companyId, data) {
    const { data: result } = await gqlCreateAchievement(getDC(), {
      employeeId,
      companyId,
      title: normalize(data.title),
      description: data.description ?? null,
      date: data.date ?? null,
      category: data.category ?? 'other',
      evidenceUrl: data.evidence_url ?? null,
    });
    return result.achievement_insert.id;
  },

  publicShape(a) {
    return {
      id: a.id,
      employee_id: a.employeeId,
      title: a.title,
      description: a.description,
      date: a.date,
      category: a.category,
      evidence_url: a.evidenceUrl,
      is_verified: toBool(a.isVerified),
      verification_date: a.verificationDate,
    };
  },
};