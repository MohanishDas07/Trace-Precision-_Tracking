import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get('userId');

    if (!userId) {
      return NextResponse.json(
        { error: 'Missing userId parameter' },
        { status: 400 }
      );
    }

    // Since we don't have a persistent DB on Vercel, the dashboard
    // will read baseline data from localStorage on the client side.
    // This API route returns a placeholder that signals the client
    // to use its locally stored data.
    return NextResponse.json({
      message: 'Use client-side stored data',
      userId,
    });
  } catch (err) {
    console.error('Dashboard error:', err);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
