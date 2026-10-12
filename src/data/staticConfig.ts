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
    title: 'Tol Padang-Sicincin 36,6 Km Siap Dioperasikan Penuh: Akses Wisatawan Padang ke Bukittinggi Makin Cepat & Nyaman',
    titleEn: 'Padang-Sicincin 36.6 Km Expressway Ready for Full Operation: Padang to Bukittinggi Tourist Transit Cut to 45 Mins',
    category: 'Pariwisata Sumatera Barat',
    categoryEn: 'West Sumatra Tourism',
    date: '12 Oktober 2026',
    dateEn: 'October 12, 2026',
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
    description: 'Jalan tol perdana di Sumatera Barat ruas Padang - Sicincin sepanjang 36,6 km siap melayani arus wisatawan dan pemudik, memangkas waktu tempuh menuju kawasan wisata dataran tinggi Minangkabau secara signifikan.',
    descriptionEn: 'West Sumatra first 36.6-km Padang - Sicincin expressway is prepared to welcome tourists, dramatically shortening travel times to Bukittinggi and the central Minangkabau highlands.',
    relatedStories: [
      {
        title: 'Rest Area KM 23 Arsitektur Gonjong Rumah Gadang Alokasikan 70 Persen Gerai untuk UMKM Kuliner Minang',
        titleEn: 'Gonjong-Roofed Rest Area KM 23 Dedicates 70 Percent Space to Minang Culinary MSMEs',
        sourceName: 'Antara News Sumbar',
        sourceDomain: 'sumbar.antaranews.com',
        sourceUrl: 'https://sumbar.antaranews.com',
        sourceIcon: 'https://www.google.com/s2/favicons?domain=antaranews.com&sz=64'
      },
      {
        title: 'Konektivitas Wisatawan Lembah Anai dan Dataran Tinggi Semakin Nyaman Bebas Hambatan',
        titleEn: 'Seamless Travel Corridor for Anai Valley and Bukittinggi Highland Visitors',
        sourceName: 'Langgam.id',
        sourceDomain: 'langgam.id',
        sourceUrl: 'https://langgam.id',
        sourceIcon: 'https://www.google.com/s2/favicons?domain=langgam.id&sz=64'
      }
    ]
  },
  {
    id: 'hi2',
    title: 'Kharisma Event Nusantara 2026: Pacu Jawi Tanah Datar dan Festival Tabuik Pariaman Jadi Magnet Wisatawan Mancanegara',
    titleEn: 'National Event Calendar: Pacu Jawi Bull Race & Pariaman Tabuik Draw Surge of International Travelers',
    category: 'Pariwisata Sumatera Barat',
    categoryEn: 'West Sumatra Tourism',
    date: '11 Oktober 2026',
    dateEn: 'October 11, 2026',
    sourceName: 'Antara News Sumbar',
    sourceDomain: 'sumbar.antaranews.com',
    sourceUrl: 'https://sumbar.antaranews.com/berita/festival-budaya-sumbar-ken-2026',
    sourceIcon: 'https://www.google.com/s2/favicons?domain=antaranews.com&sz=64',
    imageUrl: '',
    tag: 'Sumbar',
    tagEn: 'West Sumatra',
    actionUrl: 'https://sumbar.antaranews.com/berita/festival-budaya-sumbar-ken-2026',
    mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Tanah+Datar+Sumatera+Barat',
    locationName: 'Tanah Datar & Pantai Gandoriah, Kota Pariaman',
    locationNameEn: 'Tanah Datar & Gandoriah Beach, Pariaman',
    description: 'Dua atraksi budaya akbar Minangkabau yakni Alek Nagari Pacu Jawi dan Pesona Budaya Tabuik resmi dinobatkan masuk dalam agenda unggulan Kharisma Event Nusantara (KEN) 2026, menyedot ribuan pelancong.',
    descriptionEn: 'Two iconic Minangkabau cultural spectacles—Pacu Jawi in Tanah Datar and Tabuik in Pariaman—continue to headline national travel calendars, drawing thousands of travelers.',
    relatedStories: [
      {
        title: 'Dispar Sumbar Targetkan Lonjakan Wisatawan Mancanegara Lewat Kharisma Event Nusantara',
        titleEn: 'West Sumatra Tourism Targets Foreign Visitor Boost via Flagship KEN Celebrations',
        sourceName: 'Harian Haluan',
        sourceDomain: 'harianhaluan.com',
        sourceUrl: 'https://harianhaluan.com',
        sourceIcon: 'https://www.google.com/s2/favicons?domain=harianhaluan.com&sz=64'
      },
      {
        title: 'Sensasi Balap Sapi Berlumpur di Kaki Marapi dan Kemegahan Menara Tabuik 12 Meter',
        titleEn: 'Experiencing Thrilling Mud Racing under Marapi and 12-Meter Majestic Coastal Shrines',
        sourceName: 'Kompas.com',
        sourceDomain: 'kompas.com',
        sourceUrl: 'https://travel.kompas.com',
        sourceIcon: 'https://www.google.com/s2/favicons?domain=kompas.com&sz=64'
      }
    ]
  },
  {
    id: 'hi3',
    title: 'Gerakan Bangga Berwisata di Indonesia: Kemenpar Akselerasi Kunjungan Wisatawan Nusantara ke Destinasi Unggulan Sumbar',
    titleEn: 'Proud to Travel in Indonesia Initiative: Accelerating Domestic Trips to West Sumatra Top Destinations',
    category: 'Pariwisata Indonesia',
    categoryEn: 'Indonesian Tourism',
    date: '10 Oktober 2026',
    dateEn: 'October 10, 2026',
    sourceName: 'travel.kompas.com',
    sourceDomain: 'kompas.com',
    sourceUrl: 'https://travel.kompas.com/read/2026/10/10/bangga-berwisata-di-indonesia-sumbar',
    sourceIcon: 'https://www.google.com/s2/favicons?domain=kompas.com&sz=64',
    imageUrl: '',
    tag: 'Nasional',
    tagEn: 'National',
    actionUrl: 'https://travel.kompas.com/read/2026/10/10/bangga-berwisata-di-indonesia-sumbar',
    mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Bukittinggi+Sumatera+Barat',
    locationName: 'Koridor Wisata Sumatera Barat & Destinasi Prioritas',
    locationNameEn: 'West Sumatra Tourism Corridor & Priority Destinations',
    description: 'Kementerian Pariwisata bersama asosiasi perhotelan dan agen perjalanan daring menggencarkan stimulus liburan domestik untuk mendorong pergerakan wisatawan ke Bukittinggi, Harau, dan Mandeh.',
    descriptionEn: 'The Indonesian Ministry of Tourism alongside hospitality partners accelerates travel incentives promoting authentic cultural and natural journeys across West Sumatra.',
    relatedStories: [
      {
        title: 'Paket Bundling Penerbangan Domestik dan Homestay Desa Wisata Minangkabau Diminati',
        titleEn: 'Domestic Flight & Homestay Bundles to Minang Villages Gain Strong Traction',
        sourceName: 'detikTravel',
        sourceDomain: 'detik.com',
        sourceUrl: 'https://travel.detik.com',
        sourceIcon: 'https://www.google.com/s2/favicons?domain=detik.com&sz=64'
      },
      {
        title: 'Pemerataan Wisatawan Nusantara Dorong Kebangkitan UMKM Kuliner Tradisional',
        titleEn: 'Domestic Inflow Drives Sustainable Growth for Local Traditional Culinary Vendors',
        sourceName: 'CNN Indonesia',
        sourceDomain: 'cnnindonesia.com',
        sourceUrl: 'https://www.cnnindonesia.com',
        sourceIcon: 'https://www.google.com/s2/favicons?domain=cnnindonesia.com&sz=64'
      }
    ]
  },
  {
    id: 'hi4',
    title: 'Pesona Ombak Dunia Mentawai: Ratusan Peselancar Mancanegara Padati Kepulauan Siberut dan Sipora',
    titleEn: 'Mentawai World-Class Surf Season: International Surfers Flock to Siberut and Sipora Islands',
    category: 'Pariwisata Sumatera Barat',
    categoryEn: 'West Sumatra Tourism',
    date: '09 Oktober 2026',
    dateEn: 'October 09, 2026',
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
    description: 'Musim ombak selancar kelas dunia di Kepulauan Mentawai menyedot atensi peselancar profesional internasional dari berbagai negara yang mengagumi kejernihan laut toska dan budaya kearifan lokal Mentawai.',
    descriptionEn: 'The world-class surf season across Mentawai draws international surfers exploring pristine turquoise breaks alongside indigenous ancestral heritage.',
    relatedStories: [
      {
        title: 'Pemkab Mentawai Perkuat Proteksi Terumbu Karang dan Wisata Ramah Lingkungan',
        titleEn: 'Mentawai Enforces Coral Reef Protection and Eco-Friendly Travel Guidelines',
        sourceName: 'Padang Ekspres',
        sourceDomain: 'padek.jawapos.com',
        sourceUrl: 'https://padek.jawapos.com',
        sourceIcon: 'https://www.google.com/s2/favicons?domain=jawapos.com&sz=64'
      },
      {
        title: 'Gugusan Pulau Tropis dan Warisan Budaya Seni Rajah Tertua Jadi Daya Tarik Unik',
        titleEn: 'Pristine Tropical Islets and Ancient Tattoo Culture Captivate Explorers',
        sourceName: 'Tempo.co',
        sourceDomain: 'tempo.co',
        sourceUrl: 'https://travel.tempo.co',
        sourceIcon: 'https://www.google.com/s2/favicons?domain=tempo.co&sz=64'
      }
    ]
  },
  {
    id: 'hi5',
    title: 'Jejaring Desa Wisata Minangkabau: Nagari Pariangan dan Lembah Harau Perkuat Layanan Homestay Berbasis Budaya',
    titleEn: 'Minang Tourism Villages: Pariangan and Harau Valley Elevate Cultural Homestay Hospitality',
    category: 'Pariwisata Sumatera Barat',
    categoryEn: 'West Sumatra Tourism',
    date: '08 Oktober 2026',
    dateEn: 'October 08, 2026',
    sourceName: 'detikTravel',
    sourceDomain: 'travel.detik.com',
    sourceUrl: 'https://travel.detik.com/travel-news/desa-wisata-pariangan-sumbar',
    sourceIcon: 'https://www.google.com/s2/favicons?domain=detik.com&sz=64',
    imageUrl: '',
    tag: 'Sumbar',
    tagEn: 'West Sumatra',
    actionUrl: 'https://travel.detik.com/travel-news/desa-wisata-pariangan-sumbar',
    mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Nagari+Pariangan+Tanah+Datar',
    locationName: 'Nagari Pariangan, Tanah Datar & Lembah Harau, 50 Kota',
    locationNameEn: 'Nagari Pariangan & Harau Valley, West Sumatra',
    description: 'Komunitas pengelola desa wisata di Sumatera Barat memperkuat standar keramahtamahan Rumah Gadang dan kuliner autentik guna menyambut wisatawan keluarga dan pelancong mancanegara.',
    descriptionEn: 'Tourism village operators across West Sumatra enhance authentic Rumah Gadang homestay standards and culinary workshops for family and eco-travelers.',
    relatedStories: [
      {
        title: 'Wisatawan Menikmati Pengalaman Menginap di Rumah Gadang Kayu Berusia Ratusan Tahun',
        titleEn: 'Travelers Savor Immersive Stays Inside Century-Old Traditional Wooden Mansions',
        sourceName: 'Langgam.id',
        sourceDomain: 'langgam.id',
        sourceUrl: 'https://langgam.id',
        sourceIcon: 'https://www.google.com/s2/favicons?domain=langgam.id&sz=64'
      }
    ]
  },
  {
    id: 'hi6',
    title: 'Kemenparekraf Perluas Standar Pariwisata Hijau: Terapkan Ekowisata Berkelanjutan Bebas Sampah Plastik di Seluruh Destinasi',
    titleEn: 'Ministry Expands Green Tourism Standards: Mandating Sustainable Plastic-Free Ecotourism Across Destinations',
    category: 'Pariwisata Indonesia',
    categoryEn: 'Indonesian Tourism',
    date: '07 Oktober 2026',
    dateEn: 'October 07, 2026',
    sourceName: 'Antara News',
    sourceDomain: 'antaranews.com',
    sourceUrl: 'https://www.antaranews.com/berita/kemenparekraf-standar-pariwisata-hijau',
    sourceIcon: 'https://www.google.com/s2/favicons?domain=antaranews.com&sz=64',
    imageUrl: '',
    tag: 'Nasional',
    tagEn: 'National',
    actionUrl: 'https://www.antaranews.com/berita/kemenparekraf-standar-pariwisata-hijau',
    mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Taman+Nasional+Kerinci+Seblat',
    locationName: 'Destinasi Wisata Alam Indonesia',
    locationNameEn: 'Indonesian Nature & National Park Reserves',
    description: 'Pemerintah memperluas sertifikasi standarisasi pariwisata hijau dan dekarbonisasi bagi destinasi wisata alam, taman nasional, dan jejaring desa wisata nusantara.',
    descriptionEn: 'The Indonesian government expands green tourism and decarbonization standards for national travel destinations and protected ecotourism parks.',
    relatedStories: [
      {
        title: 'Penerapan Konsep Ekowisata Efektif Cegah Kerusakan Lingkungan di Destinasi Geopark',
        titleEn: 'Ecotourism Protocols Successfully Protect Geological Wonders and Forest Canopies',
        sourceName: 'Kompas.com',
        sourceDomain: 'kompas.com',
        sourceUrl: 'https://travel.kompas.com',
        sourceIcon: 'https://www.google.com/s2/favicons?domain=kompas.com&sz=64'
      }
    ]
  }
];

export const DOWNLOAD_ITEMS: DownloadItem[] = [];

