import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Award, CheckCircle2, Star, Clock, Lock, FileText, Globe, Unlock } from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
} from 'recharts';
import { StatsCard } from '../../components/dashboard/StatsCard';
import { ChartCard } from '../../components/dashboard/ChartCard';
import { ActivityFeed } from '../../components/dashboard/ActivityFeed';
import { Button } from '../../components/ui/Button';
import { Modal } from '../../components/ui/Modal';
import { employeeApi } from '../../services/company';
import toast from 'react-hot-toast';

export const EmployeeDashboard = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showReport, setShowReport] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await employeeApi.getDashboard();
        if (result.success) {
          setData(result);
        }
      } catch (err) {
        toast.error('Failed to load dashboard');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  const employee = data?.employee || {};
  const profile = data?.profile || { skills: [], projects: [], reviews: [], behaviors: [], reports: [] };
  const privacy = data?.privacy || { profile_visibility: 'private' };

  const verifiedSkills = profile.skills.filter(s => s.is_verified).length;
  const completedProjects = profile.projects.filter(p => p.status === 'completed').length;
  const lastReview = profile.reviews.length > 0 ? profile.reviews[0].rating : null;
  // "Former" means the employee has left and now controls their own profile
  // visibility. The company sets employment_status to 'inactive' (not
  // 'terminated') on leaving and transfers ownership via is_employee_controlled,
  // so that flag is the reliable signal. Keep the status checks as a fallback.
  const isFormer = !!privacy.is_employee_controlled
    || employee.employment_status === 'terminated'
    || employee.employment_status === 'inactive';
  const isPublic = privacy.profile_visibility === 'public';

  const skillData = profile.skills.map(s => ({
    skill: s.name || s.skill_name,
    level: s.proficiency_level === 'expert' ? 100 : s.proficiency_level === 'advanced' ? 75 : s.proficiency_level === 'intermediate' ? 50 : 25,
  }));

  const latestReport = profile.reports.length > 0 ? profile.reports[0] : null;

  return (
    <>
      <div className="space-y-6">
        {/* Privacy Status */}
            {!isFormer && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-warning/10 border border-warning/20 rounded-xl p-4 flex items-center gap-3"
              >
                <div className="p-2 bg-warning/20 rounded-lg">
                  <Lock className="h-5 w-5 text-warning" />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-text font-medium">Your profile is currently private.</p>
                  <p className="text-xs text-muted mt-0.5">
                    While you are employed at {employee.company_name || 'your company'}, your professional profile is visible only to you and authorized members of your company.
                  </p>
                </div>
                <span className="px-3 py-1 bg-warning/20 text-warning text-xs font-semibold rounded-full flex items-center gap-1.5">
                  <Lock className="h-3 w-3" />
                  PRIVATE
                </span>
              </motion.div>
            )}

            {/* Profile Visibility (only after leaving the company) */}
            {isFormer && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`rounded-xl p-4 border flex items-center gap-3 ${
                  isPublic ? 'bg-success/10 border-success/20' : 'bg-primary/5 border-primary/15'
                }`}
              >
                <div className={`p-2 rounded-lg ${isPublic ? 'bg-success/20' : 'bg-primary/10'}`}>
                  {isPublic ? (
                    <Globe className="h-5 w-5 text-success" />
                  ) : (
                    <Lock className="h-5 w-5 text-primary" />
                  )}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <p className="text-sm text-text font-medium">Profile Visibility</p>
                    <span
                      className={`px-2 py-0.5 text-xs font-semibold rounded-full ${
                        isPublic ? 'bg-success/20 text-success' : 'bg-primary/15 text-primary'
                      }`}
                    >
                      {isPublic ? 'PUBLIC' : 'PRIVATE'}
                    </span>
                  </div>
                  <p className="text-xs text-muted mt-0.5">
                    {isPublic
                      ? 'Your verified profile is public and can be discovered by verified companies. Your complete verified work history stays read-only.'
                      : 'You now control your profile. Make it public so verified companies can discover your verified work history, or keep it private.'}
                  </p>
                </div>
                <Link
                  to="/employee/privacy"
                  className={`px-3 py-1.5 text-xs font-semibold rounded-lg flex items-center gap-1.5 whitespace-nowrap ${
                    isPublic
                      ? 'bg-success/15 text-success hover:bg-success/25'
                      : 'bg-primary/10 text-primary hover:bg-primary/20'
                  } transition-colors`}
                >
                  {isPublic ? <Unlock className="h-3.5 w-3.5" /> : <Globe className="h-3.5 w-3.5" />}
                  Manage Visibility
                </Link>
              </motion.div>
            )}

            {/* Latest Report Card */}
            {latestReport && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-gradient-to-r from-primary/5 to-accent/5 rounded-xl p-4 border border-primary/10 cursor-pointer hover:shadow-md transition-shadow"
                onClick={() => setShowReport(latestReport)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <FileText className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-text">Latest Monthly Report</p>
                      <p className="text-xs text-muted">
                        {latestReport.month}/{latestReport.year} · Score: {latestReport.performance_score?.toFixed(1)} · 
                        Growth: {latestReport.growth_percentage?.toFixed(1)}%
                      </p>
                    </div>
                  </div>
                  <span className="text-xs text-primary font-medium">View →</span>
                </div>
              </motion.div>
            )}

            {/* Stats Grid */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
              <StatsCard
                icon={Award}
                label="Verified Skills"
                value={verifiedSkills}
                color="primary"
              />
              <StatsCard
                icon={CheckCircle2}
                label="Completed Projects"
                value={completedProjects}
                color="success"
              />
              <StatsCard
                icon={Star}
                label="Last Review"
                value={lastReview || 'N/A'}
                subtext={lastReview ? '/ 5.0' : ''}
                color="accent"
              />
              <StatsCard
                icon={Clock}
                label="Reports"
                value={profile.reports.length}
                color="secondary"
              />
            </div>

            {/* Charts */}
            <div className="grid lg:grid-cols-2 gap-6">
              {/* Skills Radar */}
              <ChartCard title="Skill Proficiency">
                {skillData.length > 0 ? (
                  <ResponsiveContainer width="100%" height={300}>
                    <RadarChart data={skillData}>
                      <PolarGrid stroke="#E5E7EB" />
                      <PolarAngleAxis dataKey="skill" tick={{ fontSize: 12, fill: '#64748B' }} />
                      <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fontSize: 10, fill: '#64748B' }} />
                      <Radar
                        name="Skills"
                        dataKey="level"
                        stroke="#4338CA"
                        fill="#4338CA"
                        fillOpacity={0.2}
                      />
                      <Tooltip />
                    </RadarChart>
                  </ResponsiveContainer>
                ) : (
                  <div className="h-[300px] flex items-center justify-center text-muted">No verified skills yet.</div>
                )}
              </ChartCard>

              {/* Reports History */}
              <ChartCard title="Monthly Performance" delay={0.1}>
                {profile.reports.length > 0 ? (
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={[...profile.reports].reverse()}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#F1F1F1" />
                      <XAxis dataKey="month" tick={{ fontSize: 12, fill: '#64748B' }} />
                      <YAxis domain={[0, 100]} tick={{ fontSize: 12, fill: '#64748B' }} />
                      <Tooltip />
                      <Bar dataKey="performance_score" fill="#0F766E" radius={[4, 4, 0, 0]} name="Score" />
                    </BarChart>
                  </ResponsiveContainer>
                ) : (
                  <div className="h-[300px] flex items-center justify-center text-muted">No reports yet.</div>
                )}
              </ChartCard>
            </div>

        {/* Activity Feed */}
        <ActivityFeed />
      </div>

      {/* Report Detail Modal */}
      <Modal isOpen={!!showReport} onClose={() => setShowReport(null)} title="Monthly Progress Report">
        {showReport && (
          <div className="space-y-6">
            <div className="text-center">
              <p className="text-3xl font-bold text-primary">{showReport.performance_score?.toFixed(1)}</p>
              <p className="text-sm text-muted">Overall Performance Score</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-surface-2 rounded-lg p-4 text-center">
                <p className="text-xl font-bold text-text">{showReport.behavior_score?.toFixed(1)}</p>
                <p className="text-xs text-muted">Behavior Score</p>
              </div>
              <div className="bg-surface-2 rounded-lg p-4 text-center">
                <p className="text-xl font-bold text-text">{showReport.growth_percentage?.toFixed(1)}%</p>
                <p className="text-xs text-muted">Growth</p>
              </div>
              <div className="bg-surface-2 rounded-lg p-4 text-center">
                <p className="text-xl font-bold text-text">{showReport.projects_completed}</p>
                <p className="text-xs text-muted">Projects Completed</p>
              </div>
              <div className="bg-surface-2 rounded-lg p-4 text-center">
                <p className="text-xl font-bold text-text">{showReport.promotion_readiness?.toFixed(1)}%</p>
                <p className="text-xs text-muted">Promotion Readiness</p>
              </div>
            </div>

            {showReport.skills_improved?.length > 0 && (
              <div>
                <h4 className="font-semibold text-text mb-2">Skills Improved</h4>
                <div className="space-y-1">
                  {showReport.skills_improved.map((s, i) => (
                    <div key={i} className="flex items-center gap-2 text-sm text-success">
                      <CheckCircle2 className="h-4 w-4" />
                      {s.level} (growth: +{s.growth})
                    </div>
                  ))}
                </div>
              </div>
            )}

            {showReport.next_role && (
              <div className="bg-accent/10 rounded-lg p-4 text-center">
                <p className="text-sm text-muted">Recommended Next Role</p>
                <p className="text-lg font-bold text-accent">{showReport.next_role}</p>
              </div>
            )}

            <p className="text-xs text-muted text-center">
              Generated: {showReport.generated_date ? new Date(showReport.generated_date).toLocaleString() : 'N/A'}
            </p>
          </div>
        )}
      </Modal>
    </>
  );
};