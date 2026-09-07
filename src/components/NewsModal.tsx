import React from 'react';
import { X, MapPin, Share2, Flame, ExternalLink, BookOpen } from 'lucide-react';
import { HotInfoItem } from '../types';
import { Language } from '../lib/translations';
import { getNewsDisplayTitle } from '../utils/ai';
import { getPublisherFavicon } from './Drawers';

interface NewsModalProps {
  item: HotInfoItem | null;
  onClose: () => void;
  lang: Language;
}

export const NewsModal: React.FC<NewsModalProps> = ({ item, onClose, lang }) => {
  if (!item) return null;

  const isEn = lang === 'en';
  const title = getNewsDisplayTitle(item, lang);
  const category = isEn && item.categoryEn ? item.categoryEn : item.category;
  const tag = isEn && item.tagEn ? item.tagEn : item.tag;
  const date = isEn && item.dateEn ? item.dateEn : item.date;
  const timeAgoText = item.timeAgo || date;
  const primaryUrl = item.sourceUrl || item.actionUrl || '#';
  const publisherName = item.sourceName || (item.tag === 'Sumbar' ? 'Antara News Sumbar' : 'Media Resmi');
  const publisherDomain = item.sourceDomain || publisherName;
  const faviconUrl = item.sourceIcon || getPublisherFavicon(item.sourceDomain, item.sourceName);

  const rawLocation = isEn && item.locationNameEn ? item.locationNameEn : item.locationName;
  const locationName = (rawLocation || '')
    .replace(/Liputan\s*(Resmi\s*)?Terverifikasi\s*(\([^)]*\))?/gi, '')
    .replace(/Verified\s*Report\s*(\([^)]*\))?/gi, '')
    .trim();

  const handleShare = () => {
    const shareUrl = primaryUrl || window.location.href;
    if (navigator.share) {
      navigator.share({
        title,
        text: `${title} - ${publisherName}`,
        url: shareUrl,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(`${title}\n${shareUrl}`);
      alert(isEn ? 'News link copied to clipboard!' : 'Tautan berita berhasil disalin!');
    }
  };

  return (
    <div 
      className="fixed inset-0 z-[150] bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-fadeIn"
      onClick={onClose}
    >
      <div 
        className="bg-white text-gray-900 max-w-lg w-full rounded-2xl overflow-hidden shadow-2xl border border-gray-200 animate-scale-up space-y-4 p-5 sm:p-6 relative max-h-[90vh] overflow-y-auto font-jakarta"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-full bg-gray-100 text-gray-500 hover:bg-gray-200 hover:text-gray-900 transition-colors cursor-pointer z-20"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Publisher Brand Row */}
        <div className="flex items-center gap-2 pt-1 flex-wrap">
          <img
            src={faviconUrl}
            alt={publisherName}
            className="w-4 h-4 rounded-xs object-contain shrink-0 bg-white border border-gray-200 p-0.5 shadow-2xs"
            onError={(e: any) => { e.target.style.display = 'none'; }}
          />
          <span className="text-xs font-bold text-gray-800">
            {publisherDomain}
          </span>
          <span className="text-gray-300">•</span>
          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md uppercase tracking-wider ${
            tag === 'Sumbar' || category.includes('Sumatera')
              ? 'bg-amber-50 text-amber-800 border border-amber-200'
              : 'bg-red-50 text-red-800 border border-red-200'
          }`}>
            {category}
          </span>
          <span className="text-gray-300">•</span>
          <span className="text-xs text-gray-500 font-medium">
            {timeAgoText}
          </span>
        </div>

        {/* Modal Headline Title (Original Font: Orbitron Uppercase) */}
        <h3 
          onClick={() => window.open(primaryUrl, '_blank', 'noopener,noreferrer')}
          className="font-orbitron font-bold text-base sm:text-lg uppercase tracking-wide text-gray-900 hover:text-blue-600 transition-colors cursor-pointer leading-snug"
        >
          {title}
        </h3>

        {/* Short Excerpt if Available */}
        {item.description && (
          <p className="text-xs text-gray-600 leading-relaxed">
            {item.description.split('\n\n')[0]}
          </p>
        )}

        {/* Related Perspectives List (Google News Cluster) */}
        {Array.isArray(item.relatedStories) && item.relatedStories.length > 0 && (
          <div className="space-y-3 pt-3 border-t border-gray-100">
            <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider flex items-center gap-1.5">
              <BookOpen className="w-3.5 h-3.5 text-blue-600" />
              <span>{isEn ? 'Related Perspectives & Coverage' : 'Perspektif & Liputan Terkait'}</span>
            </h4>
            <div className="space-y-2">
              {item.relatedStories.map((rel, rIdx) => {
                const relFavicon = rel.sourceIcon || getPublisherFavicon(rel.sourceDomain, rel.sourceName);
                return (
                  <div
                    key={rIdx}
                    onClick={() => window.open(rel.sourceUrl || primaryUrl, '_blank', 'noopener,noreferrer')}
                    className="p-2.5 rounded-xl bg-slate-50 hover:bg-slate-100 transition-colors cursor-pointer border border-slate-200/80 space-y-1"
                  >
                    <div className="flex items-center gap-1.5">
                      <img
                        src={relFavicon}
                        alt={rel.sourceName}
                        className="w-3.5 h-3.5 rounded-xs object-contain shrink-0 bg-white border border-slate-200 p-0.5"
                        onError={(e: any) => { e.target.style.display = 'none'; }}
                      />
                      <span className="text-[11px] font-bold text-slate-700">{rel.sourceDomain || rel.sourceName}</span>
                      <span className="text-slate-300 text-[10px]">•</span>
                      <span className="text-[10px] text-slate-500">{rel.timeAgo}</span>
                    </div>
                    <p className="text-xs font-medium text-slate-800 hover:text-blue-600 leading-snug">
                      {isEn && rel.titleEn ? rel.titleEn : rel.title}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="space-y-2 pt-3 border-t border-gray-100">
          {/* Primary Action: Direct Link to Original News */}
          <button
            onClick={() => window.open(primaryUrl, '_blank', 'noopener,noreferrer')}
            className="w-full bg-gradient-to-r from-neutral-900 via-neutral-800 to-neutral-950 hover:from-neutral-800 hover:to-neutral-900 text-white py-3 rounded-xl font-bold text-xs transition-colors cursor-pointer flex justify-center items-center gap-2 shadow-xs border border-neutral-700/70"
          >
            <span>{isEn ? `Read Full Story on ${publisherName}` : `Buka Berita Lengkap di ${publisherName}`}</span>
            <ExternalLink className="w-4 h-4 text-gray-300" />
          </button>

          {/* Secondary Action: Geographic Location Maps Link */}
          {locationName && (
            <a
              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(locationName)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-2.5 rounded-xl font-semibold text-xs transition-colors cursor-pointer flex justify-center items-center gap-2 shadow-xs"
            >
              <MapPin className="w-3.5 h-3.5" />
              <span>{isEn ? `View Location on Map (${locationName.split(',')[0]})` : `Buka Lokasi di Peta (${locationName.split(',')[0]})`}</span>
            </a>
          )}

          <div className="grid grid-cols-2 gap-2 pt-1">
            <button
              onClick={handleShare}
              className="w-full bg-slate-100 hover:bg-slate-200 text-slate-700 py-2.5 rounded-xl font-semibold text-xs transition-colors cursor-pointer flex justify-center items-center gap-2 border border-slate-200"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>{isEn ? 'Share' : 'Bagikan'}</span>
            </button>

            <button
              onClick={onClose}
              className="w-full bg-slate-100 hover:bg-slate-200 text-slate-700 py-2.5 rounded-xl font-semibold text-xs transition-colors cursor-pointer border border-slate-200"
            >
              {isEn ? 'Close' : 'Tutup'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

