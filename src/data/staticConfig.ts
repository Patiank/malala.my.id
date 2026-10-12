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
    title: 'Andre Rosiade: Rp19 Triliun Disiapkan untuk Bangun Sumbar, Tol Sicincin--Bukittinggi Jadi Prioritas',
    titleEn: 'Rp19 Trillion Allocated for West Sumatra Infrastructure: Sicincin--Bukittinggi Toll Expressway Set as Priority',
    category: 'Pariwisata Sumatera Barat',
    categoryEn: 'West Sumatra Tourism',
    date: '12 Oktober 2026',
    dateEn: 'October 12, 2026',
    sourceName: 'Antara News Sumbar',
    sourceDomain: 'sumbar.antaranews.com',
    sourceUrl: 'https://sumbar.antaranews.com/berita/779165/andre-rosiade-rp19-triliun-disiapkan-untuk-bangun-sumbar-tol-sicincin-bukittinggi-jadi-prioritas',
    sourceIcon: 'https://www.google.com/s2/favicons?domain=antaranews.com&sz=64',
    imageUrl: '',
    tag: 'Sumbar',
    tagEn: 'West Sumatra',
    actionUrl: 'https://sumbar.antaranews.com/berita/779165/andre-rosiade-rp19-triliun-disiapkan-untuk-bangun-sumbar-tol-sicincin-bukittinggi-jadi-prioritas',
    mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Jalan+Tol+Padang+Sicincin+Sumatera+Barat',
    locationName: 'Ruas Tol Padang-Sicincin & Bukittinggi, Sumatera Barat',
    locationNameEn: 'Padang-Sicincin & Bukittinggi Toll Corridor, West Sumatra',
    description: 'Pemerintah dan DPR RI memastikan alokasi anggaran Rp19 triliun untuk percepatan infrastruktur Sumatera Barat, dengan prioritas utama kelanjutan pembangunan Tol Sicincin menuju Bukittinggi guna mempermudah akses wisatawan dan memangkas waktu tempuh antardestinasi unggulan.',
    descriptionEn: 'The central government secures a Rp19 trillion infrastructure budget for West Sumatra, prioritizing the Sicincin-Bukittinggi expressway extension to slash travel times and enhance tourist connectivity.',
    relatedStories: [
      {
        title: 'Konektivitas Jalur Trans-Sumatera Pacu Kebangkitan Destinasi Dataran Tinggi Bukittinggi',
        titleEn: 'Highland Tourism Corridor Receives Significant Travel Boost via Trans-Sumatra Connectivity',
        sourceName: 'Antara News Sumbar',
        sourceDomain: 'sumbar.antaranews.com',
        sourceUrl: 'https://sumbar.antaranews.com/berita/779165/andre-rosiade-rp19-triliun-disiapkan-untuk-bangun-sumbar-tol-sicincin-bukittinggi-jadi-prioritas',
        sourceIcon: 'https://www.google.com/s2/favicons?domain=antaranews.com&sz=64'
      }
    ]
  },
  {
    id: 'hi2',
    title: 'RSBG 2026 Hidupkan Tradisi Minangkabau dan Geliat Ekonomi: Masuk Agenda Kharisma Event Nusantara',
    titleEn: 'Rang Solok Baralek Gadang 2026 Celebrates Minangkabau Heritage: Featured in National Event Calendar',
    category: 'Pariwisata Sumatera Barat',
    categoryEn: 'West Sumatra Tourism',
    date: '11 Oktober 2026',
    dateEn: 'October 11, 2026',
    sourceName: 'Antara News Sumbar',
    sourceDomain: 'sumbar.antaranews.com',
    sourceUrl: 'https://sumbar.antaranews.com/berita/782265/rsbg-2026-hidupkan-tradisi-minangkabau-dan-geliat-ekonomi-solok',
    sourceIcon: 'https://www.google.com/s2/favicons?domain=antaranews.com&sz=64',
    imageUrl: '',
    tag: 'Sumbar',
    tagEn: 'West Sumatra',
    actionUrl: 'https://sumbar.antaranews.com/berita/782265/rsbg-2026-hidupkan-tradisi-minangkabau-dan-geliat-ekonomi-solok',
    mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Kota+Solok+Sumatera+Barat',
    locationName: 'Hamparan Sawah Solok & Kawasan Budaya, Kota Solok',
    locationNameEn: 'Solok Heritage Rice Fields, West Sumatra',
    description: 'Perhelatan Kharisma Event Nusantara (KEN) Rang Solok Baralek Gadang (RSBG) 2026 sukses menghidupkan khazanah tradisi leluhur Minangkabau, menyedot ribuan pelancong nusantara sekaligus menggerakkan ekonomi kerakyatan dan pelaku UMKM lokal.',
    descriptionEn: 'The flagship Kharisma Event Nusantara (KEN) celebration Rang Solok Baralek Gadang (RSBG) 2026 draws thousands of travelers, revitalizing indigenous agrarian rituals alongside the local tourism economy.',
    relatedStories: [
      {
        title: 'Atraksi Budaya Tradisional Minangkabau Jadi Daya Tarik Favorit Wisatawan Mancanegara',
        titleEn: 'Authentic Minangkabau Cultural Pageantry Captivates Overseas Visitors',
        sourceName: 'Antara News Sumbar',
        sourceDomain: 'sumbar.antaranews.com',
        sourceUrl: 'https://sumbar.antaranews.com/berita/782265/rsbg-2026-hidupkan-tradisi-minangkabau-dan-geliat-ekonomi-solok',
        sourceIcon: 'https://www.google.com/s2/favicons?domain=antaranews.com&sz=64'
      }
    ]
  },
  {
    id: 'hi3',
    title: 'Menpar: Ajang MotoGP Kembangkan Wisata Olahraga dan Sport Tourism Nasional Secara Positif',
    titleEn: 'Minister of Tourism: MotoGP Successfully Advances Indonesian Sport Tourism and Economic Impact',
    category: 'Pariwisata Indonesia',
    categoryEn: 'Indonesian Tourism',
    date: '10 Oktober 2026',
    dateEn: 'October 10, 2026',
    sourceName: 'Antara News',
    sourceDomain: 'antaranews.com',
    sourceUrl: 'https://www.antaranews.com/berita/5781408/menpar-sebut-motogp-kembangkan-wisata-olahraga-secara-positif',
    sourceIcon: 'https://www.google.com/s2/favicons?domain=antaranews.com&sz=64',
    imageUrl: '',
    tag: 'Nasional',
    tagEn: 'National',
    actionUrl: 'https://www.antaranews.com/berita/5781408/menpar-sebut-motogp-kembangkan-wisata-olahraga-secara-positif',
    mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Sirkuit+Mandalika+Lombok',
    locationName: 'Kawasan Ekonomi Khusus Mandalika, Lombok',
    locationNameEn: 'Mandalika Special Economic Zone, Lombok',
    description: 'Kementerian Pariwisata Republik Indonesia menegaskan perhelatan balap kelas dunia MotoGP berhasil mengakselerasi ekosistem pariwisata olahraga nasional, memperluas okupansi hotel, serta mempromosikan destinasi unggulan Indonesia ke mata dunia.',
    descriptionEn: 'The Ministry of Tourism highlights the world-class MotoGP event for accelerating Indonesia sport tourism ecosystem, driving record hospitality occupancy and global exposure.',
    relatedStories: [
      {
        title: 'Sport Tourism Internasional Dorong Lonjakan Wisatawan Mancanegara ke Destinasi Prioritas',
        titleEn: 'International Sport Tourism Drives Inflow of Overseas Visitors to Priority Destinations',
        sourceName: 'Antara News',
        sourceDomain: 'antaranews.com',
        sourceUrl: 'https://www.antaranews.com/berita/5781408/menpar-sebut-motogp-kembangkan-wisata-olahraga-secara-positif',
        sourceIcon: 'https://www.google.com/s2/favicons?domain=antaranews.com&sz=64'
      }
    ]
  },
  {
    id: 'hi4',
    title: 'Dispar Sumbar Luncurkan Kalender Wisata Terpadu 2026: 45 Festival Budaya Siap Sambut Pelancong',
    titleEn: 'West Sumatra Tourism Office Unveils Integrated 2026 Calendar: 45 Cultural Festivals Ready to Welcome Visitors',
    category: 'Pariwisata Sumatera Barat',
    categoryEn: 'West Sumatra Tourism',
    date: '09 Oktober 2026',
    dateEn: 'October 09, 2026',
    sourceName: 'Antara News Sumbar',
    sourceDomain: 'sumbar.antaranews.com',
    sourceUrl: 'https://sumbar.antaranews.com/berita/769240/untuk-tarik-minat-wisatawan-kemenpar-perkuat-event-daerah',
    sourceIcon: 'https://www.google.com/s2/favicons?domain=antaranews.com&sz=64',
    imageUrl: '',
    tag: 'Sumbar',
    tagEn: 'West Sumatra',
    actionUrl: 'https://sumbar.antaranews.com/berita/769240/untuk-tarik-minat-wisatawan-kemenpar-perkuat-event-daerah',
    mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Dinas+Pariwisata+Sumatera+Barat',
    locationName: 'Pusat Informasi Wisata & Budaya Sumatera Barat',
    locationNameEn: 'West Sumatra Tourism & Cultural Center',
    description: 'Dinas Pariwisata Sumatera Barat merilis 45 agenda festival unggulan sepanjang tahun 2026 yang tersebar di 19 kabupaten dan kota guna menarik jutaan wisatawan domestik maupun mancanegara.',
    descriptionEn: 'The West Sumatra Tourism Office announces 45 premier festivals for 2026 across 19 regencies and cities to welcome millions of domestic and global visitors.',
    relatedStories: [
      {
        title: 'Festival Tradisi dan Alam Terbuka Jadi Magnet Utama Pariwisata Ranah Minang',
        titleEn: 'Heritage Festivals and Nature Trails Emerge as Top Allure for Minangkabau Tourism',
        sourceName: 'Antara News Sumbar',
        sourceDomain: 'sumbar.antaranews.com',
        sourceUrl: 'https://sumbar.antaranews.com/berita/769240/untuk-tarik-minat-wisatawan-kemenpar-perkuat-event-daerah',
        sourceIcon: 'https://www.google.com/s2/favicons?domain=antaranews.com&sz=64'
      }
    ]
  },
  {
    id: 'hi5',
    title: 'Wahana Permainan dan Fasilitas Baru Mulai Dibangun di Objek Wisata Pantai Pariaman',
    titleEn: 'New Attractions and Recreational Facilities Underway at Pariaman Coastal Destinations',
    category: 'Pariwisata Sumatera Barat',
    categoryEn: 'West Sumatra Tourism',
    date: '08 Oktober 2026',
    dateEn: 'October 08, 2026',
    sourceName: 'Antara News Sumbar',
    sourceDomain: 'sumbar.antaranews.com',
    sourceUrl: 'https://sumbar.antaranews.com/berita/748610/wahana-permainan-mulai-dibangun-di-objek-wisata-pariaman-semarakkan-piaman-barayo',
    sourceIcon: 'https://www.google.com/s2/favicons?domain=antaranews.com&sz=64',
    imageUrl: '',
    tag: 'Sumbar',
    tagEn: 'West Sumatra',
    actionUrl: 'https://sumbar.antaranews.com/berita/748610/wahana-permainan-mulai-dibangun-di-objek-wisata-pariaman-semarakkan-piaman-barayo',
    mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Pantai+Gandoriah+Pariaman+Sumatera+Barat',
    locationName: 'Pantai Gandoriah & Pesisir Kota Pariaman',
    locationNameEn: 'Gandoriah Beach & Pariaman Coastline',
    description: 'Pemerintah Kota Pariaman memperluas fasilitas rekreasi dan sarana wahana permainan keluarga di sepanjang garis pantai untuk meningkatkan kenyamanan wisatawan serta memperkuat daya tarik wisata pesisir Sumatera Barat.',
    descriptionEn: 'Pariaman municipality expands seaside family recreational amenities along the coastline to enhance travel hospitality and tourism allure.',
    relatedStories: [
      {
        title: 'Pengembangan Wisata Pantai Tingkatkan Kunjungan Wisatawan dan Ekonomi Warga',
        titleEn: 'Coastal Tourism Expansion Elevates Visitor Footfall and Local Prosperity',
        sourceName: 'Antara News Sumbar',
        sourceDomain: 'sumbar.antaranews.com',
        sourceUrl: 'https://sumbar.antaranews.com/berita/748610/wahana-permainan-mulai-dibangun-di-objek-wisata-pariaman-semarakkan-piaman-barayo',
        sourceIcon: 'https://www.google.com/s2/favicons?domain=antaranews.com&sz=64'
      }
    ]
  },
  {
    id: 'hi6',
    title: 'Menikmati Keindahan Ngarai Sianok Terkini, Susuri Kelok 44 hingga Danau Maninjau',
    titleEn: 'Exploring Majestic Sianok Canyon, Scenic 44 Hairpin Bends, and Serene Lake Maninjau',
    category: 'Pariwisata Sumatera Barat',
    categoryEn: 'West Sumatra Tourism',
    date: '07 Oktober 2026',
    dateEn: 'October 07, 2026',
    sourceName: 'Antara News Sumbar',
    sourceDomain: 'sumbar.antaranews.com',
    sourceUrl: 'https://sumbar.antaranews.com/berita/713728/menikmati-ngarai-sianok-terkini--susuri-juga-kelok-44-hingga-danau-maninjau',
    sourceIcon: 'https://www.google.com/s2/favicons?domain=antaranews.com&sz=64',
    imageUrl: '',
    tag: 'Sumbar',
    tagEn: 'West Sumatra',
    actionUrl: 'https://sumbar.antaranews.com/berita/713728/menikmati-ngarai-sianok-terkini--susuri-juga-kelok-44-hingga-danau-maninjau',
    mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Ngarai+Sianok+Bukittinggi',
    locationName: 'Ngarai Sianok, Kelok 44, & Danau Maninjau',
    locationNameEn: 'Sianok Canyon, Kelok 44, & Lake Maninjau',
    description: 'Jelajah geowisata Sumatera Barat menawarkan panorama spektakuler tebing Ngarai Sianok Bukittinggi, sensasi tikungan legendaris Kelok 44, serta ketenangan kaldera vulkanik Danau Maninjau yang memikat pelancong.',
    descriptionEn: 'West Sumatra geological tour offers sweeping vistas of Sianok Canyon, thrilling hairpin turns along Kelok 44, and panoramic serenity at Lake Maninjau.',
    relatedStories: [
      {
        title: 'Destinasi Geowisata Populer Sumatera Barat Jadi Magnet Fotografi Lanskap Alam',
        titleEn: 'Flagship Geo-Tourism Sites in West Sumatra Attract Global Nature Photographers',
        sourceName: 'Antara News Sumbar',
        sourceDomain: 'sumbar.antaranews.com',
        sourceUrl: 'https://sumbar.antaranews.com/berita/713728/menikmati-ngarai-sianok-terkini--susuri-juga-kelok-44-hingga-danau-maninjau',
        sourceIcon: 'https://www.google.com/s2/favicons?domain=antaranews.com&sz=64'
      }
    ]
  },
  {
    id: 'hi7',
    title: 'Kunjungan Wisatawan Mancanegara ke Indonesia Tembus 10,58 Juta, Sektor Pariwisata Terus Tumbuh',
    titleEn: 'Foreign Tourist Arrivals to Indonesia Surge Past 10.58 Million with Steady Tourism Growth',
    category: 'Pariwisata Indonesia',
    categoryEn: 'Indonesian Tourism',
    date: '06 Oktober 2026',
    dateEn: 'October 06, 2026',
    sourceName: 'Antara News',
    sourceDomain: 'antaranews.com',
    sourceUrl: 'https://www.antaranews.com/berita/5778226/kunjungan-wisman-ke-indonesia-per-agustus-2026-tembus-1058-juta',
    sourceIcon: 'https://www.google.com/s2/favicons?domain=antaranews.com&sz=64',
    imageUrl: '',
    tag: 'Nasional',
    tagEn: 'National',
    actionUrl: 'https://www.antaranews.com/berita/5778226/kunjungan-wisman-ke-indonesia-per-agustus-2026-tembus-1058-juta',
    mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Destinasi+Pariwisata+Indonesia',
    locationName: 'Pintu Masuk Wisatawan Nusantara & Mancanegara Indonesia',
    locationNameEn: 'International Tourism Gateways, Indonesia',
    description: 'Badan Pusat Statistik dan Kementerian Pariwisata mencatat arus kunjungan wisatawan mancanegara ke berbagai destinasi nusantara menembus 10,58 juta pelancong, didorong penerbangan langsung dan promosi festival budaya.',
    descriptionEn: 'Official data reveals foreign tourist arrivals to Indonesian destinations have exceeded 10.58 million, supported by direct flight routes and world-class cultural celebrations.',
    relatedStories: [
      {
        title: 'Peningkatan Konektivitas Udara Pacu Kunjungan Pelancong ke Destinasi di Luar Jawa dan Bali',
        titleEn: 'Enhanced Air Connectivity Drives Traveler Growth Beyond Traditional Tourist Hubs',
        sourceName: 'Antara News',
        sourceDomain: 'antaranews.com',
        sourceUrl: 'https://www.antaranews.com/berita/5778226/kunjungan-wisman-ke-indonesia-per-agustus-2026-tembus-1058-juta',
        sourceIcon: 'https://www.google.com/s2/favicons?domain=antaranews.com&sz=64'
      }
    ]
  },
  {
    id: 'hi8',
    title: 'Kemenpar Targetkan Sertifikasi Halal Produk UMKM Kuliner di 1.500 Desa Wisata Indonesia',
    titleEn: 'Ministry Targets Halal Certification for MSME Culinary Vendors Across 1,500 Indonesian Tourism Villages',
    category: 'Pariwisata Indonesia',
    categoryEn: 'Indonesian Tourism',
    date: '04 Oktober 2026',
    dateEn: 'October 04, 2026',
    sourceName: 'Antara News',
    sourceDomain: 'antaranews.com',
    sourceUrl: 'https://www.antaranews.com/berita/5777133/kemenpar-targetkan-produk-umkm-1500-desa-wisata-tersertifikasi-halal',
    sourceIcon: 'https://www.google.com/s2/favicons?domain=antaranews.com&sz=64',
    imageUrl: '',
    tag: 'Nasional',
    tagEn: 'National',
    actionUrl: 'https://www.antaranews.com/berita/5777133/kemenpar-targetkan-produk-umkm-1500-desa-wisata-tersertifikasi-halal',
    mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Jejaring+Desa+Wisata+Indonesia',
    locationName: 'Jejaring 1.500 Desa Wisata Nusantara, Indonesia',
    locationNameEn: '1,500 Indonesian Tourism Village Network',
    description: 'Kementerian Pariwisata menggencarkan program standardisasi dan sertifikasi halal gratis bagi pelaku usaha kuliner di 1.500 desa wisata guna menjamin kebersihan, kehigienisan, dan kenyamanan wisatawan keluarga maupun pelancong global.',
    descriptionEn: 'The Indonesian Ministry of Tourism accelerates halal certification for traditional culinary businesses across 1,500 tourism villages to ensure quality hygiene standards.',
    relatedStories: [
      {
        title: 'Penguatan Kuliner Tradisional Lokal Jadi Daya Pikat Unggulan Wisata Pedesaan Nusantara',
        titleEn: 'Authentic Regional Cuisine Strengthens Competitive Allure for Rural Tourism Villages',
        sourceName: 'Antara News',
        sourceDomain: 'antaranews.com',
        sourceUrl: 'https://www.antaranews.com/berita/5777133/kemenpar-targetkan-produk-umkm-1500-desa-wisata-tersertifikasi-halal',
        sourceIcon: 'https://www.google.com/s2/favicons?domain=antaranews.com&sz=64'
      }
    ]
  },
  {
    id: 'hi9',
    title: 'Untuk Tarik Minat Wisatawan Nusantara, Kemenpar Perkuat Penyelenggaraan Event Pariwisata Daerah',
    titleEn: 'Ministry of Tourism Strengthens Regional Tourism Events to Drive Domestic Traveler Interest',
    category: 'Pariwisata Indonesia',
    categoryEn: 'Indonesian Tourism',
    date: '02 Oktober 2026',
    dateEn: 'October 02, 2026',
    sourceName: 'Antara News',
    sourceDomain: 'sumbar.antaranews.com',
    sourceUrl: 'https://sumbar.antaranews.com/berita/769240/untuk-tarik-minat-wisatawan-kemenpar-perkuat-event-daerah',
    sourceIcon: 'https://www.google.com/s2/favicons?domain=antaranews.com&sz=64',
    imageUrl: '',
    tag: 'Nasional',
    tagEn: 'National',
    actionUrl: 'https://sumbar.antaranews.com/berita/769240/untuk-tarik-minat-wisatawan-kemenpar-perkuat-event-daerah',
    mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Destinasi+Wisata+Sumatera+Barat',
    locationName: 'Kawasan Wisata Unggulan Sumatera Barat & Nasional',
    locationNameEn: 'Flagship Tourism Regions, Indonesia',
    description: 'Kementerian Pariwisata Republik Indonesia memperkuat pendampingan dan standardisasi event pariwisata daerah untuk mendongkrak pergerakan wisatawan nusantara serta mendorong regenerasi festival budaya di berbagai provinsi termasuk Sumatera Barat.',
    descriptionEn: 'The Ministry of Tourism bolsters national assistance for regional cultural events to boost domestic travel mobility and support regional tourism resilience.',
    relatedStories: [
      {
        title: 'Stimulus Pariwisata Nusantara Perkuat Ekosistem Industri Kreatif dan Homestay',
        titleEn: 'National Travel Incentives Bolster Local Homestay and Creative Eco-Systems',
        sourceName: 'Antara News',
        sourceDomain: 'sumbar.antaranews.com',
        sourceUrl: 'https://sumbar.antaranews.com/berita/769240/untuk-tarik-minat-wisatawan-kemenpar-perkuat-event-daerah',
        sourceIcon: 'https://www.google.com/s2/favicons?domain=antaranews.com&sz=64'
      }
    ]
  },
  {
    id: 'hi10',
    title: 'Bupati Agam Targetkan Nagari Wisata Simarasok Keluar Sebagai Juara Satu WIA 2026',
    titleEn: 'Agam Regency Champions Simarasok Heritage Village for First Place in WIA 2026',
    category: 'Pariwisata Sumatera Barat',
    categoryEn: 'West Sumatra Tourism',
    date: '06 September 2026',
    dateEn: 'September 06, 2026',
    sourceName: 'Antara News Sumbar',
    sourceDomain: 'sumbar.antaranews.com',
    sourceUrl: 'https://sumbar.antaranews.com/berita/779771/bupati-agam-targetkan-nagari-wisata-simarasok-keluar-sebagai-juara-satu-wia-2026',
    sourceIcon: 'https://www.google.com/s2/favicons?domain=antaranews.com&sz=64',
    imageUrl: '',
    tag: 'Sumbar',
    tagEn: 'West Sumatra',
    actionUrl: 'https://sumbar.antaranews.com/berita/779771/bupati-agam-targetkan-nagari-wisata-simarasok-keluar-sebagai-juara-satu-wia-2026',
    mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Nagari+Simarasok+Agam+Sumatera+Barat',
    locationName: 'Nagari Simarasok, Baso, Kabupaten Agam',
    locationNameEn: 'Simarasok Village, Agam Regency, West Sumatra',
    description: 'Pemerintah Kabupaten Agam menargetkan Nagari Wisata Simarasok meraih peringkat pertama ajang desa wisata berkat keasrian alam perbukitan, gua alami Janjang Koto Gadang, persawahan terasering, dan keramahtamahan homestay Rumah Gadang.',
    descriptionEn: 'Agam regency leadership champions Simarasok Tourism Village for premier national tourism honors, highlighted by lush tiered rice paddies, ancient caves, and hospitable Minangkabau homestays.',
    relatedStories: [
      {
        title: 'Keasrian Alam Pedesaan dan Budaya Tradisional Jadi Daya Tarik Simarasok',
        titleEn: 'Pristine Countryside Scenery and Living Traditions Charm Visitors',
        sourceName: 'Antara News Sumbar',
        sourceDomain: 'sumbar.antaranews.com',
        sourceUrl: 'https://sumbar.antaranews.com/berita/779771/bupati-agam-targetkan-nagari-wisata-simarasok-keluar-sebagai-juara-satu-wia-2026',
        sourceIcon: 'https://www.google.com/s2/favicons?domain=antaranews.com&sz=64'
      }
    ]
  },
  {
    id: 'hi11',
    title: 'Pengembangan Geowisata Lembah Harau dan Ngarai Sianok Terus Diperkuat Menyambut Pelancong',
    titleEn: 'Harau Valley and Sianok Canyon Geo-Tourism Development Strengthened for Travelers',
    category: 'Pariwisata Sumatera Barat',
    categoryEn: 'West Sumatra Tourism',
    date: '28 Agustus 2026',
    dateEn: 'August 28, 2026',
    sourceName: 'Antara News Sumbar',
    sourceDomain: 'sumbar.antaranews.com',
    sourceUrl: 'https://sumbar.antaranews.com/berita/713728/menikmati-ngarai-sianok-terkini--susuri-juga-kelok-44-hingga-danau-maninjau',
    sourceIcon: 'https://www.google.com/s2/favicons?domain=antaranews.com&sz=64',
    imageUrl: '',
    tag: 'Sumbar',
    tagEn: 'West Sumatra',
    actionUrl: 'https://sumbar.antaranews.com/berita/713728/menikmati-ngarai-sianok-terkini--susuri-juga-kelok-44-hingga-danau-maninjau',
    mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Lembah+Harau+Lima+Puluh+Kota',
    locationName: 'Lembah Harau & Bukittinggi, Sumatera Barat',
    locationNameEn: 'Harau Valley & Bukittinggi, West Sumatra',
    description: 'Pemerintah daerah bersama pengelola wisata mempercantik jalur tracking, fasilitas keselamatan tebing, dan sentra kuliner lokal di kawasan lembah tebing granit Harau dan Ngarai Sianok.',
    descriptionEn: 'Regional tourism authorities enhance trekking paths, cliff safety infrastructure, and local culinary outposts at Harau Valley and Sianok Canyon.',
    relatedStories: [
      {
        title: 'Pesona Tebing Granit Menjulang Memikat Wisatawan Mancanegara dan Fotografer',
        titleEn: 'Towering Granite Cliffs Attract International Explorers and Nature Photographers',
        sourceName: 'Antara News Sumbar',
        sourceDomain: 'sumbar.antaranews.com',
        sourceUrl: 'https://sumbar.antaranews.com/berita/713728/menikmati-ngarai-sianok-terkini--susuri-juga-kelok-44-hingga-danau-maninjau',
        sourceIcon: 'https://www.google.com/s2/favicons?domain=antaranews.com&sz=64'
      }
    ]
  },
  {
    id: 'hi12',
    title: 'Pariaman Kembangkan Atraksi Budaya Tabuik dan Wisata Bahari Pulau Angso Duo',
    titleEn: 'Pariaman Expands Tabuik Cultural Pageantry and Angso Duo Island Marine Tourism',
    category: 'Pariwisata Sumatera Barat',
    categoryEn: 'West Sumatra Tourism',
    date: '19 Agustus 2026',
    dateEn: 'August 19, 2026',
    sourceName: 'Antara News Sumbar',
    sourceDomain: 'sumbar.antaranews.com',
    sourceUrl: 'https://sumbar.antaranews.com/berita/748610/wahana-permainan-mulai-dibangun-di-objek-wisata-pariaman-semarakkan-piaman-barayo',
    sourceIcon: 'https://www.google.com/s2/favicons?domain=antaranews.com&sz=64',
    imageUrl: '',
    tag: 'Sumbar',
    tagEn: 'West Sumatra',
    actionUrl: 'https://sumbar.antaranews.com/berita/748610/wahana-permainan-mulai-dibangun-di-objek-wisata-pariaman-semarakkan-piaman-barayo',
    mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Pulau+Angso+Duo+Pariaman',
    locationName: 'Pesisir Pantai Gandoriah & Pulau Angso Duo, Kota Pariaman',
    locationNameEn: 'Gandoriah Beach & Angso Duo Island, Pariaman',
    description: 'Kota Pariaman memadukan daya tarik kolosal ritual Pesona Budaya Hoyak Tabuik dengan rekreasi bahari snorkeling pulau karang Angso Duo sebagai magnet unggulan wisatawan nusantara.',
    descriptionEn: 'Pariaman municipality pairs the cultural spectacle of Hoyak Tabuik with pristine island snorkeling adventures at Angso Duo Island.',
    relatedStories: [
      {
        title: 'Wisata Bahari Ramah Lingkungan Tingkatkan Pendapatan Nelayan dan Pengemudi Boat',
        titleEn: 'Eco-Friendly Marine Tourism Lifts Incomes for Local Boat Operators',
        sourceName: 'Antara News Sumbar',
        sourceDomain: 'sumbar.antaranews.com',
        sourceUrl: 'https://sumbar.antaranews.com/berita/748610/wahana-permainan-mulai-dibangun-di-objek-wisata-pariaman-semarakkan-piaman-barayo',
        sourceIcon: 'https://www.google.com/s2/favicons?domain=antaranews.com&sz=64'
      }
    ]
  },
  {
    id: 'hi13',
    title: 'Kemenpar Dorong Akselerasi 1.000 Desa Wisata Nusantara Menuju Standar Destinasi Global',
    titleEn: 'Tourism Ministry Encourages 1,000 Indonesian Tourism Villages to Reach Global Standards',
    category: 'Pariwisata Indonesia',
    categoryEn: 'Indonesian Tourism',
    date: '12 Agustus 2026',
    dateEn: 'August 12, 2026',
    sourceName: 'Antara News',
    sourceDomain: 'antaranews.com',
    sourceUrl: 'https://www.antaranews.com/berita/5777133/kemenpar-targetkan-produk-umkm-1500-desa-wisata-tersertifikasi-halal',
    sourceIcon: 'https://www.google.com/s2/favicons?domain=antaranews.com&sz=64',
    imageUrl: '',
    tag: 'Nasional',
    tagEn: 'National',
    actionUrl: 'https://www.antaranews.com/berita/5777133/kemenpar-targetkan-produk-umkm-1500-desa-wisata-tersertifikasi-halal',
    mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Desa+Wisata+Indonesia',
    locationName: 'Jaringan Desa Wisata Nusantara, Indonesia',
    locationNameEn: 'Indonesian Heritage Tourism Village Network',
    description: 'Kementerian Pariwisata Republik Indonesia menyalurkan pendampingan manajemen hospitality dan digitalisasi promosi bagi 1.000 desa wisata guna memperkuat daya saing pariwisata berkelanjutan.',
    descriptionEn: 'The Ministry of Tourism provides hospitality mentorship and digital promotion tools to 1,000 tourism villages across Indonesia.',
    relatedStories: [
      {
        title: 'Pengembangan Desa Wisata Berkelanjutan Buka Lapangan Kerja Generasi Muda',
        titleEn: 'Sustainable Rural Tourism Development Unlocks Opportunities for Youth',
        sourceName: 'Antara News',
        sourceDomain: 'antaranews.com',
        sourceUrl: 'https://www.antaranews.com/berita/5777133/kemenpar-targetkan-produk-umkm-1500-desa-wisata-tersertifikasi-halal',
        sourceIcon: 'https://www.google.com/s2/favicons?domain=antaranews.com&sz=64'
      }
    ]
  }
];

export const DOWNLOAD_ITEMS: DownloadItem[] = [];

