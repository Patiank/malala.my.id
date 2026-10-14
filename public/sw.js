// MALALA PWA Service Worker - Tiered Smart Versioned Caching for Flipbook & Assets
const CACHE_VERSION = 'malala-flipbook-v3';
const IMAGE_CACHE_NAME = 'malala-flipbook-images-v3';

self.addEventListener('install', (event) => {
  // Activate immediately without waiting for existing clients to close
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((name) => name !== CACHE_VERSION && name !== IMAGE_CACHE_NAME)
          .map((staleCacheName) => {
            console.log('[ServiceWorker] Purging stale cache:', staleCacheName);
            return caches.delete(staleCacheName);
          })
      );
    }).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);

  // 1. Flipbook Page & Thumb Images: Cache-First Strategy (Persistent in Mobile Cache)
  if (url.pathname.includes('/flipbook/') && /\.(jpe?g|png|webp|svg)$/i.test(url.pathname)) {
    event.respondWith(
      caches.open(IMAGE_CACHE_NAME).then((cache) => {
        return cache.match(event.request).then((cachedResponse) => {
          if (cachedResponse) {
            return cachedResponse;
          }
          return fetch(event.request).then((networkResponse) => {
            if (networkResponse && networkResponse.status === 200) {
              cache.put(event.request, networkResponse.clone());
            }
            return networkResponse;
          });
        });
      })
    );
    return;
  }

  // 2. Flipbook HTML & Config files: Network-First (Validates ETag / 304 with offline fallback)
  if (url.pathname.includes('/flipbook/') && (url.pathname.endsWith('.html') || url.pathname.endsWith('config.js'))) {
    event.respondWith(
      fetch(event.request).catch(() => caches.match(event.request))
    );
    return;
  }

  // 3. Default: Browser default handling
});
