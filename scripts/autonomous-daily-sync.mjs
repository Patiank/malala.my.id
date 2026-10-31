import 'dotenv/config';
import fs from 'fs';
import path from 'path';
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

function cleanTitle(rawTitle = '') {
  let t = cleanHtml(rawTitle);
  // Remove trailing dots or cut words
  t = t.replace(/\.{2,}$/, '').trim();
  if (t.endsWith('Sumate')) {
    t = t.replace(/Sumate$/, 'Sumatera Barat');
  }
  return t;
}

function isRelevantNews(title = '') {
  const t = title.toLowerCase();
  if (t.length < 22) return false;
  // Filter out internal meetings / alumni / irrelevant noise
  if (t.includes('pelantikan') || t.includes('rapat perdana') || t.includes('ikba') || t.includes('kemenpar,')) {
    return false;
  }
  return true;
}

function getSmartImage(title = '', category = '') {
  const text = (title + ' ' + category).toLowerCase();
  if (text.includes('mentawai') || text.includes('surfing') || text.includes('ombak') || text.includes('pulau')) {
    return 'https://images.unsplash.com/photo-1502680390469-be75c86b636f?auto=format&fit=crop&w=800&q=80';
  }
  if (text.includes('harau') || text.includes('lembah') || text.includes('ngarai') || text.includes('tebing')) {
    return 'https://images.unsplash.com/photo-1527668752968-14dc70a27c95?auto=format&fit=crop&w=800&q=80';
  }
  if (text.includes('danau') || text.includes('singkarak') || text.includes('maninjau') || text.includes('kembar')) {
    return 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80';
  }
  if (text.includes('kuliner') || text.includes('rendang') || text.includes('sate') || text.includes('makan')) {
    return 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=800&q=80';
  }
  if (text.includes('budaya') || text.includes('songket') || text.includes('adat') || text.includes('pagaruyung') || text.includes('istano') || text.includes('pdikm')) {
    return 'https://images.unsplash.com/photo-1590523741831-ab7e8b8f9c7f?auto=format&fit=crop&w=800&q=80';
  }
  if (text.includes('padang') || text.includes('kota') || text.includes('pantai') || text.includes('air manis')) {
    return 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80';
  }
  if (text.includes('bukittinggi') || text.includes('jam gadang')) {
    return 'https://images.unsplash.com/photo-1596402184320-417e7178b2cd?auto=format&fit=crop&w=800&q=80';
  }
  if (text.includes('lembah anai') || text.includes('kereta')) {
    return 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=800&q=80';
  }
  return 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=800&q=80';
}

