// server/controllers/authController.js
import { User } from '../models/User.js';
import { Company } from '../models/Company.js';
import { requireFields, ApiError } from '../utils/helpers.js';
import { audit } from '../utils/events.js';
import { clearSession, establishSession } from '../middleware/auth.js';

// POST /api/auth/login
export async function login(req, res) {
  const data = req.body || {};
  requireFields(data, ['email', 'password']);

  const user = await User.findByEmail(data.email);

  // Generic error to avoid user enumeration.
  if (!user || !(await User.verifyPassword(user, data.password))) {
    if (user) {
      await audit(user.id, user.role, 'failed_login', 'user', user.id, null, req);
    }
    throw new ApiError(401, 'Invalid email or password');
  }

  if (!user.is_active) {
    throw new ApiError(403, 'This account is inactive');
  }

  // Block logins for admins of a suspended company.
  if (user.role === 'company_admin' && user.company_id !== null) {
    const company = await Company.findById(user.company_id);
    if (company?.status === 'suspended') {
      throw new ApiError(403, 'Your company account is suspended. Contact support.');
    }
  }

  // Issue the auth cookie (JWT signing + cookie options live in middleware/auth.js).
  establishSession(res, user);

  await User.updateLastLogin(user.id);
  await audit(user.id, user.role, 'login', 'user', user.id, null, req);

  res.json({ success: true, user: User.publicShape(user) });
}

// POST /api/auth/logout
export async function logout(_req, res) {
  clearSession(res);
  res.json({ success: true });
}

// GET /api/auth/me
export async function me(req, res) {
  const user = await User.findById(req.auth.userId);
  if (!user) throw new ApiError(404, 'User not found');

  const payload = { success: true, user: User.publicShape(user) };

  if (user.company_id !== null) {
    const company = await Company.findById(user.company_id);
    if (company) payload.company = Company.publicShape(company);
  }

  res.json(payload);
}
