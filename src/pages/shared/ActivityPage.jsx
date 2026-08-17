import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Activity, CheckCircle2, XCircle, Clock, TrendingUp, FileText, Users, Globe, Lock } from 'lucide-react';
import { useApp } from '../../store/context';
import { useAuth } from '../../hooks/useAuth';
import { adminApi } from '../../services/company';
import toast from 'react-hot-toast';

// Map a backend audit-log row to the shape this timeline was written against.
const mapLogToActivity = (log) => ({
  id: log.id,
  actor: log.user_name || log.user_email || 'System',
  actorRole: (log.role || '').toUpperCase(),
  action: (log.action || '').toUpperCase(),
  target: log.entity_type
    ? `${log.entity_type}${log.entity_id ? ` #${log.entity_id}` : ''}`
    : (log.action || '').replace(/_/g, ' '),
  timestamp: log.created_at,
  status: 'SUCCESS',
});

const actionConfig = {
  ENDED_EMPLOYMENT: {
    icon: <Users className="h-4 w-4" />,
    label: 'Ended Employment',
    color: 'bg-warning/10 text-warning',
    iconBg: 'bg-warning/20',
  },
  EVIDENCE_VERIFIED: {
    icon: <CheckCircle2 className="h-4 w-4" />,
    label: 'Evidence Verified',
    color: 'bg-success/10 text-success',
    iconBg: 'bg-success/20',
  },
  VERIFICATION_REJECTED: {
    icon: <XCircle className="h-4 w-4" />,
    label: 'Verification Rejected',
    color: 'bg-danger/10 text-danger',
    iconBg: 'bg-danger/20',
  },
  OWNERSHIP_TRANSFERRED: {
    icon: <TrendingUp className="h-4 w-4" />,
    label: 'Ownership Transferred',
    color: 'bg-accent/10 text-accent',
    iconBg: 'bg-accent/20',
  },
  PROFILE_PUBLISHED: {
    icon: <Globe className="h-4 w-4" />,
    label: 'Profile Published',
    color: 'bg-success/10 text-success',
    iconBg: 'bg-success/20',
  },
  EVIDENCE_SUBMITTED: {
    icon: <FileText className="h-4 w-4" />,
    label: 'Evidence Submitted',
    color: 'bg-primary/10 text-primary',
    iconBg: 'bg-primary/20',
  },
  PROJECT_INVITATION_SENT: {
    icon: <FileText className="h-4 w-4" />,
    label: 'Project Invitation',
    color: 'bg-primary/10 text-primary',
    iconBg: 'bg-primary/20',
  },
  COMPLETED_PROJECT: {
    icon: <CheckCircle2 className="h-4 w-4" />,
    label: 'Completed Project',
    color: 'bg-success/10 text-success',
    iconBg: 'bg-success/20',
  },
  EARNED_SKILL: {
    icon: <TrendingUp className="h-4 w-4" />,
    label: 'Earned Skill',
    color: 'bg-accent/10 text-accent',
    iconBg: 'bg-accent/20',
  },
  RECEIVED_RECOGNITION: {
    icon: <CheckCircle2 className="h-4 w-4" />,
    label: 'Recognition',
    color: 'bg-success/10 text-success',
    iconBg: 'bg-success/20',
  },
  COMPLETED_CERTIFICATION: {
    icon: <CheckCircle2 className="h-4 w-4" />,
    label: 'Certification',
    color: 'bg-primary/10 text-primary',
    iconBg: 'bg-primary/20',
  },
  LED_SPRINT: {
    icon: <Users className="h-4 w-4" />,
    label: 'Led Sprint',
    color: 'bg-secondary/10 text-secondary',
    iconBg: 'bg-secondary/20',
  },
};

const getTimeAgo = (timestamp) => {
  const now = new Date();
  const time = new Date(timestamp);
  const diffMs = now - time;
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMins < 1) return 'Just now';
  if (diffMins < 60) return `${diffMins} minutes ago`;
  if (diffHours < 24) return `${diffHours} hour${diffHours === 1 ? '' : 's'} ago`;
  return `${diffDays} day${diffDays === 1 ? '' : 's'} ago`;
};

