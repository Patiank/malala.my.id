import React, { useState } from 'react';
import { X, Printer, Sparkles, MapPin, Check, BookOpen } from 'lucide-react';
import { Destination, CultureItem, CulinaryItem, EventItem } from '../types';
import { DESTINATIONS, CULTURE_ITEMS, CULINARY_ITEMS, EVENTS_SCHEDULE, BG_IMAGE_1, BG_IMAGE_2 } from '../data/content';

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

  const handlePrint = () => {
    window.print();
  };



  return (
    <div className="fixed inset-0 z-[200] bg-black/90 backdrop-blur-md flex flex-col items-center justify-start overflow-y-auto print:p-0 print:bg-white print:static">
      {/* Top Controls Bar (Hidden during Print) */}
      <header className="sticky top-0 z-50 w-full max-w-[420px] bg-slate-900/95 backdrop-blur-md border border-slate-700 rounded-b-xl px-3 py-2 mb-4 flex flex-wrap items-center justify-between gap-2 text-white shadow-2xl print:hidden">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-red-600 flex items-center justify-center text-white shadow-md">
            <BookOpen className="w-4 h-4" />
          </div>
          <div>
            <h2 className="font-orbitron font-extrabold text-[11px] uppercase tracking-wider text-white leading-tight">
              {isEn ? 'E-Booklet Digital' : 'E-Booklet Digital Resmi'}
            </h2>
            <p className="font-jakarta text-[9px] text-gray-400">
              {isEn ? 'West Sumatra Tourism Guide' : 'Panduan Pariwisata Sumatera Barat'}
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={handlePrint}
            className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-jakarta font-bold text-[10px] uppercase transition-all flex items-center gap-1 cursor-pointer shadow-md"
            title={isEn ? 'Print or Save as PDF' : 'Cetak atau Simpan ke PDF'}
          >
            <Printer className="w-3.5 h-3.5" />
            <span>{isEn ? 'Print PDF' : 'Cetak PDF'}</span>
          </button>



          <button
            onClick={onClose}
            className="p-2 bg-slate-800 hover:bg-slate-700 text-gray-300 hover:text-white rounded-lg transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Filter Navigation Tabs */}
        <div className="w-full pt-2 border-t border-slate-700 flex items-center gap-1 overflow-x-auto text-[10px] font-jakarta">
          {[
            { key: 'all', label: isEn ? '📖 Semua' : '📖 Semua' },
            { key: 'destinations', label: isEn ? `🏔️ ${destinations.length} Destinasi` : `🏔️ ${destinations.length} Destinasi` },
            { key: 'culture', label: isEn ? `🏛️ ${cultureItems.length} Budaya` : `🏛️ ${cultureItems.length} Budaya` },
            { key: 'culinary', label: isEn ? `🍲 ${culinaryItems.length} Kuliner` : `🍲 ${culinaryItems.length} Kuliner` },
            { key: 'events', label: isEn ? `📅 ${eventItems.length} Event` : `📅 ${eventItems.length} Event` },
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key as any)}
              className={`px-2.5 py-1 rounded-full font-bold uppercase transition-all cursor-pointer whitespace-nowrap text-[10px] ${
                activeTab === tab.key
                  ? 'bg-red-600 text-white shadow-sm'
                  : 'bg-slate-800 text-gray-400 hover:bg-slate-700'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </header>

      {/* Book Content Pages Container — Portrait phone-screen scroll */}
      <main className="w-full max-w-[390px] mx-auto px-3 pb-8 space-y-4 print:space-y-0 print:max-w-full print:px-0">
        
        {/* ============================================================== */}
        {/* COVER PAGE (PAGE 1) - HERO IMAGE BACKGROUND & MINIMALIST CLEAN */}
        {/* ============================================================== */}
        {(activeTab === 'all') && (
          <article 
            className="w-full text-white rounded-2xl overflow-hidden shadow-2xl relative bg-cover bg-center flex flex-col justify-between print:rounded-none print:shadow-none print:break-after-page print:border-0"
            style={{
              backgroundImage: `url(${BG_IMAGE_2})`,
              minHeight: '600px',
            }}
          >
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
            <article key={dest.id || idx} className="w-full bg-white text-slate-900 rounded-2xl overflow-hidden shadow-xl border border-gray-200 p-4 space-y-4 print:shadow-none print:border-0 print:p-4 print:break-after-page flex flex-col justify-between">
              <div>
                {/* Header info */}
                <div className="flex items-center justify-between pb-3 border-b border-gray-100 text-xs font-jakarta font-bold text-gray-500">
                  <span>MALALA 2026 • {dest.regency || 'SUMATERA BARAT'}</span>
                  <span className="text-red-600 uppercase font-extrabold">{category}</span>
                </div>

                {/* Hero Image */}
                <div className="h-48 w-full rounded-xl overflow-hidden mt-3 relative bg-slate-900">
                  <img
                    src={dest.imageUrl}
                    alt={title}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-4 text-white">
                    <span className="bg-white text-black font-jakarta font-extrabold text-[10px] uppercase px-2.5 py-1 rounded shadow">
                      {category}
                    </span>
                    <h3 className="font-orbitron font-extrabold text-xl sm:text-2xl text-white pt-1 drop-shadow-md">
                      {title}
                    </h3>
                  </div>
                </div>

                {/* Location */}
                <div className="pt-3 flex items-center gap-1.5 text-xs font-bold text-red-600 font-jakarta">
                  <MapPin className="w-4 h-4 shrink-0" />
                  <span>{location}</span>
                </div>

                {/* Full Description */}
                <div className="font-jakarta text-xs sm:text-[13px] text-gray-700 leading-relaxed pt-3 space-y-2.5">
                  {desc.split('\n\n').map((p, pIdx) => (
                    <p key={pIdx}>{p}</p>
                  ))}
                </div>

                {/* Highlights */}
                {highlights.length > 0 && (
                  <div className="mt-4 p-4 bg-gray-50 rounded-xl border border-gray-200 font-jakarta">
                    <h4 className="font-bold text-xs uppercase text-slate-900 tracking-wider mb-2">
                      {isEn ? 'Key Highlights & Attractions:' : 'Daya Tarik Utama (Highlights):'}
                    </h4>
                    <ul className="space-y-1 text-xs text-gray-700">
                      {highlights.map((h, hIdx) => (
                        <li key={hIdx} className="flex items-center gap-2">
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
                <div className="pt-3 border-t border-gray-100 flex items-center justify-between text-xs font-jakarta text-gray-500">
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
            <article key={cult.id || idx} className="w-full bg-white text-slate-900 rounded-2xl overflow-hidden shadow-xl border border-amber-200 p-4 space-y-4 print:shadow-none print:border-0 print:p-4 print:break-after-page flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between pb-3 border-b border-gray-100 text-xs font-jakarta font-bold text-gray-500">
                  <span>MALALA 2026 • WARISAN BUDAYA & TRADISI ADAT</span>
                  <span className="text-amber-700 uppercase font-extrabold">{category}</span>
                </div>

                <div className="h-48 w-full rounded-xl overflow-hidden mt-3 relative bg-amber-950">
                  <img
                    src={cult.imageUrl}
                    alt={title}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-4 text-white">
                    <span className="bg-amber-600 text-white font-jakarta font-extrabold text-[10px] uppercase px-2.5 py-1 rounded shadow">
                      {category}
                    </span>
                    <h3 className="font-orbitron font-extrabold text-xl sm:text-2xl text-white pt-1 drop-shadow-md">
                      {title}
                    </h3>
                  </div>
                </div>

                <div className="pt-3 flex items-center gap-1.5 text-xs font-bold text-amber-700 font-jakarta">
                  <MapPin className="w-4 h-4 shrink-0" />
                  <span>{isEn ? 'Cultural Origin:' : 'Asal Nagari / Tradisi:'} {origin}</span>
                </div>

                <div className="font-jakarta text-xs sm:text-[13px] text-gray-700 leading-relaxed pt-3 space-y-2.5">
                  {desc.split('\n\n').map((p, pIdx) => (
                    <p key={pIdx}>{p}</p>
                  ))}
                </div>

                {philosophy && (
                  <div className="mt-4 p-4 bg-amber-50 rounded-xl border border-amber-200 font-jakarta">
                    <h4 className="font-bold text-xs uppercase text-amber-900 tracking-wider mb-1">
                      {isEn ? 'Minangkabau Customary Philosophy:' : 'Falsafah & Makna Adat Minangkabau:'}
                    </h4>
                    <p className="italic font-bold text-amber-900 text-xs">
                      "{philosophy}"
                    </p>
                  </div>
                )}
              </div>

              <div className="pt-3 border-t border-gray-100 flex items-center justify-between text-xs font-jakarta text-gray-500">
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
          const philosophy = isEn && cul.culturalPhilosophyEn ? cul.culturalPhilosophyEn : cul.culturalPhilosophy;

          return (
            <article key={cul.id || idx} className="w-full bg-white text-slate-900 rounded-2xl overflow-hidden shadow-xl border border-rose-200 p-4 space-y-4 print:shadow-none print:border-0 print:p-4 print:break-after-page flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between pb-3 border-b border-gray-100 text-xs font-jakarta font-bold text-gray-500">
                  <span>MALALA 2026 • GASTRONOMI & KULINER OTENTIK</span>
                  <span className="text-rose-600 uppercase font-extrabold">{category}</span>
                </div>

                <div className="h-48 w-full rounded-xl overflow-hidden mt-3 relative bg-rose-950">
                  <img
                    src={cul.imageUrl}
                    alt={title}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-4 text-white">
                    <span className="bg-rose-600 text-white font-jakarta font-extrabold text-[10px] uppercase px-2.5 py-1 rounded shadow">
                      {category}
                    </span>
                    <h3 className="font-orbitron font-extrabold text-xl sm:text-2xl text-white pt-1 drop-shadow-md">
                      {title}
                    </h3>
                  </div>
                </div>

                <div className="pt-3 flex items-center gap-1.5 text-xs font-bold text-rose-600 font-jakarta">
                  <MapPin className="w-4 h-4 shrink-0" />
                  <span>{isEn ? 'Heritage Origin:' : 'Asal Kuliner:'} {origin}</span>
                </div>

                <div className="font-jakarta text-xs sm:text-[13px] text-gray-700 leading-relaxed pt-3 space-y-2.5">
                  {desc.split('\n\n').map((p, pIdx) => (
                    <p key={pIdx}>{p}</p>
                  ))}
                </div>

                {/* Ingredients & Taste */}
                <div className="mt-4 p-4 bg-rose-50 rounded-xl border border-rose-200 font-jakarta space-y-1.5">
                  <h4 className="font-bold text-xs uppercase text-rose-900 tracking-wider">
                    {isEn ? '🥘 Spices & Main Ingredients:' : '🥘 Bahan & Rempah Utama:'}
                  </h4>
                  <p className="text-xs text-gray-700 font-medium">
                    {ingredients.join(', ')}
                  </p>
                  {taste && (
                    <p className="text-xs text-rose-800 font-bold pt-1">
                      👅 {isEn ? 'Taste Profile:' : 'Karakter Rasa:'} {taste}
                    </p>
                  )}
                </div>
              </div>

              <div className="pt-3 border-t border-gray-100 flex items-center justify-between text-xs font-jakarta text-gray-500">
                <span>Warisan Kuliner Takbenda UNESCO & Nusantara</span>
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
            <article key={ev.id || idx} className="w-full bg-white text-slate-900 rounded-2xl overflow-hidden shadow-xl border border-gray-200 p-4 space-y-4 print:shadow-none print:border-0 print:p-4 print:break-after-page flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between pb-3 border-b border-gray-100 text-xs font-jakarta font-bold text-gray-500">
                  <span>MALALA 2026 • CALENDAR OF EVENTS</span>
                  <span className={`uppercase font-extrabold ${ev.isKen ? 'text-red-600' : 'text-slate-800'}`}>
                    {ev.isKen ? '⭐ KARISMA EVENT NUSANTARA' : 'FESTIVAL RESMI'}
                  </span>
                </div>

                <div className="h-48 w-full rounded-xl overflow-hidden mt-3 relative bg-slate-900">
                  <img
                    src={ev.imageUrl}
                    alt={title}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-4 text-white">
                    <span className={`font-jakarta font-extrabold text-[10px] uppercase px-2.5 py-1 rounded shadow ${ev.isKen ? 'bg-red-600 text-white' : 'bg-white text-black'}`}>
                      {ev.isKen ? '⭐ OFFICIAL KEN 2026' : 'COE 2026'}
                    </span>
                    <h3 className="font-orbitron font-extrabold text-xl sm:text-2xl text-white pt-1 drop-shadow-md">
                      {title}
                    </h3>
                  </div>
                </div>

                <div className="pt-3 flex items-center justify-between text-xs font-bold text-slate-800 font-jakarta flex-wrap gap-2">
                  <span className="text-red-600 font-bold">📅 {schedule}</span>
                  <span className="text-gray-600">📍 {location}</span>
                </div>

                <div className="font-jakarta text-xs sm:text-[13px] text-gray-700 leading-relaxed pt-3 space-y-2.5">
                  {desc.split('\n\n').map((p, pIdx) => (
                    <p key={pIdx}>{p}</p>
                  ))}
                </div>

                {ev.isKen && (
                  <div className="mt-4 p-4 bg-red-50 rounded-xl border border-red-200 font-jakarta">
                    <h4 className="font-bold text-xs uppercase text-red-700 tracking-wider">
                      ⭐ Event Unggulan Karisma Event Nusantara (KEN) Kemenparekraf RI
                    </h4>
                    <p className="text-xs text-red-900 pt-1">
                      Event ini masuk dalam kalender pariwisata nasional Kemenparekraf sebagai daya tarik budaya kelas dunia.
                    </p>
                  </div>
                )}
              </div>

              <div className="pt-3 border-t border-gray-100 flex items-center justify-between text-xs font-jakarta text-gray-500">
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
