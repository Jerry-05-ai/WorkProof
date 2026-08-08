import React, { useState, useRef, useEffect } from 'react';
import { Bell, Search, Menu, Command } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { getGreeting } from '../../utils/helpers';
import { useApp } from '../../store/context';
import { NotificationDropdown } from '../notifications/NotificationDropdown';

export const Header = ({ onMenuToggle }) => {
  const { user } = useAuth();
  const { state } = useApp();
  const { notifications } = state;
  const unreadCount = notifications.filter((n) => !n.read).length;

  const [notifOpen, setNotifOpen] = useState(false);
  const notifRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (notifRef.current && !notifRef.current.contains(e.target)) {
        setNotifOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="sticky top-0 z-30 bg-surface/85 backdrop-blur-xl border-b border-border">
      <div className="flex items-center justify-between px-4 lg:px-6 h-[72px]">
        {/* Left: Greeting + Mobile Menu */}
        <div className="flex items-center gap-3 min-w-0">
          <button
            onClick={onMenuToggle}
            aria-label="Open menu"
            className="lg:hidden p-2 -ml-1 rounded-lg hover:bg-surface-2 text-muted hover:text-text transition-colors"
          >
            <Menu className="h-5 w-5" />
          </button>
          <div className="min-w-0">
            <h1 className="text-lg font-bold text-text tracking-tight truncate">
              {getGreeting()}, {user?.name?.split(' ')[0] || 'User'}
            </h1>
            {user?.company && <p className="text-sm text-muted truncate flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-success inline-block" />
              {user.company}
            </p>}
          </div>
        </div>

        {/* Right: Search + Notifications + Avatar */}
        <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
          {/* Search (Desktop) */}
          <div className="hidden lg:flex items-center gap-2.5 bg-surface-2 rounded-xl px-3.5 py-2 border border-border/60 transition-all duration-200 focus-within:bg-surface focus-within:border-primary focus-within:ring-4 focus-within:ring-primary/10 focus-within:shadow-sm group">
            <Search className="h-4 w-4 text-muted group-focus-within:text-primary transition-colors" />
            <input
              type="text"
              placeholder="Search…"
              className="bg-transparent border-none outline-none text-sm text-text placeholder-muted w-44"
            />
            <kbd className="hidden xl:inline-flex items-center gap-0.5 text-[10px] font-semibold text-muted bg-surface border border-border rounded px-1.5 py-0.5">
              <Command className="h-2.5 w-2.5" />K
            </kbd>
          </div>

          {/* Notifications */}
          <div className="relative" ref={notifRef}>
            <button
              onClick={() => setNotifOpen(!notifOpen)}
              className="relative p-2.5 rounded-lg hover:bg-surface-2 text-muted hover:text-text transition-colors"
              aria-label="Notifications"
            >
              <Bell className="h-5 w-5" />
              {unreadCount > 0 && (
                <span className="notification-dot" />
              )}
              {unreadCount > 0 && (
                <span className="absolute top-0.5 right-0.5 min-w-[18px] h-[18px] bg-danger ring-2 ring-surface rounded-full text-white text-[10px] font-bold flex items-center justify-center px-1">
                  {unreadCount > 9 ? '9+' : unreadCount}
                </span>
              )}
            </button>
            <NotificationDropdown isOpen={notifOpen} onClose={() => setNotifOpen(false)} />
          </div>

          {/* Avatar */}
          <div className="relative">
            <div className="w-9 h-9 bg-brand-gradient rounded-full flex items-center justify-center shadow-sm ring-2 ring-primary-soft transition-transform duration-200 hover:scale-105 cursor-pointer">
              <span className="text-sm font-semibold text-white">
                {user?.name?.charAt(0) || 'U'}
              </span>
            </div>
            <span className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-success border-2 border-surface rounded-full" />
          </div>
        </div>
      </div>
    </header>
  );
};