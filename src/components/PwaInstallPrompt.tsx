import React, { useState, useEffect } from 'react';
import { X, Share, MoreVertical } from 'lucide-react';
import { Language } from '../lib/translations';

interface PwaInstallPromptProps {
  lang?: Language;
}

interface BeforeInstallPromptEvent extends Event {
  readonly platforms: string[];
  readonly userChoice: Promise<{
    outcome: 'accepted' | 'dismissed';
    platform: string;
  }>;
  prompt(): Promise<void>;
}

export const PwaInstallPrompt: React.FC<PwaInstallPromptProps> = ({ lang = 'id' }) => {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [showPrompt, setShowPrompt] = useState<boolean>(false);
  const [isIos, setIsIos] = useState<boolean>(false);
  const [showManualGuide, setShowManualGuide] = useState<boolean>(false);
  const [isInstalled, setIsInstalled] = useState<boolean>(false);

  useEffect(() => {
    // 1. Check if app is already running in standalone mode (installed PWA)
    const isStandalone =
      window.matchMedia('(display-mode: standalone)').matches ||
      (window.navigator as any).standalone === true ||
      document.referrer.includes('android-app://');

    if (isStandalone) {
      setIsInstalled(true);
      return;
    }

    // 2. Check dismissal cooldown in localStorage (14 days cooldown)
    const dismissedAt = localStorage.getItem('malala_pwa_dismissed_at');
    if (dismissedAt) {
      const daysSinceDismiss = (Date.now() - parseInt(dismissedAt, 10)) / (1000 * 60 * 60 * 24);
      if (daysSinceDismiss < 14) {
        return; // Suppress prompt if user dismissed within last 14 days
      }
    }

    // 3. Detect mobile device & iOS
    const ua = window.navigator.userAgent.toLowerCase();
    const isIosDevice = /iphone|ipad|ipod/.test(ua);
    const isMobileDevice = /android|iphone|ipad|ipod|mobile/.test(ua);

    if (isIosDevice) {
      setIsIos(true);
    }

    // 4. Android / Chromium: Listen for 'beforeinstallprompt'
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      setShowPrompt(true);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    // 5. Show sleek toast 1.5s after opening on mobile devices
    let timer: ReturnType<typeof setTimeout> | null = null;
    if (isMobileDevice && !isStandalone) {
      timer = setTimeout(() => {
        setShowPrompt(true);
      }, 1500);
    }

    // 6. Listen for app installed event
    const handleAppInstalled = () => {
      setIsInstalled(true);
      setShowPrompt(false);
      setDeferredPrompt(null);
    };

    window.addEventListener('appinstalled', handleAppInstalled);

    return () => {
      if (timer) clearTimeout(timer);
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, []);

  const handleInstallClick = async () => {
    if (deferredPrompt) {
      try {
        await deferredPrompt.prompt();
        const choiceResult = await deferredPrompt.userChoice;
        if (choiceResult.outcome === 'accepted') {
          setShowPrompt(false);
          setIsInstalled(true);
        }
        setDeferredPrompt(null);
      } catch (err) {
        console.warn('[PWA] Install prompt error:', err);
      }
    } else {
      // On iOS Safari or browsers where native prompt is manual, toggle compact 2-step guide
      setShowManualGuide((prev) => !prev);
    }
  };

  const handleDismiss = () => {
    setShowPrompt(false);
    setShowManualGuide(false);
    localStorage.setItem('malala_pwa_dismissed_at', Date.now().toString());
  };

  if (!showPrompt || isInstalled) return null;

  const isEn = lang === 'en';

  return (
    <aside
      aria-label={isEn ? 'Install MALALA' : 'Instal MALALA'}
      className="fixed top-3 left-3 right-3 sm:left-auto sm:right-5 sm:w-[390px] z-[110] bg-white text-slate-900 rounded-[22px] px-3.5 py-2.5 shadow-[0_10px_32px_rgba(0,0,0,0.28)] border border-slate-200/90 animate-slide-up font-jakarta transition-all"
    >
      <div className="flex items-center justify-between gap-3">
        {/* Left: Rounded Dark App Icon (matching native Chrome toast) */}
        <div className="shrink-0">
          <img
            src="/pwa-192x192.png"
            alt="MALALA"
            className="w-12 h-12 rounded-[14px] object-contain bg-[#141418] p-1.5 shadow-sm"
            onError={(e: any) => {
              e.target.src = '/favicon.png';
            }}
          />
        </div>

        {/* Middle: Title & Domain */}
        <div className="flex-1 min-w-0">
          <h4 className="font-medium text-[16.5px] sm:text-[17px] text-[#1f1f1f] leading-tight truncate">
            {isEn ? 'Install MALALA' : 'Instal MALALA'}
          </h4>
          <p className="text-[13.5px] text-[#444746] leading-tight truncate mt-0.5">
            malala.my.id
          </p>
        </div>

        {/* Right: Clean "Instal" Action + Subtle Close */}
        <div className="flex items-center gap-1 shrink-0">
          <button
            onClick={handleInstallClick}
            className="px-3 py-1.5 rounded-lg text-[15.5px] font-semibold text-[#1b5e7a] hover:bg-slate-100 active:bg-slate-200 active:scale-95 transition-all cursor-pointer"
          >
            {isEn ? 'Install' : 'Instal'}
          </button>
          <button
            onClick={handleDismiss}
            className="text-slate-400 hover:text-slate-600 p-1 rounded-full hover:bg-slate-100 transition-colors cursor-pointer"
            title={isEn ? 'Close' : 'Tutup'}
            aria-label="Close"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Compact Helper Guide (only shown when user taps "Instal" on iOS Safari or manual browsers) */}
      {showManualGuide && (
        <div className="mt-2.5 pt-2.5 border-t border-slate-200/80 text-[12px] text-slate-700 flex items-center gap-2 leading-snug">
          {isIos ? (
            <>
              <Share className="w-4 h-4 text-[#1b5e7a] shrink-0" />
              <span>
                {isEn ? (
                  <>Tap <strong className="text-slate-900">Share</strong> below, then select <strong className="text-slate-900">'Add to Home Screen' ➕</strong></>
                ) : (
                  <>Ketuk tombol <strong className="text-slate-900">Share ⎋</strong> di bawah, lalu pilih <strong className="text-slate-900">'Tambah ke Layar Utama' ➕</strong></>
                )}
              </span>
            </>
          ) : (
            <>
              <MoreVertical className="w-4 h-4 text-[#1b5e7a] shrink-0" />
              <span>
                {isEn ? (
                  <>Tap browser menu <strong className="text-slate-900">(⋮)</strong> then select <strong className="text-slate-900">'Install app'</strong> or <strong className="text-slate-900">'Add to Home screen'</strong></>
                ) : (
                  <>Ketuk menu browser <strong className="text-slate-900">(⋮)</strong> di kanan atas, lalu pilih <strong className="text-slate-900">'Instal aplikasi'</strong> atau <strong className="text-slate-900">'Tambahkan ke Layar utama'</strong></>
                )}
              </span>
            </>
          )}
        </div>
      )}
    </aside>
  );
};
