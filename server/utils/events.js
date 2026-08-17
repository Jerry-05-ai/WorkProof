// server/utils/events.js
// Notification + audit-log helpers, now backed by Data Connect instead of MySQL.

import { getDC } from '../config/dataconnect.js';
import { createNotification, createAuditLog } from '@dataconnect/admin-generated';

/**
 * Create a notification for a user.
 */
export async function notify(userId, type, title, message, link = null, metadata = null) {
  await createNotification(getDC(), {
    userId,
    type,
    title,
    message,
    link,
    metadata: metadata !== null ? JSON.stringify(metadata) : null,
  });
}

/**
 * Write an audit-log entry. `req` is optional and used to capture IP + user agent.
 */
export async function audit(userId, role, action, entityType = null, entityId = null, details = null, req = null) {
  const ip = req
    ? (req.headers['x-forwarded-for']?.split(',')[0]?.trim() || req.socket?.remoteAddress || null)
    : null;
  const userAgent = req ? (req.headers['user-agent'] || null) : null;
  await createAuditLog(getDC(), {
    userId,
    role,
    action,
    entityType,
    entityId: entityId !== null && entityId !== undefined ? String(entityId) : null,
    details: details !== null ? JSON.stringify(details) : null,
    ipAddress: ip,
    userAgent,
  });
}
