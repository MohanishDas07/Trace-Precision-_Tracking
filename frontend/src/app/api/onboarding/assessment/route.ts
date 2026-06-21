import { NextRequest, NextResponse } from 'next/server';
import { calculateBaseline, QuizAnswers } from '@/lib/calculationEngine';

export async function POST(req: NextRequest) {
  try {
    const { email, name, answers } = await req.json() as {
      email: string;
      name: string;
      answers: QuizAnswers;
    };

    if (!email || !name || !answers) {
      return NextResponse.json(
        { error: 'Missing required fields: email, name, answers' },
        { status: 400 }
      );
    }

    // Run the calculation engine
    const baseline = calculateBaseline(answers);

    // Generate a unique userId for this session
    const userId = crypto.randomUUID();

    return NextResponse.json({
      userId,
      baseline,
    });
  } catch (err) {
    console.error('Onboarding error:', err);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
