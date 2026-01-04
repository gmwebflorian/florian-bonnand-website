export const CompassIcon = ({ className = "w-16 h-16" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Outer rings with decorative details */}
    <circle cx="100" cy="100" r="95" stroke="currentColor" strokeWidth="2" fill="none" opacity="0.3" />
    <circle cx="100" cy="100" r="90" stroke="currentColor" strokeWidth="1.5" fill="none" />
    <circle cx="100" cy="100" r="85" stroke="currentColor" strokeWidth="0.5" fill="none" opacity="0.5" />

    {/* Degree markers - outer */}
    {Array.from({ length: 72 }).map((_, i) => {
      const angle = (i * 5 * Math.PI) / 180;
      const isMajor = i % 2 === 0;
      const r1 = 85;
      const r2 = isMajor ? 78 : 81;
      return (
        <line
          key={i}
          x1={100 + r1 * Math.sin(angle)}
          y1={100 - r1 * Math.cos(angle)}
          x2={100 + r2 * Math.sin(angle)}
          y2={100 - r2 * Math.cos(angle)}
          stroke="currentColor"
          strokeWidth={isMajor ? "1.5" : "0.8"}
          opacity={isMajor ? "0.8" : "0.4"}
        />
      );
    })}
        {/* Inner decorative ring */}
    <circle cx="100" cy="100" r="75" stroke="currentColor" strokeWidth="0.5" fill="none" opacity="0.3" />
    {/* Main compass points - 16 point compass rose */}
    {[
      { angle: 0, length: 65, label: 'N' },
      { angle: 22.5, length: 35 },
      { angle: 45, length: 45, label: 'NE' },
      { angle: 67.5, length: 35 },
      { angle: 90, length: 65, label: 'E' },
      { angle: 112.5, length: 35 },
      { angle: 135, length: 45, label: 'SE' },
      { angle: 157.5, length: 35 },
      { angle: 180, length: 65, label: 'S' },
      { angle: 202.5, length: 35 },
      { angle: 225, length: 45, label: 'SW' },
      { angle: 247.5, length: 35 },
      { angle: 270, length: 65, label: 'W' },
      { angle: 292.5, length: 35 },
      { angle: 315, length: 45, label: 'NW' },
      { angle: 337.5, length: 35 },
    ].map(({ angle, length, label }, i) => {
      const rad = (angle * Math.PI) / 180;
      const isMajor = angle % 90 === 0;
      const isSecondary = angle % 45 === 0 && angle % 90 !== 0;

      return (
        <g key={i}>
          {/* Point ray */}
          <path
            d={`M 100 100 L ${100 + length * Math.sin(rad)} ${100 - length * Math.cos(rad)}`}
            stroke="currentColor"
            strokeWidth={isMajor ? "2.5" : isSecondary ? "2" : "1.5"}
            strokeLinecap="round"
            opacity={isMajor ? "1" : isSecondary ? "0.8" : "0.6"}
          />

          {/* Decorative diamond at point end */}
          <circle
            cx={100 + (length + 3) * Math.sin(rad)}
            cy={100 - (length + 3) * Math.cos(rad)}
            r={isMajor ? "3" : isSecondary ? "2" : "1.5"}
            fill="currentColor"
            opacity={isMajor ? "1" : "0.7"}
          />

          {/* Label */}
          {label && (
            <text
              x={100 + (length + 12) * Math.sin(rad)}
              y={100 - (length + 12) * Math.cos(rad)}
              textAnchor="middle"
              dominantBaseline="middle"
              className="text-xs font-bold"
              fill="currentColor"
              opacity="0.9"
            >
              {label}
            </text>
          )}
        </g>
      );
    })}

    {/* Central ornament */}
    <circle cx="100" cy="100" r="12" fill="currentColor" opacity="0.1" />
    <circle cx="100" cy="100" r="10" stroke="currentColor" strokeWidth="1.5" fill="none" />
    <circle cx="100" cy="100" r="7" stroke="currentColor" strokeWidth="1" fill="none" opacity="0.5" />
    <circle cx="100" cy="100" r="3" fill="currentColor" />

    {/* Decorative outer ornaments */}
    {[0, 90, 180, 270].map((angle, i) => {
      const rad = (angle * Math.PI) / 180;
      const x = 100 + 90 * Math.sin(rad);
      const y = 100 - 90 * Math.cos(rad);
      return (
        <g key={`ornament-${i}`} opacity="0.4">
          <line x1={x - 3} y1={y} x2={x + 3} y2={y} stroke="currentColor" strokeWidth="0.5" />
          <line x1={x} y1={y - 3} x2={x} y2={y + 3} stroke="currentColor" strokeWidth="0.5" />
        </g>
      );
    })}
  </svg>
);

