import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";

async function startServer() {
  const app = express();
  const PORT = Number(process.env.PORT) || 5000;

  app.use(express.json());

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
          "title": "Festival Pesona Minangkabau 2026 Segera Digelar",
          "titleEn": "Minangkabau Charm Festival 2026 to be Held Soon",
          "date": "Oktober 2026",
          "dateEn": "October 2026",
          "category": "Event",
          "categoryEn": "Event",
          "description": "Pemerintah Provinsi Sumatera Barat bersiap menyelenggarakan Festival Pesona Minangkabau 2026 yang akan menampilkan ragam kebudayaan autentik dari seluruh penjuru Ranah Minang. Acara tahunan ini menjadi magnet bagi ribuan wisatawan nusantara dan mancanegara yang ingin menyaksikan langsung kemegahan budaya lokal.\n\nBerpusat di Istano Basa Pagaruyung, festival ini akan menghadirkan pawai budaya dengan ribuan peserta berpakaian adat, pameran kuliner tradisional yang menggugah selera, serta pertunjukan seni kolosal yang memukau. Selain itu, pengunjung juga bisa mengikuti berbagai lokakarya kerajinan tangan khas Minang.\n\nPara pelaku UMKM lokal pun turut dilibatkan secara maksimal untuk memperkenalkan produk unggulan mereka, mulai dari tenun songket, ukiran kayu, hingga variasi makanan ringan khas Sumatera Barat. Pastikan Anda merencanakan kunjungan ke Batusangkar untuk menjadi bagian dari perayaan budaya terbesar ini.",
          "descriptionEn": "The West Sumatra Provincial Government is preparing to host the 2026 Minangkabau Charm Festival, which will showcase a variety of authentic cultures from across the Minang realm. This annual event attracts thousands of domestic and international tourists eager to witness the grandeur of local culture firsthand.\n\nCentered at the Istano Basa Pagaruyung, the festival will feature a cultural parade with thousands of participants in traditional attire, mouthwatering traditional culinary exhibitions, and mesmerizing colossal art performances. Additionally, visitors can participate in various traditional Minang handicraft workshops.\n\nLocal MSMEs are also maximally involved to introduce their premium products, ranging from songket weaving and wood carving to various West Sumatran snacks. Make sure to plan your visit to Batusangkar to be part of this grand cultural celebration.",
          "tag": "Populer",
          "tagEn": "Popular",
          "actionUrl": "",
          "highlights": ["Pawai Ribuan Baju Adat", "Kuliner Tradisional Terbesar", "Pertunjukan Seni Kolosal"],
          "highlightsEn": ["Thousands in Traditional Attire Parade", "Largest Traditional Culinary Expo", "Colossal Art Performances"],
          "tips": "Datanglah lebih awal untuk mendapatkan spot foto terbaik saat pawai.",
          "tipsEn": "Arrive early to secure the best photo spots during the parade.",
          "locationName": "Istano Basa Pagaruyung, Tanah Datar",
          "locationNameEn": "Pagaruyung Palace, Tanah Datar"
        },
        {
          "id": "news-fallback-2",
          "title": "Peresmian Kawasan Ekowisata Baru di Lembah Harau",
          "titleEn": "Inauguration of New Ecotourism Area in Harau Valley",
          "date": "Minggu Ini",
          "dateEn": "This Week",
          "category": "Berita",
          "categoryEn": "News",
          "description": "Lembah Harau kembali menambah daya tariknya dengan diresmikannya kawasan ekowisata baru yang mengusung konsep ramah lingkungan dan pelestarian alam. Langkah ini diambil untuk memberikan alternatif liburan yang menyatu dengan alam tanpa merusak ekosistem asli lembah granit tersebut.\n\nKawasan baru ini dilengkapi dengan fasilitas glamping premium, jalur trekking yang dirancang dengan memperhatikan kontur tanah alami, serta area konservasi burung endemik. Wisatawan kini memiliki kesempatan untuk bermalam di tengah pelukan tebing-tebing raksasa sambil mendengarkan harmoni suara alam yang menenangkan.\n\nSelain menikmati keindahan alam, pengunjung juga akan diedukasi mengenai pentingnya menjaga kelestarian lingkungan dan budaya lokal. Masyarakat setempat turut diberdayakan sebagai pemandu wisata ekologis yang siap berbagi cerita dan kearifan lokal kepada para tamu.",
          "descriptionEn": "Harau Valley is adding to its appeal with the inauguration of a new ecotourism area that promotes eco-friendly concepts and nature conservation. This step was taken to provide vacation alternatives that blend with nature without harming the original ecosystem of the granite valley.\n\nThe new area is equipped with premium glamping facilities, trekking paths designed with respect for the natural terrain, and an endemic bird conservation area. Tourists now have the opportunity to spend the night embraced by giant cliffs while listening to the soothing harmony of nature's sounds.\n\nBesides enjoying the natural beauty, visitors will also be educated on the importance of preserving the environment and local culture. Local communities are empowered as ecological tour guides ready to share stories and local wisdom with guests.",
          "tag": "Baru",
          "tagEn": "New",
          "actionUrl": "",
          "highlights": ["Glamping Premium", "Jalur Trekking Ramah Lingkungan", "Edukasi Pelestarian Alam"],
          "highlightsEn": ["Premium Glamping", "Eco-friendly Trekking Paths", "Nature Conservation Education"],
          "tips": "Bawa pakaian hangat karena suhu malam hari di lembah cukup dingin.",
          "tipsEn": "Bring warm clothing as night temperatures in the valley can be quite chilly.",
          "locationName": "Lembah Harau, Kab. Limapuluh Kota",
          "locationNameEn": "Harau Valley, Limapuluh Kota Regency"
        },
        {
          "id": "news-fallback-3",
          "title": "Jalur Kelok 44 Ditata Ulang dengan Gardu Pandang Baru",
          "titleEn": "Kelok 44 Route Revamped with New Viewing Decks",
          "date": "Bulan Ini",
          "dateEn": "This Month",
          "category": "Pengumuman",
          "categoryEn": "Announcement",
          "description": "Dinas Pariwisata Sumatera Barat bersama pemerintah daerah setempat merampungkan penataan ulang kawasan wisata Kelok 44 di Maninjau. Penataan ini mencakup pembuatan spot gardu pandang baru yang lebih aman serta tempat peristirahatan yang nyaman bagi para pengendara dan wisatawan.\n\nDengan hadirnya spot pendukung ini, wisatawan dapat menikmati keindahan panorama Danau Maninjau dari ketinggian dengan rasa aman dan nyaman. Gardu pandang dirancang dengan estetika Minang yang kental, menyajikan pemandangan lanskap alam yang memukau mata.",
          "descriptionEn": "West Sumatra Tourism Board alongside local government has completed revamping the Kelok 44 tourism area in Maninjau. The project includes new safe viewing decks and comfortable rest stops for drivers and tourists.\n\nWith these new spots, visitors can admire the panoramic view of Lake Maninjau from heights with safety and comfort. Viewing decks are designed with rich Minang aesthetics.",
          "tag": "Terkini",
          "tagEn": "Latest",
          "actionUrl": "",
          "highlights": ["Gardu Pandang Baru", "Aman & Nyaman", "Panorama Danau Maninjau"],
          "highlightsEn": ["New Viewing Decks", "Safe & Comfortable", "Lake Maninjau Panorama"],
          "tips": "Hati-hati saat melintasi tikungan tajam Kelok 44 dan gunakan gigi rendah.",
          "tipsEn": "Drive carefully on Kelok 44 sharp bends using low gear.",
          "locationName": "Kelok 44, Kab. Agam",
          "locationNameEn": "Kelok 44, Agam Regency"
        }
      ];

      let rawText = '';

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

          const prompt = `Lakukan pencarian Google (Google Search) untuk mendapatkan 5 berita, event, atau informasi terkini mengenai pariwisata di provinsi Sumatera Barat.

SANGAT PENTING & KHUSUS:
1. Cari HANYA informasi/berita yang DIPUBLIKASIKAN DALAM KURUN WAKTU 1 BULAN TERAKHIR dari hari ini (${currentDateStr}).
2. JANGAN PERNAH menampilkan berita, artikel, event, atau isu yang sudah lewat lebih dari 1 bulan dari batas waktu tersebut.
3. Ekstrak 5 informasi paling segar, relevan, dan penting.

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
  "locationName": "Lokasi spesifik (jika ada, misal: 'Kota Padang' atau 'Kab. Tanah Datar')",
  "locationNameEn": "Lokasi spesifik (jika ada, misal: 'Padang City' atau 'Tanah Datar Regency')"
}

Keluarkan HANYA array of JSON, tanpa markdown backticks atau teks lain.`;

          const response = await ai.models.generateContent({
            model: 'gemini-3.6-flash',
            contents: prompt,
            config: {
              tools: [{ googleSearch: {} }],
            }
          });
          rawText = response.text || '';
        } catch (genError: any) {
          console.log("AI Hot Info fetch falling back to default news items.");
          rawText = JSON.stringify(fallbackData);
        }
      } else {
        rawText = JSON.stringify(fallbackData);
      }

      const jsonMatch = rawText.match(/\[\s*\{[\s\S]*\}\s*\]/);

      if (!jsonMatch) {
        console.error("Raw AI response:", rawText);
        throw new Error("Gagal mengekstrak data JSON dari respon AI.");
      }

      const parsedData = JSON.parse(jsonMatch[0]);

      // Enrich each item with a high-definition topic-matched image URL
      const enrichedData = parsedData.map((item: any, idx: number) => {
        const title = item.title || item.titleEn || '';
        const cat = item.category || item.categoryEn || '';
        const loc = item.locationName || item.locationNameEn || '';
        const desc = item.description || item.descriptionEn || '';
        const combined = `${title} ${cat} ${loc} ${desc}`.toLowerCase();

        let imageUrl = item.imageUrl;

        if (!imageUrl || imageUrl.includes('placeholder') || imageUrl.includes('example.com')) {
          if (combined.includes('kelok 9') || combined.includes('kelok sembilan') || combined.includes('jembatan') || combined.includes('jalur') || combined.includes('cuaca') || combined.includes('tol')) {
            imageUrl = 'https://images.unsplash.com/photo-1519817650390-64a93db51149?auto=format&fit=crop&w=800&q=80';
          } else if (combined.includes('rendang') || combined.includes('sate') || combined.includes('kuliner') || combined.includes('kapau') || combined.includes('makan')) {
            imageUrl = 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=800&q=80';
          } else if (combined.includes('pagaruyung') || combined.includes('istana') || combined.includes('budaya') || combined.includes('adat') || combined.includes('rumah gadang') || combined.includes('matrilineal')) {
            imageUrl = 'https://images.unsplash.com/photo-1590523741831-ab7e8b8f9c7f?auto=format&fit=crop&w=800&q=80';
          } else if (combined.includes('lawang') || combined.includes('maninjau') || combined.includes('paralayang') || combined.includes('paragliding')) {
            imageUrl = 'https://images.unsplash.com/photo-1527668752968-14dc70a27c95?auto=format&fit=crop&w=800&q=80';
          } else if (combined.includes('harau') || combined.includes('tebing') || combined.includes('geopark') || combined.includes('lembah') || combined.includes('air terjun')) {
            imageUrl = 'https://images.unsplash.com/photo-1542385151-efd9000785a0?auto=format&fit=crop&w=800&q=80';
          } else if (combined.includes('jam gadang') || combined.includes('bukittinggi') || combined.includes('kota')) {
            imageUrl = 'https://images.unsplash.com/photo-1596402184320-417e7178b2cd?auto=format&fit=crop&w=800&q=80';
          } else if (combined.includes('mandeh') || combined.includes('pantai') || combined.includes('laut') || combined.includes('pesisir') || combined.includes('mentawai') || combined.includes('surfing') || combined.includes('pulau')) {
            imageUrl = 'https://images.unsplash.com/photo-1502680390469-be75c86b636f?auto=format&fit=crop&w=800&q=80';
          } else if (combined.includes('singkarak') || combined.includes('danau') || combined.includes('tour de') || combined.includes('sepeda')) {
            imageUrl = 'https://images.unsplash.com/photo-1549479373-cf673e4a9e2c?auto=format&fit=crop&w=800&q=80';
          } else if (combined.includes('pariangan') || combined.includes('desa') || combined.includes('ekowisata') || combined.includes('nagari')) {
            imageUrl = 'https://images.unsplash.com/photo-1596422846543-75c6fc197f0a?auto=format&fit=crop&w=800&q=80';
          } else if (combined.includes('tabuik') || combined.includes('festival') || combined.includes('pacu') || combined.includes('tari') || combined.includes('pesta')) {
            imageUrl = 'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=800&q=80';
          } else {
            const fallbackImages = [
              'https://images.unsplash.com/photo-1596402184320-417e7178b2cd?auto=format&fit=crop&w=800&q=80',
              'https://images.unsplash.com/photo-1542385151-efd9000785a0?auto=format&fit=crop&w=800&q=80',
              'https://images.unsplash.com/photo-1590523741831-ab7e8b8f9c7f?auto=format&fit=crop&w=800&q=80',
              'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=800&q=80',
              'https://images.unsplash.com/photo-1502680390469-be75c86b636f?auto=format&fit=crop&w=800&q=80'
            ];
            imageUrl = fallbackImages[idx % fallbackImages.length];
          }
        }

        return {
          ...item,
          imageUrl
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
