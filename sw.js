const C="hl26-v70",T="hl26-tiles",A=["./","index.html","manifest.webmanifest","icon-192.png","icon-512.png"];
self.addEventListener("install",e=>{e.waitUntil(caches.open(C).then(c=>c.addAll(A.map(u=>new Request(u,{cache:"reload"})))).then(()=>self.skipWaiting()))});
self.addEventListener("activate",e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(n=>n!==C&&n!==T).map(n=>caches.delete(n)))).then(()=>self.clients.claim()))});
self.addEventListener("fetch",e=>{const u=new URL(e.request.url);if(e.request.method!=="GET")return;
if(/arcgisonline/.test(u.host)){e.respondWith(caches.open(T).then(async c=>{const h=await c.match(e.request);if(h)return h;const r=await fetch(e.request);c.put(e.request,r.clone());c.keys().then(k=>{if(k.length>800)c.delete(k[0])});return r}));return}
if(u.origin===location.origin)e.respondWith(caches.match(e.request,{ignoreSearch:true}).then(r=>r||fetch(e.request).catch(()=>caches.match("index.html"))));});
