import puppeteer from 'puppeteer-core';
import * as fs from 'fs';
import * as path from 'path';
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

async function exportPagesAndPDF() {
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

  // 2. Render CLEAN PDF without header/footer (NO date, NO time, NO URL)
  console.log('📕 Membuat File PDF Bersih (Tanpa Teks Tanggal & Waktu)...');
  const pdfOutDir = path.join(process.cwd(), 'public', 'downloads');
  if (!fs.existsSync(pdfOutDir)) fs.mkdirSync(pdfOutDir, { recursive: true });
  const outPdfPath = path.join(pdfOutDir, 'malala-panduan-wisata-sumbar-2026.pdf');

  await page.pdf({
    path: outPdfPath,
    format: 'A4',
    printBackground: true,
    displayHeaderFooter: false, // NO header/footer timestamps
    margin: { top: '0mm', bottom: '0mm', left: '0mm', right: '0mm' }
  });
  console.log(`✅ PDF Bersih Tersimpan: ${outPdfPath}`);

  // 3. Export all 77 pages as separate high-res JPG files
  const jpgDir = path.join(process.cwd(), 'ebooklet_pages_jpg');
  if (!fs.existsSync(jpgDir)) fs.mkdirSync(jpgDir, { recursive: true });

  const publicJpgDir = path.join(process.cwd(), 'public', 'ebooklet_pages_jpg');
  if (!fs.existsSync(publicJpgDir)) fs.mkdirSync(publicJpgDir, { recursive: true });

  console.log(`📸 Mengekspor 77 Halaman menjadi File JPG ke folder: ${jpgDir}...`);

  const articles = await page.$$('article.page-card');
  console.log(`Ditemukan ${articles.length} halaman kartu.`);

  // Generate clean filenames
  const fileNames: string[] = ['01_cover_malala_2026.jpg'];

  DESTINATIONS.forEach((d, idx) => {
    const slug = d.title.toLowerCase().replace(/[^a-z0-9]+/g, '_').slice(0, 30);
    const num = String(idx + 2).padStart(2, '0');
    fileNames.push(`${num}_destinasi_${slug}.jpg`);
  });

  CULTURE_ITEMS.forEach((c, idx) => {
    const slug = c.title.toLowerCase().replace(/[^a-z0-9]+/g, '_').slice(0, 30);
    const num = String(DESTINATIONS.length + idx + 2).padStart(2, '0');
    fileNames.push(`${num}_budaya_${slug}.jpg`);
  });

  CULINARY_ITEMS.forEach((cu, idx) => {
    const slug = cu.title.toLowerCase().replace(/[^a-z0-9]+/g, '_').slice(0, 30);
    const num = String(DESTINATIONS.length + CULTURE_ITEMS.length + idx + 2).padStart(2, '0');
    fileNames.push(`${num}_kuliner_${slug}.jpg`);
  });

  EVENTS_SCHEDULE.forEach((ev, idx) => {
    const slug = ev.title.toLowerCase().replace(/[^a-z0-9]+/g, '_').slice(0, 30);
    const num = String(DESTINATIONS.length + CULTURE_ITEMS.length + CULINARY_ITEMS.length + idx + 2).padStart(2, '0');
    fileNames.push(`${num}_event_${slug}.jpg`);
  });

  for (let i = 0; i < articles.length; i++) {
    const art = articles[i];
    const filename = fileNames[i] || `page_${String(i + 1).padStart(2, '0')}.jpg`;
    const targetPath = path.join(jpgDir, filename);
    const publicTargetPath = path.join(publicJpgDir, filename);

    await art.screenshot({
      path: targetPath,
      type: 'jpeg',
      quality: 90
    });

    // Also copy to public directory
    fs.copyFileSync(targetPath, publicTargetPath);

    if ((i + 1) % 10 === 0 || i === articles.length - 1) {
      console.log(`   [${i + 1}/${articles.length}] Berhasil diekspor: ${filename}`);
    }
  }

  await browser.close();
  console.log(`\n🎉 SELESAI SEMPURNA!`);
  console.log(`📁 Seluruh 77 file JPG tersimpan di: ${jpgDir}`);
  console.log(`📕 File PDF bersih tersimpan di: ${outPdfPath}`);
}

exportPagesAndPDF();
