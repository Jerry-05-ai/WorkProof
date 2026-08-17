import React from 'react';

export const Input = ({
  label,
  type = 'text',
  error,
  hint,
  icon: Icon,
  className = '',
  id,
  ...props
}) => {
  const inputId = id || (label ? `input-${label.replace(/\s+/g, '-').toLowerCase()}` : undefined);
  return (
    <div className="w-full">
      {label && (
        <label htmlFor={inputId} className="block text-sm font-medium text-text-secondary mb-1.5">
          {label}
        </label>
      )}
      <div className="relative">
        {Icon && (
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
            <Icon className="h-[18px] w-[18px] text-muted" />
          </div>
        )}
        <input
          id={inputId}
          type={type}
          aria-invalid={error ? 'true' : undefined}
          className={`
            w-full rounded-lg border bg-surface px-3.5 py-2.5 text-sm
            text-text placeholder-muted-light shadow-xs
            transition-all duration-150 ease-out
            focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/10
            disabled:bg-surface-2 disabled:text-muted disabled:cursor-not-allowed
            ${Icon ? 'pl-10' : ''}
            ${error
              ? 'border-danger focus:border-danger focus:ring-danger/10'
              : 'border-border-strong hover:border-muted'}
            ${className}
          `}
          {...props}
        />
      </div>
      {error ? (
        <p className="mt-1.5 text-sm text-danger">{error}</p>
      ) : hint ? (
        <p className="mt-1.5 text-xs text-muted">{hint}</p>
      ) : null}
    </div>
  );
};