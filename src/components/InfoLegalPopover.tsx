import React, { useState, useEffect, useRef } from 'react';
import { Info, X, ShieldCheck, FileText, AlertTriangle, Mail, Map, ExternalLink } from 'lucide-react';
import { Language } from '../lib/translations';

interface InfoLegalPopoverProps {
  onOpenLegal: (type: 'about' | 'privacy' | 'terms' | 'disclaimer' | 'contact') => void;
  lang: Language;
}

export const InfoLegalPopover: React.FC<InfoLegalPopoverProps> = ({ onOpenLegal, lang }) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const isEn = lang === 'en';

  // Close when clicking outside
  useEffect(() => {
    if (!isOpen) return;
    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  const legalLinks: {
    id: 'about' | 'privacy' | 'terms' | 'disclaimer' | 'contact' | 'sitemap';
    label: string;
    href: string;
    icon: typeof Info;
    isExternal?: boolean;
  }[] = [
    {
      id: 'about',
      label: isEn ? 'About Us' : 'Tentang Kami',
      href: '/about',
      icon: Info,
    },
    {
      id: 'privacy',
      label: isEn ? 'Privacy Policy' : 'Kebijakan Privasi',
      href: '/privacy',
      icon: ShieldCheck,
    },
    {
      id: 'terms',
      label: isEn ? 'Terms of Service' : 'Syarat & Ketentuan',
      href: '/terms',
      icon: FileText,
    },
    {
      id: 'disclaimer',
      label: isEn ? 'Disclaimer' : 'Penafian Hukum',
      href: '/disclaimer',
      icon: AlertTriangle,
    },
    {
      id: 'contact',
      label: isEn ? 'Contact Redaksi' : 'Kontak Redaksi',
      href: '/contact',
      icon: Mail,
    },
    {
      id: 'sitemap',
      label: isEn ? 'Sitemap.xml' : 'Peta Situs (Sitemap)',
      href: '/sitemap.xml',
      icon: Map,
      isExternal: true,
    },
  ];

  return (
    <div
      ref={containerRef}
      className="fixed bottom-[calc(76px+env(safe-area-inset-bottom,0px))] md:bottom-3 right-3 md:right-4 z-40 pointer-events-auto font-jakarta"
    >
      {/* Popover Panel */}
      {isOpen && (
        <div
          role="dialog"
          aria-labelledby="info-popover-title"
          className="absolute bottom-full right-0 mb-2 w-72 sm:w-80 max-w-[calc(100vw-24px)] bg-gray-950/95 backdrop-blur-xl border border-white/15 rounded-2xl shadow-2xl p-4 text-white animate-in fade-in zoom-in-95 duration-150 origin-bottom-right"
        >
          {/* Header */}
          <div className="flex items-center justify-between pb-3 mb-2 border-b border-white/10">
            <div className="flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-red-600/30 border border-red-500/50 flex items-center justify-center text-[10px] text-red-400 font-bold">
                ⓘ
              </span>
              <div>
                <h3 id="info-popover-title" className="text-xs font-bold text-gray-100 uppercase tracking-wider font-orbitron">
                  MALALA Portal
                </h3>
                <p className="text-[10px] text-gray-400">
                  {isEn ? 'Information & Legal Compliance' : 'Informasi & Kepatuhan Regulasi'}
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-gray-400 hover:text-white p-1 rounded-lg hover:bg-white/10 transition-colors cursor-pointer"
              aria-label="Tutup menu informasi"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Links Grid */}
          <nav aria-label="Legal & Transparency Links" className="grid grid-cols-2 gap-1.5 py-1">
            {legalLinks.map((item) => {
              const Icon = item.icon;
              return (
                <a
                  key={item.id}
                  href={item.href}
                  target={item.isExternal ? '_blank' : undefined}
                  rel={item.isExternal ? 'noopener noreferrer' : undefined}
                  onClick={(e) => {
                    if (item.id !== 'sitemap') {
                      e.preventDefault();
                      onOpenLegal(item.id);
                      setIsOpen(false);
                    }
                  }}
                  className="flex items-center gap-2 p-2 rounded-xl text-[11px] font-medium text-gray-300 hover:text-white hover:bg-white/10 border border-transparent hover:border-white/10 transition-all group cursor-pointer"
                >
                  <Icon className="w-3.5 h-3.5 text-red-400 group-hover:scale-110 transition-transform shrink-0" />
                  <span className="truncate">{item.label}</span>
                  {item.isExternal && <ExternalLink className="w-2.5 h-2.5 text-gray-500 ml-auto shrink-0" />}
                </a>
              );
            })}
          </nav>

          {/* E-E-A-T Disclosure Footer */}
          <div className="mt-3 pt-2.5 border-t border-white/10 text-[10px] text-gray-400 leading-relaxed text-center">
            <p>
              MALALA © 2026 • Kurasi Budaya &amp; Wisata Sumbar oleh{' '}
              <span className="text-red-400 font-semibold">MINANGKAOS</span>.
            </p>
            <p className="text-[9px] text-gray-500 mt-0.5">
              {isEn
                ? 'All trademarks & content protected by law.'
                : 'Hak cipta & transparansi data dilindungi undang-undang.'}
            </p>
          </div>
        </div>
      )}

      {/* Floating ⓘ Minimalist Icon Button */}
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-expanded={isOpen}
        aria-haspopup="dialog"
        title={isEn ? 'Information, Legal & Sitemap' : 'Informasi, Regulasi & Peta Situs'}
        className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-black/60 hover:bg-black/90 active:scale-95 border border-white/20 hover:border-white/50 text-white/50 hover:text-white backdrop-blur-md flex items-center justify-center shadow-lg transition-all cursor-pointer group"
      >
        <span className="font-serif italic font-bold text-xs sm:text-sm group-hover:scale-110 transition-transform">
          ⓘ
        </span>
      </button>
    </div>
  );
};
