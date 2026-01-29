'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';

interface Brand {
  name: string;
  logo: string;
  logoBlue: string;
}

const BrandCarousel = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const positionRef = useRef(0);
  const animationFrameRef = useRef<number>();
  const isPausedRef = useRef(false);

  // Tes marques avec les deux versions de logos
  const brands: Brand[] = [
    { 
      name: "Pediakid", 
      logo: "/images/brands/pediakid.webp",
      logoBlue: "/images/brands/pediakid-blue.webp"
    },
    { 
      name: "Draeger Paris", 
      logo: "/images/brands/draeger.webp",
      logoBlue: "/images/brands/draeger-blue.webp"
    },
    { 
      name: "Le Petit Fournisseur", 
      logo: "/images/brands/lpf.webp",
      logoBlue: "/images/brands/lpf-blue.webp"
    },
    { 
      name: "STC Nutrition", 
      logo: "/images/brands/stc-nutrition.webp",
      logoBlue: "/images/brands/stc-nutrition-blue.webp"
    },
    { 
      name: "LODD", 
      logo: "/images/brands/lodd.webp",
      logoBlue: "/images/brands/lodd-blue.webp"
    },
    { 
      name: "Bandit", 
      logo: "/images/brands/bandit.webp",
      logoBlue: "/images/brands/bandit-blue.webp"
    },
    { 
      name: "Néroliane", 
      logo: "/images/brands/neroliane.webp",
      logoBlue: "/images/brands/neroliane-blue.webp"
    },
    { 
      name: "Olioseptil", 
      logo: "/images/brands/olioseptil.webp",
      logoBlue: "/images/brands/olioseptil-blue.webp"
    },
    { 
      name: "Decoclim", 
      logo: "/images/brands/decoclim.webp",
      logoBlue: "/images/brands/decoclim-blue.webp"
    },
    { 
      name: "Aecodune", 
      logo: "/images/brands/aecodune.webp",
      logoBlue: "/images/brands/aecodune-blue.webp"
    },
    { 
      name: "Filéane", 
      logo: "/images/brands/fileane.webp",
      logoBlue: "/images/brands/fileane-blue.webp"
    },
    { 
      name: "ISN Santé", 
      logo: "/images/brands/isn.webp",
      logoBlue: "/images/brands/isn-blue.webp"
    },
  ];

  // On duplique les logos pour un défilement infini
  const duplicatedBrands = [...brands, ...brands];

  useEffect(() => {
    const carousel = carouselRef.current;
    if (!carousel) return;

    const speed = 0.5; // Ajuste la vitesse ici
    
    const animate = () => {
      if (!isPausedRef.current && carousel) {
        positionRef.current -= speed;
        
        // Réinitialise quand on atteint la moitié (boucle infinie)
        const width = carousel.scrollWidth / 2;
        if (Math.abs(positionRef.current) >= width) {
          positionRef.current = 0;
        }
        
        carousel.style.transform = `translateX(${positionRef.current}px)`;
      }
      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animationFrameRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  const handleMouseEnter = (index: number) => {
    setHoveredIndex(index);
    isPausedRef.current = true;
  };

  const handleMouseLeave = () => {
    setHoveredIndex(null);
    isPausedRef.current = false;
  };

  return (
    <div className="w-full py-12 pb-6 md:pb-12">
      <div className="container mx-auto px-4">
        {/* Titre */}
        <h3 className="text-2xl md:text-3xl font-bold text-center text-[#1e3a8a] mb-10">
          Les marques avec qui j'ai navigué
        </h3>

        {/* Container du carrousel */}
        <div className="relative -mx-4 md:-mx-8">
          <div className="overflow-hidden">
            {/* Carrousel qui défile */}
            <div 
              ref={carouselRef}
              className="flex gap-12 md:gap-16 px-4 md:px-8"
            >
              {duplicatedBrands.map((brand, index) => (
                <div
                  key={`${brand.name}-${index}`}
                  className="flex-shrink-0 flex items-center justify-center transition-transform duration-300 hover:scale-110"
                  onMouseEnter={() => handleMouseEnter(index)}
                  onMouseLeave={handleMouseLeave}
                >
                  <div className="relative w-24 h-16 md:w-32 md:h-20">
                    <Image
                      src={hoveredIndex === index ? brand.logo : brand.logoBlue}
                      alt={`Logo ${brand.name}`}
                      fill
                      className="object-contain transition-all duration-300"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BrandCarousel;