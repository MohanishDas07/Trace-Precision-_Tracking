'use client';

import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface OfficialData {
  source: string;
  metric: string;
  impact: string;
}

export interface DataModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  subtitle: string;
  data: OfficialData;
  imageUrl: string;
  href: string;
}

export function DataModal({ isOpen, onClose, title, subtitle, data, imageUrl, href }: DataModalProps) {
  // Prevent scrolling when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4 sm:px-6">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Modal Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative w-full max-w-2xl overflow-hidden rounded-2xl bg-[#09090B] border border-white/10 shadow-2xl"
          >
            {/* Header / Hero Image */}
            <div className="relative h-48 w-full">
              <img 
                src={imageUrl} 
                alt={title} 
                className="absolute inset-0 h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#09090B] to-transparent" />
              
              <button
                onClick={onClose}
                className="absolute top-4 right-4 p-2 rounded-full bg-black/40 text-white/80 hover:bg-black/60 hover:text-white transition-colors backdrop-blur-md border border-white/10"
              >
                <X size={20} />
              </button>
            </div>

            {/* Content Body */}
            <div className="px-8 pb-8 pt-2">
              <h3 className="text-3xl font-bold font-serif text-white mb-2">{title}</h3>
              <p className="text-lg text-white/60 font-sans mb-8">{subtitle}</p>

              <div className="space-y-6">
                {/* Metric Box */}
                <div className="p-6 rounded-xl bg-white/5 border border-white/10">
                  <div className="text-sm uppercase tracking-wider text-blue-400 font-semibold mb-2 flex items-center justify-between">
                    <span>Key Metric</span>
                    <span className="px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-xs">
                      {data.source}
                    </span>
                  </div>
                  <p className="text-xl text-white font-serif leading-relaxed">
                    {data.metric}
                  </p>
                </div>

                {/* Impact Box */}
                <div className="p-6 rounded-xl bg-white/5 border border-white/10">
                  <div className="text-sm uppercase tracking-wider text-emerald-400 font-semibold mb-2">
                    Global Impact Projection
                  </div>
                  <p className="text-white/80 font-sans leading-relaxed">
                    {data.impact}
                  </p>
                </div>
              </div>

              {/* Action */}
              <div className="mt-8 pt-6 border-t border-white/10 flex justify-end">
                <a 
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-6 py-3 rounded-lg bg-white text-black font-semibold hover:bg-white/90 transition-colors"
                >
                  <span>Read Full Report</span>
                  <ExternalLink size={18} />
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
