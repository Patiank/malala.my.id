import { jsPDF } from 'jspdf';
import * as fs from 'fs';
import * as path from 'path';
import { EVENTS_SCHEDULE, BG_IMAGE_1 } from '../src/data/content';
import { EventItem } from '../src/types';

// Load enhanced bilingual events from firestore_backup.json if available
let eventItems: EventItem[] = EVENTS_SCHEDULE;

try {
  const backupPath = path.join(process.cwd(), 'src', 'data', 'firestore_backup.json');
  if (fs.existsSync(backupPath)) {
    const raw = JSON.parse(fs.readFileSync(backupPath, 'utf-8'));
    if (raw.eventItems && raw.eventItems.length > 0) {
      eventItems = raw.eventItems;
    }
  }
} catch (e) {
  console.warn('Backup parse error:', e);
}

function getEventSortScore(scheduleStr: string = ''): number {
  const s = scheduleStr.toLowerCase();
  if (s.includes('januari') || s.includes('january')) return 10;
  if (s.includes('februari') || s.includes('february') || s.includes('rajab') || s.includes('imlek')) return 20;
  if (s.includes('maret') || s.includes('march')) return 30;
  if (s.includes('april') || s.includes('syawal') || s.includes('langkisau') || s.includes('lebaran')) return 40;
  if (s.includes('mei') || s.includes('may')) return 50;
  if (s.includes('juni') || s.includes('june')) return 60;
  if (s.includes('juli') || s.includes('july') || s.includes('muharram')) return 70;
  if (s.includes('agustus') || s.includes('august')) return 80;
  if (s.includes('september')) return 90;
  if (s.includes('oktober') || s.includes('october')) return 100;
  if (s.includes('november')) return 110;
  if (s.includes('desember') || s.includes('december') || s.includes('pamalayu')) return 120;
  if (s.includes('akhir pekan') || s.includes('sepanjang tahun') || s.includes('bergilir')) return 5;
  return 95;
}

// Sort events chronologically from January to December
eventItems = [...eventItems].sort((a, b) => {
  const scoreA = getEventSortScore(a.schedule);
  const scoreB = getEventSortScore(b.schedule);
  if (scoreA !== scoreB) return scoreA - scoreB;
  return (b.isKen ? 1 : 0) - (a.isKen ? 1 : 0);
});

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

