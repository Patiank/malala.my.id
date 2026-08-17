import { jsPDF } from 'jspdf';
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
 * DIRECT SILENT PDF DOWNLOAD (Zero Popup, Zero Window, Instantly Saves to Downloads Folder)
 */
export async function generateSumbarBookletPDF(data: BookletData = {}): Promise<void> {
  const isEn = data.lang === 'en';

  const destinations: Destination[] = (data.destinations && data.destinations.length > 0) ? data.destinations : DESTINATIONS;
  const cultureItems: CultureItem[] = (data.cultureItems && data.cultureItems.length > 0) ? data.cultureItems : CULTURE_ITEMS;
  const culinaryItems: CulinaryItem[] = (data.culinaryItems && data.culinaryItems.length > 0) ? data.culinaryItems : CULINARY_ITEMS;
  const eventItems: EventItem[] = (data.eventItems && data.eventItems.length > 0) ? data.eventItems : EVENTS_SCHEDULE;

  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4'
  });

  const pageWidth = 210;
  const pageHeight = 297;
  const margin = 14;
  const contentWidth = pageWidth - margin * 2; // 182mm
  let pageNumber = 1;

  const addHeaderFooter = (categoryLabel: string, subCategory: string) => {
    try {
      doc.setFillColor(15, 23, 42); // slate-900
      doc.rect(0, 0, pageWidth, 11, 'F');

      doc.setFillColor(220, 38, 38); // red-600
      doc.rect(0, 11, pageWidth, 1, 'F');

      doc.setFont('helvetica', 'bold');
      doc.setFontSize(7.5);
      doc.setTextColor(251, 191, 36); // amber-400
      doc.text('MALALA 2026 • DINAS PARIWISATA PROVINSI SUMATERA BARAT', margin, 7.5);

      doc.setFont('helvetica', 'bold');
      doc.setFontSize(7.5);
      doc.setTextColor(255, 255, 255);
      doc.text(`${(categoryLabel || '').toUpperCase()} — ${(subCategory || '').toUpperCase()}`, pageWidth - margin, 7.5, { align: 'right' });

      doc.setFillColor(248, 250, 252);
      doc.rect(0, pageHeight - 10, pageWidth, 10, 'F');
      doc.setDrawColor(226, 232, 240);
      doc.line(0, pageHeight - 10, pageWidth, pageHeight - 10);

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(7.5);
      doc.setTextColor(100, 116, 139);
      doc.text('Katalog Resmi Panduan Wisata & Budaya • https://malala.my.id', margin, pageHeight - 4);
      doc.setFont('helvetica', 'bold');
      doc.text(`${isEn ? 'Page' : 'Hal.'} ${pageNumber}`, pageWidth - margin, pageHeight - 4, { align: 'right' });
    } catch {}
  };

  // ==============================================================
  // 1. COVER PAGE
  // ==============================================================
  doc.setFillColor(15, 23, 42);
  doc.rect(0, 0, pageWidth, pageHeight, 'F');

  doc.setFillColor(220, 38, 38);
  doc.rect(0, 0, 12, pageHeight, 'F');
  doc.setFillColor(217, 119, 6);
  doc.rect(12, 0, 3, pageHeight, 'F');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.setTextColor(251, 191, 36);
  doc.text(isEn ? 'OFFICIAL TOURISM & CULTURAL MASTER CATALOG 2026' : 'MASTER KATALOG RESMI PARIWISATA & KEBUDAYAAN 2026', 25, 38);

  doc.setFontSize(30);
  doc.setTextColor(255, 255, 255);
  doc.text('MALALA 2026', 25, 52);

  doc.setFontSize(18);
  doc.setTextColor(220, 38, 38);
  doc.text(isEn ? 'WEST SUMATRA TRAVEL GUIDE' : 'PANDUAN LENGKAP WISATA RANAH MINANG', 25, 62);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  doc.setTextColor(203, 213, 225);
  const coverSubtitle = isEn 
    ? 'Comprehensive compilation of 26 Iconic Destinations, 14 Living Cultural Traditions, 16 Authentic Culinaries, and 20 Official Events & KEN 2026.'
    : 'Kompilasi komprehensif master data 26 destinasi wisata, 14 tradisi adat luhur, 16 kuliner gastronomi otentik, dan 20 kalender festival KEN 2026.';
  doc.text(doc.splitTextToSize(coverSubtitle, 160), 25, 74);

  doc.setFillColor(30, 41, 59);
  doc.roundedRect(25, 100, 165, 50, 3, 3, 'F');
  doc.setDrawColor(217, 119, 6);
  doc.roundedRect(25, 100, 165, 50, 3, 3, 'S');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.setTextColor(251, 191, 36);
  doc.text(isEn ? 'MASTER CATALOG OVERVIEW' : 'DAFTAR MASTER KATALOG LENGKAP', 32, 112);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(255, 255, 255);
  doc.text(`• Bab I   : ${destinations.length} ${isEn ? 'Iconic Destinations (Geoparks, Lakes, Islands & UNESCO Heritage)' : 'Destinasi Wisata Pilihan (Alam, Geopark, Bahari & UNESCO)'}`, 32, 122);
  doc.text(`• Bab II  : ${cultureItems.length} ${isEn ? 'Sacred Minangkabau Cultural Traditions & Social Heritage' : 'Warisan Luhur Adat & Kebudayaan Minangkabau'}`, 32, 129);
  doc.text(`• Bab III : ${culinaryItems.length} ${isEn ? 'Authentic Gastronomic Heritage Culinaries & Signature Dishes' : 'Kuliner & Gastronomi Warisan Leluhur Minangkabau'}`, 32, 136);
  doc.text(`• Bab IV  : ${eventItems.length} ${isEn ? 'Official Events & Karisma Event Nusantara (KEN) 2026 Calendar' : 'Kalender Event Resmi Dinas Pariwisata & KEN Kemenparekraf 2026'}`, 32, 143);

  doc.setFillColor(220, 38, 38);
  doc.rect(25, 175, 4, 32, 'F');

  doc.setFont('helvetica', 'italic');
  doc.setFontSize(11);
  doc.setTextColor(226, 232, 240);
  doc.text('"Adat Basandi Syarak, Syarak Basandi Kitabullah"', 35, 186);
  doc.text('"Alam Takambang Jadi Guru"', 35, 194);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(148, 163, 184);
  doc.text(isEn ? 'Fostering cultural integrity and natural conservation in West Sumatra.' : 'Falsafah keluhuran kearifan lokal dan harmoni alam semesta Ranah Minang.', 35, 202);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.setTextColor(255, 255, 255);
  doc.text(isEn ? 'PUBLISHED BY:' : 'DITERBITKAN OLEH:', 25, 255);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(203, 213, 225);
  doc.text('Dinas Pariwisata Provinsi Sumatera Barat', 25, 261);
  doc.text('Padang, Sumatera Barat, Indonesia • 2026', 25, 267);
  doc.text('Platform Resmi: https://malala.my.id', 25, 273);

  // ==============================================================
  // 2. BAB I: DESTINASI WISATA
  // ==============================================================
  for (let i = 0; i < destinations.length; i++) {
    try {
      const dest = destinations[i];
      doc.addPage();
      pageNumber++;
      addHeaderFooter(isEn ? 'Destinations' : 'Destinasi Wisata', dest.regency || 'Sumatera Barat');

      const title = String(isEn && dest.titleEn ? dest.titleEn : dest.title || '').toUpperCase();
      const category = String(isEn && dest.categoryEn ? dest.categoryEn : dest.category || 'Wisata');
      const location = String(isEn && dest.locationDetailsEn ? dest.locationDetailsEn : (dest.locationDetails || dest.regency || 'Sumatera Barat'));
      const desc = String(isEn && dest.descriptionEn ? dest.descriptionEn : dest.description || '');
      const highlights = (isEn && dest.highlightsEn ? dest.highlightsEn : dest.highlights) || [];
      const bestTime = isEn && dest.bestTimeEn ? dest.bestTimeEn : dest.bestTime;

      let y = 16;

      // Banner Box
      doc.setFillColor(30, 41, 59);
      doc.roundedRect(margin, y, contentWidth, 68, 2, 2, 'F');
      doc.setFillColor(220, 38, 38);
      doc.rect(margin, y + 66, contentWidth, 2, 'F');
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(13);
      doc.setTextColor(255, 255, 255);
      doc.text(title, margin + contentWidth / 2, y + 35, { align: 'center' });

      doc.setFillColor(0, 0, 0);
      doc.roundedRect(margin + 4, y + 4, 38, 7, 1.5, 1.5, 'F');
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(7.5);
      doc.setTextColor(255, 255, 255);
      doc.text(category.toUpperCase(), margin + 23, y + 8.8, { align: 'center' });

      y += 73;

      doc.setFont('helvetica', 'bold');
      doc.setFontSize(13.5);
      doc.setTextColor(15, 23, 42);
      doc.text(title, margin, y);

      y += 5.5;
      doc.setFontSize(9);
      doc.setTextColor(220, 38, 38);
      doc.text(`📍 ${location}`, margin, y);

      y += 4;
      doc.setDrawColor(226, 232, 240);
      doc.setLineWidth(0.4);
      doc.line(margin, y, pageWidth - margin, y);
      y += 5;

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(8.5);
      doc.setTextColor(51, 65, 85);
      const paragraphs = desc.split('\n\n').filter(Boolean);
      paragraphs.forEach((p) => {
        const cleanP = p.replace(/\n/g, ' ').trim();
        const splitP = doc.splitTextToSize(cleanP, contentWidth);
        doc.text(splitP, margin, y);
        y += (splitP.length * 3.8) + 3;
      });

      if (highlights.length > 0) {
        y += 1;
        const boxHeight = 10 + (highlights.length * 5);
        doc.setFillColor(248, 250, 252);
        doc.roundedRect(margin, y, contentWidth, boxHeight, 2, 2, 'F');
        doc.setDrawColor(226, 232, 240);
        doc.roundedRect(margin, y, contentWidth, boxHeight, 2, 2, 'S');

        doc.setFont('helvetica', 'bold');
        doc.setFontSize(8.5);
        doc.setTextColor(15, 23, 42);
        doc.text(isEn ? 'KEY HIGHLIGHTS & ATTRACTIONS' : 'DAYA TARIK UTAMA (HIGHLIGHTS)', margin + 4, y + 6);

        doc.setFont('helvetica', 'normal');
        doc.setFontSize(8);
        doc.setTextColor(51, 65, 85);
        let hlY = y + 11;
        highlights.forEach((hl) => {
          doc.text(`✓  ${hl}`, margin + 5, hlY);
          hlY += 5;
        });

        y += boxHeight + 4;
      }

      if (bestTime) {
        doc.setFillColor(254, 243, 199);
        doc.roundedRect(margin, y, contentWidth, 8.5, 1.5, 1.5, 'F');
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(8);
        doc.setTextColor(180, 83, 9);
        doc.text(`⏰ ${isEn ? 'Best Time to Visit:' : 'Waktu Terbaik Berkunjung:'} ${bestTime}`, margin + 4, y + 5.8);
      }
    } catch {}
  }

  // ==============================================================
  // 3. BAB II: WARISAN BUDAYA
  // ==============================================================
  for (let i = 0; i < cultureItems.length; i++) {
    try {
      const cult = cultureItems[i];
      doc.addPage();
      pageNumber++;
      addHeaderFooter(isEn ? 'Culture & Heritage' : 'Warisan Budaya', cult.category || 'Adat Minang');

      const title = String(isEn && cult.titleEn ? cult.titleEn : cult.title || '').toUpperCase();
      const category = String(isEn && cult.categoryEn ? cult.categoryEn : cult.category || 'Budaya');
      const origin = String(isEn && cult.originEn ? cult.originEn : (cult.origin || 'Alam Minangkabau'));
      const desc = String(isEn && cult.descriptionEn ? cult.descriptionEn : cult.description || '');
      const philosophy = isEn && cult.philosophyEn ? cult.philosophyEn : cult.philosophy;

      let y = 16;

      doc.setFillColor(69, 26, 3);
      doc.roundedRect(margin, y, contentWidth, 68, 2, 2, 'F');
      doc.setFillColor(217, 119, 6);
      doc.rect(margin, y + 66, contentWidth, 2, 'F');
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(13);
      doc.setTextColor(255, 255, 255);
      doc.text(title, margin + contentWidth / 2, y + 35, { align: 'center' });

      doc.setFillColor(217, 119, 6);
      doc.roundedRect(margin + 4, y + 4, 40, 7, 1.5, 1.5, 'F');
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(7.5);
      doc.setTextColor(255, 255, 255);
      doc.text(category.toUpperCase(), margin + 24, y + 8.8, { align: 'center' });

      y += 73;

      doc.setFont('helvetica', 'bold');
      doc.setFontSize(13.5);
      doc.setTextColor(120, 53, 15);
      doc.text(title, margin, y);

      y += 5.5;
      doc.setFontSize(9);
      doc.setTextColor(180, 83, 9);
      doc.text(`🏛️ ${isEn ? 'Origin:' : 'Asal Nagari:'} ${origin}`, margin, y);

      y += 4;
      doc.setDrawColor(253, 230, 138);
      doc.setLineWidth(0.4);
      doc.line(margin, y, pageWidth - margin, y);
      y += 5;

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(8.5);
      doc.setTextColor(68, 64, 60);
      const paragraphs = desc.split('\n\n').filter(Boolean);
      paragraphs.forEach((p) => {
        const cleanP = p.replace(/\n/g, ' ').trim();
        const splitP = doc.splitTextToSize(cleanP, contentWidth);
        doc.text(splitP, margin, y);
        y += (splitP.length * 3.8) + 3;
      });

      if (philosophy) {
        y += 2;
        doc.setFillColor(254, 252, 232);
        doc.roundedRect(margin, y, contentWidth, 24, 2, 2, 'F');
        doc.setDrawColor(253, 230, 138);
        doc.roundedRect(margin, y, contentWidth, 24, 2, 2, 'S');

        doc.setFont('helvetica', 'bold');
        doc.setFontSize(8.5);
        doc.setTextColor(146, 64, 14);
        doc.text(isEn ? 'MINANGKABAU CUSTOMARY PHILOSOPHY' : 'FALSAFAH & MAKNA ADAT MINANGKABAU', margin + 4, y + 6.5);

        doc.setFont('helvetica', 'italic');
        doc.setFontSize(8.5);
        doc.setTextColor(120, 53, 15);
        const splitPhil = doc.splitTextToSize(`"${philosophy}"`, contentWidth - 8);
        doc.text(splitPhil, margin + 4, y + 13.5);
      }
    } catch {}
  }

  // ==============================================================
  // 4. BAB III: KULINER OTENTIK
  // ==============================================================
  for (let i = 0; i < culinaryItems.length; i++) {
    try {
      const cul = culinaryItems[i];
      doc.addPage();
      pageNumber++;
      addHeaderFooter(isEn ? 'Authentic Gastronomy' : 'Kuliner Otentik Minang', cul.category || 'Kuliner');

      const title = String(isEn && cul.titleEn ? cul.titleEn : cul.title || '').toUpperCase();
      const category = String(isEn && cul.categoryEn ? cul.categoryEn : cul.category || 'Kuliner');
      const origin = String(isEn && cul.originEn ? cul.originEn : (cul.origin || 'Ranah Minang'));
      const desc = String(isEn && cul.descriptionEn ? cul.descriptionEn : cul.description || '');
      const ingredients = (isEn && cul.mainIngredientsEn ? cul.mainIngredientsEn : cul.mainIngredients) || [];
      const taste = isEn && cul.tasteProfileEn ? cul.tasteProfileEn : cul.tasteProfile;
      const philosophy = isEn && cul.culturalPhilosophyEn ? cul.culturalPhilosophyEn : cul.culturalPhilosophy;

      let y = 16;

      doc.setFillColor(76, 29, 44);
      doc.roundedRect(margin, y, contentWidth, 68, 2, 2, 'F');
      doc.setFillColor(220, 38, 38);
      doc.rect(margin, y + 66, contentWidth, 2, 'F');
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(13);
      doc.setTextColor(255, 255, 255);
      doc.text(title, margin + contentWidth / 2, y + 35, { align: 'center' });

      doc.setFillColor(220, 38, 38);
      doc.roundedRect(margin + 4, y + 4, 38, 7, 1.5, 1.5, 'F');
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(7.5);
      doc.setTextColor(255, 255, 255);
      doc.text(category.toUpperCase(), margin + 23, y + 8.8, { align: 'center' });

      y += 73;

      doc.setFont('helvetica', 'bold');
      doc.setFontSize(13.5);
      doc.setTextColor(159, 18, 57);
      doc.text(title, margin, y);

      y += 5.5;
      doc.setFontSize(9);
      doc.setTextColor(225, 29, 72);
      doc.text(`🍲 ${isEn ? 'Heritage Origin:' : 'Asal Kuliner:'} ${origin}`, margin, y);

      y += 4;
      doc.setDrawColor(254, 205, 211);
      doc.setLineWidth(0.4);
      doc.line(margin, y, pageWidth - margin, y);
      y += 5;

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(8.5);
      doc.setTextColor(76, 29, 44);
      const paragraphs = desc.split('\n\n').filter(Boolean);
      paragraphs.forEach((p) => {
        const cleanP = p.replace(/\n/g, ' ').trim();
        const splitP = doc.splitTextToSize(cleanP, contentWidth);
        doc.text(splitP, margin, y);
        y += (splitP.length * 3.8) + 3;
      });

      y += 2;
      doc.setFillColor(255, 241, 242);
      doc.roundedRect(margin, y, contentWidth, 20, 2, 2, 'F');
      doc.setDrawColor(254, 205, 211);
      doc.roundedRect(margin, y, contentWidth, 20, 2, 2, 'S');

      doc.setFont('helvetica', 'bold');
      doc.setFontSize(8);
      doc.setTextColor(159, 18, 57);
      doc.text(`🥘 ${isEn ? 'Main Ingredients & Spices:' : 'Bahan & Rempah Utama:'}`, margin + 4, y + 5.5);
      doc.setFont('helvetica', 'normal');
      doc.text(ingredients.join(', '), margin + 4, y + 10.5);

      if (taste) {
        doc.setFont('helvetica', 'bold');
        doc.text(`👅 ${isEn ? 'Taste Profile:' : 'Karakter Rasa:'} ${taste}`, margin + 4, y + 15.5);
      }

      if (philosophy) {
        y += 24;
        doc.setFillColor(248, 250, 252);
        doc.roundedRect(margin, y, contentWidth, 11, 1.5, 1.5, 'F');
        doc.setFont('helvetica', 'italic');
        doc.setFontSize(7.5);
        doc.setTextColor(71, 85, 105);
        doc.text(`📜 "${philosophy}"`, margin + 4, y + 6.5);
      }
    } catch {}
  }

  // ==============================================================
  // 5. BAB IV: KALENDER EVENT & KEN 2026
  // ==============================================================
  for (let i = 0; i < eventItems.length; i++) {
    try {
      const ev = eventItems[i];
      doc.addPage();
      pageNumber++;
      addHeaderFooter(isEn ? 'Calendar of Events' : 'Kalender Event 2026', ev.isKen ? 'Karisma Event Nusantara' : 'Festival Sumbar');

      const title = String(isEn && ev.titleEn ? ev.titleEn : ev.title || '').toUpperCase();
      const schedule = String(isEn && ev.scheduleEn ? ev.scheduleEn : ev.schedule || '');
      const location = String(isEn && ev.locationEn ? ev.locationEn : ev.location || '');
      const desc = String(isEn && ev.descriptionEn ? ev.descriptionEn : ev.description || '');

      let y = 16;

      doc.setFillColor(15, 23, 42);
      doc.roundedRect(margin, y, contentWidth, 68, 2, 2, 'F');
      doc.setFillColor(ev.isKen ? 220 : 71, ev.isKen ? 38 : 85, ev.isKen ? 38 : 105);
      doc.rect(margin, y + 66, contentWidth, 2, 'F');
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(13);
      doc.setTextColor(255, 255, 255);
      doc.text(title, margin + contentWidth / 2, y + 35, { align: 'center' });

      doc.setFillColor(ev.isKen ? 220 : 15, ev.isKen ? 38 : 23, ev.isKen ? 38 : 42);
      doc.roundedRect(margin + 4, y + 4, ev.isKen ? 52 : 36, 7, 1.5, 1.5, 'F');
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(7.5);
      doc.setTextColor(255, 255, 255);
      doc.text(ev.isKen ? '⭐ OFFICIAL KEN 2026' : 'FESTIVAL RESMI', margin + (ev.isKen ? 30 : 22), y + 8.8, { align: 'center' });

      y += 73;

      doc.setFont('helvetica', 'bold');
      doc.setFontSize(13);
      doc.setTextColor(15, 23, 42);
      doc.text(title, margin, y);

      y += 5.5;
      doc.setFontSize(9);
      doc.setTextColor(ev.isKen ? 220 : 71, ev.isKen ? 38 : 85, ev.isKen ? 38 : 105);
      doc.text(`📅 ${schedule}  •  📍 ${location}`, margin, y);

      y += 4;
      doc.setDrawColor(203, 213, 225);
      doc.setLineWidth(0.4);
      doc.line(margin, y, pageWidth - margin, y);
      y += 5;

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(8.5);
      doc.setTextColor(51, 65, 85);
      const paragraphs = desc.split('\n\n').filter(Boolean);
      paragraphs.forEach((p) => {
        const cleanP = p.replace(/\n/g, ' ').trim();
        const splitP = doc.splitTextToSize(cleanP, contentWidth);
        doc.text(splitP, margin, y);
        y += (splitP.length * 3.8) + 3;
      });

      if (ev.isKen) {
        y += 2;
        doc.setFillColor(254, 242, 242);
        doc.roundedRect(margin, y, contentWidth, 16, 2, 2, 'F');
        doc.setDrawColor(254, 202, 202);
        doc.roundedRect(margin, y, contentWidth, 16, 2, 2, 'S');

        doc.setFont('helvetica', 'bold');
        doc.setFontSize(8.5);
        doc.setTextColor(185, 28, 28);
        doc.text(isEn ? '⭐ OFFICIAL KARISMA EVENT NUSANTARA (KEN) 2026' : '⭐ EVENT UNGGULAN KARISMA EVENT NUSANTARA (KEN) 2026', margin + 4, y + 5.5);

        doc.setFont('helvetica', 'normal');
        doc.setFontSize(8);
        doc.setTextColor(153, 27, 27);
        doc.text(isEn ? 'Curated and recognized by the Ministry of Tourism and Creative Economy.' : 'Terkurasi resmi oleh Kementerian Pariwisata dan Ekonomi Kreatif RI.', margin + 4, y + 11);
      }
    } catch {}
  }

  // ==============================================================
  // 6. BACK COVER
  // ==============================================================
  doc.addPage();
  pageNumber++;

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

  // SAVE FILE DIRECTLY (Zero Popups)
  const filename = isEn ? 'Master-Booklet-West-Sumatra-Guide-2026.pdf' : 'Master-E-Booklet-Pariwisata-Budaya-Sumbar-2026.pdf';
  
  const pdfBlob = doc.output('blob');
  const blobUrl = URL.createObjectURL(pdfBlob);
  const downloadAnchor = document.createElement('a');
  downloadAnchor.href = blobUrl;
  downloadAnchor.download = filename;
  downloadAnchor.style.display = 'none';
  document.body.appendChild(downloadAnchor);
  downloadAnchor.click();
  setTimeout(() => {
    document.body.removeChild(downloadAnchor);
    URL.revokeObjectURL(blobUrl);
  }, 3000);
}
