import { Router, Request, Response } from 'express';
import prisma from '../lib/prisma';

const router = Router();

/**
 * GET /api/dashboard/summary?userId=<id>
 * 
 * Returns the user's current CO₂e, baseline, category breakdowns,
 * active actions count, and real-world equivalents.
 */
router.get('/summary', async (req: Request, res: Response) => {
  try {
    const userId = req.query.userId as string;
    if (!userId) {
      return res.status(400).json({ error: 'Missing userId query parameter' });
    }

    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        footprintLogs: { orderBy: { scoreCo2e: 'desc' } },
        userActions: {
          where: { status: 'ACTIVE' },
          include: { action: true },
        },
      },
    });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const totalCo2e = user.currentCo2e;
    const breakdowns = user.footprintLogs.map(log => ({
      category: log.category,
      scoreCo2e: log.scoreCo2e,
      percentage: Math.round((log.scoreCo2e / user.baselineCo2e) * 100),
    }));

    const totalSaved = user.baselineCo2e - user.currentCo2e;
    const treesEquiv = Math.round(totalCo2e / 21);

    // Streak: count of completed actions
    const completedCount = await prisma.userAction.count({
      where: { userId, status: 'COMPLETED' },
    });

    return res.json({
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
      currentCo2e: totalCo2e,
      baselineCo2e: user.baselineCo2e,
      totalSaved,
      treesEquiv,
      breakdowns,
      activeActions: user.userActions.map(ua => ({
        id: ua.id,
        actionId: ua.actionId,
        title: ua.action.title,
        category: ua.action.category,
        startedAt: ua.startedAt,
      })),
      streak: completedCount,
    });
  } catch (err) {
    console.error('Dashboard error:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
