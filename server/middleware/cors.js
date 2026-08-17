// server/middleware/cors.js
// CORS + security headers, mirroring the behavior in backend/config/auth.php.
//
// Behavior:
//  - Allows configured FRONTEND_ORIGIN(s) (comma-separated).
//  - In development, also allows any localhost / 127.0.0.1 / ::1 origin so the
//    Vite dev server works regardless of port.
//  - Always sends Access-Control-Allow-Credentials so the auth cookie flows.

function parseOrigins() {
  const raw = process.env.FRONTEND_ORIGIN || '';
  return raw
    .split(',')
    .map((o) => o.trim())
    .filter(Boolean);
}

function isLocalOrigin(origin) {
  try {
    const host = new URL(origin).hostname;
    return host === 'localhost' || host === '127.0.0.1' || host === '::1';
  } catch {
    return false;
  }
}

export function corsAndSecurity(req, res, next) {
  // Security headers (production readiness), matching the PHP backend.
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  if (req.secure || req.headers['x-forwarded-proto'] === 'https') {
    res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');
  }

  const allowed = parseOrigins();
  const origin = req.headers.origin;

  if (origin) {
    const explicitlyAllowed = allowed.includes(origin);
    if (explicitlyAllowed || isLocalOrigin(origin)) {
      res.setHeader('Access-Control-Allow-Origin', origin);
      res.setHeader('Access-Control-Allow-Credentials', 'true');
      res.setHeader('Vary', 'Origin');
    }
  }

  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Accept, X-Requested-With');
  res.setHeader('Access-Control-Max-Age', '86400');

  if (req.method === 'OPTIONS') {
    return res.status(204).end();
  }

  next();
}
