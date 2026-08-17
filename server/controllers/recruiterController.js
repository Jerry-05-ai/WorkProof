// server/controllers/recruiterController.js
// Rewritten to use Firebase Data Connect models instead of raw MySQL.

import { getDC } from '../config/dataconnect.js';
import { listPublicProfiles, getEmployeeById } from '@dataconnect/admin-generated';
import { PrivacySettings } from '../models/PrivacySettings.js';
import { PublicProfile } from '../models/PublicProfile.js';
import { SavedCandidate } from '../models/SavedCandidate.js';
import { JobOpportunity } from '../models/JobOpportunity.js';
import { requireFields, normalize, ApiError, toBool } from '../utils/helpers.js';
import { audit, notify } from '../utils/events.js';

const LEVEL_RANK = { beginner: 1, intermediate: 2, advanced: 3, expert: 4 };

// GET /api/recruiter/talent
export async function talent(req, res) {
  const skillsParam = String(req.query.skills ?? '').trim();
  const wantedSkills = skillsParam !== ''
    ? skillsParam.split(',').map((s) => s.trim().toLowerCase()).filter(Boolean)
    : [];
  const levelFilter = String(req.query.level ?? '').trim().toLowerCase();
  const locationFilter = String(req.query.location ?? '').trim().toLowerCase();
  const titleFilter = String(req.query.job_title ?? '').trim().toLowerCase();

  const { data } = await listPublicProfiles(getDC());
  const candidates = data.publicProfiles || [];

  const results = [];

  for (const pp of candidates) {
    const emp = pp.employee;
    if (!emp) continue;
    const employeeId = emp.id;
    const privacy = await PrivacySettings.findByEmployee(employeeId);
    if (!privacy || privacy.profile_visibility !== 'public') continue;

    const view = await PublicProfile.buildPublicView(emp, privacy);

    if (locationFilter !== '') {
      const loc = String(emp.location ?? '').toLowerCase();
      if (!loc.includes(locationFilter)) continue;
    }
    if (titleFilter !== '') {
      const role = String(view.role ?? '').toLowerCase();
      if (role === '' || !role.includes(titleFilter)) continue;
    }

    const publicSkills = Array.isArray(view.skills) ? view.skills : [];

    let matchScore = null;
    const matchedSkills = [];
    if (wantedSkills.length) {
      let matched = 0;
      let levelBonus = 0;
      for (const ws of wantedSkills) {
        for (const ps of publicSkills) {
          if (String(ps.name).toLowerCase() === ws) {
            matched += 1;
            matchedSkills.push(ps.name);
            if (ps.proficiency_level !== undefined) {
              levelBonus += LEVEL_RANK[ps.proficiency_level] ?? 0;
            }
            break;
          }
        }
      }
      if (matched === 0) continue;
      const base = (matched / wantedSkills.length) * 100;
      const maxLevelBonus = wantedSkills.length * 4;
      const bonus = maxLevelBonus > 0 ? (levelBonus / maxLevelBonus) * 10 : 0;
      matchScore = Math.round(Math.min(100, base * 0.9 + bonus) * 10) / 10;
    }

    if (levelFilter !== '' && LEVEL_RANK[levelFilter] !== undefined) {
      let meets = false;
      for (const ps of publicSkills) {
        if (ps.proficiency_level !== undefined && (LEVEL_RANK[ps.proficiency_level] ?? 0) >= LEVEL_RANK[levelFilter]) {
          meets = true;
          break;
        }
      }
      if (!meets) continue;
    }

    results.push({
      employee_id: employeeId,
      slug: pp.slug,
      name: view.name,
      role: view.role,
      location: toBool(privacy.experience_public) ? emp.location : null,
      skills: publicSkills,
      match_score: matchScore,
      matched_skills: matchedSkills,
      view_count: Number(pp.viewCount),
    });
  }

  if (wantedSkills.length) {
    results.sort((a, b) => (b.match_score ?? 0) - (a.match_score ?? 0));
  } else {
    results.sort((a, b) => String(a.name ?? '').localeCompare(String(b.name ?? '')));
  }

  res.json({ success: true, count: results.length, candidates: results });
}

