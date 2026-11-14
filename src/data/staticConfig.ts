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
    "id": "hi-rss-nasional-21139-1",
    "title": "Pemkab Luwu Timur Gandeng BI Kembangkan Potensi Wisata Danau Matano",
    "titleEn": "Indonesia Tourism Update: Pemkab Luwu Timur Gandeng BI Kembangkan Potensi Wisata Danau Matano",
    "category": "Pariwisata Indonesia",
    "categoryEn": "Indonesian Tourism",
    "date": "14 November 2026",
    "dateEn": "November 14, 2026",
    "sourceName": "Tekape.co -",
    "sourceDomain": "kemenparekraf.go.id",
    "sourceUrl": "https://news.google.com/rss/articles/CBMijwFBVV95cUxQRGdNOEFpVEphYl9VaEtuNFoyUWVmcWQwSUQyVW1kdmxyVTk3MGRHYlRUdFBsM3lFSDQtY3M5ekhhVW5mUUVKa2NWby12RjR4TElWNG14M01KX1c2djY3Z2tBdlVZV3VYbkpOQmVKWkZyQ21SNDdPMG9ncVMtUndaWml3LUZzOHJGOHlITFdpMA?oc=5",
    "sourceIcon": "https://www.google.com/s2/favicons?domain=kemenparekraf.go.id&sz=64",
    "imageUrl": "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80",
    "tag": "Nasional",
    "tagEn": "National",
    "actionUrl": "https://news.google.com/rss/articles/CBMijwFBVV95cUxQRGdNOEFpVEphYl9VaEtuNFoyUWVmcWQwSUQyVW1kdmxyVTk3MGRHYlRUdFBsM3lFSDQtY3M5ekhhVW5mUUVKa2NWby12RjR4TElWNG14M01KX1c2djY3Z2tBdlVZV3VYbkpOQmVKWkZyQ21SNDdPMG9ncVMtUndaWml3LUZzOHJGOHlITFdpMA?oc=5",
    "mapsUrl": "https://www.google.com/maps/search/?api=1&query=Indonesia",
    "locationName": "Kawasan Wisata Nusantara Indonesia",
    "locationNameEn": "Indonesian Archipelago Tourism Destinations",
    "description": "Kementerian Pariwisata Republik Indonesia bersama para pemangku kepentingan sektor pariwisata nasional terus menggalakkan program strategis: \"Pemkab Luwu Timur Gandeng BI Kembangkan Potensi Wisata Danau Matano\". Kebijakan ini merupakan bagian integral dari peta jalan pariwisata berkualitas dan berkelanjutan di seluruh nusantara.\n\nMelalui penguatan kolaborasi lintas-sektor, akselerasi digitalisasi ekosistem wisata, serta diversifikasi paket perjalanan tematik, sektor pariwisata Indonesia dipacu untuk meningkatkan pergerakan wisatawan nusantara dan kunjungan wisatawan mancanegara secara inklusif.",
    "descriptionEn": "The Ministry of Tourism of the Republic of Indonesia and national travel stakeholders continue implementing strategic programs: \"Pemkab Luwu Timur Gandeng BI Kembangkan Potensi Wisata Danau Matano\". This initiative supports the national roadmap toward high-yield, sustainable tourism development across the Indonesian archipelago.\n\nBy fostering cross-sector partnerships, advancing digital tourism ecosystems, and curating thematic travel itineraries, Indonesia's tourism industry is well-positioned to drive robust tourist footfall and inclusive economic growth.",
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
    "createdAt": "2026-11-14T10:49:47.000Z",
    "generatedAt": "2026-11-14T11:38:41.139Z",
    "generatedBy": "Malala Autonomous RSS Engine (Google News National Parekraf Feed)",
    "isAIGenerated": false
  },
  {
    "id": "hi-rss-nasional-21139-2",
    "title": "Konser Guns N’ Roses dan BTS di Jakarta Momentum Optimalkan Music Tourism",
    "titleEn": "Indonesia Tourism Update: Konser Guns N’ Roses dan BTS di Jakarta Momentum Optimalkan Music Tourism",
    "category": "Pariwisata Indonesia",
    "categoryEn": "Indonesian Tourism",
    "date": "14 November 2026",
    "dateEn": "November 14, 2026",
    "sourceName": "Event Guide",
    "sourceDomain": "kemenparekraf.go.id",
    "sourceUrl": "https://news.google.com/rss/articles/CBMiqgFBVV95cUxQWVc0TVY3Q09OWmJ4eUgzY2RZRmZBTmNKU25nLS1SYlZDbEQ2ZHhQSHRGM2Uzd01OR0RMMjhtOWwySGRYaURTVXRhQktzbHZYakl6RnhDN082V3BsclBlOW5SeG9sa2puTnY2QVBvNTlHSDRRUE9ydURkM1RnamhldnJLODRPX2xFUnJxYzF2OGNwREh0WkNEdmV0VkNiVkh6WnMzSWM1U1NvQQ?oc=5",
    "sourceIcon": "https://www.google.com/s2/favicons?domain=kemenparekraf.go.id&sz=64",
    "imageUrl": "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=800&q=80",
    "tag": "Nasional",
    "tagEn": "National",
    "actionUrl": "https://news.google.com/rss/articles/CBMiqgFBVV95cUxQWVc0TVY3Q09OWmJ4eUgzY2RZRmZBTmNKU25nLS1SYlZDbEQ2ZHhQSHRGM2Uzd01OR0RMMjhtOWwySGRYaURTVXRhQktzbHZYakl6RnhDN082V3BsclBlOW5SeG9sa2puTnY2QVBvNTlHSDRRUE9ydURkM1RnamhldnJLODRPX2xFUnJxYzF2OGNwREh0WkNEdmV0VkNiVkh6WnMzSWM1U1NvQQ?oc=5",
    "mapsUrl": "https://www.google.com/maps/search/?api=1&query=Indonesia",
    "locationName": "Kawasan Wisata Nusantara Indonesia",
    "locationNameEn": "Indonesian Archipelago Tourism Destinations",
    "description": "Kementerian Pariwisata Republik Indonesia bersama para pemangku kepentingan sektor pariwisata nasional terus menggalakkan program strategis: \"Konser Guns N’ Roses dan BTS di Jakarta Momentum Optimalkan Music Tourism\". Kebijakan ini merupakan bagian integral dari peta jalan pariwisata berkualitas dan berkelanjutan di seluruh nusantara.\n\nMelalui penguatan kolaborasi lintas-sektor, akselerasi digitalisasi ekosistem wisata, serta diversifikasi paket perjalanan tematik, sektor pariwisata Indonesia dipacu untuk meningkatkan pergerakan wisatawan nusantara dan kunjungan wisatawan mancanegara secara inklusif.",
    "descriptionEn": "The Ministry of Tourism of the Republic of Indonesia and national travel stakeholders continue implementing strategic programs: \"Konser Guns N’ Roses dan BTS di Jakarta Momentum Optimalkan Music Tourism\". This initiative supports the national roadmap toward high-yield, sustainable tourism development across the Indonesian archipelago.\n\nBy fostering cross-sector partnerships, advancing digital tourism ecosystems, and curating thematic travel itineraries, Indonesia's tourism industry is well-positioned to drive robust tourist footfall and inclusive economic growth.",
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
    "createdAt": "2026-11-14T10:19:51.000Z",
    "generatedAt": "2026-11-14T11:38:41.139Z",
    "generatedBy": "Malala Autonomous RSS Engine (Google News National Parekraf Feed)",
    "isAIGenerated": false
  },
  {
    "id": "hi-rss-nasional-21139-3",
    "title": "Dinas Pariwisata dan Kebudayaan Kabupaten Malang Gelar Museum Keliling, Dekatkan Sejarah Singhasari ke Pelajar SD",
    "titleEn": "Indonesia Tourism Update: Dinas Pariwisata dan Kebudayaan Kabupaten Malang Gelar Museum Keliling, Dekatkan Sejarah Singhasari ke Pelajar SD",
    "category": "Pariwisata Indonesia",
    "categoryEn": "Indonesian Tourism",
    "date": "14 November 2026",
    "dateEn": "November 14, 2026",
    "sourceName": "suara indonesia",
    "sourceDomain": "kemenparekraf.go.id",
    "sourceUrl": "https://news.google.com/rss/articles/CBMi-wFBVV95cUxPd0NZTHZuOW5LWUVzWll4aHlJcUF2dDJhNE5QVHEwaUxBMkZFWFYtRDNSa2pmTUR0WmxyX185QnV1TmdMVFczemlqTFJfUDg5Tlg0ODhpWXUxU1dzMEd2R1ZjTkVRWi1HdG5UUFI2R0djbWVpbDREbE9seXF0OFI3WTRhVDFoNGpnVGN6dV9EQ1Bwdld1bUttb3NFVjFzTG95cG5xZFJYbmx0b1Y2RnYzeVNHSXB2RXJsc2hTUjhQREtaSjhDTllXR1NnU2V6Tzd2a0pMMERQQlZEZVI5UGFhM1B2eUtvWVNuM0NfYkV1X0FkdEZzN1hNQ0gzQQ?oc=5",
    "sourceIcon": "https://www.google.com/s2/favicons?domain=kemenparekraf.go.id&sz=64",
    "imageUrl": "https://images.unsplash.com/photo-1590523741831-ab7e8b8f9c7f?auto=format&fit=crop&w=800&q=80",
    "tag": "Nasional",
    "tagEn": "National",
    "actionUrl": "https://news.google.com/rss/articles/CBMi-wFBVV95cUxPd0NZTHZuOW5LWUVzWll4aHlJcUF2dDJhNE5QVHEwaUxBMkZFWFYtRDNSa2pmTUR0WmxyX185QnV1TmdMVFczemlqTFJfUDg5Tlg0ODhpWXUxU1dzMEd2R1ZjTkVRWi1HdG5UUFI2R0djbWVpbDREbE9seXF0OFI3WTRhVDFoNGpnVGN6dV9EQ1Bwdld1bUttb3NFVjFzTG95cG5xZFJYbmx0b1Y2RnYzeVNHSXB2RXJsc2hTUjhQREtaSjhDTllXR1NnU2V6Tzd2a0pMMERQQlZEZVI5UGFhM1B2eUtvWVNuM0NfYkV1X0FkdEZzN1hNQ0gzQQ?oc=5",
    "mapsUrl": "https://www.google.com/maps/search/?api=1&query=Indonesia",
    "locationName": "Kawasan Wisata Nusantara Indonesia",
    "locationNameEn": "Indonesian Archipelago Tourism Destinations",
    "description": "Kementerian Pariwisata Republik Indonesia bersama para pemangku kepentingan sektor pariwisata nasional terus menggalakkan program strategis: \"Dinas Pariwisata dan Kebudayaan Kabupaten Malang Gelar Museum Keliling, Dekatkan Sejarah Singhasari ke Pelajar SD\". Kebijakan ini merupakan bagian integral dari peta jalan pariwisata berkualitas dan berkelanjutan di seluruh nusantara.\n\nMelalui penguatan kolaborasi lintas-sektor, akselerasi digitalisasi ekosistem wisata, serta diversifikasi paket perjalanan tematik, sektor pariwisata Indonesia dipacu untuk meningkatkan pergerakan wisatawan nusantara dan kunjungan wisatawan mancanegara secara inklusif.",
    "descriptionEn": "The Ministry of Tourism of the Republic of Indonesia and national travel stakeholders continue implementing strategic programs: \"Dinas Pariwisata dan Kebudayaan Kabupaten Malang Gelar Museum Keliling, Dekatkan Sejarah Singhasari ke Pelajar SD\". This initiative supports the national roadmap toward high-yield, sustainable tourism development across the Indonesian archipelago.\n\nBy fostering cross-sector partnerships, advancing digital tourism ecosystems, and curating thematic travel itineraries, Indonesia's tourism industry is well-positioned to drive robust tourist footfall and inclusive economic growth.",
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
    "createdAt": "2026-11-14T10:00:00.000Z",
    "generatedAt": "2026-11-14T11:38:41.139Z",
    "generatedBy": "Malala Autonomous RSS Engine (Google News National Parekraf Feed)",
    "isAIGenerated": false
  },
  {
    "id": "hi-rss-sumbar-21139-1",
    "title": "Wakapolda Sumbar dan Sejumlah Kapolres Olah Raga Bersama di Destinasi Wisata Lembah Harau",
    "titleEn": "West Sumatra Tourism: Wakapolda Sumbar dan Sejumlah Kapolres Olah Raga Bersama di Destinasi Wisata Lembah Harau",
    "category": "Pariwisata Sumatera Barat",
    "categoryEn": "West Sumatra Tourism",
    "date": "14 November 2026",
    "dateEn": "November 14, 2026",
    "sourceName": "Benuanews.com",
    "sourceDomain": "sumbar.antaranews.com",
    "sourceUrl": "https://news.google.com/rss/articles/CBMisgFBVV95cUxOMTJtZ1RObEJEa1hMWUU3Ym11dm1qYVJ2NUhBMUdDZXJCVDUwN2QyN1A2MHNvdTNvT1phaWhSOEJ3djlfMlpzczdIbGlUZWhWQWh5dy03Ukw1TDRXWWhMWGYwSWN5U1J0MXNraTQyVWZraUNUaWR6YnM5cEFSRm4xaEJZR0ttYXRRRkRNc0tiY3RpR0sycm5XNm1JLW5YekFYLUlMNENIWUEzRE0wNndkQzBn?oc=5",
    "sourceIcon": "https://www.google.com/s2/favicons?domain=antaranews.com&sz=64",
    "imageUrl": "https://images.unsplash.com/photo-1527668752968-14dc70a27c95?auto=format&fit=crop&w=800&q=80",
    "tag": "Sumbar",
    "tagEn": "West Sumatra",
    "actionUrl": "https://news.google.com/rss/articles/CBMisgFBVV95cUxOMTJtZ1RObEJEa1hMWUU3Ym11dm1qYVJ2NUhBMUdDZXJCVDUwN2QyN1A2MHNvdTNvT1phaWhSOEJ3djlfMlpzczdIbGlUZWhWQWh5dy03Ukw1TDRXWWhMWGYwSWN5U1J0MXNraTQyVWZraUNUaWR6YnM5cEFSRm4xaEJZR0ttYXRRRkRNc0tiY3RpR0sycm5XNm1JLW5YekFYLUlMNENIWUEzRE0wNndkQzBn?oc=5",
    "mapsUrl": "https://www.google.com/maps/search/?api=1&query=Lembah+Harau",
    "locationName": "Geopark Lembah Harau, Lima Puluh Kota",
    "locationNameEn": "Harau Valley Geopark, Lima Puluh Kota",
    "description": "Laporan liputan jurnalistik resmi: \"Wakapolda Sumbar dan Sejumlah Kapolres Olah Raga Bersama di Destinasi Wisata Lembah Harau\". Pemerintah Provinsi Sumatera Barat bersama Dinas Pariwisata dan seluruh pemangku kepentingan terus mempercepat langkah strategis guna mengoptimalkan potensi wisata alam yang asri, keluhuran adat dan seni budaya Minangkabau, serta kuliner halal legendaris di berbagai kabupaten dan kota.\n\nInisiatif terpadu ini difokuskan pada peningkatan kualitas amenitas dan fasilitas umum di objek wisata, kemudahan konektivitas transportasi wisatawan, serta penguatan pelaku UMKM dan industri ekonomi kreatif lokal agar pariwisata Ranah Minang senantiasa berdaya saing tinggi dan berkelanjutan.",
    "descriptionEn": "Official news report: \"Wakapolda Sumbar dan Sejumlah Kapolres Olah Raga Bersama di Destinasi Wisata Lembah Harau\". West Sumatra provincial authorities, the regional tourism board, and hospitality stakeholders are accelerating strategic measures to showcase authentic natural landscapes, Minangkabau cultural heritage, and legendary halal culinary traditions.\n\nThis concerted initiative focuses on upgrading tourist amenities, streamlining transport connectivity, and empowering local creative MSMEs, ensuring West Sumatra's tourism remains highly competitive, hospitable, and sustainable for both domestic and international travelers.",
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
    "createdAt": "2026-11-14T01:36:43.000Z",
    "generatedAt": "2026-11-14T11:38:41.139Z",
    "generatedBy": "Malala Autonomous RSS Engine (Google News Sumbar Feed)",
    "isAIGenerated": false
  },
  {
    "id": "hi-rss-sumbar-21139-2",
    "title": "3 Populer Sumbar: Belum Ada Instruksi Copot Foto Wapres, 40 Travel di Sumbar Belum Punya Izin PPIU",
    "titleEn": "West Sumatra Tourism: 3 Populer Sumbar: Belum Ada Instruksi Copot Foto Wapres, 40 Travel di Sumbar Belum Punya Izin PPIU",
    "category": "Pariwisata Sumatera Barat",
    "categoryEn": "West Sumatra Tourism",
    "date": "14 November 2026",
    "dateEn": "November 14, 2026",
    "sourceName": "Tribunpadang.com",
    "sourceDomain": "sumbar.antaranews.com",
    "sourceUrl": "https://news.google.com/rss/articles/CBMi4gFBVV95cUxQZ0poM2RqTFd5dDIxOVl0alNQTGtwNkh1YTJjUjJPNWVHY3JUTjg1RDYyWWlKd1hROXdSdWtsOGd2dXY0cUZPaURrODYyS1F2T2t0NjBwNnBtdE53UmpPMUVYZkNqOGlZalZJVnNVNG5OSTRHLWpDYWVZNnV4Z0htTUc4SDUzc08tWUtOWkRaWGZ2a0lRVGxlNkE1dk9IT1dtX3FSNUc4bTQ2SGtwOHVWeHRLRllweUZSSGlxc1F1c05pNVYtLV9sWGRyM3hHcGRoSE4tYVF0YUFEUWtNaTFrWUl3?oc=5",
    "sourceIcon": "https://www.google.com/s2/favicons?domain=antaranews.com&sz=64",
    "imageUrl": "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=800&q=80",
    "tag": "Sumbar",
    "tagEn": "West Sumatra",
    "actionUrl": "https://news.google.com/rss/articles/CBMi4gFBVV95cUxQZ0poM2RqTFd5dDIxOVl0alNQTGtwNkh1YTJjUjJPNWVHY3JUTjg1RDYyWWlKd1hROXdSdWtsOGd2dXY0cUZPaURrODYyS1F2T2t0NjBwNnBtdE53UmpPMUVYZkNqOGlZalZJVnNVNG5OSTRHLWpDYWVZNnV4Z0htTUc4SDUzc08tWUtOWkRaWGZ2a0lRVGxlNkE1dk9IT1dtX3FSNUc4bTQ2SGtwOHVWeHRLRllweUZSSGlxc1F1c05pNVYtLV9sWGRyM3hHcGRoSE4tYVF0YUFEUWtNaTFrWUl3?oc=5",
    "mapsUrl": "https://www.google.com/maps/search/?api=1&query=Sumatera+Barat",
    "locationName": "Destinasi Wisata Unggulan Sumatera Barat",
    "locationNameEn": "West Sumatra Prime Tourism Destinations",
    "description": "Laporan liputan jurnalistik resmi: \"3 Populer Sumbar: Belum Ada Instruksi Copot Foto Wapres, 40 Travel di Sumbar Belum Punya Izin PPIU\". Pemerintah Provinsi Sumatera Barat bersama Dinas Pariwisata dan seluruh pemangku kepentingan terus mempercepat langkah strategis guna mengoptimalkan potensi wisata alam yang asri, keluhuran adat dan seni budaya Minangkabau, serta kuliner halal legendaris di berbagai kabupaten dan kota.\n\nInisiatif terpadu ini difokuskan pada peningkatan kualitas amenitas dan fasilitas umum di objek wisata, kemudahan konektivitas transportasi wisatawan, serta penguatan pelaku UMKM dan industri ekonomi kreatif lokal agar pariwisata Ranah Minang senantiasa berdaya saing tinggi dan berkelanjutan.",
    "descriptionEn": "Official news report: \"3 Populer Sumbar: Belum Ada Instruksi Copot Foto Wapres, 40 Travel di Sumbar Belum Punya Izin PPIU\". West Sumatra provincial authorities, the regional tourism board, and hospitality stakeholders are accelerating strategic measures to showcase authentic natural landscapes, Minangkabau cultural heritage, and legendary halal culinary traditions.\n\nThis concerted initiative focuses on upgrading tourist amenities, streamlining transport connectivity, and empowering local creative MSMEs, ensuring West Sumatra's tourism remains highly competitive, hospitable, and sustainable for both domestic and international travelers.",
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
    "createdAt": "2026-11-14T01:01:00.000Z",
    "generatedAt": "2026-11-14T11:38:41.139Z",
    "generatedBy": "Malala Autonomous RSS Engine (Google News Sumbar Feed)",
    "isAIGenerated": false
  },
  {
    "id": "hi-rss-sumbar-21139-3",
    "title": "Harga Cabai Merah Picu Inflasi Sumbar 0,86%, BI Gelar Pangan Murah",
    "titleEn": "West Sumatra Tourism: Harga Cabai Merah Picu Inflasi Sumbar 0,86%, BI Gelar Pangan Murah",
    "category": "Pariwisata Sumatera Barat",
    "categoryEn": "West Sumatra Tourism",
    "date": "14 November 2026",
    "dateEn": "November 14, 2026",
    "sourceName": "Lintas Sumbar",
    "sourceDomain": "sumbar.antaranews.com",
    "sourceUrl": "https://news.google.com/rss/articles/CBMipgFBVV95cUxPZjVybUNQblhRLWFNSmxsLW9RUG5sYmJucG5rYWg0WDF2ampmTGhTZHBxbVhnU09IQ2VGb0JEWTRiYmlwRF8wMVMweW13My15b2s4bGEzWjl1aGxQXzFUNE1OZ2gyV2FJRUJfOFRuUGpGeUpFNmgxSTZrNGZ1MkpmMlRzUU5qT1M2X2R5UndQOXJOV2dnd0ZrbDJTbi04dTd0ZlducGFR?oc=5",
    "sourceIcon": "https://www.google.com/s2/favicons?domain=antaranews.com&sz=64",
    "imageUrl": "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=800&q=80",
    "tag": "Sumbar",
    "tagEn": "West Sumatra",
    "actionUrl": "https://news.google.com/rss/articles/CBMipgFBVV95cUxPZjVybUNQblhRLWFNSmxsLW9RUG5sYmJucG5rYWg0WDF2ampmTGhTZHBxbVhnU09IQ2VGb0JEWTRiYmlwRF8wMVMweW13My15b2s4bGEzWjl1aGxQXzFUNE1OZ2gyV2FJRUJfOFRuUGpGeUpFNmgxSTZrNGZ1MkpmMlRzUU5qT1M2X2R5UndQOXJOV2dnd0ZrbDJTbi04dTd0ZlducGFR?oc=5",
    "mapsUrl": "https://www.google.com/maps/search/?api=1&query=Sumatera+Barat",
    "locationName": "Destinasi Wisata Unggulan Sumatera Barat",
    "locationNameEn": "West Sumatra Prime Tourism Destinations",
    "description": "Laporan liputan jurnalistik resmi: \"Harga Cabai Merah Picu Inflasi Sumbar 0,86%, BI Gelar Pangan Murah\". Pemerintah Provinsi Sumatera Barat bersama Dinas Pariwisata dan seluruh pemangku kepentingan terus mempercepat langkah strategis guna mengoptimalkan potensi wisata alam yang asri, keluhuran adat dan seni budaya Minangkabau, serta kuliner halal legendaris di berbagai kabupaten dan kota.\n\nInisiatif terpadu ini difokuskan pada peningkatan kualitas amenitas dan fasilitas umum di objek wisata, kemudahan konektivitas transportasi wisatawan, serta penguatan pelaku UMKM dan industri ekonomi kreatif lokal agar pariwisata Ranah Minang senantiasa berdaya saing tinggi dan berkelanjutan.",
    "descriptionEn": "Official news report: \"Harga Cabai Merah Picu Inflasi Sumbar 0,86%, BI Gelar Pangan Murah\". West Sumatra provincial authorities, the regional tourism board, and hospitality stakeholders are accelerating strategic measures to showcase authentic natural landscapes, Minangkabau cultural heritage, and legendary halal culinary traditions.\n\nThis concerted initiative focuses on upgrading tourist amenities, streamlining transport connectivity, and empowering local creative MSMEs, ensuring West Sumatra's tourism remains highly competitive, hospitable, and sustainable for both domestic and international travelers.",
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
    "createdAt": "2026-11-13T22:47:35.000Z",
    "generatedAt": "2026-11-14T11:38:41.139Z",
    "generatedBy": "Malala Autonomous RSS Engine (Google News Sumbar Feed)",
    "isAIGenerated": false
  },
  {
    "id": "hi-rss-sumbar-21139-4",
    "title": "ASITA Kurasi Ulang Produk Wisata Sumbar Lewat Padang Travel Mart II 2026",
    "titleEn": "West Sumatra Tourism: ASITA Kurasi Ulang Produk Wisata Sumbar Lewat Padang Travel Mart II 2026",
    "category": "Pariwisata Sumatera Barat",
    "categoryEn": "West Sumatra Tourism",
    "date": "13 November 2026",
    "dateEn": "November 13, 2026",
    "sourceName": "Harian Singgalang",
    "sourceDomain": "sumbar.antaranews.com",
    "sourceUrl": "https://news.google.com/rss/articles/CBMiywFBVV95cUxQNS1HX3VGZ19teXE0Q1U5c3ZHT1BjUlc5OW01X0tmNkJzZDFpYzZHRUpSaFJfWWlBNXRUaG5pRUg1MUNJTHhsdFNHVHo5cWVuMk1mXzk3OVdZaWdjNHJEX0hDNjZNejJUczhSSWVRQ0F2N0xfMC1WM3dKY2lEVWF5QUdpUFZrbFB3Zm5IX3h6TUFIc3lRanBqdTExWk9DLVJpSXlvT1ZvWnNFay13cUVQenJfWXI3V0VoSEl0c1VNaTBKUm1QdVFPaVg3bw?oc=5",
    "sourceIcon": "https://www.google.com/s2/favicons?domain=antaranews.com&sz=64",
    "imageUrl": "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80",
    "tag": "Sumbar",
    "tagEn": "West Sumatra",
    "actionUrl": "https://news.google.com/rss/articles/CBMiywFBVV95cUxQNS1HX3VGZ19teXE0Q1U5c3ZHT1BjUlc5OW01X0tmNkJzZDFpYzZHRUpSaFJfWWlBNXRUaG5pRUg1MUNJTHhsdFNHVHo5cWVuMk1mXzk3OVdZaWdjNHJEX0hDNjZNejJUczhSSWVRQ0F2N0xfMC1WM3dKY2lEVWF5QUdpUFZrbFB3Zm5IX3h6TUFIc3lRanBqdTExWk9DLVJpSXlvT1ZvWnNFay13cUVQenJfWXI3V0VoSEl0c1VNaTBKUm1QdVFPaVg3bw?oc=5",
    "mapsUrl": "https://www.google.com/maps/search/?api=1&query=Kota+Padang",
    "locationName": "Kota Padang & Bandara Internasional Minangkabau",
    "locationNameEn": "Padang & Minangkabau International Airport",
    "description": "Laporan liputan jurnalistik resmi: \"ASITA Kurasi Ulang Produk Wisata Sumbar Lewat Padang Travel Mart II 2026\". Pemerintah Provinsi Sumatera Barat bersama Dinas Pariwisata dan seluruh pemangku kepentingan terus mempercepat langkah strategis guna mengoptimalkan potensi wisata alam yang asri, keluhuran adat dan seni budaya Minangkabau, serta kuliner halal legendaris di berbagai kabupaten dan kota.\n\nInisiatif terpadu ini difokuskan pada peningkatan kualitas amenitas dan fasilitas umum di objek wisata, kemudahan konektivitas transportasi wisatawan, serta penguatan pelaku UMKM dan industri ekonomi kreatif lokal agar pariwisata Ranah Minang senantiasa berdaya saing tinggi dan berkelanjutan.",
    "descriptionEn": "Official news report: \"ASITA Kurasi Ulang Produk Wisata Sumbar Lewat Padang Travel Mart II 2026\". West Sumatra provincial authorities, the regional tourism board, and hospitality stakeholders are accelerating strategic measures to showcase authentic natural landscapes, Minangkabau cultural heritage, and legendary halal culinary traditions.\n\nThis concerted initiative focuses on upgrading tourist amenities, streamlining transport connectivity, and empowering local creative MSMEs, ensuring West Sumatra's tourism remains highly competitive, hospitable, and sustainable for both domestic and international travelers.",
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
    "createdAt": "2026-11-13T14:17:47.000Z",
    "generatedAt": "2026-11-14T11:38:41.139Z",
    "generatedBy": "Malala Autonomous RSS Engine (Google News Sumbar Feed)",
    "isAIGenerated": false
  },
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
  }
];

export const DOWNLOAD_ITEMS: DownloadItem[] = [];

