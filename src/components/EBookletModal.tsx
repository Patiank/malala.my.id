import React, { useState } from 'react';
import { X, MapPin, Check } from 'lucide-react';
import { Destination, CultureItem, CulinaryItem, EventItem } from '../types';
import { DESTINATIONS, CULTURE_ITEMS, CULINARY_ITEMS, EVENTS_SCHEDULE, BG_IMAGE_2 } from '../data/content';

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

  // Compress Unsplash images to tiny WebP thumbnails for fast loading
  const imgSrc = (url: string, w = 400) => {
    if (!url) return url;
    if (url.includes('unsplash.com')) {
      const base = url.split('?')[0];
      return `${base}?auto=format&fit=crop&w=${w}&q=60&fm=webp`;
    }
    return url;
  };

  return (
    <div className="fixed inset-0 z-[200] bg-black/95 backdrop-blur-md flex flex-col items-center justify-start overflow-y-auto print:p-0 print:bg-white print:static">
      {/* Floating Minimalist Close Button (Fixed Top-Right) */}
      <button
        onClick={onClose}
        className="fixed top-4 right-4 sm:top-6 sm:right-6 z-[230] w-10 h-10 rounded-full bg-black/70 hover:bg-black/90 text-white/80 hover:text-white backdrop-blur-md border border-white/20 flex items-center justify-center transition-all hover:scale-110 shadow-2xl cursor-pointer print:hidden"
        title={isEn ? 'Close' : 'Tutup'}
        aria-label="Close"
      >
        <X className="w-5 h-5" />
      </button>

      {/* Book Content Pages Container — Portrait phone-screen scroll */}
      <main className="w-full max-w-[390px] mx-auto px-3 pt-4 pb-16 space-y-4 print:space-y-0 print:max-w-full print:px-0 print:pt-0 print:pb-0">
        
        {/* Clean Chapter Selector at the top (Scrolls away naturally, zero overlay on book) */}
        <nav className="w-full bg-slate-900/80 backdrop-blur-sm border border-slate-800 rounded-xl p-1.5 flex items-center justify-between gap-1 overflow-x-auto print:hidden shadow-lg">
          {[
            { key: 'all', label: isEn ? '📖 Semua' : '📖 Semua' },
            { key: 'destinations', label: isEn ? `🏔️ Destinasi` : `🏔️ Destinasi` },
            { key: 'culture', label: isEn ? `🏛️ Budaya` : `🏛️ Budaya` },
            { key: 'culinary', label: isEn ? `🍲 Kuliner` : `🍲 Kuliner` },
            { key: 'events', label: isEn ? `📅 Event` : `📅 Event` },
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key as any)}
              className={`flex-1 px-2 py-1.5 rounded-lg font-jakarta font-bold text-[10px] uppercase transition-all cursor-pointer whitespace-nowrap text-center ${
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
        {/* COVER PAGE (PAGE 1) - HERO IMAGE BACKGROUND & MINIMALIST CLEAN */}
        {/* ============================================================== */}
        {(activeTab === 'all') && (
          <article 
            className="w-full text-white rounded-2xl overflow-hidden shadow-2xl relative flex flex-col justify-between print:rounded-none print:shadow-none print:break-after-page print:border-0 print:aspect-auto"
            style={{ aspectRatio: '2/3' }}
          >
            {/* Background image as real <img> tag so it prints correctly */}
            <img
              src={BG_IMAGE_2}
              alt="Cover E-Booklet Sumatera Barat"
              className="absolute inset-0 w-full h-full object-cover"
              loading="eager"
            />
            {/* Subtle bottom gradient only for footer text legibility */}
            <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-black/70 to-transparent pointer-events-none" />

            {/* Top badge row */}
            <div className="relative z-10 p-5 pt-6">
              <span className="inline-block bg-red-600 text-white font-jakarta font-extrabold text-[10px] uppercase px-2.5 py-1 rounded tracking-widest shadow-md">
                {isEn ? 'OFFICIAL PUBLICATION 2026' : 'PUBLIKASI RESMI 2026'}
              </span>
            </div>

            {/* Center: Title block — floated to bottom third like hero section */}
            <div className="relative z-10 px-5 pb-6 mt-auto space-y-2">
              <h1 className="font-orbitron font-extrabold text-3xl text-white tracking-wide drop-shadow-lg leading-tight">
                MALALA<br/>2026
              </h1>
              <p className="font-orbitron font-semibold text-sm text-red-300 drop-shadow-md tracking-wide">
                {isEn ? 'WEST SUMATRA TRAVEL & CULTURAL GUIDE' : 'PANDUAN WISATA & BUDAYA RANAH MINANG'}
              </p>
              <p className="font-jakarta text-white/80 text-[11px] leading-relaxed max-w-[280px]">
                {isEn
                  ? `${destinations.length} Destinations · ${cultureItems.length} Culture · ${culinaryItems.length} Culinary · ${eventItems.length} Events`
                  : `${destinations.length} Destinasi · ${cultureItems.length} Budaya · ${culinaryItems.length} Kuliner · ${eventItems.length} Event`}
              </p>

              {/* Divider + Footer */}
              <div className="pt-3 border-t border-white/20 flex items-center justify-between text-[10px] text-white/60 font-jakarta">
                <span>Dinas Pariwisata Sumatera Barat</span>
                <span className="font-bold text-white/80">malala.my.id</span>
              </div>
            </div>
          </article>
        )}

        {/* ============================================================== */}
        {/* BAB I: 26 DESTINASI WISATA (1 HALAMAN PER ITEM)                 */}
        {/* ============================================================== */}
        {(activeTab === 'all' || activeTab === 'destinations') && destinations.map((dest, idx) => {
          const title = isEn && dest.titleEn ? dest.titleEn : dest.title;
          const category = isEn && dest.categoryEn ? dest.categoryEn : dest.category;
          const location = isEn && dest.locationDetailsEn ? dest.locationDetailsEn : (dest.locationDetails || dest.regency);
          const desc = isEn && dest.descriptionEn ? dest.descriptionEn : dest.description;
          const highlights = (isEn && dest.highlightsEn ? dest.highlightsEn : dest.highlights) || [];
          const bestTime = isEn && dest.bestTimeEn ? dest.bestTimeEn : dest.bestTime;

          return (
            <article key={dest.id || idx} className="w-full bg-white text-slate-900 rounded-2xl overflow-hidden shadow-xl border border-gray-200 p-4 flex flex-col print:shadow-none print:border-0 print:p-4 print:break-after-page print:aspect-auto print:overflow-visible" style={{ aspectRatio: '2/3' }}>
              {/* Header info */}
              <div className="flex items-center justify-between pb-3 border-b border-gray-100 text-xs font-jakarta font-bold text-gray-500 shrink-0">
                <span>MALALA 2026 • {dest.regency || 'SUMATERA BARAT'}</span>
                <span className="text-red-600 uppercase font-extrabold">{category}</span>
              </div>

              {/* Hero Image */}
              <div className="h-36 w-full rounded-xl overflow-hidden mt-3 relative bg-slate-900 shrink-0">
                <img
                  src={imgSrc(dest.imageUrl)}
                  alt={title}
                  className="w-full h-full object-cover"
                  loading="eager"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                <div className="absolute bottom-3 left-3 text-white">
                  <span className="bg-white text-black font-jakarta font-extrabold text-[10px] uppercase px-2 py-0.5 rounded shadow">
                    {category}
                  </span>
                  <h3 className="font-orbitron font-extrabold text-base text-white pt-1 drop-shadow-md leading-tight">
                    {title}
                  </h3>
                </div>
              </div>

              {/* Scrollable body */}
              <div className="flex-1 overflow-y-auto mt-3 space-y-3 print:overflow-visible">
                {/* Location */}
                <div className="flex items-center gap-1.5 text-xs font-bold text-red-600 font-jakarta">
                  <MapPin className="w-3.5 h-3.5 shrink-0" />
                  <span>{location}</span>
                </div>

                {/* Description — first paragraph only to keep page clean */}
                <div className="font-jakarta text-xs text-gray-700 leading-relaxed">
                  <p>{desc.split('\n\n')[0]}</p>
                </div>

                {/* Highlights */}
                {highlights.length > 0 && (
                  <div className="p-3 bg-gray-50 rounded-xl border border-gray-200 font-jakarta">
                    <h4 className="font-bold text-[10px] uppercase text-slate-900 tracking-wider mb-1.5">
                      {isEn ? 'Key Highlights:' : 'Daya Tarik Utama:'}
                    </h4>
                    <ul className="space-y-1 text-[11px] text-gray-700">
                      {highlights.slice(0, 3).map((h, hIdx) => (
                        <li key={hIdx} className="flex items-center gap-1.5">
                          <Check className="w-3 h-3 text-green-600 shrink-0" />
                          <span>{h}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* Best Time Footer */}
              {bestTime && (
                <div className="pt-2 mt-2 border-t border-gray-100 flex items-center justify-between text-[10px] font-jakarta text-gray-500 shrink-0">
                  <span>{isEn ? 'Best Time:' : 'Waktu Terbaik:'} <strong className="text-black">{bestTime}</strong></span>
                  <span className="text-gray-400">#{idx + 1}</span>
                </div>
              )}
            </article>
          );
        })}

        {/* ============================================================== */}
        {/* BAB II: 14 WARISAN BUDAYA (1 HALAMAN PER ITEM)                  */}
        {/* ============================================================== */}
        {(activeTab === 'all' || activeTab === 'culture') && cultureItems.map((cult, idx) => {
          const title = isEn && cult.titleEn ? cult.titleEn : cult.title;
          const category = isEn && cult.categoryEn ? cult.categoryEn : cult.category;
          const origin = isEn && cult.originEn ? cult.originEn : cult.origin;
          const desc = isEn && cult.descriptionEn ? cult.descriptionEn : cult.description;
          const philosophy = isEn && cult.philosophyEn ? cult.philosophyEn : cult.philosophy;

          return (
            <article key={cult.id || idx} className="w-full bg-white text-slate-900 rounded-2xl overflow-hidden shadow-xl border border-amber-200 p-4 flex flex-col print:shadow-none print:border-0 print:p-4 print:break-after-page print:aspect-auto print:overflow-visible" style={{ aspectRatio: '2/3' }}>
              {/* Header info */}
              <div className="flex items-center justify-between pb-3 border-b border-gray-100 text-xs font-jakarta font-bold text-gray-500 shrink-0">
                <span>MALALA 2026 • WARISAN BUDAYA</span>
                <span className="text-amber-700 uppercase font-extrabold">{category}</span>
              </div>

              {/* Hero Image */}
              <div className="h-36 w-full rounded-xl overflow-hidden mt-3 relative bg-amber-950 shrink-0">
                <img
                  src={imgSrc(cult.imageUrl)}
                  alt={title}
                  className="w-full h-full object-cover"
                  loading="eager"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                <div className="absolute bottom-3 left-3 text-white">
                  <span className="bg-amber-600 text-white font-jakarta font-extrabold text-[10px] uppercase px-2 py-0.5 rounded shadow">
                    {category}
                  </span>
                  <h3 className="font-orbitron font-extrabold text-base text-white pt-1 drop-shadow-md leading-tight">
                    {title}
                  </h3>
                </div>
              </div>

              {/* Scrollable body */}
              <div className="flex-1 overflow-y-auto mt-3 space-y-3 print:overflow-visible">
                {/* Cultural Origin */}
                <div className="flex items-center gap-1.5 text-xs font-bold text-amber-700 font-jakarta">
                  <MapPin className="w-3.5 h-3.5 shrink-0" />
                  <span>{isEn ? 'Origin:' : 'Asal Nagari / Tradisi:'} {origin}</span>
                </div>

                {/* Description */}
                <div className="font-jakarta text-xs text-gray-700 leading-relaxed">
                  <p>{desc.split('\n\n')[0]}</p>
                </div>

                {/* Philosophy */}
                {philosophy && (
                  <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 font-jakarta">
                    <h4 className="font-bold text-[10px] uppercase text-amber-900 tracking-wider mb-1">
                      {isEn ? 'Customary Philosophy:' : 'Falsafah & Makna Adat:'}
                    </h4>
                    <p className="italic font-bold text-amber-900 text-[11px] leading-snug">
                      "{philosophy}"
                    </p>
                  </div>
                )}
              </div>

              {/* Footer */}
              <div className="pt-2 mt-2 border-t border-gray-100 flex items-center justify-between text-[10px] font-jakarta text-gray-500 shrink-0">
                <span>Dinas Kebudayaan Sumatera Barat</span>
                <span className="text-gray-400">#{destinations.length + idx + 1}</span>
              </div>
            </article>
          );
        })}

        {/* ============================================================== */}
        {/* BAB III: 16 KULINER OTENTIK (1 HALAMAN PER ITEM)                */}
        {/* ============================================================== */}
        {(activeTab === 'all' || activeTab === 'culinary') && culinaryItems.map((cul, idx) => {
          const title = isEn && cul.titleEn ? cul.titleEn : cul.title;
          const category = isEn && cul.categoryEn ? cul.categoryEn : cul.category;
          const origin = isEn && cul.originEn ? cul.originEn : cul.origin;
          const desc = isEn && cul.descriptionEn ? cul.descriptionEn : cul.description;
          const ingredients = (isEn && cul.mainIngredientsEn ? cul.mainIngredientsEn : cul.mainIngredients) || [];
          const taste = isEn && cul.tasteProfileEn ? cul.tasteProfileEn : cul.tasteProfile;

          return (
            <article key={cul.id || idx} className="w-full bg-white text-slate-900 rounded-2xl overflow-hidden shadow-xl border border-rose-200 p-4 flex flex-col print:shadow-none print:border-0 print:p-4 print:break-after-page print:aspect-auto print:overflow-visible" style={{ aspectRatio: '2/3' }}>
              {/* Header info */}
              <div className="flex items-center justify-between pb-3 border-b border-gray-100 text-xs font-jakarta font-bold text-gray-500 shrink-0">
                <span>MALALA 2026 • GASTRONOMI OTENTIK</span>
                <span className="text-rose-600 uppercase font-extrabold">{category}</span>
              </div>

              {/* Hero Image */}
              <div className="h-36 w-full rounded-xl overflow-hidden mt-3 relative bg-rose-950 shrink-0">
                <img
                  src={imgSrc(cul.imageUrl)}
                  alt={title}
                  className="w-full h-full object-cover"
                  loading="eager"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                <div className="absolute bottom-3 left-3 text-white">
                  <span className="bg-rose-600 text-white font-jakarta font-extrabold text-[10px] uppercase px-2 py-0.5 rounded shadow">
                    {category}
                  </span>
                  <h3 className="font-orbitron font-extrabold text-base text-white pt-1 drop-shadow-md leading-tight">
                    {title}
                  </h3>
                </div>
              </div>

              {/* Scrollable body */}
              <div className="flex-1 overflow-y-auto mt-3 space-y-3 print:overflow-visible">
                {/* Origin */}
                <div className="flex items-center gap-1.5 text-xs font-bold text-rose-600 font-jakarta">
                  <MapPin className="w-3.5 h-3.5 shrink-0" />
                  <span>{isEn ? 'Origin:' : 'Asal Kuliner:'} {origin}</span>
                </div>

                {/* Description */}
                <div className="font-jakarta text-xs text-gray-700 leading-relaxed">
                  <p>{desc.split('\n\n')[0]}</p>
                </div>

                {/* Ingredients & Taste */}
                <div className="p-3 bg-rose-50 rounded-xl border border-rose-200 font-jakarta space-y-1">
                  <h4 className="font-bold text-[10px] uppercase text-rose-900 tracking-wider">
                    {isEn ? '🥘 Key Ingredients:' : '🥘 Bahan & Rempah Utama:'}
                  </h4>
                  <p className="text-[11px] text-gray-700 font-medium">
                    {ingredients.slice(0, 5).join(', ')}
                  </p>
                  {taste && (
                    <p className="text-[11px] text-rose-800 font-bold pt-0.5">
                      👅 {taste}
                    </p>
                  )}
                </div>
              </div>

              {/* Footer */}
              <div className="pt-2 mt-2 border-t border-gray-100 flex items-center justify-between text-[10px] font-jakarta text-gray-500 shrink-0">
                <span>Warisan Kuliner Ranah Minang</span>
                <span className="text-gray-400">#{destinations.length + cultureItems.length + idx + 1}</span>
              </div>
            </article>
          );
        })}

        {/* ============================================================== */}
        {/* BAB IV: 20 KALENDER EVENT & KEN (1 HALAMAN PER ITEM)            */}
        {/* ============================================================== */}
        {(activeTab === 'all' || activeTab === 'events') && eventItems.map((ev, idx) => {
          const title = isEn && ev.titleEn ? ev.titleEn : ev.title;
          const schedule = isEn && ev.scheduleEn ? ev.scheduleEn : ev.schedule;
          const location = isEn && ev.locationEn ? ev.locationEn : ev.location;
          const desc = isEn && ev.descriptionEn ? ev.descriptionEn : ev.description;

          return (
            <article key={ev.id || idx} className="w-full bg-white text-slate-900 rounded-2xl overflow-hidden shadow-xl border border-gray-200 p-4 flex flex-col print:shadow-none print:border-0 print:p-4 print:break-after-page print:aspect-auto print:overflow-visible" style={{ aspectRatio: '2/3' }}>
              {/* Header info */}
              <div className="flex items-center justify-between pb-3 border-b border-gray-100 text-xs font-jakarta font-bold text-gray-500 shrink-0">
                <span>MALALA 2026 • CALENDAR OF EVENTS</span>
                <span className={`uppercase font-extrabold ${ev.isKen ? 'text-red-600' : 'text-slate-800'}`}>
                  {ev.isKen ? '⭐ KEN 2026' : 'FESTIVAL'}
                </span>
              </div>

              {/* Hero Image */}
              <div className="h-36 w-full rounded-xl overflow-hidden mt-3 relative bg-slate-900 shrink-0">
                <img
                  src={imgSrc(ev.imageUrl)}
                  alt={title}
                  className="w-full h-full object-cover"
                  loading="eager"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                <div className="absolute bottom-3 left-3 text-white">
                  <span className={`font-jakarta font-extrabold text-[10px] uppercase px-2 py-0.5 rounded shadow ${ev.isKen ? 'bg-red-600 text-white' : 'bg-white text-black'}`}>
                    {ev.isKen ? '⭐ KEN 2026' : 'COE 2026'}
                  </span>
                  <h3 className="font-orbitron font-extrabold text-base text-white pt-1 drop-shadow-md leading-tight">
                    {title}
                  </h3>
                </div>
              </div>

              {/* Scrollable body */}
              <div className="flex-1 overflow-y-auto mt-3 space-y-3 print:overflow-visible">
                {/* Schedule & Location */}
                <div className="flex items-center justify-between text-xs font-bold text-slate-800 font-jakarta flex-wrap gap-1">
                  <span className="text-red-600 font-bold">📅 {schedule}</span>
                  <span className="text-gray-600">📍 {location}</span>
                </div>

                {/* Description */}
                <div className="font-jakarta text-xs text-gray-700 leading-relaxed">
                  <p>{desc.split('\n\n')[0]}</p>
                </div>

                {ev.isKen && (
                  <div className="p-3 bg-red-50 rounded-xl border border-red-200 font-jakarta">
                    <h4 className="font-bold text-[10px] uppercase text-red-700 tracking-wider">
                      ⭐ Karisma Event Nusantara (KEN)
                    </h4>
                    <p className="text-[11px] text-red-900 pt-0.5 leading-snug">
                      Event resmi kalender pariwisata nasional Kemenparekraf RI.
                    </p>
                  </div>
                )}
              </div>

              {/* Footer */}
              <div className="pt-2 mt-2 border-t border-gray-100 flex items-center justify-between text-[10px] font-jakarta text-gray-500 shrink-0">
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
