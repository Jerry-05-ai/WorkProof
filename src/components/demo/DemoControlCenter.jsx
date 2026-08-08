import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, RotateCcw, X, ChevronUp, ChevronDown, Zap, Lock, Globe, User } from 'lucide-react';
import { useApp } from '../../store/context';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

export const DemoControlCenter = () => {
  const { state, dispatch } = useApp();
  const { employeeStatus, profileVisibility, profileOwner, guidedDemo } = state;
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const isFormer = employeeStatus === 'former';
  const isPublic = profileVisibility === 'public';
  const isEmployeeOwned = profileOwner === 'employee';

  const handleStartDemo = () => {
    dispatch({ type: 'START_DEMO' });
    setIsOpen(false);
    toast.success('Guided demo started!');
  };

  const handleReset = () => {
    dispatch({ type: 'RESET_DEMO' });
    setIsOpen(false);
    toast.success('Demo reset to initial state');
  };

  const handleSimulateLeaving = () => {
    if (isFormer) {
      toast.error('Employment already ended');
      return;
    }
    dispatch({ type: 'END_EMPLOYMENT' });
    dispatch({
      type: 'ADD_NOTIFICATION',
      payload: {
        id: `notif_${Date.now()}`,
        type: 'employment',
        title: 'Employment Status Updated',
        message: 'Your employment record has ended. Your verified career profile is now under your control.',
        read: false,
        createdAt: new Date().toISOString(),
        link: '/employee/privacy',
      },
    });
    dispatch({
      type: 'ADD_ACTIVITY',
      payload: {
        id: `act_${Date.now()}`,
        actor: 'Demo Control',
        actorRole: 'SYSTEM',
        action: 'ENDED_EMPLOYMENT',
        target: 'Ayan Malik',
        timestamp: new Date().toISOString(),
        status: 'SUCCESS',
        metadata: { company: 'NovaTech Solutions' },
      },
    });
    toast.success('Employment ended — profile ownership transferred to Ayan');
    setIsOpen(false);
  };

  const handlePublishProfile = () => {
    if (!isFormer) {
      toast.error('Employment must end first');
      return;
    }
    if (isPublic) {
      toast.error('Profile is already public');
      return;
    }
    dispatch({ type: 'PUBLISH_PROFILE', payload: ['experience', 'skills', 'projects', 'achievements', 'timeline'] });
    dispatch({
      type: 'ADD_NOTIFICATION',
      payload: {
        id: `notif_${Date.now()}`,
        type: 'profile',
        title: 'Profile Published',
        message: 'Your verified career profile is now discoverable.',
        read: false,
        createdAt: new Date().toISOString(),
        link: '/employee/privacy',
      },
    });
    toast.success('Profile published — now discoverable by recruiters!');
    setIsOpen(false);
  };

  const stateItems = [
    {
      label: 'Employment',
      value: isFormer ? 'Former' : 'Active',
      color: isFormer ? 'text-warning' : 'text-success',
      dot: isFormer ? 'bg-warning' : 'bg-success',
    },
    {
      label: 'Visibility',
      value: isPublic ? 'Public' : 'Private',
      color: isPublic ? 'text-success' : 'text-primary',
      dot: isPublic ? 'bg-success' : 'bg-primary',
    },
    {
      label: 'Owner',
      value: isEmployeeOwned ? 'Employee' : 'Company',
      color: isEmployeeOwned ? 'text-accent' : 'text-secondary',
      dot: isEmployeeOwned ? 'bg-accent' : 'bg-secondary',
    },
  ];

  return (
    <div className="fixed bottom-20 lg:bottom-6 right-4 lg:right-6 z-30 flex flex-col items-end gap-2">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 10 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            className="bg-surface rounded-2xl shadow-2xl border border-border w-72 overflow-hidden"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-primary to-accent p-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-white text-sm">Demo Control Center</h3>
                  <p className="text-white/70 text-xs">WorkProof Demo v1.0</p>
                </div>
                <button onClick={() => setIsOpen(false)} className="p-1 rounded-lg hover:bg-white/10">
                  <X className="h-4 w-4 text-white" />
                </button>
              </div>
            </div>

            {/* State Display */}
            <div className="p-4 border-b border-border">
              <p className="text-xs font-semibold text-muted uppercase tracking-wider mb-3">Current State</p>
              <div className="space-y-2">
                {stateItems.map(item => (
                  <div key={item.label} className="flex items-center justify-between">
                    <span className="text-xs text-muted">{item.label}</span>
                    <div className="flex items-center gap-1.5">
                      <div className={`w-2 h-2 rounded-full ${item.dot}`} />
                      <span className={`text-xs font-semibold ${item.color}`}>{item.value}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="p-4 space-y-2">
              <p className="text-xs font-semibold text-muted uppercase tracking-wider mb-3">Quick Actions</p>

              <button
                onClick={handleStartDemo}
                className="w-full flex items-center gap-3 p-3 rounded-xl bg-primary/5 hover:bg-primary/10 transition-colors text-left"
              >
                <div className="p-1.5 bg-primary/10 rounded-lg">
                  <Play className="h-3.5 w-3.5 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium text-text">Start Guided Demo</p>
                  <p className="text-xs text-muted">8-step walkthrough</p>
                </div>
              </button>

              <button
                onClick={handleSimulateLeaving}
                disabled={isFormer}
                className="w-full flex items-center gap-3 p-3 rounded-xl bg-warning/5 hover:bg-warning/10 transition-colors text-left disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <div className="p-1.5 bg-warning/10 rounded-lg">
                  <User className="h-3.5 w-3.5 text-warning" />
                </div>
                <div>
                  <p className="text-sm font-medium text-text">Simulate Employee Leaving</p>
                  <p className="text-xs text-muted">Ends employment, transfers profile</p>
                </div>
              </button>

              <button
                onClick={() => { navigate('/employee/privacy'); setIsOpen(false); }}
                className="w-full flex items-center gap-3 p-3 rounded-xl bg-accent/5 hover:bg-accent/10 transition-colors text-left"
              >
                <div className="p-1.5 bg-accent/10 rounded-lg">
                  <Lock className="h-3.5 w-3.5 text-accent" />
                </div>
                <div>
                  <p className="text-sm font-medium text-text">View Privacy Controls</p>
                  <p className="text-xs text-muted">Manage profile visibility</p>
                </div>
              </button>

              <button
                onClick={handlePublishProfile}
                disabled={!isFormer || isPublic}
                className="w-full flex items-center gap-3 p-3 rounded-xl bg-success/5 hover:bg-success/10 transition-colors text-left disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <div className="p-1.5 bg-success/10 rounded-lg">
                  <Globe className="h-3.5 w-3.5 text-success" />
                </div>
                <div>
                  <p className="text-sm font-medium text-text">Publish Profile</p>
                  <p className="text-xs text-muted">Make profile discoverable</p>
                </div>
              </button>

              <button
                onClick={handleReset}
                className="w-full flex items-center gap-3 p-3 rounded-xl bg-danger/5 hover:bg-danger/10 transition-colors text-left"
              >
                <div className="p-1.5 bg-danger/10 rounded-lg">
                  <RotateCcw className="h-3.5 w-3.5 text-danger" />
                </div>
                <div>
                  <p className="text-sm font-medium text-text">Reset Demo</p>
                  <p className="text-xs text-muted">Restore original state</p>
                </div>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-3 bg-gradient-to-r from-primary to-accent text-white rounded-2xl border border-border shadow-lg font-medium text-sm"
      >
        <Zap className="h-4 w-4" />
        <span>Demo</span>
        {isOpen ? <ChevronDown className="h-4 w-4" /> : <ChevronUp className="h-4 w-4" />}
      </motion.button>
    </div>
  );
};
