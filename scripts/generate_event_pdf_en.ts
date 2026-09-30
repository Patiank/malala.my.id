import * as fs from 'fs';
import * as path from 'path';
import { EVENTS_SCHEDULE, getDirectDriveUrl } from '../src/data/content';
import { EventItem } from '../src/types';

function getEventSortScore(scheduleStr: string = ''): number {
  const s = scheduleStr.toLowerCase();
  if (s.includes('januari') || s.includes('january')) return 10;
  if (s.includes('februari') || s.includes('february') || s.includes('rajab') || s.includes('imlek')) return 20;
  if (s.includes('maret') || s.includes('march')) return 30;
  if (s.includes('april') || s.includes('syawal') || s.includes('langkisau') || s.includes('lebaran')) return 40;
  if (s.includes('mei') || s.includes('may')) return 50;
  if (s.includes('juni') || s.includes('june')) return 60;
  if (s.includes('juli') || s.includes('july') || s.includes('muharram')) return 70;
  if (s.includes('agustus') || s.includes('august')) return 80;
  if (s.includes('september')) return 90;
  if (s.includes('oktober') || s.includes('october')) return 100;
  if (s.includes('november')) return 110;
  if (s.includes('desember') || s.includes('december') || s.includes('pamalayu')) return 120;
  if (s.includes('akhir pekan') || s.includes('sepanjang tahun') || s.includes('bergilir') || s.includes('weekend') || s.includes('year-round')) return 5;
  return 95;
}

