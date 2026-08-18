import { GoogleGenAI } from "@google/genai";

// Fallback data when API or Gemini API key is unavailable
export const HOT_INFO_FALLBACK = [
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
    "imageUrl": "",
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
    "imageUrl": "",
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
    "imageUrl": "",
    "highlights": ["Gardu Pandang Baru", "Aman & Nyaman", "Panorama Danau Maninjau"],
    "highlightsEn": ["New Viewing Decks", "Safe & Comfortable", "Lake Maninjau Panorama"],
    "tips": "Hati-hati saat melintasi tikungan tajam Kelok 44 dan gunakan gigi rendah.",
    "tipsEn": "Drive carefully on Kelok 44 sharp bends using low gear.",
    "locationName": "Kelok 44, Kab. Agam",
    "locationNameEn": "Kelok 44, Agam Regency"
  }
];

export function getItineraryFallback(params: any) {
  const { durasiHari = 3, profilWisatawan, waktuKunjungan, language = 'id' } = params || {};
  const isEnglish = language === 'en';
  const daysCount = Math.min(Math.max(Number(durasiHari) || 3, 1), 7);
  const startDate = waktuKunjungan?.tanggalMulai || '';

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

  // Slice exactly the number of days requested without any duplicate or repeating content
  const selectedDays = masterDays.slice(0, daysCount);

  return {
    title: isEnglish
      ? `Master Tour Itinerary: Wonderful West Sumatra Grand Exploration (${daysCount} Days${startDate ? ` - Starting ${startDate}` : ''})`
      : `Rencana Perjalanan Eksklusif: Master Tour Wonderful West Sumatra (${daysCount} Hari${startDate ? ` - Mulai ${startDate}` : ''})`,
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
  };
}

export async function fetchAiItinerary(params: any) {
  try {
    const res = await fetch('/api/ai/itinerary', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(params),
    });

    const contentType = res.headers.get('content-type') || '';
    if (res.ok && contentType.includes('application/json')) {
      return await res.json();
    }
  } catch (e) {
    console.warn("Server API itinerary endpoint unavailable, using fallback AI response", e);
  }

  // Client side Gemini API fallback if VITE_GEMINI_API_KEY is available
  const viteApiKey = (import.meta as any).env?.VITE_GEMINI_API_KEY || (import.meta as any).env?.GEMINI_API_KEY;
  if (viteApiKey) {
    try {
      const ai = new GoogleGenAI({ apiKey: viteApiKey });
      const isEnglish = params?.language === 'en';
      const prompt = `Anda adalah MASTER TOUR OPERATOR & CHIEF TRAVEL PLANNER TERBAIK di Sumatera Barat. Rancang itinerary ${params?.durasiHari || 3} hari dengan rute SEARAH per klaster geografis, TANPA MENGULANG destinasi atau aktivitas yang sama di hari yang berbeda. Formatkan output HANYA format JSON valid:\n${JSON.stringify(params)}`;
      const response = await ai.models.generateContent({
        model: 'gemini-3.6-flash',
        contents: prompt,
      });
      const rawText = response.text || '';
      const jsonMatch = rawText.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        return JSON.parse(jsonMatch[0]);
      }
    } catch (err) {
      console.warn("Client Gemini API failed, using structured fallback", err);
    }
  }

  return getItineraryFallback(params);
}

export async function fetchAiChat(message: string) {
  try {
    const res = await fetch('/api/ai/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message }),
    });

    const contentType = res.headers.get('content-type') || '';
    if (res.ok && contentType.includes('application/json')) {
      return await res.json();
    }
  } catch (e) {
    console.warn("Server API chat endpoint unavailable, using fallback response", e);
  }

  // Client side Gemini API fallback if VITE_GEMINI_API_KEY is available
  const viteApiKey = (import.meta as any).env?.VITE_GEMINI_API_KEY || (import.meta as any).env?.GEMINI_API_KEY;
  if (viteApiKey) {
    try {
      const ai = new GoogleGenAI({ apiKey: viteApiKey });
      const prompt = `Anda adalah 'UNI MALA AI Sumbar' - Pemandu AI Resmi Pariwisata & Kebudayaan Minangkabau. Pertanyaan Wisatawan: ${message}`;
      const response = await ai.models.generateContent({
        model: 'gemini-3.6-flash',
        contents: prompt,
      });
      return { reply: response.text };
    } catch (err) {
      console.warn("Client Gemini API failed", err);
    }
  }

  return {
    reply: `Rancak bana! Saya UNI MALA AI Sumbar. Terkait "${message}", Sumatera Barat menawarkan destinasi luar biasa seperti Lembah Harau, Jam Gadang Bukittinggi, Danau Maninjau, serta sajian Rendang autentik dan Sate Padang. Ada tempat spesifik yang ingin Anda ketahui lebih dalam?`
  };
}

export async function generateCatalogItemWithAi(type: string, name: string, hint?: string) {
  try {
    const res = await fetch('/api/ai/generate-catalog-item', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ type, name, hint }),
    });

    const contentType = res.headers.get('content-type') || '';
    if (res.ok && contentType.includes('application/json')) {
      return await res.json();
    }
  } catch (e) {
    console.warn("Server API generate catalog endpoint unavailable, falling back to client Gemini", e);
  }

  // Client side Gemini API fallback if VITE_GEMINI_API_KEY is available
  const viteApiKey = (import.meta as any).env?.VITE_GEMINI_API_KEY || (import.meta as any).env?.GEMINI_API_KEY;
  if (viteApiKey) {
    try {
      const ai = new GoogleGenAI({ apiKey: viteApiKey });

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
      }

      const prompt = `Anda adalah ASISTEN AHLI PARIWISATA & KEBUDAYAAN SUMATERA BARAT (Wonderful West Sumatra Tourism Board).
Tugas Anda adalah meneliti dan menghasilkan data katalog pariwisata yang sangat akurat, mendalam, kaya nilai budaya Minangkabau, dan lengkap dengan terjemahan Bahasa Inggris (Bilingual ID & EN).

${typePrompt}

Keluarkan HANYA format JSON valid tanpa markdown backticks (\`\`\`json) atau teks pengantar lainnya.`;

      const response = await ai.models.generateContent({
        model: 'gemini-3.6-flash',
        contents: prompt,
      });

      const rawText = response.text || '';
      const jsonMatch = rawText.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        return JSON.parse(jsonMatch[0]);
      }
    } catch (err) {
      console.warn("Client Gemini API catalog generation failed", err);
    }
  }

  throw new Error("Layanan AI sedang tidak dapat diakses. Pastikan koneksi internet stabil.");
}

