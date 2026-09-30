import React, { useState, useEffect, useRef } from 'react';
import { X, BookOpen, Calendar, Maximize2, Minimize2, ExternalLink, Download, Globe, Sparkles, Loader2 } from 'lucide-react';

interface FlipbookModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang?: 'id' | 'en';
  bookSlug?: 'panduan' | 'events' | string;
  customTitle?: string;
}

export const FlipbookModal: React.FC<FlipbookModalProps> = ({
  isOpen,
  onClose,
  lang = 'id',
  bookSlug = 'panduan',
  customTitle
}) => {
  const [readingLang, setReadingLang] = useState<'id' | 'en'>(lang);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);

  const isEvents = bookSlug === 'events';

  // Sync with parent language when modal opens
  useEffect(() => {
    if (isOpen) {
      setReadingLang(lang);
      setIsLoading(true);
    }
  }, [isOpen, lang]);

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        if (document.fullscreenElement) {
          document.exitFullscreen().catch(() => {});
        } else {
          onClose();
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Track fullscreen changes
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  if (!isOpen) return null;

  const toggleFullscreen = async () => {
    try {
      if (!document.fullscreenElement) {
        if (containerRef.current) {
          await containerRef.current.requestFullscreen();
        }
      } else {
        await document.exitFullscreen();
      }
    } catch (err) {
      console.warn("Fullscreen request error:", err);
    }
  };

  const iframeSrc = `/flipbook/${bookSlug}/${readingLang}/malala.html`;

  const handleOpenNewTab = () => {
    window.open(iframeSrc, '_blank');
  };

  const handleDownloadPdf = () => {
    const isEn = readingLang === 'en';
    const link = document.createElement('a');
    if (isEvents) {
      link.href = isEn
        ? `/downloads/kalender-event-sumbar-2026-en.pdf?v=${Date.now()}`
        : `/downloads/kalender-event-sumbar-2026.pdf?v=${Date.now()}`;
      link.download = isEn
        ? 'MALALA-West-Sumatra-Calendar-of-Events-2026.pdf'
        : 'MALALA-Kalender-Event-CoE-Sumatera-Barat-2026.pdf';
    } else {
      link.href = isEn
        ? `/downloads/malala-tourism-guide-sumbar-2026-en.pdf?v=${Date.now()}`
        : `/downloads/malala-panduan-wisata-sumbar-2026.pdf?v=${Date.now()}`;
      link.download = isEn
        ? 'MALALA-West-Sumatra-Tourism-Guide-2026.pdf'
        : 'MALALA-Panduan-Wisata-Sumatera-Barat-2026.pdf';
    }
    link.target = '_blank';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const defaultTitle = isEvents
    ? (readingLang === 'en'
        ? 'West Sumatra Calendar of Events & KEN 2026'
        : 'Kalender Event & Kharisma Event Nusantara 2026')
    : (readingLang === 'en'
        ? 'West Sumatra Complete Tourism & Culture Guide 2026'
        : 'Buku Panduan Lengkap Pariwisata & Budaya Sumbar 2026');

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[300] bg-black/95 flex flex-col backdrop-blur-md animate-fade-in select-none"
      role="dialog"
      aria-modal="true"
    >
      {/* Top Header Control Bar */}
      <header className="h-14 sm:h-16 bg-slate-950/90 border-b border-slate-800/80 px-3 sm:px-6 flex items-center justify-between shrink-0 shadow-lg text-white">
        
        {/* Left: Book Title & Badge */}
        <div className="flex items-center gap-2.5 min-w-0 pr-2">
          <div className={`w-8 h-8 sm:w-9 sm:h-9 rounded-lg border flex items-center justify-center shrink-0 ${
            isEvents 
              ? 'bg-amber-500/20 border-amber-500/40 text-amber-400' 
              : 'bg-red-600/20 border-red-500/30 text-red-500'
          }`}>
            {isEvents ? (
              <Calendar className="w-4 h-4 sm:w-5 sm:h-5 text-amber-400" />
            ) : (
              <BookOpen className="w-4 h-4 sm:w-5 sm:h-5 text-red-500" />
            )}
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <span className={`hidden sm:inline-flex items-center gap-1 text-[9px] font-extrabold uppercase px-2 py-0.5 rounded border ${
                isEvents
                  ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                  : 'bg-red-600/30 text-red-400 border-red-500/40'
              }`}>
                <Sparkles className="w-2.5 h-2.5" />
                Flipbook 3D
              </span>
              <h2 className="font-orbitron font-bold text-xs sm:text-sm text-white truncate max-w-[180px] sm:max-w-[320px] md:max-w-md">
                {customTitle || defaultTitle}
              </h2>
            </div>
            <p className="text-[10px] text-gray-400 font-jakarta hidden md:block">
              {readingLang === 'en' ? 'Interactive Page-Flip Edition' : 'Edisi Interaktif Buka Lembaran Halaman'}
            </p>
          </div>
        </div>

        {/* Right: Language Switcher, Action Buttons & Close */}
        <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
          
          {/* Language Selector Pill */}
          <div className="flex items-center bg-slate-900 border border-slate-700/80 rounded-lg p-0.5 shadow-inner">
            <button
              type="button"
              onClick={() => {
                if (readingLang !== 'id') {
                  setReadingLang('id');
                  setIsLoading(true);
                }
              }}
              className={`px-2 py-1 sm:px-2.5 sm:py-1 rounded-md text-[11px] font-bold font-jakarta transition-all cursor-pointer flex items-center gap-1 ${
                readingLang === 'id'
                  ? (isEvents ? 'bg-amber-500 text-black shadow-sm' : 'bg-red-600 text-white shadow-sm')
                  : 'text-gray-400 hover:text-white hover:bg-slate-800'
              }`}
              title="Baca Versi Bahasa Indonesia"
            >
              <span>🇮🇩</span>
              <span className="hidden xs:inline">ID</span>
            </button>
            <button
              type="button"
              onClick={() => {
                if (readingLang !== 'en') {
                  setReadingLang('en');
                  setIsLoading(true);
                }
              }}
              className={`px-2 py-1 sm:px-2.5 sm:py-1 rounded-md text-[11px] font-bold font-jakarta transition-all cursor-pointer flex items-center gap-1 ${
                readingLang === 'en'
                  ? (isEvents ? 'bg-amber-500 text-black shadow-sm' : 'bg-red-600 text-white shadow-sm')
                  : 'text-gray-400 hover:text-white hover:bg-slate-800'
              }`}
              title="Read English Edition"
            >
              <span>🇬🇧</span>
              <span className="hidden xs:inline">EN</span>
            </button>
          </div>

          {/* Download PDF Shortcut */}
          <button
            type="button"
            onClick={handleDownloadPdf}
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-700 text-gray-200 hover:text-white text-xs font-jakarta font-semibold transition-all cursor-pointer"
            title={readingLang === 'en' ? 'Download PDF Version' : 'Unduh Berkas PDF'}
          >
            <Download className={`w-3.5 h-3.5 ${isEvents ? 'text-amber-400' : 'text-red-400'}`} />
            <span className="hidden md:inline">PDF</span>
          </button>

          {/* Open in New Tab Button */}
          <button
            type="button"
            onClick={handleOpenNewTab}
            className="p-2 sm:px-2.5 sm:py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-700 text-gray-300 hover:text-white text-xs font-jakarta transition-all cursor-pointer flex items-center gap-1"
            title={readingLang === 'en' ? 'Open in dedicated full tab' : 'Buka di tab layar penuh baru'}
            aria-label="Open in new tab"
          >
            <ExternalLink className="w-4 h-4 text-gray-300" />
            <span className="hidden lg:inline text-[11px]">Tab Baru</span>
          </button>

          {/* Fullscreen Button */}
          <button
            type="button"
            onClick={toggleFullscreen}
            className="p-2 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-700 text-gray-300 hover:text-white transition-all cursor-pointer"
            title={isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}
            aria-label="Fullscreen"
          >
            {isFullscreen ? (
              <Minimize2 className="w-4 h-4 text-amber-400" />
            ) : (
              <Maximize2 className="w-4 h-4 text-gray-300" />
            )}
          </button>

          {/* Close Modal Button */}
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-red-600/90 hover:bg-red-700 text-white flex items-center justify-center transition-all hover:scale-105 cursor-pointer ml-1 shadow-md"
            title={readingLang === 'en' ? 'Close Flipbook' : 'Tutup Flipbook'}
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </header>

      {/* Main Interactive Flipbook Frame Container */}
      <main className="relative flex-1 w-full h-[calc(100%-3.5rem)] sm:h-[calc(100%-4rem)] bg-neutral-900 overflow-hidden">
        {/* Loading Spinner */}
        {isLoading && (
          <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-slate-950/80 backdrop-blur-xs text-white">
            <Loader2 className={`w-10 h-10 ${isEvents ? 'text-amber-400' : 'text-red-500'} animate-spin mb-3`} />
            <p className="font-orbitron text-xs sm:text-sm font-semibold tracking-wider text-gray-200">
              {readingLang === 'en' ? 'LOADING FLIPBOOK...' : 'MEMUAT BUKU PANDUAN...'}
            </p>
            <p className="text-[11px] font-jakarta text-gray-400 mt-1">
              {readingLang === 'en' ? 'Preparing 3D interactive pages' : 'Menyiapkan lembaran interaktif 3D'}
            </p>
          </div>
        )}

        {/* Embedded Standalone Flipbook Iframe */}
        <iframe
          key={`${bookSlug}-${readingLang}`}
          src={iframeSrc}
          title={customTitle || defaultTitle}
          className="w-full h-full border-0"
          allow="fullscreen; clipboard-write"
          loading="lazy"
          onLoad={() => setIsLoading(false)}
        />
      </main>
    </div>
  );
};
