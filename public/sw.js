const CACHE_NAME = 'mfc-youth-tarlac-portal-v4.43';
const ASSETS_TO_CACHE = [
    './',
    './index.html',

    './manifest.json',
    './mfc-logo.png',
    'https://cdn.jsdelivr.net/npm/chart.js@4.4.1/dist/chart.umd.min.js',
    'https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js',
    'https://cdnjs.cloudflare.com/ajax/libs/jspdf-autotable/3.5.31/jspdf.plugin.autotable.min.js',
    'https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js',
    'https://unpkg.com/html5-qrcode@2.3.8/html5-qrcode.min.js',
];

// Install Event - Precache essential assets
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches
            .open(CACHE_NAME)
            .then((cache) => {
                console.log('[SW] Caching core MFC Youth Tarlac Portal assets');
                // Cache assets individually to prevent the entire caching process from failing if one fails
                return Promise.allSettled(
                    ASSETS_TO_CACHE.map((url) =>
                        cache.add(url).catch((err) => {
                            console.warn(`[SW] Failed to cache: ${url}`, err);
                        })
                    )
                );
            })
            .then(() => self.skipWaiting())
    );
});

// Activate Event - Clean up outdated caches
self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches
            .keys()
            .then((cacheNames) => {
                return Promise.all(
                    cacheNames.map((name) => {
                        if (name !== CACHE_NAME) {
                            console.log('[SW] Deleting old cache:', name);
                            return caches.delete(name);
                        }
                    })
                );
            })
            .then(() => self.clients.claim())
    );
});

// Fetch Event - Stale-While-Revalidate for aggressive caching
self.addEventListener('fetch', (event) => {
    if (event.request.method !== 'GET') return;

    event.respondWith(
        caches.match(event.request).then((cachedResponse) => {
            const fetchPromise = fetch(event.request).then((networkResponse) => {
                if (
                    networkResponse &&
                    networkResponse.status === 200 &&
                    (networkResponse.type === 'basic' || networkResponse.type === 'cors')
                ) {
                    const responseClone = networkResponse.clone();
                    caches.open(CACHE_NAME).then((cache) => {
                        cache.put(event.request, responseClone);
                    });
                }
                return networkResponse;
            });

            return (
                cachedResponse ||
                fetchPromise.catch(() => {
                    // Fallback to prevent TypeError if network fails and no cache exists
                    return new Response('Network Error', {
                        status: 503,
                        statusText: 'Service Unavailable'
                    });
                })
            );
        })
    );
});
