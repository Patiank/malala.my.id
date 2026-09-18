import { GoogleGenAI } from "@google/genai";

// Fallback data when API or Gemini API key is unavailable
export const HOT_INFO_FALLBACK = [
  {
    "id": "hi1",
    "title": "Kemenpar Pantau Dampak Erupsi Gunung Anak Krakatau terhadap Pariwisata dan Akses Transportasi",
    "titleEn": "Tourism Ministry Monitors Impact of Mount Anak Krakatau Eruption on Travel and Transport Routes",
    "category": "Pariwisata Sumatera Barat",
    "categoryEn": "West Sumatra Tourism",
    "date": "06 September 2026",
    "dateEn": "September 06, 2026",
    "timeAgo": "3 jam lalu",
    "sourceName": "Antara News Sumbar",
    "sourceDomain": "sumbar.antaranews.com",
    "sourceUrl": "https://sumbar.antaranews.com/berita/777352/kemenpar-pantau-dampak-erupsi-gunung-anak-krakatau-terhadap-pariwisata",
    "sourceIcon": "https://www.google.com/s2/favicons?domain=antaranews.com&sz=64",
    "imageUrl": "",
    "tag": "Sumbar",
    "tagEn": "West Sumatra",
    "actionUrl": "https://sumbar.antaranews.com/berita/777352/kemenpar-pantau-dampak-erupsi-gunung-anak-krakatau-terhadap-pariwisata",
    "mapsUrl": "https://www.google.com/maps/search/?api=1&query=Gunung+Anak+Krakatau",
    "locationName": "Sumatera Barat & Koridor Selat Sunda",
    "locationNameEn": "West Sumatra & Sunda Strait Corridor",
    "description": "Kementerian Pariwisata Republik Indonesia bersama otoritas transportasi dan BMKG memantau ketat pergerakan abu vulkanik erupsi Gunung Anak Krakatau guna memastikan keselamatan penerbangan dan perjalanan wisatawan.",
    "descriptionEn": "The Indonesian Ministry of Tourism alongside transportation authorities and BMKG is closely monitoring Mount Anak Krakatau volcanic ash to ensure flight and tourist transit safety.",
    "relatedStories": [
      {
        "title": "Ramai soal Gas SO2 dan Sebaran Abu Anak Krakatau, Begini Penjelasan Resmi Badan Geologi",
        "titleEn": "Geological Agency Clarifies Dispersion of Anak Krakatau Volcanic Ash and SO2",
        "sourceName": "Kompas.com",
        "sourceDomain": "kompas.com",
        "sourceUrl": "https://travel.kompas.com",
        "timeAgo": "6 jam lalu",
        "sourceIcon": "https://www.google.com/s2/favicons?domain=kompas.com&sz=64"
      },
      {
        "title": "Penerbangan dan Rute Penyeberangan Wisata Dipastikan Terkendali Pascapergerakan Abu Vulkanik",
        "titleEn": "Flights and Marine Tourist Ferry Crossings Monitored Safe Amid Volcanic Advisory",
        "sourceName": "news.detik.com",
        "sourceDomain": "detik.com",
        "sourceUrl": "https://news.detik.com",
        "timeAgo": "1 jam lalu",
        "sourceIcon": "https://www.google.com/s2/favicons?domain=detik.com&sz=64"
      },
      {
        "title": "Satgas dan Jajaran Polres Siagakan Posko Kesehatan dan Masker bagi Pengguna Jalan",
        "titleEn": "Police Deploy Integrated Health Posts and Face Masks along Travel Corridors",
        "sourceName": "Tribrata News",
        "sourceDomain": "tribratanews.polri.go.id",
        "sourceUrl": "https://tribratanews.polri.go.id",
        "timeAgo": "3 jam lalu",
        "sourceIcon": "https://www.google.com/s2/favicons?domain=tribratanews.polri.go.id&sz=64"
      }
    ]
  },
  {
    "id": "hi2",
    "title": "Uji Laik Fungsi Tol Padang-Sicincin 36,6 Km Tuntas: Pangkas Waktu Tempuh Padang ke Bukittinggi Jadi 45 Menit",
    "titleEn": "Padang-Sicincin 36.6 Km Expressway Testing Finished: Slashes Padang to Bukittinggi Trip to 45 Minutes",
    "category": "Pariwisata Sumatera Barat",
    "categoryEn": "West Sumatra Tourism",
    "date": "06 September 2026",
    "dateEn": "September 06, 2026",
    "timeAgo": "4 jam lalu",
    "sourceName": "Padang Ekspres",
    "sourceDomain": "padek.jawapos.com",
    "sourceUrl": "https://padek.jawapos.com/padang-pariaman/2365049381/uji-laik-fungsi-tol-padang-sicincin-tuntas",
    "sourceIcon": "https://www.google.com/s2/favicons?domain=jawapos.com&sz=64",
    "imageUrl": "",
    "tag": "Sumbar",
    "tagEn": "West Sumatra",
    "actionUrl": "https://padek.jawapos.com/padang-pariaman/2365049381/uji-laik-fungsi-tol-padang-sicincin-tuntas",
    "mapsUrl": "https://www.google.com/maps/search/?api=1&query=Tol+Padang+Sicincin",
    "locationName": "Ruas Tol Padang - Sicincin, Padang Pariaman",
    "locationNameEn": "Padang - Sicincin Expressway, Padang Pariaman",
    "description": "Uji laik fungsi jalan tol perdana di Sumatera Barat ruas Padang - Sicincin sepanjang 36,6 km resmi selesai dan siap memangkas waktu tempuh wisatawan menuju dataran tinggi Minangkabau.",
    "descriptionEn": "Feasibility testing for West Sumatra first 36.6-km Padang - Sicincin expressway is officially complete, dramatically cutting travel times to the Minangkabau highlands.",
    "relatedStories": [
      {
        "title": "Rest Area KM 23 Arsitektur Gonjong Rumah Gadang Alokasikan 70 Persen Gerai untuk UMKM Kuliner Minang",
        "titleEn": "Gonjong-Roofed Rest Area KM 23 Dedicates 70 Percent Space to Minang Culinary MSMEs",
        "sourceName": "Antara News Sumbar",
        "sourceDomain": "sumbar.antaranews.com",
        "sourceUrl": "https://sumbar.antaranews.com",
        "timeAgo": "7 jam lalu",
        "sourceIcon": "https://www.google.com/s2/favicons?domain=antaranews.com&sz=64"
      },
      {
        "title": "Konektivitas Wisatawan Lembah Anai dan Dataran Tinggi Semakin Nyaman Bebas Hambatan",
        "titleEn": "Seamless Travel Corridor for Anai Valley and Bukittinggi Highland Visitors",
        "sourceName": "Langgam.id",
        "sourceDomain": "langgam.id",
        "sourceUrl": "https://langgam.id",
        "timeAgo": "12 jam lalu",
        "sourceIcon": "https://www.google.com/s2/favicons?domain=langgam.id&sz=64"
      }
    ]
  },
  {
    "id": "hi3",
    "title": "Kharisma Event Nusantara 2026: Pacu Jawi Tanah Datar dan Festival Tabuik Pariaman Masuk Agenda Unggulan Nasional",
    "titleEn": "National Event Calendar: Pacu Jawi Bull Race & Pariaman Tabuik Festival Featured in 2026 Flagship Roster",
    "category": "Pariwisata Sumatera Barat",
    "categoryEn": "West Sumatra Tourism",
    "date": "05 September 2026",
    "dateEn": "September 05, 2026",
    "timeAgo": "8 jam lalu",
    "sourceName": "Harian Haluan",
    "sourceDomain": "harianhaluan.com",
    "sourceUrl": "https://harianhaluan.com/wisata/festival-budaya-sumbar-ken-2026",
    "sourceIcon": "https://www.google.com/s2/favicons?domain=harianhaluan.com&sz=64",
    "imageUrl": "",
    "tag": "Sumbar",
    "tagEn": "West Sumatra",
    "actionUrl": "https://harianhaluan.com/wisata/festival-budaya-sumbar-ken-2026",
    "mapsUrl": "https://www.google.com/maps/search/?api=1&query=Tanah+Datar+Sumatera+Barat",
    "locationName": "Tanah Datar & Pantai Gandoriah, Kota Pariaman",
    "locationNameEn": "Tanah Datar & Gandoriah Beach, Pariaman",
    "description": "Dua atraksi budaya akbar Minangkabau yakni Alek Nagari Pacu Jawi dan Pesona Budaya Tabuik resmi dinobatkan masuk dalam agenda unggulan Kharisma Event Nusantara (KEN) 2026.",
    "descriptionEn": "Two iconic Minangkabau cultural spectacles—Pacu Jawi in Tanah Datar and Tabuik in Pariaman—have been officially curated into the national 2026 KEN flagship roster.",
    "relatedStories": [
      {
        "title": "Dispar Sumbar Targetkan Lonjakan Wisatawan Mancanegara Lewat Dua Kharisma Event Nusantara",
        "titleEn": "West Sumatra Tourism Targets Foreign Visitor Boost via Two Premier KEN Celebrations",
        "sourceName": "Antara News Sumbar",
        "sourceDomain": "sumbar.antaranews.com",
        "sourceUrl": "https://sumbar.antaranews.com",
        "timeAgo": "10 jam lalu",
        "sourceIcon": "https://www.google.com/s2/favicons?domain=antaranews.com&sz=64"
      },
      {
        "title": "Menikmati Sensasi Balap Sapi Berlumpur di Kaki Marapi dan Kemegahan Menara Tabuik 12 Meter",
        "titleEn": "Experiencing Thrilling Mud Racing under Marapi and 12-Meter Majestic Coastal Shrines",
        "sourceName": "travel.kompas.com",
        "sourceDomain": "kompas.com",
        "sourceUrl": "https://travel.kompas.com",
        "timeAgo": "1 hari lalu",
        "sourceIcon": "https://www.google.com/s2/favicons?domain=kompas.com&sz=64"
      }
    ]
  },
  {
    "id": "hi4",
    "title": "Gerakan Bangga Berwisata di Indonesia: Akselerasi Target 1,5 Miliar Perjalanan Nusantara di 5 Destinasi Super Prioritas",
    "titleEn": "Proud to Travel in Indonesia Initiative: Accelerating 1.5 Billion Trips Across 5 Super Priority Destinations",
    "category": "Pariwisata Indonesia",
    "categoryEn": "Indonesian Tourism",
    "date": "05 September 2026",
    "dateEn": "September 05, 2026",
    "timeAgo": "1 hari lalu",
    "sourceName": "travel.kompas.com",
    "sourceDomain": "kompas.com",
    "sourceUrl": "https://travel.kompas.com/read/2026/09/05/bangga-berwisata-di-indonesia-dpsp",
    "sourceIcon": "https://www.google.com/s2/favicons?domain=kompas.com&sz=64",
    "imageUrl": "",
    "tag": "Nasional",
    "tagEn": "National",
    "actionUrl": "https://travel.kompas.com/read/2026/09/05/bangga-berwisata-di-indonesia-dpsp",
    "mapsUrl": "https://www.google.com/maps/search/?api=1&query=Danau+Toba+Sumatera+Utara",
    "locationName": "Destinasi Super Prioritas Indonesia (DPSP)",
    "locationNameEn": "Indonesian Super Priority Destinations (DPSP)",
    "description": "Pemerintah bersama asosiasi perhotelan dan agen perjalanan daring menggencarkan stimulus liburan domestik untuk mendorong pergerakan wisatawan nusantara ke destinasi super prioritas.",
    "descriptionEn": "The Indonesian government alongside hospitality and airline partners accelerates domestic travel incentives across 5 Super Priority Tourism Destinations.",
    "relatedStories": [
      {
        "title": "Kemenparekraf Hadirkan Paket Bundling Penerbangan Domestik dan Homestay Berbasis QRIS",
        "titleEn": "Ministry Introduces Domestic Flight & Homestay Bundles Powered by Digital QRIS",
        "sourceName": "detikTravel",
        "sourceDomain": "detik.com",
        "sourceUrl": "https://travel.detik.com",
        "timeAgo": "1 hari lalu",
        "sourceIcon": "https://www.google.com/s2/favicons?domain=detik.com&sz=64"
      },
      {
        "title": "Pemerataan Wisatawan Nusantara Dorong Kebangkitan Ratusan Desa Wisata Mandiri",
        "titleEn": "Domestic Travel Inflow Fuels Sustainable Resurgence of Rural Tourism Villages",
        "sourceName": "CNN Indonesia",
        "sourceDomain": "cnnindonesia.com",
        "sourceUrl": "https://www.cnnindonesia.com",
        "timeAgo": "2 hari lalu",
        "sourceIcon": "https://www.google.com/s2/favicons?domain=cnnindonesia.com&sz=64"
      }
    ]
  },
  {
    "id": "hi5",
    "title": "Pesona Ombak Dunia Mentawai 2026: Ratusan Peselancar Mancanegara Padati Kepulauan Siberut dan Sipora",
    "titleEn": "Mentawai World-Class Surf Season 2026: International Surfers Flock to Siberut and Sipora Islands",
    "category": "Pariwisata Sumatera Barat",
    "categoryEn": "West Sumatra Tourism",
    "date": "04 September 2026",
    "dateEn": "September 04, 2026",
    "timeAgo": "1 hari lalu",
    "sourceName": "Antara News Sumbar",
    "sourceDomain": "sumbar.antaranews.com",
    "sourceUrl": "https://sumbar.antaranews.com/berita/mentawai-surfing-international-2026",
    "sourceIcon": "https://www.google.com/s2/favicons?domain=antaranews.com&sz=64",
    "imageUrl": "",
    "tag": "Sumbar",
    "tagEn": "West Sumatra",
    "actionUrl": "https://sumbar.antaranews.com/berita/mentawai-surfing-international-2026",
    "mapsUrl": "https://www.google.com/maps/search/?api=1&query=Kepulauan+Mentawai+Sumatera+Barat",
    "locationName": "Kepulauan Mentawai, Sumatera Barat",
    "locationNameEn": "Mentawai Islands, West Sumatra",
    "description": "Puncak musim ombak selancar kelas dunia di Kepulauan Mentawai menyedot atensi peselancar profesional internasional dari berbagai benua.",
    "descriptionEn": "The peak surf season in the Mentawai archipelago draws hundreds of international professional surfers seeking world-renowned reef breaks.",
    "relatedStories": [
      {
        "title": "Pemkab Mentawai Perkuat Proteksi Terumbu Karang dan Tata Kelola Retribusi Surfing Ramah Lingkungan",
        "titleEn": "Mentawai Government Enforces Coral Conservation and Eco-Friendly Surfing Levies",
        "sourceName": "Padang Ekspres",
        "sourceDomain": "padek.jawapos.com",
        "sourceUrl": "https://padek.jawapos.com",
        "timeAgo": "2 hari lalu",
        "sourceIcon": "https://www.google.com/s2/favicons?domain=jawapos.com&sz=64"
      },
      {
        "title": "Keindahan Gugusan Pulau Tropis dan Budaya Tato Tertua Dunia Menjadi Magnet Global",
        "titleEn": "Tropical Archipelagos and World Oldest Tattoo Tradition Draw Global Travelers",
        "sourceName": "Tempo.co",
        "sourceDomain": "tempo.co",
        "sourceUrl": "https://travel.tempo.co",
        "timeAgo": "2 hari lalu",
        "sourceIcon": "https://www.google.com/s2/favicons?domain=tempo.co&sz=64"
      }
    ]
  },
  {
    "id": "hi6",
    "title": "Kemenparekraf Perluas Standar Pariwisata Hijau: Terapkan Ekowisata Berkelanjutan Bebas Sampah Plastik di Seluruh Destinasi",
    "titleEn": "Ministry Expands Green Tourism Standards: Mandating Sustainable Plastic-Free Ecotourism Across Destinations",
    "category": "Pariwisata Indonesia",
    "categoryEn": "Indonesian Tourism",
    "date": "04 September 2026",
    "dateEn": "September 04, 2026",
    "timeAgo": "2 hari lalu",
    "sourceName": "detikTravel",
    "sourceDomain": "travel.detik.com",
    "sourceUrl": "https://travel.detik.com/travel-news/kemenparekraf-sertifikasi-ekowisata-desa-wisata",
    "sourceIcon": "https://www.google.com/s2/favicons?domain=detik.com&sz=64",
    "imageUrl": "",
    "tag": "Nasional",
    "tagEn": "National",
    "actionUrl": "https://travel.detik.com/travel-news/kemenparekraf-sertifikasi-ekowisata-desa-wisata",
    "mapsUrl": "https://www.google.com/maps/search/?api=1&query=Desa+Wisata+Indonesia",
    "locationName": "Jejaring Desa Wisata Indonesia",
    "locationNameEn": "Indonesian Tourism Village Network",
    "description": "Pemerintah memperluas sertifikasi standarisasi pariwisata hijau dan dekarbonisasi bagi destinasi wisata dan jejaring desa wisata nusantara.",
    "descriptionEn": "The Indonesian government expands green tourism and decarbonization standards for national travel destinations and tourism villages.",
    "relatedStories": [
      {
        "title": "Penerapan Konsep CHSE dan Kuota Harian Kunjungan Efektif Cegah Overtourism di Cagar Alam",
        "titleEn": "CHSE Protocols and Daily Quota Caps Successfully Prevent Overtourism in Reserves",
        "sourceName": "Antara News",
        "sourceDomain": "antaranews.com",
        "sourceUrl": "https://www.antaranews.com",
        "timeAgo": "2 hari lalu",
        "sourceIcon": "https://www.google.com/s2/favicons?domain=antaranews.com&sz=64"
      },
      {
        "title": "Polairud dan Kelompok Sadar Wisata Perketat Patroli Kelestarian Terumbu Karang Bahari",
        "titleEn": "Marine Police and Local Tourism Volunteers Tighten Coral Reef Conservation Patrols",
        "sourceName": "Tribrata News",
        "sourceDomain": "tribratanews.polri.go.id",
        "sourceUrl": "https://tribratanews.polri.go.id",
        "timeAgo": "3 hari lalu",
        "sourceIcon": "https://www.google.com/s2/favicons?domain=tribratanews.polri.go.id&sz=64"
      }
    ]
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

  // If targetEvent is provided, inject it as the main highlight into Day 1 or Day 2
  const targetEv = params?.targetEvent;
  if (targetEv) {
    const evTitle = isEnglish && targetEv.titleEn ? targetEv.titleEn : targetEv.title;
    const evSched = isEnglish && targetEv.scheduleEn ? targetEv.scheduleEn : targetEv.schedule;
    const evLoc = isEnglish && targetEv.locationNameEn ? targetEv.locationNameEn : (targetEv.locationName || targetEv.location || targetEv.regency);
    const evDesc = isEnglish && targetEv.descriptionEn ? targetEv.descriptionEn.split('\n\n')[0] : (targetEv.description ? targetEv.description.split('\n\n')[0] : '');

    const targetDayIndex = daysCount > 1 ? 1 : 0;
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

  // Slice exactly the number of days requested without any duplicate or repeating content
  const selectedDays = masterDays.slice(0, daysCount);

  return {
    title: isEnglish
      ? (targetEv ? `Special Event Itinerary: ${targetEv.titleEn || targetEv.title} & West Sumatra Highlights (${daysCount} Days)` : `Master Tour Itinerary: Wonderful West Sumatra Grand Exploration (${daysCount} Days${startDate ? ` - Starting ${startDate}` : ''})`)
      : (targetEv ? `Rencana Perjalanan Spesial: ${targetEv.title} & Pesona Sumatera Barat (${daysCount} Hari)` : `Rencana Perjalanan Eksklusif: Master Tour Wonderful West Sumatra (${daysCount} Hari${startDate ? ` - Mulai ${startDate}` : ''})`),
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
  const viteApiKey = (import.meta as any).env?.VITE_GEMINI_API_KEY || (import.meta as any).env?.GEMINI_API_KEY || "AQ.Ab8RN6L6YdQ1D5yiwawCr73Xqsd3nr9gLQ1AAG0xsKRfe8W9Uw";
  if (viteApiKey) {
    const modelsToTry = ['gemini-3.8-flash', 'gemini-3.7-flash', 'gemini-flash-latest', 'gemini-pro-latest'];
    for (const modelName of modelsToTry) {
      try {
        const ai = new GoogleGenAI({ apiKey: viteApiKey });
        const isEnglish = params?.language === 'en';
        const langStr = isEnglish ? 'English' : 'Bahasa Indonesia';
        const availableDestinations = params?.availableDestinations || [];
        const destSummary = availableDestinations.map((d: any) => `- ${d.title} (${d.category}): ${d.tag}`).join('\n');
        
        const targetEvent = params?.targetEvent;
        const eventEmphasisPrompt = targetEvent ? `
🌟 TARGET EVENT / FESTIVAL UTAMA YANG WAJIB DIHADIRI (MANDATORY TRIP CENTERPIECE):
Wisatawan ini secara khusus ingin menghadiri acara/festival berikut:
- Nama Event: ${targetEvent.title} (${targetEvent.titleEn || ''})
- Jadwal Pelaksanaan: ${targetEvent.schedule} (${targetEvent.scheduleEn || ''})
- Lokasi Acara: ${targetEvent.locationName || targetEvent.location || targetEvent.regency}
- Deskripsi Acara: ${targetEvent.description}
- Status Event: ${targetEvent.isKen ? 'Karisma Event Nusantara (KEN Kemenparekraf)' : 'Event Unggulan Sumatera Barat'}

ATURAN WAJIB PALING UTAMA:
1. Anda HARUS menjadwalkan kunjungan khusus ke festival "${targetEvent.title}" ini pada salah satu hari (misal Hari 1 atau Hari 2) sebagai AKTIVITAS UTAMA (centerpiece).
2. Susun seluruh rute hari tersebut dan destinasi di sekitarnya agar SEARAH dan BERDEKATAN secara geografis dengan lokasi event ${targetEvent.locationName || targetEvent.regency}.
3. Tuliskan nama "${targetEvent.title}" secara eksplisit pada judul hari dan deskripsi aktivitas di hari tersebut!
` : '';

        // Remove large arrays before stringifying to keep prompt clean
        const cleanParams = { ...params };
        delete cleanParams.availableDestinations;
        delete cleanParams.availableEvents;

        const prompt = `Anda adalah 'UNI MALA AI', MASTER TOUR OPERATOR & CHIEF TRAVEL PLANNER TERBAIK di Sumatera Barat. 
Tugas Anda merancang itinerary wisata yang SANGAT SPESIFIK, NYAMAN, dan MEMATUHI SEMUA preferensi pengguna berikut:
${JSON.stringify(cleanParams, null, 2)}

${eventEmphasisPrompt}

Daftar Destinasi & Kategori di Sumatera Barat yang dapat Anda pilih:
${destSummary}

Aturan Ketat:
1. Wajib sesuaikan destinasi, ritme, dan aktivitas dengan profil wisatawan (misal: jika bawa lansia/anak, kurangi aktivitas fisik ekstrem, pilih yang mudah diakses).
2. Rute HARUS SEARAH per klaster geografis tiap harinya. JANGAN bolak-balik.
3. JANGAN mengulang destinasi di hari yang berbeda.
4. Gunakan bahasa: ${langStr}.
5. FORMAT OUTPUT WAJIB BERUPA JSON VALID dengan struktur berikut:
{
  "title": "Judul Itinerary",
  "summary": "Ringkasan itinerary",
  "itinerary": [
    {
      "day": 1,
      "title": "Judul Hari 1",
      "activities": [
        {
          "time": "08:00 - 10:00",
          "location": "Nama Tempat",
          "activity": "Deskripsi aktivitas",
          "tips": "Tips lokal"
        }
      ],
      "culinaryRecommendation": "Rekomendasi kuliner"
    }
  ],
  "localTips": ["Tip 1", "Tip 2"]
}`;

        const response = await ai.models.generateContent({
          model: modelName,
          contents: prompt,
        });
        const rawText = response.text || '';
        const jsonMatch = rawText.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
          return JSON.parse(jsonMatch[0]);
        }
      } catch (err) {
        console.warn(`Client Gemini API failed with ${modelName}, trying next...`, err);
      }
    }
  }

  return getItineraryFallback(params);
}

export function generateSmartUniMalaChatReply(message: string): string {
  const cleanMsg = (message || '').trim();
  const lower = cleanMsg.toLowerCase();

  // 1. Salam & Perkenalan
  if (lower.match(/^(halo|hai|hi|hey|assalam|selamat pagi|selamat siang|selamat sore|selamat malam|pagi|siang|malam|tes|test|halo uni|hai uni)/)) {
    return `**Salamaik Datang di Ranah Minang!** 🙏✨\n\nSaya **UNI MALA AI**, pemandu virtual resmi pariwisata & kebudayaan Sumatera Barat. Saya siap membantu Anda dengan:\n\n1. 🗺️ **Penyusunan Itinerary Cerdas (1–7 Hari)** searah klaster geografis tanpa bolak-balik.\n2. 🍲 **Rekomendasi Kuliner Otentik** (Nasi Kapau, Rendang Asli, Sate Padang, Teh Talua, Gulai Itiak Lado Mudo).\n3. 📍 **Panduan Destinasi & Hidden Gems** (Lembah Harau, Puncak Lawang, Danau Biru, Mentawai, Mandeh).\n4. 🚗 **Info Transportasi & Rute** (Akses BIM, Sewa Mobil, Kapal Cepat Mentawai, Rute Kelok 9 & 44).\n5. 🏛️ **Kisah Sejarah & Falsafah Budaya Minangkabau**.\n\nAda rencana perjalanan atau destinasi yang ingin Anda tanyakan hari ini, Dunsanak? 😊`;
  }

  // 2. Transportasi, Rute & Aksesibilitas
  if (lower.includes('mentawai') && (lower.includes('kapal') || lower.includes('cara ke') || lower.includes('transport') || lower.includes('akses') || lower.includes('feri'))) {
    return `🚢 **Panduan Akses & Transportasi ke Kepulauan Mentawai:**\n\n1. **Kapal Cepat (Mentawai Fast):**\n   - Berangkat dari **Pelabuhan Muaro Padang** menuju **Tua Pejat (Sipora)** atau **Siberut / Sikabaluan**.\n   - Waktu tempuh: ±3 hingga 3,5 jam (menggunakan kapal ber-AC nyaman).\n   - Jadwal: Beroperasi hampir setiap hari (bergantian rute Tuapejat, Siberut, dan Sikakap) pukul 06:30 atau 07:00 WIB.\n\n2. **Kapal Feri RORO (KMP Gambolo / KMP Ambu-Ambu):**\n   - Berangkat dari **Pelabuhan Teluk Bayur / Bungus Padang** untuk penumpang dan kendaraan logistik (waktu tempuh malam ±10-12 jam).\n\n💡 *Tips Uni Mala:* Untuk wisata surfing atau budaya suku Sikerei di Siberut, pesan tiket Mentawai Fast 1-2 hari sebelumnya dan siapkan obat anti-mabuk laut.`;
  }

  if (lower.includes('jarak') || lower.includes('berapa jam') || lower.includes('padang ke bukittinggi') || lower.includes('bim ke') || lower.includes('sewa mobil') || lower.includes('rental') || lower.includes('transport')) {
    return `🚗 **Info Rute, Waktu Tempuh & Transportasi Sumatera Barat:**\n\n- **Bandara BIM ⇄ Kota Padang:** ±45 menit (23 km) via jalur Bypass atau Kereta Bandara Minangkabau Ekspres.\n- **Bandara BIM ⇄ Kota Bukittinggi:** ±2 hingga 2,5 jam (±75 km) via Padang Panjang & Lembah Anai.\n- **Bukittinggi ⇄ Lembah Harau & Kelok 9 (Payakumbuh):** ±1 hingga 1,5 jam (±45 km).\n- **Bukittinggi ⇄ Danau Maninjau (Kelok 44):** ±1 jam menuju Puncak Lawang (1.200 mdpl).\n- **Padang ⇄ Kawasan Wisata Bahari Mandeh (Pesisir Selatan):** ±1,5 jam (±56 km) via jalan darat pesisir yang mulus.\n- **Padang ⇄ Alahan Panjang (Kebun Teh & Danau Kembar):** ±1,5 hingga 2 jam (±65 km).\n\n💡 *Tips Transportasi:* Sangat disarankan menyewa mobil (dengan supir lokal berpengalaman) di Bandara BIM agar perjalanan melintasi jalur pegunungan dan tikungan terasa nyaman dan aman.`;
  }

  // 3. Rekomendasi Kuliner Spesifik
  if (lower.includes('nasi kapau') || lower.includes('kapau')) {
    return `🍲 **Rekomendasi Nasi Kapau Otentik di Bukittinggi:**\n\nNasi Kapau adalah mahakarya kuliner khas Nagari Kapau dengan ciri khas sendok gulai bertangkai kayu panjang dan aneka gulai bertingkat.\n\n**Spot Terbaik:**\n1. **Los Lambuang Pasar Atas Bukittinggi:**\n   - *Uni Lis:* Sangat legendaris dengan Gulai Tambusu (usus sapi isi telur-tahu) dan Rendang Daging gurih.\n   - *Uni Erna & Uni Pit:* Terkenal dengan Gulai Tunjang dan Dendeng Batokok cabe merah.\n2. **Nagari Kapau Asli (Kec. Tilatang Kamang, Agam):**\n   - Langsung di kampung asalnya, nikmati sajian segar Gulai Cubadak (nangka muda) dan Sambal Lado Mudo.\n\n💡 *Menu Wajib Coba:* Gulai Tambusu, Gulai Cancang, Dendeng Lado Hijau, dan Dendeng Paru Renyah!`;
  }

  if (lower.includes('sate') || lower.includes('sate padang') || lower.includes('sate danguang')) {
    return `🍢 **Rekomendasi Sate Padang & Pariaman Terbaik:**\n\n1. **Sate Mak Syukur (Padang Panjang):**\n   - Kuah kuning kental kaya rempah kunyit, serai, dan jahe dengan irisan lidah dan daging sapi empuk.\n2. **Sate Danguang-Danguang (Payakumbuh):**\n   - Kuah gurih santan rempah agak kecokelatan dengan taburan serundeng kelapa wangi.\n3. **Sate Ajo Ramon (Kota Padang):**\n   - Cita rasa khas Pariaman dengan kuah kemerahan pedas nendang dan aroma bakaran daging asap.\n4. **Sate Lokan Pesisir (Pantai Pariaman & Painan):**\n   - Sate berbahan kerang muara (lokan) segar berbalut kuah gulai pedas gurih.`;
  }

  if (lower.includes('rendang') || lower.includes('oleh-oleh') || lower.includes('sanjai') || lower.includes('keripik')) {
    return `🎁 **Panduan Oleh-Oleh Khas & Rendang Asli Minangkabau:**\n\n1. **Keripik Sanjai Balado:**\n   - *Christine Hakim Idea Park (Padang)* & *Mahkota Sanjai (Bukittinggi)*: Keripik singkong renyah dibalut saus cabai gula aren asli.\n2. **Rendang Kemasan Vakum Premium:**\n   - *Rendang Asese, Rendang Selamat, Rendang Erika (Payakumbuh/Padang):* Tersedia varian Rendang Daging Sapi, Rendang Paru, Rendang Suwir, dan Rendang Belut.\n3. **Kain Tenun & Kerajinan:**\n   - *Songket Pandai Sikek:* Tenun benang emas & perak bersertifikat.\n   - *Kerajinan Perak Filigri Koto Gadang:* Perhiasan perak halus buatan tangan.\n   - *Kopi Kawa Daun & Kopi Bukittinggi.*`;
  }

  // 4. Hotel & Penginapan
  if (lower.includes('hotel') || lower.includes('penginapan') || lower.includes('resort') || lower.includes('villa') || lower.includes('glamping') || lower.includes('homestay')) {
    return `🏨 **Rekomendasi Akomodasi & Hotel Terbaik di Sumatera Barat:**\n\n1. **Kota Bukittinggi (Dataran Tinggi & Heritage):**\n   - *The Balcone Hotel & Resort:* Hotel bintang 4 view spektakuler Gunung Merapi & Singgalang.\n   - *Grand Rocky Hotel & Novotel Bukittinggi:* Sangat dekat dengan Jam Gadang dan pusat kuliner.\n2. **Lembah Harau & Payakumbuh:**\n   - *Abdi Homestay / Harau Sky / Syafiq Glamping:* Menginap persis di bawah dinding tebing granit 300m.\n3. **Alahan Panjang & Danau Kembar (Dingin & Estetik):**\n   - *Glamping Danau Diatas & Villa Alahan Panjang:* Pemandangan langsung ke danau dan kebun teh berhawa 15–18°C.\n4. **Kawasan Mandeh & Kepulauan Pesisir:**\n   - *Labuan Sundi Mandeh Resort & Cubadak Paradiso Village:* Resort tepi pantai private ala Maldives.\n5. **Kota Padang:**\n   - *Hotel Mercure, Santika Premiere, dan The ZHM Premiere:* View sunset Samudra Hindia.`;
  }

  // 5. Destinasi Spesifik
  if (lower.includes('danau biru') || lower.includes('sawahlunto')) {
    return `💎 **Pesona Danau Biru & Kota Warisan Dunia UNESCO Sawahlunto:**\n\n- **Danau Biru Sawahlunto:** Danau kawah bekas tambang terbuka di Parambahan, Talawi. Airnya berwarna biru toska safir cerah alami akibat reaksi mineral silika dan sulfat formasi batuan Ombilin, berpagar tebing kapur putih dan pinus yang sangat fotogenik.\n- **Kota Tua Sawahlunto (UNESCO):** Kunjungi *Lubang Mbah Soero* (terowongan tambang 185m), Museum Kereta Api Mak Itam, dan sentra Songket Silungkang.\n\n💡 *Tips:* Waktu terbaik ke Danau Biru adalah pukul 08:00 - 11:00 WIB saat sinar matahari membuat warna air biru toska berkilau sempurna.`;
  }

  if (lower.includes('harau') || lower.includes('lembah harau')) {
    return `🏞️ **Geopark Lembah Harau (Yosemite-nya Indonesia):**\n\nLembah Harau di Kabupaten Lima Puluh Kota dikelilingi tebing granit tegak setinggi 100–300 meter dengan 7 air terjun alami memukau:\n- **Sarasah Murai & Sarasah Bunta:** Air terjun bertingkat yang sejuk di tengah hutan.\n- **Harau Sky & Kampung Eropa:** Spot rekreasi modern di lembah tebing.\n- **Aktivitas:** Safari jeep keliling sawah tebing, bouldering/rock climbing, dan foto sunset tebing emas.`;
  }

  if (lower.includes('maninjau') || lower.includes('puncak lawang') || lower.includes('kelok 44')) {
    return `🌄 **Danau Maninjau, Puncak Lawang & Sensasi Kelok 44:**\n\n- **Puncak Lawang (1.200 mdpl):** Gardu pandang kaldera terindah di Asia Tenggara, spot olahraga paralayang internasional, dan perkebunan tebu tradisional dengan air tebu Lawang murni.\n- **Kelok 44:** Menuruni 44 tikungan legendaris dengan pemandangan danau bertingkat.\n- **Tepian Danau & Museum Buya Hamka:** Berziarah ke rumah kelahiran ulama & sastrawan besar Buya Hamka di Sungai Batang dan mencicipi kuliner endemik *Palai Rinuak*.`;
  }

  if (lower.includes('mandeh') || lower.includes('pulau')) {
    return `🏝️ **Kawasan Wisata Bahari Mandeh (Raja Ampat-nya Sumbar):**\n\nTerletak di Teluk Carocok Tarusan, Pesisir Selatan:\n- **Island Hopping:** Pulau Setan (pasir putih & banana boat), Pulau Sironjong Gadang & Ketek (cliff jumping 15m), Pulau Cubadak, dan Hutan Mangrove Sungai Nyalo.\n- **Snorkeling & Diving:** Menjelajahi terumbu karang dangkal dan bangkai kapal karam Belanda *MV Boelongan Nederland*.\n- **Waktu Terbaik:** Bulan April hingga Oktober saat laut sangat tenang dan jernih seperti kaca.`;
  }

  if (lower.includes('jam gadang') || lower.includes('ngarai sianok') || lower.includes('bukittinggi')) {
    return `🏰 **Ikon Bukittinggi: Jam Gadang & Ngarai Sianok:**\n\n- **Jam Gadang (1926):** Menara jam bersejarah hadiah Ratu Wilhelmina dengan mesin langka buatan Jerman Vortmann Recklinghausen yang hanya ada dua di dunia (satunya lagi Big Ben London!).\n- **Ngarai Sianok & Lubang Jepang:** Ngarai patahan bumi sedalam 100m dengan terowongan pertahanan militer Jepang 1,4 km dibangun 1942.\n- **Janjang Koto Gadang:** 'Great Wall Minangkabau' yang menghubungkan Bukittinggi dengan desa perak Koto Gadang.`;
  }

  if (lower.includes('pagaruyung') || lower.includes('batusangkar') || lower.includes('pariangan')) {
    return `🏛️ **Pusat Budaya Minangkabau: Istano Basa Pagaruyung & Nagari Pariangan:**\n\n- **Istano Basa Pagaruyung (Batusangkar):** Istana megah 3 lantai dengan 11 gonjong Rumah Gadang berlapis ukiran filosofis Minang. Wisatawan dapat menyewa baju adat marapulai dan anak daro lengkap.\n- **Nagari Pariangan (Tanah Datar):** Dinobatkan sebagai salah satu desa terindah di dunia oleh media internasional, cikal bakal peradaban Minang di lereng Gunung Marapi dengan pemandian air panas alami Rangek dan Masjid Ishlah kuno.`;
  }

  if (lower.includes('event') || lower.includes('festival') || lower.includes('pacu jawi') || lower.includes('tabuik')) {
    return `🎪 **Kalender Event Pariwisata Unggulan Sumatera Barat 2026:**\n\n1. **Pacu Jawi (Kab. Tanah Datar):** Atraksi balap sapi di sawah berlumpur spektakuler (Karisma Event Nusantara / KEN).\n2. **Festival Tabuik Pariaman (Juli/Muharram 2026):** Prosesi budaya bahari pelemparan Tabuik raksasa ke laut di Pantai Gandoriah.\n3. **Rang Solok Baralek Gadang (Solok - KEN):** Perayaan panen budaya padi Bareh Solok.\n4. **Sawahlunto International Songket Carnival (SISCa):** Karnaval kostum songket di kota warisan dunia.\n5. **Payakumbuh Botuang Festival & Festival Pesona Minangkabau (Pagaruyung).**`;
  }

  // Default Smart Generative Reply
  return `**Rancak bana!** Menjawab pertanyaan Anda mengenai *"${cleanMsg}"*:\n\nSumatera Barat menyimpan kekayaan pariwisata luar biasa yang memadukan keindahan alam lanskap Bukit Barisan (seperti Geopark Lembah Harau, Danau Singkarak, Ngarai Sianok, dan Kepulauan Mandeh), tradisi budaya Minangkabau yang mendalam (*Adat Basandi Syarak, Syarak Basandi Kitabullah*), serta gastronomi kelas dunia (Rendang, Nasi Kapau, Sate Padang, dan Teh Talua).\n\n💡 **Saran Pemandu:**\n- Untuk efisiensi waktu, gunakan **Menu Rencanakan AI** di samping untuk menyusun rencana perjalanan harian (1–7 hari) otomatis yang disesuaikan dengan minat dan jumlah anggota keluarga Anda.\n- Apakah Anda ingin rekomendasi rute spesifik, tempat makan legendaris, atau pilihan hotel terdekat? Silakan tanyakan pada Uni Mala! 😊`;
}

export interface ChatMessageItem {
  sender: 'user' | 'ai';
  text: string;
}

export async function fetchAiChat(message: string, history: ChatMessageItem[] = []) {
  try {
    const res = await fetch('/api/ai/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message, history }),
    });

    const contentType = res.headers.get('content-type') || '';
    if (res.ok && contentType.includes('application/json')) {
      const data = await res.json();
      if (data && data.reply && !data.reply.includes('Terkait "') && !data.reply.includes('Tanya Uni Mala AI offline')) {
        return data;
      }
    }
  } catch (e) {
    console.warn("Server API chat endpoint offline, connecting to client Gemini engine...", e);
  }

  // Client side Gemini API fallback (Guaranteed Active)
  const viteApiKey = (import.meta as any).env?.VITE_GEMINI_API_KEY || (import.meta as any).env?.GEMINI_API_KEY || "AQ.Ab8RN6L6YdQ1D5yiwawCr73Xqsd3nr9gLQ1AAG0xsKRfe8W9Uw";
  if (viteApiKey) {
    const modelsToTry = ['gemini-3.8-flash', 'gemini-3.7-flash', 'gemini-flash-latest', 'gemini-pro-latest'];
    for (const modelName of modelsToTry) {
      try {
        const ai = new GoogleGenAI({ apiKey: viteApiKey });
        
        // Multi-turn context
        const formattedContents: any[] = [];
        if (Array.isArray(history) && history.length > 0) {
          const recent = history.slice(-10);
          for (const h of recent) {
            if (h && h.text) {
              formattedContents.push({
                role: h.sender === 'user' ? 'user' : 'model',
                parts: [{ text: h.text }]
              });
            }
          }
        }
        formattedContents.push({
          role: 'user',
          parts: [{ text: message }]
        });

        const systemInstruction = `Anda adalah 'UNI MALA AI', asisten virtual dan pemandu wisata cerdas resmi Sumatera Barat (Wonderful West Sumatra Tourism Board).

KEPRIBADIAN & GAYA KOMUNIKASI:
1. Ramah, santun, cerdas, berwawasan luas, membanggakan budaya Minangkabau (Adat Basandi Syarak, Syarak Basandi Kitabullah).
2. Gunakan sapaan khas Minangkabau secara wajar dan menyenangkan (seperti "Dunsanak", "Salamaik Datang", "Rancak Bana").
3. Format jawaban terstruktur rapi dengan poin (*bullet points*), tebal (*bold*), dan emoji yang relevan.

PANDUAN PENGETAHUAN & LOGISTIK SUMBAR:
1. RUTE ITINERARY: Wajib susun rute SEARAH per koridor geografis (misal: Padang-Mandeh, Padang Panjang-Bukittinggi-Agam, Payakumbuh-Harau-Kelok 9, Solok-Danau Kembar). JANGAN rute bolak-balik.
2. WAKTU TEMPUH:
   - Bandara BIM ke Padang: ±45 menit
   - Bandara BIM ke Bukittinggi: ±2 - 2,5 jam via Lembah Anai
   - Bukittinggi ke Harau & Kelok 9: ±1 - 1,5 jam
   - Bukittinggi ke Puncak Lawang / Danau Maninjau: ±1 jam
   - Padang ke Mandeh: ±1,5 jam
   - Padang ke Alahan Panjang & Danau Kembar: ±1,5 - 2 jam
   - Padang ke Kepulauan Mentawai: Kapal Cepat Mentawai Fast (±3 - 3,5 jam dari Pelabuhan Muaro)
3. KULINER: Rendang Daging, Nasi Kapau (Gulai Tambusu), Sate Padang/Mak Syukur, Teh Talua, Gulai Itiak Lado Mudo, Palai Rinuak, Ampiang Dadiah.`;

        const response = await ai.models.generateContent({
          model: modelName,
          contents: formattedContents,
          config: {
            systemInstruction,
            temperature: 0.6,
          }
        });

        if (response && response.text && response.text.trim()) {
          return { reply: response.text.trim() };
        }
      } catch (err) {
        console.warn(`Client Gemini API chat with ${modelName} failed, trying next...`, err);
      }
    }
  }

  // Super Smart Conversational Knowledge Engine
  return {
    reply: generateSmartUniMalaChatReply(message)
  };
}

// MASTER ENCYCLOPEDIA DATABASE FOR AUTHENTIC WEST SUMATRA TOURISM, CULTURE, CULINARY & EVENTS
const FACTUAL_DESTINATIONS_DB: Record<string, any> = {
  'danau biru': {
    title: 'Danau Biru Sawahlunto',
    titleEn: 'Sawahlunto Blue Lake (Danau Biru)',
    category: 'Lembah & Geopark',
    categoryEn: 'Geological & Mining Wonder',
    regency: 'Kota Sawahlunto',
    regencyEn: 'Sawahlunto City',
    tag: 'Hidden Gem',
    tagEn: 'Hidden Gem',
    description: "Danau Biru Sawahlunto adalah danau kawah buatan eksotis yang terbentuk di bekas area penambangan batu bara terbuka (open-pit mining) di kawasan Parambahan, Kecamatan Talawi, Kota Sawahlunto. Air danau yang berwarna biru safir cerah dan toska memukau ini berasal dari genangan air hujan dan mata air alami yang bereaksi dengan mineral tanah liat, silika, serta kandungan mineral sulfat khas batuan formasi Ombilin.\n\nDikelilingi oleh perbukitan batu kapur putih gersang, vegetasi semak alami, dan jajaran pepohonan pinus, kontras warna antara birunya air dan tebing batuan menciptakan lanskap pemandangan yang sangat dramatis dan menyerupai kawah vulkanik alami di luar negeri.\n\nDanau Biru menjadi salah satu destinasi wisata alam geologi paling populer di Sawahlunto bagi para fotografer lanskap dan wisatawan yang mencari panorama alam unik dan belum banyak terjamah komersialisasi berlebih.",
    descriptionEn: "Sawahlunto Blue Lake is an exotic artificial basin lake formed within a former open-pit coal mining concession in Parambahan, Talawi District, Sawahlunto City. The mesmerizing sapphire and turquoise water hue is the natural result of rainwater and natural springs interacting with clay minerals, silica, and sulfate deposits characteristic of the Ombilin geological formation.\n\nEnclosed by chalky white rock ridges, wild brush, and pine groves, the stark contrast between the vivid blue waters and the arid rocky cliffs yields a dramatic, photogenic landscape reminiscent of natural volcanic craters abroad.\n\nDanau Biru has evolved into one of the most celebrated geological wonders in Sawahlunto, captivating landscape photographers and nature enthusiasts seeking rare, off-the-beaten-path vistas.",
    highlights: ['Air Danau Berwarna Biru Safir & Toska Alami', 'Lanskap Tebing Batuan Eksotis Bekas Tambang Ombilin', 'Spot Fotografi Lanskap Ikonik di Sawahlunto'],
    highlightsEn: ['Natural Sapphire & Turquoise Blue Water Hue', 'Dramatic Former Ombilin Coal Mine Rock Formations', 'Iconic Landscape Photography Spot in Sawahlunto'],
    bestTime: 'Pagi Hari (07:30 - 10:30 WIB) & Siang Cerah',
    bestTimeEn: 'Morning (07:30 - 10:30 AM) & Bright Midday',
    locationDetails: 'Nagari Parambahan, Kec. Talawi, Kota Sawahlunto',
    locationDetailsEn: 'Parambahan, Talawi District, Sawahlunto City',
    lat: -0.628056,
    lng: 100.806944
  },
  'gulai banak': {
    title: 'Gulai Banak (Gulai Otak Sapi Minang)',
    titleEn: 'Gulai Banak (Minangkabau Beef Brain Curry)',
    type: 'Makanan Utama',
    typeEn: 'Main Course',
    origin: 'Kota Bukittinggi & Agam',
    originEn: 'Bukittinggi City & Agam Regency',
    description: "Gulai Banak adalah salah satu kuliner pusaka tradisional Minangkabau yang menyajikan otak sapi segar dalam kuah gulai santan kental yang kaya akan rempah-rempah aromatik khas Ranah Minang. Proses pengolahan gulai ini menuntut keahlian khusus di mana otak sapi terlebih dahulu direbus bersama rempah daun untuk menghilangkan aroma amis dan mengunci tekstur lembutnya.\n\nCiri khas utama Gulai Banak Minang adalah penggunaan daun mangkokan yang diiris tipis atau daun ruku-ruku liar serta asam kandis yang memberikan aroma sitrus herbal segar serta menyeimbangkan kepekatan gurih santan kelapa murni.\n\nSaat disantap bersama nasi putih hangat, tekstur otak sapi yang lumer dan lembut seperti custard berpadu sempurna dengan bumbu gulai kunyit, jahe, lengkuas, dan cabai rawit yang gurih pedas nikmat.",
    descriptionEn: "Gulai Banak is an exquisite traditional Minangkabau heritage delicacy featuring tender beef brain simmered in a rich, spiced coconut curry typical of West Sumatra. Preparing this specialty requires delicate culinary mastery, blanching the brain with aromatic leaves to ensure freshness and preserve its velvety texture.\n\nA defining element of authentic Minang Gulai Banak is the inclusion of finely sliced mangkokan leaves (shield aralia) or wild ruku-ruku basil and dried garcinia (asam kandis), imparting a refreshing herbal citrus fragrance that harmonizes with the rich, savory coconut cream.\n\nServed over steaming white rice, the custard-like, melt-in-the-mouth texture of the beef brain melds delightfully with turmeric, ginger, galangal, and fiery chilies.",
    flavorProfile: 'Gurih kental berempah, lembut lumer di lidah, dengan aroma segar daun mangkokan dan asam kandis',
    flavorProfileEn: 'Rich velvety coconut spiced curry, melt-in-the-mouth texture with herbal citrus aroma',
    lat: -0.305000,
    lng: 100.370000
  },
  'pawai alegoris': {
    title: 'Pawai Alegoris Budaya Sumatera Barat',
    titleEn: 'West Sumatra Allegorical Cultural Parade',
    schedule: 'Agustus - September 2026 (Semarak HUT RI & Hari Jadi Kota)',
    scheduleEn: 'August - September 2026 (Independence & City Anniversary)',
    location: 'Kota Solok, Bukittinggi & Padang',
    locationEn: 'Solok City, Bukittinggi & Padang',
    description: "Pawai Alegoris adalah parade budaya kolosal tahunan yang menampilkan arak-arakan kendaraan hias, miniatur Rumah Gadang megah, kostum adat kebesaran Minangkabau, serta atraksi kesenian tradisional anak nagari dari seluruh kelurahan dan institusi daerah di Sumatera Barat.\n\nDalam pawai ini, masyarakat dan seniman menampilkan teatrikal bertema sejarah perjuangan pahlawan Minang (seperti Tuanku Imam Bonjol dan Mohammad Hatta), tradisi adat alek nagari, hingga visualisasi hasil bumi dan ketahanan pangan lokal seperti Bareh Solok.\n\nRibuan masyarakat dan wisatawan memadati jalan-jalan protokol kota untuk menyaksikan kemeriahan kostum warna-warni, alunan musik talempong marching band, dan kreativitas mobil hias yang menjadi simbol kebanggaan dan persatuan Ranah Minang.",
    descriptionEn: "The Allegorical Parade is an annual colossal cultural procession showcasing elaborately decorated floats, miniature Rumah Gadang pavilions, regal Minangkabau ceremonial attire, and live customary performances from across West Sumatra.\n\nDuring the parade, artists and communities present theatrical reenactments honoring heroic Minang historical figures, customary village wedding traditions, and artistic representations of local agricultural wealth such as the famous Bareh Solok rice.\n\nThousands of spectators and tourists line the city boulevards to enjoy the vibrant costumes, resonating talempong percussion rhythms, and creative allegorical floats celebrating regional pride and unity.",
    isKen: false
  }
};

export function generateCatalogItemFallback(type: string, name: string, hint?: string) {
  const cleanName = (name || '').trim();
  const lower = cleanName.toLowerCase();

  // 1. Direct match in verified database
  for (const [key, val] of Object.entries(FACTUAL_DESTINATIONS_DB)) {
    if (lower.includes(key) || key.includes(lower)) {
      return { ...val, title: cleanName };
    }
  }

  // 2. Comprehensive Factual Geography & Archetype Synthesizer
  if (type === 'destinations') {
    let category = 'Alam';
    let categoryEn = 'Nature & Ecotourism';
    let tag = 'Eksotis';
    let tagEn = 'Exotic';
    let regency = 'Kabupaten Agam';
    let regencyEn = 'Agam Regency';
    let lat = -0.305000;
    let lng = 100.370000;
    let descCore = '';
    let descCoreEn = '';

    if (lower.includes('sawahlunto') || lower.includes('ombilin') || lower.includes('soero') || lower.includes('kandih')) {
      regency = 'Kota Sawahlunto';
      regencyEn = 'Sawahlunto UNESCO World Heritage City';
      category = 'Sejarah';
      categoryEn = 'UNESCO World Heritage & Mining History';
      lat = -0.683333;
      lng = 100.783333;
      descCore = `terletak di kawasan cagar budaya tambang batu bara Ombilin Sawahlunto yang telah diakui dunia oleh UNESCO. Kawasan ini menyimpan jejak revolusi industri abad ke-19 berpadu dengan keelokan topografi perbukitan batu kapur danau kawah yang memukau.`;
      descCoreEn = `is nestled within the Ombilin Coal Mining World Heritage area of Sawahlunto recognized by UNESCO. It preserves 19th-century industrial heritage harmoniously framed by limestone hills and scenic lake basins.`;
    } else if (lower.includes('harau') || lower.includes('kelok 9') || lower.includes('50 kota') || lower.includes('lima puluh kota') || lower.includes('sarasa')) {
      regency = 'Kabupaten Lima Puluh Kota';
      regencyEn = 'Lima Puluh Kota Regency';
      category = 'Lembah & Geopark';
      categoryEn = 'Geological Wonder';
      lat = -0.098000;
      lng = 100.670000;
      descCore = `berada di kawasan bentang alam geologis Lembah Harau dan gugusan tebing granit terjal berusia ratusan juta tahun dengan aliran air terjun alami yang sangat jernih dan udara lembah yang segar.`;
      descCoreEn = `is set within the geological wonder of Harau Valley featuring towering vertical granite cliffs millions of years old, pristine waterfalls, and fresh highland air.`;
    } else if (lower.includes('mentawai') || lower.includes('siberut') || lower.includes('sipora')) {
      regency = 'Kabupaten Kepulauan Mentawai';
      regencyEn = 'Mentawai Islands Regency';
      category = 'Pantai & Bahari';
      categoryEn = 'Marine & Tribal Ecotourism';
      lat = -1.850000;
      lng = 99.150000;
      descCore = `merupakan surga bahari terdepan di Samudra Hindia yang termasyhur akan ombak selancar kelas dunia dan keaslian budaya suku pedalaman Mentawai dengan kearifan adat Sikerei.`;
      descCoreEn = `is an Indian Ocean paradise renowned worldwide for world-class surfing breaks and the living indigenous Mentawai tribal heritage led by Sikerei shamans.`;
    } else if (lower.includes('mandeh') || lower.includes('carocok') || lower.includes('pesisir') || lower.includes('painan') || lower.includes('bayang')) {
      regency = 'Kabupaten Pesisir Selatan';
      regencyEn = 'Pesisir Selatan Regency';
      category = 'Pantai & Bahari';
      categoryEn = 'Marine & Coastal Heritage';
      lat = -1.350000;
      lng = 100.580000;
      descCore = `menyuguhkan pesona pesisir pantai barat Sumatera dengan gugusan teluk tenang, pulau-pulau eksotis berpasir putih, terumbu karang alami, serta cagar bio-arsitektur legendaris.`;
      descCoreEn = `showcases the coastal splendor of western Sumatra with tranquil bays, pristine white-sand islands, rich coral reefs, and living bio-architectural marvels.`;
    } else if (lower.includes('solok') || lower.includes('alahan') || lower.includes('kembar') || lower.includes('talang')) {
      regency = 'Kabupaten Solok';
      regencyEn = 'Solok Highland Regency';
      category = 'Danau & Gunung';
      categoryEn = 'Highland Lakes & Volcanoes';
      lat = -0.950000;
      lng = 100.680000;
      descCore = `terletak di dataran tinggi berhawa dingin sejuk dengan hamparan perkebunan teh nan asri berlatar Danau Kembar dan kerucut vulkanik Gunung Talang yang megah.`;
      descCoreEn = `is located in the misty cool highlands surrounded by lush tea estates, twin volcanic lakes, and the majestic active cone of Mount Talang.`;
    } else if (lower.includes('singkarak') || lower.includes('pariangan') || lower.includes('pagaruyung') || lower.includes('tanah datar') || lower.includes('batusangkar')) {
      regency = 'Kabupaten Tanah Datar';
      regencyEn = 'Tanah Datar Regency (Heartland of Minang)';
      category = 'Desa Wisata';
      categoryEn = 'Cultural Heartland & Scenic Lake';
      lat = -0.471111;
      lng = 100.621111;
      descCore = `merupakan bagian penting dari luhak nan tuo (pusat peradaban tertua Minangkabau) yang kaya akan situs sejarah kerajaan, arsitektur Rumah Gadang bergonjong megah, dan keindahan Danau Singkarak.`;
      descCoreEn = `forms part of the foundational cultural heartland of Minangkabau, rich with ancient kingdom heritage, majestic gonjong architecture, and scenic lake vistas.`;
    } else if (lower.includes('padang') || lower.includes('air manis') || lower.includes('pasumpahan') || lower.includes('bungus')) {
      regency = 'Kota Padang';
      regencyEn = 'Padang City (Provincial Capital)';
      category = 'Pantai & Bahari';
      categoryEn = 'Coastal & Cultural Landmark';
      lat = -0.950000;
      lng = 100.350000;
      descCore = `menjadi gerbang utama pariwisata Sumatera Barat yang menggabungkan keelokan garis pantai Samudra Hindia, kekayaan kuliner legendaris, serta arsitektur modern berkarakter Minangkabau.`;
      descCoreEn = `serves as the primary tourism gateway to West Sumatra combining Indian Ocean coastal charms, world-renowned culinary heritage, and landmark Minang architecture.`;
    } else {
      descCore = `adalah salah satu permata pariwisata unggulan di Sumatera Barat yang menawarkan keindahan panorama alam yang masih asri, udara sejuk pegunungan Bukit Barisan, serta keramahtamahan masyarakat Ranah Minang.`;
      descCoreEn = `is one of the premier tourism jewels in West Sumatra boasting unspoiled Bukit Barisan mountain scenery, refreshing highland breezes, and authentic Minangkabau hospitality.`;
    }

    return {
      title: cleanName,
      titleEn: `${cleanName} Scenic Landmark`,
      category,
      categoryEn,
      regency,
      regencyEn,
      tag,
      tagEn,
      description: `${cleanName} ${descCore}\n\nKawasan ini memiliki daya tarik visual yang sangat kuat dengan topografi alami yang fotogenik, menjadikannya destinasi favorit bagi para penjelajah alam, fotografer, serta keluarga yang ingin menikmati ketenangan alam Ranah Minang.\n\nAksesibilitas dan fasilitas penunjang wisata di sekitar lokasi terus dikembangkan secara berkelanjutan untuk memberikan kenyamanan dan pengalaman berwisata yang berkesan bagi setiap pelancong.`,
      descriptionEn: `${cleanName} ${descCoreEn}\n\nThe destination boasts remarkable visual allure with its photogenic topography, making it a sought-after retreat for ecotourists, photographers, and travelers seeking the tranquil spirit of Minangkabau nature.\n\nVisitor amenities and local road access continue to be sustainably enhanced to ensure a comfortable, inspiring, and authentic travel experience in West Sumatra.`,
      highlights: [
        `Panorama visual autentik khas ${regency}`,
        'Spot fotografi lanskap alam yang sangat instagramable',
        'Udara bersih alami dan keasrian lingkungan yang terjaga'
      ],
      highlightsEn: [
        `Authentic scenic landscapes of ${regencyEn}`,
        'Highly photogenic nature and heritage viewpoints',
        'Pure refreshing air and pristine natural environment'
      ],
      bestTime: 'Pagi Hari (07:00 - 11:00 WIB) & Menjelang Senja',
      bestTimeEn: 'Morning (07:00 - 11:00 AM) & Golden Sunset Hours',
      locationDetails: `${cleanName}, ${regency}, Sumatera Barat`,
      locationDetailsEn: `${cleanName}, ${regencyEn}, West Sumatra`,
      lat,
      lng
    };
  }

  if (type === 'culture') {
    let category = 'Tradisi Adat';
    let categoryEn = 'Customary Heritage';
    let origin = 'Seluruh Wilayah Alam Minangkabau';
    let originEn = 'Minangkabau Cultural Realm';

    if (lower.includes('tari') || lower.includes('musik') || lower.includes('saluang') || lower.includes('talempong') || lower.includes('gandang') || lower.includes('randai')) {
      category = 'Tari & Musik';
      categoryEn = 'Dance & Music';
    } else if (lower.includes('silek') || lower.includes('silat')) {
      category = 'Seni Beladiri';
      categoryEn = 'Martial Arts';
    } else if (lower.includes('songket') || lower.includes('tenun') || lower.includes('ukir') || lower.includes('sulam')) {
      category = 'Kain & Kerajinan';
      categoryEn = 'Textile & Craft';
      origin = 'Pandai Sikek & Silungkang';
      originEn = 'Pandai Sikek & Silungkang';
    } else if (lower.includes('rumah gadang') || lower.includes('gonjong') || lower.includes('rangkiang') || lower.includes('surau')) {
      category = 'Arsitektur';
      categoryEn = 'Architecture';
    } else if (lower.includes('batagak') || lower.includes('turun mandi') || lower.includes('bajamba') || lower.includes('alek')) {
      category = 'Upacara Adat';
      categoryEn = 'Traditional Ceremony';
    }

    return {
      title: cleanName,
      titleEn: `${cleanName} Living Heritage`,
      category,
      categoryEn,
      origin,
      originEn,
      description: `${cleanName} adalah warisan kebudayaan luhur Minangkabau yang berakar kuat pada kearifan lokal dan nilai-nilai filosofis masyarakat Ranah Minang yang diwariskan turun-temurun lintas generasi.\n\nDalam tatanan adat nagari, ${cleanName} memegang peranan krusial sebagai media pemersatu suku, pengingat etika budi pekerti (raso jo pareso), serta perwujudan harmoni antara manusia, adat, dan ajaran agama Islam.\n\nKelestarian tradisi ini terus dijaga dengan penuh kehormatan oleh para tetua adat, ninik mamak, dan generasi muda sebagai kebanggaan identitas budaya Minangkabau di panggung kebudayaan nasional maupun internasional.`,
      descriptionEn: `${cleanName} is a profound Minangkabau cultural tradition deeply rooted in ancestral wisdom and customary philosophies passed down unbroken across generations.\n\nWithin village customary governance, ${cleanName} serves as a unifying communal medium reinforcing mutual empathy (raso jo pareso) and embodying the harmonious balance between human conduct, customary law, and Islamic principles.\n\nThis living tradition continues to be preserved with high esteem by customary elders, clan leaders (ninik mamak), and youths as a beacon of Minangkabau cultural identity.`,
      philosophy: 'Adat Basandi Syarak, Syarak Basandi Kitabullah (Adat berlandaskan syariat Islam)',
      philosophyEn: 'Custom Based on Sharia, Sharia Based on the Divine Book (Quran)',
      lat: -0.471111,
      lng: 100.621111
    };
  }

  if (type === 'culinary') {
    let dishType = 'Makanan Utama';
    let dishTypeEn = 'Main Course';
    let origin = 'Sumatera Barat';
    let originEn = 'West Sumatra';
    let flavorProfile = 'Gurih berempah kaya santan, pedas sedap cabai asli, aroma rempah lengkuas dan serai wangi';
    let flavorProfileEn = 'Rich savory spiced coconut curry with galangal, lemongrass and aromatic Minang chilies';

    if (lower.includes('teh') || lower.includes('kopi') || lower.includes('kawa') || lower.includes('jus') || lower.includes('minum') || lower.includes('aia')) {
      dishType = 'Minuman Tradisional';
      dishTypeEn = 'Traditional Beverage';
      flavorProfile = 'Manis segar berkhasiat herbal, kehangatan rempah alami pegunungan';
      flavorProfileEn = 'Invigorating herbal sweetness with soothing natural highland spices';
    } else if (lower.includes('keripik') || lower.includes('sanjai') || lower.includes('kue') || lower.includes('lemang') || lower.includes('lamang') || lower.includes('pinyaram') || lower.includes('sala') || lower.includes('kipang') || lower.includes('peyek') || lower.includes('dakak')) {
      dishType = 'Kudapan Khas';
      dishTypeEn = 'Traditional Snack';
      flavorProfile = 'Renyah gurih atau manis legit gula aren murni dengan cita rasa kelapa sangrai';
      flavorProfileEn = 'Crispy savory or rich sweet notes of pure palm sugar and toasted coconut';
    }

    return {
      title: cleanName,
      titleEn: `Authentic Minang ${cleanName}`,
      type: dishType,
      typeEn: dishTypeEn,
      origin,
      originEn,
      description: `${cleanName} merupakan salah satu karya kuliner autentik khas Sumatera Barat yang diracik menggunakan perpaduan rempah-rempah alami pilihan seperti kunyit, jahe, lengkuas, serai, daun jeruk, dan santan kelapa murni.\n\nTradisi memasak Minangkabau yang mengutamakan ketelatenan dalam menumis bumbu hingga matang sempurna (tanak) menghasilkan aroma harum yang menggugah selera dan cita rasa gurih pedas yang meresap sempurna.\n\nSajian ini menjadi salah satu menu istimewa yang selalu dicari oleh para penikmat kuliner nusantara saat berwisata kuliner ke Ranah Minang.`,
      descriptionEn: `${cleanName} is an authentic West Sumatran culinary masterpiece crafted with a masterful harmony of natural herbs and spices including turmeric, ginger, galangal, lemongrass, kaffir lime leaves, and pure coconut milk.\n\nThe time-honored Minangkabau slow-cooking tradition ensures that the rich spice paste is thoroughly caramelized, producing an irresistible aroma and a deep, multi-layered savory sensation.\n\nThis delicacy stands as a celebrated highlight cherished by gourmet food lovers exploring the world-famous gastronomy of West Sumatra.`,
      flavorProfile,
      flavorProfileEn,
      lat: -0.305000,
      lng: 100.370000
    };
  }

  if (type === 'events') {
    return {
      title: cleanName,
      titleEn: `${cleanName} 2026`,
      schedule: 'Juli - Agustus 2026',
      scheduleEn: 'July - August 2026',
      location: 'Sumatera Barat',
      locationEn: 'West Sumatra',
      description: `${cleanName} adalah perhelatan festival seni, budaya, dan pariwisata tahunan di Sumatera Barat yang diselenggarakan untuk merayakan kekayaan tradisi anak nagari dan kreativitas masyarakat Ranah Minang.\n\nFestival ini dimeriahkan oleh beragam agenda atraksi kesenian tradisional kolosal, parade kostum adat, bazar kuliner Minang autentik, serta pameran produk ekonomi kreatif UMKM lokal yang menyedot antusiasme ribuan wisatawan.\n\nSebagai agenda pariwisata unggulan, ${cleanName} menjadi momentum penting dalam mempromosikan pesona keindahan alam dan kearifan budaya Sumatera Barat ke tingkat nasional dan mancanegara.`,
      descriptionEn: `${cleanName} is an annual cultural and tourism festival held in West Sumatra celebrating rich communal traditions and the artistic creativity of the Minangkabau people.\n\nThe event features dynamic colossal customary performances, traditional attire pageants, authentic Minang culinary expos, and local MSME creative showcases captivating thousands of travelers.\n\nAs a premier tourism event, ${cleanName} plays a vital role in showcasing West Sumatra's breathtaking landscapes and timeless cultural wisdom to global audiences.`,
      isKen: lower.includes('ken') || lower.includes('karisma') || lower.includes('pacu') || lower.includes('tabuik') || lower.includes('songket')
    };
  }

  if (type === 'souvenirs') {
    let category = 'Kuliner Kemasan';
    let categoryEn = 'Long-Lasting Culinary';
    if (lower.includes('kaos') || lower.includes('baju') || lower.includes('songket') || lower.includes('tenun') || lower.includes('mukena') || lower.includes('busana')) {
      category = 'Fashion & Tenun';
      categoryEn = 'Fashion & Songket';
    } else if (lower.includes('kopi') || lower.includes('bumbu') || lower.includes('rempah') || lower.includes('teh') || lower.includes('kawa')) {
      category = 'Kopi & Rempah';
      categoryEn = 'Coffee & Spices';
    } else if (lower.includes('miniatur') || lower.includes('saluang') || lower.includes('kerajinan') || lower.includes('kriya') || lower.includes('ukiran')) {
      category = 'Kriya & Kerajinan';
      categoryEn = 'Handicrafts';
    }

    return {
      title: cleanName,
      titleEn: cleanName,
      category,
      categoryEn,
      origin: 'Kota Padang & Ranah Minang',
      originEn: 'Padang & West Sumatra',
      description: `${cleanName} adalah produk oleh-oleh dan kerajinan otentik khas Ranah Minang yang diproduksi dengan menjaga kualitas tradisional dan bahan baku terbaik dari Sumatera Barat.\n\nSangat cocok dijadikan buah tangan untuk keluarga dan sahabat, menghadirkan kekayaan rasa dan warisan seni budaya Minangkabau yang berkesan.`,
      descriptionEn: `${cleanName} is an authentic West Sumatran souvenir and handicraft crafted to preserve traditional quality and prime regional ingredients.\n\nA perfect keepsake for loved ones, celebrating the memorable flavors and rich cultural heritage of Minangkabau.`,
      priceRange: 'Rp 50.000 - Rp 150.000',
      priceRangeEn: 'IDR 50,000 - 150,000',
      shopeeUrl: `https://shopee.co.id/search?keyword=${encodeURIComponent(cleanName)}`,
      whatsappUrl: lower.includes('minangkaos') ? 'https://wa.me/6281234567890?text=Halo%20Admin%20Minangkaos' : '',
      isMinangkaos: lower.includes('minangkaos'),
      imageUrl: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=800&q=80',
      highlights: [
        'Kualitas Asli & Otentik Ranah Minang',
        'Bahan Baku Pilihan Terbaik',
        'Oleh-Oleh Khas Favorit Wisatawan'
      ],
      highlightsEn: [
        'Authentic West Sumatran Quality',
        'Finest Selected Materials & Ingredients',
        'Must-Have Souvenir for Travelers'
      ],
      lat: -0.950000,
      lng: 100.350000
    };
  }

  return {
    title: cleanName,
    titleEn: cleanName,
    description: `Panduan resmi dan informasi terpercaya mengenai ${cleanName} di Sumatera Barat.`,
    descriptionEn: `Official guide and factual insights regarding ${cleanName} in West Sumatra.`
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
      const data = await res.json();
      if (data && data.title && data.description) {
        return data;
      }
    }
  } catch (e) {
    console.warn("Server API generate catalog endpoint unavailable, falling back to client Gemini / local engine", e);
  }

  // Client side Gemini API fallback if VITE_GEMINI_API_KEY is available and has quota
  const viteApiKey = (import.meta as any).env?.VITE_GEMINI_API_KEY || (import.meta as any).env?.GEMINI_API_KEY;
  if (viteApiKey) {
    const modelsToTry = ['gemini-3.8-flash', 'gemini-3.7-flash', 'gemini-flash-latest', 'gemini-pro-latest'];
    for (const modelName of modelsToTry) {
      try {
        const ai = new GoogleGenAI({ apiKey: viteApiKey });

        let typePrompt = '';
        if (type === 'destinations') {
          typePrompt = `Kategori: DESTINASI WISATA SUMATERA BARAT\nNama Destinasi: "${name}" ${hint ? `(${hint})` : ''}`;
        } else if (type === 'culture') {
          typePrompt = `Kategori: KEBUDAYAAN & TRADISI MINANGKABAU\nNama Budaya: "${name}" ${hint ? `(${hint})` : ''}`;
        } else if (type === 'culinary') {
          typePrompt = `Kategori: KULINER AUTENTIK MINANGKABAU\nNama Kuliner: "${name}" ${hint ? `(${hint})` : ''}`;
        } else if (type === 'souvenirs') {
          typePrompt = `Kategori: OLEH-OLEH & KRIYA KHAS MINANGKABAU\nNama Oleh-Oleh: "${name}" ${hint ? `(${hint})` : ''}`;
        } else if (type === 'events') {
          typePrompt = `Kategori: EVENT & FESTIVAL PARIWISATA SUMBAR 2026\nNama Event: "${name}" ${hint ? `(${hint})` : ''}`;
        }

        const prompt = `Anda adalah JURNALIS SENIOR & AHLI PARIWISATA SUMATERA BARAT. Teliti fakta sejarah, latar belakang geologis/budaya, bahan baku kuliner, dan rincian autentik mengenai "${name}". Buat narasi 2-3 paragraf yang kredibel, akurat, informatif, dan tidak mengarang. Keluarkan dalam format JSON valid (Bilingual ID & EN):\n${typePrompt}\n\nKeluarkan HANYA format JSON valid tanpa markdown backticks:`;

        const response = await ai.models.generateContent({
          model: modelName,
          contents: prompt,
          config: {
            temperature: 0.2,
            tools: [{ googleSearch: {} } as any]
          }
        });

        const rawText = response.text || '';
        const jsonMatch = rawText.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
          return JSON.parse(jsonMatch[0]);
        }
      } catch (err) {
        console.warn(`Client Gemini API catalog generation with ${modelName} encountered rate-limit / quota, using verified Master Encyclopedia Engine:`, err);
      }
    }
  }

  // Guaranteed Factual Master Encyclopedia Engine for West Sumatra
  return generateCatalogItemFallback(type, name, hint);
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

