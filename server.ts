import "dotenv/config";
import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import { DESTINATIONS, CULTURE_ITEMS, CULINARY_ITEMS, EVENTS_SCHEDULE } from "./src/data/content";
import { getItineraryFallback } from "./src/utils/ai";

async function startServer() {
  const app = express();
  const PORT = Number(process.env.PORT) || 5000;

  app.use(express.json());
  app.use((err: any, req: any, res: any, next: any) => {
    if (err && err.status === 400 && 'body' in err) {
      req.body = {};
      return next();
    }
    next(err);
  });

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
        ? "Please generate the official trip itinerary for West Sumatra completely in ENGLISH language."
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
  "summary": "${isEnglish ? 'Professional summary of the optimized travel experience' : 'Ringkasan profesional pengalaman perjalanan yang logis, nyaman, dan berkesan'}",
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

      const modelsToTry = ['gemini-3.6-flash', 'gemini-3.5-flash', 'gemini-3.5-flash-lite', 'gemini-flash-latest'];
      let parsedData = null;

      for (const modelName of modelsToTry) {
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
        } catch (err) {
          console.warn(`Server Gemini call with ${modelName} failed, trying next model...`, err);
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
      const chatModelsToTry = ['gemini-3.6-flash', 'gemini-3.5-flash', 'gemini-3.5-flash-lite', 'gemini-flash-latest'];
      for (const modelName of chatModelsToTry) {
        try {
          const response = await ai.models.generateContent({
            model: modelName,
            contents: formattedContents,
            config: {
              systemInstruction,
              temperature: 0.5,
              tools: [{ googleSearch: {} } as any],
            }
          });
          reply = response.text || '';
          if (reply) break;
        } catch (mErr: any) {
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

  // API Route: AI Fetch Hot Info (UNI MALA AI News)
  app.post("/api/ai/fetch-hot-info", async (req, res) => {
    try {
      const apiKey = process.env.GEMINI_API_KEY;
      const { language = 'id' } = req.body;
      const isEnglish = language === 'en';

      const fallbackData = [
        {
          "id": "news-fallback-1",
          "title": "Uji Laik Fungsi Tol Padang-Sicincin 36,6 Km: Pangkas Waktu Tempuh Padang ke Bukittinggi Jadi 45 Menit",
          "titleEn": "Padang-Sicincin 36.6 Km Toll Road Functional Test: Slashes Padang-Bukittinggi Travel Time to 45 Minutes",
          "date": "04 September 2026",
          "dateEn": "September 04, 2026",
          "category": "Pariwisata Sumatera Barat",
          "categoryEn": "West Sumatra Tourism",
          "description": "PT Hutama Karya (Persero) bersama Balai Pengelola Transportasi Darat (BPTD) Kelas II Sumatera Barat mengonfirmasi bahwa uji laik fungsi fisik Jalan Tol Ruas Padang - Sicincin sepanjang 36,6 kilometer telah rampung dan siap beroperasi penuh untuk mendukung mobilitas wisatawan antarkota. Akses jalan bebas hambatan ini secara signifikan memangkas waktu tempuh dari Kota Padang menuju kawasan Bukittinggi dan Padang Panjang dari sebelumnya 2 hingga 2,5 jam melalui jalur arteri nasional menjadi hanya sekitar 35 hingga 45 menit.\n\nJalur tol pertama di Ranah Minang ini dilengkapi dengan dua gerbang tol utama, yakni Gerbang Tol Kapalo Hilalang dan kawasan Tarok City, serta rest area tipe A bernuansa arsitektur gonjong Rumah Gadang yang mengalokasikan 70 persen ruang usahanya bagi sentra kuliner dan suvenir UMKM lokal Minangkabau. Selain mengurai titik kemacetan kronis di pasar tumpah Lubuk Alung dan Kayu Tanam, jalur ini memberikan kenyamanan ekstra bagi pelancong keluarga dan rombongan bus wisata dengan standar keselamatan modern serta panorama hijau perbukitan kaki Gunung Singgalang di sepanjang koridor perjalanan.\n\nPengelola jalan tol mengimbau seluruh pengguna jalan untuk memastikan saldo kartu uang elektronik (e-toll) mencukupi serta mematuhi batas kecepatan berkendara 60 hingga 80 km/jam. Bagi wisatawan yang keluar melalui Gerbang Tol Kapalo Hilalang, akses langsung tersambung mulus dengan jalan arteri Padang Panjang - Bukittinggi, sehingga memudahkan kelanjutan perjalanan ke destinasi unggulan Lembah Anai, Mifan Waterpark, Pandai Sikek, hingga pelataran Jam Gadang.",
          "descriptionEn": "PT Hutama Karya in coordination with the West Sumatra Land Transportation Management Agency confirms the completion of functional feasibility testing for the 36.6-kilometer Padang-Sicincin Toll Road section, now ready for full operation. This expressway link drastically cuts driving times from Padang City to the highland hubs of Bukittinggi and Padang Panjang from over two hours along congested national highways down to just 35 to 45 minutes.\n\nAs the first highway in the Minang realm, the corridor features dual main toll plazas at Kapalo Hilalang and Tarok City, alongside a Type-A rest area showcasing iconic Rumah Gadang gonjong architecture where 70 percent of retail space is reserved for local culinary and craft MSMEs. In addition to resolving chronic bottleneck congestion at Lubuk Alung and Kayu Tanam markets, the route affords seamless journeys for travel groups with state-of-the-art safety fixtures and emerald vistas of Mount Singgalang foothills.\n\nMotorists are strongly advised to ensure sufficient electronic toll balances and adhere strictly to designated speed limits between 60 and 80 km/h. Travelers exiting at the Kapalo Hilalang interchange gain immediate access to the Padang Panjang-Bukittinggi arterial corridor, facilitating convenient onward travel to Anai Valley, Pandai Sikek weaving village, and the historic Jam Gadang clock plaza.",
          "tag": "Penting",
          "tagEn": "Important",
          "actionUrl": "https://maps.google.com/?q=Tol+Padang+Sicincin",
          "highlights": ["Pangkas rute Padang - Bukittinggi dari 2,5 jam menjadi 45 menit", "Rest area arsitektur gonjong dengan 70% gerai UMKM kuliner lokal", "Koneksi langsung ke jalur wisata Lembah Anai dan Pandai Sikek"],
          "highlightsEn": ["Travel time slashed from 2.5 hours to 45 minutes", "Minang gonjong-roof rest area with 70% local culinary stalls", "Direct highway interchange to Anai Valley and Pandai Sikek"],
          "tips": "Pastikan saldo kartu tol terisi minimal Rp50.000 dan periksa kondisi rem kendaraan sebelum melanjutkan tanjakan ke arah Bukittinggi.",
          "tipsEn": "Ensure your e-toll card has at least IDR 50,000 balance and check vehicle brakes before heading up to Bukittinggi.",
          "locationName": "Ruas Tol Padang - Sicincin, Padang Pariaman",
          "locationNameEn": "Padang - Sicincin Toll Road, Padang Pariaman"
        },
        {
          "id": "news-fallback-2",
          "title": "Kesiapan Jalur Sitinjau Lauik: BPJN dan Satlantas Siagakan Alat Berat & Posko Terpadu 24 Jam",
          "titleEn": "Sitinjau Lauik Route Readiness: Road Agency & Police Deploy 24/7 Heavy Machinery and Safety Outposts",
          "date": "03 September 2026",
          "dateEn": "September 03, 2026",
          "category": "Pariwisata Sumatera Barat",
          "categoryEn": "West Sumatra Tourism",
          "description": "Direktorat Lalu Lintas Polda Sumatera Barat bersama Balai Pelaksanaan Jalan Nasional (BPJN) Wilayah III menyiagakan posko tanggap darurat 24 jam dan unit alat berat excavator di kawasan tanjakan ekstrem Sitinjau Lauik, menyusul tingginya intensitas mobilitas angkutan logistik dan bus pariwisata rute Padang - Solok. Pemantauan terpadu difokuskan pada pengamanan lereng tebing di tikungan kritis Panorama 1 dan Panorama 2 guna mengantisipasi kerawanan guguran batuan saat hujan lebat serta menjamin kelancaran arus menuju Danau Singkarak dan Alahan Panjang.\n\nUpaya penguatan infrastruktur keselamatan terus direalisasikan melalui penambahan jaring pengaman batu berkawat baja (wire mesh netting), perbaikan sistem drainase lereng bertingkat, serta pelebaran bahu jalan di sudut belokan tajam. Di lapangan, koordinasi lintas sektor melibatkan relawan pengatur jalan anak nagari yang terhubung langsung dengan petugas Satlantas melalui jaringan radio komunikasi terintegrasi untuk memberlakukan skema buka-tutup darurat manakala terjadi insiden truk mogok atau kabut tebal pegunungan.\n\nPara pengemudi kendaraan pribadi, travel, maupun bus pariwisata sangat disarankan untuk memeriksa fungsi kampas rem, cairan radiator, dan transmisi sebelum melintasi koridor Sitinjau Lauik. Pengemudi wajib mendahulukan kendaraan bermuatan berat yang sedang melaju menanjak, menggunakan transmisi gigi rendah (low gear) saat menurun tajam, serta dilarang menyalip di area tikungan buta (blind spot) demi keselamatan perjalanan bersama.",
          "descriptionEn": "The West Sumatra Traffic Police Directorate in partnership with National Road Implementation Agency III has mobilized a 24/7 emergency response outpost and heavy excavators along the steep Sitinjau Lauik mountain pass, responding to elevated passenger and cargo flows between Padang and Solok. Coordinated monitoring zeroes in on unstable cliff faces near Panorama 1 and Panorama 2 hairpins to preempt rockfall risks during downpours and safeguard access towards Lake Singkarak and Alahan Panjang highland tea estates.\n\nInfrastructure resilience initiatives encompass high-tensile wire mesh rockfall barriers, terraced hillside drainage channels, and expanded paved shoulders across switchback bends to accommodate large-chassis transport. On the ground, inter-agency protocols link local village road marshals directly with highway patrol units via dedicated radio frequencies to manage phased traffic flow during sudden vehicle breakdowns or dense highland fog.\n\nDrivers of private cars, tour vans, and chartered coaches are firmly advised to inspect brake linings, cooling systems, and tire pressure prior to traversing Sitinjau Lauik. Regulations require descending vehicles to yield unconditionally to ascending traffic, engage low gears throughout steep gradients, and refrain from overtaking at blind corners to uphold travel safety.",
          "tag": "Pantauan Jalur",
          "tagEn": "Route Watch",
          "actionUrl": "https://maps.google.com/?q=Sitinjau+Lauik+Padang",
          "highlights": ["Posko siaga 24 jam dan alat berat di Panorama 1 & 2", "Pemasangan wire mesh baja penahan guguran batu lereng tebing", "Arus lalu lintas lancar dengan panduan relawan dan Satlantas"],
          "highlightsEn": ["24/7 emergency post and heavy excavators at Panorama bends", "Steel wire mesh rockfall barriers installed along cliffs", "Smooth traffic guided by highway patrol and community marshals"],
          "tips": "Gunakan gigi 1 atau 2 saat menanjak maupun menurun, dan selalu berikan prioritas jalan pada kendaraan bermuatan berat yang sedang menanjak.",
          "tipsEn": "Engage low gears (1st or 2nd) when ascending and descending, and always yield to uphill-climbing heavy vehicles.",
          "locationName": "Jalan Raya Padang - Solok (Sitinjau Lauik)",
          "locationNameEn": "Padang - Solok Highway (Sitinjau Lauik Pass)"
        },
        {
          "id": "news-fallback-3",
          "title": "Kemenparekraf Rilis Kalender KEN 2026 Sumbar: Pacu Jawi Tanah Datar dan Tabuik Pariaman Jadi Sorotan Utama",
          "titleEn": "Ministry Announces 2026 National Event Calendar: Pacu Jawi & Tabuik Festival Highlight West Sumatra",
          "date": "01 September 2026",
          "dateEn": "September 01, 2026",
          "category": "Pariwisata Sumatera Barat",
          "categoryEn": "West Sumatra Tourism",
          "description": "Kementerian Pariwisata dan Ekonomi Kreatif secara resmi merilis daftar agenda terpilih Kharisma Event Nusantara (KEN) 2026 untuk Provinsi Sumatera Barat, menempatkan atraksi budaya legendaris Alek Nagari Pacu Jawi di Kabupaten Tanah Datar dan festival kolosal Pesona Budaya Tabuik Pariaman sebagai agenda unggulan berskala nasional. Pemprov Sumbar menargetkan rangkaian perhelatan budaya ini mampu menggerakkan lebih dari 400 ribu kunjungan wisatawan domestik dan internasional serta mendorong perputaran ekonomi kreatif nagari hingga miliaran Rupiah.\n\nDalam jadwal resmi, Pacu Jawi akan digelar bergiliran setiap akhir pekan di empat nagari bersejarah Tanah Datar (Sungai Tarab, Pariangan, Rambatan, dan Lima Kaum) di atas bentangan sawah basah berlumpur berlatar megah Gunung Marapi. Di pesisir barat, prosesi akbar Pesta Budaya Tabuik di Kota Pariaman akan menggelar prosesi sakral Maambiak Tanah, Menumbuk Panja, hingga prosesi puncak Tabuik Naiak Pangkek dan pelepasan Tabuik ke Samudra Hindia di Pantai Gandoriah dengan iringan serempak ratusan pemukul Gandang Tasa.\n\nPemerintah daerah bersama asosiasi perhotelan PHRI mengimbau wisatawan yang hendak menyaksikan langsung momentum budaya ini untuk memesan akomodasi di Batusangkar, Bukittinggi, atau Pariaman minimal tiga pekan sebelum tanggal pelaksanaan. Panitia telah menyiapkan kantong parkir terpadu, shuttle bus ramah keluarga, serta area khusus bagi para fotografer profesional guna memastikan kenyamanan dokumentasi tanpa mengganggu jalannya prosesi adat.",
          "descriptionEn": "The Ministry of Tourism and Creative Economy has officially unveiled the 2026 Karisma Event Nusantara (KEN) calendar for West Sumatra, starring the legendary Pacu Jawi mud buffalo race in Tanah Datar Regency and the epic Tabuik Cultural Festival in Pariaman City as premier national attractions. The provincial administration projects over 400,000 domestic and international tourist visits throughout the festival season, driving billions in grassroots creative economy revenues.\n\nPer official itineraries, Pacu Jawi runs on rotating weekends across four heritage nagari in Tanah Datar (Sungai Tarab, Pariangan, Rambatan, and Lima Kaum) amidst wet mud paddies framed by majestic Mount Marapi. Along the coast, Pariaman's Tabuik Festival spans sacred stages from Maambiak Tanah to the spectacular Tabuik Naiak Pangkek finale, culminating in the ocean casting ceremony at Gandoriah Beach accompanied by thunderous Gandang Tasa drum ensembles.\n\nRegional authorities and the Indonesian Hotel Association (PHRI) urge travelers planning to attend these celebrations to book lodging across Batusangkar, Bukittinggi, and Pariaman at least three weeks ahead. Organizers have prepared integrated park-and-ride facilities, dedicated shuttle services, and designated photographer staging areas to deliver an orderly spectator experience that respects traditional proceedings.",
          "tag": "Event KEN",
          "tagEn": "KEN Event",
          "actionUrl": "https://maps.google.com/?q=Tanah+Datar+Sumatera+Barat",
          "highlights": ["Masuk kurasi resmi Kharisma Event Nusantara (KEN) 2026 Kemenparekraf", "Pacu Jawi bergilir di 4 Nagari Tanah Datar berlatar sawah Gunung Marapi", "Prosesi puncak Tabuik Dibuang ka Lauik di Pantai Gandoriah Pariaman"],
          "highlightsEn": ["Curated into official 2026 Karisma Event Nusantara (KEN) national roster", "Pacu Jawi rotated across 4 Tanah Datar nagari framed by Mount Marapi", "Grand ocean casting ritual at Gandoriah Beach in Pariaman"],
          "tips": "Gunakan pakaian kasual yang nyaman dan siap terkena cipratan lumpur saat menonton Pacu Jawi di pematang sawah.",
          "tipsEn": "Wear comfortable casual clothes and mud-ready footwear when watching Pacu Jawi along paddy ridges.",
          "locationName": "Tanah Datar & Pantai Gandoriah Pariaman",
          "locationNameEn": "Tanah Datar & Gandoriah Beach, Pariaman"
        }
      ];

      let parsedData: any[] = [];

      if (apiKey) {
        try {
          const ai = new GoogleGenAI({
            apiKey,
            httpOptions: {
              headers: {
                'User-Agent': 'aistudio-build',
              },
            },
          });

          const currentDateStr = new Date().toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' });

          const prompt = `Anda adalah REDAKTUR UTAMA & JURNALIS SENIOR portal berita pariwisata Sumatera Barat dan nasional (Malala Newsroom).
Lakukan penelusuran fakta terkini untuk menghasilkan 5 hingga 6 artikel berita/informasi pariwisata Sumatera Barat dan nasional terpercaya yang terbit DALAM 30 HARI TERAKHIR (Per ${currentDateStr} tahun 2026).

STANDAR JURNALISTIK & ANTI-BOILERPLATE MUTLAK:
1. DILARANG KERAS MENGGUNAKAN BAHASA TEMPLAT / ROBOTIK:
   - DILARANG menulis kalimat klise pembuka seperti: "Sektor kepariwisataan terus menunjukkan dinamika kemajuan yang signifikan...", "Industri pariwisata kembali menyuguhkan kabar menggembirakan...", atau sejenisnya.
   - Gunakan gaya bahasa jurnalistik baku Indonesia (seperti Antara, Kompas, Tempo) dengan dateline kota yang jelas di awal kalimat lead.
2. STRUKTUR ARTIKEL WAJIB PERSIS 3 PARAGRAF BERNAS (Pisahkan dengan \\n\\n):
   - Paragraf 1 (Lead 5W+1H dengan Dateline): Sebutkan nama kota (contoh: "PADANG —", "BUKITTINGGI —", "PARIAMAN —"), subjek otoritas/penyelenggara resmi, fakta kejadian nyata, lokasi presisi, dan waktu secara lugas dan faktual.
   - Paragraf 2 (Detail Lapangan, Kesiapan Fasilitas & Fakta Pendukung): Rincian teknis, fasilitas pengunjung, penataan amenitas, data kuantitatif (waktu tempuh, panjang rute, jumlah kunjungan), dan dampak terhadap masyarakat nagari atau UMKM lokal.
   - Paragraf 3 (Panduan Praktis & Imbauan Resmi Bagi Wisatawan): Saran navigasi rute nyata, regulasi keamanan/etika adat yang berlaku, waktu kunjungan terbaik, atau kontak/akses menuju destinasi.
3. CAKUPAN PRIORITAS: Utamakan kabar faktual seputar Sumatera Barat (Konektivitas Tol Padang-Sicincin, Jalur Sitinjau Lauik, Cagar Alam Lembah Anai, Event KEN Pacu Jawi / Tabuik, Geopark Harau, Mentawai, Bukittinggi) serta kebijakan strategis pariwisata nasional.
4. FORMAT TANGGAL: Gunakan format tanggal riil dalam 30 hari terakhir (contoh: "04 September 2026", "28 Agustus 2026"). JANGAN gunakan "Hari Ini" atau "Minggu Ini" yang abstrak.

Formatkan output HANYA dalam format JSON valid Array of Objects:
[
  {
    "id": "news-1",
    "title": "Judul Berita Lugas & Informatif Standar Media Nasional",
    "titleEn": "Accurate & Professional English Headline",
    "date": "04 September 2026",
    "dateEn": "September 04, 2026",
    "category": "Pariwisata Sumatera Barat",
    "categoryEn": "West Sumatra Tourism",
    "description": "PADANG — Paragraf 1 narasi jurnalistik 5W+1H...\\n\\nParagraf 2 data faktual & fasilitas...\\n\\nParagraf 3 panduan praktis wisatawan...",
    "descriptionEn": "PADANG — Paragraph 1 factual lead...\\n\\nParagraph 2 technical details & amenities...\\n\\nParagraph 3 practical traveler guidance...",
    "tag": "Penting | Pantauan Jalur | Event KEN | Wisata Bahari | Konservasi",
    "tagEn": "Important | Route Watch | KEN Event | Marine | Conservation",
    "actionUrl": "https://peta-atau-link-terkait.com",
    "highlights": ["Fakta kunci 1", "Fakta kunci 2", "Fakta kunci 3"],
    "highlightsEn": ["Key fact 1", "Key fact 2", "Key fact 3"],
    "tips": "Tips spesifik dan aplikatif bagi wisatawan",
    "tipsEn": "Specific practical tip for travelers",
    "locationName": "Nama Destinasi, Kota/Kabupaten",
    "locationNameEn": "Destination, Regency/City"
  }
]

Keluarkan HANYA array JSON valid tanpa markdown backticks atau teks pengantar lainnya.`;

          const hotInfoModels = ['gemini-3.8-flash', 'gemini-3.7-flash', 'gemini-flash-latest'];
          for (const modelName of hotInfoModels) {
            try {
              const response = await ai.models.generateContent({
                model: modelName,
                contents: prompt,
                config: {
                  tools: [{ googleSearch: {} }],
                }
              });
              const rawText = response.text || '';
              const jsonMatch = rawText.match(/\[\s*\{[\s\S]*\}\s*\]/);
              if (jsonMatch) {
                parsedData = JSON.parse(jsonMatch[0]);
                if (Array.isArray(parsedData) && parsedData.length > 0) break;
              }
            } catch (err: any) {
              console.log(`AI Hot Info fetch with ${modelName} failed:`, err?.message);
            }
          }
        } catch (genError: any) {
          console.log("AI Hot Info fetch falling back to default news items:", genError?.message);
        }
      }

      if (!Array.isArray(parsedData) || parsedData.length === 0) {
        parsedData = fallbackData;
      }

      // Keep imageUrl as explicitly provided or empty (ready for manual upload)
      const enrichedData = parsedData.map((item: any) => {
        return {
          ...item,
          imageUrl: item.imageUrl || ''
        };
      });

      return res.json(enrichedData);
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

      const itemModels = ['gemini-3.8-flash', 'gemini-3.7-flash', 'gemini-flash-latest'];
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
    const vite = await createViteServer({
      server: { middlewareMode: true },
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
}

startServer();
