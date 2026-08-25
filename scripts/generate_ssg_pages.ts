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
    question: "Apa saja tempat wisata paling populer di Sumatera Barat?",
    answer: "Sumatera Barat memiliki destinasi unggulan kelas dunia seperti Geopark Lembah Harau (tebing granit & air terjun), Danau Singkarak & Danau Maninjau (danau vulkanik & kuliner ikan bilih), Jam Gadang & Ngarai Sianok di Bukittinggi, Kawasan Wisata Bahari Mandeh (Raja Ampat-nya Ranah Minang), Istano Basa Pagaruyung, dan Kepulauan Mentawai untuk selancar kelas dunia."
  },
  {
    question: "Kapan waktu terbaik untuk berkunjung dan liburan ke Sumatera Barat?",
    answer: "Waktu terbaik adalah sepanjang musim kemarau antara bulan Mei hingga September untuk trekking alam dan wisata bahari pulau. Jika ingin menyaksikan festival budaya terbesar seperti Pacu Jawi dan Tabuik Pariaman, kunjungan disarankan pada bulan Juli hingga September."
  },
  {
    question: "Apa kuliner khas Minangkabau yang wajib dicoba saat berwisata?",
    answer: "Kuliner wajib Minang meliputi Rendang Daging (dinobatkan sebagai makanan terlezat di dunia), Sate Padang & Sate Pariaman, Nasi Kapau Tilatang Kamang dengan Gulai Tambusu, Gulai Itiak Lado Mudo Koto Gadang, Soto Padang renyah, Dendeng Batokok, dan minuman stamina khas Teh Talua."
  },
  {
    question: "Bagaimana cara transportasi dari Bandara Internasional Minangkabau (BIM) ke destinasi wisata?",
    answer: "Dari Bandara Internasional Minangkabau (BIM), wisatawan dapat menggunakan Kereta Bandara Minangkabau Ekspres ke pusat Kota Padang, layanan Bus Damri, taksi argo resmi, atau sewa mobil wisata untuk rute Padang - Padang Panjang - Bukittinggi - Harau."
  },
  {
    question: "Di mana saya bisa mengunduh buku panduan wisata dan peta pariwisata Sumbar 2026?",
    answer: "Anda dapat mengunduh E-Booklet Buku Panduan Wisata Resmi Sumatera Barat 113 Halaman dan Kalender Event 2026 secara gratis dalam format PDF resolusi tinggi langsung di portal https://malala.my.id/unduhan."
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
    "logo": "https://malala.my.id/logo.png",
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
    html = html.replace(/<link rel="canonical".*?\/>/is, canonicalTag);
  } else {
    html = html.replace('</head>', `  ${canonicalTag}\n</head>`);
  }

  // OpenGraph Tags
  const ogImage = options.imageUrl || 'https://malala.my.id/og-image.jpg';
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
  const homeFaqHtml = `
    <header style="display:none;">
      <h1>MALALA — Panduan Wisata Sumatera Barat & Smart Tourism Portal</h1>
      <p>Portal Resmi Eksplorasi 38+ Destinasi Alam, 22+ Tradisi Budaya Minangkabau, 26+ Kuliner Autentik, dan Kalender Event 2026.</p>
    </header>
    <section style="display:none;" aria-label="Tanya Jawab Wisata Sumatera Barat">
      <h2>Tanya Jawab Seputar Pariwisata Sumatera Barat (FAQ)</h2>
      ${FAQS.map(f => `<article><h3>${escapeHtml(f.question)}</h3><p>${escapeHtml(f.answer)}</p></article>`).join('')}
    </section>
  `;

  const optimizedHome = generateHtmlPage(baseTemplate, {
    title: 'Malala - Panduan Wisata Sumatera Barat | Smart Tourism Portal',
    description: 'Portal Pariwisata Cerdas Resmi Sumatera Barat. Jelajahi 38+ destinasi alam, 22+ tradisi budaya Minangkabau, 26+ kuliner autentik, kalender event 2026, dan asisten AI liburan.',
    canonicalUrl: 'https://malala.my.id/',
    jsonLdList: [buildOrganizationJsonLd(), buildWebsiteJsonLd(), buildFaqJsonLd()]
  });
  fs.writeFileSync(indexHtmlPath, optimizedHome, 'utf-8');

  // 2. GENERATE MAIN CATEGORY PAGES
  const categories = [
    {
      route: 'destinasi',
      title: 'Destinasi Wisata Sumatera Barat - Malala',
      description: 'Jelajahi 38+ destinasi alam unggulan: Geopark Lembah Harau, Danau Singkarak, Danau Maninjau, Jam Gadang, Ngarai Sianok, Mandeh, Mentawai, dan Candi Padang Roco.',
      h1: 'Katalog Destinasi Wisata Terbaik Sumatera Barat'
    },
    {
      route: 'kebudayaan',
      title: 'Warisan Budaya Minangkabau - Malala',
      description: 'Pelajari filosofi adat basandi syarak, sistem kekerabatan matrilineal, Rumah Gadang, Tari Piring, Songket Pandai Sikek, dan kearifan lokal Ranah Minang.',
      h1: 'Warisan Adat & Budaya Minangkabau Sumatera Barat'
    },
    {
      route: 'kuliner',
      title: 'Kuliner Autentik Khas Minangkabau - Malala',
      description: 'Daftar makanan terenak khas Minang: Rendang Daging, Sate Padang, Nasi Kapau Gulai Tambusu, Soto Padang, Gulai Itiak Lado Mudo, Dendeng Batokok, dan Teh Talua.',
      h1: 'Eksplorasi Kuliner Autentik Ranah Minang'
    },
    {
      route: 'event',
      title: 'Kalender Event Pariwisata Sumbar 2026 (CoE) - Malala',
      description: 'Jadwal lengkap festival budaya KEN 2026: Pacu Jawi, Festival Tabuik Pariaman, Rang Solok Baralek Gadang, SISC Sawahlunto, dan Payakumbuh Botuang Festival.',
      h1: 'Kalender Event & Festival Budaya Sumatera Barat 2026'
    },
    {
      route: 'oleh-oleh',
      title: 'Pusat Oleh-Oleh & Kerajinan Khas Sumbar - Malala',
      description: 'Rekomendasi suvenir otentik Minangkabau: Songket Silungkang & Pandai Sikek, Mukena Kerancang Bukittinggi, Kaus Minang, dan Keripik Balado.',
      h1: 'Pusat Cenderamata & Kerajinan Khas Sumatera Barat'
    },
    {
      route: 'unduhan',
      title: 'Unduh E-Booklet & Peta Wisata Sumbar 2026 - Malala',
      description: 'Unduh gratis buku panduan wisata resmi 113 halaman dan kalender event 27 halaman format PDF resolusi tinggi.',
      h1: 'Unduh Gratis E-Booklet & Peta Wisata Sumatera Barat 2026'
    },
    {
      route: 'hotinfo',
      title: 'Hot Info & Berita Pariwisata Terkini Sumbar - Malala',
      description: 'Berita dan kabar pariwisata real-time seputar destinasi, event, dan akses liburan di Sumatera Barat.',
      h1: 'Kabar & Berita Pariwisata Terkini Sumatera Barat'
    },
    {
      route: 'peta',
      title: 'Peta Interaktif Wisata Sumatera Barat - Malala',
      description: 'Peta digital interaktif sebaran 38+ destinasi wisata, kuliner, dan event di 19 kabupaten/kota Sumatera Barat.',
      h1: 'Peta Wisata Interaktif Ranah Minang'
    },
    {
      route: 'rencana-liburan',
      title: 'AI Travel Planner - Rencanakan Liburan Sumbar Cerdas | Malala',
      description: 'Susun rencana perjalanan liburan impian ke Sumatera Barat dalam hitungan detik dengan kecerdasan buatan Malala AI.',
      h1: 'AI Itinerary Generator & Travel Planner Sumatera Barat'
    },
    {
      route: 'tanya-mala',
      title: 'Tanya Uni Mala - Asisten Virtual Wisata Sumbar | Malala',
      description: 'Konsultasi wisata 24 jam dengan Uni Mala, pemandu wisata virtual berbasis AI pintar untuk liburan Sumatera Barat.',
      h1: 'Uni Mala — Asisten Wisata Cerdas Minangkabau'
    }
  ];

  categories.forEach(cat => {
    const pageHtml = generateHtmlPage(baseTemplate, {
      title: cat.title,
      description: cat.description,
      canonicalUrl: `https://malala.my.id/${cat.route}`,
      jsonLdList: [
        {
          "@context": "https://schema.org",
          "@type": "WebPage",
          "name": cat.title,
          "description": cat.description,
          "url": `https://malala.my.id/${cat.route}`
        },
        buildFaqJsonLd()
      ],
      bodyContent: `
        <header style="display:none;">
          <h1>${escapeHtml(cat.h1)}</h1>
          <p>${escapeHtml(cat.description)}</p>
        </header>
      `
    });
    writePage(distDir, cat.route, pageHtml);
  });
  console.log(`✅ ${categories.length} Halaman Kategori Utama Berhasil Di-generate.`);

  // 3. GENERATE ALL 38 DESTINATIONS (SSG HTML + JSON-LD)
  let destCount = 0;
  destinations.forEach(dest => {
    const slug = slugify(dest.title);
    if (!slug) return;

    const pageTitle = `${dest.title} - Destinasi Wisata Sumatera Barat | Malala`;
    const pageDesc = dest.description ? dest.description.substring(0, 160) + '...' : `Informasi lengkap mengenai ${dest.title} di ${dest.regency || 'Sumatera Barat'}.`;
    const canonicalUrl = `https://malala.my.id/destinasi/${slug}`;

    const destJsonLd = {
      "@context": "https://schema.org",
      "@type": "TouristDestination",
      "name": dest.title,
      "description": dest.description,
      "image": [dest.imageUrl || "https://malala.my.id/og-image.jpg"],
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

    const bodyContent = `
      <article style="display:none;">
        <h1>${escapeHtml(dest.title)}</h1>
        <p><strong>Kategori:</strong> ${escapeHtml(dest.category || 'Wisata Alam')} | <strong>Lokasi:</strong> ${escapeHtml(dest.regency || 'Sumatera Barat')}</p>
        <p>${escapeHtml(dest.description || '')}</p>
        ${dest.highlights && dest.highlights.length > 0 ? `<ul>${dest.highlights.map((h: string) => `<li>${escapeHtml(h)}</li>`).join('')}</ul>` : ''}
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
  console.log(`✅ ${destCount} Halaman SSG Destinasi Berhasil Dibuat.`);

  // 4. GENERATE ALL 22 CULTURE ITEMS (SSG HTML + JSON-LD)
  let cultCount = 0;
  cultureItems.forEach(cult => {
    const slug = slugify(cult.title);
    if (!slug) return;

    const pageTitle = `${cult.title} - Tradisi Budaya Minangkabau | Malala`;
    const pageDesc = cult.description ? cult.description.substring(0, 160) + '...' : `Kupas tuntas filosofi dan sejarah ${cult.title} khas Minangkabau.`;
    const canonicalUrl = `https://malala.my.id/kebudayaan/${slug}`;

    const cultJsonLd = {
      "@context": "https://schema.org",
      "@type": "Article",
      "headline": cult.title,
      "description": cult.description,
      "image": [cult.imageUrl || "https://malala.my.id/og-image.jpg"],
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

    const bodyContent = `
      <article style="display:none;">
        <h1>${escapeHtml(cult.title)}</h1>
        <p><strong>Falsafah:</strong> ${escapeHtml(cult.philosophy || '')}</p>
        <p>${escapeHtml(cult.description || '')}</p>
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
  console.log(`✅ ${cultCount} Halaman SSG Kebudayaan Berhasil Dibuat.`);

  // 5. GENERATE ALL 26 CULINARY ITEMS (SSG HTML + JSON-LD)
  let culCount = 0;
  culinaryItems.forEach(cul => {
    const slug = slugify(cul.title);
    if (!slug) return;

    const pageTitle = `${cul.title} - Kuliner Khas Minangkabau | Malala`;
    const pageDesc = cul.description ? cul.description.substring(0, 160) + '...' : `Resep dan kelezatan autentik ${cul.title} khas Minang.`;
    const canonicalUrl = `https://malala.my.id/kuliner/${slug}`;

    const culJsonLd = {
      "@context": "https://schema.org",
      "@type": "Recipe",
      "name": cul.title,
      "description": cul.description,
      "image": [cul.imageUrl || "https://malala.my.id/og-image.jpg"],
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

    const bodyContent = `
      <article style="display:none;">
        <h1>${escapeHtml(cul.title)}</h1>
        <p><strong>Profil Rasa:</strong> ${escapeHtml(cul.flavorProfile || '')}</p>
        <p>${escapeHtml(cul.description || '')}</p>
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
  console.log(`✅ ${culCount} Halaman SSG Kuliner Berhasil Dibuat.`);

  // 6. GENERATE ALL 12 EVENT ITEMS (SSG HTML + JSON-LD)
  let evCount = 0;
  eventItems.forEach(ev => {
    const slug = slugify(ev.title);
    if (!slug) return;

    const pageTitle = `${ev.title} - Kalender Event Pariwisata Sumbar 2026 | Malala`;
    const pageDesc = ev.description ? ev.description.substring(0, 160) + '...' : `Jadwal dan lokasi festival ${ev.title} di Sumatera Barat 2026.`;
    const canonicalUrl = `https://malala.my.id/event/${slug}`;

    const evJsonLd = {
      "@context": "https://schema.org",
      "@type": "Event",
      "name": ev.title,
      "description": ev.description,
      "startDate": ev.date || "2026",
      "image": [ev.imageUrl || "https://malala.my.id/og-image.jpg"],
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
        { "@type": "ListItem", "position": 2, "name": "Kalender Event", "item": "https://malala.my.id/event" },
        { "@type": "ListItem", "position": 3, "name": ev.title, "item": canonicalUrl }
      ]
    };

    const bodyContent = `
      <article style="display:none;">
        <h1>${escapeHtml(ev.title)}</h1>
        <p><strong>Jadwal:</strong> ${escapeHtml(ev.date || '')} | <strong>Lokasi:</strong> ${escapeHtml(ev.location || 'Sumatera Barat')}</p>
        <p>${escapeHtml(ev.description || '')}</p>
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
  console.log(`✅ ${evCount} Halaman SSG Event Berhasil Dibuat.`);

  console.log(`🎉 STATIC SITE GENERATION (SSG) SELESAI: ${1 + categories.length + destCount + cultCount + culCount + evCount} Halaman Siap Di-crawl Googlebot!`);
}

// Execute if run directly
generateSsg();
