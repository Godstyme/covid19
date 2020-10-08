const staticCacheName = '9ja-covid19-cases!'
const dynamicCacheName = "9ja-covid19-records!";
const resources = [
  '/',
  '/index.html',
  '/assets/css/style.css',
  '/assets/imgs/logo.png',
  '/assets/imgs/search.png',
  '/assets/js/app.js',
  '/assets/js/preloader.js',
  '/assets/js/map.js'
]

// ====== installation of service worker ===== 
self.addEventListener('install', (e) => {
  e.waitUntil(
    caches
    .open(staticCacheName)
    .then(cache => {
      // console.log('Opened cache')
      return cache.addAll(resources)
    })
    .catch(err => console.log(err))
  )
});

// ======== fetching of the service worker ======
self.addEventListener("fetch", fetchEvent => {
  const { request } = fetchEvent;
  // console.log(request.url);

  fetchEvent.respondWith(
    caches
      .match(request)
      .then(response => {
        // return response || fetch(fetchEvent.request);
        if (response) {
          return response;
        }

        if (!request.url.includes("https://covidnigeria.herokuapp.com/api")) {
          return fetch(request);
        } else {
          // console.log(request.url);
          return fetch(request).then(response => {
            // console.log(response);

            return caches
              .open(dynamicCacheName)
              .then(cache => {
                cache.put(request.url, response.clone());
                return response;
              })
              .catch(err => console.log(err));
          });
        }
      })
      .catch(err => console.log(err))
  );
});