const TOURISM_IMAGES_POOL = [
  'https://images.unsplash.com/photo-1596402184320-417e7178b2cd?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1527668752968-14dc70a27c95?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1485965120184-e220f721d03e?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1549479373-cf673e4a9e2c?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=800&q=80',
];

function cleanHtml(html: string): string {
  if (!html) return '';
  return html
    .replace(/<[^>]*>?/gm, '')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .trim();
}

export function isWithinLast30Days(dateStr?: string): boolean {
  if (!dateStr) return true;
  try {
    const parsedTime = Date.parse(dateStr);
    if (!isNaN(parsedTime)) {
      const thirtyDaysInMs = 30 * 24 * 60 * 60 * 1000;
      return (Date.now() - parsedTime) <= thirtyDaysInMs && (parsedTime <= Date.now() + 86400000);
    }
    const monthsMap: Record<string, number> = {
      'jan': 0, 'januari': 0, 'january': 0,
      'feb': 1, 'februari': 1, 'february': 1,
      'mar': 2, 'maret': 2, 'march': 2,
      'apr': 3, 'april': 3,
      'mei': 4, 'may': 4,
      'jun': 5, 'juni': 5, 'june': 5,
      'jul': 6, 'juli': 6, 'july': 6,
      'ags': 7, 'agustus': 7, 'aug': 7, 'august': 7,
      'sep': 8, 'september': 8,
      'okt': 9, 'oktober': 9, 'oct': 9, 'october': 9,
      'nov': 10, 'november': 10,
      'des': 11, 'desember': 11, 'dec': 11, 'december': 11,
    };
    const lower = dateStr.toLowerCase();
    if (lower.includes('hari ini') || lower.includes('today') || lower.includes('minggu ini') || lower.includes('this week') || lower.includes('bulan ini') || lower.includes('this month')) {
      return true;
    }
    const match = lower.match(/(\d{1,2})\s+([a-z]+)\s+(\d{4})/);
    if (match) {
      const day = parseInt(match[1], 10);
      const monthName = match[2];
      const year = parseInt(match[3], 10);
      const monthIndex = monthsMap[monthName];
      if (monthIndex !== undefined) {
        const itemDate = new Date(year, monthIndex, day).getTime();
        const thirtyDaysInMs = 30 * 24 * 60 * 60 * 1000;
        return (Date.now() - itemDate) <= thirtyDaysInMs;
      }
    }
    return true;
  } catch {
    return true;
  }
}

function formatDateIndo(dateStr: string): { dateId: string; dateEn: string; isWithin30d: boolean } {
  try {
    const d = new Date(dateStr);
    if (isNaN(d.getTime())) {
      return { dateId: 'Hari Ini', dateEn: 'Today', isWithin30d: true };
    }
    const diffMs = Date.now() - d.getTime();
    const thirtyDaysMs = 30 * 24 * 60 * 60 * 1000;
    const isWithin30d = diffMs <= thirtyDaysMs && diffMs >= -86400000;

    const monthNamesId = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Ags', 'Sep', 'Okt', 'Nov', 'Des'];
    const monthNamesEn = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const date = d.getDate();
    const monthId = monthNamesId[d.getMonth()];
    const monthEn = monthNamesEn[d.getMonth()];
    const year = d.getFullYear();
    const hours = String(d.getHours()).padStart(2, '0');
    const mins = String(d.getMinutes()).padStart(2, '0');
    return {
      dateId: `${date} ${monthId} ${year} • ${hours}:${mins} WIB`,
      dateEn: `${monthEn} ${date}, ${year} • ${hours}:${mins}`,
      isWithin30d
    };
  } catch {
    return { dateId: 'Hari Ini', dateEn: 'Today', isWithin30d: true };
  }
}

