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
  },
  {
    "id": "hi-rss-nasional-37017-2",
    "title": "Kemacetan Jalan Raya Joglo Bikin Pusing, Pramono Setujui Rencana Pelebaran",
    "titleEn": "Indonesia Tourism Update: Kemacetan Jalan Raya Joglo Bikin Pusing, Pramono Setujui Rencana Pelebaran",
    "category": "Pariwisata Indonesia",
    "categoryEn": "Indonesian Tourism",
    "date": "3 November 2026",
    "dateEn": "November 3, 2026",
    "sourceName": "Koran Jakarta ®",
    "sourceDomain": "kemenparekraf.go.id",
    "sourceUrl": "https://news.google.com/rss/articles/CBMitAFBVV95cUxQaE52dWhKbWpHbC16THhBblMxMUtueVZOZV9xb1RHclBYcFNGYlRmWWNpNE1UM3pHVS1meTY4YkhGeXZOQzBlN3J1d3JkVHE0dm5tZ2h5OGpWZUZ4UlNQdDNacnFsVXpDdkduN1UyVU05dkc3QVNGR3hmbDZmVlQwOVR2Q3dHOC1fN0dXNVhPRGh2NWhlTnJUcWRXZmtBT2lCMG0xbXF1NGl5d3dXUmIza1doV2vSAbQBQVVfeXFMUGhOdnVoSm1qR2wtekx4QW5TMTFLbnlWTmVfcW9UR3JQWHBTRmJUZlljaTRNVDN6R1UtZnk2OGJIRnl2TkMwZTdydXdyZFRxNHZubWdoeThqVmVGeFJTUHQzWnJxbFV6Q3ZHbjdVMlVNOXZHN0FTRkd4Zmw2ZlZUMDlUdkN3RzgtXzdHVzVYT0RodjVoZU5yVHFkV2ZrQU9pQjBtMW1xdTRpeXd3V1JiM2tXaFdr?oc=5",
    "sourceIcon": "https://www.google.com/s2/favicons?domain=kemenparekraf.go.id&sz=64",
    "imageUrl": "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=800&q=80",
    "tag": "Nasional",
    "tagEn": "National",
    "actionUrl": "https://news.google.com/rss/articles/CBMitAFBVV95cUxQaE52dWhKbWpHbC16THhBblMxMUtueVZOZV9xb1RHclBYcFNGYlRmWWNpNE1UM3pHVS1meTY4YkhGeXZOQzBlN3J1d3JkVHE0dm5tZ2h5OGpWZUZ4UlNQdDNacnFsVXpDdkduN1UyVU05dkc3QVNGR3hmbDZmVlQwOVR2Q3dHOC1fN0dXNVhPRGh2NWhlTnJUcWRXZmtBT2lCMG0xbXF1NGl5d3dXUmIza1doV2vSAbQBQVVfeXFMUGhOdnVoSm1qR2wtekx4QW5TMTFLbnlWTmVfcW9UR3JQWHBTRmJUZlljaTRNVDN6R1UtZnk2OGJIRnl2TkMwZTdydXdyZFRxNHZubWdoeThqVmVGeFJTUHQzWnJxbFV6Q3ZHbjdVMlVNOXZHN0FTRkd4Zmw2ZlZUMDlUdkN3RzgtXzdHVzVYT0RodjVoZU5yVHFkV2ZrQU9pQjBtMW1xdTRpeXd3V1JiM2tXaFdr?oc=5",
    "mapsUrl": "https://www.google.com/maps/search/?api=1&query=Indonesia",
    "locationName": "Kawasan Wisata Nusantara Indonesia",
    "locationNameEn": "Indonesian Archipelago Tourism Destinations",
    "description": "Kementerian Pariwisata Republik Indonesia bersama para pemangku kepentingan sektor pariwisata nasional terus menggalakkan program strategis: \"Kemacetan Jalan Raya Joglo Bikin Pusing, Pramono Setujui Rencana Pelebaran\". Kebijakan ini merupakan bagian integral dari peta jalan pariwisata berkualitas dan berkelanjutan di seluruh nusantara.\n\nMelalui penguatan kolaborasi lintas-sektor, akselerasi digitalisasi ekosistem wisata, serta diversifikasi paket perjalanan tematik, sektor pariwisata Indonesia dipacu untuk meningkatkan pergerakan wisatawan nusantara dan kunjungan wisatawan mancanegara secara inklusif.",
    "descriptionEn": "The Ministry of Tourism of the Republic of Indonesia and national travel stakeholders continue implementing strategic programs: \"Kemacetan Jalan Raya Joglo Bikin Pusing, Pramono Setujui Rencana Pelebaran\". This initiative supports the national roadmap toward high-yield, sustainable tourism development across the Indonesian archipelago.\n\nBy fostering cross-sector partnerships, advancing digital tourism ecosystems, and curating thematic travel itineraries, Indonesia's tourism industry is well-positioned to drive robust tourist footfall and inclusive economic growth.",
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
    "createdAt": "2026-11-03T20:36:00.000Z",
    "generatedAt": "2026-11-04T00:23:57.017Z",
    "generatedBy": "Malala Autonomous RSS Engine (Google News National Parekraf Feed)",
    "isAIGenerated": false
  },
  {
    "id": "hi-rss-nasional-37017-3",
    "title": "Wisata Indonesia Tembus 12 Juta Wisman, Malang Raya Catat Akumulasi 13,56 Juta Kunjungan - malang.disway.id",
    "titleEn": "Indonesia Tourism Update: Wisata Indonesia Tembus 12 Juta Wisman, Malang Raya Catat Akumulasi 13,56 Juta Kunjungan - malang.disway.id",
    "category": "Pariwisata Indonesia",
    "categoryEn": "Indonesian Tourism",
    "date": "3 November 2026",
    "dateEn": "November 3, 2026",
    "sourceName": "Disway Malang",
    "sourceDomain": "kemenparekraf.go.id",
    "sourceUrl": "https://news.google.com/rss/articles/CBMi3gFBVV95cUxOYVFzd21OLXVqSDk2Y2RPOFd0eEdJdzBQa0R3Y1lhdWNweXd5U0hwRkVfNFJhMy1wa0N6d2tyYzhOSlpQbDVyWnVuUzU0MEpNMmtvRXBFZHVOM2NjWTZDUFdxTy1sNWdjWEprb2tkN2ZoWEtUdE1mT1oyQTU4SjI1eWwwbTgxRGt4WDc3cDRiSnFUT0pUM3pENEJJdHhMVXBCZHM1V0RpZnFLT05fRVczaTkyWGc5S3h4dGhMNGNPd2VZM2lMZ3ZsWUFBY1FKM3BiOHhRRWd3LWcxc2FPUGfSAb4BQVVfeXFMTmFxRmJxcFJRVWFUZVE0WUNIX0RkZ2NLRjB0Y0poXzN2QmI2N3pDR2RjdVR1TUhjMF9GNzhXUXJJWm5iRW1pN0hsX0I1RTRhU0JGR0RSOXdJVm1LQ3h1RGJwRVpETlVuc204b21BSVJHNXZ2a0Npdlk2RWFYaU10RDBSWm0zZTFydDhhRzlUa3ZObURVbjhEcTNWY1RtTlVKV1N5dlJ2ZmxTenJ1QVdJN3NlR3F0bHprVVg5Rk84UQ?oc=5",
    "sourceIcon": "https://www.google.com/s2/favicons?domain=kemenparekraf.go.id&sz=64",
    "imageUrl": "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=800&q=80",
    "tag": "Nasional",
    "tagEn": "National",
    "actionUrl": "https://news.google.com/rss/articles/CBMi3gFBVV95cUxOYVFzd21OLXVqSDk2Y2RPOFd0eEdJdzBQa0R3Y1lhdWNweXd5U0hwRkVfNFJhMy1wa0N6d2tyYzhOSlpQbDVyWnVuUzU0MEpNMmtvRXBFZHVOM2NjWTZDUFdxTy1sNWdjWEprb2tkN2ZoWEtUdE1mT1oyQTU4SjI1eWwwbTgxRGt4WDc3cDRiSnFUT0pUM3pENEJJdHhMVXBCZHM1V0RpZnFLT05fRVczaTkyWGc5S3h4dGhMNGNPd2VZM2lMZ3ZsWUFBY1FKM3BiOHhRRWd3LWcxc2FPUGfSAb4BQVVfeXFMTmFxRmJxcFJRVWFUZVE0WUNIX0RkZ2NLRjB0Y0poXzN2QmI2N3pDR2RjdVR1TUhjMF9GNzhXUXJJWm5iRW1pN0hsX0I1RTRhU0JGR0RSOXdJVm1LQ3h1RGJwRVpETlVuc204b21BSVJHNXZ2a0Npdlk2RWFYaU10RDBSWm0zZTFydDhhRzlUa3ZObURVbjhEcTNWY1RtTlVKV1N5dlJ2ZmxTenJ1QVdJN3NlR3F0bHprVVg5Rk84UQ?oc=5",
    "mapsUrl": "https://www.google.com/maps/search/?api=1&query=Indonesia",
    "locationName": "Kawasan Wisata Nusantara Indonesia",
    "locationNameEn": "Indonesian Archipelago Tourism Destinations",
    "description": "Kementerian Pariwisata Republik Indonesia bersama para pemangku kepentingan sektor pariwisata nasional terus menggalakkan program strategis: \"Wisata Indonesia Tembus 12 Juta Wisman, Malang Raya Catat Akumulasi 13,56 Juta Kunjungan - malang.disway.id\". Kebijakan ini merupakan bagian integral dari peta jalan pariwisata berkualitas dan berkelanjutan di seluruh nusantara.\n\nMelalui penguatan kolaborasi lintas-sektor, akselerasi digitalisasi ekosistem wisata, serta diversifikasi paket perjalanan tematik, sektor pariwisata Indonesia dipacu untuk meningkatkan pergerakan wisatawan nusantara dan kunjungan wisatawan mancanegara secara inklusif.",
    "descriptionEn": "The Ministry of Tourism of the Republic of Indonesia and national travel stakeholders continue implementing strategic programs: \"Wisata Indonesia Tembus 12 Juta Wisman, Malang Raya Catat Akumulasi 13,56 Juta Kunjungan - malang.disway.id\". This initiative supports the national roadmap toward high-yield, sustainable tourism development across the Indonesian archipelago.\n\nBy fostering cross-sector partnerships, advancing digital tourism ecosystems, and curating thematic travel itineraries, Indonesia's tourism industry is well-positioned to drive robust tourist footfall and inclusive economic growth.",
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
    "createdAt": "2026-11-03T17:50:29.000Z",
    "generatedAt": "2026-11-04T00:23:57.017Z",
    "generatedBy": "Malala Autonomous RSS Engine (Google News National Parekraf Feed)",
    "isAIGenerated": false
  },
  {
    "id": "hi-rss-sumbar-37016-1",
    "title": "Kemenhaj Sumbar Temukan 5 Travel Umrah tak Berizin Berangkatkan Jemaah",
    "titleEn": "West Sumatra Tourism: Kemenhaj Sumbar Temukan 5 Travel Umrah tak Berizin Berangkatkan Jemaah",
    "category": "Pariwisata Sumatera Barat",
    "categoryEn": "West Sumatra Tourism",
    "date": "3 November 2026",
    "dateEn": "November 3, 2026",
    "sourceName": "Bisnis.com",
    "sourceDomain": "sumbar.antaranews.com",
    "sourceUrl": "https://news.google.com/rss/articles/CBMiwAFBVV95cUxQcGRUN1BRVzB4cXZOek5xQ0hfcGFoal9ibGkzMGJ4Wlk2anRuckt2MFM1bDRlVWFEbTJFSGk2VEM4RTNDZ1kyTVRtNlY5QXV4X2V2enNZR3hpcVhNNjlSRk5ZZW9CakZiNmlLcWwzMnNMYkhZbnlSTzFYMDlqMERzNVRXOFhUbEtNa3Nqd2dGclhoVXpnNDNxLVlxT0F6SkwzUFJ0R0dGaV9WVG16Y3lQX05Fb1N6aEMxZUdQU1B6cUM?oc=5",
    "sourceIcon": "https://www.google.com/s2/favicons?domain=antaranews.com&sz=64",
    "imageUrl": "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=800&q=80",
    "tag": "Sumbar",
    "tagEn": "West Sumatra",
    "actionUrl": "https://news.google.com/rss/articles/CBMiwAFBVV95cUxQcGRUN1BRVzB4cXZOek5xQ0hfcGFoal9ibGkzMGJ4Wlk2anRuckt2MFM1bDRlVWFEbTJFSGk2VEM4RTNDZ1kyTVRtNlY5QXV4X2V2enNZR3hpcVhNNjlSRk5ZZW9CakZiNmlLcWwzMnNMYkhZbnlSTzFYMDlqMERzNVRXOFhUbEtNa3Nqd2dGclhoVXpnNDNxLVlxT0F6SkwzUFJ0R0dGaV9WVG16Y3lQX05Fb1N6aEMxZUdQU1B6cUM?oc=5",
    "mapsUrl": "https://www.google.com/maps/search/?api=1&query=Sumatera+Barat",
    "locationName": "Destinasi Wisata Unggulan Sumatera Barat",
    "locationNameEn": "West Sumatra Prime Tourism Destinations",
    "description": "Laporan liputan jurnalistik resmi: \"Kemenhaj Sumbar Temukan 5 Travel Umrah tak Berizin Berangkatkan Jemaah\". Pemerintah Provinsi Sumatera Barat bersama Dinas Pariwisata dan seluruh pemangku kepentingan terus mempercepat langkah strategis guna mengoptimalkan potensi wisata alam yang asri, keluhuran adat dan seni budaya Minangkabau, serta kuliner halal legendaris di berbagai kabupaten dan kota.\n\nInisiatif terpadu ini difokuskan pada peningkatan kualitas amenitas dan fasilitas umum di objek wisata, kemudahan konektivitas transportasi wisatawan, serta penguatan pelaku UMKM dan industri ekonomi kreatif lokal agar pariwisata Ranah Minang senantiasa berdaya saing tinggi dan berkelanjutan.",
    "descriptionEn": "Official news report: \"Kemenhaj Sumbar Temukan 5 Travel Umrah tak Berizin Berangkatkan Jemaah\". West Sumatra provincial authorities, the regional tourism board, and hospitality stakeholders are accelerating strategic measures to showcase authentic natural landscapes, Minangkabau cultural heritage, and legendary halal culinary traditions.\n\nThis concerted initiative focuses on upgrading tourist amenities, streamlining transport connectivity, and empowering local creative MSMEs, ensuring West Sumatra's tourism remains highly competitive, hospitable, and sustainable for both domestic and international travelers.",
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
    "createdAt": "2026-11-03T17:19:38.000Z",
    "generatedAt": "2026-11-04T00:23:57.016Z",
    "generatedBy": "Malala Autonomous RSS Engine (Google News Sumbar Feed)",
    "isAIGenerated": false
  },
  {
    "id": "hi-rss-sumbar-37016-2",
    "title": "Banjir Bandang Terjang Pandai Sikek Tanah Datar, 34 KK Terdampak",
    "titleEn": "West Sumatra Tourism: Banjir Bandang Terjang Pandai Sikek Tanah Datar, 34 KK Terdampak",
    "category": "Pariwisata Sumatera Barat",
    "categoryEn": "West Sumatra Tourism",
    "date": "3 November 2026",
    "dateEn": "November 3, 2026",
    "sourceName": "Media Indonesia",
    "sourceDomain": "sumbar.antaranews.com",
    "sourceUrl": "https://news.google.com/rss/articles/CBMiqwFBVV95cUxNNVItR3JfSzRCdjBmb2dQY3NseVVIQ3hYczM5eTdZVnVBRDZQU0RtY2xxRVJSdTZ0NU4xeHIyZm5Hdlk2YmFFUzFLaVhXcnJfY0xiZ1Axek5qZjlnTkUtR0xrNDQwVXYxY0d5WlVISkN5a01rX3YyNVNVNVFxZXJYMGQ3Uy0xa2FWX3ctV3NFTHlfZTBzMm5UVndGcTlrMl9vS1p6a1BpTVIwTGs?oc=5",
    "sourceIcon": "https://www.google.com/s2/favicons?domain=antaranews.com&sz=64",
    "imageUrl": "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=800&q=80",
    "tag": "Sumbar",
    "tagEn": "West Sumatra",
    "actionUrl": "https://news.google.com/rss/articles/CBMiqwFBVV95cUxNNVItR3JfSzRCdjBmb2dQY3NseVVIQ3hYczM5eTdZVnVBRDZQU0RtY2xxRVJSdTZ0NU4xeHIyZm5Hdlk2YmFFUzFLaVhXcnJfY0xiZ1Axek5qZjlnTkUtR0xrNDQwVXYxY0d5WlVISkN5a01rX3YyNVNVNVFxZXJYMGQ3Uy0xa2FWX3ctV3NFTHlfZTBzMm5UVndGcTlrMl9vS1p6a1BpTVIwTGs?oc=5",
    "mapsUrl": "https://www.google.com/maps/search/?api=1&query=Sumatera+Barat",
    "locationName": "Destinasi Wisata Unggulan Sumatera Barat",
    "locationNameEn": "West Sumatra Prime Tourism Destinations",
    "description": "Laporan liputan jurnalistik resmi: \"Banjir Bandang Terjang Pandai Sikek Tanah Datar, 34 KK Terdampak\". Pemerintah Provinsi Sumatera Barat bersama Dinas Pariwisata dan seluruh pemangku kepentingan terus mempercepat langkah strategis guna mengoptimalkan potensi wisata alam yang asri, keluhuran adat dan seni budaya Minangkabau, serta kuliner halal legendaris di berbagai kabupaten dan kota.\n\nInisiatif terpadu ini difokuskan pada peningkatan kualitas amenitas dan fasilitas umum di objek wisata, kemudahan konektivitas transportasi wisatawan, serta penguatan pelaku UMKM dan industri ekonomi kreatif lokal agar pariwisata Ranah Minang senantiasa berdaya saing tinggi dan berkelanjutan.",
    "descriptionEn": "Official news report: \"Banjir Bandang Terjang Pandai Sikek Tanah Datar, 34 KK Terdampak\". West Sumatra provincial authorities, the regional tourism board, and hospitality stakeholders are accelerating strategic measures to showcase authentic natural landscapes, Minangkabau cultural heritage, and legendary halal culinary traditions.\n\nThis concerted initiative focuses on upgrading tourist amenities, streamlining transport connectivity, and empowering local creative MSMEs, ensuring West Sumatra's tourism remains highly competitive, hospitable, and sustainable for both domestic and international travelers.",
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
    "createdAt": "2026-11-03T16:15:09.000Z",
    "generatedAt": "2026-11-04T00:23:57.016Z",
    "generatedBy": "Malala Autonomous RSS Engine (Google News Sumbar Feed)",
    "isAIGenerated": false
  },
  {
    "id": "hi-rss-sumbar-37016-3",
    "title": "Ditlantas Polda Sumbar Edukasi Pengemudi dan Penumpang Trans Padang",
    "titleEn": "West Sumatra Tourism: Ditlantas Polda Sumbar Edukasi Pengemudi dan Penumpang Trans Padang",
    "category": "Pariwisata Sumatera Barat",
    "categoryEn": "West Sumatra Tourism",
    "date": "3 November 2026",
    "dateEn": "November 3, 2026",
    "sourceName": "Arunala",
    "sourceDomain": "sumbar.antaranews.com",
    "sourceUrl": "https://news.google.com/rss/articles/CBMirwFBVV95cUxNVXd0Tm93SFdOcTBob3dNTXpsaHZXd2ZJOUh2Qm84Z0N6RWxoV0E3b3dHVUhsSDk0V3B6b0ZZSUxWVFhCb1JiTFVpa3JUNVg1aFAwelVrcGh4bi1ULVdxR0RXSEFNc25LWk9hLUF4NTRBbno3T0VreWVudXNrQXRuU25VcmhRMTNITkxuZmlwS2Npdm5OLXRBTFlUXzl5RV95ekJSbkNsal9VWDhHVTJV?oc=5",
    "sourceIcon": "https://www.google.com/s2/favicons?domain=antaranews.com&sz=64",
    "imageUrl": "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80",
    "tag": "Sumbar",
    "tagEn": "West Sumatra",
    "actionUrl": "https://news.google.com/rss/articles/CBMirwFBVV95cUxNVXd0Tm93SFdOcTBob3dNTXpsaHZXd2ZJOUh2Qm84Z0N6RWxoV0E3b3dHVUhsSDk0V3B6b0ZZSUxWVFhCb1JiTFVpa3JUNVg1aFAwelVrcGh4bi1ULVdxR0RXSEFNc25LWk9hLUF4NTRBbno3T0VreWVudXNrQXRuU25VcmhRMTNITkxuZmlwS2Npdm5OLXRBTFlUXzl5RV95ekJSbkNsal9VWDhHVTJV?oc=5",
    "mapsUrl": "https://www.google.com/maps/search/?api=1&query=Kota+Padang",
    "locationName": "Kota Padang & Bandara Internasional Minangkabau",
    "locationNameEn": "Padang & Minangkabau International Airport",
    "description": "Laporan liputan jurnalistik resmi: \"Ditlantas Polda Sumbar Edukasi Pengemudi dan Penumpang Trans Padang\". Pemerintah Provinsi Sumatera Barat bersama Dinas Pariwisata dan seluruh pemangku kepentingan terus mempercepat langkah strategis guna mengoptimalkan potensi wisata alam yang asri, keluhuran adat dan seni budaya Minangkabau, serta kuliner halal legendaris di berbagai kabupaten dan kota.\n\nInisiatif terpadu ini difokuskan pada peningkatan kualitas amenitas dan fasilitas umum di objek wisata, kemudahan konektivitas transportasi wisatawan, serta penguatan pelaku UMKM dan industri ekonomi kreatif lokal agar pariwisata Ranah Minang senantiasa berdaya saing tinggi dan berkelanjutan.",
    "descriptionEn": "Official news report: \"Ditlantas Polda Sumbar Edukasi Pengemudi dan Penumpang Trans Padang\". West Sumatra provincial authorities, the regional tourism board, and hospitality stakeholders are accelerating strategic measures to showcase authentic natural landscapes, Minangkabau cultural heritage, and legendary halal culinary traditions.\n\nThis concerted initiative focuses on upgrading tourist amenities, streamlining transport connectivity, and empowering local creative MSMEs, ensuring West Sumatra's tourism remains highly competitive, hospitable, and sustainable for both domestic and international travelers.",
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
    "createdAt": "2026-11-03T13:40:00.000Z",
    "generatedAt": "2026-11-04T00:23:57.016Z",
    "generatedBy": "Malala Autonomous RSS Engine (Google News Sumbar Feed)",
    "isAIGenerated": false
  },
  {
    "id": "hi-rss-sumbar-37016-4",
    "title": "5 Perusahaan Travel Umrah di Sumbar Tak Berizin Berangkatkan Jemaah, Ini Nama-Namanya",
    "titleEn": "West Sumatra Tourism: 5 Perusahaan Travel Umrah di Sumbar Tak Berizin Berangkatkan Jemaah, Ini Nama-Namanya",
    "category": "Pariwisata Sumatera Barat",
    "categoryEn": "West Sumatra Tourism",
    "date": "3 November 2026",
    "dateEn": "November 3, 2026",
    "sourceName": "Sumbarkita.id",
    "sourceDomain": "sumbar.antaranews.com",
    "sourceUrl": "https://news.google.com/rss/articles/CBMiqwFBVV95cUxOaUk0ZGgwNXo3MDdxTGJkS0RSdlhZYkJoVG5Cc0RpOEhZZkFoOUlxV1hNTVZQYmtsMjU2U0pTRWxIWEFLN09lOEc1SERBM1RpRUxOeW9mYUx6VTF6OUJuNW9Ec3UxQjFaZmhjdEoydVh1ZGM0VTd2VjhSYmdfd1dlXy12N0g1c3JLcGNHTXhxUmkzMGtxRHpVcWY0Vy1qVFlvMXk1LW45V1pFVnM?oc=5",
    "sourceIcon": "https://www.google.com/s2/favicons?domain=antaranews.com&sz=64",
    "imageUrl": "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=800&q=80",
    "tag": "Sumbar",
    "tagEn": "West Sumatra",
    "actionUrl": "https://news.google.com/rss/articles/CBMiqwFBVV95cUxOaUk0ZGgwNXo3MDdxTGJkS0RSdlhZYkJoVG5Cc0RpOEhZZkFoOUlxV1hNTVZQYmtsMjU2U0pTRWxIWEFLN09lOEc1SERBM1RpRUxOeW9mYUx6VTF6OUJuNW9Ec3UxQjFaZmhjdEoydVh1ZGM0VTd2VjhSYmdfd1dlXy12N0g1c3JLcGNHTXhxUmkzMGtxRHpVcWY0Vy1qVFlvMXk1LW45V1pFVnM?oc=5",
    "mapsUrl": "https://www.google.com/maps/search/?api=1&query=Sumatera+Barat",
    "locationName": "Destinasi Wisata Unggulan Sumatera Barat",
    "locationNameEn": "West Sumatra Prime Tourism Destinations",
    "description": "Laporan liputan jurnalistik resmi: \"5 Perusahaan Travel Umrah di Sumbar Tak Berizin Berangkatkan Jemaah, Ini Nama-Namanya\". Pemerintah Provinsi Sumatera Barat bersama Dinas Pariwisata dan seluruh pemangku kepentingan terus mempercepat langkah strategis guna mengoptimalkan potensi wisata alam yang asri, keluhuran adat dan seni budaya Minangkabau, serta kuliner halal legendaris di berbagai kabupaten dan kota.\n\nInisiatif terpadu ini difokuskan pada peningkatan kualitas amenitas dan fasilitas umum di objek wisata, kemudahan konektivitas transportasi wisatawan, serta penguatan pelaku UMKM dan industri ekonomi kreatif lokal agar pariwisata Ranah Minang senantiasa berdaya saing tinggi dan berkelanjutan.",
    "descriptionEn": "Official news report: \"5 Perusahaan Travel Umrah di Sumbar Tak Berizin Berangkatkan Jemaah, Ini Nama-Namanya\". West Sumatra provincial authorities, the regional tourism board, and hospitality stakeholders are accelerating strategic measures to showcase authentic natural landscapes, Minangkabau cultural heritage, and legendary halal culinary traditions.\n\nThis concerted initiative focuses on upgrading tourist amenities, streamlining transport connectivity, and empowering local creative MSMEs, ensuring West Sumatra's tourism remains highly competitive, hospitable, and sustainable for both domestic and international travelers.",
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
    "createdAt": "2026-11-03T13:32:47.000Z",
    "generatedAt": "2026-11-04T00:23:57.016Z",
    "generatedBy": "Malala Autonomous RSS Engine (Google News Sumbar Feed)",
    "isAIGenerated": false
  },
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
  }
];

export const DOWNLOAD_ITEMS: DownloadItem[] = [];

