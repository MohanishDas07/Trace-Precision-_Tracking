"use client";
import React, { useState, useEffect } from 'react';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';import { ActionModal, ActionData } from './ActionModal';

interface Action {
  id: string;
  title: string;
  category: string;
  impactCo2eEstimate: number;
  difficulty: string;
}

interface ActionRecommendationsProps {
  userId: string;
  onActionComplete: () => void;
}

const AUTHENTIC_DATA_MAP: Record<string, { source: string, metric: string, impact: string }> = {
  'Adopt a Plant-Rich Diet': {
    source: 'IPCC Special Report',
    metric: 'Dietary shifts could reduce GHG emissions by up to 8.0 GtCO2e per year by 2050.',
    impact: 'Plan your meals around whole grains, legumes, nuts, and vegetables. Even replacing one meat-based meal a day can drastically lower your carbon footprint.'
  },
  'Reduce Household Food Waste': {
    source: 'UNEP Food Waste Index',
    metric: '8-10% of global greenhouse gas emissions are associated with food that is not consumed.',
    impact: 'Start meal planning and utilize leftovers. Set up a compost bin for organic scraps instead of sending them to the landfill.'
  },
  'Replace Beef with Poultry/Fish': {
    source: 'World Resources Institute (WRI)',
    metric: 'Beef requires 20 times more land and emits 20 times more GHG emissions per gram of edible protein than common plant proteins.',
    impact: 'Switching from beef/lamb to lower-impact meats (like chicken or sustainably sourced fish) provides significant immediate reductions.'
  },
  'Switch to an Electric Vehicle (EV)': {
    source: 'EPA (Environmental Protection Agency)',
    metric: 'EVs have zero tailpipe emissions and generally produce significantly fewer lifecycle emissions than conventional vehicles.',
    impact: 'Take advantage of government rebates to transition to an EV or PHEV for your daily commuting.'
  },
  'E-Bike Commuting': {
    source: 'Department of Energy',
    metric: 'Replacing car trips under 10 miles with an e-bike reduces transport emissions for those trips by nearly 100%.',
    impact: 'Invest in an e-bike for local errands. It improves health while completely eliminating short-trip tailpipe emissions.'
  },
  'Utilize Public Transit': {
    source: 'APTA',
    metric: 'Public transportation in the US saves 37 million metric tons of carbon dioxide annually.',
    impact: 'Commit to taking the bus or train for at least 50% of your solo commuting trips.'
  },
  'Install an Air Source Heat Pump': {
    source: 'International Energy Agency (IEA)',
    metric: 'Heat pumps can reduce electricity use for heating by 50% compared to electric resistance heating.',
    impact: 'Contact local contractors to replace your old HVAC system. Many countries offer significant tax credits for heat pump installation.'
  },
  'Improve Home Weatherization': {
    source: 'Energy.gov',
    metric: 'Proper insulation and sealing can save you up to 15% on heating and cooling costs while cutting proportional emissions.',
    impact: 'Schedule a home energy audit, seal window leaks, and upgrade attic insulation.'
  },
  'Switch to 100% Renewable Energy': {
    source: 'EPA Green Power',
    metric: 'Switching to green power eliminates scope 2 emissions associated with electricity consumption.',
    impact: 'Contact your utility provider to opt into a green energy program, or switch to a provider that guarantees 100% renewable sourcing.'
  },
  'Install Rooftop Solar Panels': {
    source: 'NREL',
    metric: 'Residential solar can offset roughly 80% of a home’s carbon footprint from electricity.',
    impact: 'Evaluate your roof’s solar potential and explore financing options to install a photovoltaic system.'
  },
  'Purchase Second-Hand Goods': {
    source: 'Circular Economy Action Plan',
    metric: 'Extending the life of clothes by just 9 months reduces carbon, water, and waste footprints by 20-30%.',
    impact: 'Commit to buying refurbished electronics and second-hand clothing instead of new retail items.'
  }
};