function buildJournalisticNarrative(cleanTitle: string, source: string): {
  descId: string;
  descEn: string;
  highlightsId: string[];
  highlightsEn: string[];
  tipsId: string;
  tipsEn: string;
} {
  const isSumbar = cleanTitle.toLowerCase().includes('sumbar') || cleanTitle.toLowerCase().includes('padang') || cleanTitle.toLowerCase().includes('minang') || cleanTitle.toLowerCase().includes('bukittinggi') || cleanTitle.toLowerCase().includes('mentawai') || cleanTitle.toLowerCase().includes('singkarak');
  const isEconomy = cleanTitle.toLowerCase().includes('ekonomi') || cleanTitle.toLowerCase().includes('tumbuh') || cleanTitle.toLowerCase().includes('wisman') || cleanTitle.toLowerCase().includes('belanja') || cleanTitle.toLowerCase().includes('devisa') || cleanTitle.toLowerCase().includes('naik kelas');
  const isEvent = cleanTitle.toLowerCase().includes('festival') || cleanTitle.toLowerCase().includes('event') || cleanTitle.toLowerCase().includes('karnaval') || cleanTitle.toLowerCase().includes('pameran') || cleanTitle.toLowerCase().includes('atraksi') || cleanTitle.toLowerCase().includes('gelar');
  const isFlight = cleanTitle.toLowerCase().includes('penerbangan') || cleanTitle.toLowerCase().includes('bandara') || cleanTitle.toLowerCase().includes('rute') || cleanTitle.toLowerCase().includes('maskapai') || cleanTitle.toLowerCase().includes('tiket') || cleanTitle.toLowerCase().includes('kereta');

  const p1Id = `Sektor kepariwisataan nasional terus menunjukkan tren pertumbuhan yang sangat positif dan dinamis. Berdasarkan laporan terverifikasi dari ${source}, "${cleanTitle}" menjadi salah satu sorotan utama dalam penguatan ekosistem perjalanan dan kebudayaan Indonesia. Informasi ini mencerminkan komitmen berkelanjutan dalam memajukan daya saing destinasi tanah air di kancah global.`;
  const p1En = `The national tourism sector continues to exhibit robust and dynamic growth trends. According to verified reporting by ${source}, "${cleanTitle}" stands as a prominent milestone strengthening Indonesia's travel and cultural ecosystem, reflecting continuous commitments toward global destination competitiveness.`;

  let p2Id = `Perkembangan ini memberikan dampak berganda (multiplier effect) yang nyata bagi pergerakan wisatawan Nusantara maupun mancanegara, membuka peluang ekspansi bagi para pelaku UMKM ekonomi kreatif lokal, serta memperkuat sinergi antara pemerintah daerah dan komunitas nagari sadar wisata di berbagai penjuru kepulauan.`;
  let p2En = `This development delivers a substantial multiplier effect across domestic and international traveler flows, opening expansive opportunities for local creative economy MSMEs while bolstering synergies between regional tourism boards and grassroots tourism-conscious communities across the archipelago.`;

  if (isSumbar) {
    p2Id = `Khusus di Ranah Minang Sumatera Barat, inisiatif ini mempertegas komitmen daerah dalam memadukan keindahan geowisata alam perawan, kekayaan kuliner berempah autentik, dan keluhuran filosofi adat Minangkabau 'Alam Takambang Jadi Guru' untuk memberikan pengalaman berwisata kelas dunia yang berkesan.`;
    p2En = `Particularly in the Minangkabau realm of West Sumatra, this initiative reinforces the region's commitment to fusing pristine geopark landscapes, authentic spice-rich gastronomy, and venerable Minang cultural wisdom into unforgettable, world-class travel experiences.`;
  } else if (isEconomy) {
    p2Id = `Peningkatan performa indikator pariwisata ini mempercepat pemerataan devisa hingga ke tingkat desa dan nagari wisata, mendorong peningkatan rata-rata lama tinggal (length of stay), serta meningkatkan pengeluaran wisatawan pada produk ekonomi kreatif berkualitas tinggi.`;
    p2En = `This uplift in tourism economic performance accelerates revenue distribution down to heritage tourist villages, driving increases in average length of stay and encouraging higher tourist expenditure on high-value creative economy offerings.`;
  } else if (isEvent) {
    p2Id = `Rangkaian perhelatan ini menjadi ajang selebrasi seni pertunjukan, atraksi tradisi anak nagari, dan karnaval busana adat yang dirancang estetik, sekaligus mempererat silaturahmi kebudayaan antardaerah dan menghidupkan geliat ekonomi malam di sekitar sentra perayaan.`;
    p2En = `This festive series celebrates performing arts, indigenous traditional sports, and ornate cultural pageantry, strengthening inter-regional cultural solidarity while revitalizing night economies surrounding celebration hubs.`;
  } else if (isFlight) {
    p2Id = `Peningkatan konektivitas jalur transportasi dan aksesibilitas ini mempermudah mobilitas wisatawan antarpulau, memangkas waktu tempuh perjalanan, serta membuka akses langsung ke destinasi-destinasi unggulan dan surga tersembunyi (hidden gems) di seluruh Indonesia.`;
    p2En = `Enhanced transport connectivity and route accessibility significantly streamline inter-island traveler mobility, reducing transit durations and opening direct gateways to premier destinations and pristine hidden gems throughout Indonesia.`;
  }

  const p3Id = `Para wisatawan dan pelaku perjalanan diimbau untuk senantiasa memanfaatkan momentum positif ini dengan menjelajahi ragam kekayaan alam dan budaya Nusantara secara bertanggung jawab, mematuhi etika sapta pesona lokal, serta mendukung produk-produk kerajinan dan kuliner otentik masyarakat setempat demi pariwisata yang berkelanjutan.`;
  const p3En = `Travelers and visitors are warmly encouraged to capitalize on this positive momentum by exploring Indonesia's vast natural and cultural wonders responsibly, upholding local heritage ethics, and actively supporting authentic community handicrafts and regional gastronomy for sustainable tourism.`;

  const descId = `${p1Id}\n\n${p2Id}\n\n${p3Id}`;
  const descEn = `${p1En}\n\n${p2En}\n\n${p3En}`;

  const highlightsId = [
    'Informasi aktual seputar perkembangan dan agenda kepariwisataan',
    'Analisis kesiapan destinasi, aksesibilitas, dan amenitas pendukung',
    'Dukungan penguatan ekonomi kreatif masyarakat dan komunitas lokal'
  ];

  const highlightsEn = [
    'Latest updates on tourism development and strategic agenda',
    'Analysis of destination readiness, accessibility, and visitor amenities',
    'Support for strengthening local creative economy and community empowerment'
  ];

  const tipsId = 'Rencanakan perjalanan Anda lebih awal, manfaatkan kanal informasi resmi, dan nikmati keramahan budaya lokal secara menyeluruh.';
  const tipsEn = 'Plan your journey well in advance, utilize official information channels, and fully embrace local cultural hospitality.';

  return { descId, descEn, highlightsId, highlightsEn, tipsId, tipsEn };
}

const DEDUP_STOP_WORDS = new Set([
  'di', 'ke', 'dari', 'pada', 'dalam', 'oleh', 'untuk', 'dengan', 'dan', 'atau', 'yang', 'ini', 'itu',
  'adalah', 'sebagai', 'akan', 'telah', 'sudah', 'sedang', 'bisa', 'dapat', 'resmi', 'digelar', 'gelar',
  'dibuka', 'buka', 'tinjau', 'kunjungi', 'kunjungan', 'soal', 'terkait', 'tentang', 'kata', 'ungkap',
  'siap', 'jadi', 'ada', 'menjadi', 'sebut', 'beberkan', 'hingga', 'juga', 'tak', 'tidak', 'lebih',
  'ajak', 'mengajak', 'dorong', 'mendorong', 'minta', 'meminta', 'dukung', 'mendukung',
  'the', 'a', 'an', 'in', 'on', 'at', 'to', 'for', 'of', 'and', 'or', 'is', 'are', 'was', 'were', 'will'
]);

