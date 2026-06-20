import React from 'react';
import Link from 'next/link';

export function Footer() {
  return (
    <footer className="w-full bg-black py-8 border-t border-white/10 mt-auto relative z-50">
      <div className="w-full px-6 md:px-12 grid grid-cols-1 md:grid-cols-3 items-center gap-6 md:gap-0">
        
        {/* Empty left column to balance the center */}
        <div className="hidden md:block"></div>
        
        {/* Centered Trace Name */}
        <div className="flex justify-center">
          <span className="cursor-default text-sm md:text-base font-medium text-[#9a8c78] hover:text-white transition-colors">
            © 2026 Trace
          </span>
        </div>
        
        {/* Right-aligned links */}
        <div className="flex justify-center md:justify-end items-center gap-8 text-lg md:text-xl font-medium text-[#9a8c78]">
          <Link href="/guidelines" className="hover:text-white transition-colors whitespace-nowrap">
            Official Guidelines
          </Link>
          <Link href="/privacy" className="hover:text-white transition-colors whitespace-nowrap">
            Privacy Policy
          </Link>
        </div>

      </div>
    </footer>
  );
}
