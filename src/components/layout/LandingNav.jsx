import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ShieldCheck, ArrowRight, Menu, X } from 'lucide-react';
import { Button } from '../ui/Button';

const NAV_LINKS = [
  { label: 'Home', target: 'home' },
  { label: 'About', target: 'about' },
  { label: 'Features', target: 'features' },
  { label: 'Pricing', to: '/pricing' },
  { label: 'Contact Us', to: '/contact' },
];

export const LandingNav = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const goToSection = (target) => {
    setMobileOpen(false);
    if (location.pathname !== '/') {
      navigate('/', { state: { scrollTo: target } });
      return;
    }
    const el = document.getElementById(target);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    else if (target === 'home') window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLink = (link) => {
    if (link.to) { setMobileOpen(false); navigate(link.to); }
    else { goToSection(link.target); }
  };

  const isActive = (link) => link.to && location.pathname === link.to;

  return (
    <nav className="sticky top-3 z-50 px-3 transition-all duration-300 sm:px-5 lg:px-8">
      <div className={`mx-auto max-w-7xl rounded-2xl border transition-all duration-300 ${
        scrolled
          ? 'border-border bg-surface/90 shadow-lg shadow-slate-950/10 backdrop-blur-2xl dark:border-white/10 dark:bg-slate-900/90'
          : 'border-border/70 bg-surface/75 shadow-sm backdrop-blur-xl dark:border-white/10 dark:bg-slate-900/70'
      }`}>
      <div className="h-[4.25rem] px-4 sm:px-5 lg:px-6 flex items-center justify-between">
        {/* Brand */}
        <button
          onClick={() => goToSection('home')}
          className="flex items-center gap-2.5 rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
          aria-label="WorkProof home"
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-gradient shadow-primary-glow">
            <ShieldCheck className="h-5 w-5 text-white" strokeWidth={2.4} />
          </div>
          <span className="text-lg font-bold tracking-tight text-text dark:text-white">WorkProof</span>
        </button>

        {/* Desktop links */}
        <div className="hidden items-center gap-1 md:flex">
          {NAV_LINKS.map((link) => (
            <button
              key={link.label}
              onClick={() => handleLink(link)}
              className={`rounded-lg px-3.5 py-2 text-sm font-semibold transition-colors ${
                isActive(link)
                  ? 'bg-primary-soft text-primary dark:bg-indigo-400/10 dark:text-indigo-200'
                  : 'text-text-secondary hover:bg-surface-2 hover:text-primary dark:text-slate-300 dark:hover:bg-white/5 dark:hover:text-white'
              }`}
            >
              {link.label}
            </button>
          ))}
        </div>

        {/* Desktop auth actions */}
        <div className="hidden items-center gap-2 md:flex">
          <button
            onClick={() => navigate('/login')}
            className="rounded-lg px-3 py-2 text-sm font-semibold text-text-secondary transition-colors hover:bg-surface-2 hover:text-primary dark:text-slate-300 dark:hover:bg-white/5 dark:hover:text-white"
          >
            Login
          </button>
          <Button onClick={() => navigate('/register')} size="sm" className="rounded-xl px-4">
            Register
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setMobileOpen((v) => !v)}
          className="rounded-lg p-2 text-muted transition-colors hover:bg-surface-2 hover:text-text md:hidden dark:text-slate-300 dark:hover:bg-white/5 dark:hover:text-white"
          aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="animate-fade-in border-t border-border bg-surface shadow-lg md:hidden dark:border-white/10 dark:bg-slate-900">
          <div className="px-4 py-4 space-y-1">
            {NAV_LINKS.map((link) => (
              <button
                key={link.label}
                onClick={() => handleLink(link)}
                className={`w-full rounded-lg px-3.5 py-3 text-left text-sm font-semibold transition-colors ${
                  isActive(link)
                    ? 'bg-primary-soft text-primary dark:bg-indigo-400/10 dark:text-indigo-200'
                    : 'text-text-secondary hover:bg-surface-2 hover:text-primary dark:text-slate-300 dark:hover:bg-white/5 dark:hover:text-white'
                }`}
              >
                {link.label}
              </button>
            ))}
            <div className="mt-2 grid grid-cols-2 gap-2 border-t border-border pt-3 dark:border-white/10">
              <Button variant="outline" className="dark:border-white/15 dark:bg-white/5 dark:text-white" onClick={() => { setMobileOpen(false); navigate('/login'); }}>
                Login
              </Button>
              <Button className="rounded-xl" onClick={() => { setMobileOpen(false); navigate('/register'); }}>
                Register
              </Button>
            </div>
          </div>
        </div>
      )}
      </div>
    </nav>
  );
};