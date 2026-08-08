import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Globe, CheckCircle2, Award, Briefcase, Star,
  Calendar, TrendingUp, Send, Bookmark, BookmarkCheck,
  ArrowLeft, Clock, Code2
} from 'lucide-react';
import { Header } from '../../components/layout/Header';
import { Sidebar } from '../../components/layout/Sidebar';
import { Navigation } from '../../components/layout/Navigation';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { SlideOver } from '../../components/ui/SlideOver';
import { useApp } from '../../store/context';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const PUBLIC_PROFILE = {
  id: 'emp_001',
  name: 'Ayan Malik',
  role: 'Software Engineer',
  experience: '2+ years',
  previousCompany: 'NovaTech Solutions',
  matchPercentage: 94,
  performance: 4.7,
  availability: 'Available Now',
  verifiedSkills: [
    { name: 'Python', level: 'Advanced', verified: true, endorsements: 5 },
    { name: 'Machine Learning', level: 'Intermediate', verified: true, endorsements: 3 },
    { name: 'SQL', level: 'Advanced', verified: true, endorsements: 4 },
  ],
  projects: [
    {
      name: 'AI Customer Support System',
      role: 'Backend Developer',
      impact: 'Reduced support processing time by 35%',
      technologies: ['Python', 'FastAPI', 'PostgreSQL'],
      verified: true,
      duration: '6 months',
    },
    {
      name: 'Predictive Sales Analytics',
      role: 'ML Developer',
      impact: 'Improved sales predictions by 28%',
      technologies: ['Python', 'Scikit-learn', 'Pandas'],
      verified: true,
      duration: '4 months',
    },
  ],
  timeline: [
    { date: 'Jan 2024', event: 'Joined NovaTech Solutions as Junior Software Engineer' },
    { date: 'Mar 2025', event: 'Completed 8 projects' },
    { date: 'Jun 2025', event: 'Promoted to Software Engineer' },
    { date: 'Jan 2026', event: 'Recognized as high-potential employee' },
  ],
  achievements: [
    '🏆 Top Performer Q1 2026',
    '🚀 Led 12 verified projects',
    '🌟 4.7/5.0 average rating',
  ],
};

