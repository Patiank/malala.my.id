import React from 'react';
import { DrawerType } from '../types';
import { Language } from '../lib/translations';
import { 
  Compass, 
  UtensilsCrossed, 
  Landmark, 
  CalendarDays, 
  Sparkles, 
  Bookmark, 
  Download, 
  Flame,
  Search
} from 'lucide-react';

interface MobileNavDockProps {
  activeDrawer: DrawerType;
  onOpenDrawer: (type: DrawerType) => void;
  onCloseDrawer: () => void;
  lang: Language;
  savedCount: number;
}

export const MobileNavDock: React.FC<MobileNavDockProps> = ({
  activeDrawer,
  onOpenDrawer,
  onCloseDrawer,
  lang,
  savedCount,
}) => {
  const isEn = lang === 'en';

  // Subtle Haptic Feedback (Getaran Halus) for Smartphone Navigation
  const lastHapticRef = React.useRef<number>(0);

  const triggerHaptic = (ms: number = 15) => {
    const now = Date.now();
    if (now - lastHapticRef.current < 180) return;
    lastHapticRef.current = now;
    try {
      if (typeof window !== 'undefined' && 'navigator' in window && typeof navigator.vibrate === 'function') {
        navigator.vibrate(ms);
      }
    } catch {
      // Graceful fallback for browsers without vibration support
    }
  };

  const handleNavClick = (type: DrawerType, hapticMs: number = 15) => {
    triggerHaptic(hapticMs);
    if (activeDrawer === type) {
      onCloseDrawer();
    } else {
      onOpenDrawer(type);
    }
  };

  const navItems = [
    {
      id: 'destinations' as DrawerType,
      label: isEn ? 'Destinations' : 'Wisata',
      icon: Compass,
      color: 'text-emerald-600',
      activeBg: 'bg-emerald-50 text-emerald-700 font-bold',
    },
    {
      id: 'culinary' as DrawerType,
      label: isEn ? 'Culinary' : 'Kuliner',
      icon: UtensilsCrossed,
      color: 'text-amber-600',
      activeBg: 'bg-amber-50 text-amber-700 font-bold',
    },
    {
      id: 'culture' as DrawerType,
      label: isEn ? 'Culture' : 'Budaya',
      icon: Landmark,
      color: 'text-rose-600',
      activeBg: 'bg-rose-50 text-rose-700 font-bold',
    },
    {
      id: 'events' as DrawerType,
      label: isEn ? 'Events' : 'Event',
      icon: CalendarDays,
      color: 'text-blue-600',
      activeBg: 'bg-blue-50 text-blue-700 font-bold',
    },
    {
      id: 'download' as DrawerType,
      label: isEn ? 'Guidebook' : 'Panduan',
      icon: Download,
      color: 'text-orange-600',
      activeBg: 'bg-orange-50 text-orange-700 font-bold',
    },
  ];

  return (
    <nav
      aria-label="Mobile Bottom Navigation"
      className="md:hidden fixed bottom-0 left-0 right-0 w-full z-50 select-none pointer-events-auto"
    >
      <div
        className="w-full box-border bg-white/98 backdrop-blur-xl rounded-t-2xl rounded-b-none border-t border-gray-200 shadow-[0_-8px_30px_rgba(0,0,0,0.12)] px-2 grid grid-cols-5 items-center justify-items-center gap-1"
        style={{
          height: 'calc(68px + env(safe-area-inset-bottom, 0px))',
          paddingBottom: 'env(safe-area-inset-bottom, 0px)',
        }}
      >
        {/* Item 1: Destinasi Wisata (Rumah Gadang Asli) */}
        <button
          type="button"
          onTouchStart={() => triggerHaptic(15)}
          onClick={() => handleNavClick('destinations', 15)}
          className={`w-full flex flex-col items-center justify-center py-1 px-0.5 rounded-xl transition-all duration-200 active:scale-95 cursor-pointer ${
            activeDrawer === 'destinations'
              ? 'bg-emerald-600 text-white font-normal shadow-sm'
              : 'text-gray-700 hover:text-black hover:bg-gray-100/60'
          }`}
          aria-label={navItems[0].label}
        >
          <img
            src={activeDrawer === 'destinations' ? '/images/nav/nav_wisata_white.png' : '/images/nav/nav_wisata.png'}
            alt="Wisata"
            className="w-[32px] h-[32px] sm:w-[36px] sm:h-[36px] object-contain transition-transform"
          />
          <span className="text-[10px] sm:text-[10.5px] font-jakarta font-normal tracking-wider uppercase mt-1 leading-tight whitespace-nowrap text-center">
            {navItems[0].label}
          </span>
        </button>

        {/* Item 2: Kuliner Minang (Carano / Hidangan Beruap Asli) */}
        <button
          type="button"
          onTouchStart={() => triggerHaptic(15)}
          onClick={() => handleNavClick('culinary', 15)}
          className={`w-full flex flex-col items-center justify-center py-1 px-0.5 rounded-xl transition-all duration-200 active:scale-95 cursor-pointer ${
            activeDrawer === 'culinary'
              ? 'bg-amber-600 text-white font-normal shadow-sm'
              : 'text-gray-700 hover:text-black hover:bg-gray-100/60'
          }`}
          aria-label={navItems[1].label}
        >
          <img
            src={activeDrawer === 'culinary' ? '/images/nav/nav_kuliner_white.png' : '/images/nav/nav_kuliner.png'}
            alt="Kuliner"
            className="w-[32px] h-[32px] sm:w-[36px] sm:h-[36px] object-contain transition-transform"
          />
          <span className="text-[10px] sm:text-[10.5px] font-jakarta font-normal tracking-wider uppercase mt-1 leading-tight whitespace-nowrap text-center">
            {navItems[1].label}
          </span>
        </button>

        {/* CENTER SPECIAL: AI Travel Planner (Chat Sparkle AI Asli) */}
        <button
          type="button"
          onTouchStart={() => triggerHaptic(20)}
          onClick={() => handleNavClick('formai', 20)}
          className="w-full flex flex-col items-center justify-center py-1 px-0.5 cursor-pointer group active:scale-90 transition-transform"
          aria-label="AI Planner"
        >
          <div className="w-[54px] h-[54px] -mt-5 rounded-full bg-gradient-to-tr from-amber-600 via-amber-500 to-yellow-400 p-[2.5px] shadow-lg shadow-amber-500/40 flex items-center justify-center">
            <div className="w-full h-full rounded-full bg-slate-950 flex items-center justify-center p-2.5">
              <img
                src="/images/nav/nav_ai_gold.png"
                alt="AI Trip"
                className="w-[32px] h-[32px] object-contain animate-pulse"
              />
            </div>
          </div>
          <span className="text-[10px] sm:text-[10.5px] font-jakarta font-normal text-amber-700 tracking-wider uppercase mt-1 leading-tight whitespace-nowrap text-center">
            {isEn ? 'AI TRIP' : 'RUTE AI'}
          </span>
        </button>

        {/* Item 3: Event & Festival (Talempong Tradisional Asli) */}
        <button
          type="button"
          onTouchStart={() => triggerHaptic(15)}
          onClick={() => handleNavClick('events', 15)}
          className={`w-full flex flex-col items-center justify-center py-1 px-0.5 rounded-xl transition-all duration-200 active:scale-95 cursor-pointer ${
            activeDrawer === 'events'
              ? 'bg-blue-600 text-white font-normal shadow-sm'
              : 'text-gray-700 hover:text-black hover:bg-gray-100/60'
          }`}
          aria-label={navItems[3].label}
        >
          <img
            src={activeDrawer === 'events' ? '/images/nav/nav_event_white.png' : '/images/nav/nav_event.png'}
            alt="Event"
            className="w-[32px] h-[32px] sm:w-[36px] sm:h-[36px] object-contain transition-transform"
          />
          <span className="text-[10px] sm:text-[10.5px] font-jakarta font-normal tracking-wider uppercase mt-1 leading-tight whitespace-nowrap text-center">
            {navItems[3].label}
          </span>
        </button>

        {/* Item 4: Buku Panduan / Flipbook (Peta Rute Wisata Asli) */}
        <button
          type="button"
          onTouchStart={() => triggerHaptic(15)}
          onClick={() => handleNavClick('download', 15)}
          className={`w-full flex flex-col items-center justify-center py-1 px-0.5 rounded-xl transition-all duration-200 active:scale-95 cursor-pointer ${
            activeDrawer === 'download'
              ? 'bg-orange-600 text-white font-normal shadow-sm'
              : 'text-gray-700 hover:text-black hover:bg-gray-100/60'
          }`}
          aria-label={navItems[4].label}
        >
          <img
            src={activeDrawer === 'download' ? '/images/nav/nav_panduan_white.png' : '/images/nav/nav_panduan.png'}
            alt="Panduan"
            className="w-[32px] h-[32px] sm:w-[36px] sm:h-[36px] object-contain transition-transform"
          />
          <span className="text-[10px] sm:text-[10.5px] font-jakarta font-normal tracking-wider uppercase mt-1 leading-tight whitespace-nowrap text-center">
            {navItems[4].label}
          </span>
        </button>

      </div>
    </nav>
  );
};
