'use client';

import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle2 } from 'lucide-react';

export interface ActionData {
  id: string;
  title: string;
  category: string;
  impactCo2eEstimate: number;
  source: string;
  metric: string;
  impact: string;
}

interface ActionModalProps {
  isOpen: boolean;
  onClose: () => void;
  action: ActionData | null;
  onCommit: (id: string) => void;
}

export function ActionModal({ isOpen, onClose, action, onCommit }: ActionModalProps) {
  useEffect(() => {
    if (isOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = 'unset';
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  if (!action) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 bg-black/80 backdrop-blur-md"
            onClick={onClose}
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative w-full max-w-2xl overflow-hidden rounded-2xl bg-gradient-to-br from-[#0f172a] to-[#020617] border border-white/10 shadow-2xl"
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 rounded-full bg-white/5 text-white/80 hover:bg-white/10 hover:text-white transition-colors backdrop-blur-md border border-white/10 z-10"
            >
              <X size={20} />
            </button>

            <div className="px-8 pb-8 pt-10">
              <div className="flex gap-2 items-center mb-3">
                <span className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-xs font-semibold text-emerald-400 tracking-wider">
                  {action.category}
                </span>
                <span className="text-sm text-gray-400">
                  Estimated Savings: {action.impactCo2eEstimate} kg CO₂e/yr
                </span>
              </div>
              
              <h3 className="text-3xl font-bold font-serif text-white mb-6">{action.title}</h3>

              <div className="space-y-6">
                <div className="p-6 rounded-xl bg-white/5 border border-white/10">
                  <div className="text-sm uppercase tracking-wider text-blue-400 font-semibold mb-3 flex items-center justify-between">
                    <span>Authentic Data Metric</span>
                    <span className="px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-xs text-blue-300">
                      {action.source}
                    </span>
                  </div>
                  <p className="text-lg text-white font-sans leading-relaxed">
                    {action.metric}
                  </p>
                </div>

                <div className="p-6 rounded-xl bg-white/5 border border-white/10">
                  <div className="text-sm uppercase tracking-wider text-emerald-400 font-semibold mb-2">
                    How to Achieve It
                  </div>
                  <p className="text-white/80 font-sans leading-relaxed text-sm">
                    {action.impact}
                  </p>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-white/10 flex justify-end">
                <button 
                  onClick={() => {
                    onCommit(action.id);
                    onClose();
                  }}
                  className="flex items-center gap-2 px-8 py-3 rounded-lg bg-emerald-500 text-white font-semibold hover:bg-emerald-600 transition-colors shadow-[0_0_20px_rgba(16,185,129,0.3)]"
                >
                  <span>Commit to Action</span>
                  <CheckCircle2 size={18} />
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
