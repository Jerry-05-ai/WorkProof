import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Shield, ShieldAlert, Ban, Clock } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { companyService } from '../../services/auth';
import { Button } from '../../components/ui/Button';

export const CompanyStatus = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [company, setCompany] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const data = await companyService.getStatus();
        if (data.success && data.company) {
          setCompany(data.company);
        }
      } catch (err) {
        setError(err.message || 'Failed to load company status');
      } finally {
        setLoading(false);
      }
    };
    fetchStatus();
  }, []);

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  const status = company?.status || 'pending';

  const getStatusContent = () => {
    switch (status) {
      case 'pending':
        return {
          icon: Clock,
          color: 'text-warning',
          bg: 'bg-warning/10',
          title: 'Application Submitted',
          desc: 'Your company registration has been received and is currently under review.',
          steps: [
            { label: 'Application Submitted', completed: true },
            { label: 'Platform Review', completed: false },
            { label: 'Company Approved', completed: false },
          ]
        };
      case 'rejected':
        return {
          icon: ShieldAlert,
          color: 'text-danger',
          bg: 'bg-danger/10',
          title: 'Company Registration Not Approved',
          desc: 'Unfortunately, your registration could not be verified at this time.',
          steps: null
        };
      case 'suspended':
        return {
          icon: Ban,
          color: 'text-danger',
          bg: 'bg-danger/10',
          title: 'Company Account Suspended',
          desc: 'Your company access has been suspended by the platform administrator.',
          steps: null
        };
      default:
        return {
          icon: Shield,
          color: 'text-primary',
          bg: 'bg-primary/10',
          title: 'Status Unknown',
          desc: 'We could not determine your company status.',
          steps: null
        };
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-surface rounded-2xl shadow-xl p-8 text-center border border-border">
          <ShieldAlert className="w-12 h-12 text-danger mx-auto mb-4" />
          <h2 className="text-xl font-bold text-text mb-2">Error</h2>
          <p className="text-muted mb-6">{error}</p>
          <Button variant="outline" className="w-full" onClick={handleLogout}>
            Sign Out
          </Button>
        </div>
      </div>
    );
  }

  const content = getStatusContent();
  const Icon = content.icon;

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
      <div className="max-w-md w-full bg-surface rounded-2xl shadow-xl p-8 text-center border border-border">
        <div className={`w-16 h-16 rounded-2xl mx-auto flex items-center justify-center mb-6 ${content.bg}`}>
          <Icon className={`w-8 h-8 ${content.color}`} />
        </div>
        
        <h1 className="text-2xl font-bold text-text mb-3">{content.title}</h1>
        <p className="text-muted mb-8">{content.desc}</p>

        {company && (
          <div className="text-left mb-6 p-4 bg-surface-2 rounded-lg">
            <p className="text-sm text-muted">
              <span className="font-medium text-text">Company:</span> {company.name}
            </p>
            <p className="text-sm text-muted mt-1">
              <span className="font-medium text-text">Email:</span> {company.email}
            </p>
          </div>
        )}

        {content.steps && (
          <div className="text-left mb-8 space-y-4">
            <h3 className="text-sm font-semibold text-text uppercase tracking-wider mb-4">Current Status</h3>
            {content.steps.map((step, idx) => (
              <div key={idx} className="flex items-center gap-3">
                <div className={`w-5 h-5 rounded-full flex items-center justify-center border ${step.completed ? 'bg-primary border-primary' : 'bg-surface border-gray-300'}`}>
                  {step.completed && (
                    <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </div>
                <span className={step.completed ? 'text-text font-medium' : 'text-muted'}>{step.label}</span>
              </div>
            ))}
          </div>
        )}

        <Button variant="outline" className="w-full" onClick={handleLogout}>
          Sign Out
        </Button>
      </div>
    </div>
  );
};