import { jsPDF } from 'jspdf';
import { Destination, CultureItem, CulinaryItem, EventItem } from '../types';

interface BookletData {
  destinations: Destination[];
  cultureItems: CultureItem[];
  culinaryItems: CulinaryItem[];
  eventItems: EventItem[];
  lang?: 'id' | 'en';
}

/**
 * Generates an official, beautifully structured PDF booklet of West Sumatra Tourism & Culture
 */
export async function generateSumbarBookletPDF(data: BookletData): Promise<void> {
  const isEn = data.lang === 'en';
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4'
  });

  const pageWidth = 210;
  const pageHeight = 297;
  const margin = 15;
  const contentWidth = pageWidth - margin * 2;
  let currentPage = 1;

  const addHeaderFooter = (pageTitle: string) => {
    // Header line
    doc.setDrawColor(220, 38, 38); // red-600
    doc.setLineWidth(0.5);
    doc.line(margin, 12, pageWidth - margin, 12);

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8);
    doc.setTextColor(150, 150, 150);
    doc.text(isEn ? 'OFFICIAL WEST SUMATRA TOURISM & CULTURE GUIDE 2026' : 'PANDUAN RESMI PARIWISATA & BUDAYA SUMATERA BARAT 2026', margin, 9);
    doc.text(pageTitle.toUpperCase(), pageWidth - margin, 9, { align: 'right' });

    // Footer line
    doc.setDrawColor(220, 220, 220);
    doc.setLineWidth(0.3);
    doc.line(margin, pageHeight - 12, pageWidth - margin, pageHeight - 12);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(160, 160, 160);
    doc.text('Dinas Pariwisata Provinsi Sumatera Barat • malala.my.id', margin, pageHeight - 8);
    doc.text(`${currentPage}`, pageWidth - margin, pageHeight - 8, { align: 'right' });
  };

  const checkPageBreak = (neededHeight: number, currentY: number, pageTitle: string): number => {
    if (currentY + neededHeight > pageHeight - 18) {
      doc.addPage();
      currentPage++;
      addHeaderFooter(pageTitle);
      return 20; // New Y start after header
    }
    return currentY;
  };

  // ==========================================
  // 1. COVER PAGE
  // ==========================================
  // Dark Background cover accent
  doc.setFillColor(15, 23, 42); // slate-900
  doc.rect(0, 0, pageWidth, pageHeight, 'F');

  // Red accent decorative bar
  doc.setFillColor(220, 38, 38);
  doc.rect(0, 0, 12, pageHeight, 'F');

  // Gold accent bar
  doc.setFillColor(217, 119, 6); // amber-600
  doc.rect(12, 0, 3, pageHeight, 'F');

  // Government & Branding text
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.setTextColor(251, 191, 36); // amber-400
  doc.text(isEn ? 'OFFICIAL GOVERNMENT & TOURISM PUBLICATION' : 'PUBLIKASI RESMI DINAS PARIWISATA PROVINSI SUMATERA BARAT', 25, 40);

  // Main Title
  doc.setFontSize(28);
  doc.setTextColor(255, 255, 255);
  doc.text('MALALA 2026', 25, 55);

  doc.setFontSize(20);
  doc.setTextColor(220, 38, 38); // Red
  doc.text(isEn ? 'WEST SUMATRA TRAVEL GUIDE' : 'PANDUAN WISATA SUMBAR', 25, 66);

  // Subtitle
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(12);
  doc.setTextColor(203, 213, 225); // slate-300
  const subText = isEn 
    ? 'Comprehensive E-Booklet of 26 Iconic Destinations, 14 Cultural Traditions, 16 Authentic Minangkabau Culinaries & 20 Major Festivals.'
    : 'Kompilasi Master Katalog 26 Destinasi Unggulan, 14 Tradisi Budaya Luhur, 16 Kuliner Gastronomi Otentik & 20 Kalender Event Resmi (CoE & KEN).';
  doc.text(doc.splitTextToSize(subText, 160), 25, 80);

  // Summary Stat Badges Box
  doc.setFillColor(30, 41, 59); // slate-800
  doc.roundedRect(25, 110, 165, 45, 3, 3, 'F');

  doc.setDrawColor(217, 119, 6);
  doc.setLineWidth(0.5);
  doc.roundedRect(25, 110, 165, 45, 3, 3, 'S');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.setTextColor(251, 191, 36);
  doc.text(isEn ? 'MASTER CATALOG OVERVIEW' : 'RINGKASAN MASTER KATALOG', 32, 120);

  doc.setFontSize(9);
  doc.setTextColor(255, 255, 255);
  doc.text(`• 26 ${isEn ? 'Curated Tourism Destinations (Geoparks, Lakes & UNESCO Sites)' : 'Destinasi Wisata Pilihan (Alam, Geopark & UNESCO)'}`, 32, 128);
  doc.text(`• 14 ${isEn ? 'Sacred Minangkabau Cultural Traditions & Social Heritage' : 'Warisan Luhur Adat & Kebudayaan Minangkabau'}`, 32, 135);
  doc.text(`• 16 ${isEn ? 'Authentic Gastronomic Heritage Culinaries & Signature Dishes' : 'Kuliner & Gastronomi Warisan Leluhur Minangkabau'}`, 32, 142);
  doc.text(`• 20 ${isEn ? 'Official Events & Karisma Event Nusantara (KEN) 2026' : 'Kalender Event Resmi Dinas Pariwisata & KEN Kemenparekraf 2026'}`, 32, 149);

  // Philosophy quote box
  doc.setFillColor(220, 38, 38);
  doc.rect(25, 175, 4, 30, 'F');

  doc.setFont('helvetica', 'italic');
  doc.setFontSize(11);
  doc.setTextColor(226, 232, 240);
  doc.text('"Adat Basandi Syarak, Syarak Basandi Kitabullah"', 35, 185);
  doc.text('"Alam Takambang Jadi Guru"', 35, 193);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(148, 163, 184);
  doc.text(isEn ? 'The timeless wisdom and cultural philosophy of Minangkabau.' : 'Falsafah abadi kearifan lokal dan keluhuran alam Minangkabau.', 35, 201);

  // Bottom Metadata
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.setTextColor(255, 255, 255);
  doc.text(isEn ? 'PUBLISHED BY:' : 'DITERBITKAN OLEH:', 25, 250);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(203, 213, 225);
  doc.text('Dinas Pariwisata Provinsi Sumatera Barat', 25, 256);
  doc.text('Padang, Sumatera Barat, Indonesia • 2026', 25, 262);
  doc.text('Aplikasi Resmi: https://malala.my.id', 25, 268);

  // ==========================================
  // 2. BAB I: DESTINASI WISATA (26 ITEMS)
  // ==========================================
  doc.addPage();
  currentPage++;
  addHeaderFooter(isEn ? 'Chapter 1: Tourism Destinations' : 'Bab 1: Destinasi Wisata Pilihan');

  let y = 22;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(16);
  doc.setTextColor(220, 38, 38);
  doc.text(isEn ? 'CHAPTER I: 26 ICONIC DESTINATIONS' : 'BAB I: 26 DESTINASI WISATA PILIHAN', margin, y);
  y += 7;

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(100, 100, 100);
  doc.text(isEn ? 'Exploration of natural wonders, UNESCO world heritage sites, serene volcanic lakes, and living cultural nagari.' : 'Eksplorasi bentang alam menakjubkan, situs Warisan Dunia UNESCO, danau vulkanik, hingga nagari terindah.', margin, y);
  y += 8;

  const destinations = data.destinations || [];
  destinations.forEach((dest, idx) => {
    y = checkPageBreak(50, y, isEn ? 'Chapter 1: Tourism Destinations' : 'Bab 1: Destinasi Wisata Pilihan');

    // Container box
    doc.setFillColor(248, 250, 252); // slate-50
    doc.roundedRect(margin, y, contentWidth, 42, 2, 2, 'F');
    doc.setDrawColor(226, 232, 240);
    doc.roundedRect(margin, y, contentWidth, 42, 2, 2, 'S');

    // Number & Category Badge
    doc.setFillColor(15, 23, 42);
    doc.rect(margin, y, 7, 42, 'F');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10);
    doc.setTextColor(255, 255, 255);
    doc.text(`${idx + 1}`, margin + 3.5, y + 22, { align: 'center' });

    // Destination Name & Regency
    const title = isEn && dest.titleEn ? dest.titleEn : dest.title;
    const category = isEn && dest.categoryEn ? dest.categoryEn : dest.category;
    const regency = dest.regency || (isEn ? 'West Sumatra' : 'Sumatera Barat');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(11);
    doc.setTextColor(15, 23, 42);
    doc.text(title.toUpperCase(), margin + 10, y + 6);

    doc.setFontSize(8);
    doc.setTextColor(220, 38, 38);
    doc.text(`[${category}] • ${regency}`, margin + 10, y + 10.5);

    // Description text
    const desc = isEn && dest.descriptionEn ? dest.descriptionEn : dest.description;
    const cleanDesc = desc.replace(/\n+/g, ' ').slice(0, 260) + '...';
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(71, 85, 105);
    const splitDesc = doc.splitTextToSize(cleanDesc, contentWidth - 14);
    doc.text(splitDesc, margin + 10, y + 15.5);

    // Highlights & Best Time
    const highlights = (isEn && dest.highlightsEn ? dest.highlightsEn : dest.highlights) || [];
    const bestTime = isEn && dest.bestTimeEn ? dest.bestTimeEn : dest.bestTime;

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(7.5);
    doc.setTextColor(217, 119, 6);
    doc.text(`★ ${isEn ? 'Highlights:' : 'Keunggulan:'} ${highlights.slice(0, 2).join(' • ')}`, margin + 10, y + 36);

    if (bestTime) {
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(100, 116, 139);
      doc.text(`⏰ ${isEn ? 'Best Time:' : 'Waktu Terbaik:'} ${bestTime}`, contentWidth - 5, y + 36, { align: 'right' });
    }

    y += 46;
  });

  // ==========================================
  // 3. BAB II: WARISAN BUDAYA (14 ITEMS)
  // ==========================================
  doc.addPage();
  currentPage++;
  addHeaderFooter(isEn ? 'Chapter 2: Cultural Heritage' : 'Bab 2: Warisan Budaya & Tradisi Adat');

  y = 22;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(16);
  doc.setTextColor(217, 119, 6); // amber-600
  doc.text(isEn ? 'CHAPTER II: 14 SACRED CULTURAL TRADITIONS' : 'BAB II: 14 WARISAN BUDAYA & TRADISI ADAT', margin, y);
  y += 7;

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(100, 100, 100);
  doc.text(isEn ? 'Values, matrilineal social structures, sacred architecture, and customary ceremonies of Minangkabau.' : 'Nilai luhur, sistem matrilineal, arsitektur Rumah Gadang, dan upacara adat sakral Minangkabau.', margin, y);
  y += 8;

  const cultures = data.cultureItems || [];
  cultures.forEach((cult, idx) => {
    y = checkPageBreak(48, y, isEn ? 'Chapter 2: Cultural Heritage' : 'Bab 2: Warisan Budaya & Tradisi Adat');

    doc.setFillColor(254, 252, 232); // amber-50
    doc.roundedRect(margin, y, contentWidth, 40, 2, 2, 'F');
    doc.setDrawColor(253, 230, 138);
    doc.roundedRect(margin, y, contentWidth, 40, 2, 2, 'S');

    doc.setFillColor(217, 119, 6);
    doc.rect(margin, y, 7, 40, 'F');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10);
    doc.setTextColor(255, 255, 255);
    doc.text(`${idx + 1}`, margin + 3.5, y + 21, { align: 'center' });

    const title = isEn && cult.titleEn ? cult.titleEn : cult.title;
    const category = isEn && cult.categoryEn ? cult.categoryEn : cult.category;
    const origin = isEn && cult.originEn ? cult.originEn : cult.origin;

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(11);
    doc.setTextColor(120, 53, 15); // amber-900
    doc.text(title.toUpperCase(), margin + 10, y + 6);

    doc.setFontSize(8);
    doc.setTextColor(180, 83, 9);
    doc.text(`[${category}] • ${origin}`, margin + 10, y + 10.5);

    const desc = isEn && cult.descriptionEn ? cult.descriptionEn : cult.description;
    const cleanDesc = desc.replace(/\n+/g, ' ').slice(0, 240) + '...';
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(68, 64, 60);
    const splitDesc = doc.splitTextToSize(cleanDesc, contentWidth - 14);
    doc.text(splitDesc, margin + 10, y + 15.5);

    const philosophy = isEn && cult.philosophyEn ? cult.philosophyEn : cult.philosophy;
    if (philosophy) {
      doc.setFont('helvetica', 'bolditalic');
      doc.setFontSize(7.5);
      doc.setTextColor(180, 83, 9);
      doc.text(`📜 ${isEn ? 'Customary Philosophy:' : 'Falsafah Adat:'} "${philosophy}"`, margin + 10, y + 35);
    }

    y += 44;
  });

  // ==========================================
  // 4. BAB III: KULINER OTENTIK (16 ITEMS)
  // ==========================================
  doc.addPage();
  currentPage++;
  addHeaderFooter(isEn ? 'Chapter 3: Culinary & Gastronomy' : 'Bab 3: Kuliner Otentik Minangkabau');

  y = 22;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(16);
  doc.setTextColor(220, 38, 38);
  doc.text(isEn ? 'CHAPTER III: 16 AUTHENTIC GASTRONOMIC DELIGHTS' : 'BAB III: 16 KULINER OTENTIK RANAH MINANG', margin, y);
  y += 7;

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(100, 100, 100);
  doc.text(isEn ? 'UNESCO Intangible Cultural Heritage culinary wonders, world-famous Rendang, rare local delicacies & traditional spices.' : 'Warisan kuliner dunia, Rendang pusaka leluhur, sajian eksklusif danau, dan racikan rempah istimewa.', margin, y);
  y += 8;

  const culinaries = data.culinaryItems || [];
  culinaries.forEach((cul, idx) => {
    y = checkPageBreak(46, y, isEn ? 'Chapter 3: Culinary & Gastronomy' : 'Bab 3: Kuliner Otentik Minangkabau');

    doc.setFillColor(255, 241, 242); // rose-50
    doc.roundedRect(margin, y, contentWidth, 38, 2, 2, 'F');
    doc.setDrawColor(254, 205, 211);
    doc.roundedRect(margin, y, contentWidth, 38, 2, 2, 'S');

    doc.setFillColor(220, 38, 38);
    doc.rect(margin, y, 7, 38, 'F');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10);
    doc.setTextColor(255, 255, 255);
    doc.text(`${idx + 1}`, margin + 3.5, y + 20, { align: 'center' });

    const title = isEn && cul.titleEn ? cul.titleEn : cul.title;
    const category = isEn && cul.categoryEn ? cul.categoryEn : cul.category;
    const origin = isEn && cul.originEn ? cul.originEn : cul.origin;

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(11);
    doc.setTextColor(159, 18, 57); // rose-900
    doc.text(title.toUpperCase(), margin + 10, y + 6);

    doc.setFontSize(8);
    doc.setTextColor(225, 29, 72);
    doc.text(`[${category}] • ${origin}`, margin + 10, y + 10.5);

    const desc = isEn && cul.descriptionEn ? cul.descriptionEn : cul.description;
    const cleanDesc = desc.replace(/\n+/g, ' ').slice(0, 230) + '...';
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(76, 29, 44);
    const splitDesc = doc.splitTextToSize(cleanDesc, contentWidth - 14);
    doc.text(splitDesc, margin + 10, y + 15.5);

    const ingredients = (isEn && cul.mainIngredientsEn ? cul.mainIngredientsEn : cul.mainIngredients) || [];
    const taste = isEn && cul.tasteProfileEn ? cul.tasteProfileEn : cul.tasteProfile;

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(7.5);
    doc.setTextColor(190, 18, 60);
    doc.text(`🍲 ${isEn ? 'Spices & Ingredients:' : 'Rempah & Bahan:'} ${ingredients.slice(0, 3).join(', ')}`, margin + 10, y + 33.5);

    if (taste) {
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(159, 18, 57);
      doc.text(`👅 ${taste}`, contentWidth - 5, y + 33.5, { align: 'right' });
    }

    y += 42;
  });

  // ==========================================
  // 5. BAB IV: CALENDAR OF EVENTS 2026 (20 FESTIVALS)
  // ==========================================
  doc.addPage();
  currentPage++;
  addHeaderFooter(isEn ? 'Chapter 4: Calendar of Events 2026' : 'Bab 4: Kalender Event Resmi (CoE) 2026');

  y = 22;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(16);
  doc.setTextColor(15, 23, 42);
  doc.text(isEn ? 'CHAPTER IV: OFFICIAL CALENDAR OF EVENTS 2026' : 'BAB IV: KALENDER EVENT RESMI (CoE) 2026', margin, y);
  y += 7;

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(100, 100, 100);
  doc.text(isEn ? 'Official Karisma Event Nusantara (KEN) highlights, cultural festivals & sports tourism events.' : 'Agenda resmi Karisma Event Nusantara (KEN) Kemenparekraf, festival budaya, dan pesta anak nagari se-Sumbar.', margin, y);
  y += 8;

  const events = data.eventItems || [];
  events.forEach((ev, idx) => {
    y = checkPageBreak(46, y, isEn ? 'Chapter 4: Calendar of Events 2026' : 'Bab 4: Kalender Event Resmi (CoE) 2026');

    doc.setFillColor(241, 245, 249); // slate-100
    doc.roundedRect(margin, y, contentWidth, 38, 2, 2, 'F');
    doc.setDrawColor(203, 213, 225);
    doc.roundedRect(margin, y, contentWidth, 38, 2, 2, 'S');

    doc.setFillColor(ev.isKen ? 220 : 15, ev.isKen ? 38 : 23, ev.isKen ? 38 : 42);
    doc.rect(margin, y, 7, 38, 'F');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10);
    doc.setTextColor(255, 255, 255);
    doc.text(`${idx + 1}`, margin + 3.5, y + 20, { align: 'center' });

    const title = isEn && ev.titleEn ? ev.titleEn : ev.title;
    const schedule = isEn && ev.scheduleEn ? ev.scheduleEn : ev.schedule;
    const location = isEn && ev.locationEn ? ev.locationEn : ev.location;

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10.5);
    doc.setTextColor(15, 23, 42);
    doc.text(title.toUpperCase(), margin + 10, y + 6);

    doc.setFontSize(8);
    doc.setTextColor(ev.isKen ? 220 : 100, ev.isKen ? 38 : 116, ev.isKen ? 38 : 139);
    doc.text(`${ev.isKen ? '⭐ KARISMA EVENT NUSANTARA (KEN) • ' : ''}📅 ${schedule} • 📍 ${location}`, margin + 10, y + 10.5);

    const desc = isEn && ev.descriptionEn ? ev.descriptionEn : ev.description;
    const cleanDesc = desc.replace(/\n+/g, ' ').slice(0, 240) + '...';
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(71, 85, 105);
    const splitDesc = doc.splitTextToSize(cleanDesc, contentWidth - 14);
    doc.text(splitDesc, margin + 10, y + 15.5);

    y += 42;
  });

  // ==========================================
  // 6. BACK COVER / PENUTUP
  // ==========================================
  doc.addPage();
  currentPage++;

  doc.setFillColor(15, 23, 42);
  doc.rect(0, 0, pageWidth, pageHeight, 'F');

  doc.setFillColor(220, 38, 38);
  doc.rect(0, pageHeight - 15, pageWidth, 15, 'F');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(22);
  doc.setTextColor(255, 255, 255);
  doc.text(isEn ? 'EXPERIENCE WEST SUMATRA' : 'JELAJAHI RANAH MINANG', pageWidth / 2, 70, { align: 'center' });

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(11);
  doc.setTextColor(203, 213, 225);
  doc.text(isEn ? 'Taste the Heritage, Feel the Culture, Embrace the Nature.' : 'Rasakan Warisan, Hayati Kebudayaan, Rengkuh Pesona Alam Nan Megah.', pageWidth / 2, 80, { align: 'center' });

  doc.setFillColor(30, 41, 59);
  doc.roundedRect(30, 110, 150, 75, 4, 4, 'F');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(12);
  doc.setTextColor(251, 191, 36);
  doc.text(isEn ? 'OFFICIAL CONTACT & INFORMATION' : 'KONTAK & INFORMASI RESMI', pageWidth / 2, 125, { align: 'center' });

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9.5);
  doc.setTextColor(255, 255, 255);
  doc.text('Dinas Pariwisata Provinsi Sumatera Barat', pageWidth / 2, 137, { align: 'center' });
  doc.text('Jl. Khatib Sulaiman No. 22, Padang, Sumatera Barat', pageWidth / 2, 144, { align: 'center' });
  doc.text('Email: info@pariwisata.sumbarprov.go.id', pageWidth / 2, 151, { align: 'center' });
  doc.text('Official Platform: https://malala.my.id', pageWidth / 2, 158, { align: 'center' });
  doc.text('Call Center / Hotline: +62 751 7055183', pageWidth / 2, 165, { align: 'center' });

  doc.setFont('helvetica', 'italic');
  doc.setFontSize(8.5);
  doc.setTextColor(148, 163, 184);
  doc.text(isEn ? '© 2026 Malala Official. All rights reserved.' : '© 2026 Malala Official. Hak Cipta Dilindungi.', pageWidth / 2, 230, { align: 'center' });

  // Save the generated PDF
  const filename = isEn ? 'West-Sumatra-Official-Guide-Booklet-2026.pdf' : 'E-Booklet-Resmi-Panduan-Wisata-Sumbar-2026.pdf';
  doc.save(filename);
}
