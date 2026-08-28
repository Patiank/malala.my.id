const fs = require('fs');

// 1. Update event pdf (IKHTISAR JADWAL TAHUNAN)
let eventTs = fs.readFileSync('scripts/generate_event_pdf.ts', 'utf8');

eventTs = eventTs.replace(
  /(\<span class="font-bold text-blue-900"\>.*?ev\.schedule\}<\/span>)/g,
  `$1\n                  <span class="text-gray-300">?</span>\n                  <span class="font-bold text-red-700 bg-red-100 px-1 py-0.5 rounded shadow-xs whitespace-nowrap">Hal. \${globalIndex + overviewChunks.length + 1}</span>`
);

fs.writeFileSync('scripts/generate_event_pdf.ts', eventTs, 'utf8');
console.log('generate_event_pdf.ts updated.');
