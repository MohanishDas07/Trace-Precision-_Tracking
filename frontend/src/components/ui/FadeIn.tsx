'use client';

import React, { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

interface FadeInProps {
  children: React.ReactNode;
  delayMs?: number;
  durationMs?: number;
  className?: string;
}

export function FadeIn({ children, delayMs = 0, durationMs = 1000, className }: FadeInProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, delayMs);
    return () => clearTimeout(timer);
  }, [delayMs]);

  return (
    <div
      className={cn("transition-opacity", className)}
      style={{
        opacity: isVisible ? 1 : 0,
        transitionDuration: `${durationMs}ms`,
        transitionTimingFunction: 'ease-in-out',
      }}
    >
      {children}
    </div>
  );
}
