const cacheName = 'version_one'
const urlsToCache = [
  '/',
  '/index.html',
  '/assets/css/style.css',
  '/assets/js/app.js',
  '/assets/js/preloader.js',
  '/assets/js/map.js'
]

// ====== installation of service worker ===== 
self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(cacheName)
    .then(cache => {
      console.log('Opened cache')
      return cache.addAll(urlsToCache)
    })
  )
})