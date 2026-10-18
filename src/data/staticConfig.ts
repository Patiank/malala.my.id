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
    "id": "hi-1",
    "title": "Pemerintah Kabupaten Pesisir Selatan",
    "titleEn": "West Sumatra Tourism: Pemerintah Kabupaten Pesisir Selatan",
    "category": "Pariwisata Sumatera Barat",
    "categoryEn": "West Sumatra Tourism",
    "date": "8 Oktober 2026",
    "dateEn": "October 8, 2026",
    "sourceName": "Pemerintah Kabupaten Pesisir Selatan",
    "sourceDomain": "sumbar.antaranews.com",
    "sourceUrl": "https://news.google.com/rss/articles/CBMi8gFBVV95cUxNRGIwRlkyREt4N2N4MTA3bEdkWjl3WlZhRkNGVFpJTDJZSUFadFlSTmtuUzloTldJTWE5OFJZeExWOU9qUlMxeG5QbjgtZzB1UlM5Z2dEM01qeTd5ODhRTDdTLS1GRVM4VXloVWxwc095R2pOQzl2bWZrT05tMHQ4QXFFT3NvMVB2NDlDX1E2NVZRLXl1QkxWbEdpU2kteTdYNFBFaVRYZ3lDSFJYWE1pbWY5bXd1RXJlWW5GR0dyWmx0cGJWdVlGT1cxYmRJekJyUXAyc3E1N0hMeGhvaVlBbmUwNU1HOU5ycUtYS0FIYmF2dw?oc=5",
    "sourceIcon": "https://www.google.com/s2/favicons?domain=antaranews.com&sz=64",
    "imageUrl": "",
    "tag": "Sumbar",
    "tagEn": "West Sumatra",
    "actionUrl": "https://news.google.com/rss/articles/CBMi8gFBVV95cUxNRGIwRlkyREt4N2N4MTA3bEdkWjl3WlZhRkNGVFpJTDJZSUFadFlSTmtuUzloTldJTWE5OFJZeExWOU9qUlMxeG5QbjgtZzB1UlM5Z2dEM01qeTd5ODhRTDdTLS1GRVM4VXloVWxwc095R2pOQzl2bWZrT05tMHQ4QXFFT3NvMVB2NDlDX1E2NVZRLXl1QkxWbEdpU2kteTdYNFBFaVRYZ3lDSFJYWE1pbWY5bXd1RXJlWW5GR0dyWmx0cGJWdVlGT1cxYmRJekJyUXAyc3E1N0hMeGhvaVlBbmUwNU1HOU5ycUtYS0FIYmF2dw?oc=5",
    "mapsUrl": "https://www.google.com/maps/search/?api=1&query=Sumatera+Barat",
    "locationName": "Destinasi Wisata Unggulan Sumatera Barat",
    "locationNameEn": "West Sumatra Prime Tourism Destination",
    "description": "Pemerintah Kabupaten Pesisir Selatan  Pemerintah Kabupaten Pesisir Selatan",
    "descriptionEn": "Latest journalistic coverage on tourism and creative economy developments across West Sumatra regencies and cities.",
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
    "tipsEn": "Check real-time travel routes and schedules on the Malala portal before departure."
  },
  {
    "id": "hi-2",
    "title": "Wawako: Porprov Sumbar berdampak pada wisata dan ekonomi Pariaman",
    "titleEn": "West Sumatra Tourism: Wawako: Porprov Sumbar berdampak pada wisata dan ekonomi Pariaman",
    "category": "Pariwisata Sumatera Barat",
    "categoryEn": "West Sumatra Tourism",
    "date": "12 Oktober 2026",
    "dateEn": "October 12, 2026",
    "sourceName": "ANTARA News Sumbar",
    "sourceDomain": "sumbar.antaranews.com",
    "sourceUrl": "https://news.google.com/rss/articles/CBMirAFBVV95cUxORFJxbmtIV2x4WEVHbW1OT0x6YjNxdjdUdHJhT0J2WHY4LVZRMGZvQ2lOdFJ0OWVQTEQ2WlBZejI3N2Z2aTYwZURNMDZpS1dweEF1V3JncTZPcTA0bzZUeVdNM1gwb2p5Mk8wSzZOYlJyUDcyVndoS1kwb3RQU1FPcG1NSlpBVXVhRlJRQjhzal9GOGZGYm40bVk4alM1LVZGY25BZm1kbmhwNFRQ?oc=5",
    "sourceIcon": "https://www.google.com/s2/favicons?domain=antaranews.com&sz=64",
    "imageUrl": "",
    "tag": "Sumbar",
    "tagEn": "West Sumatra",
    "actionUrl": "https://news.google.com/rss/articles/CBMirAFBVV95cUxORFJxbmtIV2x4WEVHbW1OT0x6YjNxdjdUdHJhT0J2WHY4LVZRMGZvQ2lOdFJ0OWVQTEQ2WlBZejI3N2Z2aTYwZURNMDZpS1dweEF1V3JncTZPcTA0bzZUeVdNM1gwb2p5Mk8wSzZOYlJyUDcyVndoS1kwb3RQU1FPcG1NSlpBVXVhRlJRQjhzal9GOGZGYm40bVk4alM1LVZGY25BZm1kbmhwNFRQ?oc=5",
    "mapsUrl": "https://www.google.com/maps/search/?api=1&query=Sumatera+Barat",
    "locationName": "Destinasi Wisata Unggulan Sumatera Barat",
    "locationNameEn": "West Sumatra Prime Tourism Destination",
    "description": "Wawako: Porprov Sumbar berdampak pada wisata dan ekonomi Pariaman  ANTARA News Sumbar",
    "descriptionEn": "Latest journalistic coverage on tourism and creative economy developments across West Sumatra regencies and cities.",
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
    "tipsEn": "Check real-time travel routes and schedules on the Malala portal before departure."
  },
  {
    "id": "hi-3",
    "title": "Komandan Lanud Sutan Sjahrir Hadiri Pembukaan Mentawai Surf And Soul Di Bandara Internasional Minangkabau",
    "titleEn": "West Sumatra Tourism: Komandan Lanud Sutan Sjahrir Hadiri Pembukaan Mentawai Surf And Soul Di Bandara Internasional Minangkabau",
    "category": "Pariwisata Sumatera Barat",
    "categoryEn": "West Sumatra Tourism",
    "date": "15 Oktober 2026",
    "dateEn": "October 15, 2026",
    "sourceName": "TNI AU",
    "sourceDomain": "sumbar.antaranews.com",
    "sourceUrl": "https://news.google.com/rss/articles/CBMi2AFBVV95cUxNSU4yR0czZ24yRnRlSzdpTHg5OU9ZRXFPWUtxMG5XNnVSYWJiNzlkejVNbTVZalpJYjdGem93MjQxbnJGS3lxaC03T2ZRbFAwQWR2NVNwNHZXTVhDeVdzTkY4aG9vLUVFQTR0SWRGb1hqYzhjWGFpbGtLSFc1akx0U1YtU01US0l4bHA0SXVDblltRG1IZ2VFOEtiaGNtU3FlNW4zZlFvSTJxcFFNWG84LXVrbHBnWU05dWswbE8wNDVMNDBjbnZ4LTJLNE9YQXZUS1dzaUYyRUI?oc=5",
    "sourceIcon": "https://www.google.com/s2/favicons?domain=antaranews.com&sz=64",
    "imageUrl": "",
    "tag": "Sumbar",
    "tagEn": "West Sumatra",
    "actionUrl": "https://news.google.com/rss/articles/CBMi2AFBVV95cUxNSU4yR0czZ24yRnRlSzdpTHg5OU9ZRXFPWUtxMG5XNnVSYWJiNzlkejVNbTVZalpJYjdGem93MjQxbnJGS3lxaC03T2ZRbFAwQWR2NVNwNHZXTVhDeVdzTkY4aG9vLUVFQTR0SWRGb1hqYzhjWGFpbGtLSFc1akx0U1YtU01US0l4bHA0SXVDblltRG1IZ2VFOEtiaGNtU3FlNW4zZlFvSTJxcFFNWG84LXVrbHBnWU05dWswbE8wNDVMNDBjbnZ4LTJLNE9YQXZUS1dzaUYyRUI?oc=5",
    "mapsUrl": "https://www.google.com/maps/search/?api=1&query=Sumatera+Barat",
    "locationName": "Destinasi Wisata Unggulan Sumatera Barat",
    "locationNameEn": "West Sumatra Prime Tourism Destination",
    "description": "Komandan Lanud Sutan Sjahrir Hadiri Pembukaan Mentawai Surf And Soul Di Bandara Internasional Minangkabau  TNI AU",
    "descriptionEn": "Latest journalistic coverage on tourism and creative economy developments across West Sumatra regencies and cities.",
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
    "tipsEn": "Check real-time travel routes and schedules on the Malala portal before departure."
  },
  {
    "id": "hi-4",
    "title": "Fadly Amran Dorong Digitalisasi Obat Herbal untuk Pariwisata Kesehatan Sumbar di Kongres APTFI",
    "titleEn": "West Sumatra Tourism: Fadly Amran Dorong Digitalisasi Obat Herbal untuk Pariwisata Kesehatan Sumbar di Kongres APTFI",
    "category": "Pariwisata Sumatera Barat",
    "categoryEn": "West Sumatra Tourism",
    "date": "9 Oktober 2026",
    "dateEn": "October 9, 2026",
    "sourceName": "Padangkita.com",
    "sourceDomain": "sumbar.antaranews.com",
    "sourceUrl": "https://news.google.com/rss/articles/CBMiugFBVV95cUxQTGhBc3ozUkpzU2xXV1NjQ0NITUpXV1NoVGstOFU5MjRlV2F4akNFT21LMHRTN0pRUm1BR0hzWWx3VF9zcm5lZXRydlMwQVF5WUZqOU1zYU9aUkozbC0wcUs1WWtQQnYzNlZWdnZGa2pOenJia2ZxNzg3QXUwbUdxb1F2UkNYWmtsNWh2cE55U2gxY0ZfX1pBQ05UOUlCM0tfMG5oYXNYVDUyZEs4WC05UWxnY3otci1PTUE?oc=5",
    "sourceIcon": "https://www.google.com/s2/favicons?domain=antaranews.com&sz=64",
    "imageUrl": "",
    "tag": "Sumbar",
    "tagEn": "West Sumatra",
    "actionUrl": "https://news.google.com/rss/articles/CBMiugFBVV95cUxQTGhBc3ozUkpzU2xXV1NjQ0NITUpXV1NoVGstOFU5MjRlV2F4akNFT21LMHRTN0pRUm1BR0hzWWx3VF9zcm5lZXRydlMwQVF5WUZqOU1zYU9aUkozbC0wcUs1WWtQQnYzNlZWdnZGa2pOenJia2ZxNzg3QXUwbUdxb1F2UkNYWmtsNWh2cE55U2gxY0ZfX1pBQ05UOUlCM0tfMG5oYXNYVDUyZEs4WC05UWxnY3otci1PTUE?oc=5",
    "mapsUrl": "https://www.google.com/maps/search/?api=1&query=Sumatera+Barat",
    "locationName": "Destinasi Wisata Unggulan Sumatera Barat",
    "locationNameEn": "West Sumatra Prime Tourism Destination",
    "description": "Fadly Amran Dorong Digitalisasi Obat Herbal untuk Pariwisata Kesehatan Sumbar di Kongres APTFI  Padangkita.com",
    "descriptionEn": "Latest journalistic coverage on tourism and creative economy developments across West Sumatra regencies and cities.",
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
    "tipsEn": "Check real-time travel routes and schedules on the Malala portal before departure."
  },
  {
    "id": "hi-5",
    "title": "Joni Mardianto Nature & Soul of Ranah Minang Wakili Sumbar di Wonderful Indonesia Scale-Up Hub 2026",
    "titleEn": "West Sumatra Tourism: Joni Mardianto Nature & Soul of Ranah Minang Wakili Sumbar di Wonderful Indonesia Scale-Up Hub 2026",
    "category": "Pariwisata Sumatera Barat",
    "categoryEn": "West Sumatra Tourism",
    "date": "16 Oktober 2026",
    "dateEn": "October 16, 2026",
    "sourceName": "Arunala",
    "sourceDomain": "sumbar.antaranews.com",
    "sourceUrl": "https://news.google.com/rss/articles/CBMi3AFBVV95cUxQcHA2Y0c5SU5Dam5aS1hmVVRLbktuWTBOSk1UVVFzV1hLTHI4cEdiRmFxRTBBS0pmUEV6b211dXdKbEdUejdkWVRkQ1U5VHlVYlI0SVNpcEZjSVo2SU51dTVSRk1OeWpsak4zaGZka0lFbWdkQ2xwbmxXRFc3dk93WWRMWTNTRFlwRG9yWHN0SWhKcWZzQkFvc2t3NHYtX0FyNHRHZXhhbzlsQUJ6QlZMajFvbUZodUktR2Nmel9PMXM4Wkd2dFplWVpFOW9VMVBDMUZjOUlTR1lnVlZ3?oc=5",
    "sourceIcon": "https://www.google.com/s2/favicons?domain=antaranews.com&sz=64",
    "imageUrl": "",
    "tag": "Sumbar",
    "tagEn": "West Sumatra",
    "actionUrl": "https://news.google.com/rss/articles/CBMi3AFBVV95cUxQcHA2Y0c5SU5Dam5aS1hmVVRLbktuWTBOSk1UVVFzV1hLTHI4cEdiRmFxRTBBS0pmUEV6b211dXdKbEdUejdkWVRkQ1U5VHlVYlI0SVNpcEZjSVo2SU51dTVSRk1OeWpsak4zaGZka0lFbWdkQ2xwbmxXRFc3dk93WWRMWTNTRFlwRG9yWHN0SWhKcWZzQkFvc2t3NHYtX0FyNHRHZXhhbzlsQUJ6QlZMajFvbUZodUktR2Nmel9PMXM4Wkd2dFplWVpFOW9VMVBDMUZjOUlTR1lnVlZ3?oc=5",
    "mapsUrl": "https://www.google.com/maps/search/?api=1&query=Sumatera+Barat",
    "locationName": "Destinasi Wisata Unggulan Sumatera Barat",
    "locationNameEn": "West Sumatra Prime Tourism Destination",
    "description": "Joni Mardianto Nature & Soul of Ranah Minang Wakili Sumbar di Wonderful Indonesia Scale-Up Hub 2026  Arunala",
    "descriptionEn": "Latest journalistic coverage on tourism and creative economy developments across West Sumatra regencies and cities.",
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
    "tipsEn": "Check real-time travel routes and schedules on the Malala portal before departure."
  },
  {
    "id": "hi-6",
    "title": "Pariwisata RI Belum Balik Normal Usai Covid, Pengusaha Bongkar Datanya",
    "titleEn": "Indonesia Tourism Update: Pariwisata RI Belum Balik Normal Usai Covid, Pengusaha Bongkar Datanya",
    "category": "Pariwisata Indonesia",
    "categoryEn": "Indonesian Tourism",
    "date": "14 Oktober 2026",
    "dateEn": "October 14, 2026",
    "sourceName": "CNBC Indonesia",
    "sourceDomain": "kemenparekraf.go.id",
    "sourceUrl": "https://news.google.com/rss/articles/CBMixwFBVV95cUxQclZrdVZDTllNN2xXRU9fbUc5eE10QjRKdm9Sb3dBMkYwT1RIMmxhNnhPc2tVUzBMdkZvX2xuU1gzdlVQS1FXX2NiYW9admNnRUtRUFVnVzRNdWluUXBpT0RpVW1iZ25oWVZvVV8zR1hoZFotYmdzQ2dVTlhnX0JkbzliWExQYTB4YThkRUxuLTBNUDBicjRNb0YwRkVaSW91Y3BhcFdMWG1CZHpDbW90bjZaNWFJU2k4YTNYMjJoTjA1YUdIcXVv0gHMAUFVX3lxTFB4RUlxNlRMV3F0cm9ENXVoU2dpeDdINTlJcHhCSGZVZ1ZYb3J2dEo5akxfZ3JqVkRVMERfSDM0a1I3YlBSQkZQWU04LUFKMmtEeTNOWDAta3J0RnB1eUl1TUN5c0Rrb01Ub1ZtWTg2Ymw1UV9wTF9ObFVVLTZKa0R5anJ0TFVsQXIyWjQ2RTFqZUJQUG9BcHlpUktUVEZyRkZ6WjU4VzBMNklPZkhna3lpQXdGUFFUbEl2d3RGNXp1cEtXeGZuMzhxZml5Ug?oc=5",
    "sourceIcon": "https://www.google.com/s2/favicons?domain=kemenparekraf.go.id&sz=64",
    "imageUrl": "",
    "tag": "Nasional",
    "tagEn": "National",
    "actionUrl": "https://news.google.com/rss/articles/CBMixwFBVV95cUxQclZrdVZDTllNN2xXRU9fbUc5eE10QjRKdm9Sb3dBMkYwT1RIMmxhNnhPc2tVUzBMdkZvX2xuU1gzdlVQS1FXX2NiYW9admNnRUtRUFVnVzRNdWluUXBpT0RpVW1iZ25oWVZvVV8zR1hoZFotYmdzQ2dVTlhnX0JkbzliWExQYTB4YThkRUxuLTBNUDBicjRNb0YwRkVaSW91Y3BhcFdMWG1CZHpDbW90bjZaNWFJU2k4YTNYMjJoTjA1YUdIcXVv0gHMAUFVX3lxTFB4RUlxNlRMV3F0cm9ENXVoU2dpeDdINTlJcHhCSGZVZ1ZYb3J2dEo5akxfZ3JqVkRVMERfSDM0a1I3YlBSQkZQWU04LUFKMmtEeTNOWDAta3J0RnB1eUl1TUN5c0Rrb01Ub1ZtWTg2Ymw1UV9wTF9ObFVVLTZKa0R5anJ0TFVsQXIyWjQ2RTFqZUJQUG9BcHlpUktUVEZyRkZ6WjU4VzBMNklPZkhna3lpQXdGUFFUbEl2d3RGNXp1cEtXeGZuMzhxZml5Ug?oc=5",
    "mapsUrl": "https://www.google.com/maps/search/?api=1&query=Indonesia",
    "locationName": "Kawasan Wisata Nusantara Indonesia",
    "locationNameEn": "Indonesian Archipelago Tourism Destinations",
    "description": "Pariwisata RI Belum Balik Normal Usai Covid, Pengusaha Bongkar Datanya  CNBC Indonesia",
    "descriptionEn": "The Ministry of Tourism continues advancing high-yield, sustainable tourism strategies across the Indonesian archipelago.",
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
    "tipsEn": "Leverage official tourism event calendars for seamless holiday planning."
  },
  {
    "id": "hi-7",
    "title": "Gunakan Helikopter Berlogo Kementerian untuk Nonton The Weeknd, Begini Fakta Sebenarnya",
    "titleEn": "Indonesia Tourism Update: Gunakan Helikopter Berlogo Kementerian untuk Nonton The Weeknd, Begini Fakta Sebenarnya",
    "category": "Pariwisata Indonesia",
    "categoryEn": "Indonesian Tourism",
    "date": "5 Oktober 2026",
    "dateEn": "October 5, 2026",
    "sourceName": "AFU.id",
    "sourceDomain": "kemenparekraf.go.id",
    "sourceUrl": "https://news.google.com/rss/articles/CBMisAFBVV95cUxQcllmWXFyazZQdHVURDlubl9ITWlEcGFKYks1TTgtNUNhcHZpRjZ3bDZHUGtKV2I0RHMtcmVraHRUY01leUhhVXRfREU1WHdWWVRkcjZrVEMwRGEwZTFmX0dJZHRJVmJPSkJlZE05TTRDVzVTMzFpMHNvdjV5LW44ZWJ2QjBqU3lPMV84RU01NmhxbW9fM2U1WnN1RVozSWVqeHowZ2hjajNfU090RTVjRw?oc=5",
    "sourceIcon": "https://www.google.com/s2/favicons?domain=kemenparekraf.go.id&sz=64",
    "imageUrl": "",
    "tag": "Nasional",
    "tagEn": "National",
    "actionUrl": "https://news.google.com/rss/articles/CBMisAFBVV95cUxQcllmWXFyazZQdHVURDlubl9ITWlEcGFKYks1TTgtNUNhcHZpRjZ3bDZHUGtKV2I0RHMtcmVraHRUY01leUhhVXRfREU1WHdWWVRkcjZrVEMwRGEwZTFmX0dJZHRJVmJPSkJlZE05TTRDVzVTMzFpMHNvdjV5LW44ZWJ2QjBqU3lPMV84RU01NmhxbW9fM2U1WnN1RVozSWVqeHowZ2hjajNfU090RTVjRw?oc=5",
    "mapsUrl": "https://www.google.com/maps/search/?api=1&query=Indonesia",
    "locationName": "Kawasan Wisata Nusantara Indonesia",
    "locationNameEn": "Indonesian Archipelago Tourism Destinations",
    "description": "Gunakan Helikopter Berlogo Kementerian untuk Nonton The Weeknd, Begini Fakta Sebenarnya  AFU.id",
    "descriptionEn": "The Ministry of Tourism continues advancing high-yield, sustainable tourism strategies across the Indonesian archipelago.",
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
    "tipsEn": "Leverage official tourism event calendars for seamless holiday planning."
  },
  {
    "id": "hi-8",
    "title": "Pariwisata Digital, Peluang Besar dengan Beragam Tantangan",
    "titleEn": "Indonesia Tourism Update: Pariwisata Digital, Peluang Besar dengan Beragam Tantangan",
    "category": "Pariwisata Indonesia",
    "categoryEn": "Indonesian Tourism",
    "date": "9 Oktober 2026",
    "dateEn": "October 9, 2026",
    "sourceName": "RRI.co.id",
    "sourceDomain": "kemenparekraf.go.id",
    "sourceUrl": "https://news.google.com/rss/articles/CBMipwFBVV95cUxPRjN5NmhETXg4U1RQRlZNVFdCMHllWVBCZHpOOW1jN05HQ01NTFQzVzJVSW80SlhWdnQzaG1pTlk4Z3FzR05RWTFtMHFxeFdjVENTS0k4cHlVR3ZWcFBfNll4amVCUkxNV3B4UlVxaTY3VUg4MzhoYTgxcnV1ZWlwN0ZzRXVSR0QxQ1RMdzIybFdPd1hCeUhfVUlPcHRqSmMtQVR5WnQtNA?oc=5",
    "sourceIcon": "https://www.google.com/s2/favicons?domain=kemenparekraf.go.id&sz=64",
    "imageUrl": "",
    "tag": "Nasional",
    "tagEn": "National",
    "actionUrl": "https://news.google.com/rss/articles/CBMipwFBVV95cUxPRjN5NmhETXg4U1RQRlZNVFdCMHllWVBCZHpOOW1jN05HQ01NTFQzVzJVSW80SlhWdnQzaG1pTlk4Z3FzR05RWTFtMHFxeFdjVENTS0k4cHlVR3ZWcFBfNll4amVCUkxNV3B4UlVxaTY3VUg4MzhoYTgxcnV1ZWlwN0ZzRXVSR0QxQ1RMdzIybFdPd1hCeUhfVUlPcHRqSmMtQVR5WnQtNA?oc=5",
    "mapsUrl": "https://www.google.com/maps/search/?api=1&query=Indonesia",
    "locationName": "Kawasan Wisata Nusantara Indonesia",
    "locationNameEn": "Indonesian Archipelago Tourism Destinations",
    "description": "Pariwisata Digital, Peluang Besar dengan Beragam Tantangan  RRI.co.id",
    "descriptionEn": "The Ministry of Tourism continues advancing high-yield, sustainable tourism strategies across the Indonesian archipelago.",
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
    "tipsEn": "Leverage official tourism event calendars for seamless holiday planning."
  },
  {
    "id": "hi-9",
    "title": "Berapa Banyak Macam Batik di Indonesia? Ini Jumlah dan Ragam Motifnya",
    "titleEn": "Indonesia Tourism Update: Berapa Banyak Macam Batik di Indonesia? Ini Jumlah dan Ragam Motifnya",
    "category": "Pariwisata Indonesia",
    "categoryEn": "Indonesian Tourism",
    "date": "10 Oktober 2026",
    "dateEn": "October 10, 2026",
    "sourceName": "Info Ekonomi",
    "sourceDomain": "kemenparekraf.go.id",
    "sourceUrl": "https://news.google.com/rss/articles/CBMiogFBVV95cUxONGx4VGM4LWlMMG0tem5EZW1oSUc1UmtpY0VnSnV5OUlYdGdfV1d6YkVGMk9tbFltcFBnT3EzckFhdUEzSjI2MzZrNTJsaE1nRFhyQmtRYWJiUnlHR2J1UlBINUd6b3MtTnpWOTRQSGZ6T3FVem5TMHN5UVloUzN3ZmQyX05YajFnS0JlZ3pWajJYNFFTVFNNOTRuQ1J6Z3Nfd1E?oc=5",
    "sourceIcon": "https://www.google.com/s2/favicons?domain=kemenparekraf.go.id&sz=64",
    "imageUrl": "",
    "tag": "Nasional",
    "tagEn": "National",
    "actionUrl": "https://news.google.com/rss/articles/CBMiogFBVV95cUxONGx4VGM4LWlMMG0tem5EZW1oSUc1UmtpY0VnSnV5OUlYdGdfV1d6YkVGMk9tbFltcFBnT3EzckFhdUEzSjI2MzZrNTJsaE1nRFhyQmtRYWJiUnlHR2J1UlBINUd6b3MtTnpWOTRQSGZ6T3FVem5TMHN5UVloUzN3ZmQyX05YajFnS0JlZ3pWajJYNFFTVFNNOTRuQ1J6Z3Nfd1E?oc=5",
    "mapsUrl": "https://www.google.com/maps/search/?api=1&query=Indonesia",
    "locationName": "Kawasan Wisata Nusantara Indonesia",
    "locationNameEn": "Indonesian Archipelago Tourism Destinations",
    "description": "Berapa Banyak Macam Batik di Indonesia? Ini Jumlah dan Ragam Motifnya  Info Ekonomi",
    "descriptionEn": "The Ministry of Tourism continues advancing high-yield, sustainable tourism strategies across the Indonesian archipelago.",
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
    "tipsEn": "Leverage official tourism event calendars for seamless holiday planning."
  }
];

export const DOWNLOAD_ITEMS: DownloadItem[] = [];

