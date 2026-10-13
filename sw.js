const V = 'bnd-archive-v1';
const SHELL = ['./', 'index.html', 'data.js', 'manifest.webmanifest', 'icons/icon-192.png', 'icons/icon-512.png'];

self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(V).then((c) => c.addAll(SHELL)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== V).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

// 네트워크 우선: data.js를 수정해 올리면 바로 반영되고, 오프라인이면 캐시를 보여줍니다.
self.addEventListener('fetch', (e) => {
  const r = e.request;
  if (r.method !== 'GET' || new URL(r.url).origin !== location.origin) return;
  e.respondWith(
    fetch(r)
      .then((res) => {
        const copy = res.clone();
        caches.open(V).then((c) => c.put(r, copy));
        return res;
      })
      .catch(() => caches.match(r).then((m) => m || caches.match('index.html')))
  );
});
