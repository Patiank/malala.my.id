import React, { useState } from 'react';
import { X, Download, Printer, ChevronLeft, ChevronRight, Sparkles, MapPin, Check, BookOpen } from 'lucide-react';
import { Destination, CultureItem, CulinaryItem, EventItem } from '../types';
import { DESTINATIONS, CULTURE_ITEMS, CULINARY_ITEMS, EVENTS_SCHEDULE } from '../data/content';
import { generateSumbarBookletPDF } from '../utils/pdfGenerator';

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
  const [isDownloading, setIsDownloading] = useState<boolean>(false);

  if (!isOpen) return null;

  const destinations: Destination[] = (dataStore.destinations && dataStore.destinations.length > 0) ? dataStore.destinations : DESTINATIONS;
  const cultureItems: CultureItem[] = (dataStore.cultureItems && dataStore.cultureItems.length > 0) ? dataStore.cultureItems : CULTURE_ITEMS;
  const culinaryItems: CulinaryItem[] = (dataStore.culinaryItems && dataStore.culinaryItems.length > 0) ? dataStore.culinaryItems : CULINARY_ITEMS;
  const eventItems: EventItem[] = (dataStore.eventItems && dataStore.eventItems.length > 0) ? dataStore.eventItems : EVENTS_SCHEDULE;

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadPdf = async () => {
    try {
      setIsDownloading(true);
      await generateSumbarBookletPDF({
        destinations,
        cultureItems,
        culinaryItems,
        eventItems,
        lang
      });
    } catch (e) {
      console.error(e);
      alert(isEn ? 'Please use the "Print to PDF" option above.' : 'Silakan gunakan tombol "Cetak ke PDF" di atas.');
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[200] bg-black/80 backdrop-blur-md flex flex-col items-center justify-start overflow-y-auto p-2 sm:p-4 print:p-0 print:bg-white print:static">
      {/* Top Controls Bar (Hidden during Print) */}
      <header className="sticky top-0 z-50 w-full max-w-5xl bg-slate-900/95 backdrop-blur-md border border-slate-700 rounded-xl p-3 sm:p-4 mb-4 flex flex-wrap items-center justify-between gap-3 text-white shadow-2xl print:hidden">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-red-600 flex items-center justify-center text-white shadow-md">
            <BookOpen className="w-5 h-5" />
          </div>
          <div>
            <h2 className="font-orbitron font-extrabold text-sm sm:text-base uppercase tracking-wider text-white">
              {isEn ? 'Official E-Booklet & Magazine Reader' : 'Buku Panduan & E-Booklet Resmi 2026'}
            </h2>
            <p className="font-jakarta text-[11px] text-gray-300">
              {isEn ? 'Complete 76-Page A4 Travel Guide • Dinas Pariwisata Sumbar' : 'Kompilasi 76 Halaman Preview A4 Lengkap • Dinas Pariwisata Sumbar'}
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={handlePrint}
            className="px-3.5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-jakarta font-bold text-xs uppercase transition-all flex items-center gap-1.5 cursor-pointer shadow-md"
            title={isEn ? 'Print or Save as PDF' : 'Cetak atau Simpan ke PDF'}
          >
            <Printer className="w-4 h-4" />
            <span>{isEn ? 'Print / Save PDF' : 'Cetak / Simpan PDF'}</span>
          </button>

          <button
            onClick={handleDownloadPdf}
            disabled={isDownloading}
            className="px-3.5 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-jakarta font-bold text-xs uppercase transition-all flex items-center gap-1.5 cursor-pointer shadow-md disabled:opacity-50"
          >
            <Download className={`w-4 h-4 ${isDownloading ? 'animate-bounce' : ''}`} />
            <span>{isDownloading ? (isEn ? 'Generating...' : 'Menyusun...') : (isEn ? 'Download .PDF' : 'Unduh File .PDF')}</span>
          </button>

          <button
            onClick={onClose}
            className="p-2 bg-slate-800 hover:bg-slate-700 text-gray-300 hover:text-white rounded-lg transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Filter Navigation Tabs */}
        <div className="w-full pt-2 border-t border-slate-700 flex items-center gap-1.5 overflow-x-auto text-xs font-jakarta">
          {[
            { key: 'all', label: isEn ? '📖 All Pages (76)' : '📖 Semua Halaman (76)' },
            { key: 'destinations', label: isEn ? `🏔️ Destinations (${destinations.length})` : `🏔️ Destinasi (${destinations.length})` },
            { key: 'culture', label: isEn ? `🏛️ Culture (${cultureItems.length})` : `🏛️ Kebudayaan (${cultureItems.length})` },
            { key: 'culinary', label: isEn ? `🍲 Culinary (${culinaryItems.length})` : `🍲 Kuliner (${culinaryItems.length})` },
            { key: 'events', label: isEn ? `📅 Events (${eventItems.length})` : `📅 Kalender Event (${eventItems.length})` },
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key as any)}
              className={`px-3 py-1 rounded-full font-bold uppercase transition-all cursor-pointer whitespace-nowrap text-[11px] ${
                activeTab === tab.key
                  ? 'bg-red-600 text-white'
                  : 'bg-slate-800 text-gray-300 hover:bg-slate-700'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </header>

      {/* Printable A4 Book Pages Container */}
      <main className="w-full max-w-4xl space-y-8 print:space-y-0">
        
        {/* ============================================================== */}
        {/* COVER PAGE (PAGE 1)                                            */}
        {/* ============================================================== */}
        {(activeTab === 'all') && (
          <article className="w-full bg-slate-900 text-white rounded-2xl p-8 sm:p-12 shadow-2xl border-4 border-slate-800 min-h-[700px] flex flex-col justify-between relative overflow-hidden print:min-h-screen print:rounded-none print:shadow-none print:break-after-page">
            <div className="absolute top-0 right-0 w-96 h-96 bg-red-600/10 rounded-full blur-3xl pointer-events-none" />
            <div className="space-y-4">
              <span className="inline-block bg-red-600 text-white font-jakarta font-extrabold text-xs uppercase px-3 py-1 rounded tracking-wider shadow-sm">
                {isEn ? 'OFFICIAL GOVERNMENT & TOURISM PUBLICATION' : 'PUBLIKASI RESMI DINAS PARIWISATA PROVINSI SUMATERA BARAT'}
              </span>
              <h1 className="font-orbitron font-extrabold text-4xl sm:text-5xl text-white tracking-wide">
                MALALA 2026
              </h1>
              <p className="font-orbitron font-bold text-xl sm:text-2xl text-red-500">
                {isEn ? 'WEST SUMATRA TRAVEL & CULTURAL GUIDE' : 'PANDUAN LENGKAP WISATA & BUDAYA RANAH MINANG'}
              </p>
              <p className="font-jakarta text-gray-300 text-sm sm:text-base max-w-2xl leading-relaxed">
                {isEn 
                  ? 'Official master compilation of 26 curated destinations, 14 living cultural traditions, 16 authentic gastronomic dishes, and 20 major events & Karisma Event Nusantara (KEN) 2026.'
                  : 'Kompilasi master resmi 26 destinasi wisata unggulan, 14 warisan adat luhur, 16 kuliner gastronomi otentik, dan 20 kalender festival KEN 2026.'}
              </p>
            </div>

            {/* Stats Summary Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 my-8 bg-slate-800/80 p-5 rounded-xl border border-slate-700 font-jakarta">
              <div>
                <span className="text-gray-400 text-xs block">{isEn ? 'Destinations' : 'Destinasi Wisata'}</span>
                <span className="text-2xl font-bold text-white">26 Objek</span>
              </div>
              <div>
                <span className="text-gray-400 text-xs block">{isEn ? 'Culture & Custom' : 'Tradisi Adat'}</span>
                <span className="text-2xl font-bold text-amber-400">14 Tradisi</span>
              </div>
              <div>
                <span className="text-gray-400 text-xs block">{isEn ? 'Authentic Culinary' : 'Kuliner Otentik'}</span>
                <span className="text-2xl font-bold text-rose-400">16 Makanan</span>
              </div>
              <div>
                <span className="text-gray-400 text-xs block">{isEn ? 'KEN & Events' : 'Festival & KEN'}</span>
                <span className="text-2xl font-bold text-red-400">20 Event</span>
              </div>
            </div>

            {/* Philosophy Box */}
            <div className="border-l-4 border-red-600 pl-4 py-2 bg-slate-800/50 rounded-r-lg font-jakarta">
              <p className="italic font-bold text-amber-300 text-sm">
                "Adat Basandi Syarak, Syarak Basandi Kitabullah" • "Alam Takambang Jadi Guru"
              </p>
              <p className="text-gray-400 text-xs pt-1">
                {isEn ? 'Fostering cultural integrity and natural harmony in West Sumatra.' : 'Falsafah keluhuran kearifan lokal dan harmoni alam semesta Ranah Minang.'}
              </p>
            </div>

            {/* Footer Cover */}
            <footer className="pt-8 border-t border-slate-800 flex items-center justify-between text-xs text-gray-400 font-jakarta">
              <span>Dinas Pariwisata Provinsi Sumatera Barat • 2026</span>
              <span className="font-bold text-white">https://malala.my.id</span>
            </footer>
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
            <article key={dest.id || idx} className="w-full bg-white text-slate-900 rounded-2xl overflow-hidden shadow-2xl border border-gray-200 p-6 sm:p-8 space-y-5 print:shadow-none print:border-0 print:p-4 print:break-after-page min-h-[750px] flex flex-col justify-between">
              <div>
                {/* Header info */}
                <div className="flex items-center justify-between pb-3 border-b border-gray-100 text-xs font-jakarta font-bold text-gray-500">
                  <span>MALALA 2026 • {dest.regency || 'SUMATERA BARAT'}</span>
                  <span className="text-red-600 uppercase font-extrabold">{category}</span>
                </div>

                {/* Hero Image */}
                <div className="h-64 sm:h-72 w-full rounded-xl overflow-hidden mt-3 relative bg-slate-900">
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
                  <span className="text-gray-400">Hal. {idx + 2}</span>
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
            <article key={cult.id || idx} className="w-full bg-white text-slate-900 rounded-2xl overflow-hidden shadow-2xl border border-amber-200 p-6 sm:p-8 space-y-5 print:shadow-none print:border-0 print:p-4 print:break-after-page min-h-[750px] flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between pb-3 border-b border-gray-100 text-xs font-jakarta font-bold text-gray-500">
                  <span>MALALA 2026 • WARISAN BUDAYA & TRADISI ADAT</span>
                  <span className="text-amber-700 uppercase font-extrabold">{category}</span>
                </div>

                <div className="h-64 sm:h-72 w-full rounded-xl overflow-hidden mt-3 relative bg-amber-950">
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
                <span className="text-gray-400">Hal. {destinations.length + idx + 2}</span>
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
            <article key={cul.id || idx} className="w-full bg-white text-slate-900 rounded-2xl overflow-hidden shadow-2xl border border-rose-200 p-6 sm:p-8 space-y-5 print:shadow-none print:border-0 print:p-4 print:break-after-page min-h-[750px] flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between pb-3 border-b border-gray-100 text-xs font-jakarta font-bold text-gray-500">
                  <span>MALALA 2026 • GASTRONOMI & KULINER OTENTIK</span>
                  <span className="text-rose-600 uppercase font-extrabold">{category}</span>
                </div>

                <div className="h-64 sm:h-72 w-full rounded-xl overflow-hidden mt-3 relative bg-rose-950">
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
                <span className="text-gray-400">Hal. {destinations.length + cultureItems.length + idx + 2}</span>
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
            <article key={ev.id || idx} className="w-full bg-white text-slate-900 rounded-2xl overflow-hidden shadow-2xl border border-gray-200 p-6 sm:p-8 space-y-5 print:shadow-none print:border-0 print:p-4 print:break-after-page min-h-[750px] flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between pb-3 border-b border-gray-100 text-xs font-jakarta font-bold text-gray-500">
                  <span>MALALA 2026 • CALENDAR OF EVENTS</span>
                  <span className={`uppercase font-extrabold ${ev.isKen ? 'text-red-600' : 'text-slate-800'}`}>
                    {ev.isKen ? '⭐ KARISMA EVENT NUSANTARA' : 'FESTIVAL RESMI'}
                  </span>
                </div>

                <div className="h-64 sm:h-72 w-full rounded-xl overflow-hidden mt-3 relative bg-slate-900">
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
                <span className="text-gray-400">Hal. {destinations.length + cultureItems.length + culinaryItems.length + idx + 2}</span>
              </div>
            </article>
          );
        })}

      </main>
    </div>
  );
};
