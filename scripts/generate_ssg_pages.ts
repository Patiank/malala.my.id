import * as fs from 'fs';
import * as path from 'path';
import { HOT_INFO_FALLBACK } from '../src/utils/ai.js';
import { getDestinationRatingSummary } from '../src/data/reviewsData.js';

function slugify(text: string): string {
  if (!text) return '';
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function escapeHtml(unsafe: string): string {
  if (!unsafe) return '';
  return unsafe
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function injectInternalLinks(text: string): string {
  const links: [RegExp, string][] = [
    [/\bLembah Anai\b/g, '<a href="/destinasi/air-terjun-lembah-anai" style="color: #0284c7; text-decoration: underline; font-weight: 600;">Lembah Anai</a>'],
    [/\bBukittinggi\b/g, '<a href="/destinasi/jam-gadang-bukittinggi" style="color: #0284c7; text-decoration: underline; font-weight: 600;">Bukittinggi</a>'],
    [/\bJam Gadang\b/g, '<a href="/destinasi/jam-gadang-bukittinggi" style="color: #0284c7; text-decoration: underline; font-weight: 600;">Jam Gadang</a>'],
    [/\bPandai Sikek\b/g, '<a href="/kebudayaan/songket-pandai-sikek" style="color: #0284c7; text-decoration: underline; font-weight: 600;">Pandai Sikek</a>'],
    [/\bPacu Jawi\b/g, '<a href="/event/pacu-jawi" style="color: #0284c7; text-decoration: underline; font-weight: 600;">Pacu Jawi</a>'],
    [/\bFestival Tabuik\b/g, '<a href="/event/pesona-budaya-tabuik" style="color: #0284c7; text-decoration: underline; font-weight: 600;">Festival Tabuik</a>'],
    [/\bTabuik\b/g, '<a href="/event/pesona-budaya-tabuik" style="color: #0284c7; text-decoration: underline; font-weight: 600;">Tabuik</a>'],
    [/\bDanau Singkarak\b/g, '<a href="/destinasi/danau-singkarak" style="color: #0284c7; text-decoration: underline; font-weight: 600;">Danau Singkarak</a>'],
    [/\bNasi Kapau\b/g, '<a href="/kuliner/nasi-kapau" style="color: #0284c7; text-decoration: underline; font-weight: 600;">Nasi Kapau</a>'],
    [/\bSala Lauak\b/g, '<a href="/kuliner/sala-lauak" style="color: #0284c7; text-decoration: underline; font-weight: 600;">Sala Lauak</a>'],
    [/\bLamang Tapai\b/g, '<a href="/kuliner/lamang-tapai" style="color: #0284c7; text-decoration: underline; font-weight: 600;">Lamang Tapai</a>'],
    [/\bSitinjau Lauik\b/g, '<a href="/destinasi/danau-diatas-dan-danau-dibawah" style="color: #0284c7; text-decoration: underline; font-weight: 600;">Sitinjau Lauik</a>']
  ];

  let result = text;
  for (const [regex, replacement] of links) {
    let replaced = false;
    result = result.replace(regex, (match) => {
      if (!replaced) {
        replaced = true;
        return replacement;
      }
      return match;
    });
  }
  return result;
}

const FAQS = [
  {
    question: "Apa saja tempat wisata hits di Sumbar 2026 yang wajib dikunjungi?",
    answer: "Untuk rekomendasi tempat wisata hits di Sumbar 2026, Anda wajib mengunjungi surga tersembunyi Mandeh (Raja Ampat-nya Sumatera Barat), pesona wisata Lembah Harau terbaru, menikmati sunset dan mencari info tiket masuk Ngarai Sianok di Bukittinggi, Danau Singkarak & Maninjau, hingga selancar ombak kelas dunia di Kepulauan Mentawai."
  },
  {
    question: "Kapan jadwal Festival Tabuik Pariaman dan jadwal Pacu Jawi 2026 diadakan?",
    answer: "Jadwal Pacu Jawi 2026 di Tanah Datar biasanya diadakan bergilir setiap akhir pekan pasca-panen raya. Sementara untuk festival Tabuik Pariaman 2026, acara puncak (Tabuik Naik Pangkek dan Dibuang ke Laut) diselenggarakan bertepatan dengan 10 Muharram kalender Hijriah (Juni/Juli 2026). Anda juga bisa mengecek jadwal resmi Karisma Event Nusantara (KEN) di portal kalender event Malala."
  },
  {
    question: "Apa saja rekomendasi kuliner khas Padang Bukittinggi yang terenak?",
    answer: "Rekomendasi kuliner khas Padang Bukittinggi meliputi Rendang Daging autentik Payakumbuh, daftar tempat makan Nasi Kapau asli di Los Lambuang Pasar Ateh Bukittinggi, Sate Padang Mak Syukur Padang Panjang, Soto Padang legendaris, Gulai Itiak Lado Mudo Koto Gadang, hingga Palai Rinuak Danau Maninjau."
  },
  {
    question: "Berapa estimasi budget liburan ke Sumatera Barat 3 hari 2 malam (3D2N)?",
    answer: "Estimasi budget liburan 3 hari 2 malam di Sumbar berkisar antara Rp 1.200.000 hingga Rp 2.500.000 per orang untuk kategori medium traveler. Ini mencakup sewa mobil wisata harian (avanza/innova plus supir), penginapan hotel bintang 3 di Bukittinggi/Padang, tiket masuk destinasi wisata, serta berwisata kuliner autentik Minang. Malala juga menyediakan Generator Itinerary AI Uni Mala untuk menghitung rencana budget otomatis."
  },
  {
    question: "Apa perbedaan antara Nasi Kapau dan Nasi Padang biasa?",
    answer: "Perbedaan utama terletak pada susunan lauk dan bumbu khasnya. Nasi Kapau berasal dari Nagari Kapau di Agam, disajikan di atas meja bertingkat dengan sendok centong kayu panjang khas, menyajikan menu ikonik yang jarang ada di rumah makan Padang biasa seperti Gulai Tambusu (usus sapi isi telur dan tahu), Gulai Tunjang, Sambal Lado Cangkuak, dan Gulai Cubadak (nangka) bercita rasa rebung yang segar."
  },
  {
    question: "Bagaimana cara transportasi dari Bandara Internasional Minangkabau (BIM) ke destinasi wisata?",
    answer: "Dari Bandara Internasional Minangkabau (BIM), wisatawan dapat menggunakan Kereta Bandara Minangkabau Ekspres ke stasiun pusat Kota Padang, armada Bus Damri, taksi resmi bandara, atau sewa mobil rental wisata untuk langsung menempuh rute Padang - Air Terjun Lembah Anai - Padang Panjang - Bukittinggi - Harau Payakumbuh."
  },
  {
    question: "Bagaimana cara menyeberang menuju Kepulauan Mentawai dari Padang?",
    answer: "Untuk menuju Kepulauan Mentawai (Tua Pejat/Siberut), wisatawan dapat menaiki kapal cepat Mentawai Fast dari Pelabuhan Muaro Padang dengan waktu tempuh sekitar 3,5 jam, atau menaiki kapal feri ASDP KMP Ambu-Ambu dari Pelabuhan Teluk Bayur/Bungus untuk perjalanan malam hari."
  },
  {
    question: "Apa saja rekomendasi air terjun tersembunyi (hidden gems) di Sumatera Barat?",
    answer: "Sumatera Barat kaya akan air terjun spektakuler, antara lain Air Terjun Nyarai di Hutan Lindung Gamaran Padang Pariaman (dengan kolam zamrud alami dan cliff jumping), Air Terjun Lembah Anai di tepi jalan lintas, Sarasah Batang Kapur di Lima Puluh Kota, Lubuk Hitam berundak di Padang, dan Air Terjun Proklamator."
  },
  {
    question: "Di mana pusat belanja oleh-oleh dan suvenir khas Minangkabau terlengkap?",
    answer: "Pusat oleh-oleh khas Sumatera Barat terlengkap dapat ditemukan di Sentra Tenun Songket Pandai Sikek Tanah Datar, Keripik Sanjai Christine Hakim Padang, Sentra Sulam Mukena Bukittinggi, serta suvenir merchandise resmi dan pakaian budaya Minang kreasi MINANGKAOS."
  },
  {
    question: "Di mana link download peta wisata Sumatera Barat PDF gratis?",
    answer: "Anda bisa download peta wisata Sumatera Barat PDF gratis dan download buku panduan pariwisata Sumbar 2026 PDF (lengkap 149 halaman kartu wisata) resolusi tinggi langsung melalui menu Unduhan di portal resmi Malala tanpa dipungut biaya."
  }
];

function buildFaqJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": FAQS.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };
}

function buildOrganizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "TouristInformationCenter",
    "name": "MALALA — Pusat Informasi Pariwisata Sumatera Barat",
    "alternateName": ["MALALA", "Pariwisata Sumbar Info"],
    "url": "https://malala.my.id",
    "logo": "https://malala.my.id/favicon.png",
    "description": "Pusat informasi resmi pariwisata Sumatera Barat dan panduan wisata Ranah Minang 2026.",
    "sameAs": [
      "https://www.instagram.com/minangkaos",
      "https://github.com/Patiank/malala.my.id"
    ]
  };
}

function buildWebsiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "MALALA — Pariwisata Sumatera Barat & Pariwisata Sumbar 2026",
    "alternateName": ["Pariwisata Sumatera Barat", "Pariwisata Sumbar", "Wisata Sumbar"],
    "url": "https://malala.my.id",
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://malala.my.id/destinasi?q={search_term_string}",
      "query-input": "required name=search_term_string"
    }
  };
}

function generateHtmlPage(
  templateHtml: string,
  options: {
    title: string;
    description: string;
    canonicalUrl: string;
    imageUrl?: string;
    jsonLdList: Record<string, any>[];
    bodyContent?: string;
  }
): string {
  let html = templateHtml;

  // Replace <title>
  html = html.replace(/<title>.*?<\/title>/is, `<title>${escapeHtml(options.title)}</title>`);

  // Replace / inject Meta Description
  if (html.includes('<meta name="description"')) {
    html = html.replace(/<meta name="description" content=".*?"/is, `<meta name="description" content="${escapeHtml(options.description)}"`);
  } else {
    html = html.replace('</head>', `  <meta name="description" content="${escapeHtml(options.description)}">\n</head>`);
  }

  // Canonical link
  const canonicalTag = `<link rel="canonical" href="${options.canonicalUrl}" />`;
  if (html.includes('<link rel="canonical"')) {
    html = html.replace(/<link rel="canonical"[^>]*>/i, canonicalTag);
  } else {
    html = html.replace('</head>', `  ${canonicalTag}\n</head>`);
  }

  // OpenGraph Tags
  const ogImage = options.imageUrl || 'https://malala.my.id/favicon.png';
  const ogTags = `
  <meta property="og:title" content="${escapeHtml(options.title)}" />
  <meta property="og:description" content="${escapeHtml(options.description)}" />
  <meta property="og:url" content="${options.canonicalUrl}" />
  <meta property="og:image" content="${ogImage}" />
  <meta property="og:type" content="website" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="${escapeHtml(options.title)}" />
  <meta name="twitter:description" content="${escapeHtml(options.description)}" />
  <meta name="twitter:image" content="${ogImage}" />
  `;

  // Inject Schemas
  const scripts = options.jsonLdList
    .map(data => `<script type="application/ld+json">\n${JSON.stringify(data, null, 2)}\n</script>`)
    .join('\n  ');

  html = html.replace('</head>', `${ogTags}\n  ${scripts}\n</head>`);

  // Inject Pre-rendered Semantic HTML inside <div id="root"> wrapped in <noscript>
  // This guarantees 0 Cumulative Layout Shift (CLS = 0) for browser visitors while providing 100% SEO indexability for crawlers
  if (options.bodyContent) {
    if (options.canonicalUrl.endsWith('/sitemap')) {
      html = html.replace(
        /<div id="root">[\s\S]*?<\/div>/i,
        `<div id="root">\n  <noscript>\n${options.bodyContent}\n  </noscript>\n</div>\n<main id="static-sitemap-view" style="position: relative; z-index: 10; background: #070a12; min-height: 100vh;">\n${options.bodyContent}\n</main>`
      );
    } else {
      html = html.replace(
        /<div id="root">[\s\S]*?<\/div>/i,
        `<div id="root">\n  <noscript>\n${options.bodyContent}\n  </noscript>\n</div>`
      );
    }
  }

  return html;
}

