// const cacheName = "cache1"; // Change value to force update

// self.addEventListener("install", event => {
// 	// Kick out the old service worker
// 	self.skipWaiting();

// 	event.waitUntil(
// 		caches.open(cacheName).then(cache => {
// 			return cache.addAll([
// 				"/",
// 				"/index.html",
// 				"/css/style.css",
// 				"/css/flickity.css",
// 				"/css/font-awesome.min.css",
// 				"js/jquery.min.js",
// 				"js/flickity.pkgd.min.js",
// 				"js/jquery.touchSwipe.js",
// 				"/images/L&T-logo.png",
// 				"/images/Crescent.png",
// 				"/images/AMN.png",
// 				"/images/image_one.jpg",
// 				"/images/image_two.jpg",
// 				"/images/image_three.jpg",
// 				"/videos/2.mp4",
// 				"/videos/VIDEO-1.mp4",
// 				"/images/poster_5.jpg",
// 				"/images/poster_2.jpg"
// 			]);
// 		})
// 	);
// });

// self.addEventListener("activate", event => {
// 	// Delete any non-current cache
// 	event.waitUntil(
// 		caches.keys().then(keys => {
// 			Promise.all(
// 				keys.map(key => {
// 					if (![cacheName].includes(key)) {
// 						return caches.delete(key);
// 					}
// 				})
// 			)
// 		})
// 	);
// });

// // Offline-first, cache-first strategy
// // Kick off two asynchronous requests, one to the cache and one to the network
// // If there's a cached version available, use it, but fetch an update for next time.
// // Gets data on screen as quickly as possible, then updates once the network has returned the latest data. 
// self.addEventListener("fetch", event => {
// 	event.respondWith(
// 		caches.open(cacheName).then(cache => {
// 			return cache.match(event.request).then(response => {
// 				return response || fetch(event.request).then(networkResponse => {
// 					cache.put(event.request, networkResponse.clone());
// 					return networkResponse;
// 				});
// 			})
// 		})
// 	);
// });




var CACHE_NAME = "pwa-v1";
//Just a sample name, the cache name should be more relatable to the application
var urlsToCache = ["/",
				"/index.html",
				"/css/style.css",
				"/css/flickity.css",
				"/css/font-awesome.min.css",
				"js/jquery.min.js",
				"js/flickity.pkgd.min.js",
				"js/jquery.touchSwipe.js",
				"/images/L&T-logo.png",
				"/images/Crescent.png",
				"/images/AMN.png",
				"/images/image_one.jpg",
				"/images/image_two.jpg",
				"/images/image_three.jpg",
				"/videos/2.mp4",
				"/images/poster_5.jpg",
				"/images/poster_2.jpg",
        "/images/AMN_1.png",
				"/images/image_one_1.jpg",
				"/images/image_two_1.jpg",
				"/images/image_three_1.jpg",
				"/videos/2_1.mp4",
				"/images/poster_5_1.jpg",
				"/images/poster_2_1.jpg"
];

// Install a service worker
self.addEventListener("install", (event) => {
  // Perform install steps
  caches.open(CACHE_NAME).then(function (cache) {
    Promise.all(
      urlsToCache.map(function (url) {
        cache.add(url);
      })
    );
  });
});

// Cache lookup and fetch the request
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then(function (response) {
      // Cache hit - return response
      if (response) {
        return response;
      }
      return fetch(event.request).then(function (response) {
        if (!response || response.status !== 200 || response.type !== "basic") {
          return response;
        }

        //Clone the response before putting into cache so that response to browser and response to cache happens in two difference streams
        var responseForCache = response.clone();
        caches.open(CACHE_NAME).then(function (cache) {
          cache.put(event.request, responseForCache);
        });
        return response;
      });
    })
  );
});

// Update a service worker
self.addEventListener("activate", (event) => {
  var cacheWhitelist = ["pwa-v1"];
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});