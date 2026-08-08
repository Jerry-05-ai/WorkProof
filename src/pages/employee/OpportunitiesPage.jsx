import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Briefcase, MapPin, Building, Clock, ChevronRight, Star,
  CheckCircle2, Globe, Bell, Send, ThumbsUp, ThumbsDown,
  MessageSquare, X, Info
} from 'lucide-react';
import { Header } from '../../components/layout/Header';
import { Sidebar } from '../../components/layout/Sidebar';
import { Navigation } from '../../components/layout/Navigation';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { Modal } from '../../components/ui/Modal';
import { NoOpportunities } from '../../components/ui/EmptyState';
import { useApp } from '../../store/context';
import toast from 'react-hot-toast';

const OPPORTUNITY_STATUSES = ['sent', 'viewed', 'interested', 'interview', 'accepted'];

const STATUS_COLORS = {
  sent: 'text-primary', viewed: 'text-secondary',
  interested: 'text-accent', interview: 'text-warning',
  accepted: 'text-success', declined: 'text-danger',
};

const JOB_OPPORTUNITIES = [
  {
    id: 'job_001',
    title: 'Senior Software Engineer',
    company: 'TechCorp Global',
    location: 'Remote / Lahore',
    type: 'Full-time',
    salary: 'PKR 300K–450K/month',
    match: 94,
    skills: ['Python', 'Machine Learning', 'SQL'],
    posted: '2026-07-20',
    verified: true,
    description: 'Join our AI team to build next-generation ML solutions.',
  },
  {
    id: 'job_002',
    title: 'ML Engineer',
    company: 'DataDriven Inc',
    location: 'Karachi (Hybrid)',
    type: 'Full-time',
    salary: 'PKR 250K–380K/month',
    match: 88,
    skills: ['Python', 'Scikit-learn', 'Pandas'],
    posted: '2026-07-22',
    verified: true,
    description: 'Build predictive models and analytical systems.',
  },
];

const INVITATIONS = [
  {
    id: 'inv_001',
    projectName: 'AI Customer Support v2',
    company: 'NovaTech Solutions',
    role: 'Backend Developer',
    invitedBy: 'Sarah Ahmed',
    date: '2026-07-26',
    status: 'pending',
  },
];

