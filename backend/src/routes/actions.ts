import { Router, Request, Response } from 'express';
import prisma from '../lib/prisma';
import { getRecommendations } from '../engine/actionEngine';

const router = Router();

/**
 * GET /api/actions/recommendations?userId=<id>
 * 
 * Analyses the user's footprint breakdowns and returns 5 personalized
 * action recommendations ranked by impact and ease.
 */
router.get('/recommendations', async (req: Request, res: Response) => {
  try {
    const userId = req.query.userId as string;
    if (!userId) {
      return res.status(400).json({ error: 'Missing userId query parameter' });
    }

    // Get user's footprint breakdown
    const logs = await prisma.footprintLog.findMany({
      where: { userId },
      orderBy: { scoreCo2e: 'desc' },
    });

    if (logs.length === 0) {
      return res.status(404).json({ error: 'No footprint data found. Complete onboarding first.' });
    }

    // Get existing active/completed actions to avoid duplicates
    const existingActions = await prisma.userAction.findMany({
      where: { userId, status: { in: ['ACTIVE', 'COMPLETED'] } },
      select: { actionId: true },
    });
    const existingIds = existingActions.map(a => a.actionId);

    const breakdowns = logs.map(l => ({
      category: l.category,
      scoreCo2e: l.scoreCo2e,
    }));

    const recommendations = getRecommendations(breakdowns, existingIds, 5);

    // Match recommendations to DB actions for their IDs
    const dbActions = await prisma.action.findMany();
    const withIds = recommendations.map(rec => {
      const match = dbActions.find(a => a.title === rec.title);
      return {
        id: match?.id ?? null,
        title: rec.title,
        description: rec.description,
        category: rec.category,
        impactCo2eEstimate: rec.impactCo2eEstimate,
        difficulty: rec.difficulty,
      };
    });

    return res.json({ recommendations: withIds });
  } catch (err) {
    console.error('Recommendations error:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

/**
 * POST /api/actions/:actionId/start
 * Body: { userId }
 * 
 * Starts an action for the user.
 */
router.post('/:actionId/start', async (req: Request, res: Response) => {
  try {
    const actionId = req.params.actionId as string;
    const { userId } = req.body as { userId: string };

    if (!userId) {
      return res.status(400).json({ error: 'Missing userId in body' });
    }

    const userAction = await prisma.userAction.upsert({
      where: { userId_actionId: { userId, actionId } },
      update: { status: 'ACTIVE', startedAt: new Date() },
      create: { userId, actionId, status: 'ACTIVE' },
    });

    return res.json({ userAction });
  } catch (err) {
    console.error('Start action error:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

/**
 * POST /api/actions/:actionId/complete
 * Body: { userId }
 * 
 * Marks an action as completed, calculates actual savings,
 * and deducts from the user's current CO₂e.
 */
router.post('/:actionId/complete', async (req: Request, res: Response) => {
  try {
    const actionId = req.params.actionId as string;
    const { userId } = req.body as { userId: string };

    if (!userId) {
      return res.status(400).json({ error: 'Missing userId in body' });
    }

    // Get the action's estimated impact
    const action = await prisma.action.findUnique({ where: { id: actionId } });
    if (!action) {
      return res.status(404).json({ error: 'Action not found' });
    }

    const savings = action.impactCo2eEstimate;

    // Mark completed and record savings
    const userAction = await prisma.userAction.update({
      where: { userId_actionId: { userId, actionId } },
      data: {
        status: 'COMPLETED',
        completedAt: new Date(),
        actualSavingsCo2e: savings,
      },
    });

    // Deduct savings from user's current footprint
    await prisma.user.update({
      where: { id: userId },
      data: { currentCo2e: { decrement: savings } },
    });

    return res.json({
      userAction,
      message: `Saved ${savings} kg CO₂e! Your footprint has been updated.`,
    });
  } catch (err) {
    console.error('Complete action error:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
