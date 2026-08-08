// server/controllers/authController.js
import { query } from '../config/database.js';
import { User } from '../models/User.js';
import { Company } from '../models/Company.js';
import { requireFields, ApiError } from '../utils/helpers.js';
import { audit } from '../utils/events.js';
import { clearSession } from '../middleware/auth.js';
import jwt from 'jsonwebtoken';
import { setAuthCookie } from '../middleware/auth.js';

// POST /api/auth/login
export async function login(req, res) {
  const data = req.body || {};
  requireFields(data, ['email', 'password']);

  const user = await User.findByEmail(data.email);

  // Generic error to avoid user enumeration.
  if (!user || !(await User.verifyPassword(user, data.password))) {
    if (user) {
      await audit(Number(user.id), user.role, 'failed_login', 'user', Number(user.id), null, req);
    }
    throw new ApiError(401, 'Invalid email or password');
  }

  if (!user.is_active) {
    throw new ApiError(403, 'This account is inactive');
  }

  // Block logins for admins of a suspended company.
  if (user.role === 'company_admin' && user.company_id !== null) {
    const row = await query('SELECT status FROM companies WHERE id = ? LIMIT 1', [Number(user.company_id)]);
    if (row[0]?.status === 'suspended') {
      throw new ApiError(403, 'Your company account is suspended. Contact support.');
    }
  }

  // Create JWT token and set auth cookie
  const payload = {
    user_id: Number(user.id),
    role: user.role,
    company_id: user.company_id !== null && user.company_id !== undefined ? Number(user.company_id) : null,
    employee_id: user.employee_id !== null && user.employee_id !== undefined ? Number(user.employee_id) : null,
    email: user.email,
  };
  const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '7d' });
  setAuthCookie(res, token);

  await User.updateLastLogin(Number(user.id));
  await audit(Number(user.id), user.role, 'login', 'user', Number(user.id), null, req);

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
    const company = await Company.findById(Number(user.company_id));
    if (company) payload.company = Company.publicShape(company);
  }

  res.json(payload);
}
