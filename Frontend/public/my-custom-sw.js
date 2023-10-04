importScripts('https://storage.googleapis.com/workbox-cdn/releases/6.1.5/workbox-sw.js');

const { registerRoute } = workbox.routing;
const { NetworkOnly, NetworkFirst } = workbox.strategies;

registerRoute(
  ({url}) => url.href.startsWith('https://j9e207.p.ssafy.io/oauth2/authorization/kakao'),
  new NetworkOnly()
);

registerRoute(
  ({url}) => url.href.startsWith('https://j9e207.p.ssafy.io/login/oauth2/'),
  new NetworkOnly()
);

registerRoute(
  ({url}) => url.href.startsWith('https://j9e207.p.ssafy.io/api/v1/'),
  new NetworkFirst()
);

self.addEventListener('install', function(event) {
    event.waitUntil(self.skipWaiting());
  });
  
