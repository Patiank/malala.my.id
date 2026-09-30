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

// 1. Generate updated English HTML templates
console.log('🔄 Generating English HTML templates (Travel Guide & Calendar of Events)...');
execSync('cmd /c npx tsx scripts/generate_html_pdf_en.ts', { stdio: 'inherit' });
execSync('cmd /c npx tsx scripts/generate_event_pdf_en.ts', { stdio: 'inherit' });

/**
 * Ensures ALL images in the page are completely loaded, downloaded, and decoded
 */
async function preloadAndEnsureAllImages(page: any) {
  console.log('   ⏳ Preloading and decoding all images across the document...');
  
  await page.evaluate(`
    (async () => {
      // 1. Scroll through the page to trigger all image requests
      await new Promise((resolve) => {
        let currentPosition = 0;
        const step = 600;
        const scrollInterval = setInterval(() => {
          const totalHeight = document.body.scrollHeight;
          window.scrollBy(0, step);
          currentPosition += step;

          if (currentPosition >= totalHeight) {
            clearInterval(scrollInterval);
            window.scrollTo(0, 0);
            resolve();
          }
        }, 50);
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
            setTimeout(finish, 20000);
          });
        })
      );
    })()
  `);

  // Extra safety buffer after decoding all images
  await new Promise(r => setTimeout(r, 2000));
}

async function setupLocalRequestInterception(page: any) {
  await page.setRequestInterception(true);
  page.on('request', (req: any) => {
    const url = req.url();
    // Intercept local images: /images/... or file:///.../images/...
    if (url.includes('/images/')) {
      const parts = url.split('/images/');
      const relPath = parts[parts.length - 1].split('?')[0];
      const localFile = path.join(process.cwd(), 'public', 'images', decodeURIComponent(relPath));
      if (fs.existsSync(localFile)) {
        const ext = path.extname(localFile).toLowerCase();
        const contentType = ext === '.png' ? 'image/png' : ext === '.webp' ? 'image/webp' : 'image/jpeg';
        return req.respond({
          status: 200,
          contentType,
          body: fs.readFileSync(localFile)
        });
      }
    }
    if (url.includes('minangkaos-logo-compact.png')) {
      const logoFile = path.join(process.cwd(), 'public', 'minangkaos-logo-compact.png');
      if (fs.existsSync(logoFile)) {
        return req.respond({
          status: 200,
          contentType: 'image/png',
          body: fs.readFileSync(logoFile)
        });
      }
    }
    req.continue();
  });
}

