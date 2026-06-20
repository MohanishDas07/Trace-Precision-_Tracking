import React from 'react';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  padding?: 'none' | 'sm' | 'md' | 'lg';
}

export default function Card({ children, padding = 'md', style, ...props }: CardProps) {
  
  const paddings = {
    none: '0',
    sm: '1rem',
    md: '1.5rem',
    lg: '2rem'
  };

  const baseStyle: React.CSSProperties = {
    backgroundColor: 'var(--surface)',
    borderRadius: 'var(--radius-lg)',
    boxShadow: 'var(--shadow-sm)',
    border: '1px solid var(--surface-border)',
    padding: paddings[padding],
    ...style
  };

  return (
    <div style={baseStyle} {...props}>
      {children}
    </div>
  );
}
