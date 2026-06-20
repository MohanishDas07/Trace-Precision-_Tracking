"use client";
import React from 'react';
import Card from '@/components/ui/Card';
import { TreePine } from 'lucide-react';

interface CarbonScoreCardProps {
  score: number; // in kg CO2e
}

export default function CarbonScoreCard({ score }: CarbonScoreCardProps) {
  
  // Accurate translation: Average mature tree absorbs ~22kg CO2/year
  const treesRequired = Math.round(score / 22); 
  
  // Decide how many icons to show (max 48 to fit nicely in rows, rest is +more)
  const displayTrees = Math.min(treesRequired, 48);
  
  return (
    <Card 
      padding="lg" 
      className="relative overflow-hidden bg-gradient-to-br from-[#0f172a] to-[#020617]"
      style={{ 
        textAlign: 'center', 
        color: 'white', 
        backgroundColor: 'transparent',
        border: '1px solid rgba(255,255,255,0.05)',
        boxShadow: '0 10px 40px -10px rgba(0,0,0,0.5)'
      }}
    >
      <div className="relative z-10">
        <h2 className="text-sm uppercase tracking-wider font-semibold text-gray-400 mb-2">
          Estimated Annual Footprint
        </h2>
        
        <div className="flex items-baseline justify-center gap-2 mb-6 mt-4">
          <span className="text-6xl md:text-7xl font-bold tracking-tighter text-white drop-shadow-md">
            {(score / 1000).toFixed(1)}
          </span>
          <span className="text-xl text-gray-400 font-medium">Tonnes CO₂e</span>
        </div>
        
        <div className="bg-white/[0.03] border border-white/10 p-5 rounded-2xl backdrop-blur-md flex flex-col items-center shadow-inner mt-8">
          <div className="flex flex-wrap justify-center gap-1.5 mb-4 opacity-90 max-w-[280px]">
            {Array.from({ length: displayTrees }).map((_, i) => (
              <TreePine key={i} size={20} className="text-emerald-500/80 drop-shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
            ))}
            {treesRequired > 48 && (
              <span className="text-sm font-medium text-emerald-500/80 ml-1 self-end mb-0.5">
                +{treesRequired - 48} more
              </span>
            )}
          </div>
          <p className="text-sm text-gray-300 leading-relaxed">
            That's equivalent to the carbon sequestered by <strong className="text-emerald-400 font-semibold text-base">{treesRequired} mature trees</strong> in a year.
          </p>
        </div>
      </div>
      
      {/* Subtle background glows */}
      <div className="absolute -bottom-32 -right-32 w-64 h-64 bg-emerald-600/10 rounded-full blur-[80px] pointer-events-none" />
      <div className="absolute -top-32 -left-32 w-64 h-64 bg-blue-600/10 rounded-full blur-[80px] pointer-events-none" />
    </Card>
  );
}
