import React from 'react';

export const Skeleton = ({ className = '' }) => {
  return <div className={`shimmer rounded-lg ${className}`} />;
};

export const SkeletonCard = () => {
  return (
    <div className="bg-surface rounded-xl border border-border shadow-sm p-6">
      <Skeleton className="h-4 w-24 mb-4" />
      <Skeleton className="h-8 w-16 mb-2" />
      <Skeleton className="h-3 w-32" />
    </div>
  );
};

export const SkeletonTable = ({ rows = 5 }) => {
  return (
    <div className="space-y-3">
      {Array.from({ length: rows }).map((_, i) => (
        <Skeleton key={i} className="h-12 w-full" />
      ))}
    </div>
  );
};
