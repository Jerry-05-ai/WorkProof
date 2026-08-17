// server/server.js
import 'dotenv/config';
import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import routes from './routes/index.js';
import { attachSession } from './middleware/auth.js';
import { initDataConnect, assertConnection } from './config/dataconnect.js';

const app = express();
const PORT = process.env.PORT || 8000;

app.use(cors({
  origin: process.env.FRONTEND_ORIGIN || 'http://localhost:3000',
  credentials: true,
}));
app.use(express.json({ limit: '2mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
// Populates req.auth from the session cookie (if present/valid) on every
// request. Without this, requireAuth/requireRole always see req.auth as
// undefined and reject with 401 even when a perfectly valid session cookie
// is sent.
app.use(attachSession);

let dataConnectReady = false;
try {
  initDataConnect();
  dataConnectReady = true;
  console.log('✅ Data Connect initialized');
} catch (error) {
  console.error('❌ Data Connect init failed:', error.message);
}

app.get('/health', async (req, res) => {
  let dataConnectOk = false;
  try {
    dataConnectOk = await assertConnection();
  } catch {}
  res.json({
    success: dataConnectOk,
    status: dataConnectOk ? 'healthy' : 'degraded',
    dataConnect: dataConnectOk,
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
  });
});

app.use(routes);

app.use((req, res) => {
  res.status(404).json({ success: false, error: 'Not found', path: req.path });
});

app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(err.status || 500).json({ success: false, error: err.message || 'Internal server error' });
});

export default app;

if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => {
    console.log(`✅ WorkProof API running on http://localhost:${PORT}`);
  });
}