export const AnchorIcon = ({ className = "w-16 h-16" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Top ring with detail */}
    <circle cx="100" cy="30" r="16" stroke="currentColor" strokeWidth="5" fill="none" opacity="0.9" />
    <circle cx="100" cy="30" r="13" stroke="currentColor" strokeWidth="2" fill="none" opacity="0.4" />
    <circle cx="100" cy="30" r="10" stroke="currentColor" strokeWidth="1" fill="none" opacity="0.3" />

    {/* Main shaft with engraving details */}
    <rect x="95" y="46" width="10" height="105" fill="currentColor" rx="1" />

    {/* Shaft engraving lines */}
    {Array.from({ length: 15 }).map((_, i) => (
      <line
        key={`shaft-line-${i}`}
        x1="92"
        y1={50 + i * 7}
        x2="108"
        y2={50 + i * 7}
        stroke="currentColor"
        strokeWidth="0.5"
        opacity="0.3"
      />
    ))}

    {/* Decorative bands on shaft */}
    <rect x="92" y="60" width="16" height="4" fill="currentColor" opacity="0.8" />
    <rect x="92" y="130" width="16" height="4" fill="currentColor" opacity="0.8" />

    {/* Cross bar (stock) with detailed ends */}
    <rect x="40" y="90" width="120" height="8" fill="currentColor" rx="2" />
    <rect x="40" y="92" width="120" height="4" fill="currentColor" opacity="0.3" />

    {/* Stock end details */}
    <circle cx="40" cy="94" r="6" fill="currentColor" />
    <circle cx="160" cy="94" r="6" fill="currentColor" />
    <circle cx="40" cy="94" r="3" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.4" />
    <circle cx="160" cy="94" r="3" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.4" />

    {/* Rope wrapped around stock */}
    <path
      d="M 50 90 Q 55 85 60 90 Q 65 95 70 90 Q 75 85 80 90"
      stroke="currentColor"
      strokeWidth="2"
      fill="none"
      opacity="0.6"
    />
    <path
      d="M 120 90 Q 125 85 130 90 Q 135 95 140 90 Q 145 85 150 90"
      stroke="currentColor"
      strokeWidth="2"
      fill="none"
      opacity="0.6"
    />

    {/* Left fluke */}
    <path
      d="M 100 151 Q 60 145 40 165 Q 35 170 30 175 L 35 180 Q 40 175 45 175 Q 65 175 80 160 Q 90 150 100 151"
      fill="currentColor"
      opacity="0.9"
    />

    {/* Right fluke */}
    <path
      d="M 100 151 Q 140 145 160 165 Q 165 170 170 175 L 165 180 Q 160 175 155 175 Q 135 175 120 160 Q 110 150 100 151"
      fill="currentColor"
      opacity="0.9"
    />

    {/* Fluke engraving details */}
    <path d="M 45 170 Q 60 165 75 155" stroke="currentColor" strokeWidth="1.5" opacity="0.3" />
    <path d="M 40 173 Q 55 168 70 158" stroke="currentColor" strokeWidth="1" opacity="0.3" />
    <path d="M 155 170 Q 140 165 125 155" stroke="currentColor" strokeWidth="1.5" opacity="0.3" />
    <path d="M 160 173 Q 145 168 130 158" stroke="currentColor" strokeWidth="1" opacity="0.3" />

    {/* Fluke tips */}
    <ellipse cx="33" cy="177" rx="5" ry="7" transform="rotate(-30 33 177)" fill="currentColor" />
    <ellipse cx="167" cy="177" rx="5" ry="7" transform="rotate(30 167 177)" fill="currentColor" />

    {/* Crown (bottom point) */}
    <path
      d="M 100 151 L 95 165 Q 100 170 105 165 Z"
      fill="currentColor"
      opacity="0.8"
    />

    {/* Additional texture lines on flukes */}
    {[-1, 1].map((side) => (
      <g key={`fluke-texture-${side}`}>
        {Array.from({ length: 3 }).map((_, i) => (
          <path
            key={`texture-${i}`}
            d={`M ${100 + side * (20 + i * 10)} ${155 + i * 5} Q ${100 + side * (15 + i * 10)} ${160 + i * 5} ${100 + side * (10 + i * 10)} ${165 + i * 5}`}
            stroke="currentColor"
            strokeWidth="0.5"
            opacity="0.2"
            fill="none"
          />
        ))}
      </g>
    ))}
  </svg>
);

