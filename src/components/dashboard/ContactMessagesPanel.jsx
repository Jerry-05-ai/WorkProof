import React, { useEffect } from 'react';
import { Mail, MailOpen, Inbox } from 'lucide-react';
import { useApp } from '../../store/context';

const formatDate = (iso) => {
  try {
    return new Date(iso).toLocaleString(undefined, {
      dateStyle: 'medium',
      timeStyle: 'short',
    });
  } catch {
    return iso;
  }
};

/**
 * Contact Us inbox for the platform administrator. Reads messages submitted
 * from the public Contact page (stored in the app store) and lets the admin
 * mark them as read. Purely additive — no existing behavior is affected.
 */
export const ContactMessagesPanel = () => {
  const { state, dispatch } = useApp();
  const messages = Array.isArray(state.contactMessages) ? state.contactMessages : [];
  const unread = messages.filter((m) => m.status === 'UNREAD').length;

  // When the admin opens the dashboard, pull the latest persisted messages so
  // anything submitted from the Contact page (e.g. in another tab) is shown.
  useEffect(() => {
    try {
      const stored = localStorage.getItem('workproof_state');
      if (!stored) return;
      const parsed = JSON.parse(stored);
      if (Array.isArray(parsed.contactMessages)) {
        dispatch({ type: 'SYNC_CONTACT_MESSAGES', payload: parsed.contactMessages });
      }
    } catch {
      // Ignore — fall back to in-memory state.
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const markRead = (id) => dispatch({ type: 'MARK_CONTACT_READ', payload: id });

  return (
    <div className="bg-surface rounded-xl border border-border shadow-sm overflow-hidden">
      <div className="p-6 border-b border-border flex items-center justify-between">
        <div className="flex items-center gap-3">
          <h2 className="text-lg font-semibold text-text">Contact Messages</h2>
          {unread > 0 && (
            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold bg-primary-soft text-primary">
              {unread} unread
            </span>
          )}
        </div>
        <span className="text-sm text-muted">{messages.length} total</span>
      </div>

      {messages.length === 0 ? (
        <div className="px-6 py-14 text-center">
          <div className="w-12 h-12 rounded-xl bg-surface-2 flex items-center justify-center mx-auto mb-4">
            <Inbox className="w-6 h-6 text-muted" />
          </div>
          <p className="text-sm text-muted">
            No messages yet. Submissions from the Contact page will appear here.
          </p>
        </div>
      ) : (
        <ul className="divide-y divide-border">
          {messages.map((msg) => {
            const isUnread = msg.status === 'UNREAD';
            return (
              <li
                key={msg.id}
                className={`px-6 py-5 transition-colors ${
                  isUnread ? 'bg-primary-soft/40' : 'hover:bg-surface-2/50'
                }`}
              >
                <div className="flex items-start gap-4">
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${
                      isUnread ? 'bg-primary text-white' : 'bg-surface-2 text-muted'
                    }`}
                  >
                    {isUnread ? (
                      <Mail className="w-5 h-5" />
                    ) : (
                      <MailOpen className="w-5 h-5" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <p className="font-semibold text-text truncate">{msg.subject}</p>
                      {isUnread && (
                        <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wide bg-primary text-white">
                          New
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-muted mb-2">
                      From <span className="font-medium text-text-secondary">{msg.name}</span>
                      {' • '}
                      {formatDate(msg.date)}
                    </p>
                    <p className="text-sm text-text-secondary leading-relaxed whitespace-pre-wrap break-words">
                      {msg.message}
                    </p>
                  </div>
                  {isUnread && (
                    <button
                      onClick={() => markRead(msg.id)}
                      className="flex-shrink-0 text-xs font-medium text-primary hover:text-primary-hover px-3 py-1.5 rounded-lg hover:bg-primary-soft transition-colors"
                    >
                      Mark read
                    </button>
                  )}
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};
