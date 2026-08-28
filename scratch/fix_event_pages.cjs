const fs = require('fs');
let content = fs.readFileSync('scripts/generate_event_pdf.ts', 'utf8');

// The original line:
// <span class="font-black text-slate-600 bg-slate-100 border border-slate-200 px-1.5 py-0.5 rounded shadow-sm text-[9px] shrink-0 whitespace-nowrap">Hal. ${globalIndex + overviewChunks.length + 2}</span>

content = content.replace(
  /Hal\. \$\{globalIndex \+ overviewChunks\.length \+ 2\}/g,
  'Hal. ${globalIndex}'
);

// Also let's change the bottom corner to be explicit about it being "Hal."
// Original: <span class="font-orbitron font-bold text-gray-400">#${String(idx + 1).padStart(2, '0')} / ${eventItems.length}</span>
content = content.replace(
  /#\$\{String\(idx \+ 1\)\.padStart\(2, '0'\)\} \/ \$\{eventItems\.length\}/g,
  'Hal. ${idx + 1} dari ${eventItems.length}'
);

fs.writeFileSync('scripts/generate_event_pdf.ts', content, 'utf8');
console.log('Fixed page numbers');
