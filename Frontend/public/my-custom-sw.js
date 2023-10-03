self.addEventListener('fetch', (event) => {
    if (new RegExp("/^\/oauth2/").test(event.request.url) || new RegExp("/^\/api/").test(event.request.url)) {
        // Respond to this request with a network fetch, bypassing the cache
        event.respondWith(fetch(event.request));
        return;
    }
  });