import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Bookmark, Trash2, Send, ChevronRight, CheckCircle2,
  Globe, Clock, Star, Briefcase, X
} from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { SlideOver } from '../../components/ui/SlideOver';
import { NoSavedCandidates } from '../../components/ui/EmptyState';
import { useApp } from '../../store/context';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const DEFAULT_SAVED = [
  {
    id: 'saved_001',
    candidateId: 'emp_001',
    candidateName: 'Ayan Malik',
    role: 'Software Engineer',
    matchPercentage: 94,
    savedDate: '2026-07-26',
    status: 'active',
    skills: ['Python', 'Machine Learning', 'SQL'],
    availability: 'Available Now',
  },
];

export const SavedCandidates = () => {
  const { state, dispatch } = useApp();
  const navigate = useNavigate();
  const [oppOpen, setOppOpen] = useState(false);
  const [selectedCandidate, setSelectedCandidate] = useState(null);
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

  // Merge state saved candidates with defaults
  const stateSaved = state.recruiter?.savedCandidates || [];
  const candidates = stateSaved.length > 0
    ? stateSaved.map(sc => ({
        ...DEFAULT_SAVED.find(d => d.candidateId === sc.candidateId) || DEFAULT_SAVED[0],
        ...sc,
      }))
    : DEFAULT_SAVED;

  const handleRemove = (id) => {
    dispatch({ type: 'UNSAVE_CANDIDATE', payload: id });
    toast.success('Removed from saved candidates');
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
        candidateId: selectedCandidate.candidateId,
        candidateName: selectedCandidate.candidateName,
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

  return (
    <>
<div className="space-y-6">
<div>
              <h2 className="text-2xl font-bold text-text">Saved Candidates</h2>
              <p className="text-muted mt-1">{candidates.length} saved professional{candidates.length !== 1 ? 's' : ''}</p>
            </div>

            {candidates.length === 0 ? (
              <div className="bg-surface rounded-2xl border border-border shadow-md">
                <NoSavedCandidates />
              </div>
            ) : (
              <div className="space-y-4">
                {candidates.map((candidate, i) => (
                  <motion.div
                    key={candidate.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.08 }}
                    whileHover={{ y: -2, boxShadow: '0 20px 40px rgba(0,0,0,0.1)' }}
                    className="bg-surface rounded-2xl border border-border shadow-md p-6 transition-all duration-200"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-start gap-4">
                        <div className="w-14 h-14 bg-gradient-to-br from-primary to-accent rounded-2xl flex items-center justify-center flex-shrink-0">
                          <span className="text-white font-bold text-xl">
                            {candidate.candidateName.charAt(0)}
                          </span>
                        </div>
                        <div>
                          <div className="flex items-center gap-2 mb-0.5">
                            <h3 className="font-bold text-text">{candidate.candidateName}</h3>
                            <CheckCircle2 className="h-4 w-4 text-success" />
                            <Globe className="h-4 w-4 text-primary" />
                          </div>
                          <p className="text-sm text-muted">{candidate.role || 'Software Engineer'}</p>
                          <div className="flex items-center gap-3 mt-1 text-xs">
                            <span className="text-success font-medium flex items-center gap-1">
                              <span className="w-1.5 h-1.5 rounded-full bg-success" />
                              {candidate.availability || 'Available Now'}
                            </span>
                            <span className="text-muted flex items-center gap-1">
                              <Bookmark className="h-3 w-3" />
                              Saved {candidate.savedDate}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-col items-end gap-2">
                        <div className="text-center">
                          <div className="text-2xl font-black text-primary">{candidate.matchPercentage}%</div>
                          <div className="text-xs text-muted">MATCH</div>
                        </div>
                        <div className="flex items-center gap-1">
                          <AnimatePresence>
                            <motion.span
                              initial={{ scale: 0.8, opacity: 0 }}
                              animate={{ scale: 1, opacity: 1 }}
                              exit={{ scale: 0.8, opacity: 0 }}
                            >
                              <Badge variant="success" size="sm">{candidate.status}</Badge>
                            </motion.span>
                          </AnimatePresence>
                        </div>
                      </div>
                    </div>

                    {/* Skills */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {(candidate.skills || []).map(skill => (
                        <span key={skill} className="text-xs px-2.5 py-1 bg-primary/10 text-primary rounded-full font-medium">
                          {skill}
                        </span>
                      ))}
                    </div>

                    {/* Actions */}
                    <div className="flex gap-2">
                      <Button
                        variant="primary"
                        className="flex-1"
                        onClick={() => navigate('/recruiter/candidate/ayan')}
                      >
                        View Profile
                        <ChevronRight className="h-4 w-4 ml-1" />
                      </Button>
                      <Button
                        variant="success"
                        className="flex-1"
                        onClick={() => {
                          setSelectedCandidate(candidate);
                          setOppOpen(true);
                          setOppSent(false);
                          setOppProcessing(false);
                          setOppStep(0);
                        }}
                      >
                        <Send className="h-4 w-4 mr-1" />
                        Send Opportunity
                      </Button>
                      <button
                        onClick={() => handleRemove(candidate.candidateId)}
                        className="p-2.5 rounded-xl border border-border text-muted hover:border-danger hover:text-danger transition-all"
                        title="Remove from saved"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
</div>
{/* Send Opportunity Slide-Over */}
      <SlideOver
        isOpen={oppOpen}
        onClose={() => { setOppOpen(false); setOppSent(false); }}
        title="Send Hiring Opportunity"
        width="max-w-xl"
      >
        {!oppProcessing && !oppSent && selectedCandidate && (
          <div className="p-6 space-y-5">
            <div className="flex items-center gap-4 p-4 bg-primary/5 rounded-xl border border-primary/20">
              <div className="w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-xl flex items-center justify-center">
                <span className="text-white font-bold">{selectedCandidate.candidateName.charAt(0)}</span>
              </div>
              <div>
                <p className="font-semibold text-text">{selectedCandidate.candidateName}</p>
                <Badge variant="success" size="sm">{selectedCandidate.matchPercentage}% Match</Badge>
              </div>
            </div>
            <div className="space-y-4">
              {[
                { label: 'Position *', key: 'position', type: 'input' },
                { label: 'Company *', key: 'company', type: 'input' },
                { label: 'Salary Range', key: 'salary', type: 'input' },
                { label: 'Message *', key: 'message', type: 'textarea' },
              ].map(({ label, key, type }) => (
                <div key={key}>
                  <label className="block text-sm font-medium text-text mb-1.5">{label}</label>
                  {type === 'textarea' ? (
                    <textarea rows={3} value={opportunity[key]} onChange={e => setOpportunity(p => ({ ...p, [key]: e.target.value }))}
                      className="w-full px-4 py-3 bg-surface-2 rounded-xl border border-border text-text text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 resize-none" />
                  ) : (
                    <input type="text" value={opportunity[key]} onChange={e => setOpportunity(p => ({ ...p, [key]: e.target.value }))}
                      className="w-full px-4 py-3 bg-surface-2 rounded-xl border border-border text-text text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20" />
                  )}
                </div>
              ))}
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
            </div>
            <div className="flex gap-3 pt-2">
              <Button variant="ghost" className="flex-1" onClick={() => setOppOpen(false)}>Cancel</Button>
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
            <p className="text-muted text-sm mb-6">{selectedCandidate?.candidateName} will receive a notification.</p>
            <div className="bg-surface-2 rounded-xl p-4 mb-6 text-left">
              <p className="text-xs font-semibold text-muted uppercase tracking-wider mb-3">Status</p>
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-success flex items-center justify-center">
                  <span className="text-white text-xs font-bold">✓</span>
                </div>
                <span className="text-sm font-semibold text-success">SENT</span>
                <span className="text-xs text-muted ml-auto">{new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
              </div>
            </div>
            <Button variant="primary" className="w-full" onClick={() => { setOppOpen(false); setOppSent(false); }}>Done</Button>
          </div>
        )}
      </SlideOver>
    </>
  );
};
