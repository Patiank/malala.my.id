import { jsPDF } from 'jspdf';
import { Destination, CultureItem, CulinaryItem, EventItem } from '../types';

interface BookletData {
  destinations: Destination[];
  cultureItems: CultureItem[];
  culinaryItems: CulinaryItem[];
  eventItems: EventItem[];
  lang?: 'id' | 'en';
}

const imageMemoryCache = new Map<string, string>();

/**
 * Safely converts an image URL to base64 Data URL with strict timeout and fallback
 */
async function getSafeImageData(url: string): Promise<string | null> {
  if (!url || typeof url !== 'string' || !url.startsWith('http')) return null;
  
  if (imageMemoryCache.has(url)) {
    return imageMemoryCache.get(url)!;
  }

  return new Promise((resolve) => {
    const timer = setTimeout(() => {
      resolve(null);
    }, 1200); // 1.2s timeout per image

    try {
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.onload = () => {
        clearTimeout(timer);
        try {
          const canvas = document.createElement('canvas');
          const w = Math.min(img.naturalWidth || 600, 800);
          const h = Math.min(img.naturalHeight || 400, 500);
          canvas.width = w;
          canvas.height = h;
          const ctx = canvas.getContext('2d');
          if (ctx) {
            ctx.drawImage(img, 0, 0, w, h);
            const dataUrl = canvas.toDataURL('image/jpeg', 0.8);
            if (dataUrl && dataUrl.startsWith('data:image')) {
              imageMemoryCache.set(url, dataUrl);
              resolve(dataUrl);
              return;
            }
          }
          resolve(null);
        } catch {
          resolve(null);
        }
      };
      img.onerror = () => {
        clearTimeout(timer);
        resolve(null);
      };
      img.src = url;
    } catch {
      clearTimeout(timer);
      resolve(null);
    }
  });
}

/**
 * Pre-caches images in small parallel batches to prevent browser lockup
 */
async function preloadCatalogImages(urls: string[]) {
  const cleanUrls = urls.filter(u => u && u.startsWith('http') && !imageMemoryCache.has(u));
  const batchSize = 6;
  for (let i = 0; i < cleanUrls.length; i += batchSize) {
    const batch = cleanUrls.slice(i, i + batchSize);
    await Promise.allSettled(batch.map(url => getSafeImageData(url)));
  }
}

/**
 * Generates an official A4 Master E-Booklet where EACH catalog item has its own FULL PAGE (modal-exact layout)
 */
