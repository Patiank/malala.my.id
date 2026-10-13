import React, { useState, useCallback, useEffect, useRef } from 'react';
import { Flame, RefreshCw } from 'lucide-react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { ImageRevealBackground } from './components/ImageRevealBackground';
import { Toast } from './components/Toast';
import { CookieBanner } from './components/CookieBanner';
import { MobileNavDock } from './components/MobileNavDock';

const Drawers = React.lazy(() => import('./components/Drawers').then(m => ({ default: m.Drawers })));
const NewsModal = React.lazy(() => import('./components/NewsModal').then(m => ({ default: m.NewsModal })));
const LegalModal = React.lazy(() => import('./components/LegalModal').then(m => ({ default: m.LegalModal })));
import { DrawerType, ToastNotice } from './types';
import { HotInfoItem } from './types';
import { HOT_INFO_ITEMS } from './data/staticConfig';
import { useData } from './data/useData';
import { Language } from './lib/translations';
import { logTourismSignal } from './utils/telemetry';

import { fetchAiHotInfo, getWibNewsCycleInfo, isWithinLast6Months, isWithinLast30Days, deduplicateNewsItems, parseNewsTimestamp, formatNewsTimeAgo, getNewsDisplayTitle, prefetchNewsTranslations } from './utils/ai';
import { parseRoute, getDrawerPath, getItemDeepLink, pushRoute, applyPageSeo, findItemBySlugOrId } from './utils/urlRouter';

