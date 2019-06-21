const CACHE_NAME = "psyche-cache-v1";
const URLS_TO_CACHE = ["/", "/psyche-bundle.js"];

// There are some problems with webworkers types that are confliciting with DOM
// types. For now the events are forced into any and we do our best to type
// everything else.
self.addEventListener("install", (event: any) => {
  event.waitUntil(fillCache());
});

self.addEventListener("fetch", (event: any) => {
  event.respondWith(handleFetch(event.request));
});

const handleFetch = async (request: RequestInfo): Promise<Response> => {
  // Always issue a fetch to make sure the cache stays updated
  const fetchPromise = fetchAndCache(request);
  const response = await caches.match(request);
  return response ? response : fetchPromise;
};

const fillCache = async () => {
  const cache = await caches.open(CACHE_NAME);
  cache.addAll(URLS_TO_CACHE);
};

const fetchAndCache = async (request: RequestInfo): Promise<Response> => {
  const response = await fetch(request);
  if (!response || response.status !== 200 || response.type !== "basic") {
    // This one should just skip the cache.
    return response;
  }

  const cache = await caches.open(CACHE_NAME);
  cache.put(request, response.clone());
  return response;
};
