/// <reference lib="webworker" />

const CACHE_NAME = "my-spa-cache-v1";

const APP_SHELL_URLS = [
  "/",
  "./index.html",
  "./src/styles/style.css",
  "./src/main.ts",
  "./src/services/api.ts",
  "./src/types/index.ts",
  "./src/router/index.ts",
  "./src/pages/AboutUs.ts",
  "./src/pages/HomePage.ts",
  "./src/pages/ProductPage.ts",
  "./src/pages/NotFoundPage.ts",
];

console.log("Service Worker script loaded");

self.addEventListener("install", (event: any) => {
  console.log("Service Worker: Installing...");
  (event as ExtendableEvent).waitUntil(
    caches
      .open(CACHE_NAME)
      .then((cache) => {
        console.log("Service Worker: Caching app shell");
        return cache.addAll(APP_SHELL_URLS);
      })
      .catch((err) => console.error("Cache error:", err))
  );
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      if (response) {
        console.log(
          "Service Worker: Serving cached response",
          event.request.url
        );
        return response;
      }
      console.log("Service Worker: Fetching from network", event.request.url);
      return fetch(event.request);
    })
  );
});

self.addEventListener("activate", (event) => {
  console.log("Service Worker: Activating...");
});

self.addEventListener("install", (event) => {
  console.log('Service Worker: Event "install" is fired');
});

self.addEventListener("activate", (event) => {
  console.log('Service Worker: Event "activate" is fired');
});
