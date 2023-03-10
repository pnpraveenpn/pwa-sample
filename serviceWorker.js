const staticName = "amn kiosk"
const dynamicCache = 'amn-kiosk-V1';
const assets = [
  "/",
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
  "/videos/VIDEO-1.mp4",
  "/images/poster_5.jpg",
  "/images/poster_2.jpg"
]

self.addEventListener("install", installEvent => {
  installEvent.waitUntil(
    caches.open(staticName).then(cache => {
      cache.addAll(assets)
    })
  )
})

self.addEventListener("fetch", fetchEvent => {
  fetchEvent.respondWith(
    caches.match(fetchEvent.request).then(res => {
      return res || fetch(fetchEvent.request);
    })
  );
});


// self.addEventListener("fetch", fetchEvent => {
//   fetchEvent.respondWith(
//     caches.match(fetchEvent.request).then(res => {
//       return res || fetch(fetchEvent.request).then(fetchRes=>{
//         return caches.open(dynamicCache).then(cache => {
//           cache.put(fetchEvent.request.url, fetchRes.clone());
//           return fetchRes;
//         })
//       });
//     })
//   );
// });