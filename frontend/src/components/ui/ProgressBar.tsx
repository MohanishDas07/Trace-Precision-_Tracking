import React from 'react';

interface ProgressBarProps {
  progress: number; // 0 to 100
  label?: string;
  color?: string;
}

export default function ProgressBar({ progress, label, color = 'var(--foreground)' }: ProgressBarProps) {
  return (
    <div style={{ width: '100%' }}>
      {label && (
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: 500 }}>
          <span>{label}</span>
          <span>{Math.round(progress)}%</span>
        </div>
      )}
      <div style={{ 
        height: '8px', 
        backgroundColor: 'var(--surface-border)', 
        borderRadius: '99px',
        overflow: 'hidden'
      }}>
        <div style={{
          height: '100%',
          width: `${progress}%`,
          backgroundColor: color,
          borderRadius: '99px',
          transition: 'width 0.5s cubic-bezier(0.4, 0, 0.2, 1)'
        }} />
      </div>
    </div>
  );
}
