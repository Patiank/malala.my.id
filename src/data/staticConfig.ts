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
  },
  {
    "id": "hi-rss-sumbar-59357-4",
    "title": "Penumpang KA Lembah Anai Melonjak, Tembus 261 Ribu Orang hingga September 2026",
    "titleEn": "West Sumatra Tourism: Penumpang KA Lembah Anai Melonjak, Tembus 261 Ribu Orang hingga September 2026",
    "category": "Pariwisata Sumatera Barat",
    "categoryEn": "West Sumatra Tourism",
    "date": "30 Oktober 2026",
    "dateEn": "October 30, 2026",
    "sourceName": "Langgam.id",
    "sourceDomain": "sumbar.antaranews.com",
    "sourceUrl": "https://news.google.com/rss/articles/CBMingFBVV95cUxOZXAyRVplTFF6aTNOY2l2aDdVcWNGVFQxVjhxeXYtUEJmZ2drWjNFbU1iUDFwMTdrYWZKRndnVm5lN0s0eW9HUm52RS03UEVqY2lZdUlKOFdBOVBJaXBteGtXYmFWTUNFSUF2YmFzdnM3NDNyeGR4MVVCVVJ1ZXQ3bUdvRVBMZ0NxM0NPQlM0UDhvOE4waVJ0QU5paTFHZw?oc=5",
    "sourceIcon": "https://www.google.com/s2/favicons?domain=antaranews.com&sz=64",
    "imageUrl": "https://images.unsplash.com/photo-1527668752968-14dc70a27c95?auto=format&fit=crop&w=800&q=80",
    "tag": "Sumbar",
    "tagEn": "West Sumatra",
    "actionUrl": "https://news.google.com/rss/articles/CBMingFBVV95cUxOZXAyRVplTFF6aTNOY2l2aDdVcWNGVFQxVjhxeXYtUEJmZ2drWjNFbU1iUDFwMTdrYWZKRndnVm5lN0s0eW9HUm52RS03UEVqY2lZdUlKOFdBOVBJaXBteGtXYmFWTUNFSUF2YmFzdnM3NDNyeGR4MVVCVVJ1ZXQ3bUdvRVBMZ0NxM0NPQlM0UDhvOE4waVJ0QU5paTFHZw?oc=5",
    "mapsUrl": "https://www.google.com/maps/search/?api=1&query=Lembah+Anai",
    "locationName": "Koridor Kereta Api Wisata & Lembah Anai",
    "locationNameEn": "Heritage Rail Corridor & Lembah Anai",
    "description": "Laporan liputan jurnalistik resmi: \"Penumpang KA Lembah Anai Melonjak, Tembus 261 Ribu Orang hingga September 2026\". Pemerintah Provinsi Sumatera Barat bersama Dinas Pariwisata dan seluruh pemangku kepentingan terus mempercepat langkah strategis guna mengoptimalkan potensi wisata alam yang asri, keluhuran adat dan seni budaya Minangkabau, serta kuliner halal legendaris di berbagai kabupaten dan kota.\n\nInisiatif terpadu ini difokuskan pada peningkatan kualitas amenitas dan fasilitas umum di objek wisata, kemudahan konektivitas transportasi wisatawan, serta penguatan pelaku UMKM dan industri ekonomi kreatif lokal agar pariwisata Ranah Minang senantiasa berdaya saing tinggi dan berkelanjutan.",
    "descriptionEn": "Official news report: \"Penumpang KA Lembah Anai Melonjak, Tembus 261 Ribu Orang hingga September 2026\". West Sumatra provincial authorities, the regional tourism board, and hospitality stakeholders are accelerating strategic measures to showcase authentic natural landscapes, Minangkabau cultural heritage, and legendary halal culinary traditions.\n\nThis concerted initiative focuses on upgrading tourist amenities, streamlining transport connectivity, and empowering local creative MSMEs, ensuring West Sumatra's tourism remains highly competitive, hospitable, and sustainable for both domestic and international travelers.",
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
    "createdAt": "2026-10-30T05:02:00.000Z",
    "generatedAt": "2026-10-31T00:45:59.357Z",
    "generatedBy": "Malala Autonomous RSS Engine (Google News Sumbar Feed)",
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
    "id": "hi-rss-sumbar-62402-2",
    "title": "Proyek Revitalisasi PDIKM dan Aviari Rp480 Juta Terlambat, Ini Kata Kadis Pariwisata.",
    "titleEn": "West Sumatra Tourism: Proyek Revitalisasi PDIKM dan Aviari Rp480 Juta Terlambat, Ini Kata Kadis Pariwisata.",
    "category": "Pariwisata Sumatera Barat",
    "categoryEn": "West Sumatra Tourism",
    "date": "30 Oktober 2026",
    "dateEn": "October 30, 2026",
    "sourceName": "Go Parlement",
    "sourceDomain": "sumbar.antaranews.com",
    "sourceUrl": "https://news.google.com/rss/articles/CBMigwFBVV95cUxPVERNTS1pVGt1bi1UOWNTaVY1akVqOUJxY2hxV2ZhTUZ6UFlxUzdwWUZySEhLb0hNTC1qSlhUOVlJWjBBNDBseVZGQ29wRE5jNVlOeVRwSl9zWFpoek13TWRfWEEteVNfd2lPd00tTklWdTJ1V2VUb1lib3RxLV9kRnoxaw?oc=5",
    "sourceIcon": "https://www.google.com/s2/favicons?domain=antaranews.com&sz=64",
    "imageUrl": "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=800&q=80",
    "tag": "Sumbar",
    "tagEn": "West Sumatra",
    "actionUrl": "https://news.google.com/rss/articles/CBMigwFBVV95cUxPVERNTS1pVGt1bi1UOWNTaVY1akVqOUJxY2hxV2ZhTUZ6UFlxUzdwWUZySEhLb0hNTC1qSlhUOVlJWjBBNDBseVZGQ29wRE5jNVlOeVRwSl9zWFpoek13TWRfWEEteVNfd2lPd00tTklWdTJ1V2VUb1lib3RxLV9kRnoxaw?oc=5",
    "mapsUrl": "https://www.google.com/maps/search/?api=1&query=Sumatera+Barat",
    "locationName": "Destinasi Wisata Unggulan Sumatera Barat",
    "locationNameEn": "West Sumatra Prime Tourism Destinations",
    "description": "Laporan liputan jurnalistik resmi: \"Proyek Revitalisasi PDIKM dan Aviari Rp480 Juta Terlambat, Ini Kata Kadis Pariwisata.\". Pemerintah Provinsi Sumatera Barat bersama Dinas Pariwisata dan seluruh pemangku kepentingan terus mempercepat langkah strategis guna mengoptimalkan potensi wisata alam yang asri, keluhuran adat dan seni budaya Minangkabau, serta kuliner halal legendaris di berbagai kabupaten dan kota.\n\nInisiatif terpadu ini difokuskan pada peningkatan kualitas amenitas dan fasilitas umum di objek wisata, kemudahan konektivitas transportasi wisatawan, serta penguatan pelaku UMKM dan industri ekonomi kreatif lokal agar pariwisata Ranah Minang senantiasa berdaya saing tinggi dan berkelanjutan.",
    "descriptionEn": "Official news report: \"Proyek Revitalisasi PDIKM dan Aviari Rp480 Juta Terlambat, Ini Kata Kadis Pariwisata.\". West Sumatra provincial authorities, the regional tourism board, and hospitality stakeholders are accelerating strategic measures to showcase authentic natural landscapes, Minangkabau cultural heritage, and legendary halal culinary traditions.\n\nThis concerted initiative focuses on upgrading tourist amenities, streamlining transport connectivity, and empowering local creative MSMEs, ensuring West Sumatra's tourism remains highly competitive, hospitable, and sustainable for both domestic and international travelers.",
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
    "createdAt": "2026-10-30T12:08:00.000Z",
    "generatedAt": "2026-10-31T00:44:22.402Z",
    "generatedBy": "Malala Autonomous RSS Engine (Google News Sumbar Feed)",
    "isAIGenerated": false
  },
  {
    "id": "hi-rss-sumbar-62402-3",
    "title": "Matangkan Pelantikan, DPD IKBA Universitas Bung Hatta Sumbar Gelar Rapat Perdana",
    "titleEn": "West Sumatra Tourism: Matangkan Pelantikan, DPD IKBA Universitas Bung Hatta Sumbar Gelar Rapat Perdana",
    "category": "Pariwisata Sumatera Barat",
    "categoryEn": "West Sumatra Tourism",
    "date": "30 Oktober 2026",
    "dateEn": "October 30, 2026",
    "sourceName": "Arunala",
    "sourceDomain": "sumbar.antaranews.com",
    "sourceUrl": "https://news.google.com/rss/articles/CBMivwFBVV95cUxQdTlWSGdsaFF2UklRd3p5ZUczVTQ4T3pFVmxNZjNock5vbVMtdW1CSmJYanZidnZUelBEMkZpS1pQSE9DbXpES3Y4X1lpNTd5VnJySk9PR2RYLUxiOWVRWTJhazhrbzZqcERHRDdBNUhYbWo3cUJzZE84enhvOHljQzN1Ym9IRUR4T3p2M0tEUUFQNWZlTzhkSF96bEpSUXpVdHY3Uzh6ZmhENXpTQlhRaG5pZWRiVW1jWGUzU1dTOA?oc=5",
    "sourceIcon": "https://www.google.com/s2/favicons?domain=antaranews.com&sz=64",
    "imageUrl": "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=800&q=80",
    "tag": "Sumbar",
    "tagEn": "West Sumatra",
    "actionUrl": "https://news.google.com/rss/articles/CBMivwFBVV95cUxQdTlWSGdsaFF2UklRd3p5ZUczVTQ4T3pFVmxNZjNock5vbVMtdW1CSmJYanZidnZUelBEMkZpS1pQSE9DbXpES3Y4X1lpNTd5VnJySk9PR2RYLUxiOWVRWTJhazhrbzZqcERHRDdBNUhYbWo3cUJzZE84enhvOHljQzN1Ym9IRUR4T3p2M0tEUUFQNWZlTzhkSF96bEpSUXpVdHY3Uzh6ZmhENXpTQlhRaG5pZWRiVW1jWGUzU1dTOA?oc=5",
    "mapsUrl": "https://www.google.com/maps/search/?api=1&query=Sumatera+Barat",
    "locationName": "Destinasi Wisata Unggulan Sumatera Barat",
    "locationNameEn": "West Sumatra Prime Tourism Destinations",
    "description": "Laporan liputan jurnalistik resmi: \"Matangkan Pelantikan, DPD IKBA Universitas Bung Hatta Sumbar Gelar Rapat Perdana\". Pemerintah Provinsi Sumatera Barat bersama Dinas Pariwisata dan seluruh pemangku kepentingan terus mempercepat langkah strategis guna mengoptimalkan potensi wisata alam yang asri, keluhuran adat dan seni budaya Minangkabau, serta kuliner halal legendaris di berbagai kabupaten dan kota.\n\nInisiatif terpadu ini difokuskan pada peningkatan kualitas amenitas dan fasilitas umum di objek wisata, kemudahan konektivitas transportasi wisatawan, serta penguatan pelaku UMKM dan industri ekonomi kreatif lokal agar pariwisata Ranah Minang senantiasa berdaya saing tinggi dan berkelanjutan.",
    "descriptionEn": "Official news report: \"Matangkan Pelantikan, DPD IKBA Universitas Bung Hatta Sumbar Gelar Rapat Perdana\". West Sumatra provincial authorities, the regional tourism board, and hospitality stakeholders are accelerating strategic measures to showcase authentic natural landscapes, Minangkabau cultural heritage, and legendary halal culinary traditions.\n\nThis concerted initiative focuses on upgrading tourist amenities, streamlining transport connectivity, and empowering local creative MSMEs, ensuring West Sumatra's tourism remains highly competitive, hospitable, and sustainable for both domestic and international travelers.",
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
    "createdAt": "2026-10-30T10:44:00.000Z",
    "generatedAt": "2026-10-31T00:44:22.402Z",
    "generatedBy": "Malala Autonomous RSS Engine (Google News Sumbar Feed)",
    "isAIGenerated": false
  },
  {
    "id": "hi-rss-sumbar-62402-4",
    "title": "Ketika Bencana Mengubah Pilihan Wisatawan: Tantangan Baru Pariwisata Sumate",
    "titleEn": "West Sumatra Tourism: Ketika Bencana Mengubah Pilihan Wisatawan: Tantangan Baru Pariwisata Sumate",
    "category": "Pariwisata Sumatera Barat",
    "categoryEn": "West Sumatra Tourism",
    "date": "30 Oktober 2026",
    "dateEn": "October 30, 2026",
    "sourceName": "Kompasiana.com",
    "sourceDomain": "sumbar.antaranews.com",
    "sourceUrl": "https://news.google.com/rss/articles/CBMi1gFBVV95cUxOZHVWMFM2aFpyYUZPa2JtWm8zZ0ZSMUhSUHJxSkk1U0FqeW5LbVllYjJsREhMS2Jqa2lHcFp1SjdMU0N6R2tFSHY0ZnJ4QkFnZVlHQ3drdWtBR1lMMVNQeUgyUTE3d3EwbnlVTDlWRVE2MDdyRFRyRGhTZ0xVbGJKMEhjTTFfUDY3U1JEOHZLTTZoaDROMkZpcjR2OUJtc2gta2dmX1JHNC1qcmx1cXlkS3pscDNpaWU4ck44czc1Q1UtY3hrcFF3SEVDMVVLUjd0OEttS1NR?oc=5",
    "sourceIcon": "https://www.google.com/s2/favicons?domain=antaranews.com&sz=64",
    "imageUrl": "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=800&q=80",
    "tag": "Sumbar",
    "tagEn": "West Sumatra",
    "actionUrl": "https://news.google.com/rss/articles/CBMi1gFBVV95cUxOZHVWMFM2aFpyYUZPa2JtWm8zZ0ZSMUhSUHJxSkk1U0FqeW5LbVllYjJsREhMS2Jqa2lHcFp1SjdMU0N6R2tFSHY0ZnJ4QkFnZVlHQ3drdWtBR1lMMVNQeUgyUTE3d3EwbnlVTDlWRVE2MDdyRFRyRGhTZ0xVbGJKMEhjTTFfUDY3U1JEOHZLTTZoaDROMkZpcjR2OUJtc2gta2dmX1JHNC1qcmx1cXlkS3pscDNpaWU4ck44czc1Q1UtY3hrcFF3SEVDMVVLUjd0OEttS1NR?oc=5",
    "mapsUrl": "https://www.google.com/maps/search/?api=1&query=Sumatera+Barat",
    "locationName": "Destinasi Wisata Unggulan Sumatera Barat",
    "locationNameEn": "West Sumatra Prime Tourism Destinations",
    "description": "Laporan liputan jurnalistik resmi: \"Ketika Bencana Mengubah Pilihan Wisatawan: Tantangan Baru Pariwisata Sumate\". Pemerintah Provinsi Sumatera Barat bersama Dinas Pariwisata dan seluruh pemangku kepentingan terus mempercepat langkah strategis guna mengoptimalkan potensi wisata alam yang asri, keluhuran adat dan seni budaya Minangkabau, serta kuliner halal legendaris di berbagai kabupaten dan kota.\n\nInisiatif terpadu ini difokuskan pada peningkatan kualitas amenitas dan fasilitas umum di objek wisata, kemudahan konektivitas transportasi wisatawan, serta penguatan pelaku UMKM dan industri ekonomi kreatif lokal agar pariwisata Ranah Minang senantiasa berdaya saing tinggi dan berkelanjutan.",
    "descriptionEn": "Official news report: \"Ketika Bencana Mengubah Pilihan Wisatawan: Tantangan Baru Pariwisata Sumate\". West Sumatra provincial authorities, the regional tourism board, and hospitality stakeholders are accelerating strategic measures to showcase authentic natural landscapes, Minangkabau cultural heritage, and legendary halal culinary traditions.\n\nThis concerted initiative focuses on upgrading tourist amenities, streamlining transport connectivity, and empowering local creative MSMEs, ensuring West Sumatra's tourism remains highly competitive, hospitable, and sustainable for both domestic and international travelers.",
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
    "createdAt": "2026-10-30T06:19:09.000Z",
    "generatedAt": "2026-10-31T00:44:22.402Z",
    "generatedBy": "Malala Autonomous RSS Engine (Google News Sumbar Feed)",
    "isAIGenerated": false
  },
  {
    "id": "hi-rss-sumbar-64070-1",
    "title": "Pemprov Sumbar Dorong Pesantren Kembangkan UMKM Syariah dan Pariwisata Halal",
    "titleEn": "West Sumatra Tourism: Pemprov Sumbar Dorong Pesantren Kembangkan UMKM Syariah dan Pariwisata Halal",
    "category": "Pariwisata Sumatera Barat",
    "categoryEn": "West Sumatra Tourism",
    "date": "28 Oktober 2026",
    "dateEn": "October 28, 2026",
    "sourceName": "InfoPublik",
    "sourceDomain": "sumbar.antaranews.com",
    "sourceUrl": "https://news.google.com/rss/articles/CBMiwgFBVV95cUxNanYwc2I4VzA5eF93YXVPdE1RcHYwcWdjSTNQYUlxSDlLbWlHNHFBZ1NnbnZUUVlwYXFwX1l4SGJ6bHRkcWU3dm56S2VFenRFVDJ4TFRpaXhvR0VHQnUzTWlRVmNSWTFIMF9XS1RPbGI0aUx2VTR4Y3JNLXQ5dFFhUk9oZnRnelU0OWRPZklVaGRLQTk4MEFud2VsV2tYbG11dGhYNUZ1Z2g3b2Z1dFFBTEFtbE9FMGVXV1ZRWVVqYUE2UQ?oc=5",
    "sourceIcon": "https://www.google.com/s2/favicons?domain=antaranews.com&sz=64",
    "imageUrl": "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=800&q=80",
    "tag": "Sumbar",
    "tagEn": "West Sumatra",
    "actionUrl": "https://news.google.com/rss/articles/CBMiwgFBVV95cUxNanYwc2I4VzA5eF93YXVPdE1RcHYwcWdjSTNQYUlxSDlLbWlHNHFBZ1NnbnZUUVlwYXFwX1l4SGJ6bHRkcWU3dm56S2VFenRFVDJ4TFRpaXhvR0VHQnUzTWlRVmNSWTFIMF9XS1RPbGI0aUx2VTR4Y3JNLXQ5dFFhUk9oZnRnelU0OWRPZklVaGRLQTk4MEFud2VsV2tYbG11dGhYNUZ1Z2g3b2Z1dFFBTEFtbE9FMGVXV1ZRWVVqYUE2UQ?oc=5",
    "mapsUrl": "https://www.google.com/maps/search/?api=1&query=Sumatera+Barat",
    "locationName": "Destinasi Wisata Unggulan Sumatera Barat",
    "locationNameEn": "West Sumatra Prime Tourism Destinations",
    "description": "Laporan liputan jurnalistik resmi: \"Pemprov Sumbar Dorong Pesantren Kembangkan UMKM Syariah dan Pariwisata Halal\". Pemerintah Provinsi Sumatera Barat bersama Dinas Pariwisata dan seluruh pemangku kepentingan terus mempercepat langkah strategis guna mengoptimalkan potensi wisata alam yang asri, keluhuran adat dan seni budaya Minangkabau, serta kuliner halal legendaris di berbagai kabupaten dan kota.\n\nInisiatif terpadu ini difokuskan pada peningkatan kualitas amenitas dan fasilitas umum di objek wisata, kemudahan konektivitas transportasi wisatawan, serta penguatan pelaku UMKM dan industri ekonomi kreatif lokal agar pariwisata Ranah Minang senantiasa berdaya saing tinggi dan berkelanjutan.",
    "descriptionEn": "Official news report: \"Pemprov Sumbar Dorong Pesantren Kembangkan UMKM Syariah dan Pariwisata Halal\". West Sumatra provincial authorities, the regional tourism board, and hospitality stakeholders are accelerating strategic measures to showcase authentic natural landscapes, Minangkabau cultural heritage, and legendary halal culinary traditions.\n\nThis concerted initiative focuses on upgrading tourist amenities, streamlining transport connectivity, and empowering local creative MSMEs, ensuring West Sumatra's tourism remains highly competitive, hospitable, and sustainable for both domestic and international travelers.",
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
    "createdAt": "2026-10-28T16:30:00.000Z",
    "generatedAt": "2026-10-31T00:42:44.070Z",
    "generatedBy": "Malala Autonomous RSS Engine (Google News Sumbar Feed)",
    "isAIGenerated": false
  },
  {
    "id": "hi-rss-sumbar-64070-2",
    "title": "Pesisir Selatan Bukan Sekadar Daerah Pesisir, tetapi Masa Depan Ekonomi Sumatera Barat",
    "titleEn": "West Sumatra Tourism: Pesisir Selatan Bukan Sekadar Daerah Pesisir, tetapi Masa Depan Ekonomi Sumatera Barat",
    "category": "Pariwisata Sumatera Barat",
    "categoryEn": "West Sumatra Tourism",
    "date": "29 Oktober 2026",
    "dateEn": "October 29, 2026",
    "sourceName": "Pemerintah Kabupaten Pesisir Selatan",
    "sourceDomain": "sumbar.antaranews.com",
    "sourceUrl": "https://news.google.com/rss/articles/CBMiwgFBVV95cUxPd1Zkeml6MXJwMzJwU3pzeEpGMFliTUpYX3hEXzBpSDhJRzFLVGVhZmkwTTlzWmdMTl91U19hRFpLdGZGU3dnN0xDVDFmaHpXa1JiMXRpT1pZZGhVUmJJcHAtckZ1UVp3RlVhTHpoYjZ4SEFUNUwtMHpsN01sb1NYYUp4ZW81NjE2QVVCVnp4a1BrWkNXNllURks3VkU2a0NsWXpZSzY1dmN2VTVmYk1FYnhkVy1GTHU4aDF4X2pNcW8xZw?oc=5",
    "sourceIcon": "https://www.google.com/s2/favicons?domain=antaranews.com&sz=64",
    "imageUrl": "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=800&q=80",
    "tag": "Sumbar",
    "tagEn": "West Sumatra",
    "actionUrl": "https://news.google.com/rss/articles/CBMiwgFBVV95cUxPd1Zkeml6MXJwMzJwU3pzeEpGMFliTUpYX3hEXzBpSDhJRzFLVGVhZmkwTTlzWmdMTl91U19hRFpLdGZGU3dnN0xDVDFmaHpXa1JiMXRpT1pZZGhVUmJJcHAtckZ1UVp3RlVhTHpoYjZ4SEFUNUwtMHpsN01sb1NYYUp4ZW81NjE2QVVCVnp4a1BrWkNXNllURks3VkU2a0NsWXpZSzY1dmN2VTVmYk1FYnhkVy1GTHU4aDF4X2pNcW8xZw?oc=5",
    "mapsUrl": "https://www.google.com/maps/search/?api=1&query=Kawasan+Wisata+Mandeh",
    "locationName": "Kawasan Wisata Bahari Mandeh, Pesisir Selatan",
    "locationNameEn": "Mandeh Marine Tourism, Pesisir Selatan",
    "description": "Laporan liputan jurnalistik resmi: \"Pesisir Selatan Bukan Sekadar Daerah Pesisir, tetapi Masa Depan Ekonomi Sumatera Barat\". Pemerintah Provinsi Sumatera Barat bersama Dinas Pariwisata dan seluruh pemangku kepentingan terus mempercepat langkah strategis guna mengoptimalkan potensi wisata alam yang asri, keluhuran adat dan seni budaya Minangkabau, serta kuliner halal legendaris di berbagai kabupaten dan kota.\n\nInisiatif terpadu ini difokuskan pada peningkatan kualitas amenitas dan fasilitas umum di objek wisata, kemudahan konektivitas transportasi wisatawan, serta penguatan pelaku UMKM dan industri ekonomi kreatif lokal agar pariwisata Ranah Minang senantiasa berdaya saing tinggi dan berkelanjutan.",
    "descriptionEn": "Official news report: \"Pesisir Selatan Bukan Sekadar Daerah Pesisir, tetapi Masa Depan Ekonomi Sumatera Barat\". West Sumatra provincial authorities, the regional tourism board, and hospitality stakeholders are accelerating strategic measures to showcase authentic natural landscapes, Minangkabau cultural heritage, and legendary halal culinary traditions.\n\nThis concerted initiative focuses on upgrading tourist amenities, streamlining transport connectivity, and empowering local creative MSMEs, ensuring West Sumatra's tourism remains highly competitive, hospitable, and sustainable for both domestic and international travelers.",
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
    "createdAt": "2026-10-29T03:33:35.000Z",
    "generatedAt": "2026-10-31T00:42:44.070Z",
    "generatedBy": "Malala Autonomous RSS Engine (Google News Sumbar Feed)",
    "isAIGenerated": false
  },
  {
    "id": "hi-rss-sumbar-64070-3",
    "title": "Minang Geopark Run 2026: Ajang Olahraga dan Promosi Pariwisata Sumatera Barat",
    "titleEn": "West Sumatra Tourism: Minang Geopark Run 2026: Ajang Olahraga dan Promosi Pariwisata Sumatera Barat",
    "category": "Pariwisata Sumatera Barat",
    "categoryEn": "West Sumatra Tourism",
    "date": "26 Oktober 2026",
    "dateEn": "October 26, 2026",
    "sourceName": "RRI.co.id",
    "sourceDomain": "sumbar.antaranews.com",
    "sourceUrl": "https://news.google.com/rss/articles/CBMivgFBVV95cUxNZHd4RDZra2cyODI3bTBnV043VVctYWt5QjZrLUtLdXdJaGJmQzRCbjVuVk1kLXJKWXQ2c0o1cnRhY25ld0JnT2k2TC1wa3VBbjZlT08xbzdPMWpjTFI2QkZnaG5uSFNNRDRxV3ZYa09LNVg3em1lVVgxalJUbXM0eTN2c3Z0LWlaYk1tamJiREtXM2QtNG01Slg5QnlNd0YtWGJZVFA0UnZXZlN1aF9TdmlvcVhHaXFyc2NDNUd3?oc=5",
    "sourceIcon": "https://www.google.com/s2/favicons?domain=antaranews.com&sz=64",
    "imageUrl": "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=800&q=80",
    "tag": "Sumbar",
    "tagEn": "West Sumatra",
    "actionUrl": "https://news.google.com/rss/articles/CBMivgFBVV95cUxNZHd4RDZra2cyODI3bTBnV043VVctYWt5QjZrLUtLdXdJaGJmQzRCbjVuVk1kLXJKWXQ2c0o1cnRhY25ld0JnT2k2TC1wa3VBbjZlT08xbzdPMWpjTFI2QkZnaG5uSFNNRDRxV3ZYa09LNVg3em1lVVgxalJUbXM0eTN2c3Z0LWlaYk1tamJiREtXM2QtNG01Slg5QnlNd0YtWGJZVFA0UnZXZlN1aF9TdmlvcVhHaXFyc2NDNUd3?oc=5",
    "mapsUrl": "https://www.google.com/maps/search/?api=1&query=Sumatera+Barat",
    "locationName": "Destinasi Wisata Unggulan Sumatera Barat",
    "locationNameEn": "West Sumatra Prime Tourism Destinations",
    "description": "Laporan liputan jurnalistik resmi: \"Minang Geopark Run 2026: Ajang Olahraga dan Promosi Pariwisata Sumatera Barat\". Pemerintah Provinsi Sumatera Barat bersama Dinas Pariwisata dan seluruh pemangku kepentingan terus mempercepat langkah strategis guna mengoptimalkan potensi wisata alam yang asri, keluhuran adat dan seni budaya Minangkabau, serta kuliner halal legendaris di berbagai kabupaten dan kota.\n\nInisiatif terpadu ini difokuskan pada peningkatan kualitas amenitas dan fasilitas umum di objek wisata, kemudahan konektivitas transportasi wisatawan, serta penguatan pelaku UMKM dan industri ekonomi kreatif lokal agar pariwisata Ranah Minang senantiasa berdaya saing tinggi dan berkelanjutan.",
    "descriptionEn": "Official news report: \"Minang Geopark Run 2026: Ajang Olahraga dan Promosi Pariwisata Sumatera Barat\". West Sumatra provincial authorities, the regional tourism board, and hospitality stakeholders are accelerating strategic measures to showcase authentic natural landscapes, Minangkabau cultural heritage, and legendary halal culinary traditions.\n\nThis concerted initiative focuses on upgrading tourist amenities, streamlining transport connectivity, and empowering local creative MSMEs, ensuring West Sumatra's tourism remains highly competitive, hospitable, and sustainable for both domestic and international travelers.",
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
    "createdAt": "2026-10-26T12:20:00.000Z",
    "generatedAt": "2026-10-31T00:42:44.071Z",
    "generatedBy": "Malala Autonomous RSS Engine (Google News Sumbar Feed)",
    "isAIGenerated": false
  }
];

export const DOWNLOAD_ITEMS: DownloadItem[] = [];