function extractKeywords(title: string): string[] {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, ' ')
    .split(/\s+/)
    .filter(word => word.length >= 3 && !DEDUP_STOP_WORDS.has(word));
}

function calculateTitleSimilarity(titleA: string, titleB: string): number {
  const wordsA = extractKeywords(titleA);
  const wordsB = extractKeywords(titleB);
  if (wordsA.length === 0 || wordsB.length === 0) return 0;

  const setA = new Set(wordsA);
  const setB = new Set(wordsB);

  let matches = 0;
  for (const wa of setA) {
    if (setB.has(wa)) {
      matches += 1;
    } else {
      for (const wb of setB) {
        if ((wa.length >= 4 && wb.startsWith(wa)) || (wb.length >= 4 && wa.startsWith(wb))) {
          matches += 0.8;
          break;
        }
      }
    }
  }

  // If 2 or more distinct keywords match, it is definitely about the same topic/event
  if (matches >= 2) {
    return 1.0;
  }

  // Sorensen-Dice coefficient
  return (2 * matches) / (setA.size + setB.size);
}

/**
 * Intelligent News Deduplication Engine
 * Strictly guarantees that no story, topic, organization (e.g. GenPI), or event is published more than ONCE.
 */
export function deduplicateNewsItems<T extends { title: string; titleEn?: string }>(items: T[]): T[] {
  const uniqueItems: T[] = [];

  for (const item of items) {
    if (!item || !item.title) continue;

    const isDuplicate = uniqueItems.some((existing) => {
      const cleanA = item.title.trim().toLowerCase();
      const cleanB = existing.title.trim().toLowerCase();

      // 1. Exact title match
      if (cleanA === cleanB) return true;

      // 2. Distinctive core subject check (if both mention the same specific entity/campaign)
      const wordsA = extractKeywords(item.title);
      const wordsB = extractKeywords(existing.title);
      const commonWords = wordsA.filter(w => wordsB.some(wb => w === wb || (w.length >= 4 && (wb.startsWith(w) || w.startsWith(wb)))));
      
      // Specifically catch repeated single distinctive proper nouns (like genpi, rangkul, kelok, etc.)
      const isDistinctiveShared = commonWords.some(w => ['genpi', 'kelok', 'pagaruyung', 'mentawai', 'singkarak', 'harau', 'tabuik', 'songket', 'rendang', 'maninjau', 'mandeh', 'silek', 'geopark'].includes(w));
      if (isDistinctiveShared) return true;

      // If 2 or more significant content words are shared
      if (commonWords.length >= 2) return true;

      // 3. Keyword similarity threshold (0.24 threshold catches syndicated variations)
      const simId = calculateTitleSimilarity(item.title, existing.title);
      if (simId >= 0.24) return true;

      // 4. English title check if available
      if (item.titleEn && existing.titleEn) {
        const simEn = calculateTitleSimilarity(item.titleEn, existing.titleEn);
        if (simEn >= 0.24) return true;
      }

      return false;
    });

    if (!isDuplicate) {
      uniqueItems.push(item);
    }
  }

  return uniqueItems;
}

export function isSumbarTopic(text: string): boolean {
  const sumbarKeywords = [
    'sumbar', 'sumatera barat', 'padang', 'bukittinggi', 'mentawai', 'tanah datar',
    'pagaruyung', 'sawahlunto', 'agam', 'solok', 'pasaman', 'sianok', 'harau',
    'singkarak', 'maninjau', 'mandeh', 'pariaman', 'payakumbuh', 'dharmasraya',
    'sijunjung', 'pesisir selatan', 'minang', 'minangkabau', 'marapi', 'talamau'
  ];
  const lower = (text || '').toLowerCase();
  return sumbarKeywords.some(kw => lower.includes(kw));
}

/**
 * Automatically translates Indonesian tourism headlines into fluent English
 */
