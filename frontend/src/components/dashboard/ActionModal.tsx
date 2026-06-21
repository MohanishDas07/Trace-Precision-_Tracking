'use client';

import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
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
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (isOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = 'unset';
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  if (!mounted || !action) return null;

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[9999] overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center sm:p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-black/80 backdrop-blur-md"
              onClick={onClose}
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative w-full max-w-lg text-left overflow-hidden rounded-xl bg-gradient-to-br from-[#0f172a] to-[#020617] border border-white/10 shadow-2xl my-8"
            >
              <button
                onClick={onClose}
                className="absolute top-3 right-3 p-2 rounded-full bg-white/5 text-white/80 hover:bg-white/10 hover:text-white transition-colors backdrop-blur-md border border-white/10 z-10"
              >
                <X size={18} />
              </button>

              <div className="p-6 pt-8">
                <div className="flex gap-2 items-center mb-3">
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-[10px] font-semibold text-emerald-400 tracking-wider">
                    {action.category}
                  </span>
                  <span className="text-xs text-gray-400">
                    Saves: {action.impactCo2eEstimate} kg CO₂e/yr
                  </span>
                </div>
                
                <h3 className="text-xl font-bold font-serif text-white mb-4 pr-6 leading-snug">{action.title}</h3>

                <div className="space-y-3">
                  <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                    <div className="text-[10px] uppercase tracking-wider text-blue-400 font-semibold mb-1.5 flex items-center justify-between">
                      <span>Data Metric</span>
                      <span className="text-blue-300 opacity-80">{action.source}</span>
                    </div>
                    <p className="text-sm text-white/90 font-sans leading-relaxed">
                      {action.metric}
                    </p>
                  </div>

                  <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                    <div className="text-[10px] uppercase tracking-wider text-emerald-400 font-semibold mb-1.5">
                      How to Achieve It
                    </div>
                    <p className="text-white/80 font-sans leading-relaxed text-sm">
                      {action.impact}
                    </p>
                  </div>
                </div>

                <div className="mt-5 pt-4 border-t border-white/10 flex justify-end">
                  <button 
                    onClick={() => {
                      onCommit(action.id);
                      onClose();
                    }}
                    className="flex items-center gap-2 px-5 py-2 text-sm rounded-md bg-emerald-500 text-white font-semibold hover:bg-emerald-600 transition-colors shadow-[0_0_10px_rgba(16,185,129,0.3)] w-full sm:w-auto justify-center"
                  >
                    <span>Commit to Action</span>
                    <CheckCircle2 size={16} />
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>,
    document.body
  );
}
