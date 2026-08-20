import * as fs from 'fs';
import * as path from 'path';
import { DESTINATIONS, CULTURE_ITEMS, CULINARY_ITEMS, EVENTS_SCHEDULE, BG_IMAGE_2, getDirectDriveUrl } from '../src/data/content';

function generateFullHTML(): string {
  let destinations = DESTINATIONS;
  let cultureItems = CULTURE_ITEMS;
  let culinaryItems = CULINARY_ITEMS;
  let eventItems = EVENTS_SCHEDULE;
  let bgCover = BG_IMAGE_2;

  // Load from Firestore backup if populated
  try {
    const backupPath = path.join(process.cwd(), 'src', 'data', 'firestore_backup.json');
    if (fs.existsSync(backupPath)) {
      const raw = JSON.parse(fs.readFileSync(backupPath, 'utf-8'));
      if (raw.destinations && raw.destinations.length > 0) destinations = raw.destinations;
      if (raw.cultureItems && raw.cultureItems.length > 0) cultureItems = raw.cultureItems;
      if (raw.culinaryItems && raw.culinaryItems.length > 0) culinaryItems = raw.culinaryItems;
      if (raw.eventItems && raw.eventItems.length > 0) eventItems = raw.eventItems;
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

  eventItems = [...eventItems].sort((a, b) => {
    const scoreA = getEventSortScore(a.schedule);
    const scoreB = getEventSortScore(b.schedule);
    if (scoreA !== scoreB) return scoreA - scoreB;
    return (b.isKen ? 1 : 0) - (a.isKen ? 1 : 0);
  });

  const destHtml = destinations.map((dest, idx) => {
    const img = getDirectDriveUrl(dest.imageUrl);
    return `
    <article class="page-card bg-white text-slate-900 rounded-2xl overflow-hidden border border-gray-200 p-5 flex flex-col justify-between mb-6">
      <div>
        <div class="flex items-center justify-between pb-2.5 border-b border-gray-100 text-[11px] font-bold text-gray-500">
          <span>MALALA 2026 • ${dest.regency || 'SUMATERA BARAT'}</span>
          <span class="text-red-600 uppercase font-extrabold">${dest.category}</span>
        </div>

        <div class="h-48 w-full rounded-xl overflow-hidden mt-3 relative bg-slate-900 shadow-sm">
          <img src="${img}" alt="${dest.title}" class="w-full h-full object-cover" />
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
          ${(dest.description || '').split('\n\n').map(p => `<p>${p}</p>`).join('')}
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

        <div class="pt-2.5 border-t border-gray-100 flex items-center justify-between text-[10px] text-gray-500 mt-4">
          <span>Waktu Terbaik: <strong class="text-black">${dest.bestTime || 'Sepanjang Tahun'}</strong></span>
          <span class="text-gray-400">#${idx + 1}</span>
        </div>
      </article>
    `;
  }).join('');

  const cultHtml = cultureItems.map((cult, idx) => {
    const img = getDirectDriveUrl(cult.imageUrl);
    return `
    <article class="page-card bg-white text-slate-900 rounded-2xl overflow-hidden border border-amber-200 p-5 flex flex-col justify-between mb-6">
      <div>
        <div class="flex items-center justify-between pb-2.5 border-b border-gray-100 text-[11px] font-bold text-gray-500">
          <span>MALALA 2026 • WARISAN BUDAYA</span>
          <span class="text-amber-700 uppercase font-extrabold">${cult.category}</span>
        </div>

        <div class="h-48 w-full rounded-xl overflow-hidden mt-3 relative bg-amber-950 shadow-sm">
          <img src="${img}" alt="${cult.title}" class="w-full h-full object-cover" />
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
          ${(cult.description || '').split('\n\n').map(p => `<p>${p}</p>`).join('')}
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
        <span class="text-gray-400">#${destinations.length + idx + 1}</span>
      </div>
    </article>
  `;
  }).join('');

  const culHtml = culinaryItems.map((cul, idx) => {
    const img = getDirectDriveUrl(cul.imageUrl);
    const culCategory = cul.type || cul.category || 'Kuliner Khas';
    return `
    <article class="page-card bg-white text-slate-900 rounded-2xl overflow-hidden border border-rose-200 p-5 flex flex-col justify-between mb-6">
      <div>
        <div class="flex items-center justify-between pb-2.5 border-b border-gray-100 text-[11px] font-bold text-gray-500">
          <span>MALALA 2026 • GASTRONOMI MINANG</span>
          <span class="text-rose-600 uppercase font-extrabold">${culCategory}</span>
        </div>

        <div class="h-48 w-full rounded-xl overflow-hidden mt-3 relative bg-rose-950 shadow-sm">
          <img src="${img}" alt="${cul.title}" class="w-full h-full object-cover" />
          <div class="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent"></div>
          <div class="absolute bottom-3 left-3 text-white">
            <span class="bg-rose-600 text-white font-extrabold text-[9px] uppercase px-2 py-0.5 rounded shadow">
              ${culCategory}
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
          ${(cul.description || '').split('\n\n').map(p => `<p>${p}</p>`).join('')}
        </div>

        ${cul.flavorProfile ? `
          <div class="mt-3 p-3 bg-rose-50 rounded-xl border border-rose-200">
            <h4 class="font-bold text-[10px] uppercase text-rose-900 tracking-wider mb-1">Karakteristik & Cita Rasa:</h4>
            <p class="text-xs text-rose-950 font-medium">${cul.flavorProfile}</p>
          </div>
        ` : ''}
      </div>

      <div class="pt-2.5 border-t border-gray-100 flex items-center justify-between text-[10px] text-gray-500 mt-4">
        <span>Asal: <strong class="text-rose-800">${cul.origin}</strong></span>
        <span class="text-gray-400">#${destinations.length + cultureItems.length + idx + 1}</span>
      </div>
    </article>
  `;
  }).join('');

  const evHtml = eventItems.map((ev, idx) => {
    const img = getDirectDriveUrl(ev.imageUrl);
    return `
    <article class="page-card bg-white text-slate-900 rounded-2xl overflow-hidden border ${ev.isKen ? 'border-red-300 ring-1 ring-red-200' : 'border-gray-200'} p-5 flex flex-col justify-between mb-6">
      <div>
        <div class="flex items-center justify-between pb-2.5 border-b border-gray-100 text-[11px] font-bold text-gray-500">
          <span>MALALA 2026 • CALENDAR OF EVENTS</span>
          ${ev.isKen ? '<span class="bg-red-600 text-white text-[9px] font-extrabold uppercase px-2 py-0.5 rounded">KARISMA EVENT NUSANTARA</span>' : '<span class="text-gray-600 uppercase font-extrabold">Festival Resmi</span>'}
        </div>

        <div class="h-48 w-full rounded-xl overflow-hidden mt-3 relative bg-slate-900 shadow-sm">
          <img src="${img}" alt="${ev.title}" class="w-full h-full object-cover" />
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
          ${(ev.description || '').split('\n\n').map(p => `<p>${p}</p>`).join('')}
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
        <span class="text-gray-400">#${destinations.length + cultureItems.length + culinaryItems.length + idx + 1}</span>
      </div>
    </article>
  `;
  }).join('');

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
      <img src="${bgCover}" alt="Cover" class="absolute inset-0 w-full h-full object-cover" />
      
      <div class="relative z-10 space-y-4">
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-2 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full border border-white/20">
            <img src="https://res.cloudinary.com/uupbxcw5/image/upload/v1787206698/minangkaos_logo_t9ozpg.png" alt="Logo" class="w-5 h-5 object-contain" />
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
            PANDUAN LENGKAP PARIWISATA & BUDAYA RANAH MINANG
          </p>
        </div>
      </div>

      <div class="relative z-10 mt-auto space-y-2 pt-16">
        <p class="text-white drop-shadow-[0_1px_5px_rgba(0,0,0,0.9)] text-xs leading-relaxed font-bold">
          ${destinations.length} Destinasi · ${cultureItems.length} Budaya · ${culinaryItems.length} Kuliner · ${eventItems.length} Event
        </p>
        <div class="pt-3 border-t border-white/50 flex items-center justify-between text-[10px] text-white drop-shadow-[0_1px_4px_rgba(0,0,0,0.9)]">
          <div class="flex items-center gap-1.5 font-bold font-orbitron text-amber-300">
            <img src="https://res.cloudinary.com/uupbxcw5/image/upload/v1787206698/minangkaos_logo_t9ozpg.png" alt="Logo" class="w-4 h-4 object-contain" />
            <span>MINANGKAOS</span>
          </div>
          <span class="font-bold font-orbitron">E-Book Eksklusif</span>
        </div>
      </div>
    </article>

    <!-- 2. PETA PERSEBARAN 19 KABUPATEN & KOTA (REGIONAL TOURISM & CULTURE MAP) -->
    <article class="page-card bg-slate-950 text-white rounded-2xl overflow-hidden border border-slate-800 p-6 flex flex-col justify-between mb-6 shadow-xl relative">
      <div class="space-y-4">
        <div class="border-b border-white/15 pb-3">
          <div class="flex items-center justify-between">
            <span class="text-[10px] font-extrabold font-orbitron uppercase text-amber-400 tracking-wider">
              INFOGRAFIS GEOGRAFIS
            </span>
            <span class="text-[9px] bg-red-600 text-white font-bold px-2 py-0.5 rounded font-orbitron">
              19 KAB / KOTA
            </span>
          </div>
          <h2 class="font-orbitron font-black text-lg sm:text-xl text-white uppercase pt-1">
            PETA PARIWISATA & BUDAYA SUMBAR
          </h2>
          <p class="text-xs text-gray-400 font-medium pt-0.5">
            Panduan zonasi eksplorasi destinasi, adat budaya, dan gastronomi di Sumatera Barat.
          </p>
        </div>

        <div class="space-y-2.5 text-xs">
          <!-- ZONA 1 -->
          <div class="p-3 bg-white/5 rounded-xl border border-white/10 space-y-1">
            <div class="flex items-center justify-between">
              <span class="font-orbitron font-bold text-amber-400 text-xs">1. DATARAN TINGGI & LUHAK NAN TUO</span>
              <span class="text-[9px] bg-amber-400/20 text-amber-300 px-1.5 py-0.2 rounded font-bold">Jantung Minang</span>
            </div>
            <p class="text-[11px] text-gray-300">
              <strong class="text-white">Tanah Datar, Agam, Bukittinggi, Padang Panjang, Payakumbuh, 50 Kota:</strong> Jam Gadang, Lembah Harau, Pagaruyung, Kelok 9, Danau Maninjau, Songket Pandai Sikek, Nasi Kapau.
            </p>
          </div>

          <!-- ZONA 2 -->
          <div class="p-3 bg-white/5 rounded-xl border border-white/10 space-y-1">
            <div class="flex items-center justify-between">
              <span class="font-orbitron font-bold text-cyan-400 text-xs">2. PESISIR BARAT & SURGA BAHARI</span>
              <span class="text-[9px] bg-cyan-400/20 text-cyan-300 px-1.5 py-0.2 rounded font-bold">Pesisir & Pulau</span>
            </div>
            <p class="text-[11px] text-gray-300">
              <strong class="text-white">Kota Padang, Pariaman, Padang Pariaman, Pesisir Selatan, Mentawai:</strong> Kawasan Mandeh, Pantai Air Manis, Kepulauan Mentawai, Air Terjun Nyarai, Pantai Carocok, Sate Padang & Sala Lauak.
            </p>
          </div>

          <!-- ZONA 3 -->
          <div class="p-3 bg-white/5 rounded-xl border border-white/10 space-y-1">
            <div class="flex items-center justify-between">
              <span class="font-orbitron font-bold text-emerald-400 text-xs">3. DANAU, LEMBAH & WARISAN UNESCO</span>
              <span class="text-[9px] bg-emerald-400/20 text-emerald-300 px-1.5 py-0.2 rounded font-bold">Geopark & Danau</span>
            </div>
            <p class="text-[11px] text-gray-300">
              <strong class="text-white">Kota & Kab. Solok, Sawahlunto, Sijunjung, Solok Selatan:</strong> Danau Singkarak, Danau Kembar, Kota Warisan Dunia Sawahlunto, Geopark Silokek, Seribu Rumah Gadang, Ikan Bilih.
            </p>
          </div>

          <!-- ZONA 4 -->
          <div class="p-3 bg-white/5 rounded-xl border border-white/10 space-y-1">
            <div class="flex items-center justify-between">
              <span class="font-orbitron font-bold text-rose-400 text-xs">4. PERBATASAN & SITUS SEJARAH PURBA</span>
              <span class="text-[9px] bg-rose-400/20 text-rose-300 px-1.5 py-0.2 rounded font-bold">Arkeologi & Alam</span>
            </div>
            <p class="text-[11px] text-gray-300">
              <strong class="text-white">Pasaman, Pasaman Barat, Dharmasraya:</strong> Gunung Talamau (13 Telaga), Percandian Dharmasraya & Candi Padang Roco, Garis Khatulistiwa Bonjol.
            </p>
          </div>
        </div>
      </div>

      <div class="pt-3 border-t border-white/15 flex items-center justify-between text-[10px] text-gray-400 mt-2">
        <span class="font-semibold text-amber-400 font-orbitron">MINANGKAOS</span>
        <span>Halaman Peta Zonasi 19 Kab/Kota</span>
      </div>
    </article>

    <!-- BAB 1 DIVIDER: DESTINASI WISATA -->
    <article class="page-card text-white rounded-2xl overflow-hidden relative min-h-[98vh] flex flex-col justify-between p-7 bg-gradient-to-b from-blue-950 via-slate-900 to-black shadow-2xl border border-blue-800/40">
      <div class="absolute inset-0 opacity-25 bg-[radial-gradient(#3b82f6_1px,transparent_1px)] [background-size:16px_16px]"></div>
      <div class="relative z-10 space-y-4">
        <div class="flex items-center justify-between border-b border-blue-500/30 pb-3">
          <span class="bg-blue-600 text-white font-extrabold text-[9px] uppercase px-3 py-1 rounded font-orbitron tracking-widest shadow">
            BAGIAN I
          </span>
          <span class="text-blue-300 font-orbitron text-[9px] font-bold">
            ${destinations.length} DESTINASI PILIHAN
          </span>
        </div>

        <div class="pt-10 space-y-3">
          <span class="text-blue-400 font-orbitron font-bold text-xs tracking-widest uppercase block">
            EXPLORE THE WONDERS OF MINANGKABAU
          </span>
          <h2 class="font-orbitron font-black text-3xl text-white uppercase tracking-wider leading-tight">
            DESTINASI<br/><span class="text-blue-400">WISATA ALAM</span><br/>& SEJARAH
          </h2>
          <p class="text-xs text-gray-300 leading-relaxed pt-2">
            Kompilasi komprehensif 38 surga tersembunyi, danau vulkanik, kemegahan ngarai dan lembah granit, pesona pulau bahari, hingga situs cagar budaya peninggalan purba di Sumatera Barat.
          </p>
        </div>
      </div>

      <div class="relative z-10 space-y-3">
        <div class="p-3 bg-blue-950/60 rounded-xl border border-blue-500/30 text-xs text-blue-200">
          <div class="font-bold text-white mb-1">Kategori Destinasi:</div>
          <div class="flex flex-wrap gap-1.5 text-[10px]">
            <span class="bg-blue-900/80 px-2 py-0.5 rounded text-white">🏔️ Danau & Gunung</span>
            <span class="bg-blue-900/80 px-2 py-0.5 rounded text-white">🏞️ Lembah & Geopark</span>
            <span class="bg-blue-900/80 px-2 py-0.5 rounded text-white">🏝️ Pantai & Bahari</span>
            <span class="bg-blue-900/80 px-2 py-0.5 rounded text-white">🏛️ Sejarah & Budaya</span>
          </div>
        </div>
        <div class="border-t border-blue-500/20 pt-3 flex items-center justify-between text-[10px] text-blue-300">
          <span class="font-bold text-amber-300 font-orbitron">MINANGKAOS</span>
          <span class="font-orbitron font-bold">BAB 1</span>
        </div>
      </div>
    </article>

    <!-- CONTENT: DESTINASI -->
    ${destHtml}

    <!-- BAB 2 DIVIDER: WARISAN ADAT & BUDAYA -->
    <article class="page-card text-white rounded-2xl overflow-hidden relative min-h-[98vh] flex flex-col justify-between p-7 bg-gradient-to-b from-purple-950 via-slate-900 to-black shadow-2xl border border-purple-800/40">
      <div class="absolute inset-0 opacity-25 bg-[radial-gradient(#a855f7_1px,transparent_1px)] [background-size:16px_16px]"></div>
      <div class="relative z-10 space-y-4">
        <div class="flex items-center justify-between border-b border-purple-500/30 pb-3">
          <span class="bg-purple-600 text-white font-extrabold text-[9px] uppercase px-3 py-1 rounded font-orbitron tracking-widest shadow">
            BAGIAN II
          </span>
          <span class="text-purple-300 font-orbitron text-[9px] font-bold">
            ${cultureItems.length} WARISAN ADAT
          </span>
        </div>

        <div class="pt-10 space-y-3">
          <span class="text-purple-400 font-orbitron font-bold text-xs tracking-widest uppercase block">
            LIVING HERITAGE & PHILOSOPHY
          </span>
          <h2 class="font-orbitron font-black text-3xl text-white uppercase tracking-wider leading-tight">
            ADAT, SENI<br/><span class="text-purple-400">& TRADISI</span><br/>MINANGKABAU
          </h2>
          <p class="text-xs text-gray-300 leading-relaxed pt-2">
            Menyelami falsafah agung <em>"Adat Basandi Syarak, Syarak Basandi Kitabullah"</em>, arsitektur megah Rumah Gadang, mahakarya tenun Songket, seni beladiri Silek, dan upacara adat sakral.
          </p>
        </div>
      </div>

      <div class="relative z-10 space-y-3">
        <div class="p-3 bg-purple-950/60 rounded-xl border border-purple-500/30 text-xs text-purple-200">
          <div class="font-bold text-white mb-1">Kategori Warisan Budaya:</div>
          <div class="flex flex-wrap gap-1.5 text-[10px]">
            <span class="bg-purple-900/80 px-2 py-0.5 rounded text-white">🏛️ Arsitektur Tradisional</span>
            <span class="bg-purple-900/80 px-2 py-0.5 rounded text-white">🥋 Seni Beladiri Silek</span>
            <span class="bg-purple-900/80 px-2 py-0.5 rounded text-white">🧶 Tenun & Kriya Khas</span>
            <span class="bg-purple-900/80 px-2 py-0.5 rounded text-white">🎭 Tari & Teater Rakyat</span>
          </div>
        </div>
        <div class="border-t border-purple-500/20 pt-3 flex items-center justify-between text-[10px] text-purple-300">
          <span class="font-bold text-amber-300 font-orbitron">MINANGKAOS</span>
          <span class="font-orbitron font-bold">BAB 2</span>
        </div>
      </div>
    </article>

    <!-- CONTENT: BUDAYA -->
    ${cultHtml}

    <!-- BAB 3 DIVIDER: KULINER & GASTRONOMI -->
    <article class="page-card text-white rounded-2xl overflow-hidden relative min-h-[98vh] flex flex-col justify-between p-7 bg-gradient-to-b from-amber-950 via-slate-900 to-black shadow-2xl border border-amber-800/40">
      <div class="absolute inset-0 opacity-25 bg-[radial-gradient(#f59e0b_1px,transparent_1px)] [background-size:16px_16px]"></div>
      <div class="relative z-10 space-y-4">
        <div class="flex items-center justify-between border-b border-amber-500/30 pb-3">
          <span class="bg-amber-600 text-white font-extrabold text-[9px] uppercase px-3 py-1 rounded font-orbitron tracking-widest shadow">
            BAGIAN III
          </span>
          <span class="text-amber-300 font-orbitron text-[9px] font-bold">
            ${culinaryItems.length} KULINER OTENTIK
          </span>
        </div>

        <div class="pt-10 space-y-3">
          <span class="text-amber-400 font-orbitron font-bold text-xs tracking-widest uppercase block">
            AUTHENTIC MINANG GASTRONOMY
          </span>
          <h2 class="font-orbitron font-black text-3xl text-white uppercase tracking-wider leading-tight">
            KULINER &<br/><span class="text-amber-400">GASTRONOMI</span><br/>RANAH MINANG
          </h2>
          <p class="text-xs text-gray-300 leading-relaxed pt-2">
            Koleksi mahakarya kuliner Minangkabau legendaris, dari Rendang Daging terbaik dunia, Sate Pariaman, Gulai Tambusu, Palai Rinuak Maninjau, hingga kudapan manis Lamang Tapai.
          </p>
        </div>
      </div>

      <div class="relative z-10 space-y-3">
        <div class="p-3 bg-amber-950/60 rounded-xl border border-amber-500/30 text-xs text-amber-200">
          <div class="font-bold text-white mb-1">Kategori Gastronomi:</div>
          <div class="flex flex-wrap gap-1.5 text-[10px]">
            <span class="bg-amber-900/80 px-2 py-0.5 rounded text-white">🍛 Hidangan Utama & Gulai</span>
            <span class="bg-amber-900/80 px-2 py-0.5 rounded text-white">🍡 Kudapan & Jajanan Khas</span>
            <span class="bg-amber-900/80 px-2 py-0.5 rounded text-white">☕ Minuman Tradisional</span>
            <span class="bg-amber-900/80 px-2 py-0.5 rounded text-white">🐟 Olahan Ikan Endemik</span>
          </div>
        </div>
        <div class="border-t border-amber-500/20 pt-3 flex items-center justify-between text-[10px] text-amber-300">
          <span class="font-bold text-amber-300 font-orbitron">MINANGKAOS</span>
          <span class="font-orbitron font-bold">BAB 3</span>
        </div>
      </div>
    </article>

    <!-- CONTENT: KULINER -->
    ${culHtml}

    <!-- BAB 4 DIVIDER: KALENDER EVENT & FESTIVAL -->
    <article class="page-card text-white rounded-2xl overflow-hidden relative min-h-[98vh] flex flex-col justify-between p-7 bg-gradient-to-b from-red-950 via-slate-900 to-black shadow-2xl border border-red-800/40">
      <div class="absolute inset-0 opacity-25 bg-[radial-gradient(#ef4444_1px,transparent_1px)] [background-size:16px_16px]"></div>
      <div class="relative z-10 space-y-4">
        <div class="flex items-center justify-between border-b border-red-500/30 pb-3">
          <span class="bg-red-600 text-white font-extrabold text-[9px] uppercase px-3 py-1 rounded font-orbitron tracking-widest shadow">
            BAGIAN IV
          </span>
          <span class="text-red-300 font-orbitron text-[9px] font-bold">
            ${eventItems.length} AGENDA EVENT 2026
          </span>
        </div>

        <div class="pt-10 space-y-3">
          <span class="text-red-400 font-orbitron font-bold text-xs tracking-widest uppercase block">
            CALENDAR OF EVENTS 2026
          </span>
          <h2 class="font-orbitron font-black text-3xl text-white uppercase tracking-wider leading-tight">
            KALENDER<br/><span class="text-red-400">EVENT & FESTIVAL</span><br/>SUMBAR 2026
          </h2>
          <p class="text-xs text-gray-300 leading-relaxed pt-2">
            Agenda festival kebudayaan dan atraksi unggulan seni tradisi anak nagari yang diselenggarakan di seluruh 19 Kabupaten dan Kota di Sumatera Barat.
          </p>
        </div>
      </div>

      <div class="relative z-10 space-y-3">
        <div class="p-3 bg-red-950/60 rounded-xl border border-red-500/30 text-xs text-red-200">
          <div class="font-bold text-white mb-1">Sorotan Festival Pilihan:</div>
          <div class="flex flex-wrap gap-1.5 text-[10px]">
            <span class="bg-red-900/80 px-2 py-0.5 rounded text-white">🏆 Karisma Event Nusantara</span>
            <span class="bg-red-900/80 px-2 py-0.5 rounded text-white">🐂 Pacu Jawi & Pacu Kudo</span>
            <span class="bg-red-900/80 px-2 py-0.5 rounded text-white">🎭 Tabuik & Siti Nurbaya</span>
            <span class="bg-red-900/80 px-2 py-0.5 rounded text-white">🚴 Tour de Singkarak</span>
          </div>
        </div>
        <div class="border-t border-red-500/20 pt-3 flex items-center justify-between text-[10px] text-red-300">
          <span class="font-bold text-amber-300 font-orbitron">MINANGKAOS</span>
          <span class="font-orbitron font-bold">BAB 4</span>
        </div>
      </div>
    </article>

    <!-- CONTENT: EVENTS -->
    ${evHtml}

    <!-- OFFICIAL BACK COVER -->
    <article class="page-card text-white rounded-2xl overflow-hidden relative min-h-[98vh] flex flex-col justify-between p-7 bg-gradient-to-b from-slate-950 via-slate-900 to-black shadow-2xl border border-slate-800">
      <div class="relative z-10 space-y-4">
        <div class="flex items-center justify-between border-b border-white/20 pb-3">
          <span class="bg-amber-500 text-black font-extrabold text-[9px] uppercase px-2.5 py-1 rounded font-orbitron tracking-widest">
            MINANGKAOS SPECIAL EDITION
          </span>
          <span class="text-gray-400 font-orbitron text-[9px] font-bold">
            EDISI 2026
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
            "Panduan komprehensif mengeksplorasi mahakarya alam, kekayaan tradisi, dan kelezatan gastronomi Minangkabau di Sumatera Barat."
          </p>
        </div>
      </div>

      <!-- CREDENTIALS & CONTACT INFO -->
      <div class="relative z-10 space-y-4">
        <div class="bg-white/5 backdrop-blur-md p-4 rounded-xl border border-white/10 space-y-3">
          <div class="text-center pb-2 border-b border-white/10">
            <span class="font-orbitron font-extrabold text-sm text-amber-400">MALALA.MY.ID</span>
            <div class="text-[10px] text-gray-300">Direktori Pariwisata & Budaya Digital</div>
          </div>

          <div class="grid grid-cols-2 gap-2 text-[10px] text-gray-300">
            <div>
              <div class="font-bold text-white uppercase">Instagram:</div>
              <div class="text-amber-300">@minangkaos</div>
            </div>
            <div>
              <div class="font-bold text-white uppercase">Website:</div>
              <div class="text-amber-300">malala.my.id</div>
            </div>
            <div class="col-span-2 pt-1 text-center">
              <div class="font-bold text-white uppercase">Presented By:</div>
              <div class="text-amber-400 font-orbitron font-bold text-xs">MINANGKAOS</div>
              <div class="text-[9px] text-gray-400">Sumatera Barat, Indonesia</div>
            </div>
          </div>
        </div>

        <div class="border-t border-white/20 pt-3 text-center text-[9px] text-gray-400 space-y-1">
          <div class="font-bold text-white tracking-widest uppercase">MALALA 2026 • MINANGKAOS</div>
          <div>Hak Cipta Dilindungi Undang-Undang © 2026.</div>
        </div>
      </div>
    </article>
  </div>
</body>
</html>
  `;
}

const htmlContent = generateFullHTML();
const htmlPath = path.join(process.cwd(), 'public', 'ebooklet_printable.html');
fs.writeFileSync(htmlPath, htmlContent, 'utf-8');
console.log('✅ HTML E-Booklet 1:1 berhasil dibuat di:', htmlPath);
