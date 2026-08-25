async function checkRobots() {
  try {
    const res = await fetch('https://malala.my.id/robots.txt');
    console.log('Robots Status:', res.status, res.statusText);
    console.log('Robots Content-Type:', res.headers.get('content-type'));
    const text = await res.text();
    console.log('Robots text:\n', text);
  } catch (e) {
    console.error('Fetch error:', e);
  }
}
checkRobots();
