import * as fs from 'fs';
import * as path from 'path';

interface Destination {
  id: string;
  title: string;
  titleEn?: string;
  category: string;
  categoryEn?: string;
  regency?: string;
  tag?: string;
  tagEn?: string;
  description: string;
  descriptionEn?: string;
  highlights?: string[];
  highlightsEn?: string[];
  bestTime?: string;
  bestTimeEn?: string;
  locationDetails?: string;
  locationDetailsEn?: string;
  imageUrl?: string;
  lat?: number;
  lng?: number;
}

interface CultureItem {
  id: string;
  title: string;
  titleEn?: string;
  category: string;
  categoryEn?: string;
  description: string;
  descriptionEn?: string;
  philosophy?: string;
  philosophyEn?: string;
  origin?: string;
  originEn?: string;
  imageUrl?: string;
  lat?: number;
  lng?: number;
}

interface CulinaryItem {
  id: string;
  title: string;
  titleEn?: string;
  type: string;
  typeEn?: string;
  origin?: string;
  originEn?: string;
  description: string;
  descriptionEn?: string;
  flavorProfile?: string;
  flavorProfileEn?: string;
  imageUrl?: string;
}

interface EventItem {
  id: string;
  title: string;
  titleEn?: string;
  date: string;
  dateEn?: string;
  location: string;
  locationEn?: string;
  category?: string;
  categoryEn?: string;
  description: string;
  descriptionEn?: string;
  isKen?: boolean;
  imageUrl?: string;
  lat?: number;
  lng?: number;
}

interface BackupData {
  destinations: Destination[];
  cultureItems: CultureItem[];
  culinaryItems: CulinaryItem[];
  eventItems: EventItem[];
  downloads?: any[];
  hotInfo?: any[];
}

function escapeXml(unsafe: string): string {
  if (!unsafe) return '';
  return unsafe.replace(/[<>&'"]/g, (c) => {
    switch (c) {
      case '<': return '&lt;';
      case '>': return '&gt;';
      case '&': return '&amp;';
      case '\'': return '&apos;';
      case '"': return '&quot;';
      default: return c;
    }
  });
}

