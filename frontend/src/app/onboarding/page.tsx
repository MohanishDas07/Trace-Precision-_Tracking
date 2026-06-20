import React from 'react';
import QuizForm from '@/components/onboarding/QuizForm';

export default function OnboardingPage() {
  return (
    <div className="animate-fade-in" style={{ paddingTop: '4rem', paddingBottom: '4rem' }}>
      <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <h1 style={{ fontSize: '2.5rem', fontWeight: 600, letterSpacing: '-0.02em', marginBottom: '0.5rem' }}>
          Let's find your baseline.
        </h1>
        <p className="text-muted" style={{ fontSize: '1.1rem' }}>
          Answer a few quick questions to estimate your annual carbon footprint.
        </p>
      </div>
      
      <QuizForm />
    </div>
  );
}
