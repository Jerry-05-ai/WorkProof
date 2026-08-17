// server/config/dataconnect.js
// Initializes the Firebase Admin app and the Data Connect Admin SDK.
//
// IMPORTANT: The functions imported from '@dataconnect/admin-generated'
// (getUserByEmail, createUser, etc.) call `dataConnect.executeGraphql(...)`.
// That only works with an admin-flavored DataConnect instance built from
// 'firebase-admin/data-connect'. It will NOT work with a plain
// `firebase-admin/app` App object, and it will NOT work with the
// client/browser SDK ('firebase/data-connect') -- that's what was causing
// the "No Firebase App '[DEFAULT]'" crash on login.
import { cert, initializeApp, getApps } from 'firebase-admin/app';
import { getDataConnect } from 'firebase-admin/data-connect';

// Must match dataconnect/dataconnect.yaml (serviceId/location).
const connectorConfig = {
  serviceId: 'workproof-8634e-service',
  location: 'us-east4',
};

let firebaseApp = null;
let dataConnect = null;
let isInitialized = false;

export function initDataConnect() {
  if (isInitialized) return;

  if (!getApps().length) {
    const raw = process.env.FIREBASE_SERVICE_ACCOUNT_KEY;
    if (!raw) {
      console.warn('⚠️ FIREBASE_SERVICE_ACCOUNT_KEY not set');
      isInitialized = true;
      return;
    }

    try {
      const serviceAccount = JSON.parse(raw);
      firebaseApp = initializeApp({
        credential: cert(serviceAccount),
        projectId: process.env.FIREBASE_PROJECT_ID || 'workproof-8634e',
      });
      console.log('✅ Firebase Admin SDK initialized');
    } catch (error) {
      console.error('❌ Failed to initialize Firebase Admin:', error.message);
      isInitialized = true;
      return;
    }
  } else {
    firebaseApp = getApps()[0];
  }

  try {
    // This is the piece that was missing: an actual DataConnect instance,
    // bound to the Admin app, that the generated SDK functions can call
    // `.executeGraphql(...)` / `.executeGraphqlRead(...)` on.
    dataConnect = getDataConnect(connectorConfig, firebaseApp);
    console.log('✅ Data Connect ready');
  } catch (error) {
    console.error('❌ Failed to initialize Data Connect:', error.message);
  }

  isInitialized = true;
}

// Returns the DataConnect instance that generated query/mutation functions
// expect as their first argument.
export function getDC() {
  if (!isInitialized) {
    initDataConnect();
  }
  return dataConnect;
}

export async function assertConnection() {
  const dc = getDC();
  if (!dc) return false;
  try {
    // Cheap read-only ping. FindPlatformAdmins is one of the existing
    // generated queries, so this doesn't require any extra schema/deploy work.
    const { findPlatformAdmins } = await import('@dataconnect/admin-generated');
    await findPlatformAdmins(dc);
    return true;
  } catch (error) {
    console.error('❌ Data Connect connection check failed:', error.message);
    return false;
  }
}

// Initialize on import.
initDataConnect();
