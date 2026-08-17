import React from 'react';
import { ContactMessagesPanel } from '../../components/dashboard/ContactMessagesPanel';

/**
 * Dedicated inbox page for the platform administrator. Lists messages
 * submitted from the public Contact Us page. Reuses the shared
 * ContactMessagesPanel (live-synced from the store) — no existing behavior
 * is affected.
 */
export const AdminMessages = () => {
  return (
    <div className="space-y-6">
            <div>
              <h1 className="text-2xl font-bold text-text">Messages</h1>
              <p className="text-muted">
                Messages submitted through the Contact Us page.
              </p>
            </div>

            <ContactMessagesPanel />
</div>
  );
};
