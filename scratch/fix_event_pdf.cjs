const fs = require('fs');

let eventTs = fs.readFileSync('scripts/generate_event_pdf.ts', 'utf8');

// 1. Remove the old messy page number
eventTs = eventTs.replace(
  /\n\s*<span class="text-gray-300">\?<\/span>\n\s*<span class="font-bold text-red-700 bg-red-100 px-1 py-0\.5 rounded shadow-xs whitespace-nowrap">Hal\. \$\{globalIndex \+ overviewChunks\.length \+ 1\}<\/span>/g,
  ''
);

// 2. Inject it nicely into the title bar, aligned to the right.
// The title bar is currently:
// <div class="flex items-start gap-1.5 justify-between">
//   <h4 class="font-bold text-slate-900 text-xs leading-snug break-words">${ev.title}</h4>
//   ${ev.isKen ? '<span class="bg-red-600 text-white font-extrabold text-[8px] uppercase px-1.5 py-0.5 rounded shrink-0 shadow-xs ml-1">KEN 2026</span>' : ''}
// </div>

const newTitleBar = `
                <div class="flex items-start justify-between gap-2">
                  <div class="flex flex-wrap items-center gap-1.5 flex-1">
                    <h4 class="font-bold text-slate-900 text-xs leading-snug break-words">\${ev.title}</h4>
                    \${ev.isKen ? '<span class="bg-red-600 text-white font-extrabold text-[8px] uppercase px-1.5 py-0.5 rounded shrink-0 shadow-xs">KEN 2026</span>' : ''}
                  </div>
                  <span class="font-black text-slate-600 bg-slate-100 border border-slate-200 px-1.5 py-0.5 rounded shadow-sm text-[9px] shrink-0 whitespace-nowrap">Hal. \${globalIndex + overviewChunks.length + 2}</span>
                </div>
`;

eventTs = eventTs.replace(
  /<div class="flex items-start gap-1\.5 justify-between">[\s\S]*?<\/div>/,
  newTitleBar.trim()
);

// We need to replace it globally since it's inside a string template?
// Wait, replacing it once in the source code file is enough because the file contains the template code.
// Let's use string replace carefully.

fs.writeFileSync('scripts/generate_event_pdf.ts', eventTs, 'utf8');
console.log('generate_event_pdf.ts fixed.');
