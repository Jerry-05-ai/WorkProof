import React from 'react';

const variants = {
  primary: 'bg-primary-soft text-primary ring-1 ring-inset ring-primary/15',
  secondary: 'bg-teal-50 text-secondary ring-1 ring-inset ring-secondary/15',
  accent: 'bg-violet-50 text-accent ring-1 ring-inset ring-accent/15',
  success: 'bg-success-soft text-success ring-1 ring-inset ring-success/15',
  warning: 'bg-warning-soft text-warning ring-1 ring-inset ring-warning/15',
  danger: 'bg-danger-soft text-danger ring-1 ring-inset ring-danger/15',
  neutral: 'bg-surface-2 text-text-secondary ring-1 ring-inset ring-border',
};

const sizes = {
  sm: 'px-2 py-0.5 text-xs',
  md: 'px-2.5 py-1 text-xs',
  lg: 'px-3.5 py-1.5 text-sm',
};

export const Badge = ({ children, variant = 'primary', size = 'sm', className = '' }) => {
  return (
    <span
      className={`
        inline-flex items-center gap-1 font-semibold rounded-full leading-none
        ${variants[variant] || variants.primary}
        ${sizes[size] || sizes.sm}
        ${className}
      `}
    >
      {children}
    </span>
  );
};