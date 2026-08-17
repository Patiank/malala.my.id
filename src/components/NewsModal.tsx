import React from 'react';
import { X, MapPin, Share2, Calendar, Check, Info, Flame, ExternalLink } from 'lucide-react';
import { HotInfoItem } from '../types';
import { Language } from '../lib/translations';
import { getNewsDisplayTitle } from '../utils/ai';

interface NewsModalProps {
  item: HotInfoItem | null;
  onClose: () => void;
  lang: Language;
}

export const NewsModal: React.FC<NewsModalProps> = ({ item, onClose, lang }) => {
  if (!item) return null;

  const isEn = lang === 'en';
  const title = getNewsDisplayTitle(item, lang);
  const description = isEn && item.descriptionEn ? item.descriptionEn : item.description;
  const category = isEn && item.categoryEn ? item.categoryEn : item.category;
  const tag = isEn && item.tagEn ? item.tagEn : item.tag;
  const date = isEn && item.dateEn ? item.dateEn : item.date;
  const highlights = isEn && item.highlightsEn ? item.highlightsEn : item.highlights;
  const rawLocation = isEn && item.locationNameEn ? item.locationNameEn : item.locationName;
  const locationName = (rawLocation || '')
    .replace(/Liputan\s*(Resmi\s*)?Terverifikasi\s*(\([^)]*\))?/gi, '')
    .replace(/Verified\s*Report\s*(\([^)]*\))?/gi, '')
    .trim();

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title,
        text: description,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(`${title}\n${description}\n${window.location.href}`);
      alert(isEn ? 'News link copied to clipboard!' : 'Tautan berita berhasil disalin!');
    }
  };

  return (
    <div 
      className="fixed inset-0 z-[150] bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-fadeIn"
      onClick={onClose}
    >
      <div 
        className="bg-white max-w-lg w-full rounded-xl overflow-hidden shadow-2xl border border-gray-200 animate-scale-up space-y-4 p-6 relative max-h-[90vh] overflow-y-auto font-jakarta"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1 rounded-full bg-black/60 text-white hover:bg-black transition-colors cursor-pointer z-20"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header Image */}
        {item.imageUrl && (
          <div className="-mx-6 -mt-6 mb-4 h-48 overflow-hidden bg-gray-100 relative">
            <img
              src={item.imageUrl}
              alt={title}
              className="w-full h-full object-cover"
              onError={(e) => {
                (e.target as HTMLElement).style.display = 'none';
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            
            <div className="absolute bottom-3 left-4 right-12 text-white space-y-1">
              <div className="flex flex-wrap items-center gap-1.5">
                <span className="bg-white text-black font-jakarta font-bold text-[9px] uppercase px-2 py-0.5 rounded tracking-wider shadow-xs">
                  {category}
                </span>
                {tag && (
                  <span className="bg-red-600 text-white font-jakarta font-bold text-[9px] uppercase px-2 py-0.5 rounded shadow-xs tracking-wider flex items-center gap-1">
                    <Flame className="w-3 h-3 fill-current text-yellow-300" />
                    {tag}
                  </span>
                )}
              </div>
              <h3 className="font-orbitron font-bold text-base uppercase text-white pt-1 drop-shadow-xs leading-snug">
                {title}
              </h3>
            </div>
          </div>
        )}

        {/* Title if no image */}
        {!item.imageUrl && (
          <div className="pt-2">
            <div className="flex flex-wrap items-center gap-1.5 mb-2">
              <span className="bg-black text-white font-jakarta font-bold text-[9px] uppercase px-2 py-0.5 rounded tracking-wider">
                {category}
              </span>
              {tag && (
                <span className="bg-red-600 text-white font-jakarta font-bold text-[9px] uppercase px-2 py-0.5 rounded tracking-wider flex items-center gap-1">
                  <Flame className="w-3 h-3 fill-current text-yellow-300" />
                  {tag}
                </span>
              )}
            </div>
            <h3 className="font-orbitron font-bold text-base uppercase text-black tracking-wide leading-snug">
              {title}
            </h3>
          </div>
        )}

        {/* Meta Info (Date & Location) */}
        <div className="flex flex-wrap items-center justify-between text-xs font-jakarta text-gray-500 gap-2 pb-2 border-b border-gray-100 uppercase tracking-wider font-semibold">
          <div className="flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5 text-black shrink-0" />
            <span>{date}</span>
          </div>
          {locationName && (
            <div className="flex items-center gap-1.5 text-gray-600">
              <MapPin className="w-3.5 h-3.5 text-black shrink-0" />
              <span>{locationName}</span>
            </div>
          )}
        </div>

        {/* Detailed News Description */}
        <div className="font-jakarta text-xs text-gray-700 leading-relaxed pt-1 space-y-3">
          {description.split('\n\n').map((paragraph: string, idx: number) => (
            <p key={idx}>{paragraph}</p>
          ))}
        </div>

        {/* Highlights / Key Points Box */}
        {highlights && highlights.length > 0 && (
          <div className="space-y-2 bg-gray-50 p-3.5 rounded-lg border border-gray-100">
            <h4 className="font-jakarta font-bold text-xs uppercase text-black tracking-wider flex items-center gap-1.5">
              <Check className="w-4 h-4 text-black shrink-0" />
              {isEn ? 'Key Information & Tourism Highlights' : 'Poin Penting & Daya Tarik Wisata'}
            </h4>
            <ul className="space-y-1.5 text-xs font-jakarta text-gray-700">
              {highlights.map((h, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-black mt-1.5 shrink-0" />
                  <span>
                    {h
                      .replace(/Liputan\s*(terverifikasi|kredibel)\s*[^,]*(,\s*|\s*&\s*)?/gi, 'Informasi aktual ')
                      .replace(/Credible,\s*verified\s*coverage\s*from\s*[^,]*(,\s*)?/gi, 'Latest updates ')
                      .trim()}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Useful Travel Tips Box */}
        {tips && (
          <div className="space-y-1 bg-blue-50/80 p-3 rounded-lg border border-blue-100 text-xs font-jakarta">
            <h4 className="font-bold uppercase text-blue-900 tracking-wider flex items-center gap-1.5">
              <Info className="w-4 h-4 text-blue-700 shrink-0" />
              {isEn ? 'Travel Tip for Visitors' : 'Rekomendasi / Tips Wisatawan'}
            </h4>
            <p className="text-blue-800 leading-relaxed">
              {tips}
            </p>
          </div>
        )}

        {/* Action Buttons */}
        <div className="space-y-2 pt-2 border-t border-gray-100">
          {item.actionUrl && (
            <a
              href={item.actionUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full bg-blue-600 text-white py-2.5 rounded-lg font-jakarta font-bold uppercase text-xs hover:bg-blue-700 transition-colors cursor-pointer flex justify-center items-center gap-2 shadow-xs"
            >
              <MapPin className="w-4 h-4 text-white" />
              <span>{isEn ? 'Open Location on Google Maps' : 'Buka Lokasi di Google Maps'}</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          )}

          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={handleShare}
              className="w-full bg-gray-100 text-gray-800 border border-gray-200 py-2.5 rounded-lg font-jakarta font-bold uppercase text-xs hover:bg-gray-200 transition-colors cursor-pointer flex justify-center items-center gap-2"
            >
              <Share2 className="w-4 h-4 text-gray-600" />
              <span>{isEn ? 'Share' : 'Bagikan'}</span>
            </button>

            <button
              onClick={onClose}
              className="w-full bg-black text-white py-2.5 rounded-lg font-jakarta font-bold uppercase text-xs hover:bg-gray-800 transition-colors cursor-pointer"
            >
              {isEn ? 'Close' : 'Tutup'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

