import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { storage } from '../lib/firebase';

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
 * Uploads an image file to Firebase Storage with automated client WebP compression,
 * or returns base64 data URL if storage is offline.
 */
export async function uploadCatalogImage(
  file: File,
  folder: string = 'catalog',
  onProgress?: (percent: number) => void
): Promise<string> {
  try {
    // 1. Compress image to optimal WebP
    const compressedBlob = await compressImage(file, 1600, 1200, 0.85);

    // 2. Upload to Firebase Storage
    const timestamp = Date.now();
    const cleanFileName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_').toLowerCase();
    const storagePath = `${folder}/${timestamp}_${cleanFileName.replace(/\.[^/.]+$/, '')}.webp`;
    const storageRef = ref(storage, storagePath);

    const uploadTask = uploadBytesResumable(storageRef, compressedBlob, {
      contentType: 'image/webp',
      cacheControl: 'public,max-age=31536000',
    });

    return new Promise((resolve, reject) => {
      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          if (onProgress) onProgress(Math.round(progress));
        },
        (error) => {
          console.warn('Firebase Storage upload notice, using local base64 fallback:', error);
          const reader = new FileReader();
          reader.onload = (e) => resolve(e.target?.result as string);
          reader.onerror = () => reject(error);
          reader.readAsDataURL(compressedBlob);
        },
        async () => {
          try {
            const downloadUrl = await getDownloadURL(uploadTask.snapshot.ref);
            resolve(downloadUrl);
          } catch (e) {
            const reader = new FileReader();
            reader.onload = (evt) => resolve(evt.target?.result as string);
            reader.readAsDataURL(compressedBlob);
          }
        }
      );
    });
  } catch (err: any) {
    console.warn('Image processing fallback:', err);
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => resolve(e.target?.result as string);
      reader.onerror = () => reject(err);
      reader.readAsDataURL(file);
    });
  }
}
