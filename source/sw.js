// vecka.14islands.com/service-worker.js
// https://github.com/14islands/vecka.14islands.com/blob/master/server/service-worker.js

/* eslint-disable no-console */
/* eslint-env serviceworker */
const ASSETS_CACHE = 'assets-v3.8'
const PAGES_CACHE = 'pages-v1.6'
const expectedCaches = [ASSETS_CACHE, PAGES_CACHE]

const urlsToCache = [
  '/css/style.css',
  '/js/main.js',
  '/js/svg4everybody.js',
  '/icon.svg',
  '/offline.html',
  '/manifest.json',
]

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(ASSETS_CACHE)
      .then((cache) => {
        console.log('Opened cache')
        return cache.addAll(urlsToCache)
      })
  )
})

function matchPath(path) {
  return regExp => regExp.test(path)
}

self.addEventListener('fetch', (event) => {
  if (!shouldHandleFetch(event.request)) return
  const request = event.request
  const url = new URL(request.url)
  const match = matchPath(url.pathname)
  if (request.headers.get('accept').includes('text/html')) {
    respondFromNetworkThenCache(event, PAGES_CACHE)
  } else if (match(/^\/(css|fonts|js|assets)\/.*$/)) {
    respondFromCacheThenNetwork(event, ASSETS_CACHE)
  }
})

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.map((key) => {
          if (expectedCaches.includes(key)) return undefined
          return caches.delete(key)
        })
      )
    ).then(() => {
      console.log('now ready to handle fetches.')
    })
  )
})

function fetchFromCache(request) {
  return caches.match(request).then((response) => {
    if (response) {
      return response
    }
    throw Error(`${request.url} not found in cache`)
  })
}

function putCache(request, response, key) {
  if (response.ok) {
    const copy = response.clone()
    caches.open(key).then((cache) => {
      cache.put(request, copy)
    })
  }
  return response
}

function offlineResponse(request) {
  if (!request.headers.get('accept').includes('text/html')) return undefined
  return caches.match('offline.html')
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
  const should = request.method.toLowerCase() === 'get' && url.origin === location.origin
  return should
}
