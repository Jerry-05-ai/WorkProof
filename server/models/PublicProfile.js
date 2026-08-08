// server/models/PublicProfile.js
import { query, queryOne } from '../config/database.js';
import { toBool, toFloatOrNull } from '../utils/helpers.js';
import { Skill } from './Skill.js';
import { Project } from './Project.js';
import { Achievement } from './Achievement.js';
import { BehaviorRating } from './BehaviorRating.js';

export const PublicProfile = {
  async findByEmployee(employeeId) {
    return queryOne('SELECT * FROM public_profiles WHERE employee_id = ? LIMIT 1', [employeeId]);
  },

  async findBySlug(slug) {
    return queryOne('SELECT * FROM public_profiles WHERE slug = ? LIMIT 1', [slug]);
  },

  async _uniqueSlug(base) {
    let slug = String(base).toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
    if (!slug) slug = 'profile';
    let candidate = slug;
    let i = 1;
    // eslint-disable-next-line no-constant-condition
    while (true) {
      const row = await queryOne('SELECT 1 AS x FROM public_profiles WHERE slug = ? LIMIT 1', [candidate]);
      if (!row) return candidate;
      i += 1;
      candidate = `${slug}-${i}`;
    }
  },

  async publish(employeeId, companyId, nameBase) {
    const existing = await PublicProfile.findByEmployee(employeeId);
    if (existing) {
      await query('UPDATE public_profiles SET is_public = 1 WHERE employee_id = ?', [employeeId]);
      return PublicProfile.findByEmployee(employeeId);
    }
    const slug = await PublicProfile._uniqueSlug(nameBase);
    await query(
      `INSERT INTO public_profiles (employee_id, company_id, slug, is_public)
       VALUES (?, ?, ?, 1)`,
      [employeeId, companyId, slug]
    );
    return PublicProfile.findByEmployee(employeeId);
  },

  async unpublish(employeeId) {
    await query('UPDATE public_profiles SET is_public = 0 WHERE employee_id = ?', [employeeId]);
  },

  async incrementViews(employeeId) {
    await query(
      `UPDATE public_profiles SET view_count = view_count + 1, last_viewed_at = NOW()
       WHERE employee_id = ?`,
      [employeeId]
    );
  },

  // Build the field-filtered public view based on privacy flags.
  async buildPublicView(employee, privacy) {
    const employeeId = Number(employee.id);
    const companyId = Number(employee.company_id);
    const flag = (k) => !!privacy[k] && privacy[k] !== 0 && privacy[k] !== '0';

    const view = { visibility: privacy.profile_visibility ?? 'private' };

    view.name = flag('name_public') ? `${employee.first_name} ${employee.last_name}`.trim() : null;
    view.photo = flag('photo_public') ? employee.profile_photo : null;
    view.role = flag('role_public') ? employee.job_title : null;
    view.experience = flag('experience_public')
      ? {
          department: employee.department,
          start_date: employee.start_date,
          end_date: employee.end_date,
          location: employee.location,
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

    // Performance summary
    if (flag('performance_summary_public')) {
      const perf = await queryOne(
        `SELECT AVG(rating) AS avg_rating, COUNT(*) AS review_count
         FROM performance_reviews WHERE employee_id = ? AND company_id = ?`,
        [employeeId, companyId]
      );
      view.performance_summary = {
        average_rating: perf && perf.avg_rating !== null ? Math.round(parseFloat(perf.avg_rating) * 100) / 100 : null,
        review_count: perf ? Number(perf.review_count) : 0,
      };
    } else {
      view.performance_summary = null;
    }

    // Monthly progress
    if (flag('monthly_progress_public')) {
      const rows = await query(
        `SELECT month, year, performance_score, behavior_score, growth_percentage, promotion_readiness
         FROM monthly_progress_reports
         WHERE employee_id = ? AND company_id = ?
         ORDER BY year DESC, month DESC LIMIT 12`,
        [employeeId, companyId]
      );
      view.monthly_progress = rows.map((r) => ({
        month: r.month,
        year: Number(r.year),
        performance_score: toFloatOrNull(r.performance_score),
        behavior_score: toFloatOrNull(r.behavior_score),
        growth_percentage: toFloatOrNull(r.growth_percentage),
        promotion_readiness: toFloatOrNull(r.promotion_readiness),
      }));
    } else {
      view.monthly_progress = null;
    }

    return view;
  },

  publicShape(p) {
    return {
      employee_id: Number(p.employee_id),
      slug: p.slug,
      is_public: toBool(p.is_public),
      view_count: Number(p.view_count),
      last_viewed_at: p.last_viewed_at,
    };
  },
};
