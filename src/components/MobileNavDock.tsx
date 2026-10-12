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
      <div className="bg-white/95 backdrop-blur-xl border border-gray-200/90 shadow-[0_10px_30px_rgba(0,0,0,0.18)] rounded-2xl px-2 py-1.5 flex items-center justify-between gap-1">
        
        {/* Item 1: Destinasi Wisata */}
        <button
          type="button"
          onClick={() => (activeDrawer === 'destinations' ? onCloseDrawer() : onOpenDrawer('destinations'))}
          className={`flex-1 flex flex-col items-center justify-center py-1 px-1 rounded-xl transition-all duration-200 active:scale-95 cursor-pointer ${
            activeDrawer === 'destinations'
              ? 'bg-emerald-600 text-white font-bold shadow-sm'
              : 'text-gray-600 hover:text-black hover:bg-gray-100/60'
          }`}
          aria-label={navItems[0].label}
        >
          <Compass className={`w-5 h-5 ${activeDrawer === 'destinations' ? 'text-white' : 'text-gray-700'}`} />
          <span className="text-[10px] tracking-tight mt-0.5 whitespace-nowrap">
            {navItems[0].label}
          </span>
        </button>

        {/* Item 2: Kuliner Minang */}
        <button
          type="button"
          onClick={() => (activeDrawer === 'culinary' ? onCloseDrawer() : onOpenDrawer('culinary'))}
          className={`flex-1 flex flex-col items-center justify-center py-1 px-1 rounded-xl transition-all duration-200 active:scale-95 cursor-pointer ${
            activeDrawer === 'culinary'
              ? 'bg-amber-600 text-white font-bold shadow-sm'
              : 'text-gray-600 hover:text-black hover:bg-gray-100/60'
          }`}
          aria-label={navItems[1].label}
        >
          <UtensilsCrossed className={`w-5 h-5 ${activeDrawer === 'culinary' ? 'text-white' : 'text-gray-700'}`} />
          <span className="text-[10px] tracking-tight mt-0.5 whitespace-nowrap">
            {navItems[1].label}
          </span>
        </button>

        {/* CENTER SPECIAL: AI Travel Planner (Uni Mala Elevated Pill) */}
        <button
          type="button"
          onClick={() => (activeDrawer === 'formai' ? onCloseDrawer() : onOpenDrawer('formai'))}
          className="relative -top-3.5 px-2 flex flex-col items-center justify-center cursor-pointer group active:scale-90 transition-transform"
          aria-label="AI Planner"
        >
          <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-amber-600 via-amber-500 to-yellow-400 p-[2.5px] shadow-lg shadow-amber-500/40 flex items-center justify-center">
            <div className="w-full h-full rounded-full bg-slate-950 flex items-center justify-center text-white">
              <Sparkles className="w-5 h-5 text-yellow-300 animate-pulse" />
            </div>
          </div>
          <span className="text-[9.5px] font-black text-amber-700 tracking-wider uppercase mt-0.5 font-orbitron">
            {isEn ? 'AI TRIP' : 'RUTE AI'}
          </span>
        </button>

        {/* Item 3: Event & Festival */}
        <button
          type="button"
          onClick={() => (activeDrawer === 'events' ? onCloseDrawer() : onOpenDrawer('events'))}
          className={`flex-1 flex flex-col items-center justify-center py-1 px-1 rounded-xl transition-all duration-200 active:scale-95 cursor-pointer ${
            activeDrawer === 'events'
              ? 'bg-blue-600 text-white font-bold shadow-sm'
              : 'text-gray-600 hover:text-black hover:bg-gray-100/60'
          }`}
          aria-label={navItems[3].label}
        >
          <CalendarDays className={`w-5 h-5 ${activeDrawer === 'events' ? 'text-white' : 'text-gray-700'}`} />
          <span className="text-[10px] tracking-tight mt-0.5 whitespace-nowrap">
            {navItems[3].label}
          </span>
        </button>

        {/* Item 4: Buku Panduan / Flipbook */}
        <button
          type="button"
          onClick={() => (activeDrawer === 'download' ? onCloseDrawer() : onOpenDrawer('download'))}
          className={`flex-1 flex flex-col items-center justify-center py-1 px-1 rounded-xl transition-all duration-200 active:scale-95 cursor-pointer ${
            activeDrawer === 'download'
              ? 'bg-orange-600 text-white font-bold shadow-sm'
              : 'text-gray-600 hover:text-black hover:bg-gray-100/60'
          }`}
          aria-label={navItems[4].label}
        >
          <Download className={`w-5 h-5 ${activeDrawer === 'download' ? 'text-white' : 'text-gray-700'}`} />
          <span className="text-[10px] tracking-tight mt-0.5 whitespace-nowrap">
            {navItems[4].label}
          </span>
        </button>

      </div>
    </nav>
  );
};
