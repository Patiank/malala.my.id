const fs = require('fs');

// 1. Update scripts/generate_ssg_pages.ts
let ssgCode = fs.readFileSync('scripts/generate_ssg_pages.ts', 'utf8');

// Enhance destination titles and descriptions
ssgCode = ssgCode.replace(
  'const pageTitle = `${dest.title} - Destinasi Wisata Sumatera Barat | Malala`;',
  'const pageTitle = `${dest.title} (${dest.regency || \'Sumatera Barat\'}): Rute, Daya Tarik & Panduan 2026 | MALALA`;'
);

// Enhance culture titles
ssgCode = ssgCode.replace(
  'const pageTitle = `${cult.title} - Tradisi Budaya Minangkabau | Malala`;',
  'const pageTitle = `${cult.title} Minangkabau: Makna Filosofis, Sejarah & Tradisi Adat | MALALA`;'
);

// Enhance culinary titles
ssgCode = ssgCode.replace(
  'const pageTitle = `${cul.title} - Kuliner Khas Minangkabau | Malala`;',
  'const pageTitle = `${cul.title} Khas Minangkabau: Cita Rasa & Rekomendasi Kuliner Autentik | MALALA`;'
);

// Enhance event titles
ssgCode = ssgCode.replace(
  'const pageTitle = `${ev.title} - Event Pariwisata Sumbar 2026 | Malala`;',
  'const pageTitle = `Jadwal ${ev.title} 2026: Info Agenda, Rute & Lokasi Acara | MALALA`;'
);

// Enhance homepage title & description
ssgCode = ssgCode.replace(
  "title: 'Pariwisata Sumatera Barat - Portal Wisata & Budaya Resmi (Malala)',",
  "title: 'Pariwisata Sumatera Barat: 38+ Destinasi, Kuliner, Event & AI Itinerary 2026 | MALALA',"
);

ssgCode = ssgCode.replace(
  "description: 'Website resmi pariwisata Sumatera Barat (Sumbar). Temukan info lengkap destinasi wisata alam, warisan budaya Minangkabau, kuliner Padang, & kalender event 2026.',",
  "description: 'Portal resmi pariwisata Sumatera Barat 2026. Temukan 38+ destinasi hits, rute wisata tanpa bolak-balik, 26 kuliner legendaris, jadwal festival KEN 2026, dan asisten AI cerdas Uni Mala.',"
);

fs.writeFileSync('scripts/generate_ssg_pages.ts', ssgCode, 'utf8');
console.log('✅ scripts/generate_ssg_pages.ts enhanced with high-CTR SEO title formulas!');

// 2. Update index.html top SEO meta tags
let indexHtml = fs.readFileSync('index.html', 'utf8');

indexHtml = indexHtml.replace(
  /<title>.*?<\/title>/is,
  '<title>Pariwisata Sumatera Barat: 38+ Destinasi, Kuliner, Event & AI Itinerary 2026 | MALALA</title>'
);

indexHtml = indexHtml.replace(
  /<meta name="title" content=".*?"/is,
  '<meta name="title" content="Pariwisata Sumatera Barat: 38+ Destinasi, Kuliner, Event & AI Itinerary 2026 | MALALA"'
);

indexHtml = indexHtml.replace(
  /<meta name="description" content=".*?"/is,
  '<meta name="description" content="Portal resmi pariwisata Sumatera Barat 2026. Temukan 38+ destinasi hits, rute wisata tanpa bolak-balik, 26 kuliner legendaris, jadwal festival KEN 2026, dan asisten AI cerdas Uni Mala."'
);

fs.writeFileSync('index.html', indexHtml, 'utf8');
console.log('✅ index.html primary SEO tags enhanced!');
