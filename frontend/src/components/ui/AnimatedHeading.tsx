'use client';

import React, { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

interface AnimatedHeadingProps {
  text: string;
  className?: string;
  initialDelayMs?: number;
  charDelayMs?: number;
  transitionDurationMs?: number;
}

export function AnimatedHeading({
  text,
  className,
  initialDelayMs = 200,
  charDelayMs = 30,
  transitionDurationMs = 500,
}: AnimatedHeadingProps) {
  const [isStarted, setIsStarted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsStarted(true);
    }, initialDelayMs);
    return () => clearTimeout(timer);
  }, [initialDelayMs]);

  const lines = text.split('\n');

  return (
    <h1 className={cn("", className)}>
      {lines.map((line, lineIndex) => {
        // Calculate the base delay for this line based on previous lines' lengths
        let previousCharsCount = 0;
        for (let i = 0; i < lineIndex; i++) {
          previousCharsCount += lines[i].length;
        }

        return (
          <span key={lineIndex} className="block whitespace-nowrap">
            {line.split('').map((char, charIndex) => {
              const globalCharIndex = previousCharsCount + charIndex;
              const delay = globalCharIndex * charDelayMs;

              return (
                <span
                  key={charIndex}
                  className="inline-block transition-all"
                  style={{
                    opacity: isStarted ? 1 : 0,
                    transform: isStarted ? 'translateX(0)' : 'translateX(-18px)',
                    transitionDuration: `${transitionDurationMs}ms`,
                    transitionDelay: isStarted ? `${delay}ms` : '0ms',
                    transitionTimingFunction: 'cubic-bezier(0.2, 0.8, 0.2, 1)',
                  }}
                >
                  {char === ' ' ? '\u00A0' : char}
                </span>
              );
            })}
          </span>
        );
      })}
    </h1>
  );
}
