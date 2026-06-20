/**
 * Calculation Engine
 * 
 * Converts onboarding quiz answers into a baseline annual carbon footprint
 * using emission factors derived from EPA and IPCC datasets.
 * 
 * All values are in kg CO₂e per year.
 */

// ─── Emission Factor Tables (EPA / IPCC derived) ────────────────────────────

const HOUSING_FACTORS: Record<string, number> = {
  energy_low:       840,   // ~1200 kWh/yr
  energy_medium:    1680,  // ~2400 kWh/yr 
  energy_high:      3780,  // ~5400 kWh/yr
  energy_very_high: 6720,  // ~9600 kWh/yr
};

const TRANSPORT_FACTORS: Record<string, number> = {
  km_0:        1200, // Transit / Bike only
  km_80:       2400, // Low mileage commute (~4,000 km/yr)
  km_250:      4600, // Average commute (~19,000 km/yr)
  km_250_plus: 7800, // Heavy commute (>24,000 km/yr)
};

const DIET_FACTORS: Record<string, number> = {
  meat_high:   4500,  // High impact meats 5+ days/wk (IPCC)
  meat_medium: 3300,  // High impact meats 3-4 days/wk
  meat_low:    2200,  // High impact meats 1-2 days/wk
  meat_never:  1600,  // Vegetarian/Vegan (IPCC)
};

// ─── Interfaces ─────────────────────────────────────────────────────────────

export interface QuizAnswers {
  housing:   string;
  transport: string;
  diet:      string;
}

export interface CategoryBreakdown {
  category: string;
  scoreCo2e: number;
  percentage: number;
}

export interface BaselineResult {
  totalCo2e:   number;
  breakdowns:  CategoryBreakdown[];
  treesEquiv:  number;       // Number of trees needed to offset
  globalAvg:   number;       // Global average for comparison
  percentile:  string;       // e.g. "above average"
}

// ─── Engine ─────────────────────────────────────────────────────────────────

export function calculateBaseline(answers: QuizAnswers): BaselineResult {
  const housing   = HOUSING_FACTORS[answers.housing]   ?? HOUSING_FACTORS.energy_medium;
  const transport = TRANSPORT_FACTORS[answers.transport] ?? TRANSPORT_FACTORS.km_80;
  const diet      = DIET_FACTORS[answers.diet]         ?? DIET_FACTORS.meat_medium;

  const totalCo2e = housing + transport + diet;
  const globalAvg = 4700; // World average ~4.7 tonnes

  const breakdowns: CategoryBreakdown[] = [
    { category: 'HOUSING',   scoreCo2e: housing,   percentage: Math.round((housing / totalCo2e) * 100) },
    { category: 'TRANSPORT', scoreCo2e: transport,  percentage: Math.round((transport / totalCo2e) * 100) },
    { category: 'DIET',      scoreCo2e: diet,       percentage: Math.round((diet / totalCo2e) * 100) },
  ];

  // Sort by highest emission first
  breakdowns.sort((a, b) => b.scoreCo2e - a.scoreCo2e);

  const treesEquiv = Math.round(totalCo2e / 21); // ~21 kg CO₂ absorbed per tree/year

  let percentile = 'below average';
  if (totalCo2e > globalAvg * 1.5) percentile = 'well above average';
  else if (totalCo2e > globalAvg) percentile = 'above average';
  else if (totalCo2e > globalAvg * 0.75) percentile = 'near average';

  return {
    totalCo2e,
    breakdowns,
    treesEquiv,
    globalAvg,
    percentile,
  };
}

/**
 * Returns the category key with the highest emission from the quiz.
 */
export function getHighestCategory(answers: QuizAnswers): string {
  const result = calculateBaseline(answers);
  return result.breakdowns[0].category;
}
