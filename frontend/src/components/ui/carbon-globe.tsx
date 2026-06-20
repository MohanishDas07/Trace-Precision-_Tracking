'use client';
import { useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';

const Globe = dynamic(() => import('react-globe.gl'), { ssr: false });

export function CarbonGlobe() {
  const globeEl = useRef<any>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current) {
        setDimensions({
          width: containerRef.current.clientWidth,
          height: containerRef.current.clientHeight
        });
      }
    };
    
    // Initial measurement
    handleResize();
    // Safety fallback measurement after paint
    setTimeout(handleResize, 100);

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Accurate Top Global Emission Hotspots (Cities/Regions)
  const emissionPoints = [
    { lat: 37.5665, lng: 126.9780, size: 0.16, label: "Seoul, South Korea" },
    { lat: 23.1291, lng: 113.2644, size: 0.15, label: "Guangzhou, China" },
    { lat: 40.7128, lng: -74.0060, size: 0.14, label: "New York, USA" },
    { lat: 22.3193, lng: 114.1694, size: 0.13, label: "Hong Kong, China" },
    { lat: 34.0522, lng: -118.2437, size: 0.13, label: "Los Angeles, USA" },
    { lat: 31.2304, lng: 121.4737, size: 0.15, label: "Shanghai, China" },
    { lat: 1.3521, lng: 103.8198, size: 0.12, label: "Singapore" },
    { lat: 41.8781, lng: -87.6298, size: 0.11, label: "Chicago, USA" },
    { lat: 35.6762, lng: 139.6503, size: 0.14, label: "Tokyo, Japan" },
    { lat: 24.7136, lng: 46.6753, size: 0.12, label: "Riyadh, Saudi Arabia" },
    { lat: 55.7558, lng: 37.6173, size: 0.11, label: "Moscow, Russia" },
    { lat: 28.6139, lng: 77.2090, size: 0.13, label: "New Delhi, India" },
    { lat: -6.2088, lng: 106.8456, size: 0.10, label: "Jakarta, Indonesia" },
    { lat: 35.6892, lng: 51.3890, size: 0.11, label: "Tehran, Iran" },
    { lat: 51.1657, lng: 10.4515, size: 0.09, label: "Western Germany" }
  ];

  return (
    <div ref={containerRef} className="w-full h-full flex justify-center items-center bg-transparent overflow-hidden relative">
      {dimensions.width > 0 && (
        <Globe
          ref={globeEl}
          width={dimensions.width}
          height={dimensions.height}
          globeImageUrl="//unpkg.com/three-globe/example/img/earth-blue-marble.jpg"
          bumpImageUrl="//unpkg.com/three-globe/example/img/earth-topology.png"
          backgroundColor="rgba(0,0,0,0)"
          
          onGlobeReady={() => {
            if (globeEl.current) {
              const controls = globeEl.current.controls();
              controls.autoRotate = true;
              controls.autoRotateSpeed = 2.5; 
              
              // Safe massive zoom that doesn't clip the sphere edges
              globeEl.current.pointOfView({ altitude: 1.8 }, 1000);
            }
          }}
          
          // Solid Red Core Points Only (No Animations)
          pointsData={emissionPoints}
          pointLat="lat"
          pointLng="lng"
          pointColor={() => '#ff0000'}
          pointAltitude={0.05}
          pointRadius={1.2}
          pointsMerge={true}
        />
      )}
    </div>
  );
}
