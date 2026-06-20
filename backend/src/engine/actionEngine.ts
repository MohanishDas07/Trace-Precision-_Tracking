/**
 * Action Engine
 * 
 * Suggests personalized, bite-sized reduction tasks based on the user's
 * highest-emission categories. Uses a weighted ranking system that
 * prioritizes high-impact, low-difficulty actions first (the "easy wins").
 */

// ─── Master Action Library ──────────────────────────────────────────────────

export interface ActionSeed {
  title: string;
  description: string;
  category: 'HOUSING' | 'TRANSPORT' | 'DIET' | 'CONSUMPTION';
  impactCo2eEstimate: number;  // kg CO₂e saved per year
  difficulty: 'EASY' | 'MEDIUM' | 'HARD';
}

export const ACTION_LIBRARY: ActionSeed[] = [
  // ── DIET ──
  {
    title: 'Adopt a Plant-Rich Diet',
    description: 'Transition to a primarily plant-based diet. (Source: IPCC Special Report)',
    category: 'DIET',
    impactCo2eEstimate: 800,
    difficulty: 'HARD',
  },
  {
    title: 'Reduce Household Food Waste',
    description: 'Implement composting and strict meal planning. (Source: UNEP Food Waste Index)',
    category: 'DIET',
    impactCo2eEstimate: 200,
    difficulty: 'MEDIUM',
  },
  {
    title: 'Replace Beef with Poultry/Fish',
    description: 'Switching high-impact meats can drastically lower emissions. (Source: WRI)',
    category: 'DIET',
    impactCo2eEstimate: 350,
    difficulty: 'MEDIUM',
  },

  // ── TRANSPORT ──
  {
    title: 'Switch to an Electric Vehicle (EV)',
    description: 'Replace ICE vehicle with a zero-tailpipe emission EV. (Source: EPA)',
    category: 'TRANSPORT',
    impactCo2eEstimate: 2100,
    difficulty: 'HARD',
  },
  {
    title: 'E-Bike Commuting',
    description: 'Use an e-bike for commutes under 10 miles. (Source: Dept. of Energy)',
    category: 'TRANSPORT',
    impactCo2eEstimate: 450,
    difficulty: 'MEDIUM',
  },
  {
    title: 'Utilize Public Transit',
    description: 'Shift 50% of your solo car trips to public transit. (Source: APTA)',
    category: 'TRANSPORT',
    impactCo2eEstimate: 600,
    difficulty: 'MEDIUM',
  },

  // ── HOUSING ──
  {
    title: 'Install an Air Source Heat Pump',
    description: 'Upgrade heating/cooling to a highly efficient heat pump. (Source: IEA)',
    category: 'HOUSING',
    impactCo2eEstimate: 1500,
    difficulty: 'HARD',
  },
  {
    title: 'Improve Home Weatherization',
    description: 'Seal leaks and upgrade attic insulation. (Source: Energy.gov)',
    category: 'HOUSING',
    impactCo2eEstimate: 500,
    difficulty: 'MEDIUM',
  },
  {
    title: 'Switch to 100% Renewable Energy',
    description: 'Opt-in to a green energy plan via your utility. (Source: EPA Green Power)',
    category: 'HOUSING',
    impactCo2eEstimate: 1200,
    difficulty: 'EASY',
  },

  // ── CONSUMPTION ──
  {
    title: 'Install Rooftop Solar Panels',
    description: 'Generate your own clean electricity. (Source: NREL)',
    category: 'CONSUMPTION',
    impactCo2eEstimate: 2500,
    difficulty: 'HARD',
  },
  {
    title: 'Purchase Second-Hand Goods',
    description: 'Buy refurbished electronics and thrifted clothing. (Source: Circular Economy Action Plan)',
    category: 'CONSUMPTION',
    impactCo2eEstimate: 300,
    difficulty: 'MEDIUM',
  },
];

// ─── Recommendation Engine ──────────────────────────────────────────────────

interface CategoryScore {
  category: string;
  scoreCo2e: number;
}

/**
 * Returns the top N recommended actions for a user based on their
 * emission breakdown. Prioritizes:
 *   1. Actions in the user's highest-emission category.
 *   2. Within that, actions with the best impact-to-difficulty ratio.
 */
export function getRecommendations(
  breakdowns: CategoryScore[],
  existingActionIds: string[] = [],
  limit: number = 5
): ActionSeed[] {
  // Sort categories by emission (highest first)
  const sortedCategories = [...breakdowns].sort((a, b) => b.scoreCo2e - a.scoreCo2e);
  const categoryOrder = sortedCategories.map(c => c.category);

  const difficultyWeight: Record<string, number> = {
    EASY: 3,
    MEDIUM: 2,
    HARD: 1,
  };

  // Score each action: category rank * impact * difficulty weight
  const scored = ACTION_LIBRARY.map(action => {
    const categoryRank = categoryOrder.length - categoryOrder.indexOf(action.category);
    const weight = difficultyWeight[action.difficulty] ?? 1;
    const score = categoryRank * action.impactCo2eEstimate * weight;
    return { action, score };
  });

  // Sort by score descending, then return top N
  scored.sort((a, b) => b.score - a.score);

  return scored
    .map(s => s.action)
    .slice(0, limit);
}
