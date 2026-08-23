/**
 * Utility for generating safe, 100% copyright-free YouTube search links and parsing video URLs.
 *
 * PENTING: Semua tombol YouTube di katalog menggunakan LINK PENCARIAN YouTube (search_query),
 * BUKAN link video langsung. Ini memastikan link tidak pernah mati/error "Video tidak tersedia".
 */

/**
 * Membersihkan judul dari tanda kurung, label tag, dan karakter khusus.
 * Digunakan untuk menghasilkan keyword pencarian YouTube yang bersih dan relevan.
 */
function cleanTitleForSearch(title: string): string {
  return title
    .replace(/\s*\(\s*KEN\s*\)/gi, '')
    .replace(/\s*\(\s*Rekor\s*MURI\s*\)/gi, '')
    .replace(/\s*\(\s*Heritage\s*&?\s*Waterfront\s*\)/gi, '')
    .replace(/\s*\(\s*Equestrian\s*Heritage\s*\)/gi, '')
    .replace(/\s*\(\s*Atraksi[^)]*\)/gi, '')
    .replace(/\s*\(\s*Balap[^)]*\)/gi, '')
    .replace(/\s*\/\s*SISSCa/gi, '')
    .replace(/\s*\/\s*SIMFes/gi, '')
    .replace(/\(.*?\)/g, '')   // hapus semua tanda kurung yang tersisa
    .replace(/\//g, ' ')
    .replace(/&/g, 'dan')
    .replace(/[^\w\s\d]/gi, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

/**
 * Menghasilkan link PENCARIAN YouTube yang aman dan selalu berfungsi.
 * Digunakan untuk katalog Destinasi, Kuliner, dan Kebudayaan.
 *
 * TIDAK menggunakan videoUrl langsung agar link tidak pernah mati.
 */
export function getSafeYoutubeUrl(title?: string, contextTag: string = '', _customUrl?: string): string {
  if (!title || !title.trim()) {
    return 'https://www.youtube.com/results?search_query=Pariwisata+Sumatera+Barat';
  }

  let cleanTitle = cleanTitleForSearch(title);

  // Tambahkan konteks regional jika belum ada dan relevan
  if (contextTag && cleanTitle.length > 0) {
    const cleanContext = cleanTitleForSearch(contextTag);
    const hasRegionalContext = /sumatera barat|sumbar|padang|minang|bukittinggi/i.test(cleanTitle);
    if (!hasRegionalContext && cleanContext && cleanTitle.toLowerCase().indexOf(cleanContext.toLowerCase()) === -1) {
      cleanTitle = `${cleanTitle} ${cleanContext}`;
    }
  }

  if (!cleanTitle || cleanTitle.length < 3) {
    cleanTitle = (title || '').replace(/[()]/g, ' ').replace(/\s+/g, ' ').trim();
  }

  const query = encodeURIComponent(cleanTitle.trim());
  return `https://www.youtube.com/results?search_query=${query}`;
}

/**
 * Map nama bersih untuk setiap event berdasarkan ID atau kata kunci judul.
 * Selalu menggunakan link PENCARIAN YouTube, tidak pernah link video langsung.
 * Ini memastikan link tidak pernah error "Video tidak tersedia".
 */
const EVENT_SEARCH_MAP: Array<{
  match: (id: string, titleLower: string) => boolean;
  keyword: string;
}> = [
  { match: (id, t) => id === 'ev1' || t.includes('pacu jawi'), keyword: 'Pacu Jawi Sumatera Barat' },
  { match: (id, t) => id === 'ev2' || t.includes('tour de singkarak'), keyword: 'Tour de Singkarak' },
  { match: (id, t) => id === 'ev3' || t.includes('tabuik'), keyword: 'Hoyak Tabuik Pariaman' },
  { match: (id, t) => id === 'ev4' || t.includes('rang solok'), keyword: 'Rang Solok Baralek Gadang' },
  { match: (id, t) => id === 'ev5' || t.includes('songket carnival'), keyword: 'Sawahlunto International Songket Carnival' },
  { match: (id, t) => id === 'ev6' || t.includes('botuang'), keyword: 'Payakumbuh Botuang Festival' },
  { match: (id, t) => id === 'ev7' || t.includes('pesona minangkabau'), keyword: 'Festival Pesona Minangkabau' },
  { match: (id, t) => id === 'ev8' || t.includes('siti nurbaya'), keyword: 'Festival Siti Nurbaya Padang' },
  { match: (id, t) => id === 'ev9' || t.includes('rakik'), keyword: 'Festival Rakik Rakik Danau Maninjau' },
  { match: (id, t) => id === 'ev10' || t.includes('5 danau'), keyword: 'Festival Lima Danau Solok' },
  { match: (id, t) => id === 'ev11' || t.includes('music festival') || t.includes('simfes'), keyword: 'Sawahlunto International Music Festival' },
  { match: (id, t) => id === 'ev12' || t.includes('pesona mentawai'), keyword: 'Festival Pesona Mentawai' },
  { match: (id, t) => id === 'ev13' || t.includes('bakajang') || t.includes('barajang'), keyword: 'Alek Bakajang Lima Puluh Kota' },
  { match: (id, t) => id === 'ev14' || t.includes('langkisau'), keyword: 'Festival Langkisau Painan Pesisir Selatan' },
  { match: (id, t) => id === 'ev15' || t.includes('maapam'), keyword: 'Festival Tradisi Maapam Pasaman' },
  { match: (id, t) => id === 'ev16' || t.includes('pasa harau'), keyword: 'Pasa Harau Art Culture Festival' },
  { match: (id, t) => id === 'ev17' || t.includes('muaro padang'), keyword: 'Festival Muaro Padang' },
  { match: (id, t) => id === 'ev18' || t.includes('pamalayu'), keyword: 'Festival Budaya Pamalayu Dharmasraya' },
  { match: (id, t) => id === 'ev19' || t.includes('pacu kudo') || t.includes('pacu kuda'), keyword: 'Pacu Kuda Tradisional Minangkabau' },
  { match: (id, t) => id === 'ev20' || (t.includes('danau maninjau') && t.includes('kelok')), keyword: 'Festival Pesona Danau Maninjau' },
];

/**
 * Menghasilkan link PENCARIAN YouTube khusus untuk item event.
 *
 * ⚠️ SELALU menggunakan YouTube search (bukan link video langsung),
 * bahkan jika event memiliki field videoUrl di Firestore.
 * Ini mencegah error "Video tidak tersedia" saat video dihapus oleh pemiliknya.
 */
export function getEventYoutubeUrl(event?: { id?: string; title?: string; videoUrl?: string } | null): string {
  if (!event) {
    return 'https://www.youtube.com/results?search_query=Event+Pariwisata+Sumatera+Barat';
  }

  // ⛔ JANGAN gunakan event.videoUrl langsung — bisa sudah dihapus di YouTube!
  // Selalu gunakan link pencarian YouTube agar selalu berfungsi.

  const id = (event.id || '').toLowerCase().trim();
  const titleLower = (event.title || '').toLowerCase();

  // Cari keyword yang paling tepat dari peta event
  for (const entry of EVENT_SEARCH_MAP) {
    if (entry.match(id, titleLower)) {
      const query = encodeURIComponent(entry.keyword);
      return `https://www.youtube.com/results?search_query=${query}`;
    }
  }

  // Fallback: bersihkan judul dari tag/label dan jadikan keyword pencarian
  const cleanKeyword = cleanTitleForSearch(event.title || '');
  if (cleanKeyword && cleanKeyword.length > 2) {
    const query = encodeURIComponent(cleanKeyword);
    return `https://www.youtube.com/results?search_query=${query}`;
  }

  return 'https://www.youtube.com/results?search_query=Festival+Sumatera+Barat';
}

/**
 * Mengurai URL YouTube menjadi format embed (hanya untuk fitur preview video internal).
 * Tidak digunakan untuk tombol YouTube di katalog publik.
 */
export function getYoutubeEmbedUrl(url?: string): string | null {
  if (!url) return null;
  try {
    const trimmed = url.trim();
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=|shorts\/)([^#&?]*).*/;
    const match = trimmed.match(regExp);
    if (match && match[2].length === 11) {
      const origin = typeof window !== 'undefined' && window.location.origin
        ? `&origin=${encodeURIComponent(window.location.origin)}`
        : '';
      return `https://www.youtube.com/embed/${match[2]}?autoplay=1&mute=1&loop=1&playlist=${match[2]}&playsinline=1&controls=1&modestbranding=1&rel=0&enablejsapi=1${origin}`;
    }
  } catch (e) {
    console.warn('Failed to parse YouTube embed URL:', e);
  }
  return null;
}