export const HelmIcon = ({ className = "w-16 h-16" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Outer rim with wood grain effect */}
    <circle cx="100" cy="100" r="90" stroke="currentColor" strokeWidth="8" fill="none" opacity="0.9" />
    <circle cx="100" cy="100" r="86" stroke="currentColor" strokeWidth="2" fill="none" opacity="0.3" />
    <circle cx="100" cy="100" r="82" stroke="currentColor" strokeWidth="1" fill="none" opacity="0.2" />

    {/* Inner rim */}
    <circle cx="100" cy="100" r="75" stroke="currentColor" strokeWidth="3" fill="none" opacity="0.6" />

    {/* Decorative bolts on rim */}
    {Array.from({ length: 24 }).map((_, i) => {
      const angle = (i * 15 * Math.PI) / 180;
      const x = 100 + 83 * Math.cos(angle);
      const y = 100 + 83 * Math.sin(angle);
      return (
        <circle key={`bolt-${i}`} cx={x} cy={y} r="1.5" fill="currentColor" opacity="0.6" />
      );
    })}

    {/* 8 spokes */}
    {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, index) => {
      const rad = (angle * Math.PI) / 180;
      const x1 = 100 + 20 * Math.cos(rad);
      const y1 = 100 + 20 * Math.sin(rad);
      const x2 = 100 + 75 * Math.cos(rad);
      const y2 = 100 + 75 * Math.sin(rad);
      const handleX = 100 + 90 * Math.cos(rad);
      const handleY = 100 + 90 * Math.sin(rad);

      return (
        <g key={angle}>
          {/* Main spoke with perspective */}
          <path
            d={`M ${x1} ${y1} L ${x2} ${y2}`}
            stroke="currentColor"
            strokeWidth="5"
            strokeLinecap="round"
          />

          {/* Wood grain lines */}
          <path
            d={`M ${x1 + 2 * Math.sin(rad)} ${y1 - 2 * Math.cos(rad)} L ${x2 + 2 * Math.sin(rad)} ${y2 - 2 * Math.cos(rad)}`}
            stroke="currentColor"
            strokeWidth="0.5"
            opacity="0.3"
          />
          <path
            d={`M ${x1 - 2 * Math.sin(rad)} ${y1 + 2 * Math.cos(rad)} L ${x2 - 2 * Math.sin(rad)} ${y2 + 2 * Math.cos(rad)}`}
            stroke="currentColor"
            strokeWidth="0.5"
            opacity="0.3"
          />

          {/* Handle */}
          <ellipse
            cx={handleX}
            cy={handleY}
            rx="8"
            ry="12"
            transform={`rotate(${angle} ${handleX} ${handleY})`}
            fill="currentColor"
            opacity="0.8"
          />
          <ellipse
            cx={handleX}
            cy={handleY}
            rx="6"
            ry="10"
            transform={`rotate(${angle} ${handleX} ${handleY})`}
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
            opacity="0.4"
          />
        </g>
      );
    })}

    {/* Central hub */}
    <circle cx="100" cy="100" r="20" fill="currentColor" opacity="0.1" />
    <circle cx="100" cy="100" r="18" stroke="currentColor" strokeWidth="2" fill="none" />
    <circle cx="100" cy="100" r="15" stroke="currentColor" strokeWidth="1.5" fill="none" opacity="0.5" />
    <circle cx="100" cy="100" r="12" stroke="currentColor" strokeWidth="1" fill="none" opacity="0.3" />

    {/* Central bolts */}
    {[0, 90, 180, 270].map((angle, i) => {
      const rad = (angle * Math.PI) / 180;
      const x = 100 + 16 * Math.cos(rad);
      const y = 100 + 16 * Math.sin(rad);
      return (
        <g key={`center-bolt-${i}`}>
          <circle cx={x} cy={y} r="2" fill="currentColor" opacity="0.7" />
          <circle cx={x} cy={y} r="1" fill="currentColor" opacity="0.3" />
        </g>
      );
    })}

    {/* Center dot */}
    <circle cx="100" cy="100" r="4" fill="currentColor" />
  </svg>
);

