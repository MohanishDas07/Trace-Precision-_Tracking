import { Router, Request, Response } from 'express';
import prisma from '../lib/prisma';
import { calculateBaseline, QuizAnswers } from '../engine/calculationEngine';
import { getRecommendations } from '../engine/actionEngine';

const router = Router();

/**
 * POST /api/onboarding/assessment
 * 
 * Accepts quiz answers, calculates the baseline carbon footprint,
 * creates a user, stores footprint logs, and returns the result.
 */
router.post('/assessment', async (req: Request, res: Response) => {
  try {
    const { email, name, answers } = req.body as {
      email: string;
      name: string;
      answers: QuizAnswers;
    };

    if (!email || !name || !answers) {
      return res.status(400).json({ error: 'Missing required fields: email, name, answers' });
    }

    // 1. Run the calculation engine
    const result = calculateBaseline(answers);

    // 2. Create or update the user
    const user = await prisma.user.upsert({
      where: { email },
      update: {
        name,
        baselineCo2e: result.totalCo2e,
        currentCo2e: result.totalCo2e,
      },
      create: {
        email,
        name,
        baselineCo2e: result.totalCo2e,
        currentCo2e: result.totalCo2e,
      },
    });

    // 3. Clear previous logs for this user (re-assessment scenario)
    await prisma.footprintLog.deleteMany({ where: { userId: user.id } });

    // 4. Create footprint log entries for each category
    const logEntries = result.breakdowns.map(b => ({
      userId: user.id,
      category: b.category as 'HOUSING' | 'TRANSPORT' | 'DIET' | 'CONSUMPTION',
      scoreCo2e: b.scoreCo2e,
      sourceData: JSON.stringify({ answer: (answers as unknown as Record<string, string>)[b.category.toLowerCase()] ?? 'unknown' }),
    }));

    await prisma.footprintLog.createMany({ data: logEntries });

    // 5. Return baseline results + userId
    return res.json({
      userId: user.id,
      baseline: result,
    });
  } catch (err) {
    console.error('Onboarding error:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
