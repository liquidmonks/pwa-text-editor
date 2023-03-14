// Import the warmStrategyCache recipe from workbox-recipes to prime the runtime cache with assets.
const { warmStrategyCache } = require("workbox-recipes");

// Import caching strategies and routing utilities from Workbox.
const { CacheFirst, StaleWhileRevalidate } = require("workbox-strategies");
const { registerRoute } = require("workbox-routing");
const { CacheableResponsePlugin } = require("workbox-cacheable-response");
const { ExpirationPlugin } = require("workbox-expiration");
const { precacheAndRoute } = require("workbox-precaching/precacheAndRoute");

// Precache assets specified in the Workbox manifest.
precacheAndRoute(self.__WB_MANIFEST);

// Define a CacheFirst strategy for the page cache with plugins to cache responses with status 0 or 200 and expire after 30 days.
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

// Warm the runtime cache with specified URLs using the pageCache strategy.
warmStrategyCache({
  urls: ["/index.html", "/"],
  strategy: pageCache,
});

// Register the pageCache strategy for navigate requests.
registerRoute(({ request }) => request.mode === "navigate", pageCache);

// Define a StaleWhileRevalidate strategy for the asset cache with plugins to cache responses with status 0 or 200.
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