export const WaveIcon = ({ className = "w-full h-8" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 1200 120" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
    {/* Multiple layers of waves with foam details */}

    {/* Back wave - subtle */}
    <path
      d="M 0 50 Q 100 30 200 50 Q 300 70 400 50 Q 500 30 600 50 Q 700 70 800 50 Q 900 30 1000 50 Q 1100 70 1200 50 L 1200 120 L 0 120 Z"
      fill="currentColor"
      opacity="0.05"
    />

    {/* Mid wave */}
    <path
      d="M 0 60 Q 120 40 240 60 Q 360 80 480 60 Q 600 40 720 60 Q 840 80 960 60 Q 1080 40 1200 60 L 1200 120 L 0 120 Z"
      fill="currentColor"
      opacity="0.1"
    />

    {/* Front wave with detail */}
    <path
      d="M 0 70 Q 150 50 300 70 Q 450 90 600 70 Q 750 50 900 70 Q 1050 90 1200 70 L 1200 120 L 0 120 Z"
      fill="currentColor"
      opacity="0.15"
    />

    {/* Wave crests - detailed lines */}
    <path
      d="M 0 50 Q 100 35 200 50 T 400 50 T 600 50 T 800 50 T 1000 50 T 1200 50"
      stroke="currentColor"
      strokeWidth="1.5"
      fill="none"
      opacity="0.2"
    />

    <path
      d="M 0 60 Q 120 45 240 60 T 480 60 T 720 60 T 960 60 T 1200 60"
      stroke="currentColor"
      strokeWidth="2"
      fill="none"
      opacity="0.3"
    />

    <path
      d="M 0 70 Q 150 55 300 70 T 600 70 T 900 70 T 1200 70"
      stroke="currentColor"
      strokeWidth="2.5"
      fill="none"
      opacity="0.4"
    />

    {/* Foam caps on waves */}
    {[150, 450, 750, 1050].map((x, i) => (
      <g key={`foam-${i}`} opacity="0.25">
        <ellipse cx={x} cy="52" rx="20" ry="3" fill="currentColor" />
        <ellipse cx={x + 10} cy="54" rx="15" ry="2" fill="currentColor" opacity="0.5" />
        <ellipse cx={x - 10} cy="54" rx="12" ry="2" fill="currentColor" opacity="0.5" />
      </g>
    ))}
  </svg>
);

export const RopeKnotIcon = ({ className = "w-12 h-12" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Figure-eight knot with detailed rope texture */}

    {/* Bottom left rope */}
    <path
      d="M 20 140 Q 40 130 60 140 Q 70 145 80 140 Q 90 135 100 140"
      stroke="currentColor"
      strokeWidth="14"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
      opacity="0.9"
    />

    {/* Top right rope */}
    <path
      d="M 180 60 Q 160 70 140 60 Q 130 55 120 60 Q 110 65 100 60"
      stroke="currentColor"
      strokeWidth="14"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
      opacity="0.9"
    />

    {/* Main knot - over/under strands */}
    <path
      d="M 100 60 Q 85 75 75 95 Q 70 110 85 120"
      stroke="currentColor"
      strokeWidth="16"
      strokeLinecap="round"
      fill="none"
    />

    <path
      d="M 100 140 Q 110 125 115 110 Q 120 90 110 75 Q 105 65 100 60"
      stroke="currentColor"
      strokeWidth="16"
      strokeLinecap="round"
      fill="none"
      opacity="0.8"
    />

    {/* Rope texture - twisting lines */}
    {[-6, -3, 0, 3, 6].map((offset, idx) => (
      <g key={`texture-${offset}`} opacity={0.15 + idx * 0.05}>
        <path
          d={`M ${20 + offset} 140 Q ${40 + offset} 130 ${60 + offset} 140 Q ${70 + offset} 145 ${80 + offset} 140 Q ${90 + offset} 135 ${100 + offset} 140`}
          stroke="currentColor"
          strokeWidth="1"
          fill="none"
        />
        <path
          d={`M ${180 + offset} 60 Q ${160 + offset} 70 ${140 + offset} 60 Q ${130 + offset} 55 ${120 + offset} 60 Q ${110 + offset} 65 ${100 + offset} 60`}
          stroke="currentColor"
          strokeWidth="1"
          fill="none"
        />
      </g>
    ))}

    {/* Rope twist patterns - diagonal hatching */}
    {Array.from({ length: 10 }).map((_, i) => {
      const x1 = 20 + i * 8;
      const y1 = 140 + (i % 3) * 2;
      return (
        <g key={`twist-bottom-${i}`} opacity="0.3">
          <line x1={x1} y1={y1 - 6} x2={x1 + 4} y2={y1 + 6} stroke="currentColor" strokeWidth="0.8" />
          <line x1={x1 + 2} y1={y1 - 6} x2={x1 + 6} y2={y1 + 6} stroke="currentColor" strokeWidth="0.5" />
        </g>
      );
    })}

    {Array.from({ length: 10 }).map((_, i) => {
      const x1 = 180 - i * 8;
      const y1 = 60 + (i % 3) * 2;
      return (
        <g key={`twist-top-${i}`} opacity="0.3">
          <line x1={x1} y1={y1 - 6} x2={x1 - 4} y2={y1 + 6} stroke="currentColor" strokeWidth="0.8" />
          <line x1={x1 - 2} y1={y1 - 6} x2={x1 - 6} y2={y1 + 6} stroke="currentColor" strokeWidth="0.5" />
        </g>
      );
    })}

    {/* Knot detail lines */}
    <path
      d="M 95 65 Q 88 78 78 92"
      stroke="currentColor"
      strokeWidth="1"
      opacity="0.3"
      fill="none"
    />
    <path
      d="M 105 135 Q 112 122 118 108"
      stroke="currentColor"
      strokeWidth="1"
      opacity="0.3"
      fill="none"
    />

    {/* Shadow/depth */}
    <ellipse cx="95" cy="100" rx="28" ry="35" fill="currentColor" opacity="0.08" />
  </svg>
);

export const LighthouseIcon = ({ className = "w-16 h-16" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Base/Foundation */}
    <path d="M 70 180 L 130 180 L 125 170 L 75 170 Z" fill="currentColor" opacity="0.9" />
    <rect x="65" y="175" width="70" height="8" fill="currentColor" />

    {/* Main tower body with perspective */}
    <path d="M 85 170 L 115 170 L 110 80 L 90 80 Z" fill="currentColor" opacity="0.85" />

    {/* Brick/stone texture on tower */}
    {Array.from({ length: 15 }).map((_, i) => (
      <g key={`tower-line-${i}`} opacity="0.2">
        <line
          x1={85 + (110 - 90) * (i / 15)}
          y1={170 - i * 6}
          x2={115 - (110 - 90) * (i / 15)}
          y2={170 - i * 6}
          stroke="currentColor"
          strokeWidth="0.5"
        />
      </g>
    ))}

    {/* Red/white stripes pattern */}
    <path d="M 91 140 L 109 140 L 107.5 120 L 92.5 120 Z" fill="currentColor" opacity="0.3" />
    <path d="M 94 100 L 106 100 L 104.5 80 L 95.5 80 Z" fill="currentColor" opacity="0.3" />

    {/* Gallery/balcony */}
    <rect x="85" y="75" width="30" height="5" fill="currentColor" />
    <path d="M 80 75 L 120 75 L 118 73 L 82 73 Z" fill="currentColor" opacity="0.6" />

    {/* Railing details */}
    {Array.from({ length: 12 }).map((_, i) => (
      <line
        key={`rail-${i}`}
        x1={85 + i * 2.5}
        y1="73"
        x2={85 + i * 2.5}
        y2="75"
        stroke="currentColor"
        strokeWidth="0.5"
        opacity="0.5"
      />
    ))}

    {/* Lantern room */}
    <path d="M 88 73 L 112 73 L 110 55 L 90 55 Z" fill="currentColor" opacity="0.4" />

    {/* Window panes in lantern */}
    {[-8, 0, 8].map((offset, i) => (
      <rect
        key={`window-${i}`}
        x={100 + offset - 2}
        y="60"
        width="4"
        height="10"
        fill="currentColor"
        opacity="0.3"
      />
    ))}

    {/* Roof/cupola */}
    <path d="M 86 55 L 100 40 L 114 55 Z" fill="currentColor" />

    {/* Roof details */}
    <path d="M 90 52 L 100 44 L 110 52" stroke="currentColor" strokeWidth="0.5" opacity="0.3" fill="none" />
    <path d="M 93 50 L 100 45 L 107 50" stroke="currentColor" strokeWidth="0.5" opacity="0.3" fill="none" />

    {/* Lightning rod */}
    <rect x="99" y="30" width="2" height="10" fill="currentColor" />
    <circle cx="100" cy="28" r="2" fill="currentColor" />

    {/* Light rays */}
    {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => {
      const rad = (angle * Math.PI) / 180;
      const x1 = 100 + 15 * Math.cos(rad);
      const y1 = 64 + 15 * Math.sin(rad);
      const x2 = 100 + 30 * Math.cos(rad);
      const y2 = 64 + 30 * Math.sin(rad);
      return (
        <line
          key={`ray-${i}`}
          x1={x1}
          y1={y1}
          x2={x2}
          y2={y2}
          stroke="currentColor"
          strokeWidth={i % 2 === 0 ? "1.5" : "1"}
          opacity="0.4"
          strokeLinecap="round"
        />
      );
    })}

    {/* Light glow */}
    <circle cx="100" cy="64" r="12" fill="currentColor" opacity="0.1" />
    <circle cx="100" cy="64" r="8" fill="currentColor" opacity="0.15" />

    {/* Rock base */}
    <ellipse cx="100" cy="183" rx="45" ry="8" fill="currentColor" opacity="0.2" />

    {/* Waves at base */}
    <path
      d="M 55 185 Q 70 182 85 185 Q 100 188 115 185 Q 130 182 145 185"
      stroke="currentColor"
      strokeWidth="1.5"
      fill="none"
      opacity="0.3"
    />
  </svg>
);
