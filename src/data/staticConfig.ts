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
    "id": "hi-rss-nasional-84606-1",
    "title": "Kemenpar Sukses Gelar Mega FAM Trip WITF 2026 Ajak Mitra Global Rasakan Indonesia yang Autentik",
    "titleEn": "Indonesia Tourism Update: Kemenpar Sukses Gelar Mega FAM Trip WITF 2026 Ajak Mitra Global Rasakan Indonesia yang Autentik",
    "category": "Pariwisata Indonesia",
    "categoryEn": "Indonesian Tourism",
    "date": "7 November 2026",
    "dateEn": "November 7, 2026",
    "sourceName": "Kementerian Pariwisata",
    "sourceDomain": "kemenparekraf.go.id",
    "sourceUrl": "https://news.google.com/rss/articles/CBMi2AFBVV95cUxQTC12MkZnSzFValRpbEZWTE54eTlhblFEcFNoRmYzeGZQalF4RFRlZW1IVVNKOWhBNldMZ091SDdleGF2NDVFTWNZcng0Z0F0dTdrNkU4VGI4VGFBU1dnbU9xeUpPcFh1YlRRczFGSGJkYWw5UEQ4WVJULV9kb3pST25jYnpoSGVKNE5JWjJJcHBrdFpFbU5LN3BuTTJ1YXBoaWFZRWE3cEJVWXdsX1llTTRNYTVrNW1ST2V0elhQVkVOTEJjQ1FvWlpwR01odzZpcU1BZFFKVl8?oc=5",
    "sourceIcon": "https://www.google.com/s2/favicons?domain=kemenparekraf.go.id&sz=64",
    "imageUrl": "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=800&q=80",
    "tag": "Nasional",
    "tagEn": "National",
    "actionUrl": "https://news.google.com/rss/articles/CBMi2AFBVV95cUxQTC12MkZnSzFValRpbEZWTE54eTlhblFEcFNoRmYzeGZQalF4RFRlZW1IVVNKOWhBNldMZ091SDdleGF2NDVFTWNZcng0Z0F0dTdrNkU4VGI4VGFBU1dnbU9xeUpPcFh1YlRRczFGSGJkYWw5UEQ4WVJULV9kb3pST25jYnpoSGVKNE5JWjJJcHBrdFpFbU5LN3BuTTJ1YXBoaWFZRWE3cEJVWXdsX1llTTRNYTVrNW1ST2V0elhQVkVOTEJjQ1FvWlpwR01odzZpcU1BZFFKVl8?oc=5",
    "mapsUrl": "https://www.google.com/maps/search/?api=1&query=Indonesia",
    "locationName": "Kawasan Wisata Nusantara Indonesia",
    "locationNameEn": "Indonesian Archipelago Tourism Destinations",
    "description": "Kementerian Pariwisata Republik Indonesia bersama para pemangku kepentingan sektor pariwisata nasional terus menggalakkan program strategis: \"Kemenpar Sukses Gelar Mega FAM Trip WITF 2026 Ajak Mitra Global Rasakan Indonesia yang Autentik\". Kebijakan ini merupakan bagian integral dari peta jalan pariwisata berkualitas dan berkelanjutan di seluruh nusantara.\n\nMelalui penguatan kolaborasi lintas-sektor, akselerasi digitalisasi ekosistem wisata, serta diversifikasi paket perjalanan tematik, sektor pariwisata Indonesia dipacu untuk meningkatkan pergerakan wisatawan nusantara dan kunjungan wisatawan mancanegara secara inklusif.",
    "descriptionEn": "The Ministry of Tourism of the Republic of Indonesia and national travel stakeholders continue implementing strategic programs: \"Kemenpar Sukses Gelar Mega FAM Trip WITF 2026 Ajak Mitra Global Rasakan Indonesia yang Autentik\". This initiative supports the national roadmap toward high-yield, sustainable tourism development across the Indonesian archipelago.\n\nBy fostering cross-sector partnerships, advancing digital tourism ecosystems, and curating thematic travel itineraries, Indonesia's tourism industry is well-positioned to drive robust tourist footfall and inclusive economic growth.",
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
    "createdAt": "2026-11-06T23:21:21.000Z",
    "generatedAt": "2026-11-07T00:48:04.606Z",
    "generatedBy": "Malala Autonomous RSS Engine (Google News National Parekraf Feed)",
    "isAIGenerated": false
  },
  {
    "id": "hi-rss-nasional-84606-3",
    "title": "Paviliun Wonderful Indonesia Raih Desain Terbaik Asia di WTM London 2026",
    "titleEn": "Indonesia Tourism Update: Paviliun Wonderful Indonesia Raih Desain Terbaik Asia di WTM London 2026",
    "category": "Pariwisata Indonesia",
    "categoryEn": "Indonesian Tourism",
    "date": "7 November 2026",
    "dateEn": "November 7, 2026",
    "sourceName": "Headline.co.id",
    "sourceDomain": "kemenparekraf.go.id",
    "sourceUrl": "https://news.google.com/rss/articles/CBMiqwFBVV95cUxNa0p3NWZWeUZJQjZrUGh4eGJCQkVjTC1NUFJGWEpUblJma0otLUdQMGVxcDVZellqY2hQcFVvMVJ1LVdMMnJHWDZwRUJHOUNFTEFvQWt2NXpFV1ZCSWlkSlJrLTVnT0xWSHRJNmN4TjBFQ1lIR3Z0MFhOSlV3akdOWUZickd5WVBvQndUck9UckgwQVJjV2V5WGktVnpkUkZ0SVdRcE93QWVfN0k?oc=5",
    "sourceIcon": "https://www.google.com/s2/favicons?domain=kemenparekraf.go.id&sz=64",
    "imageUrl": "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=800&q=80",
    "tag": "Nasional",
    "tagEn": "National",
    "actionUrl": "https://news.google.com/rss/articles/CBMiqwFBVV95cUxNa0p3NWZWeUZJQjZrUGh4eGJCQkVjTC1NUFJGWEpUblJma0otLUdQMGVxcDVZellqY2hQcFVvMVJ1LVdMMnJHWDZwRUJHOUNFTEFvQWt2NXpFV1ZCSWlkSlJrLTVnT0xWSHRJNmN4TjBFQ1lIR3Z0MFhOSlV3akdOWUZickd5WVBvQndUck9UckgwQVJjV2V5WGktVnpkUkZ0SVdRcE93QWVfN0k?oc=5",
    "mapsUrl": "https://www.google.com/maps/search/?api=1&query=Indonesia",
    "locationName": "Kawasan Wisata Nusantara Indonesia",
    "locationNameEn": "Indonesian Archipelago Tourism Destinations",
    "description": "Kementerian Pariwisata Republik Indonesia bersama para pemangku kepentingan sektor pariwisata nasional terus menggalakkan program strategis: \"Paviliun Wonderful Indonesia Raih Desain Terbaik Asia di WTM London 2026\". Kebijakan ini merupakan bagian integral dari peta jalan pariwisata berkualitas dan berkelanjutan di seluruh nusantara.\n\nMelalui penguatan kolaborasi lintas-sektor, akselerasi digitalisasi ekosistem wisata, serta diversifikasi paket perjalanan tematik, sektor pariwisata Indonesia dipacu untuk meningkatkan pergerakan wisatawan nusantara dan kunjungan wisatawan mancanegara secara inklusif.",
    "descriptionEn": "The Ministry of Tourism of the Republic of Indonesia and national travel stakeholders continue implementing strategic programs: \"Paviliun Wonderful Indonesia Raih Desain Terbaik Asia di WTM London 2026\". This initiative supports the national roadmap toward high-yield, sustainable tourism development across the Indonesian archipelago.\n\nBy fostering cross-sector partnerships, advancing digital tourism ecosystems, and curating thematic travel itineraries, Indonesia's tourism industry is well-positioned to drive robust tourist footfall and inclusive economic growth.",
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
    "createdAt": "2026-11-06T18:53:50.000Z",
    "generatedAt": "2026-11-07T00:48:04.606Z",
    "generatedBy": "Malala Autonomous RSS Engine (Google News National Parekraf Feed)",
    "isAIGenerated": false
  },
  {
    "id": "hi-rss-sumbar-84603-1",
    "title": "KEK Mandeh siap bangkitkan ekonomi dan pariwisata Sumbar",
    "titleEn": "West Sumatra Tourism: KEK Mandeh siap bangkitkan ekonomi dan pariwisata Sumbar",
    "category": "Pariwisata Sumatera Barat",
    "categoryEn": "West Sumatra Tourism",
    "date": "6 November 2026",
    "dateEn": "November 6, 2026",
    "sourceName": "ANTARA News",
    "sourceDomain": "sumbar.antaranews.com",
    "sourceUrl": "https://news.google.com/rss/articles/CBMingFBVV95cUxOdkVoMjYtNktZcm8yMEpVejZPMzF0Tm1NWGNMTkVZbm9hS0hnZzJDSWV4OV8wWktyeWlBcGRpWXdRV3VnNFRYLUVvcFhhOE9aOW1rN2xuYUw4ZWt1U2h3eXBCTEUyWTRCU09maHl2cE5ON2pXcTBaZHFOWGdmUXBiaFk3SExsMmU0R1lENWRjdEJHYy0tUTdsUUlhRG9ZZw?oc=5",
    "sourceIcon": "https://www.google.com/s2/favicons?domain=antaranews.com&sz=64",
    "imageUrl": "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=800&q=80",
    "tag": "Sumbar",
    "tagEn": "West Sumatra",
    "actionUrl": "https://news.google.com/rss/articles/CBMingFBVV95cUxOdkVoMjYtNktZcm8yMEpVejZPMzF0Tm1NWGNMTkVZbm9hS0hnZzJDSWV4OV8wWktyeWlBcGRpWXdRV3VnNFRYLUVvcFhhOE9aOW1rN2xuYUw4ZWt1U2h3eXBCTEUyWTRCU09maHl2cE5ON2pXcTBaZHFOWGdmUXBiaFk3SExsMmU0R1lENWRjdEJHYy0tUTdsUUlhRG9ZZw?oc=5",
    "mapsUrl": "https://www.google.com/maps/search/?api=1&query=Kawasan+Wisata+Mandeh",
    "locationName": "Kawasan Wisata Bahari Mandeh, Pesisir Selatan",
    "locationNameEn": "Mandeh Marine Tourism, Pesisir Selatan",
    "description": "Laporan liputan jurnalistik resmi: \"KEK Mandeh siap bangkitkan ekonomi dan pariwisata Sumbar\". Pemerintah Provinsi Sumatera Barat bersama Dinas Pariwisata dan seluruh pemangku kepentingan terus mempercepat langkah strategis guna mengoptimalkan potensi wisata alam yang asri, keluhuran adat dan seni budaya Minangkabau, serta kuliner halal legendaris di berbagai kabupaten dan kota.\n\nInisiatif terpadu ini difokuskan pada peningkatan kualitas amenitas dan fasilitas umum di objek wisata, kemudahan konektivitas transportasi wisatawan, serta penguatan pelaku UMKM dan industri ekonomi kreatif lokal agar pariwisata Ranah Minang senantiasa berdaya saing tinggi dan berkelanjutan.",
    "descriptionEn": "Official news report: \"KEK Mandeh siap bangkitkan ekonomi dan pariwisata Sumbar\". West Sumatra provincial authorities, the regional tourism board, and hospitality stakeholders are accelerating strategic measures to showcase authentic natural landscapes, Minangkabau cultural heritage, and legendary halal culinary traditions.\n\nThis concerted initiative focuses on upgrading tourist amenities, streamlining transport connectivity, and empowering local creative MSMEs, ensuring West Sumatra's tourism remains highly competitive, hospitable, and sustainable for both domestic and international travelers.",
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
    "createdAt": "2026-11-06T15:27:15.000Z",
    "generatedAt": "2026-11-07T00:48:04.604Z",
    "generatedBy": "Malala Autonomous RSS Engine (Google News Sumbar Feed)",
    "isAIGenerated": false
  },
  {
    "id": "hi-rss-sumbar-84604-2",
    "title": "ANTARA News Sumatera Barat - Berita Terkini Padang, Sumatera Barat",
    "titleEn": "West Sumatra Tourism: ANTARA News Sumatera Barat - Berita Terkini Padang, Sumatera Barat",
    "category": "Pariwisata Sumatera Barat",
    "categoryEn": "West Sumatra Tourism",
    "date": "6 November 2026",
    "dateEn": "November 6, 2026",
    "sourceName": "ANTARA News Sumbar",
    "sourceDomain": "sumbar.antaranews.com",
    "sourceUrl": "https://news.google.com/rss/articles/CBMiogFBVV95cUxQSnpia20yMUFfREZoRG9fLUhpQ2FtTG0wOXNJZ0lTRndEc0k0ZWRGaV9tN1VvcFRLc1VrelVhWUxMdnRVakg4c1RIeHRFRnRIWkJUR1JxXy1ub2dOWURjbGJBSk1mX09UVWFLdmJiR2U0ODlGOXo2SnV1MkNrOHJfcVRrV3VsMlR1QXZFSTF0dHBGNmNtQjdLeVJzN1NTaVZCcEE?oc=5",
    "sourceIcon": "https://www.google.com/s2/favicons?domain=antaranews.com&sz=64",
    "imageUrl": "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80",
    "tag": "Sumbar",
    "tagEn": "West Sumatra",
    "actionUrl": "https://news.google.com/rss/articles/CBMiogFBVV95cUxQSnpia20yMUFfREZoRG9fLUhpQ2FtTG0wOXNJZ0lTRndEc0k0ZWRGaV9tN1VvcFRLc1VrelVhWUxMdnRVakg4c1RIeHRFRnRIWkJUR1JxXy1ub2dOWURjbGJBSk1mX09UVWFLdmJiR2U0ODlGOXo2SnV1MkNrOHJfcVRrV3VsMlR1QXZFSTF0dHBGNmNtQjdLeVJzN1NTaVZCcEE?oc=5",
    "mapsUrl": "https://www.google.com/maps/search/?api=1&query=Kota+Padang",
    "locationName": "Kota Padang & Bandara Internasional Minangkabau",
    "locationNameEn": "Padang & Minangkabau International Airport",
    "description": "Laporan liputan jurnalistik resmi: \"ANTARA News Sumatera Barat - Berita Terkini Padang, Sumatera Barat\". Pemerintah Provinsi Sumatera Barat bersama Dinas Pariwisata dan seluruh pemangku kepentingan terus mempercepat langkah strategis guna mengoptimalkan potensi wisata alam yang asri, keluhuran adat dan seni budaya Minangkabau, serta kuliner halal legendaris di berbagai kabupaten dan kota.\n\nInisiatif terpadu ini difokuskan pada peningkatan kualitas amenitas dan fasilitas umum di objek wisata, kemudahan konektivitas transportasi wisatawan, serta penguatan pelaku UMKM dan industri ekonomi kreatif lokal agar pariwisata Ranah Minang senantiasa berdaya saing tinggi dan berkelanjutan.",
    "descriptionEn": "Official news report: \"ANTARA News Sumatera Barat - Berita Terkini Padang, Sumatera Barat\". West Sumatra provincial authorities, the regional tourism board, and hospitality stakeholders are accelerating strategic measures to showcase authentic natural landscapes, Minangkabau cultural heritage, and legendary halal culinary traditions.\n\nThis concerted initiative focuses on upgrading tourist amenities, streamlining transport connectivity, and empowering local creative MSMEs, ensuring West Sumatra's tourism remains highly competitive, hospitable, and sustainable for both domestic and international travelers.",
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
    "createdAt": "2026-11-06T15:27:00.000Z",
    "generatedAt": "2026-11-07T00:48:04.604Z",
    "generatedBy": "Malala Autonomous RSS Engine (Google News Sumbar Feed)",
    "isAIGenerated": false
  },
  {
    "id": "hi-rss-sumbar-84604-3",
    "title": "Masjid Raya Sumatera Barat di Padang, Wisata Religi Beratap Gonjong Bernama Syekh Ahmad Khatib",
    "titleEn": "West Sumatra Tourism: Masjid Raya Sumatera Barat di Padang, Wisata Religi Beratap Gonjong Bernama Syekh Ahmad Khatib",
    "category": "Pariwisata Sumatera Barat",
    "categoryEn": "West Sumatra Tourism",
    "date": "6 November 2026",
    "dateEn": "November 6, 2026",
    "sourceName": "Elharamain News",
    "sourceDomain": "sumbar.antaranews.com",
    "sourceUrl": "https://news.google.com/rss/articles/CBMixwFBVV95cUxQRnpIa1Z0TDYyOXYyVUllbUM2RHIzZ0FyQTlZNVpsc2NTV2tHZGlUcTZvZ3ozNzlzXy1KQkc3clQzQkRFemRzUVF3MGlQSnJLNllKRWhGSGM0QUJLSXpKZWY3d2REbzdHb1dCYm1vVXJ1Nkt3UGpBcGpZN1Jfckd0VWNxX0xUUGtXOWpTTDJUanNodWdZZEVaYTF3cUVmcWQ2ck11RzVmRGFjQ2xoVlpPX3ptbE10NGpYNDZZWUw4NkZiV0JIX1RB?oc=5",
    "sourceIcon": "https://www.google.com/s2/favicons?domain=antaranews.com&sz=64",
    "imageUrl": "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80",
    "tag": "Sumbar",
    "tagEn": "West Sumatra",
    "actionUrl": "https://news.google.com/rss/articles/CBMixwFBVV95cUxQRnpIa1Z0TDYyOXYyVUllbUM2RHIzZ0FyQTlZNVpsc2NTV2tHZGlUcTZvZ3ozNzlzXy1KQkc3clQzQkRFemRzUVF3MGlQSnJLNllKRWhGSGM0QUJLSXpKZWY3d2REbzdHb1dCYm1vVXJ1Nkt3UGpBcGpZN1Jfckd0VWNxX0xUUGtXOWpTTDJUanNodWdZZEVaYTF3cUVmcWQ2ck11RzVmRGFjQ2xoVlpPX3ptbE10NGpYNDZZWUw4NkZiV0JIX1RB?oc=5",
    "mapsUrl": "https://www.google.com/maps/search/?api=1&query=Kota+Padang",
    "locationName": "Kota Padang & Bandara Internasional Minangkabau",
    "locationNameEn": "Padang & Minangkabau International Airport",
    "description": "Laporan liputan jurnalistik resmi: \"Masjid Raya Sumatera Barat di Padang, Wisata Religi Beratap Gonjong Bernama Syekh Ahmad Khatib\". Pemerintah Provinsi Sumatera Barat bersama Dinas Pariwisata dan seluruh pemangku kepentingan terus mempercepat langkah strategis guna mengoptimalkan potensi wisata alam yang asri, keluhuran adat dan seni budaya Minangkabau, serta kuliner halal legendaris di berbagai kabupaten dan kota.\n\nInisiatif terpadu ini difokuskan pada peningkatan kualitas amenitas dan fasilitas umum di objek wisata, kemudahan konektivitas transportasi wisatawan, serta penguatan pelaku UMKM dan industri ekonomi kreatif lokal agar pariwisata Ranah Minang senantiasa berdaya saing tinggi dan berkelanjutan.",
    "descriptionEn": "Official news report: \"Masjid Raya Sumatera Barat di Padang, Wisata Religi Beratap Gonjong Bernama Syekh Ahmad Khatib\". West Sumatra provincial authorities, the regional tourism board, and hospitality stakeholders are accelerating strategic measures to showcase authentic natural landscapes, Minangkabau cultural heritage, and legendary halal culinary traditions.\n\nThis concerted initiative focuses on upgrading tourist amenities, streamlining transport connectivity, and empowering local creative MSMEs, ensuring West Sumatra's tourism remains highly competitive, hospitable, and sustainable for both domestic and international travelers.",
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
    "createdAt": "2026-11-06T14:40:00.000Z",
    "generatedAt": "2026-11-07T00:48:04.604Z",
    "generatedBy": "Malala Autonomous RSS Engine (Google News Sumbar Feed)",
    "isAIGenerated": false
  },
  {
    "id": "hi-rss-sumbar-84604-4",
    "title": "Bawa Nama Sumbar dalam Ajang Duta Desa dan Kampung Wisata, Tiga Murid ABI Center Temui Gubernur",
    "titleEn": "West Sumatra Tourism: Bawa Nama Sumbar dalam Ajang Duta Desa dan Kampung Wisata, Tiga Murid ABI Center Temui Gubernur",
    "category": "Pariwisata Sumatera Barat",
    "categoryEn": "West Sumatra Tourism",
    "date": "6 November 2026",
    "dateEn": "November 6, 2026",
    "sourceName": "Harian Singgalang",
    "sourceDomain": "sumbar.antaranews.com",
    "sourceUrl": "https://news.google.com/rss/articles/CBMi2wFBVV95cUxOOGtUUFIwLUxRUlRlR1BjaVgyUDhBaGQ5WkxIMFg2V1hJQmlJU0pNQ2lfMXNpSjVnc1BpX05maDZxakJTeWdQdFRiYlBqNnQzcFRLY3c4RHdwWGpkZXQ5dkR1ZjdWUFFLTVoxWGpVLTNDenhzS2EyNEdQR0hHdzB1NWxCRzNEVXdIY1BEUmZBTFlxM2JJUDVlRWJjaHJvdnpfRGptaXJGWHBLQ2ItUzAzc0cweDNrOHdRMllLamplZ3Rycl96VlN1eURKd3RTQWQtQkV4WmJoc2RhUFU?oc=5",
    "sourceIcon": "https://www.google.com/s2/favicons?domain=antaranews.com&sz=64",
    "imageUrl": "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=800&q=80",
    "tag": "Sumbar",
    "tagEn": "West Sumatra",
    "actionUrl": "https://news.google.com/rss/articles/CBMi2wFBVV95cUxOOGtUUFIwLUxRUlRlR1BjaVgyUDhBaGQ5WkxIMFg2V1hJQmlJU0pNQ2lfMXNpSjVnc1BpX05maDZxakJTeWdQdFRiYlBqNnQzcFRLY3c4RHdwWGpkZXQ5dkR1ZjdWUFFLTVoxWGpVLTNDenhzS2EyNEdQR0hHdzB1NWxCRzNEVXdIY1BEUmZBTFlxM2JJUDVlRWJjaHJvdnpfRGptaXJGWHBLQ2ItUzAzc0cweDNrOHdRMllLamplZ3Rycl96VlN1eURKd3RTQWQtQkV4WmJoc2RhUFU?oc=5",
    "mapsUrl": "https://www.google.com/maps/search/?api=1&query=Sumatera+Barat",
    "locationName": "Destinasi Wisata Unggulan Sumatera Barat",
    "locationNameEn": "West Sumatra Prime Tourism Destinations",
    "description": "Laporan liputan jurnalistik resmi: \"Bawa Nama Sumbar dalam Ajang Duta Desa dan Kampung Wisata, Tiga Murid ABI Center Temui Gubernur\". Pemerintah Provinsi Sumatera Barat bersama Dinas Pariwisata dan seluruh pemangku kepentingan terus mempercepat langkah strategis guna mengoptimalkan potensi wisata alam yang asri, keluhuran adat dan seni budaya Minangkabau, serta kuliner halal legendaris di berbagai kabupaten dan kota.\n\nInisiatif terpadu ini difokuskan pada peningkatan kualitas amenitas dan fasilitas umum di objek wisata, kemudahan konektivitas transportasi wisatawan, serta penguatan pelaku UMKM dan industri ekonomi kreatif lokal agar pariwisata Ranah Minang senantiasa berdaya saing tinggi dan berkelanjutan.",
    "descriptionEn": "Official news report: \"Bawa Nama Sumbar dalam Ajang Duta Desa dan Kampung Wisata, Tiga Murid ABI Center Temui Gubernur\". West Sumatra provincial authorities, the regional tourism board, and hospitality stakeholders are accelerating strategic measures to showcase authentic natural landscapes, Minangkabau cultural heritage, and legendary halal culinary traditions.\n\nThis concerted initiative focuses on upgrading tourist amenities, streamlining transport connectivity, and empowering local creative MSMEs, ensuring West Sumatra's tourism remains highly competitive, hospitable, and sustainable for both domestic and international travelers.",
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
    "createdAt": "2026-11-06T13:06:00.000Z",
    "generatedAt": "2026-11-07T00:48:04.604Z",
    "generatedBy": "Malala Autonomous RSS Engine (Google News Sumbar Feed)",
    "isAIGenerated": false
  },
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
  }
];

export const DOWNLOAD_ITEMS: DownloadItem[] = [];