export function translateHeadlineIndoToEn(titleId: string): string {
  if (!titleId || typeof titleId !== 'string') return '';
  let str = titleId.trim();

  // Dictionary of multi-word phrases and entities
  const phraseMappings: Array<[RegExp, string]> = [
    [/\bKemenparekraf\b/gi, 'Ministry of Tourism & Creative Economy'],
    [/\bKementerian Pariwisata\b/gi, 'Ministry of Tourism'],
    [/\bDinas Pariwisata Provinsi Sumatera Barat\b/gi, 'West Sumatra Tourism Board'],
    [/\bDinas Pariwisata Sumbar\b/gi, 'West Sumatra Tourism Board'],
    [/\bDispar Sumbar\b/gi, 'West Sumatra Tourism Board'],
    [/\bDispar\b/gi, 'Tourism Board'],
    [/\bPemprov Sumbar\b/gi, 'West Sumatra Provincial Government'],
    [/\bPemerintah Provinsi Sumatera Barat\b/gi, 'West Sumatra Provincial Government'],
    [/\bPemda\b/gi, 'Local Government'],
    [/\bPemerintah\b/gi, 'Government'],
    [/\bGenpi\b/gi, 'GenPI (Tourism Generation)'],
    [/\bKarisma Event Nusantara\b/gi, 'Karisma Event Nusantara (KEN)'],
    [/\bDesa Wisata\b/gi, 'Tourist Village'],
    [/\bNagari Wisata\b/gi, 'Tourist Nagari'],
    [/\bPariwisata Sumatera Barat\b/gi, 'West Sumatra Tourism'],
    [/\bPariwisata Sumbar\b/gi, 'West Sumatra Tourism'],
    [/\bPariwisata Indonesia\b/gi, 'Indonesian Tourism'],
    [/\bPariwisata Nasional\b/gi, 'National Tourism'],
    [/\bWisatawan Mancanegara\b/gi, 'International Tourists'],
    [/\bWisatawan Nusantara\b/gi, 'Domestic Tourists'],
    [/\bWisatawan Asing\b/gi, 'Foreign Tourists'],
    [/\bWisatawan Domestik\b/gi, 'Domestic Travelers'],
    [/\bWisatawan\b/gi, 'Tourists'],
    [/\bKunjungan Wisata\b/gi, 'Tourist Visits'],
    [/\bKunjungan Wisatawan\b/gi, 'Tourist Arrivals'],
    [/\bEkonomi Kreatif\b/gi, 'Creative Economy'],
    [/\bDestinasi Wisata\b/gi, 'Tourist Destinations'],
    [/\bObjek Wisata\b/gi, 'Tourist Attractions'],
    [/\bDaya Tarik Wisata\b/gi, 'Tourist Attractions'],
    [/\bDanau Singkarak\b/gi, 'Lake Singkarak'],
    [/\bDanau Maninjau\b/gi, 'Lake Maninjau'],
    [/\bDanau Kembar\b/gi, 'Twin Lakes'],
    [/\bLembah Harau\b/gi, 'Harau Valley'],
    [/\bNgarai Sianok\b/gi, 'Sianok Canyon'],
    [/\bJam Gadang\b/gi, 'Jam Gadang Clock Tower'],
    [/\bIstano Basa Pagaruyung\b/gi, 'Pagaruyung Grand Palace'],
    [/\bKepulauan Mentawai\b/gi, 'Mentawai Islands'],
    [/\bKawasan Bahari Mandeh\b/gi, 'Mandeh Marine Resort Area'],
    [/\bKawasan Mandeh\b/gi, 'Mandeh Coastal Area'],
    [/\bGeopark Silokek\b/gi, 'Silokek Geopark'],
    [/\bGeopark Ranah Minang\b/gi, 'Ranah Minang Geopark'],
    [/\bKelok 9\b/gi, 'Kelok 9 Flyover'],
    [/\bKelok 44\b/gi, 'Kelok 44 Scenic Pass'],
    [/\bAir Terjun Lembah Anai\b/gi, 'Lembah Anai Waterfall'],
    [/\bRumah Gadang\b/gi, 'Rumah Gadang Traditional House'],
    [/\bSumatera Barat\b/gi, 'West Sumatra'],
    [/\bRanah Minang\b/gi, 'Minangkabau Land'],
    [/\bSumbar\b/gi, 'West Sumatra'],
    [/\bKota Padang\b/gi, 'Padang City'],
    [/\bKota Bukittinggi\b/gi, 'Bukittinggi City'],
    [/\bKota Pariaman\b/gi, 'Pariaman City'],
    [/\bKota Payakumbuh\b/gi, 'Payakumbuh City'],
    [/\bKota Sawahlunto\b/gi, 'Sawahlunto City'],
    [/\bKabupaten Tanah Datar\b/gi, 'Tanah Datar Regency'],
    [/\bKabupaten Pesisir Selatan\b/gi, 'Pesisir Selatan Regency'],
    [/\bKabupaten Lima Puluh Kota\b/gi, 'Limapuluh Kota Regency'],
    [/\bKabupaten Agam\b/gi, 'Agam Regency'],
    [/\bKabupaten Solok\b/gi, 'Solok Regency'],
    [/\bKabupaten Pasaman\b/gi, 'Pasaman Regency'],
    [/\bKabupaten Dharmasraya\b/gi, 'Dharmasraya Regency'],
    [/\bKabupaten Sijunjung\b/gi, 'Sijunjung Regency'],
    [/\bKabupaten Mentawai\b/gi, 'Mentawai Regency'],
    [/\bBandara Internasional Minangkabau\b/gi, 'Minangkabau International Airport'],
    [/\bBandara Minangkabau\b/gi, 'Minangkabau Airport'],
    [/\bBulan Depan\b/gi, 'Next Month'],
    [/\bMinggu Ini\b/gi, 'This Week'],
    [/\bPekan Ini\b/gi, 'This Week'],
    [/\bTahun Ini\b/gi, 'This Year'],
    [/\bTahun 2026\b/gi, 'in 2026'],
    [/\bLibur Panjang\b/gi, 'Long Holiday'],
    [/\bLibur Lebaran\b/gi, 'Eid Holiday'],
    [/\bLibur Akhir Tahun\b/gi, 'Year-End Holiday'],
    [/\bLonjakan Wisatawan\b/gi, 'Surge in Tourists'],
    [/\bLonjakan Pengunjung\b/gi, 'Surge in Visitors'],
    [/\bJalur Wisata\b/gi, 'Tourism Route'],
    [/\bSektor Pariwisata\b/gi, 'Tourism Sector'],
    [/\bSiap Digelar\b/gi, 'Ready to be Held'],
    [/\bSukses Digelar\b/gi, 'Successfully Held'],
    [/\bResmi Dibuka\b/gi, 'Officially Opened'],
    [/\bResmi Diluncurkan\b/gi, 'Officially Launched'],
    [/\bTerus Digenjot\b/gi, 'Continuously Boosted'],
    [/\bTingkatkan Kualitas\b/gi, 'Enhance Quality'],
    [/\bRangkul Komunitas\b/gi, 'Engage Communities'],
    [/\bAjak Wisatawan\b/gi, 'Invites Travelers'],
    [/\bAjak\b/gi, 'Encourages'],
    [/\bMengajak\b/gi, 'Encourages'],
    [/\bRangkul\b/gi, 'to Embrace'],
    [/\bMerangkul\b/gi, 'Embraces'],
    [/\bDorong\b/gi, 'Drives'],
    [/\bMendorong\b/gi, 'Boosts'],
    [/\bPercepat\b/gi, 'Accelerates'],
    [/\bMempercepat\b/gi, 'Accelerates'],
    [/\bPerkuat\b/gi, 'Strengthens'],
    [/\bMemperkuat\b/gi, 'Strengthens'],
    [/\bGencarkan\b/gi, 'Intensifies'],
    [/\bMenggencarkan\b/gi, 'Intensifies'],
    [/\bLuncurkan\b/gi, 'Launches'],
    [/\bMeluncurkan\b/gi, 'Launches'],
    [/\bDiluncurkan\b/gi, 'Launched'],
    [/\bGelar\b/gi, 'Hosts'],
    [/\bMenggelar\b/gi, 'Holds'],
    [/\bDigelar\b/gi, 'Held'],
    [/\bTinjau\b/gi, 'Inspects'],
    [/\bMeninjau\b/gi, 'Inspects'],
    [/\bSambut\b/gi, 'Welcomes'],
    [/\bMenyambut\b/gi, 'Welcomes'],
    [/\bTargetkan\b/gi, 'Targets'],
    [/\bMenargetkan\b/gi, 'Targets'],
    [/\bKembangkan\b/gi, 'Develops'],
    [/\bMengembangkan\b/gi, 'Develops'],
    [/\bPengembangan\b/gi, 'Development of'],
    [/\bPeningkatan\b/gi, 'Increase in'],
    [/\bPromosi\b/gi, 'Promotion of'],
    [/\bPromosikan\b/gi, 'Promotes'],
    [/\bMempromosikan\b/gi, 'Promotes'],
    [/\bKesiapan\b/gi, 'Readiness of'],
    [/\bKonektivitas\b/gi, 'Connectivity of'],
    [/\bAksesibilitas\b/gi, 'Accessibility of'],
    [/\bFasilitas\b/gi, 'Facilities'],
    [/\bAmenitas\b/gi, 'Amenities'],
    [/\bAkomodasi\b/gi, 'Accommodation'],
    [/\bPenerbangan\b/gi, 'Flights'],
    [/\bPenginapan\b/gi, 'Lodging'],
    [/\bHotel\b/gi, 'Hotels'],
    [/\bKuliner\b/gi, 'Culinary'],
    [/\bKoleksi\b/gi, 'Collection'],
    [/\bPameran\b/gi, 'Exhibition'],
    [/\bAtraksi\b/gi, 'Attractions'],
    [/\bKebudayaan\b/gi, 'Culture'],
    [/\bBudaya\b/gi, 'Culture'],
    [/\bTradisi\b/gi, 'Traditions'],
    [/\bFestival\b/gi, 'Festival'],
    [/\bPesta\b/gi, 'Festivity'],
    [/\bPerayaan\b/gi, 'Celebration'],
    [/\bMeriah\b/gi, 'Spectacular'],
    [/\bTerpilih\b/gi, 'Selected'],
    [/\bTerbaik\b/gi, 'Best'],
    [/\bUnggulan\b/gi, 'Flagship'],
    [/\bPrioritas\b/gi, 'Priority'],
    [/\bInternasional\b/gi, 'International'],
    [/\bNasional\b/gi, 'National'],
    [/\bLokal\b/gi, 'Local'],
    [/\bKomunitas\b/gi, 'Communities'],
    [/\bMasyarakat\b/gi, 'Community'],
    [/\bPelaku Wisata\b/gi, 'Tourism Operators'],
    [/\bPelaku Usaha\b/gi, 'Business Operators'],
    [/\bUMKM\b/gi, 'Local SMEs'],
    [/\bPotensi\b/gi, 'Potential'],
    [/\bWisata\b/gi, 'Tourism'],
    [/\bJelang\b/gi, 'Ahead of'],
    [/\bMenjelang\b/gi, 'Ahead of'],
    [/\bPasca\b/gi, 'Post-'],
    [/\bSetelah\b/gi, 'After'],
    [/\bSaat\b/gi, 'During'],
    [/\bHingga\b/gi, 'Up to'],
    [/\bSampai\b/gi, 'Until'],
    [/\bMulai\b/gi, 'Starts'],
    [/\bResmi\b/gi, 'Officially'],
    [/\bUntuk\b/gi, 'for'],
    [/\bDengan\b/gi, 'with'],
    [/\bDan\b/gi, 'and'],
    [/\bDi\b/gi, 'in'],
    [/\bKe\b/gi, 'to'],
    [/\bDari\b/gi, 'from'],
    [/\bPada\b/gi, 'at'],
    [/\bOleh\b/gi, 'by']
  ];

  for (const [regex, replacement] of phraseMappings) {
    str = str.replace(regex, replacement);
  }

  // Clean double spaces and normalize capitalization
  str = str.replace(/\s+/g, ' ').trim();
  if (str.length > 0) {
    str = str.charAt(0).toUpperCase() + str.slice(1);
  }
  return str;
}

