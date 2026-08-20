import React, { useState, useMemo, useRef, useEffect } from 'react';
import { ArrowUpRight, Sparkles, Compass, Download, Map, X, Search, Calendar, MapPin, ChevronLeft, ChevronRight, Youtube, MessageCircle } from 'lucide-react';
import { CheckerboardGrid, WireframeGlobe, CornerBracket, PemprovSumbarLogo } from './CustomIcons';

import { DrawerType, AppSettings, EventItem } from '../types';
import { Language, translations } from '../lib/translations';
import { DESTINATIONS, CULTURE_ITEMS, CULINARY_ITEMS, EVENTS_SCHEDULE, HOT_INFO_ITEMS } from '../data/content';

interface HeroProps {
  onOpenDrawer: (type: DrawerType) => void;
  lang: Language;
  appSettings?: AppSettings;
  searchQuery?: string;
  onSearchQueryChange?: (q: string) => void;
  eventItems?: EventItem[];
}

function getYoutubeEmbedUrl(url?: string): string | null {
  if (!url) return null;
  try {
    const trimmed = url.trim();
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=|shorts\/)([^#&?]*).*/;
    const match = trimmed.match(regExp);
    if (match && match[2].length === 11) {
      return `https://www.youtube.com/embed/${match[2]}?autoplay=1&mute=1&loop=1&playlist=${match[2]}&playsinline=1&controls=1&modestbranding=1&rel=0&enablejsapi=1`;
    }
  } catch (e) {
    console.warn('Failed to parse YouTube embed URL:', e);
  }
  return null;
}

export const Hero: React.FC<HeroProps> = ({
  onOpenDrawer,
  lang,
  appSettings,
  searchQuery = '',
  onSearchQueryChange,
  eventItems,
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

  const monthNamesId = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];
  const monthNamesEn = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

  // Precise Event Timeline & 2-Week Window Evaluation
  const evaluateEventTimeline = (scheduleStr: string, isKen?: boolean) => {
    const now = new Date();
    const currentYear = now.getFullYear();
    const currentMonth = now.getMonth(); // 0-11 (7 for August)
    const nowMs = now.getTime();

    const s = (scheduleStr || '').toLowerCase();

    // 1. Weekly / Routine / Year-round events
    if (s.includes('akhir pekan') || s.includes('mingguan') || s.includes('weekend') || s.includes('sepanjang tahun') || s.includes('bergilir')) {
      return {
        isOngoing: true,
        isWithin2Weeks: true,
        daysUntil: 0,
        badgeLabelId: '🔥 Event Rutin Aktif Pekan Ini',
        badgeLabelEn: '🔥 Active Weekly / Routine Event',
        isKEN: Boolean(isKen),
        sortScore: 10
      };
    }

    const monthMap: { [key: string]: number } = {
      'januari': 0, 'january': 0, 'jan': 0,
      'februari': 1, 'february': 1, 'feb': 1,
      'maret': 2, 'march': 2, 'mar': 2,
      'april': 3, 'apr': 3,
      'mei': 4, 'may': 4,
      'juni': 5, 'june': 5, 'jun': 5,
      'juli': 6, 'july': 6, 'jul': 6,
      'agustus': 7, 'august': 7, 'agu': 7, 'aug': 7,
      'september': 8, 'sep': 8, 'sept': 8,
      'oktober': 9, 'october': 9, 'okt': 9, 'oct': 9,
      'november': 10, 'nov': 10,
      'desember': 11, 'december': 11, 'des': 11, 'dec': 11
    };

    let foundMonth: number | null = null;
    for (const [mName, mIdx] of Object.entries(monthMap)) {
      if (s.includes(mName)) {
        foundMonth = mIdx;
        break;
      }
    }

    // 2. Specific day range (e.g. "15 - 20 Agustus", "25 Agustus", "1 - 10 Muharram")
    const dateMatch = s.match(/(\d{1,2})\s*(?:-|sampai|hingga|\/)\s*(\d{1,2})?/);
    if (dateMatch && foundMonth !== null) {
      const startDay = parseInt(dateMatch[1], 10);
      const endDay = dateMatch[2] ? parseInt(dateMatch[2], 10) : startDay;

      let eventYear = currentYear;
      if (foundMonth < currentMonth - 2) {
        eventYear = currentYear + 1;
      }

      const startDate = new Date(eventYear, foundMonth, startDay, 0, 0, 0);
      const endDate = new Date(eventYear, foundMonth, endDay, 23, 59, 59);

      const diffToStartMs = startDate.getTime() - nowMs;
      const diffToEndMs = endDate.getTime() - nowMs;

      const daysToStart = Math.ceil(diffToStartMs / (1000 * 60 * 60 * 24));
      const daysToEnd = Math.ceil(diffToEndMs / (1000 * 60 * 60 * 24));

      // Currently ongoing
      if (nowMs >= startDate.getTime() && nowMs <= endDate.getTime()) {
        return {
          isOngoing: true,
          isWithin2Weeks: true,
          daysUntil: 0,
          badgeLabelId: `🔥 Sedang Berlangsung (${startDay}-${endDay} ${monthNamesId[foundMonth]})`,
          badgeLabelEn: `🔥 Happening Now (${startDay}-${endDay} ${monthNamesEn[foundMonth]})`,
          isKEN: Boolean(isKen),
          sortScore: 1
        };
      }

      // Starting within next 14 days (2 weeks)
      if (daysToStart > 0 && daysToStart <= 14) {
        return {
          isOngoing: false,
          isWithin2Weeks: true,
          daysUntil: daysToStart,
          badgeLabelId: `⏳ Hadir dlm ${daysToStart} Hari (${startDay} ${monthNamesId[foundMonth]})`,
          badgeLabelEn: `⏳ Starts in ${daysToStart} Days (${startDay} ${monthNamesEn[foundMonth]})`,
          isKEN: Boolean(isKen),
          sortScore: 20 + daysToStart
        };
      }

      return {
        isOngoing: false,
        isWithin2Weeks: false,
        daysUntil: daysToStart,
        badgeLabelId: `🗓️ ${startDay} ${monthNamesId[foundMonth]} ${eventYear}`,
        badgeLabelEn: `🗓️ ${monthNamesEn[foundMonth]} ${startDay}, ${eventYear}`,
        isKEN: Boolean(isKen),
        sortScore: 100 + daysToStart
      };
    }

    // 3. Month-based without specific day (e.g. "Agustus", "Tahunan (Agustus/September)")
    if (foundMonth !== null) {
      if (foundMonth === currentMonth) {
        return {
          isOngoing: true,
          isWithin2Weeks: true,
          daysUntil: 0,
          badgeLabelId: `🔥 Bulan Ini (${monthNamesId[foundMonth]})`,
          badgeLabelEn: `🔥 This Month (${monthNamesEn[foundMonth]})`,
          isKEN: Boolean(isKen),
          sortScore: 5
        };
      }

      // Check if next month and within 2 weeks of the 1st of next month
      if (foundMonth === (currentMonth + 1) % 12) {
        const daysUntilNextMonth = (new Date(currentYear, currentMonth + 1, 1).getTime() - nowMs) / (1000 * 60 * 60 * 24);
        if (daysUntilNextMonth <= 14) {
          return {
            isOngoing: false,
            isWithin2Weeks: true,
            daysUntil: Math.max(1, Math.ceil(daysUntilNextMonth)),
            badgeLabelId: `⏳ 2 Minggu Ini (${monthNamesId[foundMonth]})`,
            badgeLabelEn: `⏳ Next 2 Weeks (${monthNamesEn[foundMonth]})`,
            isKEN: Boolean(isKen),
            sortScore: 30
          };
        }
      }
    }

    return {
      isOngoing: false,
      isWithin2Weeks: false,
      daysUntil: 999,
      badgeLabelId: '🗓️ Jadwal CoE Sumbar',
      badgeLabelEn: '🗓️ CoE Event Schedule',
      isKEN: Boolean(isKen),
      sortScore: 999
    };
  };

  const eventsList = eventItems && eventItems.length > 0 ? eventItems : EVENTS_SCHEDULE;

  // Multi-Event Filter: Strictly Ongoing or starting within the next 2 weeks (14 days)
  const activeSpotlightEvents = useMemo(() => {
    if (!eventsList || eventsList.length === 0) return [];
    
    const evaluated = eventsList.map(item => ({
      item,
      timeline: evaluateEventTimeline(item.schedule, item.isKen)
    }));

    // Filter strictly for ongoing or starting within 2 weeks
    const strictlyActive = evaluated.filter(e => e.timeline.isOngoing || e.timeline.isWithin2Weeks);

    if (strictlyActive.length > 0) {
      strictlyActive.sort((a, b) => a.timeline.sortScore - b.timeline.sortScore);
      return strictlyActive;
    }

    // Fallback: If no event in strict 2 weeks, show top 2 closest upcoming events
    evaluated.sort((a, b) => a.timeline.sortScore - b.timeline.sortScore);
    return evaluated.slice(0, 2);
  }, [eventsList]);

  const spotlightDisplayMode = appSettings?.spotlightDisplayMode || 'both';

  // Split into Video Event (if linked with YouTube) and Banner Events (photo banner)
  const videoEvent = useMemo(() => {
    if (spotlightDisplayMode === 'event') return undefined;

    // 1. Check in 2-week active events
    const activeVideo = activeSpotlightEvents.find(e => Boolean(getYoutubeEmbedUrl(e.item.videoUrl || (e.item as any).youtubeUrl)));
    if (activeVideo) return activeVideo;

    // 2. If mode is strictly 'video' and 2-week events don't have video, look across all upcoming events
    if (spotlightDisplayMode === 'video') {
      const allWithVideo = eventsList
        .filter(item => Boolean(getYoutubeEmbedUrl(item.videoUrl || (item as any).youtubeUrl)))
        .map(item => ({
          item,
          timeline: evaluateEventTimeline(item.schedule, item.isKen)
        }));
      if (allWithVideo.length > 0) {
        allWithVideo.sort((a, b) => a.timeline.sortScore - b.timeline.sortScore);
        return allWithVideo[0];
      }
    }

    return undefined;
  }, [activeSpotlightEvents, eventsList, spotlightDisplayMode]);

  const bannerEvents = useMemo(() => {
    if (spotlightDisplayMode === 'video') return [];
    if (videoEvent && spotlightDisplayMode === 'both') {
      return activeSpotlightEvents.filter(e => e !== videoEvent);
    }
    return activeSpotlightEvents;
  }, [activeSpotlightEvents, videoEvent, spotlightDisplayMode]);

  // Carousel index for banner events & rotation with pause on hover
  const [activeBannerIndex, setActiveBannerIndex] = useState(0);
  const [isCarouselPaused, setIsCarouselPaused] = useState(false);

  useEffect(() => {
    if (bannerEvents.length <= 1 || isCarouselPaused) return;

    const timer = setInterval(() => {
      setActiveBannerIndex(prev => (prev + 1) % bannerEvents.length);
    }, 7000);

    return () => clearInterval(timer);
  }, [bannerEvents.length, isCarouselPaused]);

  useEffect(() => {
    if (activeBannerIndex >= bannerEvents.length) {
      setActiveBannerIndex(0);
    }
  }, [bannerEvents.length, activeBannerIndex]);

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

          {/* MINANGKAOS Brand Identity & Text (Left-Bottom) */}
          <div className="flex items-center gap-3.5 transition-colors duration-300 mt-10 sm:mt-16 lg:mt-20 pt-20 sm:pt-28 lg:pt-36 w-full max-w-md">
            <div
              onClick={handlePemprovLogoClick}
              className="cursor-pointer shrink-0 select-none hover:scale-105 transition-transform"
              title="MINANGKAOS"
            >
              <PemprovSumbarLogo size={60} />
            </div>
            <div
              className="font-jakarta text-xs sm:text-[13.5px] font-medium leading-snug transition-colors duration-300 select-none flex-1 min-w-0"
              style={heroTextStyle}
            >
              <div style={{ color: heroTextColor, opacity: 0.95 }} className="transition-colors duration-300">
                {lang === 'en' ? (
                  <>
                    <span>West Sumatra Tourism, Culture &</span>
                    <span className="block mt-0.5">Authentic Culinary by MINANGKAOS.</span>
                  </>
                ) : (
                  <>
                    <span>Kompilasi Pariwisata, Adat &</span>
                    <span className="block mt-0.5">Kuliner Ranah Minang oleh MINANGKAOS.</span>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

        {/* Right Lower Feature Block */}
        {(() => {
          const hasVideoCard = Boolean(spotlightDisplayMode !== 'event' && videoEvent);
          const hasBannerCard = Boolean(spotlightDisplayMode !== 'video' && bannerEvents.length > 0);
          const isDualBanner = hasVideoCard && hasBannerCard;

          if (!hasVideoCard && !hasBannerCard) return null;

          return (
            <div
              className={`self-start relative flex flex-col justify-between w-full sm:w-[380px] lg:w-[400px] max-w-full transition-all duration-300 ${
                isDualBanner
                  ? 'lg:self-center mt-4 lg:mt-0 lg:-translate-y-20 xl:-translate-y-24'
                  : 'lg:self-end mt-6 lg:mt-auto lg:-translate-y-10 xl:-translate-y-14'
              }`}
              style={{
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

              {/* Official Tourism Board Metadata & Upcoming Event Spotlight */}
              <div className="flex flex-col space-y-3 w-full">
            {/* Spotlight 1: Video Event Card (If an active event has a YouTube link) */}
            {videoEvent && (() => {
              const eventItem = videoEvent.item;
              const timeline = videoEvent.timeline;
              const isEn = lang === 'en';
              const title = isEn && eventItem.titleEn ? eventItem.titleEn : eventItem.title;
              const schedule = isEn && eventItem.scheduleEn ? eventItem.scheduleEn : eventItem.schedule;
              const location = isEn && eventItem.locationEn ? eventItem.locationEn : eventItem.location;
              const isKEN = Boolean(eventItem.isKen);
              const ytEmbedUrl = getYoutubeEmbedUrl(eventItem.videoUrl || (eventItem as any).youtubeUrl);

              const getGoogleCalUrl = () => {
                const t = encodeURIComponent(`${title} - Wonderful West Sumatra`);
                const d = encodeURIComponent(`${isEn && eventItem.descriptionEn ? eventItem.descriptionEn : eventItem.description}\n\nJadwal: ${schedule}\nLokasi: ${location}`);
                const l = encodeURIComponent(`${location}, Sumatera Barat`);
                return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${t}&details=${d}&location=${l}`;
              };

              return (
                <div className="w-full bg-white/95 backdrop-blur-md border border-amber-300 rounded-xl p-3.5 shadow-xl space-y-2 relative overflow-hidden group hover:border-black transition-all">
                  <div className="absolute top-0 right-0 w-28 h-28 bg-amber-400/15 rounded-full blur-xl pointer-events-none" />

                  {/* Video Header */}
                  <div className="flex items-center justify-between gap-2 pb-1 border-b border-gray-100 text-[10px] font-jakarta">
                    <div className="flex items-center gap-1.5 font-bold text-amber-900">
                      <Youtube className="w-3.5 h-3.5 text-red-600 animate-pulse" />
                      <span>{isEn ? 'Live Video Event' : 'Video Event Sedang Berlangsung'}</span>
                    </div>
                    {isKEN && (
                      <span className="bg-gradient-to-r from-amber-500 to-amber-600 text-white font-jakarta font-black text-[8px] uppercase px-2 py-0.5 rounded shadow-sm">
                        KEN Kemenparekraf
                      </span>
                    )}
                  </div>

                  {/* YouTube Player */}
                  <div className="relative w-[calc(100%+1.75rem)] aspect-video -mx-3.5 -mt-1 mb-2 overflow-hidden bg-black shrink-0">
                    <iframe
                      src={ytEmbedUrl!}
                      title={title}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                      className="w-full h-full border-0 absolute inset-0"
                    />
                    <div className="absolute top-2 left-2 flex items-center gap-1.5 bg-black/75 backdrop-blur-xs px-2 py-0.5 rounded-full pointer-events-none z-10 shadow-xs">
                      <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                      </span>
                      <span className="font-jakarta font-black text-[9px] uppercase tracking-wider text-white">
                        {isEn ? timeline.badgeLabelEn : timeline.badgeLabelId}
                      </span>
                    </div>
                  </div>

                  {/* Title & Info */}
                  <div className="space-y-0.5">
                    <h4 className="font-orbitron font-bold text-xs uppercase text-gray-900 line-clamp-2 h-8 flex items-center group-hover:text-amber-600 transition-colors leading-tight">
                      {title}
                    </h4>
                    <div className="flex items-center gap-3 text-[10px] text-gray-600 font-medium pt-0.5">
                      <span className="flex items-center gap-1 shrink-0">
                        <Calendar className="w-3 h-3 text-amber-600" />
                        <span>{schedule}</span>
                      </span>
                      <span className="flex items-center gap-1 truncate">
                        <MapPin className="w-3 h-3 text-red-600 shrink-0" />
                        <span className="truncate">{location}</span>
                      </span>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex items-center gap-2 pt-1 border-t border-gray-100">
                    <button
                      onClick={() => onOpenDrawer('events')}
                      className="flex-1 bg-black hover:bg-amber-600 text-white py-1.5 px-2.5 rounded-md text-[10px] font-bold uppercase tracking-wider flex items-center justify-center gap-1 transition-all cursor-pointer shadow-xs"
                    >
                      <span>{isEn ? 'View Calendar' : 'Lihat Jadwal CoE'}</span>
                      <ArrowUpRight className="w-3 h-3" />
                    </button>
                    <a
                      href={getGoogleCalUrl()}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200 py-1.5 px-2.5 rounded-md text-[10px] font-bold uppercase tracking-wider flex items-center justify-center gap-1 transition-all cursor-pointer shrink-0"
                      title={isEn ? 'Add to Google Calendar' : 'Simpan ke Google Calendar'}
                    >
                      <Calendar className="w-3 h-3 text-blue-600" />
                      <span>+ Kalender</span>
                    </a>
                  </div>
                </div>
              );
            })()}

            {/* Spotlight 2: Photo Banner Event Card (New Panel below Video Event or primary card if no video) */}
            {bannerEvents.length > 0 && (() => {
              const activeItemObj = bannerEvents[activeBannerIndex] || bannerEvents[0];
              const eventItem = activeItemObj.item;
              const timeline = activeItemObj.timeline;
              const isEn = lang === 'en';
              const title = isEn && eventItem.titleEn ? eventItem.titleEn : eventItem.title;
              const schedule = isEn && eventItem.scheduleEn ? eventItem.scheduleEn : eventItem.schedule;
              const location = isEn && eventItem.locationEn ? eventItem.locationEn : eventItem.location;
              const isKEN = Boolean(eventItem.isKen);

              const getGoogleCalUrl = () => {
                const t = encodeURIComponent(`${title} - Wonderful West Sumatra`);
                const d = encodeURIComponent(`${isEn && eventItem.descriptionEn ? eventItem.descriptionEn : eventItem.description}\n\nJadwal: ${schedule}\nLokasi: ${location}`);
                const l = encodeURIComponent(`${location}, Sumatera Barat`);
                return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${t}&details=${d}&location=${l}`;
              };

              return (
                <div
                  onMouseEnter={() => setIsCarouselPaused(true)}
                  onMouseLeave={() => setIsCarouselPaused(false)}
                  className="w-full bg-white/95 backdrop-blur-md border border-amber-300 rounded-xl p-3.5 shadow-xl space-y-2 relative overflow-hidden group hover:border-black transition-all"
                >
                  <div className="absolute top-0 right-0 w-28 h-28 bg-amber-400/15 rounded-full blur-xl pointer-events-none" />

                  {/* Multi-Event Mini Header with Carousel Controls */}
                  <div className="flex items-center justify-between gap-2 pb-1 border-b border-gray-100 text-[10px] font-jakarta">
                    <div className="flex items-center gap-1.5 font-bold text-amber-900">
                      <Sparkles className="w-3.5 h-3.5 text-amber-600 animate-pulse" />
                      <span>
                        {videoEvent ? (isEn ? 'Other Active Events (2 Weeks)' : 'Event Banner 2 Minggu Ini') : (isEn ? 'Live & 2-Week Events' : 'Event Sedang / 2 Minggu Ini')}
                      </span>
                    </div>

                    {bannerEvents.length > 1 && (
                      <div className="flex items-center gap-1.5">
                        <span className="text-[9px] font-bold text-gray-500 bg-amber-50 border border-amber-200 px-1.5 py-0.5 rounded">
                          {activeBannerIndex + 1}/{bannerEvents.length}
                        </span>
                        <div className="flex items-center gap-0.5">
                          <button
                            onClick={() => setActiveBannerIndex((prev) => (prev - 1 + bannerEvents.length) % bannerEvents.length)}
                            className="p-1 rounded-md bg-gray-100 hover:bg-black hover:text-white transition-colors cursor-pointer"
                            title="Sebelumnya"
                          >
                            <ChevronLeft className="w-3 h-3" />
                          </button>
                          <button
                            onClick={() => setActiveBannerIndex((prev) => (prev + 1) % bannerEvents.length)}
                            className="p-1 rounded-md bg-gray-100 hover:bg-black hover:text-white transition-colors cursor-pointer"
                            title="Berikutnya"
                          >
                            <ChevronRight className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Photo Banner Image */}
                  {eventItem.imageUrl ? (
                    <div className="relative w-[calc(100%+1.75rem)] aspect-video -mx-3.5 -mt-1 mb-2 overflow-hidden bg-gray-900 shrink-0">
                      <img
                        src={eventItem.imageUrl}
                        alt={title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        onError={(e) => { (e.target as HTMLElement).style.display = 'none'; }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
                      
                      <div className="absolute top-2 left-2 flex items-center gap-1.5 bg-black/60 backdrop-blur-xs px-2 py-0.5 rounded-full">
                        <span className="relative flex h-2 w-2">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                        </span>
                        <span className="font-jakarta font-black text-[9px] uppercase tracking-wider text-white">
                          {isEn ? timeline.badgeLabelEn : timeline.badgeLabelId}
                        </span>
                      </div>

                      {isKEN && (
                        <span className="absolute top-2 right-2 bg-gradient-to-r from-amber-500 to-amber-600 text-white font-jakarta font-black text-[8px] uppercase px-2 py-0.5 rounded shadow-sm">
                          KEN Kemenparekraf
                        </span>
                      )}
                    </div>
                  ) : (
                    <div className="relative h-36 -mx-3.5 -mt-1 mb-2 overflow-hidden rounded-t-lg bg-gradient-to-br from-amber-800 via-stone-900 to-black shrink-0 flex items-center justify-center p-3">
                      <div className="absolute top-2 left-2 flex items-center gap-1.5 bg-black/60 backdrop-blur-xs px-2 py-0.5 rounded-full">
                        <span className="relative flex h-2 w-2">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                        </span>
                        <span className="font-jakarta font-black text-[9px] uppercase tracking-wider text-white">
                          {isEn ? timeline.badgeLabelEn : timeline.badgeLabelId}
                        </span>
                      </div>

                      {isKEN && (
                        <span className="absolute top-2 right-2 bg-gradient-to-r from-amber-500 to-amber-600 text-white font-jakarta font-black text-[8px] uppercase px-2 py-0.5 rounded shadow-2xs">
                          KEN Kemenparekraf
                        </span>
                      )}

                      <div className="text-center text-white/90 space-y-1">
                        <Calendar className="w-6 h-6 mx-auto text-amber-400 opacity-80" />
                        <p className="font-orbitron font-bold text-[11px] uppercase tracking-wider line-clamp-1">{title}</p>
                      </div>
                    </div>
                  )}

                  {/* Multi-Event Dots Indicator */}
                  {bannerEvents.length > 1 && (
                    <div className="flex items-center justify-center gap-1.5 py-0.5">
                      {bannerEvents.map((_, i) => (
                        <button
                          key={i}
                          onClick={() => setActiveBannerIndex(i)}
                          className={`h-1 rounded-full transition-all cursor-pointer ${
                            activeBannerIndex === i ? 'w-5 bg-amber-600' : 'w-1.5 bg-gray-300 hover:bg-gray-400'
                          }`}
                          title={`Event ${i + 1}`}
                        />
                      ))}
                    </div>
                  )}

                  {/* Title & Info with fixed height */}
                  <div className="space-y-0.5">
                    <h4 className="font-orbitron font-bold text-xs uppercase text-gray-900 line-clamp-2 h-8 flex items-center group-hover:text-amber-600 transition-colors leading-tight">
                      {title}
                    </h4>
                    <div className="flex items-center gap-3 text-[10px] text-gray-600 font-medium pt-0.5">
                      <span className="flex items-center gap-1 shrink-0">
                        <Calendar className="w-3 h-3 text-amber-600" />
                        <span>{schedule}</span>
                      </span>
                      <span className="flex items-center gap-1 truncate">
                        <MapPin className="w-3 h-3 text-red-600 shrink-0" />
                        <span className="truncate">{location}</span>
                      </span>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex items-center gap-2 pt-1 border-t border-gray-100">
                    <button
                      onClick={() => onOpenDrawer('events')}
                      className="flex-1 bg-black hover:bg-amber-600 text-white py-1.5 px-2.5 rounded-md text-[10px] font-bold uppercase tracking-wider flex items-center justify-center gap-1 transition-all cursor-pointer shadow-xs"
                    >
                      <span>{isEn ? 'View Calendar' : 'Lihat Jadwal CoE'}</span>
                      <ArrowUpRight className="w-3 h-3" />
                    </button>

                    <a
                      href={getGoogleCalUrl()}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200 py-1.5 px-2.5 rounded-md text-[10px] font-bold uppercase tracking-wider flex items-center justify-center gap-1 transition-all cursor-pointer shrink-0"
                      title={isEn ? 'Add to Google Calendar' : 'Simpan ke Google Calendar'}
                    >
                      <Calendar className="w-3 h-3 text-blue-600" />
                      <span>+ Kalender</span>
                    </a>
                  </div>
                </div>
              );
            })()}

          </div>
        </div>
      );
    })()}

        {/* Tanya Uni Mala Guide Floating Bubble (Bottom-Right, Shifted slightly left) */}
        <div className="absolute bottom-10 right-12 sm:bottom-14 sm:right-16 lg:bottom-16 lg:right-20 z-50 animate-fade-in block">
          <button
            onClick={() => onOpenDrawer('chat')}
            aria-label="Tanya Uni Mala Guide"
            className="group relative flex items-center justify-center transition-all duration-300 hover:scale-110 cursor-pointer focus:outline-none animate-wobble-rotate"
          >
            <div className="relative w-24 h-24 sm:w-28 sm:h-28 lg:w-32 lg:h-32 drop-shadow-2xl">
              <img
                src="/chat-bubble-transparent.png"
                alt="Tanya Uni Mala"
                className="w-full h-full object-contain drop-shadow-[0_15px_20px_rgba(0,0,0,0.35)] select-none pointer-events-none"
              />
              <div className="absolute top-1 right-2 sm:top-2 sm:right-3 bg-red-600 text-white text-[9px] sm:text-[10px] font-bold px-2 py-0.5 rounded-full animate-pulse border-2 border-white shadow-md z-10 select-none">
                Online
              </div>
            </div>
          </button>
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
                className="group bg-gradient-to-br from-indigo-50 to-white border border-indigo-200 rounded-xl p-5 hover:shadow-lg hover:border-indigo-500 transition-all cursor-pointer flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <div className="w-10 h-10 rounded-lg bg-indigo-600 text-white flex items-center justify-center text-xl shadow-sm group-hover:scale-110 transition-transform">
                    📥
                  </div>
                  <h4 className="font-orbitron font-bold text-sm text-black uppercase tracking-wider">
                    {t.navDownloads}
                  </h4>
                  <p className="text-xs text-gray-600 leading-relaxed">
                    Unduh media kit, leaflet wisata, dan E-Book panduan pariwisata PDF.
                  </p>
                </div>
                <div className="mt-4 flex items-center justify-between text-xs font-bold text-indigo-600 group-hover:translate-x-1 transition-transform">
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
