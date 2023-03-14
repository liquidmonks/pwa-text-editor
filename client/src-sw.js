// Import required Workbox libraries
const { warmStrategyCache } = require("workbox-recipes");
const { CacheFirst, StaleWhileRevalidate } = require("workbox-strategies");
const { registerRoute } = require("workbox-routing");
const { CacheableResponsePlugin } = require("workbox-cacheable-response");
const { ExpirationPlugin } = require("workbox-expiration");
const { precacheAndRoute } = require("workbox-precaching/precacheAndRoute");

// Precache and route the resources specified in the manifest file
precacheAndRoute(self.__WB_MANIFEST);

// Create a CacheFirst strategy for page requests
const pageCache = new CacheFirst({
  cacheName: "page-cache",
  plugins: [
    new CacheableResponsePlugin({
      statuses: [0, 200],
    }),
    new ExpirationPlugin({
      maxAgeSeconds: 30 * 24 * 60 * 60,
    }),
  ],
});

// Warm the cache with specified URLs using the pageCache strategy
warmStrategyCache({
  urls: ["/index.html", "/"],
  strategy: pageCache,
});

// Register the pageCache strategy for navigate requests
registerRoute(({ request }) => request.mode === "navigate", pageCache);

// Set up asset cache using a StaleWhileRevalidate strategy
registerRoute(
  ({ request }) => ["style", "script", "worker"].includes(request.destination),
  new StaleWhileRevalidate({
    cacheName: "asset-cache",
    plugins: [
      new CacheableResponsePlugin({
        statuses: [0, 200],
      }),
    ],
  })
);
