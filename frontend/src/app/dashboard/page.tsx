"use client";
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import CarbonScoreCard from '@/components/dashboard/CarbonScoreCard';
import ActionRecommendations from '@/components/dashboard/ActionRecommendations';
import DonutChart from '@/components/ui/DonutChart';

interface DashboardData {
  user: { name: string; email: string };
  currentCo2e: number;
  baselineCo2e: number;
  totalSaved: number;
  treesEquiv: number;
  breakdowns: { category: string; scoreCo2e: number; percentage: number }[];
  streak: number;
}

export default function DashboardPage() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [error, setError] = useState('');
  const router = useRouter();

  const fetchDashboardData = async () => {
    const userId = localStorage.getItem('userId');
    if (!userId) {
      router.push('/onboarding');
      return;
    }

    try {
      const res = await fetch(`/api/dashboard/summary?userId=${userId}`);
      if (!res.ok) throw new Error('Failed to fetch dashboard');
      const json = await res.json();
      setData(json);
    } catch (err) {
      console.error(err);
      setError('Failed to load dashboard data.');
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  if (error) return <div style={{ padding: '4rem', textAlign: 'center', color: '#ef4444' }}>{error}</div>;
  if (!data) return <div style={{ padding: '4rem', textAlign: 'center' }}>Loading dashboard...</div>;

  // Map category to color for donut chart
  const categoryColors: Record<string, string> = {
    HOUSING: '#3b82f6',
    TRANSPORT: '#f59e0b',
    DIET: '#10b981',
    CONSUMPTION: '#8b5cf6'
  };

  const chartData = data.breakdowns.map(b => ({
    label: b.category,
    value: b.scoreCo2e,
    color: categoryColors[b.category] || 'var(--foreground)'
  }));

  return (
    <div className="animate-fade-in" style={{ paddingBottom: '4rem' }}>
      <header style={{ marginBottom: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
        <div>
          <h1 style={{ fontSize: '2rem', fontWeight: 600, letterSpacing: '-0.02em' }}>Welcome back, {data.user.name.split(' ')[0]}</h1>
          <p className="text-muted">Track and reduce your environmental impact.</p>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', backgroundColor: 'var(--surface)', padding: '0.5rem 1rem', borderRadius: 'var(--radius-lg)', border: '1px solid var(--surface-border)' }}>
          <span style={{ fontSize: '1.25rem' }}>🔥</span>
          <span style={{ fontWeight: 600 }}>{data.streak} Actions</span>
        </div>
      </header>

      <div style={{ display: 'grid', gap: '2rem', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))' }}>
        <div style={{ flex: 1 }}>
          <CarbonScoreCard score={data.currentCo2e} />
        </div>
        
        <div style={{ flex: 1, backgroundColor: 'var(--surface)', padding: '2rem', borderRadius: 'var(--radius-lg)', border: '1px solid var(--surface-border)', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <h3 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '1.5rem', textAlign: 'center' }}>Emissions by Category</h3>
          <DonutChart data={chartData} />
        </div>
      </div>

      <ActionRecommendations 
        userId={localStorage.getItem('userId') as string} 
        onActionComplete={fetchDashboardData} 
      />
    </div>
  );
}