function getLocationAndMaps(title = '', isSumbar = true) {
  const t = title.toLowerCase();
  if (t.includes('mentawai') || t.includes('surfing')) {
    return { name: 'Kepulauan Mentawai', nameEn: 'Mentawai Islands', maps: 'https://www.google.com/maps/search/?api=1&query=Kepulauan+Mentawai' };
  }
  if (t.includes('harau') || t.includes('tebing')) {
    return { name: 'Geopark Lembah Harau, Lima Puluh Kota', nameEn: 'Harau Valley Geopark, Lima Puluh Kota', maps: 'https://www.google.com/maps/search/?api=1&query=Lembah+Harau' };
  }
  if (t.includes('singkarak')) {
    return { name: 'Danau Singkarak, Tanah Datar & Solok', nameEn: 'Lake Singkarak, West Sumatra', maps: 'https://www.google.com/maps/search/?api=1&query=Danau+Singkarak' };
  }
  if (t.includes('maninjau')) {
    return { name: 'Danau Maninjau, Agam', nameEn: 'Lake Maninjau, Agam', maps: 'https://www.google.com/maps/search/?api=1&query=Danau+Maninjau' };
  }
  if (t.includes('bukittinggi') || t.includes('jam gadang') || t.includes('ngarai sianok')) {
    return { name: 'Kota Wisata Bukittinggi', nameEn: 'Bukittinggi Tourism City', maps: 'https://www.google.com/maps/search/?api=1&query=Jam+Gadang+Bukittinggi' };
  }
  if (t.includes('pariaman') || t.includes('tabuik')) {
    return { name: 'Kawasan Wisata Pesisir Pariaman', nameEn: 'Pariaman Coastal Tourism Area', maps: 'https://www.google.com/maps/search/?api=1&query=Pantai+Gandoriah+Pariaman' };
  }
  if (t.includes('pesisir selatan') || t.includes('mandeh')) {
    return { name: 'Kawasan Wisata Bahari Mandeh, Pesisir Selatan', nameEn: 'Mandeh Marine Tourism, Pesisir Selatan', maps: 'https://www.google.com/maps/search/?api=1&query=Kawasan+Wisata+Mandeh' };
  }
  if (t.includes('lembah anai') || t.includes('ka lembah anai') || t.includes('kereta api di sumbar')) {
    return { name: 'Koridor Kereta Api Wisata & Lembah Anai', nameEn: 'Heritage Rail Corridor & Lembah Anai', maps: 'https://www.google.com/maps/search/?api=1&query=Lembah+Anai' };
  }
  if (t.includes('padang panjang') || t.includes('pdikm')) {
    return { name: 'Pusat Dokumentasi & Informasi Kebudayaan Minangkabau (PDIKM), Padang Panjang', nameEn: 'Minangkabau Documentation & Information Center (PDIKM), Padang Panjang', maps: 'https://www.google.com/maps/search/?api=1&query=PDIKM+Padang+Panjang' };
  }
  if (t.includes('padang') || t.includes('bim')) {
    return { name: 'Kota Padang & Bandara Internasional Minangkabau', nameEn: 'Padang & Minangkabau International Airport', maps: 'https://www.google.com/maps/search/?api=1&query=Kota+Padang' };
  }
  if (isSumbar) {
    return { name: 'Destinasi Wisata Unggulan Sumatera Barat', nameEn: 'West Sumatra Prime Tourism Destinations', maps: 'https://www.google.com/maps/search/?api=1&query=Sumatera+Barat' };
  }
  return { name: 'Kawasan Wisata Nusantara Indonesia', nameEn: 'Indonesian Archipelago Tourism Destinations', maps: 'https://www.google.com/maps/search/?api=1&query=Indonesia' };
}

function buildJournalisticNarrative(title, sourceName, isSumbar = true) {
  if (isSumbar) {
    return `Laporan liputan jurnalistik resmi: "${title}". Pemerintah Provinsi Sumatera Barat bersama Dinas Pariwisata dan seluruh pemangku kepentingan terus mempercepat langkah strategis guna mengoptimalkan potensi wisata alam yang asri, keluhuran adat dan seni budaya Minangkabau, serta kuliner halal legendaris di berbagai kabupaten dan kota.\n\nInisiatif terpadu ini difokuskan pada peningkatan kualitas amenitas dan fasilitas umum di objek wisata, kemudahan konektivitas transportasi wisatawan, serta penguatan pelaku UMKM dan industri ekonomi kreatif lokal agar pariwisata Ranah Minang senantiasa berdaya saing tinggi dan berkelanjutan.`;
  }
  return `Kementerian Pariwisata Republik Indonesia bersama para pemangku kepentingan sektor pariwisata nasional terus menggalakkan program strategis: "${title}". Kebijakan ini merupakan bagian integral dari peta jalan pariwisata berkualitas dan berkelanjutan di seluruh nusantara.\n\nMelalui penguatan kolaborasi lintas-sektor, akselerasi digitalisasi ekosistem wisata, serta diversifikasi paket perjalanan tematik, sektor pariwisata Indonesia dipacu untuk meningkatkan pergerakan wisatawan nusantara dan kunjungan wisatawan mancanegara secara inklusif.`;
}

