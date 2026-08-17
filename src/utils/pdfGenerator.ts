// @ts-ignore
import html2pdf from 'html2pdf.js';
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
 * Builds full HTML markup identical to the website's preview cards
 */
function buildHtmlBookletMarkup(data: BookletData, isEn: boolean): string {
  const destinations: Destination[] = (data.destinations && data.destinations.length > 0) ? data.destinations : DESTINATIONS;
  const cultureItems: CultureItem[] = (data.cultureItems && data.cultureItems.length > 0) ? data.cultureItems : CULTURE_ITEMS;
  const culinaryItems: CulinaryItem[] = (data.culinaryItems && data.culinaryItems.length > 0) ? data.culinaryItems : CULINARY_ITEMS;
  const eventItems: EventItem[] = (data.eventItems && data.eventItems.length > 0) ? data.eventItems : EVENTS_SCHEDULE;

  return `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #1e293b; background: #ffffff; padding: 20px; line-height: 1.6;">
      
      <!-- COVER -->
      <div style="background: #0f172a; color: #ffffff; border-radius: 16px; padding: 36px 28px; margin-bottom: 28px; border: 2px solid #334155; page-break-after: always;">
        <span style="display: inline-block; background: #dc2626; color: #ffffff; font-size: 10px; font-weight: 800; text-transform: uppercase; padding: 4px 10px; border-radius: 6px; margin-bottom: 16px;">
          ${isEn ? 'OFFICIAL PUBLICATION 2026' : 'PUBLIKASI RESMI DINAS PARIWISATA PROVINSI SUMATERA BARAT'}
        </span>
        <h1 style="font-size: 36px; font-weight: 900; letter-spacing: 0.05em; margin-bottom: 4px;">
          MALALA 2026
        </h1>
        <h2 style="font-size: 18px; color: #ef4444; margin-bottom: 16px;">
          ${isEn ? 'WEST SUMATRA TRAVEL & CULTURAL MASTER GUIDE' : 'PANDUAN LENGKAP WISATA & BUDAYA RANAH MINANG'}
        </h2>
        <p style="font-size: 12.5px; color: #cbd5e1; max-width: 600px; line-height: 1.7; margin-bottom: 24px;">
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

        <div style="border-left: 4px solid #dc2626; padding-left: 12px; font-style: italic; color: #fde68a; font-size: 11.5px; margin-bottom: 20px;">
          "Adat Basandi Syarak, Syarak Basandi Kitabullah" • "Alam Takambang Jadi Guru"
        </div>

        <div style="border-top: 1px solid #334155; padding-top: 12px; display: flex; justify-content: space-between; font-size: 10.5px; color: #94a3b8;">
          <span>Dinas Pariwisata Provinsi Sumatera Barat • 2026</span>
          <span style="color: #ffffff; font-weight: bold;">https://malala.my.id</span>
        </div>
      </div>

      <!-- BAB I: DESTINASI -->
      <h2 style="font-size: 16px; font-weight: 800; color: #0f172a; margin: 30px 0 15px 0; text-transform: uppercase; border-bottom: 2px solid #dc2626; padding-bottom: 6px;">
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
        <div style="background: #ffffff; border: 1px solid #e2e8f0; border-radius: 14px; padding: 22px; margin-bottom: 24px; box-shadow: 0 2px 10px rgba(0,0,0,0.03); page-break-inside: avoid;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
            <span style="background: #0f172a; color: #ffffff; font-size: 9.5px; font-weight: 800; text-transform: uppercase; padding: 3px 8px; border-radius: 5px;">#${idx + 1} • ${dest.regency || 'Sumatera Barat'}</span>
            <span style="background: #dc2626; color: #ffffff; font-size: 9.5px; font-weight: 800; text-transform: uppercase; padding: 3px 8px; border-radius: 5px;">${category}</span>
          </div>

          <div style="width: 100%; height: 260px; border-radius: 10px; overflow: hidden; position: relative; background: #1e293b; margin: 12px 0 14px 0;">
            <img src="${dest.imageUrl}" alt="${title}" style="width: 100%; height: 100%; object-fit: cover; display: block;" onerror="this.style.display='none'">
          </div>

          <h3 style="font-size: 18px; font-weight: 800; text-transform: uppercase; color: #0f172a; margin-top: 2px;">${title}</h3>
          <div style="font-size: 11.5px; font-weight: 700; color: #dc2626; margin: 2px 0 10px 0;">📍 ${location}</div>

          <div style="font-size: 12px; color: #475569; line-height: 1.65; border-top: 1px solid #f1f5f9; padding-top: 10px; margin-bottom: 12px;">
            ${desc.split('\n\n').map(p => `<p style="margin-bottom: 8px;">${p}</p>`).join('')}
          </div>

          ${highlights.length > 0 ? `
          <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 10px 14px; margin-top: 10px; font-size: 11px;">
            <h4 style="font-size: 10.5px; font-weight: 800; text-transform: uppercase; color: #0f172a; margin-bottom: 4px;">${isEn ? 'Key Highlights:' : 'Daya Tarik Utama (Highlights):'}</h4>
            <ul style="list-style: none; padding: 0;">
              ${highlights.map(h => `<li style="padding: 2px 0; color: #334155;">✓ ${h}</li>`).join('')}
            </ul>
          </div>` : ''}

          ${bestTime ? `
          <div style="display: flex; justify-content: space-between; border-top: 1px solid #f1f5f9; padding-top: 8px; margin-top: 12px; font-size: 10.5px; color: #64748b;">
            <span>⏰ ${isEn ? 'Best Time to Visit:' : 'Waktu Terbaik Berkunjung:'} <strong style="color: #0f172a;">${bestTime}</strong></span>
            <span>Dinas Pariwisata Sumbar</span>
          </div>` : ''}
        </div>
        `;
      }).join('')}

      <!-- BAB II: BUDAYA -->
      <h2 style="font-size: 16px; font-weight: 800; color: #0f172a; margin: 30px 0 15px 0; text-transform: uppercase; border-bottom: 2px solid #d97706; padding-bottom: 6px;">
        ${isEn ? 'Chapter II: 14 Sacred Cultural Traditions' : 'Bab II: 14 Warisan Budaya & Tradisi Adat'}
      </h2>

      ${cultureItems.map((cult, idx) => {
        const title = isEn && cult.titleEn ? cult.titleEn : cult.title;
        const category = isEn && cult.categoryEn ? cult.categoryEn : cult.category;
        const origin = isEn && cult.originEn ? cult.originEn : cult.origin;
        const desc = isEn && cult.descriptionEn ? cult.descriptionEn : cult.description;
        const philosophy = isEn && cult.philosophyEn ? cult.philosophyEn : cult.philosophy;

        return `
        <div style="background: #ffffff; border: 1px solid #fef3c7; border-radius: 14px; padding: 22px; margin-bottom: 24px; box-shadow: 0 2px 10px rgba(0,0,0,0.03); page-break-inside: avoid;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
            <span style="background: #0f172a; color: #ffffff; font-size: 9.5px; font-weight: 800; text-transform: uppercase; padding: 3px 8px; border-radius: 5px;">#${destinations.length + idx + 1} • WARISAN ADAT</span>
            <span style="background: #d97706; color: #ffffff; font-size: 9.5px; font-weight: 800; text-transform: uppercase; padding: 3px 8px; border-radius: 5px;">${category}</span>
          </div>

          <div style="width: 100%; height: 260px; border-radius: 10px; overflow: hidden; position: relative; background: #451a03; margin: 12px 0 14px 0;">
            <img src="${cult.imageUrl}" alt="${title}" style="width: 100%; height: 100%; object-fit: cover; display: block;" onerror="this.style.display='none'">
          </div>

          <h3 style="font-size: 18px; font-weight: 800; text-transform: uppercase; color: #78350f; margin-top: 2px;">${title}</h3>
          <div style="font-size: 11.5px; font-weight: 700; color: #b45309; margin: 2px 0 10px 0;">🏛️ ${isEn ? 'Origin:' : 'Asal Nagari / Tradisi:'} ${origin}</div>

          <div style="font-size: 12px; color: #475569; line-height: 1.65; border-top: 1px solid #fef3c7; padding-top: 10px; margin-bottom: 12px;">
            ${desc.split('\n\n').map(p => `<p style="margin-bottom: 8px;">${p}</p>`).join('')}
          </div>

          ${philosophy ? `
          <div style="background: #fefce8; border: 1px solid #fde68a; border-radius: 8px; padding: 10px 14px; margin-top: 10px; font-size: 11px;">
            <h4 style="font-size: 10.5px; font-weight: 800; text-transform: uppercase; color: #92400e; margin-bottom: 4px;">${isEn ? 'Minangkabau Customary Philosophy:' : 'Falsafah & Makna Adat Minangkabau:'}</h4>
            <p style="font-style: italic; font-weight: bold; color: #78350f;">"${philosophy}"</p>
          </div>` : ''}

          <div style="display: flex; justify-content: space-between; border-top: 1px solid #fef3c7; padding-top: 8px; margin-top: 12px; font-size: 10.5px; color: #64748b;">
            <span>Kebudayaan & Adat Minangkabau</span>
            <span>Dinas Pariwisata Sumbar</span>
          </div>
        </div>
        `;
      }).join('')}

      <!-- BAB III: KULINER -->
      <h2 style="font-size: 16px; font-weight: 800; color: #0f172a; margin: 30px 0 15px 0; text-transform: uppercase; border-bottom: 2px solid #e11d48; padding-bottom: 6px;">
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
        <div style="background: #ffffff; border: 1px solid #ffe4e6; border-radius: 14px; padding: 22px; margin-bottom: 24px; box-shadow: 0 2px 10px rgba(0,0,0,0.03); page-break-inside: avoid;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
            <span style="background: #0f172a; color: #ffffff; font-size: 9.5px; font-weight: 800; text-transform: uppercase; padding: 3px 8px; border-radius: 5px;">#${destinations.length + cultureItems.length + idx + 1} • GASTRONOMI</span>
            <span style="background: #e11d48; color: #ffffff; font-size: 9.5px; font-weight: 800; text-transform: uppercase; padding: 3px 8px; border-radius: 5px;">${category}</span>
          </div>

          <div style="width: 100%; height: 260px; border-radius: 10px; overflow: hidden; position: relative; background: #4c0519; margin: 12px 0 14px 0;">
            <img src="${cul.imageUrl}" alt="${title}" style="width: 100%; height: 100%; object-fit: cover; display: block;" onerror="this.style.display='none'">
          </div>

          <h3 style="font-size: 18px; font-weight: 800; text-transform: uppercase; color: #9f1239; margin-top: 2px;">${title}</h3>
          <div style="font-size: 11.5px; font-weight: 700; color: #e11d48; margin: 2px 0 10px 0;">🍲 ${isEn ? 'Heritage Origin:' : 'Asal Kuliner:'} ${origin}</div>

          <div style="font-size: 12px; color: #475569; line-height: 1.65; border-top: 1px solid #ffe4e6; padding-top: 10px; margin-bottom: 12px;">
            ${desc.split('\n\n').map(p => `<p style="margin-bottom: 8px;">${p}</p>`).join('')}
          </div>

          <div style="background: #fff1f2; border: 1px solid #fecdd3; border-radius: 8px; padding: 10px 14px; margin-top: 10px; font-size: 11px;">
            <h4 style="font-size: 10.5px; font-weight: 800; text-transform: uppercase; color: #9f1239; margin-bottom: 4px;">🥘 ${isEn ? 'Spices & Ingredients:' : 'Bahan & Rempah Utama:'}</h4>
            <p style="color: #4c1d2e; font-weight: 500; margin-bottom: 3px;">${ingredients.join(', ')}</p>
            ${taste ? `<p style="color: #9f1239; font-weight: bold;">👅 ${isEn ? 'Taste Profile:' : 'Karakter Rasa:'} ${taste}</p>` : ''}
          </div>

          <div style="display: flex; justify-content: space-between; border-top: 1px solid #ffe4e6; padding-top: 8px; margin-top: 12px; font-size: 10.5px; color: #64748b;">
            <span>Warisan Kuliner Dunia UNESCO</span>
            <span>Dinas Pariwisata Sumbar</span>
          </div>
        </div>
        `;
      }).join('')}

      <!-- BAB IV: EVENTS -->
      <h2 style="font-size: 16px; font-weight: 800; color: #0f172a; margin: 30px 0 15px 0; text-transform: uppercase; border-bottom: 2px solid #0f172a; padding-bottom: 6px;">
        ${isEn ? 'Chapter IV: Official Calendar of Events (CoE) 2026' : 'Bab IV: Kalender Event Resmi (CoE) & KEN 2026'}
      </h2>

      ${eventItems.map((ev, idx) => {
        const title = isEn && ev.titleEn ? ev.titleEn : ev.title;
        const schedule = isEn && ev.scheduleEn ? ev.scheduleEn : ev.schedule;
        const location = isEn && ev.locationEn ? ev.locationEn : ev.location;
        const desc = isEn && ev.descriptionEn ? ev.descriptionEn : ev.description;

        return `
        <div style="background: #ffffff; border: 1px solid #e2e8f0; border-radius: 14px; padding: 22px; margin-bottom: 24px; box-shadow: 0 2px 10px rgba(0,0,0,0.03); page-break-inside: avoid;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
            <span style="background: #0f172a; color: #ffffff; font-size: 9.5px; font-weight: 800; text-transform: uppercase; padding: 3px 8px; border-radius: 5px;">#${destinations.length + cultureItems.length + culinaryItems.length + idx + 1} • EVENT</span>
            <span style="background: ${ev.isKen ? '#dc2626' : '#0f172a'}; color: #ffffff; font-size: 9.5px; font-weight: 800; text-transform: uppercase; padding: 3px 8px; border-radius: 5px;">${ev.isKen ? '⭐ OFFICIAL KEN 2026' : 'FESTIVAL RESMI'}</span>
          </div>

          <div style="width: 100%; height: 260px; border-radius: 10px; overflow: hidden; position: relative; background: #0f172a; margin: 12px 0 14px 0;">
            <img src="${ev.imageUrl}" alt="${title}" style="width: 100%; height: 100%; object-fit: cover; display: block;" onerror="this.style.display='none'">
          </div>

          <h3 style="font-size: 18px; font-weight: 800; text-transform: uppercase; color: #0f172a; margin-top: 2px;">${title}</h3>
          <div style="font-size: 11.5px; font-weight: 700; color: #334155; margin: 2px 0 10px 0;">📅 ${schedule}  •  📍 ${location}</div>

          <div style="font-size: 12px; color: #475569; line-height: 1.65; border-top: 1px solid #f1f5f9; padding-top: 10px; margin-bottom: 12px;">
            ${desc.split('\n\n').map(p => `<p style="margin-bottom: 8px;">${p}</p>`).join('')}
          </div>

          ${ev.isKen ? `
          <div style="background: #fef2f2; border: 1px solid #fecaca; border-radius: 8px; padding: 10px 14px; margin-top: 10px; font-size: 11px;">
            <h4 style="font-size: 10.5px; font-weight: 800; text-transform: uppercase; color: #b91c1c; margin-bottom: 4px;">⭐ Karisma Event Nusantara (KEN) Kemenparekraf RI</h4>
            <p style="color: #991b1b;">Event unggulan terkurasi resmi oleh Kementerian Pariwisata dan Ekonomi Kreatif Republik Indonesia.</p>
          </div>` : ''}

          <div style="display: flex; justify-content: space-between; border-top: 1px solid #f1f5f9; padding-top: 8px; margin-top: 12px; font-size: 10.5px; color: #64748b;">
            <span>Calendar of Events 2026</span>
            <span>Dinas Pariwisata Sumbar</span>
          </div>
        </div>
        `;
      }).join('')}

      <!-- BACK COVER -->
      <div style="background: #0f172a; color: #ffffff; border-radius: 16px; padding: 36px 28px; margin-bottom: 28px; border: 2px solid #334155; page-break-before: always; text-align: center;">
        <h2 style="font-size: 26px; font-weight: 900; margin-bottom: 8px;">
          ${isEn ? 'EXPERIENCE WEST SUMATRA' : 'JELAJAHI RANAH MINANG'}
        </h2>
        <p style="color: #cbd5e1; font-size: 12.5px; margin-bottom: 24px;">
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
  `;
}