export function generateEventHTMLEn(): string {
  let eventItems: EventItem[] = EVENTS_SCHEDULE;

  try {
    const backupPath = path.join(process.cwd(), 'src', 'data', 'firestore_backup.json');
    if (fs.existsSync(backupPath)) {
      const raw = JSON.parse(fs.readFileSync(backupPath, 'utf-8'));
      if (raw.eventItems && raw.eventItems.length > 0) {
        eventItems = raw.eventItems;
      }
    }
  } catch (e) {
    console.warn('Backup parse error in generateEventHTMLEn:', e);
  }

  // Sort events chronologically from January to December
  eventItems = [...eventItems].sort((a, b) => {
    const scoreA = getEventSortScore(a.scheduleEn || a.schedule);
    const scoreB = getEventSortScore(b.scheduleEn || b.schedule);
    if (scoreA !== scoreB) return scoreA - scoreB;
    return (b.isKen ? 1 : 0) - (a.isKen ? 1 : 0);
  });

  // Cover image: Use the spectacular Pacu Jawi event image from the Calendar of Events
  let bgCover = 'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=1200&q=85';
  const pacuJawi = eventItems.find(e => e.id === 'ev1' || (e.title && e.title.toUpperCase().includes('PACU JAWI')));
  if (pacuJawi && pacuJawi.imageUrl) {
    bgCover = getDirectDriveUrl(pacuJawi.imageUrl);
  } else if (eventItems.length > 0 && eventItems[0].imageUrl) {
    bgCover = getDirectDriveUrl(eventItems[0].imageUrl);
  }

  // 1. Chunk overview timeline into pages of 7 items so NO text is ever cut off or squeezed
  const chunkSize = 7;
  const overviewChunks: EventItem[][] = [];
  for (let i = 0; i < eventItems.length; i += chunkSize) {
    overviewChunks.push(eventItems.slice(i, i + chunkSize));
  }

  const overviewPagesHtml = overviewChunks.map((chunk, pageIdx) => `
    <article class="page-card bg-white text-slate-900 rounded-2xl overflow-hidden border border-gray-200 p-5 sm:p-6 flex flex-col justify-between mb-6 shadow-sm">
      <div>
        <div class="border-b border-gray-200 pb-3 mb-3">
          <div class="flex items-center justify-between">
            <span class="text-[10px] font-extrabold font-orbitron uppercase text-red-600 tracking-wider">
              ANNUAL SCHEDULE OVERVIEW • PART ${pageIdx + 1}/${overviewChunks.length}
            </span>
            <span class="text-[9px] bg-slate-100 text-slate-700 font-bold px-2 py-0.5 rounded font-orbitron">
              #${String(pageIdx * chunkSize + 1).padStart(2, '0')} - #${String(Math.min((pageIdx + 1) * chunkSize, eventItems.length)).padStart(2, '0')}
            </span>
          </div>
          <h2 class="font-orbitron font-black text-lg sm:text-xl text-slate-900 uppercase pt-1">
            FESTIVAL AGENDA 2026 (JAN - DEC)
          </h2>
          <p class="text-xs text-gray-500 font-medium pt-0.5">
            Summary of official cultural festivals & attractions across 19 Regencies/Cities.
          </p>
        </div>

        <div class="space-y-2.5">
          ${chunk.map((ev, i) => {
            const globalIndex = pageIdx * chunkSize + i + 1;
            const title = ev.titleEn || ev.title;
            const schedule = ev.scheduleEn || ev.schedule;
            const location = ev.locationEn || ev.location;

            return `
            <div class="flex items-start gap-2.5 p-2.5 rounded-xl border ${ev.isKen ? 'border-red-200 bg-red-50/60' : 'border-gray-100 bg-gray-50'} text-xs">
              <div class="font-orbitron font-black text-xs ${ev.isKen ? 'text-red-700 bg-red-100 border border-red-300' : 'text-slate-700 bg-slate-200 border border-slate-300'} w-7 h-7 rounded-lg flex items-center justify-center shrink-0 mt-0.5">
                ${String(globalIndex).padStart(2, '0')}
              </div>
              <div class="flex-1 min-w-0">
                <div class="flex items-start justify-between gap-2">
                  <div class="flex flex-wrap items-center gap-1.5 flex-1">
                    <h4 class="font-bold text-slate-900 text-xs leading-snug break-words">${title}</h4>
                    ${ev.isKen ? '<span class="bg-red-600 text-white font-extrabold text-[8px] uppercase px-1.5 py-0.5 rounded shrink-0 shadow-xs">KEN 2026</span>' : ''}
                  </div>
                  <span class="font-black text-slate-600 bg-slate-100 border border-slate-200 px-1.5 py-0.5 rounded shadow-sm text-[9px] shrink-0 whitespace-nowrap">Page ${globalIndex}</span>
                </div>
                <div class="text-[10.5px] text-gray-600 flex flex-wrap items-center gap-x-2 gap-y-0.5 pt-1">
                  <span class="font-bold text-blue-900">📅 ${schedule}</span>
                  <span class="text-gray-300">•</span>
                  <span class="text-gray-700 font-medium break-words">📍 ${location}</span>
                </div>
              </div>
            </div>
            `;
          }).join('')}
        </div>
      </div>

      <div class="pt-3 border-t border-gray-100 flex items-center justify-between text-[10px] text-gray-500 mt-3">
        <span class="font-semibold text-amber-600 font-orbitron">MINANGKAOS</span>
        <span>Overview Page ${pageIdx + 1} of ${overviewChunks.length}</span>
      </div>
    </article>
  `).join('');

  // 2. Generate Individual Event Detail Cards
  const eventsHtml = eventItems.map((ev, idx) => {
    const img = getDirectDriveUrl(ev.imageUrl || 'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=800&q=80');
    const title = ev.titleEn || ev.title;
    const schedule = ev.scheduleEn || ev.schedule;
    const location = ev.locationEn || ev.location;
    const description = ev.descriptionEn || ev.description || '';

    return `
    <article class="page-card bg-white text-slate-900 rounded-2xl overflow-hidden border border-gray-200 p-5 flex flex-col justify-between mb-6 shadow-sm">
      <div>
        <div class="flex items-center justify-between pb-2 border-b border-gray-100 text-[11px] font-bold text-gray-500">
          <span class="font-orbitron">CoE 2026 • FESTIVALS & EVENTS</span>
          ${ev.isKen ? `
            <span class="bg-red-600 text-white font-extrabold text-[9px] uppercase px-2 py-0.5 rounded shadow">
              ★ OFFICIAL KEN 2026
            </span>
          ` : `
            <span class="bg-amber-600 text-white font-extrabold text-[9px] uppercase px-2 py-0.5 rounded shadow">
              ANNUAL AGENDA
            </span>
          `}
        </div>

        <div class="h-44 w-full rounded-xl overflow-hidden mt-2.5 relative bg-slate-900 shadow-sm">
          <img src="${img}" alt="${title}" class="w-full h-full object-cover" />
          <div class="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent"></div>
          <div class="absolute bottom-2.5 left-3 right-3 text-white">
            <span class="bg-amber-500 text-black font-extrabold text-[9px] uppercase px-2 py-0.5 rounded shadow">
              ${schedule}
            </span>
            <h3 class="font-orbitron font-extrabold text-sm sm:text-base text-white pt-1 drop-shadow-md leading-snug break-words">
              ${title}
            </h3>
          </div>
        </div>

        <div class="pt-2.5 flex flex-wrap items-center gap-2 text-xs font-bold">
          <span class="bg-blue-50 text-blue-800 border border-blue-200 px-2.5 py-1 rounded-lg">
            📅 ${schedule}
          </span>
          <span class="bg-amber-50 text-amber-900 border border-amber-200 px-2.5 py-1 rounded-lg break-words max-w-full leading-tight">
            📍 ${location}
          </span>
        </div>

        <div class="text-[11.5px] text-gray-700 leading-relaxed pt-2.5 space-y-2">
          ${description.split('\n\n').map(p => `<p class="text-justify">${p}</p>`).join('')}
        </div>

        ${ev.isKen ? `
          <div class="mt-2.5 p-2.5 bg-red-50 rounded-xl border border-red-200">
            <h4 class="font-bold text-[10px] uppercase text-red-900 tracking-wider mb-0.5 flex items-center gap-1">
              🏆 Karisma Event Nusantara (KEN):
            </h4>
            <p class="text-[11px] text-red-950">
              Official national flagship event recognized by the Ministry of Tourism and Creative Economy (Kemenparekraf RI).
            </p>
          </div>
        ` : ''}
      </div>

      <div class="pt-2.5 border-t border-gray-100 flex items-center justify-between text-[10px] text-gray-500 mt-3">
        <span class="font-semibold text-slate-700 font-orbitron">MINANGKAOS</span>
        <span class="font-orbitron font-bold text-gray-400">Page ${idx + 1} of ${eventItems.length}</span>
      </div>
    </article>
    `;
  }).join('');

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>MALALA 2026 - Official Calendar of Events (CoE) West Sumatra</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Orbitron:wght@600;700;800;900&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet">
  <style>
    @page {
      margin: 0 !important;
      size: portrait;
    }
    body {
      font-family: 'Plus Jakarta Sans', sans-serif;
      background-color: #f8fafc;
      margin: 0;
      padding: 0;
      -webkit-print-color-adjust: exact;
      print-color-adjust: exact;
    }
    .font-orbitron {
      font-family: 'Orbitron', sans-serif;
    }
    .page-card {
      page-break-after: always;
      break-after: page;
      min-height: 100vh;
      max-width: 480px;
      margin-left: auto;
      margin-right: auto;
      box-sizing: border-box;
    }
    @media print {
      body {
        background: transparent;
        padding: 0;
        margin: 0;
      }
      .page-card {
        margin: 0 auto;
        box-shadow: none;
        border: none;
        border-radius: 0;
        min-height: 100vh;
      }
    }
  </style>
</head>
<body class="py-6 px-4">
  <div class="max-w-[480px] mx-auto space-y-6">
    
    <!-- 1. COVER PAGE -->
    <article class="page-card text-white rounded-2xl overflow-hidden relative min-h-[98vh] flex flex-col justify-between p-7 bg-slate-900 shadow-xl">
      <img src="${bgCover}" alt="Cover Pacu Jawi CoE 2026" class="absolute inset-0 w-full h-full object-cover" />
      
      <div class="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60 pointer-events-none"></div>

      <div class="relative z-10 space-y-4">
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-2 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full border border-white/20">
            <img src="./minangkaos-logo-compact.png" alt="Logo" class="w-5 h-5 object-contain" />
            <span class="text-amber-400 font-orbitron font-extrabold text-[9px] uppercase tracking-widest">
              MINANGKAOS
            </span>
          </div>
          <span class="bg-black/60 backdrop-blur-md text-white text-[10px] font-bold px-2.5 py-1 rounded-full border border-white/20 tracking-wider">
            MALALA.MY.ID
          </span>
        </div>

        <div class="pt-6">
          <div class="inline-block bg-amber-500 text-black font-orbitron font-black text-[9px] uppercase px-2.5 py-0.5 rounded shadow mb-2 tracking-wider">
            CALENDAR OF EVENTS 2026
          </div>
          <h1 class="font-orbitron font-black text-3xl sm:text-4xl text-white tracking-wide uppercase leading-tight drop-shadow-[0_2px_10px_rgba(0,0,0,0.9)]">
            CALENDAR<br/>OF EVENTS<br/><span class="text-amber-400">2026</span>
          </h1>
          <p class="font-jakarta text-xs text-white pt-2.5 leading-relaxed drop-shadow-[0_1px_5px_rgba(0,0,0,0.9)] max-w-sm">
            Comprehensive Calendar of Minangkabau Cultural Festivals, Traditional Arts & Kharisma Event Nusantara in West Sumatra (January - December 2026).
          </p>
        </div>
      </div>

      <div class="relative z-10 space-y-3">
        <div class="grid grid-cols-2 gap-2 bg-black/60 backdrop-blur-md p-3.5 rounded-xl border border-white/20 text-center">
          <div>
            <div class="font-orbitron font-extrabold text-xl text-amber-400">${eventItems.length}</div>
            <div class="text-[9px] text-gray-200 font-bold uppercase tracking-wider">Total Events</div>
          </div>
          <div>
            <div class="font-orbitron font-extrabold text-xl text-red-400">${eventItems.filter(e => e.isKen).length}</div>
            <div class="text-[9px] text-gray-200 font-bold uppercase tracking-wider">Karisma Events (KEN)</div>
          </div>
        </div>

        <div class="border-t border-white/20 pt-2.5 flex items-center justify-between text-[10px] text-white drop-shadow-[0_1px_3px_rgba(0,0,0,0.9)]">
          <div class="flex items-center gap-1.5 font-bold font-orbitron text-amber-300">
            <img src="./minangkaos-logo-compact.png" alt="Logo" class="w-4 h-4 object-contain" />
            <span>MINANGKAOS</span>
          </div>
          <div class="text-[9px] text-gray-200">Special Edition 2026</div>
        </div>
      </div>
    </article>

    <!-- 2. REGIONAL DISTRIBUTION MAP -->
    <article class="page-card bg-slate-950 text-white rounded-2xl overflow-hidden border border-slate-800 p-6 flex flex-col justify-between mb-6 shadow-xl relative">
      <div class="space-y-4">
        <div class="border-b border-white/15 pb-3">
          <div class="flex items-center justify-between">
            <span class="text-[10px] font-extrabold font-orbitron uppercase text-amber-400 tracking-wider">
              GEOGRAPHIC INFOGRAPHIC
            </span>
            <span class="text-[9px] bg-red-600/80 text-white font-bold px-2 py-0.5 rounded font-orbitron">
              19 REGENCIES & CITIES
            </span>
          </div>
          <h2 class="font-orbitron font-black text-lg sm:text-xl text-white uppercase pt-1">
            WEST SUMATRA EVENT DISTRIBUTION MAP
          </h2>
          <p class="text-xs text-gray-400 font-medium pt-0.5">
            Distribution of cultural festivals & traditional attractions across 4 regions in West Sumatra.
          </p>
        </div>

        <div class="space-y-2.5 text-xs">
          <!-- ZONE 1 -->
          <div class="p-3 bg-white/5 rounded-xl border border-white/10 space-y-1.5">
            <div class="flex items-center justify-between">
              <span class="font-orbitron font-bold text-amber-400 text-xs">1. HIGHLANDS & LUHAK NAN TUO</span>
              <span class="text-[9px] bg-amber-400/20 text-amber-300 px-1.5 py-0.2 rounded font-bold">5 KEN</span>
            </div>
            <ul class="text-[11px] text-gray-300 space-y-1">
              <li>• <strong class="text-white">Tanah Datar:</strong> Pacu Jawi (KEN), Festival Pesona Minangkabau (KEN)</li>
              <li>• <strong class="text-white">Agam & Bukittinggi:</strong> Festival Rakik-Rakik, Pesona Maninjau, Pacu Kudo</li>
              <li>• <strong class="text-white">Limapuluh Kota & Payakumbuh:</strong> Payakumbuh Botuang (KEN), Pasa Harau (KEN), Alek Bakajang (KEN)</li>
            </ul>
          </div>

          <!-- ZONE 2 -->
          <div class="p-3 bg-white/5 rounded-xl border border-white/10 space-y-1.5">
            <div class="flex items-center justify-between">
              <span class="font-orbitron font-bold text-cyan-400 text-xs">2. WEST COAST & MARINE</span>
              <span class="text-[9px] bg-cyan-400/20 text-cyan-300 px-1.5 py-0.2 rounded font-bold">3 KEN</span>
            </div>
            <ul class="text-[11px] text-gray-300 space-y-1">
              <li>• <strong class="text-white">Padang City:</strong> Festival Siti Nurbaya (KEN), Festival Muaro Padang, Cap Go Meh</li>
              <li>• <strong class="text-white">Pariaman & Padang Pariaman:</strong> Festival Tabuik (KEN), Pesona Nyarai</li>
              <li>• <strong class="text-white">South Pesisir:</strong> Festival Langkisau & Paragliding Championship</li>
              <li>• <strong class="text-white">Mentawai Islands:</strong> Festival Pesona Mentawai (KEN)</li>
            </ul>
          </div>

          <!-- ZONE 3 -->
          <div class="p-3 bg-white/5 rounded-xl border border-white/10 space-y-1.5">
            <div class="flex items-center justify-between">
              <span class="font-orbitron font-bold text-emerald-400 text-xs">3. LAKES & GEOPARK HERITAGE</span>
              <span class="text-[9px] bg-emerald-400/20 text-emerald-300 px-1.5 py-0.2 rounded font-bold">2 KEN</span>
            </div>
            <ul class="text-[11px] text-gray-300 space-y-1">
              <li>• <strong class="text-white">Solok City & Regency:</strong> Rang Solok Baralek Gadang (KEN), 5 Lakes Festival</li>
              <li>• <strong class="text-white">Sawahlunto City:</strong> SISCA (KEN), SIMFes (UNESCO World Heritage)</li>
              <li>• <strong class="text-white">Cross-Region:</strong> Tour de Singkarak (TdS) World Cycling Championship</li>
            </ul>
          </div>

          <!-- ZONE 4 -->
          <div class="p-3 bg-white/5 rounded-xl border border-white/10 space-y-1.5">
            <div class="flex items-center justify-between">
              <span class="font-orbitron font-bold text-rose-400 text-xs">4. BORDERLANDS & ANCIENT HISTORY</span>
              <span class="text-[9px] bg-rose-400/20 text-rose-300 px-1.5 py-0.2 rounded font-bold">MURI Record</span>
            </div>
            <ul class="text-[11px] text-gray-300 space-y-1">
              <li>• <strong class="text-white">West Pasaman:</strong> Maapam Pasaman Traditional Festival (MURI Record)</li>
              <li>• <strong class="text-white">Dharmasraya:</strong> Pamalayu Cultural Festival (Padang Roco Temple Complex)</li>
            </ul>
          </div>
        </div>
      </div>

      <div class="pt-3 border-t border-white/15 flex items-center justify-between text-[10px] text-gray-400 mt-2">
        <span class="font-semibold text-amber-400 font-orbitron">MINANGKAOS</span>
        <span>Geographic Map Page</span>
      </div>
    </article>

    <!-- 3. TIMELINE SUMMARY TABLE PAGES -->
    ${overviewPagesHtml}

    <!-- 4. INDIVIDUAL EVENT CARDS -->
    ${eventsHtml}

    <!-- 5. CLOSING & VISITOR GUIDE PAGE -->
    <article class="page-card bg-slate-900 text-white rounded-2xl overflow-hidden border border-slate-800 p-6 flex flex-col justify-between mb-6 shadow-xl relative">
      <div class="space-y-4">
        <div class="border-b border-white/20 pb-3">
          <span class="text-[10px] font-extrabold font-orbitron uppercase text-amber-400 tracking-wider">
            TRAVEL GUIDE & ETIQUETTE
          </span>
          <h2 class="font-orbitron font-black text-xl text-white uppercase pt-0.5">
            FESTIVAL VISITOR TIPS
          </h2>
          <p class="text-xs text-gray-300 font-medium pt-1">
            Practical guide to experiencing Minangkabau cultural attractions safely and memorably.
          </p>
        </div>

        <div class="space-y-3 text-xs text-gray-200">
          <div class="p-3 bg-white/10 rounded-xl border border-white/10 space-y-1">
            <h4 class="font-bold text-amber-300 text-xs">1. Dress Code & Local Customs</h4>
            <p class="text-[11px] leading-relaxed text-gray-300">
              Wear modest, polite, and culturally respectful attire. During sacred traditional ceremonies (Batagak Penghulu, Makan Bajamba), respect the solemn procession and follow the guidance of village elders/mamak.
            </p>
          </div>

          <div class="p-3 bg-white/10 rounded-xl border border-white/10 space-y-1">
            <h4 class="font-bold text-amber-300 text-xs">2. Photography Tips for Pacu Jawi & Tabuik</h4>
            <p class="text-[11px] leading-relaxed text-gray-300">
              Use a telephoto or zoom lens and protect your camera gear from mud splatters during Pacu Jawi. Always stay behind the marked safety line along the cattle racing course.
            </p>
          </div>

          <div class="p-3 bg-white/10 rounded-xl border border-white/10 space-y-1">
            <h4 class="font-bold text-amber-300 text-xs">3. Accommodation & Transportation</h4>
            <p class="text-[11px] leading-relaxed text-gray-300">
              Reserve hotel rooms or tourism village homestays well ahead of national KEN festival dates to ensure availability during peak visitor periods.
            </p>
          </div>
        </div>
      </div>

      <div class="border-t border-white/20 pt-4 text-center space-y-1.5">
        <div class="font-orbitron font-bold text-xs text-amber-400">MALALA.MY.ID</div>
        <div class="text-[10px] text-gray-400">Digital Tourism & Culture Directory</div>
        <div class="text-[9px] text-gray-500">MINANGKAOS © 2026</div>
      </div>
    </article>

    <!-- 6. OFFICIAL BACK COVER -->
    <article class="page-card text-white rounded-2xl overflow-hidden relative min-h-[98vh] flex flex-col justify-between p-7 bg-gradient-to-b from-slate-950 via-slate-900 to-black shadow-2xl border border-slate-800">
      <div class="relative z-10 space-y-4">
        <div class="flex items-center justify-between border-b border-white/20 pb-3">
          <span class="bg-amber-400 text-black font-extrabold text-[9px] uppercase px-2.5 py-1 rounded font-orbitron tracking-widest">
            MINANGKAOS SPECIAL EDITION
          </span>
          <span class="text-gray-400 font-orbitron text-[9px] font-bold">
            2026 EDITION
          </span>
        </div>

        <div class="pt-6 text-center space-y-2">
          <span class="text-amber-400 font-orbitron font-bold text-xs tracking-widest uppercase block">
            VISIT BEAUTIFUL WEST SUMATRA
          </span>
          <h2 class="font-orbitron font-black text-2xl sm:text-3xl text-white uppercase tracking-wider leading-tight">
            ALAM TAKAMBANG<br/><span class="text-amber-400">JADI GURU</span>
          </h2>
          <p class="text-xs text-gray-300 max-w-xs mx-auto italic pt-2 leading-relaxed">
            "The majesty of nature intertwined with the timeless wisdom of Minangkabau tradition. Every corner of the land tells a story, every festival ignites the soul."
          </p>
        </div>
      </div>

      <!-- CREDENTIALS & CONTACT INFO -->
      <div class="relative z-10 space-y-4">
        <div class="bg-white/5 backdrop-blur-md p-4 rounded-xl border border-white/10 space-y-3">
          <div class="text-center pb-2 border-b border-white/10">
            <span class="font-orbitron font-extrabold text-sm text-amber-400">MALALA.MY.ID</span>
            <div class="text-[10px] text-gray-300">Digital Tourism & Culture Directory</div>
          </div>

          <div class="grid grid-cols-2 gap-2.5 text-[10px] text-gray-300 text-center">
            <div class="text-center p-2 rounded-lg bg-white/5 border border-white/5 space-y-0.5">
              <div class="font-bold text-white uppercase text-[9px] tracking-wider text-center">Instagram:</div>
              <div class="text-amber-300 font-semibold text-center">@minangkaos</div>
            </div>
            <div class="text-center p-2 rounded-lg bg-white/5 border border-white/5 space-y-0.5">
              <div class="font-bold text-white uppercase text-[9px] tracking-wider text-center">Website:</div>
              <div class="text-amber-300 font-semibold text-center">malala.my.id</div>
            </div>
            <div class="col-span-2 pt-1 text-center">
              <div class="font-bold text-white uppercase text-[9px] tracking-wider text-center">Presented By:</div>
              <div class="text-amber-400 font-orbitron font-bold text-xs text-center pt-0.5">MINANGKAOS</div>
              <div class="text-[9px] text-gray-400 text-center">West Sumatra, Indonesia</div>
            </div>
          </div>
        </div>

        <div class="border-t border-white/20 pt-3 text-center text-[9px] text-gray-400 space-y-1">
          <div class="font-bold text-white tracking-widest uppercase">MALALA 2026 • MINANGKAOS</div>
          <div>All Rights Reserved © 2026.</div>
        </div>
      </div>
    </article>

  </div>
</body>
</html>
  `;
}

export function generateAndSaveEventHtmlPdfEn() {
  const html = generateEventHTMLEn();
  const finalHtml = html.replace(/src="\/images\//g, 'src="./images/');
  const outPath = path.join(process.cwd(), 'public', 'event_calendar_printable_en.html');
  fs.writeFileSync(outPath, finalHtml, 'utf-8');
  console.log(`✅ Event Calendar HTML template English successfully created at: ${outPath}`);
}

// Standalone execution
generateAndSaveEventHtmlPdfEn();
