importScripts('https://storage.googleapis.com/workbox-cdn/releases/6.1.5/workbox-sw.js');

registerRoute(
  ({url}) => url.href.startsWith('https://j9e207.p.ssafy.io/oauth2/authorization/kakao'),
  new NetworkOnly()
);

import { NetworkFirst } from 'workbox-strategies';

registerRoute(
  ({url}) => url.href.startsWith('https://j9e207.p.ssafy.io/api/v1/'),
  new NetworkFirst()
);

self.addEventListener('install', function(event) {
    event.waitUntil(self.skipWaiting());
  });
  