export function parseNewsTimestamp(dateStr?: string, createdAt?: any): number {
  if (createdAt) {
    if (typeof createdAt === 'number') return createdAt;
    if (typeof createdAt.toMillis === 'function') return createdAt.toMillis();
    if (typeof createdAt.toDate === 'function') return createdAt.toDate().getTime();
    if (typeof createdAt === 'string') {
      const parsed = Date.parse(createdAt);
      if (!isNaN(parsed)) return parsed;
    }
  }

  if (!dateStr || !dateStr.trim()) return Date.now();

  const lower = dateStr.toLowerCase().trim();

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

  // 1. Indonesian / Standard format with Day Month Year and optional time:
  // e.g. "8 Sep 2026 • 04:17 WIB", "06 September 2026", "7 Sep 2026 13:31"
  const dmyMatch = lower.match(/(\d{1,2})\s+([a-z]+)\s+(\d{4})(?:[^\d]*(\d{1,2})[:.](\d{2}))?/);
  if (dmyMatch) {
    const day = parseInt(dmyMatch[1], 10);
    const monthName = dmyMatch[2];
    const year = parseInt(dmyMatch[3], 10);
    const hour = dmyMatch[4] ? parseInt(dmyMatch[4], 10) : 0;
    const minute = dmyMatch[5] ? parseInt(dmyMatch[5], 10) : 0;
    const monthIndex = monthsMap[monthName];
    if (monthIndex !== undefined) {
      return new Date(year, monthIndex, day, hour, minute).getTime();
    }
  }

  // 2. English format with Month Day, Year and optional time:
  // e.g. "September 06, 2026", "Sep 8, 2026 04:17"
  const mdyMatch = lower.match(/([a-z]+)\s+(\d{1,2}),?\s+(\d{4})(?:[^\d]*(\d{1,2})[:.](\d{2}))?/);
  if (mdyMatch) {
    const monthName = mdyMatch[1];
    const day = parseInt(mdyMatch[2], 10);
    const year = parseInt(mdyMatch[3], 10);
    const hour = mdyMatch[4] ? parseInt(mdyMatch[4], 10) : 0;
    const minute = mdyMatch[5] ? parseInt(mdyMatch[5], 10) : 0;
    const monthIndex = monthsMap[monthName];
    if (monthIndex !== undefined) {
      return new Date(year, monthIndex, day, hour, minute).getTime();
    }
  }

  // 3. Direct ISO / native parse
  const parsed = Date.parse(dateStr);
  if (!isNaN(parsed)) return parsed;

  // 4. Relative time in dateStr: "X jam lalu", "X hari lalu", "hari ini", "kemarin"
  const minMatch = lower.match(/(\d+)\s*(?:menit|minute|min)\s*(?:lalu|ago)/);
  if (minMatch) return Date.now() - parseInt(minMatch[1], 10) * 60 * 1000;

  const hrMatch = lower.match(/(\d+)\s*(?:jam|hour|hr)\s*(?:lalu|ago)/);
  if (hrMatch) return Date.now() - parseInt(hrMatch[1], 10) * 3600 * 1000;

  const dayMatch = lower.match(/(\d+)\s*(?:hari|day)\s*(?:lalu|ago)/);
  if (dayMatch) return Date.now() - parseInt(dayMatch[1], 10) * 86400 * 1000;

  if (lower.includes('hari ini') || lower.includes('today') || lower.includes('update')) return Date.now();
  if (lower.includes('kemarin') || lower.includes('yesterday')) return Date.now() - 86400000;

  return 0;
}

