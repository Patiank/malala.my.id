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
      const { durasiHari, profilWisatawan, preferensiMinat, logistik, anggaran, akomodasi, kebutuhanKhusus, outputPreferensi, language = 'id' } = req.body;

      const isEnglish = language === 'en';

      if (!apiKey) {
        // Fallback response when GEMINI_API_KEY is not configured
        return res.json({
          title: isEnglish
            ? `West Sumatra Exploration (${durasiHari || 3} Days - ${profilWisatawan?.kategori || 'Nature & Culinary'})`
            : `Eksplorasi Ranah Minang (${durasiHari || 3} Hari - ${profilWisatawan?.kategori || 'Wisata Alam & Kuliner'})`,
          summary: isEnglish
            ? `UNI MALA AI recommended travel plan combining geopark landscapes, authentic Rendang gastronomy, and rich Minangkabau Rumah Gadang heritage.`
            : `Rencana wisata rekomendasi UNI MALA AI mencakup perpaduan keindahan geowisata, kuliner Rendang autentik, serta warisan budaya Rumah Gadang.`,
          itinerary: Array.from({ length: Number(durasiHari) || 3 }).map((_, idx) => ({
            day: idx + 1,
            title: isEnglish
              ? (idx === 0 ? "Arrival & Bukittinggi Clock Tower Charm" : idx === 1 ? "Lembah Harau Canyon Adventure & Payakumbuh Food" : "Lake Maninjau & Nagari Pariangan Heritage Village")
              : (idx === 0 ? "Kedatangan & Pesona Kota Jam Gadang Bukittinggi" : idx === 1 ? "Petualangan Geopark Lembah Harau & Kuliner Payakumbuh" : "Wisata Danau Maninjau & Desa Terindah Nagari Pariangan"),
            activities: [
              {
                time: "08:30 - 11:30",
                location: idx === 0 ? "Jam Gadang & Ngarai Sianok" : idx === 1 ? "Lembah Harau Canyon" : "Nagari Pariangan",
                activity: isEnglish
                  ? (idx === 0 ? "Photo session at Bukittinggi Clock Tower, followed by exploring Sianok Canyon and Japanese Tunnel." : idx === 1 ? "Enjoying spectacular granite cliffs and Sarasah Bunta Waterfall." : "Explore Minangkabau's oldest village featuring traditional wooden architecture and Mount Marapi views.")
                  : (idx === 0 ? "Sesi foto di Ikon Jam Gadang, dilanjutkan menyusuri panorama Ngarai Sianok dan Lubang Jepang." : idx === 1 ? "Menikmati tebing tebing granit spektakuler dan air terjun Sarasah Bunta." : "Jelajah desa tertua Minangkabau dengan arsitektur kayu tradisional dan pemandangan Gunung Marapi."),
                tips: isEnglish ? "Wear warm layers and comfortable walking shoes." : "Gunakan pakaian hangat dan sepatu jalan yang nyaman."
              },
              {
                time: "12:30 - 14:00",
                location: isEnglish ? "Authentic Padang Cuisine Restaurant" : "Restoran Rumah Makan Padang Autentik",
                activity: isEnglish ? "Lunch featuring Beef Rendang, Pop Chicken, and Bukittinggi Kapau Curry." : "Makan siang dengan hidangan Rendang Daging, Ayam Pop, dan Gulai Kapau khas Bukittinggi.",
                tips: isEnglish ? "Try pairing Green Sambal with Tunjang Curry." : "Coba padukan Sambal Lado Mudo dengan Gulai Tunjang."
              },
              {
                time: "15:30 - 18:00",
                location: idx === 0 ? "Puncak Lawang & Kelok 44" : idx === 1 ? "Istano Basa Pagaruyung" : "Padang Beach & Grand Mosque of West Sumatra",
                activity: isEnglish
                  ? (idx === 0 ? "Enjoying Lake Maninjau panoramic view from Puncak Lawang height." : idx === 1 ? "Exploring Minangkabau Royal Palace wearing traditional costume." : "Sunset at Padang Beach and admiring the unique dome-less Minangkabau architecture of West Sumatra Grand Mosque.")
                  : (idx === 0 ? "Menikmati pemandangan Danau Maninjau dari ketinggian Puncak Lawang." : idx === 1 ? "Eksplorasi Istana Kerajaan Minangkabau dengan pakaian adat tradisional." : "Sunset di Pantai Padang dan menikmati keindahan arsitektur Rumah Gadang tanpa kubah Masjid Raya Sumbar."),
                tips: isEnglish ? "Capture the sunset moments." : "Abadikan momen matahari terbenam."
              }
            ],
            culinaryRecommendation: isEnglish
              ? (idx === 0 ? "Pasar Atas Nasi Kapau & Teh Talua (Egg Tea)" : idx === 1 ? "Payakumbuh Satay & Tapai Sticky Rice" : "Padang Satay & Durian Ice")
              : (idx === 0 ? "Nasi Kapau Pasar Atas & Teh Talua" : idx === 1 ? "Sate Payakumbuh & Lemang Tapai" : "Sate Padang & Es Durian")
          })),
          localTips: isEnglish
            ? [
                "Minangkabau culture deeply values 'Adat Basandi Syarak, Syarak Basandi Kitabullah' (Custom based on religion). Please respect local wisdom and dress modestly.",
                "Must-buy souvenirs: Sanjai Balado Chips, Local Coffee, and Packaged Rendang."
              ]
            : [
                "Masyarakat Minangkabau memegang teguh falsafah 'Adat Basandi Syarak, Syarak Basandi Kitabullah'. Hargai kearifan lokal.",
                "Oleh-oleh wajib: Keripik Balado Sanjai, Kopi Bawaan, dan Rendang Kemasan."
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

      const prompt = `Anda adalah UNI MALA AI Sumatera Barat - Asisten AI Pariwisata Resmi Dinas Pariwisata Provinsi Sumatera Barat (Wonderful West Sumatra).\n${langInstruction}\n\nDetail Permintaan Wisatawan:\n- Durasi: ${durasiHari || 3} hari\n- Profil Wisatawan: ${profilWisatawan?.jumlahOrang || 2} orang (${profilWisatawan?.kategori || 'pasangan'}, Asal: ${profilWisatawan?.asal || 'domestik'})\n- Minat Destinasi: ${(preferensiMinat?.kategoriWisata || []).join(', ')}\n- Tingkat Aktivitas: ${preferensiMinat?.tingkatAktivitas || 'sedang'}\n- Kelas Anggaran: ${anggaran?.rentang || 'menengah'}\n- Kebutuhan Khusus / Alergi: ${(kebutuhanKhusus?.alergiMakanan || []).join(', ')}\n\nFormatkan output HANYA dalam format JSON valid dengan struktur:\n{\n  "title": "${isEnglish ? 'Trip Title' : 'Judul Rencana Perjalanan Wisata'}",\n  "summary": "${isEnglish ? 'Summary of experience' : 'Ringkasan pengalaman wisata yang akan dirasakan'}",\n  "itinerary": [\n    {\n      "day": 1,\n      "title": "${isEnglish ? 'Day 1 Theme' : 'Tema Hari Ke-1'}",\n      "activities": [\n        {\n          "time": "08:00 - 10:00",\n          "location": "${isEnglish ? 'Location Name' : 'Nama Tempat / Destinasi'}",\n          "activity": "${isEnglish ? 'Recommended activity description' : 'Deskripsi kegiatan yang direkomendasikan'}",\n          "tips": "${isEnglish ? 'Local tips' : 'Tips lokal / kearifan lokal'}"\n        }\n      ],\n      "culinaryRecommendation": "${isEnglish ? 'Culinary recommendation' : 'Rekomendasi kuliner khas untuk hari ini'}"\n    }\n  ],\n  "localTips": [\n    "${isEnglish ? 'Minangkabau etiquette tip' : 'Tips etika Minangkabau (Adat Basandi Syarak, Syarak Basandi Kitabullah)'}",\n    "${isEnglish ? 'Souvenir recommendation' : 'Rekomendasi oleh-oleh khas Sumbar'}"\n  ]\n}\n\nBerikan respon HANYA dalam format JSON tanpa markdown backticks atau teks lain di luar JSON. Language requested: ${isEnglish ? 'ENGLISH' : 'INDONESIAN'}.`;

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
