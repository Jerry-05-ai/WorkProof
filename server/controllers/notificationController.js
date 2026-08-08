// server/controllers/notificationController.js
import { Notification } from '../models/Notification.js';
import { ApiError } from '../utils/helpers.js';

// GET /api/notifications
export async function list(req, res) {
  const userId = req.auth.userId;
  const unreadOnly = req.query.unread === '1';
  const limit = req.query.limit ? Math.max(1, Math.min(100, parseInt(req.query.limit, 10))) : 50;

  res.json({
    success: true,
    notifications: await Notification.listForUser(userId, unreadOnly, limit),
    unread_count: await Notification.unreadCount(userId),
  });
}

// PUT /api/notifications/:id/read
export async function markRead(req, res) {
  const userId = req.auth.userId;
  const id = Number(req.params.id);
  if (!id) throw new ApiError(400, 'Notification id required');

  const notif = await Notification.findForUser(id, userId);
  if (!notif) throw new ApiError(404, 'Notification not found');

  await Notification.markRead(id, userId);
  res.json({ success: true, unread_count: await Notification.unreadCount(userId) });
}

// PUT /api/notifications/read-all
export async function markAllRead(req, res) {
  const userId = req.auth.userId;
  const count = await Notification.markAllRead(userId);
  res.json({ success: true, marked_read: count, unread_count: 0 });
}
