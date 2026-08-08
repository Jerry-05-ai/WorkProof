import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard, Users, Brain, Activity, User, Lock,
  Search, Bookmark, Briefcase, ShieldCheck, Mail, Building2,
} from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { NAV_ITEMS } from '../../utils/constants';

const iconMap = {
  LayoutDashboard, Users, Brain, Activity, User, Lock,
  Search, Bookmark, Briefcase, ShieldCheck, Mail, Building2,
};

export const Navigation = () => {
  const { user } = useAuth();
  const navItems = NAV_ITEMS[user?.role] || [];

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-surface/90 backdrop-blur-xl border-t border-border safe-area-bottom shadow-nav">
      <div className="flex items-center justify-around px-2 py-1.5">
        {navItems.map((item) => {
          const Icon = iconMap[item.icon];
          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex flex-col items-center gap-1 px-3 py-1.5 rounded-lg min-w-[56px] transition-all duration-200 ${
                  isActive ? 'text-primary' : 'text-muted hover:text-text'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <span className={`flex items-center justify-center h-7 w-10 rounded-full transition-all duration-200 ${isActive ? 'bg-primary-soft' : ''}`}>
                    {Icon && <Icon className="h-[18px] w-[18px]" strokeWidth={isActive ? 2.4 : 2} />}
                  </span>
                  <span className="text-[10px] font-medium leading-none">{item.label}</span>
                </>
              )}
            </NavLink>
          );
        })}
      </div>
    </nav>
  );
};