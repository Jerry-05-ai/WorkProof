// server/routes/index.js
// Central route table. Mirrors backend/index.php exactly: same methods, same
// paths, same role guards. Pattern routes use Express :params where PHP used regex.

import { Router } from 'express';
import { asyncHandler } from '../utils/helpers.js';
import { requireAuth, requireRole } from '../middleware/auth.js';

import * as auth from '../controllers/authController.js';
import * as companies from '../controllers/companiesController.js';
import * as company from '../controllers/companyController.js';
import * as internalProjects from '../controllers/internalProjectController.js';
import * as employee from '../controllers/employeeController.js';
import * as hiring from '../controllers/hiringController.js';
import * as recruiter from '../controllers/recruiterController.js';
import * as admin from '../controllers/adminController.js';
import * as notifications from '../controllers/notificationController.js';
import * as publicProfile from '../controllers/publicProfileController.js';

const router = Router();

const companyAdmin = requireRole(['company_admin', 'platform_admin']);
const employeeOnly = requireRole('employee');
const recruiterOnly = requireRole('recruiter');
const platformAdmin = requireRole('platform_admin');

// ---------------- Auth ----------------
router.post('/api/auth/login', asyncHandler(auth.login));
router.post('/api/auth/logout', asyncHandler(auth.logout));
router.get('/api/auth/me', requireAuth, asyncHandler(auth.me));

// ---------------- Companies (public registration) ----------------
router.post('/api/companies/register', asyncHandler(companies.register));
router.get('/api/companies/status', companyAdmin, asyncHandler(companies.status));

// ---------------- Company: invitations ----------------
router.post('/api/company/invitations', requireAuth, requireRole('company_admin'), asyncHandler(company.createInvitation));
router.get('/api/company/invitations/verify', asyncHandler(company.verifyInvitation)); // public (token)
router.post('/api/company/invitations/accept', asyncHandler(company.acceptInvitation)); // public (token)

// ---------------- Company: dashboard ----------------
router.get('/api/company/dashboard', companyAdmin, asyncHandler(company.dashboard));

// ---------------- Company: employees ----------------
router.get('/api/company/employees', companyAdmin, asyncHandler(company.listOrCreateEmployees));
router.post('/api/company/employees', companyAdmin, asyncHandler(company.listOrCreateEmployees));

// Sub-resources (declare BEFORE the /:id catch-all so they match first).
router.post('/api/company/employees/:id/skills', companyAdmin, asyncHandler(company.employeeSkills));
router.put('/api/company/employees/:id/skills/:skillId', companyAdmin, asyncHandler(company.employeeSkills));
router.post('/api/company/employees/:id/projects', companyAdmin, asyncHandler(company.employeeProjects));
router.put('/api/company/employees/:id/projects/:projectId', companyAdmin, asyncHandler(company.employeeProjects));
router.post('/api/company/employees/:id/achievements', companyAdmin, asyncHandler(company.employeeAchievements));
router.post('/api/company/employees/:id/behavior', companyAdmin, asyncHandler(company.employeeBehavior));
router.post('/api/company/employees/:id/performance-review', companyAdmin, asyncHandler(company.employeePerformanceReview));
router.post('/api/company/employees/:id/monthly-report', companyAdmin, asyncHandler(company.employeeMonthlyReport));
router.get('/api/company/employees/:id/reports', companyAdmin, asyncHandler(company.employeeMonthlyReport));
router.post('/api/company/employees/:id/verify-skill', companyAdmin, asyncHandler(company.verifySkill));
router.post('/api/company/employees/:id/verify', companyAdmin, asyncHandler(company.verifyEmployee));
router.post('/api/company/employees/:id/end-employment', companyAdmin, asyncHandler(company.endEmployment));

// Employee detail (catch-all numeric id) LAST.
router.get('/api/company/employees/:id', companyAdmin, asyncHandler(company.employeeDetail));
router.put('/api/company/employees/:id', companyAdmin, asyncHandler(company.employeeDetail));
router.delete('/api/company/employees/:id', companyAdmin, asyncHandler(company.employeeDetail));

// ---------------- Company: hiring (public candidates) ----------------
router.get('/api/company/candidates', companyAdmin, asyncHandler(hiring.searchCandidates));
router.get('/api/company/candidates/:employeeId', companyAdmin, asyncHandler(hiring.candidateProfile));
router.post('/api/company/candidates/:employeeId/hire', companyAdmin, asyncHandler(hiring.hireCandidate));

