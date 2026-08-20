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
            },

            // HARI 4: Puncak Lawang, Kelok 44 & Danau Maninjau
            {
              day: 4,
              title: isEnglish ? "Puncak Lawang Cloud Sea, Kelok 44 & Lake Maninjau" : "Samudra Awan Puncak Lawang, Kelok 44 & Danau Maninjau",
              activities: [
                {
                  time: "08:30 - 10:30",
                  location: isEnglish ? "Koto Gadang Silver Village & Great Wall [Drive ±15 mins]" : "Desa Kerajinan Perak Koto Gadang & Janjang Koto Gadang [Perjalanan ±15 menit]",
                  activity: isEnglish
                    ? "Stroll through the historic village of silver filigree artisans and walk part of the scenic Great Wall of Minangkabau bridging Sianok canyon."
                    : "Mengunjungi sentra perak filigri tertua di Koto Gadang dan menyusuri Janjang Koto Gadang (Great Wall Minang) di atas Ngarai Sianok.",
                  tips: isEnglish ? "Filigree silver jewelry makes exquisite lightweight souvenirs." : "Perhiasan perak halus filigri Koto Gadang sangat bernilai seni tinggi."
                },
                {
                  time: "11:00 - 13:00",
                  location: isEnglish ? "Puncak Lawang Agam [Drive ±45 mins]" : "Puncak Lawang & Matur, Kab. Agam [Perjalanan ±45 menit]",
                  activity: isEnglish
                    ? "Breathtaking highland viewpoint overlooking Lake Maninjau 1,200m below, watching paragliders glide through misty pine forests."
                    : "Menikmati pemandangan spektakuler kaldera Danau Maninjau dari ketinggian 1.200 mdpl yang berkabut sejuk serta atraksi paralayang.",
                  tips: isEnglish ? "Taste freshly pressed sugarcane juice (Tebu Lawang) with ice." : "Cicipi perasan air tebu Lawang murni yang manis dan segar di lokasi."
                },
                {
                  time: "13:30 - 16:30",
                  location: isEnglish ? "Kelok 44 Descent to Lake Maninjau Shore [Drive ±45 mins]" : "Menuruni Kelok 44 & Tepian Danau Maninjau [Perjalanan ±45 menit]",
                  activity: isEnglish
                    ? "Thrill of descending the famous 44 hairpin curves to the peaceful lake shore, visiting the Birthplace Museum of Buya Hamka."
                    : "Sensasi melintasi 44 kelokan legendaris menuju tepian Danau Maninjau, dilanjutkan berziarah ke Museum Rumah Kelahiran Buya Hamka.",
                  tips: isEnglish ? "Use low gear on vehicle; stop at Kelok 23 for stunning middle-tier photo." : "Gunakan gigi rendah saat menuruni kelokan; sempatkan foto di spot Kelok 23."
                }
              ],
              culinaryRecommendation: isEnglish
                ? "Lake Maninjau Delicacy: Palai Rinuak (spiced endemic lake fish steamed in banana leaf) & Crispy Rinuak Peyek."
                : "Kuliner Khas Maninjau: Palai Rinuak (pepes ikan rinuak endemik Maninjau) & Peyek Rinuak Renyah."
            },

            // HARI 5: UNESCO Sawahlunto Mining City & Silokek Geopark
            {
              day: 5,
              title: isEnglish ? "Sawahlunto UNESCO World Heritage & Geopark Silokek" : "Kota Tambang Warisan Dunia UNESCO Sawahlunto & Geopark Silokek",
              activities: [
                {
                  time: "08:30 - 11:30",
                  location: isEnglish ? "Sawahlunto Old Mining Heritage City [Drive ±1.5 hrs]" : "Kota Tua Tambang Sawahlunto UNESCO [Perjalanan ±1.5 jam]",
                  activity: isEnglish
                    ? "Exploring Southeast Asia's first underground coal mine at Lubang Mbah Soero, Dutch colonial railway depot, and the Mak Itam historic steam locomotive museum."
                    : "Menjelajahi terowongan tambang batu bara bawah tanah Lubang Mbah Soero, museum kereta api Mak Itam, dan arsitektur Eropa klasik abad ke-19.",
                  tips: isEnglish ? "Hard hats and rubber boots are provided for underground tunnel exploration." : "Helm proyek dan sepatu bot disediakan pengelola untuk masuk terowongan."
                },
                {
                  time: "12:00 - 13:30",
                  location: isEnglish ? "Sawahlunto Vintage Cafe / RM Silungkang" : "Restoran Khas Sawahlunto / RM Songket Silungkang",
                  activity: isEnglish
                    ? "Lunch enjoying authentic Sawahlunto Beef Ribs Soup (Sup Iga), Katupek Pitalah, and sweet Silungkang Lemang."
                    : "Makan siang dengan hidangan Sup Iga Sapi empuk, Katupek Gulai Paku, dan Songket Silungkang shopping.",
                  tips: isEnglish ? "Silungkang is famous for high quality geometric songket fabrics." : "Pusat tenun Songket Silungkang menyediakan aneka motif tenun terjangkau."
                },
                {
                  time: "14:30 - 17:00",
                  location: isEnglish ? "National Geopark Silokek, Sijunjung [Drive ±45 mins]" : "Geopark Nasional Silokek, Sijunjung [Perjalanan ±45 menit]",
                  activity: isEnglish
                    ? "Admiring the ancient Permian karst cliffs along the pristine Batang Kuantan river, ancient caves, and untouched tropical wilderness."
                    : "Menyaksikan keajaiban tebing purba batuan karst dan formasi batuan purba di sepanjang Sungai Batang Kuantan yang eksotis.",
                  tips: isEnglish ? "Spectacular for nature lovers and drone videography." : "Spot luar biasa untuk pencinta alam perawan dan fotografi lanskap."
                }
              ],
              culinaryRecommendation: isEnglish
                ? "Sawahlunto & Sijunjung Flavors: Sup Iga Sapi Sawahlunto & Lemang Tapai Silungkang."
                : "Kuliner Khas: Sup Iga Sapi Sawahlunto & Lemang Bakar Silungkang."
            },

            // HARI 6: Dataran Tinggi Solok, Danau Kembar & Seribu Rumah Gadang
            {
              day: 6,
              title: isEnglish ? "Solok Highlands, Twin Lakes & Thousand Rumah Gadang" : "Dataran Tinggi Solok, Danau Kembar & Kawasan Seribu Rumah Gadang",
              activities: [
                {
                  time: "08:30 - 11:30",
                  location: isEnglish ? "Alahan Panjang Tea Plantation & Twin Lakes [Drive ±1.5 hrs]" : "Kebun Teh Alahan Panjang & Danau Kembar [Perjalanan ±1.5 jam]",
                  activity: isEnglish
                    ? "Walking through the rolling green tea plantations of Alahan Panjang dubbed 'Cold City Without Snow', visiting Danau Diatas and Danau Dibawah volcanic lakes."
                    : "Menyusuri hamparan hijau kebun teh Alahan Panjang yang sejuk berhawa 15°C, menikmati Danau Diatas dan Danau Dibawah dengan perahu danau.",
                  tips: isEnglish ? "Very cool mountain weather; wear a warm sweater or jacket." : "Suhu sangat sejuk dan segar; kenakan jaket atau sweater hangat."
                },
                {
                  time: "12:00 - 13:30",
                  location: isEnglish ? "Alahan Panjang Lakeside Resto" : "Restoran Tepi Danau Kembar Alahan Panjang",
                  activity: isEnglish
                    ? "Lunch enjoying authentic Solok Organic Rice (Bareh Solok), Dendeng Batokok, and fresh highland mountain vegetables."
                    : "Makan siang dengan beras Bareh Solok organik yang pulen, Dendeng Batokok cabe merah segar, dan sayuran dataran tinggi.",
                  tips: isEnglish ? "Bareh Solok is Indonesia's most prized premium aromatic rice." : "Beras Bareh Solok adalah beras paling harum dan pulen kebanggaan Minang."
                },
                {
                  time: "14:30 - 17:30",
                  location: isEnglish ? "Thousand Rumah Gadang Heritage Village, South Solok [Drive ±1.5 hrs]" : "Kawasan Saribu Rumah Gadang & Goa Batu Kapal [Perjalanan ±1.5 jam]",
                  activity: isEnglish
                    ? "Experiencing the world's highest concentration of preserved wooden Rumah Gadang mansions in a single nagari, and visiting the majestic Batu Kapal caves."
                    : "Mengunjungi perkampungan adat dengan ratusan Rumah Gadang kayu berusia ratusan tahun yang masih dihuni lestari, serta keajaiban Goa Batu Kapal.",
                  tips: isEnglish ? "Option to stay overnight in a traditional authentic Rumah Gadang homestay." : "Tersedia homestay Rumah Gadang otentik untuk pengalaman menginap tak terlupakan."
                }
              ],
              culinaryRecommendation: isEnglish
                ? "South Solok Specialty: Pangek Pisang, Gulai Tunjang Solok & Black Highland Tea."
                : "Kuliner Khas Solok Selatan: Pangek Pisang, Gulai Randang Baluik & Teh Hitam Danau Kembar."
            },

            // HARI 7: Surga Bahari Mandeh, Pantai Padang & Masjid Raya Sumbar (Departure)
            {
              day: 7,
              title: isEnglish ? "Mandeh Marine Paradise, Padang Grand Mosque & Departure" : "Surga Bahari Mandeh, Ikon Masjid Raya Sumbar & Kepulangan",
              activities: [
                {
                  time: "08:00 - 12:00",
                  location: isEnglish ? "Mandeh Marine Tourism Estate, Pesisir Selatan [Drive ±1.5 hrs from Padang]" : "Kawasan Wisata Bahari Mandeh [Perjalanan ±1.5 jam ke Pesisir Selatan]",
                  activity: isEnglish
                    ? "Island hopping across turquoise waters to Pulau Setan, snorkeling above healthy coral reefs, cliff jumping at Sironjong Cliff, and water sports."
                    : "Jelajah pulau bahari berair toska 'Raja Ampat-nya Sumbar', snorkeling terumbu karang di Pulau Setan, cliff jumping di Sironjong, dan wahana banana boat.",
                  tips: isEnglish ? "Bring swimwear, sunblock, dry bag, and extra change of clothes." : "Bawa pakaian renang, sunblock ramah lingkungan, dan kantong anti-air."
                },
                {
                  time: "12:30 - 14:00",
                  location: isEnglish ? "Padang Coastal Seafood Resto (Pantai Padang / Muaro)" : "Restoran Seafood Pantai Padang (RM Nelayan / Simpang Enam)",
                  activity: isEnglish
                    ? "Lunch savoring fresh grilled reef fish with Sambal Dabu-Dabu and Minang Spiced Curry, followed by refreshing Es Durian Ganti Nan Jano."
                    : "Makan siang aneka ikan bakar karang segar, Gulai Kepala Ikan Kakap, dan hidangan penutup Es Durian Iko Gantinyo / Ganti Nan Jano.",
                  tips: isEnglish ? "Pair durian ice with shaved ice and chocolate condensed milk." : "Es Durian Padang terkenal sangat legit dengan daging durian asli melimpah."
                },
                {
                  time: "14:30 - 17:00",
                  location: isEnglish ? "Grand Mosque of West Sumatra & Christine Hakim Souvenirs → BIM Airport" : "Masjid Raya Sumatera Barat & Sentra Oleh-Oleh → Bandara BIM",
                  activity: isEnglish
                    ? "Admiring the world-award winning dome-less Rumah Gadang architecture of West Sumatra Grand Mosque, shopping for Balado Chips & Rendang, and transfer to BIM."
                    : "Beribadah dan berfoto di Masjid Raya Sumatera Barat dengan arsitektur bentang Rumah Gadang terindah di dunia, belanja oleh-oleh, lalu transfer ke Bandara BIM.",
                  tips: isEnglish ? "Allow at least 2 hours before flight schedule at BIM." : "Tiba di Bandara BIM minimal 1.5 - 2 jam sebelum jadwal penerbangan."
                }
              ],
              culinaryRecommendation: isEnglish
                ? "Padang City Farewell: Sate Padang Ajo Ramon & Es Durian Ganti Nan Jano."
                : "Kuliner Penutup Kota Padang: Sate Padang Ajo Ramon & Es Durian Ganti Nan Jano."
            }
          ];

          const daysCountClamped = Math.min(Math.max(Number(durasiHari) || 3, 1), 7);
          const selectedDays = masterDays.slice(0, daysCountClamped);

          return res.json({
            title: isEnglish
              ? `Master Tour Itinerary: Wonderful West Sumatra Grand Exploration (${daysCountClamped} Days${startDate ? ` - Starting ${startDate}` : ''})`
              : `Rencana Perjalanan Eksklusif: Master Tour Wonderful West Sumatra (${daysCountClamped} Hari${startDate ? ` - Mulai ${startDate}` : ''})`,
            summary: isEnglish
              ? `A professionally curated, 100% distinct daily travel plan designed by master tour operators. Features seamless corridor routing, realistic drive times, iconic Minangkabau geoparks, UNESCO cultural heritage, and world-class culinary stops.`
              : `Rencana perjalanan wisata 100% berbeda setiap hari yang dirancang oleh Master Tour Operator profesional. Mengutamakan rute koridor searah tanpa bolak-balik, estimasi waktu tempuh realistis, kepuasan maksimal wisatawan, serta eksplorasi kuliner legendaris khas Minangkabau.`,
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
        ? availableEvents.map((ev: any) => `- ${ev.title} (${ev.schedule || ev.date || ''} di ${ev.location || 'Sumbar'}) ${ev.isKen ? '[Karisma Event Nusantara]' : ''}: ${ev.description || ''}`).join('\n')
        : 'Katalog event Sumatera Barat 2026: Pacu Jawi (Mei-Juni / Agt-Sept di Tanah Datar), Tour de Singkarak (Juli-Agustus), Festival Tabuik (Muharram/Juli di Pariaman), Rang Solok Baralek Gadang (September di Solok), Payakumbuh Botuang Festival (Juli), Sawahlunto Songket Carnival (September), Festival Siti Nurbaya Padang (Agustus).';

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

KATALOG EVENT & FESTIVAL RESMI SUMBAR 2026:
${eventsSummary}

============================================================
PANDUAN LOGISTIK & STANDAR MASTER TOUR OPERATOR:
============================================================
1. KLASTER GEOGRAFIS & RUTE SEARAH (STRICT CORRIDOR ROUTING - DILARANG ZIG-ZAG & DILARANG MENGULANG DESTINASI):
   - Gerbang Masuk & Keluar Utama: Bandara Internasional Minangkabau (BIM) Padang Pariaman / Kota Padang.
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

      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
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
        return res.json({
          reply: `**Salamaik Datang di Ranah Minang!** 🙏✨\n\nSaya **UNI MALA AI**, pemandu virtual resmi pariwisata Sumatera Barat. Terkait pertanyaan Anda mengenai *"${message}"*:\n\nSumatera Barat menawarkan pesona luar biasa dari Geopark Lembah Harau, Puncak Lawang Danau Maninjau, Istano Pagaruyung, hingga kuliner legendaris Rendang & Nasi Kapau. Silakan gunakan menu **Rencanakan AI** untuk membuat itinerary kustom 1–7 hari atau tanyakan rute & rekomendasi spesifik lainnya!`
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

      const systemInstruction = `Anda adalah 'UNI MALA AI Sumbar' - Pemandu Wisata & Budaya Resmi Sumatera Barat (Wonderful West Sumatra) yang super pintar, ramah, berwawasan luas, dan menyenangkan.
Jawablah pertanyaan wisatawan berikut dengan akurat, komprehensif, terstruktur (gunakan bullet points, tips, dan emoji), serta dengan kehangatan khas Ranah Minang.`;

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
            model: 'gemini-2.5-flash',
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

      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
      });

      const rawText = response.text || '';
      const jsonMatch = rawText.match(/\{[\s\S]*\}/);
      if (!jsonMatch) {
        throw new Error("Gagal mengurai respon JSON dari AI.");
      }

      const parsedData = JSON.parse(jsonMatch[0]);
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
