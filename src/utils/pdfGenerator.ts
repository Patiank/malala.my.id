import { Destination, CultureItem, CulinaryItem, EventItem } from '../types';
import { DESTINATIONS, CULTURE_ITEMS, CULINARY_ITEMS, EVENTS_SCHEDULE } from '../data/content';

interface BookletData {
  destinations?: Destination[];
  cultureItems?: CultureItem[];
  culinaryItems?: CulinaryItem[];
  eventItems?: EventItem[];
  lang?: 'id' | 'en';
}

/**
 * Opens a dedicated, high-fidelity printable document window identical to the website's modal preview layout
 */
export function openPrintableBookletWindow(data: BookletData = {}): void {
  const isEn = data.lang === 'en';

  const destinations: Destination[] = (data.destinations && data.destinations.length > 0) ? data.destinations : DESTINATIONS;
  const cultureItems: CultureItem[] = (data.cultureItems && data.cultureItems.length > 0) ? data.cultureItems : CULTURE_ITEMS;
  const culinaryItems: CulinaryItem[] = (data.culinaryItems && data.culinaryItems.length > 0) ? data.culinaryItems : CULINARY_ITEMS;
  const eventItems: EventItem[] = (data.eventItems && data.eventItems.length > 0) ? data.eventItems : EVENTS_SCHEDULE;

  const printWindow = window.open('', '_blank');
  if (!printWindow) {
    alert(isEn ? 'Please allow pop-ups in your browser to view and download the PDF.' : 'Silakan izinkan pop-up di browser Anda untuk melihat dan mengunduh PDF.');
    return;
  }

  const htmlContent = `
<!DOCTYPE html>
<html lang="${isEn ? 'en' : 'id'}">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${isEn ? 'West Sumatra Official Tourism & Culture Guide 2026 - MALALA' : 'Buku Panduan Resmi Pariwisata & Budaya Sumbar 2026 - MALALA'}</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Orbitron:wght@700;900&family=Plus+Jakarta+Sans:ital,wght@0,400;0,500;0,600;0,700;0,800;1,400;1,600&display=swap" rel="stylesheet">
  <style>
    @page {
      size: auto;
      margin: 10mm 12mm;
    }
    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }
    body {
      font-family: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      color: #1e293b;
      background: #f8fafc;
      line-height: 1.6;
      -webkit-print-color-adjust: exact;
      print-color-adjust: exact;
      padding-bottom: 40px;
    }
    .print-actions {
      position: sticky;
      top: 0;
      z-index: 999;
      background: #0f172a;
      color: #ffffff;
      padding: 14px 20px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      box-shadow: 0 4px 20px rgba(0,0,0,0.25);
      border-bottom: 2px solid #dc2626;
    }
    .print-actions button {
      background: #dc2626;
      color: #ffffff;
      border: none;
      padding: 10px 20px;
      font-size: 13px;
      font-weight: 700;
      text-transform: uppercase;
      border-radius: 8px;
      cursor: pointer;
      font-family: inherit;
      transition: background 0.2s;
    }
    .print-actions button:hover {
      background: #b91c1c;
    }
    .book-container {
      max-width: 820px;
      margin: 20px auto;
      padding: 0 15px;
    }
    .catalog-card {
      background: #ffffff;
      border: 1px solid #e2e8f0;
      border-radius: 16px;
      padding: 24px;
      margin-bottom: 28px;
      box-shadow: 0 4px 15px rgba(0,0,0,0.04);
      page-break-inside: avoid;
      break-inside: avoid;
    }
    .cover-card {
      background: #0f172a;
      color: #ffffff;
      border-radius: 16px;
      padding: 40px 30px;
      margin-bottom: 28px;
      border: 2px solid #334155;
      page-break-after: always;
      break-after: page;
    }
    .hero-img-wrap {
      width: 100%;
      height: 280px;
      border-radius: 12px;
      overflow: hidden;
      position: relative;
      background: #1e293b;
      margin: 14px 0 16px 0;
    }
    .hero-img-wrap img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      display: block;
    }
    .badge {
      display: inline-block;
      font-size: 10px;
      font-weight: 800;
      text-transform: uppercase;
      padding: 4px 10px;
      border-radius: 6px;
      letter-spacing: 0.05em;
    }
    .badge-red { background: #dc2626; color: #ffffff; }
    .badge-amber { background: #d97706; color: #ffffff; }
    .badge-rose { background: #e11d48; color: #ffffff; }
    .badge-dark { background: #0f172a; color: #ffffff; }
    .title {
      font-family: 'Orbitron', sans-serif;
      font-size: 20px;
      font-weight: 800;
      text-transform: uppercase;
      color: #0f172a;
      letter-spacing: 0.03em;
      margin-top: 4px;
    }
    .subtitle {
      font-size: 12px;
      font-weight: 700;
      color: #dc2626;
      display: flex;
      align-items: center;
      gap: 4px;
      margin-top: 2px;
      margin-bottom: 12px;
    }
    .desc-text {
      font-size: 12.5px;
      color: #475569;
      line-height: 1.7;
      margin-bottom: 14px;
      border-top: 1px solid #f1f5f9;
      padding-top: 12px;
    }
    .desc-text p {
      margin-bottom: 10px;
    }
    .box-info {
      background: #f8fafc;
      border: 1px solid #e2e8f0;
      border-radius: 10px;
      padding: 12px 16px;
      margin-top: 12px;
      font-size: 11.5px;
    }
    .box-info h4 {
      font-size: 11px;
      font-weight: 800;
      text-transform: uppercase;
      color: #0f172a;
      margin-bottom: 6px;
      letter-spacing: 0.05em;
    }
    .box-info ul {
      list-style: none;
    }
    .box-info li {
      padding: 2px 0;
      color: #334155;
    }
    .box-info li::before {
      content: "✓ ";
      color: #16a34a;
      font-weight: bold;
    }
    .footer-row {
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-top: 1px solid #f1f5f9;
      padding-top: 10px;
      margin-top: 14px;
      font-size: 11px;
      color: #64748b;
    }
    @media print {
      body {
        background: #ffffff;
        padding-bottom: 0;
      }
      .print-actions {
        display: none !important;
      }
      .book-container {
        max-width: 100%;
        margin: 0;
        padding: 0;
      }
      .catalog-card {
        border: 1px solid #cbd5e1;
        box-shadow: none;
        margin-bottom: 20px;
        page-break-inside: avoid;
        break-inside: avoid;
      }
      .cover-card {
        border: none;
        box-shadow: none;
      }
    }
  </style>
</head>
<body>

  <!-- Top Action Bar -->
  <div class="print-actions">
    <div>
      <strong style="font-family: 'Orbitron', sans-serif; font-size: 14px;">MALALA 2026</strong>
      <span style="font-size: 12px; opacity: 0.8; margin-left: 8px;">${isEn ? 'Official E-Booklet & Travel Guide' : 'Buku Panduan Resmi Pariwisata & Budaya Sumbar'}</span>
    </div>
    <div style="display: flex; gap: 10px;">
      <button onclick="window.print()">🖨️ ${isEn ? 'Save as PDF / Print' : 'Simpan sebagai PDF / Cetak'}</button>
      <button onclick="window.close()" style="background: #334155;">✖ ${isEn ? 'Close' : 'Tutup'}</button>
    </div>
  </div>

  <div class="book-container">

    <!-- ========================================== -->
    <!-- COVER PAGE                                 -->
    <!-- ========================================== -->
    <div class="cover-card">
      <div style="margin-bottom: 20px;">
        <span class="badge badge-red">${isEn ? 'OFFICIAL PUBLICATION 2026' : 'PUBLIKASI RESMI DINAS PARIWISATA PROVINSI SUMATERA BARAT'}</span>
      </div>
      <h1 style="font-family: 'Orbitron', sans-serif; font-size: 38px; font-weight: 900; letter-spacing: 0.05em; margin-bottom: 4px;">
        MALALA 2026
      </h1>
      <h2 style="font-family: 'Orbitron', sans-serif; font-size: 18px; color: #ef4444; margin-bottom: 16px;">
        ${isEn ? 'WEST SUMATRA TRAVEL & CULTURAL MASTER GUIDE' : 'PANDUAN LENGKAP WISATA & BUDAYA RANAH MINANG'}
      </h2>
      <p style="font-size: 13px; color: #cbd5e1; max-width: 600px; line-height: 1.7; margin-bottom: 24px;">
        ${isEn 
          ? 'Comprehensive compilation of 26 curated destinations, 14 living cultural traditions, 16 authentic gastronomic dishes, and 20 major 2026 events & KEN calendar.' 
          : 'Kompilasi master data 26 destinasi wisata unggulan, 14 tradisi adat luhur, 16 kuliner gastronomi otentik, serta 20 kalender festival KEN resmi 2026.'}
      </p>

      <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 10px; background: rgba(30, 41, 59, 0.8); padding: 14px; border-radius: 10px; border: 1px solid #334155; margin-bottom: 24px;">
        <div>
          <span style="font-size: 10px; color: #94a3b8; display: block;">${isEn ? 'Destinations' : 'Destinasi'}</span>
          <strong style="font-size: 18px; color: #ffffff;">26 Objek</strong>
        </div>
        <div>
          <span style="font-size: 10px; color: #94a3b8; display: block;">${isEn ? 'Culture' : 'Kebudayaan'}</span>
          <strong style="font-size: 18px; color: #fbbf24;">14 Tradisi</strong>
        </div>
        <div>
          <span style="font-size: 10px; color: #94a3b8; display: block;">${isEn ? 'Culinary' : 'Kuliner'}</span>
          <strong style="font-size: 18px; color: #fb7185;">16 Makanan</strong>
        </div>
        <div>
          <span style="font-size: 10px; color: #94a3b8; display: block;">${isEn ? 'Events' : 'Kalender Event'}</span>
          <strong style="font-size: 18px; color: #f87171;">20 Festival</strong>
        </div>
      </div>

      <div style="border-left: 4px solid #dc2626; padding-left: 12px; font-style: italic; color: #fde68a; font-size: 12px; margin-bottom: 24px;">
        "Adat Basandi Syarak, Syarak Basandi Kitabullah" • "Alam Takambang Jadi Guru"
      </div>

      <div style="border-top: 1px solid #334155; padding-top: 14px; display: flex; justify-content: space-between; font-size: 11px; color: #94a3b8;">
        <span>Dinas Pariwisata Provinsi Sumatera Barat • 2026</span>
        <span style="color: #ffffff; font-weight: bold;">https://malala.my.id</span>
      </div>
    </div>

    <!-- ========================================== -->
    <!-- BAB I: 26 DESTINASI WISATA                 -->
    <!-- ========================================== -->
    <h2 style="font-family: 'Orbitron', sans-serif; font-size: 16px; color: #0f172a; margin: 30px 0 15px 0; text-transform: uppercase; border-bottom: 2px solid #dc2626; padding-bottom: 6px;">
      ${isEn ? 'Chapter I: 26 Tourism Destinations' : 'Bab I: 26 Destinasi Wisata Pilihan'}
    </h2>

    ${destinations.map((dest, idx) => {
      const title = isEn && dest.titleEn ? dest.titleEn : dest.title;
      const category = isEn && dest.categoryEn ? dest.categoryEn : dest.category;
      const location = isEn && dest.locationDetailsEn ? dest.locationDetailsEn : (dest.locationDetails || dest.regency);
      const desc = isEn && dest.descriptionEn ? dest.descriptionEn : dest.description;
      const highlights = (isEn && dest.highlightsEn ? dest.highlightsEn : dest.highlights) || [];
      const bestTime = isEn && dest.bestTimeEn ? dest.bestTimeEn : dest.bestTime;

      return `
      <div class="catalog-card">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
          <span class="badge badge-dark">#${idx + 1} • ${dest.regency || 'Sumatera Barat'}</span>
          <span class="badge badge-red">${category}</span>
        </div>

        <div class="hero-img-wrap">
          <img src="${dest.imageUrl}" alt="${title}" onerror="this.style.display='none'">
        </div>

        <div class="title">${title}</div>
        <div class="subtitle">📍 ${location}</div>

        <div class="desc-text">
          ${desc.split('\n\n').map(p => `<p>${p}</p>`).join('')}
        </div>

        ${highlights.length > 0 ? `
        <div class="box-info">
          <h4>${isEn ? 'Key Highlights:' : 'Daya Tarik Utama (Highlights):'}</h4>
          <ul>
            ${highlights.map(h => `<li>${h}</li>`).join('')}
          </ul>
        </div>` : ''}

        ${bestTime ? `
        <div class="footer-row">
          <span>⏰ ${isEn ? 'Best Time to Visit:' : 'Waktu Terbaik Berkunjung:'} <strong>${bestTime}</strong></span>
          <span>Dinas Pariwisata Sumbar</span>
        </div>` : ''}
      </div>
      `;
    }).join('')}

    <!-- ========================================== -->
    <!-- BAB II: 14 WARISAN BUDAYA                  -->
    <!-- ========================================== -->
    <h2 style="font-family: 'Orbitron', sans-serif; font-size: 16px; color: #0f172a; margin: 30px 0 15px 0; text-transform: uppercase; border-bottom: 2px solid #d97706; padding-bottom: 6px;">
      ${isEn ? 'Chapter II: 14 Sacred Cultural Traditions' : 'Bab II: 14 Warisan Budaya & Tradisi Adat'}
    </h2>

    ${cultureItems.map((cult, idx) => {
      const title = isEn && cult.titleEn ? cult.titleEn : cult.title;
      const category = isEn && cult.categoryEn ? cult.categoryEn : cult.category;
      const origin = isEn && cult.originEn ? cult.originEn : cult.origin;
      const desc = isEn && cult.descriptionEn ? cult.descriptionEn : cult.description;
      const philosophy = isEn && cult.philosophyEn ? cult.philosophyEn : cult.philosophy;

      return `
      <div class="catalog-card">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
          <span class="badge badge-dark">#${destinations.length + idx + 1} • WARISAN ADAT</span>
          <span class="badge badge-amber">${category}</span>
        </div>

        <div class="hero-img-wrap">
          <img src="${cult.imageUrl}" alt="${title}" onerror="this.style.display='none'">
        </div>

        <div class="title" style="color: #78350f;">${title}</div>
        <div class="subtitle" style="color: #b45309;">🏛️ ${isEn ? 'Origin:' : 'Asal Nagari / Tradisi:'} ${origin}</div>

        <div class="desc-text">
          ${desc.split('\n\n').map(p => `<p>${p}</p>`).join('')}
        </div>

        ${philosophy ? `
        <div class="box-info" style="background: #fefce8; border-color: #fde68a;">
          <h4 style="color: #92400e;">${isEn ? 'Minangkabau Customary Philosophy:' : 'Falsafah & Makna Adat Minangkabau:'}</h4>
          <p style="font-style: italic; font-weight: bold; color: #78350f;">"${philosophy}"</p>
        </div>` : ''}

        <div class="footer-row">
          <span>Kebudayaan & Adat Minangkabau</span>
          <span>Dinas Pariwisata Sumbar</span>
        </div>
      </div>
      `;
    }).join('')}

    <!-- ========================================== -->
    <!-- BAB III: 16 KULINER OTENTIK                -->
    <!-- ========================================== -->
    <h2 style="font-family: 'Orbitron', sans-serif; font-size: 16px; color: #0f172a; margin: 30px 0 15px 0; text-transform: uppercase; border-bottom: 2px solid #e11d48; padding-bottom: 6px;">
      ${isEn ? 'Chapter III: 16 Authentic Culinaries' : 'Bab III: 16 Kuliner Otentik Ranah Minang'}
    </h2>

    ${culinaryItems.map((cul, idx) => {
      const title = isEn && cul.titleEn ? cul.titleEn : cul.title;
      const category = isEn && cul.categoryEn ? cul.categoryEn : cul.category;
      const origin = isEn && cul.originEn ? cul.originEn : cul.origin;
      const desc = isEn && cul.descriptionEn ? cul.descriptionEn : cul.description;
      const ingredients = (isEn && cul.mainIngredientsEn ? cul.mainIngredientsEn : cul.mainIngredients) || [];
      const taste = isEn && cul.tasteProfileEn ? cul.tasteProfileEn : cul.tasteProfile;

      return `
      <div class="catalog-card">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
          <span class="badge badge-dark">#${destinations.length + cultureItems.length + idx + 1} • GASTRONOMI</span>
          <span class="badge badge-rose">${category}</span>
        </div>

        <div class="hero-img-wrap">
          <img src="${cul.imageUrl}" alt="${title}" onerror="this.style.display='none'">
        </div>

        <div class="title" style="color: #9f1239;">${title}</div>
        <div class="subtitle" style="color: #e11d48;">🍲 ${isEn ? 'Heritage Origin:' : 'Asal Kuliner:'} ${origin}</div>

        <div class="desc-text">
          ${desc.split('\n\n').map(p => `<p>${p}</p>`).join('')}
        </div>

        <div class="box-info" style="background: #fff1f2; border-color: #fecdd3;">
          <h4 style="color: #9f1239;">🥘 ${isEn ? 'Spices & Ingredients:' : 'Bahan & Rempah Utama:'}</h4>
          <p style="color: #4c1d2e; font-weight: 500; margin-bottom: 4px;">${ingredients.join(', ')}</p>
          ${taste ? `<p style="color: #9f1239; font-weight: bold;">👅 ${isEn ? 'Taste Profile:' : 'Karakter Rasa:'} ${taste}</p>` : ''}
        </div>

        <div class="footer-row">
          <span>Warisan Kuliner Dunia UNESCO</span>
          <span>Dinas Pariwisata Sumbar</span>
        </div>
      </div>
      `;
    }).join('')}

    <!-- ========================================== -->
    <!-- BAB IV: 20 KALENDER EVENT & KEN 2026       -->
    <!-- ========================================== -->
    <h2 style="font-family: 'Orbitron', sans-serif; font-size: 16px; color: #0f172a; margin: 30px 0 15px 0; text-transform: uppercase; border-bottom: 2px solid #0f172a; padding-bottom: 6px;">
      ${isEn ? 'Chapter IV: Official Calendar of Events (CoE) 2026' : 'Bab IV: Kalender Event Resmi (CoE) & KEN 2026'}
    </h2>

    ${eventItems.map((ev, idx) => {
      const title = isEn && ev.titleEn ? ev.titleEn : ev.title;
      const schedule = isEn && ev.scheduleEn ? ev.scheduleEn : ev.schedule;
      const location = isEn && ev.locationEn ? ev.locationEn : ev.location;
      const desc = isEn && ev.descriptionEn ? ev.descriptionEn : ev.description;

      return `
      <div class="catalog-card">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
          <span class="badge badge-dark">#${destinations.length + cultureItems.length + culinaryItems.length + idx + 1} • EVENT</span>
          <span class="badge ${ev.isKen ? 'badge-red' : 'badge-dark'}">${ev.isKen ? '⭐ OFFICIAL KEN 2026' : 'FESTIVAL RESMI'}</span>
        </div>

        <div class="hero-img-wrap">
          <img src="${ev.imageUrl}" alt="${title}" onerror="this.style.display='none'">
        </div>

        <div class="title">${title}</div>
        <div class="subtitle" style="color: #334155;">📅 ${schedule}  •  📍 ${location}</div>

        <div class="desc-text">
          ${desc.split('\n\n').map(p => `<p>${p}</p>`).join('')}
        </div>

        ${ev.isKen ? `
        <div class="box-info" style="background: #fef2f2; border-color: #fecaca;">
          <h4 style="color: #b91c1c;">⭐ Karisma Event Nusantara (KEN) Kemenparekraf RI</h4>
          <p style="color: #991b1b;">Event unggulan terkurasi resmi oleh Kementerian Pariwisata dan Ekonomi Kreatif Republik Indonesia.</p>
        </div>` : ''}

        <div class="footer-row">
          <span>Calendar of Events 2026</span>
          <span>Dinas Pariwisata Sumbar</span>
        </div>
      </div>
      `;
    }).join('')}

    <!-- ========================================== -->
    <!-- BACK COVER                                 -->
    <!-- ========================================== -->
    <div class="cover-card" style="page-break-before: always; break-before: page; text-align: center;">
      <h2 style="font-family: 'Orbitron', sans-serif; font-size: 26px; font-weight: 900; margin-bottom: 8px;">
        ${isEn ? 'EXPERIENCE WEST SUMATRA' : 'JELAJAHI RANAH MINANG'}
      </h2>
      <p style="color: #cbd5e1; font-size: 13px; margin-bottom: 24px;">
        ${isEn ? 'Taste the Heritage, Feel the Culture, Embrace the Nature.' : 'Rasakan Warisan, Hayati Kebudayaan, Rengkuh Pesona Alam Nan Megah.'}
      </p>

      <div style="background: #1e293b; padding: 20px; border-radius: 12px; border: 1px solid #334155; max-width: 500px; margin: 0 auto 24px auto; font-size: 12px; line-height: 1.8;">
        <strong style="color: #fbbf24; font-size: 13px; display: block; margin-bottom: 6px;">${isEn ? 'OFFICIAL CONTACT & INFORMATION' : 'KONTAK & INFORMASI RESMI'}</strong>
        <div>Dinas Pariwisata Provinsi Sumatera Barat</div>
        <div>Jl. Khatib Sulaiman No. 22, Padang, Sumatera Barat</div>
        <div>Email: info@pariwisata.sumbarprov.go.id</div>
        <div>Platform Resmi: <strong style="color: #ffffff;">https://malala.my.id</strong></div>
        <div>Hotline: +62 751 7055183</div>
      </div>

      <p style="font-size: 11px; color: #94a3b8; font-style: italic;">
        © 2026 Malala Official • Hak Cipta Dilindungi
      </p>
    </div>

  </div>

  <script>
    // Auto-prompt print dialog after content and images load
    window.addEventListener('load', () => {
      setTimeout(() => {
        window.print();
      }, 800);
    });
  </script>
</body>
</html>
  `;

  printWindow.document.open();
  printWindow.document.write(htmlContent);
  printWindow.document.close();
}

/**
 * Backward-compatible wrapper
 */
export async function generateSumbarBookletPDF(data: BookletData = {}): Promise<void> {
  openPrintableBookletWindow(data);
}
