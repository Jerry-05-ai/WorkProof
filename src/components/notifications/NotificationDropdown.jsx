import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCheck } from 'lucide-react';
import { useApp } from '../../store/context';
import { NotificationItem } from './NotificationItem';
import { Button } from '../ui/Button';
import { NoNotifications } from '../ui/EmptyState';

export const NotificationDropdown = ({ isOpen, onClose }) => {
  const { state, dispatch } = useApp();
  const { notifications } = state;
  const unreadCount = notifications.filter((n) => !n.read).length;

  const handleMarkAllRead = () => {
    dispatch({ type: 'MARK_ALL_NOTIFICATIONS_READ' });
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            className="absolute right-0 top-full mt-2 w-96 bg-surface rounded-xl shadow-xl border border-border z-50 max-h-[80vh] flex flex-col"
          >
            <div className="flex items-center justify-between p-4 border-b border-border">
              <div>
                <h3 className="font-semibold text-text">Notifications</h3>
                {unreadCount > 0 && (
                  <p className="text-xs text-muted">{unreadCount} unread</p>
                )}
              </div>
              <div className="flex items-center gap-2">
                {unreadCount > 0 && (
                  <Button variant="ghost" size="sm" onClick={handleMarkAllRead}>
                    <CheckCheck className="h-4 w-4" />
                    Mark all read
                  </Button>
                )}
                <button onClick={onClose} className="p-1 rounded-lg hover:bg-surface-2">
                  <X className="h-4 w-4 text-muted" />
                </button>
              </div>
            </div>
            <div className="flex-1 overflow-y-auto p-2 space-y-1">
              {notifications.length === 0 ? (
                <NoNotifications />
              ) : (
                notifications.map((notif) => (
                  <NotificationItem key={notif.id} notification={notif} />
                ))
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};