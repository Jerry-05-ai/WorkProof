// server/models/SavedCandidate.js
// Rewritten to call Firebase Data Connect instead of raw MySQL.

import { getDC } from '../config/dataconnect.js';
import {
  getSavedCandidate,
  listSavedCandidatesByRecruiter,
  saveCandidate,
  updateSavedCandidateNotes,
  deleteSavedCandidate,
} from '@dataconnect/admin-generated';
import { toBool } from '../utils/helpers.js';

export const SavedCandidate = {
  async save(recruiterId, employeeId, notes = null) {
    const { data } = await getSavedCandidate(getDC(), { recruiterId, employeeId });
    const existing = data.savedCandidates?.[0] ?? null;
    if (existing) {
      await updateSavedCandidateNotes(getDC(), { recruiterId, employeeId, notes });
      return existing._id;
    }
    const { data: created } = await saveCandidate(getDC(), { recruiterId, employeeId, notes });
    return created.savedCandidate_insert._id;
  },

  async unsave(recruiterId, employeeId) {
    const { data } = await getSavedCandidate(getDC(), { recruiterId, employeeId });
    const existing = data.savedCandidates?.[0] ?? null;
    if (!existing) return false;
    await deleteSavedCandidate(getDC(), { recruiterId, employeeId });
    return true;
  },

  async isSaved(recruiterId, employeeId) {
    const { data } = await getSavedCandidate(getDC(), { recruiterId, employeeId });
    return !!(data.savedCandidates?.length > 0);
  },

  async listForRecruiter(recruiterId) {
    const { data } = await listSavedCandidatesByRecruiter(getDC(), { recruiterId });
    return (data.savedCandidates || []).map((r) => ({
      saved_id: r._id,
      employee_id: r.employeeId,
      name: `${r.employee?.firstName ?? ''} ${r.employee?.lastName ?? ''}`.trim(),
      job_title: r.employee?.jobTitle ?? null,
      location: r.employee?.location ?? null,
      slug: null,
      is_public: false,
      notes: r.notes,
      saved_at: r.savedAt,
    }));
  },
};