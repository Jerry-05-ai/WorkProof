import React from 'react';
import { motion } from 'framer-motion';

export const EmptyState = ({ icon, title, description, action }) => (
  <motion.div
    initial={{ opacity: 0, y: 12 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
    className="flex flex-col items-center justify-center py-16 px-6 text-center"
  >
    <div className="w-16 h-16 rounded-2xl bg-surface-2 border border-border flex items-center justify-center text-3xl mb-5">
      {icon}
    </div>
    <h3 className="text-base font-semibold text-text mb-1.5">{title}</h3>
    {description && <p className="text-muted text-sm max-w-xs leading-relaxed">{description}</p>}
    {action && <div className="mt-6">{action}</div>}
  </motion.div>
);

// Specific empty states
export const NoNotifications = () => (
  <EmptyState icon="🔔" title="You're all caught up" description="New notifications will show up here." />
);

export const NoSavedCandidates = () => (
  <EmptyState
    icon="📂"
    title="No saved candidates yet"
    description="Save candidates you're interested in to find them here."
  />
);

export const NoSearchResults = () => (
  <EmptyState
    icon="🔍"
    title="No results found"
    description="Try adjusting your search filters or search query."
  />
);

export const NoOpportunities = () => (
  <EmptyState
    icon="📋"
    title="No opportunities yet"
    description="Hiring opportunities sent by recruiters will appear here."
  />
);

export const NoActivities = () => (
  <EmptyState
    icon="📊"
    title="No activity yet"
    description="Actions and events will appear here as they happen."
  />
);
