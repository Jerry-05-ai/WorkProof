// server/utils/helpers.js
// Shared utilities mirroring backend/utils/helpers.php.

import crypto from 'crypto';

/**
 * ApiError — thrown by controllers/models to produce a JSON error response
 * with a specific status. Caught by the global error middleware.
 * Extra fields (e.g. `fields`) are merged into the response body.
 */
export class ApiError extends Error {
  constructor(status, error, extra = {}) {
    super(error);
    this.status = status;
    this.error = error;
    this.extra = extra;
  }
}

/**
 * Send a JSON response (thin wrapper to mirror json_response()).
 */
export function jsonResponse(res, data, status = 200) {
  res.status(status).json(data);
}

/** Trim + collapse internal whitespace. */
export function normalize(value) {
  if (value === null || value === undefined) return '';
  return String(value).replace(/\s+/g, ' ').trim();
}

/** Normalize an email to a canonical form (trim + lowercase). */
export function normalizeEmail(email) {
  return String(email ?? '').trim().toLowerCase();
}

/** Validate an email address. */
export function validateEmail(email) {
  const value = String(email ?? '');
  // Mirrors PHP FILTER_VALIDATE_EMAIL closely enough for our inputs.
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

/**
 * Validate a password: min 8 chars, one lowercase, one uppercase, one number.
 * Returns null if valid, otherwise an error message.
 */
export function validatePassword(password) {
  const value = String(password ?? '');
  if (value.length < 8) return 'Password must be at least 8 characters long';
  if (!/[a-z]/.test(value)) return 'Password must contain a lowercase letter';
  if (!/[A-Z]/.test(value)) return 'Password must contain an uppercase letter';
  if (!/[0-9]/.test(value)) return 'Password must contain a number';
  return null;
}

/**
 * Require the given fields to be present and non-empty in `data`.
 * Throws ApiError(422) listing missing fields if any are absent.
 */
export function requireFields(data, fields) {
  const missing = [];
  for (const field of fields) {
    const v = data?.[field];
    if (v === undefined || v === null || (typeof v === 'string' && v.trim() === '')) {
      missing.push(field);
    }
  }
  if (missing.length) {
    throw new ApiError(422, 'Missing required fields', { fields: missing });
  }
}

/** Generate a URL-safe random token (hex), matching generate_token(). */
export function generateToken(bytes = 32) {
  return crypto.randomBytes(bytes).toString('hex');
}

/** Hash a token for storage (sha256), matching hash_token(). */
export function hashToken(token) {
  return crypto.createHash('sha256').update(String(token)).digest('hex');
}

/** Get the client IP address, matching client_ip(). */
export function clientIp(req) {
  return (
    req.headers['x-forwarded-for']?.split(',')[0]?.trim() ||
    req.socket?.remoteAddress ||
    ''
  );
}

/**
 * Wrap an async route handler so thrown errors reach the error middleware.
 */
export function asyncHandler(fn) {
  return (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next);
}

/** Coerce a DB tinyint/bool-ish value to a real boolean. */
export function toBool(v) {
  return v === true || v === 1 || v === '1';
}

/** Coerce to int or null. */
export function toIntOrNull(v) {
  if (v === null || v === undefined || v === '') return null;
  const n = parseInt(v, 10);
  return Number.isNaN(n) ? null : n;
}

/** Coerce to float or null. */
export function toFloatOrNull(v) {
  if (v === null || v === undefined || v === '') return null;
  const n = parseFloat(v);
  return Number.isNaN(n) ? null : n;
}
