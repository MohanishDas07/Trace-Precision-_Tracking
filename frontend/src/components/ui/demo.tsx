'use client';

import { useState, useEffect, useRef } from 'react';
import ScrollExpandMedia from '@/components/ui/scroll-expansion-hero';

interface MediaAbout {
  overview: string;
  conclusion: string;
}

interface MediaContent {
  src: string;
  poster?: string;
  background: string;
  title: string;
  date: string;
  scrollToExpand: string;
  about: MediaAbout;
}

interface MediaContentCollection {
  [key: string]: MediaContent;
}

const sampleMediaContent: MediaContentCollection = {
  video: {
    src: 'https://me7aitdbxq.ufs.sh/f/2wsMIGDMQRdYuZ5R8ahEEZ4aQK56LizRdfBSqeDMsmUIrJN1',
    poster:
      'https://images.pexels.com/videos/5752729/space-earth-universe-cosmos-5752729.jpeg',
    background:
      'https://me7aitdbxq.ufs.sh/f/2wsMIGDMQRdYMNjMlBUYHaeYpxduXPVNwf8mnFA61L7rkcoS',
    title: 'Immersive Video Experience',
    date: 'Cosmic Journey',
    scrollToExpand: 'Scroll to Expand Demo',
    about: {
      overview:
        'This is a demonstration of the ScrollExpandMedia component with a video. As you scroll, the video expands to fill more of the screen, creating an immersive experience. This component is perfect for showcasing video content in a modern, interactive way.',
      conclusion:
        'The ScrollExpandMedia component provides a unique way to engage users with your content through interactive scrolling. Try switching between video and image modes to see different implementations.',
    },
  },
  image: {
    src: 'https://images.unsplash.com/photo-1682687982501-1e58ab814714?q=80&w=1280&auto=format&fit=crop',
    background:
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=1920&auto=format&fit=crop',
    title: 'Dynamic Image Showcase',
    date: 'Underwater Adventure',
    scrollToExpand: 'Scroll to Expand Demo',
    about: {
      overview:
        'This is a demonstration of the ScrollExpandMedia component with an image. The same smooth expansion effect works beautifully with static images, allowing you to create engaging visual experiences without video content.',
      conclusion:
        'The ScrollExpandMedia component works equally well with images and videos. This flexibility allows you to choose the media type that best suits your content while maintaining the same engaging user experience.',
    },
  },
};

const MediaContent = ({ mediaType }: { mediaType: 'video' | 'image' }) => {
  const currentMedia = sampleMediaContent[mediaType];

  return (
    <div className='max-w-4xl mx-auto'>
      <h2 className='text-3xl font-bold mb-6 text-black dark:text-white'>
        About This Component
      </h2>
      <p className='text-lg mb-8 text-black dark:text-white'>
        {currentMedia.about.overview}
      </p>

      <p className='text-lg mb-8 text-black dark:text-white'>
        {currentMedia.about.conclusion}
      </p>
    </div>
  );
};

export const VideoExpansionTextBlend = () => {
  const mediaType = 'video';
  const currentMedia = sampleMediaContent[mediaType];

  useEffect(() => {
    window.scrollTo(0, 0);

    const resetEvent = new Event('resetSection');
    window.dispatchEvent(resetEvent);
  }, []);

  return (
    <div className='min-h-screen'>
      <ScrollExpandMedia
        mediaType={mediaType}
        mediaSrc={currentMedia.src}
        posterSrc={currentMedia.poster}
        bgImageSrc={currentMedia.background}
        title={currentMedia.title}
        date={currentMedia.date}
        scrollToExpand={currentMedia.scrollToExpand}
        textBlend
      >
        <MediaContent mediaType={mediaType} />
      </ScrollExpandMedia>
    </div>
  );
};

export const ImageExpansionTextBlend = () => {
  const mediaType = 'image';
  const currentMedia = sampleMediaContent[mediaType];

  useEffect(() => {
    window.scrollTo(0, 0);

    const resetEvent = new Event('resetSection');
    window.dispatchEvent(resetEvent);
  }, []);

  return (
    <div className='min-h-screen'>
      <ScrollExpandMedia
        mediaType={mediaType}
        mediaSrc={currentMedia.src}
        bgImageSrc={currentMedia.background}
        title={currentMedia.title}
        date={currentMedia.date}
        scrollToExpand={currentMedia.scrollToExpand}
        textBlend
      >
        <MediaContent mediaType={mediaType} />
      </ScrollExpandMedia>
    </div>
  );
};

export const VideoExpansion = () => {
  const mediaType = 'video';
  const currentMedia = sampleMediaContent[mediaType];

  useEffect(() => {
    window.scrollTo(0, 0);

    const resetEvent = new Event('resetSection');
    window.dispatchEvent(resetEvent);
  }, []);

  return (
    <div className='min-h-screen'>
      <ScrollExpandMedia
        mediaType={mediaType}
        mediaSrc={currentMedia.src}
        posterSrc={currentMedia.poster}
        bgImageSrc={currentMedia.background}
        title={currentMedia.title}
        date={currentMedia.date}
        scrollToExpand={currentMedia.scrollToExpand}
      >
        <MediaContent mediaType={mediaType} />
      </ScrollExpandMedia>
    </div>
  );
};

