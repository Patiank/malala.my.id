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
      className="md:hidden fixed bottom-3 left-3 right-3 z-50 select-none pointer-events-auto"
      style={{ paddingBottom: 'env(safe-area-inset-bottom, 0px)' }}
    >
      <div className="bg-white/95 backdrop-blur-xl border border-gray-200/90 shadow-[0_12px_36px_rgba(0,0,0,0.20)] rounded-2xl px-2 py-2 flex items-center justify-between gap-1">
        
        {/* Item 1: Destinasi Wisata (Rumah Gadang Asli) */}
        <button
          type="button"
          onClick={() => (activeDrawer === 'destinations' ? onCloseDrawer() : onOpenDrawer('destinations'))}
          className={`flex-1 flex flex-col items-center justify-center py-1 px-1 rounded-xl transition-all duration-200 active:scale-95 cursor-pointer ${
            activeDrawer === 'destinations'
              ? 'bg-emerald-600 text-white font-bold shadow-sm'
              : 'text-gray-700 hover:text-black hover:bg-gray-100/60'
          }`}
          aria-label={navItems[0].label}
        >
          <img
            src={activeDrawer === 'destinations' ? '/images/nav/nav_wisata_white.png' : '/images/nav/nav_wisata.png'}
            alt="Wisata"
            className="w-[34px] h-[34px] sm:w-[38px] sm:h-[38px] object-contain transition-transform"
          />
          <span className="text-[9px] sm:text-[9.5px] font-orbitron font-bold tracking-wider uppercase mt-1 whitespace-nowrap">
            {navItems[0].label}
          </span>
        </button>

        {/* Item 2: Kuliner Minang (Carano / Hidangan Beruap Asli) */}
        <button
          type="button"
          onClick={() => (activeDrawer === 'culinary' ? onCloseDrawer() : onOpenDrawer('culinary'))}
          className={`flex-1 flex flex-col items-center justify-center py-1 px-1 rounded-xl transition-all duration-200 active:scale-95 cursor-pointer ${
            activeDrawer === 'culinary'
              ? 'bg-amber-600 text-white font-bold shadow-sm'
              : 'text-gray-700 hover:text-black hover:bg-gray-100/60'
          }`}
          aria-label={navItems[1].label}
        >
          <img
            src={activeDrawer === 'culinary' ? '/images/nav/nav_kuliner_white.png' : '/images/nav/nav_kuliner.png'}
            alt="Kuliner"
            className="w-[34px] h-[34px] sm:w-[38px] sm:h-[38px] object-contain transition-transform"
          />
          <span className="text-[9px] sm:text-[9.5px] font-orbitron font-bold tracking-wider uppercase mt-1 whitespace-nowrap">
            {navItems[1].label}
          </span>
        </button>

        {/* CENTER SPECIAL: AI Travel Planner (Chat Sparkle AI Asli) */}
        <button
          type="button"
          onClick={() => (activeDrawer === 'formai' ? onCloseDrawer() : onOpenDrawer('formai'))}
          className="relative -top-4 px-2 flex flex-col items-center justify-center cursor-pointer group active:scale-90 transition-transform"
          aria-label="AI Planner"
        >
          <div className="w-[54px] h-[54px] rounded-full bg-gradient-to-tr from-amber-600 via-amber-500 to-yellow-400 p-[2.5px] shadow-lg shadow-amber-500/40 flex items-center justify-center">
            <div className="w-full h-full rounded-full bg-slate-950 flex items-center justify-center p-2.5">
              <img
                src="/images/nav/nav_ai_gold.png"
                alt="AI Trip"
                className="w-[32px] h-[32px] object-contain animate-pulse"
              />
            </div>
          </div>
          <span className="text-[9px] sm:text-[9.5px] font-orbitron font-black text-amber-700 tracking-wider uppercase mt-1">
            {isEn ? 'AI TRIP' : 'RUTE AI'}
          </span>
        </button>

        {/* Item 3: Event & Festival (Talempong Tradisional Asli) */}
        <button
          type="button"
          onClick={() => (activeDrawer === 'events' ? onCloseDrawer() : onOpenDrawer('events'))}
          className={`flex-1 flex flex-col items-center justify-center py-1 px-1 rounded-xl transition-all duration-200 active:scale-95 cursor-pointer ${
            activeDrawer === 'events'
              ? 'bg-blue-600 text-white font-bold shadow-sm'
              : 'text-gray-700 hover:text-black hover:bg-gray-100/60'
          }`}
          aria-label={navItems[3].label}
        >
          <img
            src={activeDrawer === 'events' ? '/images/nav/nav_event_white.png' : '/images/nav/nav_event.png'}
            alt="Event"
            className="w-[34px] h-[34px] sm:w-[38px] sm:h-[38px] object-contain transition-transform"
          />
          <span className="text-[9px] sm:text-[9.5px] font-orbitron font-bold tracking-wider uppercase mt-1 whitespace-nowrap">
            {navItems[3].label}
          </span>
        </button>

        {/* Item 4: Buku Panduan / Flipbook (Peta Rute Wisata Asli) */}
        <button
          type="button"
          onClick={() => (activeDrawer === 'download' ? onCloseDrawer() : onOpenDrawer('download'))}
          className={`flex-1 flex flex-col items-center justify-center py-1 px-1 rounded-xl transition-all duration-200 active:scale-95 cursor-pointer ${
            activeDrawer === 'download'
              ? 'bg-orange-600 text-white font-bold shadow-sm'
              : 'text-gray-700 hover:text-black hover:bg-gray-100/60'
          }`}
          aria-label={navItems[4].label}
        >
          <img
            src={activeDrawer === 'download' ? '/images/nav/nav_panduan_white.png' : '/images/nav/nav_panduan.png'}
            alt="Panduan"
            className="w-[34px] h-[34px] sm:w-[38px] sm:h-[38px] object-contain transition-transform"
          />
          <span className="text-[9px] sm:text-[9.5px] font-orbitron font-bold tracking-wider uppercase mt-1 whitespace-nowrap">
            {navItems[4].label}
          </span>
        </button>

      </div>
    </nav>
  );
};
