const puppeteer = require('puppeteer-core');
(async () => {
  const browser = await puppeteer.launch({executablePath: 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe'});
  const page = await browser.newPage();
  page.on('console', msg => console.log('PAGE LOG:', msg.text()));
  page.on('pageerror', err => console.log('PAGE ERROR:', err.stack || err.message));
  await page.goto('https://malala-my-id.web.app', {waitUntil: 'domcontentloaded'});
  console.log('Page loaded, now finding buttons...');
  
  const buttons = await page.$$('button');
  for (const btn of buttons) {
    const text = await page.evaluate(el => el.textContent, btn);
    if (text && (text.includes('UNI MALA AI') || text.includes('Buat Itinerary'))) {
      console.log('Clicking button:', text.trim());
      await btn.click();
      await new Promise(r => setTimeout(r, 1000));
    }
  }
  console.log('Done test.');
  await browser.close();
})();
