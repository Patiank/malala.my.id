import { initializeApp } from 'firebase/app';
import { getFirestore, collection, doc, setDoc, getDocs, deleteDoc, writeBatch } from 'firebase/firestore';

const firebaseConfig = {
  projectId: "malala-my-id",
  appId: "1:150503186564:web:64af24b2edc852fb23a2d1",
  apiKey: "AIzaSyBAizWQnaNb-EX-BcjoZt9BSRctFGyMEnE",
  authDomain: "malala-my-id.firebaseapp.com",
  storageBucket: "malala-my-id.firebasestorage.app",
  messagingSenderId: "150503186564",
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

async function runAutonomousDailySync() {
  console.log("🤖 [MALALA AUTONOMOUS ENGINE] Memulai sinkronisasi harian otonom...");
  const apiKey = process.env.GEMINI_API_KEY || process.env.VITE_GEMINI_API_KEY || "AQ.Ab8RN6L6YdQ1D5yiwawCr73Xqsd3nr9gLQ1AAG0xsKRfe8W9Uw";

  // 1. Ambil event yang ada dari Firestore
  const eventSnap = await getDocs(collection(db, 'events'));
  const currentEvents = eventSnap.docs.map(d => ({ id: d.id, ...d.data() }));
  console.log(`📊 Database saat ini memiliki ${currentEvents.length} event.`);

  // 2. AI Event Scanner
  if (apiKey) {
    try {
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

      const geminiRes = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`, {
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
    } catch (e) {
      console.warn("⚠️ AI Event Scanner kendala:", e.message);
    }
  }

  // 3. Catat timestamp sinkronisasi terakhir ke settings
  await setDoc(doc(db, 'settings', 'hero'), {
    lastAutonomousSync: new Date().toISOString(),
    isAutonomousSyncEnabled: true
  }, { merge: true });

  // 4. Autonomous IndexNow SEO Search Engine Ping (Bing & Google API)
  try {
    console.log("⚡ Menjalankan Auto-IndexNow SEO Ping ke Google & Bing...");
    await fetch('https://api.indexnow.org/indexnow', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json; charset=utf-8' },
      body: JSON.stringify({
        host: 'malala.my.id',
        key: 'malala-sumbar-2026-seo-token',
        keyLocation: 'https://malala.my.id/malala-sumbar-2026-seo-token.txt',
        urlList: ['https://malala.my.id/', 'https://malala.my.id/downloads/kalender-event-sumbar-2026.pdf']
      })
    });
    console.log("   ✓ IndexNow SEO Ping terkirim!");
  } catch (e) {
    console.warn("   ⚠️ IndexNow SEO Ping notice:", e.message);
  }

  console.log("🎉 [MALALA AUTONOMOUS ENGINE] Sinkronisasi harian sukses diselesaikan!");
  process.exit(0);
}

runAutonomousDailySync().catch(err => {
  console.error("Gagal sinkronisasi otonom:", err);
  process.exit(1);
});
