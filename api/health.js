import { assertConnection as assertDataConnectConnection } from '../server/config/dataconnect.js';

export default async function handler(req, res) {
  let firebase = false;
  let firebaseError = null;
  try {
    await assertDataConnectConnection();
    firebase = true;
  } catch (err) {
    firebaseError = err.message;
  }

  res.status(firebase ? 200 : 503).json({
    success: firebase,
    status: firebase ? 'healthy' : 'degraded',
    firebase,
    ...(firebaseError ? { firebaseError } : {}),
    environment: process.env.NODE_ENV || 'development',
    timestamp: new Date().toISOString()
  });
}
