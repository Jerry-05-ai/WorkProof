import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, X, Play } from 'lucide-react';
import { useApp } from '../../store/context';
import { useNavigate } from 'react-router-dom';
import { Button } from '../ui/Button';

const DEMO_STEPS = [
  {
    step: 1,
    title: 'Meet Ayan',
    emoji: '👋',
    description: 'Meet Ayan Malik, a Software Engineer at NovaTech Solutions. He has verified skills, completed projects, and a strong performance record.',
    highlight: 'Private profile with 4.7/5 rating',
    navigateTo: '/company/employee/ayan',
    role: 'COMPANY_ADMIN',
  },
  {
    step: 2,
    title: 'Private Profile',
    emoji: '🔒',
    description: 'While employed, Ayan\'s profile is completely private. Only NovaTech Solutions and Ayan can see his verified career data.',
    highlight: 'Profile visibility: PRIVATE',
    navigateTo: '/company/employee/ayan',
    role: 'COMPANY_ADMIN',
  },
  {
    step: 3,
    title: 'Internal Intelligence',
    emoji: '🧠',
    description: 'NovaTech uses Ayan\'s verified data for internal talent intelligence — matching him to projects and tracking his growth.',
    highlight: '94% match for new project',
    navigateTo: '/company/workforce-intelligence',
    role: 'COMPANY_ADMIN',
  },
  {
    step: 4,
    title: 'Employment Ends',
    emoji: '🔄',
    description: 'Ayan leaves NovaTech Solutions. The company ends the employment record and profile ownership is transferred to Ayan.',
    highlight: 'Profile ownership → Ayan',
    navigateTo: '/company/employee/ayan',
    role: 'COMPANY_ADMIN',
  },
  {
    step: 5,
    title: 'Profile Stays Private',
    emoji: '🛡️',
    description: 'Even after leaving, Ayan\'s profile remains PRIVATE by default. No data is exposed without his explicit consent.',
    highlight: 'Default: PRIVATE',
    navigateTo: '/employee/privacy',
    role: 'EMPLOYEE',
  },
  {
    step: 6,
    title: 'Ayan Publishes',
    emoji: '🌐',
    description: 'Ayan chooses exactly what information to publish — verified skills, projects, and experience. He controls his data completely.',
    highlight: 'Selective disclosure',
    navigateTo: '/employee/privacy',
    role: 'EMPLOYEE',
  },
  {
    step: 7,
    title: 'Discovery',
    emoji: '🔍',
    description: 'BrightHire Technologies discovers Ayan\'s public verified profile. They can see only what he chose to share — verified by his former employer.',
    highlight: '94% match discovered',
    navigateTo: '/recruiter/talent',
    role: 'RECRUITER',
  },
  {
    step: 8,
    title: 'Hiring Opportunity',
    emoji: '🚀',
    description: 'BrightHire sends a hiring opportunity for Senior ML Engineer. Ayan receives it, reviews, and responds — all within WorkProof.',
    highlight: 'End-to-end verified hiring',
    navigateTo: '/recruiter/talent',
    role: 'RECRUITER',
  },
];

export const GuidedDemo = () => {
  const { state, dispatch } = useApp();
  const { guidedDemo } = state;
  const navigate = useNavigate();

  if (!guidedDemo?.active) return null;

  const currentStep = DEMO_STEPS[guidedDemo.currentStep] || DEMO_STEPS[0];
  const isFirst = guidedDemo.currentStep === 0;
  const isLast = guidedDemo.currentStep === DEMO_STEPS.length - 1;

  const handleNext = () => {
    if (isLast) {
      dispatch({ type: 'EXIT_DEMO' });
    } else {
      dispatch({ type: 'DEMO_NEXT' });
    }
  };

  const handlePrev = () => {
    dispatch({ type: 'DEMO_PREV' });
  };

  const handleExit = () => {
    dispatch({ type: 'EXIT_DEMO' });
  };

  const handleNavigate = () => {
    if (currentStep.navigateTo) {
      navigate(currentStep.navigateTo);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 50 }}
      className="fixed bottom-24 left-1/2 -translate-x-1/2 z-40 w-full max-w-lg px-4 lg:px-0"
    >
      <div className="bg-surface rounded-2xl shadow-2xl border border-primary/20 overflow-hidden">
        {/* Progress bar */}
        <div className="h-1 bg-surface-2">
          <motion.div
            className="h-full bg-gradient-to-r from-primary to-accent"
            initial={{ width: 0 }}
            animate={{ width: `${((guidedDemo.currentStep + 1) / DEMO_STEPS.length) * 100}%` }}
            transition={{ duration: 0.4 }}
          />
        </div>

        <div className="p-5">
          <div className="flex items-start justify-between mb-3">
            <div className="flex items-center gap-2">
              <span className="text-2xl">{currentStep.emoji}</span>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold text-primary uppercase tracking-wider">
                    Step {guidedDemo.currentStep + 1} of {DEMO_STEPS.length}
                  </span>
                </div>
                <h3 className="font-bold text-text">{currentStep.title}</h3>
              </div>
            </div>
            <button onClick={handleExit} className="p-1 rounded-lg hover:bg-surface-2 text-muted flex-shrink-0">
              <X className="h-4 w-4" />
            </button>
          </div>

          <AnimatePresence mode="wait">
            <motion.p
              key={guidedDemo.currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
              className="text-sm text-muted mb-3"
            >
              {currentStep.description}
            </motion.p>
          </AnimatePresence>

          <div className="flex items-center gap-2 mb-4">
            <span className="text-xs px-2 py-1 bg-primary/10 text-primary rounded-full font-medium">
              ✨ {currentStep.highlight}
            </span>
            <button
              onClick={handleNavigate}
              className="text-xs text-primary underline hover:no-underline"
            >
              Go to page →
            </button>
          </div>

          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" onClick={handlePrev} disabled={isFirst}>
              <ChevronLeft className="h-4 w-4" />
              Previous
            </Button>
            <div className="flex-1 flex justify-center gap-1">
              {DEMO_STEPS.map((_, i) => (
                <div
                  key={i}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    i === guidedDemo.currentStep ? 'w-4 bg-primary' : 'w-1.5 bg-border-strong'
                  }`}
                />
              ))}
            </div>
            <Button variant="primary" size="sm" onClick={handleNext}>
              {isLast ? 'Finish' : 'Next'}
              {!isLast && <ChevronRight className="h-4 w-4" />}
            </Button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
