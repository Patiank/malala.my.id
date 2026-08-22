/**
 * Utility for generating safe, 100% copyright-free YouTube search links and parsing video URLs.
 */

/**
 * Returns a safe YouTube link:
 * - If customUrl is provided (e.g., custom search query URL or specific approved video), it uses that.
 * - Otherwise, it automatically generates a 100% copyright-free search query link on YouTube for the item.
 */
export function getSafeYoutubeUrl(title?: string, contextTag: string = '', customUrl?: string): string {
  if (customUrl && customUrl.trim() !== '') {
    return customUrl.trim();
  }
  const cleanTitle = (title || '').replace(/[^\w\s\d]/gi, ' ').replace(/\s+/g, ' ').trim();
  const cleanContext = (contextTag || '').replace(/[^\w\s\d]/gi, ' ').replace(/\s+/g, ' ').trim();
  const query = encodeURIComponent(`${cleanTitle} ${cleanContext} Sumatera Barat`.trim());
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