export const textTranslationMemory = new Map<string, string>();

/**
 * Fetches high-accuracy neural translation via Google GTX & MyMemory with local memory caching
 */
export async function fetchDirectTranslation(text: string, from = 'id', to = 'en'): Promise<string> {
  if (!text || !text.trim()) return '';
  const trimmed = text.trim();
  const cacheKey = `${from}-${to}-${trimmed}`;
  if (textTranslationMemory.has(cacheKey)) {
    return textTranslationMemory.get(cacheKey)!;
  }

  // Check localStorage cache
  try {
    if (typeof window !== 'undefined') {
      const local = localStorage.getItem(`malala_trans_${cacheKey.slice(0, 100)}`);
      if (local) {
        textTranslationMemory.set(cacheKey, local);
        return local;
      }
    }
  } catch {}

  try {
    // 1. Google GTX Public API
    const gtxUrl = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=${from}&tl=${to}&dt=t&q=${encodeURIComponent(trimmed)}`;
    const res = await fetch(gtxUrl);
    if (res.ok) {
      const data = await res.json();
      if (Array.isArray(data) && Array.isArray(data[0])) {
        const translated = data[0].map((chunk: any) => chunk[0]).join('').trim();
        if (translated && translated.toLowerCase() !== trimmed.toLowerCase()) {
          textTranslationMemory.set(cacheKey, translated);
          try {
            if (typeof window !== 'undefined') {
              localStorage.setItem(`malala_trans_${cacheKey.slice(0, 100)}`, translated);
            }
          } catch {}
          return translated;
        }
      }
    }
  } catch (e) {}

  try {
    // 2. MyMemory Translation API fallback
    const mmUrl = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(trimmed)}&langpair=${from}|${to}`;
    const res = await fetch(mmUrl);
    if (res.ok) {
      const json = await res.json();
      if (json?.responseData?.translatedText) {
        const translated = json.responseData.translatedText.trim();
        if (translated && translated.toLowerCase() !== trimmed.toLowerCase()) {
          textTranslationMemory.set(cacheKey, translated);
          try {
            if (typeof window !== 'undefined') {
              localStorage.setItem(`malala_trans_${cacheKey.slice(0, 100)}`, translated);
            }
          } catch {}
          return translated;
        }
      }
    }
  } catch (e) {}

  // 3. Robust rule-based fallback
  const fallback = translateHeadlineIndoToEn(trimmed);
  textTranslationMemory.set(cacheKey, fallback);
  return fallback;
}

