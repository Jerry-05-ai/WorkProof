// server/models/Notification.js
// Rewritten to call Firebase Data Connect instead of raw MySQL.

import { getDC } from '../config/dataconnect.js';
import {
  listNotificationsByUser,
  listUnreadNotificationsByUser,
  countUnreadNotifications,
  getNotificationById,
  markNotificationRead,
  markAllNotificationsRead,
} from '@dataconnect/admin-generated';
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
    const { data } = unreadOnly
      ? await listUnreadNotificationsByUser(getDC(), { userId, limit: safeLimit })
      : await listNotificationsByUser(getDC(), { userId, limit: safeLimit });
    const rows = unreadOnly ? data.notifications : data.notifications;
    return rows.map(Notification.publicShape);
  },

  async unreadCount(userId) {
    const { data } = await countUnreadNotifications(getDC(), { userId });
    // The query returns a list of ids; use the array length as the count.
    return Array.isArray(data.notifications) ? data.notifications.length : 0;
  },

  async findForUser(id, userId) {
    const { data } = await getNotificationById(getDC(), { id });
    const row = data.notification;
    if (!row || row.userId !== userId) return null;
    return row;
  },

  async markRead(id, userId) {
    const existing = await Notification.findForUser(id, userId);
    if (!existing || existing.isRead) return false;
    await markNotificationRead(getDC(), { id });
    return true;
  },

  async markAllRead(userId) {
    const { data } = await countUnreadNotifications(getDC(), { userId });
    const count = Array.isArray(data.notifications) ? data.notifications.length : 0;
    if (count > 0) {
      await markAllNotificationsRead(getDC(), { userId });
    }
    return count;
  },

  publicShape(n) {
    return {
      id: n.id,
      type: n.type,
      title: n.title,
      message: n.message,
      is_read: toBool(n.isRead),
      link: n.link,
      metadata: safeParse(n.metadata),
      read_at: n.readAt,
      created_at: n.createdAt,
    };
  },
};