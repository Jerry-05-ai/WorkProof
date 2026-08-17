import React from 'react';
import { motion } from 'framer-motion';
import { Clock, Award, BookOpen, Star, Target } from 'lucide-react';
import { useApp } from '../../store/context';

const typeConfig = {
  milestone: { icon: Target, color: 'text-primary', bg: 'bg-primary/10' },
  skill: { icon: BookOpen, color: 'text-success', bg: 'bg-success/10' },
  recognition: { icon: Award, color: 'text-warning', bg: 'bg-warning/10' },
  certification: { icon: Star, color: 'text-accent', bg: 'bg-accent/10' },
};

const formatTimestamp = (ts) => {
  const date = new Date(ts);
  const now = new Date();
  const diff = now - date;
  const hours = Math.floor(diff / (1000 * 60 * 60));
  const mins = Math.floor(diff / (1000 * 60));

  if (mins < 60) return `${Math.max(mins, 1)}m ago`;
  if (hours < 24) return `${hours}h ago`;
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
};

export const ActivityFeed = ({ activities: propActivities }) => {
  const { state } = useApp();
  const companyActivities = propActivities || state.activities.filter(a => a.companyId === state.currentUser?.companyId);

  return (
    <div className="bg-surface rounded-xl border border-border shadow-sm p-6">
      <h3 className="text-lg font-semibold text-text mb-6">Recent Activity</h3>
      {companyActivities.length === 0 ? (
        <p className="text-muted text-center py-4">No recent activity.</p>
      ) : (
        <div className="space-y-4">
          {companyActivities.map((activity, index) => {
            const config = typeConfig[activity.metadata?.type] || typeConfig.milestone;
            const Icon = config.icon;
            const actor = activity.actor || activity.user || 'System';
            const action = activity.action || '';
            const target = activity.target || activity.entity_type || '';
            const timestamp = activity.timestamp || activity.at || activity.created_at;
            return (
              <motion.div
                key={activity.id || index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                className="flex items-start gap-4"
              >
                <div className={`p-2 rounded-lg ${config.bg} flex-shrink-0`}>
                  <Icon className={`h-4 w-4 ${config.color}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-text">
                    <span className="font-medium">{actor}</span>{' '}
                    {action.replace(/_/g, ' ').toLowerCase()}{' '}
                    <span className="font-medium">{target}</span>
                  </p>
                  <div className="flex items-center gap-1 mt-1">
                    <Clock className="h-3 w-3 text-muted" />
                    <span className="text-xs text-muted">
                      {formatTimestamp(timestamp)}
                    </span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      )}
    </div>
  );
};