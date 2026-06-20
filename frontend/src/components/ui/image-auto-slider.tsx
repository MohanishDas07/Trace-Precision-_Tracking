import React from 'react';

export const ImageAutoSlider = () => {
  // Slides data with images and text
  const slides = [
    {
      src: "/images/user_upload_1.png",
      title: "Unrelenting Urban Sprawl",
      description: "Megacities expand relentlessly, driving massive energy consumption and an explosion in vehicular emissions that choke the skies."
    },
    {
      src: "/images/user_upload_2.png",
      title: "The Industrial Price",
      description: "Unfiltered industrial exhaust and heavy reliance on coal power plants continue to inject toxic pollutants directly into our atmosphere."
    },
    {
      src: "/images/agriculture.png",
      title: "Agricultural Practices",
      description: "Methane emissions from livestock, flooded rice paddy cultivation, and the seasonal burning of crop residue are massive contributors."
    },
    {
      src: "/images/urbanization.png",
      title: "Explosive Transportation",
      description: "Unprecedented urban growth drives emissions alongside a rapidly expanding, heavily congested fossil-fuel transport sector."
    }
  ];

  // Duplicate slides for seamless loop
  const duplicatedSlides = [...slides, ...slides, ...slides];

  return (
    <>
      <style>{`
        html, body {
          overflow-x: hidden;
        }

        @keyframes scroll-right {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        .infinite-scroll {
          animation: scroll-right 40s linear infinite;
        }

        .infinite-scroll:hover {
          animation-play-state: paused;
        }

        .scroll-container {
          mask: linear-gradient(
            90deg,
            transparent 0%,
            black 5%,
            black 95%,
            transparent 100%
          );
          -webkit-mask: linear-gradient(
            90deg,
            transparent 0%,
            black 5%,
            black 95%,
            transparent 100%
          );
        }

        .image-item {
          transition: transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275), box-shadow 0.4s ease;
        }

        .image-item:hover {
          transform: scale(1.03) translateY(-10px);
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
          z-index: 50;
        }
        
        .image-item:hover .slide-img {
          filter: brightness(1.1);
        }
      `}</style>
      
      <div className="w-full min-h-[80vh] bg-transparent relative overflow-hidden flex items-center justify-center rounded-3xl mt-4 mb-12">
        {/* Scrolling images container */}
        <div className="relative z-10 w-full flex items-center justify-center py-12">
          <div className="scroll-container w-full max-w-[1600px]">
            <div className="infinite-scroll flex gap-8 w-max px-4">
              {duplicatedSlides.map((slide, index) => (
                <div
                  key={index}
                  className="image-item relative flex-shrink-0 w-[300px] h-[400px] md:w-[450px] md:h-[550px] lg:w-[600px] lg:h-[700px] rounded-2xl overflow-hidden shadow-2xl group"
                >
                  <img
                    src={slide.src}
                    alt={slide.title}
                    className="slide-img w-full h-full object-cover transition-all duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  
                  {/* Text Overlay inside the image */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent flex flex-col justify-end p-8 md:p-10">
                    <h3 className="text-white font-serif text-3xl md:text-4xl lg:text-5xl font-bold mb-4 tracking-tight">
                      {slide.title}
                    </h3>
                    <p className="text-white/80 font-sans text-lg md:text-xl line-clamp-3 leading-relaxed">
                      {slide.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
