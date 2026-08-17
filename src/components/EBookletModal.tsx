import React, { useState } from 'react';
import { X, MapPin, Check, BookOpen } from 'lucide-react';
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

  // Compress Unsplash images to WebP for fast performance
  const imgSrc = (url: string, w = 800) => {
    if (!url) return url;
    if (url.includes('unsplash.com')) {
      const base = url.split('?')[0];
      return `${base}?auto=format&fit=crop&w=${w}&q=75&fm=webp`;
    }
    return url;
  };

  return (
    <div className="fixed inset-0 z-[200] bg-black/95 backdrop-blur-md flex flex-col items-center justify-start overflow-y-auto print:p-0 print:bg-white print:static">
      {/* Floating Minimalist Close Button (Fixed Top-Right) */}
      <button
        onClick={onClose}
        className="fixed top-4 right-4 sm:top-6 sm:right-6 z-[230] w-11 h-11 rounded-full bg-black/70 hover:bg-black/90 text-white/80 hover:text-white backdrop-blur-md border border-white/20 flex items-center justify-center transition-all hover:scale-110 shadow-2xl cursor-pointer print:hidden"
        title={isEn ? 'Close' : 'Tutup'}
        aria-label="Close"
      >
        <X className="w-5 h-5" />
      </button>

      {/* Book Content Pages Container — Expansive Magazine View */}
      <main className="w-full max-w-4xl mx-auto px-4 sm:px-6 pt-6 pb-20 space-y-6 print:space-y-0 print:max-w-full print:px-0 print:pt-0 print:pb-0">
        
        {/* Clean Chapter Selector at the top (Fit nicely, NO slider / scrollbar) */}
        <nav className="w-full bg-slate-900/90 backdrop-blur-md border border-slate-800 rounded-2xl p-2 flex flex-wrap sm:flex-nowrap items-center justify-between gap-1.5 shadow-xl print:hidden">
          {[
            { key: 'all', label: isEn ? '📖 Semua' : '📖 Semua' },
            { key: 'destinations', label: isEn ? `🏔️ Destinasi (${destinations.length})` : `🏔️ Destinasi (${destinations.length})` },
            { key: 'culture', label: isEn ? `🏛️ Budaya (${cultureItems.length})` : `🏛️ Budaya (${cultureItems.length})` },
            { key: 'culinary', label: isEn ? `🍲 Kuliner (${culinaryItems.length})` : `🍲 Kuliner (${culinaryItems.length})` },
            { key: 'events', label: isEn ? `📅 Event (${eventItems.length})` : `📅 Event (${eventItems.length})` },
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key as any)}
              className={`flex-1 min-w-[90px] py-2 px-3 rounded-xl font-jakarta font-bold text-xs uppercase transition-all cursor-pointer text-center ${
                activeTab === tab.key
                  ? 'bg-red-600 text-white shadow-md'
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
            className="w-full text-white rounded-3xl overflow-hidden shadow-2xl relative min-h-[480px] sm:min-h-[580px] flex flex-col justify-between print:rounded-none print:shadow-none print:break-after-page print:border-0"
          >
            {/* Background image */}
            <img
              src={BG_IMAGE_2}
              alt="Cover E-Booklet Sumatera Barat"
              className="absolute inset-0 w-full h-full object-cover"
              loading="eager"
            />
            {/* Gradient overlay for contrast */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-black/40 pointer-events-none" />

            {/* Top badge row */}
            <div className="relative z-10 p-6 sm:p-8 flex items-center justify-between">
              <span className="inline-block bg-red-600 text-white font-jakarta font-extrabold text-xs uppercase px-3 py-1.5 rounded-lg tracking-widest shadow-md">
                {isEn ? 'OFFICIAL DIGITAL PUBLICATION 2026' : 'PUBLIKASI RESMI DIGITAL 2026'}
              </span>
              <div className="flex items-center gap-2 text-white/80 font-jakarta text-xs font-semibold">
                <BookOpen className="w-4 h-4 text-red-400" />
                <span>MALALA.MY.ID</span>
              </div>
            </div>

            {/* Center: Title block */}
            <div className="relative z-10 p-6 sm:p-10 mt-auto space-y-3">
              <h1 className="font-orbitron font-extrabold text-4xl sm:text-6xl text-white tracking-wide drop-shadow-2xl leading-tight">
                MALALA 2026
              </h1>
              <p className="font-orbitron font-bold text-lg sm:text-xl text-red-300 drop-shadow-md tracking-wide">
                {isEn ? 'WEST SUMATRA TRAVEL & CULTURAL COMPREHENSIVE GUIDE' : 'PANDUAN LENGKAP PARIWISATA & BUDAYA RANAH MINANG'}
              </p>
              <p className="font-jakarta text-white/90 text-sm sm:text-base leading-relaxed max-w-2xl pt-1">
                {isEn
                  ? `An extensive curated guide exploring ${destinations.length} majestic destinations, ${cultureItems.length} living Minangkabau cultural traditions, ${culinaryItems.length} authentic gastronomic treasures, and ${eventItems.length} official 2026 festivals.`
                  : `Kompilasi kurasi terlengkap yang memuat ${destinations.length} destinasi wisata alam & sejarah, ${cultureItems.length} tradisi adat Minangkabau, ${culinaryItems.length} pusaka kuliner otentik, serta ${eventItems.length} kalender event pariwisata resmi 2026.`}
              </p>

              {/* Divider + Footer */}
              <div className="pt-5 border-t border-white/20 flex flex-wrap items-center justify-between text-xs text-white/70 font-jakarta gap-2">
                <span>Dinas Pariwisata & Kebudayaan Provinsi Sumatera Barat</span>
                <span className="font-bold text-white tracking-wide">E-Booklet Digital Edition</span>
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
            <article key={dest.id || idx} className="w-full bg-white text-slate-900 rounded-3xl overflow-hidden shadow-2xl border border-gray-200 p-6 sm:p-8 space-y-5 print:shadow-none print:border-0 print:p-4 print:break-after-page flex flex-col justify-between">
              <div>
                {/* Header info */}
                <div className="flex items-center justify-between pb-3 border-b border-gray-100 text-xs font-jakarta font-bold text-gray-500">
                  <span>MALALA 2026 • {dest.regency || 'SUMATERA BARAT'}</span>
                  <span className="text-red-600 uppercase font-extrabold">{category}</span>
                </div>

                {/* Hero Image */}
                <div className="h-64 sm:h-80 w-full rounded-2xl overflow-hidden mt-4 relative bg-slate-900 shadow-inner">
                  <img
                    src={imgSrc(dest.imageUrl)}
                    alt={title}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-4 text-white">
                    <span className="bg-white text-black font-jakarta font-extrabold text-[11px] uppercase px-3 py-1 rounded-md shadow">
                      {category}
                    </span>
                    <h3 className="font-orbitron font-extrabold text-xl sm:text-3xl text-white pt-1.5 drop-shadow-md">
                      {title}
                    </h3>
                  </div>
                </div>

                {/* Location */}
                <div className="pt-4 flex items-center gap-2 text-sm font-bold text-red-600 font-jakarta">
                  <MapPin className="w-4 h-4 shrink-0" />
                  <span>{location}</span>
                </div>

                {/* Full Description */}
                <div className="font-jakarta text-sm text-gray-700 leading-relaxed pt-3 space-y-3">
                  {desc.split('\n\n').map((p, pIdx) => (
                    <p key={pIdx}>{p}</p>
                  ))}
                </div>

                {/* Highlights */}
                {highlights.length > 0 && (
                  <div className="mt-5 p-4 sm:p-5 bg-gray-50 rounded-2xl border border-gray-200 font-jakarta">
                    <h4 className="font-bold text-xs uppercase text-slate-900 tracking-wider mb-2.5">
                      {isEn ? 'Key Highlights & Attractions:' : 'Daya Tarik Utama (Highlights):'}
                    </h4>
                    <ul className="space-y-1.5 text-xs sm:text-sm text-gray-700">
                      {highlights.map((h, hIdx) => (
                        <li key={hIdx} className="flex items-center gap-2">
                          <Check className="w-4 h-4 text-green-600 shrink-0 font-bold" />
                          <span>{h}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* Best Time Footer */}
              {bestTime && (
                <div className="pt-4 border-t border-gray-100 flex items-center justify-between text-xs font-jakarta text-gray-500">
                  <span>{isEn ? 'Best Time to Visit:' : 'Waktu Terbaik Berkunjung:'} <strong className="text-black">{bestTime}</strong></span>
                  <span className="text-gray-400"># {idx + 1}</span>
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
            <article key={cult.id || idx} className="w-full bg-white text-slate-900 rounded-3xl overflow-hidden shadow-2xl border border-amber-200 p-6 sm:p-8 space-y-5 print:shadow-none print:border-0 print:p-4 print:break-after-page flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between pb-3 border-b border-gray-100 text-xs font-jakarta font-bold text-gray-500">
                  <span>MALALA 2026 • WARISAN BUDAYA & TRADISI ADAT</span>
                  <span className="text-amber-700 uppercase font-extrabold">{category}</span>
                </div>

                <div className="h-64 sm:h-80 w-full rounded-2xl overflow-hidden mt-4 relative bg-amber-950 shadow-inner">
                  <img
                    src={imgSrc(cult.imageUrl)}
                    alt={title}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-4 text-white">
                    <span className="bg-amber-600 text-white font-jakarta font-extrabold text-[11px] uppercase px-3 py-1 rounded-md shadow">
                      {category}
                    </span>
                    <h3 className="font-orbitron font-extrabold text-xl sm:text-3xl text-white pt-1.5 drop-shadow-md">
                      {title}
                    </h3>
                  </div>
                </div>

                <div className="pt-4 flex items-center gap-2 text-sm font-bold text-amber-700 font-jakarta">
                  <MapPin className="w-4 h-4 shrink-0" />
                  <span>{isEn ? 'Cultural Origin:' : 'Asal Nagari / Tradisi:'} {origin}</span>
                </div>

                <div className="font-jakarta text-sm text-gray-700 leading-relaxed pt-3 space-y-3">
                  {desc.split('\n\n').map((p, pIdx) => (
                    <p key={pIdx}>{p}</p>
                  ))}
                </div>

                {philosophy && (
                  <div className="mt-5 p-4 sm:p-5 bg-amber-50 rounded-2xl border border-amber-200 font-jakarta">
                    <h4 className="font-bold text-xs uppercase text-amber-900 tracking-wider mb-1.5">
                      {isEn ? 'Minangkabau Customary Philosophy:' : 'Falsafah & Makna Adat Minangkabau:'}
                    </h4>
                    <p className="italic font-bold text-amber-900 text-xs sm:text-sm leading-relaxed">
                      "{philosophy}"
                    </p>
                  </div>
                )}
              </div>

              <div className="pt-4 border-t border-gray-100 flex items-center justify-between text-xs font-jakarta text-gray-500">
                <span>Dinas Pariwisata & Kebudayaan Sumatera Barat</span>
                <span className="text-gray-400"># {destinations.length + idx + 1}</span>
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
            <article key={cul.id || idx} className="w-full bg-white text-slate-900 rounded-3xl overflow-hidden shadow-2xl border border-rose-200 p-6 sm:p-8 space-y-5 print:shadow-none print:border-0 print:p-4 print:break-after-page flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between pb-3 border-b border-gray-100 text-xs font-jakarta font-bold text-gray-500">
                  <span>MALALA 2026 • GASTRONOMI & KULINER OTENTIK</span>
                  <span className="text-rose-600 uppercase font-extrabold">{category}</span>
                </div>

                <div className="h-64 sm:h-80 w-full rounded-2xl overflow-hidden mt-4 relative bg-rose-950 shadow-inner">
                  <img
                    src={imgSrc(cul.imageUrl)}
                    alt={title}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-4 text-white">
                    <span className="bg-rose-600 text-white font-jakarta font-extrabold text-[11px] uppercase px-3 py-1 rounded-md shadow">
                      {category}
                    </span>
                    <h3 className="font-orbitron font-extrabold text-xl sm:text-3xl text-white pt-1.5 drop-shadow-md">
                      {title}
                    </h3>
                  </div>
                </div>

                <div className="pt-4 flex items-center gap-2 text-sm font-bold text-rose-600 font-jakarta">
                  <MapPin className="w-4 h-4 shrink-0" />
                  <span>{isEn ? 'Heritage Origin:' : 'Asal Kuliner:'} {origin}</span>
                </div>

                <div className="font-jakarta text-sm text-gray-700 leading-relaxed pt-3 space-y-3">
                  {desc.split('\n\n').map((p, pIdx) => (
                    <p key={pIdx}>{p}</p>
                  ))}
                </div>

                {/* Ingredients & Taste */}
                <div className="mt-5 p-4 sm:p-5 bg-rose-50 rounded-2xl border border-rose-200 font-jakarta space-y-2">
                  <h4 className="font-bold text-xs uppercase text-rose-900 tracking-wider">
                    {isEn ? '🥘 Spices & Main Ingredients:' : '🥘 Bahan & Rempah Utama:'}
                  </h4>
                  <p className="text-xs sm:text-sm text-gray-700 font-medium">
                    {ingredients.join(', ')}
                  </p>
                  {taste && (
                    <p className="text-xs sm:text-sm text-rose-800 font-bold pt-1">
                      👅 {isEn ? 'Taste Profile:' : 'Karakter Rasa:'} {taste}
                    </p>
                  )}
                </div>
              </div>

              <div className="pt-4 border-t border-gray-100 flex items-center justify-between text-xs font-jakarta text-gray-500">
                <span>Warisan Kuliner Takbenda UNESCO & Ranah Minang</span>
                <span className="text-gray-400"># {destinations.length + cultureItems.length + idx + 1}</span>
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
            <article key={ev.id || idx} className="w-full bg-white text-slate-900 rounded-3xl overflow-hidden shadow-2xl border border-gray-200 p-6 sm:p-8 space-y-5 print:shadow-none print:border-0 print:p-4 print:break-after-page flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between pb-3 border-b border-gray-100 text-xs font-jakarta font-bold text-gray-500">
                  <span>MALALA 2026 • CALENDAR OF EVENTS</span>
                  <span className={`uppercase font-extrabold ${ev.isKen ? 'text-red-600' : 'text-slate-800'}`}>
                    {ev.isKen ? '⭐ KARISMA EVENT NUSANTARA' : 'FESTIVAL RESMI'}
                  </span>
                </div>

                <div className="h-64 sm:h-80 w-full rounded-2xl overflow-hidden mt-4 relative bg-slate-900 shadow-inner">
                  <img
                    src={imgSrc(ev.imageUrl)}
                    alt={title}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-4 text-white">
                    <span className={`font-jakarta font-extrabold text-[11px] uppercase px-3 py-1 rounded-md shadow ${ev.isKen ? 'bg-red-600 text-white' : 'bg-white text-black'}`}>
                      {ev.isKen ? '⭐ OFFICIAL KEN 2026' : 'COE 2026'}
                    </span>
                    <h3 className="font-orbitron font-extrabold text-xl sm:text-3xl text-white pt-1.5 drop-shadow-md">
                      {title}
                    </h3>
                  </div>
                </div>

                <div className="pt-4 flex items-center justify-between text-xs sm:text-sm font-bold text-slate-800 font-jakarta flex-wrap gap-2">
                  <span className="text-red-600 font-bold">📅 {schedule}</span>
                  <span className="text-gray-600">📍 {location}</span>
                </div>

                <div className="font-jakarta text-sm text-gray-700 leading-relaxed pt-3 space-y-3">
                  {desc.split('\n\n').map((p, pIdx) => (
                    <p key={pIdx}>{p}</p>
                  ))}
                </div>

                {ev.isKen && (
                  <div className="mt-5 p-4 sm:p-5 bg-red-50 rounded-2xl border border-red-200 font-jakarta">
                    <h4 className="font-bold text-xs uppercase text-red-700 tracking-wider">
                      ⭐ Event Unggulan Karisma Event Nusantara (KEN) Kemenparekraf RI
                    </h4>
                    <p className="text-xs sm:text-sm text-red-900 pt-1 leading-relaxed">
                      Event ini masuk dalam kalender pariwisata nasional Kemenparekraf sebagai daya tarik budaya kelas dunia.
                    </p>
                  </div>
                )}
              </div>

              <div className="pt-4 border-t border-gray-100 flex items-center justify-between text-xs font-jakarta text-gray-500">
                <span>Dinas Pariwisata Provinsi Sumatera Barat</span>
                <span className="text-gray-400"># {destinations.length + cultureItems.length + culinaryItems.length + idx + 1}</span>
              </div>
            </article>
          );
        })}

      </main>
    </div>
  );
};
