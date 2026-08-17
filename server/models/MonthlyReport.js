// server/models/MonthlyReport.js
// Rewritten to call Firebase Data Connect instead of raw MySQL.

import { getDC } from '../config/dataconnect.js';
import {
  listMonthlyReports,
  getMonthlyReportByKey,
  createMonthlyReport,
  updateMonthlyReport,
  listSkillsByEmployee,
  latestBehaviorRatings,
  listProjectsByEmployee,
  getLatestPerformanceReview,
  getEmployeeById,
} from '@dataconnect/admin-generated';
import { toFloatOrNull, toBool } from '../utils/helpers.js';

const round2 = (n) => Math.round(n * 100) / 100;

function safeParse(value, fallback) {
  if (value === null || value === undefined) return fallback;
  if (typeof value === 'object') return value;
  try {
    return JSON.parse(value);
  } catch {
    return fallback;
  }
}

export const MonthlyReport = {
  async listForEmployee(employeeId, companyId) {
    const { data } = await listMonthlyReports(getDC(), { employeeId, companyId });
    return (data.monthlyProgressReports || []).map(MonthlyReport.publicShape);
  },

  async findExisting(employeeId, companyId, month, year) {
    const { data } = await getMonthlyReportByKey(getDC(), { employeeId, companyId, month, year });
    return data.monthlyProgressReports?.[0] ?? null;
  },

  // Generate a monthly report using rule-based calculations (faithful port).
  async generate(employeeId, companyId, month, year, isAiGenerated = false) {
    // 1. Skills growth — fetch employee skills with nested skill name/category.
    const { data: skillsData } = await listSkillsByEmployee(getDC(), { employeeId });
    const skills = skillsData.employeeSkills || [];

    const levelMap = { beginner: 1, intermediate: 2, advanced: 3, expert: 4 };
    let totalGrowth = 0;
    const skillCount = skills.length;
    const skillsImproved = [];
    const skillsNeeding = [];

    for (const s of skills) {
      const current = levelMap[s.proficiencyLevel] ?? 1;
      const initial = levelMap[s.initialLevel] ?? current;
      const growth = current - initial;
      totalGrowth += growth;
      if (growth > 0) skillsImproved.push({ level: s.proficiencyLevel, growth });
      if (current < 4) skillsNeeding.push({ level: s.proficiencyLevel, gap: 4 - current });
    }

    const skillsGrowthScore = skillCount > 0 ? (totalGrowth / skillCount) * 25 : 0;

    // 2. Behavior score — use the latest ratings query (which returns rows
    //    ordered by review_date DESC, id DESC; we filter to the period below).
    //    Data Connect can't do DATE_FORMAT, so we filter in JS by month prefix.
    const period = `${String(year).padStart(4, '0')}-${String(parseInt(month, 10)).padStart(2, '0')}`;
    const { data: behaviorData } = await latestBehaviorRatings(getDC(), { employeeId, companyId });
    const allBehaviors = behaviorData.employeeBehaviorRatings || [];
    const behaviors = allBehaviors.filter((b) => {
      const d = b.reviewDate ? String(b.reviewDate) : '';
      return d.startsWith(period);
    });

    let behaviorScore = 0;
    if (behaviors.length) {
      const total = behaviors.reduce((acc, b) => acc + parseInt(b.rating, 10), 0);
      behaviorScore = (total / behaviors.length) * 20;
    }

    // 3. Projects completed / in progress
    const { data: projectsData } = await listProjectsByEmployee(getDC(), { employeeId, companyId });
    const projectRows = projectsData.projects || [];
    let projectsCompleted = 0;
    let projectsInProgress = 0;
    for (const ps of projectRows) {
      if (ps.status === 'completed') projectsCompleted += 1;
      if (ps.status === 'in_progress') projectsInProgress += 1;
    }

    // 4. Manager rating (latest performance review)
    const { data: reviewData } = await getLatestPerformanceReview(getDC(), { employeeId, companyId });
    const latestReview = reviewData.performanceReviews?.[0] ?? null;
    const latestReviewRating = latestReview ? toFloatOrNull(latestReview.rating) : null;
    const managerRating = latestReviewRating !== null ? latestReviewRating * 20 : 0;

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
      const { data: empData } = await getEmployeeById(getDC(), { id: employeeId });
      const emp = empData.employee;
      const currentTitle = emp?.jobTitle ?? null;
      if (currentTitle) nextRole = `Senior ${currentTitle}`;
    }

    const reportData = {
      skills_count: skillCount,
      skills_growth_score: round2(skillsGrowthScore),
      behavior_score_raw: behaviorScore > 0 ? round2(behaviorScore / 20) : null,
      manager_rating_raw: latestReviewRating !== null ? latestReviewRating : null,
      project_score: round2(projectScore),
      tech_score: round2(techScore),
      leadership_score: round2(leadershipScore),
      communication_score: round2(commScore),
      delivery_score: round2(deliveryScore),
    };

    const existing = await MonthlyReport.findExisting(employeeId, companyId, month, year);
    if (existing) {
      await updateMonthlyReport(getDC(), {
        id: existing.id,
        performanceScore: round2(overallPerformance),
        behaviorScore: round2(behaviorScore),
        skillsImproved: JSON.stringify(skillsImproved),
        skillsNeedingDevelopment: JSON.stringify(skillsNeeding),
        projectsCompleted,
        projectsInProgress,
        goalsCompleted: 0,
        goalsPending: 0,
        growthPercentage: round2(growthPercentage),
        promotionReadiness: round2(promotionReadiness),
        nextRole,
        isAiGenerated: isAiGenerated ? true : false,
        reportData: JSON.stringify(reportData),
      });
      return existing.id;
    }

    const { data: created } = await createMonthlyReport(getDC(), {
      employeeId,
      companyId,
      month,
      year,
      performanceScore: round2(overallPerformance),
      behaviorScore: round2(behaviorScore),
      skillsImproved: JSON.stringify(skillsImproved),
      skillsNeedingDevelopment: JSON.stringify(skillsNeeding),
      projectsCompleted,
      projectsInProgress,
      goalsCompleted: 0,
      goalsPending: 0,
      growthPercentage: round2(growthPercentage),
      promotionReadiness: round2(promotionReadiness),
      nextRole,
      isAiGenerated: isAiGenerated ? true : false,
      reportData: JSON.stringify(reportData),
    });
    return created.monthlyProgressReport_insert.id;
  },

  publicShape(r) {
    return {
      id: r.id,
      employee_id: r.employeeId,
      month: r.month,
      year: Number(r.year),
      performance_score: toFloatOrNull(r.performanceScore),
      behavior_score: toFloatOrNull(r.behaviorScore),
      skills_improved: safeParse(r.skillsImproved, []),
      skills_needing_development: safeParse(r.skillsNeedingDevelopment, []),
      projects_completed: parseInt(r.projectsCompleted ?? 0, 10),
      projects_in_progress: parseInt(r.projectsInProgress ?? 0, 10),
      growth_percentage: toFloatOrNull(r.growthPercentage),
      promotion_readiness: toFloatOrNull(r.promotionReadiness),
      next_role: r.nextRole,
      is_ai_generated: toBool(r.isAiGenerated),
      report_data: safeParse(r.reportData, {}),
      generated_date: r.generatedDate,
    };
  },
};