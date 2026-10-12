import { DownloadItem, HotInfoItem } from '../types';

export const RAW_BG_IMAGE_1 = "/images/bg-cover-1.webp";
export const RAW_BG_IMAGE_2 = "/images/bg-cover-2.webp";

// Fast & 100% Free Egress CDN via Official GitHub Releases (Zero Firebase bandwidth consumed, 100% bypasses Kominfo/ISP blocks)
export const GITHUB_RELEASES_BASE = "https://github.com/Patiank/malala.my.id/releases/download/v1.0.0";

export const OFFICIAL_PDF_URLS = {
  panduanId: `${GITHUB_RELEASES_BASE}/malala-panduan-wisata-sumbar-2026.pdf`,
  panduanEn: `${GITHUB_RELEASES_BASE}/malala-tourism-guide-sumbar-2026-en.pdf`,
  eventsId: `${GITHUB_RELEASES_BASE}/kalender-event-sumbar-2026.pdf`,
  eventsEn: `${GITHUB_RELEASES_BASE}/kalender-event-sumbar-2026-en.pdf`,
};

export function getDirectDriveUrl(url: string): string {
  if (!url) return '';
  if (url.startsWith('data:') || url.startsWith('/')) return url;
  const matchFileD = url.match(/\/file\/d\/([a-zA-Z0-9_-]+)/);
  if (matchFileD && matchFileD[1]) {
    return `https://lh3.googleusercontent.com/d/${matchFileD[1]}`;
  }
  const matchIdParam = url.match(/[?&]id=([a-zA-Z0-9_-]+)/);
  if (matchIdParam && matchIdParam[1]) {
    return `https://lh3.googleusercontent.com/d/${matchIdParam[1]}`;
  }
  return url;
}

export const BG_IMAGE_1 = "/images/bg-cover-1.webp";
export const BG_IMAGE_2 = "/images/bg-cover-2.webp";

