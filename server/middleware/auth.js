// server/middleware/auth.js
// Authentication + authorization middleware.
//
// The original PHP backend used PHP session cookies. The React frontend talks to
// the API with `withCredentials: true` and never reads or sends a token itself —
// it relies entirely on the auth cookie. To keep the frontend byte-for-byte
// unchanged while satisfying "secure JWT", we issue a signed JWT stored in an
// httpOnly cookie. The token payload carries the same fields the PHP session did:
//   user_id, role, company_id, employee_id, email
//
// Requests are authenticated by verifying that cookie. This is a drop-in
// behavioral replacement for the PHP session with no frontend changes required.

import jwt from 'jsonwebtoken';
import { ApiError } from '../utils/helpers.js';

const COOKIE_NAME = process.env.SESSION_COOKIE_NAME || 'wp_session';
const JWT_SECRET = process.env.JWT_SECRET || 'change-me-in-production';
const SEVEN_DAYS_MS = 7 * 24 * 60 * 60 * 1000; // matches PHP gc_maxlifetime (604800s)

function isProd() {
  return process.env.NODE_ENV === 'production';
}

/**
 * Cookie options mirroring the PHP session cookie params.
 *
 * On Vercel, the frontend (dist/) and the API (api/server.js) are served from
 * the SAME domain via vercel.json rewrites, so this does NOT need SameSite=None
 * or an explicit `domain` attribute — those are only for genuinely cross-site
 * setups (frontend on one domain, API on another). Omitting `domain` scopes the
 * cookie to whatever host actually served the response, which avoids the bug
 * of a stale hardcoded domain silently breaking auth after a URL/rebrand change.
 *
 * Set CROSS_SITE_COOKIES=true only if you split the frontend and API across
 * different domains.
 */
function cookieOptions() {
  const isProd = process.env.NODE_ENV === 'production';
  const crossSite = process.env.CROSS_SITE_COOKIES === 'true';
  return {
    httpOnly: true,
    secure: isProd || crossSite,
    sameSite: crossSite ? 'none' : 'lax',
    domain: process.env.COOKIE_DOMAIN || undefined,
    maxAge: SEVEN_DAYS_MS,
    path: '/',
  };
}


/**
 * Issue the auth cookie from a user row (replaces establishSession()).
 * NOTE: ids are Data Connect UUID strings now — do not wrap in Number().
 */
export function establishSession(res, user) {
  const payload = {
    user_id: user.id,
    role: user.role,
    company_id: user.company_id ?? null,
    employee_id: user.employee_id ?? null,
    email: user.email,
  };
  const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '7d' });
  res.cookie(COOKIE_NAME, token, cookieOptions());
}

/**
 * Clear the auth cookie (replaces session_destroy()).
 */
export function clearSession(res) {
  res.clearCookie(COOKIE_NAME, { ...cookieOptions(), maxAge: undefined });
}

/**
 * Populate req.auth from the cookie if present and valid. Never rejects —
 * downstream guards decide whether auth is required. Runs on every request.
 */
export function attachSession(req, _res, next) {
  const token = req.cookies?.[COOKIE_NAME];
  if (token) {
    try {
      const decoded = jwt.verify(token, JWT_SECRET);
      req.auth = {
        userId: decoded.user_id,
        role: decoded.role,
        companyId: decoded.company_id ?? null,
        employeeId: decoded.employee_id ?? null,
        email: decoded.email,
      };
    } catch {
      req.auth = null;
    }
  } else {
    req.auth = null;
  }
  next();
}

/**
 * Require an authenticated user (replaces requireAuth()). Returns 401 otherwise.
 */
export function requireAuth(req, _res, next) {
  if (!req.auth?.userId) {
    return next(new ApiError(401, 'Authentication required'));
  }
  next();
}

/**
 * Require one of the given roles (replaces requireRole()).
 * Usage: requireRole('company_admin') or requireRole(['company_admin','platform_admin'])
 */
export function requireRole(roles) {
  const allowed = Array.isArray(roles) ? roles : [roles];
  return (req, _res, next) => {
    if (!req.auth?.userId) return next(new ApiError(401, 'Authentication required'));
    if (!allowed.includes(req.auth.role)) {
      return next(new ApiError(403, 'Insufficient permissions'));
    }
    next();
  };
}

/**
 * Assert tenant access for a given company id (replaces requireTenantAccess()).
 * Platform admins bypass. Throws ApiError(403) on mismatch. Call from handlers.
 */
export function assertTenantAccess(req, companyId) {
  if (req.auth?.role === 'platform_admin') return;
  const userCompany = req.auth?.companyId ?? null;
  if (companyId === null || companyId === undefined || userCompany === null || String(userCompany) !== String(companyId)) {
    throw new ApiError(403, 'Access denied for this company');
  }
}

/**
 * Resolve the current session's company id or throw ApiError(400).
 * Replaces session_company_id().
 */
export function sessionCompanyId(req) {
  const companyId = req.auth?.companyId ?? null;
  if (companyId === null) {
    throw new ApiError(400, 'No company associated with this account');
  }
  return companyId;
}

export const AUTH_COOKIE_NAME = COOKIE_NAME;
