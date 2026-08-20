import puppeteer from 'puppeteer-core';
import * as fs from 'fs';
import * as path from 'path';
import { jsPDF } from 'jspdf';
import { DESTINATIONS, CULTURE_ITEMS, CULINARY_ITEMS, EVENTS_SCHEDULE } from '../src/data/content';
import { execSync } from 'child_process';

const edgePaths = [
  'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
  'C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe',
  'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
  'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe'
];

let browserExe = '';
for (const p of edgePaths) {
  if (fs.existsSync(p)) {
    browserExe = p;
    break;
  }
}

if (!browserExe) {
  console.error('Browser executable not found.');
  process.exit(1);
}

// 1. Generate updated HTML templates
console.log('🔄 Menyiapkan HTML template Panduan Lengkap & Kalender Event...');
execSync('cmd /c npx tsx scripts/generate_html_pdf.ts', { stdio: 'inherit' });
execSync('cmd /c npx tsx scripts/generate_event_pdf.ts', { stdio: 'inherit' });

async function exportAllPDFs() {
  console.log(`🚀 Menjalankan browser engine (${browserExe})...`);
  
  const browser = await puppeteer.launch({
    executablePath: browserExe,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-gpu']
  });

  const pdfOutDir = path.join(process.cwd(), 'public', 'downloads');
  if (!fs.existsSync(pdfOutDir)) fs.mkdirSync(pdfOutDir, { recursive: true });

  // =========================================================================
  // TASK 1: FULL TRAVEL GUIDE PDF (107 PAGES)
  // =========================================================================
  console.log('\n========================================');
  console.log('📘 1. MERENDER BUKU PANDUAN WISATA LENGKAP...');
  console.log('========================================');

  const page1 = await browser.newPage();
  await page1.setViewport({ width: 600, height: 900, deviceScaleFactor: 2 });

  const htmlPath1 = path.join(process.cwd(), 'public', 'ebooklet_printable.html');
  const fileUrl1 = `file:///${htmlPath1.replace(/\\/g, '/')}`;

  console.log(`📄 Memuat halaman: ${fileUrl1}`);
  await page1.goto(fileUrl1, { waitUntil: 'domcontentloaded', timeout: 60000 });
  await new Promise(r => setTimeout(r, 4000));

  const jpgDir = path.join(process.cwd(), 'ebooklet_pages_jpg');
  if (!fs.existsSync(jpgDir)) fs.mkdirSync(jpgDir, { recursive: true });

  const publicJpgDir = path.join(process.cwd(), 'public', 'ebooklet_pages_jpg');
  if (!fs.existsSync(publicJpgDir)) fs.mkdirSync(publicJpgDir, { recursive: true });

  const articles1 = await page1.$$('article.page-card');
  console.log(`Ditemukan ${articles1.length} halaman kartu.`);

  // Generate filenames for full guide
  const fileNames: string[] = ['01_cover_malala_2026.jpg'];
  let destinations = DESTINATIONS;
  let cultureItems = CULTURE_ITEMS;
  let culinaryItems = CULINARY_ITEMS;
  let eventItems = EVENTS_SCHEDULE;

  try {
    const backupPath = path.join(process.cwd(), 'src', 'data', 'firestore_backup.json');
    if (fs.existsSync(backupPath)) {
      const raw = JSON.parse(fs.readFileSync(backupPath, 'utf-8'));
      if (raw.destinations && raw.destinations.length > 0) destinations = raw.destinations;
      if (raw.cultureItems && raw.cultureItems.length > 0) cultureItems = raw.cultureItems;
      if (raw.culinaryItems && raw.culinaryItems.length > 0) culinaryItems = raw.culinaryItems;
      if (raw.eventItems && raw.eventItems.length > 0) eventItems = raw.eventItems;
    }
  } catch (e) {}

  destinations.forEach((d, idx) => {
    const slug = d.title.toLowerCase().replace(/[^a-z0-9]+/g, '_').slice(0, 30);
    const num = String(idx + 2).padStart(2, '0');
    fileNames.push(`${num}_destinasi_${slug}.jpg`);
  });

  cultureItems.forEach((c, idx) => {
    const slug = c.title.toLowerCase().replace(/[^a-z0-9]+/g, '_').slice(0, 30);
    const num = String(destinations.length + idx + 2).padStart(2, '0');
    fileNames.push(`${num}_budaya_${slug}.jpg`);
  });

  culinaryItems.forEach((cu, idx) => {
    const slug = cu.title.toLowerCase().replace(/[^a-z0-9]+/g, '_').slice(0, 30);
    const num = String(destinations.length + cultureItems.length + idx + 2).padStart(2, '0');
    fileNames.push(`${num}_kuliner_${slug}.jpg`);
  });

  eventItems.forEach((ev, idx) => {
    const slug = ev.title.toLowerCase().replace(/[^a-z0-9]+/g, '_').slice(0, 30);
    const num = String(destinations.length + cultureItems.length + culinaryItems.length + idx + 2).padStart(2, '0');
    fileNames.push(`${num}_event_${slug}.jpg`);
  });

  interface PageData {
    buffer: Buffer;
    width: number;
    height: number;
  }

  const pagesData1: PageData[] = [];

  for (let i = 0; i < articles1.length; i++) {
    const art = articles1[i];
    const filename = fileNames[i] || `page_${String(i + 1).padStart(2, '0')}.jpg`;
    const targetPath = path.join(jpgDir, filename);
    const publicTargetPath = path.join(publicJpgDir, filename);

    const box = await art.boundingBox();
    const width = box ? Math.round(box.width) : 480;
    const height = box ? Math.round(box.height) : 720;

    const imgBuffer = await art.screenshot({
      type: 'jpeg',
      quality: 92
    }) as Buffer;

    fs.writeFileSync(targetPath, imgBuffer);
    fs.copyFileSync(targetPath, publicTargetPath);

    pagesData1.push({
      buffer: imgBuffer,
      width,
      height
    });

    if ((i + 1) % 25 === 0 || i === articles1.length - 1) {
      console.log(`   [${i + 1}/${articles1.length}] Halaman tersimpan: ${filename} (${width}x${height}px)`);
    }
  }

  if (pagesData1.length > 0) {
    const first = pagesData1[0];
    const doc = new jsPDF({
      orientation: 'portrait',
      unit: 'px',
      format: [first.width, first.height],
      hotfixes: ['px_scaling']
    });

    doc.addImage(first.buffer.toString('base64'), 'JPEG', 0, 0, first.width, first.height);

    for (let i = 1; i < pagesData1.length; i++) {
      const p = pagesData1[i];
      doc.addPage([p.width, p.height], 'portrait');
      doc.addImage(p.buffer.toString('base64'), 'JPEG', 0, 0, p.width, p.height);
    }

    const outPdfPath1 = path.join(pdfOutDir, 'malala-panduan-wisata-sumbar-2026.pdf');
    const pdfArrayBuffer1 = Buffer.from(doc.output('arraybuffer'));
    fs.writeFileSync(outPdfPath1, pdfArrayBuffer1);

    console.log(`🎉 PDF Panduan Lengkap Selesai: ${outPdfPath1}`);
    console.log(`⚖️ Ukuran: ${(pdfArrayBuffer1.length / (1024 * 1024)).toFixed(2)} MB (${pagesData1.length} Halaman)`);
  }

  await page1.close();

  // =========================================================================
  // TASK 2: OFFICIAL CALENDAR OF EVENTS (CoE) 2026 DEDICATED PDF
  // =========================================================================
  console.log('\n========================================');
  console.log('📅 2. MERENDER E-BOOKLET KALENDER EVENT (CoE) 2026...');
  console.log('========================================');

  const page2 = await browser.newPage();
  await page2.setViewport({ width: 600, height: 900, deviceScaleFactor: 2 });

  const htmlPath2 = path.join(process.cwd(), 'public', 'event_calendar_printable.html');
  const fileUrl2 = `file:///${htmlPath2.replace(/\\/g, '/')}`;

  console.log(`📄 Memuat halaman: ${fileUrl2}`);
  await page2.goto(fileUrl2, { waitUntil: 'domcontentloaded', timeout: 60000 });
  await new Promise(r => setTimeout(r, 4000));

  const articles2 = await page2.$$('article.page-card');
  console.log(`Ditemukan ${articles2.length} halaman kartu event.`);

  const pagesData2: PageData[] = [];

  for (let i = 0; i < articles2.length; i++) {
    const art = articles2[i];
    const box = await art.boundingBox();
    const width = box ? Math.round(box.width) : 480;
    const height = box ? Math.round(box.height) : 720;

    const imgBuffer = await art.screenshot({
      type: 'jpeg',
      quality: 92
    }) as Buffer;

    pagesData2.push({
      buffer: imgBuffer,
      width,
      height
    });
  }

  if (pagesData2.length > 0) {
    const first = pagesData2[0];
    const doc2 = new jsPDF({
      orientation: 'portrait',
      unit: 'px',
      format: [first.width, first.height],
      hotfixes: ['px_scaling']
    });

    doc2.addImage(first.buffer.toString('base64'), 'JPEG', 0, 0, first.width, first.height);

    for (let i = 1; i < pagesData2.length; i++) {
      const p = pagesData2[i];
      doc2.addPage([p.width, p.height], 'portrait');
      doc2.addImage(p.buffer.toString('base64'), 'JPEG', 0, 0, p.width, p.height);
    }

    const outPdfPath2 = path.join(pdfOutDir, 'kalender-event-sumbar-2026.pdf');
    const pdfArrayBuffer2 = Buffer.from(doc2.output('arraybuffer'));
    fs.writeFileSync(outPdfPath2, pdfArrayBuffer2);

    console.log(`🎉 PDF Kalender Event 2026 Selesai: ${outPdfPath2}`);
    console.log(`⚖️ Ukuran: ${(pdfArrayBuffer2.length / (1024 * 1024)).toFixed(2)} MB (${pagesData2.length} Halaman)`);
  }

  await page2.close();
  await browser.close();

  console.log(`\n🎉 SEMUA PDF RESMI BERHASIL DIBUAT SEMPURNA!`);
}

exportAllPDFs();
