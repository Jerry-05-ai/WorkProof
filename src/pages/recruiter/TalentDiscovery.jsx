import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search, Filter, CheckCircle2, Bookmark, BookmarkCheck,
  Send, Star, ChevronRight, Globe, Clock, Briefcase, Award, X
} from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { SlideOver } from '../../components/ui/SlideOver';
import { EmptyState, NoSearchResults } from '../../components/ui/EmptyState';
import { SkeletonCandidateCard } from '../../components/ui/SkeletonLoaders';
import { useApp } from '../../store/context';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const VERIFIED_CANDIDATES = [
  {
    id: 'emp_001',
    name: 'Ayan Malik',
    role: 'Software Engineer',
    previousCompany: 'NovaTech Solutions',
    location: 'Lahore, Pakistan',
    availability: 'Available Now',
    experience: '2+ years',
    matchPercentage: 94,
    skills: ['Python', 'Machine Learning', 'SQL', 'React', 'FastAPI'],
    projectCount: 12,
    verifiedSkills: 3,
    performance: 4.7,
    isPublic: true,
    isVerified: true,
    matchBreakdown: [
      { skill: 'Python', level: 'Advanced', matched: true },
      { skill: 'Machine Learning', level: 'Intermediate', matched: true },
      { skill: '12 Verified Projects', level: '', matched: true },
      { skill: '2+ Years Verified Experience', level: '', matched: true },
    ],
  },
];

const SEARCH_STEPS = [
  'Searching verified talent pool...',
  'Analyzing verified skills...',
  'Matching career evidence...',
  'Calculating match scores...',
];

const FILTERS = {
  skills: ['Python', 'Machine Learning', 'React', 'SQL', 'FastAPI', 'Node.js', 'DevOps'],
  experience: ['0-1 years', '1-3 years', '3-5 years', '5+ years'],
  availability: ['Available Now', 'Available in 1 month', 'Available in 3 months'],
};

