/**
 * Ultra-Lightweight Persistent IndexedDB Cache Helper for Malala
 * 
 * Provides high-capacity asynchronous caching (hundreds of MBs) for Firestore documents
 * and Base64 images without running into the 5MB localStorage quota limit.
 * Completely zero dependencies, 100% browser-native, fail-safe.
 */

const DB_NAME = 'malala_offline_cache_db';
const STORE_NAME = 'catalog_cache';
const DB_VERSION = 1;

export interface CacheEnvelope<T> {
  data: T;
  timestamp: number;
}

function openDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    if (typeof window === 'undefined' || !window.indexedDB) {
      reject(new Error('IndexedDB not supported'));
      return;
    }
    const request = indexedDB.open(DB_NAME, DB_VERSION);
    request.onupgradeneeded = () => {
      const db = request.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME);
      }
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error || new Error('Failed to open IndexedDB'));
  });
}

/**
 * Get an item from cache. Returns null if not found or expired.
 */
export async function getLocalCache<T>(key: string, maxAgeMs?: number): Promise<T | null> {
  if (typeof window === 'undefined') return null;

  try {
    const db = await openDB();
    const item: CacheEnvelope<T> | null = await new Promise((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, 'readonly');
      const store = tx.objectStore(STORE_NAME);
      const req = store.get(key);
      req.onsuccess = () => resolve(req.result || null);
      req.onerror = () => reject(req.error);
    });

    if (!item) {
      // Fallback check in localStorage for small legacy keys
      try {
        const raw = localStorage.getItem(`cache_${key}`);
        if (raw) {
          const parsed = JSON.parse(raw);
          if (maxAgeMs && Date.now() - parsed.timestamp > maxAgeMs) {
            localStorage.removeItem(`cache_${key}`);
            return null;
          }
          return parsed.data as T;
        }
      } catch {}
      return null;
    }

    if (maxAgeMs && (Date.now() - item.timestamp > maxAgeMs)) {
      // Expired
      return null;
    }

    return item.data;
  } catch (err) {
    console.warn(`[LocalCache] Read error for ${key}:`, err);
    return null;
  }
}

/**
 * Save an item to cache with current timestamp.
 */
export async function setLocalCache<T>(key: string, data: T): Promise<void> {
  if (typeof window === 'undefined') return;

  const envelope: CacheEnvelope<T> = {
    data,
    timestamp: Date.now(),
  };

  try {
    const db = await openDB();
    await new Promise<void>((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, 'readwrite');
      const store = tx.objectStore(STORE_NAME);
      const req = store.put(envelope, key);
      req.onsuccess = () => resolve();
      req.onerror = () => reject(req.error);
    });
  } catch (err) {
    console.warn(`[LocalCache] Write error for ${key}:`, err);
    // Fallback to localStorage if small enough
    try {
      const serialized = JSON.stringify(envelope);
      if (serialized.length < 2 * 1024 * 1024) {
        localStorage.setItem(`cache_${key}`, serialized);
      }
    } catch {}
  }
}

/**
 * Clear a specific key or entire cache store.
 */
export async function clearLocalCache(key?: string): Promise<void> {
  if (typeof window === 'undefined') return;

  try {
    const db = await openDB();
    await new Promise<void>((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, 'readwrite');
      const store = tx.objectStore(STORE_NAME);
      const req = key ? store.delete(key) : store.clear();
      req.onsuccess = () => resolve();
      req.onerror = () => reject(req.error);
    });

    if (key) {
      localStorage.removeItem(`cache_${key}`);
    }
  } catch (err) {
    console.warn('[LocalCache] Clear error:', err);
  }
}
