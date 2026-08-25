async function testGooglebotFetch() {
  const googlebotUa = 'Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)';
  
  console.log('--- Testing sitemap.xml with Googlebot User-Agent ---');
  try {
    const res = await fetch('https://malala.my.id/sitemap.xml', {
      headers: {
        'User-Agent': googlebotUa,
        'Accept': 'application/xml,text/xml,*/*'
      }
    });
    console.log('Status:', res.status, res.statusText);
    console.log('Headers:', Object.fromEntries(res.headers.entries()));
    const text = await res.text();
    console.log('Body length:', text.length);
    console.log('Valid XML start:', text.startsWith('<?xml'));
  } catch (e) {
    console.error('Fetch error:', e);
  }

  console.log('\n--- Testing robots.txt with Googlebot User-Agent ---');
  try {
    const res = await fetch('https://malala.my.id/robots.txt', {
      headers: {
        'User-Agent': googlebotUa
      }
    });
    console.log('Status:', res.status, res.statusText);
    const text = await res.text();
    console.log('Body length:', text.length);
  } catch (e) {
    console.error('Fetch error:', e);
  }
}

testGooglebotFetch();
