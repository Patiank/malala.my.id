import React, { useState, useMemo, useRef, useEffect } from 'react';
import { ArrowUpRight, Sparkles, Compass, Download, Map, X, Search, Calendar, MapPin, ChevronLeft, ChevronRight, Youtube, MessageCircle, Volume2, VolumeX, Play } from 'lucide-react';
import { CheckerboardGrid, WireframeGlobe, CornerBracket, PemprovSumbarLogo } from './CustomIcons';
import ArrowFillButton from '@/components/ui/arrow-fill-button';

import { DrawerType, AppSettings, EventItem, Destination, CultureItem, CulinaryItem, SouvenirItem, HotInfoItem } from '../types';
import { Language, translations } from '../lib/translations';
import { HOT_INFO_ITEMS } from '../data/staticConfig';
import { optimizeImageUrl } from '../utils/imageOptimizer';
import { parseNewsTimestamp } from '../utils/ai';

interface HeroProps {
  onOpenDrawer: (type: DrawerType) => void;
  lang: Language;
  appSettings?: AppSettings;
  searchQuery?: string;
  onSearchQueryChange?: (q: string) => void;
  eventItems?: EventItem[];
  destinations?: Destination[];
  cultureItems?: CultureItem[];
  culinaryItems?: CulinaryItem[];
  souvenirItems?: SouvenirItem[];
  hotInfoItems?: HotInfoItem[];
}

