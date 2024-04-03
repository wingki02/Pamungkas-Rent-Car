// Nama cache
var CACHE_NAME = 'pmks-cache';

// Daftar file yang akan disimpan ke dalam cache
var urlsToCache = [
  '/',
  '/index.html',
  '/css/style.css',
  '/js/main.js'
];

// Instalasi service worker
self.addEventListener('install', function(event) {
  // Membuat cache dan menyimpan file-file ke dalamnya
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

// Menggunakan cache saat ada permintaan
self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        // Mengembalikan respons dari cache jika ada, jika tidak, lakukan permintaan ke jaringan
        return response || fetch(event.request);
      })
  );
});