/**
 * Pre-fetches translations in background for all active news items
 */
export function prefetchNewsTranslations(items: any[]) {
  if (!Array.isArray(items) || items.length === 0) return;
  items.forEach(item => {
    if (item.title) {
      fetchDirectTranslation(item.title, 'id', 'en').catch(() => {});
    }
    if (item.description) {
      fetchDirectTranslation(item.description, 'id', 'en').catch(() => {});
    }
  });
}

export function getNewsDisplayTitle(item: any, lang: string): string {
  if (!item) return '';
  const isEn = lang === 'en';
  if (!isEn) return item.title || '';

  const cacheKey = `id-en-${(item.title || '').trim()}`;
  if (textTranslationMemory.has(cacheKey)) {
    return textTranslationMemory.get(cacheKey)!;
  }

  try {
    if (typeof window !== 'undefined') {
      const local = localStorage.getItem(`malala_trans_${cacheKey.slice(0, 100)}`);
      if (local) {
        textTranslationMemory.set(cacheKey, local);
        return local;
      }
    }
  } catch {}

  if (item.titleEn && item.titleEn.trim() && item.titleEn !== item.title) {
    return item.titleEn;
  }

  // Trigger background translation for perfect async update
  if (item.title) {
    fetchDirectTranslation(item.title, 'id', 'en').catch(() => {});
  }

  return translateHeadlineIndoToEn(item.title || item.titleEn || '');
}

export function getNewsDisplayDescription(item: any, lang: string): string {
  if (!item) return '';
  const isEn = lang === 'en';
  const desc = item.description || item.content || '';
  if (!isEn) return desc;

  const cacheKey = `id-en-${desc.trim()}`;
  if (textTranslationMemory.has(cacheKey)) {
    return textTranslationMemory.get(cacheKey)!;
  }

  try {
    if (typeof window !== 'undefined') {
      const local = localStorage.getItem(`malala_trans_${cacheKey.slice(0, 100)}`);
      if (local) {
        textTranslationMemory.set(cacheKey, local);
        return local;
      }
    }
  } catch {}

  if (item.descriptionEn && item.descriptionEn.trim() && item.descriptionEn !== desc) {
    return item.descriptionEn;
  }

  if (desc) {
    fetchDirectTranslation(desc, 'id', 'en').catch(() => {});
  }

  return item.descriptionEn || desc;
}

/**
 * Fetch live Real-Time National Indonesia Tourism News strictly within the last 30 days (1 month)
 * Note: imageUrl is left empty ('') so the admin can manually upload/set banner images.
 */