// ---------------- Company: correction workflow ----------------
router.post('/api/company/correction/request', companyAdmin, asyncHandler(company.correctionRequest));

// ---------------- Company: internal projects ----------------
// Specific paths (report) declared BEFORE the /:id catch-all so they match first.
router.get('/api/company/projects/report', companyAdmin, asyncHandler(internalProjects.report));
router.get('/api/company/projects', companyAdmin, asyncHandler(internalProjects.listOrCreate));
router.post('/api/company/projects', companyAdmin, asyncHandler(internalProjects.listOrCreate));
router.get('/api/company/projects/:id', companyAdmin, asyncHandler(internalProjects.detail));
router.put('/api/company/projects/:id', companyAdmin, asyncHandler(internalProjects.detail));
router.delete('/api/company/projects/:id', companyAdmin, asyncHandler(internalProjects.detail));

// ---------------- Employee ----------------
router.get('/api/employee/dashboard', employeeOnly, asyncHandler(employee.dashboard));
router.get('/api/employee/career-history', employeeOnly, asyncHandler(employee.careerHistory));
router.get('/api/employee/reports', employeeOnly, asyncHandler(employee.reports));
router.get('/api/employee/progress', employeeOnly, asyncHandler(employee.progress));
router.get('/api/employee/privacy', employeeOnly, asyncHandler(employee.privacy));
router.put('/api/employee/privacy', employeeOnly, asyncHandler(employee.privacy));
router.post('/api/employee/profile/publish', employeeOnly, asyncHandler(employee.publishProfile));
router.post('/api/employee/profile/unpublish', employeeOnly, asyncHandler(employee.publishProfile));
router.get('/api/employee/profile/public', employeeOnly, asyncHandler(employee.profilePublic));
router.get('/api/employee/corrections', employeeOnly, asyncHandler(employee.corrections));
router.post('/api/employee/corrections/:id/respond', employeeOnly, asyncHandler(employee.respondCorrection));
router.get('/api/employee/opportunities', employeeOnly, asyncHandler(employee.opportunities));
router.put('/api/employee/opportunities/:id/respond', employeeOnly, asyncHandler(employee.respondOpportunity));

// ---------------- Recruiter ----------------
router.get('/api/recruiter/talent', recruiterOnly, asyncHandler(recruiter.talent));
router.get('/api/recruiter/candidates/:id', recruiterOnly, asyncHandler(recruiter.candidateView));
router.get('/api/recruiter/save-candidate', recruiterOnly, asyncHandler(recruiter.saveCandidate));
router.post('/api/recruiter/save-candidate', recruiterOnly, asyncHandler(recruiter.saveCandidate));
router.delete('/api/recruiter/save-candidate/:id', recruiterOnly, asyncHandler(recruiter.saveCandidate));
router.get('/api/recruiter/opportunities', recruiterOnly, asyncHandler(recruiter.opportunities));
router.post('/api/recruiter/opportunities', recruiterOnly, asyncHandler(recruiter.opportunities));

// ---------------- Admin ----------------
router.get('/api/admin/dashboard', platformAdmin, asyncHandler(admin.dashboard));
// /companies/pending must precede the /:id/:action pattern (Express matches in order).
router.get('/api/admin/companies/pending', platformAdmin, asyncHandler(admin.companies));
router.get('/api/admin/companies', platformAdmin, asyncHandler(admin.companies));
router.post('/api/admin/companies/:id/:action', platformAdmin, asyncHandler(admin.companyAction));
router.get('/api/admin/analytics', platformAdmin, asyncHandler(admin.analytics));
router.get('/api/admin/audit-logs', platformAdmin, asyncHandler(admin.auditLogs));

// ---------------- Notifications ----------------
router.get('/api/notifications', requireAuth, asyncHandler(notifications.list));
router.put('/api/notifications/read-all', requireAuth, asyncHandler(notifications.markAllRead));
router.put('/api/notifications/:id/read', requireAuth, asyncHandler(notifications.markRead));

// ---------------- Public profile (no auth) ----------------
router.get('/api/profile/:slug', asyncHandler(publicProfile.view));

export default router;
