import React, { useState, useEffect } from 'react';
import { Users, CheckCircle2, GitMerge, TrendingUp } from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
} from 'recharts';
import { StatsCard } from '../../components/dashboard/StatsCard';
import { ChartCard } from '../../components/dashboard/ChartCard';
import { ActivityFeed } from '../../components/dashboard/ActivityFeed';
import { companyApi } from '../../services/company';

const COLORS = ['#4338CA', '#0F766E', '#7C3AED', '#D97706', '#DC2626', '#059669'];

export const CompanyDashboard = () => {
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const data = await companyApi.getDashboard();
        if (data.success) {
          setDashboardData(data);
        }
      } catch (err) {
        setError(err.message || 'Failed to load dashboard');
      } finally {
        setLoading(false);
      }
    };
    fetchDashboard();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  const stats = dashboardData?.stats || {
    total_employees: 0,
    active_employees: 0,
    verified_employees: 0,
    average_performance: null,
  };

  const departments = dashboardData?.departments || [];
  const skillDistribution = dashboardData?.skill_distribution || [];
  const recentActivity = dashboardData?.recent_activity || [];

  const departmentDistribution = departments.map(d => ({
    name: d.department,
    value: d.count,
  }));

  const performanceTrends = [
    { month: 'Jan', average: 4.2 },
    { month: 'Feb', average: 4.3 },
    { month: 'Mar', average: 4.1 },
    { month: 'Apr', average: 4.4 },
    { month: 'May', average: 4.5 },
    { month: 'Jun', average: 4.3 },
  ];

  return (
    <div className="space-y-6">
            {/* Stats Grid */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
              <StatsCard
                icon={Users}
                label="Active Employees"
                value={stats.active_employees}
                color="primary"
              />
              <StatsCard
                icon={CheckCircle2}
                label="Verified Employees"
                value={stats.verified_employees}
                color="success"
              />
              <StatsCard
                icon={GitMerge}
                label="Total Employees"
                value={stats.total_employees}
                color="accent"
              />
              <StatsCard
                icon={TrendingUp}
                label="Avg Performance"
                value={stats.average_performance || 'N/A'}
                subtext={stats.average_performance ? '/ 5.0' : ''}
                color="warning"
              />
            </div>

            {stats.total_employees === 0 ? (
              <div className="bg-surface rounded-2xl border border-border shadow-sm p-12 text-center">
                <div className="w-16 h-16 icon-tile mx-auto mb-5">
                  <Users className="w-8 h-8" strokeWidth={1.8} />
                </div>
                <h2 className="text-xl font-semibold text-text mb-2 tracking-tight">Welcome to your workspace</h2>
                <p className="text-muted mb-6 max-w-md mx-auto leading-relaxed">You haven't added any employees yet. Add your first employee to start building verified work records.</p>
              </div>
            ) : (
              <>
                <div className="grid lg:grid-cols-2 gap-6">
                  {/* Skill Distribution */}
                  <ChartCard title="Skill Distribution">
                    {skillDistribution.length > 0 ? (
                      <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={skillDistribution}>
                          <CartesianGrid strokeDasharray="3 3" stroke="#F1F1F1" />
                          <XAxis dataKey="name" tick={{ fontSize: 12, fill: '#64748B' }} />
                          <YAxis tick={{ fontSize: 12, fill: '#64748B' }} />
                          <Tooltip
                            contentStyle={{
                              background: '#FFFFFF',
                              border: 'none',
                              borderRadius: '8px',
                              boxShadow: '0 4px 6px rgba(0,0,0,0.07)',
                            }}
                          />
                          <Bar dataKey="count" fill="#4338CA" radius={[4, 4, 0, 0]} />
                        </BarChart>
                      </ResponsiveContainer>
                    ) : (
                      <div className="h-[300px] flex items-center justify-center text-muted">No skills recorded yet.</div>
                    )}
                  </ChartCard>

                  {/* Department Distribution */}
                  <ChartCard title="Department Distribution" delay={0.1}>
                    <ResponsiveContainer width="100%" height={300}>
                      <PieChart>
                        <Pie
                          data={departmentDistribution}
                          cx="50%"
                          cy="50%"
                          innerRadius={60}
                          outerRadius={100}
                          paddingAngle={5}
                          dataKey="value"
                        >
                          {departmentDistribution.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip
                          contentStyle={{
                            background: '#FFFFFF',
                            border: 'none',
                            borderRadius: '8px',
                            boxShadow: '0 4px 6px rgba(0,0,0,0.07)',
                          }}
                        />
                      </PieChart>
                    </ResponsiveContainer>
                    <div className="flex flex-wrap gap-3 mt-4">
                      {departmentDistribution.map((item, index) => (
                        <div key={item.name} className="flex items-center gap-2">
                          <div
                            className="w-3 h-3 rounded-full"
                            style={{ backgroundColor: COLORS[index % COLORS.length] }}
                          />
                          <span className="text-xs text-muted">{item.name}</span>
                        </div>
                      ))}
                    </div>
                  </ChartCard>
                </div>

                {/* Performance Trends */}
                <ChartCard title="Performance Trends" delay={0.2}>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={performanceTrends}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#F1F1F1" />
                      <XAxis dataKey="month" tick={{ fontSize: 12, fill: '#64748B' }} />
                      <YAxis domain={[3.5, 5]} tick={{ fontSize: 12, fill: '#64748B' }} />
                      <Tooltip
                        contentStyle={{
                          background: '#FFFFFF',
                          border: 'none',
                          borderRadius: '8px',
                          boxShadow: '0 4px 6px rgba(0,0,0,0.07)',
                        }}
                      />
                      <Line
                        type="monotone"
                        dataKey="average"
                        stroke="#4338CA"
                        strokeWidth={2}
                        dot={{ fill: '#4338CA', strokeWidth: 2 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </ChartCard>

                {/* Activity Feed */}
                <ActivityFeed activities={recentActivity} />
              </>
            )}
</div>
  );
};