export const HOT_INFO_ITEMS: HotInfoItem[] = [
  {
    id: 'hi1',
    title: 'Kemenpar Pantau Dampak Erupsi Gunung Anak Krakatau terhadap Pariwisata dan Akses Transportasi',
    titleEn: 'Tourism Ministry Monitors Impact of Mount Anak Krakatau Eruption on Travel and Transport Routes',
    category: 'Pariwisata Sumatera Barat',
    categoryEn: 'West Sumatra Tourism',
    date: '06 September 2026',
    dateEn: 'September 06, 2026',
    timeAgo: '3 jam lalu',
    sourceName: 'Antara News Sumbar',
    sourceDomain: 'sumbar.antaranews.com',
    sourceUrl: 'https://sumbar.antaranews.com/berita/777352/kemenpar-pantau-dampak-erupsi-gunung-anak-krakatau-terhadap-pariwisata',
    sourceIcon: 'https://www.google.com/s2/favicons?domain=antaranews.com&sz=64',
    imageUrl: '',
    tag: 'Sumbar',
    tagEn: 'West Sumatra',
    actionUrl: 'https://sumbar.antaranews.com/berita/777352/kemenpar-pantau-dampak-erupsi-gunung-anak-krakatau-terhadap-pariwisata',
    mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Gunung+Anak+Krakatau',
    locationName: 'Sumatera Barat & Koridor Selat Sunda',
    locationNameEn: 'West Sumatra & Sunda Strait Corridor',
    description: 'Kementerian Pariwisata Republik Indonesia bersama otoritas transportasi dan BMKG memantau ketat pergerakan abu vulkanik erupsi Gunung Anak Krakatau guna memastikan keselamatan penerbangan dan perjalanan wisatawan.',
    descriptionEn: 'The Indonesian Ministry of Tourism alongside transportation authorities and BMKG is closely monitoring Mount Anak Krakatau volcanic ash to ensure flight and tourist transit safety.',
    relatedStories: [
      {
        title: 'Ramai soal Gas SO2 dan Sebaran Abu Anak Krakatau, Begini Penjelasan Resmi Badan Geologi',
        titleEn: 'Geological Agency Clarifies Dispersion of Anak Krakatau Volcanic Ash and SO2',
        sourceName: 'Kompas.com',
        sourceDomain: 'kompas.com',
        sourceUrl: 'https://travel.kompas.com',
        timeAgo: '6 jam lalu',
        sourceIcon: 'https://www.google.com/s2/favicons?domain=kompas.com&sz=64'
      },
      {
        title: 'Penerbangan dan Rute Penyeberangan Wisata Dipastikan Terkendali Pascapergerakan Abu Vulkanik',
        titleEn: 'Flights and Marine Tourist Ferry Crossings Monitored Safe Amid Volcanic Advisory',
        sourceName: 'news.detik.com',
        sourceDomain: 'detik.com',
        sourceUrl: 'https://news.detik.com',
        timeAgo: '1 jam lalu',
        sourceIcon: 'https://www.google.com/s2/favicons?domain=detik.com&sz=64'
      },
      {
        title: 'Satgas dan Jajaran Polres Siagakan Posko Kesehatan dan Masker bagi Pengguna Jalan',
        titleEn: 'Police Deploy Integrated Health Posts and Face Masks along Travel Corridors',
        sourceName: 'Tribrata News',
        sourceDomain: 'tribratanews.polri.go.id',
        sourceUrl: 'https://tribratanews.polri.go.id',
        timeAgo: '3 jam lalu',
        sourceIcon: 'https://www.google.com/s2/favicons?domain=tribratanews.polri.go.id&sz=64'
      }
    ]
  },
  {
    id: 'hi2',
    title: 'Uji Laik Fungsi Tol Padang-Sicincin 36,6 Km Tuntas: Pangkas Waktu Tempuh Padang ke Bukittinggi Jadi 45 Menit',
    titleEn: 'Padang-Sicincin 36.6 Km Expressway Testing Finished: Slashes Padang to Bukittinggi Trip to 45 Minutes',
    category: 'Pariwisata Sumatera Barat',
    categoryEn: 'West Sumatra Tourism',
    date: '06 September 2026',
    dateEn: 'September 06, 2026',
    timeAgo: '4 jam lalu',
    sourceName: 'Padang Ekspres',
    sourceDomain: 'padek.jawapos.com',
    sourceUrl: 'https://padek.jawapos.com/padang-pariaman/2365049381/uji-laik-fungsi-tol-padang-sicincin-tuntas',
    sourceIcon: 'https://www.google.com/s2/favicons?domain=jawapos.com&sz=64',
    imageUrl: '',
    tag: 'Sumbar',
    tagEn: 'West Sumatra',
    actionUrl: 'https://padek.jawapos.com/padang-pariaman/2365049381/uji-laik-fungsi-tol-padang-sicincin-tuntas',
    mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Tol+Padang+Sicincin',
    locationName: 'Ruas Tol Padang - Sicincin, Padang Pariaman',
    locationNameEn: 'Padang - Sicincin Expressway, Padang Pariaman',
    description: 'Uji laik fungsi jalan tol perdana di Sumatera Barat ruas Padang - Sicincin sepanjang 36,6 km resmi selesai dan siap memangkas waktu tempuh wisatawan menuju dataran tinggi Minangkabau.',
    descriptionEn: 'Feasibility testing for West Sumatra first 36.6-km Padang - Sicincin expressway is officially complete, dramatically cutting travel times to the Minangkabau highlands.',
    relatedStories: [
      {
        title: 'Rest Area KM 23 Arsitektur Gonjong Rumah Gadang Alokasikan 70 Persen Gerai untuk UMKM Kuliner Minang',
        titleEn: 'Gonjong-Roofed Rest Area KM 23 Dedicates 70 Percent Space to Minang Culinary MSMEs',
        sourceName: 'Antara News Sumbar',
        sourceDomain: 'sumbar.antaranews.com',
        sourceUrl: 'https://sumbar.antaranews.com',
        timeAgo: '7 jam lalu',
        sourceIcon: 'https://www.google.com/s2/favicons?domain=antaranews.com&sz=64'
      },
      {
        title: 'Konektivitas Wisatawan Lembah Anai dan Dataran Tinggi Semakin Nyaman Bebas Hambatan',
        titleEn: 'Seamless Travel Corridor for Anai Valley and Bukittinggi Highland Visitors',
        sourceName: 'Langgam.id',
        sourceDomain: 'langgam.id',
        sourceUrl: 'https://langgam.id',
        timeAgo: '12 jam lalu',
        sourceIcon: 'https://www.google.com/s2/favicons?domain=langgam.id&sz=64'
      }
    ]
  },
  {
    id: 'hi3',
    title: 'Kharisma Event Nusantara 2026: Pacu Jawi Tanah Datar dan Festival Tabuik Pariaman Masuk Agenda Unggulan Nasional',
    titleEn: 'National Event Calendar: Pacu Jawi Bull Race & Pariaman Tabuik Festival Featured in 2026 Flagship Roster',
    category: 'Pariwisata Sumatera Barat',
    categoryEn: 'West Sumatra Tourism',
    date: '05 September 2026',
    dateEn: 'September 05, 2026',
    timeAgo: '8 jam lalu',
    sourceName: 'Harian Haluan',
    sourceDomain: 'harianhaluan.com',
    sourceUrl: 'https://harianhaluan.com/wisata/festival-budaya-sumbar-ken-2026',
    sourceIcon: 'https://www.google.com/s2/favicons?domain=harianhaluan.com&sz=64',
    imageUrl: '',
    tag: 'Sumbar',
    tagEn: 'West Sumatra',
    actionUrl: 'https://harianhaluan.com/wisata/festival-budaya-sumbar-ken-2026',
    mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Tanah+Datar+Sumatera+Barat',
    locationName: 'Tanah Datar & Pantai Gandoriah, Kota Pariaman',
    locationNameEn: 'Tanah Datar & Gandoriah Beach, Pariaman',
    description: 'Dua atraksi budaya akbar Minangkabau yakni Alek Nagari Pacu Jawi dan Pesona Budaya Tabuik resmi dinobatkan masuk dalam agenda unggulan Kharisma Event Nusantara (KEN) 2026.',
    descriptionEn: 'Two iconic Minangkabau cultural spectacles—Pacu Jawi in Tanah Datar and Tabuik in Pariaman—have been officially curated into the national 2026 KEN flagship roster.',
    relatedStories: [
      {
        title: 'Dispar Sumbar Targetkan Lonjakan Wisatawan Mancanegara Lewat Dua Kharisma Event Nusantara',
        titleEn: 'West Sumatra Tourism Targets Foreign Visitor Boost via Two Premier KEN Celebrations',
        sourceName: 'Antara News Sumbar',
        sourceDomain: 'sumbar.antaranews.com',
        sourceUrl: 'https://sumbar.antaranews.com',
        timeAgo: '10 jam lalu',
        sourceIcon: 'https://www.google.com/s2/favicons?domain=antaranews.com&sz=64'
      },
      {
        title: 'Menikmati Sensasi Balap Sapi Berlumpur di Kaki Marapi dan Kemegahan Menara Tabuik 12 Meter',
        titleEn: 'Experiencing Thrilling Mud Racing under Marapi and 12-Meter Majestic Coastal Shrines',
        sourceName: 'travel.kompas.com',
        sourceDomain: 'kompas.com',
        sourceUrl: 'https://travel.kompas.com',
        timeAgo: '1 hari lalu',
        sourceIcon: 'https://www.google.com/s2/favicons?domain=kompas.com&sz=64'
      }
    ]
  },
  {
    id: 'hi4',
    title: 'Gerakan Bangga Berwisata di Indonesia: Akselerasi Target 1,5 Miliar Perjalanan Nusantara di 5 Destinasi Super Prioritas',
    titleEn: 'Proud to Travel in Indonesia Initiative: Accelerating 1.5 Billion Trips Across 5 Super Priority Destinations',
    category: 'Pariwisata Indonesia',
    categoryEn: 'Indonesian Tourism',
    date: '05 September 2026',
    dateEn: 'September 05, 2026',
    timeAgo: '1 hari lalu',
    sourceName: 'travel.kompas.com',
    sourceDomain: 'kompas.com',
    sourceUrl: 'https://travel.kompas.com/read/2026/09/05/bangga-berwisata-di-indonesia-dpsp',
    sourceIcon: 'https://www.google.com/s2/favicons?domain=kompas.com&sz=64',
    imageUrl: '',
    tag: 'Nasional',
    tagEn: 'National',
    actionUrl: 'https://travel.kompas.com/read/2026/09/05/bangga-berwisata-di-indonesia-dpsp',
    mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Danau+Toba+Sumatera+Utara',
    locationName: 'Destinasi Super Prioritas Indonesia (DPSP)',
    locationNameEn: 'Indonesian Super Priority Destinations (DPSP)',
    description: 'Pemerintah bersama asosiasi perhotelan dan agen perjalanan daring menggencarkan stimulus liburan domestik untuk mendorong pergerakan wisatawan nusantara ke destinasi super prioritas.',
    descriptionEn: 'The Indonesian government alongside hospitality and airline partners accelerates domestic travel incentives across 5 Super Priority Tourism Destinations.',
    relatedStories: [
      {
        title: 'Kemenparekraf Hadirkan Paket Bundling Penerbangan Domestik dan Homestay Berbasis QRIS',
        titleEn: 'Ministry Introduces Domestic Flight & Homestay Bundles Powered by Digital QRIS',
        sourceName: 'detikTravel',
        sourceDomain: 'detik.com',
        sourceUrl: 'https://travel.detik.com',
        timeAgo: '1 hari lalu',
        sourceIcon: 'https://www.google.com/s2/favicons?domain=detik.com&sz=64'
      },
      {
        title: 'Pemerataan Wisatawan Nusantara Dorong Kebangkitan Ratusan Desa Wisata Mandiri',
        titleEn: 'Domestic Travel Inflow Fuels Sustainable Resurgence of Rural Tourism Villages',
        sourceName: 'CNN Indonesia',
        sourceDomain: 'cnnindonesia.com',
        sourceUrl: 'https://www.cnnindonesia.com',
        timeAgo: '2 hari lalu',
        sourceIcon: 'https://www.google.com/s2/favicons?domain=cnnindonesia.com&sz=64'
      }
    ]
  },
  {
    id: 'hi5',
    title: 'Pesona Ombak Dunia Mentawai 2026: Ratusan Peselancar Mancanegara Padati Kepulauan Siberut dan Sipora',
    titleEn: 'Mentawai World-Class Surf Season 2026: International Surfers Flock to Siberut and Sipora Islands',
    category: 'Pariwisata Sumatera Barat',
    categoryEn: 'West Sumatra Tourism',
    date: '04 September 2026',
    dateEn: 'September 04, 2026',
    timeAgo: '1 hari lalu',
    sourceName: 'Antara News Sumbar',
    sourceDomain: 'sumbar.antaranews.com',
    sourceUrl: 'https://sumbar.antaranews.com/berita/mentawai-surfing-international-2026',
    sourceIcon: 'https://www.google.com/s2/favicons?domain=antaranews.com&sz=64',
    imageUrl: '',
    tag: 'Sumbar',
    tagEn: 'West Sumatra',
    actionUrl: 'https://sumbar.antaranews.com/berita/mentawai-surfing-international-2026',
    mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Kepulauan+Mentawai+Sumatera+Barat',
    locationName: 'Kepulauan Mentawai, Sumatera Barat',
    locationNameEn: 'Mentawai Islands, West Sumatra',
    description: 'Puncak musim ombak selancar kelas dunia di Kepulauan Mentawai menyedot atensi peselancar profesional internasional dari berbagai benua.',
    descriptionEn: 'The peak surf season in the Mentawai archipelago draws hundreds of international professional surfers seeking world-renowned reef breaks.',
    relatedStories: [
      {
        title: 'Pemkab Mentawai Perkuat Proteksi Terumbu Karang dan Tata Kelola Retribusi Surfing Ramah Lingkungan',
        titleEn: 'Mentawai Government Enforces Coral Conservation and Eco-Friendly Surfing Levies',
        sourceName: 'Padang Ekspres',
        sourceDomain: 'padek.jawapos.com',
        sourceUrl: 'https://padek.jawapos.com',
        timeAgo: '2 hari lalu',
        sourceIcon: 'https://www.google.com/s2/favicons?domain=jawapos.com&sz=64'
      },
      {
        title: 'Keindahan Gugusan Pulau Tropis dan Budaya Tato Tertua Dunia Menjadi Magnet Global',
        titleEn: 'Tropical Archipelagos and World Oldest Tattoo Tradition Draw Global Travelers',
        sourceName: 'Tempo.co',
        sourceDomain: 'tempo.co',
        sourceUrl: 'https://travel.tempo.co',
        timeAgo: '2 hari lalu',
        sourceIcon: 'https://www.google.com/s2/favicons?domain=tempo.co&sz=64'
      }
    ]
  },
  {
    id: 'hi6',
    title: 'Kemenparekraf Perluas Standar Pariwisata Hijau: Terapkan Ekowisata Berkelanjutan Bebas Sampah Plastik di Seluruh Destinasi',
    titleEn: 'Ministry Expands Green Tourism Standards: Mandating Sustainable Plastic-Free Ecotourism Across Destinations',
    category: 'Pariwisata Indonesia',
    categoryEn: 'Indonesian Tourism',
    date: '04 September 2026',
    dateEn: 'September 04, 2026',
    timeAgo: '2 hari lalu',
    sourceName: 'detikTravel',
    sourceDomain: 'travel.detik.com',
    sourceUrl: 'https://travel.detik.com/travel-news/kemenparekraf-sertifikasi-ekowisata-desa-wisata',
    sourceIcon: 'https://www.google.com/s2/favicons?domain=detik.com&sz=64',
    imageUrl: '',
    tag: 'Nasional',
    tagEn: 'National',
    actionUrl: 'https://travel.detik.com/travel-news/kemenparekraf-sertifikasi-ekowisata-desa-wisata',
    mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Desa+Wisata+Indonesia',
    locationName: 'Jejaring Desa Wisata Indonesia',
    locationNameEn: 'Indonesian Tourism Village Network',
    description: 'Pemerintah memperluas sertifikasi standarisasi pariwisata hijau dan dekarbonisasi bagi destinasi wisata dan jejaring desa wisata nusantara.',
    descriptionEn: 'The Indonesian government expands green tourism and decarbonization standards for national travel destinations and tourism villages.',
    relatedStories: [
      {
        title: 'Penerapan Konsep CHSE dan Kuota Harian Kunjungan Efektif Cegah Overtourism di Cagar Alam',
        titleEn: 'CHSE Protocols and Daily Quota Caps Successfully Prevent Overtourism in Reserves',
        sourceName: 'Antara News',
        sourceDomain: 'antaranews.com',
        sourceUrl: 'https://www.antaranews.com',
        timeAgo: '2 hari lalu',
        sourceIcon: 'https://www.google.com/s2/favicons?domain=antaranews.com&sz=64'
      },
      {
        title: 'Polairud dan Kelompok Sadar Wisata Perketat Patroli Kelestarian Terumbu Karang Bahari',
        titleEn: 'Marine Police and Local Tourism Volunteers Tighten Coral Reef Conservation Patrols',
        sourceName: 'Tribrata News',
        sourceDomain: 'tribratanews.polri.go.id',
        sourceUrl: 'https://tribratanews.polri.go.id',
        timeAgo: '3 hari lalu',
        sourceIcon: 'https://www.google.com/s2/favicons?domain=tribratanews.polri.go.id&sz=64'
      }
    ]
  }
];

export const DOWNLOAD_ITEMS: DownloadItem[] = [];

