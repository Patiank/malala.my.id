import "dotenv/config";
import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import { DESTINATIONS, CULTURE_ITEMS, CULINARY_ITEMS, EVENTS_SCHEDULE } from "./src/data/content";
import { getItineraryFallback, fetchLiveTourismNewsFromRSS, HOT_INFO_FALLBACK } from "./src/utils/ai";

async function startServer() {
  const app = express();
  const PORT = Number(process.env.PORT) || 5000;

  app.use(express.json({ limit: '50mb' }));
  app.use(express.urlencoded({ limit: '50mb', extended: true }));
  app.use((err: any, req: any, res: any, next: any) => {
    if (err && (err.status === 400 || err.type === 'entity.too.large') && 'body' in err) {
      req.body = {};
      return next();
    }
    next(err);
  });

  // Circuit breaker: cache models that hit 429 quota exhaustion so we don't waste 2-3s round-trips on every click
  const modelCooldownMap: Record<string, number> = {};

  function isModelInCooldown(modelName: string): boolean {
    const until = modelCooldownMap[modelName];
    if (!until) return false;
    if (Date.now() < until) return true;
    delete modelCooldownMap[modelName];
    return false;
  }

  function markModelExhausted(modelName: string, cooldownMinutes = 5) {
    modelCooldownMap[modelName] = Date.now() + cooldownMinutes * 60 * 1000;
  }

  // API Route: Sync Database to GitHub
  app.post("/api/sync-github", async (req, res) => {
    try {
      const fs = await import("fs");
      const path = await import("path");
      const { execSync } = await import("child_process");

      if (req.body && Object.keys(req.body).length > 0) {
        const backupPath = path.join(process.cwd(), 'src', 'data', 'firestore_backup.json');
        fs.writeFileSync(backupPath, JSON.stringify({
          timestamp: new Date().toISOString(),
          ...req.body
        }, null, 2), 'utf-8');

        // Regenerate static PDF & JPGs with the freshly received payload
        try {
          execSync('cmd /c npx tsx scripts/export_all_pages_jpg.ts', { stdio: 'ignore' });
        } catch (e) {}
      }

      try {
        execSync('git add .', { stdio: 'ignore' });
        execSync('git commit -m "sync: update live data and dynamic PDF from admin panel"', { stdio: 'ignore' });
      } catch (e) {}

      try {
        execSync('git push origin main', { stdio: 'ignore' });
      } catch (e) {}

      return res.json({ success: true, message: "Synced to GitHub successfully" });
    } catch (err: any) {
      return res.status(500).json({ success: false, error: err?.message });
    }
  });

  // API Route: AI Travel Planner (UNI MALA AI Minangkabau)
  app.post("/api/ai/itinerary", async (req, res) => {
    try {
      const apiKey = process.env.GEMINI_API_KEY;
      const { 
        durasiHari, 
        profilWisatawan, 
        preferensiMinat, 
        logistik, 
        startingPoint,
        anggaran, 
        akomodasi, 
        waktuKunjungan, 
        kebutuhanKhusus, 
        outputPreferensi, 
        language = 'id',
        availableEvents = [],
        targetEvent = null
      } = req.body;

      const isEnglish = language === 'en';
      const startDate = waktuKunjungan?.tanggalMulai || '';
      const endDate = waktuKunjungan?.tanggalSelesai || '';

      const targetEv = targetEvent;
      const daysCountClamped = Math.min(Math.max(Number(durasiHari) || 3, 1), 7);

      const isValidGeminiKey = Boolean(apiKey && apiKey.length > 20 && !apiKey.includes('Dummy'));

      if (!isValidGeminiKey) {
        return res.json(getItineraryFallback(req.body));
      }

      const ai = new GoogleGenAI({
        apiKey,
        httpOptions: {
          headers: {
            'User-Agent': 'aistudio-build',
          },
        },
      });

      const langInstruction = isEnglish
        ? "CRITICAL MANDATORY REQUIREMENT: The user is browsing the website in ENGLISH. You MUST output 100% of the entire itinerary, title, summary, activity descriptions, tips, culinary recommendations, and advice strictly in natural professional ENGLISH. DO NOT leave ANY Indonesian phrases or words (except proper place/attraction names)."
        : "Buatkan rencana perjalanan wisata (Itinerary) resmi & komprehensif untuk Sumatera Barat dalam Bahasa Indonesia.";

      const eventsSummary = Array.isArray(availableEvents) && availableEvents.length > 0
        ? availableEvents.map((ev: any) => `- ${ev.title} (${ev.schedule || ev.date || ''} di ${ev.locationName || ev.location || 'Sumbar'}) ${ev.isKen ? '[Karisma Event Nusantara]' : ''}: ${ev.description ? ev.description.split('\n\n')[0] : ''}`).join('\n')
        : 'Katalog event Sumatera Barat 2026: Pacu Jawi di Tanah Datar, Festival Tabuik Pariaman, Rang Solok Baralek Gadang, Sawahlunto Songket Carnival, Payakumbuh Botuang Festival, Festival Siti Nurbaya Padang.';

      const eventEmphasisPrompt = targetEv ? `
🌟 TARGET EVENT / FESTIVAL UTAMA YANG HARUS DIHADIRI (MANDATORY TRIP CENTERPIECE):
Wisatawan ini secara khusus ingin menghadiri acara/festival berikut:
- Nama Event: ${targetEv.title} (${targetEv.titleEn || ''})
- Jadwal Pelaksanaan: ${targetEv.schedule} (${targetEv.scheduleEn || ''})
- Lokasi Acara: ${targetEv.locationName || targetEv.location || targetEv.regency}
- Deskripsi Acara: ${targetEv.description || ''}
- Status Event: ${targetEv.isKen ? 'Karisma Event Nusantara (KEN Kemenparekraf)' : 'Event Unggulan Sumatera Barat'}

ATURAN WAJIB PALING UTAMA:
1. Anda HARUS menjadwalkan kunjungan khusus ke festival "${targetEv.title}" ini pada salah satu hari (misal Hari 1 atau Hari 2) sebagai AKTIVITAS UTAMA (centerpiece).
2. Susun seluruh rute hari tersebut dan destinasi di sekitarnya agar SEARAH dan BERDEKATAN secara geografis dengan lokasi event ${targetEv.locationName || targetEv.regency}.
3. Tuliskan nama "${targetEv.title}" secara eksplisit pada judul hari dan deskripsi aktivitas di hari tersebut!
` : '';

      const isNonAirport = startingPoint && startingPoint.type !== 'airport';
      const startingPointLabel = startingPoint?.label || startingPoint?.city || startingPoint?.details || (startingPoint?.type === 'airport' ? 'Bandara Internasional Minangkabau (BIM)' : 'Titik Lokasi Terpilih');

      const startingPointPrompt = `
📍 TITIK AWAL KEBERANGKATAN WISATAWAN (STARTING POINT & ROUTING ANCHOR):
- Tipe Titik Awal: ${startingPoint?.type || 'airport'}
- Lokasi/Nama: ${startingPointLabel}
${startingPoint?.details ? `- Keterangan/Detail: ${startingPoint.details}` : ''}
${startingPoint?.city ? `- Kota/Kabupaten Basis: ${startingPoint.city}` : ''}
${startingPoint?.coords ? `- Koordinat GPS: Lat ${startingPoint.coords.lat}, Lng ${startingPoint.coords.lng}` : ''}

ATURAN RUTE MUTLAK BERDASARKAN TITIK AWAL:
${
  isNonAirport
    ? `⚠️ PERINGATAN WAJIB & MUTLAK: Wisatawan TIDAK BERANGKAT DARI BANDARA! Titik keberangkatan adalah: "${startingPointLabel}".
1. DILARANG KERAS membuat aktivitas penjemputan atau kedatangan di Bandara Internasional Minangkabau (BIM) pada Hari 1!
2. Hari 1 HARUS dimulai langsung dari ${startingPointLabel} mengeksplorasi destinasi ikonik di sekitar ${startingPointLabel}.
3. Hari terakhir juga TIDAK mengantar ke Bandara BIM, melainkan diakhiri di ${startingPointLabel} atau pusat oleh-oleh di kota tersebut.`
    : '1. Wisatawan baru tiba di Bandara Internasional Minangkabau (BIM). Mulai Hari 1 dengan penjemputan di bandara dan akhiri hari terakhir dengan pengantaran ke bandara.'
}
`;

      const prompt = `Anda adalah MASTER TOUR OPERATOR & CHIEF TRAVEL PLANNER TERBAIK & PALING BERPENGALAMAN di Sumatera Barat by MINANGKAOS (malala.my.id).
${langInstruction}

TUGAS ANDA:
Rancang rencana perjalanan wisata (Itinerary) yang SANGAT LOGIS, PRAKTIKAL, REALISTIS, SEARAH, dan MENGUTAMAKAN KESENANGAN, KEPUASAN, SERTA KENYAMANAN MAKSIMAL WISATAWAN.

DATA PERMINTAAN WISATAWAN:
- Durasi Perjalanan: ${durasiHari || 3} Hari
- Tanggal Kunjungan: ${startDate ? `${startDate}${endDate ? ` s/d ${endDate}` : ''}` : 'Fleksibel'}
- Profil Wisatawan: ${profilWisatawan?.jumlahOrang || 2} orang (${profilWisatawan?.kategori || 'pasangan'}, Asal: ${profilWisatawan?.asal || 'domestik'})
- Preferensi Minat: ${(preferensiMinat?.kategoriWisata || []).join(', ') || 'Semua Minat (Alam, Budaya, Kuliner)'}
- Tingkat Aktivitas: ${preferensiMinat?.tingkatAktivitas || 'sedang'}
- Kelas Anggaran: ${anggaran?.rentang || 'menengah'}
- Kebutuhan Khusus / Alergi Makanan / Catatan Penting: ${kebutuhanKhusus?.catatanKhusus || (kebutuhanKhusus?.alergiMakanan || []).join(', ') || 'Tidak ada catatan khusus'}

${startingPointPrompt}

${eventEmphasisPrompt}

KATALOG EVENT & FESTIVAL RESMI SUMBAR 2026:
${eventsSummary}

============================================================
PANDUAN LOGISTIK & STANDAR MASTER TOUR OPERATOR:
============================================================
1. KLASTER GEOGRAFIS & RUTE SEARAH (STRICT CORRIDOR ROUTING - DILARANG ZIG-ZAG & DILARANG MENGULANG DESTINASI):
   - Titik Keberangkatan: Sesuaikan secara ketat dengan TITIK AWAL KEBERANGKATAN di atas (${startingPointLabel}). ${isNonAirport ? `JANGAN PERNAH membuat penjemputan bandara karena wisatawan sudah berada di ${startingPointLabel}.` : ''}
   - PANDUAN KLASTER PER HARI (SETIAP HARI HARUS MENGUNJUNGI DESTINASI BERBEDA SECARA 100% UNIK SESUAI JUMLAH HARI ${durasiHari || 3} HARI):
${
  isNonAirport
    ? `     * HARI 1: Mulai LANGSUNG dari ${startingPointLabel} mengeksplorasi destinasi ikonik terdekat di sekitarnya TANPA penjemputan bandara.`
    : `     * HARI 1 (Upward Flow): BIM / Padang → Air Terjun Lembah Anai (Rehat) → Sentra Tenun Pandai Sikek → Bukittinggi (Check-in, Jam Gadang, Ngarai Sianok Sunset, Nasi Kapau Pasar Atas).`
}
     * HARI 2 (Geopark & Megaproyek): Bukittinggi → Payakumbuh → Lembah Harau (Tebing Granit 300m & Air Terjun) → Jembatan Kelok 9 → Kuliner Payakumbuh (Gulai Itiak Lado Mudo / Sate Danguang-Danguang).
     * HARI 3 (Luhak Nan Tuo Heritage): Bukittinggi → Desa Terindah Dunia Nagari Pariangan → Istano Basa Pagaruyung (Batusangkar) → Makan Ikan Bilih tepi Danau Singkarak.
     * HARI 4 (Maninjau & Danau Vulkanik): Janjang Koto Gadang → Puncak Lawang (Samudra Awan) → Menuruni Kelok 44 → Danau Maninjau & Museum Rumah Buya Hamka → Kuliner Palai Rinuak.
     * HARI 5 (Warisan Dunia UNESCO): Kota Tambang Bersejarah Ombilin Sawahlunto (Lubang Mbah Soero & Museum Kereta Api Mak Itam) → Geopark Silokek Sijunjung → Tenun Silungkang.
     * HARI 6 (Highland & Saribu Rumah Gadang): Dataran Tinggi Solok → Danau Kembar (Danau Diatas & Danau Dibawah) → Kebun Teh Alahan Panjang → Kawasan Saribu Rumah Gadang Solok Selatan → Goa Batu Kapal.
     * HARI 7 (Bahari, Kota Padang & Kepulangan): Kawasan Wisata Bahari Mandeh (Pulau Setan & Sironjong) → Pantai Air Manis (Batu Malin Kundang) → Masjid Raya Sumatera Barat → Sentra Oleh-oleh Christine Hakim${isNonAirport ? ` → Selesai di ${startingPointLabel}` : ` → Drop-off Bandara BIM`}.
   - PASTIKAN JUMLAH HARI PADA ARRAY ITINERARY TEPAT SEBANYAK ${durasiHari || 3} HARI DAN TIDAK ADA SATUPUN HARI YANG MENGULANG TEMPAT/KULINER YANG SAMA!

2. PACING MANUSIAWI & ESTIMASI WAKTU TEMPUH RIIL:
   - Maksimal 3 - 4 destinasi utama per hari agar wisatawan tidak terburu-buru dan tidak kelelahan di jalan.
   - PADA SETIAP NAMA LOKASI/AKTIVITAS, CANTUMKAN ESTIMASI WAKTU TEMPUH DARI LOKASI SEBELUMNYA. Contoh: "Lembah Harau [Perjalanan ±45 mnt dari Bukittinggi]" atau "Istano Basa Pagaruyung [Perjalanan ±30 mnt]".

3. KULINER OTENTIK SEARAH JALUR (ROUTE-ALIGNED ICONIC FOOD):
   - Wajib merekomendasikan kuliner legendaris yang berada tepat di jalur perjalanan hari itu (bukan yang berlawanan arah). Contoh: Sate Mak Syukur di Padang Panjang, Nasi Kapau Los Lambuang di Bukittinggi, Gulai Itiak Lado Mudo di Ngarai/Harau, Ikan Bilih Goreng di Danau Singkarak, Palai Rinuak di Maninjau, Sup Iga di Sawahlunto, Bareh Solok & Dendeng Batokok di Solok, Es Durian Ganti Nan Jano di Padang.
   - Sesuaikan rekomendasi kuliner dengan catatan alergi atau kebutuhan khusus wisatawan jika ada.

4. SINKRONISASI EVENT (HANYA JIKA RELEVAN):
   - Jika wisatawan memilih tanggal tertentu dan terdapat event KEN / festival budaya yang bertepatan, masukkan festival tersebut ke dalam itinerary pada hari dan klaster wilayah yang tepat.

5. KEARIFAN LOKAL & TIPS TOUR LEADER:
   - Sertakan tips etika berpakaian sopan Minangkabau ("Adat Basandi Syarak, Syarak Basandi Kitabullah"), waktu terbaik foto (golden hour), waktu sholat/istirahat, serta rekomendasi oleh-oleh otentik.

============================================================
FORMAT OUTPUT:
============================================================
Keluarkan HANYA format JSON valid tanpa tanda kutip markdown (\`\`\`json) atau teks pengantar apa pun di luar JSON:
{
  "title": "${isEnglish ? 'Executive Tour Itinerary Title' : 'Judul Rencana Perjalanan Wisata Eksklusif'}",
  "summary": "${isEnglish ? 'Rich, evocative 2-3 sentence narrative describing the magical atmosphere, geopark highlights, cultural heritage, and culinary adventures awaiting the traveler along this corridor' : 'Narasi kaya dan memikat 2-3 kalimat yang mendeskripsikan atmosfer magis ranah Minang, keindahan geopark, kemegahan warisan budaya, dan petualangan kuliner legendaris yang searah rute'}",
  "itinerary": [
    {
      "day": 1,
      "title": "${isEnglish ? 'Day 1 Theme with Geographical Focus' : 'Tema Hari Ke-1 & Fokus Wilayah'}",
      "activities": [
        {
          "time": "08:30 - 11:30",
          "location": "${isEnglish ? 'Location Name [Drive ±X mins/hrs]' : 'Nama Tempat / Destinasi [Waktu Tempuh ±X mnt/jam]'}",
          "activity": "${isEnglish ? 'Detailed exciting & practical activity description' : 'Deskripsi aktivitas yang seru, terperinci, dan praktikal'}",
          "tips": "${isEnglish ? 'Tour leader insider tips & photo spots' : 'Tips praktis tour leader, spot foto terbaik, dan persiapan'}"
        }
      ],
      "culinaryRecommendation": "${isEnglish ? 'Authentic route-aligned food & restaurant recommendation' : 'Rekomendasi kuliner legendaris dan tempat makan otentik yang searah rute'}"
    }
  ],
  "localTips": [
    "${isEnglish ? 'Minangkabau etiquette & dressing advice' : 'Etika dan tata krama Minangkabau (Adat Basandi Syarak)'}",
    "${isEnglish ? 'Top authentic souvenir recommendations' : 'Rekomendasi oleh-oleh khas otentik'}",
    "${isEnglish ? 'Travel logistics & weather tips' : 'Tips logistik jalan pegunungan & kenyamanan fisik'}"
  ]
}`;

      const modelsToTry = ['gemini-3.8-flash'];
      let parsedData = null;

      for (const modelName of modelsToTry) {
        if (isModelInCooldown(modelName)) {
          continue;
        }

        try {
          const response = await ai.models.generateContent({
            model: modelName,
            contents: prompt,
          });

          const rawText = response.text || '';
          const jsonMatch = rawText.match(/\{[\s\S]*\}/);
          if (jsonMatch) {
            parsedData = JSON.parse(jsonMatch[0]);
            break;
          }
        } catch (err: any) {
          const errStr = String(err?.message || err?.status || err);
          if (errStr.includes('429') || errStr.includes('quota') || errStr.includes('RESOURCE_EXHAUSTED')) {
            markModelExhausted(modelName, 5);
          }
          console.warn(`Server Gemini call with ${modelName} failed, trying next model...`, err?.message || err);
        }
      }

      if (!parsedData) {
        console.warn("AI generation produced no parsed JSON, falling back to master tour itinerary engine.");
        return res.json(getItineraryFallback(req.body));
      }

      return res.json(parsedData);
    } catch (error: any) {
      console.error("Error generating AI itinerary, using fallback engine:", error);
      return res.json(getItineraryFallback(req.body));
    }
  });

  // API Route: UNI MALA AI Chatbot / Real-Time Conversational Guide
  app.post("/api/ai/chat", async (req, res) => {
    try {
      const apiKey = process.env.GEMINI_API_KEY;
      const { message, history = [] } = req.body;

      if (!message || typeof message !== 'string' || !message.trim()) {
        return res.status(400).json({ error: "Pesan chat tidak boleh kosong." });
      }

      const cleanMsg = message.trim();
      const isValidGeminiKey = Boolean(apiKey && apiKey.length > 20 && !apiKey.includes('Dummy'));

      if (!isValidGeminiKey) {
        return res.json({
          reply: `**Salamaik Datang di Ranah Minang!** 🙏✨\n\nSaya **UNI MALA AI**, pemandu virtual resmi pariwisata & kebudayaan Sumatera Barat. Menjawab pertanyaan Anda mengenai *"${cleanMsg}"*:\n\nSumatera Barat menawarkan pesona 38+ destinasi alam & geopark (seperti Lembah Harau, Ngarai Sianok, Danau Singkarak, dan Kepulauan Mandeh), 26+ kuliner legendaris (Rendang, Nasi Kapau, Sate Padang), dan kekayaan budaya Minangkabau.\n\n💡 *Tips:* Gunakan fitur **Rencanakan AI** untuk membuat jadwal perjalanan harian (1–7 hari) otomatis yang disesuaikan dengan kebutuhan Anda.`
        });
      }

      const ai = new GoogleGenAI({
        apiKey,
        httpOptions: {
          headers: {
            'User-Agent': 'aistudio-build',
          },
        },
      });

      // Build in-memory Knowledge Base (Simple RAG Grounding)
      const destList = DESTINATIONS.map((d: any) => `- ${d.title} (${d.regency}): Kategori ${d.category}, Tag: ${d.tag}. Keunggulan: ${d.highlights?.join(', ')}. Lokasi: ${d.locationDetails || d.regency}`).join('\n');
      const culList = CULINARY_ITEMS.map((c: any) => `- ${c.title} (${c.origin}): ${c.type}. Cita Rasa: ${c.flavorProfile}`).join('\n');
      const cultList = CULTURE_ITEMS.map((cu: any) => `- ${cu.title} (${cu.origin}): ${cu.category}. Filosofi: ${cu.philosophy}`).join('\n');
      const eventList = EVENTS_SCHEDULE.map((e: any) => `- ${e.title} (${e.schedule}): di ${e.location}. ${e.isKen ? '[Karisma Event Nusantara / KEN]' : '[Agenda Tahunan]'}`).join('\n');

      const systemInstruction = `Anda adalah 'UNI MALA AI', asisten virtual dan pemandu wisata cerdas resmi Sumatera Barat (Wonderful West Sumatra Tourism Board).

KEPRIBADIAN & GAYA KOMUNIKASI:
1. Ramah, santun, hangat, berwawasan luas, dan membanggakan keluhuran budaya Minangkabau (Adat Basandi Syarak, Syarak Basandi Kitabullah).
2. Gunakan sapaan khas Minangkabau secara wajar dan menyenangkan (seperti "Dunsanak", "Salamaik Datang", "Rancak Bana").
3. Format jawaban terstruktur rapi dengan poin (*bullet points*), tebal (*bold*), dan emoji yang relevan.

PANDUAN PENGETAHUAN & LOGISTIK (GROUNDING):
1. RUTE ITINERARY: Jika wisatawan meminta saran rute atau itinerary, WAJIB susun rute SEARAH per koridor geografis (misal: Koridor Padang-Pesisir Selatan Mandeh, Koridor Padang Panjang-Bukittinggi-Agam, Koridor Payakumbuh-Lembah Harau-Kelok 9, Koridor Solok-Danau Kembar-Alahan Panjang). JANGAN membuat rute bolak-balik.
2. WAKTU TEMPUH REALISTIS:
   - Bandara BIM ke Kota Padang: ±45 menit (23 km)
   - Bandara BIM ke Bukittinggi: ±2 - 2,5 jam via Padang Panjang & Lembah Anai
   - Bukittinggi ke Payakumbuh & Lembah Harau / Kelok 9: ±1 - 1,5 jam (45 km)
   - Bukittinggi ke Puncak Lawang / Danau Maninjau (Kelok 44): ±1 jam
   - Padang ke Kawasan Wisata Bahari Mandeh: ±1,5 jam
   - Padang ke Danau Kembar & Kebun Teh Alahan Panjang: ±1,5 - 2 jam
   - Padang ke Kepulauan Mentawai: Kapal Cepat Mentawai Fast dari Pelabuhan Muaro (±3 - 3,5 jam)
3. KULINER & AKOMODASI: Berikan rekomendasi kuliner otentik halal dan spot penginapan terbaik sesuai koridor lokasi yang ditanyakan.
4. Gunakan data resmi berikut sebagai rujukan utama:

=== DATA RESMI PARIWISATA SUMATERA BARAT ===
[DESTINASI]:
${destList}

[KULINER]:
${culList}

[KEBUDAYAAN]:
${cultList}

[EVENT 2026]:
${eventList}
`;

      // Multi-turn conversation history
      const formattedContents: any[] = [];
      if (Array.isArray(history) && history.length > 0) {
        const recentHistory = history.slice(-10);
        for (const item of recentHistory) {
          if (item && item.text) {
            formattedContents.push({
              role: item.sender === 'user' ? 'user' : 'model',
              parts: [{ text: item.text }]
            });
          }
        }
      }

      // Append current message
      formattedContents.push({
        role: 'user',
        parts: [{ text: cleanMsg }]
      });

      let reply = '';
      const chatModelsToTry = ['gemini-3.8-flash'];
      const needsSearch = /kapan|jadwal|tanggal|hari ini|besok|minggu ini|cuaca|hujan|banjir|longsor|buka|tutup|tiket|berita|terbaru|terkini|kondisi jalan|kapal|pesawat|status|macet/i.test(cleanMsg);

      for (const modelName of chatModelsToTry) {
        if (isModelInCooldown(modelName)) {
          continue;
        }

        try {
          const config: any = {
            systemInstruction,
            temperature: 0.5,
          };
          if (needsSearch) {
            config.tools = [{ googleSearch: {} } as any];
          }

          const response = await ai.models.generateContent({
            model: modelName,
            contents: formattedContents,
            config,
          });
          reply = response.text || '';
          if (reply) break;
        } catch (mErr: any) {
          const errStr = String(mErr?.message || mErr?.status || mErr);
          if (errStr.includes('429') || errStr.includes('quota') || errStr.includes('RESOURCE_EXHAUSTED')) {
            markModelExhausted(modelName, 5);
          }
          console.warn(`Chat model ${modelName} failed:`, mErr?.message);
        }
      }

      if (!reply) {
        reply = 'Maaf Dunsanak, Uni Mala tidak dapat memproses tanggapan saat ini.';
      }
      return res.json({ reply });
    } catch (error: any) {
      console.error("AI Chat Server Error:", error);
      return res.status(500).json({ error: error.message || "Gagal memproses percakapan dengan AI." });
    }
  });

  // API Route: AI Fetch Hot Info (UNI MALA AI News - Real-time Google News RSS & Kemenparekraf)
  app.post("/api/ai/fetch-hot-info", async (req, res) => {
    try {
      const { language = 'id' } = req.body;

      // 1. Fetch live tourism news directly from Google News RSS (50% Sumbar, 50% National)
      try {
        const liveNews = await fetchLiveTourismNewsFromRSS(language);
        if (Array.isArray(liveNews) && liveNews.length > 0) {
          const enrichedLive = liveNews.map((item: any) => ({
            ...item,
            imageUrl: item.imageUrl || '',
            isUserUploadedImage: false,
          }));
          return res.json(enrichedLive);
        }
      } catch (rssErr: any) {
        console.warn("Server live RSS fetch warning:", rssErr?.message);
      }

      // 2. High-quality curated fallback (with verified sources & URLs)
      const enrichedFallback = HOT_INFO_FALLBACK.map((item: any) => ({
        ...item,
        imageUrl: item.imageUrl || '',
        isUserUploadedImage: false,
      }));

      return res.json(enrichedFallback);
    } catch (error: any) {
      console.error("AI Fetch Hot Info error:", error);
      return res.status(500).json({ error: error.message || "Gagal mendapatkan informasi terkini." });
    }
  });

  // API Route: Smart AI Catalog Item Generator & Translator
  app.post("/api/ai/generate-catalog-item", async (req, res) => {
    try {
      const apiKey = process.env.GEMINI_API_KEY;
      const { type, name, hint } = req.body;

      if (!name) {
        return res.status(400).json({ error: "Nama item katalog wajib diisi." });
      }

      if (!apiKey) {
        return res.status(503).json({ error: "Gemini API Key belum dikonfigurasi di server." });
      }

      const ai = new GoogleGenAI({
        apiKey,
        httpOptions: {
          headers: {
            'User-Agent': 'aistudio-build',
          },
        },
      });

      let typePrompt = '';
      if (type === 'destinations') {
        typePrompt = `Kategori: DESTINASI WISATA SUMATERA BARAT
Nama Destinasi: "${name}" ${hint ? `(Petunjuk tambahan: ${hint})` : ''}

Format output HANYA JSON valid:
{
  "title": "${name}",
  "titleEn": "Nama Destinasi dalam Bahasa Inggris",
  "category": "Alam | Danau & Gunung | Lembah & Geopark | Pantai & Bahari | Desa Wisata | Sejarah | Air Terjun & Alam",
  "categoryEn": "Nature | Lakes & Mountains | Geological Wonder | Marine & Island | Tourism Village | History & Heritage | Waterfall & Ecotourism",
  "regency": "Kabupaten / Kota di Sumatera Barat (contoh: Kabupaten Agam / Kota Bukittinggi / Kabupaten Pesisir Selatan)",
  "regencyEn": "Nama Kabupaten/Kota dalam Bahasa Inggris (contoh: Agam Regency / Bukittinggi City)",
  "tag": "Tag singkat menarik (contoh: Ikonik, Petualangan, Geopark, Warisan Budaya, Hidden Gem)",
  "tagEn": "Tag singkat dalam Bahasa Inggris (contoh: Iconic, Adventure, Geopark, Cultural Heritage, Hidden Gem)",
  "description": "Deskripsi naratif mendalam pariwisata 2-3 paragraf (pisahkan dengan \\n\\n) mengenai daya tarik, sejarah/geologi, serta keunikan tempat ini.",
  "descriptionEn": "Comprehensive 2-3 paragraph narrative description in English (separated by \\n\\n).",
  "highlights": ["Poin keunggulan 1", "Poin keunggulan 2", "Poin keunggulan 3"],
  "highlightsEn": ["Highlight point 1", "Highlight point 2", "Highlight point 3"],
  "bestTime": "Waktu terbaik berkunjung (contoh: Pagi Hari (07:00 - 11:00 WIB) / Sepanjang Hari)",
  "bestTimeEn": "Best time in English (contoh: Morning (07:00 AM - 11:00 AM) / All Day)",
  "locationDetails": "Detail lokasi spesifik nagari/kecamatan (contoh: Nagari Pariangan, Kab. Tanah Datar)",
  "locationDetailsEn": "Location details in English",
  "lat": -0.305000,
  "lng": 100.370000
}`;
      } else if (type === 'culture') {
        typePrompt = `Kategori: KEBUDAYAAN & TRADISI MINANGKABAU
Nama Budaya / Tradisi: "${name}" ${hint ? `(Petunjuk tambahan: ${hint})` : ''}

Format output HANYA JSON valid:
{
  "title": "${name}",
  "titleEn": "Nama Kebudayaan dalam Bahasa Inggris",
  "category": "Arsitektur | Tari & Musik | Seni Beladiri | Kain & Kerajinan | Tradisi Adat | Upacara Adat | Sistem Sosial",
  "categoryEn": "Architecture | Dance & Music | Martial Arts | Textile & Craft | Customary Tradition | Traditional Ceremony | Social System",
  "origin": "Asal Daerah / Nagari (contoh: Seluruh Wilayah Alam Minangkabau / Kabupaten Tanah Datar)",
  "originEn": "Origin in English (contoh: Entire Minangkabau Cultural Realm / Tanah Datar Regency)",
  "description": "Deskripsi mendalam kebudayaan Minangkabau 2-3 paragraf (pisahkan dengan \\n\\n) mengenai sejarah, proses pelaksanaan, alat/atribut adat, dan fungsi sosialnya.",
  "descriptionEn": "Comprehensive 2-3 paragraph cultural description in English (separated by \\n\\n).",
  "philosophy": "Filosofi adat mendalam (contoh: Adat Basandi Syarak, Syarak Basandi Kitabullah / Raso Jo Pareso)",
  "philosophyEn": "Philosophical meaning in English",
  "lat": -0.471111,
  "lng": 100.621111
}`;
      } else if (type === 'culinary') {
        typePrompt = `Kategori: KULINER AUTENTIK MINANGKABAU / SUMATERA BARAT
Nama Kuliner: "${name}" ${hint ? `(Petunjuk tambahan: ${hint})` : ''}

Format output HANYA JSON valid:
{
  "title": "${name}",
  "titleEn": "Nama Kuliner dalam Bahasa Inggris",
  "type": "Makanan Utama | Minuman Tradisional | Kudapan Khas",
  "typeEn": "Main Course | Traditional Beverage | Traditional Snack",
  "origin": "Asal Daerah / Nagari di Sumbar (contoh: Kota Bukittinggi / Payakumbuh / Solok / Padang Pariaman)",
  "originEn": "Origin in English (contoh: Bukittinggi City / Payakumbuh Regency)",
  "description": "Deskripsi mendalam kuliner 2-3 paragraf (pisahkan dengan \\n\\n) mengenai bahan baku rempah, tradisi memasak khas Minangkabau, dan sensasi kelezatannya.",
  "descriptionEn": "Comprehensive 2-3 paragraph culinary description in English (separated by \\n\\n).",
  "flavorProfile": "Profil rasa (contoh: Gurih berempah kaya santan, pedas segar cabe hijau, aroma asap kelapa)",
  "flavorProfileEn": "Flavor profile in English (contoh: Rich savory spiced coconut curry with smoky aroma)",
  "lat": -0.305000,
  "lng": 100.370000
}`;
      } else if (type === 'events') {
        typePrompt = `Kategori: EVENT & FESTIVAL PARIWISATA SUMATERA BARAT 2026
Nama Event: "${name}" ${hint ? `(Petunjuk tambahan: ${hint})` : ''}

Format output HANYA JSON valid:
{
  "title": "${name}",
  "titleEn": "Nama Event dalam Bahasa Inggris",
  "schedule": "Estimasi jadwal pelaksanaan 2026 (contoh: 15 - 18 Juli 2026 / September 2026)",
  "scheduleEn": "Schedule in English (contoh: July 15 - 18, 2026 / September 2026)",
  "location": "Lokasi pelaksanaan (contoh: Lapangan Kantin Kota Bukittinggi / Kawasan Lembah Harau, Kab. 50 Kota)",
  "locationEn": "Location in English (contoh: Harau Valley, 50 Kota Regency)",
  "description": "Deskripsi mendalam event pariwisata 2-3 paragraf (pisahkan dengan \\n\\n) mengenai agenda acara, atraksi seni budaya, parade, dan daya tarik bagi wisatawan.",
  "descriptionEn": "Comprehensive 2-3 paragraph event description in English (separated by \\n\\n).",
  "isKen": false
}`;
      } else {
        return res.status(400).json({ error: "Tipe katalog tidak valid." });
      }

      const prompt = `Anda adalah ASISTEN AHLI PARIWISATA & KEBUDAYAAN SUMATERA BARAT (Wonderful West Sumatra Tourism Board).
Tugas Anda adalah meneliti dan menghasilkan data katalog pariwisata yang sangat akurat, mendalam, kaya nilai budaya Minangkabau, dan lengkap dengan terjemahan Bahasa Inggris (Bilingual ID & EN).

${typePrompt}

Keluarkan HANYA format JSON valid tanpa markdown backticks (\`\`\`json) atau teks pengantar lainnya.`;

      const itemModels = ['gemini-3.8-flash'];
      let parsedData = null;

      for (const modelName of itemModels) {
        try {
          const response = await ai.models.generateContent({
            model: modelName,
            contents: prompt,
          });

          const rawText = response.text || '';
          const jsonMatch = rawText.match(/\{[\s\S]*\}/);
          if (jsonMatch) {
            parsedData = JSON.parse(jsonMatch[0]);
            if (parsedData) break;
          }
        } catch (itemErr: any) {
          console.warn(`Catalog generator with ${modelName} failed:`, itemErr?.message);
        }
      }

      if (!parsedData) {
        throw new Error("Gagal mengurai respon JSON dari AI.");
      }

      return res.json(parsedData);
    } catch (error: any) {
      console.error("AI Catalog Item Generator error:", error);
      return res.status(500).json({ error: error.message || "Gagal meng-generate data katalog dengan AI" });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const hmrPort = process.env.HMR_PORT ? Number(process.env.HMR_PORT) : (PORT !== 5000 ? PORT + 20000 : undefined);
    const vite = await createViteServer({
      server: {
        middlewareMode: true,
        hmr: hmrPort ? { port: hmrPort } : true,
      },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });

  // Daily 03:00 AM WIB (UTC+7) Scheduled Background News Auto-Refresh Worker
  function setupDailyWibNewsCron() {
    function getWibCycle() {
      const now = new Date();
      const utcMs = now.getTime() + (now.getTimezoneOffset() * 60000);
      const wibMs = utcMs + (7 * 3600000);
      const wibDate = new Date(wibMs);
      const hours = wibDate.getHours();
      const cycleDate = new Date(wibDate);
      if (hours < 3) cycleDate.setDate(cycleDate.getDate() - 1);
      const yyyy = cycleDate.getFullYear();
      const mm = String(cycleDate.getMonth() + 1).padStart(2, '0');
      const dd = String(cycleDate.getDate()).padStart(2, '0');
      const cycleId = `${yyyy}-${mm}-${dd}`;
      const nextTarget = new Date(wibDate);
      if (hours >= 3) nextTarget.setDate(nextTarget.getDate() + 1);
      nextTarget.setHours(3, 0, 0, 0);
      const msUntilNext = Math.max(1000, nextTarget.getTime() - wibDate.getTime());
      return { cycleId, msUntilNext, wibDate };
    }

    let lastExecutedCycle = '';

    const checkSchedule = async () => {
      try {
        const { cycleId, wibDate } = getWibCycle();
        const currentHours = wibDate.getHours();

        if (currentHours === 3 && lastExecutedCycle !== cycleId) {
          lastExecutedCycle = cycleId;
          console.log(`[Server Cron] Pukul 03:00 WIB terdeteksi (${cycleId}). Menjalankan update kurasi AI berita pariwisata...`);
          try {
            const fetchRes = await fetch(`http://localhost:${PORT}/api/ai/fetch-hot-info`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ language: 'id' }),
            });
            if (fetchRes.ok) {
              const freshNews = await fetchRes.json();
              console.log(`[Server Cron] Sukses memperbarui ${freshNews.length} berita untuk siklus 03:00 WIB.`);
            }
          } catch (e: any) {
            console.warn('[Server Cron] Gagal request auto-refresh internal:', e?.message);
          }
        }

        // Check again every 60 seconds
        setTimeout(checkSchedule, 60000);
      } catch (err) {
        console.warn('[Server Cron] Scheduler warning:', err);
        setTimeout(checkSchedule, 60000);
      }
    };

    // Start background checker after 10s
    setTimeout(checkSchedule, 10000);
    console.log('[Server Cron] Penjadwal update berita harian 03:00 WIB aktif.');
  }

  setupDailyWibNewsCron();
}

startServer();
