// server/models/MonthlyReport.js
import { query, queryOne } from '../config/database.js';
import { toFloatOrNull, toBool } from '../utils/helpers.js';

const round2 = (n) => Math.round(n * 100) / 100;

function safeParse(value, fallback) {
  if (value === null || value === undefined) return fallback;
  if (typeof value === 'object') return value; // mysql2 may already parse JSON columns
  try {
    return JSON.parse(value);
  } catch {
    return fallback;
  }
}

export const MonthlyReport = {
  async listForEmployee(employeeId, companyId) {
    const rows = await query(
      `SELECT * FROM monthly_progress_reports
       WHERE employee_id = ? AND company_id = ?
       ORDER BY year DESC, month DESC`,
      [employeeId, companyId]
    );
    return rows.map(MonthlyReport.publicShape);
  },

  async findExisting(employeeId, companyId, month, year) {
    return queryOne(
      `SELECT * FROM monthly_progress_reports
       WHERE employee_id = ? AND company_id = ? AND month = ? AND year = ?
       LIMIT 1`,
      [employeeId, companyId, month, year]
    );
  },

  // Generate a monthly report using rule-based calculations (faithful port).
  async generate(employeeId, companyId, month, year, isAiGenerated = false) {
    // 1. Skills growth
    const skills = await query(
      `SELECT es.proficiency_level, es.initial_level, es.years_experience
       FROM employee_skills es
       JOIN employees e ON e.id = es.employee_id
       WHERE es.employee_id = ? AND e.company_id = ?`,
      [employeeId, companyId]
    );

    const levelMap = { beginner: 1, intermediate: 2, advanced: 3, expert: 4 };
    let totalGrowth = 0;
    const skillCount = skills.length;
    const skillsImproved = [];
    const skillsNeeding = [];

    for (const s of skills) {
      const current = levelMap[s.proficiency_level] ?? 1;
      const initial = levelMap[s.initial_level] ?? current;
      const growth = current - initial;
      totalGrowth += growth;
      if (growth > 0) skillsImproved.push({ level: s.proficiency_level, growth });
      if (current < 4) skillsNeeding.push({ level: s.proficiency_level, gap: 4 - current });
    }

    const skillsGrowthScore = skillCount > 0 ? (totalGrowth / skillCount) * 25 : 0;

    // 2. Behavior score (for this period)
    const period = `${String(year).padStart(4, '0')}-${String(parseInt(month, 10)).padStart(2, '0')}`;
    const behaviors = await query(
      `SELECT category, rating
       FROM employee_behavior_ratings
       WHERE employee_id = ? AND company_id = ?
         AND DATE_FORMAT(review_date, '%Y-%m') = ?`,
      [employeeId, companyId, period]
    );

    let behaviorScore = 0;
    if (behaviors.length) {
      const total = behaviors.reduce((acc, b) => acc + parseInt(b.rating, 10), 0);
      behaviorScore = (total / behaviors.length) * 20;
    }

    // 3. Projects completed / in progress
    const projectStats = await query(
      `SELECT status, COUNT(*) AS cnt
       FROM projects
       WHERE employee_id = ? AND company_id = ?
       GROUP BY status`,
      [employeeId, companyId]
    );
    let projectsCompleted = 0;
    let projectsInProgress = 0;
    for (const ps of projectStats) {
      if (ps.status === 'completed') projectsCompleted = parseInt(ps.cnt, 10);
      if (ps.status === 'in_progress') projectsInProgress = parseInt(ps.cnt, 10);
    }

    // 4. Manager rating (latest performance review)
    const latestReviewRow = await queryOne(
      `SELECT rating FROM performance_reviews
       WHERE employee_id = ? AND company_id = ?
       ORDER BY review_date DESC LIMIT 1`,
      [employeeId, companyId]
    );
    const latestReview = latestReviewRow ? parseFloat(latestReviewRow.rating) : null;
    const managerRating = latestReview !== null ? latestReview * 20 : 0;

    // 5. Overall performance
    const projectScore = projectsCompleted > 0 ? Math.min(100, projectsCompleted * 20) : 0;
    const overallPerformance =
      skillsGrowthScore * 0.2 + projectScore * 0.3 + behaviorScore * 0.2 + managerRating * 0.3;

    // 6. Promotion readiness
    const techScore = skillCount > 0 ? Math.min(100, (skillCount / 5) * 100) : 0;
    let leadershipScore = 0;
    let commScore = 0;
    const deliveryScore = projectsCompleted > 0 ? Math.min(100, projectsCompleted * 25) : 0;
    for (const b of behaviors) {
      if (b.category === 'leadership') leadershipScore = parseInt(b.rating, 10) * 20;
      if (b.category === 'communication') commScore = parseInt(b.rating, 10) * 20;
    }
    const promotionReadiness =
      techScore * 0.3 + leadershipScore * 0.25 + commScore * 0.2 + deliveryScore * 0.25;

    // 7. Growth percentage
    const growthPercentage = skillsGrowthScore;

    // 8. Next role suggestion
    let nextRole = null;
    if (promotionReadiness >= 70 && employeeId) {
      const titleRow = await queryOne('SELECT job_title FROM employees WHERE id = ?', [employeeId]);
      const currentTitle = titleRow ? titleRow.job_title : null;
      if (currentTitle) nextRole = `Senior ${currentTitle}`;
    }

    const reportData = {
      skills_count: skillCount,
      skills_growth_score: round2(skillsGrowthScore),
      behavior_score_raw: behaviorScore > 0 ? round2(behaviorScore / 20) : null,
      manager_rating_raw: latestReview !== null ? latestReview : null,
      project_score: round2(projectScore),
      tech_score: round2(techScore),
      leadership_score: round2(leadershipScore),
      communication_score: round2(commScore),
      delivery_score: round2(deliveryScore),
    };

    const existing = await MonthlyReport.findExisting(employeeId, companyId, month, year);
    if (existing) {
      await query(
        `UPDATE monthly_progress_reports SET
            performance_score = ?, behavior_score = ?,
            skills_improved = ?, skills_needing_development = ?,
            projects_completed = ?, projects_in_progress = ?,
            goals_completed = ?, goals_pending = ?,
            growth_percentage = ?, promotion_readiness = ?,
            next_role = ?, is_ai_generated = ?,
            report_data = ?, generated_date = NOW()
         WHERE id = ?`,
        [
          round2(overallPerformance),
          round2(behaviorScore),
          JSON.stringify(skillsImproved),
          JSON.stringify(skillsNeeding),
          projectsCompleted,
          projectsInProgress,
          0, 0,
          round2(growthPercentage),
          round2(promotionReadiness),
          nextRole,
          isAiGenerated ? 1 : 0,
          JSON.stringify(reportData),
          Number(existing.id),
        ]
      );
      return Number(existing.id);
    }

    const result = await query(
      `INSERT INTO monthly_progress_reports
        (employee_id, company_id, month, year, performance_score, behavior_score,
         skills_improved, skills_needing_development, projects_completed, projects_in_progress,
         growth_percentage, promotion_readiness, next_role, is_ai_generated, report_data, generated_date)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW())`,
      [
        employeeId,
        companyId,
        month,
        year,
        round2(overallPerformance),
        round2(behaviorScore),
        JSON.stringify(skillsImproved),
        JSON.stringify(skillsNeeding),
        projectsCompleted,
        projectsInProgress,
        round2(growthPercentage),
        round2(promotionReadiness),
        nextRole,
        isAiGenerated ? 1 : 0,
        JSON.stringify(reportData),
      ]
    );
    return result.insertId;
  },

  publicShape(r) {
    return {
      id: Number(r.id),
      employee_id: Number(r.employee_id),
      month: r.month,
      year: Number(r.year),
      performance_score: toFloatOrNull(r.performance_score),
      behavior_score: toFloatOrNull(r.behavior_score),
      skills_improved: safeParse(r.skills_improved, []),
      skills_needing_development: safeParse(r.skills_needing_development, []),
      projects_completed: parseInt(r.projects_completed, 10),
      projects_in_progress: parseInt(r.projects_in_progress, 10),
      growth_percentage: toFloatOrNull(r.growth_percentage),
      promotion_readiness: toFloatOrNull(r.promotion_readiness),
      next_role: r.next_role,
      is_ai_generated: toBool(r.is_ai_generated),
      report_data: safeParse(r.report_data, {}),
      generated_date: r.generated_date,
    };
  },
};
