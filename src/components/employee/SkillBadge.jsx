import React from 'react';
import { CheckCircle2, Clock, Award } from 'lucide-react';

export const SkillBadge = ({ name, skill_name, level, proficiency_level, is_verified, verified, evidence, endorsements, category, years_experience }) => {
  const displayName = name || skill_name || '';
  const displayLevel = level || proficiency_level || 'beginner';
  const isVerified = is_verified !== undefined ? is_verified : (verified || false);

  const levelColors = {
    advanced: 'bg-primary/10 text-primary',
    expert: 'bg-accent/10 text-accent',
    intermediate: 'bg-secondary/10 text-secondary',
    beginner: 'bg-surface-2 text-muted',
  };

  return (
    <div className="flex items-center justify-between p-4 bg-surface-2 rounded-lg border border-border">
      <div className="flex items-center gap-3">
        <div className={`p-2 rounded-lg ${isVerified ? 'bg-success/10' : 'bg-warning/10'}`}>
          {isVerified ? (
            <CheckCircle2 className="h-5 w-5 text-success" />
          ) : (
            <Clock className="h-5 w-5 text-warning" />
          )}
        </div>
        <div>
          <div className="flex items-center gap-2">
            <span className="font-medium text-text">{displayName}</span>
            <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${levelColors[displayLevel] || 'bg-primary/10 text-primary'}`}>
              {displayLevel}
            </span>
          </div>
          <div className="flex items-center gap-3 mt-1">
            {category && <span className="text-xs text-muted">{category}</span>}
            {years_experience && <span className="text-xs text-muted">{years_experience} years</span>}
          </div>
        </div>
      </div>
      <div>
        {isVerified ? (
          <span className="flex items-center gap-1 text-xs text-success font-medium">
            <CheckCircle2 className="h-3.5 w-3.5" />
            Verified
          </span>
        ) : (
          <span className="flex items-center gap-1 text-xs text-warning font-medium">
            <Clock className="h-3.5 w-3.5" />
            Pending
          </span>
        )}
      </div>
    </div>
  );
};