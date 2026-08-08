import React from 'react';
import { Header } from '../../components/layout/Header';
import { Sidebar } from '../../components/layout/Sidebar';
import { Navigation } from '../../components/layout/Navigation';
import { ContactMessagesPanel } from '../../components/dashboard/ContactMessagesPanel';

/**
 * Dedicated inbox page for the platform administrator. Lists messages
 * submitted from the public Contact Us page. Reuses the shared
 * ContactMessagesPanel (live-synced from the store) — no existing behavior
 * is affected.
 */
export const AdminMessages = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="flex">
        <Sidebar />
        <div className="flex-1 flex flex-col min-h-screen pb-16 lg:pb-0">
          <Header />
          <main className="flex-1 p-4 lg:p-6 space-y-6">
            <div>
              <h1 className="text-2xl font-bold text-text">Messages</h1>
              <p className="text-muted">
                Messages submitted through the Contact Us page.
              </p>
            </div>

            <ContactMessagesPanel />
          </main>
        </div>
      </div>
      <Navigation />
    </div>
  );
};