export const TalentDiscovery = () => {
  const { state, dispatch } = useApp();
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [searchDone, setSearchDone] = useState(false);
  const [searchStep, setSearchStep] = useState(0);
  const [results, setResults] = useState([]);
  const [savedIds, setSavedIds] = useState(
    (state.recruiter?.savedCandidates || []).map(c => c.candidateId)
  );
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [opportunityOpen, setOpportunityOpen] = useState(false);
  const [filterOpen, setFilterOpen] = useState(false);
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
  const searchRef = useRef(null);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;

    setIsSearching(true);
    setSearchDone(false);
    setResults([]);
    setSearchStep(0);

    for (let i = 0; i < SEARCH_STEPS.length; i++) {
      await new Promise(r => setTimeout(r, 600));
      setSearchStep(i + 1);
    }

    await new Promise(r => setTimeout(r, 400));
    const filtered = VERIFIED_CANDIDATES.filter(c =>
      c.skills.some(s => s.toLowerCase().includes(query.toLowerCase())) ||
      c.name.toLowerCase().includes(query.toLowerCase()) ||
      c.role.toLowerCase().includes(query.toLowerCase())
    );
    setResults(filtered);
    setIsSearching(false);
    setSearchDone(true);

    // Track view
    if (filtered.length > 0) {
      dispatch({
        type: 'ADD_PROFILE_VIEW',
        payload: {
          id: `view_${Date.now()}`,
          viewer: state.currentUser?.name || 'Hamza Khan',
          viewerCompany: state.currentUser?.company || 'BrightHire Technologies',
          viewed: filtered[0].name,
          timestamp: new Date().toISOString(),
        },
      });
    }
    toast.success(`Found ${filtered.length} verified candidate${filtered.length !== 1 ? 's' : ''}`);
  };

  const handleSave = (candidate) => {
    const isSaved = savedIds.includes(candidate.id);
    if (isSaved) {
      setSavedIds(prev => prev.filter(id => id !== candidate.id));
      dispatch({ type: 'UNSAVE_CANDIDATE', payload: candidate.id });
      toast.success(`${candidate.name} removed from saved`);
    } else {
      setSavedIds(prev => [...prev, candidate.id]);
      dispatch({
        type: 'SAVE_CANDIDATE',
        payload: {
          id: `saved_${Date.now()}`,
          candidateId: candidate.id,
          candidateName: candidate.name,
          matchPercentage: candidate.matchPercentage,
          savedDate: new Date().toISOString().split('T')[0],
          status: 'active',
        },
      });
      toast.success(`${candidate.name} saved!`);
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

    const oppId = `opp_${Date.now()}`;
    const now = new Date().toISOString();

    dispatch({
      type: 'ADD_HIRING_OPPORTUNITY',
      payload: {
        id: oppId,
        candidateId: selectedCandidate.id,
        candidateName: selectedCandidate.name,
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

    dispatch({
      type: 'ADD_ACTIVITY',
      payload: {
        id: `act_${Date.now()}`,
        actor: state.currentUser?.name || 'Hamza Khan',
        actorRole: 'RECRUITER',
        action: 'OPPORTUNITY_SENT',
        target: selectedCandidate.name,
        timestamp: now,
        status: 'SUCCESS',
        metadata: { position: opportunity.position, company: opportunity.company },
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
{/* Page Header */}
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-text">Talent Discovery</h2>
                <p className="text-muted mt-1">Search verified professionals by skill, role, or experience</p>
              </div>
              <Button variant="ghost" size="sm" onClick={() => setFilterOpen(true)}>
                <Filter className="h-4 w-4 mr-2" />
                Filters
              </Button>
            </div>

            {/* Search Bar */}
            <form onSubmit={handleSearch}>
              <motion.div
                className="relative"
                whileFocus={{ scale: 1.01 }}
              >
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted" />
                <input
                  ref={searchRef}
                  type="text"
                  value={query}
                  onChange={e => setQuery(e.target.value)}
                  placeholder='Search: "Python Machine Learning Developer"'
                  className="w-full pl-12 pr-36 py-4 bg-surface rounded-2xl border border-border text-text placeholder-muted focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 text-sm shadow-md transition-all"
                />
                <button
                  type="submit"
                  className="absolute right-3 top-1/2 -translate-y-1/2 px-4 py-2 bg-primary text-white rounded-xl text-sm font-medium hover:bg-primary/90 transition-colors"
                >
                  Search
                </button>
              </motion.div>
            </form>

            {/* Quick filter pills */}
            <div className="flex flex-wrap gap-2">
              {['Python', 'Machine Learning', 'React', 'SQL', 'FastAPI'].map(skill => (
                <button
                  key={skill}
                  onClick={() => { setQuery(skill); }}
                  className="px-3 py-1.5 text-xs font-medium bg-surface border border-border rounded-full text-muted hover:border-primary hover:text-primary transition-colors"
                >
                  {skill}
                </button>
              ))}
            </div>

            {/* Search Animation */}
            <AnimatePresence>
              {isSearching && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="bg-surface rounded-2xl border border-border shadow-md p-6"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                      <Search className="h-4 w-4 text-primary animate-pulse" />
                    </div>
                    <span className="font-medium text-text">
                      Searching verified talent for <span className="text-primary">"{query}"</span>
                    </span>
                  </div>
                  <div className="space-y-2">
                    {SEARCH_STEPS.map((step, i) => (
                      <div key={i} className={`flex items-center gap-3 text-sm transition-all duration-300 ${
                        i < searchStep ? 'text-success' : i === searchStep - 1 ? 'text-primary' : 'text-muted/40'
                      }`}>
                        {i < searchStep ? (
                          <CheckCircle2 className="h-4 w-4 text-success flex-shrink-0" />
                        ) : (
                          <div className={`w-4 h-4 rounded-full border-2 flex-shrink-0 ${i === searchStep - 1 ? 'border-primary animate-pulse' : 'border-border'}`} />
                        )}
                        {step}
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Results */}
            {searchDone && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <p className="text-sm text-muted">
                    Found <span className="font-semibold text-text">{results.length}</span> verified professional{results.length !== 1 ? 's' : ''} matching <span className="text-primary font-medium">"{query}"</span>
                  </p>
                  <span className="text-xs text-success flex items-center gap-1">
                    <CheckCircle2 className="h-3 w-3" />
                    All verified
                  </span>
                </div>

                {results.length === 0 ? (
                  <NoSearchResults />
                ) : (
                  results.map((candidate, i) => (
                    <motion.div
                      key={candidate.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.1 }}
                      whileHover={{ y: -2, boxShadow: '0 20px 40px rgba(0,0,0,0.1)' }}
                      className="bg-surface rounded-2xl border border-border shadow-md p-6 transition-all duration-200"
                    >
                      {/* Card Header */}
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-start gap-4">
                          {/* Avatar */}
                          <div className="w-14 h-14 bg-gradient-to-br from-primary to-accent rounded-2xl flex items-center justify-center flex-shrink-0">
                            <span className="text-white font-bold text-xl">
                              {candidate.name.charAt(0)}
                            </span>
                          </div>
                          <div>
                            <div className="flex items-center gap-2 mb-0.5">
                              <h3 className="font-bold text-text text-lg">{candidate.name}</h3>
                              {candidate.isVerified && (
                                <CheckCircle2 className="h-4 w-4 text-success" title="Verified profile" />
                              )}
                              {candidate.isPublic && (
                                <Globe className="h-4 w-4 text-primary" title="Public profile" />
                              )}
                            </div>
                            <p className="text-muted text-sm">{candidate.role}</p>
                            <div className="flex items-center gap-3 mt-1 text-xs text-muted">
                              <span className="flex items-center gap-1">
                                <Briefcase className="h-3 w-3" />
                                {candidate.previousCompany}
                              </span>
                              <span className="flex items-center gap-1">
                                <Clock className="h-3 w-3" />
                                {candidate.experience}
                              </span>
                              <span className="text-success font-medium">{candidate.availability}</span>
                            </div>
                          </div>
                        </div>

                        {/* Match Score */}
                        <div className="flex flex-col items-end gap-1 flex-shrink-0">
                          <div className="text-right">
                            <div className="text-3xl font-black text-primary leading-none">
                              {candidate.matchPercentage}%
                            </div>
                            <div className="text-xs text-muted font-medium">MATCH</div>
                          </div>
                          <div className="w-16 h-1.5 bg-surface-2 rounded-full overflow-hidden">
                            <motion.div
                              className="h-full bg-gradient-to-r from-primary to-accent rounded-full"
                              initial={{ width: 0 }}
                              animate={{ width: `${candidate.matchPercentage}%` }}
                              transition={{ duration: 1.5, ease: 'easeOut', delay: 0.3 }}
                            />
                          </div>
                        </div>
                      </div>

                      {/* Match Breakdown */}
                      <div className="mb-4 p-3 bg-success/5 border border-success/20 rounded-xl">
                        <p className="text-xs font-semibold text-success mb-2 flex items-center gap-1">
                          <CheckCircle2 className="h-3.5 w-3.5" />
                          Match Breakdown
                        </p>
                        <div className="grid grid-cols-2 gap-1.5">
                          {candidate.matchBreakdown.map((item, idx) => (
                            <div key={idx} className="flex items-center gap-1.5 text-xs text-success">
                              <CheckCircle2 className="h-3 w-3 flex-shrink-0" />
                              <span>{item.skill}{item.level ? ` — ${item.level}` : ''}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Skills */}
                      <div className="flex flex-wrap gap-2 mb-4">
                        {candidate.skills.map(skill => (
                          <span
                            key={skill}
                            className={`text-xs px-2.5 py-1 rounded-full font-medium ${
                              query && skill.toLowerCase().includes(query.toLowerCase())
                                ? 'bg-primary text-white'
                                : 'bg-primary/10 text-primary'
                            }`}
                          >
                            {skill}
                          </span>
                        ))}
                      </div>

                      {/* Stats Row */}
                      <div className="flex items-center gap-4 mb-5 text-sm">
                        <div className="flex items-center gap-1.5">
                          <Award className="h-4 w-4 text-muted" />
                          <span className="text-text font-medium">{candidate.verifiedSkills}</span>
                          <span className="text-muted">verified skills</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Briefcase className="h-4 w-4 text-muted" />
                          <span className="text-text font-medium">{candidate.projectCount}</span>
                          <span className="text-muted">projects</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Star className="h-4 w-4 text-warning fill-warning" />
                          <span className="text-text font-medium">{candidate.performance}</span>
                          <span className="text-muted">/ 5.0</span>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex gap-2">
                        <Button
                          variant="primary"
                          className="flex-1"
                          onClick={() => navigate(`/recruiter/candidate/${candidate.id}`)}
                        >
                          View Profile
                          <ChevronRight className="h-4 w-4 ml-1" />
                        </Button>
                        <button
                          onClick={() => handleSave(candidate)}
                          className={`p-2.5 rounded-xl border transition-all ${
                            savedIds.includes(candidate.id)
                              ? 'bg-accent/10 border-accent/30 text-accent'
                              : 'bg-surface border-border text-muted hover:border-accent hover:text-accent'
                          }`}
                          title={savedIds.includes(candidate.id) ? 'Unsave' : 'Save candidate'}
                        >
                          {savedIds.includes(candidate.id) ? (
                            <BookmarkCheck className="h-5 w-5" />
                          ) : (
                            <Bookmark className="h-5 w-5" />
                          )}
                        </button>
                        <Button
                          variant="success"
                          className="flex-1"
                          onClick={() => {
                            setSelectedCandidate(candidate);
                            setOpportunityOpen(true);
                            setOppSent(false);
                            setOppProcessing(false);
                            setOppStep(0);
                          }}
                        >
                          <Send className="h-4 w-4 mr-1" />
                          Send Opportunity
                        </Button>
                      </div>
                    </motion.div>
                  ))
                )}
              </div>
            )}

            {/* Initial empty (before search) */}
            {!isSearching && !searchDone && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="bg-surface rounded-2xl border border-border shadow-md p-12 text-center"
              >
                <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Search className="h-8 w-8 text-primary" />
                </div>
                <h3 className="font-semibold text-text mb-2">Search Verified Talent</h3>
                <p className="text-muted text-sm max-w-xs mx-auto">
                  Search by skill, role, or experience to discover verified professionals.
                  Try "Python Machine Learning Developer".
                </p>
              </motion.div>
            )}
</div>
{/* Filters Slide-Over */}
      <SlideOver isOpen={filterOpen} onClose={() => setFilterOpen(false)} title="Search Filters">
        <div className="p-6 space-y-6">
          <div>
            <p className="text-sm font-semibold text-text mb-3">Skills</p>
            <div className="flex flex-wrap gap-2">
              {FILTERS.skills.map(skill => (
                <button key={skill} className="px-3 py-1.5 text-xs font-medium bg-surface-2 rounded-full text-muted hover:bg-primary/10 hover:text-primary transition-colors">
                  {skill}
                </button>
              ))}
            </div>
          </div>
          <div>
            <p className="text-sm font-semibold text-text mb-3">Experience</p>
            <div className="space-y-2">
              {FILTERS.experience.map(exp => (
                <label key={exp} className="flex items-center gap-3 cursor-pointer group">
                  <div className="w-5 h-5 rounded border-2 border-border group-hover:border-primary transition-colors" />
                  <span className="text-sm text-muted group-hover:text-text">{exp}</span>
                </label>
              ))}
            </div>
          </div>
          <div>
            <p className="text-sm font-semibold text-text mb-3">Availability</p>
            <div className="space-y-2">
              {FILTERS.availability.map(avail => (
                <label key={avail} className="flex items-center gap-3 cursor-pointer group">
                  <div className="w-5 h-5 rounded-full border-2 border-border group-hover:border-primary transition-colors" />
                  <span className="text-sm text-muted group-hover:text-text">{avail}</span>
                </label>
              ))}
            </div>
          </div>
          <div>
            <p className="text-sm font-semibold text-text mb-3">Verification Status</p>
            <label className="flex items-center gap-3 cursor-pointer">
              <div className="w-5 h-5 rounded bg-primary flex items-center justify-center">
                <CheckCircle2 className="h-3 w-3 text-white" />
              </div>
              <span className="text-sm text-text">Verified profiles only</span>
            </label>
          </div>
          <Button variant="primary" className="w-full" onClick={() => setFilterOpen(false)}>
            Apply Filters
          </Button>
        </div>
      </SlideOver>

      {/* Send Opportunity Slide-Over */}
      <SlideOver
        isOpen={opportunityOpen}
        onClose={() => { setOpportunityOpen(false); setOppSent(false); }}
        title="Send Hiring Opportunity"
        width="max-w-xl"
      >
        {!oppProcessing && !oppSent && selectedCandidate && (
          <div className="p-6 space-y-5">
            {/* Candidate summary */}
            <div className="flex items-center gap-4 p-4 bg-primary/5 rounded-xl border border-primary/20">
              <div className="w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-xl flex items-center justify-center">
                <span className="text-white font-bold">{selectedCandidate.name.charAt(0)}</span>
              </div>
              <div>
                <p className="font-semibold text-text">{selectedCandidate.name}</p>
                <p className="text-sm text-muted">{selectedCandidate.role}</p>
                <Badge variant="success" size="sm">{selectedCandidate.matchPercentage}% Match</Badge>
              </div>
            </div>

            {/* Form */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-text mb-1.5">Position *</label>
                <input
                  type="text"
                  value={opportunity.position}
                  onChange={e => setOpportunity(p => ({ ...p, position: e.target.value }))}
                  className="w-full px-4 py-3 bg-surface-2 rounded-xl border border-border text-text text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-text mb-1.5">Company *</label>
                <input
                  type="text"
                  value={opportunity.company}
                  onChange={e => setOpportunity(p => ({ ...p, company: e.target.value }))}
                  className="w-full px-4 py-3 bg-surface-2 rounded-xl border border-border text-text text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-text mb-1.5">Work Arrangement</label>
                <div className="flex gap-2">
                  {['Remote', 'Hybrid', 'On-site'].map(arr => (
                    <button
                      key={arr}
                      onClick={() => setOpportunity(p => ({ ...p, arrangement: arr }))}
                      className={`flex-1 py-2.5 rounded-xl text-sm font-medium border transition-all ${
                        opportunity.arrangement === arr
                          ? 'bg-primary text-white border-primary'
                          : 'bg-surface-2 text-muted border-border hover:border-primary hover:text-primary'
                      }`}
                    >
                      {arr}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-text mb-1.5">Salary Range</label>
                <input
                  type="text"
                  value={opportunity.salary}
                  onChange={e => setOpportunity(p => ({ ...p, salary: e.target.value }))}
                  className="w-full px-4 py-3 bg-surface-2 rounded-xl border border-border text-text text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-text mb-1.5">Message *</label>
                <textarea
                  rows={3}
                  value={opportunity.message}
                  onChange={e => setOpportunity(p => ({ ...p, message: e.target.value }))}
                  className="w-full px-4 py-3 bg-surface-2 rounded-xl border border-border text-text text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 resize-none"
                />
              </div>
            </div>

            <div className="flex gap-3 pt-2">
              <Button variant="ghost" className="flex-1" onClick={() => setOpportunityOpen(false)}>
                Cancel
              </Button>
              <Button variant="primary" className="flex-1" onClick={handleSendOpportunity}>
                <Send className="h-4 w-4 mr-2" />
                Send Hiring Opportunity
              </Button>
            </div>
          </div>
        )}

        {/* Processing State */}
        {oppProcessing && (
          <div className="p-8 text-center">
            <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Send className="h-8 w-8 text-primary animate-pulse" />
            </div>
            <h3 className="font-semibold text-text mb-6">Sending Opportunity...</h3>
            <div className="space-y-3 text-left">
              {oppSteps.map((step, i) => (
                <div key={i} className={`flex items-center gap-3 text-sm p-3 rounded-xl transition-all ${
                  i < oppStep ? 'bg-success/10 text-success' : i === oppStep ? 'bg-primary/10 text-primary' : 'text-muted/40'
                }`}>
                  {i < oppStep ? (
                    <CheckCircle2 className="h-4 w-4 flex-shrink-0" />
                  ) : (
                    <div className={`w-4 h-4 rounded-full border-2 flex-shrink-0 ${i === oppStep ? 'border-primary animate-pulse' : 'border-border'}`} />
                  )}
                  {step}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Success State */}
        {oppSent && !oppProcessing && (
          <div className="p-8 text-center">
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              className="w-20 h-20 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-6"
            >
              <CheckCircle2 className="h-10 w-10 text-success" />
            </motion.div>
            <h3 className="text-xl font-bold text-text mb-2">✓ Opportunity Sent Successfully</h3>
            <p className="text-muted text-sm mb-6">
              {selectedCandidate?.name} will receive a notification with your opportunity.
            </p>

            {/* Status Timeline */}
            <div className="text-left bg-surface-2 rounded-xl p-4 mb-6">
              <p className="text-xs font-semibold text-muted uppercase tracking-wider mb-3">Opportunity Timeline</p>
              {['sent', 'viewed', 'interested', 'interview', 'accepted'].map((status, i) => (
                <div key={status} className="flex items-center gap-3 mb-2 last:mb-0">
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-bold ${
                    status === 'sent' ? 'bg-success text-white' : 'bg-border text-muted'
                  }`}>
                    {status === 'sent' ? '✓' : i + 1}
                  </div>
                  <div>
                    <span className={`text-sm font-medium capitalize ${status === 'sent' ? 'text-success' : 'text-muted'}`}>
                      {status}
                    </span>
                    {status === 'sent' && (
                      <span className="text-xs text-muted ml-2">({new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })})</span>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <Button variant="primary" className="w-full" onClick={() => { setOpportunityOpen(false); setOppSent(false); }}>
              Done
            </Button>
          </div>
        )}
      </SlideOver>
    </>
  );
};