async function fetchLiveTourismNewsFromRSS(language: string = 'id') {
  const rssQueries = [
    'https://news.google.com/rss/search?q=pariwisata+sumatera+barat+when:30d&hl=id&gl=ID&ceid=ID:id',
    'https://news.google.com/rss/search?q=desa+wisata+sumatera+barat+when:30d&hl=id&gl=ID&ceid=ID:id',
    'https://news.google.com/rss/search?q=pariwisata+indonesia+kemenparekraf+when:30d&hl=id&gl=ID&ceid=ID:id'
  ];

  const candidateList: any[] = [];

  for (const rssUrl of rssQueries) {
    try {
      const endpoint = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(rssUrl)}`;
      const res = await fetch(endpoint, { cache: 'no-store' });
      if (!res.ok) continue;

      const data = await res.json();
      if (data.status === 'ok' && Array.isArray(data.items) && data.items.length > 0) {
        for (let idx = 0; idx < data.items.length; idx++) {
          const item = data.items[idx];
          const rawTitle = cleanHtml(item.title || '');
          const titleParts = rawTitle.split(' - ');
          const source = titleParts.length > 1 ? titleParts.pop() : 'Media Nasional';
          const cleanTitle = titleParts.join(' - ').trim() || rawTitle;

          const { dateId, dateEn, isWithin30d } = formatDateIndo(item.pubDate);
          if (!isWithin30d) continue; // Strictly ignore news older than 1 month

          const narrative = buildJournalisticNarrative(cleanTitle, source || 'Media Nasional');
          const isSumbar = isSumbarTopic(cleanTitle) || isSumbarTopic(rssUrl);

          candidateList.push({
            id: `news-live-${candidateList.length + 1}-${Date.now().toString().slice(-6)}`,
            title: cleanTitle,
            titleEn: translateHeadlineIndoToEn(cleanTitle),
            category: isSumbar ? 'Pariwisata Sumatera Barat' : 'Pariwisata Indonesia',
            categoryEn: isSumbar ? 'West Sumatra Tourism' : 'Indonesian Tourism',
            date: dateId,
            dateEn: dateEn,
            tag: isSumbar ? 'Sumbar' : 'Indonesia',
            tagEn: isSumbar ? 'West Sumatra' : 'Indonesia',
            description: narrative.descId,
            descriptionEn: narrative.descEn,
            imageUrl: '', // Left blank for manual admin input
            actionUrl: '',
            highlights: narrative.highlightsId,
            highlightsEn: narrative.highlightsEn,
            tips: narrative.tipsId,
            tipsEn: narrative.tipsEn,
            locationName: isSumbar ? 'Sumatera Barat' : 'Pariwisata Indonesia',
            locationNameEn: isSumbar ? 'West Sumatra' : 'Indonesian Tourism'
          });
        }
      }
    } catch (err) {
      console.warn("RSS fetch error:", err);
    }
  }

  // Fallback via CORS proxy if candidate list is small
  if (candidateList.length < 4) {
    try {
      const corsProxyUrl = `https://api.allorigins.win/get?url=${encodeURIComponent(
        'https://news.google.com/rss/search?q=pariwisata+sumatera+barat+when:30d&hl=id&gl=ID&ceid=ID:id'
      )}`;
      const res = await fetch(corsProxyUrl, { cache: 'no-store' });
      if (res.ok) {
        const json = await res.json();
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(json.contents, 'text/xml');
        const items = xmlDoc.querySelectorAll('item');

        if (items && items.length > 0) {
          for (let i = 0; i < Math.min(items.length, 6); i++) {
            const it = items[i];
            const rawTitle = it.querySelector('title')?.textContent || '';
            const pubDate = it.querySelector('pubDate')?.textContent || new Date().toISOString();
            const { dateId, dateEn, isWithin30d } = formatDateIndo(pubDate);

            if (!isWithin30d) continue;

            const titleParts = rawTitle.split(' - ');
            const source = titleParts.length > 1 ? titleParts.pop() : 'Media Nasional';
            const cleanTitle = titleParts.join(' - ').trim() || rawTitle;
            const narrative = buildJournalisticNarrative(cleanTitle, source || 'Media Nasional');
            const isSumbar = isSumbarTopic(cleanTitle);

            candidateList.push({
              id: `news-proxy-${candidateList.length + 1}-${Date.now().toString().slice(-6)}`,
              title: cleanTitle,
              titleEn: translateHeadlineIndoToEn(cleanTitle),
              category: isSumbar ? 'Pariwisata Sumatera Barat' : 'Pariwisata Indonesia',
              categoryEn: isSumbar ? 'West Sumatra Tourism' : 'Indonesian Tourism',
              date: dateId,
              dateEn: dateEn,
              tag: isSumbar ? 'Sumbar' : 'Indonesia',
              tagEn: isSumbar ? 'West Sumatra' : 'Indonesia',
              description: narrative.descId,
              descriptionEn: narrative.descEn,
              imageUrl: '', // Left blank for manual admin input
              actionUrl: '',
              highlights: narrative.highlightsId,
              highlightsEn: narrative.highlightsEn,
              tips: narrative.tipsId,
              tipsEn: narrative.tipsEn,
              locationName: isSumbar ? 'Sumatera Barat' : 'Pariwisata Indonesia',
              locationNameEn: isSumbar ? 'West Sumatra' : 'Indonesian Tourism'
            });
          }
        }
      }
    } catch (err) {
      console.warn("CORS proxy news fetch error:", err);
    }
  }

  // Deduplicate to filter out duplicate news stories from different outlets
  const deduped = deduplicateNewsItems(candidateList);
  if (deduped.length > 0) {
    return deduped.slice(0, 8);
  }

  return null;
}

export async function fetchAiHotInfo(language: string = 'id') {
  // 1. Try local server API if running in node environment
  try {
    const res = await fetch('/api/ai/fetch-hot-info', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ language }),
    });

    const contentType = res.headers.get('content-type') || '';
    if (res.ok && contentType.includes('application/json')) {
      const data = await res.json();
      if (Array.isArray(data) && data.length > 0) {
        return deduplicateNewsItems(data.filter((it: any) => isWithinLast30Days(it.date)));
      }
    }
  } catch (e) {
    // Normal in static Firebase Hosting environment
  }

  // 2. Client-side Gemini AI if API key is provided
  const viteApiKey = (import.meta as any).env?.VITE_GEMINI_API_KEY || (import.meta as any).env?.GEMINI_API_KEY;
  if (viteApiKey) {
    try {
      const ai = new GoogleGenAI({ apiKey: viteApiKey });
      const prompt = `Hasilkan 4 butir berita dan pengumuman pariwisata NASIONAL INDONESIA dan SUMATERA BARAT TERKINI (dalam 30 hari terakhir) dalam format JSON array. Setiap butir berita WAJIB mengangkat topik atau peristiwa yang berbeda (DILARANG membuat berita dengan topik yang sama). Jangan menyertakan imageUrl (buat kosong string ""). Setiap objek wajib memiliki properti:
      id (string), title (string bahasa indonesia), titleEn (string inggris), category (string), categoryEn (string), date (string tanggal 30 hari terakhir), dateEn (string), tag (string), tagEn (string), description (string 3 paragraf), descriptionEn (string 3 paragraf), imageUrl (""), actionUrl (""), highlights (array string 3 butir), highlightsEn (array string 3 butir), tips (string), tipsEn (string), locationName (string), locationNameEn (string).
      Hanya kembalikan valid JSON tanpa markdown.`;

      const response = await ai.models.generateContent({
        model: 'gemini-3.6-flash',
        contents: prompt,
      });

      const cleanJson = (response.text || '').replace(/```json/g, '').replace(/```/g, '').trim();
      const parsed = JSON.parse(cleanJson);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return deduplicateNewsItems(parsed.filter((it: any) => isWithinLast30Days(it.date)));
      }
    } catch (err) {
      console.warn("Client Gemini hotinfo generation failed, moving to live RSS:", err);
    }
  }

  // 3. Live Google News / RSS National Tourism Feed (Direct, Real-time & strictly within 30 days)
  const liveRssNews = await fetchLiveTourismNewsFromRSS(language);
  if (liveRssNews && liveRssNews.length > 0) {
    return deduplicateNewsItems(liveRssNews);
  }

  // 4. Static fallback if completely offline (within 30 days)
  return deduplicateNewsItems(HOT_INFO_FALLBACK.filter((it: any) => isWithinLast30Days(it.date)));
}


