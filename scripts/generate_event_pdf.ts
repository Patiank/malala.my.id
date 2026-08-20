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
  if (s.includes('akhir pekan') || s.includes('sepanjang tahun') || s.includes('bergilir')) return 5;
  return 95;
}

export function generateEventHTML(): string {
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
    console.warn('Backup parse error in generateEventHTML:', e);
  }

  // Sort events chronologically from January to December
  eventItems = [...eventItems].sort((a, b) => {
    const scoreA = getEventSortScore(a.schedule);
    const scoreB = getEventSortScore(b.schedule);
    if (scoreA !== scoreB) return scoreA - scoreB;
    return (b.isKen ? 1 : 0) - (a.isKen ? 1 : 0);
  });

  // Cover image: Use the spectacular Pacu Jawi event image from the Calendar of Events
  let bgCover = 'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=1200&q=85';
  const pacuJawi = eventItems.find(e => e.id === 'ev1' || e.title.toUpperCase().includes('PACU JAWI'));
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
              IKHTISAR JADWAL TAHUNAN • BAGIAN ${pageIdx + 1}/${overviewChunks.length}
            </span>
            <span class="text-[9px] bg-slate-100 text-slate-700 font-bold px-2 py-0.5 rounded font-orbitron">
              #${String(pageIdx * chunkSize + 1).padStart(2, '0')} - #${String(Math.min((pageIdx + 1) * chunkSize, eventItems.length)).padStart(2, '0')}
            </span>
          </div>
          <h2 class="font-orbitron font-black text-lg sm:text-xl text-slate-900 uppercase pt-1">
            AGENDA FESTIVAL 2026 (JAN - DES)
          </h2>
          <p class="text-xs text-gray-500 font-medium pt-0.5">
            Rangkuman kalender festival budaya & atraksi resmi di 19 Kabupaten/Kota.
          </p>
        </div>

        <div class="space-y-2.5">
          ${chunk.map((ev, i) => {
            const globalIndex = pageIdx * chunkSize + i + 1;
            return `
            <div class="flex items-start gap-2.5 p-2.5 rounded-xl border ${ev.isKen ? 'border-red-200 bg-red-50/60' : 'border-gray-100 bg-gray-50'} text-xs">
              <div class="font-orbitron font-black text-xs ${ev.isKen ? 'text-red-700 bg-red-100 border border-red-300' : 'text-slate-700 bg-slate-200 border border-slate-300'} w-7 h-7 rounded-lg flex items-center justify-center shrink-0 mt-0.5">
                ${String(globalIndex).padStart(2, '0')}
              </div>
              <div class="flex-1 min-w-0">
                <div class="flex items-start gap-1.5 justify-between">
                  <h4 class="font-bold text-slate-900 text-xs leading-snug break-words">${ev.title}</h4>
                  ${ev.isKen ? '<span class="bg-red-600 text-white font-extrabold text-[8px] uppercase px-1.5 py-0.5 rounded shrink-0 shadow-xs ml-1">KEN 2026</span>' : ''}
                </div>
                <div class="text-[10.5px] text-gray-600 flex flex-wrap items-center gap-x-2 gap-y-0.5 pt-1">
                  <span class="font-bold text-blue-900">📅 ${ev.schedule}</span>
                  <span class="text-gray-300">•</span>
                  <span class="text-gray-700 font-medium break-words">📍 ${ev.location}</span>
                </div>
              </div>
            </div>
            `;
          }).join('')}
        </div>
      </div>

      <div class="pt-3 border-t border-gray-100 flex items-center justify-between text-[10px] text-gray-500 mt-3">
        <span class="font-semibold text-slate-700">Dinas Pariwisata Sumatera Barat</span>
        <span>Halaman Ikhtisar ${pageIdx + 1} dari ${overviewChunks.length}</span>
      </div>
    </article>
  `).join('');

  // 2. Generate Individual Event Detail Cards
  const eventsHtml = eventItems.map((ev, idx) => {
    const img = getDirectDriveUrl(ev.imageUrl || 'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=800&q=80');
    return `
    <article class="page-card bg-white text-slate-900 rounded-2xl overflow-hidden border border-gray-200 p-5 flex flex-col justify-between mb-6 shadow-sm">
      <div>
        <div class="flex items-center justify-between pb-2 border-b border-gray-100 text-[11px] font-bold text-gray-500">
          <span class="font-orbitron">CoE 2026 • FESTIVAL & EVENT RESMI</span>
          ${ev.isKen ? `
            <span class="bg-red-600 text-white font-extrabold text-[9px] uppercase px-2 py-0.5 rounded shadow">
              ★ OFFICIAL KEN 2026
            </span>
          ` : `
            <span class="bg-amber-600 text-white font-extrabold text-[9px] uppercase px-2 py-0.5 rounded shadow">
              AGENDA TAHUNAN
            </span>
          `}
        </div>

        <div class="h-44 w-full rounded-xl overflow-hidden mt-2.5 relative bg-slate-900 shadow-sm">
          <img src="${img}" alt="${ev.title}" class="w-full h-full object-cover" />
          <div class="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent"></div>
          <div class="absolute bottom-2.5 left-3 right-3 text-white">
            <span class="bg-amber-500 text-black font-extrabold text-[9px] uppercase px-2 py-0.5 rounded shadow">
              ${ev.schedule}
            </span>
            <h3 class="font-orbitron font-extrabold text-sm sm:text-base text-white pt-1 drop-shadow-md leading-snug break-words">
              ${ev.title}
            </h3>
          </div>
        </div>

        <div class="pt-2.5 flex flex-wrap items-center gap-2 text-xs font-bold">
          <span class="bg-blue-50 text-blue-800 border border-blue-200 px-2.5 py-1 rounded-lg">
            📅 ${ev.schedule}
          </span>
          <span class="bg-amber-50 text-amber-900 border border-amber-200 px-2.5 py-1 rounded-lg break-words max-w-full leading-tight">
            📍 ${ev.location}
          </span>
        </div>

        <div class="text-[11.5px] text-gray-700 leading-relaxed pt-2.5 space-y-2">
          ${(ev.description || '').split('\n\n').map(p => `<p class="text-justify">${p}</p>`).join('')}
        </div>

        ${ev.isKen ? `
          <div class="mt-2.5 p-2.5 bg-red-50 rounded-xl border border-red-200">
            <h4 class="font-bold text-[10px] uppercase text-red-900 tracking-wider mb-0.5 flex items-center gap-1">
              🏆 Karisma Event Nusantara (KEN):
            </h4>
            <p class="text-[11px] text-red-950">
              Event unggulan bertaraf nasional oleh Kementerian Pariwisata dan Ekonomi Kreatif (Kemenparekraf RI).
            </p>
          </div>
        ` : ''}
      </div>

      <div class="pt-2.5 border-t border-gray-100 flex items-center justify-between text-[10px] text-gray-500 mt-3">
        <span class="font-semibold text-slate-700">Dinas Pariwisata Sumatera Barat</span>
        <span class="font-orbitron font-bold text-gray-400">#${String(idx + 1).padStart(2, '0')} / ${eventItems.length}</span>
      </div>
    </article>
    `;
  }).join('');

  return `
