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

  return trimmed;
}