export default function ActionRecommendations({ userId, onActionComplete }: ActionRecommendationsProps) {
  const [recommendations, setRecommendations] = useState<Action[]>([]);
  const [startedActions, setStartedActions] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedAction, setSelectedAction] = useState<ActionData | null>(null);

  useEffect(() => {
    fetchRecommendations();
    const storedStarted = localStorage.getItem('startedActions');
    if (storedStarted) {
      try {
        setStartedActions(JSON.parse(storedStarted));
      } catch (e) {}
    }
  }, [userId]);

  const fetchRecommendations = async () => {
    try {
      let url = `/api/actions/recommendations?userId=${userId}`;
      const storedAnswers = localStorage.getItem('quizAnswers');
      if (storedAnswers) {
        try {
          const answers = JSON.parse(storedAnswers);
          if (answers.diet) url += `&diet=${answers.diet}`;
          if (answers.transport) url += `&transport=${answers.transport}`;
          if (answers.housing) url += `&housing=${answers.housing}`;
        } catch (e) {}
      }

      const res = await fetch(url);
      if (res.ok) {
        const data = await res.json();
        setRecommendations(data.recommendations);
      }
    } catch (err) {
      console.error("Failed to fetch recommendations:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleStart = async (actionId: string) => {
    try {
      setStartedActions(prev => {
        const next = [...prev, actionId];
        localStorage.setItem('startedActions', JSON.stringify(next));
        return next;
      });
    } catch (err) {
      console.error("Failed to start action:", err);
    }
  };

  const handleComplete = async (actionId: string, impact: number) => {
    try {
      setStartedActions(prev => {
        const next = prev.filter(id => id !== actionId);
        localStorage.setItem('startedActions', JSON.stringify(next));
        return next;
      });
      
      setRecommendations(prev => prev.filter(a => a.id !== actionId));
      
      // Update stats in localStorage
      const currentSaved = parseInt(localStorage.getItem('totalSaved') || '0', 10);
      const currentStreak = parseInt(localStorage.getItem('streak') || '0', 10);
      
      localStorage.setItem('totalSaved', (currentSaved + impact).toString());
      localStorage.setItem('streak', (currentStreak + 1).toString());
      
      onActionComplete(); 
    } catch (err) {
      console.error("Failed to complete action:", err);
    }
  };

  const openModal = (action: Action) => {
    const data = AUTHENTIC_DATA_MAP[action.title] || {
      source: 'Verified Environmental Source',
      metric: 'This action provides scientifically proven reductions in greenhouse gas emissions.',
      impact: 'Follow standard local guidelines to implement this change effectively.'
    };
    
    setSelectedAction({
      id: action.id,
      title: action.title,
      category: action.category,
      impactCo2eEstimate: action.impactCo2eEstimate,
      source: data.source,
      metric: data.metric,
      impact: data.impact
    });
  };

  if (loading) {
    return <div style={{ marginTop: '3rem', textAlign: 'center', color: 'var(--text-muted)' }}>Loading recommendations...</div>;
  }

  if (recommendations.length === 0) {
    return (
      <div style={{ marginTop: '3rem', textAlign: 'center' }}>
        <p className="text-muted">You have no new recommended actions right now!</p>
      </div>
    );
  }

  return (
    <div style={{ marginTop: '3rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '1.5rem' }}>
        <div>
          <h3 style={{ fontSize: '1.5rem', fontWeight: 600, letterSpacing: '-0.02em' }}>Recommended Actions</h3>
          <p className="text-muted" style={{ fontSize: '0.95rem' }}>Based on your highest emission areas</p>
        </div>
      </div>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {recommendations.map(action => {
          const isStarted = startedActions.includes(action.id);
          
          return (
            <Card key={action.id} padding="md" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', marginBottom: '0.25rem' }}>
                  <span style={{ fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase', color: 'var(--accent)' }}>
                    {action.category}
                  </span>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>• {action.difficulty}</span>
                </div>
                <h4 style={{ fontSize: '1.1rem', fontWeight: 500 }}>{action.title}</h4>
                <p className="text-muted" style={{ fontSize: '0.85rem', marginTop: '0.25rem' }}>
                  Saves ~{action.impactCo2eEstimate} kg CO₂e/yr
                </p>
              </div>
              <div>
                {!isStarted ? (
                  <Button 
                    variant="secondary" 
                    size="sm" 
                    onClick={() => openModal(action)}
                  >
                    Take Action
                  </Button>
                ) : (
                  <Button 
                    variant="primary" 
                    size="sm" 
                    onClick={() => handleComplete(action.id, action.impactCo2eEstimate)}
                    style={{ backgroundColor: '#10b981', color: '#fff', borderColor: '#10b981' }}
                  >
                    Mark Complete ✓
                  </Button>
                )}
              </div>
            </Card>
          );
        })}
      </div>

      <ActionModal 
        isOpen={!!selectedAction} 
        onClose={() => setSelectedAction(null)} 
        action={selectedAction} 
        onCommit={handleStart} 
      />
    </div>
  );
}
