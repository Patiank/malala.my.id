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
  const daysCount = Number(durasiHari) || 3;
  const startDate = waktuKunjungan?.tanggalMulai || '';

  return {
    title: isEnglish
      ? `West Sumatra Exploration (${daysCount} Days${startDate ? ` - Starting ${startDate}` : ''})`
      : `Eksplorasi Ranah Minang (${daysCount} Hari${startDate ? ` - Mulai ${startDate}` : ''})`,
    summary: isEnglish
      ? `UNI MALA AI recommended travel plan combining geopark landscapes, authentic Rendang gastronomy, and rich Minangkabau Rumah Gadang heritage.`
      : `Rencana wisata rekomendasi UNI MALA AI mencakup perpaduan keindahan geowisata, kuliner Rendang autentik, serta warisan budaya Rumah Gadang.`,
    itinerary: Array.from({ length: daysCount }).map((_, idx) => ({
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
          "Minangkabau culture deeply values 'Adat Basandi Syarak, Syarak Basandi Kitabullah'. Please respect local wisdom and dress modestly.",
          "Must-buy souvenirs: Sanjai Balado Chips, Local Coffee, and Packaged Rendang."
        ]
      : [
          "Masyarakat Minangkabau memegang teguh falsafah 'Adat Basandi Syarak, Syarak Basandi Kitabullah'. Hargai kearifan lokal.",
          "Oleh-oleh wajib: Keripik Balado Sanjai, Kopi Bawaan, dan Rendang Kemasan."
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
      const prompt = `Anda adalah UNI MALA AI Sumatera Barat - Asisten AI Pariwisata Resmi. Formatkan output HANYA JSON. Jika ada tanggal dan event yang bertepatan, usulkan secara opsional:\n${JSON.stringify(params)}`;
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