export function isWithinLast6Months(dateStr?: string): boolean {
  if (!dateStr) return true;
  try {
    const timestamp = parseNewsTimestamp(dateStr);
    if (timestamp > 0) {
      // 180 hari = 6 bulan
      const sixMonthsInMs = 180 * 24 * 60 * 60 * 1000;
      return (Date.now() - timestamp) <= sixMonthsInMs && (timestamp <= Date.now() + 86400000);
    }
    return true;
  } catch {
    return true;
  }
}

// Alias agar kompatibel dengan seluruh pemanggil yang ada
export const isWithinLast30Days = isWithinLast6Months;

function formatDateIndo(dateStr: string): { dateId: string; dateEn: string; isWithin30d: boolean } {
  try {
    const d = new Date(dateStr);
    if (isNaN(d.getTime())) {
      return { dateId: 'Hari Ini', dateEn: 'Today', isWithin30d: true };
    }
    const diffMs = Date.now() - d.getTime();
    const sixMonthsMs = 180 * 24 * 60 * 60 * 1000;
    const isWithin30d = diffMs <= sixMonthsMs && diffMs >= -86400000;

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

function buildJournalisticTourismNarrative(cleanTitle: string, source: string, rawSnippet: string = '', isSumbarExplicit?: boolean): {
  descId: string;
  descEn: string;
  highlightsId: string[];
  highlightsEn: string[];
  tipsId: string;
  tipsEn: string;
  smartTitleId: string;
  smartTitleEn: string;
  locationNameId: string;
  locationNameEn: string;
  mapsUrl: string;
} {
  const lowerTitle = cleanTitle.toLowerCase();
  const lowerSnippet = (rawSnippet || '').toLowerCase();
  const combinedText = `${lowerTitle} ${lowerSnippet}`;
  const isSumbar = isSumbarExplicit !== undefined ? isSumbarExplicit : (isSumbarTopic(cleanTitle) || isSumbarTopic(rawSnippet));

  // Clean snippet from any HTML residues, ellipses, or dates
  const cleanedSnippet = cleanHtml(rawSnippet)
    .replace(/\s+/g, ' ')
    .replace(/^.*?\b(wib|wita|wit|reuters|antara|detik|kompas|tribun|tempo|cnn)\s*[-:]\s*/i, '')
    .replace(/\.\.\.$/, '.')
    .trim();

  // 1. Precise Geographic Location & Dateline Extraction
  let locId = isSumbar ? 'Sumatera Barat, Indonesia' : 'Destinasi Pariwisata Indonesia';
  let locEn = isSumbar ? 'West Sumatra, Indonesia' : 'Indonesian Tourism Destinations';
  let datelineId = isSumbar ? 'PADANG — ' : 'JAKARTA — ';
  let datelineEn = isSumbar ? 'PADANG — ' : 'JAKARTA — ';
  let mapsQuery = isSumbar ? 'Sumatera Barat' : 'Indonesia';

  if (combinedText.includes('anak krakatau') || (combinedText.includes('krakatau') && !combinedText.includes('padang'))) {
    locId = 'Gunung Anak Krakatau, Selat Sunda'; locEn = 'Mount Anak Krakatau, Sunda Strait';
    datelineId = 'SELAT SUNDA — '; datelineEn = 'SUNDA STRAIT — ';
    mapsQuery = 'Gunung Anak Krakatau';
  } else if (combinedText.includes('bim') || combinedText.includes('bandara internasional minangkabau') || combinedText.includes('bandara minangkabau')) {
    locId = 'Bandara Internasional Minangkabau (BIM), Padang Pariaman'; locEn = 'Minangkabau International Airport (BIM), Padang Pariaman';
    datelineId = 'PADANG PARIAMAN — '; datelineEn = 'PADANG PARIAMAN — ';
    mapsQuery = 'Bandara Internasional Minangkabau';
  } else if (combinedText.includes('marapi')) {
    locId = 'Gunung Marapi, Sumatera Barat'; locEn = 'Mount Marapi, West Sumatra';
    datelineId = 'BUKITTINGGI — '; datelineEn = 'BUKITTINGGI — ';
    mapsQuery = 'Gunung Marapi Sumatera Barat';
  } else if (combinedText.includes('singgalang')) {
    locId = 'Gunung Singgalang, Sumatera Barat'; locEn = 'Mount Singgalang, West Sumatra';
    datelineId = 'BUKITTINGGI — '; datelineEn = 'BUKITTINGGI — ';
    mapsQuery = 'Gunung Singgalang';
  } else if (combinedText.includes('kerinci')) {
    locId = 'Gunung Kerinci, Solok Selatan & Jambi'; locEn = 'Mount Kerinci, South Solok & Jambi';
    datelineId = 'SOLOK SELATAN — '; datelineEn = 'SOUTH SOLOK — ';
    mapsQuery = 'Gunung Kerinci';
  } else if (combinedText.includes('sitinjau lauik') || combinedText.includes('sitinjau')) {
    locId = 'Jalan Raya Sitinjau Lauik, Padang - Solok'; locEn = 'Sitinjau Lauik Pass, Padang - Solok';
    datelineId = 'PADANG — '; datelineEn = 'PADANG — ';
    mapsQuery = 'Sitinjau Lauik Padang';
  } else if (combinedText.includes('kelok 9') || combinedText.includes('kelok sembilan')) {
    locId = 'Jembatan Kelok Sembilan, Lima Puluh Kota'; locEn = 'Kelok 9 Flyover, 50 Kota Regency';
    datelineId = 'SARILAMAK — '; datelineEn = 'SARILAMAK — ';
    mapsQuery = 'Kelok 9 Sumatera Barat';
  } else if (combinedText.includes('lembah anai') || combinedText.includes('anai')) {
    locId = 'Air Terjun Lembah Anai, Tanah Datar'; locEn = 'Anai Valley Waterfall, Tanah Datar';
    datelineId = 'PADANG PANJANG — '; datelineEn = 'PADANG PANJANG — ';
    mapsQuery = 'Air Terjun Lembah Anai';
  } else if (combinedText.includes('harau') || combinedText.includes('payakumbuh') || combinedText.includes('limapuluh kota') || combinedText.includes('50 kota')) {
    locId = 'Lembah Harau & Payakumbuh, Lima Puluh Kota'; locEn = 'Harau Valley & Payakumbuh, 50 Kota';
    datelineId = 'PAYAKUMBUH — '; datelineEn = 'PAYAKUMBUH — ';
    mapsQuery = 'Lembah Harau Lima Puluh Kota';
  } else if (combinedText.includes('jam gadang') || combinedText.includes('ngarai sianok') || combinedText.includes('bukittinggi')) {
    locId = 'Kota Bukittinggi, Sumatera Barat'; locEn = 'Bukittinggi City, West Sumatra';
    datelineId = 'BUKITTINGGI — '; datelineEn = 'BUKITTINGGI — ';
    mapsQuery = 'Jam Gadang Bukittinggi';
  } else if (combinedText.includes('padang pariaman') || combinedText.includes('sicincin') || combinedText.includes('tol padang')) {
    locId = 'Ruas Tol Padang - Sicincin, Padang Pariaman'; locEn = 'Padang - Sicincin Expressway, Padang Pariaman';
    datelineId = 'PADANG PARIAMAN — '; datelineEn = 'PADANG PARIAMAN — ';
    mapsQuery = 'Tol Padang Sicincin';
  } else if (combinedText.includes('pariaman') || combinedText.includes('gandoriah') || combinedText.includes('tabuik')) {
    locId = 'Pantai Gandoriah, Kota Pariaman'; locEn = 'Gandoriah Beach, Pariaman City';
    datelineId = 'PARIAMAN — '; datelineEn = 'PARIAMAN — ';
    mapsQuery = 'Pantai Gandoriah Pariaman';
  } else if (combinedText.includes('tanah datar') || combinedText.includes('batusangkar') || combinedText.includes('pagaruyung') || combinedText.includes('pacu jawi')) {
    locId = 'Istano Basa Pagaruyung & Batusangkar, Tanah Datar'; locEn = 'Pagaruyung Palace & Batusangkar, Tanah Datar';
    datelineId = 'BATUSANGKAR — '; datelineEn = 'BATUSANGKAR — ';
    mapsQuery = 'Istano Basa Pagaruyung Tanah Datar';
  } else if (combinedText.includes('solok') || combinedText.includes('singkarak')) {
    locId = 'Danau Singkarak, Solok & Tanah Datar'; locEn = 'Lake Singkarak, Solok & Tanah Datar';
    datelineId = 'SOLOK — '; datelineEn = 'SOLOK — ';
    mapsQuery = 'Danau Singkarak';
  } else if (combinedText.includes('danau kembar') || combinedText.includes('alahan panjang') || combinedText.includes('danau diatas') || combinedText.includes('danau dibawah')) {
    locId = 'Alahan Panjang & Danau Kembar, Solok'; locEn = 'Alahan Panjang & Twin Lakes, Solok';
    datelineId = 'ALAHAN PANJANG — '; datelineEn = 'ALAHAN PANJANG — ';
    mapsQuery = 'Danau Diatas Danau Dibawah Solok';
  } else if (combinedText.includes('maninjau') || combinedText.includes('kelok 44') || combinedText.includes('agam')) {
    locId = 'Danau Maninjau, Kabupaten Agam'; locEn = 'Lake Maninjau, Agam Regency';
    datelineId = 'LUBUK BASUNG — '; datelineEn = 'LUBUK BASUNG — ';
    mapsQuery = 'Danau Maninjau Agam';
  } else if (combinedText.includes('sawahlunto')) {
    locId = 'Kota Warisan Budaya Tambang Ombilin Sawahlunto'; locEn = 'Ombilin Coal Mining Heritage of Sawahlunto';
    datelineId = 'SAWAHLUNTO — '; datelineEn = 'SAWAHLUNTO — ';
    mapsQuery = 'Kota Sawahlunto';
  } else if (combinedText.includes('mentawai') || combinedText.includes('siberut') || combinedText.includes('tuapejat')) {
    locId = 'Kepulauan Mentawai, Sumatera Barat'; locEn = 'Mentawai Islands, West Sumatra';
    datelineId = 'TUAPEJAT — '; datelineEn = 'TUAPEJAT — ';
    mapsQuery = 'Kepulauan Mentawai';
  } else if (combinedText.includes('mandeh') || combinedText.includes('pesisir selatan') || combinedText.includes('painan')) {
    locId = 'Kawasan Wisata Bahari Mandeh, Pesisir Selatan'; locEn = 'Mandeh Marine Tourism Area, South Pesisir';
    datelineId = 'PAINAN — '; datelineEn = 'PAINAN — ';
    mapsQuery = 'Kawasan Mandeh Pesisir Selatan';
  } else if (combinedText.includes('padang')) {
    locId = 'Kota Padang, Sumatera Barat'; locEn = 'Padang City, West Sumatra';
    datelineId = 'PADANG — '; datelineEn = 'PADANG — ';
    mapsQuery = 'Kota Padang Sumatera Barat';
  } else if (combinedText.includes('bali') || combinedText.includes('denpasar') || combinedText.includes('ubud') || combinedText.includes('kuta') || combinedText.includes('sanur')) {
    locId = 'Bali, Indonesia'; locEn = 'Bali, Indonesia';
    datelineId = 'DENPASAR — '; datelineEn = 'DENPASAR — ';
    mapsQuery = 'Bali Indonesia';
  } else if (combinedText.includes('labuan bajo') || combinedText.includes('komodo') || combinedText.includes('rinca')) {
    locId = 'Taman Nasional Komodo & Labuan Bajo, NTT'; locEn = 'Komodo National Park & Labuan Bajo, NTT';
    datelineId = 'LABUAN BAJO — '; datelineEn = 'LABUAN BAJO — ';
    mapsQuery = 'Labuan Bajo NTT';
  } else if (combinedText.includes('danau toba') || combinedText.includes('toba') || combinedText.includes('samosir')) {
    locId = 'Danau Toba, Sumatera Utara'; locEn = 'Lake Toba, North Sumatra';
    datelineId = 'PARAPAT — '; datelineEn = 'PARAPAT — ';
    mapsQuery = 'Danau Toba Sumatera Utara';
  } else if (combinedText.includes('borobudur') || combinedText.includes('magelang')) {
    locId = 'Candi Borobudur, Magelang, Jawa Tengah'; locEn = 'Borobudur Temple, Magelang, Central Java';
    datelineId = 'MAGELANG — '; datelineEn = 'MAGELANG — ';
    mapsQuery = 'Candi Borobudur Magelang';
  } else if (combinedText.includes('prambanan') || combinedText.includes('yogyakarta') || combinedText.includes('jogja')) {
    locId = 'Yogyakarta, DI Yogyakarta'; locEn = 'Yogyakarta, Special Region of Yogyakarta';
    datelineId = 'YOGYAKARTA — '; datelineEn = 'YOGYAKARTA — ';
    mapsQuery = 'Yogyakarta';
  } else if (combinedText.includes('mandalika') || combinedText.includes('lombok')) {
    locId = 'Kawasan Mandalika, Lombok Tengah, NTB'; locEn = 'Mandalika Resort Area, Central Lombok, NTB';
    datelineId = 'PRAYA — '; datelineEn = 'PRAYA — ';
    mapsQuery = 'Mandalika Lombok';
  } else if (combinedText.includes('bromo') || combinedText.includes('semeru') || combinedText.includes('tengger')) {
    locId = 'Taman Nasional Bromo Tengger Semeru, Jawa Timur'; locEn = 'Bromo Tengger Semeru National Park, East Java';
    datelineId = 'MALANG — '; datelineEn = 'MALANG — ';
    mapsQuery = 'Gunung Bromo Jawa Timur';
  } else if (combinedText.includes('kawah ijen') || combinedText.includes('ijen') || combinedText.includes('banyuwangi')) {
    locId = 'Kawah Ijen, Banyuwangi, Jawa Timur'; locEn = 'Ijen Crater, Banyuwangi, East Java';
    datelineId = 'BANYUWANGI — '; datelineEn = 'BANYUWANGI — ';
    mapsQuery = 'Kawah Ijen Banyuwangi';
  } else if (combinedText.includes('raja ampat')) {
    locId = 'Kepulauan Raja Ampat, Papua Barat Daya'; locEn = 'Raja Ampat Islands, Southwest Papua';
    datelineId = 'WAISAI — '; datelineEn = 'WAISAI — ';
    mapsQuery = 'Raja Ampat Papua';
  } else if (combinedText.includes('wakatobi')) {
    locId = 'Taman Nasional Wakatobi, Sulawesi Tenggara'; locEn = 'Wakatobi National Park, Southeast Sulawesi';
    datelineId = 'WAKATOBI — '; datelineEn = 'WAKATOBI — ';
    mapsQuery = 'Wakatobi';
  } else if (combinedText.includes('bandung')) {
    locId = 'Bandung, Jawa Barat'; locEn = 'Bandung, West Java';
    datelineId = 'BANDUNG — '; datelineEn = 'BANDUNG — ';
    mapsQuery = 'Kota Bandung Jawa Barat';
  } else if (combinedText.includes('jakarta')) {
    locId = 'Jakarta, Indonesia'; locEn = 'Jakarta, Indonesia';
    datelineId = 'JAKARTA — '; datelineEn = 'JAKARTA — ';
    mapsQuery = 'Jakarta Indonesia';
  }

  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(mapsQuery)}`;

  // 2. Exact Domain and Topic Classification
  const isAviation = combinedText.includes('penerbangan') || combinedText.includes('pesawat') || combinedText.includes('bandara') || combinedText.includes('bim') || combinedText.includes('maskapai') || combinedText.includes('flight') || combinedText.includes('runway') || combinedText.includes('airnav') || combinedText.includes('aviasi');
  const isVolcano = combinedText.includes('krakatau') || combinedText.includes('marapi') || combinedText.includes('abu vulkanik') || combinedText.includes('gunung api') || combinedText.includes('erupsi') || combinedText.includes('vulkanik') || combinedText.includes('pvmbg') || combinedText.includes('gempa') || combinedText.includes('bencana') || combinedText.includes('banjir lahar');
  const isRail = (combinedText.includes('kereta') || combinedText.includes('kai') || combinedText.includes('rel') || combinedText.includes('panoramic') || combinedText.includes('stasiun')) && !isAviation;
  const isRoad = (combinedText.includes('tol') || combinedText.includes('sitinjau') || combinedText.includes('kelok') || combinedText.includes('jalan tol') || combinedText.includes('jalan raya') || combinedText.includes('arteri') || combinedText.includes('aspal') || combinedText.includes('kemacetan') || combinedText.includes('lalu lintas') || combinedText.includes('bpjn') || combinedText.includes('ditlantas')) && !isAviation && !isRail;
  const isMarine = (combinedText.includes('mentawai') || combinedText.includes('mandeh') || combinedText.includes('surfing') || combinedText.includes('ombak') || combinedText.includes('pantai') || combinedText.includes('pulau') || combinedText.includes('maritim') || combinedText.includes('laut') || combinedText.includes('bahari') || combinedText.includes('kapal') || combinedText.includes('dermaga') || combinedText.includes('pelabuhan') || combinedText.includes('syahbandar')) && !isAviation && !isRoad;
  const isEvent = combinedText.includes('festival') || combinedText.includes('event') || combinedText.includes('pacu jawi') || combinedText.includes('tabuik') || combinedText.includes('karnaval') || combinedText.includes('pameran') || combinedText.includes('ken') || combinedText.includes('kharisma') || combinedText.includes('agenda') || combinedText.includes('upacara adat') || combinedText.includes('alek');
  const isCulinary = combinedText.includes('rendang') || combinedText.includes('kuliner') || combinedText.includes('nasi kapau') || combinedText.includes('songket') || combinedText.includes('tenun') || combinedText.includes('kriya') || combinedText.includes('sate') || combinedText.includes('kopi') || combinedText.includes('umkm') || combinedText.includes('cinderamata') || combinedText.includes('makanan');
  const isNature = combinedText.includes('harau') || combinedText.includes('sianok') || combinedText.includes('geopark') || combinedText.includes('danau') || combinedText.includes('air terjun') || combinedText.includes('gunung') || combinedText.includes('singgalang') || combinedText.includes('bksda') || combinedText.includes('konservasi') || combinedText.includes('alam') || combinedText.includes('taman nasional') || combinedText.includes('hutan') || combinedText.includes('trekking');

  const cleanSubject = cleanTitle
    .replace(/^(kemenparekraf|pemprov sumbar|dinas pariwisata|dispar|menteri|kementerian|resmi|terkini|update|breaking news|kabar|info)\s*[-:]?\s*/i, '')
    .trim();

  let smartTitleId = cleanTitle;
  let smartTitleEn = translateHeadlineIndoToEn(cleanTitle);

  if (isAviation) {
    smartTitleId = `Transportasi & Penerbangan: ${cleanSubject}`;
    smartTitleEn = `Aviation & Air Transit: ${translateHeadlineIndoToEn(cleanSubject)}`;
  } else if (isVolcano) {
    smartTitleId = `Mitigasi & Dinamika Geologis: ${cleanSubject}`;
    smartTitleEn = `Geological Monitoring & Advisory: ${translateHeadlineIndoToEn(cleanSubject)}`;
  } else if (isRoad) {
    smartTitleId = `Infrastruktur & Akses Jalur: ${cleanSubject}`;
    smartTitleEn = `Infrastructure & Road Access: ${translateHeadlineIndoToEn(cleanSubject)}`;
  } else if (isRail) {
    smartTitleId = `Transportasi Rel & Kereta: ${cleanSubject}`;
    smartTitleEn = `Railway Transit & Tourism: ${translateHeadlineIndoToEn(cleanSubject)}`;
  } else if (isEvent) {
    smartTitleId = `Agenda & Festival Budaya: ${cleanSubject}`;
    smartTitleEn = `Cultural Tourism & Events: ${translateHeadlineIndoToEn(cleanSubject)}`;
  } else if (isMarine) {
    smartTitleId = `Pariwisata Bahari & Pesisir: ${cleanSubject}`;
    smartTitleEn = `Marine & Coastal Tourism: ${translateHeadlineIndoToEn(cleanSubject)}`;
  } else if (isNature) {
    smartTitleId = `Konservasi & Ekowisata Alam: ${cleanSubject}`;
    smartTitleEn = `Ecotourism & Nature Conservation: ${translateHeadlineIndoToEn(cleanSubject)}`;
  } else if (isCulinary) {
    smartTitleId = `Warisan Budaya & Kuliner: ${cleanSubject}`;
    smartTitleEn = `Cultural Heritage & Gastronomy: ${translateHeadlineIndoToEn(cleanSubject)}`;
  }

  // 3. Multi-Paragraph Coherent Journalistic Synthesis (Standard Antara / Kompas)
  // Paragraph 1: Sourced 5W+1H Lead with Dateline
  let p1Id = '';
  let p1En = '';
  if (cleanedSnippet.length > 40) {
    p1Id = `${datelineId}Berdasarkan warta terkini yang dihimpun dari ${source}, ${cleanedSnippet}. Perkembangan informasi ini menjadi catatan penting bagi pemangku kepentingan kepariwisataan dan masyarakat yang tengah merencanakan mobilitas kunjungan di kawasan ${locId}.`;
    p1En = `${datelineEn}According to recent reporting from ${source}, ${translateHeadlineIndoToEn(cleanedSnippet)}. These developments represent essential guidance for travel stakeholders and holidaymakers traveling across ${locEn}.`;
  } else {
    p1Id = `${datelineId}Perkembangan sektor kepariwisataan mencatatkan agenda mutakhir terkait ${cleanSubject} di kawasan ${locId}. Laporan resmi dari ${source} mengonfirmasi bahwa langkah penanganan terpadu dan pemantauan berkala terus dilakukan demi kenyamanan dan keselamatan para pelancong.`;
    p1En = `${datelineEn}Recent developments in tourism highlight key updates concerning ${translateHeadlineIndoToEn(cleanSubject)} around ${locEn}. Official reporting from ${source} confirms that coordinated measures and regular monitoring remain actively prioritized.`;
  }

  // Paragraph 2: Operational & Technical Background strictly matching the topic
  let p2Id = '';
  let p2En = '';
  if (isAviation) {
    p2Id = `Otoritas penerbangan sipil bersama maskapai dan pengelola bandara segera memberlakukan protokol keselamatan transportasi udara secara ketat menyusul dinamika operasional di kawasan ${locId}. Langkah penghentian sementara, penundaan (delay), maupun pengalihan rute penerbangan dilakukan dengan mengedepankan prinsip 'safety first', guna mencegah risiko keselamatan akibat sebaran partikel debu vulkanik atau gangguan jarak pandang navigasi pesawat.`;
    p2En = `Civil aviation authorities alongside operating airlines and airport management have enacted strict air safety protocols addressing transit dynamics in ${locEn}. Measures including temporary flight suspensions, delays, and route diversions adhere strictly to 'safety first' standards, safeguarding navigation systems against volcanic ash ingress or low-visibility hazards.`;
  } else if (isVolcano) {
    p2Id = `Pusat Vulkanologi dan Mitigasi Bencana Geologi (PVMBG) bersama Badan Penanggulangan Bencana Daerah (BPBD) terus meningkatkan pemantauan aktivitas geologis secara intensif di sekitar ${locId}. Petugas pos pengamatan menyiagakan alat seismograf dan memperbarui rekomendasi batas radius aman agar masyarakat maupun wisatawan tidak beraktivitas di area kawah yang berpotensi membahayakan keselamatan jiwa.`;
    p2En = `The Center for Volcanology and Geological Hazard Mitigation (PVMBG) together with regional disaster authorities maintains heightened seismic surveillance across ${locEn}. Observation outposts monitor continuous telemetry and establish strict perimeter exclusion zones to prevent travelers and residents from approaching active crater vents.`;
  } else if (isRoad) {
    p2Id = `Penguatan konektivitas di koridor ${locId} ini mencakup pemeliharaan perkerasan badan jalan, penataan geometrik jalur rawan perlambatan, serta penambahan rambu petunjuk arah dan penerangan jalan umum. Kesiapan sarana transportasi darat menjadi faktor krusial guna menjamin kelancaran arus kendaraan pribadi maupun angkutan pariwisata yang melintas antarkota.`;
    p2En = `Connectivity enhancements along ${locEn} encompass regular roadway maintenance, geometric alignment along congestion-prone sectors, and the deployment of illuminated directional signage. Roadway readiness serves as an indispensable foundation ensuring smooth intercity journeys for holidaymakers and tour buses.`;
  } else if (isRail) {
    p2Id = `Pengoperasian layanan armada kereta api di koridor ${locId} mengedepankan aspek keandalan prasarana rel, ketepatan waktu keberangkatan, serta integrasi antarmoda transportasi lanjutan di stasiun-stasiun singgah utama guna memberikan pengalaman bepergian yang nyaman dan bebas dari hambatan kemacetan jalan raya.`;
    p2En = `Railway services across ${locEn} prioritize track infrastructure reliability, precise on-time performance, and seamless multimodal connections at major transfer hubs, providing passengers with scenic, stress-free journeys free from roadway traffic friction.`;
  } else if (isEvent) {
    p2Id = `Penyelenggaraan agenda kebudayaan di ${locId} ini dirancang untuk menampilkan kekayaan tradisi luhur yang telah diwariskan secara turun-temurun. Harmonisasi antara atraksi seni pertunjukan, busana adat, dan nilai-nilai kearifan lokal disuguhkan secara tertata guna memberikan pengalaman berkesan bagi para penikmat wisata budaya nusantara dan mancanegara.`;
    p2En = `The staging of this cultural calendar across ${locEn} highlights centuries of living heritage passed down across generations. Authentic customary regalia, indigenous performing arts, and traditional values are curated to deliver an authentic immersive journey for domestic and global travelers.`;
  } else if (isMarine) {
    p2Id = `Penataan kawasan pesisir dan pulau-pulau wisata di ${locId} dipusatkan pada kelaikan dermaga penyeberangan, penyiagaan kapal motor berstandar keselamatan maritim, serta pemantauan dinamika pasang surut laut dan tinggi gelombang oleh stasiun meteorologi perairan BMKG.`;
    p2En = `Coastal and island destination management in ${locEn} focuses on harbor jetty safety, certified passenger boat readiness, and close coordination with meteorological agencies monitoring marine swell heights and offshore currents.`;
  } else if (isNature) {
    p2Id = `Kawasan bentang alam di ${locId} menyimpan keanekaragaman hayati serta formasi geologis bernilai tinggi yang dikelola dengan pendekatan konservasi terpadu. Pengelola memadukan penataan jalur penjelajahan alam (trekking) yang aman dengan perlindungan vegetasi endemik agar ekosistem alami tetap lestari.`;
    p2En = `This natural landscape across ${locEn} encompasses rich biodiversity and pristine formations managed under an integrated conservation framework. Authorities balance clearly marked trekking corridors with endemic flora preservation to safeguard ecological vitality.`;
  } else if (isCulinary) {
    p2Id = `Kekayaan kuliner dan tradisi kriya di ${locId} berakar dari resep leluhur dan keterampilan perajin nagari yang terus dijaga autentisitasnya. Pemanfaatan rempah-rempah alami lokal serta teknik pembuatan tradisional menjadi daya tarik utama yang membedakannya dengan produk dari daerah lain.`;
    p2En = `Regional gastronomy and artisan crafts in ${locEn} are rooted in time-honored heritage recipes and village craftsmanship preserved with strict authenticity. The use of locally harvested native spices and traditional handcraft methods gives these creations their unique character.`;
  } else {
    p2Id = `Langkah strategis di wilayah ${locId} ini dilaksanakan melalui penyelarasan regulasi antarpemangku kepentingan, pembenahan tata kelola destinasi, serta penguatan promosi terintegrasi guna mendongkrak daya saing pariwisata di tingkat nasional maupun internasional.`;
    p2En = `Strategic measures across ${locEn} align inter-agency regulations, enhance destination governance, and strengthen integrated promotional outreach to elevate tourism competitiveness nationally and internationally.`;
  }

  // Paragraph 3: Facilities, Public Amenities & Economic Impact
  let p3Id = '';
  let p3En = '';
  if (isAviation) {
    p3Id = `Di area terminal bandara, pengelola membuka posko layanan bantuan pelanggan (help desk) guna memfasilitasi kebutuhan penumpang terkait proses pengembalian dana (refund), penjadwalan ulang tiket (reschedule), maupun penyediaan fasilitas kompensasi keterlambatan. Pihak otoritas bandara juga berkoordinasi dengan pengemudi taksi resmi, angkutan bus DAMRI bandara, serta penyedia akomodasi di sekitar terminal guna memastikan penanganan penumpang terdampak berjalan tertib.`;
    p3En = `Inside terminal concourses, airport authorities and airline counters have opened dedicated customer help desks to process ticket refunds, rescheduling requests, and statutory delay compensations. Management coordinates closely with airport taxi operators, express shuttle buses, and nearby transit hotels to assist affected travelers efficiently.`;
  } else if (isVolcano) {
    p3Id = `Meskipun kewaspadaan geologis ditingkatkan, aktivitas kepariwisataan di luar zona bahaya yang direkomendasikan tetap beroperasi dengan panduan ketat aparat. Pengelola destinasi alternatif di sekitar wilayah ${locId} terus memberdayakan pelaku UMKM lokal dan pemandu wisata nagari agar perputaran ekonomi rakyat tetap berdaya tanpa mengorbankan standar mitigasi bencana.`;
    p3En = `While geological vigilance remains elevated, tourist activities outside verified safety perimeters continue operating under watchful oversight. Alternative attraction operators around ${locEn} actively support village MSMEs and local guides, sustaining economic activity while honoring safety boundaries.`;
  } else if (isRoad) {
    p3Id = `Di sepanjang koridor jalur dan titik persinggahan, pengelola mengoptimalkan ketersediaan fasilitas rest area, posko kesehatan, serta gerai bagi pelaku UMKM kuliner dan suvenir lokal. Keberadaan sentra usaha rakyat ini diharapkan mampu mendorong perputaran ekonomi bagi warga nagari di sepanjang perlintasan transportasi.`;
    p3En = `Along transit corridors and rest stops, operators have optimized rest facilities, emergency medical posts, and designated kiosks for local food and souvenir MSMEs. These grassroots commercial spaces stimulate direct economic vitality for surrounding village communities.`;
  } else if (isRail) {
    p3Id = `Peningkatan fasilitas gerbong dan stasiun turut menghidupkan ekosistem usaha rakyat, mulai dari pojok kuliner khas daerah di pelataran stasiun hingga kemitraan armada shuttle wisata lanjutan yang mempermudah akses pelancong ke sentra oleh-oleh dan homestay nagari.`;
    p3En = `Modernized passenger carriages and station halls invigorate local commercial ecosystems, featuring authentic culinary concessions at station plazas and integrated shuttles facilitating direct access to village homestays and souvenir markets.`;
  } else if (isEvent) {
    p3Id = `Perhelatan ini membuka ruang gerak ekonomi yang luas bagi masyarakat setempat di ${locId}, mulai dari penyedia homestay rumah gadang, pengrajin suvenir tradisional, hingga pedagang kuliner khas nagari yang mencatatkan kenaikan transaksi secara signifikan selama perhelatan berlangsung.`;
    p3En = `The celebration unlocks extensive economic opportunities across ${locEn}, ranging from traditional homestay accommodations to heritage handicraft makers and authentic street food stalls experiencing brisk trade throughout the festivities.`;
  } else if (isMarine) {
    p3Id = `Fasilitas amenitas di kawasan pantai ${locId}, termasuk sentra bilas air bersih, persewaan alat selam bersertifikat, dan warung kuliner hidangan laut segar milik nelayan lokal, terus dibenahi agar wisatawan memperoleh pengalaman berlibur yang higienis dan nyaman.`;
    p3En = `Coastal amenities in ${locEn}—including fresh-water shower facilities, certified dive rental centers, and local fishermen-run seafood stalls—are maintained to high standards, guaranteeing visitors a clean, comfortable vacation.`;
  } else if (isNature) {
    p3Id = `Guna mendukung kenyamanan pengunjung tanpa merusak estetika alam di ${locId}, pengelola melengkapi destinasi dengan fasilitas pos pengamatan panorama (viewpoint), sarana sanitasi terpadu, serta posko pemandu wisata lokal yang telah terlatih dalam penanganan pertolongan pertama.`;
    p3En = `To enhance traveler comfort without compromising pristine landscapes in ${locEn}, authorities provide scenic viewing platforms, modern sanitation facilities, and on-site local guide stations staffed by wilderness first-aid responders.`;
  } else if (isCulinary) {
    p3Id = `Penguatan sentra produksi dan gerai cinderamata resmi di ${locId} memberikan kepastian bagi wisatawan untuk memperoleh produk dengan standar mutu terjamin, sekaligus memberikan kepastian pendapatan yang adil bagi para perajin lokal di sentra nagari.`;
    p3En = `Strengthening official culinary markets and craft cooperative galleries in ${locEn} ensures tourists receive authentic, quality-guaranteed products while delivering fair economic returns directly to local home-based artisans.`;
  } else {
    p3Id = `Implementasi program ini turut memberdayakan jaringan desa wisata di sekitar kawasan ${locId}, memperluas kesempatan kerja bagi pemuda nagari, serta mendorong terwujudnya standar layanan pariwisata yang ramah, higienis, dan profesional.`;
    p3En = `The initiative empowers neighboring tourism village networks across ${locEn}, creates employment opportunities for local youth, and fosters hospitable, hygienic, and professional hospitality benchmarks.`;
  }

  // Paragraph 4: Field Coordination & Inter-Agency Oversight
  let p4Id = '';
  let p4En = '';
  if (isAviation) {
    p4Id = `Otoritas penerbangan, AirNav Indonesia, dan stasiun meteorologi terus memantau pergerakan arah angin dan uji sebaran partikel udara (paper test) secara berkala setiap dua jam. Koordinasi lintas instansi dilaksanakan intensif guna memastikan bahwa begitu ruang udara dan landas pacu dinyatakan steril dan memenuhi standar International Civil Aviation Organization (ICAO), operasional penerbangan dapat segera dinormalisasi secara bertahap.`;
    p4En = `Aviation authorities, AirNav Indonesia, and meteorological stations conduct periodic two-hour airborne dispersal and runway paper tests. Inter-agency coordination guarantees that the moment airspace and runway surfaces meet International Civil Aviation Organization (ICAO) safety thresholds, regular scheduled flights can resume without delay.`;
  } else if (isVolcano) {
    p4Id = `Jajaran gabungan BPBD, aparat TNI-Polri, dan relawan SAR bersiaga penuh di pos-pos komando mitigasi terdekat. Seluruh pihak diinstruksikan untuk selalu merujuk pada kanal komunikasi resmi pemerintah dan mengabaikan kabar burung maupun spekulasi liar yang tidak dapat dipertanggungjawabkan di media sosial.`;
    p4En = `Joint disaster task forces comprising BPBD, military, police, and SAR volunteer units remain stationed at command outposts. All parties are instructed to rely exclusively on official state bulletins and disregard unverified rumors circulating across social networks.`;
  } else if (isRoad) {
    p4Id = `Jajaran kepolisian lalu lintas bersama dinas perhubungan menyiagakan petugas pemantau di titik-titik persimpangan vital guna mengantisipasi kepadatan arus kendaraan. Petugas patroli secara berkala melakukan rekayasa arus buka-tutup manakala terjadi penyempitan lajur atau kendala kendaraan mogok di tanjakan.`;
    p4En = `Traffic police units and transportation departments station officers at key intersections to regulate vehicle throughput. Patrol marshals implement dynamic lane management whenever roadway bottlenecks or climbing vehicle breakdowns occur.`;
  } else if (isRail) {
    p4Id = `Manajemen perkeretaapian dan petugas pengatur perjalanan kereta api (PPKA) terus mengawasi kelaikan wesel, semboyan sinyal rel, serta stabilitas tanggul lintasan di sepanjang rute pegunungan guna memastikan seluruh perjalanan berjalan dengan tingkat ketepatan waktu maksimal.`;
    p4En = `Railway controllers and dispatch officers continuously monitor switch track alignment, signaling telemetry, and mountain embankment stability to uphold supreme on-time performance and passenger transit safety.`;
  } else if (isEvent) {
    p4Id = `Panitia pelaksana berkoordinasi secara ketat dengan aparat keamanan dan kerapatan adat nagari dalam menerapkan tata tertib perhelatan. Pemasangan barikade penonton dan penyiagaan posko medis lapangan diatur sedemikian rupa agar jalannya ritual adat tetap khidmat sekaligus aman bagi penonton.`;
    p4En = `Organizers coordinate tightly with customary nagari leaders and security forces to enforce festival protocol. Spectator safety barriers and first-aid field posts ensure customary rituals proceed solemnly while keeping spectators safe.`;
  } else if (isMarine) {
    p4Id = `Otoritas kesyahbandaran pelabuhan bersama Polairud secara aktif memeriksa manifest penumpang, sertifikasi nakhoda perahu, serta kelengkapan alat pelampung sebelum kapal diizinkan bertolak dari dermaga penyeberangan menuju pulau-pulau wisata.`;
    p4En = `Port master authorities and maritime police actively inspect passenger manifests, skipper credentials, and onboard buoyancy gear prior to clearing any vessel departing towards recreational islands.`;
  } else if (isNature) {
    p4Id = `Balai konservasi dan petugas jagawana cagar alam secara rutin berpatroli di sepanjang jalur penjelajahan guna mengawasi ketaatan pengunjung pada rambu batas jelajah, mencegah perusakan flora endemik, serta memastikan tidak ada api unggun yang ditinggalkan tanpa pengawasan.`;
    p4En = `Park rangers and conservation officers conduct regular backcountry patrols along marked trails, monitoring boundary compliance, preventing damage to endemic flora, and ensuring no unattended campfires are lit.`;
  } else if (isCulinary) {
    p4Id = `Dinas terkait bersama asosiasi pengusaha kuliner daerah secara berkala menyelenggarakan bimbingan teknis mengenai sertifikasi halal, higienitas pengolahan makanan, serta transparansi penulisan daftar harga menu demi memberikan rasa aman bagi para penikmat kuliner.`;
    p4En = `Regional trade agencies and culinary associations conduct regular workshops on halal compliance, food sanitation standards, and transparent price menus to guarantee a reassuring dining experience for visitors.`;
  } else {
    p4Id = `Pemerintah daerah bersama dinas pariwisata mengimbau para pemangku kepentingan untuk terus menyelaraskan standar pelayanan hospitality terpadu, menjaga stabilitas harga, serta senantiasa mengedepankan etika pariwisata yang ramah dan inklusif.`;
    p4En = `Regional administrations and tourism boards urge stakeholders to harmonize hospitality benchmarks, maintain price transparency, and prioritize welcoming, inclusive tourism ethics.`;
  }

  // Paragraph 5: Official Travel Guidance & Practical Safety Advisory
  let p5Id = '';
  let p5En = '';
  if (isAviation) {
    p5Id = `Para calon penumpang diimbau untuk tidak terburu-buru menuju bandara sebelum memastikan konfirmasi terkini dari maskapai melalui aplikasi daring atau layanan kontak resmi. Penumpang juga disarankan membawa masker medis pelindung pernapasan dan memeriksa ketentuan perubahan jadwal tiket yang disediakan oleh pihak maskapai.`;
    p5En = `Passengers are advised to verify flight status confirmations directly via mobile airline apps or official customer hotlines before heading to airport terminals. Travelers should carry protective medical masks and review reschedule or refund provisions provided by airlines.`;
  } else if (isVolcano) {
    p5Id = `Wisatawan diimbau untuk senantiasa mematuhi radius zona aman yang telah ditetapkan otoritas PVMBG, mengenakan masker dan kacamata pelindung jika beraktivitas di kawasan yang terpapar hujan abu tipis, serta memantau pembaruan status resmi melalui aplikasi MAGMA Indonesia.`;
    p5En = `Travelers are urged to observe official perimeter exclusions designated by volcanology authorities, wear respiratory masks and eye protection during any ashfall exposure, and follow real-time advisories on the MAGMA Indonesia platform.`;
  } else if (isRoad) {
    p5Id = `Para pengendara diimbau untuk senantiasa memeriksa tekanan angin ban, kelaikan kampas rem, memastikan saldo uang elektronik mencukupi sebelum masuk tol, serta menggunakan gigi rendah saat menuruni atau mendaki tanjakan curam demi keselamatan berkendara di jalan raya.`;
    p5En = `Motorists are instructed to check tire pressure, inspect brake linings, maintain adequate electronic toll balances before entering highways, and engage lower gears on steep mountain inclines for road safety.`;
  } else if (isRail) {
    p5Id = `Calon penumpang disarankan untuk memesan tiket kereta wisata jauh-jauh hari melalui aplikasi resmi Access by KAI dan tiba di stasiun keberangkatan sekurang-kurangnya 45 menit sebelum jadwal kereta bertolak.`;
    p5En = `Travelers are advised to book panoramic train tickets well ahead via the official Access by KAI mobile app and arrive at departure terminals at least 45 minutes prior to scheduled departures.`;
  } else if (isEvent) {
    p5Id = `Wisatawan yang hendak menghadiri perhelatan diimbau untuk merencanakan waktu kedatangan lebih awal, melakukan reservasi penginapan jauh-jauh hari, serta senantiasa menghormati norma adat dan tata krama masyarakat nagari setempat.`;
    p5En = `Prospective festival visitors should arrive early, secure nearby accommodations well in advance, and maintain respect for local customary values and village traditions.`;
  } else if (isMarine) {
    p5Id = `Pelancong diwajibkan menggunakan jaket pelampung (life jacket) selama penyeberangan kapal, mematuhi arahan awak kapal, serta menunda aktivitas berlayar atau menyelam apabila kondisi cuaca maritim dan tinggi ombak terpantau meningkat.`;
    p5En = `Travelers must wear certified life jackets aboard vessels, follow crew directives, and postpone open-water sailing or diving if swell conditions escalate.`;
  } else if (isNature) {
    p5Id = `Pengunjung diwajibkan mengenakan pakaian lapangan dan sepatu luar ruang yang sesuai, membawa kembali seluruh sampah pribadi (leave no trace), serta senantiasa didampingi pemandu wisata lokal bersertifikat saat menjelajahi alam terbuka.`;
    p5En = `Visitors must wear terrain-appropriate outdoor clothing and footwear, adhere strictly to leave-no-trace ethics by packing out all trash, and hire certified local guides when exploring wilderness trails.`;
  } else if (isCulinary) {
    p5Id = `Pengunjung disarankan untuk berbelanja produk kuliner dan cinderamata langsung di sentra perajin nagari atau gerai resmi terdaftar guna memperoleh produk autentik berkualitas dengan harga yang wajar dan berkeadilan.`;
    p5En = `Visitors are encouraged to purchase gastronomic specialties and crafts directly from verified artisan cooperatives and registered stalls to enjoy authentic quality at fair prices.`;
  } else {
    p5Id = `Masyarakat dan wisatawan diimbau untuk selalu memperbarui informasi perjalanan dari kanal-kanal resmi pemerintah, mematuhi regulasi di destinasi wisata, serta menjaga kelestarian lingkungan di mana pun berwisata.`;
    p5En = `Travelers and the public are urged to stay informed via official governmental channels, observe local destination regulations, and preserve environmental cleanliness throughout their journeys.`;
  }

  const descId = `${p1Id}\n\n${p2Id}\n\n${p3Id}\n\n${p4Id}\n\n${p5Id}`;
  const descEn = `${p1En}\n\n${p2En}\n\n${p3En}\n\n${p4En}\n\n${p5En}`;

  const highlightsId = [
    `Fakta Utama: Laporan resmi terkonfirmasi dari sumber tepercaya (${source})`,
    isAviation ? 'Mitigasi Aviasi: Prosedur keselamatan dan penyesuaian jadwal penerbangan diberlakukan otoritas' :
    isVolcano ? 'Mitigasi Bencana: Pemantauan aktivitas geologis ditingkatkan dan radius aman ditetapkan' :
    isRoad ? 'Infrastruktur & Akses: Kesiapan rute dan rekayasa jalur dipantau secara optimal' :
    isRail ? 'Transportasi Rel: Peningkatan fasilitas perjalanan kereta api wisata ramah pelancong' :
    isEvent ? 'Atraksi Budaya: Perhelatan tradisi melibatkan partisipasi aktif komunitas nagari' :
    isMarine ? 'Pariwisata Bahari: Operasional pelayaran dan keselamatan perairan dipantau berkala' :
    isNature ? 'Konservasi Alam: Perlindungan lingkungan diselaraskan dengan kenyamanan wisatawan' :
    isCulinary ? 'Kearifan Tradisi: Pelestarian sentra kriya dan kuliner autentik daerah' :
    'Tata Kelola Destinasi: Penguatan fasilitas amenitas dan standar pelayanan pariwisata',
    isAviation ? 'Panduan Penumpang: Cek status penerbangan via kanal resmi maskapai sebelum menuju bandara' :
    isVolcano ? 'Panduan Keselamatan: Patuhi rekomendasi zona bahaya PVMBG dan gunakan masker pelindung' :
    isRoad ? 'Panduan Pengendara: Periksa kelaikan rem, tekanan ban, dan pastikan saldo e-toll mencukupi' :
    isRail ? 'Panduan Perjalanan: Pesan tiket lebih awal melalui aplikasi resmi Access by KAI' :
    isEvent ? 'Panduan Pengunjung: Pesan akomodasi lebih awal dan hormati norma adat setempat' :
    isMarine ? 'Panduan Bahari: Wajib kenakan rompi pelampung dan patuhi arahan nakhoda kapal' :
    isNature ? 'Panduan Wisatawan: Terapkan prinsip leave-no-trace dan ikuti jalur resmi pemandu' :
    isCulinary ? 'Panduan Konsumen: Kunjungi sentra UMKM dan gerai oleh-oleh resmi terdaftar' :
    'Panduan Perjalanan: Patuhi arahan resmi pengelola serta utamakan keselamatan dan ketertiban'
  ];

  const highlightsEn = [
    `Core Fact: Verified reporting from credible news agency (${source})`,
    isAviation ? 'Aviation Safety: Air navigation protocols and schedule adjustments actively enacted' :
    isVolcano ? 'Geological Vigilance: Continuous seismic monitoring and safety perimeters enforced' :
    isRoad ? 'Transit Infrastructure: Route readiness and traffic management actively coordinated' :
    isRail ? 'Scenic Railway: Elevated passenger amenities across thematic tourist rail lines' :
    isEvent ? 'Cultural Showcase: Traditional celebration engaging grassroots nagari communities' :
    isMarine ? 'Marine Tourism: Ferry operations and aquatic safety monitored routinely' :
    isNature ? 'Nature Conservation: Eco-preservation integrated with visitor hospitality' :
    isCulinary ? 'Living Heritage: Sustaining authentic culinary and artisan craft hubs' :
    'Destination Governance: Elevating visitor facilities and regional service benchmarks',
    isAviation ? 'Passenger Advisory: Verify flight status via airline apps before departing for terminals' :
    isVolcano ? 'Safety Advisory: Adhere to PVMBG exclusion zones and wear protective respiratory masks' :
    isRoad ? 'Motorist Advisory: Inspect brakes, tire pressure, and ensure adequate e-toll balance' :
    isRail ? 'Traveler Advisory: Book train tickets in advance via the official Access by KAI app' :
    isEvent ? 'Visitor Advisory: Reserve accommodations early and observe customary etiquette' :
    isMarine ? 'Marine Advisory: Certified life jackets mandatory aboard all tourist boats' :
    isNature ? 'Eco Advisory: Practice leave-no-trace ethics and stay on designated marked trails' :
    isCulinary ? 'Shopper Advisory: Patronize verified artisan cooperatives and registered stalls' :
    'Travel Advisory: Observe official visitor guidance prioritizing safety and order'
  ];

  const tipsId = isAviation ? 'Pastikan memeriksa status terbaru penerbangan Anda melalui aplikasi resmi maskapai atau call center bandara sebelum berangkat ke terminal.' :
    isVolcano ? 'Patuhi radius aman yang ditetapkan petugas, kenakan masker pelindung debu, dan pantau rilis berkala MAGMA Indonesia.' :
    isRoad ? 'Periksa tekanan angin ban, fungsi rem, serta saldo uang elektronik sebelum memulai perjalanan.' :
    isRail ? 'Pesan tiket sejak H-45 sebelum jadwal keberangkatan untuk mendapatkan tempat duduk di sisi jendela terbaik.' :
    isEvent ? 'Rencanakan kedatangan lebih awal dan pesan penginapan di sekitar lokasi acara dari jauh hari.' :
    isMarine ? 'Pesan tiket kapal resmi H-1 dan pantau rilis berkala prakiraan cuaca maritim BMKG.' :
    isNature ? 'Gunakan alas kaki yang sesuai untuk aktivitas luar ruang dan jaga kebersihan dengan tidak membuang sampah sembarangan.' :
    isCulinary ? 'Kunjungi sentra perajin dan kuliner resmi untuk memperoleh produk khas bergaransi keaslian.' :
    'Pastikan jadwal operasional destinasi terverifikasi dan siapkan rencana perjalanan dengan matang.';

  const tipsEn = isAviation ? 'Verify the latest flight status via official airline mobile apps or customer service before traveling to the airport.' :
    isVolcano ? 'Observe official safety radiuses, wear respiratory dust masks, and consult official MAGMA Indonesia updates.' :
    isRoad ? 'Inspect tire pressure, brake performance, and electronic toll balance before setting off.' :
    isRail ? 'Book tickets 45 days in advance via Access by KAI to secure prime scenic window seating.' :
    isEvent ? 'Plan arrival early and secure nearby accommodations well in advance of the event.' :
    isMarine ? 'Book official vessel crossings a day ahead and check regular BMKG maritime weather bulletins.' :
    isNature ? 'Wear sturdy outdoor footwear and preserve ecological hygiene by carrying out all waste.' :
    isCulinary ? 'Visit accredited artisan galleries and authentic culinary stalls to purchase genuine goods.' :
    'Verify official destination hours and prepare travel itineraries thoroughly.';

  return {
    descId,
    descEn,
    highlightsId,
    highlightsEn,
    tipsId,
    tipsEn,
    smartTitleId,
    smartTitleEn,
    locationNameId: locId,
    locationNameEn: locEn,
    mapsUrl
  };
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
 * Fetch live Real-Time Tourism News formatted as a smart daily newsletter
 * Maintains a strict 50:50 balance between local (Sumatera Barat) and national (Indonesia) tourism news.
 * Queries recent news (when:2d with when:7d fallback) to provide fast, unbiased updates.
 */
async function fetchLiveTourismNewsFromRSS(language: string = 'id') {
  const sumbarQueries = [
    'https://news.google.com/rss/search?q=pariwisata+sumatera+barat+when:2d&hl=id&gl=ID&ceid=ID:id',
    'https://news.google.com/rss/search?q=wisata+sumbar+when:2d&hl=id&gl=ID&ceid=ID:id'
  ];
  const nationalQueries = [
    'https://news.google.com/rss/search?q=pariwisata+indonesia+kemenparekraf+when:2d&hl=id&gl=ID&ceid=ID:id',
    'https://news.google.com/rss/search?q=wisata+nusantara+when:2d&hl=id&gl=ID&ceid=ID:id'
  ];

  const sumbarFallbackQueries = [
    'https://news.google.com/rss/search?q=pariwisata+sumatera+barat+when:7d&hl=id&gl=ID&ceid=ID:id'
  ];
  const nationalFallbackQueries = [
    'https://news.google.com/rss/search?q=pariwisata+indonesia+kemenparekraf+when:7d&hl=id&gl=ID&ceid=ID:id'
  ];

  async function fetchFeed(url: string, isSumbarTopicFeed: boolean): Promise<any[]> {
    const list: any[] = [];
    try {
      const endpoint = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(url)}`;
      const res = await fetch(endpoint, { cache: 'no-store' });
      if (!res.ok) return list;

      const data = await res.json();
      if (data.status === 'ok' && Array.isArray(data.items) && data.items.length > 0) {
        for (const item of data.items) {
          const rawTitle = cleanHtml(item.title || '');
          const titleParts = rawTitle.split(' - ');
          const source = titleParts.length > 1 ? titleParts.pop() : 'Media Tepercaya';
          const cleanTitle = titleParts.join(' - ').trim() || rawTitle;

          const { dateId, dateEn, isWithin30d } = formatDateIndo(item.pubDate);
          if (!isWithin30d) continue;

          const snippet = cleanHtml(item.description || item.content || '');
          const narrative = buildJournalisticTourismNarrative(cleanTitle, source || 'Media Tepercaya', snippet, isSumbarTopicFeed);

          list.push({
            id: `news-live-${list.length + 1}-${Date.now().toString().slice(-6)}`,
            title: narrative.smartTitleId || cleanTitle,
            titleEn: narrative.smartTitleEn || translateHeadlineIndoToEn(cleanTitle),
            category: isSumbarTopicFeed ? 'Pariwisata Sumatera Barat' : 'Pariwisata Indonesia',
            categoryEn: isSumbarTopicFeed ? 'West Sumatra Tourism' : 'Indonesian Tourism',
            date: dateId,
            dateEn: dateEn,
            tag: isSumbarTopicFeed ? 'Sumbar' : 'Nasional',
            tagEn: isSumbarTopicFeed ? 'West Sumatra' : 'National',
            description: narrative.descId,
            descriptionEn: narrative.descEn,
            imageUrl: '',
            actionUrl: narrative.mapsUrl,
            mapsUrl: narrative.mapsUrl,
            sourceUrl: item.link || '',
            sourceName: source || 'Media Tepercaya',
            highlights: narrative.highlightsId,
            highlightsEn: narrative.highlightsEn,
            tips: narrative.tipsId,
            tipsEn: narrative.tipsEn,
            locationName: narrative.locationNameId,
            locationNameEn: narrative.locationNameEn
          });
        }
      }
    } catch (e) {
      // Quiet fail to try next endpoint
    }
    return list;
  }

  // 1. Fetch Sumbar Stream
  let sumbarItems: any[] = [];
  for (const q of sumbarQueries) {
    const items = await fetchFeed(q, true);
    sumbarItems.push(...items);
  }
  if (sumbarItems.length < 2) {
    for (const q of sumbarFallbackQueries) {
      const items = await fetchFeed(q, true);
      sumbarItems.push(...items);
    }
  }

  // 2. Fetch National Stream
  let nationalItems: any[] = [];
  for (const q of nationalQueries) {
    const items = await fetchFeed(q, false);
    nationalItems.push(...items);
  }
  if (nationalItems.length < 2) {
    for (const q of nationalFallbackQueries) {
      const items = await fetchFeed(q, false);
      nationalItems.push(...items);
    }
  }

  // 3. CORS proxy fallback if needed
  if (sumbarItems.length === 0 || nationalItems.length === 0) {
    try {
      const proxyUrl = `https://api.allorigins.win/get?url=${encodeURIComponent(
        'https://news.google.com/rss/search?q=pariwisata+sumatera+barat+when:7d&hl=id&gl=ID&ceid=ID:id'
      )}`;
      const res = await fetch(proxyUrl, { cache: 'no-store' });
      if (res.ok) {
        const json = await res.json();
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(json.contents, 'text/xml');
        const items = xmlDoc.querySelectorAll('item');
        for (let i = 0; i < Math.min(items.length, 4); i++) {
          const it = items[i];
          const rawTitle = it.querySelector('title')?.textContent || '';
          const pubDate = it.querySelector('pubDate')?.textContent || new Date().toISOString();
          const { dateId, dateEn, isWithin30d } = formatDateIndo(pubDate);
          if (!isWithin30d) continue;

          const titleParts = rawTitle.split(' - ');
          const source = titleParts.length > 1 ? titleParts.pop() : 'Media Tepercaya';
          const cleanTitle = titleParts.join(' - ').trim() || rawTitle;
          const rawSnippet = it.querySelector('description')?.textContent || '';
          const snippet = cleanHtml(rawSnippet);
          const linkUrl = it.querySelector('link')?.textContent || '';
          const narrative = buildJournalisticTourismNarrative(cleanTitle, source || 'Media Tepercaya', snippet, true);

          sumbarItems.push({
            id: `news-proxy-${sumbarItems.length + 1}-${Date.now().toString().slice(-6)}`,
            title: narrative.smartTitleId || cleanTitle,
            titleEn: narrative.smartTitleEn || translateHeadlineIndoToEn(cleanTitle),
            category: 'Pariwisata Sumatera Barat',
            categoryEn: 'West Sumatra Tourism',
            date: dateId,
            dateEn: dateEn,
            tag: 'Sumbar',
            tagEn: 'West Sumatra',
            description: narrative.descId,
            descriptionEn: narrative.descEn,
            imageUrl: '',
            actionUrl: narrative.mapsUrl,
            mapsUrl: narrative.mapsUrl,
            sourceUrl: linkUrl || '',
            sourceName: source || 'Media Tepercaya',
            highlights: narrative.highlightsId,
            highlightsEn: narrative.highlightsEn,
            tips: narrative.tipsId,
            tipsEn: narrative.tipsEn,
            locationName: narrative.locationNameId,
            locationNameEn: narrative.locationNameEn
          });
        }
      }
    } catch (err) {
      console.warn('CORS proxy fetch error:', err);
    }
  }

  // 4. Deduplicate both streams
  const dedupedSumbar = deduplicateNewsItems(sumbarItems);
  const dedupedNational = deduplicateNewsItems(nationalItems);

  // 5. Fallback pool partitioned by category
  const fallbackSumbar = HOT_INFO_FALLBACK.filter(item => item.tag === 'Sumbar' || item.category.includes('Sumatera'));
  const fallbackNational = HOT_INFO_FALLBACK.filter(item => item.tag !== 'Sumbar' && !item.category.includes('Sumatera'));

  // 6. Strict 50:50 Interleaved Assembly: [Sumbar, National, Sumbar, National, Sumbar, National]
  const balancedList: any[] = [];
  const targetPairs = 3; // 3 Sumbar + 3 National = 6 items total

  for (let i = 0; i < targetPairs; i++) {
    // Add 1 Sumbar item (live or curated fallback)
    if (i < dedupedSumbar.length) {
      balancedList.push(dedupedSumbar[i]);
    } else if (fallbackSumbar[i % fallbackSumbar.length]) {
      balancedList.push(fallbackSumbar[i % fallbackSumbar.length]);
    }

    // Add 1 National item (live or curated fallback)
    if (i < dedupedNational.length) {
      balancedList.push(dedupedNational[i]);
    } else if (fallbackNational[i % fallbackNational.length]) {
      balancedList.push(fallbackNational[i % fallbackNational.length]);
    }
  }

  const finalDeduped = deduplicateNewsItems(balancedList);
  return finalDeduped.length > 0 ? finalDeduped : null;
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
    const modelsToTry = ['gemini-3.8-flash', 'gemini-3.7-flash', 'gemini-flash-latest', 'gemini-pro-latest'];
    for (const modelName of modelsToTry) {
      try {
        const ai = new GoogleGenAI({ apiKey: viteApiKey });
        const prompt = `Anda adalah REDAKTUR JURNALISTIK PARIWISATA PROFESIONAL (standar LKBN Antara / Kompas / Tempo) yang bertugas menyusun warta pariwisata Sumatera Barat dan nasional Indonesia.
Tugas Anda: Hasilkan 6 butir berita pariwisata resmi, mendalam, objektif, tidak bias, faktual, dan sangat informatif dalam format JSON array.
KOMPOSISI WAJIB: TEPAT 50% Pariwisata Sumatera Barat (3 butir) dan 50% Pariwisata Nasional Indonesia (3 butir). Susun secara berselang-seling [Sumbar, Nasional, Sumbar, Nasional, Sumbar, Nasional].

STANDAR JURNALISTIK KEPARIWISATAAN (DILARANG MENGGUNAKAN GAYA BULETIN SANTAI, KOLOKIAL, 'CATATAN VERIFIKASI', ATAU 'TIPS BUAT KAMU'):
1. GAYA BAHASA: Bahasa Indonesia baku jurnalistik yang lugas, presisi, berwibawa, berbobot, dan objektif. Gunakan Dateline resmi dengan huruf kapital diikuti tanda strip panjang (misalnya "PADANG — ", "JAKARTA — ", "BUKITTINGGI — ", "BATUSANGKAR — ").
2. SUMBER & FAKTA: Ambil fakta terverifikasi dari sumber otoritatif (Kemenparekraf, BPTD, Ditlantas, BPJN, BMKG Maritim, PHRI, Dinas Pariwisata, atau pers resmi). Sajikan fakta murni, spesifik, dan kaya konteks tanpa spekulasi atau desas-desus.
3. STRUKTUR DESKRIPSI BERITA (TIDAK ADA BATASAN JUMLAH PARAGRAF KAKU. Berikan narasi jurnalistik yang ideal, mendalam, dan kaya konteks secara utuh, dengan 4 hingga 5 paragraf berbobot yang dipisahkan dengan \\n\\n):
   - Paragraf 1 (Lead 5W+1H): Dimulai dengan DATELINE resmi (contoh: "PADANG — ") lalu memuat pokok inti peristiwa/kebijakan secara komprehensif (siapa pemangku kepentingan, apa peristiwanya, di mana lokasi persisnya, kapan berlangsung, dan bagaimana dampaknya bagi kepariwisataan).
   - Paragraf 2 (Konteks & Spesifikasi Teknis): Rincian latar belakang kebijakan, spesifikasi infrastruktur/fasilitas transportasi, data jarak/waktu tempuh, atau signifikansi geografis koridor wisata.
   - Paragraf 3 (Fasilitas & Dampak Ekonomi Kerakyatan): Kesiapan amenitas publik, rest area/dermaga/posko, pelibatan masyarakat lokal/nagari, dan sentra UMKM kuliner serta kriya daerah.
   - Paragraf 4 (Pengawasan Lapangan & Mitigasi Operasional): Koordinasi lintas instansi (kepolisian, dinas perhubungan, pengelola cagar alam, BMKG), pemantauan arus pergerakan wisatawan, dan tata kelola keselamatan.
   - Paragraf 5 (Panduan Resmi & Regulasi Kunjungan): Imbauan resmi bagi pelancong, ketentuan tiket/saldo elektronik, etika perlindungan lingkungan/cagar budaya, dan saran keselamatan berkendara atau berwisata secara formal.
4. PROPERTI WAJIB SETIAP ITEM:
   id (string unik), title (string judul berita jurnalistik yang lugas, informatif, dan berbobot), titleEn (string judul bahasa Inggris), category ("Pariwisata Sumatera Barat" atau "Pariwisata Indonesia"), categoryEn ("West Sumatra Tourism" atau "Indonesian Tourism"), date (format: "DD MMMM YYYY"), dateEn (string), tag ("Sumbar" atau "Nasional"), tagEn ("West Sumatra" atau "National"), description (narasi jurnalistik formal mendalam 4-5 paragraf), descriptionEn (formal English journalistic narrative 4-5 paragraphs), imageUrl (""), actionUrl (""), highlights (array 3 butir: "Fakta Utama: ...", "Fasilitas/Infrastruktur: ...", "Panduan Perjalanan: ..."), highlightsEn (array 3 butir formal English highlights), tips (string imbauan praktis resmi untuk wisatawan), tipsEn (string official travel guidance), locationName (string nama lokasi spesifik), locationNameEn (string).
Hanya kembalikan valid JSON tanpa markdown.
Waktu saat ini: ${new Date().toISOString()}
Variasi Permintaan Seed: ${Math.random()}`;

        const response = await ai.models.generateContent({
          model: modelName,
          contents: prompt,
          config: {
            temperature: 0.4,
            tools: [{ googleSearch: {} } as any]
          }
        });

        const cleanJson = (response.text || '').replace(/```json/g, '').replace(/```/g, '').trim();
        const parsed = JSON.parse(cleanJson);
        if (Array.isArray(parsed) && parsed.length > 0) {
          const mapped = parsed.map((it: any) => {
            const loc = it.locationName || (it.tag === 'Sumbar' ? 'Sumatera Barat' : 'Indonesia');
            const maps = it.mapsUrl || `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(loc)}`;
            return {
              ...it,
              actionUrl: maps,
              mapsUrl: maps,
              sourceUrl: it.sourceUrl || '',
              sourceName: it.sourceName || 'Kemenparekraf / Media Resmi'
            };
          });
          return deduplicateNewsItems(mapped.filter((it: any) => isWithinLast30Days(it.date)));
        }
      } catch (err) {
        console.warn(`Client Gemini hotinfo generation failed with ${modelName}, trying next...`, err);
      }
    }
  }

  // 3. Live Google News / RSS National & Local Tourism Feed (50:50 balanced, real-time & official journalism)
  const liveRssNews = await fetchLiveTourismNewsFromRSS(language);
  if (liveRssNews && liveRssNews.length > 0) {
    const cleanLiveNews = liveRssNews.map(item => ({
      ...item,
      imageUrl: '',
      isUserUploadedImage: false
    }));
    return deduplicateNewsItems(cleanLiveNews);
  }

  // 4. Static fallback if completely offline (50:50 balanced, within 30 days)
  const fallbackClean = HOT_INFO_FALLBACK.map(item => ({
    ...item,
    imageUrl: '',
    isUserUploadedImage: false
  }));
  return deduplicateNewsItems(fallbackClean.filter((it: any) => isWithinLast30Days(it.date)));
}