function writePage(outDir: string, relativePath: string, htmlContent: string) {
  const fullPath = path.join(outDir, relativePath, 'index.html');
  const dir = path.dirname(fullPath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  fs.writeFileSync(fullPath, htmlContent, 'utf-8');
}

export function generateSsg() {
  console.log('🚀 Memulai Static Site Generation (SSG) & FAQ Rich Snippets Generator...');

  const rootDir = process.cwd();
  const distDir = path.join(rootDir, 'dist');
  const indexHtmlPath = path.join(distDir, 'index.html');
  const backupJsonPath = path.join(rootDir, 'src', 'data', 'firestore_backup.json');

  if (!fs.existsSync(indexHtmlPath)) {
    console.error('❌ dist/index.html tidak ditemukan! Jalankan vite build terlebih dahulu.');
    return;
  }

  const baseTemplate = fs.readFileSync(indexHtmlPath, 'utf-8');
  const backupData = fs.existsSync(backupJsonPath) ? JSON.parse(fs.readFileSync(backupJsonPath, 'utf-8')) : {};

  const destinations: any[] = backupData.destinations || [];
  const cultureItems: any[] = backupData.cultureItems || [];
  const culinaryItems: any[] = backupData.culinaryItems || [];
  const eventItems: any[] = backupData.eventItems || [];
  const hotInfoItems: any[] = (backupData.hotInfoItems && backupData.hotInfoItems.length > 0)
    ? backupData.hotInfoItems
    : (backupData.hotInfo && backupData.hotInfo.length > 0 ? backupData.hotInfo : HOT_INFO_FALLBACK);

  console.log('📄 Mengoptimasi Homepage dengan FAQPage Schema & Organization JSON-LD...');
  const homeContent = `
    <div style="max-width: 1200px; margin: 0 auto; padding: 2rem 1.5rem; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; color: #cbd5e1; line-height: 1.7; background: #070a12;">
      <header style="margin-bottom: 2.5rem; text-align: center; border-bottom: 1px solid #1e293b; padding-bottom: 2rem;">
        <h1 style="font-size: 2.25rem; font-weight: 800; color: #f8fafc; margin-bottom: 0.75rem;">Pariwisata Sumatera Barat &amp; Panduan Pariwisata Sumbar 2026 (MALALA)</h1>
        <p style="font-size: 1.15rem; color: #94a3b8; max-width: 820px; margin: 0 auto;">Portal resmi panduan pariwisata Sumatera Barat terlengkap: eksplorasi 50+ destinasi wisata alam dan geopark, 30+ warisan adat budaya Minangkabau, 36+ kuliner autentik legendaris, kalender pariwisata Sumbar &amp; Karisma Event Nusantara (KEN) 2026, serta asisten AI Uni Mala.</p>
        <nav style="margin-top: 1.5rem; display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap;">
          <a href="/destinasi" style="color: #ef4444; font-weight: 600; text-decoration: none;">Jelajah 50+ Destinasi &rarr;</a>
          <a href="/kebudayaan" style="color: #ef4444; font-weight: 600; text-decoration: none;">Warisan Budaya Minang &rarr;</a>
          <a href="/kuliner" style="color: #ef4444; font-weight: 600; text-decoration: none;">Kuliner Autentik &rarr;</a>
          <a href="/event" style="color: #ef4444; font-weight: 600; text-decoration: none;">Kalender Event 2026 &rarr;</a>
          <a href="/berita" style="color: #ef4444; font-weight: 600; text-decoration: none;">Berita &amp; Info Terkini &rarr;</a>
          <a href="/unduhan" style="color: #ef4444; font-weight: 600; text-decoration: none;">Download E-Book PDF &rarr;</a>
        </nav>
      </header>
      <section style="margin-top: 3rem; background: #0f172a; padding: 2rem; border-radius: 1rem; border: 1px solid #1e293b;">
        <h2 style="font-size: 1.5rem; font-weight: 700; color: #f8fafc; margin-bottom: 1.5rem;">Tanya Jawab Seputar Pariwisata Sumatera Barat &amp; Pariwisata Sumbar (FAQ)</h2>
        ${FAQS.map(f => `
          <article style="margin-bottom: 1.5rem; border-bottom: 1px solid #1e293b; padding-bottom: 1rem;">
            <h3 style="font-size: 1.15rem; font-weight: 600; color: #f1f5f9; margin-bottom: 0.5rem;">${escapeHtml(f.question)}</h3>
            <p style="color: #94a3b8;">${escapeHtml(f.answer)}</p>
          </article>
        `).join('')}
      </section>
    </div>
  `;

  const optimizedHome = generateHtmlPage(baseTemplate, {
    title: 'Pariwisata Sumatera Barat & Pariwisata Sumbar 2026: Panduan 50 Destinasi, Budaya & Kuliner | MALALA',
    description: 'Portal resmi pariwisata Sumatera Barat & panduan pariwisata Sumbar 2026. Temukan 50+ destinasi hits, rute keliling Sumbar tanpa bolak-balik, 36 kuliner Minang terenak, jadwal Pacu Jawi & Tabuik KEN 2026, peta wisata gratis, dan asisten AI cerdas Uni Mala.',
    canonicalUrl: 'https://malala.my.id/',
    jsonLdList: [buildOrganizationJsonLd(), buildWebsiteJsonLd(), buildFaqJsonLd()],
    bodyContent: homeContent
  });
  fs.writeFileSync(indexHtmlPath, optimizedHome, 'utf-8');

  // 2. GENERATE DESTINASI CATEGORY DIRECTORY PAGE (/destinasi)
  console.log('📄 Mengoptimasi Halaman Direktori /destinasi dengan Katalog 50 Destinasi Lengkap...');
  const destinasiCatalogHtml = `
    <div style="max-width: 1200px; margin: 0 auto; padding: 2.5rem 1.5rem; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; color: #cbd5e1; line-height: 1.7; background: #070a12;">
      <nav style="font-size: 0.9rem; margin-bottom: 1.5rem; color: #94a3b8;">
        <a href="/" style="color: #94a3b8; text-decoration: none;">Pariwisata Sumatera Barat</a> &gt; <span style="color: #f8fafc; font-weight: 600;">Destinasi</span>
      </nav>
      <header style="margin-bottom: 3rem; border-bottom: 1px solid #1e293b; padding-bottom: 2rem;">
        <h1 style="font-size: 2.25rem; font-weight: 800; color: #f8fafc; margin-bottom: 0.75rem;">Katalog 50+ Destinasi Wisata Terbaik di Sumatera Barat 2026</h1>
        <p style="font-size: 1.15rem; color: #94a3b8;">Jelajahi keindahan alam Bukit Barisan, geopark tebing granit Lembah Harau, danau vulkanik Singkarak & Maninjau, surga bahari Mandeh & Mentawai, serta desa wisata terindah di Ranah Minang.</p>
      </header>
      <section style="display: grid; grid-template-columns: repeat(auto-fill, minmax(320px, 1fr)); gap: 2rem;">
        ${destinations.map(d => {
          const slug = slugify(d.title);
          const ratingSummary = getDestinationRatingSummary(d.id, d.title);
          return `
            <article style="background: #0f172a; border: 1px solid #1e293b; border-radius: 1rem; padding: 1.5rem; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.3);">
              <h2 style="font-size: 1.35rem; font-weight: 700; margin-bottom: 0.5rem;">
                <a href="/destinasi/${slug}" style="color: #f8fafc; text-decoration: none;">${escapeHtml(d.title)}</a>
              </h2>
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.75rem; flex-wrap: wrap; gap: 0.5rem;">
                <p style="font-size: 0.875rem; color: #ef4444; font-weight: 600; margin: 0;">📍 ${escapeHtml(d.regency || 'Sumatera Barat')} • <span style="color: #94a3b8;">${escapeHtml(d.category || 'Wisata Alam')}</span></p>
                <span style="background: #451a03; color: #fbbf24; font-size: 0.8rem; font-weight: 700; padding: 0.15rem 0.55rem; border-radius: 9999px; display: inline-flex; align-items: center; gap: 0.25rem;">
                  ⭐ ${ratingSummary.rating.toFixed(1)} (${ratingSummary.reviewCount})
                </span>
              </div>
              <p style="color: #94a3b8; font-size: 0.95rem; margin-bottom: 1rem;">${escapeHtml((d.description || '').substring(0, 180))}...</p>
              <a href="/destinasi/${slug}" style="display: inline-block; color: #ef4444; font-weight: 600; text-decoration: none; font-size: 0.95rem;">Lihat Panduan & Rute Lengkap &rarr;</a>
            </article>
          `;
        }).join('')}
      </section>
    </div>
  `;

  const destinasiPage = generateHtmlPage(baseTemplate, {
    title: 'Destinasi Wisata Sumatera Barat: 50+ Rekomendasi Hits & Rute 2026 | MALALA',
    description: 'Katalog resmi 50+ destinasi wisata terbaik di Sumatera Barat. Temukan rute Lembah Harau, Mandeh, Mentawai, Ngarai Sianok, Danau Singkarak, dan desa wisata Ranah Minang.',
    canonicalUrl: 'https://malala.my.id/destinasi',
    jsonLdList: [
      {
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        "name": "Katalog 50+ Destinasi Wisata Terbaik Sumatera Barat",
        "description": "Daftar lengkap objek wisata alam, danau, geopark, dan bahari di Sumatera Barat.",
        "url": "https://malala.my.id/destinasi"
      },
      buildFaqJsonLd()
    ],
    bodyContent: destinasiCatalogHtml
  });
  writePage(distDir, 'destinasi', destinasiPage);

  // 3. GENERATE KEBUDAYAAN CATEGORY DIRECTORY PAGE (/kebudayaan)
  console.log('📄 Mengoptimasi Halaman Direktori /kebudayaan dengan Katalog 30 Warisan Budaya...');
  const kebudayaanCatalogHtml = `
    <div style="max-width: 1200px; margin: 0 auto; padding: 2.5rem 1.5rem; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; color: #cbd5e1; line-height: 1.7; background: #070a12;">
      <nav style="font-size: 0.9rem; margin-bottom: 1.5rem; color: #94a3b8;">
        <a href="/" style="color: #94a3b8; text-decoration: none;">Pariwisata Sumatera Barat</a> &gt; <span style="color: #f8fafc; font-weight: 600;">Kebudayaan</span>
      </nav>
      <header style="margin-bottom: 3rem; border-bottom: 1px solid #1e293b; padding-bottom: 2rem;">
        <h1 style="font-size: 2.25rem; font-weight: 800; color: #f8fafc; margin-bottom: 0.75rem;">Katalog 30+ Warisan Adat & Seni Budaya Minangkabau</h1>
        <p style="font-size: 1.15rem; color: #94a3b8;">Eksplorasi keluhuran filosofi Adat Basandi Syarak, Syarak Basandi Kitabullah, sistem matrilineal, kemegahan arsitektur Rumah Gadang, Tari Piring, bela diri Silek, dan tenun pusaka Pandai Sikek.</p>
      </header>
      <section style="display: grid; grid-template-columns: repeat(auto-fill, minmax(320px, 1fr)); gap: 2rem;">
        ${cultureItems.map(c => {
          const slug = slugify(c.title);
          return `
            <article style="background: #0f172a; border: 1px solid #1e293b; border-radius: 1rem; padding: 1.5rem; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.3);">
              <h2 style="font-size: 1.35rem; font-weight: 700; margin-bottom: 0.5rem;">
                <a href="/kebudayaan/${slug}" style="color: #f8fafc; text-decoration: none;">${escapeHtml(c.title)}</a>
              </h2>
              <p style="font-size: 0.875rem; color: #f59e0b; font-weight: 600; margin-bottom: 0.75rem;">🏛️ ${escapeHtml(c.category || 'Tradisi Adat')} • <span style="color: #94a3b8;">${escapeHtml(c.origin || 'Minangkabau')}</span></p>
              ${c.philosophy ? `<p style="font-size: 0.9rem; color: #10b981; font-style: italic; margin-bottom: 0.75rem;">"${escapeHtml(c.philosophy)}"</p>` : ''}
              <p style="color: #94a3b8; font-size: 0.95rem; margin-bottom: 1rem;">${escapeHtml((c.description || '').substring(0, 180))}...</p>
              <a href="/kebudayaan/${slug}" style="display: inline-block; color: #ef4444; font-weight: 600; text-decoration: none; font-size: 0.95rem;">Baca Filosofi & Sejarah &rarr;</a>
            </article>
          `;
        }).join('')}
      </section>
    </div>
  `;

  const kebudayaanPage = generateHtmlPage(baseTemplate, {
    title: 'Warisan Budaya Minangkabau: 30+ Adat, Falsafah & Seni Tradisi | MALALA',
    description: 'Pelajari filosofi adat basandi syarak, sistem kekerabatan matrilineal, arsitektur Rumah Gadang, seni Silek Minang, Tari Piring, dan Songket Pandai Sikek di Sumatera Barat.',
    canonicalUrl: 'https://malala.my.id/kebudayaan',
    jsonLdList: [
      {
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        "name": "Katalog Warisan Adat & Kebudayaan Minangkabau",
        "description": "Ensiklopedia tradisi, upacara adat, seni pertunjukan, dan falsafah hidup Minangkabau.",
        "url": "https://malala.my.id/kebudayaan"
      },
      buildFaqJsonLd()
    ],
    bodyContent: kebudayaanCatalogHtml
  });
  writePage(distDir, 'kebudayaan', kebudayaanPage);

  // 4. GENERATE KULINER CATEGORY DIRECTORY PAGE (/kuliner)
  console.log('📄 Mengoptimasi Halaman Direktori /kuliner dengan 36 Kuliner Autentik...');
  const kulinerCatalogHtml = `
    <div style="max-width: 1200px; margin: 0 auto; padding: 2.5rem 1.5rem; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; color: #1e293b; line-height: 1.7;">
      <nav style="font-size: 0.9rem; margin-bottom: 1.5rem; color: #64748b;">
        <a href="/" style="color: #64748b; text-decoration: none;">Pariwisata Sumatera Barat</a> &gt; <span style="color: #0f172a; font-weight: 600;">Kuliner</span>
      </nav>
      <header style="margin-bottom: 3rem; border-bottom: 2px solid #e2e8f0; padding-bottom: 2rem;">
        <h1 style="font-size: 2.25rem; font-weight: 800; color: #0f172a; margin-bottom: 0.75rem;">Katalog 36+ Kuliner Autentik Khas Minangkabau</h1>
        <p style="font-size: 1.15rem; color: #475569;">Panduan berburu kuliner legendaris Sumatera Barat: Rendang Daging terlezat di dunia, Nasi Kapau Pasar Ateh, Sate Padang Mak Syukur, Soto Padang, Teh Talua, hingga Palai Rinuak Danau Maninjau.</p>
      </header>
      <section style="display: grid; grid-template-columns: repeat(auto-fill, minmax(320px, 1fr)); gap: 2rem;">
        ${culinaryItems.map(cu => {
          const slug = slugify(cu.title);
          return `
            <article style="background: #ffffff; border: 1px solid #e2e8f0; border-radius: 1rem; padding: 1.5rem; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05);">
              <h2 style="font-size: 1.35rem; font-weight: 700; margin-bottom: 0.5rem;">
                <a href="/kuliner/${slug}" style="color: #0f172a; text-decoration: none;">${escapeHtml(cu.title)}</a>
              </h2>
              <p style="font-size: 0.875rem; color: #ea580c; font-weight: 600; margin-bottom: 0.75rem;">🍲 ${escapeHtml(cu.type || 'Makanan Utama')} • <span style="color: #64748b;">Asal: ${escapeHtml(cu.origin || 'Sumatera Barat')}</span></p>
              ${cu.flavorProfile ? `<p style="font-size: 0.9rem; color: #475569; margin-bottom: 0.75rem;"><strong>Cita Rasa:</strong> ${escapeHtml(cu.flavorProfile)}</p>` : ''}
              <p style="color: #475569; font-size: 0.95rem; margin-bottom: 1rem;">${escapeHtml((cu.description || '').substring(0, 180))}...</p>
              <a href="/kuliner/${slug}" style="display: inline-block; color: #dc2626; font-weight: 600; text-decoration: none; font-size: 0.95rem;">Lihat Resep & Rekomendasi Tempat Makan &rarr;</a>
            </article>
          `;
        }).join('')}
      </section>
    </div>
  `;

  const kulinerPage = generateHtmlPage(baseTemplate, {
    title: 'Kuliner Khas Minangkabau: 36+ Makanan Khas Padang Terenak | MALALA',
    description: 'Panduan wisata kuliner khas Padang Bukittinggi: Nasi Kapau asli, Rendang daging otentik, Sate Padang terenak, Gulai Itiak Lado Mudo, dan minuman segar Teh Talua.',
    canonicalUrl: 'https://malala.my.id/kuliner',
    jsonLdList: [
      {
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        "name": "Katalog Kuliner Autentik Khas Minangkabau",
        "description": "Daftar kuliner pusaka dan hidangan legendaris dari seluruh pelosok Ranah Minang.",
        "url": "https://malala.my.id/kuliner"
      },
      buildFaqJsonLd()
    ],
    bodyContent: kulinerCatalogHtml
  });
  writePage(distDir, 'kuliner', kulinerPage);

  // 5. GENERATE EVENT CATEGORY DIRECTORY PAGE (/event)
  console.log('📄 Mengoptimasi Halaman Direktori /event dengan Kalender 26 Event...');
  const eventCatalogHtml = `
    <div style="max-width: 1200px; margin: 0 auto; padding: 2.5rem 1.5rem; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; color: #1e293b; line-height: 1.7;">
      <nav style="font-size: 0.9rem; margin-bottom: 1.5rem; color: #64748b;">
        <a href="/" style="color: #64748b; text-decoration: none;">Pariwisata Sumatera Barat</a> &gt; <span style="color: #0f172a; font-weight: 600;">Event & Festival</span>
      </nav>
      <header style="margin-bottom: 3rem; border-bottom: 2px solid #e2e8f0; padding-bottom: 2rem;">
        <h1 style="font-size: 2.25rem; font-weight: 800; color: #0f172a; margin-bottom: 0.75rem;">Kalender Event & Festival Wisata Sumatera Barat 2026</h1>
        <p style="font-size: 1.15rem; color: #475569;">Agenda resmi festival pariwisata Karisma Event Nusantara (KEN Kemenparekraf) dan Calendar of Events (CoE) Sumbar 2026: Pacu Jawi, Festival Tabuik, Rang Solok Baralek Gadang, dan Tour de Singkarak.</p>
      </header>
      <section style="display: grid; grid-template-columns: repeat(auto-fill, minmax(320px, 1fr)); gap: 2rem;">
        ${eventItems.map(ev => {
          const slug = slugify(ev.title);
          return `
            <article style="background: #ffffff; border: 1px solid #e2e8f0; border-radius: 1rem; padding: 1.5rem; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05);">
              <h2 style="font-size: 1.35rem; font-weight: 700; margin-bottom: 0.5rem;">
                <a href="/event/${slug}" style="color: #0f172a; text-decoration: none;">${escapeHtml(ev.title)}</a>
              </h2>
              <p style="font-size: 0.875rem; color: #0284c7; font-weight: 600; margin-bottom: 0.5rem;">🗓️ ${escapeHtml(ev.schedule || '2026')} • 📍 ${escapeHtml(ev.location || 'Sumatera Barat')}</p>
              ${ev.isKen ? `<span style="display: inline-block; background: #fef3c7; color: #b45309; font-size: 0.75rem; font-weight: 700; padding: 0.2rem 0.6rem; rounded-full: 9999px; border-radius: 9999px; margin-bottom: 0.75rem;">🌟 Karisma Event Nusantara (KEN)</span>` : ''}
              <p style="color: #475569; font-size: 0.95rem; margin-bottom: 1rem;">${escapeHtml((ev.description || '').substring(0, 180))}...</p>
              <a href="/event/${slug}" style="display: inline-block; color: #dc2626; font-weight: 600; text-decoration: none; font-size: 0.95rem;">Lihat Jadwal & Info Lokasi &rarr;</a>
            </article>
          `;
        }).join('')}
      </section>
    </div>
  `;

  const eventPage = generateHtmlPage(baseTemplate, {
    title: 'Kalender Event Sumbar 2026: 26+ Festival Karisma Event Nusantara | MALALA',
    description: 'Cek jadwal resmi Pacu Jawi 2026 Tanah Datar, jadwal prosesi Festival Tabuik Pariaman, Tour de Singkarak, dan kalender festival budaya KEN Sumatera Barat 2026.',
    canonicalUrl: 'https://malala.my.id/event',
    jsonLdList: [
      {
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        "name": "Kalender Event & Festival Budaya Sumatera Barat 2026",
        "description": "Jadwal resmi perhelatan seni, parade budaya, dan festival pariwisata Sumatera Barat.",
        "url": "https://malala.my.id/event"
      },
      buildFaqJsonLd()
    ],
    bodyContent: eventCatalogHtml
  });
  writePage(distDir, 'event', eventPage);

  // 5B. GENERATE BERITA & HOT INFO DIRECTORY PAGE (/berita & /hotinfo)
  console.log('📄 Mengoptimasi Halaman Direktori /berita & /hotinfo dengan ' + hotInfoItems.length + ' Liputan Berita Terkini...');
  const newsCatalogHtml = `
    <div style="max-width: 1100px; margin: 0 auto; padding: 2.5rem 1.5rem; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; color: #1e293b; line-height: 1.7;">
      <nav style="font-size: 0.9rem; margin-bottom: 1.5rem; color: #64748b;">
        <a href="/" style="color: #64748b; text-decoration: none;">Pariwisata Sumatera Barat</a> &gt; <span style="color: #0f172a; font-weight: 600;">Berita Pariwisata</span>
      </nav>
      <header style="margin-bottom: 3rem; border-bottom: 2px solid #e2e8f0; padding-bottom: 2rem;">
        <div style="display: flex; align-items: center; gap: 0.75rem; margin-bottom: 0.5rem;">
          <span style="background: #fee2e2; color: #dc2626; font-size: 0.85rem; font-weight: 700; padding: 0.3rem 0.8rem; border-radius: 9999px;">HOT INFO &amp; BERITA RESMI</span>
          <span style="font-size: 0.9rem; color: #64748b;">Update Berkala Real-Time 24 Jam</span>
        </div>
        <h1 style="font-size: 2.25rem; font-weight: 800; color: #0f172a; margin-bottom: 0.75rem;">Kabar &amp; Berita Pariwisata Terkini Sumatera Barat 2026</h1>
        <p style="font-size: 1.15rem; color: #475569;">Liputan berita terpercaya seputar aksesibilitas jalur transportasi, perhelatan Karisma Event Nusantara (KEN), kebijakan pariwisata nasional, dan panduan liburan di Ranah Minang.</p>
      </header>
      <section style="display: flex; flex-direction: column; gap: 2rem;">
        ${hotInfoItems.map((n: any) => {
          const slug = slugify(n.title);
          const paragraphs = (n.description || '').split('\n\n').filter(Boolean);
          const lead = paragraphs[0] || '';
          return `
            <article style="background: #ffffff; border: 1px solid #e2e8f0; border-radius: 1rem; padding: 2rem; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05);">
              <div style="display: flex; gap: 0.5rem; align-items: center; margin-bottom: 0.75rem; flex-wrap: wrap;">
                <span style="background: #fee2e2; color: #dc2626; font-size: 0.8rem; font-weight: 700; padding: 0.25rem 0.75rem; border-radius: 9999px; text-transform: uppercase;">${escapeHtml(n.category || 'Pariwisata')}</span>
                <span style="background: #f1f5f9; color: #475569; font-size: 0.8rem; font-weight: 600; padding: 0.25rem 0.75rem; border-radius: 9999px;">${escapeHtml(n.tag || 'Sumbar')}</span>
                <time style="font-size: 0.85rem; color: #64748b; margin-left: auto;">🗓️ ${escapeHtml(n.date || 'Terkini')}</time>
              </div>
              <h2 style="font-size: 1.45rem; font-weight: 700; margin-bottom: 0.75rem; line-height: 1.35;">
                <a href="/berita/${slug}" style="color: #0f172a; text-decoration: none;">${escapeHtml(n.title)}</a>
              </h2>
              <p style="color: #475569; font-size: 1rem; margin-bottom: 1.25rem; line-height: 1.7;">${escapeHtml(lead.substring(0, 250))}...</p>
              <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 0.5rem;">
                <a href="/berita/${slug}" style="color: #dc2626; font-weight: 700; text-decoration: none; font-size: 0.95rem;">Baca Liputan Lengkap &rarr;</a>
                <span style="font-size: 0.85rem; color: #94a3b8;">📍 ${escapeHtml(n.locationName || 'Sumatera Barat')}</span>
              </div>
            </article>
          `;
        }).join('')}
      </section>
    </div>
  `;

  const newsPage = generateHtmlPage(baseTemplate, {
    title: 'Berita Pariwisata Sumatera Barat Terkini: Info Rute, Event & Regulasi 2026 | MALALA',
    description: 'Kumpulan berita pariwisata Sumatera Barat dan nasional terpercaya. Info status jalur tol Padang-Sicincin, Sitinjau Lauik, jadwal festival KEN, dan kebijakan ekowisata.',
    canonicalUrl: 'https://malala.my.id/berita',
    jsonLdList: [
      {
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        "name": "Kabar & Berita Pariwisata Terkini Sumatera Barat",
        "description": "Liputan berita terpercaya seputar aksesibilitas jalur transportasi, perhelatan Karisma Event Nusantara (KEN), kebijakan pariwisata nasional, dan panduan liburan di Ranah Minang.",
        "url": "https://malala.my.id/berita"
      },
      buildFaqJsonLd()
    ],
    bodyContent: newsCatalogHtml
  });
  writePage(distDir, 'berita', newsPage);
  writePage(distDir, 'hotinfo', newsPage);

  // 6. GENERATE OTHER MAIN PAGES (oleh-oleh, unduhan, peta, rencana-liburan, tanya-mala)
  const otherPages = [
    {
      route: 'oleh-oleh',
      title: 'Pusat Oleh-Oleh & Kerajinan Khas Sumbar 2026 | MALALA',
      description: 'Rekomendasi suvenir otentik Minangkabau: Songket Silungkang & Pandai Sikek, Mukena Kerancang Bukittinggi, Kaus Minang, dan Keripik Balado.',
      h1: 'Pusat Cenderamata & Kerajinan Khas Sumatera Barat',
      content: '<p>Temukan oleh-oleh khas Ranah Minang berkualitas premium langsung dari sentra pengrajin lokal Sumatera Barat.</p>'
    },
    {
      route: 'unduhan',
      title: 'Unduh E-Booklet & Peta Wisata Sumbar 2026 PDF Gratis | MALALA',
      description: 'Download peta wisata Sumatera Barat PDF gratis, download buku panduan pariwisata Sumbar 2026 PDF (113 halaman), serta kalender event wisata beresolusi tinggi.',
      h1: 'Unduh Gratis E-Booklet & Peta Wisata Sumatera Barat 2026',
      content: '<p>Unduh gratis e-booklet panduan resmi pariwisata Sumatera Barat 113 halaman beresolusi tinggi dan kalender event 2026 siap cetak.</p>'
    },
    {
      route: 'peta',
      title: 'Peta Interaktif Wisata Sumatera Barat - Rute & Lokasi | MALALA',
      description: 'Peta digital interaktif sebaran 38+ destinasi wisata, kuliner, dan event di 19 kabupaten/kota Sumatera Barat.',
      h1: 'Peta Wisata Interaktif Ranah Minang',
      content: '<p>Jelajahi sebaran koordinat geografis seluruh objek wisata alam, budaya, dan kuliner di 19 kabupaten/kota Sumatera Barat.</p>'
    },
    {
      route: 'rencana-liburan',
      title: 'AI Travel Planner - Rancang Itinerary Sumbar Cerdas 2026 | MALALA',
      description: 'Susun rencana perjalanan liburan impian ke Sumatera Barat dalam hitungan detik dengan kecerdasan buatan Malala AI.',
      h1: 'AI Itinerary Generator & Travel Planner Sumatera Barat',
      content: '<p>Rancang itinerary wisata harian otomatis yang searah per koridor geografis tanpa bolak-balik dengan bantuan AI Uni Mala.</p>'
    },
    {
      route: 'tanya-mala',
      title: 'Tanya Uni Mala - Asisten Virtual Wisata Minangkabau | MALALA',
      description: 'Konsultasi wisata 24 jam dengan Uni Mala, pemandu wisata virtual berbasis AI pintar untuk liburan Sumatera Barat.',
      h1: 'Uni Mala — Asisten Wisata Cerdas Minangkabau',
      content: '<p>Konsultasikan rencana liburan, tips kuliner, dan rute perjalanan Anda bersama Uni Mala, pemandu wisata AI resmi Ranah Minang.</p>'
    }
  ];

  otherPages.forEach(pg => {
    const pageHtml = generateHtmlPage(baseTemplate, {
      title: pg.title,
      description: pg.description,
      canonicalUrl: `https://malala.my.id/${pg.route}`,
      jsonLdList: [
        {
          "@context": "https://schema.org",
          "@type": "WebPage",
          "name": pg.title,
          "description": pg.description,
          "url": `https://malala.my.id/${pg.route}`
        },
        buildFaqJsonLd()
      ],
      bodyContent: `
        <div style="max-width: 1000px; margin: 0 auto; padding: 2.5rem 1.5rem; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; color: #1e293b; line-height: 1.7;">
          <nav style="font-size: 0.9rem; margin-bottom: 1.5rem; color: #64748b;">
            <a href="/" style="color: #64748b; text-decoration: none;">Pariwisata Sumatera Barat</a> &gt; <span style="color: #0f172a; font-weight: 600;">${escapeHtml(pg.route)}</span>
          </nav>
          <header style="margin-bottom: 2rem; border-bottom: 2px solid #e2e8f0; padding-bottom: 1.5rem;">
            <h1 style="font-size: 2.25rem; font-weight: 800; color: #0f172a; margin-bottom: 0.75rem;">${escapeHtml(pg.h1)}</h1>
            <p style="font-size: 1.15rem; color: #475569;">${escapeHtml(pg.description)}</p>
          </header>
          <div>${pg.content}</div>
        </div>
      `
    });
    writePage(distDir, pg.route, pageHtml);
  });

  // 6B. GENERATE HTML SITEMAP PAGE (/sitemap) FOR ULTRAFAST SEARCH ENGINE CRAWLING
  console.log('📄 Mengoptimasi Halaman Peta Situs HTML /sitemap untuk Percepatan Crawling...');
  const sitemapHtml = `
    <div style="max-width: 1100px; margin: 0 auto; padding: 2.5rem 1.5rem; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; color: #cbd5e1; line-height: 1.7;">
      <nav style="font-size: 0.9rem; margin-bottom: 1.5rem; color: #94a3b8;">
        <a href="/" style="color: #38bdf8; text-decoration: none;">Pariwisata Sumatera Barat</a> &gt; <span style="color: #f8fafc; font-weight: 600;">Peta Situs (Sitemap)</span>
      </nav>
      <header style="margin-bottom: 2.5rem; border-bottom: 1px solid #334155; padding-bottom: 1.5rem;">
        <div style="display: inline-block; background: #dc2626; color: #ffffff; font-size: 0.75rem; font-weight: 700; padding: 0.25rem 0.75rem; border-radius: 9999px; text-transform: uppercase; margin-bottom: 0.75rem;">
          🗺️ Indeks Navigasi Resmi
        </div>
        <h1 style="font-size: 2.25rem; font-weight: 800; color: #f8fafc; margin-bottom: 0.75rem; line-height: 1.25;">
          Peta Situs Resmi (HTML Sitemap) — MALALA
        </h1>
        <p style="font-size: 1.05rem; color: #94a3b8; max-width: 860px; margin: 0;">
          Indeks lengkap seluruh tautan eksplorasi destinasi wisata, warisan budaya Minangkabau, kuliner autentik, agenda festival Karisma Event Nusantara (KEN), liputan berita, dan dokumen resmi di Sumatera Barat.
        </p>
      </header>

      <!-- Section 1: Halaman Utama & Fitur Utama -->
      <section style="margin-bottom: 2.5rem; background: #0f172a; border: 1px solid #1e293b; border-radius: 1rem; padding: 1.75rem;">
        <h2 style="font-size: 1.35rem; font-weight: 700; color: #f8fafc; margin-bottom: 1rem; border-bottom: 1px solid #334155; padding-bottom: 0.5rem;">
          🌐 Halaman Utama &amp; Fitur Wisata
        </h2>
        <ul style="display: grid; grid-template-columns: repeat(auto-fill, minmax(260px, 1fr)); gap: 0.75rem; list-style: none; padding: 0; margin: 0;">
          <li><a href="/" style="color: #38bdf8; text-decoration: none; font-weight: 600;">🏠 Beranda Portal MALALA</a></li>
          <li><a href="/destinasi" style="color: #38bdf8; text-decoration: none; font-weight: 600;">🏖️ Direktori 50+ Destinasi Wisata</a></li>
          <li><a href="/kebudayaan" style="color: #38bdf8; text-decoration: none; font-weight: 600;">🎭 Direktori 30+ Warisan Seni &amp; Budaya</a></li>
          <li><a href="/kuliner" style="color: #38bdf8; text-decoration: none; font-weight: 600;">🍲 Direktori 36+ Kuliner Khas Minang</a></li>
          <li><a href="/event" style="color: #38bdf8; text-decoration: none; font-weight: 600;">🗓️ Kalender 26+ Agenda Festival 2026</a></li>
          <li><a href="/berita" style="color: #38bdf8; text-decoration: none; font-weight: 600;">📰 Berita Pariwisata Terkini</a></li>
          <li><a href="/hotinfo" style="color: #38bdf8; text-decoration: none; font-weight: 600;">🔥 Hot Info &amp; Kondisi Jalur Wisata</a></li>
          <li><a href="/oleh-oleh" style="color: #38bdf8; text-decoration: none; font-weight: 600;">🎁 Pusat Cenderamata &amp; Oleh-Oleh</a></li>
          <li><a href="/unduhan" style="color: #38bdf8; text-decoration: none; font-weight: 600;">📥 Unduh Gratis E-Booklet &amp; Peta PDF</a></li>
          <li><a href="/peta" style="color: #38bdf8; text-decoration: none; font-weight: 600;">🗺️ Peta Digital Interaktif Ranah Minang</a></li>
          <li><a href="/rencana-liburan" style="color: #38bdf8; text-decoration: none; font-weight: 600;">🤖 AI Travel Planner (Rencana Liburan)</a></li>
          <li><a href="/tanya-mala" style="color: #38bdf8; text-decoration: none; font-weight: 600;">💬 Tanya Mala (Asisten Virtual AI)</a></li>
        </ul>
      </section>

      <!-- Section 2: Flipbook & File Unduhan -->
      <section style="margin-bottom: 2.5rem; background: #0f172a; border: 1px solid #1e293b; border-radius: 1rem; padding: 1.75rem;">
        <h2 style="font-size: 1.35rem; font-weight: 700; color: #f8fafc; margin-bottom: 1rem; border-bottom: 1px solid #334155; padding-bottom: 0.5rem;">
          📖 Flipbook Digital, Dokumen &amp; Feed
        </h2>
        <ul style="display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 0.75rem; list-style: none; padding: 0; margin: 0;">
          <li><a href="/flipbook/panduan/id" style="color: #38bdf8; text-decoration: none;">📖 E-Book Panduan Wisata Sumbar (Indonesia)</a></li>
          <li><a href="/flipbook/panduan/en" style="color: #38bdf8; text-decoration: none;">📖 West Sumatra Travel Guide Flipbook (English)</a></li>
          <li><a href="/flipbook/events/id" style="color: #38bdf8; text-decoration: none;">📅 Flipbook Kalender Event Sumbar 2026 (Indonesia)</a></li>
          <li><a href="/flipbook/events/en" style="color: #38bdf8; text-decoration: none;">📅 Calendar of Events 2026 Flipbook (English)</a></li>
          <li><a href="/downloads/malala-panduan-wisata-sumbar-2026.pdf" style="color: #38bdf8; text-decoration: none;">📄 Unduh PDF Buku Panduan Wisata (149 Halaman)</a></li>
          <li><a href="/downloads/kalender-event-sumbar-2026.pdf" style="color: #38bdf8; text-decoration: none;">📄 Unduh PDF Kalender Event KEN 2026</a></li>
          <li><a href="/sitemap.xml" style="color: #38bdf8; text-decoration: none;">🗺️ Sitemap XML Utama (sitemap.xml)</a></li>
          <li><a href="/sitemap_index.xml" style="color: #38bdf8; text-decoration: none;">🗺️ Sitemap Index XML Alias (sitemap_index.xml)</a></li>
          <li><a href="/news-sitemap.xml" style="color: #38bdf8; text-decoration: none;">📰 Google News Sitemap XML (news-sitemap.xml)</a></li>
          <li><a href="/rss.xml" style="color: #38bdf8; text-decoration: none;">📡 RSS 2.0 Feed (rss.xml)</a></li>
          <li><a href="/feed.xml" style="color: #38bdf8; text-decoration: none;">📡 RSS Feed Alias (feed.xml)</a></li>
          <li><a href="/llms.txt" style="color: #38bdf8; text-decoration: none;">🤖 Indeks AI &amp; LLM (llms.txt)</a></li>
          <li><a href="/llms-full.txt" style="color: #38bdf8; text-decoration: none;">🤖 Korpus AI Lengkap (llms-full.txt)</a></li>
          <li><a href="/.well-known/ai-catalog.json" style="color: #38bdf8; text-decoration: none;">🤖 AI Agent Catalog JSON</a></li>
        </ul>
      </section>

      <!-- Section 3: 50+ Destinasi Wisata Unggulan -->
      <section style="margin-bottom: 2.5rem; background: #0f172a; border: 1px solid #1e293b; border-radius: 1rem; padding: 1.75rem;">
        <h2 style="font-size: 1.35rem; font-weight: 700; color: #f8fafc; margin-bottom: 1rem; border-bottom: 1px solid #334155; padding-bottom: 0.5rem;">
          🏖️ 50+ Destinasi Wisata Unggulan Sumatera Barat
        </h2>
        <ul style="display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 0.6rem; list-style: none; padding: 0; margin: 0;">
          ${destinations.map(d => {
            const slug = slugify(d.title);
            return `<li><a href="/destinasi/${slug}" style="color: #cbd5e1; text-decoration: none; font-size: 0.95rem;">📍 <span style="color: #38bdf8; font-weight: 600;">${escapeHtml(d.title)}</span> <span style="font-size: 0.8rem; color: #94a3b8;">(${escapeHtml(d.regency || d.tag || 'Wisata')})</span></a></li>`;
          }).join('')}
        </ul>
      </section>

      <!-- Section 4: 30+ Warisan Seni & Budaya Minangkabau -->
      <section style="margin-bottom: 2.5rem; background: #0f172a; border: 1px solid #1e293b; border-radius: 1rem; padding: 1.75rem;">
        <h2 style="font-size: 1.35rem; font-weight: 700; color: #f8fafc; margin-bottom: 1rem; border-bottom: 1px solid #334155; padding-bottom: 0.5rem;">
          🎭 30+ Warisan Seni &amp; Budaya Minangkabau
        </h2>
        <ul style="display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 0.6rem; list-style: none; padding: 0; margin: 0;">
          ${cultureItems.map(c => {
            const slug = slugify(c.title);
            return `<li><a href="/kebudayaan/${slug}" style="color: #cbd5e1; text-decoration: none; font-size: 0.95rem;">🏛️ <span style="color: #38bdf8; font-weight: 600;">${escapeHtml(c.title)}</span> <span style="font-size: 0.8rem; color: #94a3b8;">(${escapeHtml(c.category || 'Budaya')})</span></a></li>`;
          }).join('')}
        </ul>
      </section>

      <!-- Section 5: 36+ Kuliner Khas Minangkabau -->
      <section style="margin-bottom: 2.5rem; background: #0f172a; border: 1px solid #1e293b; border-radius: 1rem; padding: 1.75rem;">
        <h2 style="font-size: 1.35rem; font-weight: 700; color: #f8fafc; margin-bottom: 1rem; border-bottom: 1px solid #334155; padding-bottom: 0.5rem;">
          🍲 36+ Kuliner Autentik Khas Ranah Minang
        </h2>
        <ul style="display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 0.6rem; list-style: none; padding: 0; margin: 0;">
          ${culinaryItems.map(cu => {
            const slug = slugify(cu.title);
            return `<li><a href="/kuliner/${slug}" style="color: #cbd5e1; text-decoration: none; font-size: 0.95rem;">🍲 <span style="color: #38bdf8; font-weight: 600;">${escapeHtml(cu.title)}</span> <span style="font-size: 0.8rem; color: #94a3b8;">(${escapeHtml(cu.origin || 'Sumbar')})</span></a></li>`;
          }).join('')}
        </ul>
      </section>

      <!-- Section 6: 26+ Event & Festival KEN 2026 -->
      <section style="margin-bottom: 2.5rem; background: #0f172a; border: 1px solid #1e293b; border-radius: 1rem; padding: 1.75rem;">
        <h2 style="font-size: 1.35rem; font-weight: 700; color: #f8fafc; margin-bottom: 1rem; border-bottom: 1px solid #334155; padding-bottom: 0.5rem;">
          🗓️ 26+ Agenda Karisma Event Nusantara (KEN) &amp; CoE 2026
        </h2>
        <ul style="display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 0.6rem; list-style: none; padding: 0; margin: 0;">
          ${eventItems.map(ev => {
            const slug = slugify(ev.title);
            return `<li><a href="/event/${slug}" style="color: #cbd5e1; text-decoration: none; font-size: 0.95rem;">🎉 <span style="color: #38bdf8; font-weight: 600;">${escapeHtml(ev.title)}</span> <span style="font-size: 0.8rem; color: #94a3b8;">(${escapeHtml(ev.schedule || '2026')})</span></a></li>`;
          }).join('')}
        </ul>
      </section>

      <!-- Section 7: Liputan Berita Pariwisata Terkini -->
      <section style="margin-bottom: 2.5rem; background: #0f172a; border: 1px solid #1e293b; border-radius: 1rem; padding: 1.75rem;">
        <h2 style="font-size: 1.35rem; font-weight: 700; color: #f8fafc; margin-bottom: 1rem; border-bottom: 1px solid #334155; padding-bottom: 0.5rem;">
          📰 Liputan Berita Pariwisata &amp; Hot Info Terkini
        </h2>
        <ul style="display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 0.6rem; list-style: none; padding: 0; margin: 0;">
          ${hotInfoItems.map((n: any) => {
            const slug = slugify(n.title);
            return `<li><a href="/berita/${slug}" style="color: #cbd5e1; text-decoration: none; font-size: 0.95rem;">📢 <span style="color: #38bdf8; font-weight: 600;">${escapeHtml(n.title)}</span></a></li>`;
          }).join('')}
        </ul>
      </section>

      <footer style="margin-top: 3rem; padding-top: 2rem; border-top: 1px solid #334155; text-align: center; color: #94a3b8; font-size: 0.9rem;">
        Peta Situs Resmi MALALA — Portal Pariwisata Sumatera Barat &copy; 2026. Diperbarui otomatis secara berkala.
      </footer>
    </div>
  `;

  const sitemapPage = generateHtmlPage(baseTemplate, {
    title: 'Peta Situs Resmi (Sitemap): Direktori Lengkap Pariwisata Sumbar | MALALA',
    description: 'Peta situs HTML resmi portal pariwisata Sumatera Barat. Akses cepat ke 50+ destinasi wisata, 30 budaya, 36 kuliner, 26 festival KEN, berita, dan unduhan panduan 2026.',
    canonicalUrl: 'https://malala.my.id/sitemap',
    jsonLdList: [
      {
        "@context": "https://schema.org",
        "@type": "WebPage",
        "name": "Peta Situs Resmi (HTML Sitemap) MALALA Pariwisata Sumatera Barat",
        "description": "Indeks lengkap seluruh tautan eksplorasi destinasi wisata, kebudayaan, kuliner, dan event di Sumatera Barat.",
        "url": "https://malala.my.id/sitemap"
      },
      buildFaqJsonLd()
    ],
    bodyContent: sitemapHtml
  });
  writePage(distDir, 'sitemap', sitemapPage);

  // 7. GENERATE ALL 38 INDIVIDUAL DESTINATIONS WITH FULL CONTENT & INTERNAL LINKS
  let destCount = 0;
  destinations.forEach(dest => {
    const slug = slugify(dest.title);
    if (!slug) return;

    const pageTitle = `${dest.title} (${dest.regency || 'Sumatera Barat'}): Rute, Daya Tarik & Panduan 2026 | MALALA`;
    const pageDesc = dest.description ? dest.description.substring(0, 160) + '...' : `Informasi lengkap mengenai ${dest.title} di ${dest.regency || 'Sumatera Barat'}.`;
    const canonicalUrl = `https://malala.my.id/destinasi/${slug}`;

    const ratingSummary = getDestinationRatingSummary(dest.id, dest.title);

    const destJsonLd = {
      "@context": "https://schema.org",
      "@type": "TouristDestination",
      "name": dest.title,
      "description": dest.description,
      "image": [dest.imageUrl || "https://malala.my.id/favicon.png"],
      "touristType": dest.tag || "Wisata Alam",
      "address": {
        "@type": "PostalAddress",
        "addressRegion": dest.regency || "Sumatera Barat",
        "addressCountry": "ID"
      },
      "geo": dest.lat && dest.lng ? {
        "@type": "GeoCoordinates",
        "latitude": dest.lat,
        "longitude": dest.lng
      } : undefined
    };

    const breadcrumbJsonLd = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Pariwisata Sumatera Barat", "item": "https://malala.my.id/" },
        { "@type": "ListItem", "position": 2, "name": "Destinasi", "item": "https://malala.my.id/destinasi" },
        { "@type": "ListItem", "position": 3, "name": dest.title, "item": canonicalUrl }
      ]
    };

    const paragraphs = (dest.description || '').split('\n\n').filter(Boolean);

    const bodyContent = `
      <article style="max-width: 900px; margin: 0 auto; padding: 2.5rem 1.5rem; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; color: #1e293b; line-height: 1.8;">
        <nav style="font-size: 0.9rem; margin-bottom: 1.5rem; color: #64748b;">
          <a href="/" style="color: #64748b; text-decoration: none;">Pariwisata Sumatera Barat</a> &gt; 
          <a href="/destinasi" style="color: #64748b; text-decoration: none;">Destinasi</a> &gt; 
          <span style="color: #0f172a; font-weight: 600;">${escapeHtml(dest.title)}</span>
        </nav>
        <header style="margin-bottom: 2rem; border-bottom: 2px solid #e2e8f0; padding-bottom: 1.5rem;">
          <div style="display: flex; justify-content: space-between; align-items: flex-start; flex-wrap: wrap; gap: 1rem; margin-bottom: 0.5rem;">
            <h1 style="font-size: 2.5rem; font-weight: 800; color: #0f172a; margin: 0; line-height: 1.2;">${escapeHtml(dest.title)}</h1>
            <div style="background: #fef3c7; border: 1px solid #fde68a; padding: 0.35rem 0.85rem; border-radius: 9999px; display: inline-flex; align-items: center; gap: 0.35rem; font-size: 0.95rem; font-weight: 700; color: #b45309;">
              <span>⭐ ${ratingSummary.rating.toFixed(1)} / 5.0</span>
              <span style="color: #92400e; font-weight: 500; font-size: 0.85rem;">(${ratingSummary.reviewCount} ulasan)</span>
            </div>
          </div>
          <p style="font-size: 1.1rem; color: #dc2626; font-weight: 600; margin: 0;">📍 ${escapeHtml(dest.regency || 'Sumatera Barat')} • <span style="color: #64748b;">Kategori: ${escapeHtml(dest.category || 'Wisata Alam')}</span></p>
        </header>

        ${dest.imageUrl ? `
          <div style="margin-bottom: 2rem; border-radius: 1rem; overflow: hidden; box-shadow: 0 10px 15px -3px rgba(0,0,0,0.1);">
            <img src="${escapeHtml(dest.imageUrl)}" alt="${escapeHtml(dest.title)} di ${escapeHtml(dest.regency || 'Sumatera Barat')}" style="width: 100%; max-height: 500px; object-fit: cover;" loading="lazy" />
          </div>
        ` : ''}

        <section style="font-size: 1.1rem; color: #334155; margin-bottom: 2.5rem;">
          ${paragraphs.map((p: string) => `<p style="margin-bottom: 1.25rem;">${escapeHtml(p)}</p>`).join('')}
        </section>

        ${dest.highlights && dest.highlights.length > 0 ? `
          <section style="background: #f8fafc; padding: 1.75rem; border-radius: 1rem; border: 1px solid #e2e8f0; margin-bottom: 2.5rem;">
            <h2 style="font-size: 1.35rem; font-weight: 700; color: #0f172a; margin-bottom: 1rem;">✨ Keunggulan & Daya Tarik Utama</h2>
            <ul style="padding-left: 1.5rem; color: #475569;">
              ${dest.highlights.map((h: string) => `<li style="margin-bottom: 0.5rem;">${escapeHtml(h)}</li>`).join('')}
            </ul>
          </section>
        ` : ''}

        <!-- Semantic Tourist Reviews & Rating Section (Google Rich Snippets) -->
        <section style="background: #ffffff; border: 1px solid #e2e8f0; border-radius: 1rem; padding: 1.75rem; margin-bottom: 2.5rem; box-shadow: 0 1px 3px rgba(0,0,0,0.05);">
          <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 0.75rem; margin-bottom: 1.25rem; border-bottom: 1px solid #f1f5f9; padding-bottom: 1rem;">
            <div>
              <span style="background: #fef3c7; color: #b45309; font-size: 0.75rem; font-weight: 700; padding: 0.2rem 0.6rem; border-radius: 9999px; text-transform: uppercase;">⭐ Ulasan &amp; Rating Wisatawan</span>
              <h2 style="font-size: 1.35rem; font-weight: 700; color: #0f172a; margin-top: 0.35rem; margin-bottom: 0;">Pengalaman Nyata Wisatawan</h2>
            </div>
            <div style="display: flex; align-items: center; gap: 0.75rem;">
              <span style="font-size: 2.25rem; font-weight: 800; color: #0f172a; line-height: 1;">${ratingSummary.rating.toFixed(1)}</span>
              <div>
                <div style="color: #f59e0b; font-size: 1.1rem; line-height: 1;">★★★★★</div>
                <span style="font-size: 0.8rem; color: #64748b;">${ratingSummary.reviewCount} ulasan • ${ratingSummary.recommendPercentage}% merekomendasikan</span>
              </div>
            </div>
          </div>

          <div style="display: flex; flex-direction: column; gap: 1rem;">
            ${ratingSummary.reviews.map(r => `
              <div style="padding: 1.1rem; background: #f8fafc; border-radius: 0.75rem; border: 1px solid #e2e8f0;">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.5rem; flex-wrap: wrap; gap: 0.5rem;">
                  <div>
                    <strong style="color: #0f172a; font-size: 0.95rem;">${escapeHtml(r.author)}</strong>
                    <span style="color: #64748b; font-size: 0.85rem;"> (${escapeHtml(r.originCity || 'Indonesia')})</span>
                    <span style="display: inline-block; background: #ecfdf5; color: #047857; font-size: 0.75rem; font-weight: 600; padding: 0.1rem 0.5rem; border-radius: 9999px; margin-left: 0.35rem;">✓ Wisatawan Terverifikasi • ${escapeHtml(r.travelerType || 'Keluarga')}</span>
                  </div>
                  <div style="text-align: right;">
                    <span style="color: #f59e0b; font-size: 0.9rem;">${'★'.repeat(r.rating)}${'☆'.repeat(5 - r.rating)}</span>
                    <time style="display: block; font-size: 0.75rem; color: #94a3b8;">${escapeHtml(r.date)}</time>
                  </div>
                </div>
                <p style="color: #334155; font-size: 0.95rem; line-height: 1.6; margin: 0;">"${escapeHtml(r.comment)}"</p>
              </div>
            `).join('')}
          </div>
        </section>

        <footer style="margin-top: 3rem; padding-top: 2rem; border-top: 1px solid #e2e8f0;">
          <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 1rem; margin-bottom: 1.5rem;">
            <a href="/destinasi" style="color: #dc2626; font-weight: 600; text-decoration: none;">&larr; Kembali ke Katalog 50 Destinasi</a>
            <a href="/rencana-liburan" style="background: #dc2626; color: #ffffff; padding: 0.6rem 1.25rem; border-radius: 0.5rem; text-decoration: none; font-weight: 600;">Rancang Rute ke Sini dengan AI &rarr;</a>
          </div>
          <div style="padding-top: 1.25rem; border-top: 1px dashed #cbd5e1; font-size: 0.9rem; color: #64748b; text-align: center;">
            Eksplorasi panduan lengkap <a href="/" style="color: #dc2626; font-weight: 600; text-decoration: none;">Pariwisata Sumatera Barat</a> &amp; rekomendasi liburan <a href="/" style="color: #dc2626; font-weight: 600; text-decoration: none;">Pariwisata Sumbar 2026</a> di portal resmi MALALA.
          </div>
        </footer>
      </article>
    `;

    const html = generateHtmlPage(baseTemplate, {
      title: pageTitle,
      description: pageDesc,
      canonicalUrl,
      imageUrl: dest.imageUrl,
      jsonLdList: [destJsonLd, breadcrumbJsonLd],
      bodyContent
    });

    writePage(distDir, `destinasi/${slug}`, html);
    destCount++;
  });
  console.log(`✅ ${destCount} Halaman SSG Destinasi Lengkap Berhasil Dibuat.`);

  // 8. GENERATE ALL 22 CULTURE ITEMS WITH FULL CONTENT & INTERNAL LINKS
  let cultCount = 0;
  cultureItems.forEach(cult => {
    const slug = slugify(cult.title);
    if (!slug) return;

    const pageTitle = `${cult.title} Minangkabau: Makna Filosofis, Sejarah & Tradisi Adat | MALALA`;
    const pageDesc = cult.description ? cult.description.substring(0, 160) + '...' : `Kupas tuntas filosofi dan sejarah ${cult.title} khas Minangkabau.`;
    const canonicalUrl = `https://malala.my.id/kebudayaan/${slug}`;

    const cultJsonLd = {
      "@context": "https://schema.org",
      "@type": "Article",
      "headline": cult.title,
      "description": cult.description,
      "image": [cult.imageUrl || "https://malala.my.id/favicon.png"],
      "author": {
        "@type": "Organization",
        "name": "MALALA"
      }
    };

    const breadcrumbJsonLd = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Pariwisata Sumatera Barat", "item": "https://malala.my.id/" },
        { "@type": "ListItem", "position": 2, "name": "Kebudayaan", "item": "https://malala.my.id/kebudayaan" },
        { "@type": "ListItem", "position": 3, "name": cult.title, "item": canonicalUrl }
      ]
    };

    const paragraphs = (cult.description || '').split('\n\n').filter(Boolean);

    const bodyContent = `
      <article style="max-width: 900px; margin: 0 auto; padding: 2.5rem 1.5rem; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; color: #1e293b; line-height: 1.8;">
        <nav style="font-size: 0.9rem; margin-bottom: 1.5rem; color: #64748b;">
          <a href="/" style="color: #64748b; text-decoration: none;">Pariwisata Sumatera Barat</a> &gt; 
          <a href="/kebudayaan" style="color: #64748b; text-decoration: none;">Kebudayaan</a> &gt; 
          <span style="color: #0f172a; font-weight: 600;">${escapeHtml(cult.title)}</span>
        </nav>
        <header style="margin-bottom: 2rem; border-bottom: 2px solid #e2e8f0; padding-bottom: 1.5rem;">
          <h1 style="font-size: 2.5rem; font-weight: 800; color: #0f172a; margin-bottom: 0.5rem; line-height: 1.2;">${escapeHtml(cult.title)}</h1>
          <p style="font-size: 1.1rem; color: #b45309; font-weight: 600;">🏛️ ${escapeHtml(cult.category || 'Warisan Budaya')} • <span style="color: #64748b;">Asal: ${escapeHtml(cult.origin || 'Minangkabau')}</span></p>
          ${cult.philosophy ? `<p style="font-size: 1.1rem; color: #047857; font-style: italic; margin-top: 0.75rem; background: #ecfdf5; padding: 0.75rem 1rem; border-left: 4px solid #10b981; border-radius: 0.25rem;">"${escapeHtml(cult.philosophy)}"</p>` : ''}
        </header>

        ${cult.imageUrl ? `
          <div style="margin-bottom: 2rem; border-radius: 1rem; overflow: hidden; box-shadow: 0 10px 15px -3px rgba(0,0,0,0.1);">
            <img src="${escapeHtml(cult.imageUrl)}" alt="${escapeHtml(cult.title)} Tradisi Budaya Minangkabau" style="width: 100%; max-height: 500px; object-fit: cover;" loading="lazy" />
          </div>
        ` : ''}

        <section style="font-size: 1.1rem; color: #334155; margin-bottom: 2.5rem;">
          ${paragraphs.map((p: string) => `<p style="margin-bottom: 1.25rem;">${escapeHtml(p)}</p>`).join('')}
        </section>

        <footer style="margin-top: 3rem; padding-top: 2rem; border-top: 1px solid #e2e8f0;">
          <div style="margin-bottom: 1.5rem;">
            <a href="/kebudayaan" style="color: #dc2626; font-weight: 600; text-decoration: none;">&larr; Kembali ke Katalog Warisan Budaya</a>
          </div>
          <div style="padding-top: 1.25rem; border-top: 1px dashed #cbd5e1; font-size: 0.9rem; color: #64748b; text-align: center;">
            Pelajari khazanah adat &amp; tradisi di portal <a href="/" style="color: #dc2626; font-weight: 600; text-decoration: none;">Pariwisata Sumatera Barat</a> &amp; eksplorasi budaya <a href="/" style="color: #dc2626; font-weight: 600; text-decoration: none;">Pariwisata Sumbar 2026</a> di MALALA.
          </div>
        </footer>
      </article>
    `;

    const html = generateHtmlPage(baseTemplate, {
      title: pageTitle,
      description: pageDesc,
      canonicalUrl,
      imageUrl: cult.imageUrl,
      jsonLdList: [cultJsonLd, breadcrumbJsonLd],
      bodyContent
    });

    writePage(distDir, `kebudayaan/${slug}`, html);
    cultCount++;
  });
  console.log(`✅ ${cultCount} Halaman SSG Kebudayaan Lengkap Berhasil Dibuat.`);

  // 9. GENERATE ALL 26 CULINARY ITEMS
  let culCount = 0;
  culinaryItems.forEach(cul => {
    const slug = slugify(cul.title);
    if (!slug) return;

    const pageTitle = `${cul.title} Khas Minangkabau: Cita Rasa & Rekomendasi Kuliner Autentik | MALALA`;
    const pageDesc = cul.description ? cul.description.substring(0, 160) + '...' : `Resep dan kelezatan autentik ${cul.title} khas Minang.`;
    const canonicalUrl = `https://malala.my.id/kuliner/${slug}`;

    const culJsonLd = {
      "@context": "https://schema.org",
      "@type": "Recipe",
      "name": cul.title,
      "description": cul.description,
      "image": [cul.imageUrl || "https://malala.my.id/favicon.png"],
      "recipeCuisine": "Minangkabau / Padang",
      "author": {
        "@type": "Organization",
        "name": "MALALA"
      }
    };

    const breadcrumbJsonLd = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Pariwisata Sumatera Barat", "item": "https://malala.my.id/" },
        { "@type": "ListItem", "position": 2, "name": "Kuliner", "item": "https://malala.my.id/kuliner" },
        { "@type": "ListItem", "position": 3, "name": cul.title, "item": canonicalUrl }
      ]
    };

    const paragraphs = (cul.description || '').split('\n\n').filter(Boolean);

    const bodyContent = `
      <article style="max-width: 900px; margin: 0 auto; padding: 2.5rem 1.5rem; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; color: #1e293b; line-height: 1.8;">
        <nav style="font-size: 0.9rem; margin-bottom: 1.5rem; color: #64748b;">
          <a href="/" style="color: #64748b; text-decoration: none;">Pariwisata Sumatera Barat</a> &gt; 
          <a href="/kuliner" style="color: #64748b; text-decoration: none;">Kuliner</a> &gt; 
          <span style="color: #0f172a; font-weight: 600;">${escapeHtml(cul.title)}</span>
        </nav>
        <header style="margin-bottom: 2rem; border-bottom: 2px solid #e2e8f0; padding-bottom: 1.5rem;">
          <h1 style="font-size: 2.5rem; font-weight: 800; color: #0f172a; margin-bottom: 0.5rem; line-height: 1.2;">${escapeHtml(cul.title)}</h1>
          <p style="font-size: 1.1rem; color: #ea580c; font-weight: 600;">🍲 ${escapeHtml(cul.type || 'Makanan Utama')} • <span style="color: #64748b;">Asal: ${escapeHtml(cul.origin || 'Sumatera Barat')}</span></p>
          ${cul.flavorProfile ? `<p style="font-size: 1.05rem; color: #334155; margin-top: 0.5rem;"><strong>Cita Rasa Khas:</strong> ${escapeHtml(cul.flavorProfile)}</p>` : ''}
        </header>

        ${cul.imageUrl ? `
          <div style="margin-bottom: 2rem; border-radius: 1rem; overflow: hidden; box-shadow: 0 10px 15px -3px rgba(0,0,0,0.1);">
            <img src="${escapeHtml(cul.imageUrl)}" alt="${escapeHtml(cul.title)} Kuliner Minangkabau" style="width: 100%; max-height: 500px; object-fit: cover;" loading="lazy" />
          </div>
        ` : ''}

        <section style="font-size: 1.1rem; color: #334155; margin-bottom: 2.5rem;">
          ${paragraphs.map((p: string) => `<p style="margin-bottom: 1.25rem;">${escapeHtml(p)}</p>`).join('')}
        </section>

        <footer style="margin-top: 3rem; padding-top: 2rem; border-top: 1px solid #e2e8f0;">
          <div style="margin-bottom: 1.5rem;">
            <a href="/kuliner" style="color: #dc2626; font-weight: 600; text-decoration: none;">&larr; Kembali ke Katalog 36 Kuliner</a>
          </div>
          <div style="padding-top: 1.25rem; border-top: 1px dashed #cbd5e1; font-size: 0.9rem; color: #64748b; text-align: center;">
            Jelajahi kelezatan kuliner pusaka di portal <a href="/" style="color: #dc2626; font-weight: 600; text-decoration: none;">Pariwisata Sumatera Barat</a> &amp; rekomendasi <a href="/" style="color: #dc2626; font-weight: 600; text-decoration: none;">Pariwisata Sumbar 2026</a> di MALALA.
          </div>
        </footer>
      </article>
    `;

    const html = generateHtmlPage(baseTemplate, {
      title: pageTitle,
      description: pageDesc,
      canonicalUrl,
      imageUrl: cul.imageUrl,
      jsonLdList: [culJsonLd, breadcrumbJsonLd],
      bodyContent
    });

    writePage(distDir, `kuliner/${slug}`, html);
    culCount++;
  });
  console.log(`✅ ${culCount} Halaman SSG Kuliner Lengkap Berhasil Dibuat.`);

  // 10. GENERATE ALL 20 EVENT ITEMS
  let evCount = 0;
  eventItems.forEach(ev => {
    const slug = slugify(ev.title);
    if (!slug) return;

    const pageTitle = `Jadwal ${ev.title} 2026: Info Agenda, Rute & Lokasi Acara | MALALA`;
    const pageDesc = ev.description ? ev.description.substring(0, 160) + '...' : `Jadwal dan rincian kemeriahan event ${ev.title} di ${ev.location || 'Sumatera Barat'}.`;
    const canonicalUrl = `https://malala.my.id/event/${slug}`;

    const evJsonLd = {
      "@context": "https://schema.org",
      "@type": "Event",
      "name": ev.title,
      "description": ev.description,
      "image": [ev.imageUrl || "https://malala.my.id/favicon.png"],
      "startDate": "2026-01-01",
      "location": {
        "@type": "Place",
        "name": ev.location || "Sumatera Barat",
        "address": {
          "@type": "PostalAddress",
          "addressRegion": "Sumatera Barat",
          "addressCountry": "ID"
        }
      }
    };

    const breadcrumbJsonLd = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Pariwisata Sumatera Barat", "item": "https://malala.my.id/" },
        { "@type": "ListItem", "position": 2, "name": "Event", "item": "https://malala.my.id/event" },
        { "@type": "ListItem", "position": 3, "name": ev.title, "item": canonicalUrl }
      ]
    };

    const paragraphs = (ev.description || '').split('\n\n').filter(Boolean);

    const bodyContent = `
      <article style="max-width: 900px; margin: 0 auto; padding: 2.5rem 1.5rem; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; color: #1e293b; line-height: 1.8;">
        <nav style="font-size: 0.9rem; margin-bottom: 1.5rem; color: #64748b;">
          <a href="/" style="color: #64748b; text-decoration: none;">Pariwisata Sumatera Barat</a> &gt; 
          <a href="/event" style="color: #64748b; text-decoration: none;">Event</a> &gt; 
          <span style="color: #0f172a; font-weight: 600;">${escapeHtml(ev.title)}</span>
        </nav>
        <header style="margin-bottom: 2rem; border-bottom: 2px solid #e2e8f0; padding-bottom: 1.5rem;">
          <h1 style="font-size: 2.5rem; font-weight: 800; color: #0f172a; margin-bottom: 0.5rem; line-height: 1.2;">${escapeHtml(ev.title)}</h1>
          <p style="font-size: 1.1rem; color: #0284c7; font-weight: 600;">🗓️ Jadwal: ${escapeHtml(ev.schedule || '2026')} • 📍 Lokasi: ${escapeHtml(ev.location || 'Sumatera Barat')}</p>
          ${ev.isKen ? `<span style="display: inline-block; background: #fef3c7; color: #b45309; font-size: 0.85rem; font-weight: 700; padding: 0.35rem 0.85rem; border-radius: 9999px; margin-top: 0.5rem;">🌟 Karisma Event Nusantara (KEN)</span>` : ''}
        </header>

        ${ev.imageUrl ? `
          <div style="margin-bottom: 2rem; border-radius: 1rem; overflow: hidden; box-shadow: 0 10px 15px -3px rgba(0,0,0,0.1);">
            <img src="${escapeHtml(ev.imageUrl)}" alt="${escapeHtml(ev.title)} Festival Sumatera Barat" style="width: 100%; max-height: 500px; object-fit: cover;" loading="lazy" />
          </div>
        ` : ''}

        <section style="font-size: 1.1rem; color: #334155; margin-bottom: 2.5rem;">
          ${paragraphs.map((p: string) => `<p style="margin-bottom: 1.25rem;">${escapeHtml(p)}</p>`).join('')}
        </section>

        <footer style="margin-top: 3rem; padding-top: 2rem; border-top: 1px solid #e2e8f0;">
          <div style="margin-bottom: 1.5rem;">
            <a href="/event" style="color: #dc2626; font-weight: 600; text-decoration: none;">&larr; Kembali ke Kalender Event 2026</a>
          </div>
          <div style="padding-top: 1.25rem; border-top: 1px dashed #cbd5e1; font-size: 0.9rem; color: #64748b; text-align: center;">
            Agenda festival resmi <a href="/" style="color: #dc2626; font-weight: 600; text-decoration: none;">Pariwisata Sumatera Barat</a> &amp; kalender agenda <a href="/" style="color: #dc2626; font-weight: 600; text-decoration: none;">Pariwisata Sumbar 2026</a> di MALALA.
          </div>
        </footer>
      </article>
    `;

    const html = generateHtmlPage(baseTemplate, {
      title: pageTitle,
      description: pageDesc,
      canonicalUrl,
      imageUrl: ev.imageUrl,
      jsonLdList: [evJsonLd, breadcrumbJsonLd],
      bodyContent
    });

    writePage(distDir, `event/${slug}`, html);
    evCount++;
  });
  console.log(`✅ ${evCount} Halaman SSG Event Lengkap Berhasil Dibuat.`);

  // 11. GENERATE ALL NEWS ARTICLES (/berita/[slug] and /hotinfo/[slug])
  let newsCount = 0;
  hotInfoItems.forEach((n: any) => {
    const slug = slugify(n.title);
    if (!slug) return;

    const pageTitle = `${n.title} | Berita Pariwisata MALALA`;
    const paragraphs = (n.description || '').split('\n\n').filter(Boolean);
    const lead = paragraphs[0] || n.description || '';
    const pageDesc = (lead.substring(0, 155) + '...').replace(/\n/g, ' ');
    const canonicalUrl = `https://malala.my.id/berita/${slug}`;
    const ogImage = n.imageUrl || 'https://malala.my.id/og-image.jpg';
    const mapsTargetUrl = n.mapsUrl || (n.actionUrl && (n.actionUrl.includes('google.com/maps') || n.actionUrl.includes('maps.google.com'))
      ? n.actionUrl
      : (n.locationName
        ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(n.locationName)}`
        : `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(n.title)}`));
    const originalSourceUrl = n.sourceUrl || (n.actionUrl && !n.actionUrl.includes('maps') ? n.actionUrl : undefined);

    const newsJsonLd = {
      "@context": "https://schema.org",
      "@type": "NewsArticle",
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": canonicalUrl
      },
      "headline": n.title,
      "description": pageDesc,
      "image": [ogImage],
      "datePublished": "2026-09-06T08:00:00+07:00",
      "dateModified": "2026-09-06T08:00:00+07:00",
      "author": {
        "@type": "Organization",
        "name": "Redaksi Jurnalistik MALALA",
        "url": "https://malala.my.id"
      },
      "publisher": {
        "@type": "Organization",
        "name": "MALALA",
        "logo": {
          "@type": "ImageObject",
          "url": "https://malala.my.id/favicon.png"
        }
      },
      "articleSection": n.category || "Pariwisata",
      "inLanguage": "id-ID"
    };

    const breadcrumbJsonLd = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Pariwisata Sumatera Barat", "item": "https://malala.my.id/" },
        { "@type": "ListItem", "position": 2, "name": "Berita Pariwisata", "item": "https://malala.my.id/berita" },
        { "@type": "ListItem", "position": 3, "name": n.title, "item": canonicalUrl }
      ]
    };

    const bodyContent = `
      <article style="max-width: 860px; margin: 0 auto; padding: 2.5rem 1.5rem; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; color: #1e293b; line-height: 1.85;">
        <nav style="font-size: 0.9rem; margin-bottom: 1.5rem; color: #64748b;">
          <a href="/" style="color: #64748b; text-decoration: none;">Pariwisata Sumatera Barat</a> &gt; 
          <a href="/berita" style="color: #64748b; text-decoration: none;">Berita &amp; Info Terkini</a> &gt; 
          <span style="color: #0f172a; font-weight: 600;">${escapeHtml(n.title)}</span>
        </nav>

        <header style="margin-bottom: 2rem; border-bottom: 2px solid #e2e8f0; padding-bottom: 1.5rem;">
          <div style="display: flex; gap: 0.5rem; align-items: center; margin-bottom: 0.75rem; flex-wrap: wrap;">
            <span style="background: #fee2e2; color: #dc2626; font-size: 0.8rem; font-weight: 700; padding: 0.25rem 0.75rem; border-radius: 9999px; text-transform: uppercase;">${escapeHtml(n.category || 'Pariwisata')}</span>
            <span style="background: #f1f5f9; color: #475569; font-size: 0.8rem; font-weight: 600; padding: 0.25rem 0.75rem; border-radius: 9999px;">Wilayah: ${escapeHtml(n.tag || 'Sumbar')}</span>
            <time style="font-size: 0.85rem; color: #64748b; margin-left: auto;">🗓️ ${escapeHtml(n.date || 'Terkini')}</time>
          </div>
          <h1 style="font-size: 2.25rem; font-weight: 800; color: #0f172a; margin-bottom: 0.75rem; line-height: 1.25;">${escapeHtml(n.title)}</h1>
          <div style="font-size: 0.9rem; color: #64748b; display: flex; align-items: center; gap: 0.5rem;">
            <span>Liputan: <strong>Redaksi Jurnalistik MALALA</strong></span> • 
            <span>Informasi Resmi Terverifikasi</span>
          </div>
        </header>

        ${n.highlights && n.highlights.length > 0 ? `
          <div style="background: #f8fafc; border-left: 4px solid #dc2626; padding: 1.25rem 1.5rem; margin-bottom: 2rem; border-radius: 0 0.75rem 0.75rem 0;">
            <h3 style="font-size: 1rem; font-weight: 700; color: #0f172a; margin-bottom: 0.5rem;">Poin Utama Informasi:</h3>
            <ul style="margin: 0; padding-left: 1.25rem; color: #334155; font-size: 0.95rem;">
              ${n.highlights.map((h: string) => `<li style="margin-bottom: 0.35rem;">${escapeHtml(h)}</li>`).join('')}
            </ul>
          </div>
        ` : ''}

        ${n.imageUrl ? `
          <div style="margin-bottom: 2rem; border-radius: 1rem; overflow: hidden; box-shadow: 0 10px 15px -3px rgba(0,0,0,0.1);">
            <img src="${escapeHtml(n.imageUrl)}" alt="${escapeHtml(n.title)}" style="width: 100%; max-height: 500px; object-fit: cover;" loading="lazy" />
          </div>
        ` : ''}

        <section style="font-size: 1.125rem; color: #334155; margin-bottom: 2.5rem;">
          ${paragraphs.map((p: string) => `<p style="margin-bottom: 1.5rem; text-align: justify;">${injectInternalLinks(escapeHtml(p))}</p>`).join('')}
        </section>

        ${n.tips ? `
          <div style="background: #eff6ff; border: 1px solid #bfdbfe; border-radius: 0.75rem; padding: 1.25rem 1.5rem; margin-bottom: 2rem;">
            <h3 style="font-size: 1rem; font-weight: 700; color: #1e40af; margin-bottom: 0.35rem;">💡 Imbauan &amp; Panduan Perjalanan:</h3>
            <p style="color: #1e3a8a; font-size: 0.95rem; margin: 0;">${escapeHtml(n.tips)}</p>
          </div>
        ` : ''}

        ${(n.locationName || mapsTargetUrl || originalSourceUrl) ? `
          <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 0.75rem; padding: 1.25rem 1.5rem; margin-bottom: 2.5rem; font-size: 0.95rem; color: #475569;">
            ${n.locationName ? `<div style="margin-bottom: 0.75rem; font-weight: 600; color: #0f172a;">📍 Lokasi Terkait: <span style="font-weight: 400; color: #334155;">${escapeHtml(n.locationName)}</span></div>` : ''}
            <div style="display: flex; gap: 1.25rem; flex-wrap: wrap; align-items: center; font-size: 0.9rem;">
              ${mapsTargetUrl ? `<a href="${escapeHtml(mapsTargetUrl)}" target="_blank" rel="noopener noreferrer" style="color: #059669; font-weight: 700; text-decoration: none; display: inline-flex; align-items: center; gap: 0.35rem; background: #ecfdf5; padding: 0.4rem 0.85rem; border-radius: 0.375rem; border: 1px solid #a7f3d0;">🗺️ Buka Lokasi di Google Maps &rarr;</a>` : ''}
              ${originalSourceUrl ? `<a href="${escapeHtml(originalSourceUrl)}" target="_blank" rel="noopener noreferrer nofollow" style="color: #475569; text-decoration: underline; display: inline-flex; align-items: center; gap: 0.35rem;">📰 Baca Sumber Berita Asli ${n.sourceName ? `(${escapeHtml(n.sourceName)})` : ''}</a>` : ''}
            </div>
          </div>
        ` : ''}

        <footer style="margin-top: 3rem; padding-top: 2rem; border-top: 1px solid #e2e8f0;">
          <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 1rem; margin-bottom: 1.5rem;">
            <a href="/berita" style="color: #dc2626; font-weight: 700; text-decoration: none;">&larr; Indeks Berita Pariwisata</a>
            <a href="/" style="color: #64748b; font-weight: 600; text-decoration: none;">Portal Pariwisata Sumatera Barat &rarr;</a>
          </div>
          <div style="padding-top: 1.25rem; border-top: 1px dashed #cbd5e1; font-size: 0.9rem; color: #64748b; text-align: center;">
            Update informasi lalu lintas, cuaca &amp; regulasi resmi <a href="/" style="color: #dc2626; font-weight: 600; text-decoration: none;">Pariwisata Sumatera Barat</a> &amp; panduan <a href="/" style="color: #dc2626; font-weight: 600; text-decoration: none;">Pariwisata Sumbar 2026</a> di MALALA.
          </div>
        </footer>
      </article>
    `;

    const html = generateHtmlPage(baseTemplate, {
      title: pageTitle,
      description: pageDesc,
      canonicalUrl,
      imageUrl: ogImage,
      jsonLdList: [newsJsonLd, breadcrumbJsonLd],
      bodyContent
    });

    writePage(distDir, `berita/${slug}`, html);
    writePage(distDir, `hotinfo/${slug}`, html);
    newsCount++;
  });
  console.log(`✅ ${newsCount} Halaman SSG Berita Lengkap (/berita & /hotinfo) Berhasil Dibuat.`);

  generateSitemaps(rootDir, distDir, destinations, cultureItems, culinaryItems, eventItems, hotInfoItems);

  console.log(`🎉 STATIC SITE GENERATION (SSG) SELESAI: Seluruh Halaman Diperkaya Konten Nyata Tanpa 'display:none' Siap Diindeks Google!`);
}

function generateSitemaps(
  rootDir: string,
  distDir: string,
  destinations: any[],
  cultureItems: any[],
  culinaryItems: any[],
  eventItems: any[],
  hotInfoItems: any[]
) {
  console.log('🗺️ Memperbarui Peta Situs Resmi (sitemap.xml, news-sitemap.xml, rss.xml)...');

  const today = new Date().toISOString().split('T')[0];
  const nowIso = new Date().toISOString();

  // 1. Build comprehensive sitemap.xml
  let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
  xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"\n`;
  xml += `        xmlns:xhtml="http://www.w3.org/1999/xhtml"\n`;
  xml += `        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">\n`;

  // Homepage
  xml += `  <!-- Homepage -->\n`;
  xml += `  <url>\n`;
  xml += `    <loc>https://malala.my.id/</loc>\n`;
  xml += `    <lastmod>${today}</lastmod>\n`;
  xml += `    <changefreq>daily</changefreq>\n`;
  xml += `    <priority>1.0</priority>\n`;
  xml += `  </url>\n\n`;

  // Discovery Categories & Hubs
  const mainHubs = [
    { path: 'destinasi', freq: 'weekly', priority: '0.9' },
    { path: 'kebudayaan', freq: 'weekly', priority: '0.9' },
    { path: 'kuliner', freq: 'weekly', priority: '0.9' },
    { path: 'event', freq: 'daily', priority: '0.9' },
    { path: 'oleh-oleh', freq: 'weekly', priority: '0.85' },
    { path: 'unduhan', freq: 'weekly', priority: '0.85' },
    { path: 'berita', freq: 'daily', priority: '0.95' },
    { path: 'hotinfo', freq: 'daily', priority: '0.9' },
    { path: 'peta', freq: 'weekly', priority: '0.85' },
    { path: 'rencana-liburan', freq: 'weekly', priority: '0.85' },
    { path: 'tanya-mala', freq: 'weekly', priority: '0.85' },
    { path: 'sitemap', freq: 'daily', priority: '0.9' },
    { path: 'flipbook/panduan/id', freq: 'monthly', priority: '0.85' },
    { path: 'flipbook/panduan/en', freq: 'monthly', priority: '0.85' },
    { path: 'flipbook/events/id', freq: 'monthly', priority: '0.85' },
    { path: 'flipbook/events/en', freq: 'monthly', priority: '0.85' },
    { path: 'downloads/malala-panduan-wisata-sumbar-2026.pdf', freq: 'weekly', priority: '0.8' },
    { path: 'downloads/kalender-event-sumbar-2026.pdf', freq: 'weekly', priority: '0.8' },
    { path: 'llms.txt', freq: 'weekly', priority: '0.7' },
    { path: 'llms-full.txt', freq: 'weekly', priority: '0.7' },
  ];

  xml += `  <!-- Main Discovery Categories & Hubs -->\n`;
  for (const hub of mainHubs) {
    xml += `  <url>\n`;
    xml += `    <loc>https://malala.my.id/${hub.path}</loc>\n`;
    xml += `    <lastmod>${today}</lastmod>\n`;
    xml += `    <changefreq>${hub.freq}</changefreq>\n`;
    xml += `    <priority>${hub.priority}</priority>\n`;
    xml += `  </url>\n`;
  }
  xml += `\n`;

  // 50+ Destinations
  xml += `  <!-- 50+ Destinasi Wisata Unggulan -->\n`;
  for (const d of destinations) {
    const slug = slugify(d.title);
    xml += `  <url>\n`;
    xml += `    <loc>https://malala.my.id/destinasi/${slug}</loc>\n`;
    xml += `    <lastmod>${today}</lastmod>\n`;
    xml += `    <changefreq>weekly</changefreq>\n`;
    xml += `    <priority>0.85</priority>\n`;
    if (d.imageUrl) {
      xml += `    <image:image>\n`;
      xml += `      <image:loc>${escapeHtml(d.imageUrl)}</image:loc>\n`;
      xml += `      <image:title>${escapeHtml(d.title)}</image:title>\n`;
      xml += `    </image:image>\n`;
    }
    xml += `  </url>\n`;
  }
  xml += `\n`;

  // 30 Culture Items
  xml += `  <!-- 30 Warisan Seni & Budaya Minangkabau -->\n`;
  for (const c of cultureItems) {
    const slug = slugify(c.title);
    xml += `  <url>\n`;
    xml += `    <loc>https://malala.my.id/kebudayaan/${slug}</loc>\n`;
    xml += `    <lastmod>${today}</lastmod>\n`;
    xml += `    <changefreq>monthly</changefreq>\n`;
    xml += `    <priority>0.8</priority>\n`;
    xml += `  </url>\n`;
  }
  xml += `\n`;

  // 36 Culinary Items
  xml += `  <!-- 36 Kuliner Otentik Legendaris -->\n`;
  for (const c of culinaryItems) {
    const slug = slugify(c.title);
    xml += `  <url>\n`;
    xml += `    <loc>https://malala.my.id/kuliner/${slug}</loc>\n`;
    xml += `    <lastmod>${today}</lastmod>\n`;
    xml += `    <changefreq>monthly</changefreq>\n`;
    xml += `    <priority>0.8</priority>\n`;
    xml += `  </url>\n`;
  }
  xml += `\n`;

  // 26 Event Items
  xml += `  <!-- 26 Agenda Event Karisma Event Nusantara 2026 -->\n`;
  for (const e of eventItems) {
    const slug = slugify(e.title);
    xml += `  <url>\n`;
    xml += `    <loc>https://malala.my.id/event/${slug}</loc>\n`;
    xml += `    <lastmod>${today}</lastmod>\n`;
    xml += `    <changefreq>weekly</changefreq>\n`;
    xml += `    <priority>0.85</priority>\n`;
    xml += `  </url>\n`;
  }
  xml += `\n`;

  // News Articles (/berita & /hotinfo)
  xml += `  <!-- Liputan Berita Pariwisata Terkini & Hot Info -->\n`;
  for (const n of hotInfoItems) {
    const slug = slugify(n.title);
    xml += `  <url>\n`;
    xml += `    <loc>https://malala.my.id/berita/${slug}</loc>\n`;
    xml += `    <lastmod>${today}</lastmod>\n`;
    xml += `    <changefreq>daily</changefreq>\n`;
    xml += `    <priority>0.9</priority>\n`;
    xml += `  </url>\n`;
    xml += `  <url>\n`;
    xml += `    <loc>https://malala.my.id/hotinfo/${slug}</loc>\n`;
    xml += `    <lastmod>${today}</lastmod>\n`;
    xml += `    <changefreq>daily</changefreq>\n`;
    xml += `    <priority>0.85</priority>\n`;
    xml += `  </url>\n`;
  }

  xml += `</urlset>\n`;

  // 2. Build news-sitemap.xml (Google News Schema)
  const nowIsoW3c = new Date().toISOString().replace(/\.\d{3}Z$/, 'Z');
  let newsXml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
  newsXml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"\n`;
  newsXml += `        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9">\n`;

  for (const n of hotInfoItems) {
    const slug = slugify(n.title);
    const newsLang = (n.lang && n.lang.toLowerCase().startsWith('en')) ? 'en' : 'id';
    newsXml += `  <url>\n`;
    newsXml += `    <loc>https://malala.my.id/berita/${slug}</loc>\n`;
    newsXml += `    <news:news>\n`;
    newsXml += `      <news:publication>\n`;
    newsXml += `        <news:name>MALALA Pariwisata Sumbar</news:name>\n`;
    newsXml += `        <news:language>${newsLang}</news:language>\n`;
    newsXml += `      </news:publication>\n`;
    newsXml += `      <news:publication_date>${nowIsoW3c}</news:publication_date>\n`;
    newsXml += `      <news:title>${escapeHtml(n.title)}</news:title>\n`;
    newsXml += `    </news:news>\n`;
    newsXml += `  </url>\n`;
  }
  newsXml += `</urlset>\n`;

  // 3. Build rss.xml
  let rssXml = `<?xml version="1.0" encoding="UTF-8" ?>\n`;
  rssXml += `<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">\n`;
  rssXml += `<channel>\n`;
  rssXml += `  <title>MALALA News — Berita &amp; Info Pariwisata Terkini Sumatera Barat</title>\n`;
  rssXml += `  <link>https://malala.my.id/berita</link>\n`;
  rssXml += `  <description>Liputan berita terpercaya seputar perkembangan destinasi, agenda festival, akses jalan raya, dan regulasi pariwisata di Sumatera Barat &amp; Nasional.</description>\n`;
  rssXml += `  <language>id-ID</language>\n`;
  rssXml += `  <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>\n`;
  rssXml += `  <atom:link href="https://malala.my.id/rss.xml" rel="self" type="application/rss+xml" />\n`;

  for (const n of hotInfoItems) {
    const slug = slugify(n.title);
    rssXml += `  <item>\n`;
    rssXml += `    <title>${escapeHtml(n.title)}</title>\n`;
    rssXml += `    <link>https://malala.my.id/berita/${slug}</link>\n`;
    rssXml += `    <guid isPermaLink="true">https://malala.my.id/berita/${slug}</guid>\n`;
    rssXml += `    <description>${escapeHtml(n.description || n.title)}</description>\n`;
    rssXml += `    <category>${escapeHtml(n.category || 'Pariwisata Sumatera Barat')}</category>\n`;
    rssXml += `    <pubDate>${new Date().toUTCString()}</pubDate>\n`;
    rssXml += `  </item>\n`;
  }
  rssXml += `</channel>\n`;
  rssXml += `</rss>\n`;

  // 4. Also write sitemap_index.xml (alias of sitemap.xml) and feed.xml (alias of rss.xml)
  // Write files to public/ and dist/
  const publicDir = path.join(rootDir, 'public');
  if (fs.existsSync(publicDir)) {
    fs.writeFileSync(path.join(publicDir, 'sitemap.xml'), xml, 'utf-8');
    fs.writeFileSync(path.join(publicDir, 'sitemap_index.xml'), xml, 'utf-8');
    fs.writeFileSync(path.join(publicDir, 'news-sitemap.xml'), newsXml, 'utf-8');
    fs.writeFileSync(path.join(publicDir, 'rss.xml'), rssXml, 'utf-8');
    fs.writeFileSync(path.join(publicDir, 'feed.xml'), rssXml, 'utf-8');
  }

  if (fs.existsSync(distDir)) {
    fs.writeFileSync(path.join(distDir, 'sitemap.xml'), xml, 'utf-8');
    fs.writeFileSync(path.join(distDir, 'sitemap_index.xml'), xml, 'utf-8');
    fs.writeFileSync(path.join(distDir, 'news-sitemap.xml'), newsXml, 'utf-8');
    fs.writeFileSync(path.join(distDir, 'rss.xml'), rssXml, 'utf-8');
    fs.writeFileSync(path.join(distDir, 'feed.xml'), rssXml, 'utf-8');
  }

  console.log(`✅ ${destinations.length + cultureItems.length + culinaryItems.length + eventItems.length + (hotInfoItems.length * 2) + mainHubs.length + 1} URL Peta Situs (sitemap.xml, sitemap_index.xml, news-sitemap.xml, rss.xml, feed.xml) Berhasil Disinkronkan.`);
}

// Auto-run if executed via CLI
if (process.argv[1] && process.argv[1].includes('generate_ssg_pages')) {
  generateSsg();
}
