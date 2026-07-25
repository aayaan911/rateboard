/* RateBoard service worker: app shell offline, network-first for rates */
var CACHE = "rateboard-v7";
var SHELL = ["./", "./index.html"];

self.addEventListener("install", function(e){
  e.waitUntil(caches.open(CACHE).then(function(c){ return c.addAll(SHELL); }).then(function(){ return self.skipWaiting(); }));
});

self.addEventListener("activate", function(e){
  e.waitUntil(caches.keys().then(function(keys){
    return Promise.all(keys.map(function(k){ if(k!==CACHE) return caches.delete(k); }));
  }).then(function(){ return self.clients.claim(); }));
});

self.addEventListener("fetch", function(e){
  var url = e.request.url;
  if(e.request.method !== "GET") return;

  // rates + flags: network first, fall back to cache
  if(url.indexOf("er-api.com") > -1 || url.indexOf("flagcdn.com") > -1){
    e.respondWith(
      fetch(e.request).then(function(r){
        var copy = r.clone();
        caches.open(CACHE).then(function(c){ c.put(e.request, copy); });
        return r;
      }).catch(function(){ return caches.match(e.request); })
    );
    return;
  }

  // app shell: cache first
  e.respondWith(caches.match(e.request).then(function(hit){
    return hit || fetch(e.request).then(function(r){
      var copy = r.clone();
      caches.open(CACHE).then(function(c){ c.put(e.request, copy); });
      return r;
    });
  }));
});
