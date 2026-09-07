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
      className="fixed inset-0 z-[150] bg-black/75 backdrop-blur-xs flex items-center justify-center p-4 animate-fadeIn"
      onClick={onClose}
    >
      <div 
        className="bg-[#202124] text-white max-w-lg w-full rounded-2xl overflow-hidden shadow-2xl border border-[#3c4043] animate-scale-up space-y-4 p-5 sm:p-6 relative max-h-[90vh] overflow-y-auto font-jakarta"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-full bg-white/10 text-gray-300 hover:bg-white hover:text-black transition-colors cursor-pointer z-20"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Featured Image Thumbnail */}
        {item.imageUrl && (
          <div 
            onClick={() => window.open(primaryUrl, '_blank', 'noopener,noreferrer')}
            className="w-full h-48 sm:h-56 rounded-xl overflow-hidden relative cursor-pointer group bg-black/40 border border-[#3c4043]"
          >
            <img
              src={item.imageUrl}
              alt={title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5">
              <span className="bg-black/80 backdrop-blur-xs text-white text-[10px] font-bold px-2.5 py-1 rounded-md border border-white/10 uppercase tracking-wider">
                {category}
              </span>
              {tag && (
                <span className="bg-red-600 text-white font-bold text-[9px] uppercase px-2 py-0.5 rounded-md tracking-wider flex items-center gap-1">
                  <Flame className="w-3 h-3 fill-current text-yellow-300" />
                  {tag}
                </span>
              )}
            </div>
          </div>
        )}

        {/* Publisher Brand Row */}
        <div className="flex items-center gap-2 pt-1">
          <img
            src={faviconUrl}
            alt={publisherName}
            className="w-4 h-4 rounded-xs object-contain shrink-0 bg-white/10 p-0.5"
            onError={(e: any) => { e.target.style.display = 'none'; }}
          />
          <span className="text-xs font-semibold text-gray-300">
            {publisherDomain}
          </span>
          <span className="text-gray-500">•</span>
          <span className="text-xs text-gray-400 font-medium">
            {timeAgoText}
          </span>
        </div>

        {/* Modal Headline Title */}
        <h3 
          onClick={() => window.open(primaryUrl, '_blank', 'noopener,noreferrer')}
          className="font-bold text-lg sm:text-xl text-white hover:text-blue-400 transition-colors cursor-pointer leading-snug"
        >
          {title}
        </h3>

        {/* Short Excerpt if Available */}
        {item.description && (
          <p className="text-xs text-gray-300 leading-relaxed line-clamp-3">
            {item.description.split('\n\n')[0]}
          </p>
        )}

        {/* Related Perspectives List (Google News Cluster) */}
        {Array.isArray(item.relatedStories) && item.relatedStories.length > 0 && (
          <div className="space-y-3 pt-3 border-t border-[#3c4043]">
            <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider flex items-center gap-1.5">
              <BookOpen className="w-3.5 h-3.5 text-blue-400" />
              <span>{isEn ? 'Related Perspectives & Coverage' : 'Perspektif & Liputan Terkait'}</span>
            </h4>
            <div className="space-y-2.5">
              {item.relatedStories.map((rel, rIdx) => {
                const relFavicon = rel.sourceIcon || getPublisherFavicon(rel.sourceDomain, rel.sourceName);
                return (
                  <div
                    key={rIdx}
                    onClick={() => window.open(rel.sourceUrl || primaryUrl, '_blank', 'noopener,noreferrer')}
                    className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 transition-colors cursor-pointer border border-white/5 space-y-1"
                  >
                    <div className="flex items-center gap-1.5">
                      <img
                        src={relFavicon}
                        alt={rel.sourceName}
                        className="w-3.5 h-3.5 rounded-xs object-contain shrink-0"
                        onError={(e: any) => { e.target.style.display = 'none'; }}
                      />
                      <span className="text-[11px] font-semibold text-gray-300">{rel.sourceDomain || rel.sourceName}</span>
                      <span className="text-gray-500 text-[10px]">•</span>
                      <span className="text-[10px] text-gray-400">{rel.timeAgo}</span>
                    </div>
                    <p className="text-xs font-medium text-gray-200 hover:text-blue-400 leading-snug">
                      {isEn && rel.titleEn ? rel.titleEn : rel.title}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="space-y-2 pt-3 border-t border-[#3c4043]">
          {/* Primary Action: Direct Link to Original News */}
          <button
            onClick={() => window.open(primaryUrl, '_blank', 'noopener,noreferrer')}
            className="w-full bg-[#1a73e8] hover:bg-[#1557b0] text-white py-3 rounded-xl font-bold text-xs transition-colors cursor-pointer flex justify-center items-center gap-2 shadow-lg"
          >
            <span>{isEn ? `Read Full Story on ${publisherName}` : `Buka Berita Lengkap di ${publisherName}`}</span>
            <ExternalLink className="w-4 h-4" />
          </button>

          {/* Secondary Action: Geographic Location Maps Link */}
          {locationName && (
            <a
              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(locationName)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full bg-emerald-700/80 hover:bg-emerald-600 text-white py-2.5 rounded-xl font-semibold text-xs transition-colors cursor-pointer flex justify-center items-center gap-2 border border-emerald-500/30"
            >
              <MapPin className="w-3.5 h-3.5" />
              <span>{isEn ? `View Location on Map (${locationName.split(',')[0]})` : `Buka Lokasi di Peta (${locationName.split(',')[0]})`}</span>
            </a>
          )}

          <div className="grid grid-cols-2 gap-2 pt-1">
            <button
              onClick={handleShare}
              className="w-full bg-[#303134] hover:bg-[#3c4043] text-gray-300 py-2.5 rounded-xl font-semibold text-xs transition-colors cursor-pointer flex justify-center items-center gap-2 border border-[#3c4043]"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>{isEn ? 'Share' : 'Bagikan'}</span>
            </button>

            <button
              onClick={onClose}
              className="w-full bg-black/60 hover:bg-black text-gray-300 hover:text-white py-2.5 rounded-xl font-semibold text-xs transition-colors cursor-pointer border border-white/10"
            >
              {isEn ? 'Close' : 'Tutup'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

