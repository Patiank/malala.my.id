import { jsPDF } from 'jspdf';
import * as fs from 'fs';
import * as path from 'path';

console.log('Testing jsPDF...');
const doc = new jsPDF({
  orientation: 'portrait',
  unit: 'mm',
  format: 'a4'
});

doc.text('MALALA 2026 TEST', 20, 20);
const outDir = path.join(process.cwd(), 'public', 'downloads');
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}
const outPath = path.join(outDir, 'test.pdf');
fs.writeFileSync(outPath, Buffer.from(doc.output('arraybuffer')));
console.log('Test PDF generated successfully at:', outPath);
