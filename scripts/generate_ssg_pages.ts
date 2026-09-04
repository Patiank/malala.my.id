import * as fs from 'fs';
import * as path from 'path';

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

const FAQS = [
  {
    question: "Apa saja tempat wisata hits di Sumbar 2026 yang wajib dikunjungi?",
    answer: "Untuk rekomendasi tempat wisata hits di Sumbar 2026, Anda wajib mengunjungi surga tersembunyi Mandeh (Raja Ampat-nya Sumatera Barat), pesona wisata Lembah Harau terbaru, menikmati sunset dan mencari info tiket masuk Ngarai Sianok di Bukittinggi, hingga selancar ombak kelas dunia di Kepulauan Mentawai."
  },
  {
    question: "Kapan jadwal Festival Tabuik Pariaman dan jadwal Pacu Jawi 2026 diadakan?",
    answer: "Jadwal Pacu Jawi 2026 di Tanah Datar biasanya diadakan bergilir setiap akhir pekan pasca-panen raya. Sementara untuk kapan Festival Tabuik Pariaman 2026, acara puncak (Tabuik Naik Pangkek dan Dibuang ke Laut) diselenggarakan bertepatan dengan 10 Muharram kalender Hijriah. Anda juga bisa mengecek jadwal Tour de Singkarak di portal kalender event kami."
  },
  {
    question: "Apa saja rekomendasi kuliner khas Padang Bukittinggi yang terenak?",
    answer: "Rekomendasi kuliner khas Padang Bukittinggi meliputi Rendang Daging autentik, daftar tempat makan Nasi Kapau asli di Pasar Bawah, hingga berburu sate padang terenak di Sumbar (seperti Sate Mak Syukur atau Sate Danguang-Danguang). Jangan lewatkan juga Itiak Lado Mudo Koto Gadang."
  },
  {
    question: "Bagaimana cara transportasi dari Bandara Internasional Minangkabau (BIM) ke destinasi wisata?",
    answer: "Dari Bandara Internasional Minangkabau (BIM), wisatawan dapat menggunakan Kereta Bandara Minangkabau Ekspres ke pusat Kota Padang, layanan Bus Damri, taksi argo resmi, atau sewa mobil wisata untuk rute Padang - Padang Panjang - Bukittinggi - Harau."
  },
  {
    question: "Di mana link download peta wisata Sumatera Barat PDF gratis?",
    answer: "Anda bisa download peta wisata Sumatera Barat PDF gratis dan download buku panduan pariwisata Sumbar 2026 PDF (lengkap 113 halaman) resolusi tinggi langsung melalui halaman Unduhan di portal resmi Malala."
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
    "@type": "Organization",
    "name": "MALALA - West Sumatra Smart Tourism Portal",
    "url": "https://malala.my.id",
    "logo": "https://malala.my.id/favicon.png",
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
    "name": "MALALA",
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

  // Inject Pre-rendered Body Content inside <div id="root">
  if (options.bodyContent) {
    html = html.replace(
      '<div id="root"></div>',
      `<div id="root">${options.bodyContent}</div>`
    );
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

  // 1. UPDATE HOMEPAGE WITH RICH FAQ & ORG SCHEMAS
  console.log('📄 Mengoptimasi Homepage dengan FAQPage Schema & Organization JSON-LD...');
  const homeContent = `
    <div style="max-width: 1200px; margin: 0 auto; padding: 2rem 1.5rem; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; color: #1e293b; line-height: 1.7;">
      <header style="margin-bottom: 2.5rem; text-align: center; border-bottom: 1px solid #e2e8f0; padding-bottom: 2rem;">
        <h1 style="font-size: 2.25rem; font-weight: 800; color: #0f172a; margin-bottom: 0.75rem;">Pariwisata Sumatera Barat — Portal Wisata & Budaya Resmi (Malala)</h1>
        <p style="font-size: 1.15rem; color: #475569; max-width: 800px; margin: 0 auto;">Portal resmi eksplorasi 38+ destinasi wisata alam dan geopark, 22+ warisan adat budaya Minangkabau, 26+ kuliner autentik legendaris, serta kalender event Karisma Event Nusantara (KEN) 2026.</p>
        <nav style="margin-top: 1.5rem; display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap;">
          <a href="/destinasi" style="color: #dc2626; font-weight: 600; text-decoration: none;">Jelajah 38+ Destinasi &rarr;</a>
          <a href="/kebudayaan" style="color: #dc2626; font-weight: 600; text-decoration: none;">Warisan Budaya Minang &rarr;</a>
          <a href="/kuliner" style="color: #dc2626; font-weight: 600; text-decoration: none;">Kuliner Autentik &rarr;</a>
          <a href="/event" style="color: #dc2626; font-weight: 600; text-decoration: none;">Kalender Event 2026 &rarr;</a>
          <a href="/unduhan" style="color: #dc2626; font-weight: 600; text-decoration: none;">Download E-Book PDF &rarr;</a>
        </nav>
      </header>
      <section style="margin-top: 3rem; background: #f8fafc; padding: 2rem; border-radius: 1rem; border: 1px solid #e2e8f0;">
        <h2 style="font-size: 1.5rem; font-weight: 700; color: #0f172a; margin-bottom: 1.5rem;">Tanya Jawab Seputar Pariwisata Sumatera Barat (FAQ)</h2>
        ${FAQS.map(f => `
          <article style="margin-bottom: 1.5rem; border-bottom: 1px solid #cbd5e1; padding-bottom: 1rem;">
            <h3 style="font-size: 1.15rem; font-weight: 600; color: #1e293b; margin-bottom: 0.5rem;">${escapeHtml(f.question)}</h3>
            <p style="color: #475569;">${escapeHtml(f.answer)}</p>
          </article>
        `).join('')}
      </section>
    </div>
  `;

  const optimizedHome = generateHtmlPage(baseTemplate, {
    title: 'Pariwisata Sumatera Barat: 38+ Destinasi, Kuliner, Event & AI Itinerary 2026 | MALALA',
    description: 'Portal resmi pariwisata Sumatera Barat 2026. Temukan 38+ destinasi hits, rute wisata tanpa bolak-balik, 26 kuliner legendaris, jadwal festival KEN 2026, dan asisten AI cerdas Uni Mala.',
    canonicalUrl: 'https://malala.my.id/',
    jsonLdList: [buildOrganizationJsonLd(), buildWebsiteJsonLd(), buildFaqJsonLd()],
    bodyContent: homeContent
  });
  fs.writeFileSync(indexHtmlPath, optimizedHome, 'utf-8');

  // 2. GENERATE DESTINASI CATEGORY DIRECTORY PAGE (/destinasi)
  console.log('📄 Mengoptimasi Halaman Direktori /destinasi dengan Katalog 38 Destinasi Lengkap...');
  const destinasiCatalogHtml = `
    <div style="max-width: 1200px; margin: 0 auto; padding: 2.5rem 1.5rem; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; color: #1e293b; line-height: 1.7;">
      <nav style="font-size: 0.9rem; margin-bottom: 1.5rem; color: #64748b;">
        <a href="/" style="color: #64748b; text-decoration: none;">Beranda</a> &gt; <span style="color: #0f172a; font-weight: 600;">Destinasi</span>
      </nav>
      <header style="margin-bottom: 3rem; border-bottom: 2px solid #e2e8f0; padding-bottom: 2rem;">
        <h1 style="font-size: 2.25rem; font-weight: 800; color: #0f172a; margin-bottom: 0.75rem;">Katalog 38+ Destinasi Wisata Terbaik di Sumatera Barat 2026</h1>
        <p style="font-size: 1.15rem; color: #475569;">Jelajahi keindahan alam Bukit Barisan, geopark tebing granit Lembah Harau, danau vulkanik Singkarak & Maninjau, surga bahari Mandeh & Mentawai, serta desa wisata terindah di Ranah Minang.</p>
      </header>
      <section style="display: grid; grid-template-columns: repeat(auto-fill, minmax(320px, 1fr)); gap: 2rem;">
        ${destinations.map(d => {
          const slug = slugify(d.title);
          return `
            <article style="background: #ffffff; border: 1px solid #e2e8f0; border-radius: 1rem; padding: 1.5rem; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05);">
              <h2 style="font-size: 1.35rem; font-weight: 700; margin-bottom: 0.5rem;">
                <a href="/destinasi/${slug}" style="color: #0f172a; text-decoration: none;">${escapeHtml(d.title)}</a>
              </h2>
              <p style="font-size: 0.875rem; color: #dc2626; font-weight: 600; margin-bottom: 0.75rem;">📍 ${escapeHtml(d.regency || 'Sumatera Barat')} • <span style="color: #64748b;">${escapeHtml(d.category || 'Wisata Alam')}</span></p>
              <p style="color: #475569; font-size: 0.95rem; margin-bottom: 1rem;">${escapeHtml((d.description || '').substring(0, 180))}...</p>
              <a href="/destinasi/${slug}" style="display: inline-block; color: #dc2626; font-weight: 600; text-decoration: none; font-size: 0.95rem;">Lihat Panduan & Rute Lengkap &rarr;</a>
            </article>
          `;
        }).join('')}
      </section>
    </div>
  `;

  const destinasiPage = generateHtmlPage(baseTemplate, {
    title: 'Destinasi Wisata Sumatera Barat: 38+ Rekomendasi Hits & Rute 2026 | MALALA',
    description: 'Katalog resmi 38+ destinasi wisata terbaik di Sumatera Barat. Temukan rute Lembah Harau, Mandeh, Mentawai, Ngarai Sianok, Danau Singkarak, dan desa wisata Ranah Minang.',
    canonicalUrl: 'https://malala.my.id/destinasi',
    jsonLdList: [
      {
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        "name": "Katalog 38+ Destinasi Wisata Terbaik Sumatera Barat",
        "description": "Daftar lengkap objek wisata alam, danau, geopark, dan bahari di Sumatera Barat.",
        "url": "https://malala.my.id/destinasi"
      },
      buildFaqJsonLd()
    ],
    bodyContent: destinasiCatalogHtml
  });
  writePage(distDir, 'destinasi', destinasiPage);

  // 3. GENERATE KEBUDAYAAN CATEGORY DIRECTORY PAGE (/kebudayaan)
  console.log('📄 Mengoptimasi Halaman Direktori /kebudayaan dengan Katalog 22 Warisan Budaya...');
  const kebudayaanCatalogHtml = `
    <div style="max-width: 1200px; margin: 0 auto; padding: 2.5rem 1.5rem; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; color: #1e293b; line-height: 1.7;">
      <nav style="font-size: 0.9rem; margin-bottom: 1.5rem; color: #64748b;">
        <a href="/" style="color: #64748b; text-decoration: none;">Beranda</a> &gt; <span style="color: #0f172a; font-weight: 600;">Kebudayaan</span>
      </nav>
      <header style="margin-bottom: 3rem; border-bottom: 2px solid #e2e8f0; padding-bottom: 2rem;">
        <h1 style="font-size: 2.25rem; font-weight: 800; color: #0f172a; margin-bottom: 0.75rem;">Katalog 22+ Warisan Adat & Seni Budaya Minangkabau</h1>
        <p style="font-size: 1.15rem; color: #475569;">Eksplorasi keluhuran filosofi Adat Basandi Syarak, Syarak Basandi Kitabullah, sistem matrilineal, kemegahan arsitektur Rumah Gadang, Tari Piring, bela diri Silek, dan tenun pusaka Pandai Sikek.</p>
      </header>
      <section style="display: grid; grid-template-columns: repeat(auto-fill, minmax(320px, 1fr)); gap: 2rem;">
        ${cultureItems.map(c => {
          const slug = slugify(c.title);
          return `
            <article style="background: #ffffff; border: 1px solid #e2e8f0; border-radius: 1rem; padding: 1.5rem; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05);">
              <h2 style="font-size: 1.35rem; font-weight: 700; margin-bottom: 0.5rem;">
                <a href="/kebudayaan/${slug}" style="color: #0f172a; text-decoration: none;">${escapeHtml(c.title)}</a>
              </h2>
              <p style="font-size: 0.875rem; color: #b45309; font-weight: 600; margin-bottom: 0.75rem;">🏛️ ${escapeHtml(c.category || 'Tradisi Adat')} • <span style="color: #64748b;">${escapeHtml(c.origin || 'Minangkabau')}</span></p>
              ${c.philosophy ? `<p style="font-size: 0.9rem; color: #047857; font-style: italic; margin-bottom: 0.75rem;">"${escapeHtml(c.philosophy)}"</p>` : ''}
              <p style="color: #475569; font-size: 0.95rem; margin-bottom: 1rem;">${escapeHtml((c.description || '').substring(0, 180))}...</p>
              <a href="/kebudayaan/${slug}" style="display: inline-block; color: #dc2626; font-weight: 600; text-decoration: none; font-size: 0.95rem;">Baca Filosofi & Sejarah &rarr;</a>
            </article>
          `;
        }).join('')}
      </section>
    </div>
  `;

  const kebudayaanPage = generateHtmlPage(baseTemplate, {
    title: 'Warisan Budaya Minangkabau: 22+ Adat, Falsafah & Seni Tradisi | MALALA',
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
  console.log('📄 Mengoptimasi Halaman Direktori /kuliner dengan 26 Kuliner Autentik...');
  const kulinerCatalogHtml = `
    <div style="max-width: 1200px; margin: 0 auto; padding: 2.5rem 1.5rem; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; color: #1e293b; line-height: 1.7;">
      <nav style="font-size: 0.9rem; margin-bottom: 1.5rem; color: #64748b;">
        <a href="/" style="color: #64748b; text-decoration: none;">Beranda</a> &gt; <span style="color: #0f172a; font-weight: 600;">Kuliner</span>
      </nav>
      <header style="margin-bottom: 3rem; border-bottom: 2px solid #e2e8f0; padding-bottom: 2rem;">
        <h1 style="font-size: 2.25rem; font-weight: 800; color: #0f172a; margin-bottom: 0.75rem;">Katalog 26+ Kuliner Autentik Khas Minangkabau</h1>
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
    title: 'Kuliner Khas Minangkabau: 26+ Makanan Khas Padang Terenak | MALALA',
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
  console.log('📄 Mengoptimasi Halaman Direktori /event dengan Kalender 20 Event...');
  const eventCatalogHtml = `
    <div style="max-width: 1200px; margin: 0 auto; padding: 2.5rem 1.5rem; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; color: #1e293b; line-height: 1.7;">
      <nav style="font-size: 0.9rem; margin-bottom: 1.5rem; color: #64748b;">
        <a href="/" style="color: #64748b; text-decoration: none;">Beranda</a> &gt; <span style="color: #0f172a; font-weight: 600;">Event & Festival</span>
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
    title: 'Kalender Event Sumbar 2026: Jadwal Festival Karisma Event Nusantara | MALALA',
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

  // 6. GENERATE OTHER MAIN PAGES (oleh-oleh, unduhan, hotinfo, peta, rencana-liburan, tanya-mala)
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
      route: 'hotinfo',
      title: 'Hot Info & Berita Pariwisata Terkini Sumbar 2026 | MALALA',
      description: 'Kabar dan berita pariwisata real-time seputar destinasi, event, dan akses liburan di Sumatera Barat.',
      h1: 'Kabar & Berita Pariwisata Terkini Sumatera Barat',
      content: '<p>Liputan berita terpercaya seputar perkembangan destinasi, agenda festival, dan regulasi pariwisata di Sumatera Barat.</p>'
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
            <a href="/" style="color: #64748b; text-decoration: none;">Beranda</a> &gt; <span style="color: #0f172a; font-weight: 600;">${escapeHtml(pg.route)}</span>
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

  // 7. GENERATE ALL 38 INDIVIDUAL DESTINATIONS WITH FULL CONTENT & INTERNAL LINKS
  let destCount = 0;
  destinations.forEach(dest => {
    const slug = slugify(dest.title);
    if (!slug) return;

    const pageTitle = `${dest.title} (${dest.regency || 'Sumatera Barat'}): Rute, Daya Tarik & Panduan 2026 | MALALA`;
    const pageDesc = dest.description ? dest.description.substring(0, 160) + '...' : `Informasi lengkap mengenai ${dest.title} di ${dest.regency || 'Sumatera Barat'}.`;
    const canonicalUrl = `https://malala.my.id/destinasi/${slug}`;

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
        { "@type": "ListItem", "position": 1, "name": "Beranda", "item": "https://malala.my.id/" },
        { "@type": "ListItem", "position": 2, "name": "Destinasi", "item": "https://malala.my.id/destinasi" },
        { "@type": "ListItem", "position": 3, "name": dest.title, "item": canonicalUrl }
      ]
    };

    const paragraphs = (dest.description || '').split('\n\n').filter(Boolean);

    const bodyContent = `
      <article style="max-width: 900px; margin: 0 auto; padding: 2.5rem 1.5rem; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; color: #1e293b; line-height: 1.8;">
        <nav style="font-size: 0.9rem; margin-bottom: 1.5rem; color: #64748b;">
          <a href="/" style="color: #64748b; text-decoration: none;">Beranda</a> &gt; 
          <a href="/destinasi" style="color: #64748b; text-decoration: none;">Destinasi</a> &gt; 
          <span style="color: #0f172a; font-weight: 600;">${escapeHtml(dest.title)}</span>
        </nav>
        <header style="margin-bottom: 2rem; border-bottom: 2px solid #e2e8f0; padding-bottom: 1.5rem;">
          <h1 style="font-size: 2.5rem; font-weight: 800; color: #0f172a; margin-bottom: 0.5rem; line-height: 1.2;">${escapeHtml(dest.title)}</h1>
          <p style="font-size: 1.1rem; color: #dc2626; font-weight: 600;">📍 ${escapeHtml(dest.regency || 'Sumatera Barat')} • <span style="color: #64748b;">Kategori: ${escapeHtml(dest.category || 'Wisata Alam')}</span></p>
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

        <footer style="margin-top: 3rem; padding-top: 2rem; border-top: 1px solid #e2e8f0; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 1rem;">
          <a href="/destinasi" style="color: #dc2626; font-weight: 600; text-decoration: none;">&larr; Kembali ke Katalog 38 Destinasi</a>
          <a href="/rencana-liburan" style="background: #dc2626; color: #ffffff; padding: 0.6rem 1.25rem; border-radius: 0.5rem; text-decoration: none; font-weight: 600;">Rancang Rute ke Sini dengan AI &rarr;</a>
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
        { "@type": "ListItem", "position": 1, "name": "Beranda", "item": "https://malala.my.id/" },
        { "@type": "ListItem", "position": 2, "name": "Kebudayaan", "item": "https://malala.my.id/kebudayaan" },
        { "@type": "ListItem", "position": 3, "name": cult.title, "item": canonicalUrl }
      ]
    };

    const paragraphs = (cult.description || '').split('\n\n').filter(Boolean);

    const bodyContent = `
      <article style="max-width: 900px; margin: 0 auto; padding: 2.5rem 1.5rem; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; color: #1e293b; line-height: 1.8;">
        <nav style="font-size: 0.9rem; margin-bottom: 1.5rem; color: #64748b;">
          <a href="/" style="color: #64748b; text-decoration: none;">Beranda</a> &gt; 
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
          <a href="/kebudayaan" style="color: #dc2626; font-weight: 600; text-decoration: none;">&larr; Kembali ke Katalog Warisan Budaya</a>
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
        { "@type": "ListItem", "position": 1, "name": "Beranda", "item": "https://malala.my.id/" },
        { "@type": "ListItem", "position": 2, "name": "Kuliner", "item": "https://malala.my.id/kuliner" },
        { "@type": "ListItem", "position": 3, "name": cul.title, "item": canonicalUrl }
      ]
    };

    const paragraphs = (cul.description || '').split('\n\n').filter(Boolean);

    const bodyContent = `
      <article style="max-width: 900px; margin: 0 auto; padding: 2.5rem 1.5rem; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; color: #1e293b; line-height: 1.8;">
        <nav style="font-size: 0.9rem; margin-bottom: 1.5rem; color: #64748b;">
          <a href="/" style="color: #64748b; text-decoration: none;">Beranda</a> &gt; 
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
          <a href="/kuliner" style="color: #dc2626; font-weight: 600; text-decoration: none;">&larr; Kembali ke Katalog 26 Kuliner</a>
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
        { "@type": "ListItem", "position": 1, "name": "Beranda", "item": "https://malala.my.id/" },
        { "@type": "ListItem", "position": 2, "name": "Event", "item": "https://malala.my.id/event" },
        { "@type": "ListItem", "position": 3, "name": ev.title, "item": canonicalUrl }
      ]
    };

    const paragraphs = (ev.description || '').split('\n\n').filter(Boolean);

    const bodyContent = `
      <article style="max-width: 900px; margin: 0 auto; padding: 2.5rem 1.5rem; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; color: #1e293b; line-height: 1.8;">
        <nav style="font-size: 0.9rem; margin-bottom: 1.5rem; color: #64748b;">
          <a href="/" style="color: #64748b; text-decoration: none;">Beranda</a> &gt; 
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
          <a href="/event" style="color: #dc2626; font-weight: 600; text-decoration: none;">&larr; Kembali ke Kalender Event 2026</a>
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

  console.log(`🎉 STATIC SITE GENERATION (SSG) SELESAI: Seluruh 117 Halaman Diperkaya Konten Nyata Tanpa 'display:none' Siap Diindeks Google!`);
}

// Auto-run if executed via CLI
if (process.argv[1] && process.argv[1].includes('generate_ssg_pages')) {
  generateSsg();
}
