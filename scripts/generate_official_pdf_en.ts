import { jsPDF } from 'jspdf';
import * as fs from 'fs';
import * as path from 'path';
import { DESTINATIONS, CULTURE_ITEMS, CULINARY_ITEMS, EVENTS_SCHEDULE, BG_IMAGE_2 } from '../src/data/content';
import { Destination, CultureItem, CulinaryItem, EventItem } from '../src/types';

// Load enhanced bilingual data from firestore_backup.json if available
let destinations: Destination[] = DESTINATIONS;
let cultureItems: CultureItem[] = CULTURE_ITEMS;
let culinaryItems: CulinaryItem[] = CULINARY_ITEMS;
let eventItems: EventItem[] = EVENTS_SCHEDULE;

try {
  const backupPath = path.join(process.cwd(), 'src', 'data', 'firestore_backup.json');
  if (fs.existsSync(backupPath)) {
    const raw = JSON.parse(fs.readFileSync(backupPath, 'utf-8'));
    if (raw.destinations && raw.destinations.length > 0) destinations = raw.destinations;
    if (raw.cultureItems && raw.cultureItems.length > 0) cultureItems = raw.cultureItems;
    if (raw.culinaryItems && raw.culinaryItems.length > 0) culinaryItems = raw.culinaryItems;
    if (raw.eventItems && raw.eventItems.length > 0) eventItems = raw.eventItems;
  }
} catch (e) {
  console.warn('Backup parse error:', e);
}

async function fetchImageBase64(url: string): Promise<string | null> {
  try {
    if (!url) return null;
    let targetUrl = url;
    if (url.includes('unsplash.com')) {
      const base = url.split('?')[0];
      targetUrl = `${base}?auto=format&fit=crop&w=800&q=70`;
    }
    const res = await fetch(targetUrl, { signal: AbortSignal.timeout(8000) });
    if (!res.ok) return null;
    const arrayBuffer = await res.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    return `data:image/jpeg;base64,${buffer.toString('base64')}`;
  } catch (e) {
    return null;
  }
}

