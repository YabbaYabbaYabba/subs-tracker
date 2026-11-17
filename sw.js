// Change VERSION whenever the files are replaced, so phones pick up the update.
const VERSION = "subs-v6";
const ICONS = "subs-icons"; // icons loaded from services' own websites, kept for offline use
const SHELL = ["./", "index.html", "manifest.webmanifest", "icons/apple-touch-icon.png", "icons/icon-192.png", "icons/icon-512.png"];
self.addEventListener("install", e => {
  e.waitUntil(caches.open(VERSION).then(c => c.addAll(SHELL)).then(() => self.skipWaiting()));
});
self.addEventListener("activate", e => {
  e.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k !== VERSION && k !== ICONS).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener("fetch", e => {
  if (e.request.method !== "GET") return;
  const url = new URL(e.request.url);
  // website icons shown on cards: cache first, so they still appear offline
  if (url.origin !== location.origin) {
    // only plain image loads; requests that ask the site for permission to copy the icon (CORS) go straight to the network
    if (e.request.destination !== "image" || e.request.mode === "cors" || url.protocol !== "https:") return;
    e.respondWith(caches.open(ICONS).then(c => c.match(e.request).then(hit => hit || fetch(e.request).then(res => {
      if (res.ok || res.type === "opaque") c.put(e.request, res.clone());
      return res;
    }))));
    return;
  }
  e.respondWith(
    caches.match(e.request, { ignoreSearch: true }).then(hit => {
      const fresh = fetch(e.request).then(res => {
        if (res.ok) { const copy = res.clone(); caches.open(VERSION).then(c => c.put(e.request, copy)); }
        return res;
      }).catch(() => hit || caches.match("index.html"));
      return hit || fresh;
    })
  );
});
