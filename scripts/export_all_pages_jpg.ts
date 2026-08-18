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

// 1. Generate updated HTML
console.log('🔄 Menyiapkan HTML template...');
execSync('cmd /c npx tsx scripts/generate_html_pdf.ts', { stdio: 'inherit' });

async function exportPagesAndDynamicPDF() {
  console.log(`🚀 Menjalankan browser engine (${browserExe})...`);
  
  const browser = await puppeteer.launch({
    executablePath: browserExe,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-gpu']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 600, height: 900, deviceScaleFactor: 2 }); // Crisp 2x retina scale

  const htmlPath = path.join(process.cwd(), 'public', 'ebooklet_printable.html');
  const fileUrl = `file:///${htmlPath.replace(/\\/g, '/')}`;

  console.log(`📄 Memuat halaman: ${fileUrl}`);
  await page.goto(fileUrl, { waitUntil: 'networkidle0', timeout: 60000 });

  // Wait extra 2s for images and fonts to render
  await new Promise(r => setTimeout(r, 2000));

  const jpgDir = path.join(process.cwd(), 'ebooklet_pages_jpg');
  if (!fs.existsSync(jpgDir)) fs.mkdirSync(jpgDir, { recursive: true });

  const publicJpgDir = path.join(process.cwd(), 'public', 'ebooklet_pages_jpg');
  if (!fs.existsSync(publicJpgDir)) fs.mkdirSync(publicJpgDir, { recursive: true });

  console.log(`📸 Mengekspor Halaman menjadi File JPG ke folder: ${jpgDir}...`);

  const articles = await page.$$('article.page-card');
  console.log(`Ditemukan ${articles.length} halaman kartu.`);

  // Generate clean filenames
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

  const pagesData: PageData[] = [];

  for (let i = 0; i < articles.length; i++) {
    const art = articles[i];
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

    pagesData.push({
      buffer: imgBuffer,
      width,
      height
    });

    if ((i + 1) % 15 === 0 || i === articles.length - 1) {
      console.log(`   [${i + 1}/${articles.length}] Halaman tersimpan: ${filename} (${width}x${height}px)`);
    }
  }

  await browser.close();

  // =========================================================================
  // COMPILE SEAMLESS DYNAMIC PDF (ZERO BLANK PAPER MARGINS - EXACT CARD SIZES)
  // =========================================================================
  console.log('\n📕 Menyusun PDF Seamless Dinamis (Tanpa Margin Kertas Tertentu / Pas Sesuai Bentuk Kartu)...');
  
  if (pagesData.length > 0) {
    const first = pagesData[0];
    const doc = new jsPDF({
      orientation: 'portrait',
      unit: 'px',
      format: [first.width, first.height],
      hotfixes: ['px_scaling']
    });

    // Add first page
    doc.addImage(first.buffer.toString('base64'), 'JPEG', 0, 0, first.width, first.height);

    // Add remaining pages with their own exact natural dimensions
    for (let i = 1; i < pagesData.length; i++) {
      const p = pagesData[i];
      doc.addPage([p.width, p.height], 'portrait');
      doc.addImage(p.buffer.toString('base64'), 'JPEG', 0, 0, p.width, p.height);
    }

    const pdfOutDir = path.join(process.cwd(), 'public', 'downloads');
    if (!fs.existsSync(pdfOutDir)) fs.mkdirSync(pdfOutDir, { recursive: true });
    const outPdfPath = path.join(pdfOutDir, 'malala-panduan-wisata-sumbar-2026.pdf');

    const pdfArrayBuffer = Buffer.from(doc.output('arraybuffer'));
    fs.writeFileSync(outPdfPath, pdfArrayBuffer);

    console.log(`🎉 PDF Seamless Berhasil Dibuat: ${outPdfPath}`);
    console.log(`⚖️ Ukuran File: ${(pdfArrayBuffer.length / (1024 * 1024)).toFixed(2)} MB`);
    console.log(`📄 Total Halaman: ${pagesData.length} halaman pas kartu 100% tanpa sisa kertas!`);
  }

  console.log(`\n🎉 SELESAI SEMPURNA!`);
  console.log(`📁 Seluruh file JPG tersimpan di: ${jpgDir}`);
}

exportPagesAndDynamicPDF();
