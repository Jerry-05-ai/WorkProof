import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ShieldCheck } from 'lucide-react';

const SECTIONS = [
  {
    heading: 'Product',
    links: [
      { label: 'Home', target: 'home' },
      { label: 'About', target: 'about' },
      { label: 'Features', target: 'features' },
      { label: 'Pricing', to: '/pricing' },
    ],
  },
  {
    heading: 'Company',
    links: [
      { label: 'Contact Us', to: '/contact' },
      { label: 'Login', to: '/login' },
      { label: 'Register', to: '/register' },
    ],
  },
];

export const Footer = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handle = (link) => {
    if (link.to) { navigate(link.to); return; }
    if (location.pathname !== '/') { navigate('/', { state: { scrollTo: link.target } }); return; }
    const el = document.getElementById(link.target);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    else window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-surface border-t border-border">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10 py-16 lg:py-20">
        <div className="grid gap-12 md:grid-cols-4">
          {/* Brand */}
          <div className="md:col-span-2 max-w-sm">
            <div className="flex items-center gap-2.5 mb-5">
              <div className="w-10 h-10 bg-brand-gradient rounded-2xl flex items-center justify-center shadow-primary-glow">
                <ShieldCheck className="h-5 w-5 text-white" strokeWidth={2.4} />
              </div>
              <span className="text-xl font-bold text-text tracking-tight">WorkProof</span>
            </div>
            <p className="text-sm text-muted leading-relaxed max-w-xs">
              Verified professional records built on real work, verified skills,
              and career history — controlled by the people they belong to.
            </p>
          </div>

          {/* Link columns */}
          {SECTIONS.map((section) => (
            <div key={section.heading}>
              <h4 className="text-xs font-bold text-muted uppercase tracking-[0.12em] mb-4">
                {section.heading}
              </h4>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <button
                      onClick={() => handle(link)}
                      className="text-sm text-text-secondary hover:text-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30 rounded-md"
                    >
                      {link.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-14 pt-7 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-sm text-muted">
            &copy; {new Date().getFullYear()} WorkProof. Verified career reputation.
          </p>
          <p className="text-xs text-muted">Private by default. You control what's shared.</p>
        </div>
      </div>
    </footer>
  );
};