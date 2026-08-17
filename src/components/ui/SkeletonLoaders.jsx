import React from 'react';

const shimmer = 'shimmer rounded';

export const SkeletonText = ({ className = '' }) => (
  <div className={`h-4 ${shimmer} ${className}`} />
);

export const SkeletonCard = () => (
  <div className="bg-surface rounded-xl border border-border shadow-sm p-6 space-y-4">
    <div className="flex items-center gap-4">
      <div className={`w-12 h-12 rounded-xl ${shimmer}`} />
      <div className="flex-1 space-y-2">
        <SkeletonText className="w-3/4" />
        <SkeletonText className="w-1/2" />
      </div>
    </div>
    <SkeletonText className="w-full" />
    <SkeletonText className="w-5/6" />
    <div className="flex gap-2">
      <div className={`h-7 w-16 rounded-full ${shimmer}`} />
      <div className={`h-7 w-20 rounded-full ${shimmer}`} />
      <div className={`h-7 w-14 rounded-full ${shimmer}`} />
    </div>
  </div>
);

export const SkeletonProfile = () => (
  <div className="bg-surface rounded-xl border border-border shadow-sm p-8 space-y-6">
    <div className="flex items-center gap-6">
      <div className={`w-20 h-20 rounded-2xl ${shimmer}`} />
      <div className="flex-1 space-y-3">
        <SkeletonText className="w-48" />
        <SkeletonText className="w-32" />
        <SkeletonText className="w-24" />
      </div>
    </div>
    <div className="grid grid-cols-4 gap-4">
      {[1,2,3,4].map(i => (
        <div key={i} className="text-center space-y-2">
          <div className={`h-8 w-full ${shimmer}`} />
          <SkeletonText className="w-3/4 mx-auto" />
        </div>
      ))}
    </div>
  </div>
);

export const SkeletonChart = () => (
  <div className="bg-surface rounded-xl border border-border shadow-sm p-6">
    <SkeletonText className="w-40 mb-6" />
    <div className={`w-full h-64 ${shimmer}`} />
  </div>
);

export const SkeletonList = ({ rows = 4 }) => (
  <div className="bg-surface rounded-xl border border-border shadow-sm p-6 space-y-4">
    {Array.from({ length: rows }).map((_, i) => (
      <div key={i} className="flex items-center gap-4">
        <div className={`w-10 h-10 rounded-full ${shimmer}`} />
        <div className="flex-1 space-y-2">
          <SkeletonText className="w-3/4" />
          <SkeletonText className="w-1/2" />
        </div>
        <div className={`h-8 w-20 rounded-lg ${shimmer}`} />
      </div>
    ))}
  </div>
);

export const SkeletonStatsRow = () => (
  <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
    {[1,2,3,4].map(i => (
      <div key={i} className="bg-surface rounded-xl border border-border shadow-sm p-5 space-y-3">
        <div className={`w-10 h-10 rounded-xl ${shimmer}`} />
        <div className={`h-8 w-16 ${shimmer}`} />
        <SkeletonText className="w-3/4" />
      </div>
    ))}
  </div>
);

export const SkeletonCandidateCard = () => (
  <div className="bg-surface rounded-xl border border-border shadow-sm p-6 space-y-4">
    <div className="flex items-start justify-between">
      <div className="flex items-start gap-4">
        <div className={`w-14 h-14 rounded-2xl ${shimmer}`} />
        <div className="space-y-2">
          <SkeletonText className="w-32" />
          <SkeletonText className="w-24" />
          <div className={`h-5 w-16 rounded-full ${shimmer}`} />
        </div>
      </div>
      <div className="text-right space-y-2">
        <div className={`h-10 w-16 rounded-xl ${shimmer}`} />
        <SkeletonText className="w-12 ml-auto" />
      </div>
    </div>
    <div className="flex gap-2">
      {[1,2,3].map(i => <div key={i} className={`h-7 w-16 rounded-full ${shimmer}`} />)}
    </div>
    <div className="flex gap-2">
      <div className={`h-9 flex-1 rounded-lg ${shimmer}`} />
      <div className={`h-9 w-9 rounded-lg ${shimmer}`} />
      <div className={`h-9 flex-1 rounded-lg ${shimmer}`} />
    </div>
  </div>
);