// GET /api/recruiter/candidates/:id
export async function candidateView(req, res) {
  const userId = req.auth.userId;
  const employeeId = req.params.id;
  if (!employeeId) throw new ApiError(400, 'Candidate id required');

  const profileRow = await PublicProfile.findByEmployee(employeeId);
  if (!profileRow || !toBool(profileRow.is_public)) {
    throw new ApiError(404, 'Candidate profile not found or not public');
  }

  const { data } = await getEmployeeById(getDC(), { id: employeeId });
  const employee = data.employee;
  if (!employee) throw new ApiError(404, 'Candidate not found');

  const privacy = await PrivacySettings.findByEmployee(employeeId);
  if (!privacy || privacy.profile_visibility !== 'public') {
    throw new ApiError(404, 'Candidate profile not found or not public');
  }

  const view = await PublicProfile.buildPublicView(employee, privacy);
  await PublicProfile.incrementViews(employeeId);

  res.json({
    success: true,
    candidate: {
      employee_id: employeeId,
      slug: profileRow.slug,
      is_saved: await SavedCandidate.isSaved(userId, employeeId),
      view,
    },
  });
}

// GET/POST /api/recruiter/save-candidate  |  DELETE .../:id
export async function saveCandidate(req, res) {
  const userId = req.auth.userId;

  if (req.method === 'GET') {
    return res.json({ success: true, saved: await SavedCandidate.listForRecruiter(userId) });
  }

  if (req.method === 'POST') {
    const data = req.body || {};
    requireFields(data, ['employee_id']);
    const employeeId = data.employee_id;

    const profile = await PublicProfile.findByEmployee(employeeId);
    if (!profile || !toBool(profile.is_public)) throw new ApiError(404, 'Candidate is not public');

    await SavedCandidate.save(userId, employeeId, data.notes ?? null);
    await audit(userId, 'recruiter', 'save_candidate', 'employee', employeeId, null, req);
    return res.status(201).json({ success: true, saved: await SavedCandidate.listForRecruiter(userId) });
  }

  // DELETE
  const employeeId = req.params.id;
  if (!employeeId) throw new ApiError(400, 'Candidate id required');
  const removed = await SavedCandidate.unsave(userId, employeeId);
  if (!removed) throw new ApiError(404, 'Not in saved list');
  await audit(userId, 'recruiter', 'unsave_candidate', 'employee', employeeId, null, req);
  res.json({ success: true, saved: await SavedCandidate.listForRecruiter(userId) });
}

// GET/POST /api/recruiter/opportunities
export async function opportunities(req, res) {
  const userId = req.auth.userId;

  if (req.method === 'GET') {
    return res.json({
      success: true,
      opportunities: await JobOpportunity.listForRecruiter(userId),
      analytics: await JobOpportunity.analyticsForRecruiter(userId),
    });
  }

  // POST
  const data = req.body || {};
  requireFields(data, ['employee_id', 'title', 'company_name']);
  const employeeId = data.employee_id;

  const profile = await PublicProfile.findByEmployee(employeeId);
  if (!profile || !toBool(profile.is_public)) throw new ApiError(404, 'Candidate is not public');

  const id = await JobOpportunity.create(userId, employeeId, data);

  const { data: empData } = await getEmployeeById(getDC(), { id: employeeId });
  const emp = empData.employee;
  if (emp && emp.userId) {
    await notify(
      emp.userId,
      'opportunity',
      `New opportunity: ${normalize(data.title)}`,
      `A recruiter sent you an opportunity at ${normalize(data.company_name)}.`,
      '/employee/opportunities',
      { opportunity_id: id }
    );
  }
  await audit(userId, 'recruiter', 'send_opportunity', 'job_opportunity', id, { employee_id: employeeId }, req);

  const created = await JobOpportunity.findById(id);
  res.status(201).json({ success: true, message: 'Opportunity sent', opportunity: JobOpportunity.publicShape(created) });
}