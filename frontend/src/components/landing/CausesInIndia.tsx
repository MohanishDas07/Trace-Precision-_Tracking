"use client";
import React from 'react';
import ScrollFade from './ScrollFade';
import { ImageAutoSlider } from "@/components/ui/image-auto-slider";

const causes = [
  {
    title: "Unrelenting Urban Sprawl",
    description: "Megacities expand relentlessly, driving massive energy consumption and an explosion in vehicular emissions that choke the skies."
  },
  {
    title: "The Industrial Price",
    description: "Unfiltered industrial exhaust and heavy reliance on coal power plants continue to inject toxic pollutants directly into our atmosphere."
  }
];

export default function CausesInIndia() {
  return (
    <section style={{ padding: '4rem 2rem 8rem', backgroundColor: 'transparent' }}>
      <div className="container" style={{ maxWidth: '1600px', margin: '0 auto' }}>
        <ScrollFade>
          <h2 
            className="font-serif"
            style={{ 
              fontSize: 'clamp(2.5rem, 5vw, 4rem)', 
              textAlign: 'center', 
              marginBottom: '1rem',
              letterSpacing: '-0.02em'
            }}
          >
            Causes of Carbon Emission in India
          </h2>
        </ScrollFade>

        {/* The seamless infinite auto-slider with text overlays */}
        <ScrollFade delay={0.2}>
          <ImageAutoSlider />
        </ScrollFade>

      </div>
    </section>
  );
}
