// server/models/PrivacySettings.js
// Rewritten to call Firebase Data Connect instead of raw MySQL.

import { getDC } from '../config/dataconnect.js';
import {
  getPrivacyByEmployee,
  getEmployeeEmploymentStatus,
  createPrivacySettings as gqlCreatePrivacySettings,
  updatePrivacySettings,
  transferPrivacyOwnership,
  markPrivacyPublished,
} from '@dataconnect/admin-generated';
import { toBool } from '../utils/helpers.js';

export const PRIVACY_FIELD_FLAGS = [
  'name_public', 'photo_public', 'role_public',
  'skills_public', 'skill_levels_public', 'skill_growth_public',
  'projects_public', 'project_descriptions_public',
  'achievements_public', 'experience_public',
  'performance_summary_public', 'monthly_progress_public',
  'behavior_summary_public',
];

const FLAG_KEY_MAP = {
  name_public: 'namePublic',
  photo_public: 'photoPublic',
  role_public: 'rolePublic',
  skills_public: 'skillsPublic',
  skill_levels_public: 'skillLevelsPublic',
  skill_growth_public: 'skillGrowthPublic',
  projects_public: 'projectsPublic',
  project_descriptions_public: 'projectDescriptionsPublic',
  achievements_public: 'achievementsPublic',
  experience_public: 'experiencePublic',
  performance_summary_public: 'performanceSummaryPublic',
  monthly_progress_public: 'monthlyProgressPublic',
  behavior_summary_public: 'behaviorSummaryPublic',
};

export const PrivacySettings = {
  FIELD_FLAGS: PRIVACY_FIELD_FLAGS,

  // Returns the merged (employee status + privacy row) shape expected by the
  // rest of the app: same snake_case keys as the old MySQL LEFT JOIN result.
  async findByEmployee(employeeId) {
    const { data: privacyData } = await getPrivacyByEmployee(getDC(), { employeeId });
    const privacy = (privacyData.privacySettings || []).find((p) => p.employeeId === employeeId) ?? null;

    const { data: empData } = await getEmployeeEmploymentStatus(getDC(), { employeeId });
    const emp = empData.employee ?? null;

    return {
      privacy_id: privacy?.id ?? null,
      ...(privacy
        ? {
            employee_id: privacy.employeeId,
            company_id: privacy.companyId,
            profile_visibility: privacy.profileVisibility,
            is_employee_controlled: privacy.isEmployeeControlled,
            ownership_transferred_at: privacy.ownershipTransferredAt,
            published_at: privacy.publishedAt,
            name_public: privacy.namePublic,
            photo_public: privacy.photoPublic,
            role_public: privacy.rolePublic,
            skills_public: privacy.skillsPublic,
            skill_levels_public: privacy.skillLevelsPublic,
            skill_growth_public: privacy.skillGrowthPublic,
            projects_public: privacy.projectsPublic,
            project_descriptions_public: privacy.projectDescriptionsPublic,
            achievements_public: privacy.achievementsPublic,
            experience_public: privacy.experiencePublic,
            performance_summary_public: privacy.performanceSummaryPublic,
            monthly_progress_public: privacy.monthlyProgressPublic,
            behavior_summary_public: privacy.behaviorSummaryPublic,
          }
        : {}),
      employment_status: emp?.employmentStatus ?? null,
    };
  },

  async ensure(employeeId, companyId) {
    const existing = await PrivacySettings.findByEmployee(employeeId);
    if (existing && existing.privacy_id) return existing;
    await gqlCreatePrivacySettings(getDC(), {
      employeeId,
      companyId,
      profileVisibility: 'private',
    });
    return PrivacySettings.findByEmployee(employeeId);
  },

  async update(employeeId, data) {
    const updateData = {};

    if (Object.prototype.hasOwnProperty.call(data, 'profile_visibility')) {
      const valid = ['private', 'public', 'limited'];
      if (valid.includes(data.profile_visibility)) {
        updateData.profileVisibility = data.profile_visibility;
      }
    }
    for (const flag of PRIVACY_FIELD_FLAGS) {
      if (Object.prototype.hasOwnProperty.call(data, flag)) {
        updateData[FLAG_KEY_MAP[flag]] = data[flag] ? true : false;
      }
    }
    if (Object.keys(updateData).length > 0) {
      const existing = await PrivacySettings.findByEmployee(employeeId);
      if (!existing?.privacy_id) return;
      await updatePrivacySettings(getDC(), { privacyId: existing.privacy_id, ...updateData });
    }
  },

  async transferOwnership(employeeId, companyId) {
    await PrivacySettings.ensure(employeeId, companyId);
    const existing = await PrivacySettings.findByEmployee(employeeId);
    if (!existing?.privacy_id) return;
    await transferPrivacyOwnership(getDC(), { privacyId: existing.privacy_id });
  },

  async isEmployeeControlled(employeeId) {
    const row = await PrivacySettings.findByEmployee(employeeId);
    if (!row) return false;
    return row.employment_status !== 'active' || toBool(row.is_employee_controlled);
  },

  async markPublished(employeeId) {
    const existing = await PrivacySettings.findByEmployee(employeeId);
    if (!existing?.privacy_id) return;
    await markPrivacyPublished(getDC(), { privacyId: existing.privacy_id });
  },

  publicShape(p) {
    const isControlled = p.employment_status !== 'active' || toBool(p.is_employee_controlled);
    const out = {
      employee_id: p.employee_id,
      profile_visibility: p.profile_visibility || 'private',
      is_employee_controlled: isControlled,
      ownership_transferred_at: p.ownership_transferred_at,
      published_at: p.published_at,
    };
    for (const flag of PRIVACY_FIELD_FLAGS) {
      out[flag] = toBool(p[flag]);
    }
    return out;
  },
};