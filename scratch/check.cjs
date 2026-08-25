const fs = require('fs');
const code = fs.readFileSync('dist/index.html', 'utf8');
console.log(code.match(/<link[^>]*>/g));
