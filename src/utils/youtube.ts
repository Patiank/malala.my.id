/**
 * Utility for generating safe, 100% copyright-free YouTube search links and parsing video URLs.
 */

/**
 * Returns a clean, high-precision YouTube search link using the primary title/name.
 */
export function getSafeYoutubeUrl(title?: string, contextTag: string = '', customUrl?: string): string {
  if (customUrl && customUrl.trim() !== '') {
    return customUrl.trim();
  }
  
  if (!title || !title.trim()) {
    return 'https://www.youtube.com/results?search_query=Pariwisata+Sumatera+Barat';
  }

  // 1. Strip parenthetical explanations, brackets, and secondary tags
  let cleanTitle = title
    .replace(/\s*\(\s*KEN\s*\)/gi, '')
    .replace(/\s*\(\s*Rekor\s*MURI\s*\)/gi, '')
    .replace(/\s*\/\s*SISSCa/gi, '')
    .replace(/\s*\/\s*SIMFes/gi, '')
    .replace(/\(.*?\)/g, '')
    .replace(/[^\w\s\d]/gi, ' ')
    .replace(/\s+/g, ' ')
    .trim();

  if (!cleanTitle || cleanTitle.length < 3) {
    cleanTitle = title.replace(/[^\w\s\d]/gi, ' ').replace(/\s+/g, ' ').trim();
  }

  const query = encodeURIComponent(cleanTitle);
  return `https://www.youtube.com/results?search_query=${query}`;
}

/**
 * Returns a dedicated, highly accurate YouTube search link for Events using ONLY the clean event name.
 */
export function getEventYoutubeUrl(event?: { id?: string; title?: string; videoUrl?: string } | null): string {
  if (!event) return 'https://www.youtube.com/results?search_query=Event+Pariwisata+Sumatera+Barat';
  if (event.videoUrl && event.videoUrl.trim() !== '') {
    return event.videoUrl.trim();
  }

  let name = event.title || '';
  const titleLower = name.toLowerCase();

  // Specific clean event names for 100% accuracy and highest relevance
  if (event.id === 'ev1' || titleLower.includes('pacu jawi')) name = 'Pacu Jawi';
  else if (event.id === 'ev2' || titleLower.includes('tour de singkarak')) name = 'Tour de Singkarak';
  else if (event.id === 'ev3' || titleLower.includes('tabuik')) name = 'Pesona Budaya Hoyak Tabuik Piaman';
  else if (event.id === 'ev4' || titleLower.includes('rang solok')) name = 'Festival Rang Solok Baralek Gadang';
  else if (event.id === 'ev5' || titleLower.includes('songket carnival')) name = 'Sawahlunto International Songket Carnival';
  else if (event.id === 'ev6' || titleLower.includes('botuang')) name = 'Payakumbuh Botuang Festival';
  else if (event.id === 'ev7' || titleLower.includes('pesona minangkabau')) name = 'Festival Pesona Minangkabau';
  else if (event.id === 'ev8' || titleLower.includes('siti nurbaya')) name = 'Festival Siti Nurbaya Padang';
  else if (event.id === 'ev9' || titleLower.includes('rakik')) name = 'Festival Rakik-Rakik Danau Maninjau';
  else if (event.id === 'ev10' || titleLower.includes('5 danau')) name = 'Festival 5 Danau Solok';
  else if (event.id === 'ev11' || titleLower.includes('music festival')) name = 'Sawahlunto International Music Festival';
  else if (event.id === 'ev12' || titleLower.includes('pesona mentawai')) name = 'Festival Pesona Mentawai';
  else if (event.id === 'ev13' || titleLower.includes('bakajang') || titleLower.includes('barajang')) name = 'Alek Bakajang Lima Puluh Kota';
  else if (event.id === 'ev14' || titleLower.includes('langkisau')) name = 'Festival Langkisau Pesisir Selatan';
  else if (event.id === 'ev15' || titleLower.includes('maapam')) name = 'Festival Tradisi Maapam Pasaman';
  else if (event.id === 'ev16' || titleLower.includes('pasa harau')) name = 'Pasa Harau Art & Culture Festival';
  else if (event.id === 'ev17' || titleLower.includes('muaro padang')) name = 'Festival Muaro Padang';
  else if (event.id === 'ev18' || titleLower.includes('pamalayu')) name = 'Festival Budaya Pamalayu Dharmasraya';
  else if (event.id === 'ev19' || titleLower.includes('pacu kudo')) name = 'Pacu Kuda Tradisional Minangkabau';
  else if (event.id === 'ev20' || titleLower.includes('danau maninjau & kelok 44')) name = 'Festival Pesona Danau Maninjau';
  else {
    // General clean
    name = name
      .replace(/\s*\(\s*KEN\s*\)/gi, '')
      .replace(/\s*\(\s*Rekor\s*MURI\s*\)/gi, '')
      .replace(/\s*\/\s*SISSCa/gi, '')
      .replace(/\s*\/\s*SIMFes/gi, '')
      .replace(/\(.*?\)/g, '')
      .replace(/\//g, ' ')
      .replace(/\s+/g, ' ')
      .trim();

    if (!name || name.length < 3) {
      name = (event.title || '').replace(/[()]/g, ' ').replace(/\s+/g, ' ').trim();
    }
  }

  const query = encodeURIComponent(name.trim());
  return `https://www.youtube.com/results?search_query=${query}`;
}

/**
 * Parses embed URL from YouTube video link (used if direct video is supplied)
 */
export function getYoutubeEmbedUrl(url?: string): string | null {
  if (!url) return null;
  try {
    const trimmed = url.trim();
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=|shorts\/)([^#&?]*).*/;
    const match = trimmed.match(regExp);
    if (match && match[2].length === 11) {
      const origin = typeof window !== 'undefined' && window.location.origin ? `&origin=${encodeURIComponent(window.location.origin)}` : '';
      return `https://www.youtube.com/embed/${match[2]}?autoplay=1&mute=1&loop=1&playlist=${match[2]}&playsinline=1&controls=1&modestbranding=1&rel=0&enablejsapi=1${origin}`;
    }
  } catch (e) {
    console.warn('Failed to parse YouTube embed URL:', e);
  }
  return null;
}