function getYoutubeVideoId(url?: string): string | null {
  if (!url) return null;
  try {
    const trimmed = url.trim();
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=|shorts\/)([^#&?]*).*/;
    const match = trimmed.match(regExp);
    if (match && match[2].length === 11) {
      return match[2];
    }
  } catch (e) {
    // safely ignore
  }
  return null;
}

function getYoutubeEmbedUrl(url?: string, autoPlay: boolean = true, mute: boolean = false): string | null {
  const videoId = getYoutubeVideoId(url);
  if (!videoId) return null;
  const origin = typeof window !== 'undefined' && window.location.origin ? `&origin=${encodeURIComponent(window.location.origin)}` : '';
  const autoPlayStr = autoPlay ? 'autoplay=1&' : 'autoplay=0&';
  const muteStr = mute ? 'mute=1&' : 'mute=0&';
  return `https://www.youtube-nocookie.com/embed/${videoId}?${autoPlayStr}${muteStr}loop=1&playlist=${videoId}&playsinline=1&controls=1&modestbranding=1&rel=0&enablejsapi=1${origin}`;
}

export const Hero: React.FC<HeroProps> = ({
  onOpenDrawer,
  lang,
  appSettings,
  searchQuery = '',
  onSearchQueryChange,
  eventItems = [],
  destinations = [],
  cultureItems = [],
  culinaryItems = [],
  souvenirItems = [],
  hotInfoItems = [],
}) => {
  const t = translations[lang];
  const [isExploreModalOpen, setIsExploreModalOpen] = useState(false);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const searchContainerRef = useRef<HTMLDivElement>(null);
  const videoIframeRef = useRef<HTMLIFrameElement>(null);
  const [isVideoMuted, setIsVideoMuted] = useState(true);
  const [isVideoActive, setIsVideoActive] = useState(false);
  const [mobileSpotlightTab, setMobileSpotlightTab] = useState<'video' | 'event'>('video');

  // Synchronize custom volume toggle button with native YouTube player volume changes
  useEffect(() => {
    const handleYoutubeMessage = (event: MessageEvent) => {
      try {
        const data = typeof event.data === 'string' ? JSON.parse(event.data) : event.data;
        if (data && data.info) {
          if (typeof data.info.muted === 'boolean') {
            setIsVideoMuted(data.info.muted);
          } else if (typeof data.info.volume === 'number') {
            setIsVideoMuted(data.info.volume === 0);
          }
        }
      } catch (err) {
        // Not a JSON message, safely ignore
      }
    };

    window.addEventListener('message', handleYoutubeMessage);
    return () => window.removeEventListener('message', handleYoutubeMessage);
  }, []);

  const handleOpenExploreModal = () => {
    if (typeof window !== 'undefined') {
      window.history.pushState({ malalaLayer: 'explore' }, '');
    }
    setIsExploreModalOpen(true);
  };

  const handleCloseExploreModal = () => {
    if (typeof window !== 'undefined' && window.history.state?.malalaLayer === 'explore') {
      window.history.back();
    } else {
      setIsExploreModalOpen(false);
    }
  };

  useEffect(() => {
    const handlePopState = () => {
      if (isExploreModalOpen) {
        setIsExploreModalOpen(false);
      }
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [isExploreModalOpen]);

  const toggleVideoVolume = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (!videoIframeRef.current?.contentWindow) return;
    const nextMuted = !isVideoMuted;
    setIsVideoMuted(nextMuted);
    try {
      if (nextMuted) {
        videoIframeRef.current.contentWindow.postMessage(JSON.stringify({ event: 'command', func: 'mute', args: [] }), '*');
        videoIframeRef.current.contentWindow.postMessage(JSON.stringify({ event: 'command', func: 'setVolume', args: [0] }), '*');
      } else {
        videoIframeRef.current.contentWindow.postMessage(JSON.stringify({ event: 'command', func: 'unMute', args: [] }), '*');
        videoIframeRef.current.contentWindow.postMessage(JSON.stringify({ event: 'command', func: 'setVolume', args: [100] }), '*');
      }
    } catch (err) {
      console.warn('Error toggling video audio via postMessage:', err);
    }
  };

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
    const handleClickOutside = (e: MouseEvent | TouchEvent) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(e.target as Node)) {
        setIsSearchFocused(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, []);

  const monthNamesId = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];
  const monthNamesEn = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

  // Precise Event Timeline & 2-Week Window Evaluation (H-2 to H+2 for Live Video, H-14 to H-2 for Upcoming Image)
  const evaluateEventTimeline = (scheduleStr: string, isKen?: boolean) => {
    const now = new Date();
    const currentYear = now.getFullYear();
    const currentMonth = now.getMonth(); // 0-11
    const currentDayOfWeek = now.getDay(); // 0: Sun, 1: Mon, ..., 6: Sat
    const nowMs = now.getTime();

    const s = (scheduleStr || '').toLowerCase();

    // 0. Explicit past / postponed / concluded status check
    if (s.includes('sudah terselenggara') || s.includes('vakum') || s.includes('ditunda')) {
      return {
        isPast: true,
        isLiveH2Window: false,
        isUpcoming2Weeks: false,
        daysUntilStart: 9999,
        badgeLabelId: s.includes('ditunda') || s.includes('vakum') ? '⏸️ Ditunda / Vakum' : '✓ Telah Terselenggara',
        badgeLabelEn: s.includes('ditunda') || s.includes('vakum') ? '⏸️ Postponed' : '✓ Concluded Event',
        isKEN: Boolean(isKen),
        sortScore: 9000
      };
    }

    // 1. Weekly / Weekend / Routine events (e.g. Pacu Jawi every weekend)
    if (s.includes('akhir pekan') || s.includes('mingguan') || s.includes('weekend') || s.includes('sepanjang tahun') || s.includes('bergilir')) {
      // Weekend is Sat (6) & Sun (0). H-2 to H+2: Thu (4), Fri (5), Sat (6), Sun (0), Mon (1)
      const isWeekendLiveWindow = [4, 5, 6, 0, 1].includes(currentDayOfWeek);
      if (isWeekendLiveWindow) {
        return {
          isPast: false,
          isLiveH2Window: true,
          isUpcoming2Weeks: false,
          daysUntilStart: 0,
          badgeLabelId: '🔥 Event Rutin Aktif Pekan Ini',
          badgeLabelEn: '🔥 Active Routine Event This Week',
          isKEN: Boolean(isKen),
          sortScore: 20 // Active routine event; gives room for immediate annual festivals (score 10-19) to lead
        };
      } else {
        // Tuesday (2) or Wednesday (3) -> Upcoming for next weekend (within 2-3 days)
        const daysToWeekend = currentDayOfWeek === 2 ? 4 : 3;
        return {
          isPast: false,
          isLiveH2Window: false,
          isUpcoming2Weeks: true,
          daysUntilStart: daysToWeekend,
          badgeLabelId: `⏳ Hadir Akhir Pekan Ini (${daysToWeekend} Hari Lagi)`,
          badgeLabelEn: `⏳ Starts This Weekend (${daysToWeekend} Days)`,
          isKEN: Boolean(isKen),
          sortScore: 25 + daysToWeekend
        };
      }
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

    // 2. Specific day range (e.g. "17 - 19 September 2026", "4 – 6 September 2026")
    const dateMatch = s.match(/(\d{1,2})\s*(?:-|sampai|hingga|\/)\s*(\d{1,2})?/);
    if (dateMatch && foundMonth !== null) {
      const startDay = parseInt(dateMatch[1], 10);
      const endDay = dateMatch[2] ? parseInt(dateMatch[2], 10) : startDay;

      const eventYear = currentYear;
      const startDate = new Date(eventYear, foundMonth, startDay, 0, 0, 0);
      const endDate = new Date(eventYear, foundMonth, endDay, 23, 59, 59);

      // H-2 window starts 2 days before start date (00:00:00)
      const h2StartDate = new Date(eventYear, foundMonth, startDay - 2, 0, 0, 0);
      // H+2 window ends 2 days after end date (23:59:59)
      const h2EndDate = new Date(eventYear, foundMonth, endDay + 2, 23, 59, 59);

      const diffToStartMs = startDate.getTime() - nowMs;
      const daysToStart = Math.ceil(diffToStartMs / (1000 * 60 * 60 * 24));

      // CASE A: Concluded / Already Passed
      if (nowMs > h2EndDate.getTime()) {
        const daysAgo = Math.max(1, Math.ceil((nowMs - endDate.getTime()) / (1000 * 60 * 60 * 24)));
        return {
          isPast: true,
          isLiveH2Window: false,
          isUpcoming2Weeks: false,
          daysUntilStart: -daysAgo,
          badgeLabelId: `🗓️ Selesai (${startDay}-${endDay} ${monthNamesId[foundMonth]})`,
          badgeLabelEn: `🗓️ Concluded (${startDay}-${endDay} ${monthNamesEn[foundMonth]})`,
          isKEN: Boolean(isKen),
          sortScore: 5000 + daysAgo // Pushed far down; never competes with active events
        };
      }

      // CASE B: Within H-2 to H+2 Window (Live Event Eligible)
      if (nowMs >= h2StartDate.getTime() && nowMs <= h2EndDate.getTime()) {
        let badgeId = `🔥 Sedang Berlangsung (${startDay}-${endDay} ${monthNamesId[foundMonth]})`;
        let badgeEn = `🔥 Happening Now (${startDay}-${endDay} ${monthNamesEn[foundMonth]})`;

        if (nowMs < startDate.getTime()) {
          const daysLeft = Math.max(1, Math.ceil((startDate.getTime() - nowMs) / (1000 * 60 * 60 * 24)));
          badgeId = `🔥 H-${daysLeft} Menjelang Pembukaan (${startDay} ${monthNamesId[foundMonth]})`;
          badgeEn = `🔥 Starts in ${daysLeft} Day(s) (${startDay} ${monthNamesEn[foundMonth]})`;
        } else if (nowMs > endDate.getTime()) {
          badgeId = `🔥 Highlight Pasca Event (${startDay}-${endDay} ${monthNamesId[foundMonth]})`;
          badgeEn = `🔥 Post-Event Highlights (${startDay}-${endDay} ${monthNamesEn[foundMonth]})`;
        }

        return {
          isPast: false,
          isLiveH2Window: true,
          isUpcoming2Weeks: false,
          daysUntilStart: daysToStart,
          badgeLabelId: badgeId,
          badgeLabelEn: badgeEn,
          isKEN: Boolean(isKen),
          sortScore: 1
        };
      }

      // CASE C: 2 Weeks Before Event (H-14 to H-2) (Upcoming Image Banner Eligible)
      if (daysToStart > 2 && daysToStart <= 14) {
        return {
          isPast: false,
          isLiveH2Window: false,
          isUpcoming2Weeks: true,
          daysUntilStart: daysToStart,
          badgeLabelId: `⏳ Hadir dlm ${daysToStart} Hari (${startDay} ${monthNamesId[foundMonth]})`,
          badgeLabelEn: `⏳ Starts in ${daysToStart} Days (${startDay} ${monthNamesEn[foundMonth]})`,
          isKEN: Boolean(isKen),
          sortScore: 10 + daysToStart
        };
      }

      // CASE D: Farther future schedule (H-15 onwards)
      if (daysToStart > 14) {
        return {
          isPast: false,
          isLiveH2Window: false,
          isUpcoming2Weeks: false,
          daysUntilStart: daysToStart,
          badgeLabelId: `🗓️ ${startDay} ${monthNamesId[foundMonth]} ${eventYear}`,
          badgeLabelEn: `🗓️ ${monthNamesEn[foundMonth]} ${startDay}, ${eventYear}`,
          isKEN: Boolean(isKen),
          sortScore: 100 + daysToStart
        };
      }
    }

    // 3. Month-based without specific day (e.g. "Agustus", "September 2026 (Jadwal Pasti Segera Dikonfirmasi)")
    if (foundMonth !== null) {
      if (foundMonth < currentMonth) {
        return {
          isPast: true,
          isLiveH2Window: false,
          isUpcoming2Weeks: false,
          daysUntilStart: 9999,
          badgeLabelId: `🗓️ Selesai (${monthNamesId[foundMonth]} ${currentYear})`,
          badgeLabelEn: `🗓️ Concluded (${monthNamesEn[foundMonth]} ${currentYear})`,
          isKEN: Boolean(isKen),
          sortScore: 6000 + (currentMonth - foundMonth) * 30
        };
      }

      if (foundMonth === currentMonth) {
        return {
          isPast: false,
          isLiveH2Window: true,
          isUpcoming2Weeks: false,
          daysUntilStart: 0,
          badgeLabelId: `🔥 Bulan Ini (${monthNamesId[foundMonth]})`,
          badgeLabelEn: `🔥 This Month (${monthNamesEn[foundMonth]})`,
          isKEN: Boolean(isKen),
          sortScore: 8
        };
      }

      // Next month within 14 days of start of that month
      if (foundMonth === (currentMonth + 1) % 12) {
        const daysUntilNextMonth = (new Date(currentYear, currentMonth + 1, 1).getTime() - nowMs) / (1000 * 60 * 60 * 24);
        if (daysUntilNextMonth <= 14) {
          const daysNum = Math.max(1, Math.ceil(daysUntilNextMonth));
          return {
            isPast: false,
            isLiveH2Window: false,
            isUpcoming2Weeks: true,
            daysUntilStart: daysNum,
            badgeLabelId: `⏳ 2 Minggu Ini (${monthNamesId[foundMonth]})`,
            badgeLabelEn: `⏳ In 2 Weeks (${monthNamesEn[foundMonth]})`,
            isKEN: Boolean(isKen),
            sortScore: 28
          };
        }
      }

      // Future month
      return {
        isPast: false,
        isLiveH2Window: false,
        isUpcoming2Weeks: false,
        daysUntilStart: 60,
        badgeLabelId: `🗓️ ${monthNamesId[foundMonth]} ${currentYear}`,
        badgeLabelEn: `🗓️ ${monthNamesEn[foundMonth]} ${currentYear}`,
        isKEN: Boolean(isKen),
        sortScore: 150 + (foundMonth - currentMonth) * 30
      };
    }

    return {
      isPast: false,
      isLiveH2Window: false,
      isUpcoming2Weeks: false,
      daysUntilStart: 999,
      badgeLabelId: '🗓️ Jadwal CoE Sumbar',
      badgeLabelEn: '🗓️ CoE Event Schedule',
      isKEN: Boolean(isKen),
      sortScore: 999
    };
  };

  const eventsList = eventItems || [];

  const spotlightDisplayMode = appSettings?.spotlightDisplayMode || 'both';
  const featuredVideoEventId = appSettings?.featuredVideoEventId || 'auto';

  // Comprehensive evaluation of all events
  const evaluatedEvents = useMemo(() => {
    return eventsList.map(item => ({
      item,
      timeline: evaluateEventTimeline(item.schedule, item.isKen)
    }));
  }, [eventsList]);

  // Active / Upcoming candidates strictly excluding past events
  const activeCandidates = useMemo(() => {
    const list = evaluatedEvents.filter(e => !e.timeline.isPast && e.timeline.sortScore < 1000);
    list.sort((a, b) => a.timeline.sortScore - b.timeline.sortScore);
    return list;
  }, [evaluatedEvents]);

  // Primary event that should lead the spotlight: the closest active/upcoming event
  const primarySpotlightEvent = useMemo(() => {
    return activeCandidates[0] || evaluatedEvents.find(e => !e.timeline.isPast) || evaluatedEvents[0];
  }, [activeCandidates, evaluatedEvents]);

  // 1. Video Event Selection:
  // Logika: Jika event unggulan terdekat memiliki video, putar videonya.
  // Namun jika event terdekat TIDAK memiliki video (hanya foto), spotlight TIDAK memaksakan video event lama,
  // melainkan otomatis hanya menampilkan kartu gambar event tersebut!
  const videoEvent = useMemo(() => {
    if (spotlightDisplayMode === 'event' || featuredVideoEventId === 'none') return undefined;

    // Option A: Admin explicitly selected a specific event ID in settings
    if (featuredVideoEventId && featuredVideoEventId !== 'auto' && featuredVideoEventId !== 'none') {
      const selected = evaluatedEvents.find(e => e.item.id === featuredVideoEventId);
      if (selected && Boolean(getYoutubeEmbedUrl(selected.item.videoUrl || (selected.item as any).youtubeUrl))) {
        return selected;
      }
    }

    // Option B: Auto Mode — periksa event terdekat yang aktif/mendatang
    if (!primarySpotlightEvent) return undefined;

    const primaryVideo = getYoutubeEmbedUrl(primarySpotlightEvent.item.videoUrl || (primarySpotlightEvent.item as any).youtubeUrl);
    if (primaryVideo) {
      return primarySpotlightEvent;
    }

    // Jika event utama terdekat tidak punya video, periksa apakah ada event aktif lain yang SEDANG BERLANGSUNG hari ini yang punya video
    // Hanya tampilkan jika mode spotlight mengizinkan 'both'
    if (spotlightDisplayMode === 'both') {
      const liveWithVideo = activeCandidates.find(e => e.timeline.isLiveH2Window && Boolean(getYoutubeEmbedUrl(e.item.videoUrl || (e.item as any).youtubeUrl)));
      if (liveWithVideo && liveWithVideo.item.id !== primarySpotlightEvent.item.id) {
        return liveWithVideo;
      }
    }

    // Jika tidak ada video pada event aktif, spotlight beralih menampilkan gambar event saja
    return undefined;
  }, [evaluatedEvents, activeCandidates, primarySpotlightEvent, spotlightDisplayMode, featuredVideoEventId]);

  // 2. Image Banner Events:
  // Menampilkan banner foto event mendatang. Jika tidak ada video, banner ini menjadi kartu utama spotlight.
  const bannerEvents = useMemo(() => {
    // If videoEvent is active and display mode is strictly video, hide banner
    if (videoEvent && spotlightDisplayMode === 'video') return [];

    // Filter kandidat yang bukan event yang sudah diputar di kartu video
    const candidateList = (videoEvent && spotlightDisplayMode === 'both')
      ? activeCandidates.filter(e => e.item.id !== videoEvent.item.id)
      : activeCandidates;

    if (candidateList.length > 0) {
      return candidateList.slice(0, 3);
    }

    // Fallback: pastikan tidak menampilkan event yang sudah lewat
    return evaluatedEvents.filter(e => !e.timeline.isPast).slice(0, 3);
  }, [activeCandidates, evaluatedEvents, videoEvent, spotlightDisplayMode]);

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

    (destinations || []).forEach(d => {
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

    (cultureItems || []).forEach(c => {
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

    (culinaryItems || []).forEach(c => {
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

    (souvenirItems || []).forEach(s => {
      items.push({
        id: s.id,
        title: s.title,
        titleEn: s.titleEn || s.title,
        desc: s.description,
        descEn: s.descriptionEn || s.description,
        icon: '🛍️',
        categoryLabel: 'Oleh-Oleh',
        categoryLabelEn: 'Souvenirs',
        drawerType: 'souvenirs',
        keywords: `${s.title} ${s.titleEn || ''} ${s.origin} ${s.category} ${s.description}`.toLowerCase()
      });
    });

    (eventItems || []).forEach(e => {
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

    const newsList = (hotInfoItems && hotInfoItems.length > 0) ? hotInfoItems : HOT_INFO_ITEMS;
    [...newsList]
      .sort((a, b) => parseNewsTimestamp(b.date, b.createdAt) - parseNewsTimestamp(a.date, a.createdAt))
      .forEach(h => {
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
  }, [destinations, cultureItems, culinaryItems, souvenirItems, eventItems, hotInfoItems]);

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
            <span className="sr-only">Pariwisata Sumatera Barat &amp; Pariwisata Sumbar 2026 — </span>
            <div>DISCOVER</div>
            <div className='text-red-600'>WEST SUMATRA</div>
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
          <div className="inline-flex flex-col items-stretch gap-2.5 pt-2 w-full sm:w-fit max-w-full">
            {/* Desktop Action Buttons Row */}
            <div className="hidden sm:flex sm:flex-row items-stretch sm:items-center gap-2.5 sm:gap-3 w-full">
              {/* UNI MALA AI Assistant Primary CTA */}
              <ArrowFillButton
                btnText={t.heroBtnAiPlanner}
                onClick={(e) => {
                  e.preventDefault();
                  onOpenDrawer('formai');
                }}
                bgColor="#09090b"
                textColor="#ffffff"
                fillBgColor="#f59e0b"
                fillTextColor="#09090b"
                hoverFillBgColor="#fbbf24"
                hoverFillTextColor="#09090b"
                arrowColor="#09090b"
                hoverArrowColor="#09090b"
                icon={<Sparkles className="w-4 h-4 text-amber-300 group-hover:text-black transition-colors animate-pulse" />}
                className="w-full sm:w-auto font-jakarta font-bold uppercase tracking-[0.12em] sm:tracking-[0.14em] shadow-md hover:shadow-amber-500/20 border-zinc-900 justify-center min-h-[46px]"
              />

              {/* Mulai Jelajah Main Button - Opens Destinations Sub-menu directly */}
              <ArrowFillButton
                btnText={t.heroBtnExplore}
                onClick={(e) => {
                  e.preventDefault();
                  onOpenDrawer('destinations');
                }}
                bgColor="#ffffff"
                textColor="#09090b"
                fillBgColor="#dc2626"
                fillTextColor="#ffffff"
                hoverFillBgColor="#b91c1c"
                hoverFillTextColor="#ffffff"
                arrowColor="#dc2626"
                hoverArrowColor="#ffffff"
                icon={<Compass className="w-4 h-4 text-red-600 group-hover:text-white transition-colors animate-pulse" />}
                className="w-full sm:w-auto font-jakarta font-bold uppercase tracking-[0.12em] sm:tracking-[0.14em] shadow-md hover:shadow-red-500/20 border-gray-300 justify-center min-h-[46px]"
              />
            </div>

            {/* Premium Search Bar Panel - Width stretches 100% to match exact length of Buttons Row */}
            <div ref={searchContainerRef} className="w-full relative z-30 font-jakarta">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (onOpenDrawer) onOpenDrawer('search');
                }}
                className="relative flex items-center bg-white/95 backdrop-blur-md border border-gray-300 hover:border-red-500 focus-within:border-red-600 sm:border-2 rounded-full shadow-lg transition-all p-1 sm:p-1.5 pl-2 sm:pl-2.5"
              >
                {/* Kaca Pembesar Icon Badge */}
                <div 
                  onClick={() => {
                    if (onOpenDrawer) onOpenDrawer('search');
                  }}
                  className="pl-2 pr-1.5 sm:pl-3 sm:pr-2 text-red-600 flex items-center justify-center cursor-pointer"
                >
                  <Search className="w-4 h-4 sm:w-5 sm:h-5 animate-pulse" />
                </div>

                {/* Input Field - 16px on mobile prevents involuntary iOS zoom */}
                <input
                  type="text"
                  value={searchQuery}
                  onFocus={() => setIsSearchFocused(true)}
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
                      ? "Cari destinasi, kuliner, event..."
                      : "Cari destinasi, kuliner, event..."
                  }
                  className="w-full py-1.5 sm:py-2 px-1 bg-transparent text-sm sm:text-base text-gray-900 placeholder-gray-400 font-semibold transition-all focus:outline-none"
                />

                {/* Clear Input Button if query exists */}
                {searchQuery && (
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      if (onSearchQueryChange) onSearchQueryChange('');
                    }}
                    className="p-1 rounded-full text-gray-400 hover:text-black hover:bg-gray-100 transition-colors mr-1 cursor-pointer min-w-[30px] min-h-[30px] sm:min-w-[36px] sm:min-h-[36px] flex items-center justify-center"
                    title="Clear"
                  >
                    <X className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  </button>
                )}

                {/* Tombol CARI Dedicated Button */}
                <button
                  type="submit"
                  onClick={() => onOpenDrawer('search')}
                  className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 active:scale-95 text-white font-orbitron font-bold text-[10.5px] sm:text-xs uppercase tracking-wider px-3 sm:px-6 py-1.5 sm:py-2.5 rounded-full flex items-center gap-1.5 sm:gap-2 shadow-md hover:shadow-lg transition-all cursor-pointer shrink-0 min-h-[36px] sm:min-h-[42px]"
                >
                  <Search className="w-3.5 h-3.5" />
                  <span>{lang === 'en' ? 'SEARCH' : 'CARI'}</span>
                </button>
              </form>

              {/* Mobile Action Buttons (Refined 2-Column Grid with Comfortable Breathing Room) */}
              <div className="grid grid-cols-2 gap-2 w-full sm:hidden mt-3">
                <button
                  type="button"
                  onClick={() => onOpenDrawer('formai')}
                  className="flex items-center justify-center gap-1.5 py-2 px-2.5 rounded-xl bg-zinc-950 text-white font-orbitron font-bold text-[10.5px] uppercase tracking-wider shadow-md active:scale-95 border border-amber-500/40 transition-transform cursor-pointer min-h-[40px]"
                >
                  <Sparkles className="w-3.5 h-3.5 text-amber-400 shrink-0 animate-pulse" />
                  <span className="truncate">{lang === 'en' ? 'AI TRIP' : 'RUTE WISATA AI'}</span>
                </button>
                <button
                  type="button"
                  onClick={() => onOpenDrawer('destinations')}
                  className="flex items-center justify-center gap-1.5 py-2 px-2.5 rounded-xl bg-white text-zinc-900 font-orbitron font-bold text-[10.5px] uppercase tracking-wider shadow-md active:scale-95 border border-gray-300 hover:border-red-500 transition-transform cursor-pointer min-h-[40px]"
                >
                  <Compass className="w-3.5 h-3.5 text-red-600 shrink-0 animate-pulse" />
                  <span className="truncate">{lang === 'en' ? 'EXPLORE' : 'MULAI JELAJAH'}</span>
                </button>
              </div>

            {/* Real-time Search Results Dropdown Panel */}
            {isSearchFocused && searchQuery.trim().length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white/98 backdrop-blur-md rounded-2xl shadow-2xl border border-gray-200 overflow-hidden max-h-[380px] overflow-y-auto z-50 animate-fade-in divide-y divide-gray-100">
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

          {/* MINANGKAOS Brand Identity & Text (Desktop: Left-Bottom, Centered Block) */}
          <div className="hidden lg:flex flex-col items-center text-center gap-1 transition-colors duration-300 mt-10 sm:mt-16 lg:mt-20 pt-20 sm:pt-28 lg:pt-36 w-fit select-none">
            {/* SPONSORED BY: Header Label */}
            <span
              className="text-[9px] font-orbitron font-extrabold uppercase tracking-widest transition-colors duration-300 opacity-80 text-center"
              style={heroTextStyle}
            >
              SPONSORED BY:
            </span>

            {/* Minangkaos Logo */}
            <div
              onClick={handlePemprovLogoClick}
              className="cursor-default shrink-0 select-none flex justify-center"
              title="MINANGKAOS"
            >
              <PemprovSumbarLogo size={52} />
            </div>

            {/* Minangkaos Text Below Logo (Smaller & Close Distance, Centered) */}
            <div
              className="font-slackside text-base sm:text-lg lg:text-xl font-normal leading-none select-none -mt-0.5 text-center"
            >
              <div className="text-[#ea580c] drop-shadow-sm tracking-wide">
                Minangkaos
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
              className={`self-start relative flex flex-col justify-between w-full sm:w-[320px] md:w-[340px] lg:w-[350px] max-w-full transition-all duration-300 ${
                isDualBanner
                  ? 'lg:self-center mt-4 lg:mt-2 lg:-translate-y-3 xl:-translate-y-4'
                  : 'lg:self-end mt-6 lg:mt-auto lg:translate-y-0'
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
              <div className="flex flex-col space-y-2.5 w-full">
                {/* Mobile Tab Switcher (Only visible on mobile when both video & banner exist) */}
                {isDualBanner && (
                  <div className="flex lg:hidden items-center p-1 bg-gray-100/90 backdrop-blur-md rounded-xl border border-gray-200">
                    <button
                      type="button"
                      onClick={() => setMobileSpotlightTab('video')}
                      className={`flex-1 py-1.5 px-2 rounded-lg text-[10px] font-jakarta font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                        mobileSpotlightTab === 'video'
                          ? 'bg-white text-gray-900 shadow-xs font-black'
                          : 'text-gray-500 hover:text-gray-900'
                      }`}
                    >
                      <Youtube className="w-3.5 h-3.5 text-red-600" />
                      <span>{lang === 'en' ? 'Video' : 'Video Event'}</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setMobileSpotlightTab('event')}
                      className={`flex-1 py-1.5 px-2 rounded-lg text-[10px] font-jakarta font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                        mobileSpotlightTab === 'event'
                          ? 'bg-white text-gray-900 shadow-xs font-black'
                          : 'text-gray-500 hover:text-gray-900'
                      }`}
                    >
                      <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                      <span>{lang === 'en' ? 'Upcoming' : 'Sorotan Event'}</span>
                    </button>
                  </div>
                )}

            {/* Spotlight 1: Video Event Card (Clean Video with Structured Top & Bottom Panels) */}
            {videoEvent && (() => {
              const eventItem = videoEvent.item;
              const isEn = lang === 'en';
              const title = isEn && eventItem.titleEn ? eventItem.titleEn : eventItem.title;
              const schedule = isEn && eventItem.scheduleEn ? eventItem.scheduleEn : eventItem.schedule;
              const location = isEn && eventItem.locationEn ? eventItem.locationEn : eventItem.location;
              const isKEN = Boolean(eventItem.isKen);
              const rawVidUrl = eventItem.videoUrl || (eventItem as any).youtubeUrl;
              const videoId = getYoutubeVideoId(rawVidUrl);
              const ytEmbedUrl = getYoutubeEmbedUrl(rawVidUrl, true, isVideoMuted);

              if (!rawVidUrl) return null;

              const getGoogleCalUrl = () => {
                const t = encodeURIComponent(`${title} - Wonderful West Sumatra`);
                const d = encodeURIComponent(`${isEn && eventItem.descriptionEn ? eventItem.descriptionEn : eventItem.description}\n\nJadwal: ${schedule}\nLokasi: ${location}`);
                const l = encodeURIComponent(`${location}, Sumatera Barat`);
                return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${t}&details=${d}&location=${l}`;
              };

              return (
                <div className={`w-full bg-white/95 backdrop-blur-md border border-amber-300 rounded-xl p-2.5 sm:p-3 shadow-xl space-y-1.5 relative overflow-hidden group hover:border-black transition-all ${
                  isDualBanner && mobileSpotlightTab !== 'video' ? 'hidden lg:block' : 'block'
                }`}>
                  <div className="absolute top-0 right-0 w-24 h-24 bg-amber-400/15 rounded-full blur-xl pointer-events-none" />

                  {/* Top Header */}
                  <div className="flex items-center justify-between gap-1.5 pb-1 border-b border-gray-100 text-[9.5px] font-jakarta">
                    <div className="flex items-center gap-1 font-bold text-amber-900">
                      <Youtube className="w-3 h-3 text-red-600 animate-pulse" />
                      <span>{isEn ? 'Featured Video' : 'Video Sorotan Event'}</span>
                    </div>

                    <div className="flex items-center gap-1.5">
                      {/* Touch-Friendly Volume Toggle Button (Never obstructed by video overlays) */}
                      <button
                        type="button"
                        onClick={toggleVideoVolume}
                        aria-label={isVideoMuted ? 'Nyalakan Suara Video' : 'Matikan Suara Video'}
                        className={`px-1.5 py-0.5 rounded-full flex items-center gap-1 text-[8.5px] font-jakarta font-bold transition-all cursor-pointer shadow-2xs active:scale-95 ${
                          isVideoMuted
                            ? 'bg-gray-100 hover:bg-gray-200 text-gray-700 border border-gray-300'
                            : 'bg-emerald-600 hover:bg-emerald-700 text-white border border-emerald-400'
                        }`}
                      >
                        {isVideoMuted ? <VolumeX className="w-2.5 h-2.5 text-red-500" /> : <Volume2 className="w-2.5 h-2.5 text-white animate-bounce" />}
                        <span>{isVideoMuted ? (isEn ? 'Unmute' : 'Nyalakan') : (isEn ? 'Mute' : 'Matikan')}</span>
                      </button>

                      {isKEN && (
                        <span className="bg-gradient-to-r from-amber-500 to-amber-600 text-white font-jakarta font-black text-[7.5px] uppercase px-1.5 py-0.5 rounded shadow-2xs">
                          KEN
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Pure & Clean YouTube Player (Lite Facade - Zero Initial TBT Blocking) */}
                  {isVideoActive ? (
                    <div className="relative w-[calc(100%+1.25rem)] sm:w-[calc(100%+1.5rem)] aspect-video -mx-2.5 sm:-mx-3 -mt-1 mb-1.5 overflow-hidden bg-black shrink-0">
                      <iframe
                        ref={videoIframeRef}
                        src={ytEmbedUrl || ''}
                        title={title}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowFullScreen
                        className="w-full h-full border-0 absolute inset-0"
                      />
                    </div>
                  ) : (
                    <div
                      onClick={() => { setIsVideoActive(true); setIsVideoMuted(false); }}
                      className="relative w-[calc(100%+1.25rem)] sm:w-[calc(100%+1.5rem)] aspect-video -mx-2.5 sm:-mx-3 -mt-1 mb-1.5 overflow-hidden bg-black shrink-0 cursor-pointer group/vid"
                      role="button"
                      tabIndex={0}
                      aria-label={isEn ? `Play ${title} Video` : `Putar Video ${title}`}
                      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { setIsVideoActive(true); setIsVideoMuted(false); } }}
                    >
                      <img
                        src={eventItem.imageUrl ? optimizeImageUrl(eventItem.imageUrl, 600) : (videoId ? `https://img.youtube.com/vi/${videoId}/hqdefault.jpg` : '')}
                        alt={title}
                        width={350}
                        height={197}
                        className="w-full h-full object-cover group-hover/vid:scale-105 transition-transform duration-500 opacity-90 group-hover/vid:opacity-100"
                        loading="lazy"
                        decoding="async"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-black/20 flex flex-col items-center justify-center gap-1.5">
                        <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-red-600/95 text-white flex items-center justify-center shadow-xl group-hover/vid:scale-105 group-hover/vid:bg-red-600 transition-all">
                          <Play className="w-5 h-5 fill-white translate-x-0.5" />
                        </div>
                        <span className="bg-black/80 backdrop-blur-xs text-white text-[9px] font-jakarta font-bold px-2.5 py-0.5 rounded-full border border-white/20 shadow-sm flex items-center gap-1">
                          <Sparkles className="w-2.5 h-2.5 text-amber-400 animate-pulse" />
                          <span>{isEn ? 'Play Video' : 'Putar Video'}</span>
                        </span>
                      </div>
                    </div>
                  )}

                  {/* Bottom Info: Title, Schedule & Location */}
                  <div className="space-y-0.5">
                    <h3 className="font-orbitron font-bold text-[11px] sm:text-xs uppercase text-gray-900 line-clamp-2 min-h-[1.75rem] flex items-center group-hover:text-amber-600 transition-colors leading-snug">
                      {title}
                    </h3>
                    <div className="flex items-center gap-2.5 text-[9px] sm:text-[9.5px] text-gray-600 font-medium pt-0.5">
                      <span className="flex items-center gap-1 shrink-0">
                        <Calendar className="w-2.5 h-2.5 text-amber-600" />
                        <span>{schedule}</span>
                      </span>
                      <span className="flex items-center gap-1 truncate">
                        <MapPin className="w-2.5 h-2.5 text-red-600 shrink-0" />
                        <span className="truncate">{location}</span>
                      </span>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex items-center gap-1.5 pt-1 border-t border-gray-100">
                    <button
                      onClick={() => onOpenDrawer('events')}
                      className="flex-1 bg-black hover:bg-amber-600 text-white py-1 px-2 rounded-md text-[9px] sm:text-[9.5px] font-bold uppercase tracking-wider flex items-center justify-center gap-1 transition-all cursor-pointer shadow-xs"
                    >
                      <span>{isEn ? 'View Calendar' : 'Lihat Jadwal CoE'}</span>
                      <ArrowUpRight className="w-2.5 h-2.5" />
                    </button>
                    <a
                      href={getGoogleCalUrl()}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200 py-1 px-2 rounded-md text-[9px] sm:text-[9.5px] font-bold uppercase tracking-wider flex items-center justify-center gap-1 transition-all cursor-pointer shrink-0"
                      title={isEn ? 'Add to Google Calendar' : 'Simpan ke Google Calendar'}
                    >
                      <Calendar className="w-2.5 h-2.5 text-blue-600" />
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
                  className={`w-full bg-white/95 backdrop-blur-md border border-amber-300 rounded-xl p-2.5 sm:p-3 shadow-xl space-y-1.5 relative overflow-hidden group hover:border-black transition-all ${
                    isDualBanner && mobileSpotlightTab !== 'event' ? 'hidden lg:block' : 'block'
                  }`}
                >
                  <div className="absolute top-0 right-0 w-24 h-24 bg-amber-400/15 rounded-full blur-xl pointer-events-none" />

                  {/* Multi-Event Mini Header with Carousel Controls */}
                  <div className="flex items-center justify-between gap-1.5 pb-1 border-b border-gray-100 text-[9.5px] font-jakarta">
                    <div className="flex items-center gap-1 font-bold text-amber-900 truncate">
                      <Sparkles className="w-3 h-3 text-amber-600 animate-pulse shrink-0" />
                      <span className="truncate">
                        {timeline.isUpcoming2Weeks
                          ? (isEn ? 'Upcoming Event (2 Weeks)' : 'Event 2 Minggu ke Depan')
                          : (isEn ? 'Event Spotlight' : 'Sorotan Event Pariwisata')}
                      </span>
                    </div>

                    {bannerEvents.length > 1 && (
                      <div className="flex items-center gap-1 shrink-0">
                        <span className="text-[8.5px] font-bold text-gray-500 bg-amber-50 border border-amber-200 px-1 py-0.5 rounded leading-none">
                          {activeBannerIndex + 1}/{bannerEvents.length}
                        </span>
                        <div className="flex items-center gap-0.5">
                          <button
                            onClick={() => setActiveBannerIndex((prev) => (prev - 1 + bannerEvents.length) % bannerEvents.length)}
                            className="p-0.5 rounded bg-gray-100 hover:bg-black hover:text-white transition-colors cursor-pointer"
                            title="Sebelumnya"
                          >
                            <ChevronLeft className="w-2.5 h-2.5" />
                          </button>
                          <button
                            onClick={() => setActiveBannerIndex((prev) => (prev + 1) % bannerEvents.length)}
                            className="p-0.5 rounded bg-gray-100 hover:bg-black hover:text-white transition-colors cursor-pointer"
                            title="Berikutnya"
                          >
                            <ChevronRight className="w-2.5 h-2.5" />
                          </button>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Photo Banner Image */}
                  {eventItem.imageUrl ? (
                    <div className="relative w-[calc(100%+1.25rem)] sm:w-[calc(100%+1.5rem)] aspect-video -mx-2.5 sm:-mx-3 -mt-1 mb-1.5 overflow-hidden bg-stone-900 shrink-0">
                      <img
                        src={eventItem.imageUrl.startsWith('data:') ? eventItem.imageUrl : optimizeImageUrl(eventItem.imageUrl, 600)}
                        alt={title}
                        width={350}
                        height={197}
                        loading="eager"
                        decoding="async"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        onError={(e) => {
                          const img = e.currentTarget as HTMLImageElement;
                          if (!img.src.includes('ev26-danau-kembar.webp')) {
                            img.src = '/images/catalog/ev26-danau-kembar.webp';
                          }
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
                      
                      <div className="absolute top-1.5 left-1.5 flex items-center gap-1 bg-black/60 backdrop-blur-xs px-1.5 py-0.5 rounded-full">
                        <span className="relative flex h-1.5 w-1.5">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-red-500"></span>
                        </span>
                        <span className="font-jakarta font-black text-[8px] uppercase tracking-wider text-white">
                          {isEn ? timeline.badgeLabelEn : timeline.badgeLabelId}
                        </span>
                      </div>

                      {isKEN && (
                        <span className="absolute top-1.5 right-1.5 bg-gradient-to-r from-amber-500 to-amber-600 text-white font-jakarta font-black text-[7.5px] uppercase px-1.5 py-0.5 rounded shadow-sm">
                          KEN Kemenparekraf
                        </span>
                      )}
                    </div>
                  ) : (
                    <div className="relative h-32 -mx-2.5 sm:-mx-3 -mt-1 mb-1.5 overflow-hidden rounded-t-lg bg-gradient-to-br from-amber-800 via-stone-900 to-black shrink-0 flex items-center justify-center p-2.5">
                      <div className="absolute top-1.5 left-1.5 flex items-center gap-1 bg-black/60 backdrop-blur-xs px-1.5 py-0.5 rounded-full">
                        <span className="relative flex h-1.5 w-1.5">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-red-500"></span>
                        </span>
                        <span className="font-jakarta font-black text-[8px] uppercase tracking-wider text-white">
                          {isEn ? timeline.badgeLabelEn : timeline.badgeLabelId}
                        </span>
                      </div>

                      {isKEN && (
                        <span className="absolute top-1.5 right-1.5 bg-gradient-to-r from-amber-500 to-amber-600 text-white font-jakarta font-black text-[7.5px] uppercase px-1.5 py-0.5 rounded shadow-2xs">
                          KEN Kemenparekraf
                        </span>
                      )}

                      <div className="text-center text-white/90 space-y-1">
                        <Calendar className="w-5 h-5 mx-auto text-amber-400 opacity-80" />
                        <p className="font-orbitron font-bold text-[10px] uppercase tracking-wider line-clamp-1">{title}</p>
                      </div>
                    </div>
                  )}

                  {/* Multi-Event Dots Indicator */}
                  {bannerEvents.length > 1 && (
                    <div className="flex items-center justify-center gap-1 py-0.5">
                      {bannerEvents.map((_, i) => (
                        <button
                          key={i}
                          onClick={() => setActiveBannerIndex(i)}
                          className={`h-1 rounded-full transition-all cursor-pointer ${
                            activeBannerIndex === i ? 'w-4 bg-amber-600' : 'w-1.5 bg-gray-300 hover:bg-gray-400'
                          }`}
                          title={`Event ${i + 1}`}
                        />
                      ))}
                    </div>
                  )}

                  {/* Title & Info with fixed height */}
                  <div className="space-y-0.5">
                    <h3 className="font-orbitron font-bold text-[11px] sm:text-xs uppercase text-gray-900 line-clamp-2 min-h-[1.75rem] flex items-center group-hover:text-amber-600 transition-colors leading-snug">
                      {title}
                    </h3>
                    <div className="flex items-center gap-2.5 text-[9px] sm:text-[9.5px] text-gray-600 font-medium pt-0.5">
                      <span className="flex items-center gap-1 shrink-0">
                        <Calendar className="w-2.5 h-2.5 text-amber-600" />
                        <span>{schedule}</span>
                      </span>
                      <span className="flex items-center gap-1 truncate">
                        <MapPin className="w-2.5 h-2.5 text-red-600 shrink-0" />
                        <span className="truncate">{location}</span>
                      </span>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex items-center gap-1.5 pt-1 border-t border-gray-100">
                    <button
                      onClick={() => onOpenDrawer('events')}
                      className="flex-1 bg-black hover:bg-amber-600 text-white py-1 px-2 rounded-md text-[9px] sm:text-[9.5px] font-bold uppercase tracking-wider flex items-center justify-center gap-1 transition-all cursor-pointer shadow-xs truncate"
                    >
                      <span className="truncate">{isEn ? 'CoE Schedule' : 'Jadwal CoE'}</span>
                      <ArrowUpRight className="w-2.5 h-2.5 shrink-0" />
                    </button>

                    <button
                      onClick={() => onOpenDrawer('itinerary')}
                      className="bg-amber-500 hover:bg-amber-400 text-black py-1 px-2 rounded-md text-[9px] sm:text-[9.5px] font-bold uppercase tracking-wider flex items-center justify-center gap-1 transition-all cursor-pointer shadow-xs shrink-0"
                      title={isEn ? 'Plan with AI' : 'Susun Rencana AI'}
                    >
                      <Sparkles className="w-2.5 h-2.5 text-black" />
                      <span>{isEn ? 'AI Plan' : 'AI Plan'}</span>
                    </button>

                    <a
                      href={getGoogleCalUrl()}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200 py-1 px-2 rounded-md text-[9px] sm:text-[9.5px] font-bold uppercase tracking-wider flex items-center justify-center gap-1 transition-all cursor-pointer shrink-0"
                      title={isEn ? 'Add to Google Calendar' : 'Simpan ke Google Calendar'}
                    >
                      <Calendar className="w-2.5 h-2.5 text-blue-600" />
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

        {/* Mobile Bottom Footer Row: Minangkaos Branding (Left) & Tanya Uni Mala Chat Bubble (Right) in the Same Line */}
        <div className="flex lg:hidden items-center justify-between gap-3 transition-colors duration-300 mt-8 sm:mt-10 pb-28 lg:pb-6 w-full select-none z-30">
          {/* Left: Minangkaos Branding with SPONSORED BY: (Centered Block) */}
          <div className="flex flex-col items-center text-center gap-1 min-w-0 pl-1 select-none">
            {/* SPONSORED BY: Header Label */}
            <span
              className="text-[8.5px] font-orbitron font-extrabold uppercase tracking-widest transition-colors duration-300 opacity-80 text-center"
              style={heroTextStyle}
            >
              SPONSORED BY:
            </span>

            {/* Minangkaos Logo */}
            <div
              onClick={handlePemprovLogoClick}
              className="cursor-default shrink-0 select-none flex justify-center"
              title="MINANGKAOS"
            >
              <PemprovSumbarLogo size={42} />
            </div>

            {/* Minangkaos Text Below Logo (Smaller & Close Distance, Centered) */}
            <div
              className="font-slackside text-sm sm:text-base font-normal leading-none select-none -mt-0.5 text-center"
            >
              <div className="text-[#ea580c] drop-shadow-sm tracking-wide">
                Minangkaos
              </div>
            </div>
          </div>

          {/* Right: Tanya Uni Mala Chat Bubble inline */}
          <div className="shrink-0 -mr-2 sm:-mr-1">
            <button
              onClick={() => onOpenDrawer('chat')}
              aria-label="Tanya Uni Mala Guide"
              className="group relative flex items-center justify-center transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer focus:outline-none animate-chat-bubble-loop hover-elastic-bounce"
            >
              <div className="relative w-28 h-28 sm:w-32 sm:h-32 drop-shadow-2xl">
                <img
                  src="/chat-bubble-transparent.png"
                  alt="Tanya Uni Mala"
                  width={128}
                  height={128}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-contain drop-shadow-[0_12px_20px_rgba(0,0,0,0.35)] select-none pointer-events-none"
                />
                <div className="absolute top-1.5 right-2 sm:top-2 sm:right-3 bg-red-600 text-white text-[9px] sm:text-[10px] font-bold px-2 py-0.5 rounded-full animate-pulse border-2 border-white shadow-md z-10 select-none">
                  Online
                </div>
              </div>
            </button>
          </div>
        </div>

        {/* Desktop Tanya Uni Mala Floating Bubble (Only on lg+ screens) */}
        <div className="hidden lg:block absolute bottom-16 right-20 z-50 animate-fade-in">
          <button
            onClick={() => onOpenDrawer('chat')}
            aria-label="Tanya Uni Mala Guide"
            className="group relative flex items-center justify-center transition-all duration-300 hover:scale-110 cursor-pointer focus:outline-none animate-chat-bubble-loop hover-elastic-bounce"
          >
            <div className="relative w-32 h-32 drop-shadow-2xl">
              <img
                src="/chat-bubble-transparent.png"
                alt="Tanya Uni Mala"
                width={128}
                height={128}
                loading="lazy"
                decoding="async"
                className="w-full h-full object-contain drop-shadow-[0_15px_20px_rgba(0,0,0,0.35)] select-none pointer-events-none"
              />
              <div className="absolute top-2 right-3 bg-red-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full animate-pulse border-2 border-white shadow-md z-10 select-none">
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
                onClick={handleCloseExploreModal}
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
