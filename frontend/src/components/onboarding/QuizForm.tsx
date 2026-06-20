"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import ProgressBar from '@/components/ui/ProgressBar';

const questions = [
  {
    id: 'housing',
    question: "What is your average monthly electricity consumption? (IEA Data)",
    options: [
      { label: 'Under 100 kWh (Low / No AC)', value: 'energy_low' },
      { label: '100 - 300 kWh (Average)', value: 'energy_medium' },
      { label: '300 - 600 kWh (Frequent AC)', value: 'energy_high' },
      { label: '600+ kWh (Very High)', value: 'energy_very_high' }
    ]
  },
  {
    id: 'transport',
    question: "How many kilometers do you drive per week in a gas vehicle?",
    options: [
      { label: '0 km (Transit / Bike / EV)', value: 'km_0' },
      { label: '1 - 80 km', value: 'km_80' },
      { label: '80 - 250 km', value: 'km_250' },
      { label: '250+ km', value: 'km_250_plus' }
    ]
  },
  {
    id: 'diet',
    question: "How frequently do you consume meat? (IPCC Guidelines)",
    options: [
      { label: 'Never (Vegan / Vegetarian)', value: 'meat_never' },
      { label: '1 - 2 days per week', value: 'meat_low' },
      { label: '3 - 4 days per week', value: 'meat_medium' },
      { label: '5+ days per week', value: 'meat_high' }
    ]
  }
];

export default function QuizForm() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSelect = (value: string) => {
    setAnswers(prev => ({ ...prev, [questions[step].id]: value }));
  };

  const handleNext = () => {
    if (step < questions.length - 1) {
      setStep(prev => prev + 1);
    } else {
      submitQuiz();
    }
  };

  const submitQuiz = async () => {
    setLoading(true);
    setError('');
    
    // Using a mock email and name for the MVP since we don't have full Auth implemented
    const mockEmail = "user_" + Math.random().toString(36).substring(7) + "@example.com";
    const mockName = "Test User";

    try {
      const response = await fetch('http://localhost:4000/api/onboarding/assessment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: mockEmail,
          name: mockName,
          answers: answers
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to submit assessment');
      }

      const data = await response.json();
      
      // Store userId locally to identify the session for MVP
      localStorage.setItem('userId', data.userId);
      
      router.push('/dashboard');
    } catch (err) {
      console.error(err);
      setError('Something went wrong. Please try again.');
      setLoading(false);
    }
  };

  const progress = ((step + 1) / questions.length) * 100;
  const currentQuestion = questions[step];

  return (
    <Card padding="lg" style={{ maxWidth: '500px', margin: '0 auto' }}>
      <ProgressBar progress={progress} label={`Question ${step + 1} of ${questions.length}`} />
      
      <div style={{ marginTop: '2rem', marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '1.5rem' }}>
          {currentQuestion.question}
        </h2>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {currentQuestion.options.map(opt => (
            <button
              key={opt.value}
              onClick={() => handleSelect(opt.value)}
              style={{
                padding: '1rem',
                borderRadius: 'var(--radius-md)',
                border: answers[currentQuestion.id] === opt.value 
                  ? '2px solid var(--foreground)' 
                  : '1px solid var(--surface-border)',
                backgroundColor: 'transparent',
                color: 'var(--foreground)',
                textAlign: 'left',
                fontSize: '1rem',
                cursor: 'pointer',
                transition: 'all 0.2s',
                fontWeight: answers[currentQuestion.id] === opt.value ? 600 : 400
              }}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      {error && <p style={{ color: '#ef4444', marginBottom: '1rem', textAlign: 'center' }}>{error}</p>}

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <button 
          onClick={() => setStep(p => Math.max(0, p - 1))}
          style={{ color: 'var(--text-muted)', visibility: step === 0 ? 'hidden' : 'visible' }}
        >
          ← Back
        </button>
        <Button 
          onClick={handleNext} 
          disabled={!answers[currentQuestion.id] || loading}
        >
          {loading ? 'Analyzing...' : (step === questions.length - 1 ? 'See Results' : 'Next →')}
        </Button>
      </div>
    </Card>
  );
}
