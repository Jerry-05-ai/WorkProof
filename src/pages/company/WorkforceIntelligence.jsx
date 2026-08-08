import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Users, TrendingUp, BookOpen, CheckCircle2, Target } from 'lucide-react';
import { Header } from '../../components/layout/Header';
import { Sidebar } from '../../components/layout/Sidebar';
import { Navigation } from '../../components/layout/Navigation';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Input } from '../../components/ui/Input';
import { useApp } from '../../store/context';

export const WorkforceIntelligence = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const { state } = useApp();

  const companyId = state.currentUser?.companyId;
  const companyEmployees = state.employees.filter(e => e.companyId === companyId);
  const companySkills = state.skills.filter(s => s.companyId === companyId);
  const companyProjects = state.projects.filter(p => p.companyId === companyId);

  // We can pick one top employee for demonstration or show a list.
  const topEmployee = companyEmployees.length > 0 ? companyEmployees[0] : null;
  const profile = topEmployee ? {
    name: topEmployee.name,
    role: topEmployee.jobTitle,
    department: topEmployee.department,
    skills: companySkills.filter(s => s.employeeId === topEmployee.id),
    projects: companyProjects.filter(p => p.employeeId === topEmployee.id),
    growthInsights: topEmployee.growthInsights || { nextRole: 'Senior Role' }
  } : null;

  const matchScore = 94;

  return (
    <div className="min-h-screen bg-background">
      <div className="flex">
        <Sidebar />
        <div className="flex-1 flex flex-col min-h-screen pb-16 lg:pb-0">
          <Header />
          <main className="flex-1 p-4 lg:p-6 space-y-6">
            <h2 className="text-2xl font-bold text-text">Workforce Intelligence</h2>

            {/* Talent Search */}
            <Card>
              <h3 className="text-lg font-semibold text-text mb-4">Internal Talent Search</h3>
              <div className="relative mb-6">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted" />
                <input
                  type="text"
                  placeholder='Search: "Python + Machine Learning"'
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-lg border border-border bg-surface-2 text-text placeholder-muted focus:border-primary focus:ring-2 focus:ring-primary/20"
                />
              </div>

              {/* Match Result */}
              {profile ? (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-primary/5 border border-primary/10 rounded-xl p-6"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h4 className="text-lg font-semibold text-text">{profile.name}</h4>
                      <p className="text-sm text-muted">{profile.role} | {profile.department}</p>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-primary">{matchScore}%</div>
                      <p className="text-xs text-muted">Match</p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <p className="text-sm font-medium text-text">Match Breakdown</p>
                    {profile.skills.map((skill) => (
                      <div key={skill.id} className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-2">
                          {searchQuery && searchQuery.toLowerCase().includes(skill.name.toLowerCase()) ? (
                            <CheckCircle2 className="h-4 w-4 text-success" />
                          ) : (
                            <div className="w-4 h-4" />
                          )}
                          <span className={searchQuery && searchQuery.toLowerCase().includes(skill.name.toLowerCase()) ? 'text-text font-medium' : 'text-muted'}>
                            {skill.name}
                          </span>
                        </div>
                        <Badge variant={skill.verified ? 'success' : 'warning'} size="sm">
                          {skill.level}
                        </Badge>
                      </div>
                    ))}
                    <div className="flex items-center gap-2 text-sm text-muted pt-2 border-t border-border">
                      <Target className="h-4 w-4 text-accent" />
                      <span>{profile.projects.length} Completed Projects</span>
                    </div>
                  </div>
                </motion.div>
              ) : (
                <p className="text-muted text-sm">No employees available for match.</p>
              )}
            </Card>

            {/* Promotion Readiness */}
            {profile && (
              <Card>
                <h3 className="text-lg font-semibold text-text mb-4">Promotion Readiness</h3>
                <div className="bg-gradient-to-r from-warning/5 to-primary/5 rounded-lg p-6 border border-warning/10">
                  <p className="text-text font-medium mb-3">
                    {profile.name} is potentially ready for <span className="text-primary">{profile.growthInsights.nextRole}</span>.
                  </p>
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-text mb-2">Reasons:</p>
                    {[
                      'Strong project delivery',
                      'Advanced technical skills',
                      'Consistent performance',
                      'Positive collaboration feedback',
                    ].map((reason, i) => (
                      <div key={i} className="flex items-center gap-2 text-sm text-success">
                        <CheckCircle2 className="h-4 w-4" />
                        {reason}
                      </div>
                    ))}
                  </div>
                </div>
              </Card>
            )}

            {/* Skill Gap Analysis */}
            {profile && (
              <Card>
                <h3 className="text-lg font-semibold text-text mb-4">Skill Gap Analysis</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-surface-2 rounded-lg">
                    <div>
                      <p className="text-sm font-medium text-text">Python</p>
                      <p className="text-xs text-muted">Current</p>
                    </div>
                    <Badge variant="success">Advanced</Badge>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-surface-2 rounded-lg">
                    <div>
                      <p className="text-sm font-medium text-text">Cloud Architecture</p>
                      <p className="text-xs text-muted">Required</p>
                    </div>
                    <Badge variant="warning">Intermediate</Badge>
                  </div>
                  <div className="bg-accent/5 rounded-lg p-4 text-sm text-accent font-medium">
                    Recommendation: Enroll {profile.name} in Cloud Architecture training.
                  </div>
                </div>
              </Card>
            )}
          </main>
        </div>
      </div>
      <Navigation />
    </div>
  );
};