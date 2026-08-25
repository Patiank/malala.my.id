import puppeteer from 'puppeteer';

(async () => {
  const browser = await puppeteer.launch({ 
    headless: 'new',
    executablePath: 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  const page = await browser.newPage();
  
  let jsErrors = [];
  page.on('pageerror', err => {
    console.error('CRITICAL PAGE ERROR:', err.message);
    jsErrors.push(err.message);
  });

  console.log('1. Loading https://malala.my.id ...');
  await page.goto('https://malala.my.id', { waitUntil: 'domcontentloaded' });
  await new Promise(r => setTimeout(r, 1500));
  console.log('Homepage Title:', await page.title());

  console.log('2. Testing /destinasi ...');
  await page.goto('https://malala.my.id/destinasi', { waitUntil: 'domcontentloaded' });
  await new Promise(r => setTimeout(r, 1500));
  console.log('Destinasi Title:', await page.title());

  console.log('3. Testing /destinasi/lembah-harau ...');
  await page.goto('https://malala.my.id/destinasi/lembah-harau', { waitUntil: 'domcontentloaded' });
  await new Promise(r => setTimeout(r, 1500));
  console.log('Lembah Harau Title:', await page.title());

  console.log('4. Testing /kuliner/rendang-daging ...');
  await page.goto('https://malala.my.id/kuliner/rendang-daging', { waitUntil: 'domcontentloaded' });
  await new Promise(r => setTimeout(r, 1500));
  console.log('Rendang Title:', await page.title());

  console.log('5. Testing /event/pacu-jawi ...');
  await page.goto('https://malala.my.id/event/pacu-jawi', { waitUntil: 'domcontentloaded' });
  await new Promise(r => setTimeout(r, 1500));
  console.log('Pacu Jawi Title:', await page.title());

  await browser.close();
  if (jsErrors.length > 0) {
    console.error('TEST FAILED! Errors encountered:', jsErrors);
    process.exit(1);
  } else {
    console.log('✅ ALL TESTS PASSED WITH 0 JAVASCRIPT ERRORS!');
  }
})();
