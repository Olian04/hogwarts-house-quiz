// Service worker: makes the quiz installable and fully usable offline.
// Bump CACHE on each release to retire the previous cache.
const CACHE = 'hq-cache-v4';

// The app shell + every asset the page needs to run with no network.
const ASSETS = [
  './',
  'index.html',
  'app.js',
  'quiz-data.js',
  'style.css',
  'site.webmanifest',
  'assets/Gryffindor.svg',
  'assets/Hufflepuff.svg',
  'assets/Ravenclaw.svg',
  'assets/Slytherin.svg',
  'assets/favicon/favicon.ico',
  'assets/favicon/favicon.svg',
  'assets/favicon/favicon-96x96.png',
  'assets/favicon/apple-touch-icon.png',
  'assets/favicon/web-app-manifest-192x192.png',
  'assets/favicon/web-app-manifest-512x512.png',
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE).then((cache) => cache.addAll(ASSETS)).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  const req = event.request;
  if (req.method !== 'GET') return;
  if (new URL(req.url).origin !== self.location.origin) return; // let cross-origin (share intents, etc.) pass through

  // Navigations: try the network first (so a fresh deploy is picked up online),
  // fall back to the cached shell when offline. Hash result routes load the same
  // index.html, so this also serves shared links offline.
  if (req.mode === 'navigate') {
    event.respondWith(
      fetch(req).catch(() => caches.match('index.html').then((r) => r || caches.match('./')))
    );
    return;
  }

  // Static assets: stale-while-revalidate — serve cache instantly (works
  // offline) while refreshing it in the background for next time.
  event.respondWith(
    caches.open(CACHE).then((cache) =>
      cache.match(req).then((cached) => {
        const network = fetch(req)
          .then((res) => {
            if (res && res.status === 200) cache.put(req, res.clone());
            return res;
          })
          .catch(() => cached);
        return cached || network;
      })
    )
  );
});
