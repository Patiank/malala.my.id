import { jsPDF } from 'jspdf';
import { Destination, CultureItem, CulinaryItem, EventItem, FormAIResponse } from '../types';
import { DESTINATIONS, CULTURE_ITEMS, CULINARY_ITEMS, EVENTS_SCHEDULE, BG_IMAGE_1 } from '../data/content';

interface BookletData {
  destinations?: Destination[];
  cultureItems?: CultureItem[];
  culinaryItems?: CulinaryItem[];
  eventItems?: EventItem[];
  lang?: 'id' | 'en';
}

/**
 * DIRECT SILENT PDF GENERATOR (Guaranteed 100% Filled Pages, Zero Blank Paper, Zero Canvas Taint)
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
      // Header
      doc.setFillColor(15, 23, 42); // slate-900
      doc.rect(0, 0, pageWidth, 11, 'F');

      doc.setFillColor(220, 38, 38); // red-600
      doc.rect(0, 11, pageWidth, 1, 'F');

      doc.setFont('helvetica', 'bold');
      doc.setFontSize(7.5);
      doc.setTextColor(251, 191, 36); // amber-400
      doc.text('MALALA 2026 • MINANGKAOS', margin, 7.5);

      doc.setFont('helvetica', 'bold');
      doc.setFontSize(7.5);
      doc.setTextColor(255, 255, 255);
      doc.text(`${(categoryLabel || '').toUpperCase()} — ${(subCategory || '').toUpperCase()}`, pageWidth - margin, 7.5, { align: 'right' });

      // Footer
      doc.setFillColor(248, 250, 252);
      doc.rect(0, pageHeight - 10, pageWidth, 10, 'F');
      doc.setDrawColor(226, 232, 240);
      doc.line(0, pageHeight - 10, pageWidth, pageHeight - 10);

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(7.5);
      doc.setTextColor(100, 116, 139);
      doc.text('Direktori Wisata & Budaya • https://malala.my.id', margin, pageHeight - 4);
      doc.setFont('helvetica', 'bold');
      doc.text(`${isEn ? 'Page' : 'Hal.'} ${pageNumber}`, pageWidth - margin, pageHeight - 4, { align: 'right' });
    } catch {}
  };

  // ==============================================================
  // 1. COVER PAGE - CLEAN MINIMALIST DESIGN
  // ==============================================================
  doc.setFillColor(15, 23, 42); // Deep Charcoal Slate
  doc.rect(0, 0, pageWidth, pageHeight, 'F');

  // Red & Gold accent bands
  doc.setFillColor(220, 38, 38);
  doc.rect(0, 0, 12, pageHeight, 'F');
  doc.setFillColor(217, 119, 6);
  doc.rect(12, 0, 3, pageHeight, 'F');

  // Header pill badge
  doc.setFillColor(220, 38, 38);
  doc.roundedRect(25, 30, 110, 7, 1.5, 1.5, 'F');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7.5);
  doc.setTextColor(255, 255, 255);
  doc.text(isEn ? 'SPECIAL EDITION PUBLICATION 2026' : 'EDISI SPESIAL MINANGKAOS 2026', 28, 34.8);

  // Main Title
  doc.setFontSize(32);
  doc.setTextColor(255, 255, 255);
  doc.text('MALALA 2026', 25, 50);

  // Subtitle
  doc.setFontSize(16);
  doc.setTextColor(239, 68, 68);
  doc.text(isEn ? 'WEST SUMATRA TRAVEL & CULTURAL GUIDE' : 'PANDUAN LENGKAP WISATA & BUDAYA RANAH MINANG', 25, 60);

  // Clean description
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9.5);
  doc.setTextColor(203, 213, 225);
  const coverDesc = isEn
    ? 'Master compilation of 38 Iconic Destinations, 22 Living Cultural Traditions, 26 Authentic Culinaries, and 20 Official Events & KEN 2026.'
    : 'Kompilasi master data 38 destinasi wisata unggulan, 22 tradisi adat luhur, 26 kuliner gastronomi otentik, serta 20 kalender festival KEN 2026.';
  doc.text(doc.splitTextToSize(coverDesc, 155), 25, 72);

  // Clean Minimalist Stats Grid Box
  doc.setFillColor(30, 41, 59);
  doc.roundedRect(25, 96, 160, 48, 3, 3, 'F');
  doc.setDrawColor(51, 65, 85);
  doc.roundedRect(25, 96, 160, 48, 3, 3, 'S');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.setTextColor(251, 191, 36);
  doc.text(isEn ? 'MASTER CATALOG SUMMARY' : 'RINGKASAN MASTER KATALOG LENGKAP', 32, 107);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(241, 245, 249);
  doc.text(`• Bab I   : ${destinations.length} ${isEn ? 'Iconic Destinations (Geoparks, Lakes, Islands & UNESCO Heritage)' : 'Destinasi Wisata Pilihan (Alam, Geopark, Bahari & UNESCO)'}`, 32, 116);
  doc.text(`• Bab II  : ${cultureItems.length} ${isEn ? 'Sacred Minangkabau Cultural Traditions & Social Heritage' : 'Warisan Luhur Adat & Kebudayaan Minangkabau'}`, 32, 123);
  doc.text(`• Bab III : ${culinaryItems.length} ${isEn ? 'Authentic Gastronomic Heritage Culinaries & Signature Dishes' : 'Kuliner & Gastronomi Warisan Leluhur Minangkabau'}`, 32, 130);
  doc.text(`• Bab IV  : ${eventItems.length} ${isEn ? 'Events & Karisma Event Nusantara (KEN) 2026 Calendar' : 'Kalender Event Festival & KEN 2026'}`, 32, 137);

  // Minang Philosophy Box
  doc.setFillColor(220, 38, 38);
  doc.rect(25, 168, 3.5, 30, 'F');

  doc.setFont('helvetica', 'italic');
  doc.setFontSize(10.5);
  doc.setTextColor(253, 230, 138);
  doc.text('"Adat Basandi Syarak, Syarak Basandi Kitabullah"', 34, 178);
  doc.text('"Alam Takambang Jadi Guru"', 34, 185);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(148, 163, 184);
  doc.text(isEn ? 'Fostering cultural integrity and natural conservation in West Sumatra.' : 'Falsafah keluhuran kearifan lokal dan harmoni alam semesta Ranah Minang.', 34, 193);

  // Publisher Footer
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.5);
  doc.setTextColor(255, 255, 255);
  doc.text(isEn ? 'PRESENTED BY:' : 'DIPERSEMBAHKAN OLEH:', 25, 255);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(203, 213, 225);
  doc.text('MINANGKAOS', 25, 261);
  doc.text('Sumatera Barat, Indonesia • 2026', 25, 266);
  doc.text('Platform: https://malala.my.id', 25, 271);

  // ==============================================================
  // 2. BAB I: 26 DESTINASI WISATA (1 HALAMAN PER ITEM)
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

      // Banner Header Box
      doc.setFillColor(30, 41, 59);
      doc.roundedRect(margin, y, contentWidth, 36, 2, 2, 'F');
      doc.setFillColor(220, 38, 38);
      doc.rect(margin, y + 34, contentWidth, 2, 'F');

      doc.setFillColor(0, 0, 0);
      doc.roundedRect(margin + 4, y + 4, 36, 6, 1.5, 1.5, 'F');
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(7);
      doc.setTextColor(255, 255, 255);
      doc.text(category.toUpperCase(), margin + 22, y + 8.2, { align: 'center' });

      doc.setFont('helvetica', 'bold');
      doc.setFontSize(13);
      doc.setTextColor(255, 255, 255);
      doc.text(title, margin + contentWidth / 2, y + 21, { align: 'center' });

      y += 42;

      // Location
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(9);
      doc.setTextColor(220, 38, 38);
      doc.text(`📍 ${location}`, margin, y);

      y += 3.5;
      doc.setDrawColor(226, 232, 240);
      doc.setLineWidth(0.4);
      doc.line(margin, y, pageWidth - margin, y);
      y += 5;

      // Full Narrative
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

      // Highlights Box
      if (highlights.length > 0) {
        y += 1;
        const boxHeight = 9 + (highlights.length * 4.8);
        doc.setFillColor(248, 250, 252);
        doc.roundedRect(margin, y, contentWidth, boxHeight, 2, 2, 'F');
        doc.setDrawColor(226, 232, 240);
        doc.roundedRect(margin, y, contentWidth, boxHeight, 2, 2, 'S');

        doc.setFont('helvetica', 'bold');
        doc.setFontSize(8);
        doc.setTextColor(15, 23, 42);
        doc.text(isEn ? 'KEY HIGHLIGHTS & ATTRACTIONS' : 'DAYA TARIK UTAMA (HIGHLIGHTS)', margin + 4, y + 5.5);

        doc.setFont('helvetica', 'normal');
        doc.setFontSize(7.5);
        doc.setTextColor(51, 65, 85);
        let hlY = y + 10.2;
        highlights.forEach((hl) => {
          doc.text(`✓  ${hl}`, margin + 5, hlY);
          hlY += 4.8;
        });

        y += boxHeight + 4;
      }

      // Best Time
      if (bestTime) {
        doc.setFillColor(254, 243, 199);
        doc.roundedRect(margin, y, contentWidth, 7.5, 1.5, 1.5, 'F');
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(7.5);
        doc.setTextColor(180, 83, 9);
        doc.text(`⏰ ${isEn ? 'Best Time to Visit:' : 'Waktu Terbaik Berkunjung:'} ${bestTime}`, margin + 4, y + 5.2);
      }
    } catch {}
  }

  // ==============================================================
  // 3. BAB II: 14 WARISAN BUDAYA
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
      doc.roundedRect(margin, y, contentWidth, 36, 2, 2, 'F');
      doc.setFillColor(217, 119, 6);
      doc.rect(margin, y + 34, contentWidth, 2, 'F');

      doc.setFillColor(217, 119, 6);
      doc.roundedRect(margin + 4, y + 4, 38, 6, 1.5, 1.5, 'F');
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(7);
      doc.setTextColor(255, 255, 255);
      doc.text(category.toUpperCase(), margin + 23, y + 8.2, { align: 'center' });

      doc.setFont('helvetica', 'bold');
      doc.setFontSize(13);
      doc.setTextColor(255, 255, 255);
      doc.text(title, margin + contentWidth / 2, y + 21, { align: 'center' });

      y += 42;

      doc.setFont('helvetica', 'bold');
      doc.setFontSize(9);
      doc.setTextColor(180, 83, 9);
      doc.text(`🏛️ ${isEn ? 'Origin:' : 'Asal Nagari:'} ${origin}`, margin, y);

      y += 3.5;
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
        doc.roundedRect(margin, y, contentWidth, 22, 2, 2, 'F');
        doc.setDrawColor(253, 230, 138);
        doc.roundedRect(margin, y, contentWidth, 22, 2, 2, 'S');

        doc.setFont('helvetica', 'bold');
        doc.setFontSize(8);
        doc.setTextColor(146, 64, 14);
        doc.text(isEn ? 'MINANGKABAU CUSTOMARY PHILOSOPHY' : 'FALSAFAH & MAKNA ADAT MINANGKABAU', margin + 4, y + 5.5);

        doc.setFont('helvetica', 'italic');
        doc.setFontSize(8);
        doc.setTextColor(120, 53, 15);
        const splitPhil = doc.splitTextToSize(`"${philosophy}"`, contentWidth - 8);
        doc.text(splitPhil, margin + 4, y + 12);
      }
    } catch {}
  }

  // ==============================================================
  // 4. BAB III: 16 KULINER OTENTIK
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
      doc.roundedRect(margin, y, contentWidth, 36, 2, 2, 'F');
      doc.setFillColor(220, 38, 38);
      doc.rect(margin, y + 34, contentWidth, 2, 'F');

      doc.setFillColor(220, 38, 38);
      doc.roundedRect(margin + 4, y + 4, 36, 6, 1.5, 1.5, 'F');
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(7);
      doc.setTextColor(255, 255, 255);
      doc.text(category.toUpperCase(), margin + 22, y + 8.2, { align: 'center' });

      doc.setFont('helvetica', 'bold');
      doc.setFontSize(13);
      doc.setTextColor(255, 255, 255);
      doc.text(title, margin + contentWidth / 2, y + 21, { align: 'center' });

      y += 42;

      doc.setFont('helvetica', 'bold');
      doc.setFontSize(9);
      doc.setTextColor(225, 29, 72);
      doc.text(`🍲 ${isEn ? 'Heritage Origin:' : 'Asal Kuliner:'} ${origin}`, margin, y);

      y += 3.5;
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
      doc.roundedRect(margin, y, contentWidth, 18, 2, 2, 'F');
      doc.setDrawColor(254, 205, 211);
      doc.roundedRect(margin, y, contentWidth, 18, 2, 2, 'S');

      doc.setFont('helvetica', 'bold');
      doc.setFontSize(7.5);
      doc.setTextColor(159, 18, 57);
      doc.text(`🥘 ${isEn ? 'Main Ingredients & Spices:' : 'Bahan & Rempah Utama:'}`, margin + 4, y + 5);
      doc.setFont('helvetica', 'normal');
      doc.text(ingredients.join(', '), margin + 4, y + 9.5);

      if (taste) {
        doc.setFont('helvetica', 'bold');
        doc.text(`👅 ${isEn ? 'Taste Profile:' : 'Karakter Rasa:'} ${taste}`, margin + 4, y + 14);
      }
    } catch {}
  }

  // ==============================================================
  // 5. BAB IV: 20 KALENDER EVENT & KEN 2026
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
      doc.roundedRect(margin, y, contentWidth, 36, 2, 2, 'F');
      doc.setFillColor(ev.isKen ? 220 : 71, ev.isKen ? 38 : 85, ev.isKen ? 38 : 105);
      doc.rect(margin, y + 34, contentWidth, 2, 'F');

      doc.setFillColor(ev.isKen ? 220 : 15, ev.isKen ? 38 : 23, ev.isKen ? 38 : 42);
      doc.roundedRect(margin + 4, y + 4, ev.isKen ? 50 : 34, 6, 1.5, 1.5, 'F');
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(7);
      doc.setTextColor(255, 255, 255);
      doc.text(ev.isKen ? '⭐ OFFICIAL KEN 2026' : 'FESTIVAL RESMI', margin + (ev.isKen ? 29 : 21), y + 8.2, { align: 'center' });

      doc.setFont('helvetica', 'bold');
      doc.setFontSize(12.5);
      doc.setTextColor(255, 255, 255);
      doc.text(title, margin + contentWidth / 2, y + 21, { align: 'center' });

      y += 42;

      doc.setFont('helvetica', 'bold');
      doc.setFontSize(9);
      doc.setTextColor(ev.isKen ? 220 : 71, ev.isKen ? 38 : 85, ev.isKen ? 38 : 105);
      doc.text(`📅 ${schedule}  •  📍 ${location}`, margin, y);

      y += 3.5;
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
        doc.roundedRect(margin, y, contentWidth, 14, 2, 2, 'F');
        doc.setDrawColor(254, 202, 202);
        doc.roundedRect(margin, y, contentWidth, 14, 2, 2, 'S');

        doc.setFont('helvetica', 'bold');
        doc.setFontSize(8);
        doc.setTextColor(185, 28, 28);
        doc.text(isEn ? '⭐ OFFICIAL KARISMA EVENT NUSANTARA (KEN) 2026' : '⭐ EVENT UNGGULAN KARISMA EVENT NUSANTARA (KEN) 2026', margin + 4, y + 5);

        doc.setFont('helvetica', 'normal');
        doc.setFontSize(7.5);
        doc.setTextColor(153, 27, 27);
        doc.text(isEn ? 'Curated and recognized by the Ministry of Tourism and Creative Economy.' : 'Terkurasi resmi oleh Kementerian Pariwisata dan Ekonomi Kreatif RI.', margin + 4, y + 9.8);
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
  doc.text('Presented by: MINANGKAOS', pageWidth / 2, 137, { align: 'center' });
  doc.text('Sumatera Barat, Indonesia', pageWidth / 2, 144, { align: 'center' });
  doc.text('Instagram: @minangkaos', pageWidth / 2, 151, { align: 'center' });
  doc.text('Platform: https://malala.my.id', pageWidth / 2, 158, { align: 'center' });

  doc.setFont('helvetica', 'italic');
  doc.setFontSize(8.5);
  doc.setTextColor(148, 163, 184);
  doc.text(isEn ? '© 2026 Malala • MINANGKAOS. All rights reserved.' : '© 2026 Malala • MINANGKAOS. Hak Cipta Dilindungi.', pageWidth / 2, 230, { align: 'center' });

  // SAVE FILE DIRECTLY (Zero Popups, Zero Blank Pages)
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

/**
 * DIRECT SILENT A4 ITINERARY PDF GENERATOR
 * Downloads directly without opening printer dialog or popup windows.
 */