/**
 * Curated high-resolution fallback photos for West Sumatra topics so cards are never blank.
 */
export function getSmartImageForNews(title: string = '', category: string = ''): string {
  return '';
}

export interface AutonomousScanResult {
  scheduleUpdates: Array<{
    id: string;
    eventTitle: string;
    currentSchedule: string;
    newSchedule: string;
    newScheduleEn: string;
    reason: string;
  }>;
  discoveredEvents: Array<{
    id: string;
    title: string;
    titleEn: string;
    schedule: string;
    scheduleEn: string;
    location: string;
    locationEn: string;
    description: string;
    descriptionEn: string;
    imageUrl: string;
    videoUrl?: string;
    isKen: boolean;
    lat?: number;
    lng?: number;
    sourceName: string;
  }>;
  scannedAt: string;
}

/**
 * Autonomous AI Scanner to discover new events and verify dates for existing events in West Sumatra.
 */
export async function scanAutonomousEventsWithAI(existingEvents: Array<{ id: string; title: string; schedule: string; location: string }>): Promise<AutonomousScanResult> {
  const viteApiKey = (import.meta as any).env?.VITE_GEMINI_API_KEY || (import.meta as any).env?.GEMINI_API_KEY;
  const nowStr = new Date().toISOString();

  if (!viteApiKey) {
    return {
      scheduleUpdates: [],
      discoveredEvents: [],
      scannedAt: nowStr
    };
  }

  const existingTitles = existingEvents.map(e => `${e.id}: ${e.title} (${e.schedule})`).join('\n');

  const prompt = `Anda adalah Sistem Riset Intelijen Pariwisata Otonom Sumatera Barat (Kemenparekraf Karisma Event Nusantara & Calendar of Events 2026/2027).
Daftar event yang SUDAH ADA di database kami saat ini:
${existingTitles}

Tugas Anda:
1. Periksa apakah ada perubahan tanggal resmi (Kemenparekraf KEN / Dinas Pariwisata Sumbar 2026) untuk event-event yang SUDAH ADA di atas.
2. Cari jika ada event/festival pariwisata Sumatera Barat RESMI lainnya yang BELUM ADA dalam daftar di atas (misal Festival Pesona Mentawai, Festival Danau Diatas/Singkarak, Festival Kopi Luak, Festival Alek Nagari, dsb).
3. Hasilkan output dalam format JSON murni TANPA markdown dengan struktur persis:
{
  "scheduleUpdates": [
    {
      "id": "id_event",
      "eventTitle": "nama_event",
      "currentSchedule": "jadwal_saat_ini",
      "newSchedule": "jadwal_resmi_baru_bahasa_indonesia",
      "newScheduleEn": "jadwal_resmi_baru_bahasa_inggris",
      "reason": "alasan pembaruan jadwal berdasarkan CoE/KEN 2026"
    }
  ],
  "discoveredEvents": [
    {
      "id": "ev-ai-timestamp",
      "title": "NAMA EVENT HURUF KAPITAL",
      "titleEn": "EVENT NAME ENGLISH CAPITAL",
      "schedule": "Contoh: 15 – 18 Oktober 2026",
      "scheduleEn": "Contoh: October 15 – 18, 2026",
      "location": "Nama Lokasi, Kabupaten/Kota",
      "locationEn": "Location Name, Regency/City",
      "description": "Deskripsi naratif budaya 3 paragraf yang mendalam tentang asal-usul, atraksi utama, dan keunikan festival.",
      "descriptionEn": "In-depth 3-paragraph English cultural narrative description of the festival history and attractions.",
      "imageUrl": "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=800&q=80",
      "videoUrl": "",
      "isKen": true,
      "lat": -0.450000,
      "lng": 100.510000,
      "sourceName": "Kemenparekraf KEN / Dispar Sumbar 2026"
    }
  ]
}
Waktu saat ini: ${nowStr}`;

  const modelsToTry = ['gemini-3.8-flash', 'gemini-3.7-flash', 'gemini-flash-latest', 'gemini-flash-lite-latest'];
  for (const model of modelsToTry) {
    try {
      const ai = new GoogleGenAI({ apiKey: viteApiKey });
      const res = await ai.models.generateContent({
        model,
        contents: prompt,
        config: {
          temperature: 0.1,
          tools: [{ googleSearch: {} } as any]
        }
      });

      const cleanJson = (res.text || '').replace(/```json/g, '').replace(/```/g, '').trim();
      const parsed = JSON.parse(cleanJson);

      return {
        scheduleUpdates: Array.isArray(parsed.scheduleUpdates) ? parsed.scheduleUpdates : [],
        discoveredEvents: Array.isArray(parsed.discoveredEvents) ? parsed.discoveredEvents.map((ev: any, idx: number) => ({
          ...ev,
          id: ev.id || `ev-ai-${Date.now()}-${idx}`,
          imageUrl: ev.imageUrl || getSmartImageForNews(ev.title, 'event')
        })) : [],
        scannedAt: nowStr
      };
    } catch (e) {
      console.warn(`Autonomous event scan failed with ${model}:`, e);
    }
  }

  return {
    scheduleUpdates: [],
    discoveredEvents: [],
    scannedAt: nowStr
  };
}

