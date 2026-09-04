/**
 * Image Delivery Optimization Helper
 * Automatically injects WebP/AVIF auto format, auto quality, and responsive width
 * into Cloudinary URLs to reduce payload size by up to 80-90%.
 */
export function optimizeImageUrl(url?: string, width?: number): string {
  if (!url) return '';
  const trimmed = url.trim();

  // If it's a Cloudinary URL
  if (trimmed.includes('res.cloudinary.com') && trimmed.includes('/upload/')) {
    // If it already contains optimization params, don't double-transform
    if (trimmed.includes('f_auto') || trimmed.includes('q_auto')) {
      return trimmed;
    }

    const transformParams = width ? `f_auto,q_auto,w_${width}` : 'f_auto,q_auto';
    return trimmed.replace('/upload/', `/upload/${transformParams}/`);
  }

  // If it's a Google Usercontent URL (lh3.googleusercontent.com)
  if (trimmed.includes('lh3.googleusercontent.com/d/')) {
    const cleanUrl = trimmed.split('=')[0];
    const targetWidth = width || (typeof window !== 'undefined' && window.innerWidth < 768 ? 960 : 1600);
    // =w{width}-rw serves optimized WebP format with resized dimensions directly from Google CDN!
    return `${cleanUrl}=w${targetWidth}-rw`;
  }

  return trimmed;
}