export const ActivityPage = () => {
  const { state } = useApp();
  const { user } = useAuth();
  const { activities } = state;

  const isPlatformAdmin = user?.role === 'PLATFORM_ADMIN';

  const [logActivities, setLogActivities] = useState([]);
  const [loading, setLoading] = useState(isPlatformAdmin);

  useEffect(() => {
    if (!isPlatformAdmin) return;
    let active = true;
    (async () => {
      try {
        const data = await adminApi.getAuditLogs({ limit: 100 });
        if (active && data.success) {
          setLogActivities((data.logs || []).map(mapLogToActivity));
        }
      } catch (err) {
        if (active) toast.error(err.message || 'Failed to load activity');
      } finally {
        if (active) setLoading(false);
      }
    })();
    return () => { active = false; };
  }, [isPlatformAdmin]);

  // Platform admin sees the real audit trail from the backend; other roles keep
  // their existing store-driven activity feed unchanged.
  const allActivities = isPlatformAdmin ? logActivities : [...activities];

  return (
    <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-text">Activity Feed</h2>
              <p className="text-muted mt-1">Track all actions and events across your organization</p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-surface rounded-2xl border border-border shadow-sm p-5 text-center transition-all duration-300 hover:shadow-md hover:border-border-strong hover:-translate-y-0.5">
                <div className="w-10 h-10 rounded-xl bg-primary-soft text-primary mx-auto mb-3 flex items-center justify-center">
                  <Activity className="h-5 w-5" strokeWidth={2.2} />
                </div>
                <div className="text-2xl font-bold text-text tabular-nums">{allActivities.length}</div>
                <div className="text-xs text-muted">Total Events</div>
              </div>
              <div className="bg-surface rounded-2xl border border-border shadow-sm p-5 text-center transition-all duration-300 hover:shadow-md hover:border-border-strong hover:-translate-y-0.5">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 text-success mx-auto mb-3 flex items-center justify-center">
                  <CheckCircle2 className="h-5 w-5" strokeWidth={2.2} />
                </div>
                <div className="text-2xl font-bold text-text tabular-nums">
                  {allActivities.filter(a => a.status === 'SUCCESS').length}
                </div>
                <div className="text-xs text-muted">Successful</div>
              </div>
              <div className="bg-surface rounded-2xl border border-border shadow-sm p-5 text-center transition-all duration-300 hover:shadow-md hover:border-border-strong hover:-translate-y-0.5">
                <div className="w-10 h-10 rounded-xl bg-amber-50 text-warning mx-auto mb-3 flex items-center justify-center">
                  <Clock className="h-5 w-5" strokeWidth={2.2} />
                </div>
                <div className="text-2xl font-bold text-text tabular-nums">
                  {allActivities.filter(a => {
                    const d = new Date(a.timestamp);
                    const now = new Date();
                    return (now - d) < 86400000;
                  }).length}
                </div>
                <div className="text-xs text-muted">Today</div>
              </div>
            </div>

            {/* Activity Timeline */}
            <div className="bg-surface rounded-2xl border border-border shadow-sm p-6">
              <h3 className="font-semibold text-text mb-6 tracking-tight">Recent Activity</h3>
              {allActivities.length === 0 ? (
                <div className="text-center py-12">
                  <Activity className="h-12 w-12 text-muted mx-auto mb-4" />
                  <p className="text-text font-medium">No activity yet</p>
                  <p className="text-muted text-sm mt-1">Actions and events will appear here</p>
                </div>
              ) : (
                <div className="relative">
                  <div className="absolute left-5 top-0 bottom-0 w-0.5 bg-surface-2" />
                  <div className="space-y-6">
                    {allActivities.map((activity, i) => {
                      const config = actionConfig[activity.action] || {
                        icon: <Activity className="h-4 w-4" />,
                        label: activity.action,
                        color: 'bg-surface-2 text-muted',
                        iconBg: 'bg-surface-2',
                      };
                      return (
                        <motion.div
                          key={activity.id}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.05 }}
                          className="flex gap-4"
                        >
                          <div className={`relative z-10 w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${config.iconBg}`}>
                            <div className={config.color.split(' ')[1]}>{config.icon}</div>
                          </div>
                          <div className="flex-1 bg-surface-2 rounded-xl p-4">
                            <div className="flex items-start justify-between gap-4">
                              <div>
                                <div className="flex items-center gap-2 mb-1">
                                  <span className="font-medium text-text text-sm">{activity.actor}</span>
                                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${config.color}`}>
                                    {config.label}
                                  </span>
                                </div>
                                <p className="text-sm text-muted">
                                  {activity.target}
                                </p>
                                {activity.status === 'SUCCESS' && (
                                  <div className="flex items-center gap-1 mt-2">
                                    <CheckCircle2 className="h-3.5 w-3.5 text-success" />
                                    <span className="text-xs text-success font-medium">Success</span>
                                  </div>
                                )}
                              </div>
                              <span className="text-xs text-muted whitespace-nowrap">
                                {getTimeAgo(activity.timestamp)}
                              </span>
                            </div>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
</div>
  );
};
