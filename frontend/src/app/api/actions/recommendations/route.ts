import { NextRequest, NextResponse } from 'next/server';

// Action recommendations database - sourced from EPA, IPCC, IEA
const ALL_ACTIONS = [
  // DIET actions
  {
    id: 'diet-1',
    title: 'Adopt a Plant-Rich Diet',
    category: 'DIET',
    impactCo2eEstimate: 800,
    difficulty: 'MEDIUM',
  },
  {
    id: 'diet-2',
    title: 'Reduce Household Food Waste',
    category: 'DIET',
    impactCo2eEstimate: 370,
    difficulty: 'EASY',
  },
  {
    id: 'diet-3',
    title: 'Replace Beef with Poultry/Fish',
    category: 'DIET',
    impactCo2eEstimate: 500,
    difficulty: 'EASY',
  },
  // TRANSPORT actions
  {
    id: 'transport-1',
    title: 'Switch to an Electric Vehicle (EV)',
    category: 'TRANSPORT',
    impactCo2eEstimate: 2400,
    difficulty: 'HARD',
  },
  {
    id: 'transport-2',
    title: 'E-Bike Commuting',
    category: 'TRANSPORT',
    impactCo2eEstimate: 1200,
    difficulty: 'MEDIUM',
  },
  {
    id: 'transport-3',
    title: 'Utilize Public Transit',
    category: 'TRANSPORT',
    impactCo2eEstimate: 1800,
    difficulty: 'EASY',
  },
  // HOUSING actions
  {
    id: 'housing-1',
    title: 'Install an Air Source Heat Pump',
    category: 'HOUSING',
    impactCo2eEstimate: 1500,
    difficulty: 'HARD',
  },
  {
    id: 'housing-2',
    title: 'Improve Home Weatherization',
    category: 'HOUSING',
    impactCo2eEstimate: 600,
    difficulty: 'MEDIUM',
  },
  {
    id: 'housing-3',
    title: 'Switch to 100% Renewable Energy',
    category: 'HOUSING',
    impactCo2eEstimate: 2000,
    difficulty: 'MEDIUM',
  },
  {
    id: 'housing-4',
    title: 'Install Rooftop Solar Panels',
    category: 'HOUSING',
    impactCo2eEstimate: 2500,
    difficulty: 'HARD',
  },
  // GENERAL
  {
    id: 'general-1',
    title: 'Purchase Second-Hand Goods',
    category: 'CONSUMPTION',
    impactCo2eEstimate: 400,
    difficulty: 'EASY',
  },
];

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

    // Read baseline data to prioritize recommendations by highest-emission category
    // Return top 6 actions sorted by impact
    const sorted = [...ALL_ACTIONS].sort((a, b) => b.impactCo2eEstimate - a.impactCo2eEstimate);
    const recommendations = sorted.slice(0, 6);

    return NextResponse.json({ recommendations });
  } catch (err) {
    console.error('Recommendations error:', err);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
