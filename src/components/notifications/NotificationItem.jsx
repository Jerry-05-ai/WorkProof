import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../../store/context';

const typeIcons = {
  employment: '📌',
  verification: '✅',
  profile: '🌐',
  projects: '📋',
  project: '📋',
};

const getRelativeTime = (timestamp) => {
  const now = new Date();
  const time = new Date(timestamp);
  const diffMs = now - time;
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);
  if (diffMins < 1) return 'Just now';
  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays === 1) return 'Yesterday';
  return `${diffDays}d ago`;
};

export const NotificationItem = ({ notification }) => {
  const { dispatch } = useApp();
  const navigate = useNavigate();

  const handleClick = () => {
    dispatch({ type: 'MARK_NOTIFICATION_READ', payload: notification.id });
    if (notification.link) {
      navigate(notification.link);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className={`p-4 rounded-lg cursor-pointer transition-colors ${
        notification.read
          ? 'bg-surface hover:bg-surface-2'
          : 'bg-primary-soft border border-primary/15 hover:bg-primary-soft/70'
      }`}
      onClick={handleClick}
    >
      <div className="flex items-start gap-3">
        <span className="text-lg flex-shrink-0">
          {typeIcons[notification.type] || '📌'}
        </span>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-2">
            <h4 className={`text-sm ${notification.read ? 'text-text' : 'text-text font-semibold'}`}>
              {notification.title}
            </h4>
            {!notification.read && (
              <span className="w-2 h-2 bg-primary rounded-full flex-shrink-0" />
            )}
          </div>
          <p className="text-xs text-muted mt-1">{notification.message}</p>
          <p className="text-xs text-muted mt-1">{getRelativeTime(notification.createdAt)}</p>
        </div>
      </div>
    </motion.div>
  );
};