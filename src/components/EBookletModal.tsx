import React, { useState } from 'react';
import { X, MapPin, Check, BookOpen, Download, Printer } from 'lucide-react';
import { Destination, CultureItem, CulinaryItem, EventItem } from '../types';
import { DESTINATIONS, CULTURE_ITEMS, CULINARY_ITEMS, EVENTS_SCHEDULE, BG_IMAGE_2, getDirectDriveUrl } from '../data/content';

interface EBookletModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang?: 'id' | 'en';
  dataStore?: any;
}

export const EBookletModal: React.FC<EBookletModalProps> = ({
  isOpen,
  onClose,
  lang = 'id',
  dataStore = {}
}) => {
  const isEn = lang === 'en';
  const [activeTab, setActiveTab] = useState<'all' | 'destinations' | 'culture' | 'culinary' | 'events'>('all');

  if (!isOpen) return null;

  const destinations: Destination[] = (dataStore.destinations && dataStore.destinations.length > 0) ? dataStore.destinations : DESTINATIONS;
  const cultureItems: CultureItem[] = (dataStore.cultureItems && dataStore.cultureItems.length > 0) ? dataStore.cultureItems : CULTURE_ITEMS;
  const culinaryItems: CulinaryItem[] = (dataStore.culinaryItems && dataStore.culinaryItems.length > 0) ? dataStore.culinaryItems : CULINARY_ITEMS;
  const eventItems: EventItem[] = (dataStore.eventItems && dataStore.eventItems.length > 0) ? dataStore.eventItems : EVENTS_SCHEDULE;

  const coverImage = (dataStore?.appSettings?.revealImage && dataStore.appSettings.revealImage.trim())
    ? getDirectDriveUrl(dataStore.appSettings.revealImage)
    : (dataStore?.appSettings?.baseImage && dataStore.appSettings.baseImage.trim())
      ? getDirectDriveUrl(dataStore.appSettings.baseImage)
      : BG_IMAGE_2;

  // Compress Unsplash images to WebP for fast performance
  const imgSrc = (url: string, w = 600) => {
    if (!url) return url;
    if (url.includes('unsplash.com')) {
      const base = url.split('?')[0];
      return `${base}?auto=format&fit=crop&w=${w}&q=75&fm=webp`;
    }
    return url;
  };

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = `/downloads/malala-panduan-wisata-sumbar-2026.pdf?v=${Date.now()}`;
    link.download = 'MALALA-Panduan-Wisata-Sumatera-Barat-2026.pdf';
    link.target = '_blank';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div id="ebooklet-print-container" className="fixed inset-0 z-[200] bg-black/95 backdrop-blur-md flex flex-col items-center justify-start overflow-y-auto print:p-0 print:bg-white print:static">
      {/* Floating Action Controls (Top-Right) */}
      <div className="fixed top-3 right-3 sm:top-5 sm:right-5 z-[230] flex items-center gap-2 print:hidden">
        {/* Real-time Live PDF Save / Print Button (Primary) */}
        <button
          onClick={handlePrint}
          className="h-10 px-4 rounded-full bg-red-600 hover:bg-red-700 text-white flex items-center gap-1.5 transition-all hover:scale-105 shadow-2xl cursor-pointer text-xs font-jakarta font-bold uppercase tracking-wider"
          title={isEn ? 'Save / Print Live PDF (100% Real-Time)' : 'Simpan / Cetak PDF Live (100% Real-Time)'}
        >
          <Printer className="w-4 h-4 text-white" />
          <span>{isEn ? 'Save Live PDF' : 'Simpan PDF Live'}</span>
        </button>

        {/* Download Static File (Secondary) */}
        <button
          onClick={handleDownload}
          className="h-10 px-3.5 rounded-full bg-slate-800 hover:bg-slate-700 text-white flex items-center gap-1.5 transition-all hover:scale-105 shadow-2xl cursor-pointer text-xs font-jakarta font-bold uppercase tracking-wider border border-slate-600"
          title={isEn ? 'Direct File Download' : 'Unduh File Offline'}
        >
          <Download className="w-4 h-4 text-gray-300" />
          <span className="hidden sm:inline">{isEn ? 'Direct File' : 'File Offline'}</span>
        </button>

        {/* Minimalist Close Button */}
        <button
          onClick={onClose}
          className="w-10 h-10 rounded-full bg-black/70 hover:bg-black/90 text-white/80 hover:text-white backdrop-blur-md border border-white/20 flex items-center justify-center transition-all hover:scale-110 shadow-2xl cursor-pointer"
          title={isEn ? 'Close' : 'Tutup'}
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Book Content Pages Container — Half Width (~460px) & Natural Auto Height */}
      <main className="w-full max-w-[460px] mx-auto px-3 pt-4 pb-16 space-y-4 print:space-y-0 print:max-w-full print:px-0 print:pt-0 print:pb-0">
        
        {/* Clean Chapter Selector at the top (5-grid, NO slider / scrollbar) */}
        <nav className="w-full bg-slate-900/90 backdrop-blur-md border border-slate-800 rounded-xl p-1.5 grid grid-cols-5 gap-1 shadow-lg print:hidden">
          {[
            { key: 'all', label: isEn ? 'Semua' : 'Semua' },
            { key: 'destinations', label: isEn ? 'Destinasi' : 'Destinasi' },
            { key: 'culture', label: isEn ? 'Budaya' : 'Budaya' },
            { key: 'culinary', label: isEn ? 'Kuliner' : 'Kuliner' },
            { key: 'events', label: isEn ? 'Event' : 'Event' },
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key as any)}
              className={`py-1.5 px-1 rounded-lg font-jakarta font-bold text-[10px] sm:text-[11px] uppercase transition-all cursor-pointer text-center truncate ${
                activeTab === tab.key
                  ? 'bg-red-600 text-white shadow-sm'
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>
        
        {/* ============================================================== */}
        {/* COVER PAGE (PAGE 1) - PURE HERO IMAGE & CLEAN MINIMALIST TEXT  */}
        {/* ============================================================== */}
        {(activeTab === 'all') && (
          <article 
            className="w-full text-white rounded-2xl overflow-hidden shadow-2xl relative min-h-[580px] sm:min-h-[620px] flex flex-col justify-between p-6 sm:p-7 print:rounded-none print:shadow-none print:break-after-page print:border-0"
          >
            {/* Pure Hero Background image without gradient overlay */}
            <img
              src={imgSrc(coverImage)}
              alt="Cover E-Booklet Sumatera Barat"
              className="absolute inset-0 w-full h-full object-cover"
              loading="eager"
            />

            {/* Top Area: Badge & Title directly below it */}
            <div className="relative z-10 space-y-4">
              <div className="flex items-center justify-between">
                <span className="inline-block bg-red-600 text-white font-jakarta font-extrabold text-[9px] uppercase px-2.5 py-1 rounded tracking-widest shadow-md">
                  {isEn ? 'OFFICIAL PUBLICATION 2026' : 'PUBLIKASI RESMI 2026'}
                </span>
                <div className="flex items-center gap-1.5 text-white font-jakarta text-[10px] font-bold drop-shadow-[0_1px_3px_rgba(0,0,0,0.9)]">
                  <BookOpen className="w-3.5 h-3.5 text-red-400" />
                  <span>MALALA.MY.ID</span>
                </div>
              </div>

              {/* Title and White Subtitle positioned right below the badge */}
              <div className="space-y-1 pt-1">
                <h1 className="font-orbitron font-extrabold text-3xl sm:text-4xl text-white tracking-wide drop-shadow-[0_2px_10px_rgba(0,0,0,0.9)] leading-tight">
                  MALALA<br/>2026
                </h1>
                <p className="font-orbitron font-bold text-xs sm:text-sm text-white drop-shadow-[0_1px_6px_rgba(0,0,0,0.9)] tracking-wide">
                  {isEn ? 'WEST SUMATRA TRAVEL & CULTURAL GUIDE' : 'PANDUAN LENGKAP PARIWISATA & BUDAYA RANAH MINANG'}
                </p>
              </div>
            </div>

            {/* Bottom: Description & Footer */}
            <div className="relative z-10 mt-auto space-y-2 pt-16">
              <p className="font-jakarta text-white drop-shadow-[0_1px_5px_rgba(0,0,0,0.9)] text-xs leading-relaxed max-w-sm pt-0.5">
                {isEn
                  ? `${destinations.length} Destinations · ${cultureItems.length} Culture · ${culinaryItems.length} Culinary · ${eventItems.length} Events`
                  : `${destinations.length} Destinasi · ${cultureItems.length} Budaya · ${culinaryItems.length} Kuliner · ${eventItems.length} Event`}
              </p>

              {/* Divider + Footer */}
              <div className="pt-3 border-t border-white/50 flex items-center justify-between text-[10px] text-white font-jakarta drop-shadow-[0_1px_4px_rgba(0,0,0,0.9)]">
                <span>Dinas Pariwisata Sumatera Barat</span>
                <span className="font-bold text-white">E-Booklet Digital</span>
              </div>
            </div>
          </article>
        )}

        {/* ============================================================== */}
        {/* BAB I: 26 DESTINASI WISATA (NATURAL ADAPTIVE HEIGHT)           */}
        {/* ============================================================== */}
        {(activeTab === 'all' || activeTab === 'destinations') && destinations.map((dest, idx) => {
          const title = isEn && dest.titleEn ? dest.titleEn : dest.title;
          const category = isEn && dest.categoryEn ? dest.categoryEn : dest.category;
          const location = isEn && dest.locationDetailsEn ? dest.locationDetailsEn : (dest.locationDetails || dest.regency);
          const desc = isEn && dest.descriptionEn ? dest.descriptionEn : dest.description;
          const highlights = (isEn && dest.highlightsEn ? dest.highlightsEn : dest.highlights) || [];
          const bestTime = isEn && dest.bestTimeEn ? dest.bestTimeEn : dest.bestTime;

          return (
            <article key={dest.id || idx} className="w-full bg-white text-slate-900 rounded-2xl overflow-hidden shadow-xl border border-gray-200 p-4 sm:p-5 space-y-3.5 print:shadow-none print:border-0 print:p-4 print:break-after-page flex flex-col justify-between">
              <div>
                {/* Header info */}
                <div className="flex items-center justify-between pb-2.5 border-b border-gray-100 text-[11px] font-jakarta font-bold text-gray-500">
                  <span>MALALA 2026 • {dest.regency || 'SUMATERA BARAT'}</span>
                  <span className="text-red-600 uppercase font-extrabold">{category}</span>
                </div>

                {/* Hero Image */}
                <div className="h-44 sm:h-52 w-full rounded-xl overflow-hidden mt-3 relative bg-slate-900 shadow-sm">
                  <img
                    src={imgSrc(dest.imageUrl)}
                    alt={title}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                  <div className="absolute bottom-3 left-3 text-white">
                    <span className="bg-white text-black font-jakarta font-extrabold text-[9px] uppercase px-2 py-0.5 rounded shadow">
                      {category}
                    </span>
                    <h3 className="font-orbitron font-extrabold text-base sm:text-lg text-white pt-1 drop-shadow-md leading-tight">
                      {title}
                    </h3>
                  </div>
                </div>

                {/* Location */}
                <div className="pt-2.5 flex items-center gap-1.5 text-xs font-bold text-red-600 font-jakarta">
                  <MapPin className="w-3.5 h-3.5 shrink-0" />
                  <span>{location}</span>
                </div>

                {/* Full Description — Natural dynamic length */}
                <div className="font-jakarta text-xs text-gray-700 leading-relaxed pt-2 space-y-2">
                  {desc.split('\n\n').map((p, pIdx) => (
                    <p key={pIdx}>{p}</p>
                  ))}
                </div>

                {/* Highlights */}
                {highlights.length > 0 && (
                  <div className="mt-3 p-3 bg-gray-50 rounded-xl border border-gray-200 font-jakarta">
                    <h4 className="font-bold text-[10px] uppercase text-slate-900 tracking-wider mb-1.5">
                      {isEn ? 'Key Highlights:' : 'Daya Tarik Utama:'}
                    </h4>
                    <ul className="space-y-1 text-xs text-gray-700">
                      {highlights.map((h, hIdx) => (
                        <li key={hIdx} className="flex items-center gap-1.5">
                          <Check className="w-3.5 h-3.5 text-green-600 shrink-0 font-bold" />
                          <span>{h}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* Best Time Footer */}
              {bestTime && (
                <div className="pt-2.5 border-t border-gray-100 flex items-center justify-between text-[10px] font-jakarta text-gray-500">
                  <span>{isEn ? 'Best Time:' : 'Waktu Terbaik:'} <strong className="text-black">{bestTime}</strong></span>
                  <span className="text-gray-400">#{idx + 1}</span>
                </div>
              )}
            </article>
          );
        })}

        {/* ============================================================== */}
        {/* BAB II: 14 WARISAN BUDAYA (NATURAL ADAPTIVE HEIGHT)             */}
        {/* ============================================================== */}
        {(activeTab === 'all' || activeTab === 'culture') && cultureItems.map((cult, idx) => {
          const title = isEn && cult.titleEn ? cult.titleEn : cult.title;
          const category = isEn && cult.categoryEn ? cult.categoryEn : cult.category;
          const origin = isEn && cult.originEn ? cult.originEn : cult.origin;
          const desc = isEn && cult.descriptionEn ? cult.descriptionEn : cult.description;
          const philosophy = isEn && cult.philosophyEn ? cult.philosophyEn : cult.philosophy;

          return (
            <article key={cult.id || idx} className="w-full bg-white text-slate-900 rounded-2xl overflow-hidden shadow-xl border border-amber-200 p-4 sm:p-5 space-y-3.5 print:shadow-none print:border-0 print:p-4 print:break-after-page flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between pb-2.5 border-b border-gray-100 text-[11px] font-jakarta font-bold text-gray-500">
                  <span>MALALA 2026 • WARISAN BUDAYA</span>
                  <span className="text-amber-700 uppercase font-extrabold">{category}</span>
                </div>

                <div className="h-44 sm:h-52 w-full rounded-xl overflow-hidden mt-3 relative bg-amber-950 shadow-sm">
                  <img
                    src={imgSrc(cult.imageUrl)}
                    alt={title}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                  <div className="absolute bottom-3 left-3 text-white">
                    <span className="bg-amber-600 text-white font-jakarta font-extrabold text-[9px] uppercase px-2 py-0.5 rounded shadow">
                      {category}
                    </span>
                    <h3 className="font-orbitron font-extrabold text-base sm:text-lg text-white pt-1 drop-shadow-md leading-tight">
                      {title}
                    </h3>
                  </div>
                </div>

                <div className="pt-2.5 flex items-center gap-1.5 text-xs font-bold text-amber-700 font-jakarta">
                  <MapPin className="w-3.5 h-3.5 shrink-0" />
                  <span>{isEn ? 'Origin:' : 'Asal Nagari / Tradisi:'} {origin}</span>
                </div>

                <div className="font-jakarta text-xs text-gray-700 leading-relaxed pt-2 space-y-2">
                  {desc.split('\n\n').map((p, pIdx) => (
                    <p key={pIdx}>{p}</p>
                  ))}
                </div>

                {philosophy && (
                  <div className="mt-3 p-3 bg-amber-50 rounded-xl border border-amber-200 font-jakarta">
                    <h4 className="font-bold text-[10px] uppercase text-amber-900 tracking-wider mb-1">
                      {isEn ? 'Customary Philosophy:' : 'Falsafah & Makna Adat:'}
                    </h4>
                    <p className="italic font-bold text-amber-900 text-xs leading-snug">
                      "{philosophy}"
                    </p>
                  </div>
                )}
              </div>

              <div className="pt-2.5 border-t border-gray-100 flex items-center justify-between text-[10px] font-jakarta text-gray-500">
                <span>Dinas Kebudayaan Sumatera Barat</span>
                <span className="text-gray-400">#{destinations.length + idx + 1}</span>
              </div>
            </article>
          );
        })}

        {/* ============================================================== */}
        {/* BAB III: 16 KULINER OTENTIK (NATURAL ADAPTIVE HEIGHT)           */}
        {/* ============================================================== */}
        {(activeTab === 'all' || activeTab === 'culinary') && culinaryItems.map((cul, idx) => {
          const title = isEn && cul.titleEn ? cul.titleEn : cul.title;
          const category = isEn && cul.categoryEn ? cul.categoryEn : cul.category;
          const origin = isEn && cul.originEn ? cul.originEn : cul.origin;
          const desc = isEn && cul.descriptionEn ? cul.descriptionEn : cul.description;
          const ingredients = (isEn && cul.mainIngredientsEn ? cul.mainIngredientsEn : cul.mainIngredients) || [];
          const taste = isEn && cul.tasteProfileEn ? cul.tasteProfileEn : cul.tasteProfile;

          return (
            <article key={cul.id || idx} className="w-full bg-white text-slate-900 rounded-2xl overflow-hidden shadow-xl border border-rose-200 p-4 sm:p-5 space-y-3.5 print:shadow-none print:border-0 print:p-4 print:break-after-page flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between pb-2.5 border-b border-gray-100 text-[11px] font-jakarta font-bold text-gray-500">
                  <span>MALALA 2026 • GASTRONOMI OTENTIK</span>
                  <span className="text-rose-600 uppercase font-extrabold">{category}</span>
                </div>

                <div className="h-44 sm:h-52 w-full rounded-xl overflow-hidden mt-3 relative bg-rose-950 shadow-sm">
                  <img
                    src={imgSrc(cul.imageUrl)}
                    alt={title}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                  <div className="absolute bottom-3 left-3 text-white">
                    <span className="bg-rose-600 text-white font-jakarta font-extrabold text-[9px] uppercase px-2 py-0.5 rounded shadow">
                      {category}
                    </span>
                    <h3 className="font-orbitron font-extrabold text-base sm:text-lg text-white pt-1 drop-shadow-md leading-tight">
                      {title}
                    </h3>
                  </div>
                </div>

                <div className="pt-2.5 flex items-center gap-1.5 text-xs font-bold text-rose-600 font-jakarta">
                  <MapPin className="w-3.5 h-3.5 shrink-0" />
                  <span>{isEn ? 'Origin:' : 'Asal Kuliner:'} {origin}</span>
                </div>

                <div className="font-jakarta text-xs text-gray-700 leading-relaxed pt-2 space-y-2">
                  {desc.split('\n\n').map((p, pIdx) => (
                    <p key={pIdx}>{p}</p>
                  ))}
                </div>

                {/* Ingredients & Taste */}
                <div className="mt-3 p-3 bg-rose-50 rounded-xl border border-rose-200 font-jakarta space-y-1">
                  <h4 className="font-bold text-[10px] uppercase text-rose-900 tracking-wider">
                    {isEn ? '🥘 Key Ingredients:' : '🥘 Bahan & Rempah Utama:'}
                  </h4>
                  <p className="text-xs text-gray-700 font-medium">
                    {ingredients.join(', ')}
                  </p>
                  {taste && (
                    <p className="text-xs text-rose-800 font-bold pt-0.5">
                      👅 {taste}
                    </p>
                  )}
                </div>
              </div>

              <div className="pt-2.5 border-t border-gray-100 flex items-center justify-between text-[10px] font-jakarta text-gray-500">
                <span>Warisan Kuliner Ranah Minang</span>
                <span className="text-gray-400">#{destinations.length + cultureItems.length + idx + 1}</span>
              </div>
            </article>
          );
        })}

        {/* ============================================================== */}
        {/* BAB IV: 20 KALENDER EVENT & KEN (NATURAL ADAPTIVE HEIGHT)       */}
        {/* ============================================================== */}
        {(activeTab === 'all' || activeTab === 'events') && eventItems.map((ev, idx) => {
          const title = isEn && ev.titleEn ? ev.titleEn : ev.title;
          const schedule = isEn && ev.scheduleEn ? ev.scheduleEn : ev.schedule;
          const location = isEn && ev.locationEn ? ev.locationEn : ev.location;
          const desc = isEn && ev.descriptionEn ? ev.descriptionEn : ev.description;

          return (
            <article key={ev.id || idx} className="w-full bg-white text-slate-900 rounded-2xl overflow-hidden shadow-xl border border-gray-200 p-4 sm:p-5 space-y-3.5 print:shadow-none print:border-0 print:p-4 print:break-after-page flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between pb-2.5 border-b border-gray-100 text-[11px] font-jakarta font-bold text-gray-500">
                  <span>MALALA 2026 • CALENDAR OF EVENTS</span>
                  <span className={`uppercase font-extrabold ${ev.isKen ? 'text-red-600' : 'text-slate-800'}`}>
                    {ev.isKen ? '⭐ KEN 2026' : 'FESTIVAL'}
                  </span>
                </div>

                <div className="h-44 sm:h-52 w-full rounded-xl overflow-hidden mt-3 relative bg-slate-900 shadow-sm">
                  <img
                    src={imgSrc(ev.imageUrl)}
                    alt={title}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                  <div className="absolute bottom-3 left-3 text-white">
                    <span className={`font-jakarta font-extrabold text-[9px] uppercase px-2 py-0.5 rounded shadow ${ev.isKen ? 'bg-red-600 text-white' : 'bg-white text-black'}`}>
                      {ev.isKen ? '⭐ KEN 2026' : 'COE 2026'}
                    </span>
                    <h3 className="font-orbitron font-extrabold text-base sm:text-lg text-white pt-1 drop-shadow-md leading-tight">
                      {title}
                    </h3>
                  </div>
                </div>

                <div className="pt-2.5 flex items-center justify-between text-xs font-bold text-slate-800 font-jakarta flex-wrap gap-1">
                  <span className="text-red-600 font-bold">📅 {schedule}</span>
                  <span className="text-gray-600">📍 {location}</span>
                </div>

                <div className="font-jakarta text-xs text-gray-700 leading-relaxed pt-2 space-y-2">
                  {desc.split('\n\n').map((p, pIdx) => (
                    <p key={pIdx}>{p}</p>
                  ))}
                </div>

                {ev.isKen && (
                  <div className="mt-3 p-3 bg-red-50 rounded-xl border border-red-200 font-jakarta">
                    <h4 className="font-bold text-[10px] uppercase text-red-700 tracking-wider">
                      ⭐ Karisma Event Nusantara (KEN)
                    </h4>
                    <p className="text-xs text-red-900 pt-0.5 leading-snug">
                      Event resmi kalender pariwisata nasional Kemenparekraf RI.
                    </p>
                  </div>
                )}
              </div>

              <div className="pt-2.5 border-t border-gray-100 flex items-center justify-between text-[10px] font-jakarta text-gray-500">
                <span>Dinas Pariwisata Sumatera Barat</span>
                <span className="text-gray-400">#{destinations.length + cultureItems.length + culinaryItems.length + idx + 1}</span>
              </div>
            </article>
          );
        })}

      </main>
    </div>
  );
};
