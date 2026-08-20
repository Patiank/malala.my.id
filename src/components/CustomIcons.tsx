import React from 'react';

export const CheckerboardGrid: React.FC<{ className?: string }> = ({ className = '' }) => {
  // 4 rows of 3.8x3.8 black squares; even rows shifted by 2.25.
  const squares: { x: number; y: number }[] = [];
  const rows = [0, 4.5, 9, 13.5];
  
  rows.forEach((y, rowIndex) => {
    const shift = rowIndex % 2 === 1 ? 2.25 : 0;
    const count = rowIndex % 2 === 1 ? 4 : 5;
    for (let i = 0; i < count; i++) {
      const x = shift + i * 8.3;
      if (x + 3.8 <= 36.5) {
        squares.push({ x, y });
      }
    }
  });

  return (
    <svg
      viewBox="0 0 36 18"
      style={{ width: 'var(--checker-w)', height: 'var(--checker-h)' }}
      className={`inline-block translate-y-[2px] align-middle ${className}`}
      aria-hidden="true"
    >
      {squares.map((sq, idx) => (
        <rect
          key={idx}
          x={sq.x}
          y={sq.y}
          width="3.8"
          height="3.8"
          fill="currentColor"
        />
      ))}
    </svg>
  );
};

export const WireframeGlobe: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <svg
      viewBox="0 0 64 64"
      style={{ width: 'var(--globe)', height: 'var(--globe)' }}
      className={`stroke-current fill-none ${className}`}
      strokeWidth="1.2"
      aria-hidden="true"
    >
      {/* Outer Circle */}
      <circle cx="32" cy="32" r="28" />
      {/* Equator & Meridian Lines */}
      <line x1="4" y1="32" x2="60" y2="32" />
      <line x1="32" y1="4" x2="32" y2="60" />
      {/* Horizontal Ellipses */}
      <ellipse cx="32" cy="32" rx="28" ry="11" />
      <ellipse cx="32" cy="32" rx="28" ry="20" />
      {/* Vertical Ellipses */}
      <ellipse cx="32" cy="32" rx="11" ry="28" />
      <ellipse cx="32" cy="32" rx="20" ry="28" />
    </svg>
  );
};

export interface CornerBracketProps {
  type: 'TL' | 'TR' | 'BL' | 'BR';
  className?: string;
  sizeVar?: boolean;
}

export const CornerBracket: React.FC<CornerBracketProps> = ({ type, className = '', sizeVar = true }) => {
  const paths = {
    TL: 'M0 11.5V0.5H11.5',
    TR: 'M0.5 0.5H11.5V11.5',
    BL: 'M0 0.5V11.5H11.5',
    BR: 'M0.5 11.5H11.5V0.5',
  };

  const style = sizeVar ? { width: 'var(--corner)', height: 'var(--corner)' } : undefined;

  return (
    <svg
      viewBox="0 0 12 12"
      style={style}
      className={`stroke-current fill-none ${className}`}
      strokeWidth="1.5"
      aria-hidden="true"
    >
      <path d={paths[type]} />
    </svg>
  );
};

export const PemprovSumbarLogo: React.FC<{ className?: string; size?: number | string }> = ({ className = '', size = 56 }) => {
  const [imgSrc, setImgSrc] = React.useState<string>('/logo_sumbar.svg');
  const [hasError, setHasError] = React.useState<boolean>(false);

  const widthStyle = typeof size === 'number' ? `${size}px` : size;

  const handleError = () => {
    if (imgSrc === '/logo_sumbar.svg') {
      setImgSrc('/logo_sumbar.png');
    } else if (imgSrc === '/logo_sumbar.png') {
      // Fallback to Wikipedia official high-res PNG for West Sumatra Coat of Arms (path 6/62)
      setImgSrc('https://upload.wikimedia.org/wikipedia/commons/thumb/6/62/Coat_of_arms_of_West_Sumatra.svg/500px-Coat_of_arms_of_West_Sumatra.svg.png');
    } else {
      setHasError(true);
    }
  };

  if (hasError) {
    return (
      <svg
        style={{ width: widthStyle, height: 'auto' }}
        viewBox="0 0 100 120"
        className={`inline-block drop-shadow-md select-none ${className}`}
        aria-label="Logo Pemprov Sumatera Barat"
      >
        <path
          d="M 10,10 L 90,10 C 90,10 90,80 50,110 C 10,80 10,10 10,10 Z"
          fill="#1e3a8a"
          stroke="#eab308"
          strokeWidth="3"
        />
        <path
          d="M 15,15 L 85,15 C 85,15 85,75 50,102 C 15,75 15,15 15,15 Z"
          fill="#0284c7"
        />
        <path
          d="M 25,60 L 35,40 L 42,48 L 50,30 L 58,48 L 65,40 L 75,60 L 50,55 Z"
          fill="#eab308"
        />
        <polygon
          points="50,18 53,26 61,26 55,31 57,39 50,34 43,39 45,31 39,26 47,26"
          fill="#ffffff"
        />
        <rect x="20" y="70" width="60" height="14" rx="3" fill="#dc2626" />
        <text x="50" y="80" fill="#ffffff" fontSize="8" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">
          SUMBAR
        </text>
      </svg>
    );
  }

export const MinangkaosLogo: React.FC<{ className?: string; size?: number | string }> = ({ className = '', size = 48 }) => {
  const widthStyle = typeof size === 'number' ? `${size}px` : size;
  return (
    <div
      style={{ width: widthStyle, height: widthStyle }}
      className={`relative inline-flex items-center justify-center rounded-xl bg-gradient-to-br from-amber-500 via-red-600 to-black text-white font-orbitron font-black shadow-lg border border-amber-400/40 select-none ${className}`}
    >
      <span className="text-xl tracking-tighter drop-shadow-md">M</span>
      <div className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-amber-400 rounded-full border-2 border-black flex items-center justify-center text-[7px] text-black font-black">
        ★
      </div>
    </div>
  );
};

export const PemprovSumbarLogo = MinangkaosLogo;
