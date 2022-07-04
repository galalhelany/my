const cacheName = "pwa-v1";
const staticAssets = [
  "./",
  "./index.html",
  "./work.html",
  "./my-resume.html",
  "./js/app.js",
  "./css/style.css",
];

self.addEventListener("install", async (event) => {
  const cache = await caches.open(cacheName);
  await cache.addAll(staticAssets);
});
self.addEventListener("fetch", (event) => {
  const req = event.request;
  event.respondWith(cacheFirst(req));
});

async function cacheFirst(req) {
  const cache = await caches.open(cacheName);
  const cachedResponse = await cache.match(req);
  return cachedResponse || fetch(req);
}