export async function generateItineraryPDF(
  aiResponse: FormAIResponse,
  lang: 'id' | 'en' = 'id'
): Promise<void> {
  const isEn = lang === 'en';

  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  const pageWidth = 210;
  const pageHeight = 297;
  const margin = 14;
  const contentWidth = pageWidth - margin * 2; // 182mm
  let y = 14;

  const addRunningHeader = () => {
    doc.setFillColor(15, 23, 42); // slate-900
    doc.rect(0, 0, pageWidth, 11, 'F');
    doc.setFillColor(220, 38, 38); // red-600
    doc.rect(0, 11, pageWidth, 0.8, 'F');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(7.5);
    doc.setTextColor(251, 191, 36); // amber-400
    doc.text('MALALA • PANDUAN WISATA SUMATERA BARAT', margin, 7.2);

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(7.5);
    doc.setTextColor(255, 255, 255);
    doc.text(
      isEn ? 'OFFICIAL AI TRIP ITINERARY' : 'RENCANA WISATA RESMI AI',
      pageWidth - margin,
      7.2,
      { align: 'right' }
    );
  };

  const checkPageBreak = (neededHeight: number) => {
    if (y + neededHeight > pageHeight - 16) {
      doc.addPage();
      y = 16;
      addRunningHeader();
    }
  };

  // 1. First Page Header Banner (Dark Elegant Banner)
  doc.setFillColor(15, 23, 42); // slate-900
  doc.rect(0, 0, pageWidth, 28, 'F');

  doc.setFillColor(220, 38, 38); // red-600 accent bar
  doc.rect(0, 28, pageWidth, 1.2, 'F');

  // Brand Name
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(16);
  doc.setTextColor(255, 255, 255);
  doc.text('MALALA', margin, 12);
  const brandWidth = doc.getTextWidth('MALALA');

  doc.setTextColor(239, 68, 68); // red-500
  doc.text('.my.id', margin + brandWidth, 12);

  // Tagline
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.5);
  doc.setTextColor(251, 191, 36); // amber-400
  doc.text(
    isEn
      ? 'AI-POWERED WEST SUMATRA TOURISM GUIDE'
      : 'PANDUAN WISATA SUMATERA BARAT BERBASIS AI',
    margin,
    18
  );

  // Official Badge Pill (Right)
  doc.setFillColor(220, 38, 38);
  doc.roundedRect(pageWidth - margin - 52, 7.5, 52, 7.5, 1.5, 1.5, 'F');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7);
  doc.setTextColor(255, 255, 255);
  doc.text(
    isEn ? 'OFFICIAL TRIP PLAN' : 'RENCANA WISATA RESMI',
    pageWidth - margin - 26,
    12.2,
    { align: 'center' }
  );

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(6.5);
  doc.setTextColor(203, 213, 225);
  const genDate = new Date().toLocaleDateString(isEn ? 'en-US' : 'id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
  doc.text(
    `${isEn ? 'Created:' : 'Dibuat:'} ${genDate}`,
    pageWidth - margin,
    22,
    { align: 'right' }
  );

  y = 35;

  // 2. Title & Overview Summary Box
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(13);
  doc.setTextColor(15, 23, 42); // slate-900
  const titleLines = doc.splitTextToSize(aiResponse.title || 'Rencana Perjalanan Wisata', contentWidth);
  doc.text(titleLines, margin, y);
  y += titleLines.length * 5.5 + 2;

  if (aiResponse.summary) {
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8.5);
    const summaryLines = doc.splitTextToSize(aiResponse.summary, contentWidth - 8);
    const summaryBoxHeight = summaryLines.length * 4.2 + 6;

    checkPageBreak(summaryBoxHeight);
    doc.setFillColor(248, 250, 252); // slate-50
    doc.roundedRect(margin, y, contentWidth, summaryBoxHeight, 2, 2, 'F');
    doc.setDrawColor(226, 232, 240); // slate-200
    doc.roundedRect(margin, y, contentWidth, summaryBoxHeight, 2, 2, 'S');

    doc.setTextColor(51, 65, 85); // slate-700
    doc.text(summaryLines, margin + 4, y + 4.8);
    y += summaryBoxHeight + 5;
  }

  // 3. Day-by-Day Schedule
  if (aiResponse.itinerary && aiResponse.itinerary.length > 0) {
    aiResponse.itinerary.forEach((day) => {
      // Day Header Banner
      checkPageBreak(25);

      doc.setFillColor(24, 24, 27); // zinc-900
      doc.roundedRect(margin, y, contentWidth, 7, 1.2, 1.2, 'F');

      doc.setFont('helvetica', 'bold');
      doc.setFontSize(8);
      doc.setTextColor(251, 191, 36); // amber-400
      doc.text(`HARI ${day.day}`, margin + 3, y + 4.7);

      doc.setTextColor(255, 255, 255);
      const dayTitleText = (day.title || '').toUpperCase();
      doc.text(dayTitleText, margin + 20, y + 4.7);
      y += 10;

      // Activities
      if (day.activities && day.activities.length > 0) {
        day.activities.forEach((act) => {
          doc.setFont('helvetica', 'bold');
          doc.setFontSize(8);
          const timeText = act.time ? `[${act.time}]` : '[-]';
          const locText = act.location ? `📍 ${act.location}` : '';

          doc.setFont('helvetica', 'normal');
          doc.setFontSize(7.5);
          const actLines = doc.splitTextToSize(act.activity || '', contentWidth - 8);
          const tipLines = act.tips ? doc.splitTextToSize(`💡 ${act.tips}`, contentWidth - 10) : [];

          const actBlockHeight = 4.5 + actLines.length * 3.8 + (tipLines.length > 0 ? tipLines.length * 3.5 + 3 : 0) + 3;
          checkPageBreak(actBlockHeight);

          // Activity Card Background
          doc.setFillColor(248, 250, 252);
          doc.roundedRect(margin, y, contentWidth, actBlockHeight - 1.5, 1.5, 1.5, 'F');
          doc.setDrawColor(241, 245, 249);
          doc.roundedRect(margin, y, contentWidth, actBlockHeight - 1.5, 1.5, 1.5, 'S');

          // Header Time & Location
          doc.setFont('helvetica', 'bold');
          doc.setFontSize(7.8);
          doc.setTextColor(220, 38, 38);
          doc.text(timeText, margin + 3, y + 4);

          doc.setTextColor(15, 23, 42);
          doc.text(locText, margin + 32, y + 4);

          // Activity description
          doc.setFont('helvetica', 'normal');
          doc.setFontSize(7.5);
          doc.setTextColor(71, 85, 105);
          doc.text(actLines, margin + 3, y + 8.2);

          const currentActY = y + 8.2 + actLines.length * 3.8;

          // Activity Tips
          if (tipLines.length > 0) {
            doc.setFont('helvetica', 'italic');
            doc.setFontSize(7);
            doc.setTextColor(180, 83, 9); // amber-700
            doc.text(tipLines, margin + 4, currentActY + 1);
          }

          y += actBlockHeight + 1;
        });
      }

      // Culinary Recommendation Box for the Day
      if (day.culinaryRecommendation) {
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(7.5);
        const culLines = doc.splitTextToSize(day.culinaryRecommendation, contentWidth - 10);
        const culBoxHeight = culLines.length * 3.6 + 8;

        checkPageBreak(culBoxHeight + 2);

        doc.setFillColor(254, 243, 199); // amber-100
        doc.roundedRect(margin, y, contentWidth, culBoxHeight, 1.5, 1.5, 'F');
        doc.setDrawColor(252, 211, 77); // amber-300
        doc.roundedRect(margin, y, contentWidth, culBoxHeight, 1.5, 1.5, 'S');

        doc.setFont('helvetica', 'bold');
        doc.setFontSize(7.5);
        doc.setTextColor(146, 64, 14); // amber-800
        doc.text(
          isEn ? '🍲 Culinary Recommendation:' : '🍲 Rekomendasi Kuliner Minangkabau:',
          margin + 3,
          y + 4.5
        );

        doc.setFont('helvetica', 'normal');
        doc.setFontSize(7.3);
        doc.setTextColor(120, 53, 15); // amber-900
        doc.text(culLines, margin + 3, y + 8.5);

        y += culBoxHeight + 4;
      }

      y += 2;
    });
  }

  // 4. Local Wisdom & Ethics (Kearifan Lokal & Etika Minangkabau)
  if (aiResponse.localTips && aiResponse.localTips.length > 0) {
    checkPageBreak(25);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7.5);

    const tipsFormatted: string[] = [];
    aiResponse.localTips.forEach((tip) => {
      const splitTip = doc.splitTextToSize(`• ${tip}`, contentWidth - 8);
      tipsFormatted.push(...splitTip);
    });

    const tipsBoxHeight = tipsFormatted.length * 3.8 + 8;
    checkPageBreak(tipsBoxHeight + 2);

    doc.setFillColor(241, 245, 249); // slate-100
    doc.roundedRect(margin, y, contentWidth, tipsBoxHeight, 2, 2, 'F');
    doc.setDrawColor(203, 213, 225); // slate-300
    doc.roundedRect(margin, y, contentWidth, tipsBoxHeight, 2, 2, 'S');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8);
    doc.setTextColor(15, 23, 42); // slate-900
    doc.text(
      isEn
        ? '🏛️ Local Wisdom & Cultural Ethics in West Sumatra'
        : '🏛️ Kearifan Lokal & Etika Berwisata di Ranah Minang',
      margin + 4,
      y + 5
    );

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7.3);
    doc.setTextColor(51, 65, 85); // slate-700
    doc.text(tipsFormatted, margin + 4, y + 9.5);

    y += tipsBoxHeight + 5;
  }

  // 5. Stamp All Footers with total page count
  const totalPages = doc.getNumberOfPages();
  for (let i = 1; i <= totalPages; i++) {
    doc.setPage(i);
    doc.setDrawColor(226, 232, 240);
    doc.line(margin, pageHeight - 10, pageWidth - margin, pageHeight - 10);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7);
    doc.setTextColor(148, 163, 184); // slate-400
    doc.text(
      'Dibuat otomatis oleh UNI MALA AI • https://malala.my.id • Dokumen Standar A4',
      margin,
      pageHeight - 5.5
    );

    doc.setFont('helvetica', 'bold');
    doc.text(
      `${isEn ? 'Page' : 'Halaman'} ${i} / ${totalPages}`,
      pageWidth - margin,
      pageHeight - 5.5,
      { align: 'right' }
    );
  }

  // 6. Direct Silent Download (Zero Print Dialog, Zero Blank Windows)
  const cleanTitle = (aiResponse.title || 'Rencana-Wisata-Sumbar')
    .replace(/[^a-zA-Z0-9_-]/g, '-')
    .replace(/-+/g, '-')
    .slice(0, 35);
  const filename = `${cleanTitle}-A4-MALALA.pdf`;

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
