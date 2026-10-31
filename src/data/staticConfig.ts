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
    "id": "hi-rss-nasional-81564-1",
    "title": "Jakarta Fashion Week Buka Peluang Desainer Indonesia",
    "titleEn": "Indonesia Tourism Update: Jakarta Fashion Week Buka Peluang Desainer Indonesia",
    "category": "Pariwisata Indonesia",
    "categoryEn": "Indonesian Tourism",
    "date": "31 Oktober 2026",
    "dateEn": "October 31, 2026",
    "sourceName": "terkenal.co.id",
    "sourceDomain": "kemenparekraf.go.id",
    "sourceUrl": "https://news.google.com/rss/articles/CBMiiwFBVV95cUxNRXZhYkNpQmwxMHVqUEoxLWRSTXRyTzhURVJsSFp0bEprc1o2YUdkUWFTV21BMUIta2pqUHdia0pfX29pSS1HanZOb25NYzk4c2VRUDltS0IzalB6N0dmT0o3WDBOYnM0bHJwUFZGSW91Ym9HNHhNaEVTYW9WM01pT0JVNHFMak4yYThF?oc=5",
    "sourceIcon": "https://www.google.com/s2/favicons?domain=kemenparekraf.go.id&sz=64",
    "imageUrl": "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=800&q=80",
    "tag": "Nasional",
    "tagEn": "National",
    "actionUrl": "https://news.google.com/rss/articles/CBMiiwFBVV95cUxNRXZhYkNpQmwxMHVqUEoxLWRSTXRyTzhURVJsSFp0bEprc1o2YUdkUWFTV21BMUIta2pqUHdia0pfX29pSS1HanZOb25NYzk4c2VRUDltS0IzalB6N0dmT0o3WDBOYnM0bHJwUFZGSW91Ym9HNHhNaEVTYW9WM01pT0JVNHFMak4yYThF?oc=5",
    "mapsUrl": "https://www.google.com/maps/search/?api=1&query=Indonesia",
    "locationName": "Kawasan Wisata Nusantara Indonesia",
    "locationNameEn": "Indonesian Archipelago Tourism Destinations",
    "description": "Kementerian Pariwisata Republik Indonesia bersama para pemangku kepentingan sektor pariwisata nasional terus menggalakkan program strategis: \"Jakarta Fashion Week Buka Peluang Desainer Indonesia\". Kebijakan ini merupakan bagian integral dari peta jalan pariwisata berkualitas dan berkelanjutan di seluruh nusantara.\n\nMelalui penguatan kolaborasi lintas-sektor, akselerasi digitalisasi ekosistem wisata, serta diversifikasi paket perjalanan tematik, sektor pariwisata Indonesia dipacu untuk meningkatkan pergerakan wisatawan nusantara dan kunjungan wisatawan mancanegara secara inklusif.",
    "descriptionEn": "The Ministry of Tourism of the Republic of Indonesia and national travel stakeholders continue implementing strategic programs: \"Jakarta Fashion Week Buka Peluang Desainer Indonesia\". This initiative supports the national roadmap toward high-yield, sustainable tourism development across the Indonesian archipelago.\n\nBy fostering cross-sector partnerships, advancing digital tourism ecosystems, and curating thematic travel itineraries, Indonesia's tourism industry is well-positioned to drive robust tourist footfall and inclusive economic growth.",
    "highlights": [
      "Penguatan pariwisata berkelanjutan dan ramah lingkungan",
      "Peningkatan pergerakan wisatawan nusantara dan mancanegara",
      "Digitalisasi ekosistem pariwisata dan UMKM kreatif"
    ],
    "highlightsEn": [
      "Strengthening sustainable and eco-friendly tourism",
      "Boosting domestic and international tourist movements",
      "Digital transformation of tourism and creative MSMEs"
    ],
    "tips": "Manfaatkan kalender event pariwisata resmi untuk merencanakan liburan.",
    "tipsEn": "Leverage official tourism event calendars for seamless holiday planning.",
    "createdAt": "2026-10-31T19:15:47.000Z",
    "generatedAt": "2026-10-31T23:06:21.564Z",
    "generatedBy": "Malala Autonomous RSS Engine (Google News National Parekraf Feed)",
    "isAIGenerated": false
  },
  {
    "id": "hi-rss-sumbar-81564-1",
    "title": "MGR 2026 Bukittinggi Berikan Dampak Positif Terhadap Sektor Pariwisata dan Perekonomian Lokal",
    "titleEn": "West Sumatra Tourism: MGR 2026 Bukittinggi Berikan Dampak Positif Terhadap Sektor Pariwisata dan Perekonomian Lokal",
    "category": "Pariwisata Sumatera Barat",
    "categoryEn": "West Sumatra Tourism",
    "date": "31 Oktober 2026",
    "dateEn": "October 31, 2026",
    "sourceName": "Khazminang.id",
    "sourceDomain": "sumbar.antaranews.com",
    "sourceUrl": "https://news.google.com/rss/articles/CBMitwFBVV95cUxQcEhydnZXWVBkbE5USElTTHpCWWtKekJOSmNHTmYzcG1aRDg4OEtjd3JFSkE0b2IzUFhpcjVLc2RWVy1xRTV5UFc4SURnQ3BRbWY4NnZvVDdhbXdfN19SMXFuSXhDWGtON3AzanJ5M3dvZUNvWEpGaGh3ZmlhYWZ6SVJ2UDJBTlhFZWRtNzdteF84Yy1LZEJhN3djaVcwd0RfSi1LZ0hpbEhIdDdDOUNfSHlocFJpTVk?oc=5",
    "sourceIcon": "https://www.google.com/s2/favicons?domain=antaranews.com&sz=64",
    "imageUrl": "https://images.unsplash.com/photo-1596402184320-417e7178b2cd?auto=format&fit=crop&w=800&q=80",
    "tag": "Sumbar",
    "tagEn": "West Sumatra",
    "actionUrl": "https://news.google.com/rss/articles/CBMitwFBVV95cUxQcEhydnZXWVBkbE5USElTTHpCWWtKekJOSmNHTmYzcG1aRDg4OEtjd3JFSkE0b2IzUFhpcjVLc2RWVy1xRTV5UFc4SURnQ3BRbWY4NnZvVDdhbXdfN19SMXFuSXhDWGtON3AzanJ5M3dvZUNvWEpGaGh3ZmlhYWZ6SVJ2UDJBTlhFZWRtNzdteF84Yy1LZEJhN3djaVcwd0RfSi1LZ0hpbEhIdDdDOUNfSHlocFJpTVk?oc=5",
    "mapsUrl": "https://www.google.com/maps/search/?api=1&query=Jam+Gadang+Bukittinggi",
    "locationName": "Kota Wisata Bukittinggi",
    "locationNameEn": "Bukittinggi Tourism City",
    "description": "Laporan liputan jurnalistik resmi: \"MGR 2026 Bukittinggi Berikan Dampak Positif Terhadap Sektor Pariwisata dan Perekonomian Lokal\". Pemerintah Provinsi Sumatera Barat bersama Dinas Pariwisata dan seluruh pemangku kepentingan terus mempercepat langkah strategis guna mengoptimalkan potensi wisata alam yang asri, keluhuran adat dan seni budaya Minangkabau, serta kuliner halal legendaris di berbagai kabupaten dan kota.\n\nInisiatif terpadu ini difokuskan pada peningkatan kualitas amenitas dan fasilitas umum di objek wisata, kemudahan konektivitas transportasi wisatawan, serta penguatan pelaku UMKM dan industri ekonomi kreatif lokal agar pariwisata Ranah Minang senantiasa berdaya saing tinggi dan berkelanjutan.",
    "descriptionEn": "Official news report: \"MGR 2026 Bukittinggi Berikan Dampak Positif Terhadap Sektor Pariwisata dan Perekonomian Lokal\". West Sumatra provincial authorities, the regional tourism board, and hospitality stakeholders are accelerating strategic measures to showcase authentic natural landscapes, Minangkabau cultural heritage, and legendary halal culinary traditions.\n\nThis concerted initiative focuses on upgrading tourist amenities, streamlining transport connectivity, and empowering local creative MSMEs, ensuring West Sumatra's tourism remains highly competitive, hospitable, and sustainable for both domestic and international travelers.",
    "highlights": [
      "Akselerasi promosi destinasi wisata unggulan Ranah Minang",
      "Sinergi pemerintah daerah dan pelaku industri kreatif",
      "Dukungan fasilitas dan konektivitas wisatawan"
    ],
    "highlightsEn": [
      "Accelerating West Sumatra tourism promotion",
      "Synergy between local government and hospitality sectors",
      "Strengthening tourist facilities and regional connectivity"
    ],
    "tips": "Cek jadwal dan kondisi rute perjalanan terkini di aplikasi Malala sebelum berwisata.",
    "tipsEn": "Check real-time travel routes and schedules on the Malala portal before departure.",
    "createdAt": "2026-10-31T17:26:55.000Z",
    "generatedAt": "2026-10-31T23:06:21.564Z",
    "generatedBy": "Malala Autonomous RSS Engine (Google News Sumbar Feed)",
    "isAIGenerated": false
  },
  {
    "id": "hi-rss-sumbar-81564-2",
    "title": "3.800 Pelari Ramaikan Minang Geopark Run 2026",
    "titleEn": "West Sumatra Tourism: 3.800 Pelari Ramaikan Minang Geopark Run 2026",
    "category": "Pariwisata Sumatera Barat",
    "categoryEn": "West Sumatra Tourism",
    "date": "31 Oktober 2026",
    "dateEn": "October 31, 2026",
    "sourceName": "Rakyatterkini.com",
    "sourceDomain": "sumbar.antaranews.com",
    "sourceUrl": "https://news.google.com/rss/articles/CBMikAFBVV95cUxOcDZYYXhDLTJraUx4N2dBSDBYY1ExaTNTX1Z6QjZKdVFnTUdqSWRBSzRES095ZFM5NUN6Y3gxLXplU21EUWF1anZWSm82emZ2OTFDYWFIVExkVmdKLS1zMFFDRmZLWUM3VmlPMHRRanBBV2s4dWQ0NENSZnllUUNXaC1QWkZ3dklHSE51MEsyREs?oc=5",
    "sourceIcon": "https://www.google.com/s2/favicons?domain=antaranews.com&sz=64",
    "imageUrl": "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=800&q=80",
    "tag": "Sumbar",
    "tagEn": "West Sumatra",
    "actionUrl": "https://news.google.com/rss/articles/CBMikAFBVV95cUxOcDZYYXhDLTJraUx4N2dBSDBYY1ExaTNTX1Z6QjZKdVFnTUdqSWRBSzRES095ZFM5NUN6Y3gxLXplU21EUWF1anZWSm82emZ2OTFDYWFIVExkVmdKLS1zMFFDRmZLWUM3VmlPMHRRanBBV2s4dWQ0NENSZnllUUNXaC1QWkZ3dklHSE51MEsyREs?oc=5",
    "mapsUrl": "https://www.google.com/maps/search/?api=1&query=Sumatera+Barat",
    "locationName": "Destinasi Wisata Unggulan Sumatera Barat",
    "locationNameEn": "West Sumatra Prime Tourism Destinations",
    "description": "Laporan liputan jurnalistik resmi: \"3.800 Pelari Ramaikan Minang Geopark Run 2026\". Pemerintah Provinsi Sumatera Barat bersama Dinas Pariwisata dan seluruh pemangku kepentingan terus mempercepat langkah strategis guna mengoptimalkan potensi wisata alam yang asri, keluhuran adat dan seni budaya Minangkabau, serta kuliner halal legendaris di berbagai kabupaten dan kota.\n\nInisiatif terpadu ini difokuskan pada peningkatan kualitas amenitas dan fasilitas umum di objek wisata, kemudahan konektivitas transportasi wisatawan, serta penguatan pelaku UMKM dan industri ekonomi kreatif lokal agar pariwisata Ranah Minang senantiasa berdaya saing tinggi dan berkelanjutan.",
    "descriptionEn": "Official news report: \"3.800 Pelari Ramaikan Minang Geopark Run 2026\". West Sumatra provincial authorities, the regional tourism board, and hospitality stakeholders are accelerating strategic measures to showcase authentic natural landscapes, Minangkabau cultural heritage, and legendary halal culinary traditions.\n\nThis concerted initiative focuses on upgrading tourist amenities, streamlining transport connectivity, and empowering local creative MSMEs, ensuring West Sumatra's tourism remains highly competitive, hospitable, and sustainable for both domestic and international travelers.",
    "highlights": [
      "Akselerasi promosi destinasi wisata unggulan Ranah Minang",
      "Sinergi pemerintah daerah dan pelaku industri kreatif",
      "Dukungan fasilitas dan konektivitas wisatawan"
    ],
    "highlightsEn": [
      "Accelerating West Sumatra tourism promotion",
      "Synergy between local government and hospitality sectors",
      "Strengthening tourist facilities and regional connectivity"
    ],
    "tips": "Cek jadwal dan kondisi rute perjalanan terkini di aplikasi Malala sebelum berwisata.",
    "tipsEn": "Check real-time travel routes and schedules on the Malala portal before departure.",
    "createdAt": "2026-10-31T17:24:00.000Z",
    "generatedAt": "2026-10-31T23:06:21.564Z",
    "generatedBy": "Malala Autonomous RSS Engine (Google News Sumbar Feed)",
    "isAIGenerated": false
  },
  {
    "id": "hi-rss-nasional-81564-2",
    "title": "Kemenpar Apresiasi Festival Berlabuh yang Ramah Disabilitas",
    "titleEn": "Indonesia Tourism Update: Kemenpar Apresiasi Festival Berlabuh yang Ramah Disabilitas",
    "category": "Pariwisata Indonesia",
    "categoryEn": "Indonesian Tourism",
    "date": "31 Oktober 2026",
    "dateEn": "October 31, 2026",
    "sourceName": "RRI.co.id",
    "sourceDomain": "kemenparekraf.go.id",
    "sourceUrl": "https://news.google.com/rss/articles/CBMipgFBVV95cUxOeFFVQlcwMTB6M1doNEptb09Jd3lxOGJOci1IU0V0YlBma0h1WVBtcml2X3FRNkQ2VzE1VHJrQ1Bnb2FSV0F2dEJYUGFMTWFtZVNHMXVPb0diMXVHb2MxekxVRTFKQUpYMW53UThQeWNmQkxXcVdmaHZaWWR2SWRQUnFMUjRNRVhmU19mUkpCWDJXa2lmRWVDUzhVX3JDVVVkWDduNUdR?oc=5",
    "sourceIcon": "https://www.google.com/s2/favicons?domain=kemenparekraf.go.id&sz=64",
    "imageUrl": "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=800&q=80",
    "tag": "Nasional",
    "tagEn": "National",
    "actionUrl": "https://news.google.com/rss/articles/CBMipgFBVV95cUxOeFFVQlcwMTB6M1doNEptb09Jd3lxOGJOci1IU0V0YlBma0h1WVBtcml2X3FRNkQ2VzE1VHJrQ1Bnb2FSV0F2dEJYUGFMTWFtZVNHMXVPb0diMXVHb2MxekxVRTFKQUpYMW53UThQeWNmQkxXcVdmaHZaWWR2SWRQUnFMUjRNRVhmU19mUkpCWDJXa2lmRWVDUzhVX3JDVVVkWDduNUdR?oc=5",
    "mapsUrl": "https://www.google.com/maps/search/?api=1&query=Indonesia",
    "locationName": "Kawasan Wisata Nusantara Indonesia",
    "locationNameEn": "Indonesian Archipelago Tourism Destinations",
    "description": "Kementerian Pariwisata Republik Indonesia bersama para pemangku kepentingan sektor pariwisata nasional terus menggalakkan program strategis: \"Kemenpar Apresiasi Festival Berlabuh yang Ramah Disabilitas\". Kebijakan ini merupakan bagian integral dari peta jalan pariwisata berkualitas dan berkelanjutan di seluruh nusantara.\n\nMelalui penguatan kolaborasi lintas-sektor, akselerasi digitalisasi ekosistem wisata, serta diversifikasi paket perjalanan tematik, sektor pariwisata Indonesia dipacu untuk meningkatkan pergerakan wisatawan nusantara dan kunjungan wisatawan mancanegara secara inklusif.",
    "descriptionEn": "The Ministry of Tourism of the Republic of Indonesia and national travel stakeholders continue implementing strategic programs: \"Kemenpar Apresiasi Festival Berlabuh yang Ramah Disabilitas\". This initiative supports the national roadmap toward high-yield, sustainable tourism development across the Indonesian archipelago.\n\nBy fostering cross-sector partnerships, advancing digital tourism ecosystems, and curating thematic travel itineraries, Indonesia's tourism industry is well-positioned to drive robust tourist footfall and inclusive economic growth.",
    "highlights": [
      "Penguatan pariwisata berkelanjutan dan ramah lingkungan",
      "Peningkatan pergerakan wisatawan nusantara dan mancanegara",
      "Digitalisasi ekosistem pariwisata dan UMKM kreatif"
    ],
    "highlightsEn": [
      "Strengthening sustainable and eco-friendly tourism",
      "Boosting domestic and international tourist movements",
      "Digital transformation of tourism and creative MSMEs"
    ],
    "tips": "Manfaatkan kalender event pariwisata resmi untuk merencanakan liburan.",
    "tipsEn": "Leverage official tourism event calendars for seamless holiday planning.",
    "createdAt": "2026-10-31T16:07:00.000Z",
    "generatedAt": "2026-10-31T23:06:21.564Z",
    "generatedBy": "Malala Autonomous RSS Engine (Google News National Parekraf Feed)",
    "isAIGenerated": false
  },
  {
    "id": "hi-rss-sumbar-81564-3",
    "title": "Gubernur: Pendidikan Harus Tumbuhkan Potensi dan Kemandirian Peserta Didik",
    "titleEn": "West Sumatra Tourism: Gubernur: Pendidikan Harus Tumbuhkan Potensi dan Kemandirian Peserta Didik",
    "category": "Pariwisata Sumatera Barat",
    "categoryEn": "West Sumatra Tourism",
    "date": "31 Oktober 2026",
    "dateEn": "October 31, 2026",
    "sourceName": "realita.co",
    "sourceDomain": "sumbar.antaranews.com",
    "sourceUrl": "https://news.google.com/rss/articles/CBMipgFBVV95cUxPOE01ZE0zSTNjUHBBZDY1dG1GRUprSXNuVXl0Mklkd0ZBTWFUR1RzMWZKckNJeWg4TDBDeWgta2dnTk5oeUQ2YzJQdGROWXBUODA0ZndieXJreTkzUl9RcVg4Wnd0ZENsdzQxVDBlRm9kRXJwT2dsUXNYcV95UE5pZzJ2LW5pd1d6ZFhScjF4aFBscF9EVk5LX1R5Y0VMN2d1YkxEbkRR0gGrAUFVX3lxTE93WU9YNzdZSUVjU05TalZFVlhEUjJHbHpPenY4Y1Izak13cXVsY0w1TlRISEFITGFuUmVPLXhyc3V2cTJhOF9DVWNrbkxSOWY1RmFEc2ZCdkd1cFowM19CNzdfalFvSFNYTjcwZFBWNVlZa2JZaWdzbm5EVWFGdVFtcXU5Q24yVGtWNnFiaTJFajhRNEk5NERSbF94cU03VWMxRVNxeDJ4SGc2bw?oc=5",
    "sourceIcon": "https://www.google.com/s2/favicons?domain=antaranews.com&sz=64",
    "imageUrl": "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=800&q=80",
    "tag": "Sumbar",
    "tagEn": "West Sumatra",
    "actionUrl": "https://news.google.com/rss/articles/CBMipgFBVV95cUxPOE01ZE0zSTNjUHBBZDY1dG1GRUprSXNuVXl0Mklkd0ZBTWFUR1RzMWZKckNJeWg4TDBDeWgta2dnTk5oeUQ2YzJQdGROWXBUODA0ZndieXJreTkzUl9RcVg4Wnd0ZENsdzQxVDBlRm9kRXJwT2dsUXNYcV95UE5pZzJ2LW5pd1d6ZFhScjF4aFBscF9EVk5LX1R5Y0VMN2d1YkxEbkRR0gGrAUFVX3lxTE93WU9YNzdZSUVjU05TalZFVlhEUjJHbHpPenY4Y1Izak13cXVsY0w1TlRISEFITGFuUmVPLXhyc3V2cTJhOF9DVWNrbkxSOWY1RmFEc2ZCdkd1cFowM19CNzdfalFvSFNYTjcwZFBWNVlZa2JZaWdzbm5EVWFGdVFtcXU5Q24yVGtWNnFiaTJFajhRNEk5NERSbF94cU03VWMxRVNxeDJ4SGc2bw?oc=5",
    "mapsUrl": "https://www.google.com/maps/search/?api=1&query=Sumatera+Barat",
    "locationName": "Destinasi Wisata Unggulan Sumatera Barat",
    "locationNameEn": "West Sumatra Prime Tourism Destinations",
    "description": "Laporan liputan jurnalistik resmi: \"Gubernur: Pendidikan Harus Tumbuhkan Potensi dan Kemandirian Peserta Didik\". Pemerintah Provinsi Sumatera Barat bersama Dinas Pariwisata dan seluruh pemangku kepentingan terus mempercepat langkah strategis guna mengoptimalkan potensi wisata alam yang asri, keluhuran adat dan seni budaya Minangkabau, serta kuliner halal legendaris di berbagai kabupaten dan kota.\n\nInisiatif terpadu ini difokuskan pada peningkatan kualitas amenitas dan fasilitas umum di objek wisata, kemudahan konektivitas transportasi wisatawan, serta penguatan pelaku UMKM dan industri ekonomi kreatif lokal agar pariwisata Ranah Minang senantiasa berdaya saing tinggi dan berkelanjutan.",
    "descriptionEn": "Official news report: \"Gubernur: Pendidikan Harus Tumbuhkan Potensi dan Kemandirian Peserta Didik\". West Sumatra provincial authorities, the regional tourism board, and hospitality stakeholders are accelerating strategic measures to showcase authentic natural landscapes, Minangkabau cultural heritage, and legendary halal culinary traditions.\n\nThis concerted initiative focuses on upgrading tourist amenities, streamlining transport connectivity, and empowering local creative MSMEs, ensuring West Sumatra's tourism remains highly competitive, hospitable, and sustainable for both domestic and international travelers.",
    "highlights": [
      "Akselerasi promosi destinasi wisata unggulan Ranah Minang",
      "Sinergi pemerintah daerah dan pelaku industri kreatif",
      "Dukungan fasilitas dan konektivitas wisatawan"
    ],
    "highlightsEn": [
      "Accelerating West Sumatra tourism promotion",
      "Synergy between local government and hospitality sectors",
      "Strengthening tourist facilities and regional connectivity"
    ],
    "tips": "Cek jadwal dan kondisi rute perjalanan terkini di aplikasi Malala sebelum berwisata.",
    "tipsEn": "Check real-time travel routes and schedules on the Malala portal before departure.",
    "createdAt": "2026-10-31T16:05:00.000Z",
    "generatedAt": "2026-10-31T23:06:21.564Z",
    "generatedBy": "Malala Autonomous RSS Engine (Google News Sumbar Feed)",
    "isAIGenerated": false
  },
  {
    "id": "hi-rss-sumbar-81564-4",
    "title": "Bukan Sekadar Lomba Lari! Minang Geopark Run 2026 , Pemulihan Wisata Sumatera Barat",
    "titleEn": "West Sumatra Tourism: Bukan Sekadar Lomba Lari! Minang Geopark Run 2026 , Pemulihan Wisata Sumatera Barat",
    "category": "Pariwisata Sumatera Barat",
    "categoryEn": "West Sumatra Tourism",
    "date": "31 Oktober 2026",
    "dateEn": "October 31, 2026",
    "sourceName": "Warta Bela Negara",
    "sourceDomain": "sumbar.antaranews.com",
    "sourceUrl": "https://news.google.com/rss/articles/CBMirgFBVV95cUxQUnNmRUFKOURSRE0zN2laWDRJYWhWUFYwUzJRazllWU56Tnp6LUpkUENWcVhESWlzMUxqUUxJNXV5bGl6MXc4SFhWQ2pBQWxUdTBSbHZBMFJfS3dpM04zMzhaT253XzkwanhKZlVieU5NTkc0YWh2eUNkZk1KSmxkcmVKRFZTc004SXB1aTJHeVBBMHdOdU50cFZXcjh4SVc3TVViUDNJTUtCSnA3V2c?oc=5",
    "sourceIcon": "https://www.google.com/s2/favicons?domain=antaranews.com&sz=64",
    "imageUrl": "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=800&q=80",
    "tag": "Sumbar",
    "tagEn": "West Sumatra",
    "actionUrl": "https://news.google.com/rss/articles/CBMirgFBVV95cUxQUnNmRUFKOURSRE0zN2laWDRJYWhWUFYwUzJRazllWU56Tnp6LUpkUENWcVhESWlzMUxqUUxJNXV5bGl6MXc4SFhWQ2pBQWxUdTBSbHZBMFJfS3dpM04zMzhaT253XzkwanhKZlVieU5NTkc0YWh2eUNkZk1KSmxkcmVKRFZTc004SXB1aTJHeVBBMHdOdU50cFZXcjh4SVc3TVViUDNJTUtCSnA3V2c?oc=5",
    "mapsUrl": "https://www.google.com/maps/search/?api=1&query=Sumatera+Barat",
    "locationName": "Destinasi Wisata Unggulan Sumatera Barat",
    "locationNameEn": "West Sumatra Prime Tourism Destinations",
    "description": "Laporan liputan jurnalistik resmi: \"Bukan Sekadar Lomba Lari! Minang Geopark Run 2026 , Pemulihan Wisata Sumatera Barat\". Pemerintah Provinsi Sumatera Barat bersama Dinas Pariwisata dan seluruh pemangku kepentingan terus mempercepat langkah strategis guna mengoptimalkan potensi wisata alam yang asri, keluhuran adat dan seni budaya Minangkabau, serta kuliner halal legendaris di berbagai kabupaten dan kota.\n\nInisiatif terpadu ini difokuskan pada peningkatan kualitas amenitas dan fasilitas umum di objek wisata, kemudahan konektivitas transportasi wisatawan, serta penguatan pelaku UMKM dan industri ekonomi kreatif lokal agar pariwisata Ranah Minang senantiasa berdaya saing tinggi dan berkelanjutan.",
    "descriptionEn": "Official news report: \"Bukan Sekadar Lomba Lari! Minang Geopark Run 2026 , Pemulihan Wisata Sumatera Barat\". West Sumatra provincial authorities, the regional tourism board, and hospitality stakeholders are accelerating strategic measures to showcase authentic natural landscapes, Minangkabau cultural heritage, and legendary halal culinary traditions.\n\nThis concerted initiative focuses on upgrading tourist amenities, streamlining transport connectivity, and empowering local creative MSMEs, ensuring West Sumatra's tourism remains highly competitive, hospitable, and sustainable for both domestic and international travelers.",
    "highlights": [
      "Akselerasi promosi destinasi wisata unggulan Ranah Minang",
      "Sinergi pemerintah daerah dan pelaku industri kreatif",
      "Dukungan fasilitas dan konektivitas wisatawan"
    ],
    "highlightsEn": [
      "Accelerating West Sumatra tourism promotion",
      "Synergy between local government and hospitality sectors",
      "Strengthening tourist facilities and regional connectivity"
    ],
    "tips": "Cek jadwal dan kondisi rute perjalanan terkini di aplikasi Malala sebelum berwisata.",
    "tipsEn": "Check real-time travel routes and schedules on the Malala portal before departure.",
    "createdAt": "2026-10-31T15:16:46.000Z",
    "generatedAt": "2026-10-31T23:06:21.564Z",
    "generatedBy": "Malala Autonomous RSS Engine (Google News Sumbar Feed)",
    "isAIGenerated": false
  },
  {
    "id": "hi-rss-nasional-81564-3",
    "title": "Vokasi Pariwisata Penting untuk Perkuat Daya Saing Industri Wisata Kepri",
    "titleEn": "Indonesia Tourism Update: Vokasi Pariwisata Penting untuk Perkuat Daya Saing Industri Wisata Kepri",
    "category": "Pariwisata Indonesia",
    "categoryEn": "Indonesian Tourism",
    "date": "31 Oktober 2026",
    "dateEn": "October 31, 2026",
    "sourceName": "RRI.co.id",
    "sourceDomain": "kemenparekraf.go.id",
    "sourceUrl": "https://news.google.com/rss/articles/CBMiswFBVV95cUxQbTdmUHJKRWwzRU1qaTJVQUJka084Z1FKY05kdk5NUzdSY0c0SGRjTlM5eUZIOVZ2UEY5MVN1WDAxNW1VZ29fYXdsbDU4aTZJcUhYWnFxNnJveXIzUHRDaDgtWVRZOXlmM0dtaVNjMjduQlR5ZDl3RkFIbnBIRlpIMmc2ZVlwdnFzZklvYWxpcVQ0T3RZakhmak9ZaEkwd3RXUU05dFZFTWMzS1FBeklpQ0dwcw?oc=5",
    "sourceIcon": "https://www.google.com/s2/favicons?domain=kemenparekraf.go.id&sz=64",
    "imageUrl": "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=800&q=80",
    "tag": "Nasional",
    "tagEn": "National",
    "actionUrl": "https://news.google.com/rss/articles/CBMiswFBVV95cUxQbTdmUHJKRWwzRU1qaTJVQUJka084Z1FKY05kdk5NUzdSY0c0SGRjTlM5eUZIOVZ2UEY5MVN1WDAxNW1VZ29fYXdsbDU4aTZJcUhYWnFxNnJveXIzUHRDaDgtWVRZOXlmM0dtaVNjMjduQlR5ZDl3RkFIbnBIRlpIMmc2ZVlwdnFzZklvYWxpcVQ0T3RZakhmak9ZaEkwd3RXUU05dFZFTWMzS1FBeklpQ0dwcw?oc=5",
    "mapsUrl": "https://www.google.com/maps/search/?api=1&query=Indonesia",
    "locationName": "Kawasan Wisata Nusantara Indonesia",
    "locationNameEn": "Indonesian Archipelago Tourism Destinations",
    "description": "Kementerian Pariwisata Republik Indonesia bersama para pemangku kepentingan sektor pariwisata nasional terus menggalakkan program strategis: \"Vokasi Pariwisata Penting untuk Perkuat Daya Saing Industri Wisata Kepri\". Kebijakan ini merupakan bagian integral dari peta jalan pariwisata berkualitas dan berkelanjutan di seluruh nusantara.\n\nMelalui penguatan kolaborasi lintas-sektor, akselerasi digitalisasi ekosistem wisata, serta diversifikasi paket perjalanan tematik, sektor pariwisata Indonesia dipacu untuk meningkatkan pergerakan wisatawan nusantara dan kunjungan wisatawan mancanegara secara inklusif.",
    "descriptionEn": "The Ministry of Tourism of the Republic of Indonesia and national travel stakeholders continue implementing strategic programs: \"Vokasi Pariwisata Penting untuk Perkuat Daya Saing Industri Wisata Kepri\". This initiative supports the national roadmap toward high-yield, sustainable tourism development across the Indonesian archipelago.\n\nBy fostering cross-sector partnerships, advancing digital tourism ecosystems, and curating thematic travel itineraries, Indonesia's tourism industry is well-positioned to drive robust tourist footfall and inclusive economic growth.",
    "highlights": [
      "Penguatan pariwisata berkelanjutan dan ramah lingkungan",
      "Peningkatan pergerakan wisatawan nusantara dan mancanegara",
      "Digitalisasi ekosistem pariwisata dan UMKM kreatif"
    ],
    "highlightsEn": [
      "Strengthening sustainable and eco-friendly tourism",
      "Boosting domestic and international tourist movements",
      "Digital transformation of tourism and creative MSMEs"
    ],
    "tips": "Manfaatkan kalender event pariwisata resmi untuk merencanakan liburan.",
    "tipsEn": "Leverage official tourism event calendars for seamless holiday planning.",
    "createdAt": "2026-10-31T12:18:00.000Z",
    "generatedAt": "2026-10-31T23:06:21.564Z",
    "generatedBy": "Malala Autonomous RSS Engine (Google News National Parekraf Feed)",
    "isAIGenerated": false
  },
  {
    "id": "hi-rss-nasional-22964-1",
    "title": "Kemenpar Ajak Agen Perjalanan Kembangkan Paket Wisata Tematik di Yogyakarta dan Borobudur untuk Tarik Wisatawan Berkualitas",
    "titleEn": "Indonesia Tourism Update: Kemenpar Ajak Agen Perjalanan Kembangkan Paket Wisata Tematik di Yogyakarta dan Borobudur untuk Tarik Wisatawan Berkualitas",
    "category": "Pariwisata Indonesia",
    "categoryEn": "Indonesian Tourism",
    "date": "31 Oktober 2026",
    "dateEn": "October 31, 2026",
    "sourceName": "pantau.com",
    "sourceDomain": "kemenparekraf.go.id",
    "sourceUrl": "https://news.google.com/rss/articles/CBMi9gFBVV95cUxQZGRmQW9oN1ZyNG15NDZkWjd1ODlMTUxfdVNjTVlqVFRGZGwyQ3ROR1VVWndwTi1vXzQ3VE5RWGlIZHZFNkZPeFNQSk0xZFdUQlJGR04yMHRSelN5VDB2TmdlWTFQZlZDUkx4NTQ5THlTLTI0WnNJTHpvcXVMRmJETC1nd0tmRXlDYkhEcTJMTDBzZ0l3eWZ4dGkzVDcwOGN2eXpWMUM1WnRvTnFVYk5ZUXJOMnF0Tldna1F1aHEtNjZVTmg3a0hReG95WVQ3UjJZS3ZRc3NCaXNHTHpQcFJ0RGNlTUNVWDBlM1FQa1BsdGlaNEMwcmc?oc=5",
    "sourceIcon": "https://www.google.com/s2/favicons?domain=kemenparekraf.go.id&sz=64",
    "imageUrl": "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=800&q=80",
    "tag": "Nasional",
    "tagEn": "National",
    "actionUrl": "https://news.google.com/rss/articles/CBMi9gFBVV95cUxQZGRmQW9oN1ZyNG15NDZkWjd1ODlMTUxfdVNjTVlqVFRGZGwyQ3ROR1VVWndwTi1vXzQ3VE5RWGlIZHZFNkZPeFNQSk0xZFdUQlJGR04yMHRSelN5VDB2TmdlWTFQZlZDUkx4NTQ5THlTLTI0WnNJTHpvcXVMRmJETC1nd0tmRXlDYkhEcTJMTDBzZ0l3eWZ4dGkzVDcwOGN2eXpWMUM1WnRvTnFVYk5ZUXJOMnF0Tldna1F1aHEtNjZVTmg3a0hReG95WVQ3UjJZS3ZRc3NCaXNHTHpQcFJ0RGNlTUNVWDBlM1FQa1BsdGlaNEMwcmc?oc=5",
    "mapsUrl": "https://www.google.com/maps/search/?api=1&query=Indonesia",
    "locationName": "Kawasan Wisata Nusantara Indonesia",
    "locationNameEn": "Indonesian Archipelago Tourism Destinations",
    "description": "Kementerian Pariwisata Republik Indonesia bersama para pemangku kepentingan sektor pariwisata nasional terus menggalakkan program strategis: \"Kemenpar Ajak Agen Perjalanan Kembangkan Paket Wisata Tematik di Yogyakarta dan Borobudur untuk Tarik Wisatawan Berkualitas\". Kebijakan ini merupakan bagian integral dari peta jalan pariwisata berkualitas dan berkelanjutan di seluruh nusantara.\n\nMelalui penguatan kolaborasi lintas-sektor, akselerasi digitalisasi ekosistem wisata, serta diversifikasi paket perjalanan tematik, sektor pariwisata Indonesia dipacu untuk meningkatkan pergerakan wisatawan nusantara dan kunjungan wisatawan mancanegara secara inklusif.",
    "descriptionEn": "The Ministry of Tourism of the Republic of Indonesia and national travel stakeholders continue implementing strategic programs: \"Kemenpar Ajak Agen Perjalanan Kembangkan Paket Wisata Tematik di Yogyakarta dan Borobudur untuk Tarik Wisatawan Berkualitas\". This initiative supports the national roadmap toward high-yield, sustainable tourism development across the Indonesian archipelago.\n\nBy fostering cross-sector partnerships, advancing digital tourism ecosystems, and curating thematic travel itineraries, Indonesia's tourism industry is well-positioned to drive robust tourist footfall and inclusive economic growth.",
    "highlights": [
      "Penguatan pariwisata berkelanjutan dan ramah lingkungan",
      "Peningkatan pergerakan wisatawan nusantara dan mancanegara",
      "Digitalisasi ekosistem pariwisata dan UMKM kreatif"
    ],
    "highlightsEn": [
      "Strengthening sustainable and eco-friendly tourism",
      "Boosting domestic and international tourist movements",
      "Digital transformation of tourism and creative MSMEs"
    ],
    "tips": "Manfaatkan kalender event pariwisata resmi untuk merencanakan liburan.",
    "tipsEn": "Leverage official tourism event calendars for seamless holiday planning.",
    "createdAt": "2026-10-31T02:50:00.000Z",
    "generatedAt": "2026-10-31T02:58:42.964Z",
    "generatedBy": "Malala Autonomous RSS Engine (Google News National Parekraf Feed)",
    "isAIGenerated": false
  },
  {
    "id": "hi-rss-nasional-22964-2",
    "title": "JCWF Catat Perputaran Ekonomi Rp6,1 Miliar, Kemenpar Dorong Wellness Tourism",
    "titleEn": "Indonesia Tourism Update: JCWF Catat Perputaran Ekonomi Rp6,1 Miliar, Kemenpar Dorong Wellness Tourism",
    "category": "Pariwisata Indonesia",
    "categoryEn": "Indonesian Tourism",
    "date": "31 Oktober 2026",
    "dateEn": "October 31, 2026",
    "sourceName": "IDX Channel",
    "sourceDomain": "kemenparekraf.go.id",
    "sourceUrl": "https://news.google.com/rss/articles/CBMisAFBVV95cUxNMEoyUi03X0ZFV1lqMXJid2xjRnpwQnZ1U0xJaHI3djYxNTVyTkdHN2pQX21vNXRRelV2OVlyaFdlZ3hmdEpVS0Q5SkhDT2FJVVowNnN5M3MtNEpTWE5QNWkxRnBrVmFMY1lINUpwNDFDX1hqSUJ4aWlBQTQ3YXY2NjAyTE4wb19CMENHakpqdWVJRXdKMnlXUi1WTl9sWmQybkJMTm9pMUp5UHlld0ZhUtIBtgFBVV95cUxNZVhpclRndWtXSlFxck5Xa183STZWclR2dURGb2Zob3dnSnh4YUptVURJVEJ0dllKMEZsanFMS2swdGYtOXkxZlJzcjdSSi14X3VYTnJyYjhIbllubDRVR0NpX2RuTV94ZDRXb1RMNGFUQktnWm1CY1g4SzkyUGtLSUcyNzhwSEV3cEpHMm4waEVGREpqb18tLTBibHFTS0c3d28wY1RSUmZWRTh6Rzl4UkZQSHpZUQ?oc=5",
    "sourceIcon": "https://www.google.com/s2/favicons?domain=kemenparekraf.go.id&sz=64",
    "imageUrl": "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=800&q=80",
    "tag": "Nasional",
    "tagEn": "National",
    "actionUrl": "https://news.google.com/rss/articles/CBMisAFBVV95cUxNMEoyUi03X0ZFV1lqMXJid2xjRnpwQnZ1U0xJaHI3djYxNTVyTkdHN2pQX21vNXRRelV2OVlyaFdlZ3hmdEpVS0Q5SkhDT2FJVVowNnN5M3MtNEpTWE5QNWkxRnBrVmFMY1lINUpwNDFDX1hqSUJ4aWlBQTQ3YXY2NjAyTE4wb19CMENHakpqdWVJRXdKMnlXUi1WTl9sWmQybkJMTm9pMUp5UHlld0ZhUtIBtgFBVV95cUxNZVhpclRndWtXSlFxck5Xa183STZWclR2dURGb2Zob3dnSnh4YUptVURJVEJ0dllKMEZsanFMS2swdGYtOXkxZlJzcjdSSi14X3VYTnJyYjhIbllubDRVR0NpX2RuTV94ZDRXb1RMNGFUQktnWm1CY1g4SzkyUGtLSUcyNzhwSEV3cEpHMm4waEVGREpqb18tLTBibHFTS0c3d28wY1RSUmZWRTh6Rzl4UkZQSHpZUQ?oc=5",
    "mapsUrl": "https://www.google.com/maps/search/?api=1&query=Indonesia",
    "locationName": "Kawasan Wisata Nusantara Indonesia",
    "locationNameEn": "Indonesian Archipelago Tourism Destinations",
    "description": "Kementerian Pariwisata Republik Indonesia bersama para pemangku kepentingan sektor pariwisata nasional terus menggalakkan program strategis: \"JCWF Catat Perputaran Ekonomi Rp6,1 Miliar, Kemenpar Dorong Wellness Tourism\". Kebijakan ini merupakan bagian integral dari peta jalan pariwisata berkualitas dan berkelanjutan di seluruh nusantara.\n\nMelalui penguatan kolaborasi lintas-sektor, akselerasi digitalisasi ekosistem wisata, serta diversifikasi paket perjalanan tematik, sektor pariwisata Indonesia dipacu untuk meningkatkan pergerakan wisatawan nusantara dan kunjungan wisatawan mancanegara secara inklusif.",
    "descriptionEn": "The Ministry of Tourism of the Republic of Indonesia and national travel stakeholders continue implementing strategic programs: \"JCWF Catat Perputaran Ekonomi Rp6,1 Miliar, Kemenpar Dorong Wellness Tourism\". This initiative supports the national roadmap toward high-yield, sustainable tourism development across the Indonesian archipelago.\n\nBy fostering cross-sector partnerships, advancing digital tourism ecosystems, and curating thematic travel itineraries, Indonesia's tourism industry is well-positioned to drive robust tourist footfall and inclusive economic growth.",
    "highlights": [
      "Penguatan pariwisata berkelanjutan dan ramah lingkungan",
      "Peningkatan pergerakan wisatawan nusantara dan mancanegara",
      "Digitalisasi ekosistem pariwisata dan UMKM kreatif"
    ],
    "highlightsEn": [
      "Strengthening sustainable and eco-friendly tourism",
      "Boosting domestic and international tourist movements",
      "Digital transformation of tourism and creative MSMEs"
    ],
    "tips": "Manfaatkan kalender event pariwisata resmi untuk merencanakan liburan.",
    "tipsEn": "Leverage official tourism event calendars for seamless holiday planning.",
    "createdAt": "2026-10-31T02:34:00.000Z",
    "generatedAt": "2026-10-31T02:58:42.964Z",
    "generatedBy": "Malala Autonomous RSS Engine (Google News National Parekraf Feed)",
    "isAIGenerated": false
  },
  {
    "id": "hi-rss-nasional-22964-3",
    "title": "Kemenpar ajak agen perjalanan buat paket wisata tematik baru",
    "titleEn": "Indonesia Tourism Update: Kemenpar ajak agen perjalanan buat paket wisata tematik baru",
    "category": "Pariwisata Indonesia",
    "categoryEn": "Indonesian Tourism",
    "date": "31 Oktober 2026",
    "dateEn": "October 31, 2026",
    "sourceName": "ANTARA News Sulteng",
    "sourceDomain": "kemenparekraf.go.id",
    "sourceUrl": "https://news.google.com/rss/articles/CBMiqAFBVV95cUxQd05GN3NnazdzblBIS1c4VmJrNDJRMkFEZVllZmw5VUNPa2k3WWNVdVVkM0x3bGVyQURTZi1XWmNjMzlyMHpjWEVRcnZiRnJrRlY4bFlDYnVzOElaQjRzOXo3bWNyejlkdi0zZ2hpN0UwMzN6WnJGNGtvc2FCRzljSWoyY0d5YXllX1ZxVVhob1RDM3pRQ0lhVkN5R2U2NFVOY0FJVElDd2w?oc=5",
    "sourceIcon": "https://www.google.com/s2/favicons?domain=kemenparekraf.go.id&sz=64",
    "imageUrl": "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=800&q=80",
    "tag": "Nasional",
    "tagEn": "National",
    "actionUrl": "https://news.google.com/rss/articles/CBMiqAFBVV95cUxQd05GN3NnazdzblBIS1c4VmJrNDJRMkFEZVllZmw5VUNPa2k3WWNVdVVkM0x3bGVyQURTZi1XWmNjMzlyMHpjWEVRcnZiRnJrRlY4bFlDYnVzOElaQjRzOXo3bWNyejlkdi0zZ2hpN0UwMzN6WnJGNGtvc2FCRzljSWoyY0d5YXllX1ZxVVhob1RDM3pRQ0lhVkN5R2U2NFVOY0FJVElDd2w?oc=5",
    "mapsUrl": "https://www.google.com/maps/search/?api=1&query=Indonesia",
    "locationName": "Kawasan Wisata Nusantara Indonesia",
    "locationNameEn": "Indonesian Archipelago Tourism Destinations",
    "description": "Kementerian Pariwisata Republik Indonesia bersama para pemangku kepentingan sektor pariwisata nasional terus menggalakkan program strategis: \"Kemenpar ajak agen perjalanan buat paket wisata tematik baru\". Kebijakan ini merupakan bagian integral dari peta jalan pariwisata berkualitas dan berkelanjutan di seluruh nusantara.\n\nMelalui penguatan kolaborasi lintas-sektor, akselerasi digitalisasi ekosistem wisata, serta diversifikasi paket perjalanan tematik, sektor pariwisata Indonesia dipacu untuk meningkatkan pergerakan wisatawan nusantara dan kunjungan wisatawan mancanegara secara inklusif.",
    "descriptionEn": "The Ministry of Tourism of the Republic of Indonesia and national travel stakeholders continue implementing strategic programs: \"Kemenpar ajak agen perjalanan buat paket wisata tematik baru\". This initiative supports the national roadmap toward high-yield, sustainable tourism development across the Indonesian archipelago.\n\nBy fostering cross-sector partnerships, advancing digital tourism ecosystems, and curating thematic travel itineraries, Indonesia's tourism industry is well-positioned to drive robust tourist footfall and inclusive economic growth.",
    "highlights": [
      "Penguatan pariwisata berkelanjutan dan ramah lingkungan",
      "Peningkatan pergerakan wisatawan nusantara dan mancanegara",
      "Digitalisasi ekosistem pariwisata dan UMKM kreatif"
    ],
    "highlightsEn": [
      "Strengthening sustainable and eco-friendly tourism",
      "Boosting domestic and international tourist movements",
      "Digital transformation of tourism and creative MSMEs"
    ],
    "tips": "Manfaatkan kalender event pariwisata resmi untuk merencanakan liburan.",
    "tipsEn": "Leverage official tourism event calendars for seamless holiday planning.",
    "createdAt": "2026-10-31T01:56:19.000Z",
    "generatedAt": "2026-10-31T02:58:42.964Z",
    "generatedBy": "Malala Autonomous RSS Engine (Google News National Parekraf Feed)",
    "isAIGenerated": false
  },
  {
    "id": "hi-rss-nasional-62402-1",
    "title": "Dari Gelombang Hallyu Menuju Ekowisata Berkelanjutan",
    "titleEn": "Indonesia Tourism Update: Dari Gelombang Hallyu Menuju Ekowisata Berkelanjutan",
    "category": "Pariwisata Indonesia",
    "categoryEn": "Indonesian Tourism",
    "date": "31 Oktober 2026",
    "dateEn": "October 31, 2026",
    "sourceName": "Kompasiana.com",
    "sourceDomain": "kemenparekraf.go.id",
    "sourceUrl": "https://news.google.com/rss/articles/CBMiwAFBVV95cUxPaW95bXJLWkNxREZaa1ZSQXpvRkwwYklrOE1wZkFpanRQWGp5a0I0OXRRN2RsVW1oSDRoN3RsN09XNXpfVzJaMEtMZGN6eGJhbzZBZ2U1a1ctRkdjZ1g2aGNCZDQ2OW9mWk1TaFJRTVc1Rll5TGdQV2M2MEdxQmctSEFuY3J5djFnY0JiSUd3bEc5RXZ4XzNha0Vvb05zMFh5b05wMmc1MmdHeEJXb2ZkSGFTc3NabjFPeGpoY191SVk?oc=5",
    "sourceIcon": "https://www.google.com/s2/favicons?domain=kemenparekraf.go.id&sz=64",
    "imageUrl": "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=800&q=80",
    "tag": "Nasional",
    "tagEn": "National",
    "actionUrl": "https://news.google.com/rss/articles/CBMiwAFBVV95cUxPaW95bXJLWkNxREZaa1ZSQXpvRkwwYklrOE1wZkFpanRQWGp5a0I0OXRRN2RsVW1oSDRoN3RsN09XNXpfVzJaMEtMZGN6eGJhbzZBZ2U1a1ctRkdjZ1g2aGNCZDQ2OW9mWk1TaFJRTVc1Rll5TGdQV2M2MEdxQmctSEFuY3J5djFnY0JiSUd3bEc5RXZ4XzNha0Vvb05zMFh5b05wMmc1MmdHeEJXb2ZkSGFTc3NabjFPeGpoY191SVk?oc=5",
    "mapsUrl": "https://www.google.com/maps/search/?api=1&query=Indonesia",
    "locationName": "Kawasan Wisata Nusantara Indonesia",
    "locationNameEn": "Indonesian Archipelago Tourism Destinations",
    "description": "Kementerian Pariwisata Republik Indonesia bersama para pemangku kepentingan sektor pariwisata nasional terus menggalakkan program strategis: \"Dari Gelombang Hallyu Menuju Ekowisata Berkelanjutan\". Kebijakan ini merupakan bagian integral dari peta jalan pariwisata berkualitas dan berkelanjutan di seluruh nusantara.\n\nMelalui penguatan kolaborasi lintas-sektor, akselerasi digitalisasi ekosistem wisata, serta diversifikasi paket perjalanan tematik, sektor pariwisata Indonesia dipacu untuk meningkatkan pergerakan wisatawan nusantara dan kunjungan wisatawan mancanegara secara inklusif.",
    "descriptionEn": "The Ministry of Tourism of the Republic of Indonesia and national travel stakeholders continue implementing strategic programs: \"Dari Gelombang Hallyu Menuju Ekowisata Berkelanjutan\". This initiative supports the national roadmap toward high-yield, sustainable tourism development across the Indonesian archipelago.\n\nBy fostering cross-sector partnerships, advancing digital tourism ecosystems, and curating thematic travel itineraries, Indonesia's tourism industry is well-positioned to drive robust tourist footfall and inclusive economic growth.",
    "highlights": [
      "Penguatan pariwisata berkelanjutan dan ramah lingkungan",
      "Peningkatan pergerakan wisatawan nusantara dan mancanegara",
      "Digitalisasi ekosistem pariwisata dan UMKM kreatif"
    ],
    "highlightsEn": [
      "Strengthening sustainable and eco-friendly tourism",
      "Boosting domestic and international tourist movements",
      "Digital transformation of tourism and creative MSMEs"
    ],
    "tips": "Manfaatkan kalender event pariwisata resmi untuk merencanakan liburan.",
    "tipsEn": "Leverage official tourism event calendars for seamless holiday planning.",
    "createdAt": "2026-10-30T22:08:05.000Z",
    "generatedAt": "2026-10-31T00:44:22.402Z",
    "generatedBy": "Malala Autonomous RSS Engine (Google News National Parekraf Feed)",
    "isAIGenerated": false
  },
  {
    "id": "hi-rss-sumbar-62402-1",
    "title": "Penumpang Kereta Api di Sumbar Terus Meningkat",
    "titleEn": "West Sumatra Tourism: Penumpang Kereta Api di Sumbar Terus Meningkat",
    "category": "Pariwisata Sumatera Barat",
    "categoryEn": "West Sumatra Tourism",
    "date": "31 Oktober 2026",
    "dateEn": "October 31, 2026",
    "sourceName": "Rakyatterkini.com",
    "sourceDomain": "sumbar.antaranews.com",
    "sourceUrl": "https://news.google.com/rss/articles/CBMikwFBVV95cUxNeGtFMXN1R1dncG0zRmp3UzVwYlJBR3lxN2JLNk1Tc3lOZmtQWHZ6bHFQYkJSMWZaYkhKcS04OWx0d2tla3RSbHFTNENuVzZ5bkpFbmNvcnR1SzdtdG9BaDU1U29SNDRVY1NEQ2JFNVRBNG9NUmd0Q2JDV3hvOFRDZFJTTTdnUGZacGEyeXljMlYzQkE?oc=5",
    "sourceIcon": "https://www.google.com/s2/favicons?domain=antaranews.com&sz=64",
    "imageUrl": "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=800&q=80",
    "tag": "Sumbar",
    "tagEn": "West Sumatra",
    "actionUrl": "https://news.google.com/rss/articles/CBMikwFBVV95cUxNeGtFMXN1R1dncG0zRmp3UzVwYlJBR3lxN2JLNk1Tc3lOZmtQWHZ6bHFQYkJSMWZaYkhKcS04OWx0d2tla3RSbHFTNENuVzZ5bkpFbmNvcnR1SzdtdG9BaDU1U29SNDRVY1NEQ2JFNVRBNG9NUmd0Q2JDV3hvOFRDZFJTTTdnUGZacGEyeXljMlYzQkE?oc=5",
    "mapsUrl": "https://www.google.com/maps/search/?api=1&query=Sumatera+Barat",
    "locationName": "Destinasi Wisata Unggulan Sumatera Barat",
    "locationNameEn": "West Sumatra Prime Tourism Destinations",
    "description": "Laporan liputan jurnalistik resmi: \"Penumpang Kereta Api di Sumbar Terus Meningkat\". Pemerintah Provinsi Sumatera Barat bersama Dinas Pariwisata dan seluruh pemangku kepentingan terus mempercepat langkah strategis guna mengoptimalkan potensi wisata alam yang asri, keluhuran adat dan seni budaya Minangkabau, serta kuliner halal legendaris di berbagai kabupaten dan kota.\n\nInisiatif terpadu ini difokuskan pada peningkatan kualitas amenitas dan fasilitas umum di objek wisata, kemudahan konektivitas transportasi wisatawan, serta penguatan pelaku UMKM dan industri ekonomi kreatif lokal agar pariwisata Ranah Minang senantiasa berdaya saing tinggi dan berkelanjutan.",
    "descriptionEn": "Official news report: \"Penumpang Kereta Api di Sumbar Terus Meningkat\". West Sumatra provincial authorities, the regional tourism board, and hospitality stakeholders are accelerating strategic measures to showcase authentic natural landscapes, Minangkabau cultural heritage, and legendary halal culinary traditions.\n\nThis concerted initiative focuses on upgrading tourist amenities, streamlining transport connectivity, and empowering local creative MSMEs, ensuring West Sumatra's tourism remains highly competitive, hospitable, and sustainable for both domestic and international travelers.",
    "highlights": [
      "Akselerasi promosi destinasi wisata unggulan Ranah Minang",
      "Sinergi pemerintah daerah dan pelaku industri kreatif",
      "Dukungan fasilitas dan konektivitas wisatawan"
    ],
    "highlightsEn": [
      "Accelerating West Sumatra tourism promotion",
      "Synergy between local government and hospitality sectors",
      "Strengthening tourist facilities and regional connectivity"
    ],
    "tips": "Cek jadwal dan kondisi rute perjalanan terkini di aplikasi Malala sebelum berwisata.",
    "tipsEn": "Check real-time travel routes and schedules on the Malala portal before departure.",
    "createdAt": "2026-10-30T18:46:00.000Z",
    "generatedAt": "2026-10-31T00:44:22.402Z",
    "generatedBy": "Malala Autonomous RSS Engine (Google News Sumbar Feed)",
    "isAIGenerated": false
  },
  {
    "id": "hi-rss-nasional-62402-2",
    "title": "Kemenpar,",
    "titleEn": "Indonesia Tourism Update: Kemenpar,",
    "category": "Pariwisata Indonesia",
    "categoryEn": "Indonesian Tourism",
    "date": "31 Oktober 2026",
    "dateEn": "October 31, 2026",
    "sourceName": "Borneonews",
    "sourceDomain": "kemenparekraf.go.id",
    "sourceUrl": "https://news.google.com/rss/articles/CBMirgFBVV95cUxOR1BUam1kMC1tbkJTVDgtZ2N0TFhhZ1N0RjlLY25laDBSRVNWVUJ4YVNHcVE5M0c4a3JGVWhsaWJ2OEtoY1N1Z2FPYXZBNVFfOGFPWmw1YWF5OUZueHFwQ25jR2puWTBxcHltLUpqWnNoSVFHSjRVeGVjam9sOFFCWlFiMGdOYjZKVmdRVnExTDMtbFNXN0ZScks2RlM0UmoxWDRqbmlKRU5SZ1Rpc0E?oc=5",
    "sourceIcon": "https://www.google.com/s2/favicons?domain=kemenparekraf.go.id&sz=64",
    "imageUrl": "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=800&q=80",
    "tag": "Nasional",
    "tagEn": "National",
    "actionUrl": "https://news.google.com/rss/articles/CBMirgFBVV95cUxOR1BUam1kMC1tbkJTVDgtZ2N0TFhhZ1N0RjlLY25laDBSRVNWVUJ4YVNHcVE5M0c4a3JGVWhsaWJ2OEtoY1N1Z2FPYXZBNVFfOGFPWmw1YWF5OUZueHFwQ25jR2puWTBxcHltLUpqWnNoSVFHSjRVeGVjam9sOFFCWlFiMGdOYjZKVmdRVnExTDMtbFNXN0ZScks2RlM0UmoxWDRqbmlKRU5SZ1Rpc0E?oc=5",
    "mapsUrl": "https://www.google.com/maps/search/?api=1&query=Indonesia",
    "locationName": "Kawasan Wisata Nusantara Indonesia",
    "locationNameEn": "Indonesian Archipelago Tourism Destinations",
    "description": "Kementerian Pariwisata Republik Indonesia bersama para pemangku kepentingan sektor pariwisata nasional terus menggalakkan program strategis: \"Kemenpar,\". Kebijakan ini merupakan bagian integral dari peta jalan pariwisata berkualitas dan berkelanjutan di seluruh nusantara.\n\nMelalui penguatan kolaborasi lintas-sektor, akselerasi digitalisasi ekosistem wisata, serta diversifikasi paket perjalanan tematik, sektor pariwisata Indonesia dipacu untuk meningkatkan pergerakan wisatawan nusantara dan kunjungan wisatawan mancanegara secara inklusif.",
    "descriptionEn": "The Ministry of Tourism of the Republic of Indonesia and national travel stakeholders continue implementing strategic programs: \"Kemenpar,\". This initiative supports the national roadmap toward high-yield, sustainable tourism development across the Indonesian archipelago.\n\nBy fostering cross-sector partnerships, advancing digital tourism ecosystems, and curating thematic travel itineraries, Indonesia's tourism industry is well-positioned to drive robust tourist footfall and inclusive economic growth.",
    "highlights": [
      "Penguatan pariwisata berkelanjutan dan ramah lingkungan",
      "Peningkatan pergerakan wisatawan nusantara dan mancanegara",
      "Digitalisasi ekosistem pariwisata dan UMKM kreatif"
    ],
    "highlightsEn": [
      "Strengthening sustainable and eco-friendly tourism",
      "Boosting domestic and international tourist movements",
      "Digital transformation of tourism and creative MSMEs"
    ],
    "tips": "Manfaatkan kalender event pariwisata resmi untuk merencanakan liburan.",
    "tipsEn": "Leverage official tourism event calendars for seamless holiday planning.",
    "createdAt": "2026-10-30T18:00:21.000Z",
    "generatedAt": "2026-10-31T00:44:22.402Z",
    "generatedBy": "Malala Autonomous RSS Engine (Google News National Parekraf Feed)",
    "isAIGenerated": false
  },
  {
    "id": "hi-rss-nasional-62403-3",
    "title": "Siaran Pers: Menteri Pariwisata: JCWF 2026 Semakin Perkuat Yogyakarta Sebagai Destinasi Cultural Wellness",
    "titleEn": "Indonesia Tourism Update: Siaran Pers: Menteri Pariwisata: JCWF 2026 Semakin Perkuat Yogyakarta Sebagai Destinasi Cultural Wellness",
    "category": "Pariwisata Indonesia",
    "categoryEn": "Indonesian Tourism",
    "date": "31 Oktober 2026",
    "dateEn": "October 31, 2026",
    "sourceName": "Kementerian Pariwisata",
    "sourceDomain": "kemenparekraf.go.id",
    "sourceUrl": "https://news.google.com/rss/articles/CBMi-wFBVV95cUxQYnJQcl9uTlFzN2FaMW9Rb2t1NWtidm5tdDRFZkw4YXNhWTc2SHBGR2x2eWNBQTljNjhnaW9XTC03SDBJR0pEcUstVHlVd19WNFdNOFBzNG5YczBMZzVHQ0R4WWNTcVc0UVJoei1EWFFqeWR4MEJTUzAyM0xBdGtWbVQxSHIzdW1wLU44bFZIaEYxelpJMEhMeVpTN2NZOUQtbGRtdXRlZzh4ZEI2VllUV3AxcjB4ZEN6NXNseDYtaS1xSHg2S1FZQnN4Y2U0NDNjMXhvOGsxaUg5eWhOYTFhR2pRMmgxd0liS3JfYzFwMnNUVG9nRnlDenIyWQ?oc=5",
    "sourceIcon": "https://www.google.com/s2/favicons?domain=kemenparekraf.go.id&sz=64",
    "imageUrl": "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=800&q=80",
    "tag": "Nasional",
    "tagEn": "National",
    "actionUrl": "https://news.google.com/rss/articles/CBMi-wFBVV95cUxQYnJQcl9uTlFzN2FaMW9Rb2t1NWtidm5tdDRFZkw4YXNhWTc2SHBGR2x2eWNBQTljNjhnaW9XTC03SDBJR0pEcUstVHlVd19WNFdNOFBzNG5YczBMZzVHQ0R4WWNTcVc0UVJoei1EWFFqeWR4MEJTUzAyM0xBdGtWbVQxSHIzdW1wLU44bFZIaEYxelpJMEhMeVpTN2NZOUQtbGRtdXRlZzh4ZEI2VllUV3AxcjB4ZEN6NXNseDYtaS1xSHg2S1FZQnN4Y2U0NDNjMXhvOGsxaUg5eWhOYTFhR2pRMmgxd0liS3JfYzFwMnNUVG9nRnlDenIyWQ?oc=5",
    "mapsUrl": "https://www.google.com/maps/search/?api=1&query=Indonesia",
    "locationName": "Kawasan Wisata Nusantara Indonesia",
    "locationNameEn": "Indonesian Archipelago Tourism Destinations",
    "description": "Kementerian Pariwisata Republik Indonesia bersama para pemangku kepentingan sektor pariwisata nasional terus menggalakkan program strategis: \"Siaran Pers: Menteri Pariwisata: JCWF 2026 Semakin Perkuat Yogyakarta Sebagai Destinasi Cultural Wellness\". Kebijakan ini merupakan bagian integral dari peta jalan pariwisata berkualitas dan berkelanjutan di seluruh nusantara.\n\nMelalui penguatan kolaborasi lintas-sektor, akselerasi digitalisasi ekosistem wisata, serta diversifikasi paket perjalanan tematik, sektor pariwisata Indonesia dipacu untuk meningkatkan pergerakan wisatawan nusantara dan kunjungan wisatawan mancanegara secara inklusif.",
    "descriptionEn": "The Ministry of Tourism of the Republic of Indonesia and national travel stakeholders continue implementing strategic programs: \"Siaran Pers: Menteri Pariwisata: JCWF 2026 Semakin Perkuat Yogyakarta Sebagai Destinasi Cultural Wellness\". This initiative supports the national roadmap toward high-yield, sustainable tourism development across the Indonesian archipelago.\n\nBy fostering cross-sector partnerships, advancing digital tourism ecosystems, and curating thematic travel itineraries, Indonesia's tourism industry is well-positioned to drive robust tourist footfall and inclusive economic growth.",
    "highlights": [
      "Penguatan pariwisata berkelanjutan dan ramah lingkungan",
      "Peningkatan pergerakan wisatawan nusantara dan mancanegara",
      "Digitalisasi ekosistem pariwisata dan UMKM kreatif"
    ],
    "highlightsEn": [
      "Strengthening sustainable and eco-friendly tourism",
      "Boosting domestic and international tourist movements",
      "Digital transformation of tourism and creative MSMEs"
    ],
    "tips": "Manfaatkan kalender event pariwisata resmi untuk merencanakan liburan.",
    "tipsEn": "Leverage official tourism event calendars for seamless holiday planning.",
    "createdAt": "2026-10-30T17:00:57.000Z",
    "generatedAt": "2026-10-31T00:44:22.403Z",
    "generatedBy": "Malala Autonomous RSS Engine (Google News National Parekraf Feed)",
    "isAIGenerated": false
  },
  {
    "id": "hi-rss-nasional-59357-3",
    "title": "Kemenpar Dorong Agen Perjalanan Garap Paket Wisata Tematik Jogja",
    "titleEn": "Indonesia Tourism Update: Kemenpar Dorong Agen Perjalanan Garap Paket Wisata Tematik Jogja",
    "category": "Pariwisata Indonesia",
    "categoryEn": "Indonesian Tourism",
    "date": "30 Oktober 2026",
    "dateEn": "October 30, 2026",
    "sourceName": "Lensa Hukum",
    "sourceDomain": "kemenparekraf.go.id",
    "sourceUrl": "https://news.google.com/rss/articles/CBMibEFVX3lxTE9jSjVxdGJLb01RLXhETV85QnduVjllYm9HS2RDU1ZkMWN1N1Z4cXNCTlpyanRjWDdDU0d6Y0p6QTFRcTR1ZDRNUnE4M1hocWMydmgwYTNoOTVEeVNER2tMeFRpazZ1WXpkbWdyMg?oc=5",
    "sourceIcon": "https://www.google.com/s2/favicons?domain=kemenparekraf.go.id&sz=64",
    "imageUrl": "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=800&q=80",
    "tag": "Nasional",
    "tagEn": "National",
    "actionUrl": "https://news.google.com/rss/articles/CBMibEFVX3lxTE9jSjVxdGJLb01RLXhETV85QnduVjllYm9HS2RDU1ZkMWN1N1Z4cXNCTlpyanRjWDdDU0d6Y0p6QTFRcTR1ZDRNUnE4M1hocWMydmgwYTNoOTVEeVNER2tMeFRpazZ1WXpkbWdyMg?oc=5",
    "mapsUrl": "https://www.google.com/maps/search/?api=1&query=Indonesia",
    "locationName": "Kawasan Wisata Nusantara Indonesia",
    "locationNameEn": "Indonesian Archipelago Tourism Destinations",
    "description": "Kementerian Pariwisata Republik Indonesia bersama para pemangku kepentingan sektor pariwisata nasional terus menggalakkan program strategis: \"Kemenpar Dorong Agen Perjalanan Garap Paket Wisata Tematik Jogja\". Kebijakan ini merupakan bagian integral dari peta jalan pariwisata berkualitas dan berkelanjutan di seluruh nusantara.\n\nMelalui penguatan kolaborasi lintas-sektor, akselerasi digitalisasi ekosistem wisata, serta diversifikasi paket perjalanan tematik, sektor pariwisata Indonesia dipacu untuk meningkatkan pergerakan wisatawan nusantara dan kunjungan wisatawan mancanegara secara inklusif.",
    "descriptionEn": "The Ministry of Tourism of the Republic of Indonesia and national travel stakeholders continue implementing strategic programs: \"Kemenpar Dorong Agen Perjalanan Garap Paket Wisata Tematik Jogja\". This initiative supports the national roadmap toward high-yield, sustainable tourism development across the Indonesian archipelago.\n\nBy fostering cross-sector partnerships, advancing digital tourism ecosystems, and curating thematic travel itineraries, Indonesia's tourism industry is well-positioned to drive robust tourist footfall and inclusive economic growth.",
    "highlights": [
      "Penguatan pariwisata berkelanjutan dan ramah lingkungan",
      "Peningkatan pergerakan wisatawan nusantara dan mancanegara",
      "Digitalisasi ekosistem pariwisata dan UMKM kreatif"
    ],
    "highlightsEn": [
      "Strengthening sustainable and eco-friendly tourism",
      "Boosting domestic and international tourist movements",
      "Digital transformation of tourism and creative MSMEs"
    ],
    "tips": "Manfaatkan kalender event pariwisata resmi untuk merencanakan liburan.",
    "tipsEn": "Leverage official tourism event calendars for seamless holiday planning.",
    "createdAt": "2026-10-30T16:27:36.000Z",
    "generatedAt": "2026-10-31T00:45:59.357Z",
    "generatedBy": "Malala Autonomous RSS Engine (Google News National Parekraf Feed)",
    "isAIGenerated": false
  }
];

export const DOWNLOAD_ITEMS: DownloadItem[] = [];