/**
 * DIRECT SILENT PDF DOWNLOAD THAT RENDERS 100% IDENTICAL HTML CARDS TO PDF
 */
export async function generateSumbarBookletPDF(data: BookletData = {}): Promise<void> {
  const isEn = data.lang === 'en';
  const filename = isEn ? 'Master-Booklet-West-Sumatra-Guide-2026.pdf' : 'Master-E-Booklet-Pariwisata-Budaya-Sumbar-2026.pdf';

  // Render hidden offscreen container with exact same visual HTML
  const container = document.createElement('div');
  container.style.position = 'fixed';
  container.style.top = '-99999px';
  container.style.left = '-99999px';
  container.style.width = '780px';
  container.style.background = '#ffffff';
  container.style.zIndex = '-1000';
  container.innerHTML = buildHtmlBookletMarkup(data, isEn);

  document.body.appendChild(container);

  const opt = {
    margin: [8, 8, 8, 8],
    filename: filename,
    image: { type: 'jpeg', quality: 0.95 },
    html2canvas: { scale: 1.5, useCORS: true, logging: false, allowTaint: true },
    jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
  };

  try {
    if (typeof html2pdf !== 'undefined') {
      await html2pdf().set(opt).from(container).save();
    } else {
      // Fallback
      window.print();
    }
  } catch (err) {
    console.warn("html2pdf save error:", err);
  } finally {
    if (document.body.contains(container)) {
      document.body.removeChild(container);
    }
  }
}
