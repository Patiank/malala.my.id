const fs = require('fs');
let index = fs.readFileSync('index.html', 'utf8');

const adSenseCode = `    <!-- Google AdSense Auto Ads -->
    <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7249231182967738" crossorigin="anonymous"></script>
  </head>`;

index = index.replace('</head>', adSenseCode);

fs.writeFileSync('index.html', index, 'utf8');
console.log('AdSense code injected successfully!');
