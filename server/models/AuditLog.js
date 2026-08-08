// server/models/AuditLog.js
import { query, queryOne } from '../config/database.js';

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

    let sql = `
      SELECT al.*, u.full_name, u.email
      FROM audit_logs al
      LEFT JOIN users u ON u.id = al.user_id
      WHERE 1=1`;
    const params = [];

    if (filters.action) { sql += ' AND al.action = ?'; params.push(filters.action); }
    if (filters.role) { sql += ' AND al.role = ?'; params.push(filters.role); }
    if (filters.entity_type) { sql += ' AND al.entity_type = ?'; params.push(filters.entity_type); }
    if (filters.user_id) { sql += ' AND al.user_id = ?'; params.push(parseInt(filters.user_id, 10)); }
    if (filters.date_from) { sql += ' AND al.created_at >= ?'; params.push(filters.date_from); }
    if (filters.date_to) { sql += ' AND al.created_at <= ?'; params.push(filters.date_to); }

    sql += ` ORDER BY al.created_at DESC LIMIT ${safeLimit} OFFSET ${safeOffset}`;
    const rows = await query(sql, params);
    return rows.map(AuditLog.publicShape);
  },

  async count(filters = {}) {
    let sql = 'SELECT COUNT(*) AS c FROM audit_logs al WHERE 1=1';
    const params = [];
    if (filters.action) { sql += ' AND al.action = ?'; params.push(filters.action); }
    if (filters.role) { sql += ' AND al.role = ?'; params.push(filters.role); }
    if (filters.entity_type) { sql += ' AND al.entity_type = ?'; params.push(filters.entity_type); }
    const row = await queryOne(sql, params);
    return Number(row.c);
  },

  publicShape(l) {
    return {
      id: Number(l.id),
      user_id: Number(l.user_id),
      user_name: l.full_name ?? null,
      user_email: l.email ?? null,
      role: l.role,
      action: l.action,
      entity_type: l.entity_type,
      entity_id: l.entity_id !== null && l.entity_id !== undefined ? Number(l.entity_id) : null,
      details: safeParse(l.details),
      ip_address: l.ip_address,
      created_at: l.created_at,
    };
  },
};
