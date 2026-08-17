import React, { useState, useMemo, useRef, useEffect } from 'react';
import { ArrowUpRight, Sparkles, Compass, Download, Map, X, Search } from 'lucide-react';
import { CheckerboardGrid, WireframeGlobe, CornerBracket, PemprovSumbarLogo } from './CustomIcons';

import { DrawerType, AppSettings } from '../types';
import { Language, translations } from '../lib/translations';
import { DESTINATIONS, CULTURE_ITEMS, CULINARY_ITEMS, EVENTS_SCHEDULE, HOT_INFO_ITEMS } from '../data/content';

interface HeroProps {
  onOpenDrawer: (type: DrawerType) => void;
  lang: Language;
  appSettings?: AppSettings;
  searchQuery?: string;
  onSearchQueryChange?: (q: string) => void;
}

export const Hero: React.FC<HeroProps> = ({
  onOpenDrawer,
  lang,
  appSettings,
  searchQuery = '',
  onSearchQueryChange,
}) => {
  const t = translations[lang];
  const [isExploreModalOpen, setIsExploreModalOpen] = useState(false);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const searchContainerRef = useRef<HTMLDivElement>(null);

  // Secret Admin Trigger: Clicking Pemprov Sumbar logo 6 times in rapid sequence opens Admin Panel
  const logoClickCountRef = useRef(0);
  const logoClickTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handlePemprovLogoClick = () => {
    logoClickCountRef.current += 1;
    if (logoClickTimerRef.current) clearTimeout(logoClickTimerRef.current);

    if (logoClickCountRef.current >= 6) {
      logoClickCountRef.current = 0;
      onOpenDrawer('admin');
    } else {
      logoClickTimerRef.current = setTimeout(() => {
        logoClickCountRef.current = 0;
      }, 2000);
    }
  };

  // Close search dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(e.target as Node)) {
        setIsSearchFocused(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Combined searchable index across all Sumbar tourism items
  const allSearchableItems = useMemo(() => {
    const items: Array<{
      id: string;
      title: string;
      titleEn?: string;
      desc: string;
      descEn?: string;
      icon: string;
      categoryLabel: string;
      categoryLabelEn: string;
      drawerType: DrawerType;
      keywords: string;
    }> = [];

    DESTINATIONS.forEach(d => {
      items.push({
        id: d.id,
        title: d.title,
        titleEn: d.titleEn || d.title,
        desc: d.description,
        descEn: d.descriptionEn || d.description,
        icon: '🏔️',
        categoryLabel: 'Destinasi',
        categoryLabelEn: 'Destination',
        drawerType: 'destinations',
        keywords: `${d.title} ${d.titleEn || ''} ${d.regency} ${d.category} ${d.description}`.toLowerCase()
      });
    });

    CULTURE_ITEMS.forEach(c => {
      items.push({
        id: c.id,
        title: c.title,
        titleEn: c.titleEn || c.title,
        desc: c.description,
        descEn: c.descriptionEn || c.description,
        icon: '🏛️',
        categoryLabel: 'Kebudayaan',
        categoryLabelEn: 'Culture',
        drawerType: 'culture',
        keywords: `${c.title} ${c.titleEn || ''} ${c.category} ${c.description}`.toLowerCase()
      });
    });

    CULINARY_ITEMS.forEach(c => {
      items.push({
        id: c.id,
        title: c.title,
        titleEn: c.titleEn || c.title,
        desc: c.description,
        descEn: c.descriptionEn || c.description,
        icon: '🍲',
        categoryLabel: 'Kuliner',
        categoryLabelEn: 'Culinary',
        drawerType: 'culinary',
        keywords: `${c.title} ${c.titleEn || ''} ${c.type} ${c.description}`.toLowerCase()
      });
    });

    EVENTS_SCHEDULE.forEach(e => {
      items.push({
        id: e.id,
        title: e.title,
        titleEn: e.titleEn || e.title,
        desc: e.description,
        descEn: e.descriptionEn || e.description,
        icon: '📅',
        categoryLabel: 'Event',
        categoryLabelEn: 'Event',
        drawerType: 'events',
        keywords: `${e.title} ${e.titleEn || ''} ${e.location} ${e.description}`.toLowerCase()
      });
    });

    HOT_INFO_ITEMS.forEach(h => {
      items.push({
        id: h.id,
        title: h.title,
        titleEn: h.titleEn || h.title,
        desc: h.description,
        descEn: h.descriptionEn || h.description,
        icon: '🔥',
        categoryLabel: 'Berita',
        categoryLabelEn: 'News',
        drawerType: 'hotinfo',
        keywords: `${h.title} ${h.titleEn || ''} ${h.category} ${h.description}`.toLowerCase()
      });
    });

    return items;
  }, []);

  const searchResults = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return [];
    return allSearchableItems.filter(item => item.keywords.includes(q)).slice(0, 7);
  }, [searchQuery, allSearchableItems]);

  const heroTextColor = appSettings?.heroTextColor || '#000000';
  const heroTextShadow = appSettings?.heroTextShadow !== false;

  const shadowValue = heroTextShadow
    ? heroTextColor.toLowerCase() === '#ffffff' || heroTextColor.toLowerCase() === '#fff'
      ? '0 2px 10px rgba(0,0,0,0.85), 0 0 4px rgba(0,0,0,0.9)'
      : '0 2px 8px rgba(255,255,255,0.8), 0 0 2px rgba(255,255,255,0.9)'
    : undefined;

  const heroTextStyle: React.CSSProperties = {
    color: heroTextColor,
    textShadow: shadowValue,
  };

  const bracketStyle: React.CSSProperties = {
    color: heroTextColor,
    filter: shadowValue ? 'drop-shadow(0px 2px 4px rgba(0,0,0,0.5))' : undefined,
  };

  return (
    <>
      <main
        className="flex-1 flex flex-col lg:flex-row justify-between items-stretch lg:items-center z-10 relative px-[var(--pad-x)]"
        style={{
          paddingTop: 'var(--main-py)',
          paddingBottom: 'clamp(5rem, 8vh, 4rem)',
          gap: 'var(--section-gap)',
        }}
      >
        {/* Left Block (Headline & Action Buttons) */}
        <div className="flex flex-col justify-center items-start space-y-3.5 max-w-4xl">
          {/* Top-Left Corner Bracket */}
          <div style={bracketStyle} className="flex items-center gap-3">
            <CornerBracket type="TL" />
          </div>

          {/* Main Headline */}
          <h1
            className="font-orbitron font-black uppercase tracking-[0.06em] leading-[1.04] select-none pt-1 transition-colors duration-300"
            style={{ ...heroTextStyle, fontSize: 'var(--headline)' }}
          >
            <div>DISCOVER</div>
            <div>WEST SUMATRA</div>
            <div className="flex items-center gap-2 sm:gap-4 flex-wrap">
              <span>PARADISE</span>
              <CheckerboardGrid style={{ color: heroTextColor }} className="transition-colors duration-300" />
            </div>
          </h1>

          {/* Subtitle / Description */}
          <p
            className="font-jakarta max-w-xl text-xs sm:text-sm font-medium leading-relaxed pt-1 transition-colors duration-300"
            style={heroTextStyle}
          >
            {t.heroDesc}
          </p>

          {/* Bottom-Left Corner Bracket */}
          <div style={bracketStyle} className="pb-1">
            <CornerBracket type="BL" />
          </div>

          {/* Combined Action Buttons & Search Panel Container (Matched Exact Width) */}
          <div className="inline-flex flex-col items-stretch gap-2.5 pt-2 max-w-full">
            {/* Action Buttons Row */}
            <div className="flex items-center gap-3 flex-wrap">
              {/* UNI MALA AI Assistant Primary CTA */}
              <button
                onClick={() => onOpenDrawer('formai')}
                className="group inline-flex items-center justify-center bg-black text-white border border-black rounded-md font-jakarta font-bold uppercase tracking-[0.16em] hover:bg-gray-800 transition-all duration-200 cursor-pointer focus:outline-none shadow-sm"
                style={{
                  fontSize: 'var(--body)',
                  paddingInline: 'var(--btn-px)',
                  paddingBlock: 'var(--btn-py)',
                  gap: 'var(--btn-gap)',
                }}
              >
                <Sparkles className="w-4 h-4 text-yellow-300 animate-pulse" />
                <span>{t.heroBtnAiPlanner}</span>
                <ArrowUpRight
                  className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  style={{ width: 'var(--icon)', height: 'var(--icon)' }}
                />
              </button>

              {/* Mulai Jelajah Main Button - Opens Destinations Sub-menu directly */}
              <button
                onClick={() => onOpenDrawer('destinations')}
                className="group inline-flex items-center justify-center border border-gray-400 bg-white/90 backdrop-blur-xs rounded-md font-jakarta font-bold uppercase tracking-[0.16em] text-black hover:bg-red-600 hover:text-white hover:border-red-600 transition-all duration-200 cursor-pointer focus:outline-none shadow-sm"
                style={{
                  fontSize: 'var(--body)',
                  paddingInline: 'var(--btn-px)',
                  paddingBlock: 'var(--btn-py)',
                  gap: 'var(--btn-gap)',
                }}
              >
                <Compass className="w-4.5 h-4.5 text-red-600 group-hover:text-white transition-colors animate-pulse" />
                <span>{t.heroBtnExplore}</span>
              </button>
            </div>

            {/* Premium Search Bar Panel - Width stretches 100% to match exact length of Buttons Row */}
            <div ref={searchContainerRef} className="w-full relative z-30 font-jakarta">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (onOpenDrawer) onOpenDrawer('search');
              }}
              className="relative flex items-center bg-white/95 backdrop-blur-md border-2 border-gray-300 hover:border-red-500 focus-within:border-red-600 rounded-xl shadow-xl transition-all p-1"
            >
              {/* Kaca Pembesar Icon Badge */}
              <div 
                onClick={() => {
                  if (onOpenDrawer) onOpenDrawer('search');
                }}
                className="pl-3 pr-2 text-red-600 flex items-center justify-center cursor-pointer"
              >
                <Search className="w-5 h-5 animate-pulse" />
              </div>

              {/* Input Field */}
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => {
                  if (onSearchQueryChange) onSearchQueryChange(e.target.value);
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    if (onOpenDrawer) onOpenDrawer('search');
                  }
                }}
                placeholder={
                  lang === 'en'
                    ? "Cari Harau, Jam Gadang, Rendang, Sate, Pariangan..."
                    : "Ketik pencarian (cth: Harau, Jam Gadang, Rendang, Sate, Pariangan)..."
                }
                className="w-full py-2 px-1 bg-transparent text-xs sm:text-sm text-gray-900 placeholder-gray-400 font-semibold transition-all focus:outline-none"
              />

              {/* Clear Input Button if query exists */}
              {searchQuery && (
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    if (onSearchQueryChange) onSearchQueryChange('');
                  }}
                  className="p-1.5 rounded-full text-gray-400 hover:text-black hover:bg-gray-100 transition-colors mr-1 cursor-pointer"
                  title="Clear"
                >
                  <X className="w-4 h-4" />
                </button>
              )}

              {/* Tombol CARI Dedicated Button */}
              <button
                type="submit"
                onClick={() => onOpenDrawer('search')}
                className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-bold text-xs uppercase tracking-wider px-4 sm:px-6 py-2.5 rounded-lg flex items-center gap-2 shadow-md hover:shadow-lg transition-all cursor-pointer shrink-0"
              >
                <Search className="w-3.5 h-3.5" />
                <span>{lang === 'en' ? 'SEARCH' : 'CARI'}</span>
              </button>
            </form>

            {/* Real-time Search Results Dropdown Panel */}
            {isSearchFocused && searchQuery.trim().length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white/98 backdrop-blur-md rounded-xl shadow-2xl border border-gray-200 overflow-hidden max-h-[380px] overflow-y-auto z-50 animate-fade-in divide-y divide-gray-100">
                {searchResults.length > 0 ? (
                  searchResults.map((item, idx) => (
                    <div
                      key={idx}
                      onClick={() => {
                        if (onSearchQueryChange) onSearchQueryChange('');
                        setIsSearchFocused(false);
                        onOpenDrawer(item.drawerType);
                      }}
                      className="p-3.5 hover:bg-red-50/80 transition-colors cursor-pointer flex items-center justify-between group"
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-xl bg-gray-100 p-2 rounded-lg group-hover:scale-110 transition-transform shrink-0">
                          {item.icon}
                        </span>
                        <div>
                          <h4 className="font-bold text-xs sm:text-sm text-gray-900 group-hover:text-red-600 transition-colors">
                            {lang === 'en' && item.titleEn ? item.titleEn : item.title}
                          </h4>
                          <p className="text-[11px] text-gray-500 line-clamp-1">
                            {lang === 'en' && item.descEn ? item.descEn : item.desc}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 shrink-0">
                        <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-gray-100 text-gray-600 group-hover:bg-red-600 group-hover:text-white transition-colors">
                          {lang === 'en' ? item.categoryLabelEn : item.categoryLabel}
                        </span>
                        <ArrowUpRight className="w-4 h-4 text-gray-400 group-hover:text-red-600 group-hover:translate-x-0.5 transition-all" />
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="p-4 text-center text-xs text-gray-500 font-medium">
                    {lang === 'en'
                      ? `Tidak ada informasi ditemukan untuk "${searchQuery}"`
                      : `Tidak ada informasi ditemukan untuk "${searchQuery}"`}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

        {/* Right Lower Feature Block */}
        <div
          className="self-start lg:self-end mt-8 lg:mt-0 relative flex flex-col justify-between"
          style={{
            minWidth: 'var(--feature-min)',
            padding: 'var(--feature-pad)',
          }}
        >
          {/* Absolute Corner Brackets framing the box */}
          <div style={bracketStyle} className="absolute top-0 left-0">
            <CornerBracket type="TL" />
          </div>
          <div style={bracketStyle} className="absolute top-0 right-0">
            <CornerBracket type="TR" />
          </div>
          <div style={bracketStyle} className="absolute bottom-0 left-0">
            <CornerBracket type="BL" />
          </div>
          <div style={bracketStyle} className="absolute bottom-0 right-0">
            <CornerBracket type="BR" />
          </div>

          {/* Official Tourism Board Metadata */}
          <div className="flex flex-col space-y-4">

            <div className="flex items-center gap-3.5 transition-colors duration-300 pt-2 border-t border-gray-200/40">
              <div
                onClick={handlePemprovLogoClick}
                className="cursor-default shrink-0 select-none"
              >
                <PemprovSumbarLogo size={48} />
              </div>
              <div
                className="font-jakarta font-bold uppercase tracking-[0.14em] leading-tight transition-colors duration-300 select-none"
                style={{ ...heroTextStyle, fontSize: 'var(--body)' }}
              >
                <div>DINAS PARIWISATA</div>
                <div title="Dinas Pariwisata Sumatera Barat">
                  PROVINSI SUMATERA BARAT
                </div>
                <div style={{ color: heroTextColor, opacity: 0.8 }} className="font-normal text-xs mt-1 tracking-normal normal-case transition-colors duration-300">
                  {lang === 'en'
                    ? 'Official Tourism Portal for West Sumatra.'
                    : 'Portal Resmi Pariwisata Provinsi Sumatera Barat.'}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Interactive Category Selector Modal (Opens upon clicking Mulai Jelajah) */}
      {isExploreModalOpen && (
        <div className="fixed inset-0 z-[120] bg-black/75 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in font-jakarta">
          <div className="bg-white w-full max-w-4xl rounded-2xl p-6 sm:p-8 shadow-2xl relative border border-gray-200 space-y-6 max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-gray-100 pb-4">
              <div>
                <div className="flex items-center gap-2">
                  <Compass className="w-6 h-6 text-red-600 animate-spin-slow" />
                  <h3 className="font-orbitron font-extrabold text-lg sm:text-xl text-black uppercase tracking-wider">
                    {lang === 'en' ? 'Explore West Sumatra Categories' : 'Pilih Kategori Jelajah Wisata'}
                  </h3>
                </div>
                <p className="text-gray-500 text-xs mt-1">
                  {lang === 'en' 
                    ? 'Select what you want to explore in Minangkabau Land' 
                    : 'Silakan pilih kategori pariwisata Sumatera Barat yang ingin Anda jelajahi'}
                </p>
              </div>

              <button
                onClick={() => setIsExploreModalOpen(false)}
                className="p-2 rounded-full hover:bg-gray-100 transition-colors text-gray-500 hover:text-black cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Grid 6 Categories */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {/* 1. Destinasi */}
              <div 
                onClick={() => { setIsExploreModalOpen(false); onOpenDrawer('destinations'); }}
                className="group bg-gradient-to-br from-red-50 to-white border border-red-200 rounded-xl p-5 hover:shadow-lg hover:border-red-500 transition-all cursor-pointer flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <div className="w-10 h-10 rounded-lg bg-red-600 text-white flex items-center justify-center text-xl shadow-sm group-hover:scale-110 transition-transform">
                    🏔️
                  </div>
                  <h4 className="font-orbitron font-bold text-sm text-black uppercase tracking-wider">
                    {t.navDestinations}
                  </h4>
                  <p className="text-xs text-gray-600 leading-relaxed">
                    Jelajahi danau, gunung, pantai bahari, desa wisata, dan pesona alam Sumbar.
                  </p>
                </div>
                <div className="mt-4 flex items-center justify-between text-xs font-bold text-red-600 group-hover:translate-x-1 transition-transform">
                  <span>Buka Destinasi</span>
                  <ArrowUpRight className="w-4 h-4" />
                </div>
              </div>

              {/* 2. Kebudayaan */}
              <div 
                onClick={() => { setIsExploreModalOpen(false); onOpenDrawer('culture'); }}
                className="group bg-gradient-to-br from-purple-50 to-white border border-purple-200 rounded-xl p-5 hover:shadow-lg hover:border-purple-500 transition-all cursor-pointer flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <div className="w-10 h-10 rounded-lg bg-purple-600 text-white flex items-center justify-center text-xl shadow-sm group-hover:scale-110 transition-transform">
                    🏛️
                  </div>
                  <h4 className="font-orbitron font-bold text-sm text-black uppercase tracking-wider">
                    {t.navCulture}
                  </h4>
                  <p className="text-xs text-gray-600 leading-relaxed">
                    Seni tari, arsitektur Rumah Gadang, tradisi adat, dan filosofi Minangkabau.
                  </p>
                </div>
                <div className="mt-4 flex items-center justify-between text-xs font-bold text-purple-600 group-hover:translate-x-1 transition-transform">
                  <span>Buka Kebudayaan</span>
                  <ArrowUpRight className="w-4 h-4" />
                </div>
              </div>

              {/* 3. Kuliner */}
              <div 
                onClick={() => { setIsExploreModalOpen(false); onOpenDrawer('culinary'); }}
                className="group bg-gradient-to-br from-amber-50 to-white border border-amber-200 rounded-xl p-5 hover:shadow-lg hover:border-amber-500 transition-all cursor-pointer flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <div className="w-10 h-10 rounded-lg bg-amber-600 text-white flex items-center justify-center text-xl shadow-sm group-hover:scale-110 transition-transform">
                    🍲
                  </div>
                  <h4 className="font-orbitron font-bold text-sm text-black uppercase tracking-wider">
                    {t.navCulinary}
                  </h4>
                  <p className="text-xs text-gray-600 leading-relaxed">
                    Kelezatan Rendang warisan UNESCO, Sate Padang, Teh Talua, & kudapan khas.
                  </p>
                </div>
                <div className="mt-4 flex items-center justify-between text-xs font-bold text-amber-600 group-hover:translate-x-1 transition-transform">
                  <span>Buka Kuliner</span>
                  <ArrowUpRight className="w-4 h-4" />
                </div>
              </div>

              {/* 4. Event */}
              <div 
                onClick={() => { setIsExploreModalOpen(false); onOpenDrawer('events'); }}
                className="group bg-gradient-to-br from-blue-50 to-white border border-blue-200 rounded-xl p-5 hover:shadow-lg hover:border-blue-500 transition-all cursor-pointer flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <div className="w-10 h-10 rounded-lg bg-blue-600 text-white flex items-center justify-center text-xl shadow-sm group-hover:scale-110 transition-transform">
                    📅
                  </div>
                  <h4 className="font-orbitron font-bold text-sm text-black uppercase tracking-wider">
                    {t.navEvents}
                  </h4>
                  <p className="text-xs text-gray-600 leading-relaxed">
                    Jadwal festival budaya, Pacu Jawi, Tour de Singkarak, & event tahunan.
                  </p>
                </div>
                <div className="mt-4 flex items-center justify-between text-xs font-bold text-blue-600 group-hover:translate-x-1 transition-transform">
                  <span>Buka Jadwal Event</span>
                  <ArrowUpRight className="w-4 h-4" />
                </div>
              </div>

              {/* 5. Unduhan */}
              <div 
                onClick={() => { setIsExploreModalOpen(false); onOpenDrawer('download'); }}
                className="group bg-gradient-to-br from-emerald-50 to-white border border-emerald-200 rounded-xl p-5 hover:shadow-lg hover:border-emerald-500 transition-all cursor-pointer flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <div className="w-10 h-10 rounded-lg bg-emerald-600 text-white flex items-center justify-center text-xl shadow-sm group-hover:scale-110 transition-transform">
                    📥
                  </div>
                  <h4 className="font-orbitron font-bold text-sm text-black uppercase tracking-wider">
                    {t.navDownloads}
                  </h4>
                  <p className="text-xs text-gray-600 leading-relaxed">
                    Unduh media kit, leaflet wisata, dan E-Booklet panduan pariwisata PDF.
                  </p>
                </div>
                <div className="mt-4 flex items-center justify-between text-xs font-bold text-emerald-600 group-hover:translate-x-1 transition-transform">
                  <span>Buka Unduhan PDF</span>
                  <ArrowUpRight className="w-4 h-4" />
                </div>
              </div>

              {/* 6. Peta Interaktif */}
              <div 
                onClick={() => { setIsExploreModalOpen(false); onOpenDrawer('map'); }}
                className="group bg-gradient-to-br from-red-100 to-white border border-red-300 rounded-xl p-5 hover:shadow-lg hover:border-red-600 transition-all cursor-pointer flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <div className="w-10 h-10 rounded-lg bg-red-700 text-white flex items-center justify-center text-xl shadow-sm group-hover:scale-110 transition-transform">
                    🗺️
                  </div>
                  <h4 className="font-orbitron font-bold text-sm text-black uppercase tracking-wider">
                    {t.navMap}
                  </h4>
                  <p className="text-xs text-gray-600 leading-relaxed">
                    Tampilan peta interaktif Minangkabau dengan lokasi realtime titik wisata.
                  </p>
                </div>
                <div className="mt-4 flex items-center justify-between text-xs font-bold text-red-700 group-hover:translate-x-1 transition-transform">
                  <span>Buka Peta Interaktif</span>
                  <ArrowUpRight className="w-4 h-4" />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
