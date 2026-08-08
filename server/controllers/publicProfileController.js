// server/controllers/publicProfileController.js
import { queryOne } from '../config/database.js';
import { PrivacySettings } from '../models/PrivacySettings.js';
import { PublicProfile } from '../models/PublicProfile.js';
import { ApiError, toBool } from '../utils/helpers.js';

// GET /api/profile/:slug  (PUBLIC - no auth)
export async function view(req, res) {
  const slug = req.params.slug || '';
  if (slug === '' || slug === 'profile') throw new ApiError(400, 'Profile slug required');

  const profileRow = await PublicProfile.findBySlug(slug);
  if (!profileRow || !toBool(profileRow.is_public)) throw new ApiError(404, 'Profile not found');

  const employeeId = Number(profileRow.employee_id);

  const employee = await queryOne('SELECT * FROM employees WHERE id = ? LIMIT 1', [employeeId]);
  if (!employee) throw new ApiError(404, 'Profile not found');

  const privacy = await PrivacySettings.findByEmployee(employeeId);
  if (!privacy || privacy.profile_visibility !== 'public') throw new ApiError(404, 'Profile not found');

  const profileView = await PublicProfile.buildPublicView(employee, privacy);
  await PublicProfile.incrementViews(employeeId);

  const companyRow = await queryOne('SELECT name FROM companies WHERE id = ? LIMIT 1', [Number(employee.company_id)]);
  const companyName = companyRow ? companyRow.name : null;

  res.json({
    success: true,
    profile: {
      slug,
      view: profileView,
      is_verified: toBool(employee.is_verified),
      verified_by: companyName || null,
      view_count: Number(profileRow.view_count) + 1,
    },
  });
}
