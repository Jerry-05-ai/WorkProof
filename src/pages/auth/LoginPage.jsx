import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { ShieldCheck, Mail, Lock, ArrowRight, CheckCircle2, Lock as LockIcon, Users } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Footer } from '../../components/layout/Footer';

const ROLE_DASHBOARDS = {
  PLATFORM_ADMIN: '/admin/dashboard',
  COMPANY_ADMIN: '/company/dashboard',
  EMPLOYEE: '/employee/dashboard',
  RECRUITER: '/recruiter/dashboard',
};

export const LoginPage = () => {
  const navigate = useNavigate();
  const { login, isLoading, error, clearError, user, isAuthenticated } = useAuth();
  const [formData, setFormData] = React.useState({ email: '', password: '' });
  const [formError, setFormError] = React.useState('');

  // Redirect if already logged in
  useEffect(() => {
    if (isAuthenticated && user) {
      const dashboard = ROLE_DASHBOARDS[user.role] || '/';
      navigate(dashboard, { replace: true });
    }
  }, [isAuthenticated, user, navigate]);

  useEffect(() => {
    if (error) {
      setFormError(error);
      clearError();
    }
  }, [error, clearError]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError('');

    if (!formData.email || !formData.password) {
      setFormError('Please fill in all fields');
      return;
    }

    try {
      const userData = await login(formData.email, formData.password);
      toast.success('Logged in successfully!');
      const dashboard = ROLE_DASHBOARDS[userData.role] || '/';
      navigate(dashboard, { replace: true });
    } catch (err) {
      // Error is handled by useAuth
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <nav className="sticky top-0 z-50 bg-surface/80 backdrop-blur-lg border-b border-border">
        <div className="max-w-7xl mx-auto px-4 lg:px-8 py-4">
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-3"
          >
            <div className="w-10 h-10 bg-brand-gradient rounded-xl flex items-center justify-center">
              <ShieldCheck className="h-6 w-6 text-white" />
            </div>
            <span className="text-xl font-bold text-text">WorkProof</span>
          </button>
        </div>
      </nav>

      <div className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-5xl grid lg:grid-cols-2 gap-8 items-stretch">
          {/* Decorative brand panel (desktop only) */}
          <div className="hidden lg:flex relative overflow-hidden rounded-2xl bg-brand-gradient p-10 text-white flex-col justify-between shadow-xl">
            <div className="pointer-events-none absolute inset-0" aria-hidden="true">
              <div className="absolute -top-16 -right-10 w-72 h-72 rounded-full bg-white/10 blur-3xl" />
              <div className="absolute bottom-0 -left-10 w-64 h-64 rounded-full bg-white/5 blur-3xl" />
            </div>
            <div className="relative">
              <div className="w-12 h-12 rounded-2xl bg-white/15 backdrop-blur flex items-center justify-center mb-6">
                <ShieldCheck className="h-6 w-6 text-white" strokeWidth={2.2} />
              </div>
              <h2 className="text-3xl font-bold tracking-tight leading-tight mb-3">
                Verified work, <br /> trusted careers.
              </h2>
              <p className="text-white/80 leading-relaxed max-w-sm">
                Sign in to manage verified skills, projects, and professional records — built on real work.
              </p>
            </div>
            <div className="relative space-y-3">
              {[
                { icon: CheckCircle2, text: 'Employer-verified records' },
                { icon: LockIcon, text: 'Private by default' },
                { icon: Users, text: 'Built for every role' },
              ].map(({ icon: Icon, text }) => (
                <div key={text} className="flex items-center gap-3 text-sm text-white/90">
                  <Icon className="h-4 w-4 flex-shrink-0" />
                  {text}
                </div>
              ))}
            </div>
          </div>

          {/* Login card */}
          <div className="w-full max-w-md mx-auto lg:mx-0 self-center bg-surface rounded-2xl border border-border shadow-lg p-8">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-text mb-2">Welcome back</h1>
            <p className="text-muted">Sign in to your account</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label="Email"
              type="email"
              placeholder="you@company.com"
              icon={Mail}
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
            />
            <Input
              label="Password"
              type="password"
              placeholder="Enter your password"
              icon={Lock}
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
            />

            {formError && (
              <p className="text-sm text-danger text-center">{formError}</p>
            )}

            <Button type="submit" className="w-full" loading={isLoading}>
              Sign In
              <ArrowRight className="h-4 w-4" />
            </Button>
          </form>

          <div className="mt-6 pt-6 border-t border-border">
            <p className="text-sm text-muted text-center">
              Don't have an account?{' '}
              <button
                onClick={() => navigate('/register')}
                className="text-primary font-medium hover:underline"
              >
                Register your company
              </button>
            </p>
          </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};