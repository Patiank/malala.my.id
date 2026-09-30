import * as fs from 'fs';
import * as path from 'path';
import { DESTINATIONS, CULTURE_ITEMS, CULINARY_ITEMS, EVENTS_SCHEDULE, BG_IMAGE_2, getDirectDriveUrl } from '../src/data/content';

function generateFullHTMLEn(): string {
  let destinations = DESTINATIONS;
  let cultureItems = CULTURE_ITEMS;
  let culinaryItems = CULINARY_ITEMS;
  let eventItems = EVENTS_SCHEDULE;

  // Load from Firestore backup if populated (which has full English translations)
  try {
    const backupPath = path.join(process.cwd(), 'src', 'data', 'firestore_backup.json');
    if (fs.existsSync(backupPath)) {
      const raw = JSON.parse(fs.readFileSync(backupPath, 'utf-8'));
      if (raw.destinations && raw.destinations.length > 0) destinations = raw.destinations;
      if (raw.cultureItems && raw.cultureItems.length > 0) cultureItems = raw.cultureItems;
      if (raw.culinaryItems && raw.culinaryItems.length > 0) culinaryItems = raw.culinaryItems;
      if (raw.eventItems && raw.eventItems.length > 0) eventItems = raw.eventItems;
    }
  } catch (e) {
    console.warn('Backup parse error:', e);
  }

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

  eventItems = [...eventItems].sort((a, b) => {
    const scoreA = getEventSortScore(a.scheduleEn || a.schedule);
    const scoreB = getEventSortScore(b.scheduleEn || b.schedule);
    if (scoreA !== scoreB) return scoreA - scoreB;
    return (b.isKen ? 1 : 0) - (a.isKen ? 1 : 0);
  });

  // --- DETERMINISTIC 1:1 PAGE NUMBERING SYSTEM ---
  // Total entries = 1 (map) + 1 (chap 1) + 52 (dest) + 1 (chap 2) + 30 (cult) + 1 (chap 3) + 36 (cul) + 1 (chap 4) + 26 (ev) = 149 entries
  const itemsPerPage = 50; // 50 entries per page (25 per column) ensures no vertical overflow and crisp layout
  const totalEntriesCount = 1 + 1 + destinations.length + 1 + cultureItems.length + 1 + culinaryItems.length + 1 + eventItems.length;
  const tocPagesCount = Math.ceil(totalEntriesCount / itemsPerPage); // 3 pages: Page 2, 3, 4

  // Page index constants
  const pageCover = 1;
  const pageTocStart = 2; // TOC spans pageTocStart .. pageTocStart + tocPagesCount - 1 (2, 3, 4)
  const pageMap = 1 + tocPagesCount + 1; // Page 5: Map
  const pageChapter1 = pageMap + 1; // Page 6: Chapter 1 Divider

  // Destination pages: starting immediately after Chapter 1 divider
  const destPages = destinations.map((_, i) => pageChapter1 + 1 + i); // Pages 7 to 58
  const pageChapter2 = pageChapter1 + 1 + destinations.length; // Page 59: Chapter 2 Divider

  // Culture pages: starting immediately after Chapter 2 divider
  const cultPages = cultureItems.map((_, i) => pageChapter2 + 1 + i); // Pages 60 to 89
  const pageChapter3 = pageChapter2 + 1 + cultureItems.length; // Page 90: Chapter 3 Divider

  // Culinary pages: starting immediately after Chapter 3 divider
  const culPages = culinaryItems.map((_, i) => pageChapter3 + 1 + i); // Pages 91 to 126
  const pageChapter4 = pageChapter3 + 1 + culinaryItems.length; // Page 127: Chapter 4 Divider

  // Event pages: starting immediately after Chapter 4 divider
  const evPages = eventItems.map((_, i) => pageChapter4 + 1 + i); // Pages 128 to 153
  const pageBackCover = pageChapter4 + 1 + eventItems.length; // Page 154: Back Cover

  // Compile TOC Entries with their EXACT matching page numbers
  interface TocItem {
    title: string;
    type: 'INFOGRAFIS' | 'DIVIDER' | 'DESTINASI' | 'BUDAYA' | 'KULINER' | 'FESTIVAL';
    page: number;
  }

  const tocEntries: TocItem[] = [
    { title: 'WEST SUMATRA TOURISM & CULTURE MAP', type: 'INFOGRAFIS', page: pageMap },
    { title: 'CHAPTER 1: NATURAL & HERITAGE DESTINATIONS', type: 'DIVIDER', page: pageChapter1 },
    ...destinations.map((d, i) => ({ title: d.titleEn || d.title, type: 'DESTINASI' as const, page: destPages[i] })),
    { title: 'CHAPTER 2: CULTURAL HERITAGE & TRADITIONS', type: 'DIVIDER', page: pageChapter2 },
    ...cultureItems.map((c, i) => ({ title: c.titleEn || c.title, type: 'BUDAYA' as const, page: cultPages[i] })),
    { title: 'CHAPTER 3: MINANG GASTRONOMY & CULINARY', type: 'DIVIDER', page: pageChapter3 },
    ...culinaryItems.map((c, i) => ({ title: c.titleEn || c.title, type: 'KULINER' as const, page: culPages[i] })),
    { title: 'CHAPTER 4: CALENDAR OF EVENTS & FESTIVALS', type: 'DIVIDER', page: pageChapter4 },
    ...eventItems.map((e, i) => ({ title: e.titleEn || e.title, type: 'FESTIVAL' as const, page: evPages[i] }))
  ];

  // Chunk TOC entries into pages of 50 items (25 items per column)
  const tocChunks: TocItem[][] = [];
  for (let i = 0; i < tocEntries.length; i += itemsPerPage) {
    tocChunks.push(tocEntries.slice(i, i + itemsPerPage));
  }

  function renderTocRow(e: TocItem): string {
    if (e.type === 'DIVIDER' || e.type === 'INFOGRAFIS') {
      return `
        <div class="flex items-center justify-between gap-1 text-[9.5px] pt-1.5 pb-0.5 border-b border-blue-200/60 min-w-0 w-full overflow-hidden">
          <span class="font-extrabold text-blue-900 truncate min-w-0 flex-1 font-orbitron">${e.title}</span>
          <span class="shrink-0 font-extrabold text-blue-700 font-orbitron text-[9px] pl-1">${e.page}</span>
        </div>
      `;
    }
    return `
      <div class="flex items-center justify-between gap-1 text-[9px] min-w-0 w-full overflow-hidden leading-tight py-0.5">
        <span class="font-medium text-slate-700 truncate min-w-0 flex-1">${e.title}</span>
        <span class="grow border-b border-dotted border-gray-300 mx-1 min-w-[6px]"></span>
        <span class="shrink-0 font-bold text-blue-600 font-orbitron text-[8.5px] text-right min-w-[18px]">${e.page}</span>
      </div>
    `;
  }

  const tocHtml = tocChunks.map((chunk, idx) => {
    const mid = Math.ceil(chunk.length / 2);
    const col1 = chunk.slice(0, mid);
    const col2 = chunk.slice(mid);
    const currentPage = pageTocStart + idx;

    return `
    <article class="page-card bg-white text-slate-900 rounded-2xl overflow-hidden border border-gray-200 p-5 sm:p-6 flex flex-col justify-between mb-6 shadow-sm">
      <div class="w-full">
        <div class="border-b border-gray-200 pb-2.5 mb-3">
          <div class="flex items-center justify-between">
            <span class="text-[9.5px] font-extrabold font-orbitron uppercase text-blue-600 tracking-wider">
              TABLE OF CONTENTS • PART ${idx + 1}/${tocChunks.length}
            </span>
            <span class="text-[9px] bg-blue-50 text-blue-700 font-bold px-2 py-0.5 rounded font-orbitron">
              MALALA 2026
            </span>
          </div>
          <h2 class="font-orbitron font-black text-xl text-slate-900 uppercase pt-1">
            TABLE OF CONTENTS
          </h2>
        </div>

        <div class="grid grid-cols-2 gap-x-4 w-full">
          <div class="min-w-0 space-y-0.5">
            ${col1.map(renderTocRow).join('')}
          </div>
          <div class="min-w-0 space-y-0.5">
            ${col2.map(renderTocRow).join('')}
          </div>
        </div>
      </div>

      <div class="pt-2 border-t border-gray-100 flex items-center justify-between text-[9px] font-bold text-gray-400">
        <span class="text-blue-600 font-orbitron uppercase">Malala English Edition</span>
        <span>Page ${currentPage}</span>
      </div>
    </article>
    `;
  }).join('');

  let bgCover = BG_IMAGE_2;
  try {
    const backupPath = path.join(process.cwd(), 'src', 'data', 'firestore_backup.json');
    if (fs.existsSync(backupPath)) {
      const raw = JSON.parse(fs.readFileSync(backupPath, 'utf-8'));
      if (raw.appSettings) {
        if (raw.appSettings.revealImage && raw.appSettings.revealImage.trim()) {
          bgCover = getDirectDriveUrl(raw.appSettings.revealImage);
        } else if (raw.appSettings.baseImage && raw.appSettings.baseImage.trim()) {
          bgCover = getDirectDriveUrl(raw.appSettings.baseImage);
        }
      }
    }
  } catch (e) {
    console.warn('Backup parse error:', e);
  }

  const destHtml = destinations.map((dest, i) => {
    const pageNumber = destPages[i];
    const img = getDirectDriveUrl(dest.imageUrl);
    const category = dest.categoryEn || dest.category || 'Destination';
    const title = dest.titleEn || dest.title;
    const location = dest.locationDetailsEn || dest.locationDetails || dest.regencyEn || dest.regency || 'West Sumatra';
    const regency = dest.regencyEn || dest.regency || 'SUMATERA BARAT';
    const description = dest.descriptionEn || dest.description || '';
    const highlights = (dest.highlightsEn && dest.highlightsEn.length > 0) ? dest.highlightsEn : (dest.highlights || []);
    const bestTime = dest.bestTimeEn || dest.bestTime || 'Year-round';

    return `
    <article class="page-card bg-white text-slate-900 rounded-2xl overflow-hidden border border-gray-200 p-5 flex flex-col justify-between mb-6 shadow-sm">
      <div>
        <div class="flex items-center justify-between pb-2.5 border-b border-gray-100 text-[11px] font-bold text-gray-500">
          <span>MALALA 2026 • ${regency.toUpperCase()}</span>
          <span class="text-red-600 uppercase font-extrabold">${category}</span>
        </div>

        <div class="h-48 w-full rounded-xl overflow-hidden mt-3 relative bg-slate-900 shadow-sm">
          <img src="${img}" alt="${title}" class="w-full h-full object-cover" />
          <div class="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent"></div>
          <div class="absolute bottom-3 left-3 text-white">
            <span class="bg-white text-black font-extrabold text-[9px] uppercase px-2 py-0.5 rounded shadow">
              ${category}
            </span>
            <h3 class="font-orbitron font-extrabold text-lg text-white pt-1 drop-shadow-md leading-tight">
              ${title}
            </h3>
          </div>
        </div>

        <div class="pt-2.5 flex items-center gap-1.5 text-xs font-bold text-red-600">
          <span>📍 ${location}</span>
        </div>

        <div class="text-xs text-gray-700 leading-relaxed pt-2 space-y-2 text-justify">
          ${description.split('\n\n').map(p => `<p class="text-justify leading-relaxed">${p}</p>`).join('')}
        </div>

        ${highlights.length > 0 ? `
          <div class="mt-3 p-3 bg-gray-50 rounded-xl border border-gray-200">
            <h4 class="font-bold text-[10px] uppercase text-slate-900 tracking-wider mb-1.5">Key Highlights:</h4>
            <ul class="space-y-1 text-xs text-gray-700">
              ${highlights.map(h => `<li class="flex items-center gap-1.5"><span class="text-green-600 font-bold">✓</span> <span class="text-justify">${h}</span></li>`).join('')}
            </ul>
          </div>
        ` : ''}
      </div>

      <div class="pt-2.5 border-t border-gray-100 flex items-center justify-between text-[10px] text-gray-500 mt-4">
        <span>Best Time to Visit: <strong class="text-black">${bestTime}</strong></span>
        <span class="text-gray-400 font-bold">Page ${pageNumber}</span>
      </div>
    </article>
    `;
  }).join('');

  const cultHtml = cultureItems.map((cult, i) => {
    const pageNumber = cultPages[i];
    const img = getDirectDriveUrl(cult.imageUrl);
    const category = cult.categoryEn || cult.category || 'Cultural Heritage';
    const title = cult.titleEn || cult.title;
    const origin = cult.originEn || cult.origin || 'Minangkabau, West Sumatra';
    const description = cult.descriptionEn || cult.description || '';
    const philosophy = cult.philosophyEn || cult.philosophy;

    return `
    <article class="page-card bg-white text-slate-900 rounded-2xl overflow-hidden border border-amber-200 p-5 flex flex-col justify-between mb-6 shadow-sm">
      <div>
        <div class="flex items-center justify-between pb-2.5 border-b border-gray-100 text-[11px] font-bold text-gray-500">
          <span>MALALA 2026 • CULTURAL HERITAGE</span>
          <span class="text-amber-700 uppercase font-extrabold">${category}</span>
        </div>

        <div class="h-48 w-full rounded-xl overflow-hidden mt-3 relative bg-amber-950 shadow-sm">
          <img src="${img}" alt="${title}" class="w-full h-full object-cover" />
          <div class="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent"></div>
          <div class="absolute bottom-3 left-3 text-white">
            <span class="bg-amber-500 text-white font-extrabold text-[9px] uppercase px-2 py-0.5 rounded shadow">
              ${category}
            </span>
            <h3 class="font-orbitron font-extrabold text-lg text-white pt-1 drop-shadow-md leading-tight">
              ${title}
            </h3>
          </div>
        </div>

        <div class="pt-2.5 flex items-center gap-1.5 text-xs font-bold text-amber-800">
          <span>🏛️ Origin: ${origin}</span>
        </div>

        <div class="text-xs text-gray-700 leading-relaxed pt-2 space-y-2 text-justify">
          ${description.split('\n\n').map(p => `<p class="text-justify leading-relaxed">${p}</p>`).join('')}
        </div>

        ${philosophy ? `
          <div class="mt-3 p-3 bg-amber-50 rounded-xl border border-amber-200">
            <h4 class="font-bold text-[10px] uppercase text-amber-900 tracking-wider mb-1">Philosophy & Cultural Meaning:</h4>
            <p class="text-xs text-amber-950 italic text-justify leading-relaxed">"${philosophy}"</p>
          </div>
        ` : ''}
      </div>

      <div class="pt-2.5 border-t border-gray-100 flex items-center justify-between text-[10px] text-gray-500 mt-4">
        <span>Category: <strong class="text-amber-800">${category}</strong></span>
        <span class="text-gray-400 font-bold">Page ${pageNumber}</span>
      </div>
    </article>
    `;
  }).join('');

  const culHtml = culinaryItems.map((cul, i) => {
    const pageNumber = culPages[i];
    const img = getDirectDriveUrl(cul.imageUrl);
    const culCategory = cul.typeEn || cul.categoryEn || cul.type || cul.category || 'Specialty Culinary';
    const title = cul.titleEn || cul.title;
    const origin = cul.originEn || cul.origin || 'West Sumatra';
    const description = cul.descriptionEn || cul.description || '';
    const flavorProfile = cul.flavorProfileEn || cul.flavorProfile;

    return `
    <article class="page-card bg-white text-slate-900 rounded-2xl overflow-hidden border border-rose-200 p-5 flex flex-col justify-between mb-6 shadow-sm">
      <div>
        <div class="flex items-center justify-between pb-2.5 border-b border-gray-100 text-[11px] font-bold text-gray-500">
          <span>MALALA 2026 • MINANG GASTRONOMY</span>
          <span class="text-rose-600 uppercase font-extrabold">${culCategory}</span>
        </div>

        <div class="h-48 w-full rounded-xl overflow-hidden mt-3 relative bg-rose-950 shadow-sm">
          <img src="${img}" alt="${title}" class="w-full h-full object-cover" />
          <div class="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent"></div>
          <div class="absolute bottom-3 left-3 text-white">
            <span class="bg-rose-600 text-white font-extrabold text-[9px] uppercase px-2 py-0.5 rounded shadow">
              ${culCategory}
            </span>
            <h3 class="font-orbitron font-extrabold text-lg text-white pt-1 drop-shadow-md leading-tight">
              ${title}
            </h3>
          </div>
        </div>

        <div class="pt-2.5 flex items-center gap-1.5 text-xs font-bold text-rose-600">
          <span>🍽️ Origin: ${origin}</span>
        </div>

        <div class="text-xs text-gray-700 leading-relaxed pt-2 space-y-2 text-justify">
          ${description.split('\n\n').map(p => `<p class="text-justify leading-relaxed">${p}</p>`).join('')}
        </div>

        ${flavorProfile ? `
          <div class="mt-3 p-3 bg-rose-50 rounded-xl border border-rose-200">
            <h4 class="font-bold text-[10px] uppercase text-rose-900 tracking-wider mb-1">Characteristics & Flavor Profile:</h4>
            <p class="text-xs text-rose-950 font-medium text-justify leading-relaxed">${flavorProfile}</p>
          </div>
        ` : ''}
      </div>

      <div class="pt-2.5 border-t border-gray-100 flex items-center justify-between text-[10px] text-gray-500 mt-4">
        <span>Origin: <strong class="text-rose-800">${origin}</strong></span>
        <span class="text-gray-400 font-bold">Page ${pageNumber}</span>
      </div>
    </article>
    `;
  }).join('');

  const evHtml = eventItems.map((ev, i) => {
    const pageNumber = evPages[i];
    const img = getDirectDriveUrl(ev.imageUrl);
    const title = ev.titleEn || ev.title;
    const schedule = ev.scheduleEn || ev.schedule;
    const location = ev.locationEn || ev.location;
    const description = ev.descriptionEn || ev.description || '';

    return `
    <article class="page-card bg-white text-slate-900 rounded-2xl overflow-hidden border ${ev.isKen ? 'border-red-300 ring-1 ring-red-200' : 'border-gray-200'} p-5 flex flex-col justify-between mb-6 shadow-sm">
      <div>
        <div class="flex items-center justify-between pb-2.5 border-b border-gray-100 text-[11px] font-bold text-gray-500">
          <span>MALALA 2026 • CALENDAR OF EVENTS</span>
          ${ev.isKen ? '<span class="bg-red-600 text-white text-[9px] font-extrabold uppercase px-2 py-0.5 rounded">KARISMA EVENT NUSANTARA</span>' : '<span class="text-gray-600 uppercase font-extrabold">Official Festival</span>'}
        </div>

        <div class="h-48 w-full rounded-xl overflow-hidden mt-3 relative bg-slate-900 shadow-sm">
          <img src="${img}" alt="${title}" class="w-full h-full object-cover" />
          <div class="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent"></div>
          <div class="absolute bottom-3 left-3 text-white">
            <span class="bg-red-600 text-white font-extrabold text-[9px] uppercase px-2 py-0.5 rounded shadow">
              ${schedule}
            </span>
            <h3 class="font-orbitron font-extrabold text-lg text-white pt-1 drop-shadow-md leading-tight">
              ${title}
            </h3>
          </div>
        </div>

        <div class="pt-2.5 flex items-center gap-1.5 text-xs font-bold text-red-600">
          <span>📅 ${schedule} • 📍 ${location}</span>
        </div>

        <div class="text-xs text-gray-700 leading-relaxed pt-2 space-y-2 text-justify">
          ${description.split('\n\n').map(p => `<p class="text-justify leading-relaxed">${p}</p>`).join('')}
        </div>

        ${ev.isKen ? `
          <div class="mt-3 p-3 bg-red-50 rounded-xl border border-red-200">
            <h4 class="font-bold text-[10px] uppercase text-red-900 tracking-wider mb-1">Karisma Event Nusantara (KEN):</h4>
            <p class="text-xs text-red-950 text-justify leading-relaxed">Featured in the official national tourism calendar by the Ministry of Tourism & Creative Economy RI.</p>
          </div>
        ` : ''}
      </div>

      <div class="pt-2.5 border-t border-gray-100 flex items-center justify-between text-[10px] text-gray-500 mt-4">
        <span>Location: <strong class="text-black">${location}</strong></span>
        <span class="text-gray-400 font-bold">Page ${pageNumber}</span>
      </div>
    </article>
    `;
  }).join('');

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>MALALA 2026 - West Sumatra Tourism & Culture Guide E-Booklet</title>
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
    p {
      text-align: justify;
      text-justify: inter-word;
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
    <!-- PAGE 1: COVER -->
    <article class="page-card text-white rounded-2xl overflow-hidden relative min-h-[98vh] flex flex-col justify-between p-7 bg-slate-900 shadow-xl">
      <img src="${bgCover}" alt="Cover" class="absolute inset-0 w-full h-full object-cover" />
      
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

        <div class="space-y-1 pt-1">
          <h1 class="font-orbitron font-extrabold text-4xl text-white tracking-wide drop-shadow-[0_2px_10px_rgba(0,0,0,0.9)] leading-tight">
            MALALA<br/>2026
          </h1>
          <p class="font-orbitron font-bold text-xs text-white drop-shadow-[0_1px_6px_rgba(0,0,0,0.9)] tracking-wide">
            COMPREHENSIVE TOURISM & CULTURE GUIDE OF MINANGKABAU
          </p>
        </div>
      </div>

      <div class="relative z-10 mt-auto space-y-2 pt-16">
        <p class="text-white drop-shadow-[0_1px_5px_rgba(0,0,0,0.9)] text-xs leading-relaxed font-bold">
          ${destinations.length} Destinations · ${cultureItems.length} Culture · ${culinaryItems.length} Culinary · ${eventItems.length} Events
        </p>
        <div class="pt-3 border-t border-white/50 flex items-center justify-between text-[10px] text-white drop-shadow-[0_1px_4px_rgba(0,0,0,0.9)]">
          <div class="flex items-center gap-1.5 font-bold font-orbitron text-amber-300">
            <img src="./minangkaos-logo-compact.png" alt="Logo" class="w-4 h-4 object-contain" />
            <span>MINANGKAOS</span>
          </div>
          <span class="font-bold font-orbitron">Exclusive E-Book</span>
        </div>
      </div>
    </article>

    <!-- PAGES 2..4: TABLE OF CONTENTS -->
    ${tocHtml}

    <!-- PAGE 5: REGIONAL TOURISM & CULTURE MAP -->
    <article class="page-card bg-slate-950 text-white rounded-2xl overflow-hidden border border-slate-800 p-6 flex flex-col justify-between mb-6 shadow-xl relative">
      <div class="space-y-4">
        <div class="border-b border-white/15 pb-3">
          <div class="flex items-center justify-between">
            <span class="text-[10px] font-extrabold font-orbitron uppercase text-amber-400 tracking-wider">
              GEOGRAPHIC INFOGRAPHIC
            </span>
            <span class="text-[9px] bg-red-600 text-white font-bold px-2 py-0.5 rounded font-orbitron">
              19 REGENCIES & CITIES
            </span>
          </div>
          <h2 class="font-orbitron font-black text-lg sm:text-xl text-white uppercase pt-1">
            WEST SUMATRA TOURISM & CULTURE MAP
          </h2>
          <p class="text-xs text-gray-400 font-medium pt-0.5 text-justify">
            Zoning guide for exploring natural wonders, living heritage, and gastronomy in West Sumatra.
          </p>
        </div>

        <div class="space-y-2.5 text-xs">
          <!-- ZONE 1 -->
          <div class="p-3 bg-white/5 rounded-xl border border-white/10 space-y-1">
            <div class="flex items-center justify-between">
              <span class="font-orbitron font-bold text-amber-400 text-xs">1. HIGHLANDS & LUHAK NAN TUO</span>
              <span class="text-[9px] bg-amber-400/20 text-amber-300 px-1.5 py-0.2 rounded font-bold">Minang Heartland</span>
            </div>
            <p class="text-[11px] text-gray-300 text-justify leading-relaxed">
              <strong class="text-white">Tanah Datar, Agam, Bukittinggi, Padang Panjang, Payakumbuh, Limapuluh Kota:</strong> Jam Gadang Clock Tower, Harau Valley, Pagaruyung Palace, Kelok 9 Flyover, Lake Maninjau, Songket Pandai Sikek, Nasi Kapau.
            </p>
          </div>

          <!-- ZONE 2 -->
          <div class="p-3 bg-white/5 rounded-xl border border-white/10 space-y-1">
            <div class="flex items-center justify-between">
              <span class="font-orbitron font-bold text-cyan-400 text-xs">2. WEST COAST & MARINE PARADISE</span>
              <span class="text-[9px] bg-cyan-400/20 text-cyan-300 px-1.5 py-0.2 rounded font-bold">Coast & Islands</span>
            </div>
            <p class="text-[11px] text-gray-300 text-justify leading-relaxed">
              <strong class="text-white">Padang City, Pariaman, Padang Pariaman, South Pesisir, Mentawai:</strong> Mandeh Archipelago, Air Manis Beach, Mentawai Surfing Paradise, Nyarai Waterfall, Carocok Beach, Sate Padang & Sala Lauak.
            </p>
          </div>

          <!-- ZONE 3 -->
          <div class="p-3 bg-white/5 rounded-xl border border-white/10 space-y-1">
            <div class="flex items-center justify-between">
              <span class="font-orbitron font-bold text-emerald-400 text-xs">3. LAKES, VALLEYS & UNESCO HERITAGE</span>
              <span class="text-[9px] bg-emerald-400/20 text-emerald-300 px-1.5 py-0.2 rounded font-bold">Geopark & Lakes</span>
            </div>
            <p class="text-[11px] text-gray-300 text-justify leading-relaxed">
              <strong class="text-white">Solok City & Regency, Sawahlunto, Sijunjung, South Solok:</strong> Lake Singkarak, Twin Lakes (Danau Kembar), Sawahlunto UNESCO World Heritage, Silokek Geopark, Thousand Gadang Houses, Bilih Fish.
            </p>
          </div>

          <!-- ZONE 4 -->
          <div class="p-3 bg-white/5 rounded-xl border border-white/10 space-y-1">
            <div class="flex items-center justify-between">
              <span class="font-orbitron font-bold text-rose-400 text-xs">4. BORDERLANDS & ANCIENT HISTORICAL SITES</span>
              <span class="text-[9px] bg-rose-400/20 text-rose-300 px-1.5 py-0.2 rounded font-bold">Archaeology & Nature</span>
            </div>
            <p class="text-[11px] text-gray-300 text-justify leading-relaxed">
              <strong class="text-white">Pasaman, West Pasaman, Dharmasraya:</strong> Mount Talamau (13 Highland Tarns), Dharmasraya Temple Complex & Padang Roco, Bonjol Equator Line.
            </p>
          </div>
        </div>
      </div>

      <div class="pt-3 border-t border-white/15 flex items-center justify-between text-[10px] text-gray-400 mt-2">
        <span class="font-semibold text-amber-400 font-orbitron">MINANGKAOS</span>
        <span>Geographic Map of 19 Regencies & Cities</span>
        <span class="text-gray-400 font-bold">Page ${pageMap}</span>
      </div>
    </article>

    <!-- PAGE 6: CHAPTER 1 DIVIDER (DESTINATIONS) -->
    <article class="page-card text-white rounded-2xl overflow-hidden relative min-h-[98vh] flex flex-col justify-between p-7 bg-gradient-to-b from-blue-950 via-slate-900 to-black shadow-2xl border border-blue-800/40">
      <div class="absolute inset-0 opacity-25 bg-[radial-gradient(#3b82f6_1px,transparent_1px)] [background-size:16px_16px]"></div>
      <div class="relative z-10 space-y-4">
        <div class="flex items-center justify-between border-b border-blue-500/30 pb-3">
          <span class="bg-blue-600 text-white font-extrabold text-[9px] uppercase px-3 py-1 rounded font-orbitron tracking-widest shadow">
            PART I
          </span>
          <span class="text-blue-300 font-orbitron text-[9px] font-bold">
            ${destinations.length} FEATURED DESTINATIONS
          </span>
        </div>

        <div class="pt-10 space-y-3">
          <span class="text-blue-400 font-orbitron font-bold text-xs tracking-widest uppercase block">
            EXPLORE THE WONDERS OF MINANGKABAU
          </span>
          <h2 class="font-orbitron font-black text-3xl text-white uppercase tracking-wider leading-tight">
            NATURAL &<br/><span class="text-blue-400">HISTORICAL</span><br/>DESTINATIONS
          </h2>
          <p class="text-xs text-gray-300 leading-relaxed pt-2 text-justify">
            A comprehensive compilation of pristine volcanic lakes, colossal granite canyons, tropical archipelagos, lush geoparks, and ancient cultural heritage sites in West Sumatra.
          </p>
        </div>
      </div>

      <div class="relative z-10 space-y-3">
        <div class="p-3 bg-blue-950/60 rounded-xl border border-blue-500/30 text-xs text-blue-200">
          <div class="font-bold text-white mb-1">Destination Categories:</div>
          <div class="flex flex-wrap gap-1.5 text-[10px]">
            <span class="bg-blue-900/80 px-2 py-0.5 rounded text-white">🏔️ Lakes & Volcanic Peaks</span>
            <span class="bg-blue-900/80 px-2 py-0.5 rounded text-white">🏞️ Valleys & Geoparks</span>
            <span class="bg-blue-900/80 px-2 py-0.5 rounded text-white">🏝️ Coastal & Marine</span>
            <span class="bg-blue-900/80 px-2 py-0.5 rounded text-white">🏛️ Heritage & History</span>
          </div>
        </div>
        <div class="border-t border-blue-500/20 pt-3 flex items-center justify-between text-[10px] text-blue-300">
          <span class="font-bold text-amber-300 font-orbitron">MINANGKAOS</span>
          <span class="font-orbitron font-bold">CHAPTER 1</span>
        </div>
      </div>
      <div class="absolute bottom-4 right-6 text-[9px] font-bold text-white/50">Page ${pageChapter1}</div>
    </article>

    <!-- PAGES 7..58: CONTENT DESTINATIONS -->
    ${destHtml}

    <!-- PAGE 59: CHAPTER 2 DIVIDER (CULTURE) -->
    <article class="page-card text-white rounded-2xl overflow-hidden relative min-h-[98vh] flex flex-col justify-between p-7 bg-gradient-to-b from-purple-950 via-slate-900 to-black shadow-2xl border border-purple-800/40">
      <div class="absolute inset-0 opacity-25 bg-[radial-gradient(#a855f7_1px,transparent_1px)] [background-size:16px_16px]"></div>
      <div class="relative z-10 space-y-4">
        <div class="flex items-center justify-between border-b border-purple-500/30 pb-3">
          <span class="bg-purple-600 text-white font-extrabold text-[9px] uppercase px-3 py-1 rounded font-orbitron tracking-widest shadow">
            PART II
          </span>
          <span class="text-purple-300 font-orbitron text-[9px] font-bold">
            ${cultureItems.length} CULTURAL HERITAGES
          </span>
        </div>

        <div class="pt-10 space-y-3">
          <span class="text-purple-400 font-orbitron font-bold text-xs tracking-widest uppercase block">
            LIVING HERITAGE & PHILOSOPHY
          </span>
          <h2 class="font-orbitron font-black text-3xl text-white uppercase tracking-wider leading-tight">
            CUSTOMS, ARTS<br/><span class="text-purple-400">& TRADITIONS</span><br/>OF MINANGKABAU
          </h2>
          <p class="text-xs text-gray-300 leading-relaxed pt-2 text-justify">
            Delving into the sublime philosophy <em>"Adat Basandi Syarak, Syarak Basandi Kitabullah"</em>, iconic Rumah Gadang architecture, golden Songket weaving, martial art of Silek, and sacred community rituals.
          </p>
        </div>
      </div>

      <div class="relative z-10 space-y-3">
        <div class="p-3 bg-purple-950/60 rounded-xl border border-purple-500/30 text-xs text-purple-200">
          <div class="font-bold text-white mb-1">Heritage Categories:</div>
          <div class="flex flex-wrap gap-1.5 text-[10px]">
            <span class="bg-purple-900/80 px-2 py-0.5 rounded text-white">🏛️ Vernacular Architecture</span>
            <span class="bg-purple-900/80 px-2 py-0.5 rounded text-white">🥋 Martial Art (Silek)</span>
            <span class="bg-purple-900/80 px-2 py-0.5 rounded text-white">🧶 Songket & Textile Crafts</span>
            <span class="bg-purple-900/80 px-2 py-0.5 rounded text-white">🎭 Folk Dance & Theater</span>
          </div>
        </div>
        <div class="border-t border-purple-500/20 pt-3 flex items-center justify-between text-[10px] text-purple-300">
          <span class="font-bold text-amber-300 font-orbitron">MINANGKAOS</span>
          <span class="font-orbitron font-bold">CHAPTER 2</span>
        </div>
      </div>
      <div class="absolute bottom-4 right-6 text-[9px] font-bold text-white/50">Page ${pageChapter2}</div>
    </article>

    <!-- PAGES 60..89: CONTENT CULTURE -->
    ${cultHtml}

    <!-- PAGE 90: CHAPTER 3 DIVIDER (GASTRONOMY) -->
    <article class="page-card text-white rounded-2xl overflow-hidden relative min-h-[98vh] flex flex-col justify-between p-7 bg-gradient-to-b from-amber-950 via-slate-900 to-black shadow-2xl border border-amber-800/40">
      <div class="absolute inset-0 opacity-25 bg-[radial-gradient(#f59e0b_1px,transparent_1px)] [background-size:16px_16px]"></div>
      <div class="relative z-10 space-y-4">
        <div class="flex items-center justify-between border-b border-amber-500/30 pb-3">
          <span class="bg-amber-600 text-white font-extrabold text-[9px] uppercase px-3 py-1 rounded font-orbitron tracking-widest shadow">
            PART III
          </span>
          <span class="text-amber-300 font-orbitron text-[9px] font-bold">
            ${culinaryItems.length} AUTHENTIC DISHES
          </span>
        </div>

        <div class="pt-10 space-y-3">
          <span class="text-amber-400 font-orbitron font-bold text-xs tracking-widest uppercase block">
            AUTHENTIC MINANG GASTRONOMY
          </span>
          <h2 class="font-orbitron font-black text-3xl text-white uppercase tracking-wider leading-tight">
            CULINARY &<br/><span class="text-amber-400">GASTRONOMY</span><br/>OF RANAH MINANG
          </h2>
          <p class="text-xs text-gray-300 leading-relaxed pt-2 text-justify">
            A celebrated collection of legendary Minangkabau culinary arts, from the world's most delicious Beef Rendang, spiced Pariaman Sate, Gulai Tambusu, endemic Lake Maninjau Palai Rinuak, to Lamang Tapai.
          </p>
        </div>
      </div>

      <div class="relative z-10 space-y-3">
        <div class="p-3 bg-amber-950/60 rounded-xl border border-amber-500/30 text-xs text-amber-200">
          <div class="font-bold text-white mb-1">Gastronomy Categories:</div>
          <div class="flex flex-wrap gap-1.5 text-[10px]">
            <span class="bg-amber-900/80 px-2 py-0.5 rounded text-white">🍛 Slow-Cooked Curries & Mains</span>
            <span class="bg-amber-900/80 px-2 py-0.5 rounded text-white">🍡 Traditional Desserts & Snacks</span>
            <span class="bg-amber-900/80 px-2 py-0.5 rounded text-white">☕ Herbal Beverages & Teh Talua</span>
            <span class="bg-amber-900/80 px-2 py-0.5 rounded text-white">🐟 Endemic Lake Seafood</span>
          </div>
        </div>
        <div class="border-t border-amber-500/20 pt-3 flex items-center justify-between text-[10px] text-amber-300">
          <span class="font-bold text-amber-300 font-orbitron">MINANGKAOS</span>
          <span class="font-orbitron font-bold">CHAPTER 3</span>
        </div>
      </div>
      <div class="absolute bottom-4 right-6 text-[9px] font-bold text-white/50">Page ${pageChapter3}</div>
    </article>

    <!-- PAGES 91..126: CONTENT CULINARY -->
    ${culHtml}

    <!-- PAGE 127: CHAPTER 4 DIVIDER (EVENTS) -->
    <article class="page-card text-white rounded-2xl overflow-hidden relative min-h-[98vh] flex flex-col justify-between p-7 bg-gradient-to-b from-red-950 via-slate-900 to-black shadow-2xl border border-red-800/40">
      <div class="absolute inset-0 opacity-25 bg-[radial-gradient(#ef4444_1px,transparent_1px)] [background-size:16px_16px]"></div>
      <div class="relative z-10 space-y-4">
        <div class="flex items-center justify-between border-b border-red-500/30 pb-3">
          <span class="bg-red-600 text-white font-extrabold text-[9px] uppercase px-3 py-1 rounded font-orbitron tracking-widest shadow">
            PART IV
          </span>
          <span class="text-red-300 font-orbitron text-[9px] font-bold">
            ${eventItems.length} OFFICIAL EVENTS 2026
          </span>
        </div>

        <div class="pt-10 space-y-3">
          <span class="text-red-400 font-orbitron font-bold text-xs tracking-widest uppercase block">
            CALENDAR OF EVENTS 2026
          </span>
          <h2 class="font-orbitron font-black text-3xl text-white uppercase tracking-wider leading-tight">
            CALENDAR OF<br/><span class="text-red-400">EVENTS & FESTIVALS</span><br/>WEST SUMATRA 2026
          </h2>
          <p class="text-xs text-gray-300 leading-relaxed pt-2 text-justify">
            The annual agenda of cultural celebrations, national festivals, and spectacular traditional sporting attractions celebrated throughout the 19 Regencies and Cities of West Sumatra.
          </p>
        </div>
      </div>

      <div class="relative z-10 space-y-3">
        <div class="p-3 bg-red-950/60 rounded-xl border border-red-500/30 text-xs text-red-200">
          <div class="font-bold text-white mb-1">Festival Highlights:</div>
          <div class="flex flex-wrap gap-1.5 text-[10px]">
            <span class="bg-red-900/80 px-2 py-0.5 rounded text-white">🏆 Karisma Event Nusantara (KEN)</span>
            <span class="bg-red-900/80 px-2 py-0.5 rounded text-white">🐂 Mud Bull Race (Pacu Jawi)</span>
            <span class="bg-red-900/80 px-2 py-0.5 rounded text-white">🎭 Tabuik & Siti Nurbaya</span>
            <span class="bg-red-900/80 px-2 py-0.5 rounded text-white">🚴 Tour de Singkarak</span>
          </div>
        </div>
        <div class="border-t border-red-500/20 pt-3 flex items-center justify-between text-[10px] text-red-300">
          <span class="font-bold text-amber-300 font-orbitron">MINANGKAOS</span>
          <span class="font-orbitron font-bold">CHAPTER 4</span>
        </div>
      </div>
      <div class="absolute bottom-4 right-6 text-[9px] font-bold text-white/50">Page ${pageChapter4}</div>
    </article>

    <!-- PAGES 128..153: CONTENT EVENTS -->
    ${evHtml}

    <!-- PAGE 154: OFFICIAL BACK COVER -->
    <article class="page-card text-white rounded-2xl overflow-hidden relative min-h-[98vh] flex flex-col justify-between p-7 bg-gradient-to-b from-slate-950 via-slate-900 to-black shadow-2xl border border-slate-800">
      <div class="relative z-10 space-y-4">
        <div class="flex items-center justify-between border-b border-white/20 pb-3">
          <span class="bg-amber-500 text-black font-extrabold text-[9px] uppercase px-2.5 py-1 rounded font-orbitron tracking-widest">
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
          <p class="text-xs text-gray-300 max-w-xs mx-auto italic pt-2 leading-relaxed text-center">
            "A comprehensive guide exploring the natural masterpieces, enduring heritage traditions, and world-renowned gastronomy of Minangkabau in West Sumatra."
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

export function generateAndSaveHtmlPdfEn() {
  const htmlContent = generateFullHTMLEn();
  const finalHtml = htmlContent.replace(/src="\/images\//g, 'src="./images/');
  const htmlPath = path.join(process.cwd(), 'public', 'ebooklet_printable_en.html');
  for (let attempt = 1; attempt <= 5; attempt++) {
    try {
      fs.writeFileSync(htmlPath, finalHtml, 'utf-8');
      console.log('✅ HTML E-Booklet English 1:1 successfully created at:', htmlPath);
      break;
    } catch (err: any) {
      if (attempt === 5) throw err;
      const waitMs = attempt * 300;
      const end = Date.now() + waitMs;
      while (Date.now() < end) {}
    }
  }
}

// Standalone execution
generateAndSaveHtmlPdfEn();
