const fs = require('fs');

let htmlTs = fs.readFileSync('scripts/generate_html_pdf.ts', 'utf8');

const tocLogic = `
  const tocEntries = [
    { title: 'PETA PARIWISATA & BUDAYA SUMBAR', type: 'INFOGRAFIS' },
    { title: 'BAB 1: DESTINASI WISATA ALAM', type: 'DIVIDER' },
    ...destinations.map(d => ({ title: d.title, type: 'DESTINASI' })),
    { title: 'BAB 2: WARISAN ADAT & BUDAYA', type: 'DIVIDER' },
    ...cultureItems.map(c => ({ title: c.title, type: 'BUDAYA' })),
    { title: 'BAB 3: KULINER & GASTRONOMI', type: 'DIVIDER' },
    ...culinaryItems.map(c => ({ title: c.title, type: 'KULINER' })),
    { title: 'BAB 4: KALENDER EVENT & FESTIVAL', type: 'DIVIDER' },
    ...eventItems.map(e => ({ title: e.title, type: 'FESTIVAL' }))
  ];

  const itemsPerPage = 80;
  const tocPagesCount = Math.ceil(tocEntries.length / itemsPerPage);
  let globalPdfPage = 1 + tocPagesCount;

  const assignedToc = tocEntries.map(entry => {
    globalPdfPage++;
    return { ...entry, page: globalPdfPage };
  });

  const tocChunks = [];
  for (let i = 0; i < assignedToc.length; i += itemsPerPage) {
    tocChunks.push(assignedToc.slice(i, i + itemsPerPage));
  }

  const tocHtml = tocChunks.map((chunk, idx) => {
    const col1 = chunk.slice(0, Math.ceil(itemsPerPage / 2));
    const col2 = chunk.slice(Math.ceil(itemsPerPage / 2));
    return \`
    <article class="page-card bg-white text-slate-900 rounded-2xl overflow-hidden border border-gray-200 p-6 flex flex-col justify-between mb-6 shadow-sm">
      <div>
        <div class="border-b border-gray-200 pb-3 mb-4">
          <div class="flex items-center justify-between">
            <span class="text-[10px] font-extrabold font-orbitron uppercase text-blue-600 tracking-wider">
              DAFTAR ISI ? BAGIAN \${idx + 1}/\${tocChunks.length}
            </span>
          </div>
          <h2 class="font-orbitron font-black text-xl text-slate-900 uppercase pt-1">
            DAFTAR ISI
          </h2>
        </div>
        <div class="flex gap-4">
          <div class="flex-1 space-y-1.5">
            \${col1.map(e => \`
              <div class="flex items-end gap-2 text-[10px]">
                <span class="\${e.type === 'DIVIDER' ? 'font-black text-[11px] text-blue-900 mt-2' : 'font-semibold text-slate-700 truncate'}">\${e.title}</span>
                \${e.type === 'DIVIDER' ? '' : '<span class="flex-1 border-b border-dotted border-gray-300 relative -top-1"></span>'}
                <span class="\${e.type === 'DIVIDER' ? 'font-black text-[11px] text-blue-900 mt-2' : 'font-bold text-blue-600'}">\${e.page}</span>
              </div>
            \`).join('')}
          </div>
          <div class="flex-1 space-y-1.5">
            \${col2.map(e => \`
              <div class="flex items-end gap-2 text-[10px]">
                <span class="\${e.type === 'DIVIDER' ? 'font-black text-[11px] text-blue-900 mt-2' : 'font-semibold text-slate-700 truncate'}">\${e.title}</span>
                \${e.type === 'DIVIDER' ? '' : '<span class="flex-1 border-b border-dotted border-gray-300 relative -top-1"></span>'}
                <span class="\${e.type === 'DIVIDER' ? 'font-black text-[11px] text-blue-900 mt-2' : 'font-bold text-blue-600'}">\${e.page}</span>
              </div>
            \`).join('')}
          </div>
        </div>
      </div>
      <div class="pt-2 border-t border-gray-100 text-center text-[9px] font-bold text-gray-400">Hal. \${1 + idx + 1}</div>
    </article>
    \`;
  }).join('');
  
  let pageCounter = 1 + tocPagesCount;
  const getNextPage = () => { pageCounter++; return pageCounter; };

  return \`
`;

if (!htmlTs.includes('const tocEntries = [')) {
  htmlTs = htmlTs.replace(
    /return `\n<!DOCTYPE html>/,
    `${tocLogic}<!DOCTYPE html>`
  );
}

// 2. Inject `\${tocHtml}` after cover page
if (!htmlTs.includes('${tocHtml}')) {
  htmlTs = htmlTs.replace(
    /<\/article>\n\s*<!-- 2\. PETA PERSEBARAN 19 KABUPATEN & KOTA \(REGIONAL TOURISM & CULTURE MAP\) -->/,
    `</article>\n\n    \${tocHtml}\n\n    <!-- 2. PETA PERSEBARAN 19 KABUPATEN & KOTA (REGIONAL TOURISM & CULTURE MAP) -->`
  );
}

fs.writeFileSync('scripts/generate_html_pdf.ts', htmlTs, 'utf8');
console.log('generate_html_pdf.ts updated properly.');
