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
    "id": "hi-rss-sumbar-00309-1",
    "title": "Gubernur Mahyeldi Apresiasi Langkah Positif FPTI Sumbar Gelar HICFEST 2026 di Lembah Harau",
    "titleEn": "West Sumatra Tourism: Gubernur Mahyeldi Apresiasi Langkah Positif FPTI Sumbar Gelar HICFEST 2026 di Lembah Harau",
    "category": "Pariwisata Sumatera Barat",
    "categoryEn": "West Sumatra Tourism",
    "date": "6 November 2026",
    "dateEn": "November 6, 2026",
    "sourceName": "Mimbarsumbar.id",
    "sourceDomain": "sumbar.antaranews.com",
    "sourceUrl": "https://news.google.com/rss/articles/CBMitgFBVV95cUxNRXZzajEzbHJhQ2o4VlVBR2NCUS00S2o4OTFhZDVQNUJGQnZFcWJsVTNaOVpjWW1iS0kxREQyZ3h4WUNGa2lNSVZhb2xDUDNJOTdiV2lyVkhINVFLeldXakI0eW93eUM0TE5wV3Z2ZGwtblhPRnZKWkxxNWVWTVR2aGU2X3FtSzZPRGVNSTRaUURnT00zMVR0M2l5Q0tMeTNFX1JobHVSU050eHUtVzZXLWd5dzVYQQ?oc=5",
    "sourceIcon": "https://www.google.com/s2/favicons?domain=antaranews.com&sz=64",
    "imageUrl": "https://images.unsplash.com/photo-1527668752968-14dc70a27c95?auto=format&fit=crop&w=800&q=80",
    "tag": "Sumbar",
    "tagEn": "West Sumatra",
    "actionUrl": "https://news.google.com/rss/articles/CBMitgFBVV95cUxNRXZzajEzbHJhQ2o4VlVBR2NCUS00S2o4OTFhZDVQNUJGQnZFcWJsVTNaOVpjWW1iS0kxREQyZ3h4WUNGa2lNSVZhb2xDUDNJOTdiV2lyVkhINVFLeldXakI0eW93eUM0TE5wV3Z2ZGwtblhPRnZKWkxxNWVWTVR2aGU2X3FtSzZPRGVNSTRaUURnT00zMVR0M2l5Q0tMeTNFX1JobHVSU050eHUtVzZXLWd5dzVYQQ?oc=5",
    "mapsUrl": "https://www.google.com/maps/search/?api=1&query=Lembah+Harau",
    "locationName": "Geopark Lembah Harau, Lima Puluh Kota",
    "locationNameEn": "Harau Valley Geopark, Lima Puluh Kota",
    "description": "Laporan liputan jurnalistik resmi: \"Gubernur Mahyeldi Apresiasi Langkah Positif FPTI Sumbar Gelar HICFEST 2026 di Lembah Harau\". Pemerintah Provinsi Sumatera Barat bersama Dinas Pariwisata dan seluruh pemangku kepentingan terus mempercepat langkah strategis guna mengoptimalkan potensi wisata alam yang asri, keluhuran adat dan seni budaya Minangkabau, serta kuliner halal legendaris di berbagai kabupaten dan kota.\n\nInisiatif terpadu ini difokuskan pada peningkatan kualitas amenitas dan fasilitas umum di objek wisata, kemudahan konektivitas transportasi wisatawan, serta penguatan pelaku UMKM dan industri ekonomi kreatif lokal agar pariwisata Ranah Minang senantiasa berdaya saing tinggi dan berkelanjutan.",
    "descriptionEn": "Official news report: \"Gubernur Mahyeldi Apresiasi Langkah Positif FPTI Sumbar Gelar HICFEST 2026 di Lembah Harau\". West Sumatra provincial authorities, the regional tourism board, and hospitality stakeholders are accelerating strategic measures to showcase authentic natural landscapes, Minangkabau cultural heritage, and legendary halal culinary traditions.\n\nThis concerted initiative focuses on upgrading tourist amenities, streamlining transport connectivity, and empowering local creative MSMEs, ensuring West Sumatra's tourism remains highly competitive, hospitable, and sustainable for both domestic and international travelers.",
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
    "createdAt": "2026-11-06T00:40:48.000Z",
    "generatedAt": "2026-11-06T00:45:00.309Z",
    "generatedBy": "Malala Autonomous RSS Engine (Google News Sumbar Feed)",
    "isAIGenerated": false
  },
  {
    "id": "hi-rss-nasional-00309-1",
    "title": "Lima Geopark Indonesia Raih Green Card UNESCO, Bojonegoro Resmi Masuk Jaringan Geopark Dunia",
    "titleEn": "Indonesia Tourism Update: Lima Geopark Indonesia Raih Green Card UNESCO, Bojonegoro Resmi Masuk Jaringan Geopark Dunia",
    "category": "Pariwisata Indonesia",
    "categoryEn": "Indonesian Tourism",
    "date": "6 November 2026",
    "dateEn": "November 6, 2026",
    "sourceName": "atnews.id",
    "sourceDomain": "kemenparekraf.go.id",
    "sourceUrl": "https://news.google.com/rss/articles/CBMiTEFVX3lxTE4tbVM4cXF5WE9ieEw1TDBTaHY3cU9LOWttUG1FTGtsU1VXN21FYXVOZmhNSF84SkZmak5vLWNzYVZDWHBNSVFmWndzNVk?oc=5",
    "sourceIcon": "https://www.google.com/s2/favicons?domain=kemenparekraf.go.id&sz=64",
    "imageUrl": "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=800&q=80",
    "tag": "Nasional",
    "tagEn": "National",
    "actionUrl": "https://news.google.com/rss/articles/CBMiTEFVX3lxTE4tbVM4cXF5WE9ieEw1TDBTaHY3cU9LOWttUG1FTGtsU1VXN21FYXVOZmhNSF84SkZmak5vLWNzYVZDWHBNSVFmWndzNVk?oc=5",
    "mapsUrl": "https://www.google.com/maps/search/?api=1&query=Indonesia",
    "locationName": "Kawasan Wisata Nusantara Indonesia",
    "locationNameEn": "Indonesian Archipelago Tourism Destinations",
    "description": "Kementerian Pariwisata Republik Indonesia bersama para pemangku kepentingan sektor pariwisata nasional terus menggalakkan program strategis: \"Lima Geopark Indonesia Raih Green Card UNESCO, Bojonegoro Resmi Masuk Jaringan Geopark Dunia\". Kebijakan ini merupakan bagian integral dari peta jalan pariwisata berkualitas dan berkelanjutan di seluruh nusantara.\n\nMelalui penguatan kolaborasi lintas-sektor, akselerasi digitalisasi ekosistem wisata, serta diversifikasi paket perjalanan tematik, sektor pariwisata Indonesia dipacu untuk meningkatkan pergerakan wisatawan nusantara dan kunjungan wisatawan mancanegara secara inklusif.",
    "descriptionEn": "The Ministry of Tourism of the Republic of Indonesia and national travel stakeholders continue implementing strategic programs: \"Lima Geopark Indonesia Raih Green Card UNESCO, Bojonegoro Resmi Masuk Jaringan Geopark Dunia\". This initiative supports the national roadmap toward high-yield, sustainable tourism development across the Indonesian archipelago.\n\nBy fostering cross-sector partnerships, advancing digital tourism ecosystems, and curating thematic travel itineraries, Indonesia's tourism industry is well-positioned to drive robust tourist footfall and inclusive economic growth.",
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
    "createdAt": "2026-11-06T00:39:15.000Z",
    "generatedAt": "2026-11-06T00:45:00.309Z",
    "generatedBy": "Malala Autonomous RSS Engine (Google News National Parekraf Feed)",
    "isAIGenerated": false
  },
  {
    "id": "hi-rss-nasional-00309-2",
    "title": "RI Bidik Pertukaran Wisatawan ASEAN-Korea Selatan Tembus 20 Juta Orang",
    "titleEn": "Indonesia Tourism Update: RI Bidik Pertukaran Wisatawan ASEAN-Korea Selatan Tembus 20 Juta Orang",
    "category": "Pariwisata Indonesia",
    "categoryEn": "Indonesian Tourism",
    "date": "5 November 2026",
    "dateEn": "November 5, 2026",
    "sourceName": "BeritaSatu.com",
    "sourceDomain": "kemenparekraf.go.id",
    "sourceUrl": "https://news.google.com/rss/articles/CBMitAFBVV95cUxOaXo3aVY5RTExWVU5ejBUeUg2LUt0YUhDSy1KWHpaYkVvc1FPMXhpdE9LRWwwNnNKTlJ4M1BlV1NicGJZd3dzX29xVkhBTHQ3cGtOWkx4ajdKd1NMV1E5QUZZcUpVWUV4OVpXa2VqR01sYUxpY1V5R2oxQjJFeDhSby1HV2h3ZS1YRmdmNzlCV25wRDFTektCc3RSeGVySWZsdEswS2RYaGhPRkphdjYxY0NpQVc?oc=5",
    "sourceIcon": "https://www.google.com/s2/favicons?domain=kemenparekraf.go.id&sz=64",
    "imageUrl": "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=800&q=80",
    "tag": "Nasional",
    "tagEn": "National",
    "actionUrl": "https://news.google.com/rss/articles/CBMitAFBVV95cUxOaXo3aVY5RTExWVU5ejBUeUg2LUt0YUhDSy1KWHpaYkVvc1FPMXhpdE9LRWwwNnNKTlJ4M1BlV1NicGJZd3dzX29xVkhBTHQ3cGtOWkx4ajdKd1NMV1E5QUZZcUpVWUV4OVpXa2VqR01sYUxpY1V5R2oxQjJFeDhSby1HV2h3ZS1YRmdmNzlCV25wRDFTektCc3RSeGVySWZsdEswS2RYaGhPRkphdjYxY0NpQVc?oc=5",
    "mapsUrl": "https://www.google.com/maps/search/?api=1&query=Indonesia",
    "locationName": "Kawasan Wisata Nusantara Indonesia",
    "locationNameEn": "Indonesian Archipelago Tourism Destinations",
    "description": "Kementerian Pariwisata Republik Indonesia bersama para pemangku kepentingan sektor pariwisata nasional terus menggalakkan program strategis: \"RI Bidik Pertukaran Wisatawan ASEAN-Korea Selatan Tembus 20 Juta Orang\". Kebijakan ini merupakan bagian integral dari peta jalan pariwisata berkualitas dan berkelanjutan di seluruh nusantara.\n\nMelalui penguatan kolaborasi lintas-sektor, akselerasi digitalisasi ekosistem wisata, serta diversifikasi paket perjalanan tematik, sektor pariwisata Indonesia dipacu untuk meningkatkan pergerakan wisatawan nusantara dan kunjungan wisatawan mancanegara secara inklusif.",
    "descriptionEn": "The Ministry of Tourism of the Republic of Indonesia and national travel stakeholders continue implementing strategic programs: \"RI Bidik Pertukaran Wisatawan ASEAN-Korea Selatan Tembus 20 Juta Orang\". This initiative supports the national roadmap toward high-yield, sustainable tourism development across the Indonesian archipelago.\n\nBy fostering cross-sector partnerships, advancing digital tourism ecosystems, and curating thematic travel itineraries, Indonesia's tourism industry is well-positioned to drive robust tourist footfall and inclusive economic growth.",
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
    "createdAt": "2026-11-05T20:37:00.000Z",
    "generatedAt": "2026-11-06T00:45:00.309Z",
    "generatedBy": "Malala Autonomous RSS Engine (Google News National Parekraf Feed)",
    "isAIGenerated": false
  },
  {
    "id": "hi-rss-nasional-00309-3",
    "title": "Kemenpar Perkuat Kerja Sama Pariwisata ASEAN dan Korea",
    "titleEn": "Indonesia Tourism Update: Kemenpar Perkuat Kerja Sama Pariwisata ASEAN dan Korea",
    "category": "Pariwisata Indonesia",
    "categoryEn": "Indonesian Tourism",
    "date": "5 November 2026",
    "dateEn": "November 5, 2026",
    "sourceName": "Lensa Hukum",
    "sourceDomain": "kemenparekraf.go.id",
    "sourceUrl": "https://news.google.com/rss/articles/CBMiakFVX3lxTE94OFBKUWNtcVlqeFNRRkJPWFBzVnBIbUNRaHdXYlo5MjNIc0EtRmZxdUZLaldmZ2F5c05RZW5TRDFVU2ZGSUlYS3lmRm1RalNubjl0TXh6NEt1N0FYNlRhS0xCRDAya0VXRVE?oc=5",
    "sourceIcon": "https://www.google.com/s2/favicons?domain=kemenparekraf.go.id&sz=64",
    "imageUrl": "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=800&q=80",
    "tag": "Nasional",
    "tagEn": "National",
    "actionUrl": "https://news.google.com/rss/articles/CBMiakFVX3lxTE94OFBKUWNtcVlqeFNRRkJPWFBzVnBIbUNRaHdXYlo5MjNIc0EtRmZxdUZLaldmZ2F5c05RZW5TRDFVU2ZGSUlYS3lmRm1RalNubjl0TXh6NEt1N0FYNlRhS0xCRDAya0VXRVE?oc=5",
    "mapsUrl": "https://www.google.com/maps/search/?api=1&query=Indonesia",
    "locationName": "Kawasan Wisata Nusantara Indonesia",
    "locationNameEn": "Indonesian Archipelago Tourism Destinations",
    "description": "Kementerian Pariwisata Republik Indonesia bersama para pemangku kepentingan sektor pariwisata nasional terus menggalakkan program strategis: \"Kemenpar Perkuat Kerja Sama Pariwisata ASEAN dan Korea\". Kebijakan ini merupakan bagian integral dari peta jalan pariwisata berkualitas dan berkelanjutan di seluruh nusantara.\n\nMelalui penguatan kolaborasi lintas-sektor, akselerasi digitalisasi ekosistem wisata, serta diversifikasi paket perjalanan tematik, sektor pariwisata Indonesia dipacu untuk meningkatkan pergerakan wisatawan nusantara dan kunjungan wisatawan mancanegara secara inklusif.",
    "descriptionEn": "The Ministry of Tourism of the Republic of Indonesia and national travel stakeholders continue implementing strategic programs: \"Kemenpar Perkuat Kerja Sama Pariwisata ASEAN dan Korea\". This initiative supports the national roadmap toward high-yield, sustainable tourism development across the Indonesian archipelago.\n\nBy fostering cross-sector partnerships, advancing digital tourism ecosystems, and curating thematic travel itineraries, Indonesia's tourism industry is well-positioned to drive robust tourist footfall and inclusive economic growth.",
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
    "createdAt": "2026-11-05T18:24:00.000Z",
    "generatedAt": "2026-11-06T00:45:00.309Z",
    "generatedBy": "Malala Autonomous RSS Engine (Google News National Parekraf Feed)",
    "isAIGenerated": false
  },
  {
    "id": "hi-rss-sumbar-00309-2",
    "title": "Pacu Kudo Padang Pariaman Bidik Kalender Event Nasional 2027",
    "titleEn": "West Sumatra Tourism: Pacu Kudo Padang Pariaman Bidik Kalender Event Nasional 2027",
    "category": "Pariwisata Sumatera Barat",
    "categoryEn": "West Sumatra Tourism",
    "date": "5 November 2026",
    "dateEn": "November 5, 2026",
    "sourceName": "ValoraNews.com",
    "sourceDomain": "sumbar.antaranews.com",
    "sourceUrl": "https://news.google.com/rss/articles/CBMiogFBVV95cUxQZUZqVF9Td2diSHpCZ1kyN1FXWkZzYzJaZGJMOGVyNlNYU0kxeVM5Nzl1ZWd2bnZDQlpXazg4WHNURFg1TWRQQzhYTVBqYThYcm9pVFkxbW52cTRkS3lfWG9LOGljNlFWT0gzaXhHZFh1a3pvUnNWam1sZURsaFNyZDRPUno4bG9qNW92eG95eG43UG9UbVYtMk9mdS1WcWsyeXc?oc=5",
    "sourceIcon": "https://www.google.com/s2/favicons?domain=antaranews.com&sz=64",
    "imageUrl": "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80",
    "tag": "Sumbar",
    "tagEn": "West Sumatra",
    "actionUrl": "https://news.google.com/rss/articles/CBMiogFBVV95cUxQZUZqVF9Td2diSHpCZ1kyN1FXWkZzYzJaZGJMOGVyNlNYU0kxeVM5Nzl1ZWd2bnZDQlpXazg4WHNURFg1TWRQQzhYTVBqYThYcm9pVFkxbW52cTRkS3lfWG9LOGljNlFWT0gzaXhHZFh1a3pvUnNWam1sZURsaFNyZDRPUno4bG9qNW92eG95eG43UG9UbVYtMk9mdS1WcWsyeXc?oc=5",
    "mapsUrl": "https://www.google.com/maps/search/?api=1&query=Pantai+Gandoriah+Pariaman",
    "locationName": "Kawasan Wisata Pesisir Pariaman",
    "locationNameEn": "Pariaman Coastal Tourism Area",
    "description": "Laporan liputan jurnalistik resmi: \"Pacu Kudo Padang Pariaman Bidik Kalender Event Nasional 2027\". Pemerintah Provinsi Sumatera Barat bersama Dinas Pariwisata dan seluruh pemangku kepentingan terus mempercepat langkah strategis guna mengoptimalkan potensi wisata alam yang asri, keluhuran adat dan seni budaya Minangkabau, serta kuliner halal legendaris di berbagai kabupaten dan kota.\n\nInisiatif terpadu ini difokuskan pada peningkatan kualitas amenitas dan fasilitas umum di objek wisata, kemudahan konektivitas transportasi wisatawan, serta penguatan pelaku UMKM dan industri ekonomi kreatif lokal agar pariwisata Ranah Minang senantiasa berdaya saing tinggi dan berkelanjutan.",
    "descriptionEn": "Official news report: \"Pacu Kudo Padang Pariaman Bidik Kalender Event Nasional 2027\". West Sumatra provincial authorities, the regional tourism board, and hospitality stakeholders are accelerating strategic measures to showcase authentic natural landscapes, Minangkabau cultural heritage, and legendary halal culinary traditions.\n\nThis concerted initiative focuses on upgrading tourist amenities, streamlining transport connectivity, and empowering local creative MSMEs, ensuring West Sumatra's tourism remains highly competitive, hospitable, and sustainable for both domestic and international travelers.",
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
    "createdAt": "2026-11-05T14:30:00.000Z",
    "generatedAt": "2026-11-06T00:45:00.309Z",
    "generatedBy": "Malala Autonomous RSS Engine (Google News Sumbar Feed)",
    "isAIGenerated": false
  },
  {
    "id": "hi-rss-sumbar-00309-3",
    "title": "Kemenhaj Sumbar Sebut Travel Umrah Singgalang dan Asafi Tour Tak Berizin, Pemilik Buka Suara",
    "titleEn": "West Sumatra Tourism: Kemenhaj Sumbar Sebut Travel Umrah Singgalang dan Asafi Tour Tak Berizin, Pemilik Buka Suara",
    "category": "Pariwisata Sumatera Barat",
    "categoryEn": "West Sumatra Tourism",
    "date": "5 November 2026",
    "dateEn": "November 5, 2026",
    "sourceName": "Sumbarkita.id",
    "sourceDomain": "sumbar.antaranews.com",
    "sourceUrl": "https://news.google.com/rss/articles/CBMitAFBVV95cUxQRW9xWElOYXJYX2R2cmxqMWt4R1VMNlZhOC1IdVdvNUtOUTBvNUxaeWUxUGZGWWx5X1ZuS0hHaWJpdE5PVEh6Wl84TlNlNHJ2N0RLYU56UzM1X09XU1h6NkdzWFRUTjBINGl5bksydUViQloyQVRCRkFUZVp6bVNIZWpfRk5yNVlBUmtTdTl2WkxOVmI2Zk9OZXRMTHpoVmx1ZTVCY2dJSTFNUXhUclhybU92WXU?oc=5",
    "sourceIcon": "https://www.google.com/s2/favicons?domain=antaranews.com&sz=64",
    "imageUrl": "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=800&q=80",
    "tag": "Sumbar",
    "tagEn": "West Sumatra",
    "actionUrl": "https://news.google.com/rss/articles/CBMitAFBVV95cUxQRW9xWElOYXJYX2R2cmxqMWt4R1VMNlZhOC1IdVdvNUtOUTBvNUxaeWUxUGZGWWx5X1ZuS0hHaWJpdE5PVEh6Wl84TlNlNHJ2N0RLYU56UzM1X09XU1h6NkdzWFRUTjBINGl5bksydUViQloyQVRCRkFUZVp6bVNIZWpfRk5yNVlBUmtTdTl2WkxOVmI2Zk9OZXRMTHpoVmx1ZTVCY2dJSTFNUXhUclhybU92WXU?oc=5",
    "mapsUrl": "https://www.google.com/maps/search/?api=1&query=Sumatera+Barat",
    "locationName": "Destinasi Wisata Unggulan Sumatera Barat",
    "locationNameEn": "West Sumatra Prime Tourism Destinations",
    "description": "Laporan liputan jurnalistik resmi: \"Kemenhaj Sumbar Sebut Travel Umrah Singgalang dan Asafi Tour Tak Berizin, Pemilik Buka Suara\". Pemerintah Provinsi Sumatera Barat bersama Dinas Pariwisata dan seluruh pemangku kepentingan terus mempercepat langkah strategis guna mengoptimalkan potensi wisata alam yang asri, keluhuran adat dan seni budaya Minangkabau, serta kuliner halal legendaris di berbagai kabupaten dan kota.\n\nInisiatif terpadu ini difokuskan pada peningkatan kualitas amenitas dan fasilitas umum di objek wisata, kemudahan konektivitas transportasi wisatawan, serta penguatan pelaku UMKM dan industri ekonomi kreatif lokal agar pariwisata Ranah Minang senantiasa berdaya saing tinggi dan berkelanjutan.",
    "descriptionEn": "Official news report: \"Kemenhaj Sumbar Sebut Travel Umrah Singgalang dan Asafi Tour Tak Berizin, Pemilik Buka Suara\". West Sumatra provincial authorities, the regional tourism board, and hospitality stakeholders are accelerating strategic measures to showcase authentic natural landscapes, Minangkabau cultural heritage, and legendary halal culinary traditions.\n\nThis concerted initiative focuses on upgrading tourist amenities, streamlining transport connectivity, and empowering local creative MSMEs, ensuring West Sumatra's tourism remains highly competitive, hospitable, and sustainable for both domestic and international travelers.",
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
    "createdAt": "2026-11-05T13:44:13.000Z",
    "generatedAt": "2026-11-06T00:45:00.309Z",
    "generatedBy": "Malala Autonomous RSS Engine (Google News Sumbar Feed)",
    "isAIGenerated": false
  },
  {
    "id": "hi-rss-sumbar-00309-4",
    "title": "‎Dorong Ekonomi Warga dan Lestarikan Budaya, Padang Pariaman Pacu Kudo 2027 Diusulkan Masuk KEN",
    "titleEn": "West Sumatra Tourism: ‎Dorong Ekonomi Warga dan Lestarikan Budaya, Padang Pariaman Pacu Kudo 2027 Diusulkan Masuk KEN",
    "category": "Pariwisata Sumatera Barat",
    "categoryEn": "West Sumatra Tourism",
    "date": "5 November 2026",
    "dateEn": "November 5, 2026",
    "sourceName": "Pemkab Padang Pariaman",
    "sourceDomain": "sumbar.antaranews.com",
    "sourceUrl": "https://news.google.com/rss/articles/CBMi3AFBVV95cUxQdGVST21wZUNpQmswQmE1bEpNMkpiRHRCbkdPbVEzeW1iTXVqR2RBTEdGNW4tWWhBUlFTblJaYnhsRUxuWHlJVGVjQ3pzdkRJNmV0Zm9JNlVld2RYWGpwcEdCc3p2UGlqazBjZ2hzWDZReTdLVkRYcEJud09ZR21UWDgwOTV2UWxCNXRuVVhBa2xGN1Q0RGhRMEduOVZUaW9fRTZxdnFtMWdxbHJMRHlPdXJGSjhiOW1VOURfV2Rkb2w3cEY2Y2NuRVVLZXZTa0dCSFE1UnVySlB1QkZk?oc=5",
    "sourceIcon": "https://www.google.com/s2/favicons?domain=antaranews.com&sz=64",
    "imageUrl": "https://images.unsplash.com/photo-1590523741831-ab7e8b8f9c7f?auto=format&fit=crop&w=800&q=80",
    "tag": "Sumbar",
    "tagEn": "West Sumatra",
    "actionUrl": "https://news.google.com/rss/articles/CBMi3AFBVV95cUxQdGVST21wZUNpQmswQmE1bEpNMkpiRHRCbkdPbVEzeW1iTXVqR2RBTEdGNW4tWWhBUlFTblJaYnhsRUxuWHlJVGVjQ3pzdkRJNmV0Zm9JNlVld2RYWGpwcEdCc3p2UGlqazBjZ2hzWDZReTdLVkRYcEJud09ZR21UWDgwOTV2UWxCNXRuVVhBa2xGN1Q0RGhRMEduOVZUaW9fRTZxdnFtMWdxbHJMRHlPdXJGSjhiOW1VOURfV2Rkb2w3cEY2Y2NuRVVLZXZTa0dCSFE1UnVySlB1QkZk?oc=5",
    "mapsUrl": "https://www.google.com/maps/search/?api=1&query=Pantai+Gandoriah+Pariaman",
    "locationName": "Kawasan Wisata Pesisir Pariaman",
    "locationNameEn": "Pariaman Coastal Tourism Area",
    "description": "Laporan liputan jurnalistik resmi: \"‎Dorong Ekonomi Warga dan Lestarikan Budaya, Padang Pariaman Pacu Kudo 2027 Diusulkan Masuk KEN\". Pemerintah Provinsi Sumatera Barat bersama Dinas Pariwisata dan seluruh pemangku kepentingan terus mempercepat langkah strategis guna mengoptimalkan potensi wisata alam yang asri, keluhuran adat dan seni budaya Minangkabau, serta kuliner halal legendaris di berbagai kabupaten dan kota.\n\nInisiatif terpadu ini difokuskan pada peningkatan kualitas amenitas dan fasilitas umum di objek wisata, kemudahan konektivitas transportasi wisatawan, serta penguatan pelaku UMKM dan industri ekonomi kreatif lokal agar pariwisata Ranah Minang senantiasa berdaya saing tinggi dan berkelanjutan.",
    "descriptionEn": "Official news report: \"‎Dorong Ekonomi Warga dan Lestarikan Budaya, Padang Pariaman Pacu Kudo 2027 Diusulkan Masuk KEN\". West Sumatra provincial authorities, the regional tourism board, and hospitality stakeholders are accelerating strategic measures to showcase authentic natural landscapes, Minangkabau cultural heritage, and legendary halal culinary traditions.\n\nThis concerted initiative focuses on upgrading tourist amenities, streamlining transport connectivity, and empowering local creative MSMEs, ensuring West Sumatra's tourism remains highly competitive, hospitable, and sustainable for both domestic and international travelers.",
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
    "createdAt": "2026-11-05T12:39:08.000Z",
    "generatedAt": "2026-11-06T00:45:00.309Z",
    "generatedBy": "Malala Autonomous RSS Engine (Google News Sumbar Feed)",
    "isAIGenerated": false
  },
  {
    "id": "hi-rss-sumbar-81141-1",
    "title": "Menghidupkan Kembali Kereta Api Sumbar, Ini 7 Tantangan yang Harus Dijawab",
    "titleEn": "West Sumatra Tourism: Menghidupkan Kembali Kereta Api Sumbar, Ini 7 Tantangan yang Harus Dijawab",
    "category": "Pariwisata Sumatera Barat",
    "categoryEn": "West Sumatra Tourism",
    "date": "4 November 2026",
    "dateEn": "November 4, 2026",
    "sourceName": "Portal Pekalongan",
    "sourceDomain": "sumbar.antaranews.com",
    "sourceUrl": "https://news.google.com/rss/articles/CBMi2AFBVV95cUxPam1IMzFNSUlCWW5haENwZDBWM1g5U3AwMW5POEhkZHpkbFZLN1ptQ3lSUm85cjV5TUNWWGlaV1hiT1ZOdy1EVXpfVWwzR0pPVXBQT0FiRXdNbWk5alNnQ194R2dVMURKZmdlZjV5c0VNczktTmZRbFZOVXhuaUltWlkxNndXZm9yR3NOSVJMZVFJcjA2Q0tMWGM2VHJWRWpuaUhIQjRLcUUwVHFrSWdYd0R4VDI3TkNCNVJwVXhKYklmaEE2aXZTbmZZRTdBNnhPSFR6ZkliQ1XSAd4BQVVfeXFMT3QzUURyLWE2MGxFeFg5QWZRSjRUUUJ5VVpYREk1SVQyM0dmR1kzMmRCZnNHbVk2WnpzZ2t2TTdOYWViQVgyS0NxOWgwT0NjMnlILU5OYkxMZUZyUFFpVTZ3M3hWeXZPTUJrSWhtRFRBMi1BT0VZRGU4VXBBMFg1bTY0OU9uQVNnaVZzOGtlWGxvbFRHcTY3enpZY18wcXhiaXdVWUltd3pOeFpzNHc3TkdnUEh2bENHMWg2VW9OM3dSOFhhR3JhTVNCU0EzelZDaUpKb0NZcUNVcjFlZHlB?oc=5",
    "sourceIcon": "https://www.google.com/s2/favicons?domain=antaranews.com&sz=64",
    "imageUrl": "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=800&q=80",
    "tag": "Sumbar",
    "tagEn": "West Sumatra",
    "actionUrl": "https://news.google.com/rss/articles/CBMi2AFBVV95cUxPam1IMzFNSUlCWW5haENwZDBWM1g5U3AwMW5POEhkZHpkbFZLN1ptQ3lSUm85cjV5TUNWWGlaV1hiT1ZOdy1EVXpfVWwzR0pPVXBQT0FiRXdNbWk5alNnQ194R2dVMURKZmdlZjV5c0VNczktTmZRbFZOVXhuaUltWlkxNndXZm9yR3NOSVJMZVFJcjA2Q0tMWGM2VHJWRWpuaUhIQjRLcUUwVHFrSWdYd0R4VDI3TkNCNVJwVXhKYklmaEE2aXZTbmZZRTdBNnhPSFR6ZkliQ1XSAd4BQVVfeXFMT3QzUURyLWE2MGxFeFg5QWZRSjRUUUJ5VVpYREk1SVQyM0dmR1kzMmRCZnNHbVk2WnpzZ2t2TTdOYWViQVgyS0NxOWgwT0NjMnlILU5OYkxMZUZyUFFpVTZ3M3hWeXZPTUJrSWhtRFRBMi1BT0VZRGU4VXBBMFg1bTY0OU9uQVNnaVZzOGtlWGxvbFRHcTY3enpZY18wcXhiaXdVWUltd3pOeFpzNHc3TkdnUEh2bENHMWg2VW9OM3dSOFhhR3JhTVNCU0EzelZDaUpKb0NZcUNVcjFlZHlB?oc=5",
    "mapsUrl": "https://www.google.com/maps/search/?api=1&query=Sumatera+Barat",
    "locationName": "Destinasi Wisata Unggulan Sumatera Barat",
    "locationNameEn": "West Sumatra Prime Tourism Destinations",
    "description": "Laporan liputan jurnalistik resmi: \"Menghidupkan Kembali Kereta Api Sumbar, Ini 7 Tantangan yang Harus Dijawab\". Pemerintah Provinsi Sumatera Barat bersama Dinas Pariwisata dan seluruh pemangku kepentingan terus mempercepat langkah strategis guna mengoptimalkan potensi wisata alam yang asri, keluhuran adat dan seni budaya Minangkabau, serta kuliner halal legendaris di berbagai kabupaten dan kota.\n\nInisiatif terpadu ini difokuskan pada peningkatan kualitas amenitas dan fasilitas umum di objek wisata, kemudahan konektivitas transportasi wisatawan, serta penguatan pelaku UMKM dan industri ekonomi kreatif lokal agar pariwisata Ranah Minang senantiasa berdaya saing tinggi dan berkelanjutan.",
    "descriptionEn": "Official news report: \"Menghidupkan Kembali Kereta Api Sumbar, Ini 7 Tantangan yang Harus Dijawab\". West Sumatra provincial authorities, the regional tourism board, and hospitality stakeholders are accelerating strategic measures to showcase authentic natural landscapes, Minangkabau cultural heritage, and legendary halal culinary traditions.\n\nThis concerted initiative focuses on upgrading tourist amenities, streamlining transport connectivity, and empowering local creative MSMEs, ensuring West Sumatra's tourism remains highly competitive, hospitable, and sustainable for both domestic and international travelers.",
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
    "createdAt": "2026-11-04T23:30:00.000Z",
    "generatedAt": "2026-11-05T00:44:41.141Z",
    "generatedBy": "Malala Autonomous RSS Engine (Google News Sumbar Feed)",
    "isAIGenerated": false
  },
  {
    "id": "hi-rss-nasional-81141-1",
    "title": "Menuju Panggung Nasional, Ini Profil Lengkap Finalis Duta Pariwisata Indonesia 2026 Wahyu Trinanda Puteri",
    "titleEn": "Indonesia Tourism Update: Menuju Panggung Nasional, Ini Profil Lengkap Finalis Duta Pariwisata Indonesia 2026 Wahyu Trinanda Puteri",
    "category": "Pariwisata Indonesia",
    "categoryEn": "Indonesian Tourism",
    "date": "4 November 2026",
    "dateEn": "November 4, 2026",
    "sourceName": "opsinews.com",
    "sourceDomain": "kemenparekraf.go.id",
    "sourceUrl": "https://news.google.com/rss/articles/CBMi6wFBVV95cUxNN2N3aDQxd2VwaW9wVkNjWDltZGhvT2hvMVJObjd5REpZOWJVeGJDRVpMM1Awa25yTUMxOVRqYlVjRXltOFFHa0FtT0NFRzJaYlpaYzRkcTVGTVhUWUNhQnhjRUhvN2tPY3p5QVY4UVVYdFRMRnhVTjVtS2FrRjhFTVpWOTZvazlabVJuN1FGbGQ1TFk5TTEwMFV0REo1S0ljWFNhZVRFXzljbWhwTTJWNjhLYUswZXBLMWJvTVBtOGNKUmxXMFdtSThvX1NJQXdfU21lRnhQOFBDZDlqTXkzZHR2dk5say02Yk5Z?oc=5",
    "sourceIcon": "https://www.google.com/s2/favicons?domain=kemenparekraf.go.id&sz=64",
    "imageUrl": "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=800&q=80",
    "tag": "Nasional",
    "tagEn": "National",
    "actionUrl": "https://news.google.com/rss/articles/CBMi6wFBVV95cUxNN2N3aDQxd2VwaW9wVkNjWDltZGhvT2hvMVJObjd5REpZOWJVeGJDRVpMM1Awa25yTUMxOVRqYlVjRXltOFFHa0FtT0NFRzJaYlpaYzRkcTVGTVhUWUNhQnhjRUhvN2tPY3p5QVY4UVVYdFRMRnhVTjVtS2FrRjhFTVpWOTZvazlabVJuN1FGbGQ1TFk5TTEwMFV0REo1S0ljWFNhZVRFXzljbWhwTTJWNjhLYUswZXBLMWJvTVBtOGNKUmxXMFdtSThvX1NJQXdfU21lRnhQOFBDZDlqTXkzZHR2dk5say02Yk5Z?oc=5",
    "mapsUrl": "https://www.google.com/maps/search/?api=1&query=Indonesia",
    "locationName": "Kawasan Wisata Nusantara Indonesia",
    "locationNameEn": "Indonesian Archipelago Tourism Destinations",
    "description": "Kementerian Pariwisata Republik Indonesia bersama para pemangku kepentingan sektor pariwisata nasional terus menggalakkan program strategis: \"Menuju Panggung Nasional, Ini Profil Lengkap Finalis Duta Pariwisata Indonesia 2026 Wahyu Trinanda Puteri\". Kebijakan ini merupakan bagian integral dari peta jalan pariwisata berkualitas dan berkelanjutan di seluruh nusantara.\n\nMelalui penguatan kolaborasi lintas-sektor, akselerasi digitalisasi ekosistem wisata, serta diversifikasi paket perjalanan tematik, sektor pariwisata Indonesia dipacu untuk meningkatkan pergerakan wisatawan nusantara dan kunjungan wisatawan mancanegara secara inklusif.",
    "descriptionEn": "The Ministry of Tourism of the Republic of Indonesia and national travel stakeholders continue implementing strategic programs: \"Menuju Panggung Nasional, Ini Profil Lengkap Finalis Duta Pariwisata Indonesia 2026 Wahyu Trinanda Puteri\". This initiative supports the national roadmap toward high-yield, sustainable tourism development across the Indonesian archipelago.\n\nBy fostering cross-sector partnerships, advancing digital tourism ecosystems, and curating thematic travel itineraries, Indonesia's tourism industry is well-positioned to drive robust tourist footfall and inclusive economic growth.",
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
    "createdAt": "2026-11-04T22:03:05.000Z",
    "generatedAt": "2026-11-05T00:44:41.141Z",
    "generatedBy": "Malala Autonomous RSS Engine (Google News National Parekraf Feed)",
    "isAIGenerated": false
  },
  {
    "id": "hi-rss-nasional-81141-2",
    "title": "Menpar Siapkan Strategi Gaet Wisatawan saat Libur Nataru - Bisnis.com",
    "titleEn": "Indonesia Tourism Update: Menpar Siapkan Strategi Gaet Wisatawan saat Libur Nataru - Bisnis.com",
    "category": "Pariwisata Indonesia",
    "categoryEn": "Indonesian Tourism",
    "date": "4 November 2026",
    "dateEn": "November 4, 2026",
    "sourceName": "Ekonomi",
    "sourceDomain": "kemenparekraf.go.id",
    "sourceUrl": "https://news.google.com/rss/articles/CBMirAFBVV95cUxPYjVlYnFSUHdzUWZxSFdtRDFqb2xVSkZ0STFLZnBUenFtTjhzMFNMVm1JemdHbDRHYlZPam9uTGdwR0l5ZjJ6X1duOThqWmxBSG4yeXRuMGJUS0RqYVp2eENDS2J0WC1vUlcwYlBfbFNHaGdDUHh1ek5TNlJOdVJFNGNiWEdXR3RoVmJNWWxINkFKUld1aW1ld1hicVV0dEFrY24yQTJnN0s5dnFX?oc=5",
    "sourceIcon": "https://www.google.com/s2/favicons?domain=kemenparekraf.go.id&sz=64",
    "imageUrl": "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=800&q=80",
    "tag": "Nasional",
    "tagEn": "National",
    "actionUrl": "https://news.google.com/rss/articles/CBMirAFBVV95cUxPYjVlYnFSUHdzUWZxSFdtRDFqb2xVSkZ0STFLZnBUenFtTjhzMFNMVm1JemdHbDRHYlZPam9uTGdwR0l5ZjJ6X1duOThqWmxBSG4yeXRuMGJUS0RqYVp2eENDS2J0WC1vUlcwYlBfbFNHaGdDUHh1ek5TNlJOdVJFNGNiWEdXR3RoVmJNWWxINkFKUld1aW1ld1hicVV0dEFrY24yQTJnN0s5dnFX?oc=5",
    "mapsUrl": "https://www.google.com/maps/search/?api=1&query=Indonesia",
    "locationName": "Kawasan Wisata Nusantara Indonesia",
    "locationNameEn": "Indonesian Archipelago Tourism Destinations",
    "description": "Kementerian Pariwisata Republik Indonesia bersama para pemangku kepentingan sektor pariwisata nasional terus menggalakkan program strategis: \"Menpar Siapkan Strategi Gaet Wisatawan saat Libur Nataru - Bisnis.com\". Kebijakan ini merupakan bagian integral dari peta jalan pariwisata berkualitas dan berkelanjutan di seluruh nusantara.\n\nMelalui penguatan kolaborasi lintas-sektor, akselerasi digitalisasi ekosistem wisata, serta diversifikasi paket perjalanan tematik, sektor pariwisata Indonesia dipacu untuk meningkatkan pergerakan wisatawan nusantara dan kunjungan wisatawan mancanegara secara inklusif.",
    "descriptionEn": "The Ministry of Tourism of the Republic of Indonesia and national travel stakeholders continue implementing strategic programs: \"Menpar Siapkan Strategi Gaet Wisatawan saat Libur Nataru - Bisnis.com\". This initiative supports the national roadmap toward high-yield, sustainable tourism development across the Indonesian archipelago.\n\nBy fostering cross-sector partnerships, advancing digital tourism ecosystems, and curating thematic travel itineraries, Indonesia's tourism industry is well-positioned to drive robust tourist footfall and inclusive economic growth.",
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
    "createdAt": "2026-11-04T22:02:23.000Z",
    "generatedAt": "2026-11-05T00:44:41.141Z",
    "generatedBy": "Malala Autonomous RSS Engine (Google News National Parekraf Feed)",
    "isAIGenerated": false
  },
  {
    "id": "hi-rss-nasional-81141-3",
    "title": "Basarnas Dukung Sinergi Pemerintah dalam Penguatan Sektor Pariwisata Nasional 2026",
    "titleEn": "Indonesia Tourism Update: Basarnas Dukung Sinergi Pemerintah dalam Penguatan Sektor Pariwisata Nasional 2026",
    "category": "Pariwisata Indonesia",
    "categoryEn": "Indonesian Tourism",
    "date": "4 November 2026",
    "dateEn": "November 4, 2026",
    "sourceName": "Basarnas",
    "sourceDomain": "kemenparekraf.go.id",
    "sourceUrl": "https://news.google.com/rss/articles/CBMitwFBVV95cUxPZExUR01tUlJFV0VPdW1UbU5yV1R0NWlEcldYMHhDdzB2NjJUMTFuQ3pfYTY0bUlLazNId0NZUXBYMy14aDVfOGdWSWJSOE5RSmtpRTAxcF9oajdxaUItN3d2SXJvdzB1WjFZSWhiVDJKbm1LOVljZm1HWVFWbEFjN2dNZW84cEl3djJPOXJuM1NiQmxQUmZqMU5sdmhIc1FMSDlzX3pwOXBqY0pkZFpQbk9pMWF3X1k?oc=5",
    "sourceIcon": "https://www.google.com/s2/favicons?domain=kemenparekraf.go.id&sz=64",
    "imageUrl": "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=800&q=80",
    "tag": "Nasional",
    "tagEn": "National",
    "actionUrl": "https://news.google.com/rss/articles/CBMitwFBVV95cUxPZExUR01tUlJFV0VPdW1UbU5yV1R0NWlEcldYMHhDdzB2NjJUMTFuQ3pfYTY0bUlLazNId0NZUXBYMy14aDVfOGdWSWJSOE5RSmtpRTAxcF9oajdxaUItN3d2SXJvdzB1WjFZSWhiVDJKbm1LOVljZm1HWVFWbEFjN2dNZW84cEl3djJPOXJuM1NiQmxQUmZqMU5sdmhIc1FMSDlzX3pwOXBqY0pkZFpQbk9pMWF3X1k?oc=5",
    "mapsUrl": "https://www.google.com/maps/search/?api=1&query=Indonesia",
    "locationName": "Kawasan Wisata Nusantara Indonesia",
    "locationNameEn": "Indonesian Archipelago Tourism Destinations",
    "description": "Kementerian Pariwisata Republik Indonesia bersama para pemangku kepentingan sektor pariwisata nasional terus menggalakkan program strategis: \"Basarnas Dukung Sinergi Pemerintah dalam Penguatan Sektor Pariwisata Nasional 2026\". Kebijakan ini merupakan bagian integral dari peta jalan pariwisata berkualitas dan berkelanjutan di seluruh nusantara.\n\nMelalui penguatan kolaborasi lintas-sektor, akselerasi digitalisasi ekosistem wisata, serta diversifikasi paket perjalanan tematik, sektor pariwisata Indonesia dipacu untuk meningkatkan pergerakan wisatawan nusantara dan kunjungan wisatawan mancanegara secara inklusif.",
    "descriptionEn": "The Ministry of Tourism of the Republic of Indonesia and national travel stakeholders continue implementing strategic programs: \"Basarnas Dukung Sinergi Pemerintah dalam Penguatan Sektor Pariwisata Nasional 2026\". This initiative supports the national roadmap toward high-yield, sustainable tourism development across the Indonesian archipelago.\n\nBy fostering cross-sector partnerships, advancing digital tourism ecosystems, and curating thematic travel itineraries, Indonesia's tourism industry is well-positioned to drive robust tourist footfall and inclusive economic growth.",
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
    "createdAt": "2026-11-04T21:11:54.000Z",
    "generatedAt": "2026-11-05T00:44:41.141Z",
    "generatedBy": "Malala Autonomous RSS Engine (Google News National Parekraf Feed)",
    "isAIGenerated": false
  },
  {
    "id": "hi-rss-sumbar-81141-2",
    "title": "Lembah Harau Didorong Jadi Destinasi Panjat Tebing Dunia",
    "titleEn": "West Sumatra Tourism: Lembah Harau Didorong Jadi Destinasi Panjat Tebing Dunia",
    "category": "Pariwisata Sumatera Barat",
    "categoryEn": "West Sumatra Tourism",
    "date": "4 November 2026",
    "dateEn": "November 4, 2026",
    "sourceName": "Rakyatterkini.com",
    "sourceDomain": "sumbar.antaranews.com",
    "sourceUrl": "https://news.google.com/rss/articles/CBMioAFBVV95cUxOeUdWMUR6STZpTTFIS1ptZDlBckNTNUhaeXBjYzJ0V29FR0FNLXJzMkxucVRJdGpqNmdvUFYxaUlsQWFPbjVqNzVBeWEtVk95Y0R2R21nQ2ZycGdLUmdKNUVnY3FGR1ZhUEhZd0Job2ZRdXh2NHFKSUktTWc5eVRBM3ZNR3hJbGxoTVJVbExlWGtlYlZPUm5xWERndDR3bGg3?oc=5",
    "sourceIcon": "https://www.google.com/s2/favicons?domain=antaranews.com&sz=64",
    "imageUrl": "https://images.unsplash.com/photo-1527668752968-14dc70a27c95?auto=format&fit=crop&w=800&q=80",
    "tag": "Sumbar",
    "tagEn": "West Sumatra",
    "actionUrl": "https://news.google.com/rss/articles/CBMioAFBVV95cUxOeUdWMUR6STZpTTFIS1ptZDlBckNTNUhaeXBjYzJ0V29FR0FNLXJzMkxucVRJdGpqNmdvUFYxaUlsQWFPbjVqNzVBeWEtVk95Y0R2R21nQ2ZycGdLUmdKNUVnY3FGR1ZhUEhZd0Job2ZRdXh2NHFKSUktTWc5eVRBM3ZNR3hJbGxoTVJVbExlWGtlYlZPUm5xWERndDR3bGg3?oc=5",
    "mapsUrl": "https://www.google.com/maps/search/?api=1&query=Lembah+Harau",
    "locationName": "Geopark Lembah Harau, Lima Puluh Kota",
    "locationNameEn": "Harau Valley Geopark, Lima Puluh Kota",
    "description": "Laporan liputan jurnalistik resmi: \"Lembah Harau Didorong Jadi Destinasi Panjat Tebing Dunia\". Pemerintah Provinsi Sumatera Barat bersama Dinas Pariwisata dan seluruh pemangku kepentingan terus mempercepat langkah strategis guna mengoptimalkan potensi wisata alam yang asri, keluhuran adat dan seni budaya Minangkabau, serta kuliner halal legendaris di berbagai kabupaten dan kota.\n\nInisiatif terpadu ini difokuskan pada peningkatan kualitas amenitas dan fasilitas umum di objek wisata, kemudahan konektivitas transportasi wisatawan, serta penguatan pelaku UMKM dan industri ekonomi kreatif lokal agar pariwisata Ranah Minang senantiasa berdaya saing tinggi dan berkelanjutan.",
    "descriptionEn": "Official news report: \"Lembah Harau Didorong Jadi Destinasi Panjat Tebing Dunia\". West Sumatra provincial authorities, the regional tourism board, and hospitality stakeholders are accelerating strategic measures to showcase authentic natural landscapes, Minangkabau cultural heritage, and legendary halal culinary traditions.\n\nThis concerted initiative focuses on upgrading tourist amenities, streamlining transport connectivity, and empowering local creative MSMEs, ensuring West Sumatra's tourism remains highly competitive, hospitable, and sustainable for both domestic and international travelers.",
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
    "createdAt": "2026-11-04T15:23:00.000Z",
    "generatedAt": "2026-11-05T00:44:41.141Z",
    "generatedBy": "Malala Autonomous RSS Engine (Google News Sumbar Feed)",
    "isAIGenerated": false
  },
  {
    "id": "hi-rss-sumbar-81141-3",
    "title": "Perjalanan Wisatawan Nusantara ke Sumbar Capai 1,76 Juta pada September 2026, Padang Terbanyak",
    "titleEn": "West Sumatra Tourism: Perjalanan Wisatawan Nusantara ke Sumbar Capai 1,76 Juta pada September 2026, Padang Terbanyak",
    "category": "Pariwisata Sumatera Barat",
    "categoryEn": "West Sumatra Tourism",
    "date": "4 November 2026",
    "dateEn": "November 4, 2026",
    "sourceName": "Sumbarkita.id",
    "sourceDomain": "sumbar.antaranews.com",
    "sourceUrl": "https://news.google.com/rss/articles/CBMiuAFBVV95cUxPV1BsUlhOT1duVzJ2aXRUbjFXTnU0dFR2RlRwZmRiS1hqempPWENpTldSaEtOdXZDZzdId3hZYzdKVU1JTFpBUWc2V1dfWllOejQ0NzFPc081MnhXcG9UbjhnV0diOWYyX0JmRVEzd015VUNVUjJjYy1XYkloZFZ6cXlxZmZUX0ZjRkE0cXJYdjNDNUo4MEQyNW9ROUxhRTFZbTk1YjNjeDJoNHVnUEhLREVTQm02Mmgw?oc=5",
    "sourceIcon": "https://www.google.com/s2/favicons?domain=antaranews.com&sz=64",
    "imageUrl": "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80",
    "tag": "Sumbar",
    "tagEn": "West Sumatra",
    "actionUrl": "https://news.google.com/rss/articles/CBMiuAFBVV95cUxPV1BsUlhOT1duVzJ2aXRUbjFXTnU0dFR2RlRwZmRiS1hqempPWENpTldSaEtOdXZDZzdId3hZYzdKVU1JTFpBUWc2V1dfWllOejQ0NzFPc081MnhXcG9UbjhnV0diOWYyX0JmRVEzd015VUNVUjJjYy1XYkloZFZ6cXlxZmZUX0ZjRkE0cXJYdjNDNUo4MEQyNW9ROUxhRTFZbTk1YjNjeDJoNHVnUEhLREVTQm02Mmgw?oc=5",
    "mapsUrl": "https://www.google.com/maps/search/?api=1&query=Kota+Padang",
    "locationName": "Kota Padang & Bandara Internasional Minangkabau",
    "locationNameEn": "Padang & Minangkabau International Airport",
    "description": "Laporan liputan jurnalistik resmi: \"Perjalanan Wisatawan Nusantara ke Sumbar Capai 1,76 Juta pada September 2026, Padang Terbanyak\". Pemerintah Provinsi Sumatera Barat bersama Dinas Pariwisata dan seluruh pemangku kepentingan terus mempercepat langkah strategis guna mengoptimalkan potensi wisata alam yang asri, keluhuran adat dan seni budaya Minangkabau, serta kuliner halal legendaris di berbagai kabupaten dan kota.\n\nInisiatif terpadu ini difokuskan pada peningkatan kualitas amenitas dan fasilitas umum di objek wisata, kemudahan konektivitas transportasi wisatawan, serta penguatan pelaku UMKM dan industri ekonomi kreatif lokal agar pariwisata Ranah Minang senantiasa berdaya saing tinggi dan berkelanjutan.",
    "descriptionEn": "Official news report: \"Perjalanan Wisatawan Nusantara ke Sumbar Capai 1,76 Juta pada September 2026, Padang Terbanyak\". West Sumatra provincial authorities, the regional tourism board, and hospitality stakeholders are accelerating strategic measures to showcase authentic natural landscapes, Minangkabau cultural heritage, and legendary halal culinary traditions.\n\nThis concerted initiative focuses on upgrading tourist amenities, streamlining transport connectivity, and empowering local creative MSMEs, ensuring West Sumatra's tourism remains highly competitive, hospitable, and sustainable for both domestic and international travelers.",
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
    "createdAt": "2026-11-04T14:19:30.000Z",
    "generatedAt": "2026-11-05T00:44:41.141Z",
    "generatedBy": "Malala Autonomous RSS Engine (Google News Sumbar Feed)",
    "isAIGenerated": false
  },
  {
    "id": "hi-rss-sumbar-81141-4",
    "title": "Buruan Daftar! 1.342 Lowongan Kerja Dibuka di Job Fair Online Sumbar 2026, 43 Perusahaan Ikut serta",
    "titleEn": "West Sumatra Tourism: Buruan Daftar! 1.342 Lowongan Kerja Dibuka di Job Fair Online Sumbar 2026, 43 Perusahaan Ikut serta",
    "category": "Pariwisata Sumatera Barat",
    "categoryEn": "West Sumatra Tourism",
    "date": "4 November 2026",
    "dateEn": "November 4, 2026",
    "sourceName": "Minangkabaunews.com",
    "sourceDomain": "sumbar.antaranews.com",
    "sourceUrl": "https://news.google.com/rss/articles/CBMizAFBVV95cUxNWGxNM2FhZkxMUHpXQmJhY3J1bWE2ZXNPMmp1Z3lNOS1zajc2eU95Ul9LVHZDdXJtc3JHM1ljMUdsMzY2Z05lQTNYMDNILUNVbTJScGJEWnlQeU50bk5GNTI1RF9YejNtaFV0T1U2T1lreFBNMmxOVmRYZ3l4UFJEZGhTZEFXalpUeVhkcEV6b0JndGgwYVJ5dXJzcmVyTnZYTVQwc19tYm4wY1dsblVOaVZRTTRYMDlrTFVrN1Q1aENGUnp2a2EzcVNVZzLSAcwBQVVfeXFMTVhsTTNhYWZMTFB6V0JiYWNydW1hNmVzTzJqdWd5TTktc2o3NnlPeVJfS1R2Q3VybXNyRzNZYzFHbDM2NmdOZUEzWDAzSC1DVW0yUnBiRFp5UHlOdG5ORjUyNURfWHozbWhVdE9VNk9Za3hQTTJsTlZkWGd5eFBSRGRoU2RBV2paVHlYZHBFem9CZ3RoMGFSeXVyc3Jlck52WE1UMHNfbWJuMGNXbG5VTmlWUU00WDA5a0xVazdUNWhDRlJ6dmthM3FTVWcy?oc=5",
    "sourceIcon": "https://www.google.com/s2/favicons?domain=antaranews.com&sz=64",
    "imageUrl": "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=800&q=80",
    "tag": "Sumbar",
    "tagEn": "West Sumatra",
    "actionUrl": "https://news.google.com/rss/articles/CBMizAFBVV95cUxNWGxNM2FhZkxMUHpXQmJhY3J1bWE2ZXNPMmp1Z3lNOS1zajc2eU95Ul9LVHZDdXJtc3JHM1ljMUdsMzY2Z05lQTNYMDNILUNVbTJScGJEWnlQeU50bk5GNTI1RF9YejNtaFV0T1U2T1lreFBNMmxOVmRYZ3l4UFJEZGhTZEFXalpUeVhkcEV6b0JndGgwYVJ5dXJzcmVyTnZYTVQwc19tYm4wY1dsblVOaVZRTTRYMDlrTFVrN1Q1aENGUnp2a2EzcVNVZzLSAcwBQVVfeXFMTVhsTTNhYWZMTFB6V0JiYWNydW1hNmVzTzJqdWd5TTktc2o3NnlPeVJfS1R2Q3VybXNyRzNZYzFHbDM2NmdOZUEzWDAzSC1DVW0yUnBiRFp5UHlOdG5ORjUyNURfWHozbWhVdE9VNk9Za3hQTTJsTlZkWGd5eFBSRGRoU2RBV2paVHlYZHBFem9CZ3RoMGFSeXVyc3Jlck52WE1UMHNfbWJuMGNXbG5VTmlWUU00WDA5a0xVazdUNWhDRlJ6dmthM3FTVWcy?oc=5",
    "mapsUrl": "https://www.google.com/maps/search/?api=1&query=Sumatera+Barat",
    "locationName": "Destinasi Wisata Unggulan Sumatera Barat",
    "locationNameEn": "West Sumatra Prime Tourism Destinations",
    "description": "Laporan liputan jurnalistik resmi: \"Buruan Daftar! 1.342 Lowongan Kerja Dibuka di Job Fair Online Sumbar 2026, 43 Perusahaan Ikut serta\". Pemerintah Provinsi Sumatera Barat bersama Dinas Pariwisata dan seluruh pemangku kepentingan terus mempercepat langkah strategis guna mengoptimalkan potensi wisata alam yang asri, keluhuran adat dan seni budaya Minangkabau, serta kuliner halal legendaris di berbagai kabupaten dan kota.\n\nInisiatif terpadu ini difokuskan pada peningkatan kualitas amenitas dan fasilitas umum di objek wisata, kemudahan konektivitas transportasi wisatawan, serta penguatan pelaku UMKM dan industri ekonomi kreatif lokal agar pariwisata Ranah Minang senantiasa berdaya saing tinggi dan berkelanjutan.",
    "descriptionEn": "Official news report: \"Buruan Daftar! 1.342 Lowongan Kerja Dibuka di Job Fair Online Sumbar 2026, 43 Perusahaan Ikut serta\". West Sumatra provincial authorities, the regional tourism board, and hospitality stakeholders are accelerating strategic measures to showcase authentic natural landscapes, Minangkabau cultural heritage, and legendary halal culinary traditions.\n\nThis concerted initiative focuses on upgrading tourist amenities, streamlining transport connectivity, and empowering local creative MSMEs, ensuring West Sumatra's tourism remains highly competitive, hospitable, and sustainable for both domestic and international travelers.",
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
    "createdAt": "2026-11-04T14:08:13.000Z",
    "generatedAt": "2026-11-05T00:44:41.141Z",
    "generatedBy": "Malala Autonomous RSS Engine (Google News Sumbar Feed)",
    "isAIGenerated": false
  },
  {
    "id": "hi-rss-nasional-37017-1",
    "title": "Andrea Bocelli tampil memukau dalam konser \"Romanza\" di Jakarta",
    "titleEn": "Indonesia Tourism Update: Andrea Bocelli tampil memukau dalam konser \"Romanza\" di Jakarta",
    "category": "Pariwisata Indonesia",
    "categoryEn": "Indonesian Tourism",
    "date": "3 November 2026",
    "dateEn": "November 3, 2026",
    "sourceName": "ANTARA News",
    "sourceDomain": "kemenparekraf.go.id",
    "sourceUrl": "https://news.google.com/rss/articles/CBMisAFBVV95cUxOTUJrMEFVaGRKM0VCdThMYzc0cV9FTU1nWDBsZ0pTXy0tNWszRVVVVVpCek9DblJKMEVvR1dZU2Q4REVXUkoxcDF6SUQwaFFOZGhVdmZQWnQyQzkyRWpDY2c0cjlhek11MTRmV3Vyd2xRaWpJVmcwanN2TmxmRVFWZk9QcVEtc181LXRpY1FpbkJyVks5eDVjRWVTOF80a2lKYzN1U1kyU2tHSFJLMVVKNNIBsAFBVV95cUxOTUJrMEFVaGRKM0VCdThMYzc0cV9FTU1nWDBsZ0pTXy0tNWszRVVVVVpCek9DblJKMEVvR1dZU2Q4REVXUkoxcDF6SUQwaFFOZGhVdmZQWnQyQzkyRWpDY2c0cjlhek11MTRmV3Vyd2xRaWpJVmcwanN2TmxmRVFWZk9QcVEtc181LXRpY1FpbkJyVks5eDVjRWVTOF80a2lKYzN1U1kyU2tHSFJLMVVKNA?oc=5",
    "sourceIcon": "https://www.google.com/s2/favicons?domain=kemenparekraf.go.id&sz=64",
    "imageUrl": "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=800&q=80",
    "tag": "Nasional",
    "tagEn": "National",
    "actionUrl": "https://news.google.com/rss/articles/CBMisAFBVV95cUxOTUJrMEFVaGRKM0VCdThMYzc0cV9FTU1nWDBsZ0pTXy0tNWszRVVVVVpCek9DblJKMEVvR1dZU2Q4REVXUkoxcDF6SUQwaFFOZGhVdmZQWnQyQzkyRWpDY2c0cjlhek11MTRmV3Vyd2xRaWpJVmcwanN2TmxmRVFWZk9QcVEtc181LXRpY1FpbkJyVks5eDVjRWVTOF80a2lKYzN1U1kyU2tHSFJLMVVKNNIBsAFBVV95cUxOTUJrMEFVaGRKM0VCdThMYzc0cV9FTU1nWDBsZ0pTXy0tNWszRVVVVVpCek9DblJKMEVvR1dZU2Q4REVXUkoxcDF6SUQwaFFOZGhVdmZQWnQyQzkyRWpDY2c0cjlhek11MTRmV3Vyd2xRaWpJVmcwanN2TmxmRVFWZk9QcVEtc181LXRpY1FpbkJyVks5eDVjRWVTOF80a2lKYzN1U1kyU2tHSFJLMVVKNA?oc=5",
    "mapsUrl": "https://www.google.com/maps/search/?api=1&query=Indonesia",
    "locationName": "Kawasan Wisata Nusantara Indonesia",
    "locationNameEn": "Indonesian Archipelago Tourism Destinations",
    "description": "Kementerian Pariwisata Republik Indonesia bersama para pemangku kepentingan sektor pariwisata nasional terus menggalakkan program strategis: \"Andrea Bocelli tampil memukau dalam konser \"Romanza\" di Jakarta\". Kebijakan ini merupakan bagian integral dari peta jalan pariwisata berkualitas dan berkelanjutan di seluruh nusantara.\n\nMelalui penguatan kolaborasi lintas-sektor, akselerasi digitalisasi ekosistem wisata, serta diversifikasi paket perjalanan tematik, sektor pariwisata Indonesia dipacu untuk meningkatkan pergerakan wisatawan nusantara dan kunjungan wisatawan mancanegara secara inklusif.",
    "descriptionEn": "The Ministry of Tourism of the Republic of Indonesia and national travel stakeholders continue implementing strategic programs: \"Andrea Bocelli tampil memukau dalam konser \"Romanza\" di Jakarta\". This initiative supports the national roadmap toward high-yield, sustainable tourism development across the Indonesian archipelago.\n\nBy fostering cross-sector partnerships, advancing digital tourism ecosystems, and curating thematic travel itineraries, Indonesia's tourism industry is well-positioned to drive robust tourist footfall and inclusive economic growth.",
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
    "createdAt": "2026-11-03T22:33:06.000Z",
    "generatedAt": "2026-11-04T00:23:57.017Z",
    "generatedBy": "Malala Autonomous RSS Engine (Google News National Parekraf Feed)",
    "isAIGenerated": false
  }
];

export const DOWNLOAD_ITEMS: DownloadItem[] = [];

