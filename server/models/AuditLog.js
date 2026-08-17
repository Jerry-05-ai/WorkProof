// server/models/AuditLog.js
// Rewritten to call Firebase Data Connect instead of raw MySQL.

import { getDC } from '../config/dataconnect.js';
import { listAuditLogs, countAuditLogs } from '@dataconnect/admin-generated';

function safeParse(value) {
  if (value === null || value === undefined) return null;
  if (typeof value === 'object') return value;
  try {
    return JSON.parse(value);
  } catch {
    return null;
  }
}

export const AuditLog = {
  // filters: action, role, entity_type, user_id, date_from, date_to
  async query(filters = {}, limit = 100, offset = 0) {
    const safeLimit = Number.isInteger(limit) ? limit : parseInt(limit, 10) || 100;
    const safeOffset = Number.isInteger(offset) ? offset : parseInt(offset, 10) || 0;

    const vars = {
      action: filters.action ? filters.action : null,
      role: filters.role ? filters.role : null,
      entityType: filters.entity_type ? filters.entity_type : null,
      userId: filters.user_id ? String(filters.user_id) : null,
      dateFrom: filters.date_from ? new Date(filters.date_from) : null,
      dateTo: filters.date_to ? new Date(filters.date_to) : null,
      limit: safeLimit,
      offset: safeOffset,
    };

    const { data } = await listAuditLogs(getDC(), vars);
    const rows = data.auditLogs || [];
    return rows.map(AuditLog.publicShape);
  },

  async count(filters = {}) {
    const vars = {
      action: filters.action ? filters.action : null,
      role: filters.role ? filters.role : null,
      entityType: filters.entity_type ? filters.entity_type : null,
      userId: filters.user_id ? String(filters.user_id) : null,
      dateFrom: filters.date_from ? new Date(filters.date_from) : null,
      dateTo: filters.date_to ? new Date(filters.date_to) : null,
    };

    const { data } = await countAuditLogs(getDC(), vars);
    return Array.isArray(data.auditLogs) ? data.auditLogs.length : 0;
  },

  publicShape(l) {
    return {
      id: l.id,
      user_id: l.userId,
      user_name: l.user?.fullName ?? null,
      user_email: l.user?.email ?? null,
      role: l.role,
      action: l.action,
      entity_type: l.entityType,
      entity_id: l.entityId !== null && l.entityId !== undefined ? l.entityId : null,
      details: safeParse(l.details),
      ip_address: l.ipAddress,
      created_at: l.createdAt,
    };
  },
};