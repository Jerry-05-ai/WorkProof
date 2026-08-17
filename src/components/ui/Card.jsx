import React from 'react';

export const Card = ({
  children,
  className = '',
  hover = false,
  premium = false,
  padded = true,
  ...props
}) => {
  const radius = premium ? 'rounded-2xl' : 'rounded-xl';
  const pad = padded ? 'p-6' : '';
  const hoverCls = premium
    ? 'transition-all duration-300 ease-out hover:shadow-card-hover hover:border-border-strong hover:-translate-y-1'
    : hover
    ? 'transition-all duration-200 ease-out hover:shadow-md hover:border-border-strong hover:-translate-y-0.5'
    : '';
  return (
    <div
      className={`bg-surface ${radius} border border-border shadow-sm ${pad} ${hoverCls} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

export const CardHeader = ({ children, className = '' }) => {
  return <div className={`mb-5 ${className}`}>{children}</div>;
};

export const CardTitle = ({ children, className = '' }) => {
  return (
    <h3 className={`text-lg font-semibold text-text tracking-tight ${className}`}>
      {children}
    </h3>
  );
};

export const CardContent = ({ children, className = '' }) => {
  return <div className={className}>{children}</div>;
};