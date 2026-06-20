'use client';

import { cn } from "@/lib/utils";
import React, { useState } from "react";

export const RadialGlowBackground = ({ children, className }: { children?: React.ReactNode, className?: string }) => {
  // Retaining the state as per the original requested snippet structure
  const [count, setCount] = useState(0);

  return (
    <div className={cn("min-h-screen w-full bg-[#020617] relative text-white", className)}>
      {/* Dark Radial Glow Background */}
      <div
        className="fixed inset-0 z-0 pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle 500px at 50% 200px, #3e3e3e, transparent)`,
        }}
      />
      {/* Content wrapper */}
      <div className="relative z-10 flex flex-col min-h-screen">
        {children}
      </div>
    </div>
  );
};
