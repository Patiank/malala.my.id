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
  const hasExternalUrl = Boolean(item.sourceUrl && (item.sourceUrl.startsWith('http://') || item.sourceUrl.startsWith('https://')));
  const primaryUrl = hasExternalUrl ? item.sourceUrl! : (item.actionUrl?.startsWith('http') ? item.actionUrl : '');
  const publisherName = item.sourceName || (hasExternalUrl ? (item.tag === 'Sumbar' ? 'Antara News Sumbar' : 'Media Resmi') : (isEn ? 'Official Tourism Sumbar' : 'Rilis Resmi Pariwisata Sumbar'));
  const publisherDomain = item.sourceDomain || item.sourceName || (hasExternalUrl ? (item.tag === 'Sumbar' ? 'sumbar.antaranews.com' : 'travel.kompas.com') : (isEn ? 'Official Tourism Sumbar' : 'Rilis Resmi Pariwisata Sumbar'));
  const faviconUrl = item.sourceIcon || (hasExternalUrl ? getPublisherFavicon(item.sourceDomain, item.sourceName) : '/favicon.ico');

  const rawLocation = isEn && item.locationNameEn ? item.locationNameEn : item.locationName;
  const locationName = (rawLocation || '')
    .replace(/Liputan\s*(Resmi\s*)?Terverifikasi\s*(\([^)]*\))?/gi, '')
    .replace(/Verified\s*Report\s*(\([^)]*\))?/gi, '')
    .trim();

  const descriptionText = isEn && item.descriptionEn ? item.descriptionEn : item.description;

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
      className="fixed inset-0 z-[150] bg-black/60 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-4 animate-fadeIn"
      onClick={onClose}
    >
      <div 
        className="bg-white text-gray-900 max-w-lg w-full rounded-t-3xl sm:rounded-2xl overflow-hidden shadow-2xl border-t sm:border border-gray-200 animate-slide-up sm:animate-scale-up space-y-4 p-4 sm:p-6 relative max-h-[88vh] sm:max-h-[90vh] overflow-y-auto font-jakarta"
        style={{ paddingBottom: 'calc(1.25rem + env(safe-area-inset-bottom, 0px))' }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Visual Grab Handle for Mobile Bottom Sheet */}
        <div className="w-12 h-1.5 bg-gray-300 rounded-full mx-auto -mt-1 mb-2.5 sm:hidden shrink-0" />

        {/* Modal Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3.5 right-3.5 sm:top-4 sm:right-4 min-w-[36px] min-h-[36px] flex items-center justify-center rounded-full bg-gray-100 text-gray-500 hover:bg-gray-200 hover:text-gray-900 transition-colors cursor-pointer z-20 shadow-2xs active:scale-95"
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

        {/* News Banner Image (hanya tampil jika memang diupload oleh pengguna) */}
        {Boolean((item as any).isUserUploadedImage || (item.imageUrl && item.imageUrl.startsWith('data:image/'))) && item.imageUrl && (
          <div className="w-full max-h-60 sm:max-h-72 rounded-xl overflow-hidden shadow-2xs border border-gray-200 bg-gray-50">
            <img
              src={item.imageUrl}
              alt={title}
              className="w-full h-full object-cover"
              onError={(e: any) => { (e.target as HTMLElement).style.display = 'none'; }}
            />
          </div>
        )}

        {/* Modal Headline Title */}
        <h3 
          onClick={() => {
            if (hasExternalUrl && primaryUrl) {
              window.open(primaryUrl, '_blank', 'noopener,noreferrer');
            }
          }}
          className={`font-orbitron font-bold text-base sm:text-lg uppercase tracking-wide text-gray-900 leading-snug ${
            hasExternalUrl ? 'hover:text-blue-600 transition-colors cursor-pointer' : 'cursor-default'
          }`}
        >
          {title}
        </h3>

        {/* Full Article Content or Summary (Ukuran font persis sama dengan deskripsi item kuliner: text-[11px] font-jakarta leading-relaxed) */}
        {descriptionText && (
          <div className={`font-jakarta text-[11px] leading-relaxed whitespace-pre-line ${
            !hasExternalUrl 
              ? 'bg-slate-50/90 p-4 rounded-xl border border-slate-200/80 text-gray-700 shadow-2xs' 
              : 'text-gray-600'
          }`}>
            {descriptionText}
          </div>
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
                    <p className="text-[11px] font-jakarta font-medium text-slate-800 hover:text-blue-600 leading-snug">
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
          {/* Primary Action: Direct Link to Original News (Only shown if external link exists) */}
          {hasExternalUrl && primaryUrl && (
            <button
              onClick={() => window.open(primaryUrl, '_blank', 'noopener,noreferrer')}
              className="w-full bg-gradient-to-r from-neutral-900 via-neutral-800 to-neutral-950 hover:from-neutral-800 hover:to-neutral-900 text-white py-3 rounded-xl font-bold text-xs transition-colors cursor-pointer flex justify-center items-center gap-2 shadow-xs border border-neutral-700/70"
            >
              <span>{isEn ? `Read Full Story on ${publisherName}` : `Buka Berita Lengkap di ${publisherName}`}</span>
              <ExternalLink className="w-4 h-4 text-gray-300" />
            </button>
          )}

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
            {/* Tombol Bagikan (Warna Biru Kontras yang Elegan) */}
            <button
              onClick={handleShare}
              className="w-full bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white py-2.5 rounded-xl font-bold text-xs transition-all cursor-pointer flex justify-center items-center gap-2 shadow-xs border border-blue-600"
            >
              <Share2 className="w-3.5 h-3.5 text-white" />
              <span>{isEn ? 'Share' : 'Bagikan'}</span>
            </button>

            {/* Tombol Tutup (Warna Hitam Solid Sesuai Permintaan) */}
            <button
              onClick={onClose}
              className="w-full bg-black hover:bg-neutral-800 active:bg-neutral-900 text-white py-2.5 rounded-xl font-bold text-xs transition-all cursor-pointer flex justify-center items-center gap-2 shadow-xs border border-black"
            >
              <X className="w-3.5 h-3.5 text-white" />
              <span>{isEn ? 'Close' : 'Tutup'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

