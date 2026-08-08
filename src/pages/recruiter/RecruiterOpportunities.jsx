import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Briefcase, Send, CheckCircle2, Clock, Globe, Bell,
  ChevronRight, Building, MapPin, Star, X, MessageSquare
} from 'lucide-react';
import { Header } from '../../components/layout/Header';
import { Sidebar } from '../../components/layout/Sidebar';
import { Navigation } from '../../components/layout/Navigation';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { NoOpportunities } from '../../components/ui/EmptyState';
import { useApp } from '../../store/context';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const OPPORTUNITY_STATUSES = ['sent', 'viewed', 'interested', 'interview', 'accepted'];

const statusColors = {
  sent: 'primary',
  viewed: 'secondary',
  interested: 'accent',
  interview: 'warning',
  accepted: 'success',
  declined: 'danger',
};

const statusLabels = {
  sent: 'Sent',
  viewed: 'Viewed',
  interested: 'Interested',
  interview: 'Interview',
  accepted: 'Accepted',
  declined: 'Declined',
};

const OpportunityTimeline = ({ timeline, currentStatus }) => {
  const statuses = OPPORTUNITY_STATUSES;
  const currentIdx = statuses.indexOf(currentStatus);
  const isDeclined = currentStatus === 'declined';

  return (
    <div className="mt-4">
      {isDeclined ? (
        <div className="flex items-center gap-2 text-sm text-danger font-medium p-3 bg-danger/10 rounded-xl">
          <X className="h-4 w-4" />
          Opportunity declined
        </div>
      ) : (
        <div className="flex items-center gap-1">
          {statuses.map((status, i) => {
            const isDone = i < currentIdx;
            const isCurrent = i === currentIdx;
            const isPending = i > currentIdx;
            return (
              <React.Fragment key={status}>
                <div className="flex flex-col items-center gap-1">
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: i * 0.1 }}
                    className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                      isDone ? 'bg-success text-white' :
                      isCurrent ? 'bg-primary text-white ring-2 ring-primary/30' :
                      'bg-surface-2 text-muted'
                    }`}
                  >
                    {isDone ? '✓' : i + 1}
                  </motion.div>
                  <span className={`text-xs font-medium capitalize hidden lg:block ${
                    isDone ? 'text-success' : isCurrent ? 'text-primary' : 'text-muted'
                  }`}>
                    {status}
                  </span>
                </div>
                {i < statuses.length - 1 && (
                  <div className={`flex-1 h-0.5 mb-4 lg:mb-0 transition-all ${isDone ? 'bg-success' : 'bg-border'}`} />
                )}
              </React.Fragment>
            );
          })}
        </div>
      )}
    </div>
  );
};

const DEFAULT_OPPORTUNITY = {
  id: 'opp_001',
  candidateId: 'emp_001',
  candidateName: 'Ayan Malik',
  position: 'Senior Machine Learning Engineer',
  company: 'BrightHire Technologies',
  status: 'sent',
  message: 'Your verified experience matches a role we are hiring for.',
  salary: '$120,000 – $150,000',
  arrangement: 'Remote',
  sentDate: new Date().toISOString(),
  viewedDate: null,
  responseDate: null,
  responseMessage: null,
  timeline: [{ status: 'sent', date: new Date().toISOString(), label: 'Opportunity Sent' }],
};

export const RecruiterOpportunities = () => {
  const { state } = useApp();
  const navigate = useNavigate();

  const stateOpps = state.recruiter?.hiringOpportunities || [];
  const opportunities = stateOpps.length > 0 ? stateOpps : [DEFAULT_OPPORTUNITY];

  const stats = {
    total: opportunities.length,
    sent: opportunities.filter(o => o.status === 'sent').length,
    interested: opportunities.filter(o => o.status === 'interested' || o.status === 'interview').length,
    accepted: opportunities.filter(o => o.status === 'accepted').length,
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="flex">
        <Sidebar />
        <div className="flex-1 flex flex-col min-h-screen pb-16 lg:pb-0">
          <Header />
          <main className="flex-1 p-4 lg:p-6 space-y-6">

            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-text">Hiring Opportunities</h2>
                <p className="text-muted mt-1">Track opportunities sent to candidates</p>
              </div>
              <Button variant="primary" onClick={() => navigate('/recruiter/talent')}>
                <Send className="h-4 w-4 mr-2" />
                Send New
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { label: 'Total Sent', value: stats.total, color: 'text-primary', bg: 'bg-primary/10' },
                { label: 'Awaiting Response', value: stats.sent, color: 'text-secondary', bg: 'bg-secondary/10' },
                { label: 'Interested', value: stats.interested, color: 'text-accent', bg: 'bg-accent/10' },
                { label: 'Accepted', value: stats.accepted, color: 'text-success', bg: 'bg-success/10' },
              ].map(({ label, value, color, bg }) => (
                <div key={label} className="bg-surface rounded-2xl border border-border shadow-sm p-5 transition-all duration-300 hover:shadow-md hover:border-border-strong hover:-translate-y-0.5">
                  <div className={`text-2xl font-bold tabular-nums ${color}`}>{value}</div>
                  <div className="text-xs text-muted mt-1">{label}</div>
                </div>
              ))}
            </div>

            {/* Opportunities List */}
            {opportunities.length === 0 ? (
              <div className="bg-surface rounded-2xl border border-border shadow-md">
                <NoOpportunities />
              </div>
            ) : (
              <div className="space-y-4">
                {opportunities.map((opp, i) => (
                  <motion.div
                    key={opp.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.08 }}
                    className="bg-surface rounded-2xl border border-border shadow-md p-6"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-xl flex items-center justify-center flex-shrink-0">
                          <span className="text-white font-bold text-lg">{opp.candidateName.charAt(0)}</span>
                        </div>
                        <div>
                          <h3 className="font-bold text-text">{opp.candidateName}</h3>
                          <p className="text-sm text-muted">{opp.position}</p>
                          <p className="text-xs text-muted mt-1">
                            {opp.company} • {opp.arrangement} • {opp.salary}
                          </p>
                        </div>
                      </div>
                      <AnimatePresence mode="wait">
                        <motion.div
                          key={opp.status}
                          initial={{ scale: 0.8, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          exit={{ scale: 0.8, opacity: 0 }}
                        >
                          <Badge variant={statusColors[opp.status] || 'secondary'}>
                            {statusLabels[opp.status] || opp.status}
                          </Badge>
                        </motion.div>
                      </AnimatePresence>
                    </div>

                    {/* Message */}
                    <div className="bg-surface-2 rounded-xl p-3 mb-4">
                      <div className="flex items-start gap-2">
                        <MessageSquare className="h-4 w-4 text-muted flex-shrink-0 mt-0.5" />
                        <p className="text-sm text-muted italic">"{opp.message}"</p>
                      </div>
                    </div>

                    {/* Timeline */}
                    <OpportunityTimeline timeline={opp.timeline} currentStatus={opp.status} />

                    {/* Sent date */}
                    <p className="text-xs text-muted mt-3">
                      Sent {new Date(opp.sentDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </p>
                  </motion.div>
                ))}
              </div>
            )}
          </main>
        </div>
      </div>
      <Navigation />
    </div>
  );
};
