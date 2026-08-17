import React from 'react';
import { Users, Bookmark, Briefcase, TrendingUp } from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
} from 'recharts';
import { StatsCard } from '../../components/dashboard/StatsCard';
import { ChartCard } from '../../components/dashboard/ChartCard';
import { ActivityFeed } from '../../components/dashboard/ActivityFeed';
import { useApp } from '../../store/context';

const talentPoolData = [
  { category: 'Engineering', count: 85 },
  { category: 'Data Science', count: 45 },
  { category: 'Design', count: 38 },
  { category: 'Product', count: 32 },
  { category: 'Marketing', count: 28 },
  { category: 'Operations', count: 22 },
];

const hiringTrends = [
  { month: 'Jan', hires: 12 },
  { month: 'Feb', hires: 15 },
  { month: 'Mar', hires: 10 },
  { month: 'Apr', hires: 18 },
  { month: 'May', hires: 14 },
  { month: 'Jun', hires: 20 },
];

export const RecruiterDashboard = () => {
  const { state } = useApp();

  const stats = {
    publicProfessionals: '12.4k',
    savedCandidates: 45,
    activeOpportunities: 12,
    responseRate: 68
  };

  return (
    <div className="space-y-6">
            {/* Stats Grid */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
              <StatsCard
                icon={Users}
                label="Public Verified Professionals"
                value={stats.publicProfessionals}
                color="primary"
              />
              <StatsCard
                icon={Bookmark}
                label="Saved Candidates"
                value={stats.savedCandidates}
                color="accent"
              />
              <StatsCard
                icon={Briefcase}
                label="Active Opportunities"
                value={stats.activeOpportunities}
                color="secondary"
              />
              <StatsCard
                icon={TrendingUp}
                label="Response Rate"
                value={`${stats.responseRate}%`}
                color="success"
              />
            </div>

            {/* Charts */}
            <div className="grid lg:grid-cols-2 gap-6">
              {/* Talent Pool */}
              <ChartCard title="Talent Pool by Category">
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={talentPoolData} layout="vertical">
                    <CartesianGrid strokeDasharray="3 3" stroke="#F1F1F1" />
                    <XAxis type="number" tick={{ fontSize: 12, fill: '#64748B' }} />
                    <YAxis
                      dataKey="category"
                      type="category"
                      tick={{ fontSize: 12, fill: '#64748B' }}
                      width={100}
                    />
                    <Tooltip
                      contentStyle={{
                        background: '#FFFFFF',
                        border: 'none',
                        borderRadius: '8px',
                        boxShadow: '0 4px 6px rgba(0,0,0,0.07)',
                      }}
                    />
                    <Bar dataKey="count" fill="#7C3AED" radius={[0, 4, 4, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </ChartCard>

              {/* Hiring Trends */}
              <ChartCard title="Hiring Trends" delay={0.1}>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={hiringTrends}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#F1F1F1" />
                    <XAxis dataKey="month" tick={{ fontSize: 12, fill: '#64748B' }} />
                    <YAxis tick={{ fontSize: 12, fill: '#64748B' }} />
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
                      dataKey="hires"
                      stroke="#0F766E"
                      strokeWidth={2}
                      dot={{ fill: '#0F766E', strokeWidth: 2 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </ChartCard>
            </div>

            {/* Activity Feed */}
            <ActivityFeed />
</div>
  );
};