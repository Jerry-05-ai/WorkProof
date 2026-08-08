import React from 'react';
import { motion } from 'framer-motion';

/**
 * ChartCard — presentational wrapper for dashboard chart/content panels.
 * Purely visual: title + optional action + body. No data logic.
 */
export const ChartCard = ({ title, action, children, className = '', delay = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay, ease: [0.16, 1, 0.3, 1] }}
      className={`bg-surface rounded-2xl border border-border shadow-sm p-6 transition-shadow duration-300 hover:shadow-md ${className}`}
    >
      {(title || action) && (
        <div className="flex items-center justify-between mb-6">
          {title && <h3 className="text-lg font-semibold text-text tracking-tight">{title}</h3>}
          {action}
        </div>
      )}
      {children}
    </motion.div>
  );
};
