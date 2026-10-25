import React, { useState, useEffect } from 'react';
import { X, Download, Share, PlusSquare, Smartphone, Check } from 'lucide-react';
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

    // 3. Android / Chromium: Listen for 'beforeinstallprompt'
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      // Wait 3.5 seconds after page load before gracefully revealing prompt
      setTimeout(() => {
        setShowPrompt(true);
      }, 3500);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    // 4. iOS Safari Detection
    const ua = window.navigator.userAgent.toLowerCase();
    const isIosDevice = /iphone|ipad|ipod/.test(ua);
    const isSafari = /safari/.test(ua) && !/crios|fxios|optios|chrome|edg/.test(ua);

    if (isIosDevice && isSafari && !isStandalone) {
      setIsIos(true);
      // Wait 4 seconds on iOS before showing helpful install guidance
      setTimeout(() => {
        setShowPrompt(true);
      }, 4000);
    }

    // 5. Listen for app installed event
    const handleAppInstalled = () => {
      setIsInstalled(true);
      setShowPrompt(false);
      setDeferredPrompt(null);
    };

    window.addEventListener('appinstalled', handleAppInstalled);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;

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
  };

  const handleDismiss = () => {
    setShowPrompt(false);
    // Remember dismissal for 14 days
    localStorage.setItem('malala_pwa_dismissed_at', Date.now().toString());
  };

  if (!showPrompt || isInstalled) return null;

  const isEn = lang === 'en';

  return (
    <aside
      aria-label={isEn ? 'Install MALALA app' : 'Pasang aplikasi MALALA'}
      className="fixed bottom-[calc(84px+env(safe-area-inset-bottom,0px))] sm:bottom-6 left-3 right-3 sm:left-auto sm:right-6 sm:w-[410px] z-[95] bg-gradient-to-br from-slate-950/98 via-slate-900/98 to-neutral-950/98 text-white border border-red-500/40 rounded-2xl p-3 sm:p-4 shadow-2xl backdrop-blur-xl animate-slide-up font-jakarta transition-all"
    >
      <div className="flex items-start justify-between gap-3">
        {/* App Icon */}
        <div className="relative shrink-0">
          <img
            src="/pwa-192x192.png"
            alt="MALALA Icon"
            className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl object-contain bg-slate-950 border border-white/15 p-1 shadow-md"
            onError={(e: any) => {
              e.target.src = '/favicon.png';
            }}
          />
          <span className="absolute -top-1 -right-1 flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-red-600"></span>
          </span>
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0 pr-1">
          <div className="flex items-center gap-1.5 mb-0.5">
            <h4 className="font-orbitron font-bold text-xs sm:text-sm text-white tracking-wide truncate">
              MALALA
            </h4>
            <span className="text-[9px] uppercase font-bold px-1.5 py-0.2 rounded bg-red-600/30 text-red-300 border border-red-500/40">
              Web App
            </span>
          </div>

          <p className="text-[11px] sm:text-xs text-gray-300 leading-snug line-clamp-2">
            {isEn
              ? 'Install on your home screen for quick offline access and full screen mode.'
              : 'Pasang di layar utama HP untuk akses cepat & tampilan layar penuh.'}
          </p>

          {/* iOS Specific Guidance Tooltip */}
          {isIos && (
            <div className="mt-2.5 p-2 rounded-xl bg-white/5 border border-white/10 text-[10.5px] text-amber-200 leading-relaxed flex items-center gap-2">
              <Share className="w-4 h-4 text-cyan-400 shrink-0" />
              <span>
                {isEn ? (
                  <>Tap <strong className="text-white">Share</strong> then select <strong className="text-white">'Add to Home Screen'</strong> ➕</>
                ) : (
                  <>Ketuk tombol <strong className="text-white">Share ⎋</strong> di bawah, lalu pilih <strong className="text-white">'Tambah ke Layar Utama' ➕</strong></>
                )}
              </span>
            </div>
          )}
        </div>

        {/* Dismiss Button */}
        <button
          onClick={handleDismiss}
          className="text-gray-400 hover:text-white p-1 rounded-full hover:bg-white/10 transition-colors shrink-0"
          title={isEn ? 'Dismiss' : 'Tutup'}
          aria-label="Close"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Android / Chromium Action Bar */}
      {!isIos && deferredPrompt && (
        <div className="mt-3 pt-2.5 border-t border-white/10 flex items-center justify-between gap-2">
          <span className="text-[10px] text-gray-400 flex items-center gap-1">
            <Smartphone className="w-3 h-3 text-red-400" />
            <span>{isEn ? 'Free & lightweight (~1 MB)' : 'Gratis & ringan (~1 MB)'}</span>
          </span>

          <div className="flex items-center gap-2">
            <button
              onClick={handleDismiss}
              className="px-2.5 py-1.5 rounded-xl text-[11px] font-semibold text-gray-400 hover:text-white transition-colors"
            >
              {isEn ? 'Not now' : 'Nanti'}
            </button>
            <button
              onClick={handleInstallClick}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold bg-gradient-to-r from-red-600 via-rose-600 to-red-700 hover:from-red-500 hover:to-rose-500 text-white shadow-md active:scale-95 transition-all border border-red-400/40 cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>{isEn ? 'Install' : 'Pasang'}</span>
            </button>
          </div>
        </div>
      )}
    </aside>
  );
};
