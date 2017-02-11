const ASSETS_CACHE = "assets-v1"
const PAGES_CACHE = "pages-v1"
const expectedCaches = [ASSETS_CACHE, PAGES_CACHE]
const urlsToCache = [
  '/css/style.css',
  '/js/main.js',
  '/js/svg4everybody.js',
  '/icon.svg',
  '/404.html',
  '/manifest.json'
]
const pagePathPattern = /^\/(archives|about|20\d{2})\/(.*)$/
const assetPathPattern = /^\/(css|js|assets)\/(.+)$/

self.addEventListener('install', function (event) {
  event.waitUntil(
    caches.open(ASSETS_CACHE)
      .then(function (cache) {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  )
})

self.addEventListener('fetch', function (event) {
  event.respondWith(
    caches.match(event.request).then(response => {
      if (response) {
        return response;
      }
      var fetchRequest = event.request.clone();
      return fetch(fetchRequest).then(
        response => {
          function putCache(res, key) {
            var responseToCache = res.clone()
            caches.open(key)
              .then(function (cache) {
                cache.put(event.request, responseToCache);
              })
          }
          if (!response || !response.ok || response.type !== 'basic') {
            return response;
          }
          if (fetchRequest.url) {
            var url = new URL(fetchRequest.url)
            if (pagePathPattern.test(url.pathname)) {
              putCache(response, PAGES_CACHE)
            } else if (assetPathPattern.test(url.pathname)) {
              putCache(response, ASSETS_CACHE)
            }
          }
          return response;
        }
      );
    })
  );
});

self.addEventListener('activate', function (event) {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.map(key => {
          if (!expectedCaches.includes(key)) {
            return caches.delete(key);
          }
        })
      )
    ).then(() => {
      console.log("now ready to handle fetches.")
    })
  );
});