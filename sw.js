/* RateBoard service worker.
   HTML is network-first so a new deploy is picked up on the next load,
   which is what Safari's aggressive caching was defeating.
   Rates and flags are network-first with a cache fallback.
   Everything else is cache-first. */
var CACHE = "rateboard-v28";

self.addEventListener("install", function(e){
  e.waitUntil(
    caches.open(CACHE)
      .then(function(c){ return c.addAll(["./", "./index.html", "./flags/us.svg", "./flags/ae.svg", "./flags/bd.svg", "./flags/pk.svg", "./flags/id.svg"]); })
      .catch(function(){})
      .then(function(){ return self.skipWaiting(); })
  );
});

self.addEventListener("activate", function(e){
  e.waitUntil(
    caches.keys()
      .then(function(keys){
        return Promise.all(keys.map(function(k){ if(k !== CACHE) return caches.delete(k); }));
      })
      .then(function(){ return self.clients.claim(); })
  );
});

self.addEventListener("message", function(e){
  if(e.data === "skip-waiting") self.skipWaiting();
});

function netFirst(req, bustCache){
  var opts = bustCache ? {cache: "no-store"} : undefined;
  return fetch(new Request(req.url, opts ? {cache: "no-store"} : {}))
    .then(function(r){
      if(r && r.ok){
        var copy = r.clone();
        caches.open(CACHE).then(function(c){ c.put(req, copy); });
      }
      return r;
    })
    .catch(function(){
      return caches.match(req).then(function(hit){
        return hit || caches.match("./index.html");
      });
    });
}

self.addEventListener("fetch", function(e){
  var req = e.request;
  if(req.method !== "GET") return;

  var isHTML = req.mode === "navigate" ||
               (req.headers.get("accept") || "").indexOf("text/html") > -1 ||
               /\.html($|\?)/.test(req.url);

  if(isHTML){ e.respondWith(netFirst(req, true)); return; }

  if(req.url.indexOf("er-api.com") > -1 ||
     req.url.indexOf("currency-api") > -1 ||
     req.url.indexOf("flagcdn.com") > -1 &&
     req.url.indexOf("circle-flags") < 0){
    e.respondWith(netFirst(req, false));
    return;
  }

  e.respondWith(
    caches.match(req).then(function(hit){
      return hit || fetch(req).then(function(r){
        if(r && r.ok){
          var copy = r.clone();
          caches.open(CACHE).then(function(c){ c.put(req, copy); });
        }
        return r;
      });
    })
  );
});
