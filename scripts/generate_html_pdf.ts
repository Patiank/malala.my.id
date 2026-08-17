import * as fs from 'fs';
import * as path from 'path';
import { DESTINATIONS, CULTURE_ITEMS, CULINARY_ITEMS, EVENTS_SCHEDULE, BG_IMAGE_2 } from '../src/data/content';
import { execSync } from 'child_process';

function generateFullHTML(): string {
  const destHtml = DESTINATIONS.map((dest, idx) => `
    <article class="page-card bg-white text-slate-900 rounded-2xl overflow-hidden border border-gray-200 p-5 flex flex-col justify-between mb-6">
      <div>
        <div class="flex items-center justify-between pb-2.5 border-b border-gray-100 text-[11px] font-bold text-gray-500">
          <span>MALALA 2026 • ${dest.regency || 'SUMATERA BARAT'}</span>
          <span class="text-red-600 uppercase font-extrabold">${dest.category}</span>
        </div>

        <div class="h-48 w-full rounded-xl overflow-hidden mt-3 relative bg-slate-900 shadow-sm">
          <img src="${dest.imageUrl}" alt="${dest.title}" class="w-full h-full object-cover" />
          <div class="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent"></div>
          <div class="absolute bottom-3 left-3 text-white">
            <span class="bg-white text-black font-extrabold text-[9px] uppercase px-2 py-0.5 rounded shadow">
              ${dest.category}
            </span>
            <h3 class="font-orbitron font-extrabold text-lg text-white pt-1 drop-shadow-md leading-tight">
              ${dest.title}
            </h3>
          </div>
        </div>

        <div class="pt-2.5 flex items-center gap-1.5 text-xs font-bold text-red-600">
          <span>📍 ${dest.locationDetails || dest.regency}</span>
        </div>

        <div class="text-xs text-gray-700 leading-relaxed pt-2 space-y-2">
          ${dest.description.split('\n\n').map(p => `<p>${p}</p>`).join('')}
        </div>

        ${dest.highlights && dest.highlights.length > 0 ? `
          <div class="mt-3 p-3 bg-gray-50 rounded-xl border border-gray-200">
            <h4 class="font-bold text-[10px] uppercase text-slate-900 tracking-wider mb-1.5">Daya Tarik Utama:</h4>
            <ul class="space-y-1 text-xs text-gray-700">
              ${dest.highlights.map(h => `<li class="flex items-center gap-1.5"><span class="text-green-600 font-bold">✓</span> <span>${h}</span></li>`).join('')}
            </ul>
          </div>
        ` : ''}
      </div>

      ${dest.bestTime ? `
        <div class="pt-2.5 border-t border-gray-100 flex items-center justify-between text-[10px] text-gray-500 mt-4">
          <span>Waktu Terbaik: <strong class="text-black">${dest.bestTime}</strong></span>
          <span class="text-gray-400">#${idx + 1}</span>
        </div>
      ` : ''}
    </article>
  `).join('');

  const cultHtml = CULTURE_ITEMS.map((cult, idx) => `
    <article class="page-card bg-white text-slate-900 rounded-2xl overflow-hidden border border-amber-200 p-5 flex flex-col justify-between mb-6">
      <div>
        <div class="flex items-center justify-between pb-2.5 border-b border-gray-100 text-[11px] font-bold text-gray-500">
          <span>MALALA 2026 • WARISAN BUDAYA</span>
          <span class="text-amber-700 uppercase font-extrabold">${cult.category}</span>
        </div>

        <div class="h-48 w-full rounded-xl overflow-hidden mt-3 relative bg-amber-950 shadow-sm">
          <img src="${cult.imageUrl}" alt="${cult.title}" class="w-full h-full object-cover" />
          <div class="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent"></div>
          <div class="absolute bottom-3 left-3 text-white">
            <span class="bg-amber-500 text-white font-extrabold text-[9px] uppercase px-2 py-0.5 rounded shadow">
              ${cult.category}
            </span>
            <h3 class="font-orbitron font-extrabold text-lg text-white pt-1 drop-shadow-md leading-tight">
              ${cult.title}
            </h3>
          </div>
        </div>

        <div class="pt-2.5 flex items-center gap-1.5 text-xs font-bold text-amber-800">
          <span>🏛️ Asal: ${cult.origin}</span>
        </div>

        <div class="text-xs text-gray-700 leading-relaxed pt-2 space-y-2">
          ${cult.description.split('\n\n').map(p => `<p>${p}</p>`).join('')}
        </div>

        ${cult.philosophy ? `
          <div class="mt-3 p-3 bg-amber-50 rounded-xl border border-amber-200">
            <h4 class="font-bold text-[10px] uppercase text-amber-900 tracking-wider mb-1">Falsafah & Makna Adat:</h4>
            <p class="text-xs text-amber-950 italic">"${cult.philosophy}"</p>
          </div>
        ` : ''}
      </div>

      <div class="pt-2.5 border-t border-gray-100 flex items-center justify-between text-[10px] text-gray-500 mt-4">
        <span>Kategori: <strong class="text-amber-800">${cult.category}</strong></span>
        <span class="text-gray-400">#${DESTINATIONS.length + idx + 1}</span>
      </div>
    </article>
  `).join('');

  const culHtml = CULINARY_ITEMS.map((cul, idx) => `
    <article class="page-card bg-white text-slate-900 rounded-2xl overflow-hidden border border-rose-200 p-5 flex flex-col justify-between mb-6">
      <div>
        <div class="flex items-center justify-between pb-2.5 border-b border-gray-100 text-[11px] font-bold text-gray-500">
          <span>MALALA 2026 • GASTRONOMI MINANG</span>
          <span class="text-rose-600 uppercase font-extrabold">${cul.category}</span>
        </div>

        <div class="h-48 w-full rounded-xl overflow-hidden mt-3 relative bg-rose-950 shadow-sm">
          <img src="${cul.imageUrl}" alt="${cul.title}" class="w-full h-full object-cover" />
          <div class="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent"></div>
          <div class="absolute bottom-3 left-3 text-white">
            <span class="bg-rose-600 text-white font-extrabold text-[9px] uppercase px-2 py-0.5 rounded shadow">
              ${cul.category}
            </span>
            <h3 class="font-orbitron font-extrabold text-lg text-white pt-1 drop-shadow-md leading-tight">
              ${cul.title}
            </h3>
          </div>
        </div>

        <div class="pt-2.5 flex items-center gap-1.5 text-xs font-bold text-rose-600">
          <span>🍽️ Asal: ${cul.origin}</span>
        </div>

        <div class="text-xs text-gray-700 leading-relaxed pt-2 space-y-2">
          ${cul.description.split('\n\n').map(p => `<p>${p}</p>`).join('')}
        </div>

        <div class="mt-3 p-3 bg-rose-50 rounded-xl border border-rose-200">
          <h4 class="font-bold text-[10px] uppercase text-rose-900 tracking-wider mb-1">Bahan & Rempah Utama:</h4>
          <p class="text-xs text-rose-950 mb-1.5">${(cul.mainIngredients || []).join(', ')}</p>
          ${cul.tasteProfile ? `<p class="text-[11px] text-rose-900 font-bold">Rasa: ${cul.tasteProfile}</p>` : ''}
        </div>
      </div>

      <div class="pt-2.5 border-t border-gray-100 flex items-center justify-between text-[10px] text-gray-500 mt-4">
        <span>Asal: <strong class="text-rose-800">${cul.origin}</strong></span>
        <span class="text-gray-400">#${DESTINATIONS.length + CULTURE_ITEMS.length + idx + 1}</span>
      </div>
    </article>
  `).join('');

  const evHtml = EVENTS_SCHEDULE.map((ev, idx) => `
    <article class="page-card bg-white text-slate-900 rounded-2xl overflow-hidden border ${ev.isKen ? 'border-red-300 ring-1 ring-red-200' : 'border-gray-200'} p-5 flex flex-col justify-between mb-6">
      <div>
        <div class="flex items-center justify-between pb-2.5 border-b border-gray-100 text-[11px] font-bold text-gray-500">
          <span>MALALA 2026 • CALENDAR OF EVENTS</span>
          ${ev.isKen ? '<span class="bg-red-600 text-white text-[9px] font-extrabold uppercase px-2 py-0.5 rounded">KARISMA EVENT NUSANTARA</span>' : '<span class="text-gray-600 uppercase font-extrabold">Festival Resmi</span>'}
        </div>

        <div class="h-48 w-full rounded-xl overflow-hidden mt-3 relative bg-slate-900 shadow-sm">
          <img src="${ev.imageUrl}" alt="${ev.title}" class="w-full h-full object-cover" />
          <div class="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent"></div>
          <div class="absolute bottom-3 left-3 text-white">
            <span class="bg-red-600 text-white font-extrabold text-[9px] uppercase px-2 py-0.5 rounded shadow">
              ${ev.schedule}
            </span>
            <h3 class="font-orbitron font-extrabold text-lg text-white pt-1 drop-shadow-md leading-tight">
              ${ev.title}
            </h3>
          </div>
        </div>

        <div class="pt-2.5 flex items-center gap-1.5 text-xs font-bold text-red-600">
          <span>📅 ${ev.schedule} • 📍 ${ev.location}</span>
        </div>

        <div class="text-xs text-gray-700 leading-relaxed pt-2 space-y-2">
          ${ev.description.split('\n\n').map(p => `<p>${p}</p>`).join('')}
        </div>

        ${ev.isKen ? `
          <div class="mt-3 p-3 bg-red-50 rounded-xl border border-red-200">
            <h4 class="font-bold text-[10px] uppercase text-red-900 tracking-wider mb-1">Karisma Event Nusantara (KEN):</h4>
            <p class="text-xs text-red-950">Masuk dalam kalender pariwisata resmi Kemenparekraf RI.</p>
          </div>
        ` : ''}
      </div>

      <div class="pt-2.5 border-t border-gray-100 flex items-center justify-between text-[10px] text-gray-500 mt-4">
        <span>Lokasi: <strong class="text-black">${ev.location}</strong></span>
        <span class="text-gray-400">#${DESTINATIONS.length + CULTURE_ITEMS.length + CULINARY_ITEMS.length + idx + 1}</span>
      </div>
    </article>
  `).join('');

  return `
<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <title>MALALA 2026 - E-Booklet Panduan Pariwisata Sumatera Barat</title>
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
    <!-- COVER -->
    <article class="page-card text-white rounded-2xl overflow-hidden relative min-h-[98vh] flex flex-col justify-between p-7 bg-slate-900">
      <img src="${BG_IMAGE_2}" alt="Cover" class="absolute inset-0 w-full h-full object-cover" />
      
      <div class="relative z-10 space-y-4">
        <div class="flex items-center justify-between">
          <span class="inline-block bg-red-600 text-white font-extrabold text-[9px] uppercase px-2.5 py-1 rounded tracking-widest shadow-md">
            PUBLIKASI RESMI 2026
          </span>
          <span class="text-white text-[10px] font-bold drop-shadow-[0_1px_3px_rgba(0,0,0,0.9)]">
            MALALA.MY.ID
          </span>
        </div>

        <div class="space-y-1 pt-1">
          <h1 class="font-orbitron font-extrabold text-4xl text-white tracking-wide drop-shadow-[0_2px_10px_rgba(0,0,0,0.9)] leading-tight">
            MALALA<br/>2026
          </h1>
          <p class="font-orbitron font-bold text-xs text-white drop-shadow-[0_1px_6px_rgba(0,0,0,0.9)] tracking-wide">
            PANDUAN LENGKAP PARIWISATA & BUDAYA RANAH MINANG
          </p>
        </div>
      </div>

      <div class="relative z-10 mt-auto space-y-2 pt-16">
        <p class="text-white drop-shadow-[0_1px_5px_rgba(0,0,0,0.9)] text-xs leading-relaxed">
          ${DESTINATIONS.length} Destinasi · ${CULTURE_ITEMS.length} Budaya · ${CULINARY_ITEMS.length} Kuliner · ${EVENTS_SCHEDULE.length} Event
        </p>
        <div class="pt-3 border-t border-white/50 flex items-center justify-between text-[10px] text-white drop-shadow-[0_1px_4px_rgba(0,0,0,0.9)]">
          <span>Dinas Pariwisata Sumatera Barat</span>
          <span class="font-bold">E-Booklet Digital</span>
        </div>
      </div>
    </article>

    <!-- CONTENT -->
    ${destHtml}
    ${cultHtml}
    ${culHtml}
    ${evHtml}
  </div>
</body>
</html>
  `;
}

const htmlContent = generateFullHTML();
const htmlPath = path.join(process.cwd(), 'public', 'ebooklet_printable.html');
fs.writeFileSync(htmlPath, htmlContent, 'utf-8');
console.log('✅ HTML E-Booklet 1:1 berhasil dibuat di:', htmlPath);
