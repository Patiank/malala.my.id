import 'dotenv/config';
import fs from 'fs';
import path from 'path';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, doc, setDoc, getDocs } from 'firebase/firestore';

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
  if (text.includes('budaya') || text.includes('songket') || text.includes('adat') || text.includes('pagaruyung') || text.includes('istano')) {
    return 'https://images.unsplash.com/photo-1590523741831-ab7e8b8f9c7f?auto=format&fit=crop&w=800&q=80';
  }
  if (text.includes('padang') || text.includes('kota') || text.includes('pantai') || text.includes('air manis')) {
    return 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80';
  }
  if (text.includes('bukittinggi') || text.includes('jam gadang')) {
    return 'https://images.unsplash.com/photo-1596402184320-417e7178b2cd?auto=format&fit=crop&w=800&q=80';
  }
  return 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=800&q=80';
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

    const merged = [...filteredNew, ...existingArray];
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

  // ============================================================
  // 1. AI HOT INFO / BERITA PARIWISATA SCANNER (Google Search Grounding)
  // ============================================================
  if (apiKey) {
    try {
      console.log("📰 [03:00 WIB] Menjalankan AI News Scanner (Google Search Grounding)...");
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
    "date": "Contoh: 24 Oktober 2026",
    "dateEn": "Example: October 24, 2026",
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
          console.log(`📥 AI menemukan ${parsedNews.length} liputan berita baru terverifikasi:`);
          const newItemsToStore = [];

          for (let i = 0; i < parsedNews.length; i++) {
            const n = parsedNews[i];
            if (!n.title) continue;
            const docId = `hi-auto-${Date.now()}-${i}`;
            const itemObj = {
              ...n,
              id: docId,
              createdAt: new Date().toISOString(),
              generatedAt: new Date().toISOString(),
              generatedBy: 'Malala Autonomous AI (Google Search Grounding at 03:00 WIB)',
              isAIGenerated: true,
              imageUrl: n.imageUrl || getSmartImage(n.title, n.category)
            };
            await setDoc(doc(db, 'hotinfo', docId), itemObj);
            newItemsToStore.push(itemObj);
            console.log(`   ✓ [${n.date || 'Terkini'}] ${n.title}`);

            const slug = (n.title || '').toString().toLowerCase().trim().replace(/[^\w\s-]/g, '').replace(/[\s_-]+/g, '-').replace(/^-+|-+$/g, '');
            if (slug) {
              generatedNewsUrls.push(`https://malala.my.id/berita/${slug}`);
            }
          }

          try {
            syncNewsToStaticConfigFile(newItemsToStore);
          } catch (cfgErr) {
            console.warn("   ⚠️ Gagal memperbarui staticConfig.ts:", cfgErr.message);
          }
        }
      }
    } catch (newsErr) {
      console.warn("⚠️ AI News Scanner kendala:", newsErr.message);
    }
  }

  // ============================================================
  // 2. AI EVENT SCANNER (KEN & CoE Sumbar)
  // ============================================================
  try {
    const eventSnap = await getDocs(collection(db, 'events'));
    const currentEvents = eventSnap.docs.map(d => ({ id: d.id, ...d.data() }));
    console.log(`📊 Database saat ini memiliki ${currentEvents.length} event.`);

    if (apiKey) {
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
    console.warn("⚠️ AI Event Scanner kendala:", eventErr.message);
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
