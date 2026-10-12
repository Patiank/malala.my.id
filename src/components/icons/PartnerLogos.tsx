import React from 'react';

/**
 * Official Logo & Brand Icons for Tiket.com and Traveloka
 */

export const TiketLogoIcon: React.FC<{ className?: string; size?: number }> = ({ className = '', size = 20 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-label="Tiket.com Logo"
  >
    <circle cx="12" cy="12" r="11" fill="#FEDD00" />
    <circle cx="12" cy="7.5" r="2.2" fill="#0064D2" />
    <path
      d="M7.5 12C7.5 11.2 8.1 10.6 8.9 10.6H15.1C15.9 10.6 16.5 11.2 16.5 12V15.5C16.5 16.3 15.9 16.9 15.1 16.9H8.9C8.1 16.9 7.5 16.3 7.5 15.5V12Z"
      fill="#0064D2"
    />
  </svg>
);

export const TravelokaBirdIcon: React.FC<{ className?: string; size?: number; color?: string }> = ({
  className = '',
  size = 20,
  color = '#0194F3',
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-label="Traveloka Logo"
  >
    {/* Authentic Traveloka Godwit bird in flight silhouette */}
    <path
      d="M21.5 4.5C19.2 6.8 15.8 8.6 12.3 8.9C9.8 9.1 7.4 8.2 5.5 6.8C4.8 6.3 3.8 6.8 3.8 7.7C4.1 10.4 5.7 13.5 8.5 15.1C10.7 16.4 13.4 16.6 15.8 15.8C18.5 14.9 20.8 12.9 22.2 10.4C22.8 9.3 22.4 8.1 21.6 7.2L21.5 4.5Z"
      fill={color}
    />
    <path
      d="M12.5 8.8C10.2 5.5 8.1 3.2 5.2 2.1C4.3 1.8 3.4 2.5 3.5 3.4C3.8 5.8 5.2 8.5 7.4 10.3C9.1 11.7 11.2 12.5 13.4 12.3C13.8 12.3 14.1 11.9 13.9 11.5L12.5 8.8Z"
      fill={color}
      opacity="0.85"
    />
  </svg>
);

export const TiketOfficialBadge: React.FC<{ className?: string; darkBg?: boolean }> = ({ className = '', darkBg = false }) => (
  <span
    className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full font-bold shadow-xs select-none ${
      darkBg
        ? 'bg-[#FEDD00] text-[#002B66]'
        : 'bg-[#FEDD00] text-[#002B66]'
    } ${className}`}
  >
    <TiketLogoIcon size={14} />
    <span className="font-extrabold tracking-tight text-[11px] lowercase">tiket<span className="text-[#0064D2]">.com</span></span>
  </span>
);

export const TravelokaOfficialBadge: React.FC<{ className?: string; onSkyBg?: boolean }> = ({ className = '', onSkyBg = false }) => (
  <span
    className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full font-bold shadow-xs select-none ${
      onSkyBg
        ? 'bg-white text-[#0194F3]'
        : 'bg-[#0194F3] text-white'
    } ${className}`}
  >
    <TravelokaBirdIcon size={14} color={onSkyBg ? '#0194F3' : '#FFFFFF'} />
    <span className="font-extrabold tracking-tight text-[11px] lowercase">traveloka</span>
  </span>
);
