import React, { useState } from 'react';
import { Bookmark, Download, Map, Globe, Menu, X } from 'lucide-react';
import { DrawerType, AppSettings } from '../types';
import { Language, translations } from '../lib/translations';

interface HeaderProps {
  activeDrawer: DrawerType;
  onOpenDrawer: (type: DrawerType) => void;
  onCloseDrawer: () => void;
  savedCount: number;
  lang: Language;
  onToggleLang: () => void;
  onMouseEnterHotInfo?: () => void;
  onMouseLeaveHotInfo?: () => void;
  appSettings?: AppSettings;
}

export const Header: React.FC<HeaderProps> = ({
  activeDrawer,
  onOpenDrawer,
  onCloseDrawer,
  savedCount,
  lang,
  onToggleLang,
  onMouseEnterHotInfo,
  onMouseLeaveHotInfo,
  appSettings,
}) => {
  const t = translations[lang];
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const heroTextColor = appSettings?.heroTextColor || '#000000';
  const heroTextShadow = appSettings?.heroTextShadow !== false;

  const isWhiteHeroText = heroTextColor.toLowerCase() === '#ffffff' || heroTextColor.toLowerCase() === '#fff';

  const shadowValue = heroTextShadow
    ? isWhiteHeroText
      ? '0 2px 10px rgba(0,0,0,0.85), 0 0 4px rgba(0,0,0,0.9)'
      : '0 2px 8px rgba(255,255,255,0.8), 0 0 2px rgba(255,255,255,0.9)'
    : undefined;

  const headerTextStyle: React.CSSProperties = {
    color: heroTextColor,
    textShadow: shadowValue,
  };

  const handleNavClick = (type: DrawerType) => {
    onOpenDrawer(type);
    setIsMobileMenuOpen(false);
  };

  const primaryNavItems: {
    id: DrawerType;
    label: string;
    icon: string;
    color: string;
    hoverTextColor: string;
  }[] = [
    {
      id: 'destinations',
      label: t.navDestinations,
      icon: '🏔️',
      color: '#386641',
      hoverTextColor: '#ffffff',
    },
    {
      id: 'culture',
      label: t.navCulture,
      icon: '🏛️',
      color: '#6a994e',
      hoverTextColor: '#ffffff',
    },
    {
      id: 'culinary',
      label: t.navCulinary,
      icon: '🍲',
      color: '#a7c957',
      hoverTextColor: '#1b3815',
    },
    {
      id: 'souvenirs',
      label: t.navSouvenirs,
      icon: '🛍️',
      color: '#f2e8cf',
      hoverTextColor: '#2b2118',
    },
    {
      id: 'events',
      label: t.navEvents,
      icon: '📅',
      color: '#bc4749',
      hoverTextColor: '#ffffff',
    },
    {
      id: 'download',
      label: t.navDownloads,
      icon: '📖',
      color: '#ff7d00',
      hoverTextColor: '#ffffff',
    },
  ];

  return (
    <header
      className="z-50 relative flex flex-col md:flex-row items-center justify-between w-full select-none bg-transparent px-4 sm:px-6 md:px-[var(--pad-x)]"
      style={{
        paddingTop: 'var(--header-pt)',
        paddingBottom: 'var(--section-gap)',
      }}
    >
      <div className="flex items-center justify-between w-full md:w-auto shrink-0 md:mr-6 lg:mr-10">
        {/* Logo (Left) - Scaled down 50% as requested */}
        <button
          onClick={onCloseDrawer}
          className="w-[78px] sm:w-[90px] md:w-[102px] flex flex-col items-stretch cursor-pointer hover:opacity-85 transition-opacity text-left focus:outline-none group py-0.5 shrink-0"
          aria-label="MALALA - Panduan Wisata Sumatera Barat"
        >
          {/* Default / Light Background Logo (Red + Black) */}
          <img
            src="/malala-logo.png"
            alt="MALALA"
            className={`w-full h-auto object-contain transition-all duration-300 ${
              isWhiteHeroText ? 'md:hidden' : 'block'
            } drop-shadow-[0_1px_3px_rgba(255,255,255,0.7)]`}
            style={{ aspectRatio: '812 / 184' }}
          />

          {/* Dark Background Logo for Desktop Hero (Red + White) */}
          {isWhiteHeroText && (
            <img
              src="/malala-logo-white.png"
              alt="MALALA"
              className="hidden md:block w-full h-auto object-contain transition-all duration-300 drop-shadow-[0_2px_8px_rgba(0,0,0,0.85)]"
              style={{ aspectRatio: '812 / 184' }}
            />
          )}

          {/* Tagline Selalu Satu Baris & Pas Sejajar Lebar Logo */}
          <div
            className="flex justify-between items-center w-full font-jakarta text-[5px] sm:text-[5.5px] md:text-[6px] font-bold mt-0.5 uppercase whitespace-nowrap tracking-[0.02em] select-none transition-colors duration-300"
            style={{ color: heroTextColor, opacity: 0.85, textShadow: shadowValue }}
          >
            {t.logoTagline.split(' ').map((word, i) => (
              <span key={i}>{word}</span>
            ))}
          </div>
        </button>

        {/* Subtle Hairline Divider (Desktop Only - Opsi 1) */}
        <div
          className="hidden md:block w-px h-5 ml-6 lg:ml-8 transition-colors duration-300 shrink-0 select-none rounded-full"
          style={{
            backgroundColor: isWhiteHeroText ? 'rgba(255, 255, 255, 0.32)' : 'rgba(0, 0, 0, 0.16)',
            boxShadow: isWhiteHeroText ? '0 1px 4px rgba(0, 0, 0, 0.5)' : 'none',
          }}
          aria-hidden="true"
        />

        {/* Mobile Menu Toggle & Essentials */}
        <div className="flex items-center gap-2 md:hidden shrink-0">
          {/* Touch-Friendly Language Toggle (min 40px touch area) */}
          <button
            onClick={onToggleLang}
            className="min-h-[40px] min-w-[40px] px-2.5 py-1.5 rounded-full border border-gray-300 bg-white hover:border-black transition-all cursor-pointer font-jakarta shadow-xs flex items-center justify-center gap-1 active:scale-95"
            title={lang === 'id' ? 'Switch to English' : 'Ganti ke Bahasa Indonesia'}
            aria-label="Toggle language"
          >
            <Globe className="w-3.5 h-3.5 text-red-600 shrink-0" />
            <span className="text-[10px] font-black px-1.5 py-0.5 rounded bg-black text-white leading-none uppercase">
              {lang.toUpperCase()}
            </span>
          </button>
          
          {/* Touch-Friendly Saved / Bookmark Button */}
          <button
            onClick={() => handleNavClick('saved')}
            className="min-h-[40px] min-w-[40px] relative cursor-pointer p-2 rounded-xl border border-gray-200 bg-white hover:bg-gray-100 transition-colors text-gray-800 shadow-xs flex items-center justify-center active:scale-95"
            title="Tersimpan"
            aria-label="Buka item tersimpan"
          >
            <Bookmark strokeWidth={2.2} className="w-4 h-4" />
            {savedCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-600 text-white font-orbitron font-bold text-[8px] w-4 h-4 rounded-full flex items-center justify-center leading-none shadow-xs">
                {savedCount}
              </span>
            )}
          </button>
          
          {/* Touch-Friendly Hamburger Menu Toggle Button */}
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="min-h-[40px] min-w-[40px] p-2 rounded-xl border border-gray-200 bg-white hover:bg-gray-100 transition-colors cursor-pointer text-gray-900 shadow-xs flex items-center justify-center active:scale-95"
            aria-label="Toggle menu navigasi"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5 text-red-600" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Backdrop Overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-xs z-40 md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Nav Links (Desktop + Mobile Dropdown Sheet) */}
      <nav
        className={`${
          isMobileMenuOpen ? 'flex' : 'hidden'
        } md:flex flex-col md:flex-row absolute md:relative top-full left-0 w-full md:w-auto bg-white/95 backdrop-blur-xl md:bg-transparent shadow-2xl md:shadow-none p-4 md:p-0 gap-2.5 md:gap-[var(--gap-nav)] font-orbitron font-bold uppercase tracking-[0.12em] sm:tracking-[0.15em] items-stretch md:items-center text-black border-t md:border-none border-gray-200 z-50 rounded-b-2xl md:rounded-none animate-fadeIn`}
        style={{ fontSize: 'var(--nav)' }}
      >
        {primaryNavItems.map((item) => {
          const isActive = activeDrawer === item.id;
          return (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={`group relative overflow-hidden w-full md:w-auto min-h-[44px] md:min-h-0 px-3.5 py-2.5 md:py-1.5 md:px-3 lg:px-3.5 rounded-full border transition-all duration-300 cursor-pointer flex items-center justify-between md:justify-center active:scale-[0.98] ${
                isActive
                  ? 'border-transparent font-bold shadow-sm'
                  : 'border-gray-100 md:border-transparent hover:border-transparent'
              }`}
              style={{
                ...(!isActive ? headerTextStyle : { color: item.hoverTextColor }),
                '--hover-text': item.hoverTextColor,
              } as React.CSSProperties}
            >
              {/* Sliding Curved Color Box (Pill Shape with Custom Minang Palette) */}
              <span
                aria-hidden="true"
                className={`pointer-events-none absolute inset-0 rounded-full transition-transform duration-200 ease-out -translate-x-[101%] group-hover:translate-x-0 ${
                  isActive ? 'translate-x-0 shadow-xs' : ''
                }`}
                style={{ backgroundColor: item.color }}
              />

              {/* Text Label with Contrast Flip on Hover & Active */}
              <span
                className={`relative z-10 transition-colors duration-150 select-none whitespace-nowrap ${
                  !isActive ? 'group-hover:text-[var(--hover-text)] group-hover:[text-shadow:none]' : ''
                }`}
              >
                {item.label}
              </span>

              {/* Mobile Category Icon */}
              <span className="relative z-10 md:hidden text-xs opacity-75 shrink-0 ml-2">
                {item.icon}
              </span>
            </button>
          );
        })}

        <button
          onClick={() => handleNavClick('map')}
          className={`w-full md:w-auto min-h-[44px] md:min-h-[48px] inline-flex items-center justify-between md:justify-center px-4 md:px-5 py-2 md:py-0 rounded-xl md:rounded-full border font-orbitron font-bold uppercase tracking-[0.12em] sm:tracking-[0.15em] transition-all duration-200 cursor-pointer group shadow-xs hover:shadow-md active:scale-[0.99] ${
            activeDrawer === 'map'
              ? 'bg-red-600 text-white border-red-600'
              : 'bg-emerald-700 text-white border-emerald-700 hover:bg-red-600 hover:border-red-600'
          }`}
          style={{ fontSize: 'var(--nav)' }}
        >
          <span>{t.navMap}</span>
          <span className="md:hidden text-xs opacity-80">🗺️</span>
        </button>

        {/* Rencanakan Liburan Anda (Ukuran Selaras dengan Panel Peta Wisata, Teks Lebih Besar & Jelas Tanpa Ikon Bintang) */}
        <button
          onClick={() => handleNavClick('formai')}
          className={`w-full md:w-auto min-h-[44px] md:min-h-[48px] inline-flex items-center justify-center px-4 md:px-5 py-2.5 md:py-0 rounded-xl md:rounded-full border bg-black text-white border-black hover:bg-gray-800 hover:border-gray-800 transition-all duration-200 cursor-pointer shadow-xs hover:shadow-md shrink-0 active:scale-[0.99] ${
            activeDrawer === 'formai' ? 'ring-2 ring-offset-1 ring-black shadow-md' : ''
          }`}
        >
          <div className="flex flex-col items-center justify-center text-center leading-tight font-orbitron">
            <span className="text-[10px] sm:text-[9.5px] md:text-[9px] lg:text-[10px] font-extrabold uppercase tracking-wider text-white whitespace-nowrap">
              {lang === 'en' ? 'PLAN YOUR' : 'RENCANAKAN'}
            </span>
            <span className="text-[10px] sm:text-[9.5px] md:text-[9px] lg:text-[10px] font-extrabold uppercase tracking-wider text-white whitespace-nowrap leading-none mt-0.5">
              {lang === 'en' ? 'VACATION' : 'LIBURAN ANDA'}
            </span>
          </div>
        </button>

        <span className="text-gray-300 font-light select-none hidden md:inline">|</span>

        {/* Desktop Language Switcher Button with Globe Logo & ID | EN Side-By-Side */}
        <button
          onClick={onToggleLang}
          className="hidden md:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border border-gray-300 bg-white hover:border-black transition-all cursor-pointer font-jakarta shadow-2xs group"
          title={lang === 'id' ? 'Switch to English' : 'Ganti ke Bahasa Indonesia'}
        >
          <Globe className="w-3.5 h-3.5 text-red-600 transition-transform group-hover:rotate-12" />
          <div className="flex items-center gap-1 text-[10px] font-extrabold tracking-wider uppercase">
            <span className={`px-1.5 py-0.5 rounded transition-colors ${lang === 'id' ? 'bg-black text-white font-black' : 'text-gray-500 group-hover:text-black'}`}>
              ID
            </span>
            <span className="text-gray-300 font-normal">|</span>
            <span className={`px-1.5 py-0.5 rounded transition-colors ${lang === 'en' ? 'bg-black text-white font-black' : 'text-gray-500 group-hover:text-black'}`}>
              EN
            </span>
          </div>
        </button>

        {/* Desktop Favorites Bookmark Icon Button */}
        <button
          onClick={() => handleNavClick('saved')}
          className="hidden md:flex relative hover:opacity-60 transition-opacity cursor-pointer items-center justify-center p-1"
          aria-label={`${t.navSaved} (${savedCount})`}
          title={t.savedTitle}
          style={{ color: heroTextColor, filter: shadowValue ? 'drop-shadow(0 2px 4px rgba(0,0,0,0.5))' : undefined }}
        >
          <Bookmark
            strokeWidth={1.75}
            style={{ width: 'var(--icon)', height: 'var(--icon)' }}
          />
          {savedCount > 0 && (
            <span className="absolute -top-1.5 -right-2 bg-black text-white font-orbitron font-bold text-[9px] w-4 h-4 rounded-full flex items-center justify-center leading-none shadow-xs">
              {savedCount}
            </span>
          )}
        </button>
      </nav>
    </header>
  );
};
