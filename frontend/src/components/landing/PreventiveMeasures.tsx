'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { InteractiveTravelCard } from '@/components/ui/3d-card';
import { DataModal, OfficialData } from '@/components/ui/data-modal';

interface Measure {
  id: number;
  title: string;
  subtitle: string;
  imageUrl: string;
  href: string;
  data: OfficialData;
}

const measures: Measure[] = [
  {
    id: 1,
    title: "Renewable Energy",
    subtitle: "Accelerating the shift to solar & wind.",
    imageUrl: "https://images.unsplash.com/photo-1466611653911-95081537e5b7?q=80&w=2070",
    href: "https://www.iea.org/reports/renewables-2024",
    data: {
      source: "IEA (2024)",
      metric: "$3 Trillion Global Clean Energy Investment in 2024.",
      impact: "Renewable capacity is forecast to increase by nearly 60% by 2030. Wind and solar are driving the market, allowing the renewable share in the electricity sector to expand from 30% to 46% by 2030."
    }
  },
  {
    id: 2,
    title: "Sustainable Mobility",
    subtitle: "Massive deployment of EVs & high-speed rail.",
    imageUrl: "https://images.unsplash.com/photo-1519003722824-194d4455a60c?q=80&w=2075",
    href: "https://www.iea.org/reports/global-ev-outlook-2024",
    data: {
      source: "IEA (2024)",
      metric: "17 Million EVs sold globally in 2024 (20% of all car sales).",
      impact: "Widespread adoption is projected to displace 11-12 million barrels of oil per day by 2035 and reduce greenhouse gas emissions by up to 2 gigatonnes of CO2-equivalent annually."
    }
  },
  {
    id: 3,
    title: "Reforestation",
    subtitle: "Restoring ecosystems to absorb atmospheric CO2.",
    imageUrl: "https://images.unsplash.com/photo-1511497584788-876760111969?q=80&w=2000",
    href: "https://www.ipcc.ch/srccl/",
    data: {
      source: "IPCC (AR6)",
      metric: "Recognized as the most cost-effective biological Carbon Dioxide Removal (CDR) strategy.",
      impact: "Forests absorb a massive portion of annual global CO2. However, the IPCC warns that these sinks are increasingly at risk of 'reversal' due to wildfires and droughts, making immediate protection and expansion critical."
    }
  },
  {
    id: 4,
    title: "Eco Industry",
    subtitle: "Implementing strict emission caps & green tech.",
    imageUrl: "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?q=80&w=2070",
    href: "https://united4efficiency.org/",
    data: {
      source: "UNEP (U4E)",
      metric: "$130 Billion annual savings by 2040 in emerging economies through high-efficiency transitions.",
      impact: "Industrial efficiency improvements could account for up to 26% of the total emissions reductions needed globally by 2030."
    }
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 }
  }
};

const itemVariants = {
  hidden: { y: 30, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: "spring", stiffness: 100, damping: 15 }
  }
};

export default function PreventiveMeasures() {
  const [activeModalId, setActiveModalId] = useState<number | null>(null);

  const activeMeasure = measures.find(m => m.id === activeModalId);

  return (
    <section className="py-24 px-6 relative z-20 bg-[#020617]">
      <div className="max-w-[1400px] mx-auto">
        <div className="mb-16 text-center">
          <h2 className="text-5xl md:text-7xl font-bold text-white font-serif tracking-tight mb-4">
            Preventive Measures
          </h2>
          <p className="text-xl text-white/60 tracking-widest uppercase font-sans">
            Actionable Climate Solutions
          </p>
        </div>

        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 place-items-center"
          style={{ perspective: "1000px" }}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {measures.map((measure) => (
            <motion.div key={measure.id} variants={itemVariants} className="w-full flex justify-center">
              <InteractiveTravelCard
                title={measure.title}
                subtitle={measure.subtitle}
                imageUrl={measure.imageUrl}
                actionText="Explore Solution"
                href={measure.href}
                onActionClick={() => {
                  setActiveModalId(measure.id);
                }}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Render Data Modal */}
      {activeMeasure && (
        <DataModal
          isOpen={activeModalId !== null}
          onClose={() => setActiveModalId(null)}
          title={activeMeasure.title}
          subtitle={activeMeasure.subtitle}
          data={activeMeasure.data}
          imageUrl={activeMeasure.imageUrl}
          href={activeMeasure.href}
        />
      )}
    </section>
  );
}
