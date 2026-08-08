// server/middleware/errorHandler.js
// Centralized error + 404 handling. Produces the same JSON envelope as the PHP
// backend: { success: false, error: "...", ...extra }.

import { ApiError } from '../utils/helpers.js';

/**
 * 404 handler, matching index.php's fallback.
 */
export function notFound(req, res) {
  res.status(404).json({ success: false, error: 'Not found', path: req.path });
}

/**
 * Global error handler. Recognizes ApiError for status + extra fields;
 * everything else becomes a 500 with a generic message (details logged).
 */
// eslint-disable-next-line no-unused-vars
export function errorHandler(err, req, res, _next) {
  if (err instanceof ApiError) {
    return res.status(err.status).json({ success: false, error: err.error, ...err.extra });
  }

  // Body parser: malformed JSON
  if (err?.type === 'entity.parse.failed') {
    return res.status(400).json({ success: false, error: 'Invalid JSON body' });
  }

  // Multer upload errors
  if (err?.name === 'MulterError') {
    return res.status(400).json({ success: false, error: err.message });
  }

  console.error('Unhandled error:', err);
  res.status(500).json({ success: false, error: 'Internal server error' });
}
