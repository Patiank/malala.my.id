import puppeteer from 'puppeteer';

(async () => {
  const browser = await puppeteer.launch({ 
    headless: 'new',
    executablePath: 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  const page = await browser.newPage();

  console.log('Loading https://malala.my.id ...');
  await page.goto('https://malala.my.id', { waitUntil: 'domcontentloaded' });
  await new Promise(r => setTimeout(r, 2000));

  const fontInfo = await page.evaluate(() => {
    const bodyFont = window.getComputedStyle(document.body).fontFamily;
    const h1 = document.querySelector('h1');
    const h1Font = h1 ? window.getComputedStyle(h1).fontFamily : 'no h1';
    const logo = document.querySelector('header span, .font-orbitron');
    const logoFont = logo ? window.getComputedStyle(logo).fontFamily : 'no logo';
    const buttons = Array.from(document.querySelectorAll('button')).map(b => ({
      text: b.textContent?.trim().substring(0, 20),
      font: window.getComputedStyle(b).fontFamily
    }));
    
    return {
      bodyFont,
      h1Font,
      logoFont,
      buttonsSample: buttons.slice(0, 5)
    };
  });

  console.log('Font Information:', JSON.stringify(fontInfo, null, 2));

  await browser.close();
})();