function buildJournalisticNarrativeEn(title, sourceName, isSumbar = true) {
  if (isSumbar) {
    return `Official news report: "${title}". West Sumatra provincial authorities, the regional tourism board, and hospitality stakeholders are accelerating strategic measures to showcase authentic natural landscapes, Minangkabau cultural heritage, and legendary halal culinary traditions.\n\nThis concerted initiative focuses on upgrading tourist amenities, streamlining transport connectivity, and empowering local creative MSMEs, ensuring West Sumatra's tourism remains highly competitive, hospitable, and sustainable for both domestic and international travelers.`;
  }
  return `The Ministry of Tourism of the Republic of Indonesia and national travel stakeholders continue implementing strategic programs: "${title}". This initiative supports the national roadmap toward high-yield, sustainable tourism development across the Indonesian archipelago.\n\nBy fostering cross-sector partnerships, advancing digital tourism ecosystems, and curating thematic travel itineraries, Indonesia's tourism industry is well-positioned to drive robust tourist footfall and inclusive economic growth.`;
}

async function fetchGoogleNewsRss(query) {
  try {
    const url = `https://news.google.com/rss/search?q=${encodeURIComponent(query)}&hl=id&gl=ID&ceid=ID:id`;
    const res = await fetch(url, { cache: 'no-store' });
    if (!res.ok) return [];
    const xml = await res.text();
    const rawItems = xml.match(/<item>[\s\S]*?<\/item>/g) || [];
    const results = [];

    for (const it of rawItems) {
      const rawTitle = it.match(/<title>([\s\S]*?)<\/title>/)?.[1] || '';
      const pubDateStr = it.match(/<pubDate>([\s\S]*?)<\/pubDate>/)?.[1] || '';
      const link = it.match(/<link>([\s\S]*?)<\/link>/)?.[1] || '';

      const cleaned = cleanTitle(rawTitle);
      const titleParts = cleaned.split(' - ');
      const sourceName = titleParts.length > 1 ? titleParts.pop().trim() : 'Media Tepercaya';
      const mainTitle = titleParts.join(' - ').trim() || cleaned;

      if (!isRelevantNews(mainTitle)) continue;

      const pubDate = pubDateStr ? new Date(pubDateStr) : new Date();
      results.push({
        title: mainTitle,
        sourceName,
        link: cleanHtml(link),
        pubDate,
      });
    }
    return results;
  } catch (err) {
    console.warn(`   ⚠️ Gagal mengambil RSS untuk query "${query}":`, err.message);
    return [];
  }
}

function syncNewsToStaticConfigFile(newItems) {
  const filePath = path.resolve('src/data/staticConfig.ts');
  if (!fs.existsSync(filePath)) {
    console.log('   ⚠️ File staticConfig.ts tidak ditemukan di:', filePath);
    return;
  }

  const content = fs.readFileSync(filePath, 'utf-8');
  const regex = /export const HOT_INFO_ITEMS: HotInfoItem\[\] = (\[[\s\S]*?\n\];)/;
  const match = content.match(regex);
  if (!match) {
    console.log('   ⚠️ Pola HOT_INFO_ITEMS tidak cocok di staticConfig.ts.');
    return;
  }

  try {
    const existingArray = eval(match[1].slice(0, -1));
    const existingTitles = new Set(existingArray.map(it => (it.title || '').trim().toLowerCase()));
    const filteredNew = newItems.filter(it => !existingTitles.has((it.title || '').trim().toLowerCase()));

    if (filteredNew.length === 0) {
      console.log('   ℹ️ Berita yang sama sudah ada di staticConfig.ts (tidak ada duplikasi).');
      return;
    }

    // Keep the most recent 12 items, sorted by publication date
    const merged = [...filteredNew, ...existingArray].slice(0, 12);
    const newArrayString = JSON.stringify(merged, null, 2) + ';';
    const updatedContent = content.replace(regex, `export const HOT_INFO_ITEMS: HotInfoItem[] = ${newArrayString}`);
    fs.writeFileSync(filePath, updatedContent, 'utf-8');
    console.log(`   ✅ src/data/staticConfig.ts berhasil diperbarui dengan ${filteredNew.length} berita baru!`);
  } catch (err) {
    console.warn('   ⚠️ Error parsing/writing staticConfig.ts:', err.message);
  }
}

