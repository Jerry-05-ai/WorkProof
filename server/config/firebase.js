import { initializeApp } from 'firebase/app';
import { getDataConnect } from '@firebase/data-connect';

let dataConnect = null;

export function initializeFirebase() {
  try {
    const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY);
    const app = initializeApp(serviceAccount);
    dataConnect = getDataConnect(app);
    console.log('✅ Firebase Data Connect initialized successfully');
    return dataConnect;
  } catch (error) {
    console.error('❌ Firebase initialization failed:', error.message);
    return null;
  }
}

export function getDataConnectInstance() {
  if (!dataConnect) {
    throw new Error('Firebase Data Connect not initialized. Call initializeFirebase() first.');
  }
  return dataConnect;
}