const fs = require('fs');

['dist/kebudayaan/index.html', 'dist/destinasi/index.html'].forEach(p => {
  if (fs.existsSync(p)) {
    const content = fs.readFileSync(p, 'utf8');
    console.log('--- ' + p + ' ---');
    console.log('Length:', content.length);
    const titleMatch = content.match(/<title>([^<]*)<\/title>/);
    console.log('Title:', titleMatch ? titleMatch[1] : 'No title');
    const canonMatch = content.match(/<link rel="canonical" href="([^"]*)"/);
    console.log('Canonical:', canonMatch ? canonMatch[1] : 'No canonical');
    const rootMatch = content.match(/<div id="root">([\s\S]*?)<\/div>/);
    console.log('Root content preview:', rootMatch ? rootMatch[1].slice(0, 250) : 'Empty root');
  } else {
    console.log(p + ' DOES NOT EXIST!');
  }
});
