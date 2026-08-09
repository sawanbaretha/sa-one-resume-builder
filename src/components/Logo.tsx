import React from 'react';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
  textColor?: string;
}

export const Logo: React.FC<LogoProps> = ({
  size = 'md',
  showText = true,
  textColor = '#ffffff'
}) => {
  const height = size === 'sm' ? 38 : size === 'md' ? 46 : 64;

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', cursor: 'pointer', userSelect: 'none' }}>
      {/* Vector Emblem Graphic */}
      <svg
        height={height}
        viewBox="0 0 200 170"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ filter: 'drop-shadow(0 4px 12px rgba(0, 102, 255, 0.35))' }}
      >
        <defs>
          <linearGradient id="sGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#38bdf8" />
            <stop offset="40%" stopColor="#0066ff" />
            <stop offset="100%" stopColor="#1d4ed8" />
          </linearGradient>
          <linearGradient id="aGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#0f172a" />
            <stop offset="100%" stopColor="#1e293b" />
          </linearGradient>
          <linearGradient id="swooshGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#0066ff" />
            <stop offset="60%" stopColor="#0284c7" />
            <stop offset="100%" stopColor="#38bdf8" />
          </linearGradient>
          <filter id="shadow" x="-10%" y="-10%" width="120%" height="120%">
            <feDropShadow dx="0" dy="4" stdDeviation="4" floodColor="#0f172a" floodOpacity="0.25" />
          </filter>
        </defs>

        {/* 'S' Ribbon background shape */}
        <path
          d="M 85 20 C 35 20 20 65 65 82 C 115 100 100 148 35 148 L 75 148 C 130 148 135 100 85 82 C 40 65 50 20 85 20 Z"
          fill="url(#sGrad)"
        />

        {/* 'A' Right Leg shape */}
        <path
          d="M 122 20 L 175 148 L 148 148 L 134 114 L 110 114 L 122 20 Z"
          fill="url(#aGrad)"
        />

        {/* Resume Sheet Container */}
        <g filter="url(#shadow)">
          <rect
            x="82"
            y="42"
            width="60"
            height="76"
            rx="8"
            fill="#FFFFFF"
            stroke="#0F172A"
            strokeWidth="3.5"
          />
          {/* Folded Corner */}
          <path d="M 126 42 L 142 58 L 126 58 Z" fill="#2563EB" />
          <path d="M 126 42 L 142 58" stroke="#0F172A" strokeWidth="2.5" />

          {/* User Profile Avatar Icon */}
          <circle cx="106" cy="58" r="6" fill="#2563EB" />
          <path d="M 96 71 C 96 65 116 65 116 71 Z" fill="#2563EB" />

          {/* Bulleted List Lines */}
          <circle cx="95" cy="80" r="1.8" fill="#2563EB" />
          <line x1="101" y1="80" x2="131" y2="80" stroke="#0F172A" strokeWidth="2.5" strokeLinecap="round" />

          <circle cx="95" cy="88" r="1.8" fill="#2563EB" />
          <line x1="101" y1="88" x2="131" y2="88" stroke="#0F172A" strokeWidth="2.5" strokeLinecap="round" />

          <circle cx="95" cy="96" r="1.8" fill="#2563EB" />
          <line x1="101" y1="96" x2="124" y2="96" stroke="#0F172A" strokeWidth="2.5" strokeLinecap="round" />
        </g>

        {/* Dynamic Blue Checkmark Swoosh */}
        <path
          d="M 68 122 Q 120 148 185 78 Q 130 132 68 122 Z"
          fill="url(#swooshGrad)"
        />
      </svg>

      {/* Typography Label */}
      {showText && (
        <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1.05 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.15rem' }}>
            <span
              style={{
                fontSize: size === 'sm' ? '1.15rem' : size === 'md' ? '1.35rem' : '1.75rem',
                fontWeight: 900,
                color: textColor,
                letterSpacing: '0.04em',
                fontFamily: "'Plus Jakarta Sans', sans-serif"
              }}
            >
              SA-ONE
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', marginTop: '2px' }}>
            <span style={{ height: '1px', width: '10px', backgroundColor: '#38bdf8' }}></span>
            <span
              style={{
                fontSize: size === 'sm' ? '0.55rem' : '0.625rem',
                fontWeight: 800,
                color: '#38bdf8',
                letterSpacing: '0.16em',
                textTransform: 'uppercase',
                fontFamily: "'Plus Jakarta Sans', sans-serif"
              }}
            >
              RESUME BUILDER
            </span>
            <span style={{ height: '1px', width: '10px', backgroundColor: '#38bdf8' }}></span>
          </div>

          {size === 'lg' && (
            <span
              style={{
                fontSize: '0.55rem',
                fontWeight: 700,
                color: '#94a3b8',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                marginTop: '4px'
              }}
            >
              One Resume. Endless Opportunities.
            </span>
          )}
        </div>
      )}
    </div>
  );
};



