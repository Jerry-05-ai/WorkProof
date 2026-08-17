import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, Loader2, Lock, Globe, X } from 'lucide-react';
import { Button } from '../ui/Button';

const stepsConfig = {
  endEmployment: [
    { key: 'validating', label: 'Validating authorization...' },
    { key: 'processing', label: 'Updating employment record...' },
    { key: 'updating', label: 'Changing status to Former Employee...' },
    { key: 'notifying', label: 'Transferring profile ownership...' },
    { key: 'preserving', label: 'Preserving private visibility...' },
    { key: 'creating', label: 'Creating notification...' },
    { key: 'finalizing', label: 'Finalizing transition...' },
  ],
  publishProfile: [
    { key: 'validating', label: 'Validating selection...' },
    { key: 'ownership', label: 'Checking ownership...' },
    { key: 'filtering', label: 'Filtering private company data...' },
    { key: 'updating', label: 'Updating profile visibility...' },
    { key: 'indexing', label: 'Updating talent discovery index...' },
    { key: 'creating', label: 'Creating notification...' },
    { key: 'finalizing', label: 'Finalizing publication...' },
  ],
};

export const TransactionProcessor = ({ type, isOpen, onComplete, isSuccess, onDismiss }) => {
  const steps = stepsConfig[type] || stepsConfig.endEmployment;
  const [currentStep, setCurrentStep] = React.useState(0);

  React.useEffect(() => {
    if (!isOpen) {
      setCurrentStep(0);
      return;
    }

    let cancelled = false;
    const runSteps = async () => {
      for (let i = 0; i < steps.length; i++) {
        if (cancelled) break;
        await new Promise((r) => setTimeout(r, 500));
        if (cancelled) break;
        setCurrentStep(i + 1);
      }
      if (!cancelled) {
        await new Promise((r) => setTimeout(r, 600));
        if (!cancelled) onComplete();
      }
    };
    runSteps();
    return () => { cancelled = true; };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-surface rounded-2xl shadow-xl max-w-md w-full p-8"
      >
        {!isSuccess ? (
          <div className="text-center">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <Loader2 className="h-8 w-8 text-primary animate-spin" />
            </div>
            <h3 className="text-lg font-semibold text-text mb-6">
              {type === 'endEmployment' ? 'Processing Employment End...' : 'Publishing Profile...'}
            </h3>
            <div className="space-y-2">
              {steps.map((step, index) => (
                <div
                  key={step.key}
                  className={`flex items-center gap-3 p-2.5 rounded-lg transition-all ${
                    index < currentStep
                      ? 'bg-success/10 text-success'
                      : index === currentStep
                      ? 'bg-primary/10 text-primary'
                      : 'text-muted'
                  }`}
                >
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 ${
                    index < currentStep
                      ? 'bg-success text-white'
                      : index === currentStep
                      ? 'bg-primary text-white animate-pulse'
                      : 'bg-border'
                  }`}>
                    {index < currentStep ? (
                      <CheckCircle2 className="h-4 w-4" />
                    ) : (
                      <span className="text-xs font-medium">{index + 1}</span>
                    )}
                  </div>
                  <span className="text-sm font-medium text-left">{step.label}</span>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="text-center">
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              className={`w-20 h-20 ${
                type === 'endEmployment' ? 'bg-warning/10' : 'bg-success/10'
              } rounded-full flex items-center justify-center mx-auto mb-6`}
            >
              {type === 'endEmployment' ? (
                <Lock className="h-10 w-10 text-warning" />
              ) : (
                <Globe className="h-10 w-10 text-success" />
              )}
            </motion.div>

            {type === 'endEmployment' ? (
              <>
                <h3 className="text-xl font-bold text-text mb-2">
                  🔓 PROFILE OWNERSHIP TRANSFERRED
                </h3>
                <div className="space-y-2 text-sm text-success mb-6">
                  <div className="flex items-center justify-center gap-2">
                    <CheckCircle2 className="h-4 w-4" />
                    <span>Employment Successfully Updated</span>
                  </div>
                  <div className="flex items-center justify-center gap-2">
                    <CheckCircle2 className="h-4 w-4" />
                    <span>Profile ownership transferred to Ayan Malik</span>
                  </div>
                  <div className="flex items-center justify-center gap-2">
                    <CheckCircle2 className="h-4 w-4" />
                    <span>Profile remains PRIVATE by default</span>
                  </div>
                  <div className="flex items-center justify-center gap-2">
                    <CheckCircle2 className="h-4 w-4" />
                    <span>Notification sent to employee</span>
                  </div>
                </div>
              </>
            ) : (
              <>
                <h3 className="text-xl font-bold text-text mb-2">
                  🌐 PUBLIC VERIFIED PROFILE
                </h3>
                <div className="space-y-2 text-sm text-success mb-6">
                  <div className="flex items-center justify-center gap-2">
                    <CheckCircle2 className="h-4 w-4" />
                    <span>Profile published successfully</span>
                  </div>
                  <div className="flex items-center justify-center gap-2">
                    <CheckCircle2 className="h-4 w-4" />
                    <span>Selected information is now public</span>
                  </div>
                  <div className="flex items-center justify-center gap-2">
                    <CheckCircle2 className="h-4 w-4" />
                    <span>Companies can now discover you</span>
                  </div>
                </div>
              </>
            )}

            {onDismiss && (
              <Button variant="primary" className="w-full" onClick={onDismiss}>
                <X className="h-4 w-4 mr-2" />
                Done
              </Button>
            )}
          </div>
        )}
      </motion.div>
    </motion.div>
  );
};