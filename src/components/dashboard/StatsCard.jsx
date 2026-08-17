import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown } from 'lucide-react';

export const StatsCard = ({ icon: Icon, label, value, subtext, color = 'primary', trend }) => {
  const colorMap = {
    primary: 'bg-primary-soft text-primary',
    secondary: 'bg-teal-50 text-secondary',
    accent: 'bg-violet-50 text-accent',
    success: 'bg-success-soft text-success',
    warning: 'bg-warning-soft text-warning',
    danger: 'bg-danger-soft text-danger',
  };

  const accentMap = {
    primary: 'from-primary/60',
    secondary: 'from-secondary/60',
    accent: 'from-accent/60',
    success: 'from-success/60',
    warning: 'from-warning/60',
    danger: 'from-danger/60',
  };

  const trendUp = typeof trend === 'number' ? trend >= 0 : undefined;

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className="stat-card"
    >
      {/* Subtle top accent line */}
      <div
        className={`pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 ${accentMap[color] || accentMap.primary}`}
      />
      <div className="flex items-start justify-between mb-4">
        <div
          className={`p-2.5 rounded-xl transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-3 ${colorMap[color] || colorMap.primary}`}
        >
          {Icon && <Icon className="h-5 w-5" strokeWidth={2.2} />}
        </div>
        {trendUp !== undefined && (
          <span
            className={`inline-flex items-center gap-1 text-xs font-semibold rounded-full px-2 py-0.5 ${
              trendUp ? 'bg-emerald-50 text-success' : 'bg-red-50 text-danger'
            }`}
          >
            {trendUp ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
            {Math.abs(trend)}%
          </span>
        )}
      </div>
      <p className="text-3xl font-bold text-text tracking-tight mb-1 tabular-nums">{value}</p>
      <p className="text-sm font-medium text-muted">{label}</p>
      {subtext && <p className="text-xs text-muted mt-1">{subtext}</p>}
    </motion.div>
  );
};