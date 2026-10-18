import 'dotenv/config';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, doc, setDoc, getDocs, writeBatch } from 'firebase/firestore';

const firebaseConfig = {
  projectId: "malala-web",
  appId: "1:521100250267:web:f98c67ac47b4d1a0300a3e",
  apiKey: "AIzaSyC6cfbqR8MAwiBFZt6GrWFSfIHYXC_pM0c",
  authDomain: "malala-web.firebaseapp.com",
  storageBucket: "malala-web.firebasestorage.app",
  messagingSenderId: "521100250267",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const monthNamesId = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];
const monthNamesEn = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

function formatPublishDate(d = new Date()) {
  const day = d.getDate();
  const m = d.getMonth();
  const y = d.getFullYear();
  return {
    dateId: `${day} ${monthNamesId[m]} ${y}`,
    dateEn: `${monthNamesEn[m]} ${day}, ${y}`
  };
}

function cleanHtml(str = '') {
  return str
    .replace(/<[^>]*>/g, '')
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&nbsp;/g, ' ')
    .trim();
}

async function fetchRssItems(query) {
  const url = `https://news.google.com/rss/search?q=${encodeURIComponent(query)}&hl=id&gl=ID&ceid=ID:id`;
  const res = await fetch(url, { cache: 'no-store' });
  const xml = await res.text();
  const rawItems = xml.match(/<item>[\s\S]*?<\/item>/g) || [];
  const results = [];

  for (const it of rawItems) {
    const rawTitle = it.match(/<title>([\s\S]*?)<\/title>/)?.[1] || '';
    const pubDateStr = it.match(/<pubDate>([\s\S]*?)<\/pubDate>/)?.[1] || '';
    const link = it.match(/<link>([\s\S]*?)<\/link>/)?.[1] || '';
    const desc = it.match(/<description>([\s\S]*?)<\/description>/)?.[1] || '';

    const cleanTitle = cleanHtml(rawTitle);
    const titleParts = cleanTitle.split(' - ');
    const sourceName = titleParts.length > 1 ? titleParts.pop().trim() : 'Media Nasional';
    const mainTitle = titleParts.join(' - ').trim() || cleanTitle;

    const pubDate = pubDateStr ? new Date(pubDateStr) : new Date();
    // Only accept items within the last 30 days
    const diffDays = (Date.now() - pubDate.getTime()) / (1000 * 60 * 60 * 24);
    if (diffDays > 30) continue;

    results.push({
      title: mainTitle,
      sourceName,
      link: cleanHtml(link),
      pubDate,
      snippet: cleanHtml(desc)
    });
  }
  return results;
}

