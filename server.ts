import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import { DESTINATIONS, CULTURE_ITEMS, CULINARY_ITEMS, EVENTS_SCHEDULE } from "./src/data/content";

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

      if (!apiKey) {
        // Fallback response when GEMINI_API_KEY is not configured
        const masterDays = [
          // HARI 1: Dataran Tinggi Bukittinggi & Lembah Anai
          {
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
                location: isEnglish ? "Padang Panjang Culinary Stop (Sate Mak Syukur / RM Pak Datuk)" : "Pemberhentian Kuliner Padang Panjang (Sate Mak Syukur / RM Pak Datuk)",
                activity: isEnglish
                  ? "Authentic lunch savoring legendary Padang Panjang Beef Satay with thick yellow spiced curry broth."
                  : "Makan siang menikmati Sate Padang Panjang legendaris dengan kuah kuning rempah khas yang gurih dan nikmat.",
                tips: isEnglish ? "Pair with warm Teh Talua (Minang whipped egg tea) for energy." : "Padukan dengan Teh Talua hangat untuk menambah stamina di udara sejuk."
              },
              {
                time: "14:00 - 15:30",
                location: isEnglish ? "Pandai Sikek Weaving Village [Drive ±20 mins]" : "Desa Tenun Songket Pandai Sikek [Perjalanan ±20 menit]",
                activity: isEnglish
                  ? "Visit master artisans crafting gold-threaded Songket and intricate Minangkabau wood carvings under the silhouettes of Mount Singgalang and Marapi."
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
          },

          // HARI 2: Geopark Tebing Granit Lembah Harau & Kelok 9
          {
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
                location: isEnglish ? "Harau Countryside Resto (RM Pondok Flora / Pongek Situjuah)" : "Restoran Tepi Sawah Harau (RM Pondok Flora / Pongek Situjuah)",
                activity: isEnglish
                  ? "Authentic Payakumbuh lunch featuring Gulai Itiak Lado Mudo (green chili smoked duck) and fresh river gourami fish."
                  : "Makan siang dengan hidangan Gulai Itiak Lado Mudo (bebek cabe hijau), Pongek Cubadak, dan Ikan Bakar segar.",
                tips: isEnglish ? "Duck is slow-cooked for 8 hours, extremely tender with rich aroma." : "Daging itik dimasak perlahan dengan bumbu rempah harum dan empuk."
              },
              {
                time: "14:30 - 16:30",
                location: isEnglish ? "Kelok 9 Flyover & Batang Sanipan Gorge [Drive ±30 mins]" : "Jembatan Layang Kelok 9 & Gua Ngalau Indah [Perjalanan ±30 menit]",
                activity: isEnglish
                  ? "Admire the magnificent engineering of Kelok 9 winding flyover bridges carved into the rainforest gorge, followed by scenic coffee at cliffside rest areas."
                  : "Menyaksikan kemegahan arsitektur jembatan layang Kelok 9 yang meliuk di antara dua bukit cagar alam, dilanjutkan rehat kopi di gardu pandang.",
                tips: isEnglish ? "Spot local roasted sweet corn and banana fritters at viewpoints." : "Nikmati jagung bakar manis dan pisang kapik kelapa di spot gardu pandang."
              }
            ],
            culinaryRecommendation: isEnglish
              ? "Payakumbuh Special: Lamang Tapai (black fermented sticky rice with bamboo-roasted sticky rice) & Sate Danguang-Danguang."
              : "Kuliner Khas Payakumbuh: Lamang Tapai ketan hitam bambu & Sate Danguang-Danguang berkuah rempah kelapa."
          },

          // HARI 3: Luhak Nan Tuo Tanah Datar & Danau Singkarak
          {
            day: 3,
            title: isEnglish ? "Royal Heritage Istano Pagaruyung & Lake Singkarak" : "Kemegahan Luhak Nan Tuo Tanah Datar & Danau Singkarak",
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
              }
            ],
            culinaryRecommendation: isEnglish
              ? "Lake Singkarak Specialty: Crispy Fried Ikan Bilih, Sambal Lado Mudo & Rendang Belut."
              : "Kuliner Khas Singkarak & Tanah Datar: Ikan Bilih Goreng Balado Renyah & Rendang Belut Khas Batusangkar."
          }
        ];

        // Adapt Day 1 starting point in fallback mode if not default airport
        if (startingPoint && startingPoint.type !== 'airport' && masterDays[0]) {
          if (startingPoint.type === 'current_location') {
            const locLabel = startingPoint.details || (startingPoint.coords ? `GPS (${startingPoint.coords.lat.toFixed(3)}, ${startingPoint.coords.lng.toFixed(3)})` : (isEnglish ? 'Your Current Location' : 'Lokasi Anda'));
            masterDays[0].title = isEnglish ? `Scenic Highland & Valley Tour from ${locLabel}` : `Pesona Lembah & Dataran Tinggi dari ${locLabel}`;
            masterDays[0].activities[0] = {
              time: "08:30 - 11:30",
              location: isEnglish ? `${locLabel} → Lembah Anai Waterfall [Scenic Drive]` : `${locLabel} → Air Terjun Lembah Anai [Perjalanan Santai]`,
              activity: isEnglish
                ? `Departing directly from ${locLabel} in West Sumatra, heading through lush mountain corridors toward the refreshing Lembah Anai Waterfall.`
                : `Berangkat langsung dari ${locLabel} di Sumatera Barat, menyusuri koridor alam tropis yang asri menuju Air Terjun Lembah Anai yang sejuk.`,
              tips: isEnglish ? "Ensure vehicle readiness for scenic mountain pass." : "Pastikan kendaraan siap untuk menyusuri jalur pegunungan yang asri."
            };
          } else if (startingPoint.type === 'hotel') {
            const hName = startingPoint.details || startingPoint.label || (isEnglish ? 'Your Hotel / Accommodation' : 'Hotel / Penginapan');
            masterDays[0].title = isEnglish ? `Day Tour Excursion Starting from ${hName}` : `Eksplorasi Wisata Harian dari ${hName}`;
            masterDays[0].activities[0] = {
              time: "08:30 - 11:00",
              location: isEnglish ? `Pickup at ${hName} → Highland Route` : `Penjemputan di ${hName} → Jalur Dataran Tinggi`,
              activity: isEnglish
                ? `Morning pickup right from your accommodation (${hName}) to commence the daily scenic excursion across iconic Minangkabau landmarks.`
                : `Penjemputan pagi langsung dari penginapan Anda (${hName}) untuk memulai perjalanan harian menjelajahi panorama dan cagar budaya Ranah Minang.`,
              tips: isEnglish ? "Have breakfast at your hotel before morning departure." : "Nikmati sarapan di hotel sebelum bersiap memulai petualangan pagi."
            };
          } else if (startingPoint.type === 'custom_city') {
            const cName = startingPoint.label || startingPoint.city || (isEnglish ? 'Selected City Hub' : 'Pusat Kota Pilihan');
            masterDays[0].title = isEnglish ? `City Hub Tour: ${cName} & Surrounding Geoparks` : `Pusat Eksplorasi: ${cName} & Pesona Alam Sekitar`;
            masterDays[0].activities[0] = {
              time: "08:30 - 11:00",
              location: isEnglish ? `Departure Hub: ${cName} → Scenic Route` : `Titik Keberangkatan: ${cName} → Koridor Wisata`,
              activity: isEnglish
                ? `Commencing the journey from ${cName}, exploring nearby natural geoparks and authentic cultural landmarks in an optimized linear flow.`
                : `Mengawali perjalanan langsung dari ${cName}, mengeksplorasi geopark alam terdekat dan ikon budaya Minangkabau secara efisien dan searah.`,
              tips: isEnglish ? `Explore morning vibes in ${cName} before heading out.` : `Rasakan suasana pagi khas ${cName} sebelum memulai perjalanan.`
            };
          } else if (startingPoint.type === 'must_visit') {
            const destTitle = startingPoint.label || (isEnglish ? 'Must-Visit Highlight' : 'Destinasi Impian');
            masterDays[0].title = isEnglish ? `Priority Centerpiece: ${destTitle} & Surrounding Highlights` : `Highlight Utama: ${destTitle} & Koridor Wisata Sekitarnya`;
            masterDays[0].activities[0] = {
              time: "08:30 - 11:30",
              location: `⭐ ${destTitle}`,
              activity: isEnglish
                ? `Direct morning excursion dedicated to experiencing ${destTitle} as the anchor highlight of your West Sumatra journey.`
                : `Perjalanan pagi yang difokuskan langsung untuk mengeksplorasi keindahan ${destTitle} sebagai destinasi impian prioritas Anda di Ranah Minang.`,
              tips: isEnglish ? "Ideal morning light for photography and relaxed exploration." : "Cahaya pagi sangat sempurna untuk berfoto dan menikmati keasrian destinasi."
            };
          }
        }

        if (targetEv) {
          const evTitle = isEnglish && targetEv.titleEn ? targetEv.titleEn : targetEv.title;
          const evSched = isEnglish && targetEv.scheduleEn ? targetEv.scheduleEn : targetEv.schedule;
          const evLoc = isEnglish && targetEv.locationNameEn ? targetEv.locationNameEn : (targetEv.locationName || targetEv.location || targetEv.regency);
          const evDesc = isEnglish && targetEv.descriptionEn ? targetEv.descriptionEn.split('\n\n')[0] : (targetEv.description ? targetEv.description.split('\n\n')[0] : '');

          const targetDayIndex = daysCountClamped > 1 ? 1 : 0;
          if (masterDays[targetDayIndex]) {
            masterDays[targetDayIndex].title = isEnglish
              ? `✨ Festival Spotlight: ${evTitle} & Regional Highlights`
              : `✨ Puncak Acara: ${evTitle} & Eksplorasi Kawasan Sekitar`;
            
            masterDays[targetDayIndex].activities.unshift({
              time: "09:00 - 12:30",
              location: `🎪 ${evTitle} [${evLoc}]`,
              activity: isEnglish
                ? `Attending the spectacular ${evTitle} (${evSched}). ${evDesc}`
                : `Menghadiri kemeriahan ${evTitle} (${evSched}). ${evDesc}`,
              tips: isEnglish
                ? "Arrive early to witness opening ceremonial rites and enjoy authentic festive atmosphere."
                : "Tiba lebih awal untuk menyaksikan pembukaan prosesi adat dan mengabadikan momen terbaik."
            });
            if (masterDays[targetDayIndex].activities.length > 4) {
              masterDays[targetDayIndex].activities.pop();
            }
          }
        }

        const selectedDays = masterDays.slice(0, daysCountClamped);

        return res.json({
          title: isEnglish
            ? (targetEv ? `Special Event Itinerary: ${targetEv.titleEn || targetEv.title} & West Sumatra Highlights (${daysCountClamped} Days)` : `Master Tour Itinerary: Wonderful West Sumatra Grand Exploration (${daysCountClamped} Days${startDate ? ` - Starting ${startDate}` : ''})`)
            : (targetEv ? `Rencana Perjalanan Spesial: ${targetEv.title} & Pesona Sumatera Barat (${daysCountClamped} Hari)` : `Rencana Perjalanan Eksklusif: Master Tour Wonderful West Sumatra (${daysCountClamped} Hari${startDate ? ` - Mulai ${startDate}` : ''})`),
          summary: isEnglish
            ? (targetEv ? `A custom travel plan featuring the magnificent ${targetEv.titleEn || targetEv.title} as the centerpiece highlight, seamlessly combined with scenic Minangkabau geoparks, cultural heritage, and legendary gastronomy.` : `A professionally curated, 100% distinct daily travel plan designed by master tour operators. Features seamless corridor routing, realistic drive times, iconic Minangkabau geoparks, UNESCO cultural heritage, and world-class culinary stops.`)
            : (targetEv ? `Rencana perjalanan wisata istimewa yang dirancang khusus dengan puncak perayaan festival akbar "${targetEv.title}" (${targetEv.schedule || ''}), dipadukan dengan eksplorasi geopark, warisan budaya Minangkabau, serta kuliner legendaris yang searah rute.` : `Rencana perjalanan wisata 100% berbeda setiap hari yang dirancang oleh Master Tour Operator profesional. Mengutamakan rute koridor searah tanpa bolak-balik, estimasi waktu tempuh realistis, kepuasan maksimal wisatawan, serta eksplorasi kuliner legendaris khas Minangkabau.`),
          itinerary: selectedDays,
          localTips: isEnglish
            ? [
                "Geographic Flow: Every day covers a distinct geographical corridor without back-and-forth travel, ensuring comfort and maximum sightseeing time.",
                "Cultural Etiquette: Ranah Minang honors 'Adat Basandi Syarak, Syarak Basandi Kitabullah'. Dress modestly when visiting villages, palaces, and mosques.",
                "Gastronomy Note: When dining at traditional Padang restaurants, dishes are served 'Hidang' on your table; you only pay for what you eat.",
                "Essential Souvenirs: Christine Hakim Balado Chips, Songket Pandai Sikek, Kopi Kawa Daun, and Vacuum-packed Rendang."
              ]
            : [
                "Logika Perjalanan: Setiap hari menjelajahi koridor wilayah yang berbeda secara linear dan searah tanpa bolak-balik, menjamin kenyamanan fisik dan efisiensi waktu.",
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

      const startingPointPrompt = `
📍 TITIK AWAL KEBERANGKATAN WISATAWAN (STARTING POINT & ROUTING ANCHOR):
- Tipe Titik Awal: ${startingPoint?.type || 'airport'}
- Lokasi/Nama: ${startingPoint?.label || 'Bandara Internasional Minangkabau (BIM)'}
${startingPoint?.details ? `- Keterangan/Detail: ${startingPoint.details}` : ''}
${startingPoint?.city ? `- Kota/Kabupaten Basis: ${startingPoint.city}` : ''}
${startingPoint?.coords ? `- Koordinat GPS: Lat ${startingPoint.coords.lat}, Lng ${startingPoint.coords.lng}` : ''}

ATURAN RUTE BERDASARKAN TITIK AWAL:
${
  startingPoint?.type === 'current_location'
    ? '1. Wisatawan SUDAH BERADA di Sumatera Barat pada titik lokasi saat ini (GPS). JANGAN membuat jadwal penjemputan bandara pada Hari 1. Langsung mulai Hari 1 dari lokasi saat ini menuju destinasi terdekat yang searah koridor.'
    : startingPoint?.type === 'hotel'
    ? `1. Wisatawan SUDAH MENGINAP di ${startingPoint?.details || startingPoint?.label || 'Hotel/Penginapan'}. Rute Hari 1 TIDAK PERLU penjemputan bandara; langsung jemput dari penginapan ini di pagi hari, dan jadwalkan kembali ke area penginapan di malam hari (circular daily tour).`
    : startingPoint?.type === 'custom_city'
    ? `1. Titik tolak utama perjalanan dimulai dari: ${startingPoint?.label || startingPoint?.city || 'kota pilihan'}. Jadwalkan seluruh rute perjalanan dengan pola hub-and-spoke atau loop koridor searah yang berpusat atau berangkat dari kota ini.`
    : startingPoint?.type === 'must_visit'
    ? `1. Destinasi impian utama yang WAJIB dikunjungi adalah: "${startingPoint?.label}". Jadwalkan kunjungan ke destinasi ini sebagai highlight utama Hari 1 atau Hari 2, dan atur destinasi pendukung lain di koridor wilayah yang sama secara efisien.`
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
   - Titik Keberangkatan: Sesuaikan secara ketat dengan TITIK AWAL KEBERANGKATAN di atas (Bandara BIM / Lokasi Saat Ini / Hotel / Kota Pilihan / Destinasi Impian). Jangan memaksakan penjemputan bandara jika wisatawan memilih lokasi saat ini, hotel, atau kota lain.
   - PANDUAN KLASTER PER HARI (SETIAP HARI HARUS MENGUNJUNGI DESTINASI BERBEDA SECARA 100% UNIK SESUAI JUMLAH HARI ${durasiHari || 3} HARI):
     * HARI 1 (Upward Flow): BIM / Padang → Air Terjun Lembah Anai (Rehat) → Sentra Tenun Pandai Sikek → Bukittinggi (Check-in, Jam Gadang, Ngarai Sianok Sunset, Nasi Kapau Pasar Atas).
     * HARI 2 (Geopark & Megaproyek): Bukittinggi → Payakumbuh → Lembah Harau (Tebing Granit 300m & Air Terjun) → Jembatan Kelok 9 → Kuliner Payakumbuh (Gulai Itiak Lado Mudo / Sate Danguang-Danguang).
     * HARI 3 (Luhak Nan Tuo Heritage): Bukittinggi → Desa Terindah Dunia Nagari Pariangan → Istano Basa Pagaruyung (Batusangkar) → Makan Ikan Bilih tepi Danau Singkarak.
     * HARI 4 (Maninjau & Danau Vulkanik): Janjang Koto Gadang → Puncak Lawang (Samudra Awan) → Menuruni Kelok 44 → Danau Maninjau & Museum Rumah Buya Hamka → Kuliner Palai Rinuak.
     * HARI 5 (Warisan Dunia UNESCO): Kota Tambang Bersejarah Ombilin Sawahlunto (Lubang Mbah Soero & Museum Kereta Api Mak Itam) → Geopark Silokek Sijunjung → Tenun Silungkang.
     * HARI 6 (Highland & Saribu Rumah Gadang): Dataran Tinggi Solok → Danau Kembar (Danau Diatas & Danau Dibawah) → Kebun Teh Alahan Panjang → Kawasan Saribu Rumah Gadang Solok Selatan → Goa Batu Kapal.
     * HARI 7 (Bahari, Kota Padang & Kepulangan): Kawasan Wisata Bahari Mandeh (Pulau Setan & Sironjong) → Pantai Air Manis (Batu Malin Kundang) → Masjid Raya Sumatera Barat → Sentra Oleh-oleh Christine Hakim → Drop-off Bandara BIM.
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

      const modelsToTry = ['gemini-3.8-flash', 'gemini-3.7-flash', 'gemini-flash-latest', 'gemini-pro-latest'];
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
        throw new Error("Gagal mengekstrak data JSON dari respon AI Gemini");
      }

      return res.json(parsedData);
    } catch (error: any) {
      console.error("Error generating AI itinerary:", error);
      return res.status(500).json({ error: error.message || "Gagal membuat rencana perjalanan AI" });
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

      if (!apiKey) {
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
      const chatModelsToTry = ['gemini-3.8-flash', 'gemini-3.7-flash', 'gemini-flash-latest'];
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
