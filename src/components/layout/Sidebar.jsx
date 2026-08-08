import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard, Users, Brain, Activity, User, Lock,
  Search, Bookmark, Briefcase, LogOut, ShieldCheck, Building2, Mail,
  ChevronRight,
} from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { NAV_ITEMS } from '../../utils/constants';

const iconMap = {
  LayoutDashboard, Users, Brain, Activity, User, Lock,
  Search, Bookmark, Briefcase, ShieldCheck, Building2, Mail,
};

export const Sidebar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const navItems = NAV_ITEMS[user?.role] || [];

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  return (
    <aside className="hidden lg:flex flex-col w-64 bg-surface border-r border-border h-screen sticky top-0 z-30">
      {/* Logo */}
      <div className="flex items-center gap-3 px-6 h-[72px] border-b border-border flex-shrink-0">
        <div className="w-9 h-9 bg-brand-gradient rounded-xl flex items-center justify-center shadow-primary-glow">
          <ShieldCheck className="h-5 w-5 text-white" strokeWidth={2.4} />
        </div>
        <div>
          <h1 className="text-base font-bold text-text tracking-tight leading-none">WorkProof</h1>
          <p className="text-[11px] text-muted mt-0.5">Verified Career</p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-5 space-y-1 overflow-y-auto">
        {navItems.map((item) => {
          const Icon = iconMap[item.icon];
          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `group relative flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ease-out ${
                  isActive
                    ? 'bg-primary-soft text-primary'
                    : 'text-muted hover:bg-surface-2 hover:text-text'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <span
                    className={`absolute left-0 top-1/2 -translate-y-1/2 h-5 w-1 rounded-r-full bg-primary transition-all duration-200 ${
                      isActive ? 'opacity-100 scale-y-100' : 'opacity-0 scale-y-0'
                    }`}
                  />
                  <span className={`flex items-center justify-center h-7 w-7 rounded-lg transition-all duration-200 ${
                    isActive ? 'bg-primary/10' : ''
                  }`}>
                    {Icon && <Icon className="h-[18px] w-[18px] flex-shrink-0" strokeWidth={isActive ? 2.4 : 2} />}
                  </span>
                  <span className="flex-1">{item.label}</span>
                  {isActive && (
                    <ChevronRight className="h-3.5 w-3.5 text-primary/60" />
                  )}
                </>
              )}
            </NavLink>
          );
        })}
      </nav>

      {/* User Info & Logout */}
      <div className="px-3 py-3 border-t border-border flex-shrink-0">
        <div className="flex items-center gap-3 px-3 py-2.5 mb-1 rounded-xl bg-surface-2/60">
          <div className="w-8 h-8 bg-brand-gradient rounded-full flex items-center justify-center flex-shrink-0 ring-2 ring-primary-soft">
            <span className="text-sm font-semibold text-white">
              {user?.name?.charAt(0) || 'U'}
            </span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-text truncate">{user?.name || 'User'}</p>
            <p className="text-xs text-muted truncate">{user?.company}</p>
          </div>
        </div>
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-sm font-medium text-muted hover:bg-danger-soft hover:text-danger transition-all duration-200 group"
        >
          <LogOut className="h-[18px] w-[18px] transition-transform duration-200 group-hover:-translate-x-0.5" />
          Sign out
        </button>
      </div>
    </aside>
  );
};