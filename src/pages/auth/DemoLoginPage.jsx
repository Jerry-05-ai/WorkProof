import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { ShieldCheck, Building2, User, Users, ArrowRight } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { Button } from '../../components/ui/Button';
import { Footer } from '../../components/layout/Footer';

const demoAccounts = [
  {
    id: 'user_admin_001',
    name: 'Sarah Ahmed',
    role: 'COMPANY_ADMIN',
    company: 'NovaTech Solutions',
    email: 'admin@novatech.demo',
    password: 'demo123',
    description: 'Manage employees, verify skills, plan growth',
    Icon: Building2,
    color: 'bg-primary',
    dashboard: '/company/dashboard',
  },
  {
    id: 'user_emp_001',
    name: 'Ayan Malik',
    role: 'EMPLOYEE',
    company: 'NovaTech Solutions',
    email: 'ayan@demo.com',
    password: 'demo123',
    description: 'Build your verified career profile',
    Icon: User,
    color: 'bg-secondary',
    dashboard: '/employee/dashboard',
  },
  {
    id: 'user_rec_001',
    name: 'Hamza Khan',
    role: 'RECRUITER',
    company: 'BrightHire Technologies',
    email: 'recruiter@brighthire.demo',
    password: 'demo123',
    description: 'Discover proven talent',
    Icon: Users,
    color: 'bg-accent',
    dashboard: '/recruiter/dashboard',
  },
];

export const DemoLoginPage = () => {
  const navigate = useNavigate();
  const { login, isLoading } = useAuth();

  const handleLogin = async (email, password, dashboard) => {
    try {
      await login(email, password);
      toast.success('Logged in successfully!');
      navigate(dashboard);
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Navbar */}
      <nav className="sticky top-0 z-50 bg-surface/80 backdrop-blur-lg border-b border-border">
        <div className="max-w-7xl mx-auto px-4 lg:px-8 py-4 flex items-center justify-between">
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

      {/* Content */}
      <section className="max-w-5xl mx-auto px-4 lg:px-8 py-16 lg:py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-3xl lg:text-4xl font-bold text-text mb-4">
            Explore WorkProof Demo
          </h1>
          <p className="text-muted text-lg max-w-xl mx-auto">
            Choose a demo account to experience WorkProof from different perspectives.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {demoAccounts.map((account, index) => {
            const IconComponent = account.Icon;
            return (
              <motion.div
                key={account.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-surface rounded-xl border border-border shadow-sm overflow-hidden border border-border"
              >
                {/* Header */}
                <div className={`${account.color} p-6 text-white`}>
                  <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mb-4">
                    <IconComponent className="h-6 w-6" />
                  </div>
                  <h3 className="text-lg font-semibold mb-1">{account.company}</h3>
                  <p className="text-white/80 text-sm">{account.name}</p>
                </div>

                {/* Body */}
                <div className="p-6">
                  <p className="text-sm text-muted mb-6">{account.description}</p>

                  <div className="space-y-2 mb-6">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted">Email</span>
                      <span className="text-text font-medium">{account.email}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted">Password</span>
                      <span className="text-text font-medium">{account.password}</span>
                    </div>
                  </div>

                  <Button
                    variant={
                      account.role === 'COMPANY_ADMIN'
                        ? 'primary'
                        : account.role === 'EMPLOYEE'
                        ? 'secondary'
                        : 'accent'
                    }
                    className="w-full"
                    loading={isLoading}
                    onClick={() =>
                      handleLogin(account.email, account.password, account.dashboard)
                    }
                  >
                    Login as {account.name.split(' ')[0]}
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      <Footer />
    </div>
  );
};