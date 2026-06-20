"use client";
import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import CausesInIndia from "@/components/landing/CausesInIndia";
import PreventiveMeasures from "@/components/landing/PreventiveMeasures";
import Demo from "@/components/ui/demo";
import { AnimatedHeading } from "@/components/ui/AnimatedHeading";
import { FadeIn } from "@/components/ui/FadeIn";

export default function Home() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [opacity, setOpacity] = useState(0);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    let animationFrameId: number;
    const fadeDuration = 0.5;

    const handleLoop = () => {
      if (!video) return;
      const { currentTime, duration } = video;
      
      // Safety check for duration
      if (!duration) {
        animationFrameId = requestAnimationFrame(handleLoop);
        return;
      }

      // Fade in over 0.5s at the start
      if (currentTime <= fadeDuration) {
        setOpacity(currentTime / fadeDuration);
      } 
      // Fade out over 0.5s before the end
      else if (currentTime >= duration - fadeDuration) {
        setOpacity((duration - currentTime) / fadeDuration);
      } 
      // Fully visible in between
      else {
        setOpacity(1);
      }

      animationFrameId = requestAnimationFrame(handleLoop);
    };

    const handleEnded = () => {
      if (!video) return;
      setOpacity(0);
      setTimeout(() => {
        video.currentTime = 0;
        video.play().catch((err) => {
          if (err.name !== 'AbortError') console.error(err);
        });
      }, 100); // Wait 100ms then replay
    };

    video.addEventListener('ended', handleEnded);
    video.play().catch((err) => {
      if (err.name !== 'AbortError') console.error(err);
    });
    
    // Start the animation loop
    animationFrameId = requestAnimationFrame(handleLoop);

    return () => {
      video.removeEventListener('ended', handleEnded);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <>
      <div className="relative min-h-screen w-full flex flex-col font-sans">
        {/* Full-screen Background Video (z-0) - No Overlays */}
        <video
          src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260403_050628_c4e32401-fab4-4a27-b7a8-6e9291cd5959.mp4"
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover z-0"
        />



        {/* Hero Content (Pushed to bottom) */}
        <div className="relative z-10 w-full flex-1 flex flex-col justify-end px-6 md:px-12 lg:px-16 pb-12 lg:pb-16">
          <div className="lg:grid lg:grid-cols-2 lg:items-end w-full gap-8">
            
            {/* Left Column - Main Content */}
            <div className="max-w-2xl">
              <AnimatedHeading 
                text={"Small steps for you,\ngiant leaps for Earth."}
                className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-normal text-white mb-4"
                style={{ letterSpacing: '-0.04em' }}
              />
              
              <FadeIn delayMs={800} durationMs={1000}>
                <p className="text-base md:text-lg text-gray-300 mb-5">
                  Understand your environmental impact and take personalized actions to reduce it. Through the noise, we craft digital havens for deep work and pure flows. Start by knowing your baseline.
                </p>
              </FadeIn>

              <FadeIn delayMs={1200} durationMs={1000}>
                <div className="flex flex-wrap gap-4 mt-8">
                  <Link href="/onboarding">
                    <button className="bg-white text-black px-8 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors">
                      Calculate Baseline
                    </button>
                  </Link>
                </div>
              </FadeIn>
            </div>

            {/* Right Column - Tag */}
            <div className="flex items-end justify-start lg:justify-end mt-12 lg:mt-0">
              <FadeIn delayMs={1400} durationMs={1000}>
                <div className="liquid-glass border border-white/20 px-6 py-3 rounded-xl">
                  <span className="text-lg md:text-xl lg:text-2xl font-light text-white">
                    Awareness. Action. Impact.
                  </span>
                </div>
              </FadeIn>
            </div>

          </div>
        </div>
      </div>

      {/* New Scrollable Sections */}
      <div style={{ position: 'relative', zIndex: 10 }}>
        <CausesInIndia />
        <Demo />
        <PreventiveMeasures />
      </div>
    </>
  );
}
