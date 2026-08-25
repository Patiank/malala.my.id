const fs = require('fs');

// 1. Update index.html
let indexHtml = fs.readFileSync('index.html', 'utf8');

indexHtml = indexHtml.replace(
  /<title>Malala - Panduan Wisata Sumatera Barat \| Smart Tourism Portal<\/title>/,
  '<title>Pariwisata Sumatera Barat - Portal Wisata & Budaya Resmi (Malala)</title>'
);

indexHtml = indexHtml.replace(
  /<meta name="title" content="MALALA — Eksplorasi Pariwisata, Adat & Kuliner Sumatera Barat \| Official Portal">/,
  '<meta name="title" content="Pariwisata Sumatera Barat — Portal Wisata, Adat & Kuliner Resmi (Malala)">'
);

indexHtml = indexHtml.replace(
  /<meta name="description" content="Portal Pariwisata Cerdas Resmi Sumatera Barat\. Jelajahi 38\+ destinasi alam, 22\+ tradisi budaya Minangkabau, 26\+ kuliner autentik, kalender event 2026, dan asisten AI liburan\.">/,
  '<meta name="description" content="Website resmi pariwisata Sumatera Barat (Sumbar). Temukan info lengkap destinasi wisata alam, warisan budaya Minangkabau, kuliner Padang, & kalender event 2026.">'
);

indexHtml = indexHtml.replace(
  /<meta name="keywords" content="Pariwisata Sumatera Barat, Wisata Sumbar, Danau Singkarak, Lembah Harau, Jam Gadang Bukittinggi, Istano Pagaruyung, Mandeh, Kepulauan Mentawai, Rendang Minangkabau, Pacu Jawi, CoE Sumbar 2026, Minangkaos, Malala, Hotel Sumbar, Travel Guide Padang, Candi Padang Roco, Nasi Kapau, Uni Mala AI">/,
  '<meta name="keywords" content="Sumatera Barat, Pariwisata Sumatera Barat, Wisata Sumbar, Liburan ke Sumatera Barat, Pariwisata Minangkabau, Info Wisata Sumbar, Danau Singkarak, Lembah Harau, Jam Gadang, Mandeh, Kepulauan Mentawai, Malala, Travel Guide Padang">'
);

fs.writeFileSync('index.html', indexHtml, 'utf8');


// 2. Update generate_ssg_pages.ts
let ssgTs = fs.readFileSync('scripts/generate_ssg_pages.ts', 'utf8');

ssgTs = ssgTs.replace(
  /title: 'Malala - Panduan Wisata Sumatera Barat \| Smart Tourism Portal',/g,
  "title: 'Pariwisata Sumatera Barat - Portal Wisata & Budaya Resmi (Malala)',"
);

ssgTs = ssgTs.replace(
  /description: 'Portal Pariwisata Cerdas Resmi Sumatera Barat\. Jelajahi 38\+ destinasi alam, 22\+ tradisi budaya Minangkabau, 26\+ kuliner autentik, kalender event 2026, dan asisten AI liburan\.',/g,
  "description: 'Website resmi pariwisata Sumatera Barat (Sumbar). Temukan info lengkap destinasi wisata alam, warisan budaya Minangkabau, kuliner Padang, & kalender event 2026.',"
);

ssgTs = ssgTs.replace(
  /<h1>MALALA — Panduan Wisata Sumatera Barat & Smart Tourism Portal<\/h1>/g,
  "<h1>Pariwisata Sumatera Barat — Portal Wisata & Budaya Resmi (Malala)</h1>"
);

fs.writeFileSync('scripts/generate_ssg_pages.ts', ssgTs, 'utf8');

console.log('Homepage SEO updated successfully.');
