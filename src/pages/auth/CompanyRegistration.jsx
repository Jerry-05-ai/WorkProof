import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Building2, Mail, Globe, MapPin, User, Lock, ArrowRight, ShieldCheck } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Footer } from '../../components/layout/Footer';
import { companyService } from '../../services/auth';
import toast from 'react-hot-toast';

export const CompanyRegistration = () => {
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    companyName: '',
    companyEmail: '',
    website: '',
    industry: '',
    country: '',
    city: '',
    companySize: '',
    description: '',
    adminName: '',
    adminEmail: '',
    password: '',
    confirmPassword: '',
  });

  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setServerError('');
    
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
      const result = await companyService.register({
        company_name: formData.companyName,
        company_email: formData.companyEmail,
        website: formData.website,
        industry: formData.industry,
        country: formData.country,
        city: formData.city,
        size: formData.companySize,
        description: formData.description,
        admin_name: formData.adminName,
        admin_email: formData.adminEmail,
        password: formData.password,
      });

      if (result.success) {
        toast.success('Registration submitted successfully! Awaiting platform approval.');
        navigate('/login');
      }
    } catch (err) {
      const message = err.message || 'Registration failed. Please try again.';
      setServerError(message);
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
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
        <div className="w-full max-w-3xl bg-surface rounded-2xl border border-border shadow-lg p-8">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-text mb-2">Register Your Company</h1>
            <p className="text-muted">Create a company account to start verifying professional work</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Company Info */}
            <div className="space-y-4">
              <h2 className="text-lg font-semibold text-text border-b pb-2">Company Information</h2>
              <div className="grid md:grid-cols-2 gap-4">
                <Input label="Company Name" name="companyName" required icon={Building2} value={formData.companyName} onChange={handleChange} />
                <Input label="Official Company Email" name="companyEmail" type="email" required icon={Mail} value={formData.companyEmail} onChange={handleChange} />
                <Input label="Website" name="website" type="url" required icon={Globe} value={formData.website} onChange={handleChange} />
                <Input label="Industry" name="industry" required icon={Building2} value={formData.industry} onChange={handleChange} />
                <Input label="Country" name="country" required icon={MapPin} value={formData.country} onChange={handleChange} />
                <Input label="City" name="city" required icon={MapPin} value={formData.city} onChange={handleChange} />
                
                <div className="space-y-1">
                  <label className="block text-sm font-medium text-text">Company Size</label>
                  <select 
                    name="companySize" 
                    required 
                    value={formData.companySize} 
                    onChange={handleChange}
                    className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:ring-4 focus:ring-primary/12 focus:border-primary text-text"
                  >
                    <option value="">Select size...</option>
                    <option value="1-10">1-10 employees</option>
                    <option value="11-50">11-50 employees</option>
                    <option value="51-200">51-200 employees</option>
                    <option value="201-500">201-500 employees</option>
                    <option value="500+">500+ employees</option>
                  </select>
                </div>
              </div>
              <div className="space-y-1 mt-4">
                <label className="block text-sm font-medium text-text">Company Description</label>
                <textarea
                  name="description"
                  required
                  value={formData.description}
                  onChange={handleChange}
                  rows={3}
                  className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:ring-4 focus:ring-primary/12 focus:border-primary text-text resize-none"
                  placeholder="Briefly describe what your company does..."
                />
              </div>
            </div>

            {/* Admin Info */}
            <div className="space-y-4">
              <h2 className="text-lg font-semibold text-text border-b pb-2">Administrator Details</h2>
              <div className="grid md:grid-cols-2 gap-4">
                <Input label="Full Name" name="adminName" required icon={User} value={formData.adminName} onChange={handleChange} />
                <Input label="Admin Email" name="adminEmail" type="email" required icon={Mail} value={formData.adminEmail} onChange={handleChange} />
                <Input label="Password" name="password" type="password" required icon={Lock} value={formData.password} onChange={handleChange} />
                <Input label="Confirm Password" name="confirmPassword" type="password" required icon={Lock} value={formData.confirmPassword} onChange={handleChange} />
              </div>
            </div>

            {serverError && (
              <div className="bg-danger/10 border border-danger/20 rounded-lg p-3 text-sm text-danger text-center">
                {serverError}
              </div>
            )}

            <Button type="submit" className="w-full py-3" loading={loading}>
              Submit Registration
              <ArrowRight className="h-5 w-5 ml-2" />
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