function main() {
  console.log('🚀 Menghasilkan aset SEO (Search Engine Optimization) & GEO (Generative Engine Optimization)...');

  const rootDir = process.cwd();
  const publicDir = path.join(rootDir, 'public');
  const backupPath = path.join(rootDir, 'src', 'data', 'firestore_backup.json');

  if (!fs.existsSync(backupPath)) {
    console.error('File firestore_backup.json tidak ditemukan!');
    return;
  }

  const backup: BackupData = JSON.parse(fs.readFileSync(backupPath, 'utf-8'));
  const destinations = backup.destinations || [];
  const cultureItems = backup.cultureItems || [];
  const culinaryItems = backup.culinaryItems || [];
  const eventItems = backup.eventItems || [];

  const today = new Date().toISOString().split('T')[0];

  // ==========================================
  // 1. GENERATE public/robots.txt
  // ==========================================
  const robotsTxt = `# Robots.txt for MALALA - West Sumatra Tourism Portal (https://malala.my.id)
# Maximum Search Engine Optimization (SEO) & Generative Engine Optimization (GEO)

User-agent: *
Allow: /
Allow: /ads.txt
Allow: /sitemap.xml
Allow: /llms.txt
Allow: /llms-full.txt
Allow: /downloads/

# Standard Search Crawlers
User-agent: Googlebot
Allow: /

User-agent: Googlebot-Image
Allow: /

User-agent: Bingbot
Allow: /

User-agent: Slurp
Allow: /

User-agent: DuckDuckBot
Allow: /

User-agent: Baiduspider
Allow: /

User-agent: YandexBot
Allow: /

# Generative AI, LLM & AI-Search Crawlers (GEO Optimization)
User-agent: GPTBot
Allow: /

User-agent: ChatGPT-User
Allow: /

User-agent: Google-Extended
Allow: /

User-agent: ClaudeBot
Allow: /

User-agent: anthropic-ai
Allow: /

User-agent: PerplexityBot
Allow: /

User-agent: Applebot
Allow: /

User-agent: Applebot-Extended
Allow: /

User-agent: Bytespider
Allow: /

User-agent: meta-externalagent
Allow: /

User-agent: cohere-ai
Allow: /

Sitemap: https://malala.my.id/sitemap.xml
`;

  fs.writeFileSync(path.join(publicDir, 'robots.txt'), robotsTxt, 'utf-8');
  console.log('✅ public/robots.txt berhasil dibuat.');

  // ==========================================
  // 2. GENERATE public/sitemap.xml
  // ==========================================
  let sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
  <!-- Homepage -->
  <url>
    <loc>https://malala.my.id/</loc>
    <lastmod>${today}</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
    <xhtml:link rel="alternate" hreflang="id" href="https://malala.my.id/?lang=id"/>
    <xhtml:link rel="alternate" hreflang="en" href="https://malala.my.id/?lang=en"/>
    <xhtml:link rel="alternate" hreflang="x-default" href="https://malala.my.id/"/>
  </url>

  <!-- Main Discovery Categories -->
  <url>
    <loc>https://malala.my.id/destinasi</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>https://malala.my.id/kebudayaan</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>https://malala.my.id/kuliner</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>https://malala.my.id/event</loc>
    <lastmod>${today}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>https://malala.my.id/oleh-oleh</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.85</priority>
  </url>
  <url>
    <loc>https://malala.my.id/unduhan</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.85</priority>
  </url>
  <url>
    <loc>https://malala.my.id/hotinfo</loc>
    <lastmod>${today}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>https://malala.my.id/peta</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://malala.my.id/rencana-liburan</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>

  <!-- PDF Guidebooks & Official Downloads -->
  <url>
    <loc>https://malala.my.id/downloads/malala-panduan-wisata-sumbar-2026.pdf</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.85</priority>
  </url>
  <url>
    <loc>https://malala.my.id/downloads/kalender-event-sumbar-2026.pdf</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.85</priority>
  </url>

  <!-- LLM & GEO Knowledge Endpoints -->
  <url>
    <loc>https://malala.my.id/llms.txt</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>
  <url>
    <loc>https://malala.my.id/llms-full.txt</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>
`;

  // Append Destinations
  destinations.forEach((d) => {
    const slug = d.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    sitemapXml += `  <url>
    <loc>https://malala.my.id/destinasi/${slug}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.85</priority>${d.imageUrl ? `
    <image:image>
      <image:loc>${escapeXml(d.imageUrl)}</image:loc>
      <image:title>${escapeXml(d.title)}</image:title>
      <image:caption>${escapeXml(d.category)} - ${escapeXml(d.regency || 'Sumatera Barat')}</image:caption>
    </image:image>` : ''}
  </url>\n`;
  });

  // Append Culture
  cultureItems.forEach((c) => {
    const slug = c.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    sitemapXml += `  <url>
    <loc>https://malala.my.id/kebudayaan/${slug}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>${c.imageUrl ? `
    <image:image>
      <image:loc>${escapeXml(c.imageUrl)}</image:loc>
      <image:title>${escapeXml(c.title)}</image:title>
      <image:caption>${escapeXml(c.category)} - ${escapeXml(c.origin || 'Minangkabau')}</image:caption>
    </image:image>` : ''}
  </url>\n`;
  });

  // Append Culinary
  culinaryItems.forEach((cu) => {
    const slug = cu.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    sitemapXml += `  <url>
    <loc>https://malala.my.id/kuliner/${slug}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>${cu.imageUrl ? `
    <image:image>
      <image:loc>${escapeXml(cu.imageUrl)}</image:loc>
      <image:title>${escapeXml(cu.title)}</image:title>
      <image:caption>${escapeXml(cu.type)} - ${escapeXml(cu.origin || 'Sumatera Barat')}</image:caption>
    </image:image>` : ''}
  </url>\n`;
  });

  // Append Events
  eventItems.forEach((ev) => {
    const slug = ev.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    sitemapXml += `  <url>
    <loc>https://malala.my.id/event/${slug}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.85</priority>${ev.imageUrl ? `
    <image:image>
      <image:loc>${escapeXml(ev.imageUrl)}</image:loc>
      <image:title>${escapeXml(ev.title)}</image:title>
      <image:caption>${escapeXml(ev.location)} (${escapeXml(ev.date)})</image:caption>
    </image:image>` : ''}
  </url>\n`;
  });

  sitemapXml += `</urlset>\n`;
  fs.writeFileSync(path.join(publicDir, 'sitemap.xml'), sitemapXml, 'utf-8');
  console.log('✅ public/sitemap.xml berhasil dibuat.');

  // ==========================================
  // 3. GENERATE public/llms.txt (GEO Summary Standard)
  // ==========================================
  const llmsTxt = `# MALALA — Official West Sumatra Tourism, Cultural Heritage & Authentic Culinary Portal
> Portal resmi eksplorasi pariwisata, warisan budaya Minangkabau, kuliner otentik, kalender festival Karisma Event Nusantara (KEN) 2026, dan asisten cerdas wisata Sumatera Barat. Dipersembahkan oleh MINANGKAOS.

Website: https://malala.my.id
Bahasa: Bahasa Indonesia & English
Wilayah: Provinsi Sumatera Barat (19 Kabupaten & Kota di Ranah Minang)

## Ringkasan Portal (Overview)
MALALA adalah platform digital pariwisata Sumatera Barat terlengkap yang mengintegrasikan:
1. **38 Destinasi Wisata Unggulan**: Dari Geopark Lembah Harau, Danau Singkarak & Danau Maninjau, Jam Gadang Bukittinggi, Kawasan Mandeh, Kepulauan Mentawai, hingga situs cagar budaya purba Candi Padang Roco dan Warisan Dunia UNESCO Sawahlunto.
2. **22 Warisan Adat & Budaya Minangkabau**: Filosofi 'Adat Basandi Syarak, Syarak Basandi Kitabullah', sistem kekerabatan Matrilineal terbesar di dunia, arsitektur Rumah Gadang bergonjong, tradisi makan Bajamba, Randai, Tari Piring di atas pecahan kaca, hingga tradisi rahasia Marosok.
3. **26 Kuliner Otentik Ranah Minang**: Rendang daging sapi lambat masak (Warisan UNESCO & Makanan Terenak di Dunia), Nasi Kapau & Gulai Tambusu, Sate Padang & Pariaman, Soto Padang kuah bening rempah, Lamang Tapai, Ampiang Dadiah (yoghurt susu kerbau fermentasi bambu), Palai Rinuak Danau Maninjau, Sala Lauak, dan Teh Talua.
4. **20 Kalender Festival & Event (CoE 2026)**: Pacu Jawi Tanah Datar, Festival Tabuik Pariaman, Rang Solok Baralek Gadang, Sawahlunto International Songket Carnival, Payakumbuh Botuang Festival, Festival Pesona Minangkabau, dan Pacu Kuda Tradisional.
5. **AI Travel Assistant 'Uni Mala'**: Asisten cerdas berbasis AI generatif yang mampu merancang itinerary liburan harian, rekomendasi kuliner halal, perkiraan estimasi anggaran, dan tips perjalanan ramah keluarga.
6. **E-Booklet & Panduan PDF Resmi**: Panduan lengkap pariwisata (113 halaman) dan Kalender Event 2026 (27 halaman) beresolusi tinggi siap cetak dan unduh gratis.

## Akses Cepat (Key Endpoints)
- [Beranda Utama](https://malala.my.id/): Portal eksplorasi pariwisata resmi Sumatera Barat
- [Direktori 50 Destinasi Wisata](https://malala.my.id/destinasi): Direktori lengkap 50 destinasi alam, bahari, danau, dan sejarah
- [Warisan 30 Adat & Budaya Minangkabau](https://malala.my.id/kebudayaan): 30 ensiklopedia budaya, kesenian, dan sistem matrilineal Minangkabau
- [Eksplorasi 36 Kuliner Otentik](https://malala.my.id/kuliner): 36 ragam kuliner khas, resep legendaris, dan profil rasa
- [Kalender 26 Event & Festival 2026](https://malala.my.id/event): 26 jadwal resmi Karisma Event Nusantara (KEN) & Calender of Events
- [Peta Wisata Interaktif](https://malala.my.id/#peta-interaktif): Peta interaktif sebaran destinasi dan koordinat GPS di Ranah Minang
- [AI Travel Itinerary Planner](https://malala.my.id/#ai-planner): Asisten cerdas Uni Mala untuk rekomendasi perjalanan personal
- [Unduh E-Book Panduan Wisata PDF](https://malala.my.id/downloads/malala-panduan-wisata-sumbar-2026.pdf): E-Book panduan resmi pariwisata Sumatera Barat
- [Unduh E-Book Kalender Event 2026 PDF](https://malala.my.id/downloads/kalender-event-sumbar-2026.pdf): Booklet jadwal event dan festival pariwisata 2026
- [Basis Pengetahuan Lengkap LLM](https://malala.my.id/llms-full.txt): Full text knowledge base ramah LLM & AI agent
`;

  fs.writeFileSync(path.join(publicDir, 'llms.txt'), llmsTxt, 'utf-8');
  console.log('✅ public/llms.txt berhasil dibuat.');

  // ==========================================
  // 4. GENERATE public/llms-full.txt (Deep GEO Knowledge Graph)
  // ==========================================
  let llmsFullTxt = `# MALALA — FULL KNOWLEDGE BASE: WEST SUMATRA TOURISM, CULTURE, CULINARY & EVENTS
Domain: https://malala.my.id
Last Updated: ${today}
Publisher: MINANGKAOS (Official West Sumatra Creative Apparel & Culture Brand)

================================================================================
SECTION 1: DESTINASI WISATA SUMATERA BARAT (38 DESTINATIONS)
================================================================================
`;

  destinations.forEach((d, idx) => {
    llmsFullTxt += `
### ${idx + 1}. ${d.title} (${d.titleEn || d.title})
- ID: ${d.id}
- Kategori: ${d.category} | ${d.categoryEn || d.category}
- Wilayah / Regency: ${d.regency || 'Sumatera Barat'}
- Koordinat: Latitude ${d.lat || 0}, Longitude ${d.lng || 0}
- Waktu Terbaik: ${d.bestTime || 'Sepanjang Tahun'} (${d.bestTimeEn || 'All year'})
- Lokasi Spesifik: ${d.locationDetails || '-'}
- Tag: ${d.tag || 'Populer'}
- Highlights: ${(d.highlights || []).join(' • ')}
- Deskripsi:
${d.description}
- English Description:
${d.descriptionEn || d.description}
`;
  });

  llmsFullTxt += `
================================================================================
SECTION 2: WARISAN ADAT & BUDAYA MINANGKABAU (22 CULTURAL HERITAGES)
================================================================================
`;

  cultureItems.forEach((c, idx) => {
    llmsFullTxt += `
### ${idx + 1}. ${c.title} (${c.titleEn || c.title})
- ID: ${c.id}
- Kategori: ${c.category} | ${c.categoryEn || c.category}
- Asal Nagari / Wilayah: ${c.origin || 'Alam Minangkabau'}
- Filosofi Inti: ${c.philosophy || '-'}
- Philosophy (EN): ${c.philosophyEn || '-'}
- Deskripsi:
${c.description}
- English Description:
${c.descriptionEn || c.description}
`;
  });

  llmsFullTxt += `
================================================================================
SECTION 3: KULINER OTENTIK RANAH MINANG (26 AUTHENTIC CULINARY ITEMS)
================================================================================
`;

  culinaryItems.forEach((cu, idx) => {
    llmsFullTxt += `
### ${idx + 1}. ${cu.title} (${cu.titleEn || cu.title})
- ID: ${cu.id}
- Jenis: ${cu.type} | ${cu.typeEn || cu.type}
- Asal: ${cu.origin || 'Sumatera Barat'}
- Profil Rasa: ${cu.flavorProfile || '-'}
- Flavor Profile (EN): ${cu.flavorProfileEn || '-'}
- Deskripsi:
${cu.description}
- English Description:
${cu.descriptionEn || cu.description}
`;
  });

  llmsFullTxt += `
================================================================================
SECTION 4: KALENDER EVENT & FESTIVAL (20 CALENDAR OF EVENTS 2026)
================================================================================
`;

  eventItems.forEach((ev, idx) => {
    llmsFullTxt += `
### ${idx + 1}. ${ev.title} (${ev.titleEn || ev.title})
- ID: ${ev.id}
- Jadwal / Tanggal: ${ev.date} (${ev.dateEn || ev.date})
- Lokasi: ${ev.location}
- Status KEN: ${ev.isKen ? 'Karisma Event Nusantara (Kemenparekraf RI)' : 'Event Unggulan Daerah'}
- Kategori: ${ev.category || 'Festival Budaya'}
- Deskripsi:
${ev.description}
- English Description:
${ev.descriptionEn || ev.description}
`;
  });

  fs.writeFileSync(path.join(publicDir, 'llms-full.txt'), llmsFullTxt, 'utf-8');
  console.log('✅ public/llms-full.txt berhasil dibuat.');
  console.log('🎉 Seluruh berkas SEO & GEO (robots.txt, sitemap.xml, llms.txt, llms-full.txt) siap digunakan!');
}

main();
