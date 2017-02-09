//https://developers.google.com/web/fundamentals/getting-started/primers/service-workers
var CACHE_NAME = '#1486635876181';
var urlsToCache = [
  '/css/style.css',
  '/js/main.js',
  '/js/svg4everybody.js',
  '/icon.svg'
];

var BLACKLIST = [
  '/',
];

self.addEventListener('install', function (event) {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function (cache) {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', function (event) {
  event.respondWith(
    caches.match(event.request)
      .then(function (response) {
        if (response) {
          return response;
        }
        var fetchRequest = event.request.clone();

        return fetch(fetchRequest).then(

          function (response) {
            var shouldCache = true;

            for (var i = 0; i < BLACKLIST.length; i++) {
              var regExp = new RegExp(BLACKLIST[i]);
              if (regExp.test(fetchRequest.url)) {
                shouldCache = false;
                break;
              }
            }

            if (!shouldCache || !response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }

            var responseToCache = response.clone();

            caches.open(CACHE_NAME)
              .then(function (cache) {
                cache.put(event.request, responseToCache);
              });

            return response;
          }
        );
      })
  );
});

self.addEventListener('activate', function (event) {
  event.waitUntil(
    caches.keys().then(function (cacheNames) {
      return Promise.all(
        cacheNames.map(function (cacheName) {
          if (CACHE_NAME != cacheName) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
