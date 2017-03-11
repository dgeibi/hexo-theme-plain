// vecka.14islands.com/service-worker.js
// https://github.com/14islands/vecka.14islands.com/blob/master/server/service-worker.js
const ASSETS_CACHE = "assets-v3.8"
const PAGES_CACHE = "pages-v1.5"
const expectedCaches = [ASSETS_CACHE, PAGES_CACHE]
const urlsToCache = [
  '/css/style.css',
  '/js/main.js',
  '/js/svg4everybody.js',
  '/icon.svg',
  '/offline.html',
  '/manifest.json'
]

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
  if (shouldHandleFetch(event.request)) {
    var url = new URL(event.request.url)
    if (/^\/(about|20\d{2})\/.*$/.test(url.pathname)) {
      respondFromCacheThenNetwork(event, PAGES_CACHE)
      return
    } else if (/^\/((archives|page)\/.*)?$/.test(url.pathname)) {
      respondFromNetworkThenCache(event, PAGES_CACHE)
      return
    }
    respondFromCacheThenNetwork(event, ASSETS_CACHE)
  }
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
})

function fetchFromCache(request) {
  return caches.match(request).then(response => {
    if (response) {
      return response;
    } else {
      throw Error(`${request.url} not found in cache`)
    }
  })
}

function putCache(request, response, key) {
  if (response.ok) {
    const copy = response.clone()
    caches.open(key).then(cache => {
      cache.put(request, copy)
    })
  }
  return response
}

function offlineResponse(request) {
  if (request.headers.get('accept').includes('text/html')) {
    return caches.match('offline.html')
  }
}

function respondFromCacheThenNetwork(event, key) {
  const request = event.request
  event.respondWith(
    fetchFromCache(request)
      .catch(() => fetch(request.clone()))
      .then(response => putCache(request, response, key))
      .catch(() => offlineResponse(request))
  )
}

function respondFromNetworkThenCache(event, key) {
  const request = event.request
  event.respondWith(
    fetch(request.clone())
      .then(response => putCache(request, response, key))
      .catch(() => fetchFromCache(request))
      .catch(() => offlineResponse(request))
  )
}

function shouldHandleFetch(request) {
  const url = new URL(request.url)
  const should = request.method.toLowerCase() === 'get' && url.origin === location.origin && !/^\/sw.js$/.test(url.pathname)
  return should
}
