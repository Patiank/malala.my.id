const fs = require('fs');
let index = fs.readFileSync('index.html', 'utf8');

const favicons = `    <meta charset="UTF-8" />
    <!-- Favicon / Logo Situs -->
    <link rel="icon" type="image/png" href="/minangkaos-logo-compact.png" />
    <link rel="apple-touch-icon" href="/minangkaos-logo-compact.png" />`;

index = index.replace('<meta charset="UTF-8" />', favicons);

fs.writeFileSync('index.html', index, 'utf8');
console.log('Favicon injected successfully!');