async function buildEnglishEventPDF() {
  console.log('🚀 Generating English Calendar of Events 2026 PDF (28 Pages)...');

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

  const addPageFooter = (pageNumber: number) => {
    doc.setFontSize(7);
    doc.setTextColor(140, 140, 140);
    doc.setFont('helvetica', 'normal');
    doc.text('MALALA 2026 • Calendar of Events • Presented by MINANGKAOS', margin, pageHeight - 8);
    doc.text(`Page #${pageNumber}`, pageWidth - margin, pageHeight - 8, { align: 'right' });
  };

  const addPageHeader = (category: string, subCategory: string, tagColor = [217, 119, 6]) => {
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
  // PAGE 1: COVER
  // =========================================================================
  console.log('📄 [1/28] Generating English Event Cover...');
  let bgCoverUrl = eventItems[0]?.imageUrl || BG_IMAGE_1;
  const coverImg = await fetchImageBase64(bgCoverUrl);
  if (coverImg) {
    try {
      doc.addImage(coverImg, 'JPEG', 0, 0, pageWidth, pageHeight);
    } catch (e) {}
  } else {
    doc.setFillColor(28, 25, 23);
    doc.rect(0, 0, pageWidth, pageHeight, 'F');
  }

  // Cover Top Badge
  doc.setFillColor(217, 119, 6);
  doc.roundedRect(margin, margin + 4, 52, 6, 1, 1, 'F');
  doc.setFontSize(6.5);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(255, 255, 255);
  doc.text('OFFICIAL CALENDAR 2026', margin + 3, margin + 8.2);

  doc.setFontSize(8);
  doc.setTextColor(255, 255, 255);
  doc.text('MALALA.MY.ID', pageWidth - margin, margin + 8.2, { align: 'right' });

  // Cover Main Title
  doc.setFontSize(26);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(255, 255, 255);
  doc.text('CALENDAR OF', margin, margin + 26);
  doc.text('EVENTS 2026', margin, margin + 36);

  doc.setFontSize(9);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(254, 243, 199);
  doc.text('WEST SUMATRA TOURISM & CULTURAL FESTIVALS', margin, margin + 44);

  // Cover Bottom Info
  const totalKenCount = eventItems.filter(e => e.isKen).length;
  const totalStats = `${eventItems.length} Official Festivals • ${totalKenCount} Kharisma Event Nusantara (KEN) • Across 19 Regencies & Cities`;
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
  // PAGE 2: TIMELINE AGENDA OVERVIEW
  // =========================================================================
  console.log('📄 [2/28] Compiling Annual Timeline Agenda Overview...');
  currentPageNum++;
  doc.addPage('a5', 'portrait');

  addPageHeader('Calendar of Events 2026', 'Yearly Agenda Overview', [217, 119, 6]);

  doc.setFontSize(13);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(20, 20, 20);
  doc.text('ANNUAL FESTIVAL AGENDA 2026', margin, 24);

  doc.setFontSize(7.5);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(100, 100, 100);
  doc.text('Chronological summary of cultural celebrations & tourism attractions.', margin, 29);

  let currentY = 35;
  const overviewList = eventItems.slice(0, 12);
  overviewList.forEach((ev, idx) => {
    doc.setFillColor(ev.isKen ? 254 : 248, ev.isKen ? 242 : 250, ev.isKen ? 242 : 252);
    doc.setDrawColor(ev.isKen ? 254 : 226, ev.isKen ? 202 : 232, ev.isKen ? 202 : 240);
    doc.roundedRect(margin, currentY, contentWidth, 10.5, 1.5, 1.5, 'FD');

    // Number & title
    doc.setFontSize(8);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(15, 23, 42);
    const titleStr = `${idx + 1}. ${(ev.titleEn || ev.title)}`;
    doc.text(doc.splitTextToSize(titleStr, contentWidth - 45)[0], margin + 2.5, currentY + 4.5);

    // Schedule & Tag
    doc.setFontSize(7);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(100, 100, 100);
    doc.text(`📅 ${ev.scheduleEn || ev.schedule} • 📍 ${ev.locationEn || ev.location || ev.regencyEn || ev.regency}`, margin + 2.5, currentY + 8.5);

    if (ev.isKen) {
      doc.setFillColor(220, 38, 38);
      doc.roundedRect(pageWidth - margin - 20, currentY + 2.5, 17, 5, 1, 1, 'F');
      doc.setFontSize(6);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(255, 255, 255);
      doc.text('KEN 2026', pageWidth - margin - 11.5, currentY + 6, { align: 'center' });
    }

    currentY += 12;
  });

  addPageFooter(currentPageNum);

  // =========================================================================
  // PAGES 3 - 28: INDIVIDUAL EVENT DETAILS (26 EVENTS)
  // =========================================================================
  console.log(`📄 [3-28/28] Compiling ${eventItems.length} Detailed Event Pages...`);
  for (let i = 0; i < eventItems.length; i++) {
    const ev = eventItems[i];
    currentPageNum++;
    doc.addPage('a5', 'portrait');

    addPageHeader('Official Calendar of Events 2026', ev.isKen ? 'Kharisma Event Nusantara' : 'Official Festival', ev.isKen ? [220, 38, 38] : [217, 119, 6]);

    // Image
    const imgData = await fetchImageBase64(ev.imageUrl);
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
    doc.text(ev.titleEn || ev.title, margin, imgY + imgH + 8);

    // Schedule
    doc.setFontSize(8);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(217, 119, 6);
    doc.text(`Official Schedule: ${ev.scheduleEn || ev.schedule}`, margin, imgY + imgH + 13);

    // Location
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
    const boxY = imgY + imgH + 42;
    if (ev.isKen) {
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
      doc.text('Flagship national cultural event selected into the national tourism calendar by the Indonesian Ministry of Tourism and Creative Economy.', margin + 3, boxY + 12, { maxWidth: contentWidth - 6 });
    } else {
      doc.setFillColor(255, 251, 235);
      doc.setDrawColor(254, 243, 199);
      doc.roundedRect(margin, boxY, contentWidth, 22, 2, 2, 'FD');

      doc.setFontSize(7.5);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(146, 64, 14);
      doc.text('WEST SUMATRA REGIONAL FESTIVAL 2026', margin + 3, boxY + 6);

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(7);
      doc.setTextColor(180, 83, 9);
      doc.text('Celebration of authentic Minangkabau traditions, performing arts, folklore, and local heritage in West Sumatra.', margin + 3, boxY + 12, { maxWidth: contentWidth - 6 });
    }

    addPageFooter(currentPageNum);
  }

  // Save to public/downloads/kalender-event-sumbar-2026-en.pdf
  const outDir = path.join(process.cwd(), 'public', 'downloads');
  if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true });
  }

  const outPath = path.join(outDir, 'kalender-event-sumbar-2026-en.pdf');
  const pdfBuffer = Buffer.from(doc.output('arraybuffer'));
  fs.writeFileSync(outPath, pdfBuffer);

  const fileSizeMB = (pdfBuffer.length / (1024 * 1024)).toFixed(2);
  console.log(`\n🎉 SUCCESS: English Calendar of Events 2026 PDF Generated!`);
  console.log(`📁 File Location: ${outPath}`);
  console.log(`⚖️ File Size: ${fileSizeMB} MB`);
}

buildEnglishEventPDF();