export const ImageExpansion = () => {
  const mediaType = 'image';
  const currentMedia = sampleMediaContent[mediaType];

  useEffect(() => {
    window.scrollTo(0, 0);

    const resetEvent = new Event('resetSection');
    window.dispatchEvent(resetEvent);
  }, []);

  return (
    <div className='min-h-screen'>
      <ScrollExpandMedia
        mediaType={mediaType}
        mediaSrc={currentMedia.src}
        bgImageSrc={currentMedia.background}
        title={currentMedia.title}
        date={currentMedia.date}
        scrollToExpand={currentMedia.scrollToExpand}
      >
        <MediaContent mediaType={mediaType} />
      </ScrollExpandMedia>
    </div>
  );
};


const HoverVideoCard = ({ videoId, title, description }: { videoId: string, title: string, description: string }) => {
  const [isHovered, setIsHovered] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const handleMouseEnter = () => {
    setIsHovered(true);
    if (iframeRef.current?.contentWindow) {
      iframeRef.current.contentWindow.postMessage(JSON.stringify({ event: 'command', func: 'unMute', args: [] }), '*');
      iframeRef.current.contentWindow.postMessage(JSON.stringify({ event: 'command', func: 'playVideo', args: [] }), '*');
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (iframeRef.current?.contentWindow) {
      iframeRef.current.contentWindow.postMessage(JSON.stringify({ event: 'command', func: 'mute', args: [] }), '*');
      iframeRef.current.contentWindow.postMessage(JSON.stringify({ event: 'command', func: 'pauseVideo', args: [] }), '*');
    }
  };

  return (
    <div 
      className='flex flex-col bg-white/5 dark:bg-black/20 rounded-2xl border border-white/10 overflow-hidden shadow-lg transition-transform hover:-translate-y-1 duration-300 cursor-pointer'
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="w-full aspect-[9/16] relative bg-black overflow-hidden">
        {/* Thumbnail Layer */}
        <img 
          src={`https://img.youtube.com/vi/${videoId}/hqdefault.jpg`} 
          alt={title} 
          className={`w-full h-full object-cover absolute inset-0 transition-opacity duration-300 pointer-events-none ${isHovered ? 'opacity-0 z-0' : 'opacity-100 z-20'}`} 
        />
        
        {/* Video Layer */}
        <iframe 
          ref={iframeRef}
          src={`https://www.youtube.com/embed/${videoId}?enablejsapi=1&mute=1&controls=0&rel=0&modestbranding=1&loop=1&playlist=${videoId}`} 
          className="w-full h-full absolute inset-0 z-10 pointer-events-none" 
          frameBorder="0" 
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
          allowFullScreen
        ></iframe>
      </div>
      <div className='p-6'>
        <h3 className='text-xl font-bold text-black dark:text-white mb-2'>{title}</h3>
        <p className='text-black/70 dark:text-white/70 text-base leading-relaxed'>{description}</p>
      </div>
    </div>
  );
};

import { CarbonGlobe } from './carbon-globe';

const RisksAhead = () => {
  return (
    <div id="risks" className='min-h-screen pt-10 flex flex-col relative'>
      <div className="w-full flex flex-col items-center pt-10 pb-8 z-20 relative px-4">
        <h2 className="text-5xl md:text-7xl font-serif text-white mb-3 tracking-tight text-center">Global Emissions Hotspots</h2>
        <p className="text-lg md:text-xl text-white/70 tracking-widest uppercase text-center">Tracking the Source</p>
      </div>
      <div className="w-full h-[65vh] relative z-10 flex flex-col items-center justify-center">
        <div className="w-full h-full max-w-[1200px] mx-auto cursor-grab active:cursor-grabbing">
          <CarbonGlobe />
        </div>
      </div>

      <div className='max-w-[1400px] mx-auto py-16 relative z-20 px-6 lg:px-12'>
        <h2 className='text-5xl md:text-7xl font-bold mb-8 text-black dark:text-white font-serif tracking-tight'>
          The Cost on Human Life
        </h2>
        <p className='text-xl md:text-3xl mb-12 text-black/80 dark:text-white/80 font-sans leading-relaxed max-w-5xl'>
          Extensive carbon emissions and the resulting air pollution don't just harm the planet—they pose a severe and direct threat to human health. Microscopic particulate matter (PM2.5) penetrates deep into the lungs and enters the bloodstream.
        </p>

        <div className='grid grid-cols-1 sm:grid-cols-2 gap-8 md:gap-12 mb-8'>
          <HoverVideoCard 
            videoId="Yh9FeEQmnzc" 
            title="Respiratory Diseases" 
            description="Chronic asthma, severe bronchitis, and irreversible decreased lung function." 
          />
          <HoverVideoCard 
            videoId="tc_T1KtUmFI" 
            title="Cardiovascular Issues" 
            description="Drastically increased risk of heart attacks, strokes, and irregular heartbeats." 
          />
          <HoverVideoCard 
            videoId="BxFX29b75Sk" 
            title="Cancers" 
            description="Prolonged exposure to toxic industrial and vehicular pollutants is a leading cause of lung cancer." 
          />
          <HoverVideoCard 
            videoId="54ZOxgFJaP0" 
            title="Neurological Impact" 
            description="Emerging studies strongly link air pollution to cognitive decline, Alzheimer's, and other disorders." 
          />
        </div>
      </div>
    </div>
  );
};

export default RisksAhead;
