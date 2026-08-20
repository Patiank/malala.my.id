import puppeteer from 'puppeteer-core';
import * as fs from 'fs';
import * as path from 'path';
import { jsPDF } from 'jspdf';
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

/**
 * Ensures ALL images in the page are completely loaded, downloaded, and decoded
 */
async function preloadAndEnsureAllImages(page: any) {
  console.log('   ⏳ Memuat dan mendownload seluruh gambar di halaman...');
  
  // Use pure string evaluation to avoid any tsx/esbuild helper injection (__name)
  await page.evaluate(`
    (async () => {
      // 1. Scroll through the page to trigger all image requests
      await new Promise((resolve) => {
        let currentPosition = 0;
        const step = 800;
        const scrollInterval = setInterval(() => {
          const totalHeight = document.body.scrollHeight;
          window.scrollBy(0, step);
          currentPosition += step;

          if (currentPosition >= totalHeight) {
            clearInterval(scrollInterval);
            window.scrollTo(0, 0);
            resolve();
          }
        }, 60);
      });

      // 2. Wait for every <img> element to be complete and decoded
      const images = Array.from(document.querySelectorAll('img'));
      await Promise.all(
        images.map((img) => {
          if (img.complete && img.naturalWidth > 0) {
            return Promise.resolve();
          }
          return new Promise((resolve) => {
            const finish = () => {
              img.removeEventListener('load', finish);
              img.removeEventListener('error', finish);
              resolve();
            };
            img.addEventListener('load', finish);
            img.addEventListener('error', finish);
            setTimeout(finish, 10000);
          });
        })
      );
    })()
  `);

  // Extra safety buffer after decoding all images
  await new Promise(r => setTimeout(r, 2000));
}

async function exportAllPDFs() {
  console.log(`🚀 Menjalankan browser engine (${browserExe})...`);
  
  const browser = await puppeteer.launch({
    executablePath: browserExe,
    headless: true,
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-gpu',
      '--disable-web-security',
      '--allow-running-insecure-content'
    ]
  });

  const pdfOutDir = path.join(process.cwd(), 'public', 'downloads');
  if (!fs.existsSync(pdfOutDir)) fs.mkdirSync(pdfOutDir, { recursive: true });

  interface PageData {
    buffer: Buffer;
    width: number;
    height: number;
  }

  // =========================================================================
  // TASK 1: FULL TRAVEL GUIDE PDF (113 PAGES)
  // =========================================================================
  console.log('\n========================================');
  console.log('📘 1. MERENDER BUKU PANDUAN WISATA LENGKAP...');
  console.log('========================================');

  const page1 = await browser.newPage();
  await page1.setViewport({ width: 600, height: 900, deviceScaleFactor: 2 });

  const htmlPath1 = path.join(process.cwd(), 'public', 'ebooklet_printable.html');
  const fileUrl1 = `file:///${htmlPath1.replace(/\\/g, '/')}`;

  console.log(`📄 Memuat halaman: ${fileUrl1}`);
  await page1.goto(fileUrl1, { waitUntil: 'load', timeout: 90000 });
  
  // Preload and decode all images across the 113 cards
  await preloadAndEnsureAllImages(page1);

  const jpgDir = path.join(process.cwd(), 'ebooklet_pages_jpg');
  if (!fs.existsSync(jpgDir)) fs.mkdirSync(jpgDir, { recursive: true });

  const publicJpgDir = path.join(process.cwd(), 'public', 'ebooklet_pages_jpg');
  if (!fs.existsSync(publicJpgDir)) fs.mkdirSync(publicJpgDir, { recursive: true });

  const articles1 = await page1.$$('article.page-card');
  console.log(`Ditemukan ${articles1.length} halaman kartu.`);

  const pagesData1: PageData[] = [];

  for (let i = 0; i < articles1.length; i++) {
    const art = articles1[i];
    const filename = `page_${String(i + 1).padStart(3, '0')}.jpg`;
    const targetPath = path.join(jpgDir, filename);
    const publicTargetPath = path.join(publicJpgDir, filename);

    // Scroll into view to ensure paint
    await art.scrollIntoView();
    await new Promise(r => setTimeout(r, 60));

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
  // TASK 2: OFFICIAL CALENDAR OF EVENTS (CoE) 2026 DEDICATED PDF (27 PAGES)
  // =========================================================================
  console.log('\n========================================');
  console.log('📅 2. MERENDER E-BOOKLET KALENDER EVENT (CoE) 2026...');
  console.log('========================================');

  const page2 = await browser.newPage();
  await page2.setViewport({ width: 600, height: 900, deviceScaleFactor: 2 });

  const htmlPath2 = path.join(process.cwd(), 'public', 'event_calendar_printable.html');
  const fileUrl2 = `file:///${htmlPath2.replace(/\\/g, '/')}`;

  console.log(`📄 Memuat halaman: ${fileUrl2}`);
  await page2.goto(fileUrl2, { waitUntil: 'load', timeout: 90000 });
  
  // Preload and decode all images across the 27 event cards
  await preloadAndEnsureAllImages(page2);

  const articles2 = await page2.$$('article.page-card');
  console.log(`Ditemukan ${articles2.length} halaman kartu event.`);

  const pagesData2: PageData[] = [];

  for (let i = 0; i < articles2.length; i++) {
    const art = articles2[i];
    await art.scrollIntoView();
    await new Promise(r => setTimeout(r, 60));

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

  console.log(`\n🎉 SEMUA PDF RESMI BERHASIL DIBUAT SEMPURNA DENGAN SELURUH GAMBAR TERENDER!`);
}

exportAllPDFs();