async function exportEnglishPDFs() {
  console.log(`🚀 Launching Chromium Engine (${browserExe})...`);
  
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
  // TASK 1: FULL ENGLISH TRAVEL GUIDE PDF
  // =========================================================================
  console.log('\n========================================');
  console.log('📘 1. RENDERING ENGLISH TRAVEL GUIDE PDF...');
  console.log('========================================');

  const page1 = await browser.newPage();
  await page1.setViewport({ width: 600, height: 900, deviceScaleFactor: 2 });
  await setupLocalRequestInterception(page1);

  const htmlPath1 = path.join(process.cwd(), 'public', 'ebooklet_printable_en.html');
  const fileUrl1 = `file:///${htmlPath1.replace(/\\/g, '/')}`;

  console.log(`📄 Loading template: ${fileUrl1}`);
  await page1.goto(fileUrl1, { waitUntil: 'domcontentloaded', timeout: 120000 });
  
  await preloadAndEnsureAllImages(page1);

  const jpgDir1 = path.join(process.cwd(), 'ebooklet_pages_en_jpg');
  if (!fs.existsSync(jpgDir1)) fs.mkdirSync(jpgDir1, { recursive: true });

  const articles1 = await page1.$$('article.page-card');
  console.log(`Found ${articles1.length} page cards.`);

  const pagesData1: PageData[] = [];

  for (let i = 0; i < articles1.length; i++) {
    const art = articles1[i];
    const filename = `page_${String(i + 1).padStart(3, '0')}.jpg`;
    const targetPath = path.join(jpgDir1, filename);

    await art.scrollIntoView();
    await page1.evaluate(async (el: any) => {
      const img = el.querySelector('img');
      if (img) {
        if (!img.complete) {
          await new Promise((res) => {
            img.onload = res;
            img.onerror = res;
            setTimeout(res, 2500);
          });
        }
        if (img.decode) {
          await img.decode().catch(() => {});
        }
      }
    }, art);
    await new Promise(r => setTimeout(r, 70));

    const box = await art.boundingBox();
    const width = box ? Math.round(box.width) : 480;
    const height = box ? Math.round(box.height) : 720;

    const imgBuffer = await art.screenshot({
      type: 'jpeg',
      quality: 92
    }) as Buffer;

    try {
      fs.writeFileSync(targetPath, imgBuffer);
    } catch (writeImgErr: any) {
      // Ignored if temporarily locked
    }

    pagesData1.push({
      buffer: imgBuffer,
      width,
      height
    });

    if ((i + 1) % 25 === 0 || i === articles1.length - 1) {
      console.log(`   [${i + 1}/${articles1.length}] Page rendered: ${filename} (${width}x${height}px)`);
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

    const outPdfPath1 = path.join(pdfOutDir, 'malala-tourism-guide-sumbar-2026-en.pdf');
    const pdfArrayBuffer1 = Buffer.from(doc.output('arraybuffer'));
    try {
      fs.writeFileSync(outPdfPath1, pdfArrayBuffer1);
      console.log(`🎉 English Travel Guide PDF Complete: ${outPdfPath1}`);
      console.log(`⚖️ Size: ${(pdfArrayBuffer1.length / (1024 * 1024)).toFixed(2)} MB (${pagesData1.length} Pages)`);
    } catch (writeErr: any) {
      console.warn(`⚠️ Warning: Failed to write PDF 1:`, writeErr?.message);
    }
  }

  await page1.close();

  // =========================================================================
  // TASK 2: OFFICIAL CALENDAR OF EVENTS (CoE) 2026 ENGLISH PDF
  // =========================================================================
  console.log('\n========================================');
  console.log('📅 2. RENDERING ENGLISH CALENDAR OF EVENTS (CoE) PDF...');
  console.log('========================================');

  const page2 = await browser.newPage();
  await page2.setViewport({ width: 600, height: 900, deviceScaleFactor: 2 });
  await setupLocalRequestInterception(page2);

  const htmlPath2 = path.join(process.cwd(), 'public', 'event_calendar_printable_en.html');
  const fileUrl2 = `file:///${htmlPath2.replace(/\\/g, '/')}`;

  console.log(`📄 Loading template: ${fileUrl2}`);
  await page2.goto(fileUrl2, { waitUntil: 'domcontentloaded', timeout: 120000 });
  
  await preloadAndEnsureAllImages(page2);

  const jpgDir2 = path.join(process.cwd(), 'event_pages_en_jpg');
  if (!fs.existsSync(jpgDir2)) fs.mkdirSync(jpgDir2, { recursive: true });

  const articles2 = await page2.$$('article.page-card');
  console.log(`Found ${articles2.length} event page cards.`);

  const pagesData2: PageData[] = [];

  for (let i = 0; i < articles2.length; i++) {
    const art = articles2[i];
    const filename = `event_page_${String(i + 1).padStart(3, '0')}.jpg`;
    const targetPath = path.join(jpgDir2, filename);

    await art.scrollIntoView();
    await page2.evaluate(async (el: any) => {
      const img = el.querySelector('img');
      if (img) {
        if (!img.complete) {
          await new Promise((res) => {
            img.onload = res;
            img.onerror = res;
            setTimeout(res, 2500);
          });
        }
        if (img.decode) {
          await img.decode().catch(() => {});
        }
      }
    }, art);
    await new Promise(r => setTimeout(r, 70));

    const box = await art.boundingBox();
    const width = box ? Math.round(box.width) : 480;
    const height = box ? Math.round(box.height) : 720;

    const imgBuffer = await art.screenshot({
      type: 'jpeg',
      quality: 92
    }) as Buffer;

    try {
      fs.writeFileSync(targetPath, imgBuffer);
    } catch (writeImgErr: any) {
      // Ignored if temporarily locked
    }

    pagesData2.push({
      buffer: imgBuffer,
      width,
      height
    });

    if ((i + 1) % 10 === 0 || i === articles2.length - 1) {
      console.log(`   [${i + 1}/${articles2.length}] Event page rendered: ${filename} (${width}x${height}px)`);
    }
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

    const outPdfPath2 = path.join(pdfOutDir, 'kalender-event-sumbar-2026-en.pdf');
    const pdfArrayBuffer2 = Buffer.from(doc2.output('arraybuffer'));
    try {
      fs.writeFileSync(outPdfPath2, pdfArrayBuffer2);
      console.log(`🎉 English Calendar of Events 2026 PDF Complete: ${outPdfPath2}`);
      console.log(`⚖️ Size: ${(pdfArrayBuffer2.length / (1024 * 1024)).toFixed(2)} MB (${pagesData2.length} Pages)`);
    } catch (writeErr2: any) {
      console.warn(`⚠️ Warning: Failed to write PDF 2:`, writeErr2?.message);
    }
  }

  await page2.close();
  await browser.close();

  console.log(`\n🎉 BOTH ENGLISH E-BOOKS HAVE BEEN EXPORTED WITH PIXEL-PERFECT LAYOUT, FONTS, AND IMAGES!`);
}

exportEnglishPDFs();
