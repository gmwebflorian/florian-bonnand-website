export const Compass3DIcon = ({ className = "w-16 h-16" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 300 300" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <radialGradient id="bronze" cx="40%" cy="40%">
        <stop offset="0%" stopColor="#f4e4c1" />
        <stop offset="30%" stopColor="#cd7f32" />
        <stop offset="70%" stopColor="#8b5a00" />
        <stop offset="100%" stopColor="#654321" />
      </radialGradient>

      <radialGradient id="gold3d" cx="30%" cy="30%">
        <stop offset="0%" stopColor="#ffd700" />
        <stop offset="50%" stopColor="#ffA500" />
        <stop offset="100%" stopColor="#cc8400" />
      </radialGradient>

      <filter id="metallic">
        <feGaussianBlur in="SourceAlpha" stdDeviation="3"/>
        <feOffset dx="2" dy="2" result="offsetblur"/>
        <feComponentTransfer>
          <feFuncA type="linear" slope="0.4"/>
        </feComponentTransfer>
        <feMerge>
          <feMergeNode/>
          <feMergeNode in="SourceGraphic"/>
        </feMerge>
      </filter>

      <filter id="emboss">
        <feGaussianBlur in="SourceAlpha" stdDeviation="2"/>
        <feOffset dx="1" dy="1"/>
        <feComponentTransfer>
          <feFuncA type="linear" slope="0.2"/>
        </feComponentTransfer>
        <feMerge>
          <feMergeNode/>
          <feMergeNode in="SourceGraphic"/>
        </feMerge>
      </filter>
    </defs>

    {/* Outer bronze ring */}
    <circle cx="150" cy="150" r="145" fill="url(#bronze)" filter="url(#metallic)" />
    <circle cx="150" cy="150" r="145" fill="none" stroke="#654321" strokeWidth="2" opacity="0.6" />
    <circle cx="150" cy="150" r="140" fill="none" stroke="#f4e4c1" strokeWidth="1" opacity="0.8" />

    {/* Inner decorative rings */}
    <circle cx="150" cy="150" r="135" fill="none" stroke="#8b5a00" strokeWidth="1.5" opacity="0.5" />
    <circle cx="150" cy="150" r="130" fill="#1a1a1a" opacity="0.3" />

    {/* Engraved degree marks */}
    {Array.from({ length: 72 }).map((_, i) => {
      const angle = (i * 5 - 90) * (Math.PI / 180);
      const isMajor = i % 6 === 0;
      const r1 = 130;
      const r2 = isMajor ? 115 : 122;
      return (
        <line
          key={i}
          x1={150 + r1 * Math.cos(angle)}
          y1={150 + r1 * Math.sin(angle)}
          x2={150 + r2 * Math.cos(angle)}
          y2={150 + r2 * Math.sin(angle)}
          stroke="url(#gold3d)"
          strokeWidth={isMajor ? 2 : 1}
          opacity={isMajor ? 1 : 0.6}
        />
      );
    })}

    {/* 16-point compass rose */}
    {Array.from({ length: 16 }).map((_, i) => {
      const angle = (i * 22.5 - 90) * (Math.PI / 180);
      const isMajor = i % 4 === 0;
      const isSecondary = i % 2 === 0;
      const length = isMajor ? 100 : isSecondary ? 70 : 50;

      return (
        <g key={i} filter="url(#emboss)">
          <path
            d={`M 150 150 L ${150 + length * Math.cos(angle)} ${150 + length * Math.sin(angle)}`}
            stroke="url(#gold3d)"
            strokeWidth={isMajor ? 6 : isSecondary ? 4 : 2.5}
            strokeLinecap="round"
          />
          {isMajor && (
            <circle
              cx={150 + (length + 8) * Math.cos(angle)}
              cy={150 + (length + 8) * Math.sin(angle)}
              r="5"
              fill="url(#gold3d)"
            />
          )}
        </g>
      );
    })}

    {/* Center medallion */}
    <circle cx="150" cy="150" r="25" fill="url(#bronze)" filter="url(#metallic)" />
    <circle cx="150" cy="150" r="22" fill="url(#gold3d)" />
    <circle cx="150" cy="150" r="18" fill="#1a1a1a" />
    <circle cx="150" cy="150" r="12" fill="url(#gold3d)" />

    {/* Center cross */}
    <path d="M 150 138 L 150 162 M 138 150 L 162 150" stroke="#1a1a1a" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

export const Helm3DIcon = ({ className = "w-16 h-16" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 300 300" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <radialGradient id="woodGradient" cx="40%" cy="40%">
        <stop offset="0%" stopColor="#d4a574" />
        <stop offset="50%" stopColor="#8b6f47" />
        <stop offset="100%" stopColor="#5c4033" />
      </radialGradient>

      <linearGradient id="woodGrain" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#8b6f47" />
        <stop offset="20%" stopColor="#a0826d" />
        <stop offset="40%" stopColor="#8b6f47" />
        <stop offset="60%" stopColor="#75614c" />
        <stop offset="80%" stopColor="#8b6f47" />
        <stop offset="100%" stopColor="#5c4033" />
      </linearGradient>

      <filter id="woodShadow">
        <feGaussianBlur in="SourceAlpha" stdDeviation="4"/>
        <feOffset dx="3" dy="3"/>
        <feComponentTransfer>
          <feFuncA type="linear" slope="0.5"/>
        </feComponentTransfer>
        <feMerge>
          <feMergeNode/>
          <feMergeNode in="SourceGraphic"/>
        </feMerge>
      </filter>
    </defs>

    {/* Outer rim */}
    <circle cx="150" cy="150" r="135" fill="url(#woodGradient)" filter="url(#woodShadow)" />
    <circle cx="150" cy="150" r="135" fill="none" stroke="#3d2817" strokeWidth="4" opacity="0.7" />
    <circle cx="150" cy="150" r="130" fill="none" stroke="#d4a574" strokeWidth="2" opacity="0.5" />

    {/* Inner rim */}
    <circle cx="150" cy="150" r="115" fill="none" stroke="#5c4033" strokeWidth="3" opacity="0.6" />

    {/* Wood grain effect on rim */}
    {Array.from({ length: 24 }).map((_, i) => {
      const angle = (i * 15 - 90) * (Math.PI / 180);
      const x = 150 + 125 * Math.cos(angle);
      const y = 150 + 125 * Math.sin(angle);
      return (
        <circle key={`bolt-${i}`} cx={x} cy={y} r="2.5" fill="#3d2817" opacity="0.8" />
      );
    })}

    {/* 8 spokes */}
    {Array.from({ length: 8 }).map((_, i) => {
      const angle = (i * 45 - 90) * (Math.PI / 180);
      const x1 = 150 + 30 * Math.cos(angle);
      const y1 = 150 + 30 * Math.sin(angle);
      const x2 = 150 + 115 * Math.cos(angle);
      const y2 = 150 + 115 * Math.sin(angle);
      const handleX = 150 + 135 * Math.cos(angle);
      const handleY = 150 + 135 * Math.sin(angle);

      return (
        <g key={i} filter="url(#woodShadow)">
          {/* Main spoke */}
          <path
            d={`M ${x1} ${y1} L ${x2} ${y2}`}
            stroke="url(#woodGrain)"
            strokeWidth="8"
            strokeLinecap="round"
          />

          {/* Wood grain lines */}
          {[-3, 0, 3].map((offset, idx) => (
            <path
              key={idx}
              d={`M ${x1 + offset * Math.sin(angle)} ${y1 - offset * Math.cos(angle)} L ${x2 + offset * Math.sin(angle)} ${y2 - offset * Math.cos(angle)}`}
              stroke="#5c4033"
              strokeWidth="0.5"
              opacity="0.4"
            />
          ))}

          {/* Handle grip */}
          <g transform={`rotate(${i * 45} ${handleX} ${handleY})`}>
            <ellipse
              cx={handleX}
              cy={handleY}
              rx="12"
              ry="18"
              fill="url(#woodGradient)"
            />
            <ellipse
              cx={handleX}
              cy={handleY}
              rx="10"
              ry="16"
              fill="none"
              stroke="#3d2817"
              strokeWidth="1.5"
            />
          </g>
        </g>
      );
    })}

    {/* Central hub */}
    <circle cx="150" cy="150" r="30" fill="url(#woodGradient)" filter="url(#woodShadow)" />
    <circle cx="150" cy="150" r="27" fill="none" stroke="#3d2817" strokeWidth="2" />
    <circle cx="150" cy="150" r="23" fill="url(#woodGrain)" />

    {/* Center bolts */}
    {[0, 90, 180, 270].map((angle, i) => {
      const rad = (angle - 90) * (Math.PI / 180);
      const x = 150 + 25 * Math.cos(rad);
      const y = 150 + 25 * Math.sin(rad);
      return (
        <g key={i}>
          <circle cx={x} cy={y} r="3" fill="#3d2817" />
          <circle cx={x} cy={y} r="1.5" fill="#8b7355" />
        </g>
      );
    })}
  </svg>
);

export const Anchor3DIcon = ({ className = "w-16 h-16" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 300 300" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="steelGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#e8e8e8" />
        <stop offset="30%" stopColor="#a0a0a0" />
        <stop offset="70%" stopColor="#6b6b6b" />
        <stop offset="100%" stopColor="#4a4a4a" />
      </linearGradient>

      <radialGradient id="metalShine" cx="30%" cy="30%">
        <stop offset="0%" stopColor="#ffffff" stopOpacity="0.8" />
        <stop offset="50%" stopColor="#c0c0c0" stopOpacity="0.4" />
        <stop offset="100%" stopColor="#808080" stopOpacity="0.1" />
      </radialGradient>

      <filter id="steelShadow">
        <feGaussianBlur in="SourceAlpha" stdDeviation="5"/>
        <feOffset dx="4" dy="6"/>
        <feComponentTransfer>
          <feFuncA type="linear" slope="0.6"/>
        </feComponentTransfer>
        <feMerge>
          <feMergeNode/>
          <feMergeNode in="SourceGraphic"/>
        </feMerge>
      </filter>

      <filter id="shine">
        <feGaussianBlur stdDeviation="2"/>
        <feComponentTransfer>
          <feFuncA type="linear" slope="0.5"/>
        </feComponentTransfer>
      </filter>
    </defs>

    <g filter="url(#steelShadow)">
      {/* Top ring */}
      <circle cx="150" cy="40" r="22" fill="url(#steelGradient)" />
      <circle cx="150" cy="40" r="20" fill="none" stroke="#2a2a2a" strokeWidth="2" />
      <circle cx="150" cy="40" r="16" fill="none" stroke="url(#metalShine)" strokeWidth="1" />

      {/* Main shaft */}
      <rect x="142" y="62" width="16" height="155" fill="url(#steelGradient)" rx="2" />

      {/* Engraving lines on shaft */}
      {Array.from({ length: 20 }).map((_, i) => (
        <line
          key={i}
          x1="140"
          y1={65 + i * 7.5}
          x2="160"
          y2={65 + i * 7.5}
          stroke="#2a2a2a"
          strokeWidth="0.8"
          opacity="0.3"
        />
      ))}

      {/* Decorative bands */}
      <rect x="138" y="80" width="24" height="6" fill="#4a4a4a" rx="1" />
      <rect x="138" y="190" width="24" height="6" fill="#4a4a4a" rx="1" />

      {/* Cross bar (stock) */}
      <rect x="60" y="135" width="180" height="12" fill="url(#steelGradient)" rx="3" />
      <rect x="60" y="137" width="180" height="8" fill="url(#metalShine)" opacity="0.3" />

      {/* Stock ends with rivets */}
      <circle cx="60" cy="141" r="8" fill="url(#steelGradient)" />
      <circle cx="240" cy="141" r="8" fill="url(#steelGradient)" />
      <circle cx="60" cy="141" r="4" fill="#2a2a2a" />
      <circle cx="240" cy="141" r="4" fill="#2a2a2a" />

      {/* Rope detail */}
      <path
        d="M 70 135 Q 80 130 90 135 Q 100 140 110 135"
        stroke="#8b7355"
        strokeWidth="3"
        fill="none"
        opacity="0.7"
      />

      {/* Left fluke */}
      <path
        d="M 150 217 Q 100 210 65 240 Q 55 250 45 260 L 52 268 Q 62 263 72 260 Q 110 250 135 225 Q 145 215 150 217"
        fill="url(#steelGradient)"
      />

      {/* Right fluke */}
      <path
        d="M 150 217 Q 200 210 235 240 Q 245 250 255 260 L 248 268 Q 238 263 228 260 Q 190 250 165 225 Q 155 215 150 217"
        fill="url(#steelGradient)"
      />

      {/* Fluke texture */}
      <path d="M 60 255 Q 90 240 120 225" stroke="#2a2a2a" strokeWidth="2" opacity="0.4" />
      <path d="M 240 255 Q 210 240 180 225" stroke="#2a2a2a" strokeWidth="2" opacity="0.4" />

      {/* Fluke tips */}
      <ellipse cx="48" cy="264" rx="7" ry="10" transform="rotate(-25 48 264)" fill="url(#steelGradient)" />
      <ellipse cx="252" cy="264" rx="7" ry="10" transform="rotate(25 252 264)" fill="url(#steelGradient)" />

      {/* Crown */}
      <path d="M 150 217 L 145 235 Q 150 242 155 235 Z" fill="#4a4a4a" />

      {/* Shine overlay */}
      <circle cx="150" cy="150" r="120" fill="url(#metalShine)" filter="url(#shine)" opacity="0.2" />
    </g>
  </svg>
);

export const Lighthouse3DIcon = ({ className = "w-16 h-16" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 300 300" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="stoneGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#f0f0f0" />
        <stop offset="50%" stopColor="#d0d0d0" />
        <stop offset="100%" stopColor="#a0a0a0" />
      </linearGradient>

      <radialGradient id="lightGlow" cx="50%" cy="50%">
        <stop offset="0%" stopColor="#ffff00" stopOpacity="0.9" />
        <stop offset="50%" stopColor="#ffaa00" stopOpacity="0.5" />
        <stop offset="100%" stopColor="#ff8800" stopOpacity="0" />
      </radialGradient>

      <filter id="stoneShadow">
        <feGaussianBlur in="SourceAlpha" stdDeviation="3"/>
        <feOffset dx="2" dy="3"/>
        <feComponentTransfer>
          <feFuncA type="linear" slope="0.4"/>
        </feComponentTransfer>
        <feMerge>
          <feMergeNode/>
          <feMergeNode in="SourceGraphic"/>
        </feMerge>
      </filter>

      <filter id="glow">
        <feGaussianBlur stdDeviation="4"/>
        <feMerge>
          <feMergeNode/>
          <feMergeNode in="SourceGraphic"/>
        </feMerge>
      </filter>
    </defs>

    <g filter="url(#stoneShadow)">
      {/* Base */}
      <path d="M 100 260 L 200 260 L 195 250 L 105 250 Z" fill="url(#stoneGradient)" />
      <rect x="95" y="255" width="110" height="10" fill="#808080" />

      {/* Main tower */}
      <path d="M 120 250 L 180 250 L 170 110 L 130 110 Z" fill="url(#stoneGradient)" />

      {/* Brick texture */}
      {Array.from({ length: 25 }).map((_, i) => (
        <line
          key={i}
          x1={120 + (170 - 130) * (i / 25)}
          y1={250 - i * 5.6}
          x2={180 - (170 - 130) * (i / 25)}
          y2={250 - i * 5.6}
          stroke="#909090"
          strokeWidth="0.5"
          opacity="0.3"
        />
      ))}

      {/* Red stripes */}
      <path d="M 130 200 L 170 200 L 167 180 L 133 180 Z" fill="#cc0000" opacity="0.6" />
      <path d="M 135 145 L 165 145 L 162.5 125 L 137.5 125 Z" fill="#cc0000" opacity="0.6" />

      {/* Gallery/balcony */}
      <rect x="120" y="105" width="60" height="7" fill="#606060" rx="1" />
      <path d="M 115 105 L 185 105 L 183 102 L 117 102 Z" fill="#808080" />

      {/* Railing */}
      {Array.from({ length: 20 }).map((_, i) => (
        <line
          key={i}
          x1={120 + i * 3}
          y1="102"
          x2={120 + i * 3}
          y2="105"
          stroke="#505050"
          strokeWidth="0.7"
          opacity="0.6"
        />
      ))}

      {/* Lantern room */}
      <path d="M 125 102 L 175 102 L 170 75 L 130 75 Z" fill="rgba(200, 230, 255, 0.3)" />

      {/* Window panes */}
      {[-15, 0, 15].map((offset, i) => (
        <rect
          key={i}
          x={150 + offset - 4}
          y="82"
          width="8"
          height="16"
          fill="rgba(255, 255, 200, 0.4)"
          stroke="#808080"
          strokeWidth="0.5"
        />
      ))}

      {/* Roof */}
      <path d="M 122 75 L 150 55 L 178 75 Z" fill="#404040" />
      <path d="M 130 72 L 150 58 L 170 72" stroke="#505050" strokeWidth="0.5" opacity="0.5" />

      {/* Lightning rod */}
      <rect x="148" y="45" width="4" height="10" fill="#606060" />
      <circle cx="150" cy="43" r="3" fill="#808080" />

      {/* Light beams */}
      {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => {
        const rad = (angle - 90) * (Math.PI / 180);
        const x1 = 150 + 20 * Math.cos(rad);
        const y1 = 88 + 20 * Math.sin(rad);
        const x2 = 150 + 45 * Math.cos(rad);
        const y2 = 88 + 45 * Math.sin(rad);

        return (
          <line
            key={i}
            x1={x1}
            y1={y1}
            x2={x2}
            y2={y2}
            stroke="#ffff00"
            strokeWidth={i % 2 === 0 ? 2.5 : 1.5}
            opacity="0.7"
            strokeLinecap="round"
            filter="url(#glow)"
          />
        );
      })}

      {/* Light glow */}
      <circle cx="150" cy="88" r="18" fill="url(#lightGlow)" filter="url(#glow)" />
      <circle cx="150" cy="88" r="12" fill="url(#lightGlow)" filter="url(#glow)" />
    </g>

    {/* Ocean base */}
    <ellipse cx="150" cy="265" rx="70" ry="12" fill="rgba(0, 50, 100, 0.2)" />
    <path
      d="M 80 268 Q 100 265 120 268 Q 140 271 160 268 Q 180 265 200 268 Q 220 271 220 268"
      stroke="rgba(255, 255, 255, 0.3)"
      strokeWidth="2"
      fill="none"
    />
  </svg>
);
