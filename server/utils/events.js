// server/utils/events.js
// Notification + audit-log helpers, mirroring backend/utils/events.php.

import { query } from '../config/database.js';

/**
 * Create a notification for a user.
 */
export async function notify(userId, type, title, message, link = null, metadata = null) {
  await query(
    `INSERT INTO notifications (user_id, type, title, message, link, metadata)
     VALUES (?, ?, ?, ?, ?, ?)`,
    [userId, type, title, message, link, metadata !== null ? JSON.stringify(metadata) : null]
  );
}

/**
 * Write an audit-log entry. `req` is optional and used to capture IP + user agent.
 */
export async function audit(userId, role, action, entityType = null, entityId = null, details = null, req = null) {
  const ip = req
    ? (req.headers['x-forwarded-for']?.split(',')[0]?.trim() || req.socket?.remoteAddress || null)
    : null;
  const userAgent = req ? (req.headers['user-agent'] || null) : null;
  await query(
    `INSERT INTO audit_logs (user_id, role, action, entity_type, entity_id, details, ip_address, user_agent)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
    [userId, role, action, entityType, entityId, details !== null ? JSON.stringify(details) : null, ip, userAgent]
  );
}
