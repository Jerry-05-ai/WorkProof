import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { ShieldCheck, Lock, Mail, User, ArrowRight } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Footer } from '../../components/layout/Footer';
import { invitationService } from '../../services/auth';
import toast from 'react-hot-toast';

export const AcceptInvitation = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');

  const [invitation, setInvitation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [verifying, setVerifying] = useState(true);
  const [error, setError] = useState('');

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    password: '',
    confirmPassword: '',
  });

  useEffect(() => {
    if (!token) {
      setError('No invitation token provided');
      setVerifying(false);
      setLoading(false);
      return;
    }

    const verifyToken = async () => {
      try {
        const data = await invitationService.verify(token);
        if (data.success && data.invitation) {
          setInvitation(data.invitation);
          setFormData(prev => ({
            ...prev,
            firstName: data.invitation.first_name || '',
            lastName: data.invitation.last_name || '',
          }));
        } else {
          setError(data.error || 'Invalid invitation');
        }
      } catch (err) {
        setError(err.message || 'Invalid or expired invitation');
      } finally {
        setVerifying(false);
        setLoading(false);
      }
    };
    verifyToken();
  }, [token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    if (formData.password.length < 8) {
      toast.error('Password must be at least 8 characters');
      return;
    }

    setLoading(true);
    try {
      const data = await invitationService.accept({
        token,
        password: formData.password,
        first_name: formData.firstName,
        last_name: formData.lastName,
      });

      if (data.success) {
        toast.success('Account created successfully! You can now log in.');
        navigate('/login');
      }
    } catch (err) {
      const message = err.message || 'Failed to accept invitation';
      setError(message);
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  if (verifying) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error && !invitation) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <nav className="sticky top-0 z-50 bg-surface/80 backdrop-blur-lg border-b border-border">
          <div className="max-w-7xl mx-auto px-4 lg:px-8 py-4">
            <button onClick={() => navigate('/')} className="flex items-center gap-3">
              <div className="w-10 h-10 bg-brand-gradient rounded-xl flex items-center justify-center">
                <ShieldCheck className="h-6 w-6 text-white" />
              </div>
              <span className="text-xl font-bold text-text">WorkProof</span>
            </button>
          </div>
        </nav>
        <div className="flex-1 flex items-center justify-center px-4">
          <div className="max-w-md w-full bg-surface rounded-2xl border border-border shadow-lg p-8 text-center">
            <div className="w-16 h-16 bg-danger/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <ShieldCheck className="h-8 w-8 text-danger" />
            </div>
            <h1 className="text-xl font-bold text-text mb-2">Invalid Invitation</h1>
            <p className="text-muted mb-6">{error}</p>
            <Button onClick={() => navigate('/login')} className="w-full">
              Go to Login
            </Button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <nav className="sticky top-0 z-50 bg-surface/80 backdrop-blur-lg border-b border-border">
        <div className="max-w-7xl mx-auto px-4 lg:px-8 py-4">
          <button onClick={() => navigate('/')} className="flex items-center gap-3">
            <div className="w-10 h-10 bg-brand-gradient rounded-xl flex items-center justify-center">
              <ShieldCheck className="h-6 w-6 text-white" />
            </div>
            <span className="text-xl font-bold text-text">WorkProof</span>
          </button>
        </div>
      </nav>

      <div className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md bg-surface rounded-2xl border border-border shadow-lg p-8">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-primary-soft rounded-full flex items-center justify-center mx-auto mb-4">
              <User className="h-8 w-8 text-primary" />
            </div>
            <h1 className="text-2xl font-bold text-text mb-2">Accept Invitation</h1>
            {invitation && (
              <p className="text-muted">
                You've been invited to join <span className="font-semibold text-text">{invitation.company_name}</span>
              </p>
            )}
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <Input
                label="First Name"
                name="firstName"
                required
                icon={User}
                value={formData.firstName}
                onChange={handleChange}
              />
              <Input
                label="Last Name"
                name="lastName"
                required
                icon={User}
                value={formData.lastName}
                onChange={handleChange}
              />
            </div>

            {invitation && (
              <div className="bg-surface-2 rounded-lg p-3 flex items-center gap-3">
                <Mail className="h-4 w-4 text-muted" />
                <span className="text-sm text-text">{invitation.email}</span>
              </div>
            )}

            <Input
              label="Password"
              name="password"
              type="password"
              required
              icon={Lock}
              placeholder="Min. 8 characters, mixed case, number"
              value={formData.password}
              onChange={handleChange}
            />
            <Input
              label="Confirm Password"
              name="confirmPassword"
              type="password"
              required
              icon={Lock}
              value={formData.confirmPassword}
              onChange={handleChange}
            />

            {error && (
              <p className="text-sm text-danger text-center">{error}</p>
            )}

            <Button type="submit" className="w-full" loading={loading}>
              Create Account
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </form>

          <div className="mt-6 pt-6 border-t border-border">
            <p className="text-sm text-muted text-center">
              Already have an account?{' '}
              <button
                onClick={() => navigate('/login')}
                className="text-primary font-medium hover:underline"
              >
                Sign in
              </button>
            </p>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};