const HiringOpportunityCard = ({ opportunity, onRespond }) => {
  const [isViewed, setIsViewed] = useState(false);
  const currentIdx = OPPORTUNITY_STATUSES.indexOf(opportunity.status);
  const isDeclined = opportunity.status === 'declined';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-surface rounded-2xl border border-border shadow-md overflow-hidden border border-primary/10"
    >
      {/* Header banner */}
      <div className="bg-gradient-to-r from-primary/10 to-accent/10 px-6 py-3 flex items-center justify-between border-b border-primary/10">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
          <span className="text-xs font-semibold text-primary uppercase tracking-wider">New Hiring Opportunity</span>
        </div>
        <AnimatePresence mode="wait">
          <motion.div
            key={opportunity.status}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
          >
            <Badge variant={
              opportunity.status === 'sent' ? 'primary' :
              opportunity.status === 'viewed' ? 'secondary' :
              opportunity.status === 'interested' ? 'accent' :
              opportunity.status === 'accepted' ? 'success' :
              opportunity.status === 'declined' ? 'danger' : 'primary'
            } size="sm">
              {opportunity.status.toUpperCase()}
            </Badge>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="p-6">
        {/* Company + Position */}
        <div className="flex items-start gap-4 mb-5">
          <div className="w-14 h-14 bg-gradient-to-br from-accent/20 to-primary/20 rounded-2xl flex items-center justify-center flex-shrink-0">
            <Building className="h-6 w-6 text-primary" />
          </div>
          <div>
            <h3 className="font-bold text-text text-lg">{opportunity.position}</h3>
            <p className="text-muted font-medium">{opportunity.company}</p>
            <div className="flex items-center gap-3 mt-1 text-xs text-muted flex-wrap">
              {opportunity.arrangement && (
                <span className="flex items-center gap-1"><MapPin className="h-3 w-3" />{opportunity.arrangement}</span>
              )}
              {opportunity.salary && <span className="font-medium text-success">{opportunity.salary}</span>}
              <span className="flex items-center gap-1 text-primary font-semibold">
                <Star className="h-3 w-3 fill-primary" />
                94% Match
              </span>
            </div>
          </div>
        </div>

        {/* Message */}
        <div className="bg-surface-2 border border-border rounded-xl p-4 mb-5">
          <div className="flex items-start gap-2">
            <MessageSquare className="h-4 w-4 text-muted flex-shrink-0 mt-0.5" />
            <p className="text-sm text-text italic">"{opportunity.message}"</p>
          </div>
        </div>

        {/* Opportunity Timeline */}
        <div className="mb-5">
          <p className="text-xs font-semibold text-muted uppercase tracking-wider mb-3">Status Timeline</p>
          {isDeclined ? (
            <div className="flex items-center gap-2 text-sm text-danger font-medium p-3 bg-danger/10 rounded-xl">
              <X className="h-4 w-4" />
              You declined this opportunity
            </div>
          ) : (
            <div className="flex items-center gap-1 overflow-x-auto pb-2">
              {OPPORTUNITY_STATUSES.map((status, i) => {
                const isDone = i < currentIdx;
                const isCurrent = i === currentIdx;
                return (
                  <React.Fragment key={status}>
                    <div className="flex flex-col items-center gap-1 flex-shrink-0">
                      <motion.div
                        initial={{ scale: 0.8 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: i * 0.1 }}
                        className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${
                          isDone ? 'bg-success text-white' :
                          isCurrent ? 'bg-primary text-white ring-2 ring-primary/30' :
                          'bg-surface-2 text-muted'
                        }`}
                      >
                        {isDone ? '✓' : isCurrent ? '●' : '○'}
                      </motion.div>
                      <span className={`text-xs font-medium capitalize whitespace-nowrap ${
                        isDone ? 'text-success' : isCurrent ? 'text-primary' : 'text-muted'
                      }`}>
                        {status}
                      </span>
                      {isDone && opportunity.timeline?.find(t => t.status === status) && (
                        <span className="text-xs text-muted whitespace-nowrap">
                          {new Date(opportunity.timeline.find(t => t.status === status).date)
                            .toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                        </span>
                      )}
                    </div>
                    {i < OPPORTUNITY_STATUSES.length - 1 && (
                      <div className={`flex-1 h-0.5 mb-8 ${isDone ? 'bg-success' : 'bg-border'}`} style={{ minWidth: '1rem' }} />
                    )}
                  </React.Fragment>
                );
              })}
            </div>
          )}
        </div>

        {/* Actions */}
        {!isDeclined && opportunity.status !== 'accepted' && opportunity.status !== 'interview' && (
          <div className="flex gap-2 flex-wrap">
            {opportunity.status === 'interested' ? (
              <div className="flex items-center gap-2 text-sm text-accent font-medium p-3 bg-accent/10 rounded-xl w-full">
                <CheckCircle2 className="h-4 w-4" />
                You responded: Interested. Awaiting interview invite.
              </div>
            ) : (
              <>
                <Button
                  variant="success"
                  className="flex-1"
                  onClick={() => onRespond(opportunity.id, 'interested')}
                >
                  <ThumbsUp className="h-4 w-4 mr-2" />
                  Interested
                </Button>
                <Button
                  variant="ghost"
                  className="flex-1"
                  onClick={() => onRespond(opportunity.id, 'declined')}
                >
                  <ThumbsDown className="h-4 w-4 mr-2" />
                  Decline
                </Button>
                <Button
                  variant="secondary"
                  className="flex-1"
                  onClick={() => toast('Feature coming soon!', { icon: 'ℹ️' })}
                >
                  <Info className="h-4 w-4 mr-2" />
                  More Info
                </Button>
              </>
            )}
          </div>
        )}

        {(opportunity.status === 'accepted' || opportunity.status === 'interview') && (
          <div className="flex items-center gap-2 text-sm text-success font-medium p-3 bg-success/10 rounded-xl">
            <CheckCircle2 className="h-4 w-4" />
            {opportunity.status === 'interview' ? 'Interview scheduled!' : 'Offer accepted! 🎉'}
          </div>
        )}
      </div>
    </motion.div>
  );
};

export const OpportunitiesPage = () => {
  const { state, dispatch } = useApp();
  const { employeeStatus, profileVisibility } = state;
  const isFormer = employeeStatus === 'former';
  const isPublic = profileVisibility === 'public';

  const [activeTab, setActiveTab] = useState('hiring');
  const [selectedOpp, setSelectedOpp] = useState(null);
  const [invitations, setInvitations] = useState(INVITATIONS);

  // Merge state opportunities with default
  const stateOpps = state.recruiter?.hiringOpportunities || [];
  const hiringOpportunities = stateOpps.length > 0 ? stateOpps : [
    {
      id: 'opp_demo',
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
    }
  ];

  const pendingInvitations = invitations.filter(i => i.status === 'pending').length;
  const tabs = [
    { id: 'hiring', label: 'Hiring Opportunities', count: hiringOpportunities.filter(o => o.status === 'sent').length },
    { id: 'jobs', label: 'Job Listings', count: 0 },
    { id: 'invitations', label: 'Project Invites', count: pendingInvitations },
  ];

  const handleRespond = (oppId, response) => {
    const now = new Date().toISOString();
    dispatch({
      type: 'UPDATE_HIRING_OPPORTUNITY',
      payload: {
        id: oppId,
        status: response,
        responseDate: now,
        viewedDate: now,
        timeline: [
          ...(hiringOpportunities.find(o => o.id === oppId)?.timeline || []),
          { status: 'viewed', date: now, label: 'Opportunity Viewed' },
          { status: response, date: now, label: response === 'interested' ? 'Responded: Interested' : 'Declined' },
        ],
      },
    });

    dispatch({
      type: 'ADD_NOTIFICATION',
      payload: {
        id: `notif_${Date.now()}`,
        type: 'projects',
        title: response === 'interested' ? 'Interest Confirmed' : 'Opportunity Declined',
        message: response === 'interested'
          ? 'You expressed interest in the hiring opportunity. The recruiter will be in touch.'
          : 'You declined the hiring opportunity.',
        read: false,
        createdAt: now,
        link: '/employee/opportunities',
      },
    });

    dispatch({
      type: 'ADD_ACTIVITY',
      payload: {
        id: `act_${Date.now()}`,
        actor: 'Ayan Malik',
        actorRole: 'EMPLOYEE',
        action: response === 'interested' ? 'OPPORTUNITY_INTERESTED' : 'OPPORTUNITY_DECLINED',
        target: 'BrightHire Technologies',
        timestamp: now,
        status: 'SUCCESS',
        metadata: { position: 'Senior Machine Learning Engineer' },
      },
    });

    if (response === 'interested') {
      toast.success('Interest confirmed! The recruiter will be notified.');
    } else {
      toast('Opportunity declined.', { icon: '👋' });
    }
  };

  const handleInvitationAction = (id, action) => {
    setInvitations(prev =>
      prev.map(inv => inv.id === id ? { ...inv, status: action } : inv)
    );
    toast.success(action === 'accepted' ? 'Invitation accepted!' : 'Invitation declined.');
  };

  const handleApply = () => {
    toast.success(`Application sent to ${selectedOpp.company}!`);
    setSelectedOpp(null);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="flex">
        <Sidebar />
        <div className="flex-1 flex flex-col min-h-screen pb-16 lg:pb-0">
          <Header />
          <main className="flex-1 p-4 lg:p-6 space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-text">Opportunities</h2>
              <p className="text-muted mt-1">Hiring opportunities, job listings, and project invites</p>
            </div>

            {/* Visibility Banner */}
            {(!isFormer || !isPublic) ? (
              <div className={`rounded-xl p-4 flex items-center gap-3 border ${
                !isFormer ? 'bg-warning/10 border-warning/20' : 'bg-primary/10 border-primary/20'
              }`}>
                <Bell className={`h-5 w-5 flex-shrink-0 ${!isFormer ? 'text-warning' : 'text-primary'}`} />
                <div>
                  <p className={`text-sm font-medium ${!isFormer ? 'text-warning' : 'text-primary'}`}>
                    {!isFormer
                      ? 'Your profile is private during employment'
                      : 'Publish your profile to get discovered by companies'}
                  </p>
                  <p className="text-xs text-muted">
                    {!isFormer
                      ? 'Hiring opportunities sent directly to you will appear here'
                      : 'Go to Privacy Controls to publish your verified profile'}
                  </p>
                </div>
              </div>
            ) : (
              <div className="bg-success/10 border border-success/20 rounded-xl p-4 flex items-center gap-3">
                <Globe className="h-5 w-5 text-success flex-shrink-0" />
                <p className="text-sm text-success font-medium">
                  Your profile is public — companies can discover and contact you
                </p>
              </div>
            )}

            {/* Tabs */}
            <div className="flex gap-1 bg-surface-2 rounded-xl p-1 overflow-x-auto">
              {tabs.map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex-1 py-2 rounded-lg text-xs lg:text-sm font-medium transition-all whitespace-nowrap px-2 ${
                    activeTab === tab.id ? 'bg-surface text-primary shadow-sm' : 'text-muted hover:text-text'
                  }`}
                >
                  {tab.label}
                  {tab.count > 0 && (
                    <span className="ml-1.5 px-1.5 py-0.5 text-xs bg-primary text-white rounded-full">
                      {tab.count}
                    </span>
                  )}
                </button>
              ))}
            </div>

            {/* Hiring Opportunities Tab */}
            {activeTab === 'hiring' && (
              <div className="space-y-4">
                {hiringOpportunities.length === 0 ? (
                  <div className="bg-surface rounded-2xl border border-border shadow-md">
                    <NoOpportunities />
                  </div>
                ) : (
                  hiringOpportunities.map(opp => (
                    <HiringOpportunityCard key={opp.id} opportunity={opp} onRespond={handleRespond} />
                  ))
                )}
              </div>
            )}

            {/* Jobs Tab */}
            {activeTab === 'jobs' && (
              <div className="space-y-4">
                {JOB_OPPORTUNITIES.map((opp, i) => (
                  <motion.div
                    key={opp.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className="bg-surface rounded-xl border border-border shadow-sm p-6"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-primary/20 to-accent/20 rounded-xl flex items-center justify-center flex-shrink-0">
                          <Building className="h-6 w-6 text-primary" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-semibold text-text">{opp.title}</h3>
                            {opp.verified && <CheckCircle2 className="h-4 w-4 text-success" />}
                          </div>
                          <p className="text-sm text-muted">{opp.company}</p>
                          <div className="flex items-center gap-3 mt-1 text-xs text-muted flex-wrap">
                            <span className="flex items-center gap-1"><MapPin className="h-3 w-3" />{opp.location}</span>
                            <span className="flex items-center gap-1"><Clock className="h-3 w-3" />{opp.type}</span>
                            <span>{opp.salary}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-col items-end gap-2">
                        <div className="text-2xl font-bold text-primary">{opp.match}%</div>
                        <div className="text-xs text-muted">Match</div>
                        <Button variant="primary" size="sm" onClick={() => setSelectedOpp(opp)}>
                          View & Apply
                        </Button>
                      </div>
                    </div>
                    <p className="text-sm text-muted mb-3">{opp.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {opp.skills.map(skill => (
                        <span key={skill} className="text-xs px-2 py-1 bg-primary/10 text-primary rounded-full">{skill}</span>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>
            )}

            {/* Invitations Tab */}
            {activeTab === 'invitations' && (
              <div className="space-y-4">
                {invitations.length === 0 ? (
                  <div className="bg-surface rounded-2xl border border-border shadow-md">
                    <NoOpportunities />
                  </div>
                ) : (
                  invitations.map(inv => (
                    <motion.div
                      key={inv.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-surface rounded-xl border border-border shadow-sm p-6"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex items-start gap-4">
                          <div className="p-2.5 bg-primary/10 rounded-xl">
                            <Briefcase className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-text">{inv.projectName}</h3>
                            <p className="text-sm text-muted">{inv.company} • {inv.role}</p>
                            <p className="text-xs text-muted mt-1">Invited by {inv.invitedBy} • {inv.date}</p>
                          </div>
                        </div>
                        {inv.status === 'pending' ? (
                          <div className="flex gap-2">
                            <Button variant="success" size="sm" onClick={() => handleInvitationAction(inv.id, 'accepted')}>Accept</Button>
                            <Button variant="ghost" size="sm" onClick={() => handleInvitationAction(inv.id, 'declined')}>Decline</Button>
                          </div>
                        ) : (
                          <Badge variant={inv.status === 'accepted' ? 'success' : 'secondary'} size="sm">
                            {inv.status.charAt(0).toUpperCase() + inv.status.slice(1)}
                          </Badge>
                        )}
                      </div>
                    </motion.div>
                  ))
                )}
              </div>
            )}
          </main>
        </div>
      </div>
      <Navigation />

      {/* Apply Modal */}
      <Modal isOpen={!!selectedOpp} onClose={() => setSelectedOpp(null)} title="Job Application">
        {selectedOpp && (
          <div className="space-y-4">
            <div className="bg-primary/5 border border-primary/20 rounded-xl p-4">
              <h3 className="font-semibold text-text">{selectedOpp.title}</h3>
              <p className="text-sm text-muted">{selectedOpp.company} • {selectedOpp.location}</p>
              <div className="mt-2 text-xl font-bold text-primary">{selectedOpp.match}% Match</div>
            </div>
            <div className="bg-surface-2 rounded-lg p-4 text-sm">
              <p className="font-medium text-text mb-2">Your profile will share:</p>
              <div className="space-y-1">
                {['Verified work experience', 'Verified skills', 'Completed projects'].map(item => (
                  <div key={item} className="flex items-center gap-2 text-muted">
                    <CheckCircle2 className="h-3.5 w-3.5 text-success" />{item}
                  </div>
                ))}
              </div>
            </div>
            <div className="flex gap-3">
              <Button variant="ghost" className="flex-1" onClick={() => setSelectedOpp(null)}>Cancel</Button>
              <Button variant="primary" className="flex-1" onClick={handleApply}>
                <ChevronRight className="h-4 w-4 mr-1" />Submit Application
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};
