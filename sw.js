self.addEventListener('install', function (event) {
  console.log('SW Installed');
  event.waitUntil(
    caches.open('static')
      .then(function (cache) {
        // cache.add('/');
        // cache.add('/index.html');
        // cache.add('/src/js/app.js');
        cache.addAll([
          '/',
          '/index.html',
          '/js/app.js',
          '/css/style.css',
          '/favicon.png',
          'https://fonts.googleapis.com/css?family=Dosis|Gloria+Hallelujah',
          'https://use.fontawesome.com/releases/v4.7.0/css/font-awesome-css.min.css',
          'https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js',
          'https://cdn.jsdelivr.net/npm/vue',
          'https://unpkg.com/axios/dist/axios.min.js',

        ]);
      })
  );
});

self.addEventListener('activate', function () {
  console.log('SW Activated');
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request)
      .then(function(res) {
        if (res) {
          return res;
        } else {
          return fetch(event.request);
        }
      })
  );
});
