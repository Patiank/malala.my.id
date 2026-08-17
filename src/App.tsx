import React, { useState, useCallback, useEffect, useRef } from 'react';
import { Flame, RefreshCw } from 'lucide-react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { ImageRevealBackground } from './components/ImageRevealBackground';
import { Drawers } from './components/Drawers';
import { Toast } from './components/Toast';
import { NewsModal } from './components/NewsModal';
import { DrawerType, ToastNotice } from './types';
import { HotInfoItem } from './types';
import { useData } from './data/useData';
import { Language } from './lib/translations';

import { fetchAiHotInfo, isWithinLast30Days } from './utils/ai';

export default function App() {
  const [activeDrawer, setActiveDrawer] = useState<DrawerType>(null);
  const [selectedNews, setSelectedNews] = useState<HotInfoItem | null>(null);
  const [lang, setLang] = useState<Language>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('malala_lang');
      if (saved === 'en' || saved === 'id') return saved;
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

  // Automatic 2-hour refresh for Hot Info news ticker via Live RSS & AI (National Indonesia tourism news)
  useEffect(() => {
    const TWO_HOURS_MS = 2 * 60 * 60 * 1000; // 7,200,000 ms

    const autoRefresh = async () => {
      try {
        const lastRefreshStr = localStorage.getItem('malala_hotinfo_last_auto_refresh');
        const lastRefreshTime = lastRefreshStr ? parseInt(lastRefreshStr, 10) : 0;
        const now = Date.now();

        if (now - lastRefreshTime > TWO_HOURS_MS) {
          setIsRefreshingTicker(true);
          const data = await fetchAiHotInfo(lang);
          if (Array.isArray(data) && data.length > 0 && dataStore.updateHotInfoItems) {
            await dataStore.updateHotInfoItems(data);
            localStorage.setItem('malala_hotinfo_last_auto_refresh', now.toString());
          }
        }
      } catch (e) {
        console.warn("Auto-refresh hot info error:", e);
      } finally {
        setIsRefreshingTicker(false);
      }
    };

    // Initial check on load after 2s
    const initialTimer = setTimeout(() => {
      autoRefresh();
    }, 2000);

    // Re-check every 2 hours while the app is open
    const intervalTimer = setInterval(() => {
      autoRefresh();
    }, TWO_HOURS_MS);

    return () => {
      clearTimeout(initialTimer);
      clearInterval(intervalTimer);
    };
  }, []);

  const handleRefreshTicker = async (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsRefreshingTicker(true);
    try {
      const data = await fetchAiHotInfo(lang);
      if (Array.isArray(data) && data.length > 0 && dataStore.updateHotInfoItems) {
        await dataStore.updateHotInfoItems(data);
        localStorage.setItem('malala_hotinfo_last_auto_refresh', Date.now().toString());
        setToasts((prev) => [
          ...prev,
          {
            id: `toast-${Date.now()}`,
            message: lang === 'en'
              ? 'Real-time Indonesia tourism news updated successfully!'
              : 'Berita pariwisata real-time Indonesia berhasil diperbarui!',
            type: 'info'
          }
        ]);
      }
    } catch (err) {
      console.warn('Failed to refresh ticker:', err);
    } finally {
      setIsRefreshingTicker(false);
    }
  };

  // Sync lang to localStorage
  const handleToggleLang = useCallback(() => {
    setLang((prev) => {
      const next = prev === 'id' ? 'en' : 'id';
      if (typeof window !== 'undefined') {
        localStorage.setItem('malala_lang', next);
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

  const handleOpenDrawer = useCallback((type: DrawerType) => {
    setActiveDrawer(type);
  }, []);

  const handleCloseDrawer = useCallback(() => {
    setActiveDrawer(null);
  }, []);

  const handleToggleSave = useCallback(
    (id: string, title: string) => {
      setSavedIds((prev) => {
        const isSaved = prev.includes(id);
        if (isSaved) {
          showToast(lang === 'en' ? `Removed from Saved: "${title}"` : `Dihapus dari Favorit: "${title}"`);
          return prev.filter((item) => item !== id);
        } else {
          showToast(lang === 'en' ? `Saved to Favorites: "${title}"` : `Disimpan ke Favorit: "${title}"`);
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
        title={lang === 'en' ? 'Hot Info & Latest News' : 'Hot Info & Berita Terbaru'}
        aria-label="Hot Info & Berita Terbaru"
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
          Hot Info & Berita Terbaru
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
      />

      {/* Breaking News Ticker Bar (Placed at the very bottom) */}
      <div 
        className="fixed bottom-0 left-0 right-0 z-40 bg-black/95 text-white border-t border-red-600/40 py-2 px-4 flex items-center gap-3 overflow-hidden select-none transition-colors shadow-2xl backdrop-blur-md"
      >
        <div className="flex items-center gap-1.5 shrink-0">
          <button 
            onClick={() => handleOpenDrawer('hotinfo')}
            className="bg-red-600 hover:bg-red-700 text-white font-orbitron font-extrabold text-[10px] uppercase px-2.5 py-1 rounded flex items-center gap-1.5 shrink-0 shadow-xs hover:scale-105 transition-transform cursor-pointer"
          >
            <Flame className="w-3.5 h-3.5 text-yellow-300 fill-current animate-bounce" />
            <span>{lang === 'en' ? 'HOT INFO' : 'HOT INFO TERKINI'}</span>
          </button>
          
          <button
            onClick={handleRefreshTicker}
            disabled={isRefreshingTicker}
            title={lang === 'en' ? 'Refresh real-time news' : 'Perbarui berita real-time'}
            className="bg-red-950/80 hover:bg-red-900 border border-red-600/50 text-red-300 p-1 rounded shrink-0 transition-all active:scale-95 cursor-pointer disabled:opacity-50"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isRefreshingTicker ? 'animate-spin text-yellow-400' : ''}`} />
          </button>
        </div>

        <div className="overflow-hidden whitespace-nowrap w-full relative">
          {(() => {
            const validItems = (dataStore.hotInfoItems || []).filter((news: any) => isWithinLast30Days(news.date || news.createdAt));
            const displayItems = validItems.length > 0 ? validItems : dataStore.hotInfoItems;
            // Ultra-calm tempo: ~35 seconds per item (minimum 160 seconds total) for effortless readability
            const marqueeDuration = Math.max(160, displayItems.length * 35);

            return (
              <div 
                className="inline-flex items-center gap-10 animate-marquee hover:[animation-play-state:paused] font-jakarta text-xs text-gray-200"
                style={{
                  animation: `marqueeScroll ${marqueeDuration}s linear infinite`,
                  willChange: 'transform'
                }}
              >
                {[...displayItems, ...displayItems].map((news, idx) => {
                  const isEn = lang === 'en';
                  const cat = isEn && news.categoryEn ? news.categoryEn : news.category;
                  const titleText = isEn && news.titleEn ? news.titleEn : news.title;
                  const dateText = isEn && news.dateEn ? news.dateEn : news.date;
                  return (
                    <button
                      key={`${news.id}-${idx}`}
                      onClick={() => {
                        setSelectedNews(news);
                      }}
                      className="inline-flex items-center gap-2.5 hover:text-yellow-300 transition-colors cursor-pointer text-left focus:outline-none group py-0.5"
                    >
                      <span className="font-bold text-red-400 group-hover:text-red-300">[{cat}]</span>
                      <span className="underline-offset-2 group-hover:underline tracking-wide">{titleText}</span>
                      <span className="text-gray-400 font-mono text-[10px]">({dateText})</span>
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
        >
          <span>{lang === 'en' ? 'View All' : 'Lihat Semua'}</span>
          <span>→</span>
        </button>
      </div>

      {/* Drawers */}
      <Drawers
        activeDrawer={activeDrawer}
        onClose={handleCloseDrawer}
        onOpenDrawer={handleOpenDrawer}
        savedIds={savedIds}
        onToggleSave={handleToggleSave}
        dataStore={dataStore}
        lang={lang}
        onSelectNews={(news) => setSelectedNews(news)}
        searchQuery={searchQuery}
        onSearchQueryChange={setSearchQuery}
      />

      {/* Center News Detail Pop-up Modal */}
      <NewsModal
        item={selectedNews}
        onClose={() => setSelectedNews(null)}
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
