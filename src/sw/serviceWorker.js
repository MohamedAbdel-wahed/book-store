const staticCacheName="static-book-store-1"
const dynamicCacheName="dynamic-book-store-1"

const assets= [
  '/index.html',
  '/fallback.html',
  '/main.css',
  '/bundle.js',
  '/favicon.svg',
  '/logo192.png', 
  '/logo512.png',
  'https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100&display=swap',
] 


const limitCacheSize= (name,size)=> {
  caches.open(name).then(cache=>{
    cache.keys().then(keys=> {
      if(keys.length>size){
        cache.delete(keys[0]).then(limitCacheSize(name,size))
      }
    })
  })
}



// install event
self.addEventListener("install", e=> {
  e.waitUntil( 
    caches.open(staticCacheName).then(cache=>{   
      cache.addAll(assets)   
    })
  )
})

// activate event
self.addEventListener("activate", e=> {
   e.waitUntil(
    caches.keys().then(keys=>{
      return Promise.all(
        keys
        .filter(key=> key!==staticCacheName && key !==dynamicCacheName)
        .map(key=> caches.delete(key))
      )
    })
   )
})

// fetch event
self.addEventListener("fetch", e=> { 
  if(e.request.url.indexOf('firestore.googleapis.com')===-1){
    e.respondWith(
      caches.match(e.request)
      .then(cacheRes=>{ 
        return cacheRes || fetch(e.request).then(fetchRes=>{
          return caches.open(dynamicCacheName).then(cache=>{
            cache.put(e.request.url,fetchRes.clone())
            limitCacheSize(dynamicCacheName, 15)
            return fetchRes 
          })
        })
      })
      .catch(()=>{
        if(e.request.url.indexOf('.html')!==-1){
          caches.match('fallback.html')
        }
      })
    )
  }
})

