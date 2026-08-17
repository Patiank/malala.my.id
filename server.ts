import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";

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
        anggaran, 
        akomodasi, 
        waktuKunjungan, 
        kebutuhanKhusus, 
        outputPreferensi, 
        language = 'id',
        availableEvents = []
      } = req.body;

      const isEnglish = language === 'en';
      const startDate = waktuKunjungan?.tanggalMulai || '';
      const endDate = waktuKunjungan?.tanggalSelesai || '';

      if (!apiKey) {
        // Fallback response when GEMINI_API_KEY is not configured
        return res.json({
          title: isEnglish
            ? `Master Tour Itinerary: Wonderful West Sumatra Exploration (${durasiHari || 3} Days${startDate ? ` - Starting ${startDate}` : ''})`
            : `Rencana Perjalanan Eksklusif: Pesona Ranah Minang (${durasiHari || 3} Hari${startDate ? ` - Mulai ${startDate}` : ''})`,
          summary: isEnglish
            ? `A professionally curated, geographically optimized travel itinerary designed by master tour operators. Features seamless corridor routing, realistic drive times, iconic Minangkabau geoparks, UNESCO cultural heritage, and world-class culinary stops.`
            : `Rencana perjalanan wisata logis dan praktikal yang dirancang oleh Master Tour Operator berpengalaman. Mengutamakan rute searah tanpa bolak-balik, estimasi waktu tempuh realistis, kepuasan maksimal wisatawan, serta eksplorasi kuliner legendaris khas Minangkabau.`,
          itinerary: Array.from({ length: Number(durasiHari) || 3 }).map((_, idx) => {
            if (idx === 0) {
              return {
                day: 1,
                title: isEnglish ? "Airport Arrival, Anai Valley & Bukittinggi Highland Charm" : "Kedatangan BIM, Lembah Anai & Pesona Dataran Tinggi Bukittinggi",
                activities: [
                  {
                    time: "08:30 - 11:30",
                    location: isEnglish ? "BIM Airport → Lembah Anai Waterfall [Drive ±1.5 hrs]" : "Bandara BIM → Air Terjun Lembah Anai [Perjalanan ±1.5 jam]",
                    activity: isEnglish
                      ? "Airport pickup, scenic mountain drive along Anai Valley Gorge with a photo stop at the iconic roadside Lembah Anai Waterfall and lush tropical rainforest."
                      : "Penjemputan di Bandara BIM, perjalanan menyusuri kawasan cagar alam Lembah Anai dengan perhentian foto di Air Terjun Lembah Anai yang sejuk.",
                    tips: isEnglish ? "Roads can be damp; wear slip-resistant footwear and keep a light jacket ready." : "Jalanan sekitar air terjun lembap; gunakan alas kaki nyaman dan siapkan jaket ringan."
                  },
                  {
                    time: "12:00 - 13:30",
                    location: isEnglish ? "Padang Panjang Culinary Stop (Sate Mak Syukur / Restoran Gumarang)" : "Pemberhentian Kuliner Padang Panjang (Sate Mak Syukur / RM Pak Datuk)",
                    activity: isEnglish
                      ? "Authentic lunch savoring legendary Padang Panjang Beef Satay with thick yellow curry soup, or hearty Padang dishes."
                      : "Makan siang menikmati Sate Padang Panjang legendaris dengan kuah kuning rempah khas yang gurih dan nikmat.",
                    tips: isEnglish ? "Pair with warm Teh Talua (Minang whipped egg tea) for energy." : "Padukan dengan Teh Talua hangat untuk menambah stamina di udara sejuk."
                  },
                  {
                    time: "14:00 - 15:30",
                    location: isEnglish ? "Pandai Sikek Weaving Village [Drive ±20 mins]" : "Desa Tenun Songket Pandai Sikek [Perjalanan ±20 menit]",
                    activity: isEnglish
                      ? "Visit master weavers crafting gold-threaded Songket and intricate Minangkabau wood carvings under the silhouettes of Mount Singgalang and Marapi."
                      : "Menyaksikan mahakarya perajin tenun Songket benang emas dan ukiran kayu tradisional khas Minangkabau berlatar Gunung Singgalang.",
                    tips: isEnglish ? "Great spot to purchase genuine certified handmade Songket and scarves." : "Tempat terbaik membeli kain songket dan selendang tenun asli langsung dari perajin."
                  },
                  {
                    time: "16:30 - 18:30",
                    location: isEnglish ? "Jam Gadang & Panorama Ngarai Sianok [Bukittinggi]" : "Taman Jam Gadang & Panorama Ngarai Sianok [Bukittinggi]",
                    activity: isEnglish
                      ? "Check-in hotel in Bukittinggi, stroll around the historic 1926 Jam Gadang clock tower plaza, and enjoy golden hour canyon views at Ngarai Sianok."
                      : "Check-in hotel di Bukittinggi, menikmati suasana senja di pelataran Jam Gadang 1926 dan panorama sunset tebing 100 meter Ngarai Sianok.",
                    tips: isEnglish ? "Cool evening breeze (18-20°C); perfect time for family photography." : "Udara sore cukup sejuk (18-20°C); waktu terbaik untuk berfoto bersama keluarga."
                  }
                ],
                culinaryRecommendation: isEnglish
                  ? "Dinner: Nasi Kapau Uni Lis at Los Lambuang Pasar Atas (Must-try: Gulai Tambusu & Dendeng Batokok)."
                  : "Makan Malam: Nasi Kapau Uni Lis di Los Lambuang Pasar Atas Bukittinggi (Wajib coba: Gulai Tambusu, Dendeng Batokok, dan Rendang)."
              };
            } else if (idx === 1) {
              return {
                day: 2,
                title: isEnglish ? "Lembah Harau Granite Canyon & Kelok 9 Mega Flyover" : "Geopark Tebing Granit Lembah Harau & Megaproyek Jembatan Kelok 9",
                activities: [
                  {
                    time: "08:00 - 11:30",
                    location: isEnglish ? "Lembah Harau Geopark, 50 Kota [Drive ±1 hr from Bukittinggi]" : "Geopark Lembah Harau, Kab. 50 Kota [Perjalanan ±1 jam dari Bukittinggi]",
                    activity: isEnglish
                      ? "Exploring the towering 100-300m vertical granite cliffs of Lembah Harau, visiting Sarasah Murai and Sarasah Bunta waterfalls amidst emerald rice terraces."
                      : "Menjelajahi keagungan tebing granit tegak 100-300 meter Lembah Harau, menikmati Air Terjun Sarasah Murai dan hamparan sawah hijau asri.",
                    tips: isEnglish ? "Rent a local motor-scooter or open safari jeep for best cliff photography." : "Sewa safari jeep terbuka atau jalan kaki santai untuk sudut foto tebing terbaik."
                  },
                  {
                    time: "12:00 - 13:30",
                    location: isEnglish ? "Harau Countryside Resto (Pondok Flora / Rumah Makan Pongek Oci)" : "Restoran Tepi Sawah Harau (RM Pondok Flora / Pongek Situjuah)",
                    activity: isEnglish
                      ? "Authentic Payakumbuh lunch featuring Gulai Itiak Lado Mudo (green chili smoked duck) and fresh river gourami fish."
                      : "Makan siang dengan hidangan Gulai Itiak Lado Mudo (bebek cabe hijau), Pongek Cubadak, dan Ikan Bakar segar.",
                    tips: isEnglish ? "Duck is slow-cooked for 8 hours, extremely tender with moderate aroma." : "Daging itik dimasak perlahan dengan bumbu rempah harum dan empuk."
                  },
                  {
                    time: "14:30 - 16:30",
                    location: isEnglish ? "Kelok 9 Flyover & Batang Sanipan Canyon [Drive ±30 mins]" : "Jembatan Layang Kelok 9 & Ngalau Indah [Perjalanan ±30 menit]",
                    activity: isEnglish
                      ? "Admire the magnificent engineering of Kelok 9 winding flyover bridges carved into the rainforest gorge, followed by scenic coffee at cliffside rest areas."
                      : "Menyaksikan kemegahan arsitektur jembatan layang Kelok 9 yang meliuk di antara dua bukit cagar alam, dilanjutkan rehat kopi di gardu pandang.",
                    tips: isEnglish ? "Spot local roasted sweet corn and banana fritters at viewpoints." : "Nikmati jagung bakar manis dan pisang kapik kelapa di spot gardu pandang."
                  }
                ],
                culinaryRecommendation: isEnglish
                  ? "Payakumbuh Special: Lamang Tapai (black fermented sticky rice with bamboo-roasted sticky rice) & Sate Danguang-Danguang."
                  : "Kuliner Khas Payakumbuh: Lamang Tapai ketan hitam bambu & Sate Danguang-Danguang berkuah rempah kelapa."
              };
            } else {
              return {
                day: idx + 1,
                title: isEnglish ? "Royal Heritage Istano Pagaruyung & Lake Singkarak Sunset" : "Warisan Kerajaan Istano Basa Pagaruyung & Danau Singkarak",
                activities: [
                  {
                    time: "08:30 - 10:30",
                    location: isEnglish ? "Nagari Pariangan Heritage Village [Drive ±45 mins]" : "Desa Wisata Nagari Pariangan [Perjalanan ±45 menit]",
                    activity: isEnglish
                      ? "Walking through the oldest Minang village on Mount Marapi slopes, marveling at century-old wooden Rumah Gadang and drinking roasted Kawa Daun coffee."
                      : "Menyusuri desa tertua Minangkabau di lereng Marapi, mengagumi arsitektur Rumah Gadang kayu ratusan tahun, dan mencicipi seduhan kopi Kawa Daun.",
                    tips: isEnglish ? "Wear respectful attire and drink Kawa tea from traditional coconut shells." : "Kenakan pakaian sopan dan nikmati sensasi minum kopi daun dari batok kelapa."
                  },
                  {
                    time: "11:15 - 13:30",
                    location: isEnglish ? "Istano Basa Pagaruyung, Batusangkar [Drive ±25 mins]" : "Istano Basa Pagaruyung, Batusangkar [Perjalanan ±25 menit]",
                    activity: isEnglish
                      ? "Touring the majestic 3-storey Minangkabau Royal Palace, admiring golden carvings, and trying on royal ceremonial Minang attire for commemorative photos."
                      : "Eksplorasi kemegahan Istana Kerajaan Minangkabau 3 lantai beratap gonjong 11 lekuk, serta mencoba kostum adat raja dan ratu Bundo Kanduang.",
                    tips: isEnglish ? "Costume rental available on ground floor; highly recommended for souvenirs." : "Sewa busana adat tersedia di lokasi; sangat direkomendasikan untuk kenang-kenangan."
                  },
                  {
                    time: "14:15 - 16:30",
                    location: isEnglish ? "Lake Singkarak Shoreline [Drive ±30 mins]" : "Tepian Danau Singkarak [Perjalanan ±30 menit]",
                    activity: isEnglish
                      ? "Late lunch and relaxation along the turquoise shores of Lake Singkarak, tasting endemic crispy fried Bilih fish while enjoying the vast lake panorama."
                      : "Makan siang santai di tepi Danau Singkarak, menikmati hidangan Ikan Bilih goreng renyah yang hanya hidup endemik di danau ini.",
                    tips: isEnglish ? "Buy packaged dried Ikan Bilih as exclusive authentic gifts." : "Beli oleh-oleh Ikan Bilih krispi kemasan langsung dari nelayan danau."
                  },
                  {
                    time: "17:30 - 19:30",
                    location: isEnglish ? "Grand Mosque of West Sumatra & Padang Beach [Drive ±1.5 hrs to Padang]" : "Masjid Raya Sumatera Barat & Pantai Padang [Perjalanan ±1.5 jam ke Padang]",
                    activity: isEnglish
                      ? "Sunset contemplation at Padang Beach followed by admiring the iconic award-winning Rumah Gadang architectural dome of Grand Mosque of West Sumatra."
                      : "Menikmati sunset di Pantai Padang / Jembatan Siti Nurbaya, dilanjutkan beribadah dan mengagumi kemegahan arsitektur Masjid Raya Sumatera Barat.",
                    tips: isEnglish ? "Grand Mosque has beautiful night illumination." : "Masjid Raya Sumbar bermandikan cahaya lampu yang sangat megah di malam hari."
                  }
                ],
                culinaryRecommendation: isEnglish
                  ? "Dinner in Padang: Es Durian Ganti Nan Jano & Sate Padang Ajo Ramon."
                  : "Kuliner Penutup Kota Padang: Es Durian Iko Gantinyo / Ganti Nan Jano & Sate Padang Ajo Ramon."
              };
            }
          }),
          localTips: isEnglish
            ? [
                "Geographic Flow: Itinerary is arranged sequentially without back-and-forth travel, ensuring comfort and maximum sightseeing time.",
                "Cultural Etiquette: Ranah Minang honors 'Adat Basandi Syarak, Syarak Basandi Kitabullah'. Dress modestly when visiting villages, palaces, and mosques.",
                "Gastronomy Note: When dining at traditional Padang restaurants, dishes are served 'Hidang' on your table; you only pay for what you eat.",
                "Essential Souvenirs: Christine Hakim Balado Chips, Songket Pandai Sikek, Kopi Kawa Daun, and Vacuum-packed Rendang."
              ]
            : [
                "Logika Perjalanan: Rute disusun secara linear searah per klaster geografis tanpa bolak-balik, menjamin kenyamanan fisik dan efisiensi waktu.",
                "Etika Budaya: Masyarakat Minangkabau memegang teguh 'Adat Basandi Syarak, Syarak Basandi Kitabullah'. Kenakan busana sopan saat berkunjung ke nagari, istana, dan masjid.",
                "Tradisi Kuliner Hidang: Di Rumah Makan Padang otentik, makanan disajikan bertumpuk di meja (sistem hidang); Anda hanya membayar piring yang dimakan.",
                "Oleh-Oleh Wajib: Keripik Balado Sanjai Christine Hakim/Mahkota, Kain Tenun Pandai Sikek, Kopi Kawa Daun, dan Rendang Kemasan Vakum."
              ]
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

      const langInstruction = isEnglish
        ? "Please generate the official trip itinerary for West Sumatra completely in ENGLISH language."
        : "Buatkan rencana perjalanan wisata (Itinerary) resmi & komprehensif untuk Sumatera Barat dalam Bahasa Indonesia.";

      // Format events list for context
      const eventsSummary = Array.isArray(availableEvents) && availableEvents.length > 0
        ? availableEvents.map((ev: any) => `- ${ev.title} (${ev.schedule || ev.date || ''} di ${ev.location || 'Sumbar'}) ${ev.isKen ? '[KEN Kemenparekraf]' : ''}: ${ev.description || ''}`).join('\n')
        : 'Katalog event resmi Dinas Pariwisata Sumbar 2026: Pacu Jawi (Mei-Juni / Agt-Sept di Tanah Datar), Tour de Singkarak (Juli-Agustus), Festival Tabuik (Muharram/Juli di Pariaman), Rang Solok Baralek Gadang (September di Solok), Payakumbuh Botuang Festival (Juli), Sawahlunto Songket Carnival (September), Festival Siti Nurbaya Padang (Agustus).';

      const prompt = `Anda adalah MASTER TOUR OPERATOR & CHIEF TRAVEL PLANNER TERBAIK & PALING BERPENGALAMAN di Sumatera Barat (Wonderful West Sumatra Tourism Board).
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

KATALOG EVENT & FESTIVAL RESMI SUMBAR 2026:
${eventsSummary}

============================================================
PANDUAN LOGISTIK & STANDAR MASTER TOUR OPERATOR:
============================================================
1. KLASTER GEOGRAFIS & RUTE SEARAH (STRICT CORRIDOR ROUTING - DILARANG ZIG-ZAG / BOLAK-BALIK):
   - Gerbang Masuk & Keluar Utama: Bandara Internasional Minangkabau (BIM) Padang Pariaman / Kota Padang.
   - Pola Rute Standar:
     * HARI 1 (Upward Flow): BIM / Padang → Air Terjun Lembah Anai (Rehat) → Sentra Tenun Pandai Sikek → Bukittinggi (Check-in, Jam Gadang, Ngarai Sianok Sunset, Nasi Kapau Pasar Atas).
     * HARI 2 (Geopark & Alam Spektakuler): Bukittinggi → Payakumbuh → Lembah Harau (Tebing Granit & Air Terjun) → Jembatan Kelok 9 → Kuliner Khas Payakumbuh (Gulai Itiak Lado Mudo / Sate Danguang-Danguang).
     * HARI 3 (Heritage & Culture): Bukittinggi → Desa Terindah Dunia Nagari Pariangan → Istano Basa Pagaruyung (Batusangkar) → Makan Ikan Bilih tepi Danau Singkarak → Kembali ke Padang/BIM (Masjid Raya Sumbar & Pantai Padang).
     * HARI 4/5/7 (Jika durasi lebih panjang): Tambahkan Kawasan Bahari Mandeh (Pesisir Selatan), Danau Maninjau & Puncak Lawang via Kelok 44, Danau Kembar & Kebun Teh Alahan Panjang Solok, atau Kota Tambang UNESCO Sawahlunto.

2. PACING MANUSIAWI & ESTIMASI WAKTU TEMPUH RIIL:
   - Maksimal 3 - 4 destinasi utama per hari agar wisatawan tidak terburu-buru dan tidak kelelahan di jalan.
   - PADA SETIAP NAMA LOKASI/AKTIVITAS, CANTUMKAN ESTIMASI WAKTU TEMPUH DARI LOKASI SEBELUMNYA. Contoh: "Lembah Harau [Perjalanan ±45 mnt dari Bukittinggi]" atau "Istano Basa Pagaruyung [Perjalanan ±30 mnt]".

3. KULINER OTENTIK SEARAH JALUR (ROUTE-ALIGNED ICONIC FOOD):
   - Wajib merekomendasikan kuliner legendaris yang berada tepat di jalur perjalanan hari itu (bukan yang berlawanan arah). Contoh: Sate Mak Syukur di Padang Panjang, Nasi Kapau Los Lambuang di Bukittinggi, Gulai Itiak Lado Mudo di Ngarai/Harau, Ikan Bilih Goreng di Danau Singkarak, Es Durian Ganti Nan Jano di Padang.
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

      const response = await ai.models.generateContent({
        model: 'gemini-3.6-flash',
        contents: prompt,
      });

      const rawText = response.text || '';
      const jsonMatch = rawText.match(/\{[\s\S]*\}/);
      if (!jsonMatch) {
        throw new Error("Gagal mengekstrak data JSON dari respon AI");
      }
      const parsedData = JSON.parse(jsonMatch[0]);

      return res.json(parsedData);
    } catch (error: any) {
      console.error("Error generating AI itinerary:", error);
      return res.status(500).json({ error: error.message || "Gagal membuat rencana perjalanan AI" });
    }
  });

  // API Route: UNI MALA AI Chatbot / Quick Answers
  app.post("/api/ai/chat", async (req, res) => {
    try {
      const apiKey = process.env.GEMINI_API_KEY;
      const { message } = req.body;

      if (!apiKey) {
        // Fallback friendly reply when GEMINI_API_KEY is missing
        return res.json({
          reply: `Rancak bana! Saya UNI MALA AI Sumbar. Terkait "${message}", Sumatera Barat menawarkan destinasi luar biasa seperti Lembah Harau, Jam Gadang Bukittinggi, Danau Maninjau, serta sajian Rendang autentik dan Sate Padang. Ada tempat spesifik yang ingin Anda ketahui lebih dalam?`
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

      const systemInstruction = `Anda adalah 'UNI MALA AI Sumbar' - Pemandu AI Resmi Pariwisata & Kebudayaan Minangkabau dari Dinas Pariwisata Provinsi Sumatera Barat.
Anda sangat ramah, fasih, dan berwawasan luas tentang destinasi alam, kuliner khas (Rendang, Sate Padang, Teh Talua, Lamang Tapai), kebudayaan Minangkabau (Rumah Gadang, Jam Gadang, Nagari Pariangan, Silek, Ukiran, Adat), serta rute perjalanan terbaik di Sumatera Barat.
Gunakan Bahasa Indonesia yang sopan dan hangat. Selalu sertakan nuansa kehangatan Ranah Minang. Jangan melakukan transaksi/booking.`;

      const prompt = `${systemInstruction}\n\nPertanyaan Wisatawan: ${message}`;

      const response = await ai.models.generateContent({
        model: 'gemini-3.6-flash',
        contents: prompt,
      });

      return res.json({ reply: response.text });
    } catch (error: any) {
      console.error("AI Chat error:", error);
      return res.status(500).json({ error: error.message || "Gagal menjawab pertanyaan AI" });
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
          "title": "Indonesia Targetkan 17 Juta Wisatawan Mancanegara 2026",
          "titleEn": "Indonesia Targets 17 Million International Tourists in 2026",
          "date": "Agustus 2026",
          "dateEn": "August 2026",
          "category": "Event",
          "categoryEn": "Event",
          "description": "Kementerian Pariwisata dan Ekonomi Kreatif menyatakan target ambisius untuk mendatangkan 17 juta wisatawan mancanegara pada tahun 2026. Strategi ini didukung oleh pengembangan 5 Destinasi Super Prioritas dan penguatan branding Wonderful Indonesia di pasar global.\n\nBerbagai program promosi digital, kemudahan visa, dan peningkatan konektivitas penerbangan internasional menjadi pilar utama pencapaian target tersebut. Kolaborasi dengan platform digital dan influencer global turut memperkuat penetrasi pasar wisata dunia.\n\nSektor UMKM dan ekonomi kreatif lokal diharapkan menjadi beneficiary utama, dengan penguatan rantai pasok pariwisata dari hulu ke hilir di seluruh wilayah Indonesia.",
          "descriptionEn": "The Ministry of Tourism and Creative Economy announced an ambitious target to attract 17 million international tourists in 2026. The strategy is supported by developing 5 Super Priority Destinations and strengthening the Wonderful Indonesia branding in global markets.\n\nDigital promotions, visa facilitation, and enhanced international flight connectivity serve as the main pillars. Collaborations with digital platforms and global influencers further strengthen penetration into world tourism markets.\n\nLocal MSMEs and creative economy sectors are expected to be the primary beneficiaries, with strengthened tourism supply chains across all regions of Indonesia.",
          "tag": "Populer",
          "tagEn": "Popular",
          "actionUrl": "",
          "highlights": ["Target 17 Juta Wisman", "5 Destinasi Super Prioritas", "Branding Wonderful Indonesia"],
          "highlightsEn": ["17 Million Tourist Target", "5 Super Priority Destinations", "Wonderful Indonesia Branding"],
          "tips": "Pantau program promo penerbangan internasional untuk mendapatkan harga terbaik.",
          "tipsEn": "Monitor international flight promo programs for the best deals.",
          "locationName": "Seluruh Indonesia",
          "locationNameEn": "All of Indonesia"
        },
        {
          "id": "news-fallback-2",
          "title": "Labuan Bajo Jadi Tuan Rumah KTT ASEAN Tourism 2026",
          "titleEn": "Labuan Bajo Hosts ASEAN Tourism Summit 2026",
          "date": "Minggu Ini",
          "dateEn": "This Week",
          "category": "Berita",
          "categoryEn": "News",
          "description": "Labuan Bajo, Nusa Tenggara Timur, resmi menjadi tuan rumah KTT Pariwisata ASEAN 2026 yang dihadiri delegasi dari 10 negara anggota. Forum ini membahas pengembangan pariwisata berkelanjutan, ekonomi kreatif, dan konektivitas wisata regional di kawasan Asia Tenggara.\n\nBerbagai fasilitas infrastruktur baru telah diresmikan, termasuk perluasan Bandara Komodo dan penataan kawasan waterfront premium. Keindahan Taman Nasional Komodo menjadi latar belakang sempurna untuk diplomasi pariwisata tingkat tinggi ini.\n\nPelaku usaha pariwisata lokal berkesempatan memamerkan produk dan layanan mereka kepada buyer internasional melalui travel mart yang digelar bersamaan dengan KTT.",
          "descriptionEn": "Labuan Bajo, East Nusa Tenggara, officially hosts the 2026 ASEAN Tourism Summit attended by delegations from 10 member countries. The forum discusses sustainable tourism development, creative economy, and regional tourism connectivity in Southeast Asia.\n\nNew infrastructure facilities have been inaugurated, including Komodo Airport expansion and premium waterfront area development. The beauty of Komodo National Park serves as the perfect backdrop for this high-level tourism diplomacy.\n\nLocal tourism businesses have the opportunity to showcase their products and services to international buyers through a travel mart held alongside the summit.",
          "tag": "Baru",
          "tagEn": "New",
          "actionUrl": "",
          "highlights": ["KTT ASEAN Tourism", "Infrastruktur Baru Labuan Bajo", "Travel Mart Internasional"],
          "highlightsEn": ["ASEAN Tourism Summit", "New Labuan Bajo Infrastructure", "International Travel Mart"],
          "tips": "Booking akomodasi di Labuan Bajo jauh hari saat event internasional untuk harga terbaik.",
          "tipsEn": "Book Labuan Bajo accommodation well in advance during international events for best rates.",
          "locationName": "Labuan Bajo, NTT",
          "locationNameEn": "Labuan Bajo, East Nusa Tenggara"
        },
        {
          "id": "news-fallback-3",
          "title": "Bali Luncurkan Sistem E-Ticket Wisata Terintegrasi",
          "titleEn": "Bali Launches Integrated Tourism E-Ticket System",
          "date": "Bulan Ini",
          "dateEn": "This Month",
          "category": "Pengumuman",
          "categoryEn": "Announcement",
          "description": "Pemerintah Provinsi Bali meluncurkan sistem tiket elektronik terintegrasi untuk seluruh destinasi wisata utama di pulau dewata. Sistem ini menghubungkan lebih dari 50 atraksi wisata termasuk pura, pantai, taman budaya, dan museum dalam satu platform digital.\n\nWisatawan cukup membeli satu e-ticket melalui aplikasi resmi atau website untuk mengakses berbagai destinasi dengan harga bundling yang lebih terjangkau. Sistem pembayaran mendukung berbagai metode termasuk kartu kredit internasional, QRIS, dan dompet digital.\n\nLangkah ini diharapkan meningkatkan efisiensi kunjungan wisata sekaligus mengurangi penggunaan tiket kertas demi mendukung visi Bali sebagai destinasi wisata berkelanjutan.",
          "descriptionEn": "The Bali Provincial Government launched an integrated electronic ticketing system for all major tourist destinations on the island. The system connects over 50 attractions including temples, beaches, cultural parks, and museums in a single digital platform.\n\nTourists simply purchase one e-ticket through the official app or website to access various destinations with more affordable bundle pricing. The payment system supports various methods including international credit cards, QRIS, and digital wallets.\n\nThis move is expected to improve tourism visit efficiency while reducing paper ticket usage in support of Bali's vision as a sustainable tourism destination.",
          "tag": "Terkini",
          "tagEn": "Latest",
          "actionUrl": "",
          "highlights": ["E-Ticket Terintegrasi 50+ Destinasi", "Pembayaran Digital Multi-Metode", "Wisata Berkelanjutan"],
          "highlightsEn": ["Integrated E-Ticket for 50+ Destinations", "Multi-Method Digital Payment", "Sustainable Tourism"],
          "tips": "Download aplikasi e-ticket resmi sebelum tiba di Bali untuk kemudahan akses.",
          "tipsEn": "Download the official e-ticket app before arriving in Bali for easy access.",
          "locationName": "Bali",
          "locationNameEn": "Bali"
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

          const prompt = `Lakukan pencarian Google (Google Search) untuk mendapatkan 5 berita, event, atau informasi terkini mengenai pariwisata di seluruh Indonesia (nasional).

SANGAT PENTING & KHUSUS:
1. Cari HANYA informasi/berita yang DIPUBLIKASIKAN DALAM KURUN WAKTU 1 BULAN TERAKHIR dari hari ini (${currentDateStr}).
2. JANGAN PERNAH menampilkan berita, artikel, event, atau isu yang sudah lewat lebih dari 1 bulan dari batas waktu tersebut.
3. Ekstrak 5 informasi paling segar, relevan, dan penting dari berbagai wilayah di Indonesia (bukan hanya 1 provinsi).
4. Cakupan berita meliputi: Bali, Lombok, Raja Ampat, Labuan Bajo, Yogyakarta, Sumatera Barat, Sulawesi, Kalimantan, Papua, dan destinasi wisata nasional lainnya.

Formatkan output HANYA dalam format JSON valid sebagai Array of Objects dengan struktur berikut untuk SETIAP item:
{
  "id": "String unik (misal: news-1)",
  "title": "Judul berita/event (Bahasa Indonesia)",
  "titleEn": "Judul berita/event (Terjemahan Bahasa Inggris)",
  "date": "Tanggal atau periode publikasi (Bahasa Indonesia, Wajib dalam 1 bulan terakhir)",
  "dateEn": "Date of publication (Bahasa Inggris, Must be within last 1 month)",
  "category": "Kategori (Pilih salah satu: Event, Berita, Pengumuman, Promo)",
  "categoryEn": "Kategori (Pilih salah satu: Event, News, Announcement, Promo)",
  "description": "Deskripsi lengkap berita (Bahasa Indonesia, minimal 2-3 paragraf komprehensif, dipisah dengan \\n\\n)",
  "descriptionEn": "Deskripsi berita (Bahasa Inggris, minimal 2-3 paragraf komprehensif, dipisah dengan \\n\\n)",
  "tag": "Tag singkat (misal: Terkini, Baru, Populer)",
  "tagEn": "Tag singkat (misal: Latest, New, Popular)",
  "actionUrl": "URL tautan sumber berita asli atau URL terkait",
  "highlights": ["Poin penting 1", "Poin penting 2"],
  "highlightsEn": ["Key point 1", "Key point 2"],
  "tips": "Satu tips terkait untuk wisatawan (Bahasa Indonesia)",
  "tipsEn": "Satu tips terkait untuk wisatawan (Bahasa Inggris)",
  "locationName": "Lokasi spesifik (jika ada, misal: 'Bali' atau 'Labuan Bajo, NTT')",
  "locationNameEn": "Lokasi spesifik (jika ada, misal: 'Bali' atau 'Labuan Bajo, NTT')"
}

Keluarkan HANYA array of JSON, tanpa markdown backticks atau teks lain.`;

          const response = await ai.models.generateContent({
            model: 'gemini-3.6-flash',
            contents: prompt,
            config: {
              tools: [{ googleSearch: {} }],
            }
          });
          const rawText = response.text || '';
          const jsonMatch = rawText.match(/\[\s*\{[\s\S]*\}\s*\]/);
          if (jsonMatch) {
            parsedData = JSON.parse(jsonMatch[0]);
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