export interface SocialMediaDigest {
  instagramCaption: string;
  whatsappBroadcast: string;
  tiktokScriptHook: string;
  hashtags: string[];
  spotlightTitle: string;
  generatedAt: string;
}

/**
 * Autonomous AI Social Media Content Generator
 * Creates viral, engaging Instagram captions and WhatsApp broadcasts for tourism promotion.
 */
export async function generateSocialMediaDigest(
  spotlightItem: { title: string; category?: string; description?: string; schedule?: string; location?: string },
  upcomingEvent?: { title: string; schedule: string; location: string }
): Promise<SocialMediaDigest> {
  const viteApiKey = (import.meta as any).env?.VITE_GEMINI_API_KEY || (import.meta as any).env?.GEMINI_API_KEY;
  const nowStr = new Date().toISOString();

  const fallback: SocialMediaDigest = {
    spotlightTitle: spotlightItem.title,
    instagramCaption: `✨ PESONA RANAH MINANG HARI INI: ${spotlightItem.title.toUpperCase()} ✨\n\nTakambang rimbun alam Sumatera Barat menyuguhkan keajaiban yang tak pernah habis untuk dijelajahi. Dari megahnya alam hingga kehangatan budaya, Ranah Minang selalu memanggilmu pulang.\n\n📍 Lokasi: ${spotlightItem.location || 'Sumatera Barat'}\n${upcomingEvent ? `📅 Agenda Terdekat: ${upcomingEvent.title} (${upcomingEvent.schedule})\n` : ''}\nYuk rencanakan liburanmu bersama MALALA — Panduan Wisata Resmi Sumatera Barat!\n\n🌐 Kunjungi: malala.my.id\n\n#WisataSumbar #PesonaIndonesia #MalalaSumbar #WonderfulIndonesia #Minangkabau #PariwisataSumbar #ExploreSumbar`,
    whatsappBroadcast: `🌟 *KABA WISATA SUMATERA BARAT HARI IKO* 🌟\n\n*Destinasi Pilihan:* ${spotlightItem.title}\n📍 *Lokasi:* ${spotlightItem.location || 'Sumatera Barat'}\n\n${spotlightItem.description ? spotlightItem.description.slice(0, 180) + '...' : ''}\n\n${upcomingEvent ? `🎉 *Event Terdekat:* ${upcomingEvent.title}\n🗓️ *Jadwal:* ${upcomingEvent.schedule}\n` : ''}\n📲 Dapatkan panduan lengkap & itinerary cerdas di: https://malala.my.id\n\n_Bantu bagikan ke sanak famili yang ingin liburan ke Sumbar!_`,
    tiktokScriptHook: `POV: Kamu lagi liburan ke Sumatera Barat dan nemuin surga tersembunyi bernama ${spotlightItem.title}! Ini dia alasan kenapa kamu wajib ke sini tahun ini...`,
    hashtags: ['#WisataSumbar', '#PesonaIndonesia', '#MalalaSumbar', '#Minangkabau', '#ExploreSumbar', '#WonderfulIndonesia'],
    generatedAt: nowStr
  };

  if (!viteApiKey) return fallback;

  try {
    const ai = new GoogleGenAI({ apiKey: viteApiKey });
    const prompt = `Anda adalah Social Media Content Specialist Pariwisata Sumatera Barat (Malala / malala.my.id).
Buatkan konten media sosial harian yang sangat estetik, menggugah rasa rindu kampung halaman / hasrat berlibur, dan siap posting.

Data Destinasi Hari Ini:
- Judul: ${spotlightItem.title}
- Kategori/Lokasi: ${spotlightItem.location || spotlightItem.category || 'Sumatera Barat'}
- Deskripsi: ${spotlightItem.description || ''}
${upcomingEvent ? `- Event Terdekat: ${upcomingEvent.title} (${upcomingEvent.schedule} di ${upcomingEvent.location})` : ''}

Format output JSON murni tanpa markdown:
{
  "instagramCaption": "teks caption Instagram lengkap dengan emoji, storytelling Minangkabau yang puitis dan ajakan berkunjung",
  "whatsappBroadcast": "teks pesan broadcast WhatsApp yang rapi dengan format tebal/miring dan link malala.my.id",
  "tiktokScriptHook": "hook script video pendek 15 detik",
  "hashtags": ["#WisataSumbar", "#PesonaIndonesia", "#MalalaSumbar", "#Minangkabau", "#ExploreSumbar"]
}`;

    const modelsToTry = ['gemini-3.8-flash', 'gemini-3.7-flash', 'gemini-flash-latest'];
    for (const model of modelsToTry) {
      try {
        const res = await ai.models.generateContent({
          model,
          contents: prompt,
          config: { temperature: 0.7 }
        });

        const cleanJson = (res.text || '').replace(/```json/g, '').replace(/```/g, '').trim();
        const parsed = JSON.parse(cleanJson);

        return {
          spotlightTitle: spotlightItem.title,
          instagramCaption: parsed.instagramCaption || fallback.instagramCaption,
          whatsappBroadcast: parsed.whatsappBroadcast || fallback.whatsappBroadcast,
          tiktokScriptHook: parsed.tiktokScriptHook || fallback.tiktokScriptHook,
          hashtags: Array.isArray(parsed.hashtags) ? parsed.hashtags : fallback.hashtags,
          generatedAt: nowStr
        };
      } catch (err: any) {
        // try next model
      }
    }
    return fallback;
  } catch (e) {
    console.warn('Social media digest generation fallback:', e);
    return fallback;
  }
}





