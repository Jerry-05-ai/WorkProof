import React from 'react';

const variants = {
  primary:
    'bg-primary text-white shadow-sm hover:bg-primary-hover hover:shadow-primary-glow active:bg-primary-hover focus-visible:ring-primary/40',
  secondary:
    'bg-secondary text-white shadow-sm hover:bg-teal-800 active:bg-teal-900 focus-visible:ring-secondary/40',
  accent:
    'bg-accent text-white shadow-sm hover:bg-violet-700 active:bg-violet-800 focus-visible:ring-accent/40',
  success:
    'bg-success text-white shadow-sm hover:bg-emerald-700 active:bg-emerald-800 focus-visible:ring-success/40',
  danger:
    'bg-danger text-white shadow-sm hover:bg-red-700 active:bg-red-800 focus-visible:ring-danger/40',
  ghost:
    'bg-transparent text-text-secondary hover:bg-surface-2 hover:text-text active:bg-border focus-visible:ring-primary/30',
  outline:
    'border border-border-strong bg-surface text-text-secondary shadow-xs hover:bg-surface-2 hover:border-primary hover:text-primary active:bg-primary-soft focus-visible:ring-primary/30',
};

const sizes = {
  sm: 'px-3 py-1.5 text-sm rounded-md gap-1.5',
  md: 'px-4 py-2.5 text-sm rounded-lg gap-2',
  lg: 'px-6 py-3 text-base rounded-lg gap-2',
  xl: 'px-8 py-3.5 text-base rounded-xl gap-2.5',
};

export const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  disabled = false,
  loading = false,
  ...props
}) => {
  return (
    <button
      className={`
        inline-flex items-center justify-center font-semibold whitespace-nowrap
        transition-all duration-200 ease-out
        focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-1
        disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none disabled:pointer-events-none
        active:scale-[0.97]
        ${variants[variant] || variants.primary}
        ${sizes[size] || sizes.md}
        ${className}
      `}
      disabled={disabled || loading}
      {...props}
    >
      {loading && (
        <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" aria-hidden="true">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
        </svg>
      )}
      {children}
    </button>
  );
};