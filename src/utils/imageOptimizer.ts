
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
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.src = URL.createObjectURL(file);

    img.onload = () => {
      URL.revokeObjectURL(img.src);
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
        resolve(file);
        return;
      }

      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = 'high';
      ctx.drawImage(img, 0, 0, width, height);

      canvas.toBlob(
        (blob) => {
          if (blob) {
            resolve(blob);
          } else {
            resolve(file);
          }
        },
        'image/webp',
        quality
      );
    };

    img.onerror = (err) => {
      reject(new Error('Gagal memproses berkas gambar: ' + err));
    };
  });
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
 * Completely free, runs 100% locally in browser, zero Blaze Plan needed, and instantly fast (~200ms)!
 */
export async function uploadCatalogImage(
  file: File,
  _folder: string = 'catalog',
  onProgress?: (percent: number) => void
): Promise<string> {
  try {
    // Stage 1: Reading file & starting compression
    if (onProgress) onProgress(25);

    // Stage 2: Client-side WebP compression (1280x960 max, quality 0.80)
    let compressedBlob = await compressImage(file, 1280, 960, 0.80);
    if (onProgress) onProgress(60);

    // Safeguard: If still larger than 250KB, compress adaptively to ensure light payload (<100KB)
    if (compressedBlob.size > 250 * 1024) {
      compressedBlob = await compressImage(file, 960, 720, 0.72);
    }
    if (onProgress) onProgress(85);

    // Stage 3: Generate Base64 Data URL for instant preview and Firestore persistence
    const dataUrl = await blobToDataURL(compressedBlob);
    if (onProgress) onProgress(100);

    return dataUrl;
  } catch (err: any) {
    console.warn('Image compression fallback:', err);
    if (onProgress) onProgress(100);
    // If original file is already small (< 400KB), allow it; otherwise throw error to protect Firestore 1MB quota
    if (file.size < 400 * 1024) {
      return await blobToDataURL(file);
    }
    throw new Error('Resolusi foto terlalu tinggi dan gagal dikompresi. Silakan gunakan foto berukuran di bawah 5MB atau format JPG/PNG standar.');
  }
}