export default function App() {
  const [activeDrawer, setActiveDrawer] = useState<DrawerType>(() => {
    if (typeof window !== 'undefined') {
      const { drawer } = parseRoute(window.location.pathname);
      return drawer;
    }
    return null;
  });
  const [selectedNews, setSelectedNews] = useState<HotInfoItem | null>(null);
  const [lang, setLang] = useState<Language>(() => {
    if (typeof window !== 'undefined') {
      // 1. Prioritas Utama: Preferensi tersimpan pengguna
      const saved = localStorage.getItem('malala_lang');
      if (saved === 'en' || saved === 'id') return saved;

      // 2. Cek Cookie khusus 'malala_lang'
      const match = document.cookie.match(/(?:^|;\s*)malala_lang=(en|id)(?:;|$)/);
      if (match && (match[1] === 'en' || match[1] === 'id')) {
        return match[1] as Language;
      }

      // 3. Deteksi Otomatis Lokasi & Bahasa Pengunjung (Geo-Timezone & Browser Locale)
      try {
        const browserLangs = navigator.languages || [navigator.language || ''];
        const isIndonesianLocale = browserLangs.some((l) =>
          typeof l === 'string' && (l.toLowerCase().startsWith('id') || l.toLowerCase().startsWith('ms') || l.toLowerCase().startsWith('in'))
        );

        // Cek timezone: Indonesia umum menggunakan Asia/Jakarta, Asia/Pontianak, Asia/Makassar, Asia/Jayapura
        let timeZone = '';
        try {
          timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone || '';
        } catch {}

        const isIndonesianTimezone = /Asia\/(Jakarta|Pontianak|Makassar|Jayapura)/i.test(timeZone);

        // Jika bukan browser bahasa Indonesia dan bukan zona waktu Indonesia, jadikan bahasa Inggris secara otomatis
        if (!isIndonesianLocale && !isIndonesianTimezone) {
          localStorage.setItem('malala_lang', 'en');
          document.cookie = `malala_lang=en; path=/; max-age=31536000; SameSite=Lax`;
          return 'en';
        }
      } catch (err) {
        console.warn('Visitor locale auto-detection error:', err);
      }
    }
    return 'id';
  });

  const [savedIds, setSavedIds] = useState<string[]>(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem('malala_saved_ids');
        if (saved) return JSON.parse(saved);
      } catch (e) {
        console.warn('Failed to parse savedIds from localStorage:', e);
      }
    }
    return [];
  });
  const [toasts, setToasts] = useState<ToastNotice[]>([]);
  const [isRefreshingTicker, setIsRefreshingTicker] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const dataStore = useData();

  // Smoothly fade out and dismiss the pre-hydration brand splash loader ONLY when React has painted
  useEffect(() => {
    let fadeTimer: NodeJS.Timeout | null = null;
    let cleanupTimer: NodeJS.Timeout | null = null;

    // Immediate dismissal on React mount to guarantee ultrafast FCP / LCP
    const splash = document.getElementById('app-splash-loader');
    if (splash) {
      splash.style.transition = 'opacity 0.2s ease-out';
      splash.style.opacity = '0';
      cleanupTimer = setTimeout(() => {
        if (splash.parentNode) {
          splash.parentNode.removeChild(splash);
        }
      }, 220);
    }

    return () => {
      cancelAnimationFrame(rId);
      if (fadeTimer) clearTimeout(fadeTimer);
      if (cleanupTimer) clearTimeout(cleanupTimer);
    };
  }, []);

  // Background translation pre-fetching for instant smooth English experience
  useEffect(() => {
    if (dataStore.hotInfoItems && dataStore.hotInfoItems.length > 0) {
      prefetchNewsTranslations(dataStore.hotInfoItems);
    }
  }, [dataStore.hotInfoItems]);

  // Automatic Daily 03:00 AM WIB (Waktu Indonesia Barat, UTC+7) Hot Info News Refresh (Admin Only)
  useEffect(() => {
    // Quota Shield: Only run autonomous RSS scraping and Firestore sync if Admin is logged in
    if (!dataStore.isAdminLoggedIn) return;

    let timerId: any = null;

    const checkAndRunDailyRefresh = async () => {
      try {
        const { cycleId, msUntilNextRun } = getWibNewsCycleInfo();
        const lastCycle = localStorage.getItem('malala_hotinfo_last_wib_cycle');

        // Only run if the 03:00 WIB daily cycle has not been processed yet
        if (lastCycle !== cycleId) {
          setIsRefreshingTicker(true);
          const data = await fetchAiHotInfo(lang);
          if (Array.isArray(data) && data.length > 0 && dataStore.updateHotInfoItems) {
            await dataStore.updateHotInfoItems(data);
            localStorage.setItem('malala_hotinfo_last_wib_cycle', cycleId);
            console.log(`[AI Hot Info] Berita berhasil diperbarui secara harian untuk siklus 03:00 WIB (${cycleId})`);
          }
        }

        // Schedule timer precisely for the next 03:00 AM WIB (capped at 24 hours max)
        const safeDelay = Math.min(msUntilNextRun + 1000, 24 * 60 * 60 * 1000);
        timerId = setTimeout(checkAndRunDailyRefresh, safeDelay);
      } catch (e) {
        console.warn("Daily 03:00 WIB hot info auto-refresh notice:", e);
      } finally {
        setIsRefreshingTicker(false);
      }
    };

    // Initial check after 3 seconds on app mount
    const initTimer = setTimeout(checkAndRunDailyRefresh, 3000);

    return () => {
      clearTimeout(initTimer);
      if (timerId) clearTimeout(timerId);
    };
  }, [lang, dataStore.isAdminLoggedIn]);

  const handleRefreshTicker = async (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsRefreshingTicker(true);
    try {
      const data = await fetchAiHotInfo(lang);
      if (Array.isArray(data) && data.length > 0 && dataStore.updateHotInfoItems) {
        await dataStore.updateHotInfoItems(data);
        const { cycleId } = getWibNewsCycleInfo();
        localStorage.setItem('malala_hotinfo_last_wib_cycle', cycleId);
        showToast(
          lang === 'en'
            ? 'Real-time Indonesia tourism news updated successfully!'
            : 'Berita pariwisata Indonesia berhasil diperbarui!'
        );
      }
    } catch (err) {
      console.warn('Failed to refresh ticker:', err);
    } finally {
      setIsRefreshingTicker(false);
    }
  };

  // Sync lang to localStorage & Cookie
  const handleToggleLang = useCallback(() => {
    setLang((prev) => {
      const next = prev === 'id' ? 'en' : 'id';
      if (typeof window !== 'undefined') {
        localStorage.setItem('malala_lang', next);
        document.cookie = `malala_lang=${next}; path=/; max-age=31536000; SameSite=Lax`;
      }
      return next;
    });
  }, []);

  // Sync savedIds to localStorage
  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem('malala_saved_ids', JSON.stringify(savedIds));
      } catch (e) {
        console.warn('Failed to save to localStorage:', e);
      }
    }
  }, [savedIds]);

  const showToast = useCallback((message: string) => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, message }]);

    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3000);
  }, []);

  // Auto-open news modal if direct URL with news slug is accessed
  useEffect(() => {
    if (typeof window !== 'undefined' && dataStore.hotInfoItems && dataStore.hotInfoItems.length > 0) {
      const { drawer, itemSlug } = parseRoute(window.location.pathname);
      if (drawer === 'hotinfo' && itemSlug && !selectedNews) {
        const matched = findItemBySlugOrId(dataStore.hotInfoItems, itemSlug);
        if (matched) {
          setSelectedNews(matched);
        }
      }
    }
  }, [dataStore.hotInfoItems, selectedNews]);

  // Dynamic SEO & Document Title Manager
  useEffect(() => {
    if (selectedNews) {
      const newsTitle = getNewsDisplayTitle(selectedNews, lang);
      const isEn = lang === 'en';
      applyPageSeo({
        title: `${newsTitle} - Hot Info Pariwisata Sumbar | Malala`,
        description: selectedNews.content || selectedNews.summary || selectedNews.title,
        url: `https://malala.my.id${getItemDeepLink('hotinfo', selectedNews)}`,
        imageUrl: selectedNews.imageUrl,
        jsonLd: {
          "@context": "https://schema.org",
          "@type": "NewsArticle",
          "headline": newsTitle,
          "image": [selectedNews.imageUrl || "https://malala.my.id/og-image.jpg"],
          "datePublished": selectedNews.date || selectedNews.createdAt,
          "description": selectedNews.summary || selectedNews.title
        }
      });
      return;
    }

    if (activeDrawer) {
      const isEn = lang === 'en';
      const drawerTitles: Record<string, { id: string; en: string; descId: string; descEn: string }> = {
        destinations: {
          id: 'Destinasi Wisata Sumatera Barat - Malala',
          en: 'West Sumatra Tourist Destinations - Malala',
          descId: 'Jelajahi 38+ destinasi alam, danau vulkanik, lembah ngarai, kepulauan bahari, dan situs warisan dunia di Sumatera Barat.',
          descEn: 'Explore 38+ nature wonders, volcanic lakes, canyon valleys, marine islands, and UNESCO heritage in West Sumatra.'
        },
        culture: {
          id: 'Warisan Budaya Minangkabau - Malala',
          en: 'Minangkabau Cultural Heritage - Malala',
          descId: 'Pelajari falsafah adat basandi syarak, sistem matrilineal, arsitektur Rumah Gadang, dan seni tari pusaka Minangkabau.',
          descEn: 'Discover Minangkabau matrilineal heritage, Rumah Gadang architecture, philosophy, and traditional arts.'
        },
        culinary: {
          id: 'Kuliner Autentik Khas Minangkabau - Malala',
          en: 'Authentic Minangkabau Culinary - Malala',
          descId: 'Daftar makanan khas Minang terenak: Rendang Daging, Sate Padang, Nasi Kapau, Soto Padang, Dendeng Batokok, dan Teh Talua.',
          descEn: 'Explore world-famous Minangkabau delicacies: Rendang, Padang Satay, Nasi Kapau, Soto Padang, and Teh Talua.'
        },
        events: {
          id: 'Kalender Event Pariwisata Sumbar 2026 (CoE) - Malala',
          en: 'West Sumatra Calendar of Events 2026 (CoE) - Malala',
          descId: 'Jadwal lengkap festival budaya, Karisma Event Nusantara (KEN), Pacu Jawi, Tabuik Pariaman, dan Tour de Singkarak 2026.',
          descEn: 'Official schedule of cultural festivals, KEN national events, Pacu Jawi, and Tour de Singkarak 2026.'
        },
        souvenirs: {
          id: 'Pusat Oleh-Oleh & Kerajinan Khas Sumbar - Malala',
          en: 'West Sumatra Souvenirs & Crafts Center - Malala',
          descId: 'Rekomendasi suvenir otentik Minangkabau: Songket Pandai Sikek, Mukena Kerancang, Kaus Minang, dan Keripik Sanjai.',
          descEn: 'Authentic Minangkabau souvenirs, Pandai Sikek handwoven songket, crafts, and traditional snacks.'
        },
        download: {
          id: 'Unduh E-Booklet & Peta Wisata Sumbar 2026 - Malala',
          en: 'Download E-Booklet & West Sumatra Tourism Map - Malala',
          descId: 'Unduh gratis buku panduan wisata resmi 113 halaman dan kalender event 27 halaman format PDF berkualitas tinggi.',
          descEn: 'Download free official 113-page travel guide booklet and 27-page event calendar in high-res PDF.'
        },
        hotinfo: {
          id: 'Hot Info & Berita Pariwisata Terkini Sumbar - Malala',
          en: 'Hot Info & Latest Tourism News - Malala',
          descId: 'Kabar terbaru dan informasi pariwisata real-time seputar Sumatera Barat dan Indonesia.',
          descEn: 'Real-time breaking news and updates about tourism in West Sumatra and Indonesia.'
        },
        formai: {
          id: 'AI Travel Planner - Rencanakan Liburan Sumbar Cerdas | Malala',
          en: 'AI Travel Planner - Smart West Sumatra Itinerary | Malala',
          descId: 'Buat rencana perjalanan wisata ke Sumatera Barat secara instan dan personal dengan asisten AI Malala.',
          descEn: 'Generate instant personalized travel itineraries across West Sumatra with Malala AI.'
        },
        chat: {
          id: 'Tanya Uni Mala - Asisten Virtual Wisata Sumbar | Malala',
          en: 'Ask Uni Mala - Virtual Travel Assistant | Malala',
          descId: 'Konsultasi wisata Sumatera Barat 24/7 bersama Uni Mala, pemandu wisata virtual cerdas berbasis AI.',
          descEn: 'Consult West Sumatra travel 24/7 with Uni Mala, your intelligent AI tourism guide.'
        },
        saved: {
          id: 'Destinasi & Favorit Tersimpan - Malala',
          en: 'Saved Favorites & Wishlist - Malala',
          descId: 'Daftar objek wisata, kuliner, dan event favorit Anda yang siap dikunjungi.',
          descEn: 'Your personalized wishlist of favorite destinations, dishes, and events in West Sumatra.'
        },
        map: {
          id: 'Peta Interaktif Wisata Sumatera Barat - Malala',
          en: 'Interactive Map of West Sumatra Tourism - Malala',
          descId: 'Jelajahi sebaran geografis 38+ destinasi dan lokasi kuliner di 19 kabupaten/kota Sumatera Barat.',
          descEn: 'Explore 38+ destinations and culinary spots across 19 regencies/cities in West Sumatra.'
        }
      };

      const currentInfo = drawerTitles[activeDrawer];
      if (currentInfo) {
        applyPageSeo({
          title: isEn ? currentInfo.en : currentInfo.id,
          description: isEn ? currentInfo.descEn : currentInfo.descId,
          url: `https://malala.my.id${getDrawerPath(activeDrawer)}`
        });
        return;
      }
    }

    // Default Homepage SEO
    applyPageSeo({
      title: lang === 'en' ? 'Malala - West Sumatra Tourism Guide | Smart Tourism Portal' : 'Malala - Panduan Wisata Sumatera Barat | Smart Tourism Portal',
      description: lang === 'en'
        ? 'Official Smart Tourism Portal of West Sumatra. Explore 38+ destinations, 22+ Minangkabau cultural traditions, 26+ authentic cuisines, and AI travel planner.'
        : 'Portal Pariwisata Cerdas Resmi Sumatera Barat. Jelajahi 38+ destinasi alam, 22+ tradisi budaya Minangkabau, 26+ kuliner autentik, kalender event 2026, dan asisten AI liburan.',
      url: 'https://malala.my.id/'
    });
  }, [activeDrawer, selectedNews, lang]);

  const handleOpenDrawer = useCallback((type: DrawerType) => {
    if (type) {
      pushRoute(getDrawerPath(type), { malalaLayer: 'drawer', drawer: type });
    }
    setActiveDrawer(type);
  }, []);

  const handleCloseDrawer = useCallback(() => {
    pushRoute('/', { malalaLayer: 'root' });
    setActiveDrawer(null);
  }, []);

  const handleOpenNews = useCallback((news: HotInfoItem) => {
    pushRoute(getItemDeepLink('hotinfo', news), { malalaLayer: 'news', newsId: news.id });
    setSelectedNews(news);
  }, []);

  const handleCloseNews = useCallback(() => {
    const parentPath = activeDrawer ? getDrawerPath(activeDrawer) : '/';
    pushRoute(parentPath, { malalaLayer: activeDrawer ? 'drawer' : 'root', drawer: activeDrawer });
    setSelectedNews(null);
  }, [activeDrawer]);



  // Listen to browser / smartphone Back button (popstate)
  useEffect(() => {
    const handlePopState = () => {
      const { drawer, itemSlug } = parseRoute(window.location.pathname);
      
      // If we popped to a news route
      if (drawer === 'hotinfo' && itemSlug && dataStore.hotInfoItems) {
        const matched = findItemBySlugOrId(dataStore.hotInfoItems, itemSlug);
        if (matched) {
          setSelectedNews(matched);
          setActiveDrawer('hotinfo');
          return;
        }
      }

      // If news was open but route is not news, close news
      if (selectedNews && (!itemSlug || drawer !== 'hotinfo')) {
        setSelectedNews(null);
      }

      setActiveDrawer(drawer);
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [dataStore.hotInfoItems, selectedNews]);

  const handleToggleSave = useCallback(
    (id: string, title: string) => {
      setSavedIds((prev) => {
        const isSaved = prev.includes(id);
        if (isSaved) {
          showToast(lang === 'en' ? `Removed from Saved: "${title}"` : `Dihapus dari Favorit: "${title}"`);
          return prev.filter((item) => item !== id);
        } else {
          showToast(lang === 'en' ? `Saved to Favorites: "${title}"` : `Disimpan ke Favorit: "${title}"`);
          logTourismSignal('save_bookmark', { targetId: id, title });
          return [...prev, id];
        }
      });
    },
    [showToast, lang]
  );

  return (
    <div className="min-h-screen bg-white text-black font-jakarta flex flex-col justify-between relative overflow-x-hidden">
      {/* Spotlight Mask Background */}
      <ImageRevealBackground
        bgMediaType={dataStore.appSettings.bgMediaType}
        baseImage={dataStore.appSettings.baseImage}
        revealImage={dataStore.appSettings.revealImage}
        baseVideo={dataStore.appSettings.baseVideo}
      />

      {/* Fixed Vertical Hot Info Trigger (Far Left - Hidden on mobile) */}
      <button
        onClick={() => handleOpenDrawer('hotinfo')}
        className={`hidden sm:flex fixed left-0 top-1/2 -translate-y-1/2 z-40 bg-red-600 hover:bg-black text-white transition-all duration-300 py-4 px-2.5 rounded-r-xl flex-col items-center gap-3 shadow-2xl group border border-l-0 border-red-700 hover:border-gray-900 cursor-pointer focus:outline-none select-none ${
          activeDrawer === 'hotinfo' ? 'bg-black ring-2 ring-red-500' : ''
        }`}
        title={lang === 'en' ? 'Hot Info & Latest News (Click to open)' : 'Hot Info & Berita Terbaru (Klik untuk membuka)'}
        aria-label={lang === 'en' ? 'Hot Info & Latest News' : 'Hot Info & Berita Terbaru'}
      >
        <span className="relative flex items-center justify-center">
          <Flame className="w-4.5 h-4.5 text-yellow-300 group-hover:scale-125 transition-transform duration-200" />
          <span className="absolute -top-1 -right-1 w-2 h-2 bg-yellow-400 rounded-full animate-ping" />
          <span className="absolute -top-1 -right-1 w-2 h-2 bg-yellow-400 rounded-full" />
        </span>
        <span
          className="font-orbitron font-extrabold text-[10px] sm:text-[11px] tracking-[0.2em] text-white uppercase select-none"
          style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}
        >
          {lang === 'en' ? 'HOT INFO & LATEST NEWS' : 'Hot Info & Berita Terbaru'}
        </span>
      </button>

      {/* Header (Logo & Nav) */}
      <Header
        activeDrawer={activeDrawer}
        onOpenDrawer={handleOpenDrawer}
        onCloseDrawer={handleCloseDrawer}
        savedCount={savedIds.length}
        lang={lang}
        onToggleLang={handleToggleLang}
        appSettings={dataStore.appSettings}
      />

      {/* Main Hero */}
      <Hero
        onOpenDrawer={handleOpenDrawer}
        lang={lang}
        appSettings={dataStore.appSettings}
        searchQuery={searchQuery}
        onSearchQueryChange={setSearchQuery}
        eventItems={dataStore.eventItems}
        destinations={dataStore.destinations}
        cultureItems={dataStore.cultureItems}
        culinaryItems={dataStore.culinaryItems}
        souvenirItems={dataStore.souvenirItems}
        hotInfoItems={dataStore.hotInfoItems}
      />

      {/* Breaking News Ticker Bar (Tucked seamlessly behind MobileNavDock's rounded-t-2xl top edge on mobile, bottom-0 on desktop) */}
      <div 
        className="fixed bottom-[calc(52px+env(safe-area-inset-bottom,0px))] md:bottom-0 left-0 right-0 z-40 bg-black/95 text-white border-t border-red-600/40 pt-1.5 pb-[18px] md:py-2 px-3 md:px-4 flex items-center gap-2 md:gap-3 overflow-hidden select-none transition-all shadow-2xl backdrop-blur-md"
      >
        <div className="flex items-center gap-1.5 shrink-0">
          <button 
            onClick={() => handleOpenDrawer('hotinfo')}
            className="bg-red-600 hover:bg-red-700 text-white font-orbitron font-extrabold text-[9px] md:text-[10px] uppercase px-2 md:px-2.5 py-1 rounded flex items-center gap-1 md:gap-1.5 shrink-0 shadow-xs hover:scale-105 active:scale-95 transition-transform cursor-pointer"
            title={lang === 'en' ? 'Hot Info & News (Click to open full panel)' : 'Hot Info & Berita Terbaru (Klik untuk membuka panel lengkap)'}
          >
            <Flame className="w-3 md:w-3.5 h-3 md:h-3.5 text-yellow-300 fill-current animate-bounce" />
            <span>{lang === 'en' ? 'HOT INFO' : 'HOT INFO'}</span>
          </button>
          
          <button
            onClick={handleRefreshTicker}
            disabled={isRefreshingTicker}
            title={lang === 'en' ? 'Refresh real-time news' : 'Perbarui berita real-time'}
            className="bg-red-950/80 hover:bg-red-900 border border-red-600/50 text-red-300 p-1 rounded shrink-0 transition-all active:scale-95 cursor-pointer disabled:opacity-50"
          >
            <RefreshCw className={`w-3 md:w-3.5 h-3 md:h-3.5 ${isRefreshingTicker ? 'animate-spin text-yellow-400' : ''}`} />
          </button>
        </div>

        {/* Running News Ticker: Flex-1 and min-w-0 ensures proper width without squishing, clicking opens news modal */}
        <div className="flex-1 min-w-0 overflow-hidden whitespace-nowrap relative flex items-center h-6 md:h-7">
          {(() => {
            const rawList: HotInfoItem[] = (dataStore.hotInfoItems && dataStore.hotInfoItems.length > 0)
              ? dataStore.hotInfoItems
              : HOT_INFO_ITEMS;
            const rawFiltered = rawList.filter((news) => isWithinLast30Days(news.date || news.createdAt));
            const validItems = deduplicateNewsItems<HotInfoItem>(rawFiltered)
              .sort((a, b) => parseNewsTimestamp(b.date, b.createdAt) - parseNewsTimestamp(a.date, a.createdAt));
            const displayItems: HotInfoItem[] = validItems.length > 0 
              ? validItems 
              : deduplicateNewsItems<HotInfoItem>(rawList)
                  .sort((a, b) => parseNewsTimestamp(b.date, b.createdAt) - parseNewsTimestamp(a.date, a.createdAt));
            // Smooth, clearly visible gliding tempo: ~7 seconds per item, 35-55s total
            const marqueeDuration = Math.max(35, Math.min(55, displayItems.length * 7.5));

            return (
              <div 
                className="inline-flex items-center gap-10 animate-marquee font-jakarta text-xs text-gray-200 will-change-transform"
                style={{
                  animation: `marqueeScroll ${marqueeDuration}s linear infinite`,
                  willChange: 'transform'
                }}
              >
                {[...displayItems, ...displayItems].map((news, idx) => {
                  const isEn = lang === 'en';
                  const sourceBrand = news.sourceName || (isEn && news.categoryEn ? news.categoryEn : news.category) || 'Info Wisata';
                  const titleText = getNewsDisplayTitle(news, lang) || news.title || 'Update Info Wisata Terkini';
                  const timeText = formatNewsTimeAgo(news.date, news.createdAt, news.timeAgo, lang);
                  return (
                    <button
                      key={`${news.id}-${idx}`}
                      onClick={() => setSelectedNews(news)}
                      className="inline-flex items-center gap-2 hover:text-yellow-300 transition-colors cursor-pointer text-left focus:outline-none group py-0.5 shrink-0"
                      title={lang === 'en' ? 'Click to read article' : 'Klik untuk membaca berita'}
                    >
                      <span className="font-bold text-red-400 group-hover:text-red-300 font-mono text-[10px] bg-red-950/70 border border-red-700/50 px-1 py-0.5 rounded">[{sourceBrand}]</span>
                      <span className="underline-offset-2 group-hover:underline tracking-wide text-xs text-gray-100 font-medium">{titleText}</span>
                      <span className="text-gray-400 font-mono text-[10px]">({timeText})</span>
                      <span className="text-gray-600 ml-4 select-none">•</span>
                    </button>
                  );
                })}
              </div>
            );
          })()}
        </div>

        <button 
          onClick={() => handleOpenDrawer('hotinfo')}
          className="shrink-0 text-[10px] font-jakarta font-bold text-yellow-400 uppercase tracking-wider hidden sm:flex items-center gap-1 hover:underline cursor-pointer ml-1"
          title={lang === 'en' ? 'View all Hot Info & News (Click to open)' : 'Lihat semua Hot Info & Berita (Klik untuk membuka)'}
        >
          <span>{lang === 'en' ? 'View All' : 'Lihat Semua'}</span>
          <span>→</span>
        </button>
      </div>

      {/* Floating Mobile Bottom Navigation Dock (Minimalist Thumb-Zone Friendly) */}
      <MobileNavDock
        activeDrawer={activeDrawer}
        onOpenDrawer={handleOpenDrawer}
        onCloseDrawer={handleCloseDrawer}
        lang={lang}
        savedCount={savedIds.length}
      />


      {/* Drawers */}
      <React.Suspense fallback={null}>
        <Drawers
          activeDrawer={activeDrawer}
          onClose={handleCloseDrawer}
          onOpenDrawer={handleOpenDrawer}
          savedIds={savedIds}
          onToggleSave={handleToggleSave}
          dataStore={dataStore}
          lang={lang}
          onSelectNews={handleOpenNews}
          searchQuery={searchQuery}
          onSearchQueryChange={setSearchQuery}
          onShowToast={showToast}
        />
      </React.Suspense>

      {/* Center News Detail Pop-up Modal */}
      {selectedNews && (
        <React.Suspense fallback={null}>
          <NewsModal
            item={selectedNews}
            onClose={handleCloseNews}
            lang={lang}
          />
        </React.Suspense>
      )}

      {/* Legal Modal */}
      {(activeDrawer === 'about' || activeDrawer === 'privacy' || activeDrawer === 'terms' || activeDrawer === 'disclaimer' || activeDrawer === 'contact') && (
        <React.Suspense fallback={null}>
          <LegalModal
            type={activeDrawer as any}
            onClose={handleCloseDrawer}
          />
        </React.Suspense>
      )}

      {/* Tiny Legal Footer */}
      <div className="absolute bottom-1 w-full text-center z-40 pointer-events-auto px-4 flex justify-center gap-3 sm:gap-6 text-[10px] sm:text-xs text-white/30 font-jakarta font-medium drop-shadow-md pb-1 sm:pb-0">
        <button onClick={() => handleOpenDrawer('about')} className="hover:text-white/80 transition-colors">About Us</button>
        <button onClick={() => handleOpenDrawer('privacy')} className="hover:text-white/80 transition-colors">Privacy Policy</button>
        <button onClick={() => handleOpenDrawer('terms')} className="hover:text-white/80 transition-colors">Terms of Service</button>
        <button onClick={() => handleOpenDrawer('disclaimer')} className="hover:text-white/80 transition-colors">Disclaimer</button>
        <button onClick={() => handleOpenDrawer('contact')} className="hover:text-white/80 transition-colors">Contact</button>
      </div>

      {/* Cookie Consent Banner */}
      <CookieBanner
        onOpenPrivacy={() => handleOpenDrawer('privacy')}
        lang={lang}
      />

      {/* Toast Notifications */}
      <Toast
        toasts={toasts}
        onDismiss={(id) => setToasts((prev) => prev.filter((t) => t.id !== id))}
      />
    </div>
  );
}
