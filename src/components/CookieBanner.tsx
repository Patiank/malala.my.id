import React, { useState, useEffect } from 'react';
import { Compass } from 'lucide-react';
import { logTourismSignal } from '../utils/telemetry';

interface CookieBannerProps {
  onOpenPrivacy: () => void;
  lang?: 'id' | 'en';
}

const CONSENT_KEY = 'malala_cookie_consent';

export const CookieBanner: React.FC<CookieBannerProps> = ({ onOpenPrivacy, lang = 'id' }) => {
  const [isVisible, setIsVisible] = useState(false);
  const isEn = lang === 'en';

  useEffect(() => {
    try {
      const consent = localStorage.getItem(CONSENT_KEY);
      if (!consent) {
        // Small delay for smooth entry
        const timer = setTimeout(() => setIsVisible(true), 1200);
        return () => clearTimeout(timer);
      }
    } catch {
      // Fallback
    }
  }, []);

  const handleAccept = () => {
    try {
      localStorage.setItem(CONSENT_KEY, 'accepted');
    } catch {}
    setIsVisible(false);

    // Record initial anonymous session start signal
    logTourismSignal('session_start', {
      landingPage: window.location.pathname,
      referrer: document.referrer ? new URL(document.referrer).hostname : 'direct'
    });
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-3 left-3 right-3 sm:left-4 sm:right-auto sm:max-w-md z-[80] pointer-events-auto animate-in fade-in slide-in-from-bottom-5 duration-500">
      <div className="bg-slate-900/95 backdrop-blur-xl text-white border border-slate-700/60 rounded-2xl shadow-2xl p-4 sm:p-5 flex flex-col gap-3.5">
        
        {/* Header / Icon + Text */}
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 rounded-full bg-red-600/20 border border-red-500/30 flex items-center justify-center text-red-400 shrink-0 mt-0.5">
            <Compass className="w-4 h-4 text-amber-400 animate-pulse" />
          </div>
          <p className="text-xs sm:text-[13px] text-slate-200 leading-relaxed font-jakarta font-normal">
            {isEn
              ? 'To help plan your best trip in West Sumatra, we use anonymous cookies to remember your favorite destinations and provide the most suitable route recommendations.'
              : 'Untuk membantu merencanakan liburan terbaik Anda di Ranah Minang, kami menggunakan cookie anonim guna mengingat destinasi favorit dan menyajikan rekomendasi rute yang paling sesuai.'}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-between pt-1 border-t border-slate-800/80">
          <button
            type="button"
            onClick={onOpenPrivacy}
            className="text-[11px] sm:text-xs text-amber-400 hover:text-amber-300 underline font-medium font-jakarta transition-colors focus:outline-none"
          >
            {isEn ? 'Learn more' : 'Pelajari lebih lanjut'}
          </button>

          <button
            type="button"
            onClick={handleAccept}
            className="bg-red-600 hover:bg-red-700 active:scale-95 text-white text-xs font-semibold px-4 py-2 rounded-xl transition-all shadow-md focus:outline-none focus:ring-2 focus:ring-red-400/50"
          >
            {isEn ? 'I Understand' : 'Saya Mengerti'}
          </button>
        </div>

      </div>
    </div>
  );
};
