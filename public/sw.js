// Delft Dutch App — Service Worker
// A minimal "network-first" service worker that satisfies the PWA installability
// requirement without affecting development or app behaviour.

const CACHE_NAME = 'delft-dutch-v1';

// Assets to pre-cache on install so the app shell works offline
const PRECACHE_URLS = [
  '/',
  '/favicon.ico.jpg',
  '/manifest.json',
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(PRECACHE_URLS))
  );
  // Activate immediately without waiting for old tabs to close
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  // Remove stale caches from previous versions
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys
          .filter((key) => key !== CACHE_NAME)
          .map((key) => caches.delete(key))
      )
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  const { request } = event;

  // Only handle GET requests; skip cross-origin, API, and Next.js internal routes
  if (
    request.method !== 'GET' ||
    !request.url.startsWith(self.location.origin) ||
    request.url.includes('/_next/') ||
    request.url.includes('/api/')
  ) {
    return;
  }

  // Network-first strategy: always try the network, fall back to cache
  event.respondWith(
    fetch(request)
      .then((response) => {
        // Clone the response and store it in the cache for offline fallback
        const clone = response.clone();
        caches.open(CACHE_NAME).then((cache) => cache.put(request, clone));
        return response;
      })
      .catch(() => caches.match(request))
  );
});
