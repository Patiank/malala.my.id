import { jsPDF } from 'jspdf';
import * as fs from 'fs';
import * as path from 'path';
import { DESTINATIONS, CULTURE_ITEMS, CULINARY_ITEMS, EVENTS_SCHEDULE, BG_IMAGE_2 } from '../src/data/content';

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

async function buildEBookletPDF() {
  console.log('🚀 Memulai proses penyusunan E-Booklet PDF Resmi (77 Halaman)...');

  // Page dimensions: A5 Portrait (148 x 210 mm) — Perfect mobile & print book size!
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
    doc.text(`#${pageNumber}`, pageWidth - margin, pageHeight - 8, { align: 'right' });
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
  console.log('📄 [1/77] Membuat Halaman Cover...');
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
  doc.roundedRect(margin, margin + 4, 45, 6, 1, 1, 'F');
  doc.setFontSize(6.5);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(255, 255, 255);
  doc.text('EDISI SPESIAL 2026', margin + 3, margin + 8.2);

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
  doc.text('PANDUAN LENGKAP PARIWISATA & BUDAYA RANAH MINANG', margin, margin + 44);

  // Cover Bottom Info
  const totalStats = `${DESTINATIONS.length} Destinasi Wisata • ${CULTURE_ITEMS.length} Warisan Budaya • ${CULINARY_ITEMS.length} Kuliner Otentik • ${EVENTS_SCHEDULE.length} Kalender Event`;
  doc.setFontSize(7.5);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(240, 240, 240);
  doc.text(doc.splitTextToSize(totalStats, contentWidth), margin, pageHeight - 22);

  doc.setDrawColor(255, 255, 255);
  doc.setLineWidth(0.4);
  doc.line(margin, pageHeight - 16, pageWidth - margin, pageHeight - 16);

  doc.setFontSize(7);
  doc.text('MINANGKAOS', margin, pageHeight - 11);
  doc.text('E-Book Digital Edition', pageWidth - margin, pageHeight - 11, { align: 'right' });

  let currentPageNum = 1;

  // =========================================================================
  // PAGES 2 - 27: 26 DESTINASI WISATA
  // =========================================================================
  console.log('📄 [2-27/77] Menyusun 26 Destinasi Wisata...');
  for (let i = 0; i < DESTINATIONS.length; i++) {
    const dest = DESTINATIONS[i];
    currentPageNum++;
    doc.addPage('a5', 'portrait');

    addPageHeader(dest.regency || 'Sumatera Barat', dest.category || 'Wisata Alam', [220, 38, 38]);

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
    doc.text(dest.title, margin, imgY + imgH + 8);

    // Location
    doc.setFontSize(8);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(220, 38, 38);
    doc.text(`Lokasi: ${dest.locationDetails || dest.regency}`, margin, imgY + imgH + 13);

    // Description (First 1-2 paragraphs formatted)
    doc.setFontSize(7.5);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(60, 60, 60);
    const descText = dest.description.replace(/\\n/g, '\n');
    const firstPara = descText.split('\n\n')[0] || descText;
    const splitDesc = doc.splitTextToSize(firstPara, contentWidth);
    doc.text(splitDesc.slice(0, 7), margin, imgY + imgH + 19);

    // Highlights Box
    const boxY = imgY + imgH + 42;
    if (dest.highlights && dest.highlights.length > 0) {
      doc.setFillColor(248, 250, 252);
      doc.setDrawColor(226, 232, 240);
      doc.roundedRect(margin, boxY, contentWidth, 24, 2, 2, 'FD');

      doc.setFontSize(7.5);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(15, 23, 42);
      doc.text('DAYA TARIK UTAMA (HIGHLIGHTS):', margin + 3, boxY + 5);

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(7);
      doc.setTextColor(51, 65, 85);
      dest.highlights.slice(0, 3).forEach((h, hIdx) => {
        doc.text(`•  ${h}`, margin + 4, boxY + 10 + (hIdx * 4.5));
      });
    }

    // Best time
    if (dest.bestTime) {
      doc.setFontSize(7);
      doc.setTextColor(100, 100, 100);
      doc.text(`Waktu Terbaik Berkunjung: ${dest.bestTime}`, margin, pageHeight - 14);
    }

    addPageFooter(currentPageNum, 'Destinasi');
  }

  // =========================================================================
  // PAGES 28 - 41: 14 WARISAN BUDAYA MINANGKABAU
  // =========================================================================
  console.log('📄 [28-41/77] Menyusun 14 Warisan Budaya...');
  for (let i = 0; i < CULTURE_ITEMS.length; i++) {
    const cult = CULTURE_ITEMS[i];
    currentPageNum++;
    doc.addPage('a5', 'portrait');

    addPageHeader('Warisan Budaya & Tradisi', cult.category || 'Adat Minangkabau', [180, 83, 9]);

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
    doc.text(cult.title, margin, imgY + imgH + 8);

    // Origin
    doc.setFontSize(8);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(180, 83, 9);
    doc.text(`Asal Nagari / Tradisi: ${cult.origin}`, margin, imgY + imgH + 13);

    // Description
    doc.setFontSize(7.5);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(60, 60, 60);
    const descText = cult.description.replace(/\\n/g, '\n');
    const firstPara = descText.split('\n\n')[0] || descText;
    const splitDesc = doc.splitTextToSize(firstPara, contentWidth);
    doc.text(splitDesc.slice(0, 7), margin, imgY + imgH + 19);

    // Philosophy Box
    const boxY = imgY + imgH + 42;
    if (cult.philosophy) {
      doc.setFillColor(254, 252, 232);
      doc.setDrawColor(254, 240, 138);
      doc.roundedRect(margin, boxY, contentWidth, 22, 2, 2, 'FD');

      doc.setFontSize(7.5);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(113, 63, 18);
      doc.text('FALSAFAH & MAKNA ADAT MINANGKABAU:', margin + 3, boxY + 5.5);

      doc.setFont('helvetica', 'italic');
      doc.setFontSize(7);
      doc.setTextColor(133, 77, 14);
      const splitPhil = doc.splitTextToSize(`"${cult.philosophy}"`, contentWidth - 6);
      doc.text(splitPhil.slice(0, 3), margin + 3, boxY + 11);
    }

    addPageFooter(currentPageNum, 'Budaya');
  }

  // =========================================================================
  // PAGES 42 - 57: 16 KULINER OTENTIK
  // =========================================================================
  console.log('📄 [42-57/77] Menyusun 16 Pusaka Kuliner...');
  for (let i = 0; i < CULINARY_ITEMS.length; i++) {
    const cul = CULINARY_ITEMS[i];
    currentPageNum++;
    doc.addPage('a5', 'portrait');

    addPageHeader('Gastronomi Minangkabau', cul.category || 'Kuliner Otentik', [225, 29, 72]);

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
    doc.text(cul.title, margin, imgY + imgH + 8);

    // Origin
    doc.setFontSize(8);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(225, 29, 72);
    doc.text(`Asal Kuliner: ${cul.origin}`, margin, imgY + imgH + 13);

    // Description
    doc.setFontSize(7.5);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(60, 60, 60);
    const descText = cul.description.replace(/\\n/g, '\n');
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
    doc.text('BAHAN & REMPAH UTAMA:', margin + 3, boxY + 5);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7);
    doc.setTextColor(76, 5, 25);
    const ingrList = (cul.mainIngredients || []).slice(0, 5).join(', ');
    doc.text(doc.splitTextToSize(ingrList, contentWidth - 6).slice(0, 2), margin + 3, boxY + 9.5);

    if (cul.tasteProfile) {
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(159, 18, 57);
      doc.text(`Karakter Rasa: ${cul.tasteProfile}`, margin + 3, boxY + 18);
    }

    addPageFooter(currentPageNum, 'Kuliner');
  }

  // =========================================================================
  // PAGES 58 - 77: 20 KALENDER EVENT 2026
  // =========================================================================
  console.log('📄 [58-77/77] Menyusun 20 Kalender Acara & Event...');
  for (let i = 0; i < EVENTS_SCHEDULE.length; i++) {
    const ev = EVENTS_SCHEDULE[i];
    currentPageNum++;
    doc.addPage('a5', 'portrait');

    addPageHeader('Calendar of Events 2026', ev.isKen ? 'Karisma Event Nusantara' : 'Festival Resmi', ev.isKen ? [220, 38, 38] : [30, 41, 59]);

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
    doc.text(ev.title, margin, imgY + imgH + 8);

    // Schedule & Location
    doc.setFontSize(8);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(220, 38, 38);
    doc.text(`Jadwal: ${ev.schedule}  •  Lokasi: ${ev.location}`, margin, imgY + imgH + 13);

    // Description
    doc.setFontSize(7.5);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(60, 60, 60);
    const descText = ev.description.replace(/\\n/g, '\n');
    const firstPara = descText.split('\n\n')[0] || descText;
    const splitDesc = doc.splitTextToSize(firstPara, contentWidth);
    doc.text(splitDesc.slice(0, 7), margin, imgY + imgH + 19);

    // KEN Notice Box
    const boxY = imgY + imgH + 42;
    if (ev.isKen) {
      doc.setFillColor(254, 242, 242);
      doc.setDrawColor(254, 202, 202);
      doc.roundedRect(margin, boxY, contentWidth, 22, 2, 2, 'FD');

      doc.setFontSize(7.5);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(153, 27, 27);
      doc.text('KARISMA EVENT NUSANTARA (KEN) KEMENPAREKRAF RI', margin + 3, boxY + 6);

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(7);
      doc.setTextColor(185, 28, 28);
      doc.text('Event resmi yang masuk dalam kalender pariwisata nasional Kemenparekraf sebagai daya tarik budaya unggulan kelas dunia.', margin + 3, boxY + 12, { maxWidth: contentWidth - 6 });
    }

    addPageFooter(currentPageNum, 'Event');
  }

  // Save to public/downloads/malala-panduan-wisata-sumbar-2026.pdf
  const outDir = path.join(process.cwd(), 'public', 'downloads');
  if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true });
  }

  const outPath = path.join(outDir, 'malala-panduan-wisata-sumbar-2026.pdf');
  const pdfBuffer = Buffer.from(doc.output('arraybuffer'));
  fs.writeFileSync(outPath, pdfBuffer);

  const fileSizeMB = (pdfBuffer.length / (1024 * 1024)).toFixed(2);
  console.log(`\n🎉 SELESAI: E-Booklet PDF Resmi (77 Halaman) berhasil dibuat!`);
  console.log(`📁 Lokasi File: ${outPath}`);
  console.log(`⚖️ Ukuran File: ${fileSizeMB} MB (Sangat ringan & cepat diunduh oleh wisatawan!)`);
}

buildEBookletPDF();
