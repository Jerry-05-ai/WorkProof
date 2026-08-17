// src/services/firebase.js
// Frontend Firebase client - only for auth, NOT Data Connect
import { initializeApp, getApps } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || 'AIzaSyC5ZRiSbfAlhYMOKnuDkUoNS6b6-BgMdPM',
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || 'workproof-8634e.firebaseapp.com',
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || 'workproof-8634e',
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || 'workproof-8634e.firebasestorage.app',
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || '65646630207',
  appId: import.meta.env.VITE_FIREBASE_APP_ID || '1:65646630207:web:559e9c008d52d3c46daf8a',
};

// Initialize Firebase only once
let app;
let auth;

try {
  if (!getApps().length) {
    app = initializeApp(firebaseConfig);
    console.log('✅ Firebase Client SDK initialized');
  } else {
    app = getApps()[0];
    console.log('✅ Using existing Firebase instance');
  }
  auth = getAuth(app);
} catch (error) {
  console.error('❌ Firebase init error:', error.message);
  app = null;
  auth = null;
}

export { app, auth };