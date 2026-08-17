import React from 'react';
import { CheckCircle2, Clock, Code2 } from 'lucide-react';

export const ProjectCard = ({ name, role, technologies, impact, is_verified, verified, duration, status, start_date, end_date, contribution_summary, performance_rating }) => {
  const isVerified = is_verified !== undefined ? is_verified : (verified || false);
  const techs = typeof technologies === 'string' ? technologies.split(',').map(t => t.trim()).filter(Boolean) : (technologies || []);

  return (
    <div className="p-4 bg-surface-2 rounded-lg border border-border">
      <div className="flex items-start justify-between mb-3">
        <div>
          <h4 className="font-medium text-text">{name}</h4>
          <p className="text-sm text-muted">{role}</p>
        </div>
        <div className="flex items-center gap-2">
          {status && (
            <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
              status === 'completed' ? 'bg-success/10 text-success' :
              status === 'in_progress' ? 'bg-primary/10 text-primary' :
              'bg-surface-2 text-muted'
            }`}>
              {status.replace(/_/g, ' ')}
            </span>
          )}
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
      {techs.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-3">
          {techs.map((tech) => (
            <span
              key={tech}
              className="inline-flex items-center gap-1 px-2 py-1 bg-primary/5 text-primary text-xs rounded-md"
            >
              <Code2 className="h-3 w-3" />
              {tech}
            </span>
          ))}
        </div>
      )}
      <div className="flex items-center justify-between text-sm">
        <div className="flex items-center gap-3">
          {contribution_summary && <span className="text-success font-medium text-xs">{contribution_summary}</span>}
          {impact && <span className="text-success font-medium text-xs">{impact}</span>}
          {performance_rating && <span className="text-muted text-xs">Rating: {performance_rating}/5</span>}
        </div>
        <div className="flex items-center gap-2">
          {start_date && <span className="text-muted text-xs">{start_date}</span>}
          {end_date && <span className="text-muted text-xs">→ {end_date}</span>}
          {duration && <span className="text-muted text-xs">{duration}</span>}
        </div>
      </div>
    </div>
  );
};