// server/server.js
// WorkProof Express.js backend with Firebase Data Connect

import 'dotenv/config';
import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import { initializeApp } from 'firebase/app';
import { getDataConnect } from '@firebase/data-connect';
import routes from './routes/index.js';

const app = express();
const PORT = process.env.PORT || 8000;

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_ORIGIN || 'http://localhost:5173',
  credentials: true,
}));
app.use(express.json({ limit: '2mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Initialize Firebase Data Connect
let dataConnect = null;
try {
  const rawKey = process.env.FIREBASE_SERVICE_ACCOUNT_KEY || "{}";
  const cleanedKey = rawKey.replace(/\\n/g, "\n");
  const serviceAccount = JSON.parse(cleanedKey);
  const firebaseApp = initializeApp(serviceAccount);
  dataConnect = getDataConnect(firebaseApp);
  console.log('✅ Firebase Data Connect initialized successfully');
} catch (error) {
  console.error('❌ Failed to initialize Firebase:', error.message);
}

// Make dataConnect available to routes
app.set('dataConnect', dataConnect);

// Health check
app.get('/health', (req, res) => {
  res.json({
    success: true,
    status: 'healthy',
    firebase: !!dataConnect,
    environment: process.env.NODE_ENV || 'development',
    timestamp: new Date().toISOString()
  });
});

app.get('/', (req, res) => {
  res.json({
    success: true,
    service: 'workproof-api',
    version: '1.0.0',
    status: 'running',
    firebase: !!dataConnect
  });
});

// API routes
app.use('/api', routes);

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: 'Not found',
    path: req.path
  });
});

// Error handler
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(err.status || 500).json({
    success: false,
    error: err.message || 'Internal server error'
  });
});

// Export for Vercel serverless
export default app;

// Only start server locally (not on Vercel)
if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => {
    console.log(`✅ WorkProof API running on http://localhost:${PORT}`);
    console.log(`✅ Firebase Data Connect: ${!!dataConnect ? 'Connected' : 'Not connected'}`);
  });
}
