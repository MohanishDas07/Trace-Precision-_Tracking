import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import onboardingRoutes from './routes/onboarding';
import dashboardRoutes from './routes/dashboard';
import actionsRoutes from './routes/actions';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

// ─── Middleware ──────────────────────────────────────────────────────────────
app.use(cors({ origin: process.env.FRONTEND_URL || 'http://localhost:3000' }));
app.use(express.json());

// ─── Health check ───────────────────────────────────────────────────────────
app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// ─── Routes ─────────────────────────────────────────────────────────────────
const apiRouter = express.Router();
apiRouter.use('/onboarding', onboardingRoutes);
apiRouter.use('/dashboard', dashboardRoutes);
apiRouter.use('/actions', actionsRoutes);

// Mount on both /api (for local dev) and / (for Vercel's routePrefix stripping)
app.use('/api', apiRouter);
app.use('/', apiRouter);

// ─── Start ──────────────────────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`\n  🌱 Carbon Footprint API running at http://localhost:${PORT}`);
  console.log(`  📊 Health check: http://localhost:${PORT}/api/health\n`);
});

export default app;
