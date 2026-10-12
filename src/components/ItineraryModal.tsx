import React, { useState } from 'react';
import { X, Sparkles, Download, RefreshCw, ExternalLink, MapPin, Compass, ArrowLeft } from 'lucide-react';
import { FormAIResponse, Destination, CultureItem, CulinaryItem, EventItem } from '../types';
const ItineraryMap = React.lazy(() => import('./ItineraryMap').then(m => ({ default: m.ItineraryMap })));
import { getTiketHotelUrl, getTiketCarRentalUrl, getTiketFlightUrl, getTiketActivitiesUrl } from './Drawers';
import { IconCarano } from './icons/MinangIcons';
import { TiketOfficialBadge, TravelokaOfficialBadge } from './icons/PartnerLogos';

interface ItineraryModalProps {
  isOpen: boolean;
  onClose: () => void;
  aiResponse: FormAIResponse | null;
  destinations: Destination[];
  cultureItems: CultureItem[];
  culinaryItems: CulinaryItem[];
  eventItems: EventItem[];
  lang?: 'id' | 'en';
  appSettings?: any;
  onDownloadPdf: () => Promise<void>;
  isDownloadingPdf?: boolean;
}

export const ItineraryModal: React.FC<ItineraryModalProps> = ({
  isOpen,
  onClose,
  aiResponse,
  destinations,
  cultureItems,
  culinaryItems,
  eventItems,
  lang = 'id',
  appSettings,
  onDownloadPdf,
  isDownloadingPdf = false,
}) => {
  const isEn = lang === 'en';
  const [mapLayer, setMapLayer] = useState<'map' | 'sat'>('map');

  if (!isOpen || !aiResponse) return null;

  const totalDays = aiResponse.itinerary?.length || 1;

  // Extract visited locations for pin count and Google Maps link
  const visitedLocations: string[] = [];
  aiResponse.itinerary?.forEach((d) => {
    d.activities?.forEach((act) => {
      if (act.location && !visitedLocations.includes(act.location)) {
        visitedLocations.push(act.location);
      }
    });
  });

  const pinsCount = visitedLocations.length || totalDays * 3;
  const originQuery = 'Bandara Internasional Minangkabau';
  const destQuery = visitedLocations[visitedLocations.length - 1] || 'Padang';
  const waypointsQuery = visitedLocations.slice(0, 5).join('|');
  const googleMapsUrl = `https://www.google.com/maps/dir/?api=1&origin=${encodeURIComponent(originQuery)}&destination=${encodeURIComponent(destQuery)}&waypoints=${encodeURIComponent(waypointsQuery)}&travelmode=driving`;

  // Affiliate Partner URLs (Robust Valid Service Paths & Full Tracking URL Support)
  const tiketAffId = (appSettings?.tiketAffiliateId || '6a893170239c5bf8a8b71930').trim();
  const travelokaAffId = (appSettings?.travelokaAffiliateId || '').trim();

  const buildTiketUrl = (baseUrl: string): string => {
    const token = (tiketAffId || '6a893170239c5bf8a8b71930').trim();
    if (token.startsWith('http://') || token.startsWith('https://')) {
      try {
        const parsed = new URL(token);
        if (parsed.search) {
          return `${baseUrl}${baseUrl.includes('?') ? '&' : '?'}${parsed.search.replace(/^\?/, '')}`;
        }
      } catch {
        return token;
      }
      return token;
    }
    const sep = baseUrl.includes('?') ? '&' : '?';
    return `${baseUrl}${sep}aff_id=${encodeURIComponent(token)}&partner=${encodeURIComponent(token)}&tracking_id=malala_sumbar&utm_source=malala_sumbar`;
  };

  const buildTravelokaUrl = (baseUrl: string): string => {
    const trimmed = (travelokaAffId || '').trim();
    if (!trimmed) return baseUrl;
    if (trimmed.startsWith('http://') || trimmed.startsWith('https://')) {
      try {
        const parsed = new URL(trimmed);
        const search = parsed.search;
        if (search) {
          return `${baseUrl}${baseUrl.includes('?') ? '&' : '?'}${search.replace(/^\?/, '')}`;
        }
      } catch {
        return trimmed;
      }
      return trimmed;
    }
    const sep = baseUrl.includes('?') ? '&' : '?';
    return `${baseUrl}${sep}referral-code=${encodeURIComponent(trimmed)}&aff_id=${encodeURIComponent(trimmed)}&partner=${encodeURIComponent(trimmed)}&tracking_id=malala_sumbar&utm_source=malala_sumbar`;
  };

  const tiketHotelUrl = buildTiketUrl('https://www.tiket.com/hotel/search?q=Sumatera+Barat');
  const tiketCarUrl = buildTiketUrl('https://www.tiket.com/sewa-mobil');
  const tiketFlightUrl = buildTiketUrl('https://www.tiket.com/pesawat');
  const tiketActivityUrl = buildTiketUrl('https://www.tiket.com/to-do/search?keyword=Sumatera+Barat');

  const travelokaHotelUrl = buildTravelokaUrl('https://www.traveloka.com/id-id/hotel');
  const travelokaCarUrl = buildTravelokaUrl('https://www.traveloka.com/id-id/car-rental');
  const travelokaFlightUrl = buildTravelokaUrl('https://www.traveloka.com/id-id/flight');
  const travelokaActivityUrl = buildTravelokaUrl('https://www.traveloka.com/id-id/activities');


  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-2 sm:p-4 md:p-6 overflow-hidden">
      {/* Blur Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-fade-backdrop cursor-pointer"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Main Modal Container - Exactly matching reference style */}
      <div className="relative w-full max-w-7xl bg-slate-50 border border-gray-200 rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden flex flex-col h-[95vh] max-h-[95vh] animate-in fade-in zoom-in-95 duration-200">
        
        {/* 1. MODAL HEADER: JOY AI / MALALA AI WEST SUMATRA TRIP PLANNER */}
        <div className="px-5 sm:px-6 py-3.5 bg-white border-b border-gray-200 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-9 h-9 rounded-xl bg-slate-950 flex items-center justify-center text-amber-400 shrink-0 shadow-xs">
              <Sparkles className="w-5 h-5 fill-amber-400" />
            </div>
            <div className="min-w-0">
              <h2 className="font-orbitron font-extrabold text-xs sm:text-sm uppercase tracking-wider text-slate-950 truncate">
                {isEn ? 'MALALA AI WEST SUMATRA TRIP PLANNER' : 'MALALA AI WEST SUMATRA TRIP PLANNER'}
              </h2>
              <p className="text-[11px] sm:text-xs text-slate-500 font-jakarta truncate font-normal">
                {isEn 
                  ? 'Smart vacation plan covering whole region & verified GPS routes'
                  : 'Rencana liburan pintar mencakup seluruh wilayah & rute GPS terverifikasi'}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 sm:p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-full transition-colors cursor-pointer shrink-0"
            aria-label={isEn ? 'Close panel' : 'Tutup panel'}
          >
            <X className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>
        </div>

        {/* MODAL MAIN CONTENT: TWO-COLUMN FULL HEIGHT LAYOUT */}
        <div className="flex-1 flex flex-col lg:flex-row min-h-0 overflow-hidden bg-slate-50/70">
          
          {/* LEFT COLUMN: PETA RUTE WISATA FULL KE BAWAH (1 KOLOM) */}
          <div className="w-full lg:w-[420px] xl:w-[460px] h-[340px] sm:h-[400px] lg:h-full shrink-0 flex flex-col border-b lg:border-b-0 lg:border-r border-gray-200 bg-white">
            {/* Header Bar */}
            <div className="bg-[#0B132B] text-white px-3.5 py-2.5 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-1.5 font-orbitron font-bold text-[10px] sm:text-[11px] uppercase tracking-wide text-white">
                <Compass className="w-3.5 h-3.5 text-amber-400" />
                <span>PETA RUTE WISATA (GOOGLE MAPS)</span>
              </div>

              <div className="flex items-center gap-2">
                <div className="flex bg-slate-800/80 p-0.5 rounded-md border border-slate-700 text-[9px] font-orbitron font-bold">
                  <button
                    type="button"
                    onClick={() => setMapLayer('map')}
                    className={`px-1.5 py-0.5 rounded transition-all cursor-pointer ${
                      mapLayer === 'map' ? 'bg-amber-400 text-slate-950' : 'text-slate-300 hover:text-white'
                    }`}
                  >
                    MAP
                  </button>
                  <button
                    type="button"
                    onClick={() => setMapLayer('sat')}
                    className={`px-1.5 py-0.5 rounded transition-all cursor-pointer ${
                      mapLayer === 'sat' ? 'bg-amber-400 text-slate-950' : 'text-slate-300 hover:text-white'
                    }`}
                  >
                    SAT
                  </button>
                </div>

                <span className="bg-white/10 text-white/90 font-orbitron font-bold text-[9px] px-2 py-0.5 rounded-full border border-white/10">
                  {totalDays} HARI • {pinsCount} PIN
                </span>
              </div>
            </div>

            {/* Leaflet Map filling full height */}
            <div className="flex-1 w-full relative min-h-0 bg-slate-100">
              <React.Suspense
                fallback={
                  <div className="h-full w-full bg-slate-900 flex flex-col items-center justify-center text-white/80 font-jakarta gap-2">
                    <RefreshCw className="w-6 h-6 animate-spin text-amber-400" />
                    <span className="text-xs">{isEn ? 'Loading Route Map...' : 'Memuat Peta Rute...'}</span>
                  </div>
                }
              >
                <ItineraryMap
                  aiResponse={aiResponse}
                  destinations={destinations}
                  cultureItems={cultureItems}
                  culinaryItems={culinaryItems}
                  eventItems={eventItems}
                  lang={lang}
                  fullHeight={true}
                />
              </React.Suspense>
            </div>

            {/* Bottom Bar: Google Maps direct link */}
            <div className="px-3.5 py-2 bg-slate-50 border-t border-gray-200 flex items-center justify-between gap-2 shrink-0 text-[10px] font-jakarta">
              <span className="text-slate-500 font-medium truncate flex items-center gap-1">
                <span>💡</span>
                <span>Scroll mouse untuk Zoom • Klik pin untuk rincian</span>
              </span>
              <a
                href={googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white hover:bg-slate-100 text-slate-800 border border-slate-300 font-orbitron font-extrabold text-[9px] px-2.5 py-1 rounded uppercase tracking-wider shrink-0 transition-colors shadow-2xs"
              >
                GOOGLE MAPS ↗
              </a>
            </div>
          </div>

          {/* RIGHT COLUMN: SCROLLABLE DAYS ITINERARY & BOTTOM LOGISTICS & LOCAL WISDOM */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 flex flex-col space-y-4 custom-scrollbar min-h-0">

            {/* 1. TOP SUMMARY CARD */}
            <div className="bg-white border border-gray-200 rounded-2xl p-4 sm:p-5 shadow-2xs space-y-2.5 shrink-0">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="bg-slate-950 text-amber-400 font-orbitron font-black text-[10px] sm:text-[11px] px-3 py-1 rounded-full uppercase tracking-wider shadow-2xs">
                  {totalDays} {isEn ? 'DAYS • WEST SUMATRA' : 'HARI • SUMATERA BARAT'}
                </span>
                <span className="bg-slate-100 border border-slate-200 text-slate-700 font-orbitron font-bold text-[10px] sm:text-[11px] px-3 py-1 rounded-full">
                  HUB: BANDARA BIM PADANG
                </span>
              </div>

              <h3 className="font-orbitron font-extrabold text-sm sm:text-base md:text-lg text-slate-950 leading-snug tracking-tight">
                {aiResponse.title}
              </h3>

              <p className="font-jakarta text-xs sm:text-[13px] text-slate-600 leading-relaxed font-normal">
                {aiResponse.summary || 
                  (isEn 
                    ? 'Explore the breathtaking harmony of highland landscapes, authentic Minangkabau heritage, and legendary culinary delights with optimized linear routes.'
                    : 'Jelajahi perpaduan megah antara lanskap alam pegunungan, kekayaan warisan budaya Minangkabau, dan kelezatan kuliner legendaris dengan rute terencana searah tanpa bolak-balik.')}
              </p>
            </div>

            {/* 2. DAFTAR LEMBAR HARI ITINERARY - GRID 2 KOLOM (TOTAL 3 KOLOM BERSAMA PETA DI KIRI) */}
            <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4 items-stretch">
              
              {/* KOLOM KIRI HARI (KOLOM TENGAH MODAL: HARI 1, HARI 3, DST.) */}
              <div className="space-y-4">
                {aiResponse.itinerary
                  ?.filter((_, idx) => idx % 2 === 0)
                  .map((day) => (
                    <div
                      key={day.day}
                      className="bg-white border border-gray-200 rounded-2xl p-4 sm:p-5 shadow-2xs space-y-4 flex flex-col justify-between"
                    >
                      <div className="space-y-4">
                        {/* Header Lembar Hari: DAY X Pill & Title & Subtitle */}
                        <div className="border-b border-gray-100 pb-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                          <div className="flex items-start sm:items-center gap-2.5">
                            <span className="bg-slate-950 text-white font-orbitron font-black text-[11px] px-3 py-1 rounded-xl uppercase tracking-wider shrink-0 shadow-2xs">
                              DAY {day.day}
                            </span>
                            <div>
                              <h4 className="font-orbitron font-extrabold text-xs sm:text-sm text-slate-950 leading-snug uppercase tracking-tight">
                                {(day.title || `Eksplorasi Hari Ke-${day.day}`).replace(/^(?:Hari|Day)\s*\d+\s*[:\-–]\s*/i, '').trim()}
                              </h4>
                              <p className="font-jakarta text-[10px] sm:text-[11px] text-slate-500 font-medium">
                                {isEn ? 'Linear Route • 08:30 - 20:00' : 'Rute Terencana • 08:30 - 20:00'}
                              </p>
                            </div>
                          </div>

                          <span className="self-start sm:self-center bg-slate-50 border border-slate-200 text-slate-700 font-orbitron font-bold text-[9px] px-2 py-0.5 rounded-md shrink-0 uppercase tracking-wide">
                            {day.day} / {totalDays}
                          </span>
                        </div>

                        {/* Vertical Timeline Kegiatan Hari (Gaya Garis Vertikal Khas PDF) */}
                        <div className="relative pl-5 sm:pl-6 border-l-2 border-slate-200 space-y-4 ml-2 my-2">
                          {day.activities?.map((act, actIdx) => (
                            <div key={actIdx} className="relative space-y-1.5">
                              {/* Bullet dot di atas timeline */}
                              <span className="absolute -left-[27px] sm:-left-[31px] top-1.5 w-3.5 h-3.5 rounded-full bg-slate-950 border-2 border-white ring-2 ring-slate-200 shadow-2xs" />

                              {/* Pill Waktu (Font Orbitron Bold) */}
                              <div>
                                <span className="bg-slate-100 border border-slate-300 text-slate-800 font-orbitron font-bold text-[10px] px-2 py-0.5 rounded-md inline-block tracking-wide">
                                  {act.time}
                                </span>
                              </div>

                              {/* Judul Aktivitas (Font Jakarta Sans Bold) */}
                              <h5 className="font-jakarta font-bold text-xs text-slate-900 leading-snug">
                                {act.activity}
                              </h5>

                              {/* Lokasi dengan Icon Pin Oranye */}
                              {act.location && (
                                <div className="flex items-center gap-1.5 text-[11px] font-jakarta text-slate-500 font-medium">
                                  <MapPin className="w-3.5 h-3.5 text-orange-500 shrink-0" />
                                  <span>{act.location}</span>
                                </div>
                              )}

                              {/* Kotak Tips Panggilan Khusus (Gaya Kotak Kuning Melingkar Sesuai PDF) */}
                              {act.tips && (
                                <div className="bg-[#FEFCE8] border border-[#FDE047] rounded-xl p-2.5 text-[11px] font-jakarta text-amber-950 leading-relaxed shadow-2xs">
                                  <strong className="font-bold text-amber-900">💡 Tips:</strong> {act.tips}
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Rekomendasi Kuliner Autentik Minang (Sesuai Gaya Lembar PDF) */}
                      {day.culinaryRecommendation && (
                        <div className="bg-[#FFFBEB] border border-[#FCD34D] rounded-xl p-3 flex items-start gap-2.5 text-xs font-jakarta text-slate-800 mt-2 shadow-2xs">
                          <span className="text-lg shrink-0">🍲</span>
                          <div className="space-y-0.5">
                            <strong className="font-orbitron font-extrabold text-amber-950 text-[10px] uppercase tracking-wider block">
                              {isEn ? 'AUTHENTIC MINANG CULINARY' : 'KULINER AUTENTIK MINANG'}
                            </strong>
                            <span className="font-normal text-slate-700 text-[11px] leading-relaxed block">
                              {day.culinaryRecommendation}
                            </span>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
              </div>

              {/* KOLOM KANAN HARI (KOLOM PALING KANAN MODAL: HARI 2, HARI 4, DST. + PANEL MITRA & KEARIFAN LOKAL SELALU DI PALING BAWAH) */}
              <div className="flex flex-col h-full min-h-full space-y-4">
                <div className="space-y-4">
                  {aiResponse.itinerary
                    ?.filter((_, idx) => idx % 2 !== 0)
                    .map((day) => (
                      <div
                        key={day.day}
                        className="bg-white border border-gray-200 rounded-2xl p-4 sm:p-5 shadow-2xs space-y-4 flex flex-col justify-between"
                      >
                      <div className="space-y-4">
                        {/* Header Lembar Hari: DAY X Pill & Title & Subtitle */}
                        <div className="border-b border-gray-100 pb-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                          <div className="flex items-start sm:items-center gap-2.5">
                            <span className="bg-slate-950 text-white font-orbitron font-black text-[11px] px-3 py-1 rounded-xl uppercase tracking-wider shrink-0 shadow-2xs">
                              DAY {day.day}
                            </span>
                            <div>
                              <h4 className="font-orbitron font-extrabold text-xs sm:text-sm text-slate-950 leading-snug uppercase tracking-tight">
                                {(day.title || `Eksplorasi Hari Ke-${day.day}`).replace(/^(?:Hari|Day)\s*\d+\s*[:\-–]\s*/i, '').trim()}
                              </h4>
                              <p className="font-jakarta text-[10px] sm:text-[11px] text-slate-500 font-medium">
                                {isEn ? 'Linear Route • 08:30 - 20:00' : 'Rute Terencana • 08:30 - 20:00'}
                              </p>
                            </div>
                          </div>

                          <span className="self-start sm:self-center bg-slate-50 border border-slate-200 text-slate-700 font-orbitron font-bold text-[9px] px-2 py-0.5 rounded-md shrink-0 uppercase tracking-wide">
                            {day.day} / {totalDays}
                          </span>
                        </div>

                        {/* Vertical Timeline Kegiatan Hari (Gaya Garis Vertikal Khas PDF) */}
                        <div className="relative pl-5 sm:pl-6 border-l-2 border-slate-200 space-y-4 ml-2 my-2">
                          {day.activities?.map((act, actIdx) => (
                            <div key={actIdx} className="relative space-y-1.5">
                              {/* Bullet dot di atas timeline */}
                              <span className="absolute -left-[27px] sm:-left-[31px] top-1.5 w-3.5 h-3.5 rounded-full bg-slate-950 border-2 border-white ring-2 ring-slate-200 shadow-2xs" />

                              {/* Pill Waktu (Font Orbitron Bold) */}
                              <div>
                                <span className="bg-slate-100 border border-slate-300 text-slate-800 font-orbitron font-bold text-[10px] px-2 py-0.5 rounded-md inline-block tracking-wide">
                                  {act.time}
                                </span>
                              </div>

                              {/* Judul Aktivitas (Font Jakarta Sans Bold) */}
                              <h5 className="font-jakarta font-bold text-xs text-slate-900 leading-snug">
                                {act.activity}
                              </h5>

                              {/* Lokasi dengan Icon Pin Oranye */}
                              {act.location && (
                                <div className="flex items-center gap-1.5 text-[11px] font-jakarta text-slate-500 font-medium">
                                  <MapPin className="w-3.5 h-3.5 text-orange-500 shrink-0" />
                                  <span>{act.location}</span>
                                </div>
                              )}

                              {/* Kotak Tips Panggilan Khusus (Gaya Kotak Kuning Melingkar Sesuai PDF) */}
                              {act.tips && (
                                <div className="bg-[#FEFCE8] border border-[#FDE047] rounded-xl p-2.5 text-[11px] font-jakarta text-amber-950 leading-relaxed shadow-2xs">
                                  <strong className="font-bold text-amber-900">💡 Tips:</strong> {act.tips}
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Rekomendasi Kuliner Autentik Minang (Sesuai Gaya Lembar PDF) */}
                      {day.culinaryRecommendation && (
                        <div className="bg-[#FFFBEB] border border-[#FCD34D] rounded-xl p-3 flex items-start gap-2.5 text-xs font-jakarta text-slate-800 mt-2 shadow-2xs">
                          <span className="text-lg shrink-0">🍲</span>
                          <div className="space-y-0.5">
                            <strong className="font-orbitron font-extrabold text-amber-950 text-[10px] uppercase tracking-wider block">
                              {isEn ? 'AUTHENTIC MINANG CULINARY' : 'KULINER AUTENTIK MINANG'}
                            </strong>
                            <span className="font-normal text-slate-700 text-[11px] leading-relaxed block">
                              {day.culinaryRecommendation}
                            </span>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                {/* CONTAINER KHUSUS PANEL BAWAH: SELALU DI PALING BAWAH KOLOM PALING KANAN (DEKAT FOOTER UNDUH) */}
                <div className="mt-auto pt-2 space-y-4">
                  {/* 3. PANEL BOX "LAYANAN WISATAWAN & LOGISTIK" - 1 KOLOM SAJA DI KOLOM PALING KANAN PALING BAWAH */}
                  <div className="bg-[#0A0F1D] border border-slate-800 rounded-2xl p-4 sm:p-5 text-white space-y-4 shadow-md">
                    <div className="flex items-center justify-between flex-wrap gap-2">
                      <div className="flex items-center gap-2">
                        <span className="bg-[#FFC700] text-slate-950 font-orbitron font-extrabold text-[10px] px-3 py-1 rounded-full uppercase tracking-wider shadow-2xs">
                          ★ MITRA RESMI
                        </span>
                        <h4 className="font-orbitron font-extrabold text-xs sm:text-sm uppercase tracking-wide text-white">
                          {isEn ? 'TOURIST SERVICES & LOGISTICS' : 'LAYANAN WISATAWAN & LOGISTIK'}
                        </h4>
                      </div>
                    </div>

                  <p className="text-xs font-jakarta text-slate-400 font-normal">
                    {isEn
                      ? 'Book official accommodation & transport along West Sumatra routes:'
                      : 'Pesan akomodasi & transportasi resmi rute perjalanan Sumatera Barat:'}
                  </p>

                  {/* Dua Panel Mitra Bertumpuk Vertikal: Traveloka di Atas, Tiket.com di Bawah */}
                  <div className="space-y-3.5 pt-1">
                    
                    {/* PANEL 1: TRAVELOKA (SKY BLUE #0194F3 - LOGO & STYLE RESMI TRAVELOKA) */}
                    <div className="bg-[#0194F3] border border-white/70 rounded-2xl p-4 text-white space-y-3 shadow-md flex flex-col justify-between">
                      <div className="space-y-2">
                        <div className="flex items-center justify-between flex-wrap gap-2">
                          <TravelokaOfficialBadge onSkyBg={true} />
                          <span className="font-orbitron font-bold text-[10px] text-white uppercase tracking-wider bg-white/10 px-2 py-0.5 rounded">
                            OFFICIAL PARTNER
                          </span>
                        </div>
                        <p className="text-[11px] font-jakarta text-sky-100 leading-relaxed font-normal">
                          {isEn
                            ? 'Book luxury stays, airport transfers in Padang, and curated experiences via Traveloka.'
                            : 'Pesan akomodasi hotel, airport transfer BIM & tiket atraksi wisata via Traveloka.'}
                        </p>
                      </div>

                      {/* 4 Tombol Aksi Traveloka (Grid 2x2 dengan Font Jakarta Bold) */}
                      <div className="grid grid-cols-2 gap-2 pt-1">
                        <a
                          href={travelokaHotelUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="bg-white hover:bg-sky-50 active:scale-98 text-[#0194F3] py-2.5 px-2 rounded-xl font-jakarta font-bold text-xs transition-all flex items-center justify-center gap-1 shadow-sm text-center cursor-pointer border border-white"
                        >
                          <span>🏨 Cari Hotel</span>
                          <ExternalLink className="w-3 h-3 shrink-0" />
                        </a>
                        <a
                          href={travelokaCarUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="bg-[#0264A6] hover:bg-[#005088] active:scale-98 text-white border border-white/40 py-2.5 px-2 rounded-xl font-jakarta font-bold text-xs transition-all flex items-center justify-center gap-1 text-center cursor-pointer shadow-xs"
                        >
                          <span>🚗 Sewa Mobil</span>
                          <ExternalLink className="w-3 h-3 shrink-0" />
                        </a>
                        <a
                          href={travelokaFlightUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="bg-[#0264A6] hover:bg-[#005088] active:scale-98 text-white border border-white/40 py-2.5 px-2 rounded-xl font-jakarta font-bold text-xs transition-all flex items-center justify-center gap-1 text-center cursor-pointer shadow-xs"
                        >
                          <span>✈️ Tiket Pesawat</span>
                          <ExternalLink className="w-3 h-3 shrink-0" />
                        </a>
                        <a
                          href={travelokaActivityUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="bg-[#0264A6] hover:bg-[#005088] active:scale-98 text-white border border-white/40 py-2.5 px-2 rounded-xl font-jakarta font-bold text-xs transition-all flex items-center justify-center gap-1 text-center cursor-pointer shadow-xs"
                        >
                          <span>🎟️ Tur & Atraksi</span>
                          <ExternalLink className="w-3 h-3 shrink-0" />
                        </a>
                      </div>
                    </div>

                    {/* PANEL 2: TIKET.COM (ROYAL BLUE #0064D2 DENGAN BORDER EMAS - LOGO & STYLE RESMI TIKET.COM) */}
                    <div className="bg-[#0064D2] border-2 border-[#FEDD00] rounded-2xl p-4 text-white space-y-3 shadow-md flex flex-col justify-between">
                      <div className="space-y-2">
                        <div className="flex items-center justify-between flex-wrap gap-2">
                          <TiketOfficialBadge darkBg={true} />
                          <span className="font-orbitron font-bold text-[10px] text-[#FEDD00] uppercase tracking-wider bg-black/20 px-2 py-0.5 rounded">
                            OFFICIAL PARTNER
                          </span>
                        </div>
                        <p className="text-[11px] font-jakarta text-blue-100 leading-relaxed font-normal">
                          {isEn
                            ? 'Book hotels, car rentals in Padang, tours, and flights via Tiket.com.'
                            : 'Wujudkan rencana liburan dengan pesan hotel, rental mobil Padang & tiket via Tiket.com.'}
                        </p>
                      </div>

                      {/* 4 Tombol Aksi Tiket.com (Grid 2x2 dengan Font Jakarta Bold) */}
                      <div className="grid grid-cols-2 gap-2 pt-1">
                        <a
                          href={tiketHotelUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="bg-[#FEDD00] hover:bg-[#FFE53B] active:scale-98 text-[#002B66] py-2.5 px-2 rounded-xl font-jakarta font-bold text-xs transition-all flex items-center justify-center gap-1 shadow-sm text-center cursor-pointer border border-[#FEDD00]"
                        >
                          <span>🏨 Cari Hotel</span>
                          <ExternalLink className="w-3 h-3 shrink-0" />
                        </a>
                        <a
                          href={tiketCarUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="bg-[#003B85] hover:bg-[#002B66] active:scale-98 text-white border border-white/30 py-2.5 px-2 rounded-xl font-jakarta font-bold text-xs transition-all flex items-center justify-center gap-1 text-center cursor-pointer shadow-xs"
                        >
                          <span>🚗 Sewa Mobil</span>
                          <ExternalLink className="w-3 h-3 shrink-0" />
                        </a>
                        <a
                          href={tiketFlightUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="bg-[#003B85] hover:bg-[#002B66] active:scale-98 text-white border border-white/30 py-2.5 px-2 rounded-xl font-jakarta font-bold text-xs transition-all flex items-center justify-center gap-1 text-center cursor-pointer shadow-xs"
                        >
                          <span>✈️ Tiket Pesawat</span>
                          <ExternalLink className="w-3 h-3 shrink-0" />
                        </a>
                        <a
                          href={tiketActivityUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="bg-[#003B85] hover:bg-[#002B66] active:scale-98 text-white border border-white/30 py-2.5 px-2 rounded-xl font-jakarta font-bold text-xs transition-all flex items-center justify-center gap-1 text-center cursor-pointer shadow-xs"
                        >
                          <span>🎟️ Tur & Atraksi</span>
                          <ExternalLink className="w-3 h-3 shrink-0" />
                        </a>
                      </div>
                    </div>

                  </div>
                </div>

                {/* 4. KEARIFAN LOKAL & ETIKA MINANGKABAU - 1 KOLOM DI PALING BAWAH KOLOM KANAN */}
                {aiResponse.localTips && aiResponse.localTips.length > 0 && (
                  <div className="bg-white border border-gray-200 rounded-2xl p-4 sm:p-5 space-y-2.5 text-xs font-jakarta shadow-2xs">
                    <h4 className="font-orbitron font-bold text-xs uppercase tracking-wider text-amber-800 flex items-center gap-2">
                      <IconCarano size={20} className="shrink-0" />
                      <span>{isEn ? 'Local Wisdom & Cultural Etiquette' : 'Kearifan Lokal & Etika Minangkabau'}</span>
                    </h4>
                    <ul className="space-y-1.5 list-disc list-inside text-slate-600 text-xs leading-relaxed font-normal">
                      {aiResponse.localTips.map((tip, idx) => (
                        <li key={idx}>{tip}</li>
                      ))}
                    </ul>
                  </div>
                )}
                </div>

              </div>
            </div>

          </div>
        </div>

        {/* 5. MODAL FOOTER: ATUR ULANG RENCANA & UNDUH RENCANA PERJALANAN ANDA */}
        <div className="px-5 sm:px-6 py-3.5 bg-white border-t border-gray-200 flex items-center justify-between gap-3 shrink-0">
          <button
            type="button"
            onClick={onClose}
            className="bg-slate-100 hover:bg-slate-200 active:scale-95 text-slate-700 font-jakarta font-bold text-xs py-2.5 px-4 rounded-xl flex items-center gap-2 transition-all cursor-pointer shadow-2xs"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>{isEn ? 'Adjust Plan' : 'Atur Ulang Rencana'}</span>
          </button>

          <button
            type="button"
            onClick={onDownloadPdf}
            disabled={isDownloadingPdf}
            className="bg-slate-950 hover:bg-neutral-800 active:scale-98 text-amber-400 font-orbitron font-extrabold uppercase tracking-wider text-xs py-3 px-6 rounded-xl flex items-center justify-center gap-2.5 transition-all shadow-md cursor-pointer disabled:opacity-50"
          >
            {isDownloadingPdf ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin text-amber-400" />
                <span>{isEn ? 'PREPARING PDF...' : 'MENYIAPKAN PDF...'}</span>
              </>
            ) : (
              <>
                <Download className="w-4 h-4 text-amber-400" />
                <span>{isEn ? 'DOWNLOAD YOUR TRIP PLAN' : 'UNDUH RENCANA PERJALANAN ANDA'}</span>
              </>
            )}
          </button>
        </div>

      </div>
    </div>
  );
};