export async function generateSumbarBookletPDF(data: BookletData): Promise<void> {
  const isEn = data.lang === 'en';
  
  // 1. Gather all image URLs and pre-load in background batches
  const allImageUrls: string[] = [
    ...(data.destinations || []).map(d => d.imageUrl),
    ...(data.cultureItems || []).map(c => c.imageUrl),
    ...(data.culinaryItems || []).map(cu => cu.imageUrl),
    ...(data.eventItems || []).map(e => e.imageUrl),
  ].filter(Boolean) as string[];

  try {
    await preloadCatalogImages(allImageUrls);
  } catch (e) {
    console.warn("Preload images warning:", e);
  }

  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
    compress: true
  });

  const pageWidth = 210;
  const pageHeight = 297;
  const margin = 14;
  const contentWidth = pageWidth - margin * 2; // 182mm
  let pageNumber = 1;

  const addHeaderFooter = (categoryLabel: string, subCategory: string) => {
    try {
      // Header Bar
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
      doc.text(`${categoryLabel.toUpperCase()} — ${subCategory.toUpperCase()}`, pageWidth - margin, 7.5, { align: 'right' });

      // Footer Bar
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
  doc.setFillColor(15, 23, 42); // slate-900
  doc.rect(0, 0, pageWidth, pageHeight, 'F');

  // Side decorative stripes
  doc.setFillColor(220, 38, 38); // Red
  doc.rect(0, 0, 12, pageHeight, 'F');
  doc.setFillColor(217, 119, 6); // Gold
  doc.rect(12, 0, 3, pageHeight, 'F');

  // Header tag
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.setTextColor(251, 191, 36);
  doc.text(isEn ? 'OFFICIAL TOURISM & CULTURAL MASTER CATALOG 2026' : 'MASTER KATALOG RESMI PARIWISATA & KEBUDAYAAN 2026', 25, 38);

  // Main Titles
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

  // Summary Stat Cards Box
  doc.setFillColor(30, 41, 59);
  doc.roundedRect(25, 100, 165, 50, 3, 3, 'F');
  doc.setDrawColor(217, 119, 6);
  doc.roundedRect(25, 100, 165, 50, 3, 3, 'S');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.setTextColor(251, 191, 36);
  doc.text(isEn ? 'CATALOG OVERVIEW (1 PAGE PER ITEM)' : 'DAFTAR MASTER KATALOG (1 HALAMAN PER OBJEK)', 32, 112);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(255, 255, 255);
  doc.text(`• Bab I   : 26 ${isEn ? 'Iconic Destinations (Geoparks, Lakes, Islands & UNESCO Heritage)' : 'Destinasi Wisata Pilihan (Alam, Geopark, Bahari & UNESCO)'}`, 32, 122);
  doc.text(`• Bab II  : 14 ${isEn ? 'Sacred Minangkabau Cultural Traditions & Social Heritage' : 'Warisan Luhur Adat & Kebudayaan Minangkabau'}`, 32, 129);
  doc.text(`• Bab III : 16 ${isEn ? 'Authentic Gastronomic Heritage Culinaries & Signature Dishes' : 'Kuliner & Gastronomi Warisan Leluhur Minangkabau'}`, 32, 136);
  doc.text(`• Bab IV  : 20 ${isEn ? 'Official Events & Karisma Event Nusantara (KEN) 2026 Calendar' : 'Kalender Event Resmi Dinas Pariwisata & KEN Kemenparekraf 2026'}`, 32, 143);

  // Philosophy Box
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

  // Bottom Metadata
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
  // 2. BAB I: DESTINASI WISATA (1 HALAMAN PENUH PER DESTINASI)
  // ==============================================================
  const destinations = data.destinations || [];
  for (let i = 0; i < destinations.length; i++) {
    const dest = destinations[i];
    doc.addPage();
    pageNumber++;
    addHeaderFooter(isEn ? 'Destinations' : 'Destinasi Wisata', dest.regency || 'Sumatera Barat');

    const title = (isEn && dest.titleEn ? dest.titleEn : dest.title).toUpperCase();
    const category = isEn && dest.categoryEn ? dest.categoryEn : dest.category;
    const location = isEn && dest.locationDetailsEn ? dest.locationDetailsEn : (dest.locationDetails || dest.regency || 'Sumatera Barat');
    const desc = isEn && dest.descriptionEn ? dest.descriptionEn : dest.description;
    const highlights = (isEn && dest.highlightsEn ? dest.highlightsEn : dest.highlights) || [];
    const bestTime = isEn && dest.bestTimeEn ? dest.bestTimeEn : dest.bestTime;

    let y = 16;

    // 1. Image Header Banner (Width: 182mm, Height: 70mm)
    const imgData = dest.imageUrl ? imageMemoryCache.get(dest.imageUrl) : null;
    let hasImage = false;
    if (imgData) {
      try {
        doc.addImage(imgData, 'JPEG', margin, y, contentWidth, 70);
        hasImage = true;
      } catch {
        hasImage = false;
      }
    }

    if (!hasImage) {
      doc.setFillColor(30, 41, 59);
      doc.roundedRect(margin, y, contentWidth, 70, 2, 2, 'F');
      doc.setFillColor(220, 38, 38);
      doc.rect(margin, y + 68, contentWidth, 2, 'F');
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(13);
      doc.setTextColor(255, 255, 255);
      doc.text(title, margin + contentWidth / 2, y + 35, { align: 'center' });
    }

    // Category Pill Overlay
    doc.setFillColor(0, 0, 0);
    doc.roundedRect(margin + 4, y + 4, 38, 7, 1.5, 1.5, 'F');
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(7.5);
    doc.setTextColor(255, 255, 255);
    doc.text(category.toUpperCase(), margin + 23, y + 8.8, { align: 'center' });

    y += 75;

    // 2. Title & Regency
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(14);
    doc.setTextColor(15, 23, 42); // slate-900
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

    // 3. Full Detailed Narrative Paragraphs
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8.5);
    doc.setTextColor(51, 65, 85); // slate-700
    const paragraphs = (desc || '').split('\n\n').filter(Boolean);
    paragraphs.forEach((p) => {
      const cleanP = p.replace(/\n/g, ' ').trim();
      const splitP = doc.splitTextToSize(cleanP, contentWidth);
      doc.text(splitP, margin, y);
      y += (splitP.length * 3.8) + 3;
    });

    // 4. Highlights Box
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

    // 5. Best Time to Visit Footer Row
    if (bestTime) {
      doc.setFillColor(254, 243, 199); // amber-100
      doc.roundedRect(margin, y, contentWidth, 9, 1.5, 1.5, 'F');
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(8);
      doc.setTextColor(180, 83, 9); // amber-700
      doc.text(`⏰ ${isEn ? 'Best Time to Visit:' : 'Waktu Terbaik Berkunjung:'} ${bestTime}`, margin + 4, y + 6);
    }
  }

  // ==============================================================
  // 3. BAB II: WARISAN BUDAYA (1 HALAMAN PENUH PER BUDAYA)
  // ==============================================================
  const cultures = data.cultureItems || [];
  for (let i = 0; i < cultures.length; i++) {
    const cult = cultures[i];
    doc.addPage();
    pageNumber++;
    addHeaderFooter(isEn ? 'Culture & Heritage' : 'Warisan Budaya', cult.category || 'Adat Minang');

    const title = (isEn && cult.titleEn ? cult.titleEn : cult.title).toUpperCase();
    const category = isEn && cult.categoryEn ? cult.categoryEn : cult.category;
    const origin = isEn && cult.originEn ? cult.originEn : (cult.origin || 'Alam Minangkabau');
    const desc = isEn && cult.descriptionEn ? cult.descriptionEn : cult.description;
    const philosophy = isEn && cult.philosophyEn ? cult.philosophyEn : cult.philosophy;

    let y = 16;

    // 1. Image Header Banner
    const imgData = cult.imageUrl ? imageMemoryCache.get(cult.imageUrl) : null;
    let hasImage = false;
    if (imgData) {
      try {
        doc.addImage(imgData, 'JPEG', margin, y, contentWidth, 70);
        hasImage = true;
      } catch {
        hasImage = false;
      }
    }

    if (!hasImage) {
      doc.setFillColor(69, 26, 3);
      doc.roundedRect(margin, y, contentWidth, 70, 2, 2, 'F');
      doc.setFillColor(217, 119, 6);
      doc.rect(margin, y + 68, contentWidth, 2, 'F');
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(13);
      doc.setTextColor(255, 255, 255);
      doc.text(title, margin + contentWidth / 2, y + 35, { align: 'center' });
    }

    // Category badge
    doc.setFillColor(217, 119, 6);
    doc.roundedRect(margin + 4, y + 4, 40, 7, 1.5, 1.5, 'F');
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(7.5);
    doc.setTextColor(255, 255, 255);
    doc.text(category.toUpperCase(), margin + 24, y + 8.8, { align: 'center' });

    y += 75;

    // 2. Title & Origin
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(14);
    doc.setTextColor(120, 53, 15); // amber-900
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

    // 3. Narrative Description
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8.5);
    doc.setTextColor(68, 64, 60);
    const paragraphs = (desc || '').split('\n\n').filter(Boolean);
    paragraphs.forEach((p) => {
      const cleanP = p.replace(/\n/g, ' ').trim();
      const splitP = doc.splitTextToSize(cleanP, contentWidth);
      doc.text(splitP, margin, y);
      y += (splitP.length * 3.8) + 3;
    });

    // 4. Customary Philosophy Box
    if (philosophy) {
      y += 2;
      doc.setFillColor(254, 252, 232); // amber-50
      doc.roundedRect(margin, y, contentWidth, 24, 2, 2, 'F');
      doc.setDrawColor(253, 230, 138);
      doc.roundedRect(margin, y, contentWidth, 24, 2, 2, 'S');

      doc.setFont('helvetica', 'bold');
      doc.setFontSize(8.5);
      doc.setTextColor(146, 64, 14);
      doc.text(isEn ? 'MINANGKABAU CUSTOMARY PHILOSOPHY' : 'FALSAFAH & MAKNA ADAT MINANGKABAU', margin + 4, y + 6.5);

      doc.setFont('helvetica', 'bolditalic');
      doc.setFontSize(8.5);
      doc.setTextColor(120, 53, 15);
      const splitPhil = doc.splitTextToSize(`"${philosophy}"`, contentWidth - 8);
      doc.text(splitPhil, margin + 4, y + 13.5);
    }
  }

  // ==============================================================
  // 4. BAB III: KULINER OTENTIK (1 HALAMAN PENUH PER KULINER)
  // ==============================================================
  const culinaries = data.culinaryItems || [];
  for (let i = 0; i < culinaries.length; i++) {
    const cul = culinaries[i];
    doc.addPage();
    pageNumber++;
    addHeaderFooter(isEn ? 'Authentic Gastronomy' : 'Kuliner Otentik Minang', cul.category || 'Kuliner Tradisional');

    const title = (isEn && cul.titleEn ? cul.titleEn : cul.title).toUpperCase();
    const category = isEn && cul.categoryEn ? cul.categoryEn : cul.category;
    const origin = isEn && cul.originEn ? cul.originEn : (cul.origin || 'Ranah Minang');
    const desc = isEn && cul.descriptionEn ? cul.descriptionEn : cul.description;
    const ingredients = (isEn && cul.mainIngredientsEn ? cul.mainIngredientsEn : cul.mainIngredients) || [];
    const taste = isEn && cul.tasteProfileEn ? cul.tasteProfileEn : cul.tasteProfile;
    const philosophy = isEn && cul.culturalPhilosophyEn ? cul.culturalPhilosophyEn : cul.culturalPhilosophy;

    let y = 16;

    // 1. Image Header Banner
    const imgData = cul.imageUrl ? imageMemoryCache.get(cul.imageUrl) : null;
    let hasImage = false;
    if (imgData) {
      try {
        doc.addImage(imgData, 'JPEG', margin, y, contentWidth, 70);
        hasImage = true;
      } catch {
        hasImage = false;
      }
    }

    if (!hasImage) {
      doc.setFillColor(76, 29, 44);
      doc.roundedRect(margin, y, contentWidth, 70, 2, 2, 'F');
      doc.setFillColor(220, 38, 38);
      doc.rect(margin, y + 68, contentWidth, 2, 'F');
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(13);
      doc.setTextColor(255, 255, 255);
      doc.text(title, margin + contentWidth / 2, y + 35, { align: 'center' });
    }

    // Category badge
    doc.setFillColor(220, 38, 38);
    doc.roundedRect(margin + 4, y + 4, 38, 7, 1.5, 1.5, 'F');
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(7.5);
    doc.setTextColor(255, 255, 255);
    doc.text(category.toUpperCase(), margin + 23, y + 8.8, { align: 'center' });

    y += 75;

    // 2. Title & Origin
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(14);
    doc.setTextColor(159, 18, 57); // rose-900
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

    // 3. Narrative Description
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8.5);
    doc.setTextColor(76, 29, 44);
    const paragraphs = (desc || '').split('\n\n').filter(Boolean);
    paragraphs.forEach((p) => {
      const cleanP = p.replace(/\n/g, ' ').trim();
      const splitP = doc.splitTextToSize(cleanP, contentWidth);
      doc.text(splitP, margin, y);
      y += (splitP.length * 3.8) + 3;
    });

    // 4. Ingredients & Flavor Box
    y += 2;
    doc.setFillColor(255, 241, 242); // rose-50
    doc.roundedRect(margin, y, contentWidth, 22, 2, 2, 'F');
    doc.setDrawColor(254, 205, 211);
    doc.roundedRect(margin, y, contentWidth, 22, 2, 2, 'S');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8);
    doc.setTextColor(159, 18, 57);
    doc.text(`🥘 ${isEn ? 'Main Ingredients & Spices:' : 'Bahan & Rempah Utama:'}`, margin + 4, y + 6);
    doc.setFont('helvetica', 'normal');
    doc.text(ingredients.join(', '), margin + 4, y + 11);

    if (taste) {
      doc.setFont('helvetica', 'bold');
      doc.text(`👅 ${isEn ? 'Taste Profile:' : 'Karakter Rasa:'} ${taste}`, margin + 4, y + 17);
    }

    // 5. Gastronomic Philosophy
    if (philosophy) {
      y += 26;
      doc.setFillColor(248, 250, 252);
      doc.roundedRect(margin, y, contentWidth, 12, 1.5, 1.5, 'F');
      doc.setFont('helvetica', 'italic');
      doc.setFontSize(7.5);
      doc.setTextColor(71, 85, 105);
      doc.text(`📜 "${philosophy}"`, margin + 4, y + 7);
    }
  }

  // ==============================================================
  // 5. BAB IV: KALENDER EVENT & KEN 2026 (1 HALAMAN PENUH PER EVENT)
  // ==============================================================
  const events = data.eventItems || [];
  for (let i = 0; i < events.length; i++) {
    const ev = events[i];
    doc.addPage();
    pageNumber++;
    addHeaderFooter(isEn ? 'Calendar of Events' : 'Kalender Event 2026', ev.isKen ? 'Karisma Event Nusantara' : 'Festival Sumbar');

    const title = (isEn && ev.titleEn ? ev.titleEn : ev.title).toUpperCase();
    const schedule = isEn && ev.scheduleEn ? ev.scheduleEn : ev.schedule;
    const location = isEn && ev.locationEn ? ev.locationEn : ev.location;
    const desc = isEn && ev.descriptionEn ? ev.descriptionEn : ev.description;

    let y = 16;

    // 1. Image Header Banner
    const imgData = ev.imageUrl ? imageMemoryCache.get(ev.imageUrl) : null;
    let hasImage = false;
    if (imgData) {
      try {
        doc.addImage(imgData, 'JPEG', margin, y, contentWidth, 70);
        hasImage = true;
      } catch {
        hasImage = false;
      }
    }

    if (!hasImage) {
      doc.setFillColor(15, 23, 42);
      doc.roundedRect(margin, y, contentWidth, 70, 2, 2, 'F');
      doc.setFillColor(ev.isKen ? 220 : 71, ev.isKen ? 38 : 85, ev.isKen ? 38 : 105);
      doc.rect(margin, y + 68, contentWidth, 2, 'F');
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(13);
      doc.setTextColor(255, 255, 255);
      doc.text(title, margin + contentWidth / 2, y + 35, { align: 'center' });
    }

    // Status Badge (KEN vs Regular)
    doc.setFillColor(ev.isKen ? 220 : 15, ev.isKen ? 38 : 23, ev.isKen ? 38 : 42);
    doc.roundedRect(margin + 4, y + 4, ev.isKen ? 52 : 36, 7, 1.5, 1.5, 'F');
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(7.5);
    doc.setTextColor(255, 255, 255);
    doc.text(ev.isKen ? '⭐ OFFICIAL KEN 2026' : 'FESTIVAL RESMI', margin + (ev.isKen ? 30 : 22), y + 8.8, { align: 'center' });

    y += 75;

    // 2. Title & Schedule
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

    // 3. Narrative Description
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8.5);
    doc.setTextColor(51, 65, 85);
    const paragraphs = (desc || '').split('\n\n').filter(Boolean);
    paragraphs.forEach((p) => {
      const cleanP = p.replace(/\n/g, ' ').trim();
      const splitP = doc.splitTextToSize(cleanP, contentWidth);
      doc.text(splitP, margin, y);
      y += (splitP.length * 3.8) + 3;
    });

    // 4. KEN Special Notice Box
    if (ev.isKen) {
      y += 2;
      doc.setFillColor(254, 242, 242); // red-50
      doc.roundedRect(margin, y, contentWidth, 18, 2, 2, 'F');
      doc.setDrawColor(254, 202, 202);
      doc.roundedRect(margin, y, contentWidth, 18, 2, 2, 'S');

      doc.setFont('helvetica', 'bold');
      doc.setFontSize(8.5);
      doc.setTextColor(185, 28, 28);
      doc.text(isEn ? '⭐ OFFICIAL KARISMA EVENT NUSANTARA (KEN) 2026' : '⭐ EVENT UNGGULAN KARISMA EVENT NUSANTARA (KEN) 2026', margin + 4, y + 6.5);

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(8);
      doc.setTextColor(153, 27, 27);
      doc.text(isEn ? 'Curated and recognized by the Ministry of Tourism and Creative Economy.' : 'Terkurasi resmi oleh Kementerian Pariwisata dan Ekonomi Kreatif RI.', margin + 4, y + 12);
    }
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

  // Save the generated PDF
  const filename = isEn ? 'Master-Booklet-West-Sumatra-Guide-2026.pdf' : 'Master-E-Booklet-Pariwisata-Budaya-Sumbar-2026.pdf';
  doc.save(filename);
}
