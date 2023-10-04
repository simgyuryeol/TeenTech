import { registerRoute } from 'workbox-routing';
import { NetworkOnly } from 'workbox-strategies';

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
  
