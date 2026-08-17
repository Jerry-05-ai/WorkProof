// server/controllers/publicProfileController.js
// Rewritten to use Firebase Data Connect models instead of raw MySQL.

import { getDC } from '../config/dataconnect.js';
import { getEmployeeById } from '@dataconnect/admin-generated';
import { PrivacySettings } from '../models/PrivacySettings.js';
import { PublicProfile } from '../models/PublicProfile.js';
import { ApiError, toBool } from '../utils/helpers.js';

// GET /api/profile/:slug  (PUBLIC - no auth)
export async function view(req, res) {
  const slug = req.params.slug || '';
  if (slug === '' || slug === 'profile') throw new ApiError(400, 'Profile slug required');

  const profileRow = await PublicProfile.findBySlug(slug);
  if (!profileRow || !toBool(profileRow.is_public)) throw new ApiError(404, 'Profile not found');

  const employeeId = profileRow.employee_id;

  const { data } = await getEmployeeById(getDC(), { id: employeeId });
  const employee = data.employee;
  if (!employee) throw new ApiError(404, 'Profile not found');

  const privacy = await PrivacySettings.findByEmployee(employeeId);
  if (!privacy || privacy.profile_visibility !== 'public') throw new ApiError(404, 'Profile not found');

  const profileView = await PublicProfile.buildPublicView(employee, privacy);
  await PublicProfile.incrementViews(employeeId);

  const companyName = employee.company?.name ?? null;

  res.json({
    success: true,
    profile: {
      slug,
      view: profileView,
      is_verified: toBool(employee.isVerified),
      verified_by: companyName || null,
      view_count: Number(profileRow.view_count) + 1,
    },
  });
}