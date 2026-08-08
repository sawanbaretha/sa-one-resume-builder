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
  const height = size === 'sm' ? 36 : size === 'md' ? 44 : 64;

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
      <svg
        height={height}
        viewBox="0 0 160 140"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ filter: 'drop-shadow(0 2px 6px rgba(0, 102, 255, 0.3))' }}
      >
        <defs>
          <linearGradient id="saBlueGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#0066FF" />
            <stop offset="100%" stopColor="#0047B3" />
          </linearGradient>
          <linearGradient id="swooshGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#38BDF8" />
            <stop offset="100%" stopColor="#0284C7" />
          </linearGradient>
        </defs>

        {/* 'S' Monogram Ribbon */}
        <path
          d="M 60 15 C 20 15 15 50 50 65 C 90 78 80 115 30 115 L 65 115 C 105 115 105 78 70 65 C 35 52 45 15 60 15 Z"
          fill="url(#saBlueGrad)"
        />

        {/* 'A' Monogram Right Leg */}
        <path
          d="M 95 15 L 135 115 L 112 115 L 102 90 L 82 90 L 95 15 Z"
          fill="#0B192C"
        />

        {/* Document Sheet */}
        <rect x="68" y="32" width="46" height="58" rx="6" fill="#FFFFFF" stroke="#0B192C" strokeWidth="3" />
        
        {/* Avatar inside sheet */}
        <circle cx="91" cy="44" r="5" fill="#0066FF" />
        <path d="M 83 55 C 83 50 99 50 99 55 Z" fill="#0066FF" />
        
        {/* Document lines */}
        <line x1="77" y1="62" x2="105" y2="62" stroke="#0B192C" strokeWidth="2.5" strokeLinecap="round" />
        <line x1="77" y1="69" x2="105" y2="69" stroke="#0B192C" strokeWidth="2.5" strokeLinecap="round" />
        <line x1="77" y1="76" x2="98" y2="76" stroke="#0B192C" strokeWidth="2.5" strokeLinecap="round" />

        {/* Blue Checkmark Swoosh */}
        <path
          d="M 58 92 Q 95 115 142 62 Q 100 106 58 92 Z"
          fill="url(#swooshGrad)"
        />
      </svg>

      {showText && (
        <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1.1 }}>
          <span
            style={{
              fontSize: size === 'sm' ? '1.15rem' : '1.35rem',
              fontWeight: 900,
              color: textColor,
              letterSpacing: '0.04em',
              fontFamily: "'Plus Jakarta Sans', sans-serif"
            }}
          >
            SA-ONE
          </span>
          <span
            style={{
              fontSize: '0.625rem',
              fontWeight: 800,
              color: '#38bdf8',
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              marginTop: '1px'
            }}
          >
            RESUME BUILDER
          </span>
        </div>
      )}
    </div>
  );
};
