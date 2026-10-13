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
    iconSrc: string;
    iconWhiteSrc: string;
    color: string;
    hoverTextColor: string;
  }[] = [
    {
      id: 'destinations',
      label: t.navDestinations,
      iconSrc: '/images/nav/header/nav_destinasi.png',
      iconWhiteSrc: '/images/nav/header/nav_destinasi_white.png',
      color: '#386641',
      hoverTextColor: '#ffffff',
    },
    {
      id: 'culture',
      label: t.navCulture,
      iconSrc: '/images/nav/header/nav_kebudayaan.png',
      iconWhiteSrc: '/images/nav/header/nav_kebudayaan_white.png',
      color: '#6a994e',
      hoverTextColor: '#ffffff',
    },
    {
      id: 'culinary',
      label: t.navCulinary,
      iconSrc: '/images/nav/header/nav_kuliner.png',
      iconWhiteSrc: '/images/nav/header/nav_kuliner_white.png',
      color: '#a7c957',
      hoverTextColor: '#1b3815',
    },
    {
      id: 'souvenirs',
      label: t.navSouvenirs,
      iconSrc: '/images/nav/header/nav_oleholeh.png',
      iconWhiteSrc: '/images/nav/header/nav_oleholeh_white.png',
      color: '#f2e8cf',
      hoverTextColor: '#2b2118',
    },
    {
      id: 'events',
      label: t.navEvents,
      iconSrc: '/images/nav/header/nav_event.png',
      iconWhiteSrc: '/images/nav/header/nav_event_white.png',
      color: '#bc4749',
      hoverTextColor: '#ffffff',
    },
    {
      id: 'download',
      label: t.navDownloads,
      iconSrc: '/images/nav/header/nav_unduh.png',
      iconWhiteSrc: '/images/nav/header/nav_unduh_white.png',
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
        {/* Logo (Left) - Sized proportionally so end of MALALA aligns with end of AI */}
        <button
          onClick={onCloseDrawer}
          className="w-[104px] sm:w-[128px] md:w-[148px] flex flex-col items-stretch cursor-pointer hover:opacity-85 transition-opacity text-left focus:outline-none group py-0.5 shrink-0"
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

          {/* Tagline Selalu Satu Baris & Pas Sejajar Rata Kiri-Kanan Lebar Logo */}
          <div
            className="flex justify-between items-center w-full font-jakarta text-[5.5px] sm:text-[6.8px] md:text-[8px] font-bold mt-0.5 uppercase whitespace-nowrap tracking-[0.015em] select-none transition-colors duration-300"
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
        <div className="flex items-center gap-1.5 sm:gap-2 md:hidden shrink-0">
          {/* Touch-Friendly Language Toggle showing ID / EN clearly */}
          <button
            onClick={onToggleLang}
            className="min-h-[38px] px-2.5 py-1 rounded-full border border-gray-300 bg-white hover:border-black transition-all cursor-pointer font-jakarta shadow-xs flex items-center justify-center gap-1 active:scale-95"
            title={lang === 'id' ? 'Switch to English' : 'Ganti ke Bahasa Indonesia'}
            aria-label="Toggle language ID / EN"
          >
            <Globe className="w-3.5 h-3.5 text-red-600 shrink-0" />
            <div className="flex items-center gap-0.5 text-[10px] font-bold tracking-wider uppercase leading-none">
              <span className={`px-1.5 py-1 rounded transition-colors ${lang === 'id' ? 'bg-black text-white' : 'text-gray-400'}`}>
                ID
              </span>
              <span className="text-gray-300 font-normal">/</span>
              <span className={`px-1.5 py-1 rounded transition-colors ${lang === 'en' ? 'bg-black text-white' : 'text-gray-400'}`}>
                EN
              </span>
            </div>
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
          className="fixed inset-0 bg-black/50 backdrop-blur-xs z-40 md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Mobile Menu Dropdown Panel (Modern 2-Column App Grid - Zero Wasted Space) */}
      {isMobileMenuOpen && (
        <div
          className="md:hidden absolute top-full left-0 right-0 bg-white/98 backdrop-blur-2xl shadow-2xl border-t border-b border-gray-200/90 p-3.5 z-50 rounded-b-3xl animate-fadeIn space-y-2.5 mx-2"
        >
          {/* Header Tag inside Mobile Dropdown */}
          <div className="flex items-center justify-between px-1 pb-1 border-b border-gray-100">
            <span className="text-[10px] font-jakarta font-bold uppercase tracking-widest text-gray-500">
              {lang === 'en' ? 'EXPLORE CATEGORIES' : 'JELAJAHI KATEGORI'}
            </span>
            <span className="text-[9px] font-jakarta font-bold text-red-600 bg-red-50 px-2 py-0.5 rounded-full border border-red-100">
              MALALA SUMBAR
            </span>
          </div>

          {/* 6 Category Tiles in a 2-Column Grid */}
          <div className="grid grid-cols-2 gap-2">
            {primaryNavItems.map((item) => {
              const isActive = activeDrawer === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`flex items-center gap-2 p-2 rounded-2xl border transition-all duration-200 cursor-pointer text-left active:scale-[0.98] ${
                    isActive
                      ? 'shadow-sm text-white font-normal border-transparent'
                      : 'bg-gray-50/90 hover:bg-gray-100 text-gray-800 border-gray-200/70 hover:border-gray-300'
                  }`}
                  style={isActive ? { backgroundColor: item.color } : {}}
                >
                  <div
                    className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 p-1.5 transition-colors ${
                      isActive ? 'bg-white/20' : 'bg-white border border-gray-200/80 shadow-2xs'
                    }`}
                  >
                    <img
                      src={isActive ? item.iconWhiteSrc : item.iconSrc}
                      alt={item.label}
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <span className="font-jakarta font-normal text-[11px] sm:text-[11.5px] uppercase tracking-wider leading-tight line-clamp-1">
                    {item.label}
                  </span>
                </button>
              );
            })}
          </div>

          {/* 2 Full-Width Action Buttons: Peta & Rencanakan Liburan */}
          <div className="pt-1 space-y-2">
            {/* Action 1: Peta Wisata (1 Baris) */}
            <button
              onClick={() => handleNavClick('map')}
              className={`w-full min-h-[44px] px-3.5 py-2.5 rounded-xl border font-jakarta font-normal text-[12px] uppercase tracking-wider transition-all duration-200 cursor-pointer flex items-center justify-center gap-2.5 shadow-xs active:scale-[0.99] ${
                activeDrawer === 'map'
                  ? 'bg-red-600 text-white border-red-600'
                  : 'bg-emerald-700 text-white border-emerald-700 hover:bg-emerald-800'
              }`}
            >
              <img
                src="/images/nav/header/nav_peta_white.png"
                alt="Peta"
                className="w-5 h-5 object-contain"
              />
              <span className="whitespace-nowrap">{t.navMap}</span>
            </button>

            {/* Action 2: Rencanakan Liburan Anda (1 Baris Saja) */}
            <button
              onClick={() => handleNavClick('formai')}
              className={`w-full min-h-[44px] px-3.5 py-2.5 rounded-xl border bg-black text-white border-black hover:bg-gray-900 transition-all duration-200 cursor-pointer flex items-center justify-center gap-2.5 shadow-xs active:scale-[0.99] ${
                activeDrawer === 'formai' ? 'ring-2 ring-offset-1 ring-black shadow-md' : ''
              }`}
            >
              <img
                src="/images/nav/header/nav_rencana_white.png"
                alt="Rencana"
                className="w-5 h-5 object-contain"
              />
              <span className="font-jakarta font-normal text-[12px] uppercase tracking-wider whitespace-nowrap">
                {lang === 'en' ? 'PLAN YOUR VACATION' : 'RENCANAKAN LIBURAN ANDA'}
              </span>
            </button>
          </div>
        </div>
      )}

      {/* Desktop Nav Links (Clean Minimalist Typography, No Logos, Perfectly Balanced Font) */}
      <nav
        className="hidden md:flex flex-row items-center gap-1.5 lg:gap-2.5 font-jakarta font-normal uppercase text-black"
        style={{ fontSize: 'clamp(0.68rem, 0.25vw + 0.52rem, 0.82rem)' }}
      >
        {primaryNavItems.map((item) => {
          const isActive = activeDrawer === item.id;
          return (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={`group relative overflow-hidden min-h-0 px-2.5 py-1 lg:px-3 lg:py-1.5 rounded-full border transition-all duration-300 cursor-pointer flex items-center justify-center active:scale-[0.98] ${
                isActive
                  ? 'border-transparent font-normal shadow-sm'
                  : 'border-transparent hover:border-transparent'
              }`}
              style={{
                ...(!isActive ? headerTextStyle : { color: item.hoverTextColor }),
                '--hover-text': item.hoverTextColor,
              } as React.CSSProperties}
            >
              {/* Sliding Curved Color Box */}
              <span
                aria-hidden="true"
                className={`pointer-events-none absolute inset-0 rounded-full transition-transform duration-200 ease-out -translate-x-[101%] group-hover:translate-x-0 ${
                  isActive ? 'translate-x-0 shadow-xs' : ''
                }`}
                style={{ backgroundColor: item.color }}
              />

              {/* Text Label (Clean Minimalist Typography without Logo/Icon) */}
              <span
                className={`relative z-10 text-[11px] lg:text-[12px] xl:text-[12.5px] font-normal tracking-[0.06em] lg:tracking-[0.08em] transition-colors duration-150 select-none whitespace-nowrap ${
                  !isActive ? 'group-hover:text-[var(--hover-text)] group-hover:[text-shadow:none]' : ''
                }`}
              >
                {item.label}
              </span>
            </button>
          );
        })}

        {/* Desktop Peta Wisata Button (Uniform 2-Line Panel, No Logo) */}
        <button
          onClick={() => handleNavClick('map')}
          className={`w-[100px] lg:w-[112px] h-[36px] lg:h-[38px] flex flex-col items-center justify-center rounded-xl border font-jakarta font-normal uppercase tracking-wider text-[9.5px] lg:text-[10.5px] leading-[1.18] transition-all duration-200 cursor-pointer shadow-xs hover:shadow-md active:scale-[0.98] select-none text-center ${
            activeDrawer === 'map'
              ? 'bg-red-600 text-white border-red-600'
              : 'bg-emerald-700 text-white border-emerald-700 hover:bg-emerald-800 hover:border-emerald-800'
          }`}
          title={t.navMap}
        >
          <span>{lang === 'en' ? 'TOURISM' : 'PETA'}</span>
          <span>{lang === 'en' ? 'MAP' : 'WISATA'}</span>
        </button>

        {/* Desktop Rencanakan Liburan Anda (Uniform 2-Line Panel, Same Size as Peta Wisata, No Logo) */}
        <button
          onClick={() => handleNavClick('formai')}
          className={`w-[100px] lg:w-[112px] h-[36px] lg:h-[38px] flex flex-col items-center justify-center rounded-xl border bg-black text-white border-black hover:bg-gray-800 hover:border-gray-800 transition-all duration-200 cursor-pointer shadow-xs hover:shadow-md shrink-0 active:scale-[0.98] font-jakarta font-normal uppercase tracking-wider text-[9.5px] lg:text-[10.5px] leading-[1.18] select-none text-center ${
            activeDrawer === 'formai' ? 'ring-2 ring-offset-1 ring-black shadow-md' : ''
          }`}
          title={lang === 'en' ? 'Plan Your Vacation' : 'Rencanakan Liburan Anda'}
        >
          <span>{lang === 'en' ? 'PLAN YOUR' : 'RENCANAKAN'}</span>
          <span>{lang === 'en' ? 'VACATION' : 'LIBURAN ANDA'}</span>
        </button>

        <span className="text-gray-300 font-light select-none">|</span>

        {/* Desktop Language Switcher Button with Globe Logo & ID | EN Side-By-Side */}
        <button
          onClick={onToggleLang}
          className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border border-gray-300 bg-white hover:border-black transition-all cursor-pointer font-jakarta shadow-2xs group"
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
          className="relative hover:opacity-60 transition-opacity cursor-pointer items-center justify-center p-1"
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