<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <title>MALALA 2026 - Calendar of Events (CoE) Resmi Sumatera Barat</title>
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
    
    <!-- 1. COVER PAGE (USING ICONIC PACU JAWI EVENT PHOTOGRAPHY) -->
    <article class="page-card text-white rounded-2xl overflow-hidden relative min-h-[98vh] flex flex-col justify-between p-7 bg-slate-900 shadow-xl">
      <img src="${bgCover}" alt="Cover Pacu Jawi CoE 2026" class="absolute inset-0 w-full h-full object-cover" />
      <div class="absolute inset-0 bg-gradient-to-b from-black/80 via-black/55 to-black/95"></div>
      
      <div class="relative z-10 space-y-4">
        <div class="flex items-center justify-between">
          <span class="inline-block bg-red-600 text-white font-extrabold text-[9px] uppercase px-3 py-1 rounded-full tracking-widest shadow-md">
            PUBLIKASI RESMI CoE 2026
          </span>
          <span class="text-white text-[10px] font-bold drop-shadow-[0_1px_3px_rgba(0,0,0,0.9)] tracking-wider">
            MALALA.MY.ID
          </span>
        </div>

        <div class="pt-8">
          <div class="flex items-center gap-2 pb-1">
            <span class="text-amber-400 font-orbitron font-extrabold text-xs tracking-widest uppercase">
              ★ OFFICIAL EVENT CALENDAR ★
            </span>
          </div>
          <h1 class="font-orbitron font-black text-3xl sm:text-4xl text-white tracking-wide uppercase leading-tight drop-shadow-lg">
            CALENDAR<br/>OF EVENTS<br/><span class="text-amber-400">2026</span>
          </h1>
          <p class="font-jakarta text-xs text-gray-200 pt-3 leading-relaxed drop-shadow">
            Panduan Resmi Kalender Festival Budaya, Seni Tradisi Minangkabau, & Kharisma Event Nusantara (KEN) di Sumatera Barat (Januari - Desember 2026).
          </p>
        </div>
      </div>

      <div class="relative z-10 space-y-4">
        <div class="grid grid-cols-2 gap-2 bg-black/70 backdrop-blur-md p-3.5 rounded-xl border border-white/20 text-center">
          <div>
            <div class="font-orbitron font-extrabold text-xl text-amber-400">${eventItems.length}</div>
            <div class="text-[9px] text-gray-300 font-bold uppercase tracking-wider">Total Event Resmi</div>
          </div>
          <div>
            <div class="font-orbitron font-extrabold text-xl text-red-400">${eventItems.filter(e => e.isKen).length}</div>
            <div class="text-[9px] text-gray-300 font-bold uppercase tracking-wider">Karisma Event (KEN)</div>
          </div>
        </div>

        <div class="border-t border-white/20 pt-3 text-center text-[10px] text-gray-300">
          <div class="font-bold text-white tracking-wider uppercase">DINAS PARIWISATA PROVINSI SUMATERA BARAT</div>
          <div class="text-[9px] text-gray-400 mt-0.5">Visit Beautiful West Sumatra © 2026</div>
        </div>
      </div>
    </article>

    <!-- 2. TIMELINE SUMMARY TABLE PAGES (CHRONOLOGICALLY SORTED JAN - DEC) -->
    ${overviewPagesHtml}

    <!-- 3. INDIVIDUAL EVENT CARDS -->
    ${eventsHtml}

    <!-- 4. CLOSING & VISITOR GUIDE PAGE -->
    <article class="page-card bg-slate-900 text-white rounded-2xl overflow-hidden border border-slate-800 p-6 flex flex-col justify-between mb-6 shadow-xl relative">
      <div class="space-y-4">
        <div class="border-b border-white/20 pb-3">
          <span class="text-[10px] font-extrabold font-orbitron uppercase text-amber-400 tracking-wider">
            PANDUAN & ETIKA WISATA
          </span>
          <h2 class="font-orbitron font-black text-xl text-white uppercase pt-0.5">
            TIPS MENGHADIRI FESTIVAL
          </h2>
          <p class="text-xs text-gray-300 font-medium pt-1">
            Panduan praktis menikmati keseruan atraksi budaya Minangkabau secara aman dan berkesan.
          </p>
        </div>

        <div class="space-y-3 text-xs text-gray-200">
          <div class="p-3 bg-white/10 rounded-xl border border-white/10 space-y-1">
            <h4 class="font-bold text-amber-300 text-xs">1. Busana & Etika Adat</h4>
            <p class="text-[11px] leading-relaxed text-gray-300">
              Kenakan pakaian sopan dan tertutup. Saat upacara adat sakral (Batagak Penghulu, Makan Bajamba), hormati prosesi dan petunjuk mamak/tetua nagari.
            </p>
          </div>

          <div class="p-3 bg-white/10 rounded-xl border border-white/10 space-y-1">
            <h4 class="font-bold text-amber-300 text-xs">2. Tips Fotografi Pacu Jawi & Tabuik</h4>
            <p class="text-[11px] leading-relaxed text-gray-300">
              Gunakan lensa tele/zoom dan pelindung kamera dari cipratan lumpur saat memotret Pacu Jawi. Berdirilah di luar garis lintasan aman lari sapi.
            </p>
          </div>

          <div class="p-3 bg-white/10 rounded-xl border border-white/10 space-y-1">
            <h4 class="font-bold text-amber-300 text-xs">3. Akomodasi & Transportasi</h4>
            <p class="text-[11px] leading-relaxed text-gray-300">
              Pesan penginapan atau homestay desa wisata jauh hari sebelum tanggal festival nasional KEN untuk memastikan ketersediaan kamar.
            </p>
          </div>
        </div>
      </div>

      <div class="border-t border-white/20 pt-4 text-center space-y-1.5">
        <div class="font-orbitron font-bold text-xs text-amber-400">MALALA.MY.ID</div>
        <div class="text-[10px] text-gray-400">Portal Pariwisata Resmi Sumatera Barat</div>
        <div class="text-[9px] text-gray-500">Dinas Pariwisata Provinsi Sumatera Barat © 2026</div>
      </div>
    </article>

  </div>
</body>
</html>
  `;
}

// If run standalone:
if (process.argv[1] && process.argv[1].endsWith('generate_event_pdf.ts')) {
  const html = generateEventHTML();
  const outPath = path.join(process.cwd(), 'public', 'event_calendar_printable.html');
  fs.writeFileSync(outPath, html, 'utf-8');
  console.log(`✅ Event Calendar HTML template berhasil dibuat di: ${outPath}`);
}
