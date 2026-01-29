'use client';

import { WaveIcon } from '@/components/icons/maritime-icons';
import { Button } from '@/components/ui/button';
import { useEffect, useRef } from 'react';

export function Hero() {
  const compassRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (compassRef.current) {
        const rect = compassRef.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const angleRad = Math.atan2(e.clientY - centerY, e.clientX - centerX);
        const angleDeg = angleRad * (180 / Math.PI) + 90;

        const needle = compassRef.current.querySelector('.compass-needle');
        if (needle) {
          (needle as HTMLElement).style.transform = `translate(-50%, -50%) rotate(${angleDeg}deg)`;
        }
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated gradient background */}
      <div className="absolute inset-0 ocean-gradient opacity-95" />

      {/* Animated particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[
          { left: 10, top: 20, delay: 0, duration: 15 },
          { left: 25, top: 40, delay: 1, duration: 18 },
          { left: 45, top: 15, delay: 2, duration: 12 },
          { left: 60, top: 70, delay: 0.5, duration: 16 },
          { left: 75, top: 30, delay: 1.5, duration: 14 },
          { left: 15, top: 80, delay: 2.5, duration: 17 },
          { left: 85, top: 60, delay: 3, duration: 13 },
          { left: 35, top: 50, delay: 1.8, duration: 19 },
          { left: 90, top: 25, delay: 2.2, duration: 11 },
          { left: 50, top: 90, delay: 0.8, duration: 20 },
          { left: 20, top: 60, delay: 3.5, duration: 15 },
          { left: 70, top: 45, delay: 1.2, duration: 16 },
          { left: 40, top: 85, delay: 2.8, duration: 14 },
          { left: 80, top: 10, delay: 0.3, duration: 18 },
          { left: 55, top: 35, delay: 4, duration: 12 },
          { left: 30, top: 75, delay: 1.6, duration: 17 },
          { left: 65, top: 55, delay: 2.4, duration: 13 },
          { left: 95, top: 40, delay: 3.2, duration: 19 },
          { left: 12, top: 95, delay: 1.1, duration: 15 },
          { left: 48, top: 22, delay: 2.6, duration: 16 },
        ].map((particle, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white/20 rounded-full animate-float"
            style={{
              left: `${particle.left}%`,
              top: `${particle.top}%`,
              animationDelay: `${particle.delay}s`,
              animationDuration: `${particle.duration}s`,
            }}
          />
        ))}
      </div>

      {/* 3D Animated compass in background */}
      <div ref={compassRef} className="absolute inset-0 flex items-center justify-center opacity-20 pointer-events-none">
        <div className="relative w-[800px] h-[800px] animate-[spin_120s_linear_infinite]">
          {/* Compass SVG with 3D effects */}
          <svg viewBox="0 0 400 400" className="w-full h-full drop-shadow-2xl">
            <defs>
              {/* Metal gradient */}
              <radialGradient id="metalGradient" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#FFD700" stopOpacity="0.9" />
                <stop offset="30%" stopColor="#FFA500" stopOpacity="0.7" />
                <stop offset="60%" stopColor="#B8860B" stopOpacity="0.5" />
                <stop offset="100%" stopColor="#8B6914" stopOpacity="0.3" />
              </radialGradient>

              {/* Glass effect */}
              <radialGradient id="glassGradient" cx="30%" cy="30%">
                <stop offset="0%" stopColor="#ffffff" stopOpacity="0.3" />
                <stop offset="50%" stopColor="#ffffff" stopOpacity="0.1" />
                <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
              </radialGradient>

              {/* Shadow */}
              <filter id="shadow">
                <feGaussianBlur in="SourceAlpha" stdDeviation="4"/>
                <feOffset dx="2" dy="4" result="offsetblur"/>
                <feComponentTransfer>
                  <feFuncA type="linear" slope="0.3"/>
                </feComponentTransfer>
                <feMerge>
                  <feMergeNode/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>

              {/* Glow effect */}
              <filter id="glow">
                <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
                <feMerge>
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
            </defs>

            {/* Outer metallic ring with 3D effect */}
            <circle cx="200" cy="200" r="190" fill="url(#metalGradient)" filter="url(#shadow)" />
            <circle cx="200" cy="200" r="190" fill="none" stroke="#B8860B" strokeWidth="3" opacity="0.6" />
            <circle cx="200" cy="200" r="185" fill="none" stroke="#FFD700" strokeWidth="1" opacity="0.8" />

            {/* Inner ring */}
            <circle cx="200" cy="200" r="175" fill="none" stroke="#D4AF37" strokeWidth="2" opacity="0.4" />

            {/* Decorative engravings */}
            {Array.from({ length: 360 }).map((_, i) => {
              const angle = (i * Math.PI) / 180;
              const isMajor = i % 30 === 0;
              const isMinor = i % 10 === 0;
              const r1 = 175;
              const r2 = isMajor ? 155 : isMinor ? 165 : 170;
              const strokeWidth = isMajor ? 2 : isMinor ? 1.5 : 0.5;

              if (i % 2 !== 0 && !isMajor && !isMinor) return null;

              return (
                <line
                  key={i}
                  x1={200 + r1 * Math.cos(angle)}
                  y1={200 + r1 * Math.sin(angle)}
                  x2={200 + r2 * Math.cos(angle)}
                  y2={200 + r2 * Math.sin(angle)}
                  stroke="#D4AF37"
                  strokeWidth={strokeWidth}
                  opacity={isMajor ? 0.9 : 0.5}
                />
              );
            })}

            {/* Main compass rose - 32 points */}
            {Array.from({ length: 32 }).map((_, i) => {
              const angle = (i * 11.25 * Math.PI) / 180;
              const isMajor = i % 8 === 0;
              const isSecondary = i % 4 === 0;
              const length = isMajor ? 140 : isSecondary ? 100 : 60;
              const width = isMajor ? 8 : isSecondary ? 5 : 3;

              return (
                <g key={i}>
                  <path
                    d={`M 200 200 L ${200 + length * Math.cos(angle)} ${200 + length * Math.sin(angle)}`}
                    stroke="url(#metalGradient)"
                    strokeWidth={width}
                    strokeLinecap="round"
                    filter="url(#glow)"
                  />
                  {isMajor && (
                    <circle
                      cx={200 + (length + 10) * Math.cos(angle)}
                      cy={200 + (length + 10) * Math.sin(angle)}
                      r="6"
                      fill="#FFD700"
                      filter="url(#glow)"
                    />
                  )}
                </g>
              );
            })}

            {/* Center ornament with 3D effect */}
            <circle cx="200" cy="200" r="30" fill="url(#metalGradient)" filter="url(#shadow)" />
            <circle cx="200" cy="200" r="28" fill="none" stroke="#B8860B" strokeWidth="2" />
            <circle cx="200" cy="200" r="25" fill="#1e3a5f" opacity="0.8" />
            <circle cx="200" cy="200" r="20" fill="url(#metalGradient)" />
            <circle cx="200" cy="200" r="15" fill="#0a1929" />

            {/* Decorative center crosses */}
            <line x1="200" y1="185" x2="200" y2="215" stroke="#FFD700" strokeWidth="2" opacity="0.6" />
            <line x1="185" y1="200" x2="215" y2="200" stroke="#FFD700" strokeWidth="2" opacity="0.6" />

            {/* Glass overlay for realism */}
            <circle cx="200" cy="200" r="190" fill="url(#glassGradient)" />
          </svg>

          {/* Animated needle */}
          <div className="compass-needle absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transition-transform duration-300 ease-out">
            <svg width="200" height="200" viewBox="0 0 200 200" className="drop-shadow-2xl">
              <defs>
                <linearGradient id="needleGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#ff0000" />
                  <stop offset="50%" stopColor="#cc0000" />
                  <stop offset="100%" stopColor="#990000" />
                </linearGradient>
                <filter id="needleShadow">
                  <feDropShadow dx="0" dy="2" stdDeviation="3" floodOpacity="0.5"/>
                </filter>
              </defs>
              <path
                d="M 100 20 L 110 100 L 100 95 L 90 100 Z"
                fill="url(#needleGradient)"
                filter="url(#needleShadow)"
              />
              <path
                d="M 100 100 L 110 180 L 100 175 L 90 180 Z"
                fill="#e0e0e0"
                filter="url(#needleShadow)"
              />
              <circle cx="100" cy="100" r="8" fill="#1e3a5f" stroke="#FFD700" strokeWidth="2" />
            </svg>
          </div>
        </div>
      </div>

      {/* Waves decoration */}
      <div className="absolute bottom-0 left-0 right-0 text-white/20">
        <WaveIcon className="w-full h-32" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 md:px-6 text-center -mt-16 md:mt-0">
        <div className="mb-4 md:mb-8 inline-block">
          <div className="relative w-32 h-32">
            <img 
              src="/images/ship-wheel.webp" 
              alt="Barre de bateau" 
              className="w-full h-full object-contain drop-shadow-2xl animate-[swing_3s_ease-in-out_infinite]"
              style={{ transformOrigin: 'center center' }}
            />
          </div>
        </div>
<p className="text-sm sm:text-base md:text-lg italic text-white/90 mb-8 md:mb-12 max-w-3xl mx-auto leading-relaxed animate-fade-in-up">
  Tenir le cap sur Amazon, grâce à une expertise née du terrain
</p>
<h1 className="text-2xl sm:text-5xl md:text-6xl font-bold text-white mb-6 md:mb-6 max-w-5xl mx-auto maritime-text-shadow animate-fade-in">
  Consultant Amazon freelance
  <br />
  <span className="text-[hsl(var(--gold))] animate-shimmer bg-gradient-to-r from-[#FFD700] via-[#FFA500] to-[#FFD700] bg-clip-text text-transparent bg-[length:200%_auto]">
    pour marques et vendeurs professionnels
  </span>
</h1>

<p className="text-sm sm:text-base md:text-lg text-white/90 mb-8 md:mb-12 max-w-3xl mx-auto leading-relaxed animate-fade-in-up">
  Ancien vendeur Amazon et consultant marketplace freelance, 
  j'accompagne les marques françaises dans leur développement sur Amazon 
  avec une approche pragmatique, orientée rentabilité et résultats concrets.
  <br />
  <br />
  SEO Amazon, Amazon Ads, lancement de produits et structuration long terme 
  sont au cœur de mon accompagnement.
</p>

        <div className="flex justify-center items-center animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
          <Button
            onClick={scrollToContact}
            size="lg"
            className="bg-gradient-to-r from-[#FFD700] to-[#FFA500] hover:from-[#FFA500] hover:to-[#FF8C00] text-[hsl(var(--ocean-deep))] font-semibold px-8 py-6 text-lg transition-all duration-300 hover:scale-105 shadow-2xl hover:shadow-[#FFD700]/50 border-2 border-[#FFD700]/30"
          >
            Discutons de votre marque
          </Button>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="hidden md:block absolute bottom-12 left-1/2 -translate-x-1/2 animate-bounce z-20">
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex items-start justify-center p-2">
          <div className="w-1.5 h-3 bg-white/50 rounded-full animate-pulse" />
        </div>
      </div>
    </section>
  );
}
