import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Lock, Globe, CheckCircle2, Shield } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { useApp } from '../../store/context';
import { employeeApi } from '../../services/company';
import toast from 'react-hot-toast';

const PUBLISHABLE_FIELDS = [
  { key: 'experience', label: 'Verified work experience', defaultChecked: true },
  { key: 'skills', label: 'Verified skills', defaultChecked: true },
  { key: 'projects', label: 'Completed projects', defaultChecked: true },
  { key: 'achievements', label: 'Achievements', defaultChecked: true },
  { key: 'timeline', label: 'Career timeline', defaultChecked: true },
  { key: 'performance', label: 'Performance summary', defaultChecked: false },
  { key: 'feedback', label: 'Manager feedback', defaultChecked: false },
];

// Map this page's field keys to the backend privacy_settings boolean flags.
const FIELD_TO_FLAG = {
  experience: 'experience_public',
  skills: 'skills_public',
  projects: 'projects_public',
  achievements: 'achievements_public',
  timeline: 'monthly_progress_public',
  performance: 'performance_summary_public',
  feedback: 'behavior_summary_public',
};

// Build the flag payload the backend expects from the selected page-field keys.
const buildFlagPayload = (selected) => {
  const payload = {};
  for (const [key, flag] of Object.entries(FIELD_TO_FLAG)) {
    payload[flag] = selected.includes(key);
  }
  return payload;
};

// Derive the selected page-field keys from a backend privacy settings object.
const flagsToSelectedFields = (privacy) =>
  Object.entries(FIELD_TO_FLAG)
    .filter(([, flag]) => !!privacy[flag])
    .map(([key]) => key);

