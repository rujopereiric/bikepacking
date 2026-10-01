/* kill-switch: the app moved to https://rujopereiric.github.io/festa-avante-guide/
   This worker replaces the old cache-first worker on installed clients:
   it wipes the caches, unregisters itself and reloads open pages so the
   redirect at index.html takes effect. */
self.addEventListener("install", () => self.skipWaiting());
self.addEventListener("activate", (e) => {
  e.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys.map((k) => caches.delete(k)));
    await self.registration.unregister();
    const clients = await self.clients.matchAll({ type: "window" });
    clients.forEach((c) => c.navigate(c.url));
  })());
});
