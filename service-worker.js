var CACHE_NAME = 'learn-with-me-cache-v1';
var urlsToCache = [
    '/',
    '/learn-with-me.html', // assuming your main HTML file is named index.html
    '/assets-asl/css/index.css',
    '/assets-asl/js/script.js',
    '/assets-asl/js/jquery-3.6.0.min.js', // or whichever version you're using
    '/assets-asl/videos.json',
    '/assets-asl/images/logo.png',
    '/assets-asl/images/logo_main.png',
    '/assets-asl/videos/asl_come_here.mp4',
    '/assets-asl/videos/asl_congratulations.mp4',
    '/assets-asl/videos/asl_help.mp4',
    '/assets-asl/videos/asl_how_much.mp4',
    '/assets-asl/videos/asl_i_forgot.mp4',
    '/assets-asl/videos/asl_im_hungry.mp4',
    '/assets-asl/videos/asl_sorry.mp4',
    '/assets-asl/videos/asl_stop.mp4',
    '/assets-asl/videos/asl_what_time_it_is.mp4',
    '/assets-asl/videos/asl_where_are_you_going.mp4'
];

self.addEventListener('install', function(event) {
    // Perform install steps
    event.waitUntil(
        caches.open(CACHE_NAME)
        .then(function(cache) {
            console.log('Opened cache');
            return cache.addAll(urlsToCache);
        })
    );
});

self.addEventListener('fetch', function(event) {
    event.respondWith(
        caches.match(event.request)
        .then(function(response) {
            // Cache hit - return response
            if (response) {
                return response;
            }
            return fetch(event.request);
        })
    );
});
