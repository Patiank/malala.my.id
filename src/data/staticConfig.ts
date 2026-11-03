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
    "id": "hi-rss-sumbar-40758-1",
    "title": "Mulai Desember 2026, Pariaman Ekspres Berhenti di Kampung Jua",
    "titleEn": "West Sumatra Tourism: Mulai Desember 2026, Pariaman Ekspres Berhenti di Kampung Jua",
    "category": "Pariwisata Sumatera Barat",
    "categoryEn": "West Sumatra Tourism",
    "date": "3 November 2026",
    "dateEn": "November 3, 2026",
    "sourceName": "RRI.co.id",
    "sourceDomain": "sumbar.antaranews.com",
    "sourceUrl": "https://news.google.com/rss/articles/CBMiogFBVV95cUxNckRXZy1PbkRDNWRnRGNVVDM5S2R5Q2E4QUE3YjVTNExJbFlhOWI0YXRLaVhVN3c0Yk1xa2IyVHVCNldmOExlbmwxVDZWb1JYLXpRaEVIQVBfVHdLMmxIcndLdzZJN1NTTjY0a01NcnoyVHN3emFwOVJkRnFBRGZ1Qmo1SlFDZTEtRnBMd0NHMXRrMUJVRkRISEVQVDl4N1R1Tnc?oc=5",
    "sourceIcon": "https://www.google.com/s2/favicons?domain=antaranews.com&sz=64",
    "imageUrl": "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=800&q=80",
    "tag": "Sumbar",
    "tagEn": "West Sumatra",
    "actionUrl": "https://news.google.com/rss/articles/CBMiogFBVV95cUxNckRXZy1PbkRDNWRnRGNVVDM5S2R5Q2E4QUE3YjVTNExJbFlhOWI0YXRLaVhVN3c0Yk1xa2IyVHVCNldmOExlbmwxVDZWb1JYLXpRaEVIQVBfVHdLMmxIcndLdzZJN1NTTjY0a01NcnoyVHN3emFwOVJkRnFBRGZ1Qmo1SlFDZTEtRnBMd0NHMXRrMUJVRkRISEVQVDl4N1R1Tnc?oc=5",
    "mapsUrl": "https://www.google.com/maps/search/?api=1&query=Pantai+Gandoriah+Pariaman",
    "locationName": "Kawasan Wisata Pesisir Pariaman",
    "locationNameEn": "Pariaman Coastal Tourism Area",
    "description": "Laporan liputan jurnalistik resmi: \"Mulai Desember 2026, Pariaman Ekspres Berhenti di Kampung Jua\". Pemerintah Provinsi Sumatera Barat bersama Dinas Pariwisata dan seluruh pemangku kepentingan terus mempercepat langkah strategis guna mengoptimalkan potensi wisata alam yang asri, keluhuran adat dan seni budaya Minangkabau, serta kuliner halal legendaris di berbagai kabupaten dan kota.\n\nInisiatif terpadu ini difokuskan pada peningkatan kualitas amenitas dan fasilitas umum di objek wisata, kemudahan konektivitas transportasi wisatawan, serta penguatan pelaku UMKM dan industri ekonomi kreatif lokal agar pariwisata Ranah Minang senantiasa berdaya saing tinggi dan berkelanjutan.",
    "descriptionEn": "Official news report: \"Mulai Desember 2026, Pariaman Ekspres Berhenti di Kampung Jua\". West Sumatra provincial authorities, the regional tourism board, and hospitality stakeholders are accelerating strategic measures to showcase authentic natural landscapes, Minangkabau cultural heritage, and legendary halal culinary traditions.\n\nThis concerted initiative focuses on upgrading tourist amenities, streamlining transport connectivity, and empowering local creative MSMEs, ensuring West Sumatra's tourism remains highly competitive, hospitable, and sustainable for both domestic and international travelers.",
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
    "createdAt": "2026-11-03T01:17:13.000Z",
    "generatedAt": "2026-11-03T02:00:40.758Z",
    "generatedBy": "Malala Autonomous RSS Engine (Google News Sumbar Feed)",
    "isAIGenerated": false
  },
  {
    "id": "hi-rss-nasional-40758-1",
    "title": "Eksplorasi Destinasi Lokal lewat Konten",
    "titleEn": "Indonesia Tourism Update: Eksplorasi Destinasi Lokal lewat Konten",
    "category": "Pariwisata Indonesia",
    "categoryEn": "Indonesian Tourism",
    "date": "3 November 2026",
    "dateEn": "November 3, 2026",
    "sourceName": "RRI.co.id",
    "sourceDomain": "kemenparekraf.go.id",
    "sourceUrl": "https://news.google.com/rss/articles/CBMiigFBVV95cUxNdml4TjRuVllkb2Q0b1V4eWlpa0c0N2xLcVlBYW1oWnFZRG1iVUtIZHcwV3lwWDB6ODljOFl4QjZ0UndSSmhPOHRzWVRyRENzQmFSUVo2WC1QTjVWeGR2a2VWbTllaVZFMThMS1VQV2d1ZE1pR09TYzB5U1ZFSVMzbzZOcURlOXo0OWc?oc=5",
    "sourceIcon": "https://www.google.com/s2/favicons?domain=kemenparekraf.go.id&sz=64",
    "imageUrl": "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=800&q=80",
    "tag": "Nasional",
    "tagEn": "National",
    "actionUrl": "https://news.google.com/rss/articles/CBMiigFBVV95cUxNdml4TjRuVllkb2Q0b1V4eWlpa0c0N2xLcVlBYW1oWnFZRG1iVUtIZHcwV3lwWDB6ODljOFl4QjZ0UndSSmhPOHRzWVRyRENzQmFSUVo2WC1QTjVWeGR2a2VWbTllaVZFMThMS1VQV2d1ZE1pR09TYzB5U1ZFSVMzbzZOcURlOXo0OWc?oc=5",
    "mapsUrl": "https://www.google.com/maps/search/?api=1&query=Indonesia",
    "locationName": "Kawasan Wisata Nusantara Indonesia",
    "locationNameEn": "Indonesian Archipelago Tourism Destinations",
    "description": "Kementerian Pariwisata Republik Indonesia bersama para pemangku kepentingan sektor pariwisata nasional terus menggalakkan program strategis: \"Eksplorasi Destinasi Lokal lewat Konten\". Kebijakan ini merupakan bagian integral dari peta jalan pariwisata berkualitas dan berkelanjutan di seluruh nusantara.\n\nMelalui penguatan kolaborasi lintas-sektor, akselerasi digitalisasi ekosistem wisata, serta diversifikasi paket perjalanan tematik, sektor pariwisata Indonesia dipacu untuk meningkatkan pergerakan wisatawan nusantara dan kunjungan wisatawan mancanegara secara inklusif.",
    "descriptionEn": "The Ministry of Tourism of the Republic of Indonesia and national travel stakeholders continue implementing strategic programs: \"Eksplorasi Destinasi Lokal lewat Konten\". This initiative supports the national roadmap toward high-yield, sustainable tourism development across the Indonesian archipelago.\n\nBy fostering cross-sector partnerships, advancing digital tourism ecosystems, and curating thematic travel itineraries, Indonesia's tourism industry is well-positioned to drive robust tourist footfall and inclusive economic growth.",
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
    "createdAt": "2026-11-03T00:37:00.000Z",
    "generatedAt": "2026-11-03T02:00:40.758Z",
    "generatedBy": "Malala Autonomous RSS Engine (Google News National Parekraf Feed)",
    "isAIGenerated": false
  },
  {
    "id": "hi-rss-nasional-40758-2",
    "title": "Open Trip sebagai Awal Promosi Wisata",
    "titleEn": "Indonesia Tourism Update: Open Trip sebagai Awal Promosi Wisata",
    "category": "Pariwisata Indonesia",
    "categoryEn": "Indonesian Tourism",
    "date": "3 November 2026",
    "dateEn": "November 3, 2026",
    "sourceName": "RRI.co.id",
    "sourceDomain": "kemenparekraf.go.id",
    "sourceUrl": "https://news.google.com/rss/articles/CBMihwFBVV95cUxNeDM5VU5wamdSVzRpUzJpTzJMdVZ6a1AzRndWLWE3VDFpWnVuU1lXYkZ3SlV3eHpzN001NnZEQTE4OHRKT3J0MmlMdjlYWEFYanBINDlkU2JYT1RMVWtzYkRUbmt5cF9Ic0poUEVVRXIzUmRnOWdYbXR0Zl9VOVFXMUdpRE5OdUU?oc=5",
    "sourceIcon": "https://www.google.com/s2/favicons?domain=kemenparekraf.go.id&sz=64",
    "imageUrl": "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=800&q=80",
    "tag": "Nasional",
    "tagEn": "National",
    "actionUrl": "https://news.google.com/rss/articles/CBMihwFBVV95cUxNeDM5VU5wamdSVzRpUzJpTzJMdVZ6a1AzRndWLWE3VDFpWnVuU1lXYkZ3SlV3eHpzN001NnZEQTE4OHRKT3J0MmlMdjlYWEFYanBINDlkU2JYT1RMVWtzYkRUbmt5cF9Ic0poUEVVRXIzUmRnOWdYbXR0Zl9VOVFXMUdpRE5OdUU?oc=5",
    "mapsUrl": "https://www.google.com/maps/search/?api=1&query=Indonesia",
    "locationName": "Kawasan Wisata Nusantara Indonesia",
    "locationNameEn": "Indonesian Archipelago Tourism Destinations",
    "description": "Kementerian Pariwisata Republik Indonesia bersama para pemangku kepentingan sektor pariwisata nasional terus menggalakkan program strategis: \"Open Trip sebagai Awal Promosi Wisata\". Kebijakan ini merupakan bagian integral dari peta jalan pariwisata berkualitas dan berkelanjutan di seluruh nusantara.\n\nMelalui penguatan kolaborasi lintas-sektor, akselerasi digitalisasi ekosistem wisata, serta diversifikasi paket perjalanan tematik, sektor pariwisata Indonesia dipacu untuk meningkatkan pergerakan wisatawan nusantara dan kunjungan wisatawan mancanegara secara inklusif.",
    "descriptionEn": "The Ministry of Tourism of the Republic of Indonesia and national travel stakeholders continue implementing strategic programs: \"Open Trip sebagai Awal Promosi Wisata\". This initiative supports the national roadmap toward high-yield, sustainable tourism development across the Indonesian archipelago.\n\nBy fostering cross-sector partnerships, advancing digital tourism ecosystems, and curating thematic travel itineraries, Indonesia's tourism industry is well-positioned to drive robust tourist footfall and inclusive economic growth.",
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
    "createdAt": "2026-11-03T00:36:00.000Z",
    "generatedAt": "2026-11-03T02:00:40.758Z",
    "generatedBy": "Malala Autonomous RSS Engine (Google News National Parekraf Feed)",
    "isAIGenerated": false
  },
  {
    "id": "hi-rss-nasional-40758-3",
    "title": "7 Destinasi Wisata Wayang untuk Mengenal Budaya Indonesia",
    "titleEn": "Indonesia Tourism Update: 7 Destinasi Wisata Wayang untuk Mengenal Budaya Indonesia",
    "category": "Pariwisata Indonesia",
    "categoryEn": "Indonesian Tourism",
    "date": "2 November 2026",
    "dateEn": "November 2, 2026",
    "sourceName": "Headline.co.id",
    "sourceDomain": "kemenparekraf.go.id",
    "sourceUrl": "https://news.google.com/rss/articles/CBMilwFBVV95cUxNbHo5UGVwOVVrV2FaOTc3VkY2MnE3UFJqNXk4MW82dWpib3I1eW8wZlhERlZXaC14SzBoU0dKZGs4cWYtZnhHSVFBUDB0VTFIQ0dKNVMzdThseXBKUDJiXzNRcmNhV1ZFdXNkSENjOGQwWlhtNnJtc2EtYXFwLXZuZjBBSW9TcGVVZ1M3Mk1CZEJQbWd1ckRF?oc=5",
    "sourceIcon": "https://www.google.com/s2/favicons?domain=kemenparekraf.go.id&sz=64",
    "imageUrl": "https://images.unsplash.com/photo-1590523741831-ab7e8b8f9c7f?auto=format&fit=crop&w=800&q=80",
    "tag": "Nasional",
    "tagEn": "National",
    "actionUrl": "https://news.google.com/rss/articles/CBMilwFBVV95cUxNbHo5UGVwOVVrV2FaOTc3VkY2MnE3UFJqNXk4MW82dWpib3I1eW8wZlhERlZXaC14SzBoU0dKZGs4cWYtZnhHSVFBUDB0VTFIQ0dKNVMzdThseXBKUDJiXzNRcmNhV1ZFdXNkSENjOGQwWlhtNnJtc2EtYXFwLXZuZjBBSW9TcGVVZ1M3Mk1CZEJQbWd1ckRF?oc=5",
    "mapsUrl": "https://www.google.com/maps/search/?api=1&query=Indonesia",
    "locationName": "Kawasan Wisata Nusantara Indonesia",
    "locationNameEn": "Indonesian Archipelago Tourism Destinations",
    "description": "Kementerian Pariwisata Republik Indonesia bersama para pemangku kepentingan sektor pariwisata nasional terus menggalakkan program strategis: \"7 Destinasi Wisata Wayang untuk Mengenal Budaya Indonesia\". Kebijakan ini merupakan bagian integral dari peta jalan pariwisata berkualitas dan berkelanjutan di seluruh nusantara.\n\nMelalui penguatan kolaborasi lintas-sektor, akselerasi digitalisasi ekosistem wisata, serta diversifikasi paket perjalanan tematik, sektor pariwisata Indonesia dipacu untuk meningkatkan pergerakan wisatawan nusantara dan kunjungan wisatawan mancanegara secara inklusif.",
    "descriptionEn": "The Ministry of Tourism of the Republic of Indonesia and national travel stakeholders continue implementing strategic programs: \"7 Destinasi Wisata Wayang untuk Mengenal Budaya Indonesia\". This initiative supports the national roadmap toward high-yield, sustainable tourism development across the Indonesian archipelago.\n\nBy fostering cross-sector partnerships, advancing digital tourism ecosystems, and curating thematic travel itineraries, Indonesia's tourism industry is well-positioned to drive robust tourist footfall and inclusive economic growth.",
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
    "createdAt": "2026-11-02T23:16:39.000Z",
    "generatedAt": "2026-11-03T02:00:40.758Z",
    "generatedBy": "Malala Autonomous RSS Engine (Google News National Parekraf Feed)",
    "isAIGenerated": false
  },
  {
    "id": "hi-rss-sumbar-40758-2",
    "title": "Tim PkM UNP dampingi pengembangkan potensi wisata melalui program Nagari Pangian Creative Hub berbasis pendekatan geospasial dan kearifan lokal",
    "titleEn": "West Sumatra Tourism: Tim PkM UNP dampingi pengembangkan potensi wisata melalui program Nagari Pangian Creative Hub berbasis pendekatan geospasial dan kearifan lokal",
    "category": "Pariwisata Sumatera Barat",
    "categoryEn": "West Sumatra Tourism",
    "date": "2 November 2026",
    "dateEn": "November 2, 2026",
    "sourceName": "ANTARA News Sumbar",
    "sourceDomain": "sumbar.antaranews.com",
    "sourceUrl": "https://news.google.com/rss/articles/CBMilgJBVV95cUxPNV9RdW9aekJhdXZ0WV9LU2ZYLUFrM3hsZXJURWZhajF0cHRQemNFNGUwMGN6dmdMZXkzQkZLZnVBblJqOUZvaXRQbzYzWUFCN2hXbnM4Q1pOY042QUVRU0lzaUVoM2JlZEJuSTlMbEE5X190eFRydFM3dk1mU0FCT3pzV19JV3pHYlJDOHNDR3FlQTlCNzBCYjFwQUxxcWR2TXJhODZBRUR6ZXYzM0wzV2s2ZlFrZVFVdkt6SGFGZXctTm0tdTdyVmt3T1VDS0ZmU0hTNUdBRmZ4X0txTGkzcHZRdndqdXNYS1VyZHRKNlE1YjZod1Q1V0NLaWNOdnNxcGNwczdSYVV5QWI0bkpzc2ZDdGF0UQ?oc=5",
    "sourceIcon": "https://www.google.com/s2/favicons?domain=antaranews.com&sz=64",
    "imageUrl": "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=800&q=80",
    "tag": "Sumbar",
    "tagEn": "West Sumatra",
    "actionUrl": "https://news.google.com/rss/articles/CBMilgJBVV95cUxPNV9RdW9aekJhdXZ0WV9LU2ZYLUFrM3hsZXJURWZhajF0cHRQemNFNGUwMGN6dmdMZXkzQkZLZnVBblJqOUZvaXRQbzYzWUFCN2hXbnM4Q1pOY042QUVRU0lzaUVoM2JlZEJuSTlMbEE5X190eFRydFM3dk1mU0FCT3pzV19JV3pHYlJDOHNDR3FlQTlCNzBCYjFwQUxxcWR2TXJhODZBRUR6ZXYzM0wzV2s2ZlFrZVFVdkt6SGFGZXctTm0tdTdyVmt3T1VDS0ZmU0hTNUdBRmZ4X0txTGkzcHZRdndqdXNYS1VyZHRKNlE1YjZod1Q1V0NLaWNOdnNxcGNwczdSYVV5QWI0bkpzc2ZDdGF0UQ?oc=5",
    "mapsUrl": "https://www.google.com/maps/search/?api=1&query=Sumatera+Barat",
    "locationName": "Destinasi Wisata Unggulan Sumatera Barat",
    "locationNameEn": "West Sumatra Prime Tourism Destinations",
    "description": "Laporan liputan jurnalistik resmi: \"Tim PkM UNP dampingi pengembangkan potensi wisata melalui program Nagari Pangian Creative Hub berbasis pendekatan geospasial dan kearifan lokal\". Pemerintah Provinsi Sumatera Barat bersama Dinas Pariwisata dan seluruh pemangku kepentingan terus mempercepat langkah strategis guna mengoptimalkan potensi wisata alam yang asri, keluhuran adat dan seni budaya Minangkabau, serta kuliner halal legendaris di berbagai kabupaten dan kota.\n\nInisiatif terpadu ini difokuskan pada peningkatan kualitas amenitas dan fasilitas umum di objek wisata, kemudahan konektivitas transportasi wisatawan, serta penguatan pelaku UMKM dan industri ekonomi kreatif lokal agar pariwisata Ranah Minang senantiasa berdaya saing tinggi dan berkelanjutan.",
    "descriptionEn": "Official news report: \"Tim PkM UNP dampingi pengembangkan potensi wisata melalui program Nagari Pangian Creative Hub berbasis pendekatan geospasial dan kearifan lokal\". West Sumatra provincial authorities, the regional tourism board, and hospitality stakeholders are accelerating strategic measures to showcase authentic natural landscapes, Minangkabau cultural heritage, and legendary halal culinary traditions.\n\nThis concerted initiative focuses on upgrading tourist amenities, streamlining transport connectivity, and empowering local creative MSMEs, ensuring West Sumatra's tourism remains highly competitive, hospitable, and sustainable for both domestic and international travelers.",
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
    "createdAt": "2026-11-02T18:09:02.000Z",
    "generatedAt": "2026-11-03T02:00:40.758Z",
    "generatedBy": "Malala Autonomous RSS Engine (Google News Sumbar Feed)",
    "isAIGenerated": false
  },
  {
    "id": "hi-rss-sumbar-40758-3",
    "title": "Kemenhaj Sumbar Temukan Lima Travel Umrah Diduga Tak Berizin",
    "titleEn": "West Sumatra Tourism: Kemenhaj Sumbar Temukan Lima Travel Umrah Diduga Tak Berizin",
    "category": "Pariwisata Sumatera Barat",
    "categoryEn": "West Sumatra Tourism",
    "date": "2 November 2026",
    "dateEn": "November 2, 2026",
    "sourceName": "ValoraNews.com",
    "sourceDomain": "sumbar.antaranews.com",
    "sourceUrl": "https://news.google.com/rss/articles/CBMiogFBVV95cUxPTExfM1FnQlBuV09QeU9ZMng5MTBGZkdZRnE2czFHaGI4TTh4aU45Z3c1VWQ2QkpSeXRyNkQ3UXd5bWlSUmFJa09JWTJ6WkpBdW5aT1kwUXpoczFFaFJQQllabm1SZ1V1dDh0WmZCOHdWR2dFQ3czbUUzcW1JMkZIRlhSaTBsdFZuYlJyOU9zUFZzbjl2YmpmLUEwd3JlRk5fVGc?oc=5",
    "sourceIcon": "https://www.google.com/s2/favicons?domain=antaranews.com&sz=64",
    "imageUrl": "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=800&q=80",
    "tag": "Sumbar",
    "tagEn": "West Sumatra",
    "actionUrl": "https://news.google.com/rss/articles/CBMiogFBVV95cUxPTExfM1FnQlBuV09QeU9ZMng5MTBGZkdZRnE2czFHaGI4TTh4aU45Z3c1VWQ2QkpSeXRyNkQ3UXd5bWlSUmFJa09JWTJ6WkpBdW5aT1kwUXpoczFFaFJQQllabm1SZ1V1dDh0WmZCOHdWR2dFQ3czbUUzcW1JMkZIRlhSaTBsdFZuYlJyOU9zUFZzbjl2YmpmLUEwd3JlRk5fVGc?oc=5",
    "mapsUrl": "https://www.google.com/maps/search/?api=1&query=Sumatera+Barat",
    "locationName": "Destinasi Wisata Unggulan Sumatera Barat",
    "locationNameEn": "West Sumatra Prime Tourism Destinations",
    "description": "Laporan liputan jurnalistik resmi: \"Kemenhaj Sumbar Temukan Lima Travel Umrah Diduga Tak Berizin\". Pemerintah Provinsi Sumatera Barat bersama Dinas Pariwisata dan seluruh pemangku kepentingan terus mempercepat langkah strategis guna mengoptimalkan potensi wisata alam yang asri, keluhuran adat dan seni budaya Minangkabau, serta kuliner halal legendaris di berbagai kabupaten dan kota.\n\nInisiatif terpadu ini difokuskan pada peningkatan kualitas amenitas dan fasilitas umum di objek wisata, kemudahan konektivitas transportasi wisatawan, serta penguatan pelaku UMKM dan industri ekonomi kreatif lokal agar pariwisata Ranah Minang senantiasa berdaya saing tinggi dan berkelanjutan.",
    "descriptionEn": "Official news report: \"Kemenhaj Sumbar Temukan Lima Travel Umrah Diduga Tak Berizin\". West Sumatra provincial authorities, the regional tourism board, and hospitality stakeholders are accelerating strategic measures to showcase authentic natural landscapes, Minangkabau cultural heritage, and legendary halal culinary traditions.\n\nThis concerted initiative focuses on upgrading tourist amenities, streamlining transport connectivity, and empowering local creative MSMEs, ensuring West Sumatra's tourism remains highly competitive, hospitable, and sustainable for both domestic and international travelers.",
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
    "createdAt": "2026-11-02T18:00:00.000Z",
    "generatedAt": "2026-11-03T02:00:40.758Z",
    "generatedBy": "Malala Autonomous RSS Engine (Google News Sumbar Feed)",
    "isAIGenerated": false
  },
  {
    "id": "hi-rss-sumbar-40758-4",
    "title": "Minang Geopark Run Jadi Ajang Pemprov Sumbar Promosikan Pariwisata dan Ekonomi Daerah",
    "titleEn": "West Sumatra Tourism: Minang Geopark Run Jadi Ajang Pemprov Sumbar Promosikan Pariwisata dan Ekonomi Daerah",
    "category": "Pariwisata Sumatera Barat",
    "categoryEn": "West Sumatra Tourism",
    "date": "2 November 2026",
    "dateEn": "November 2, 2026",
    "sourceName": "InfoPublik",
    "sourceDomain": "sumbar.antaranews.com",
    "sourceUrl": "https://news.google.com/rss/articles/CBMizgFBVV95cUxOS0w4SGRyeU1qU0tvWU5Sd2VlQ2VVWDFPZlNaS0NqTzRuUThzcnN5UGxVLTBZN2Y4aTQ1RVJvZGNySmUwWFBZa1RjdWhkNm5hNEVhYjBpOGNyVVFLdlJ4YkdmODJQclppc056dDJvN25QNEhPZUI2SDFVTWhyVjcwbXZmYkRHZlFDaDkxTnZ2M0s0cUJMWUM4SlZNQzJrZ0pJT1djcWdOd2hOWUU0WGV4MUxSQUlOQ1Z6b1JuT3BhQVN2ZjVYaWpJbUw5NmRTdw?oc=5",
    "sourceIcon": "https://www.google.com/s2/favicons?domain=antaranews.com&sz=64",
    "imageUrl": "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=800&q=80",
    "tag": "Sumbar",
    "tagEn": "West Sumatra",
    "actionUrl": "https://news.google.com/rss/articles/CBMizgFBVV95cUxOS0w4SGRyeU1qU0tvWU5Sd2VlQ2VVWDFPZlNaS0NqTzRuUThzcnN5UGxVLTBZN2Y4aTQ1RVJvZGNySmUwWFBZa1RjdWhkNm5hNEVhYjBpOGNyVVFLdlJ4YkdmODJQclppc056dDJvN25QNEhPZUI2SDFVTWhyVjcwbXZmYkRHZlFDaDkxTnZ2M0s0cUJMWUM4SlZNQzJrZ0pJT1djcWdOd2hOWUU0WGV4MUxSQUlOQ1Z6b1JuT3BhQVN2ZjVYaWpJbUw5NmRTdw?oc=5",
    "mapsUrl": "https://www.google.com/maps/search/?api=1&query=Sumatera+Barat",
    "locationName": "Destinasi Wisata Unggulan Sumatera Barat",
    "locationNameEn": "West Sumatra Prime Tourism Destinations",
    "description": "Laporan liputan jurnalistik resmi: \"Minang Geopark Run Jadi Ajang Pemprov Sumbar Promosikan Pariwisata dan Ekonomi Daerah\". Pemerintah Provinsi Sumatera Barat bersama Dinas Pariwisata dan seluruh pemangku kepentingan terus mempercepat langkah strategis guna mengoptimalkan potensi wisata alam yang asri, keluhuran adat dan seni budaya Minangkabau, serta kuliner halal legendaris di berbagai kabupaten dan kota.\n\nInisiatif terpadu ini difokuskan pada peningkatan kualitas amenitas dan fasilitas umum di objek wisata, kemudahan konektivitas transportasi wisatawan, serta penguatan pelaku UMKM dan industri ekonomi kreatif lokal agar pariwisata Ranah Minang senantiasa berdaya saing tinggi dan berkelanjutan.",
    "descriptionEn": "Official news report: \"Minang Geopark Run Jadi Ajang Pemprov Sumbar Promosikan Pariwisata dan Ekonomi Daerah\". West Sumatra provincial authorities, the regional tourism board, and hospitality stakeholders are accelerating strategic measures to showcase authentic natural landscapes, Minangkabau cultural heritage, and legendary halal culinary traditions.\n\nThis concerted initiative focuses on upgrading tourist amenities, streamlining transport connectivity, and empowering local creative MSMEs, ensuring West Sumatra's tourism remains highly competitive, hospitable, and sustainable for both domestic and international travelers.",
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
    "createdAt": "2026-11-02T15:35:00.000Z",
    "generatedAt": "2026-11-03T02:00:40.758Z",
    "generatedBy": "Malala Autonomous RSS Engine (Google News Sumbar Feed)",
    "isAIGenerated": false
  },
  {
    "id": "hi-rss-sumbar-36166-1",
    "title": "Anak Nagari Cup II Resmi Berakhir, KONI dan PBSI Padang Dorong Regenerasi Atlet",
    "titleEn": "West Sumatra Tourism: Anak Nagari Cup II Resmi Berakhir, KONI dan PBSI Padang Dorong Regenerasi Atlet",
    "category": "Pariwisata Sumatera Barat",
    "categoryEn": "West Sumatra Tourism",
    "date": "1 November 2026",
    "dateEn": "November 1, 2026",
    "sourceName": "Prokabar",
    "sourceDomain": "sumbar.antaranews.com",
    "sourceUrl": "https://news.google.com/rss/articles/CBMiogFBVV95cUxNa2NJZGI0c2VHSkkwRG40ekZIdnNPTWNBdUdoWlNqamh3ZXo0WnNCTVgyM0tIeU1IWXJDVnpOQkpTUlMwOWRMSmx2UGVIajB4cjB1a09waHVGWXZ4SERnb3R4NWVDVjlkUTc0OGNaQmJpM3hQa21heG5Qa3BzeTJzclBuMEtZTlJhbU50OG53X0UtRTVoZmtoNmVoNEc0MkJNS2c?oc=5",
    "sourceIcon": "https://www.google.com/s2/favicons?domain=antaranews.com&sz=64",
    "imageUrl": "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80",
    "tag": "Sumbar",
    "tagEn": "West Sumatra",
    "actionUrl": "https://news.google.com/rss/articles/CBMiogFBVV95cUxNa2NJZGI0c2VHSkkwRG40ekZIdnNPTWNBdUdoWlNqamh3ZXo0WnNCTVgyM0tIeU1IWXJDVnpOQkpTUlMwOWRMSmx2UGVIajB4cjB1a09waHVGWXZ4SERnb3R4NWVDVjlkUTc0OGNaQmJpM3hQa21heG5Qa3BzeTJzclBuMEtZTlJhbU50OG53X0UtRTVoZmtoNmVoNEc0MkJNS2c?oc=5",
    "mapsUrl": "https://www.google.com/maps/search/?api=1&query=Kota+Padang",
    "locationName": "Kota Padang & Bandara Internasional Minangkabau",
    "locationNameEn": "Padang & Minangkabau International Airport",
    "description": "Laporan liputan jurnalistik resmi: \"Anak Nagari Cup II Resmi Berakhir, KONI dan PBSI Padang Dorong Regenerasi Atlet\". Pemerintah Provinsi Sumatera Barat bersama Dinas Pariwisata dan seluruh pemangku kepentingan terus mempercepat langkah strategis guna mengoptimalkan potensi wisata alam yang asri, keluhuran adat dan seni budaya Minangkabau, serta kuliner halal legendaris di berbagai kabupaten dan kota.\n\nInisiatif terpadu ini difokuskan pada peningkatan kualitas amenitas dan fasilitas umum di objek wisata, kemudahan konektivitas transportasi wisatawan, serta penguatan pelaku UMKM dan industri ekonomi kreatif lokal agar pariwisata Ranah Minang senantiasa berdaya saing tinggi dan berkelanjutan.",
    "descriptionEn": "Official news report: \"Anak Nagari Cup II Resmi Berakhir, KONI dan PBSI Padang Dorong Regenerasi Atlet\". West Sumatra provincial authorities, the regional tourism board, and hospitality stakeholders are accelerating strategic measures to showcase authentic natural landscapes, Minangkabau cultural heritage, and legendary halal culinary traditions.\n\nThis concerted initiative focuses on upgrading tourist amenities, streamlining transport connectivity, and empowering local creative MSMEs, ensuring West Sumatra's tourism remains highly competitive, hospitable, and sustainable for both domestic and international travelers.",
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
    "createdAt": "2026-11-01T22:59:00.000Z",
    "generatedAt": "2026-11-01T23:23:56.166Z",
    "generatedBy": "Malala Autonomous RSS Engine (Google News Sumbar Feed)",
    "isAIGenerated": false
  },
  {
    "id": "hi-rss-sumbar-36166-2",
    "title": "Minang Geopark Run Jadi Ajang Promosi Wisata Sumbar",
    "titleEn": "West Sumatra Tourism: Minang Geopark Run Jadi Ajang Promosi Wisata Sumbar",
    "category": "Pariwisata Sumatera Barat",
    "categoryEn": "West Sumatra Tourism",
    "date": "1 November 2026",
    "dateEn": "November 1, 2026",
    "sourceName": "Rakyatterkini.com",
    "sourceDomain": "sumbar.antaranews.com",
    "sourceUrl": "https://news.google.com/rss/articles/CBMimgFBVV95cUxOZEJXMU40YjZEQVZJOFVXR2hHV0FnNGgzVzhGZHBqcnNqX3VpRGw3TXFzV25tN19FTVJFaldjaDBtWnI2cjdmV1F1b2xjenZKTU1VZVVkc2cwTExFTG9hOEg0WmFaVFhUVU9Cd3RGQVlIMmhlVXdhVllNUm9kOXNSVmxrRG5Kc1ZvRGtVUy13MHl5Wm1xejVEWDhB?oc=5",
    "sourceIcon": "https://www.google.com/s2/favicons?domain=antaranews.com&sz=64",
    "imageUrl": "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=800&q=80",
    "tag": "Sumbar",
    "tagEn": "West Sumatra",
    "actionUrl": "https://news.google.com/rss/articles/CBMimgFBVV95cUxOZEJXMU40YjZEQVZJOFVXR2hHV0FnNGgzVzhGZHBqcnNqX3VpRGw3TXFzV25tN19FTVJFaldjaDBtWnI2cjdmV1F1b2xjenZKTU1VZVVkc2cwTExFTG9hOEg0WmFaVFhUVU9Cd3RGQVlIMmhlVXdhVllNUm9kOXNSVmxrRG5Kc1ZvRGtVUy13MHl5Wm1xejVEWDhB?oc=5",
    "mapsUrl": "https://www.google.com/maps/search/?api=1&query=Sumatera+Barat",
    "locationName": "Destinasi Wisata Unggulan Sumatera Barat",
    "locationNameEn": "West Sumatra Prime Tourism Destinations",
    "description": "Laporan liputan jurnalistik resmi: \"Minang Geopark Run Jadi Ajang Promosi Wisata Sumbar\". Pemerintah Provinsi Sumatera Barat bersama Dinas Pariwisata dan seluruh pemangku kepentingan terus mempercepat langkah strategis guna mengoptimalkan potensi wisata alam yang asri, keluhuran adat dan seni budaya Minangkabau, serta kuliner halal legendaris di berbagai kabupaten dan kota.\n\nInisiatif terpadu ini difokuskan pada peningkatan kualitas amenitas dan fasilitas umum di objek wisata, kemudahan konektivitas transportasi wisatawan, serta penguatan pelaku UMKM dan industri ekonomi kreatif lokal agar pariwisata Ranah Minang senantiasa berdaya saing tinggi dan berkelanjutan.",
    "descriptionEn": "Official news report: \"Minang Geopark Run Jadi Ajang Promosi Wisata Sumbar\". West Sumatra provincial authorities, the regional tourism board, and hospitality stakeholders are accelerating strategic measures to showcase authentic natural landscapes, Minangkabau cultural heritage, and legendary halal culinary traditions.\n\nThis concerted initiative focuses on upgrading tourist amenities, streamlining transport connectivity, and empowering local creative MSMEs, ensuring West Sumatra's tourism remains highly competitive, hospitable, and sustainable for both domestic and international travelers.",
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
    "createdAt": "2026-11-01T22:54:00.000Z",
    "generatedAt": "2026-11-01T23:23:56.166Z",
    "generatedBy": "Malala Autonomous RSS Engine (Google News Sumbar Feed)",
    "isAIGenerated": false
  },
  {
    "id": "hi-rss-nasional-36166-1",
    "title": "Lulu Zaharani Puteri Indonesia Pariwisata 2023 Menikah di Usia 23 Tahun, Dua Bulan Sebelum Ulang Tahun",
    "titleEn": "Indonesia Tourism Update: Lulu Zaharani Puteri Indonesia Pariwisata 2023 Menikah di Usia 23 Tahun, Dua Bulan Sebelum Ulang Tahun",
    "category": "Pariwisata Indonesia",
    "categoryEn": "Indonesian Tourism",
    "date": "1 November 2026",
    "dateEn": "November 1, 2026",
    "sourceName": "Lintas Gunungkidul",
    "sourceDomain": "kemenparekraf.go.id",
    "sourceUrl": "https://news.google.com/rss/articles/CBMi-AFBVV95cUxNb2laanlTZ1E2NlVfQkx5VEg5VDk1ZVB3ekFIdkx4dVZadjZZZjM1ZmlFZ1hpemtXYTA2ajk1bElxZTdQcXRTRmhuSkhjNFBXT2FteUtTa19aX08zc2ViUHBFakhzSzVSUnlycml2WHV3dEwyVGRkUUprcDRoQU9MSHJGM25tX1hqdkZvSDdTVDJZZi1EeXhfaGVIOTVXRHdlVHZKel9fWlp6RHN4UW1KMVZReWFURzRhay1HT3lEalpyeG5mVWdWamlYR0hCd1h4NUVYUnpydE92OGM3MUNkQTJyRkdta0pSZ0g3dWI2UXE3MzliOV9tV9IB_gFBVV95cUxNQTJrU1phM1hnM29Bb1lLcFdFZ09vQk9JT1RuSUlRTXpEanVEa3l4OENTNU5DLVFCWnpBSHlPZHNYbmNPcFRGZThrZlRuX0tZa3FURHZ0czF6dU1fV3paZzhhMFVkU28zRER3TlNQRW1laFJQa3FOZGZsNlRNWHBRQ1FEM2FmT21nb1QwcXJYbHFDZWFuUnB6TWI3MEg4ekNXT1dZUV80aThzV1F4OTVjSUVxZnRJMFJ0ZzVMUFRIaWFVdHViTWhtR0VFTVR2WU5Qd19LLTdGZEVHUkY2cnNheFFsUHByTGQ1dGFNcmhiZ0k3WnpldDU2NlZtU3RRdw?oc=5",
    "sourceIcon": "https://www.google.com/s2/favicons?domain=kemenparekraf.go.id&sz=64",
    "imageUrl": "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=800&q=80",
    "tag": "Nasional",
    "tagEn": "National",
    "actionUrl": "https://news.google.com/rss/articles/CBMi-AFBVV95cUxNb2laanlTZ1E2NlVfQkx5VEg5VDk1ZVB3ekFIdkx4dVZadjZZZjM1ZmlFZ1hpemtXYTA2ajk1bElxZTdQcXRTRmhuSkhjNFBXT2FteUtTa19aX08zc2ViUHBFakhzSzVSUnlycml2WHV3dEwyVGRkUUprcDRoQU9MSHJGM25tX1hqdkZvSDdTVDJZZi1EeXhfaGVIOTVXRHdlVHZKel9fWlp6RHN4UW1KMVZReWFURzRhay1HT3lEalpyeG5mVWdWamlYR0hCd1h4NUVYUnpydE92OGM3MUNkQTJyRkdta0pSZ0g3dWI2UXE3MzliOV9tV9IB_gFBVV95cUxNQTJrU1phM1hnM29Bb1lLcFdFZ09vQk9JT1RuSUlRTXpEanVEa3l4OENTNU5DLVFCWnpBSHlPZHNYbmNPcFRGZThrZlRuX0tZa3FURHZ0czF6dU1fV3paZzhhMFVkU28zRER3TlNQRW1laFJQa3FOZGZsNlRNWHBRQ1FEM2FmT21nb1QwcXJYbHFDZWFuUnB6TWI3MEg4ekNXT1dZUV80aThzV1F4OTVjSUVxZnRJMFJ0ZzVMUFRIaWFVdHViTWhtR0VFTVR2WU5Qd19LLTdGZEVHUkY2cnNheFFsUHByTGQ1dGFNcmhiZ0k3WnpldDU2NlZtU3RRdw?oc=5",
    "mapsUrl": "https://www.google.com/maps/search/?api=1&query=Indonesia",
    "locationName": "Kawasan Wisata Nusantara Indonesia",
    "locationNameEn": "Indonesian Archipelago Tourism Destinations",
    "description": "Kementerian Pariwisata Republik Indonesia bersama para pemangku kepentingan sektor pariwisata nasional terus menggalakkan program strategis: \"Lulu Zaharani Puteri Indonesia Pariwisata 2023 Menikah di Usia 23 Tahun, Dua Bulan Sebelum Ulang Tahun\". Kebijakan ini merupakan bagian integral dari peta jalan pariwisata berkualitas dan berkelanjutan di seluruh nusantara.\n\nMelalui penguatan kolaborasi lintas-sektor, akselerasi digitalisasi ekosistem wisata, serta diversifikasi paket perjalanan tematik, sektor pariwisata Indonesia dipacu untuk meningkatkan pergerakan wisatawan nusantara dan kunjungan wisatawan mancanegara secara inklusif.",
    "descriptionEn": "The Ministry of Tourism of the Republic of Indonesia and national travel stakeholders continue implementing strategic programs: \"Lulu Zaharani Puteri Indonesia Pariwisata 2023 Menikah di Usia 23 Tahun, Dua Bulan Sebelum Ulang Tahun\". This initiative supports the national roadmap toward high-yield, sustainable tourism development across the Indonesian archipelago.\n\nBy fostering cross-sector partnerships, advancing digital tourism ecosystems, and curating thematic travel itineraries, Indonesia's tourism industry is well-positioned to drive robust tourist footfall and inclusive economic growth.",
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
    "createdAt": "2026-11-01T19:45:00.000Z",
    "generatedAt": "2026-11-01T23:23:56.166Z",
    "generatedBy": "Malala Autonomous RSS Engine (Google News National Parekraf Feed)",
    "isAIGenerated": false
  },
  {
    "id": "hi-rss-nasional-36166-2",
    "title": "Kemenpar Bidik Wisatawan Premium Lewat Paket Wisata Mindfulness",
    "titleEn": "Indonesia Tourism Update: Kemenpar Bidik Wisatawan Premium Lewat Paket Wisata Mindfulness",
    "category": "Pariwisata Indonesia",
    "categoryEn": "Indonesian Tourism",
    "date": "1 November 2026",
    "dateEn": "November 1, 2026",
    "sourceName": "ValoraNews.com",
    "sourceDomain": "kemenparekraf.go.id",
    "sourceUrl": "https://news.google.com/rss/articles/CBMipgFBVV95cUxQSjN0Yk1DRVlLckpMNTc0SnlnZWtUQW9fejExSkFtNzhTSk92Y05YWTJqSjl4UndfTkdXU250ZnN1aG9GQkd4NW5CRmxvWUttb0QySnNyUjhEQk82ekFVaWRwRFFncTB6X0RDMkxKRzZpU2FPZzBIX1Viam1SalNpYlU1SU03WFprUGdXYWZnN0xmUlVrdjFjUElOQm5BWW5YdXltd1dR?oc=5",
    "sourceIcon": "https://www.google.com/s2/favicons?domain=kemenparekraf.go.id&sz=64",
    "imageUrl": "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=800&q=80",
    "tag": "Nasional",
    "tagEn": "National",
    "actionUrl": "https://news.google.com/rss/articles/CBMipgFBVV95cUxQSjN0Yk1DRVlLckpMNTc0SnlnZWtUQW9fejExSkFtNzhTSk92Y05YWTJqSjl4UndfTkdXU250ZnN1aG9GQkd4NW5CRmxvWUttb0QySnNyUjhEQk82ekFVaWRwRFFncTB6X0RDMkxKRzZpU2FPZzBIX1Viam1SalNpYlU1SU03WFprUGdXYWZnN0xmUlVrdjFjUElOQm5BWW5YdXltd1dR?oc=5",
    "mapsUrl": "https://www.google.com/maps/search/?api=1&query=Indonesia",
    "locationName": "Kawasan Wisata Nusantara Indonesia",
    "locationNameEn": "Indonesian Archipelago Tourism Destinations",
    "description": "Kementerian Pariwisata Republik Indonesia bersama para pemangku kepentingan sektor pariwisata nasional terus menggalakkan program strategis: \"Kemenpar Bidik Wisatawan Premium Lewat Paket Wisata Mindfulness\". Kebijakan ini merupakan bagian integral dari peta jalan pariwisata berkualitas dan berkelanjutan di seluruh nusantara.\n\nMelalui penguatan kolaborasi lintas-sektor, akselerasi digitalisasi ekosistem wisata, serta diversifikasi paket perjalanan tematik, sektor pariwisata Indonesia dipacu untuk meningkatkan pergerakan wisatawan nusantara dan kunjungan wisatawan mancanegara secara inklusif.",
    "descriptionEn": "The Ministry of Tourism of the Republic of Indonesia and national travel stakeholders continue implementing strategic programs: \"Kemenpar Bidik Wisatawan Premium Lewat Paket Wisata Mindfulness\". This initiative supports the national roadmap toward high-yield, sustainable tourism development across the Indonesian archipelago.\n\nBy fostering cross-sector partnerships, advancing digital tourism ecosystems, and curating thematic travel itineraries, Indonesia's tourism industry is well-positioned to drive robust tourist footfall and inclusive economic growth.",
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
    "createdAt": "2026-11-01T19:00:00.000Z",
    "generatedAt": "2026-11-01T23:23:56.166Z",
    "generatedBy": "Malala Autonomous RSS Engine (Google News National Parekraf Feed)",
    "isAIGenerated": false
  },
  {
    "id": "hi-rss-sumbar-36166-3",
    "title": "3.800 Peserta Terdaftar, Minang Geopark Run 2026 Siap Digelar di Bukittinggi Besok",
    "titleEn": "West Sumatra Tourism: 3.800 Peserta Terdaftar, Minang Geopark Run 2026 Siap Digelar di Bukittinggi Besok",
    "category": "Pariwisata Sumatera Barat",
    "categoryEn": "West Sumatra Tourism",
    "date": "1 November 2026",
    "dateEn": "November 1, 2026",
    "sourceName": "Dutametro.com",
    "sourceDomain": "sumbar.antaranews.com",
    "sourceUrl": "https://news.google.com/rss/articles/CBMi2gFBVV95cUxNTHQtQXpCN2xOSUgySHhZMUFIZXpDWEZaeG1aVWx1NWRxNmhKWGp1NEZvQUNHVkdFb1ppUEppNUx3TXAweGo3OUhjQlpOc2FVcVkzLTc3YzNablV0dmxPdmFacUpULVR5T0F6dXFkZzNkWC1WN2hUeV9ibXdaSXhjYno1VXRXZHFKRG44V3FfbHVYLUtTalNpSzdPRWpsUXdueFpoZ2YzZVRjZUdMX2gxc3hyaHhNNEVHV2VDY01DV3dkcDVkZXRKa3cybTFqMU1pSDlnNTNJYkxwQQ?oc=5",
    "sourceIcon": "https://www.google.com/s2/favicons?domain=antaranews.com&sz=64",
    "imageUrl": "https://images.unsplash.com/photo-1596402184320-417e7178b2cd?auto=format&fit=crop&w=800&q=80",
    "tag": "Sumbar",
    "tagEn": "West Sumatra",
    "actionUrl": "https://news.google.com/rss/articles/CBMi2gFBVV95cUxNTHQtQXpCN2xOSUgySHhZMUFIZXpDWEZaeG1aVWx1NWRxNmhKWGp1NEZvQUNHVkdFb1ppUEppNUx3TXAweGo3OUhjQlpOc2FVcVkzLTc3YzNablV0dmxPdmFacUpULVR5T0F6dXFkZzNkWC1WN2hUeV9ibXdaSXhjYno1VXRXZHFKRG44V3FfbHVYLUtTalNpSzdPRWpsUXdueFpoZ2YzZVRjZUdMX2gxc3hyaHhNNEVHV2VDY01DV3dkcDVkZXRKa3cybTFqMU1pSDlnNTNJYkxwQQ?oc=5",
    "mapsUrl": "https://www.google.com/maps/search/?api=1&query=Jam+Gadang+Bukittinggi",
    "locationName": "Kota Wisata Bukittinggi",
    "locationNameEn": "Bukittinggi Tourism City",
    "description": "Laporan liputan jurnalistik resmi: \"3.800 Peserta Terdaftar, Minang Geopark Run 2026 Siap Digelar di Bukittinggi Besok\". Pemerintah Provinsi Sumatera Barat bersama Dinas Pariwisata dan seluruh pemangku kepentingan terus mempercepat langkah strategis guna mengoptimalkan potensi wisata alam yang asri, keluhuran adat dan seni budaya Minangkabau, serta kuliner halal legendaris di berbagai kabupaten dan kota.\n\nInisiatif terpadu ini difokuskan pada peningkatan kualitas amenitas dan fasilitas umum di objek wisata, kemudahan konektivitas transportasi wisatawan, serta penguatan pelaku UMKM dan industri ekonomi kreatif lokal agar pariwisata Ranah Minang senantiasa berdaya saing tinggi dan berkelanjutan.",
    "descriptionEn": "Official news report: \"3.800 Peserta Terdaftar, Minang Geopark Run 2026 Siap Digelar di Bukittinggi Besok\". West Sumatra provincial authorities, the regional tourism board, and hospitality stakeholders are accelerating strategic measures to showcase authentic natural landscapes, Minangkabau cultural heritage, and legendary halal culinary traditions.\n\nThis concerted initiative focuses on upgrading tourist amenities, streamlining transport connectivity, and empowering local creative MSMEs, ensuring West Sumatra's tourism remains highly competitive, hospitable, and sustainable for both domestic and international travelers.",
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
    "createdAt": "2026-11-01T14:39:07.000Z",
    "generatedAt": "2026-11-01T23:23:56.166Z",
    "generatedBy": "Malala Autonomous RSS Engine (Google News Sumbar Feed)",
    "isAIGenerated": false
  },
  {
    "id": "hi-rss-nasional-36166-3",
    "title": "Kepulauan Seribu kembangkan wisata bebas sampah",
    "titleEn": "Indonesia Tourism Update: Kepulauan Seribu kembangkan wisata bebas sampah",
    "category": "Pariwisata Indonesia",
    "categoryEn": "Indonesian Tourism",
    "date": "1 November 2026",
    "dateEn": "November 1, 2026",
    "sourceName": "Head Topics",
    "sourceDomain": "kemenparekraf.go.id",
    "sourceUrl": "https://news.google.com/rss/articles/CBMikAFBVV95cUxOejZ5M2VReS03N1RaQkRSa0hGVU9rZ1lUdUlzTDhoZVhRS1NCWmwtVm03OU9WY0FDSVhicll1ak1uOGtMSWs1cEpNemdqRGVuZmx3ZkZWN1dyZXpYUmRFYVBxN1JiREs3V0ZxUEFRUGlMTWx5bzJoTmJkOEVCWkdHVGFvaC1HaHliS0diQ3MwUlA?oc=5",
    "sourceIcon": "https://www.google.com/s2/favicons?domain=kemenparekraf.go.id&sz=64",
    "imageUrl": "https://images.unsplash.com/photo-1502680390469-be75c86b636f?auto=format&fit=crop&w=800&q=80",
    "tag": "Nasional",
    "tagEn": "National",
    "actionUrl": "https://news.google.com/rss/articles/CBMikAFBVV95cUxOejZ5M2VReS03N1RaQkRSa0hGVU9rZ1lUdUlzTDhoZVhRS1NCWmwtVm03OU9WY0FDSVhicll1ak1uOGtMSWs1cEpNemdqRGVuZmx3ZkZWN1dyZXpYUmRFYVBxN1JiREs3V0ZxUEFRUGlMTWx5bzJoTmJkOEVCWkdHVGFvaC1HaHliS0diQ3MwUlA?oc=5",
    "mapsUrl": "https://www.google.com/maps/search/?api=1&query=Indonesia",
    "locationName": "Kawasan Wisata Nusantara Indonesia",
    "locationNameEn": "Indonesian Archipelago Tourism Destinations",
    "description": "Kementerian Pariwisata Republik Indonesia bersama para pemangku kepentingan sektor pariwisata nasional terus menggalakkan program strategis: \"Kepulauan Seribu kembangkan wisata bebas sampah\". Kebijakan ini merupakan bagian integral dari peta jalan pariwisata berkualitas dan berkelanjutan di seluruh nusantara.\n\nMelalui penguatan kolaborasi lintas-sektor, akselerasi digitalisasi ekosistem wisata, serta diversifikasi paket perjalanan tematik, sektor pariwisata Indonesia dipacu untuk meningkatkan pergerakan wisatawan nusantara dan kunjungan wisatawan mancanegara secara inklusif.",
    "descriptionEn": "The Ministry of Tourism of the Republic of Indonesia and national travel stakeholders continue implementing strategic programs: \"Kepulauan Seribu kembangkan wisata bebas sampah\". This initiative supports the national roadmap toward high-yield, sustainable tourism development across the Indonesian archipelago.\n\nBy fostering cross-sector partnerships, advancing digital tourism ecosystems, and curating thematic travel itineraries, Indonesia's tourism industry is well-positioned to drive robust tourist footfall and inclusive economic growth.",
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
    "createdAt": "2026-11-01T13:58:00.000Z",
    "generatedAt": "2026-11-01T23:23:56.166Z",
    "generatedBy": "Malala Autonomous RSS Engine (Google News National Parekraf Feed)",
    "isAIGenerated": false
  },
  {
    "id": "hi-rss-sumbar-36166-4",
    "title": "Sekjen IAEI Sutan Emir : Sumbar Berpeluang Perkuat Pariwisata Ramah Muslim Berkelas Internasional",
    "titleEn": "West Sumatra Tourism: Sekjen IAEI Sutan Emir : Sumbar Berpeluang Perkuat Pariwisata Ramah Muslim Berkelas Internasional",
    "category": "Pariwisata Sumatera Barat",
    "categoryEn": "West Sumatra Tourism",
    "date": "1 November 2026",
    "dateEn": "November 1, 2026",
    "sourceName": "Analisakini.id",
    "sourceDomain": "sumbar.antaranews.com",
    "sourceUrl": "https://news.google.com/rss/articles/CBMieEFVX3lxTE5ocmdFTGFaZkQzNE9ZcE8zQWgwdHJnREdlVUw0SmI2RTBKaUpuMGxPV1dVMWY2UFVtbVBIalNTeHMxRU1KaTV5cHdzUFhNTUtyTDVQZGptRFJUQzZqbXk2NVR6bk9pWUJtMktJSkE1VjJOdWJ6eXJoVA?oc=5",
    "sourceIcon": "https://www.google.com/s2/favicons?domain=antaranews.com&sz=64",
    "imageUrl": "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=800&q=80",
    "tag": "Sumbar",
    "tagEn": "West Sumatra",
    "actionUrl": "https://news.google.com/rss/articles/CBMieEFVX3lxTE5ocmdFTGFaZkQzNE9ZcE8zQWgwdHJnREdlVUw0SmI2RTBKaUpuMGxPV1dVMWY2UFVtbVBIalNTeHMxRU1KaTV5cHdzUFhNTUtyTDVQZGptRFJUQzZqbXk2NVR6bk9pWUJtMktJSkE1VjJOdWJ6eXJoVA?oc=5",
    "mapsUrl": "https://www.google.com/maps/search/?api=1&query=Sumatera+Barat",
    "locationName": "Destinasi Wisata Unggulan Sumatera Barat",
    "locationNameEn": "West Sumatra Prime Tourism Destinations",
    "description": "Laporan liputan jurnalistik resmi: \"Sekjen IAEI Sutan Emir : Sumbar Berpeluang Perkuat Pariwisata Ramah Muslim Berkelas Internasional\". Pemerintah Provinsi Sumatera Barat bersama Dinas Pariwisata dan seluruh pemangku kepentingan terus mempercepat langkah strategis guna mengoptimalkan potensi wisata alam yang asri, keluhuran adat dan seni budaya Minangkabau, serta kuliner halal legendaris di berbagai kabupaten dan kota.\n\nInisiatif terpadu ini difokuskan pada peningkatan kualitas amenitas dan fasilitas umum di objek wisata, kemudahan konektivitas transportasi wisatawan, serta penguatan pelaku UMKM dan industri ekonomi kreatif lokal agar pariwisata Ranah Minang senantiasa berdaya saing tinggi dan berkelanjutan.",
    "descriptionEn": "Official news report: \"Sekjen IAEI Sutan Emir : Sumbar Berpeluang Perkuat Pariwisata Ramah Muslim Berkelas Internasional\". West Sumatra provincial authorities, the regional tourism board, and hospitality stakeholders are accelerating strategic measures to showcase authentic natural landscapes, Minangkabau cultural heritage, and legendary halal culinary traditions.\n\nThis concerted initiative focuses on upgrading tourist amenities, streamlining transport connectivity, and empowering local creative MSMEs, ensuring West Sumatra's tourism remains highly competitive, hospitable, and sustainable for both domestic and international travelers.",
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
    "createdAt": "2026-11-01T13:26:13.000Z",
    "generatedAt": "2026-11-01T23:23:56.166Z",
    "generatedBy": "Malala Autonomous RSS Engine (Google News Sumbar Feed)",
    "isAIGenerated": false
  },
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
  }
];

export const DOWNLOAD_ITEMS: DownloadItem[] = [];

