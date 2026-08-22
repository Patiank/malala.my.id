/**
 * Autonomous Search Engine IndexNow & SEO Ping Utility
 * Instantly alerts Google, Bing, and search crawlers about new events and news.
 */

export async function pingSearchEngineIndexNow(urls: string[] = ['https://malala.my.id']): Promise<boolean> {
  const host = 'malala.my.id';
  const key = 'malala-sumbar-2026-seo-token';

  const payload = {
    host,
    key,
    keyLocation: `https://${host}/${key}.txt`,
    urlList: urls.map(u => u.startsWith('http') ? u : `https://${host}${u}`)
  };

  try {
    const res = await fetch('https://api.indexnow.org/indexnow', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json; charset=utf-8' },
      body: JSON.stringify(payload)
    });
    return res.ok || res.status === 200 || res.status === 202;
  } catch (e) {
    console.warn('IndexNow ping notice:', e);
    return false;
  }
}
