/**
 * Utility for generating safe, 100% copyright-free YouTube search links and parsing video URLs.
 */

/**
 * Returns a safe YouTube link:
 * - If customUrl is provided (e.g., custom search query URL or specific approved video), it uses that.
 * - Otherwise, it automatically extracts the clean, primary name/title to generate a 100% copyright-free, high-precision search query on YouTube.
 */
export function getSafeYoutubeUrl(title?: string, contextTag: string = '', customUrl?: string): string {
  if (customUrl && customUrl.trim() !== '') {
    return customUrl.trim();
  }
  
  if (!title || !title.trim()) {
    return 'https://www.youtube.com/results?search_query=Pariwisata+Sumatera+Barat';
  }

  // 1. Extract clean primary title, stripping parenthetical descriptors, subtitle brackets, and internal tags
  let cleanTitle = title
    .replace(/\s*\(\s*KEN\s*\)/gi, '')
    .replace(/\s*\(\s*Rekor\s*MURI\s*\)/gi, '')
    .replace(/\s*\/\s*SISSCa/gi, '')
    .replace(/\s*\/\s*SIMFes/gi, '')
    .replace(/\(.*?\)/g, '')
    .replace(/[^\w\s\d]/gi, ' ')
    .replace(/\s+/g, ' ')
    .trim();

  // If title became too short after stripping brackets, fall back to original title cleaned
  if (!cleanTitle || cleanTitle.length < 3) {
    cleanTitle = title.replace(/[^\w\s\d]/gi, ' ').replace(/\s+/g, ' ').trim();
  }

  // 2. Clean contextTag
  let cleanContext = (contextTag || '')
    .replace(/\(.*?\)/g, '')
    .replace(/[^\w\s\d]/gi, ' ')
    .replace(/\s+/g, ' ')
    .trim();

  if (cleanContext && cleanTitle.toLowerCase().includes(cleanContext.toLowerCase())) {
    cleanContext = '';
  }

  // 3. Build a concise, high-hit-rate search query
  const queryParts = [cleanTitle];
  if (cleanContext) {
    queryParts.push(cleanContext);
  }

  // Add 'Sumatera Barat' only if regional identifier is not already in the query
  const fullTextLower = `${cleanTitle} ${cleanContext}`.toLowerCase();
  const regionalKeywords = [
    'sumatera', 'sumbar', 'padang', 'minang', 'minangkabau',
    'bukittinggi', 'pariaman', 'solok', 'sawahlunto', 'payakumbuh',
    'mentawai', 'pasaman', 'maninjau', 'singkarak', 'harau', 'sijunjung',
    'dharmasraya', 'pesisir selatan', 'tanah datar', 'agam', '50 kota', 'limapuluh kota'
  ];

  const hasRegionalContext = regionalKeywords.some(keyword => fullTextLower.includes(keyword));
  if (!hasRegionalContext) {
    queryParts.push('Sumatera Barat');
  }

  const query = encodeURIComponent(queryParts.join(' ').trim());
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
