import React, { createContext, useContext, useReducer, useEffect, useRef } from 'react';
import { appReducer, initialState } from './reducer';

const AppContext = createContext();
const STORAGE_KEY = 'workproof_state';

const loadState = () => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return initialState;
    const parsed = JSON.parse(stored);
    // Heal older persisted state that predates newer fields, so the app never
    // crashes on stale localStorage. Ensures contactMessages is always an array.
    return {
      ...initialState,
      ...parsed,
      contactMessages: Array.isArray(parsed.contactMessages)
        ? parsed.contactMessages
        : [],
    };
  } catch {
    return initialState;
  }
};

const saveState = (state) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    // Ignore
  }
};

// Read only the persisted contact messages from storage (used for live sync).
const readPersistedContactMessages = () => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return null;
    const parsed = JSON.parse(stored);
    return Array.isArray(parsed.contactMessages) ? parsed.contactMessages : null;
  } catch {
    return null;
  }
};

export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, loadState());

  // Keep a ref to the current contactMessages so listeners can compare without
  // re-subscribing on every state change.
  const contactRef = useRef(state.contactMessages);
  useEffect(() => {
    contactRef.current = state.contactMessages;
  }, [state.contactMessages]);

  useEffect(() => {
    saveState(state);
  }, [state]);

  // Live-sync the contact inbox so a message submitted from the Contact page
  // (potentially in another tab or session) shows up for the platform admin
  // without a manual reload. Purely additive — only contactMessages is synced.
  useEffect(() => {
    const syncFromStorage = () => {
      const persisted = readPersistedContactMessages();
      if (!persisted) return;
      const current = contactRef.current || [];
      // Only dispatch when something actually changed, to avoid render loops.
      if (
        persisted.length !== current.length ||
        JSON.stringify(persisted) !== JSON.stringify(current)
      ) {
        dispatch({ type: 'SYNC_CONTACT_MESSAGES', payload: persisted });
      }
    };

    // Fires in OTHER tabs when localStorage changes.
    const onStorage = (e) => {
      if (e.key === STORAGE_KEY) syncFromStorage();
    };
    // Fires when the user returns to this tab (covers same-tab navigation).
    const onFocus = () => syncFromStorage();
    const onVisibility = () => {
      if (document.visibilityState === 'visible') syncFromStorage();
    };

    window.addEventListener('storage', onStorage);
    window.addEventListener('focus', onFocus);
    document.addEventListener('visibilitychange', onVisibility);
    return () => {
      window.removeEventListener('storage', onStorage);
      window.removeEventListener('focus', onFocus);
      document.removeEventListener('visibilitychange', onVisibility);
    };
  }, []);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
};