export const PrivacyControls = () => {
  const { state } = useApp();
  const { employmentCompany } = state;

  // Source of truth loaded from the backend (falls back to store defaults until loaded).
  const [privacy, setPrivacy] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const isFormer = privacy ? !!privacy.is_employee_controlled : state.employeeStatus === 'former';
  const isPublic = privacy ? privacy.profile_visibility === 'public' : state.profileVisibility === 'public';

  const [selectedVisibility, setSelectedVisibility] = useState('private');
  const [selectedFields, setSelectedFields] = useState(
    state.publicFields?.length > 0
      ? state.publicFields
      : PUBLISHABLE_FIELDS.filter(f => f.defaultChecked).map(f => f.key)
  );

  const normalizeSelection = (values) => [...values].sort();
  const currentSelectedFields = privacy ? normalizeSelection(flagsToSelectedFields(privacy)) : [];
  const normalizedSelectedFields = normalizeSelection(selectedFields);
  const fieldSelectionChanged = currentSelectedFields.length !== normalizedSelectedFields.length
    || currentSelectedFields.some((value, index) => value !== normalizedSelectedFields[index]);
  const visibilityChanged = privacy ? selectedVisibility !== privacy.profile_visibility : false;
  const changesPending = visibilityChanged || (selectedVisibility === 'public' && fieldSelectionChanged);

  // Load current privacy settings from the database on mount.
  useEffect(() => {
    let active = true;
    (async () => {
      try {
        const data = await employeeApi.getPrivacy();
        if (active && data.success && data.privacy) {
          setPrivacy(data.privacy);
          setSelectedVisibility(data.privacy.profile_visibility || 'private');
          const derived = flagsToSelectedFields(data.privacy);
          setSelectedFields(derived);
        }
      } catch (err) {
        if (active) toast.error(err.message || 'Failed to load privacy settings');
      } finally {
        if (active) setLoading(false);
      }
    })();
    return () => { active = false; };
  }, []);

  const toggleField = (key) => {
    setSelectedFields(prev =>
      prev.includes(key) ? prev.filter(k => k !== key) : [...prev, key]
    );
  };

  const handleSaveVisibility = async () => {
    if (!isFormer || saving) return;
    setSaving(true);
    try {
      if (selectedVisibility === 'public') {
        await employeeApi.updatePrivacy({
          profile_visibility: 'public',
          ...buildFlagPayload(selectedFields),
        });
        await employeeApi.publishProfile();
      } else {
        await employeeApi.updatePrivacy({ profile_visibility: 'private' });
        await employeeApi.unpublishProfile();
      }
      const data = await employeeApi.getPrivacy();
      if (data.success && data.privacy) {
        setPrivacy(data.privacy);
        setSelectedVisibility(data.privacy.profile_visibility || 'private');
      }
      toast.success('Profile visibility updated successfully');
    } catch (err) {
      toast.error(err.message || 'Failed to update profile visibility');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-text">Privacy Controls</h2>
              <p className="text-muted mt-1">Manage your verified career profile visibility</p>
            </div>

            {/* Status Banner */}
            {!isFormer ? (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-warning/10 border border-warning/20 rounded-xl p-5 flex items-start gap-4"
              >
                <div className="p-2.5 bg-warning/20 rounded-xl flex-shrink-0">
                  <Lock className="h-6 w-6 text-warning" />
                </div>
                <div>
                  <p className="font-semibold text-text mb-1">Profile is Private During Employment</p>
                  <p className="text-sm text-muted">
                    Your profile is private while you are employed at{' '}
                    <span className="font-medium text-text">{employmentCompany}</span>. Public publication
                    is unavailable until employment ends.
                  </p>
                </div>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`rounded-xl p-5 flex items-start gap-4 border ${
                  isPublic
                    ? 'bg-success/10 border-success/20'
                    : 'bg-primary/10 border-primary/20'
                }`}
              >
                <div className={`p-2.5 rounded-xl flex-shrink-0 ${isPublic ? 'bg-success/20' : 'bg-primary/20'}`}>
                  {isPublic ? (
                    <Globe className="h-6 w-6 text-success" />
                  ) : (
                    <Lock className="h-6 w-6 text-primary" />
                  )}
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-text mb-1">
                    Your verified career profile is now under your control.
                  </p>
                  <p className="text-sm text-muted">
                    Current status:{' '}
                    <span className={`font-semibold ${isPublic ? 'text-success' : 'text-primary'}`}>
                      {isPublic ? '🌐 PUBLIC' : '🔒 PRIVATE'}
                    </span>
                  </p>
                </div>
                {isPublic && (
                  <button
                    onClick={() => setSelectedVisibility('private')}
                    className="text-xs text-muted hover:text-primary px-3 py-1 rounded-lg border border-border hover:border-primary/30 transition-colors flex-shrink-0"
                  >
                    Switch to Private
                  </button>
                )}
              </motion.div>
            )}


            {isFormer ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-surface rounded-xl border border-border shadow-sm p-6 space-y-4"
              >
                <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-text">Profile Visibility</h3>
                    <p className="text-sm text-muted">
                      Former employees can choose whether their verified career profile is discoverable by companies.
                    </p>
                  </div>
                  <div className="inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-semibold tracking-wide text-muted bg-surface-2">
                    {isFormer ? 'Employee-controlled' : 'Company-controlled until departure'}
                  </div>
                </div>
 
                <div className="grid gap-4 md:grid-cols-2">
                  <button
                    type="button"
                    onClick={() => isFormer && setSelectedVisibility('private')}
                    className={`rounded-2xl border p-4 text-left transition-all ${
                      selectedVisibility === 'private'
                        ? 'border-primary bg-primary/10'
                        : 'border-border bg-surface hover:border-primary/40'
                    } ${!isFormer ? 'opacity-60 cursor-not-allowed' : ''}`}
                    aria-pressed={selectedVisibility === 'private'}
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <div className="rounded-xl bg-primary/10 p-2">
                        <Lock className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-text">🔒 Private</div>
                        <p className="text-xs text-muted">Only you can access your profile and it will not be discoverable.</p>
                      </div>
                    </div>
                    {selectedVisibility === 'private' && (
                      <span className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-2 py-1 text-xs font-medium text-primary">
                        Current selection
                      </span>
                    )}
                  </button>
 
                  <button
                    type="button"
                    onClick={() => isFormer && setSelectedVisibility('public')}
                    className={`rounded-2xl border p-4 text-left transition-all ${
                      selectedVisibility === 'public'
                        ? 'border-success bg-success/10'
                        : 'border-border bg-surface hover:border-success/40'
                    } ${!isFormer ? 'opacity-60 cursor-not-allowed' : ''}`}
                    aria-pressed={selectedVisibility === 'public'}
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <div className="rounded-xl bg-success/10 p-2">
                        <Globe className="h-5 w-5 text-success" />
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-text">🌐 Public</div>
                        <p className="text-xs text-muted">Visible to recruiters and companies through the public profile directory.</p>
                      </div>
                    </div>
                    {selectedVisibility === 'public' && (
                      <span className="inline-flex items-center gap-1 rounded-full bg-success/10 px-2 py-1 text-xs font-medium text-success">
                        Current selection
                      </span>
                    )}
                  </button>
                </div>
 
                <div className="space-y-3">
                  <div className="flex items-center justify-between gap-4">
                    <h4 className="text-sm font-semibold text-text">Selected information</h4>
                    {!isFormer && <span className="text-xs text-muted">Enable after employment ends</span>}
                  </div>
                  <div className="grid gap-3">
                    {PUBLISHABLE_FIELDS.map((field) => (
                      <label
                        key={field.key}
                        className={`flex items-center gap-3 p-3 rounded-lg border transition-all ${
                          selectedFields.includes(field.key)
                            ? 'border-primary bg-primary/5'
                            : 'border-border bg-surface'
                        } ${!isFormer ? 'opacity-60' : 'hover:border-primary/40'}`}
                      >
                        <input
                          type="checkbox"
                          checked={selectedFields.includes(field.key)}
                          onChange={() => isFormer && toggleField(field.key)}
                          disabled={!isFormer}
                          className="h-4 w-4 rounded text-primary"
                        />
                        <div className="flex-1">
                          <div className="text-sm font-medium text-text">{field.label}</div>
                          <p className="text-xs text-muted">{field.key === 'performance' || field.key === 'feedback' ? 'Sensitive data' : 'Verified content'}</p>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>
 
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <p className="text-xs text-muted">
                    Public profiles are updated immediately after saving. Private profiles are removed from discovery right away.
                  </p>
                  <Button
                    variant="primary"
                    onClick={handleSaveVisibility}
                    disabled={!isFormer || !changesPending || (selectedVisibility === 'public' && selectedFields.length === 0) || saving}
                  >
                    {saving ? 'Saving...' : 'Save Changes'}
                  </Button>
                </div>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-surface rounded-xl border border-border shadow-sm p-6"
              >
                <h3 className="text-lg font-semibold text-text">Profile Visibility</h3>
                <p className="text-sm text-muted mt-2">
                  Your profile visibility will become editable once your employment ends. Until then, your profile remains private and visible only to authorized company members.
                </p>
              </motion.div>
            )}

            {/* Profile Security Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              className="bg-surface rounded-xl border border-border shadow-sm p-6"
            >
              <div className="flex items-center gap-3 mb-4">
                <Shield className="h-5 w-5 text-primary" />
                <h3 className="text-lg font-semibold text-text">Your Data, Your Control</h3>
              </div>
              <div className="grid lg:grid-cols-3 gap-4">
                {[
                  {
                    icon: '🔒',
                    title: 'Cryptographically Verified',
                    desc: 'All credentials are blockchain-anchored and tamper-proof',
                  },
                  {
                    icon: '🎛️',
                    title: 'Selective Disclosure',
                    desc: 'Choose exactly what information to share with the world',
                  },
                  {
                    icon: '🚫',
                    title: 'Revoke Anytime',
                    desc: 'Switch back to private mode at any time with one click',
                  },
                ].map((item) => (
                  <div key={item.title} className="p-4 bg-surface-2 rounded-lg">
                    <p className="text-2xl mb-2">{item.icon}</p>
                    <p className="font-medium text-text text-sm mb-1">{item.title}</p>
                    <p className="text-xs text-muted">{item.desc}</p>
                  </div>
                ))}
              </div>
            </motion.div>
</div>
  );
};
