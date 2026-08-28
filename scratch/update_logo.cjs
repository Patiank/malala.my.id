const fs = require('fs');

const OLD_URL = 'https://res.cloudinary.com/uupbxcw5/image/upload/v1787206698/minangkaos_logo_t9ozpg.png';

// 1. CustomIcons.tsx -> standard root relative path
let customIcons = fs.readFileSync('src/components/CustomIcons.tsx', 'utf8');
customIcons = customIcons.replace(OLD_URL, '/minangkaos-logo-compact.png');
fs.writeFileSync('src/components/CustomIcons.tsx', customIcons, 'utf8');

// 2. generate_html_pdf.ts -> relative path for local PDF renderer
let htmlPdf = fs.readFileSync('scripts/generate_html_pdf.ts', 'utf8');
htmlPdf = htmlPdf.split(OLD_URL).join('./minangkaos-logo-compact.png');
fs.writeFileSync('scripts/generate_html_pdf.ts', htmlPdf, 'utf8');

// 3. generate_event_pdf.ts -> relative path for local PDF renderer
let eventPdf = fs.readFileSync('scripts/generate_event_pdf.ts', 'utf8');
eventPdf = eventPdf.split(OLD_URL).join('./minangkaos-logo-compact.png');
fs.writeFileSync('scripts/generate_event_pdf.ts', eventPdf, 'utf8');

console.log('Logo URLs updated.');
