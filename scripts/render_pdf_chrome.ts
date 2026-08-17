import { execFileSync } from 'child_process';
import * as fs from 'fs';
import * as path from 'path';

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

console.log('Using browser:', browserExe);

const htmlPath = path.join(process.cwd(), 'public', 'ebooklet_printable.html');
const outPdfPath = path.join(process.cwd(), 'public', 'downloads', 'malala-panduan-wisata-sumbar-2026.pdf');

console.log('Rendering 1:1 pixel-perfect PDF...');

execFileSync(browserExe, [
  '--headless',
  '--disable-gpu',
  '--run-all-compositor-stages-before-draw',
  '--virtual-time-budget=10000',
  '--print-to-pdf-no-header',
  `--print-to-pdf=${outPdfPath}`,
  `file:///${htmlPath.replace(/\\/g, '/')}`
], { stdio: 'inherit' });

if (fs.existsSync(outPdfPath)) {
  const stats = fs.statSync(outPdfPath);
  console.log(`🎉 SUKSES: 1:1 Pixel-Perfect PDF berhasil di-generate!`);
  console.log(`📁 File: ${outPdfPath}`);
  console.log(`⚖️ Size: ${(stats.size / (1024 * 1024)).toFixed(2)} MB`);
} else {
  console.error('PDF not created.');
}