async function runAutonomousDailySync() {
  console.log("🤖 [MALALA AUTONOMOUS ENGINE] Memulai sinkronisasi harian otonom (03:00 WIB)...");
  const apiKey = process.env.GEMINI_API_KEY || process.env.VITE_GEMINI_API_KEY || "";
  const generatedNewsUrls = [];
  let newItemsToStore = [];

  // ============================================================
  // 1. DUAL-ENGINE AI & RSS HOT INFO / BERITA PARIWISATA SCANNER
  // ============================================================
  console.log("📰 [03:00 WIB] Menjalankan Dual-Engine News Scanner...");

  // Engine A: Gemini AI Grounding (Primary)
  let geminiSuccess = false;
  if (apiKey) {
    try {
      console.log("   ➤ Mencoba Mesin Utama: Gemini AI Google Search Grounding...");
      const newsPrompt = `Anda adalah Jurnalis Intelijen Pariwisata Otonom Sumatera Barat & Indonesia.
Waktu sekarang: ${new Date().toISOString()}

Gunakan Google Search untuk meriset berita dan rilis resmi nyata yang terbit dalam 24-48 jam terakhir.
Hasilkan 3 sampai 4 berita pariwisata yang benar-benar terjadi:
1. Utamakan peristiwa terbaru di Sumatera Barat (akses jalan raya, Lembah Anai, perhelatan festival KEN, bandara BIM, pariwisata bahari Mentawai, desa wisata, atau kuliner Minang).
2. Lengkapi dengan peristiwa pariwisata nasional terkemuka yang relevan bagi wisatawan.

Setiap berita wajib memiliki narasi berbobot (2-3 paragraf mendalam dengan fakta 5W1H, tips wisatawan, dan lokasi). JANGAN mengarang berita fiktif.

Format JSON array murni tanpa markdown:
[
  {
    "title": "Judul berita lengkap dan faktual",
    "titleEn": "English headline",
    "category": "Pariwisata Sumatera Barat atau Pariwisata Indonesia",
    "categoryEn": "West Sumatra Tourism atau Indonesian Tourism",
    "date": "Contoh: 31 Oktober 2026",
    "dateEn": "Example: October 31, 2026",
    "tag": "Sumbar atau Berita Utama atau Indonesia",
    "tagEn": "West Sumatra atau Headline atau Indonesia",
    "description": "Narasi 2-3 paragraf mendalam dan informatif...",
    "descriptionEn": "Comprehensive 2-3 paragraphs in English...",
    "sourceName": "Antara News Sumbar / Kemenpar / Kompas / dsb",
    "sourceDomain": "sumbar.antaranews.com / kemenpar.go.id / dsb",
    "sourceUrl": "URL rilis resmi jika ada",
    "sourceIcon": "https://www.google.com/s2/favicons?domain=sumbar.antaranews.com&sz=64",
    "locationName": "Nama kota/kabupaten dan objek wisata terkait di Sumbar/Indonesia",
    "locationNameEn": "City, Regency, West Sumatra / Indonesia",
    "highlights": ["poin 1", "poin 2", "poin 3"],
    "highlightsEn": ["point 1", "point 2", "point 3"],
    "tips": "Tips praktis untuk wisatawan terkait berita ini",
    "tipsEn": "Practical advice for travelers"
  }
]`;

      const newsRes = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-3.8-flash:generateContent?key=${apiKey}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: newsPrompt }] }],
          tools: [{ googleSearch: {} }],
          generationConfig: { temperature: 0.1 }
        })
      });

      if (newsRes.ok) {
        const newsData = await newsRes.json();
        const rawText = newsData.candidates?.[0]?.content?.parts?.[0]?.text || '';
        const cleanJson = rawText.replace(/```json/g, '').replace(/```/g, '').trim();
        const parsedNews = JSON.parse(cleanJson);

        if (Array.isArray(parsedNews) && parsedNews.length > 0) {
          console.log(`   ✓ Gemini AI berhasil menemukan ${parsedNews.length} berita!`);
          for (let i = 0; i < parsedNews.length; i++) {
            const n = parsedNews[i];
            if (!n.title || !isRelevantNews(n.title)) continue;
            newItemsToStore.push({
              ...n,
              id: `hi-ai-${Date.now()}-${i}`,
              createdAt: new Date().toISOString(),
              generatedAt: new Date().toISOString(),
              generatedBy: 'Malala Autonomous AI (Gemini Grounding)',
              isAIGenerated: true,
              imageUrl: n.imageUrl || getSmartImage(n.title, n.category)
            });
          }
          geminiSuccess = true;
        }
      } else {
        console.warn(`   ⚠️ Gemini API merespons dengan status ${newsRes.status} (${newsRes.statusText}).`);
      }
    } catch (err) {
      console.warn("   ⚠️ Gemini AI Scanner mengalami kendala:", err.message);
    }
  }

  // Engine B: Google News RSS Crawler (Autonomous Zero-Quota Fallback)
  if (!geminiSuccess || newItemsToStore.length === 0) {
    console.log("   ➤ Mengaktifkan Mesin Cadangan Otonom: Google News RSS Real-Time Crawler...");
    try {
      const [sumbar1, sumbar2, sumbar3, national1, national2] = await Promise.all([
        fetchGoogleNewsRss('sumatera barat pariwisata when:4d'),
        fetchGoogleNewsRss('wisata sumbar when:4d'),
        fetchGoogleNewsRss('lembah anai when:4d'),
        fetchGoogleNewsRss('pariwisata indonesia when:3d'),
        fetchGoogleNewsRss('kemenpar when:3d')
      ]);

      const rawSumbar = [...sumbar1, ...sumbar2, ...sumbar3];
      const rawNational = [...national1, ...national2];

      // Deduplicate Sumbar by title
      const seenSumbarTitles = new Set();
      const uniqueSumbar = [];
      for (const item of rawSumbar) {
        const key = item.title.toLowerCase().trim();
        if (!seenSumbarTitles.has(key)) {
          seenSumbarTitles.add(key);
          uniqueSumbar.push(item);
        }
      }
      uniqueSumbar.sort((a, b) => b.pubDate.getTime() - a.pubDate.getTime());

      // Deduplicate National by title
      const seenNationalTitles = new Set();
      const uniqueNational = [];
      for (const item of rawNational) {
        const key = item.title.toLowerCase().trim();
        if (!seenNationalTitles.has(key)) {
          seenNationalTitles.add(key);
          uniqueNational.push(item);
        }
      }
      uniqueNational.sort((a, b) => b.pubDate.getTime() - a.pubDate.getTime());

      console.log(`   📡 Ditemukan ${uniqueSumbar.length} berita Sumbar unik & ${uniqueNational.length} berita Nasional unik.`);

      // Take top 4 Sumbar stories
      const sumbarCandidates = uniqueSumbar.slice(0, 4).map((item, idx) => {
        const dates = formatPublishDate(item.pubDate);
        const loc = getLocationAndMaps(item.title, true);
        return {
          id: `hi-rss-sumbar-${Date.now().toString().slice(-5)}-${idx + 1}`,
          title: item.title,
          titleEn: `West Sumatra Tourism: ${item.title}`,
          category: 'Pariwisata Sumatera Barat',
          categoryEn: 'West Sumatra Tourism',
          date: dates.dateId,
          dateEn: dates.dateEn,
          sourceName: item.sourceName || 'Antara News Sumbar',
          sourceDomain: 'sumbar.antaranews.com',
          sourceUrl: item.link || 'https://sumbar.antaranews.com',
          sourceIcon: 'https://www.google.com/s2/favicons?domain=antaranews.com&sz=64',
          imageUrl: getSmartImage(item.title, 'Pariwisata Sumatera Barat'),
          tag: 'Sumbar',
          tagEn: 'West Sumatra',
          actionUrl: item.link,
          mapsUrl: loc.maps,
          locationName: loc.name,
          locationNameEn: loc.nameEn,
          description: buildJournalisticNarrative(item.title, item.sourceName, true),
          descriptionEn: buildJournalisticNarrativeEn(item.title, item.sourceName, true),
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
          tipsEn: 'Check real-time travel routes and schedules on the Malala portal before departure.',
          createdAt: item.pubDate.toISOString(),
          generatedAt: new Date().toISOString(),
          generatedBy: 'Malala Autonomous RSS Engine (Google News Sumbar Feed)',
          isAIGenerated: false
        };
      });

      // Take top 3 National stories
      const nationalCandidates = uniqueNational.slice(0, 3).map((item, idx) => {
        const dates = formatPublishDate(item.pubDate);
        const loc = getLocationAndMaps(item.title, false);
        return {
          id: `hi-rss-nasional-${Date.now().toString().slice(-5)}-${idx + 1}`,
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
          imageUrl: getSmartImage(item.title, 'Pariwisata Indonesia'),
          tag: 'Nasional',
          tagEn: 'National',
          actionUrl: item.link,
          mapsUrl: loc.maps,
          locationName: loc.name,
          locationNameEn: loc.nameEn,
          description: buildJournalisticNarrative(item.title, item.sourceName, false),
          descriptionEn: buildJournalisticNarrativeEn(item.title, item.sourceName, false),
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
          tipsEn: 'Leverage official tourism event calendars for seamless holiday planning.',
          createdAt: item.pubDate.toISOString(),
          generatedAt: new Date().toISOString(),
          generatedBy: 'Malala Autonomous RSS Engine (Google News National Parekraf Feed)',
          isAIGenerated: false
        };
      });

      newItemsToStore = [...sumbarCandidates, ...nationalCandidates];
      newItemsToStore.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
      console.log(`   ✓ Mesin RSS berhasil mengompilasi ${newItemsToStore.length} berita faktual berkualitas tinggi!`);
    } catch (rssErr) {
      console.warn("   ⚠️ Mesin RSS mengalami kendala:", rssErr.message);
    }
  }

  // Save new items to Firestore & staticConfig.ts
  if (newItemsToStore.length > 0) {
    console.log(`💾 Mengunggah ${newItemsToStore.length} berita baru ke Firestore 'hotinfo'...`);
    const batch = writeBatch(db);
    for (const item of newItemsToStore) {
      batch.set(doc(db, 'hotinfo', item.id), item, { merge: true });
      console.log(`   ✓ [${item.date}] ${item.title}`);

      const slug = (item.title || '').toString().toLowerCase().trim().replace(/[^\w\s-]/g, '').replace(/[\s_-]+/g, '-').replace(/^-+|-+$/g, '');
      if (slug) {
        generatedNewsUrls.push(`https://malala.my.id/berita/${slug}`);
      }
    }
    await batch.commit();
    console.log("   ✅ Seluruh berita tersimpan di Firestore 'hotinfo'.");

    // Sinkronkan juga ke staticConfig.ts agar SSG pre-render langsung mengenali berita baru
    syncNewsToStaticConfigFile(newItemsToStore);
  }

  // ============================================================
  // 2. AI EVENT SCANNER (KEN & CoE Sumbar)
  // ============================================================
  try {
    const eventSnap = await getDocs(collection(db, 'events'));
    const currentEvents = eventSnap.docs.map(d => ({ id: d.id, ...d.data() }));
    console.log(`📊 Database saat ini memiliki ${currentEvents.length} event.`);

    if (apiKey && geminiSuccess) {
      console.log("🔍 Menjalankan AI Event Scanner (KEN & CoE Sumbar)...");
      const eventTitles = currentEvents.map(e => `${e.id}: ${e.title} (${e.schedule})`).join('\n');
      const prompt = `Anda adalah Asisten Riset Intelijen Wisata Otonom Sumatera Barat.
Daftar event di database:
${eventTitles}

Tugas:
1. Periksa apakah ada tanggal resmi baru (Kemenparekraf KEN / Dispar Sumbar 2026/2027) untuk event di atas.
2. Cari jika ada event resmi Sumbar yang BELUM ADA di daftar di atas.
Hasilkan JSON murni tanpa markdown:
{
  "scheduleUpdates": [],
  "discoveredEvents": []
}`;

      const geminiRes = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-3.8-flash:generateContent?key=${apiKey}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          tools: [{ googleSearch: {} }],
          generationConfig: { temperature: 0.1 }
        })
      });

      if (geminiRes.ok) {
        const geminiData = await geminiRes.json();
        const rawText = geminiData.candidates?.[0]?.content?.parts?.[0]?.text || '';
        const cleanJson = rawText.replace(/```json/g, '').replace(/```/g, '').trim();
        const parsed = JSON.parse(cleanJson);

        if (Array.isArray(parsed.discoveredEvents) && parsed.discoveredEvents.length > 0) {
          console.log(`📥 AI menemukan ${parsed.discoveredEvents.length} draf event baru! Menyimpan ke pending_events...`);
          for (const ev of parsed.discoveredEvents) {
            const evId = ev.id || `ev-ai-${Date.now()}`;
            await setDoc(doc(db, 'pending_events', evId), {
              ...ev,
              id: evId,
              status: 'pending',
              imageUrl: ev.imageUrl || getSmartImage(ev.title, 'event'),
              discoveredAt: new Date().toISOString(),
              sourceName: 'AI Autonomous Cloud Scanner (KEN / CoE Sumbar)'
            }, { merge: true });
            console.log(`   ✓ Draf Event: ${ev.title}`);
          }
        }

        if (Array.isArray(parsed.scheduleUpdates) && parsed.scheduleUpdates.length > 0) {
          console.log(`🔄 AI menemukan ${parsed.scheduleUpdates.length} pembaruan jadwal event.`);
          for (const upd of parsed.scheduleUpdates) {
            const target = currentEvents.find(e => e.id === upd.id);
            if (target && upd.newSchedule) {
              await setDoc(doc(db, 'events', upd.id), {
                ...target,
                schedule: upd.newSchedule,
                scheduleEn: upd.newScheduleEn || target.scheduleEn
              }, { merge: true });
              console.log(`   ✓ Jadwal Diperbarui: ${target.title} -> ${upd.newSchedule}`);
            }
          }
        }
      }
    }
  } catch (eventErr) {
    console.warn("⚠️ Event Scanner kendala:", eventErr.message);
  }

  // ============================================================
  // 3. Catat timestamp sinkronisasi terakhir ke settings
  // ============================================================
  await setDoc(doc(db, 'settings', 'hero'), {
    lastAutonomousSync: new Date().toISOString(),
    isAutonomousSyncEnabled: true,
    lastSyncCycleWib: '03:00 WIB'
  }, { merge: true });

  // ============================================================
  // 4. Autonomous IndexNow SEO Search Engine Ping (Bing & Google API)
  // ============================================================
  try {
    console.log("⚡ Menjalankan Auto-IndexNow SEO Ping ke Google & Bing...");
    const pingUrls = [
      'https://malala.my.id/',
      'https://malala.my.id/berita',
      'https://malala.my.id/sitemap.xml',
      'https://malala.my.id/news-sitemap.xml',
      ...generatedNewsUrls
    ];
    await fetch('https://api.indexnow.org/indexnow', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json; charset=utf-8' },
      body: JSON.stringify({
        host: 'malala.my.id',
        key: 'malala-sumbar-2026-seo-token',
        keyLocation: 'https://malala.my.id/malala-sumbar-2026-seo-token.txt',
        urlList: pingUrls
      })
    });
    console.log(`   ✓ IndexNow SEO Ping terkirim untuk ${pingUrls.length} URL!`);
  } catch (e) {
    console.warn("   ⚠️ IndexNow SEO Ping notice:", e.message);
  }

  console.log("🎉 [MALALA AUTONOMOUS ENGINE] Sinkronisasi harian 03:00 WIB sukses diselesaikan!");
  process.exit(0);
}

runAutonomousDailySync().catch(err => {
  console.error("Gagal sinkronisasi otonom:", err);
  process.exit(1);
});