export const CandidateProfile = () => {
  const { state, dispatch } = useApp();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [savedIds, setSavedIds] = useState(
    (state.recruiter?.savedCandidates || []).map(c => c.candidateId)
  );
  const [opportunityOpen, setOpportunityOpen] = useState(false);
  const [opportunity, setOpportunity] = useState({
    position: 'Senior Machine Learning Engineer',
    company: state.currentUser?.company || 'BrightHire Technologies',
    arrangement: 'Remote',
    salary: '$120,000 – $150,000',
    message: 'Your verified experience matches a role we are hiring for.',
  });
  const [oppProcessing, setOppProcessing] = useState(false);
  const [oppStep, setOppStep] = useState(0);
  const [oppSent, setOppSent] = useState(false);

  const isSaved = savedIds.includes(PUBLIC_PROFILE.id);

  const handleSave = () => {
    if (isSaved) {
      setSavedIds(prev => prev.filter(id => id !== PUBLIC_PROFILE.id));
      dispatch({ type: 'UNSAVE_CANDIDATE', payload: PUBLIC_PROFILE.id });
      toast.success('Removed from saved');
    } else {
      setSavedIds(prev => [...prev, PUBLIC_PROFILE.id]);
      dispatch({
        type: 'SAVE_CANDIDATE',
        payload: {
          id: `saved_${Date.now()}`,
          candidateId: PUBLIC_PROFILE.id,
          candidateName: PUBLIC_PROFILE.name,
          matchPercentage: PUBLIC_PROFILE.matchPercentage,
          savedDate: new Date().toISOString().split('T')[0],
          status: 'active',
        },
      });
      toast.success(`${PUBLIC_PROFILE.name} saved!`);
    }
  };

  const handleSendOpportunity = async () => {
    setOppProcessing(true);
    setOppStep(0);
    const steps = ['Validating recruiter...', 'Creating opportunity...', 'Sending notification...', 'Updating employee inbox...'];
    for (let i = 0; i < steps.length; i++) {
      await new Promise(r => setTimeout(r, 600));
      setOppStep(i + 1);
    }
    const now = new Date().toISOString();
    dispatch({
      type: 'ADD_HIRING_OPPORTUNITY',
      payload: {
        id: `opp_${Date.now()}`,
        candidateId: PUBLIC_PROFILE.id,
        candidateName: PUBLIC_PROFILE.name,
        position: opportunity.position,
        company: opportunity.company,
        status: 'sent',
        message: opportunity.message,
        salary: opportunity.salary,
        arrangement: opportunity.arrangement,
        sentDate: now,
        viewedDate: null,
        responseDate: null,
        responseMessage: null,
        timeline: [{ status: 'sent', date: now, label: 'Opportunity Sent' }],
      },
    });
    dispatch({
      type: 'ADD_NOTIFICATION',
      payload: {
        id: `notif_${Date.now()}`,
        type: 'projects',
        title: 'New Hiring Opportunity',
        message: `${opportunity.company} sent you an opportunity for ${opportunity.position}`,
        read: false,
        createdAt: now,
        link: '/employee/opportunities',
      },
    });
    setOppProcessing(false);
    setOppSent(true);
    toast.success('Hiring opportunity sent!');
  };

  const oppSteps = ['Validating recruiter...', 'Creating opportunity...', 'Sending notification...', 'Updating employee inbox...'];
  const tabs = ['overview', 'skills', 'projects', 'timeline'];

  return (
    <div className="min-h-screen bg-background">
      <div className="flex">
        <Sidebar />
        <div className="flex-1 flex flex-col min-h-screen pb-16 lg:pb-0">
          <Header />
          <main className="flex-1 p-4 lg:p-6 space-y-6">

            {/* Back */}
            <button
              onClick={() => navigate('/recruiter/talent')}
              className="flex items-center gap-2 text-muted hover:text-text transition-colors text-sm"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Talent Discovery
            </button>

            {/* Privacy Banner */}
            <div className="bg-success/10 border border-success/20 rounded-xl p-4 flex items-center gap-3">
              <Globe className="h-5 w-5 text-success flex-shrink-0" />
              <div>
                <p className="text-sm font-medium text-success">🌐 PUBLIC VERIFIED PROFILE</p>
                <p className="text-xs text-muted">Information published by the professional. Verified by former employer.</p>
              </div>
            </div>

            {/* Profile Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-surface rounded-2xl border border-border shadow-md p-6 lg:p-8"
            >
              <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
                <div className="flex items-start gap-5">
                  <div className="w-20 h-20 bg-gradient-to-br from-primary to-accent rounded-2xl flex items-center justify-center flex-shrink-0">
                    <span className="text-white font-black text-3xl">A</span>
                  </div>
                  <div>
                    <div className="flex items-center gap-3 mb-1 flex-wrap">
                      <h1 className="text-2xl font-bold text-text">{PUBLIC_PROFILE.name}</h1>
                      <CheckCircle2 className="h-5 w-5 text-success" title="Verified" />
                      <Globe className="h-5 w-5 text-primary" title="Public" />
                    </div>
                    <p className="text-muted mb-1">{PUBLIC_PROFILE.role}</p>
                    <p className="text-sm text-muted">Previously at <span className="font-medium text-text">{PUBLIC_PROFILE.previousCompany}</span></p>
                    <div className="flex items-center gap-4 mt-3 text-sm text-muted flex-wrap">
                      <span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5" />{PUBLIC_PROFILE.experience}</span>
                      <span className="flex items-center gap-1 text-success font-medium">● {PUBLIC_PROFILE.availability}</span>
                      <span className="flex items-center gap-1"><Star className="h-3.5 w-3.5 text-warning fill-warning" />{PUBLIC_PROFILE.performance}/5.0</span>
                    </div>
                  </div>
                </div>

                {/* Match + Actions */}
                <div className="flex flex-row lg:flex-col items-center lg:items-end gap-4">
                  <div className="text-center">
                    <div className="text-4xl font-black text-primary">{PUBLIC_PROFILE.matchPercentage}%</div>
                    <div className="text-xs text-muted">MATCH SCORE</div>
                    <div className="w-24 h-2 bg-surface-2 rounded-full mt-2 overflow-hidden">
                      <motion.div
                        className="h-full bg-gradient-to-r from-primary to-accent rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: `${PUBLIC_PROFILE.matchPercentage}%` }}
                        transition={{ duration: 1.5, ease: 'easeOut', delay: 0.3 }}
                      />
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={handleSave}
                      className={`p-3 rounded-xl border transition-all ${
                        isSaved
                          ? 'bg-accent/10 border-accent/30 text-accent'
                          : 'bg-surface border-border text-muted hover:border-accent hover:text-accent'
                      }`}
                    >
                      {isSaved ? <BookmarkCheck className="h-5 w-5" /> : <Bookmark className="h-5 w-5" />}
                    </button>
                    <Button
                      variant="primary"
                      onClick={() => { setOpportunityOpen(true); setOppSent(false); setOppProcessing(false); setOppStep(0); }}
                    >
                      <Send className="h-4 w-4 mr-2" />
                      Send Opportunity
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Tabs */}
            <div className="flex gap-1 bg-surface-2 rounded-xl p-1">
              {tabs.map(tab => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`flex-1 py-2 rounded-lg text-sm font-medium capitalize transition-all ${
                    activeTab === tab ? 'bg-surface text-primary shadow-sm' : 'text-muted hover:text-text'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Overview Tab */}
            {activeTab === 'overview' && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
                {/* Stats */}
                <div className="grid grid-cols-3 gap-4">
                  {[
                    { icon: Award, label: 'Verified Skills', value: PUBLIC_PROFILE.verifiedSkills.length, color: 'text-primary' },
                    { icon: Briefcase, label: 'Projects', value: 12, color: 'text-success' },
                    { icon: Star, label: 'Rating', value: `${PUBLIC_PROFILE.performance}/5`, color: 'text-warning' },
                  ].map(({ icon: Icon, label, value, color }) => (
                    <div key={label} className="bg-surface rounded-xl border border-border shadow-sm p-4 text-center">
                      <Icon className={`h-6 w-6 ${color} mx-auto mb-2`} />
                      <div className={`text-2xl font-bold ${color}`}>{value}</div>
                      <div className="text-xs text-muted">{label}</div>
                    </div>
                  ))}
                </div>

                {/* Achievements */}
                <div className="bg-surface rounded-xl border border-border shadow-sm p-5">
                  <h3 className="font-semibold text-text mb-3 flex items-center gap-2">
                    <TrendingUp className="h-4 w-4 text-primary" />
                    Achievements
                  </h3>
                  <div className="space-y-2">
                    {PUBLIC_PROFILE.achievements.map((a, i) => (
                      <div key={i} className="text-sm text-text p-2 bg-primary/5 rounded-lg">{a}</div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {/* Skills Tab */}
            {activeTab === 'skills' && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-3">
                {PUBLIC_PROFILE.verifiedSkills.map(skill => (
                  <div key={skill.name} className="bg-surface rounded-xl border border-border shadow-sm p-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-success/10 rounded-lg">
                        <CheckCircle2 className="h-5 w-5 text-success" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-medium text-text">{skill.name}</span>
                          <span className="text-xs px-2 py-0.5 bg-primary/10 text-primary rounded-full">{skill.level}</span>
                        </div>
                        <p className="text-xs text-muted">{skill.endorsements} endorsements</p>
                      </div>
                    </div>
                    <Badge variant="success" size="sm">Verified</Badge>
                  </div>
                ))}
              </motion.div>
            )}

            {/* Projects Tab */}
            {activeTab === 'projects' && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
                {PUBLIC_PROFILE.projects.map(project => (
                  <div key={project.name} className="bg-surface rounded-xl border border-border shadow-sm p-5">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h4 className="font-semibold text-text">{project.name}</h4>
                        <p className="text-sm text-muted">{project.role}</p>
                      </div>
                      <Badge variant="success" size="sm">Verified</Badge>
                    </div>
                    <div className="flex flex-wrap gap-2 mb-3">
                      {project.technologies.map(tech => (
                        <span key={tech} className="inline-flex items-center gap-1 px-2 py-1 bg-primary/5 text-primary text-xs rounded-md">
                          <Code2 className="h-3 w-3" />{tech}
                        </span>
                      ))}
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-success font-medium">{project.impact}</span>
                      <span className="text-muted text-xs">{project.duration}</span>
                    </div>
                  </div>
                ))}
              </motion.div>
            )}

            {/* Timeline Tab */}
            {activeTab === 'timeline' && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-surface rounded-xl border border-border shadow-sm p-6">
                <h3 className="font-semibold text-text mb-5 flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-primary" />
                  Career Timeline
                </h3>
                <div className="space-y-4 relative">
                  <div className="absolute left-3 top-3 bottom-3 w-0.5 bg-border" />
                  {PUBLIC_PROFILE.timeline.map((item, i) => (
                    <div key={i} className="flex gap-5 pl-4 relative">
                      <div className="absolute left-0.5 top-2 w-5 h-5 rounded-full bg-primary border-4 border-surface flex-shrink-0" />
                      <div>
                        <p className="text-xs text-primary font-semibold mb-0.5">{item.date}</p>
                        <p className="text-sm text-text">{item.event}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </main>
        </div>
      </div>
      <Navigation />

      {/* Opportunity Slide-Over */}
      <SlideOver
        isOpen={opportunityOpen}
        onClose={() => { setOpportunityOpen(false); setOppSent(false); }}
        title="Send Hiring Opportunity"
        width="max-w-xl"
      >
        {!oppProcessing && !oppSent && (
          <div className="p-6 space-y-5">
            <div className="flex items-center gap-4 p-4 bg-primary/5 rounded-xl border border-primary/20">
              <div className="w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-xl flex items-center justify-center">
                <span className="text-white font-bold">A</span>
              </div>
              <div>
                <p className="font-semibold text-text">{PUBLIC_PROFILE.name}</p>
                <p className="text-sm text-muted">{PUBLIC_PROFILE.role}</p>
                <Badge variant="success" size="sm">{PUBLIC_PROFILE.matchPercentage}% Match</Badge>
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-text mb-1.5">Position *</label>
                <input type="text" value={opportunity.position} onChange={e => setOpportunity(p => ({ ...p, position: e.target.value }))}
                  className="w-full px-4 py-3 bg-surface-2 rounded-xl border border-border text-text text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20" />
              </div>
              <div>
                <label className="block text-sm font-medium text-text mb-1.5">Company *</label>
                <input type="text" value={opportunity.company} onChange={e => setOpportunity(p => ({ ...p, company: e.target.value }))}
                  className="w-full px-4 py-3 bg-surface-2 rounded-xl border border-border text-text text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20" />
              </div>
              <div>
                <label className="block text-sm font-medium text-text mb-1.5">Work Arrangement</label>
                <div className="flex gap-2">
                  {['Remote', 'Hybrid', 'On-site'].map(arr => (
                    <button key={arr} onClick={() => setOpportunity(p => ({ ...p, arrangement: arr }))}
                      className={`flex-1 py-2.5 rounded-xl text-sm font-medium border transition-all ${opportunity.arrangement === arr ? 'bg-primary text-white border-primary' : 'bg-surface-2 text-muted border-border hover:border-primary hover:text-primary'}`}>
                      {arr}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-text mb-1.5">Salary Range</label>
                <input type="text" value={opportunity.salary} onChange={e => setOpportunity(p => ({ ...p, salary: e.target.value }))}
                  className="w-full px-4 py-3 bg-surface-2 rounded-xl border border-border text-text text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20" />
              </div>
              <div>
                <label className="block text-sm font-medium text-text mb-1.5">Message *</label>
                <textarea rows={3} value={opportunity.message} onChange={e => setOpportunity(p => ({ ...p, message: e.target.value }))}
                  className="w-full px-4 py-3 bg-surface-2 rounded-xl border border-border text-text text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 resize-none" />
              </div>
            </div>
            <div className="flex gap-3 pt-2">
              <Button variant="ghost" className="flex-1" onClick={() => setOpportunityOpen(false)}>Cancel</Button>
              <Button variant="primary" className="flex-1" onClick={handleSendOpportunity}>
                <Send className="h-4 w-4 mr-2" />Send Hiring Opportunity
              </Button>
            </div>
          </div>
        )}
        {oppProcessing && (
          <div className="p-8 text-center">
            <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Send className="h-8 w-8 text-primary animate-pulse" />
            </div>
            <h3 className="font-semibold text-text mb-6">Sending Opportunity...</h3>
            <div className="space-y-3 text-left">
              {oppSteps.map((step, i) => (
                <div key={i} className={`flex items-center gap-3 text-sm p-3 rounded-xl transition-all ${i < oppStep ? 'bg-success/10 text-success' : i === oppStep ? 'bg-primary/10 text-primary' : 'text-muted/40'}`}>
                  {i < oppStep ? <CheckCircle2 className="h-4 w-4 flex-shrink-0" /> : <div className={`w-4 h-4 rounded-full border-2 flex-shrink-0 ${i === oppStep ? 'border-primary animate-pulse' : 'border-border'}`} />}
                  {step}
                </div>
              ))}
            </div>
          </div>
        )}
        {oppSent && !oppProcessing && (
          <div className="p-8 text-center">
            <motion.div initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              className="w-20 h-20 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 className="h-10 w-10 text-success" />
            </motion.div>
            <h3 className="text-xl font-bold text-text mb-2">✓ Opportunity Sent!</h3>
            <p className="text-muted text-sm mb-6">{PUBLIC_PROFILE.name} will receive a notification.</p>
            <Button variant="primary" className="w-full" onClick={() => { setOpportunityOpen(false); setOppSent(false); }}>Done</Button>
          </div>
        )}
      </SlideOver>
    </div>
  );
};
