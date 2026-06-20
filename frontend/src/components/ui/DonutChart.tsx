import React from 'react';

interface ChartData {
  label: string;
  value: number;
  color: string;
}

interface DonutChartProps {
  data: ChartData[];
  size?: number;
  thickness?: number;
}

export default function DonutChart({ data, size = 160, thickness = 20 }: DonutChartProps) {
  const total = data.reduce((sum, item) => sum + item.value, 0);
  let currentOffset = 0;
  const radius = (size - thickness) / 2;
  const circumference = 2 * Math.PI * radius;

  return (
    <div style={{ display: 'flex', gap: '2rem', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ position: 'relative', width: size, height: size }}>
        <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
          {/* Background circle */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="var(--surface-border)"
            strokeWidth={thickness}
          />
          {/* Data segments */}
          {data.map((item, index) => {
            const percentage = item.value / total;
            const strokeDasharray = `${percentage * circumference} ${circumference}`;
            const strokeDashoffset = -currentOffset * circumference;
            currentOffset += percentage;

            return (
              <circle
                key={index}
                cx={size / 2}
                cy={size / 2}
                r={radius}
                fill="none"
                stroke={item.color}
                strokeWidth={thickness}
                strokeDasharray={strokeDasharray}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                style={{ transition: 'stroke-dasharray 1s ease, stroke-dashoffset 1s ease', transform: 'rotate(-90deg)', transformOrigin: '50% 50%' }}
              />
            );
          })}
        </svg>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
        {data.map((item, index) => (
          <div key={index} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: item.color }} />
            <div style={{ display: 'flex', justifyContent: 'space-between', width: '120px' }}>
              <span style={{ fontSize: '0.9rem', fontWeight: 500 }}>{item.label}</span>
              <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                {Math.round((item.value / total) * 100)}%
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