async function buildEnglishEBookletPDF() {
  console.log('🚀 Generating Official English E-Booklet PDF Guide (77 Pages)...');

  // Page dimensions: A5 Portrait (148 x 210 mm)
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a5'
  });

  const pageWidth = 148;
  const pageHeight = 210;
  const margin = 12;
  const contentWidth = pageWidth - (margin * 2);

  // Helper to add clean footer
  const addPageFooter = (pageNumber: number, categoryLabel: string) => {
    doc.setFontSize(7);
    doc.setTextColor(140, 140, 140);
    doc.setFont('helvetica', 'normal');
    doc.text('MALALA 2026 • Presented by MINANGKAOS • malala.my.id', margin, pageHeight - 8);
    doc.text(`Page #${pageNumber}`, pageWidth - margin, pageHeight - 8, { align: 'right' });
  };

  // Helper to add clean header
  const addPageHeader = (category: string, subCategory: string, tagColor = [220, 38, 38]) => {
    doc.setFontSize(7.5);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(100, 100, 100);
    doc.text(`MALALA 2026 • ${category.toUpperCase()}`, margin, 12);
    
    doc.setTextColor(tagColor[0], tagColor[1], tagColor[2]);
    doc.text(subCategory.toUpperCase(), pageWidth - margin, 12, { align: 'right' });

    doc.setDrawColor(230, 230, 230);
    doc.setLineWidth(0.3);
    doc.line(margin, 14, pageWidth - margin, 14);
  };

  // =========================================================================
  // PAGE 1: COVER PAGE
  // =========================================================================
  console.log('📄 [1/77] Generating English Cover Page...');
  const coverImg = await fetchImageBase64(BG_IMAGE_2);
  if (coverImg) {
    try {
      doc.addImage(coverImg, 'JPEG', 0, 0, pageWidth, pageHeight);
    } catch (e) {}
  } else {
    doc.setFillColor(15, 23, 42);
    doc.rect(0, 0, pageWidth, pageHeight, 'F');
  }

  // Cover Top Badge
  doc.setFillColor(220, 38, 38);
  doc.roundedRect(margin, margin + 4, 48, 6, 1, 1, 'F');
  doc.setFontSize(6.5);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(255, 255, 255);
  doc.text('OFFICIAL GUIDE 2026', margin + 3, margin + 8.2);

  doc.setFontSize(8);
  doc.setTextColor(255, 255, 255);
  doc.text('MALALA.MY.ID', pageWidth - margin, margin + 8.2, { align: 'right' });

  // Cover Main Title
  doc.setFontSize(26);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(255, 255, 255);
  doc.text('MALALA', margin, margin + 26);
  doc.text('2026', margin, margin + 36);

  doc.setFontSize(9);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(255, 255, 255);
  doc.text('WEST SUMATRA COMPLETE TOURISM & CULTURE GUIDE', margin, margin + 44);

  // Cover Bottom Info
  const totalStats = `${destinations.length} Curated Destinations • ${cultureItems.length} Cultural Traditions • ${culinaryItems.length} Authentic Dishes • ${eventItems.length} Major 2026 Events`;
  doc.setFontSize(7.5);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(240, 240, 240);
  doc.text(doc.splitTextToSize(totalStats, contentWidth), margin, pageHeight - 22);

  doc.setDrawColor(255, 255, 255);
  doc.setLineWidth(0.4);
  doc.line(margin, pageHeight - 16, pageWidth - margin, pageHeight - 16);

  doc.setFontSize(7);
  doc.text('MINANGKAOS', margin, pageHeight - 11);
  doc.text('English Digital Edition', pageWidth - margin, pageHeight - 11, { align: 'right' });

  let currentPageNum = 1;

  // =========================================================================
  // PAGES 2 - 27: DESTINASI WISATA (26 ITEMS)
  // =========================================================================
  console.log('📄 [2-27/77] Compiling 26 Curated Destinations (English)...');
  const sampleDests = destinations.slice(0, 26);
  for (let i = 0; i < sampleDests.length; i++) {
    const dest = sampleDests[i];
    currentPageNum++;
    doc.addPage('a5', 'portrait');

    const regencyText = dest.regencyEn || dest.regency || 'West Sumatra';
    const categoryText = dest.categoryEn || dest.category || 'Nature Tourism';
    addPageHeader(regencyText, categoryText, [220, 38, 38]);

    // Image
    const imgData = await fetchImageBase64(dest.imageUrl);
    const imgY = 17;
    const imgH = 54;
    if (imgData) {
      try {
        doc.addImage(imgData, 'JPEG', margin, imgY, contentWidth, imgH);
      } catch (e) {}
    } else {
      doc.setFillColor(240, 240, 240);
      doc.roundedRect(margin, imgY, contentWidth, imgH, 2, 2, 'F');
    }

    // Title & Category
    doc.setFontSize(13);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(20, 20, 20);
    doc.text(dest.titleEn || dest.title, margin, imgY + imgH + 8);

    // Location
    doc.setFontSize(8);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(220, 38, 38);
    const locText = dest.locationDetailsEn || dest.locationDetails || dest.regencyEn || dest.regency;
    doc.text(`Location: ${locText}`, margin, imgY + imgH + 13);

    // Description
    doc.setFontSize(7.5);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(60, 60, 60);
    const descText = (dest.descriptionEn || dest.description || '').replace(/\\n/g, '\n');
    const firstPara = descText.split('\n\n')[0] || descText;
    const splitDesc = doc.splitTextToSize(firstPara, contentWidth);
    doc.text(splitDesc.slice(0, 7), margin, imgY + imgH + 19);

    // Highlights Box
    const boxY = imgY + imgH + 42;
    const hlList = (dest.highlightsEn && dest.highlightsEn.length > 0) ? dest.highlightsEn : dest.highlights;
    if (hlList && hlList.length > 0) {
      doc.setFillColor(248, 250, 252);
      doc.setDrawColor(226, 232, 240);
      doc.roundedRect(margin, boxY, contentWidth, 24, 2, 2, 'FD');

      doc.setFontSize(7.5);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(15, 23, 42);
      doc.text('KEY HIGHLIGHTS & EXPERIENCES:', margin + 3, boxY + 5);

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(7);
      doc.setTextColor(51, 65, 85);
      hlList.slice(0, 3).forEach((h, hIdx) => {
        doc.text(`•  ${h}`, margin + 4, boxY + 10 + (hIdx * 4.5));
      });
    }

    // Best time
    const bestTimeText = dest.bestTimeEn || dest.bestTime;
    if (bestTimeText) {
      doc.setFontSize(7);
      doc.setTextColor(100, 100, 100);
      doc.text(`Best Time to Visit: ${bestTimeText}`, margin, pageHeight - 14);
    }

    addPageFooter(currentPageNum, 'Destinations');
  }

  // =========================================================================
  // PAGES 28 - 41: WARISAN BUDAYA (14 ITEMS)
  // =========================================================================
  console.log('📄 [28-41/77] Compiling 14 Cultural Traditions (English)...');
  const sampleCult = cultureItems.slice(0, 14);
  for (let i = 0; i < sampleCult.length; i++) {
    const cult = sampleCult[i];
    currentPageNum++;
    doc.addPage('a5', 'portrait');

    const catText = cult.categoryEn || cult.category || 'Minangkabau Customs';
    addPageHeader('Cultural Heritage & Traditions', catText, [180, 83, 9]);

    // Image
    const imgData = await fetchImageBase64(cult.imageUrl);
    const imgY = 17;
    const imgH = 54;
    if (imgData) {
      try {
        doc.addImage(imgData, 'JPEG', margin, imgY, contentWidth, imgH);
      } catch (e) {}
    } else {
      doc.setFillColor(254, 243, 199);
      doc.roundedRect(margin, imgY, contentWidth, imgH, 2, 2, 'F');
    }

    // Title
    doc.setFontSize(13);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(20, 20, 20);
    doc.text(cult.titleEn || cult.title, margin, imgY + imgH + 8);

    // Origin
    doc.setFontSize(8);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(180, 83, 9);
    doc.text(`Cultural Origin & Nagari: ${cult.originEn || cult.origin}`, margin, imgY + imgH + 13);

    // Description
    doc.setFontSize(7.5);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(60, 60, 60);
    const descText = (cult.descriptionEn || cult.description || '').replace(/\\n/g, '\n');
    const firstPara = descText.split('\n\n')[0] || descText;
    const splitDesc = doc.splitTextToSize(firstPara, contentWidth);
    doc.text(splitDesc.slice(0, 7), margin, imgY + imgH + 19);

    // Philosophy Box
    const boxY = imgY + imgH + 42;
    const philText = cult.philosophyEn || cult.philosophy;
    if (philText) {
      doc.setFillColor(254, 252, 232);
      doc.setDrawColor(254, 240, 138);
      doc.roundedRect(margin, boxY, contentWidth, 22, 2, 2, 'FD');

      doc.setFontSize(7.5);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(113, 63, 18);
      doc.text('CULTURAL PHILOSOPHY & SIGNIFICANCE:', margin + 3, boxY + 5.5);

      doc.setFont('helvetica', 'italic');
      doc.setFontSize(7);
      doc.setTextColor(133, 77, 14);
      const splitPhil = doc.splitTextToSize(`"${philText}"`, contentWidth - 6);
      doc.text(splitPhil.slice(0, 3), margin + 3, boxY + 11);
    }

    addPageFooter(currentPageNum, 'Culture');
  }

  // =========================================================================
  // PAGES 42 - 57: PUSAKA KULINER (16 ITEMS)
  // =========================================================================
  console.log('📄 [42-57/77] Compiling 16 Culinary Masterpieces (English)...');
  const sampleCul = culinaryItems.slice(0, 16);
  for (let i = 0; i < sampleCul.length; i++) {
    const cul = sampleCul[i];
    currentPageNum++;
    doc.addPage('a5', 'portrait');

    const culCat = cul.categoryEn || cul.category || 'Authentic Gastronomy';
    addPageHeader('Minangkabau Gastronomy', culCat, [225, 29, 72]);

    // Image
    const imgData = await fetchImageBase64(cul.imageUrl);
    const imgY = 17;
    const imgH = 54;
    if (imgData) {
      try {
        doc.addImage(imgData, 'JPEG', margin, imgY, contentWidth, imgH);
      } catch (e) {}
    } else {
      doc.setFillColor(255, 241, 242);
      doc.roundedRect(margin, imgY, contentWidth, imgH, 2, 2, 'F');
    }

    // Title
    doc.setFontSize(13);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(20, 20, 20);
    doc.text(cul.titleEn || cul.title, margin, imgY + imgH + 8);

    // Origin
    doc.setFontSize(8);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(225, 29, 72);
    doc.text(`Origin: ${cul.originEn || cul.origin}`, margin, imgY + imgH + 13);

    // Description
    doc.setFontSize(7.5);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(60, 60, 60);
    const descText = (cul.descriptionEn || cul.description || '').replace(/\\n/g, '\n');
    const firstPara = descText.split('\n\n')[0] || descText;
    const splitDesc = doc.splitTextToSize(firstPara, contentWidth);
    doc.text(splitDesc.slice(0, 7), margin, imgY + imgH + 19);

    // Ingredients & Taste Box
    const boxY = imgY + imgH + 42;
    doc.setFillColor(255, 241, 242);
    doc.setDrawColor(254, 205, 211);
    doc.roundedRect(margin, boxY, contentWidth, 22, 2, 2, 'FD');

    doc.setFontSize(7.5);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(159, 18, 57);
    doc.text('KEY INGREDIENTS & HERBS:', margin + 3, boxY + 5);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7);
    doc.setTextColor(76, 5, 25);
    const ingrList = ((cul.mainIngredientsEn && cul.mainIngredientsEn.length > 0) ? cul.mainIngredientsEn : (cul.mainIngredients || [])).slice(0, 5).join(', ');
    doc.text(doc.splitTextToSize(ingrList, contentWidth - 6).slice(0, 2), margin + 3, boxY + 9.5);

    const tasteText = cul.tasteProfileEn || cul.tasteProfile;
    if (tasteText) {
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(159, 18, 57);
      doc.text(`Flavor Profile: ${tasteText}`, margin + 3, boxY + 18);
    }

    addPageFooter(currentPageNum, 'Gastronomy');
  }

  // =========================================================================
  // PAGES 58 - 77: 20 KALENDER EVENT 2026
  // =========================================================================
  console.log('📄 [58-77/77] Compiling 20 Annual Events (English)...');
  const sampleEvents = eventItems.slice(0, 20);
  for (let i = 0; i < sampleEvents.length; i++) {
    const ev = sampleEvents[i];
    currentPageNum++;
    doc.addPage('a5', 'portrait');

    addPageHeader('Calendar of Events 2026', ev.isKen ? 'Kharisma Event Nusantara (KEN)' : 'Official Festival', ev.isKen ? [220, 38, 38] : [30, 41, 59]);

    // Image
    const imgData = await fetchImageBase64(ev.imageUrl);
    const imgY = 17;
    const imgH = 54;
    if (imgData) {
      try {
        doc.addImage(imgData, 'JPEG', margin, imgY, contentWidth, imgH);
      } catch (e) {}
    } else {
      doc.setFillColor(241, 245, 249);
      doc.roundedRect(margin, imgY, contentWidth, imgH, 2, 2, 'F');
    }

    // Title
    doc.setFontSize(13);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(20, 20, 20);
    doc.text(ev.titleEn || ev.title, margin, imgY + imgH + 8);

    // Schedule & Location
    doc.setFontSize(8);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(ev.isKen ? 220 : 30, ev.isKen ? 38 : 41, ev.isKen ? 38 : 59);
    doc.text(`Schedule: ${ev.scheduleEn || ev.schedule}`, margin, imgY + imgH + 13);

    doc.setFontSize(7.5);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(80, 80, 80);
    doc.text(`Location: ${ev.locationEn || ev.location || ev.regencyEn || ev.regency}`, margin, imgY + imgH + 17);

    // Description
    doc.setFontSize(7.5);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(60, 60, 60);
    const descText = (ev.descriptionEn || ev.description || '').replace(/\\n/g, '\n');
    const firstPara = descText.split('\n\n')[0] || descText;
    const splitDesc = doc.splitTextToSize(firstPara, contentWidth);
    doc.text(splitDesc.slice(0, 6), margin, imgY + imgH + 23);

    // KEN badge box if applicable
    if (ev.isKen) {
      const boxY = imgY + imgH + 42;
      doc.setFillColor(254, 242, 242);
      doc.setDrawColor(254, 202, 202);
      doc.roundedRect(margin, boxY, contentWidth, 22, 2, 2, 'FD');

      doc.setFontSize(7.5);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(153, 27, 27);
      doc.text('KHARISMA EVENT NUSANTARA (KEN) - MINISTRY OF TOURISM', margin + 3, boxY + 6);

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(7);
      doc.setTextColor(185, 28, 28);
      doc.text('Official national flagship festival acknowledged by the Indonesian Ministry of Tourism as a world-class cultural showcase.', margin + 3, boxY + 12, { maxWidth: contentWidth - 6 });
    }

    addPageFooter(currentPageNum, 'Events');
  }

  // Save to public/downloads/malala-tourism-guide-sumbar-2026-en.pdf
  const outDir = path.join(process.cwd(), 'public', 'downloads');
  if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true });
  }

  const outPath = path.join(outDir, 'malala-tourism-guide-sumbar-2026-en.pdf');
  const pdfBuffer = Buffer.from(doc.output('arraybuffer'));
  fs.writeFileSync(outPath, pdfBuffer);

  const fileSizeMB = (pdfBuffer.length / (1024 * 1024)).toFixed(2);
  console.log(`\n🎉 SUCCESS: English E-Booklet PDF Guide (77 Pages) Generated!`);
  console.log(`📁 File Location: ${outPath}`);
  console.log(`⚖️ File Size: ${fileSizeMB} MB`);
}

buildEnglishEBookletPDF();