async function syncLiveNews() {
  console.log("🚀 [MALALA NEWS SYNC] Mengambil berita pariwisata terkini dari RSS...");
  
  const sumbarRss = await fetchRssItems('pariwisata sumatera barat when:14d');
  const nationalRss = await fetchRssItems('kemenparekraf pariwisata indonesia when:14d');

  console.log(`📡 Ditemukan ${sumbarRss.length} berita Sumbar & ${nationalRss.length} berita Nasional.`);

  const curatedNews = [];

  // 1. Process top Sumbar stories
  const nowDates = formatPublishDate(new Date());

  // Template / mapped real stories
  const candidates = [
    ...sumbarRss.slice(0, 5).map((item, idx) => {
      const dates = formatPublishDate(item.pubDate);
      return {
        id: `hi-sumbar-${idx + 1}-${Date.now().toString().slice(-4)}`,
        title: item.title,
        titleEn: `West Sumatra Tourism: ${item.title}`,
        category: 'Pariwisata Sumatera Barat',
        categoryEn: 'West Sumatra Tourism',
        date: dates.dateId,
        dateEn: dates.dateEn,
        sourceName: item.sourceName || 'Antara News Sumbar',
        sourceDomain: item.link.includes('antaranews') ? 'antaranews.com' : 'sumbar.antaranews.com',
        sourceUrl: item.link || 'https://sumbar.antaranews.com',
        sourceIcon: 'https://www.google.com/s2/favicons?domain=antaranews.com&sz=64',
        imageUrl: '',
        tag: 'Sumbar',
        tagEn: 'West Sumatra',
        actionUrl: item.link,
        mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Sumatera+Barat',
        locationName: 'Destinasi Wisata Unggulan Sumatera Barat',
        locationNameEn: 'West Sumatra Prime Tourism Destination',
        description: item.snippet || `Laporan liputan jurnalistik terkini seputar perkembangan pariwisata dan geliat ekonomi kreatif di wilayah Sumatera Barat.`,
        descriptionEn: `Latest journalistic coverage on tourism and creative economy developments across West Sumatra regencies and cities.`,
        highlights: [
          'Akselerasi promosi destinasi wisata unggulan Ranah Minang',
          'Sinergi pemerintah daerah dan pelaku industri kreatif',
          'Dukungan fasilitas dan konektivitas wisatawan'
        ],
        highlightsEn: [
          'Accelerating West Sumatra tourism promotion',
          'Synergy between local government and hospitality sectors',
          'Strengthening tourist facilities and regional connectivity'
        ],
        tips: 'Cek jadwal dan kondisi rute perjalanan terkini di aplikasi Malala sebelum berwisata.',
        tipsEn: 'Check real-time travel routes and schedules on the Malala portal before departure.'
      };
    }),
    ...nationalRss.slice(0, 4).map((item, idx) => {
      const dates = formatPublishDate(item.pubDate);
      return {
        id: `hi-nasional-${idx + 1}-${Date.now().toString().slice(-4)}`,
        title: item.title,
        titleEn: `Indonesia Tourism Update: ${item.title}`,
        category: 'Pariwisata Indonesia',
        categoryEn: 'Indonesian Tourism',
        date: dates.dateId,
        dateEn: dates.dateEn,
        sourceName: item.sourceName || 'Kemenparekraf',
        sourceDomain: 'kemenparekraf.go.id',
        sourceUrl: item.link || 'https://kemenparekraf.go.id',
        sourceIcon: 'https://www.google.com/s2/favicons?domain=kemenparekraf.go.id&sz=64',
        imageUrl: '',
        tag: 'Nasional',
        tagEn: 'National',
        actionUrl: item.link,
        mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Indonesia',
        locationName: 'Kawasan Wisata Nusantara Indonesia',
        locationNameEn: 'Indonesian Archipelago Tourism Destinations',
        description: item.snippet || `Kementerian Pariwisata Republik Indonesia terus memperkuat strategi pariwisata berkualitas dan berkelanjutan di seluruh nusantara.`,
        descriptionEn: `The Ministry of Tourism continues advancing high-yield, sustainable tourism strategies across the Indonesian archipelago.`,
        highlights: [
          'Penguatan pariwisata berkelanjutan dan ramah lingkungan',
          'Peningkatan pergerakan wisatawan nusantara dan mancanegara',
          'Digitalisasi ekosistem pariwisata dan UMKM kreatif'
        ],
        highlightsEn: [
          'Strengthening sustainable and eco-friendly tourism',
          'Boosting domestic and international tourist movements',
          'Digital transformation of tourism and creative MSMEs'
        ],
        tips: 'Manfaatkan kalender event pariwisata resmi untuk merencanakan liburan.',
        tipsEn: 'Leverage official tourism event calendars for seamless holiday planning.'
      };
    })
  ];

  console.log(`📝 Total ${candidates.length} berita siap diunggah ke Firestore 'hotinfo'...`);

  const batch = writeBatch(db);
  for (const item of candidates) {
    batch.set(doc(db, 'hotinfo', item.id), item, { merge: true });
    console.log(`   ✓ [${item.tag}] ${item.title.slice(0, 60)}... (${item.date})`);
  }
  await batch.commit();

  console.log("✅ Berhasil menyimpan seluruh berita ke Firestore 'hotinfo' malala-web!");

  // Output candidate list so we can update staticConfig.ts
  import('fs').then(fs => {
    fs.writeFileSync('./scripts/fresh_news.json', JSON.stringify(candidates, null, 2), 'utf-8');
    console.log("💾 Berita disimpan ke ./scripts/fresh_news.json");
  });
}

syncLiveNews().catch(console.error);
