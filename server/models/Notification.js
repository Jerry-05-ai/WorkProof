// server/models/Notification.js
import { query, queryOne } from '../config/database.js';
import { toBool } from '../utils/helpers.js';

function safeParse(value) {
  if (value === null || value === undefined) return null;
  if (typeof value === 'object') return value;
  try {
    return JSON.parse(value);
  } catch {
    return null;
  }
}

export const Notification = {
  async listForUser(userId, unreadOnly = false, limit = 50) {
    const safeLimit = Number.isInteger(limit) ? limit : parseInt(limit, 10) || 50;
    let sql = 'SELECT * FROM notifications WHERE user_id = ?';
    if (unreadOnly) sql += ' AND is_read = 0';
    sql += ` ORDER BY created_at DESC LIMIT ${safeLimit}`;
    const rows = await query(sql, [userId]);
    return rows.map(Notification.publicShape);
  },

  async unreadCount(userId) {
    const row = await queryOne('SELECT COUNT(*) AS c FROM notifications WHERE user_id = ? AND is_read = 0', [userId]);
    return Number(row.c);
  },

  async findForUser(id, userId) {
    return queryOne('SELECT * FROM notifications WHERE id = ? AND user_id = ? LIMIT 1', [id, userId]);
  },

  async markRead(id, userId) {
    const result = await query(
      `UPDATE notifications SET is_read = 1, read_at = NOW()
       WHERE id = ? AND user_id = ? AND is_read = 0`,
      [id, userId]
    );
    return result.affectedRows > 0;
  },

  async markAllRead(userId) {
    const result = await query(
      `UPDATE notifications SET is_read = 1, read_at = NOW()
       WHERE user_id = ? AND is_read = 0`,
      [userId]
    );
    return result.affectedRows;
  },

  publicShape(n) {
    return {
      id: Number(n.id),
      type: n.type,
      title: n.title,
      message: n.message,
      is_read: toBool(n.is_read),
      link: n.link,
      metadata: safeParse(n.metadata),
      read_at: n.read_at,
      created_at: n.created_at,
    };
  },
};
