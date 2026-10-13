
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

export interface ImageOptimizationStats {
  originalBytes: number;
  compressedBytes: number;
  reductionPercentage: number;
  width: number;
  height: number;
  format: string;
}

export interface OptimizedImagePayload {
  dataUrl: string;
  stats: ImageOptimizationStats;
}

/**
 * Format raw byte size into human-readable string (e.g. 2.4 MB, 68 KB)
 */
export function formatBytes(bytes: number, decimals: number = 1): string {
  if (!bytes || bytes === 0) return '0 B';
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
}

/**
 * Compresses an image file on the client using HTML Canvas before uploading.
 * Converts to WebP format with maximum width/height constraints and quality reduction.
 * Returns both the Blob and the actual final dimensions.
 */
export async function compressImageWithDimensions(
  file: File,
  maxWidth: number = 1600,
  maxHeight: number = 1200,
  quality: number = 0.85
): Promise<{ blob: Blob; width: number; height: number }> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const objectUrl = URL.createObjectURL(file);
    img.src = objectUrl;

    img.onload = () => {
      URL.revokeObjectURL(objectUrl);
      let width = img.width;
      let height = img.height;

      // Calculate aspect ratio
      if (width > maxWidth || height > maxHeight) {
        if (width / height > maxWidth / maxHeight) {
          height = Math.round((height * maxWidth) / width);
          width = maxWidth;
        } else {
          width = Math.round((width * maxHeight) / height);
          height = maxHeight;
        }
      }

      const canvas = document.createElement('canvas');
      canvas.width = width;
      canvas.height = height;

      const ctx = canvas.getContext('2d');
      if (!ctx) {
        resolve({ blob: file, width: img.width, height: img.height });
        return;
      }

      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = 'high';
      ctx.drawImage(img, 0, 0, width, height);

      canvas.toBlob(
        (blob) => {
          if (blob) {
            resolve({ blob, width, height });
          } else {
            resolve({ blob: file, width: img.width, height: img.height });
          }
        },
        'image/webp',
        quality
      );
    };

    img.onerror = (err) => {
      URL.revokeObjectURL(objectUrl);
      reject(new Error('Gagal memproses berkas gambar: ' + err));
    };
  });
}

/**
 * Compresses an image file on the client using HTML Canvas before uploading.
 * Converts to WebP format with maximum width/height constraints and quality reduction.
 */
export async function compressImage(
  file: File,
  maxWidth: number = 1600,
  maxHeight: number = 1200,
  quality: number = 0.85
): Promise<Blob> {
  const res = await compressImageWithDimensions(file, maxWidth, maxHeight, quality);
  return res.blob;
}

/**
 * Helper to convert Blob to base64 Data URL
 */
function blobToDataURL(blob: Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => resolve(e.target?.result as string);
    reader.onerror = (err) => reject(err);
    reader.readAsDataURL(blob);
  });
}

/**
 * Processes and optimizes an image file directly on the client using HTML5 Canvas WebP compression.
 * Targets a lightweight 60-90 KB payload so documents in Firestore remain tiny, ultra-fast, and bandwidth-friendly.
 * Completely free, runs 100% locally in browser, zero Blaze Plan needed, and instantly fast (~200ms)!
 * Returns both the base64 dataUrl and detailed compression metrics for visual UI display.
 */
export async function processCatalogImageWithStats(
  file: File,
  folder: string = 'catalog',
  onProgress?: (percent: number) => void
): Promise<OptimizedImagePayload> {
  const originalBytes = file.size;
  const isHeroBackground = folder === 'settings' || folder === 'hero';

  try {
    // Stage 1: Reading file & starting compression
    if (onProgress) onProgress(20);

    let comp: { blob: Blob; width: number; height: number };

    if (isHeroBackground) {
      // HIGH-RESOLUTION HERO BACKGROUND PROFILE:
      // Preserves razor-sharp 2K/Full-HD clarity (up to 2048x1365 at 0.92 quality)
      comp = await compressImageWithDimensions(file, 2048, 1365, 0.92);
      if (onProgress) onProgress(55);

      // Safeguard Tier 1 for Firestore 1MB document limit: if > 420KB, step to 1920x1200 at 0.88
      if (comp.blob.size > 420 * 1024) {
        comp = await compressImageWithDimensions(file, 1920, 1200, 0.88);
        if (onProgress) onProgress(75);
      }

      // Safeguard Tier 2: if still > 360KB, step to 1920x1080 at 0.84 (still Full HD 1080p sharp!)
      if (comp.blob.size > 360 * 1024) {
        comp = await compressImageWithDimensions(file, 1920, 1080, 0.84);
        if (onProgress) onProgress(90);
      }
    } else {
      // STANDARD CATALOG THUMBNAIL PROFILE:
      // Stage 2: Client-side WebP compression (1200x900 max, quality 0.82)
      comp = await compressImageWithDimensions(file, 1200, 900, 0.82);
      if (onProgress) onProgress(50);

      // Safeguard Tier 1: If larger than 110KB, adaptively compress to 1000x750 at 0.76
      if (comp.blob.size > 110 * 1024) {
        comp = await compressImageWithDimensions(file, 1000, 750, 0.76);
        if (onProgress) onProgress(70);
      }

      // Safeguard Tier 2: If still larger than 90KB, compress to 880x660 at 0.72
      if (comp.blob.size > 90 * 1024) {
        comp = await compressImageWithDimensions(file, 880, 660, 0.72);
        if (onProgress) onProgress(85);
      }
    }

    const compressedBytes = comp.blob.size;
    const reductionPercentage = Math.max(0, Math.round(((originalBytes - compressedBytes) / originalBytes) * 100));

    // Stage 3: Generate Base64 Data URL for instant preview and Firestore persistence
    const dataUrl = await blobToDataURL(comp.blob);
    if (onProgress) onProgress(100);

    return {
      dataUrl,
      stats: {
        originalBytes,
        compressedBytes,
        reductionPercentage,
        width: comp.width,
        height: comp.height,
        format: 'WebP'
      }
    };
  } catch (err: any) {
    console.warn('Image compression fallback:', err);
    if (onProgress) onProgress(100);
    // If original file is already small (< 200KB), allow it; otherwise throw error to protect Firestore quota
    if (file.size < 200 * 1024) {
      const dataUrl = await blobToDataURL(file);
      return {
        dataUrl,
        stats: {
          originalBytes,
          compressedBytes: file.size,
          reductionPercentage: 0,
          width: 0,
          height: 0,
          format: file.type.replace('image/', '').toUpperCase() || 'RAW'
        }
      };
    }
    throw new Error('Resolusi foto terlalu tinggi dan gagal dikompresi. Silakan gunakan foto berukuran di bawah 5MB atau format JPG/PNG standar.');
  }
}

/**
 * Backward compatible wrapper for uploadCatalogImage
 */
export async function uploadCatalogImage(
  file: File,
  folder: string = 'catalog',
  onProgress?: (percent: number) => void
): Promise<string> {
  const result = await processCatalogImageWithStats(file, folder, onProgress);
  return result.dataUrl;
}
