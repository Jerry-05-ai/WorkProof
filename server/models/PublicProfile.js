// server/models/PublicProfile.js
// Rewritten to call Firebase Data Connect instead of raw MySQL.

import { getDC } from '../config/dataconnect.js';
import {
  getPublicProfileByEmployee,
  getPublicProfileBySlug,
  checkSlugExists,
  createPublicProfile,
  updatePublicProfileVisibility,
  incrementPublicProfileViews,
  listPerformanceReviews,
} from '@dataconnect/admin-generated';
import { Skill } from './Skill.js';
import { Project } from './Project.js';
import { Achievement } from './Achievement.js';
import { BehaviorRating } from './BehaviorRating.js';
import { MonthlyReport } from './MonthlyReport.js';
import { toBool, toFloatOrNull } from '../utils/helpers.js';

function shapePublicProfileRow(p) {
  if (!p) return null;
  return {
    id: p.id,
    employee_id: p.employeeId,
    company_id: p.companyId,
    slug: p.slug,
    is_public: p.isPublic,
    view_count: p.viewCount,
    last_viewed_at: p.lastViewedAt,
    created_at: p.createdAt,
  };
}

export const PublicProfile = {
  async findByEmployee(employeeId) {
    const { data } = await getPublicProfileByEmployee(getDC(), { employeeId });
    return shapePublicProfileRow(data.publicProfiles?.[0] ?? null);
  },

  async findBySlug(slug) {
    const { data } = await getPublicProfileBySlug(getDC(), { slug });
    return shapePublicProfileRow(data.publicProfiles?.[0] ?? null);
  },

  async _uniqueSlug(base) {
    let slug = String(base).toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
    if (!slug) slug = 'profile';
    let candidate = slug;
    let i = 1;
    // eslint-disable-next-line no-constant-condition
    while (true) {
      const { data } = await checkSlugExists(getDC(), { slug: candidate });
      if (!data.publicProfiles?.length) return candidate;
      i += 1;
      candidate = `${slug}-${i}`;
    }
  },

  async publish(employeeId, companyId, nameBase) {
    const existing = await PublicProfile.findByEmployee(employeeId);
    if (existing) {
      await updatePublicProfileVisibility(getDC(), { profileId: existing.id, isPublic: true });
      return PublicProfile.findByEmployee(employeeId);
    }
    const slug = await PublicProfile._uniqueSlug(nameBase);
    await createPublicProfile(getDC(), { employeeId, companyId, slug });
    return PublicProfile.findByEmployee(employeeId);
  },

  async unpublish(employeeId) {
    const existing = await PublicProfile.findByEmployee(employeeId);
    if (existing) {
      await updatePublicProfileVisibility(getDC(), { profileId: existing.id, isPublic: false });
    }
  },

  async incrementViews(employeeId) {
    const existing = await PublicProfile.findByEmployee(employeeId);
    if (existing) {
      await incrementPublicProfileViews(getDC(), {
        profileId: existing.id,
        viewCount: Number(existing.view_count ?? 0) + 1,
      });
    }
  },

  // Build the field-filtered public view based on privacy flags.
  // Accepts either snake_case (MySQL-shaped) or camelCase (Data Connect) employee rows.
  async buildPublicView(employee, privacy) {
    const employeeId = employee.id;
    const companyId = employee.company_id ?? employee.companyId;
    const flag = (k) => !!privacy[k] && privacy[k] !== 0 && privacy[k] !== '0';

    const firstName = employee.first_name ?? employee.firstName;
    const lastName = employee.last_name ?? employee.lastName;
    const jobTitle = employee.job_title ?? employee.jobTitle;
    const profilePhoto = employee.profile_photo ?? employee.profilePhoto;
    const department = employee.department;
    const startDate = employee.start_date ?? employee.startDate;
    const endDate = employee.end_date ?? employee.endDate;
    const location = employee.location;

    const view = { visibility: privacy.profile_visibility ?? 'private' };

    view.name = flag('name_public') ? `${firstName} ${lastName}`.trim() : null;
    view.photo = flag('photo_public') ? profilePhoto : null;
    view.role = flag('role_public') ? jobTitle : null;
    view.experience = flag('experience_public')
      ? {
          department,
          start_date: startDate,
          end_date: endDate,
          location,
        }
      : null;

    // Skills
    if (flag('skills_public')) {
      const skills = await Skill.listForEmployee(employeeId);
      view.skills = skills.map((s) => {
        const row = { name: s.name, category: s.category, is_verified: s.is_verified };
        if (flag('skill_levels_public')) row.proficiency_level = s.proficiency_level;
        if (flag('skill_growth_public')) row.initial_level = s.initial_level;
        return row;
      });
    } else {
      view.skills = null;
    }

    // Projects
    if (flag('projects_public')) {
      const projects = await Project.listForEmployee(employeeId, companyId);
      view.projects = projects.map((p) => {
        const row = {
          name: p.name,
          role: p.role,
          technologies: p.technologies,
          status: p.status,
          is_verified: p.is_verified,
        };
        if (flag('project_descriptions_public')) {
          row.description = p.description;
          row.contribution_summary = p.contribution_summary;
        }
        return row;
      });
    } else {
      view.projects = null;
    }

    // Achievements
    view.achievements = flag('achievements_public')
      ? await Achievement.listForEmployee(employeeId, companyId)
      : null;

    // Behavior summary
    view.behavior_summary = flag('behavior_summary_public')
      ? await BehaviorRating.summaryForEmployee(employeeId, companyId)
      : null;

    // Performance summary (computed from performance reviews)
    if (flag('performance_summary_public')) {
      const { data } = await listPerformanceReviews(getDC(), { employeeId, companyId });
      const reviews = data.performanceReviews || [];
      let avg = null;
      if (reviews.length) {
        const sum = reviews.reduce((acc, r) => acc + toFloatOrNull(r.rating) || 0, 0);
        avg = Math.round((sum / reviews.length) * 100) / 100;
      }
      view.performance_summary = {
        average_rating: avg,
        review_count: reviews.length,
      };
    } else {
      view.performance_summary = null;
    }

    // Monthly progress (reuse the converted MonthlyReport model)
    if (flag('monthly_progress_public')) {
      const reports = await MonthlyReport.listForEmployee(employeeId, companyId);
      view.monthly_progress = reports.slice(0, 12).map((r) => ({
        month: r.month,
        year: r.year,
        performance_score: r.performance_score,
        behavior_score: r.behavior_score,
        growth_percentage: r.growth_percentage,
        promotion_readiness: r.promotion_readiness,
      }));
    } else {
      view.monthly_progress = null;
    }

    return view;
  },

  publicShape(p) {
    return {
      employee_id: p.employee_id,
      slug: p.slug,
      is_public: toBool(p.is_public),
      view_count: Number(p.view_count ?? 0),
      last_viewed_at: p.last_viewed_at,
    };
  },
};