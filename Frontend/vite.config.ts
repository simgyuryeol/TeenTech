import { defineConfig } from "vite";
import { VitePWA } from "vite-plugin-pwa";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      devOptions: {
        enabled: true,
      },
      workbox: {
        cacheId: 'ts-react-vite',
        clientsClaim: true,
        skipWaiting: true,
        offlineGoogleAnalytics: false,
        inlineWorkboxRuntime: true,
        runtimeCaching: [
            {
                // match html
                urlPattern: new RegExp("https://j9e207.p.ssafy.io"),
                handler: 'NetworkFirst'
            },
            {
                // match static resource
                urlPattern: new RegExp(`${"https://j9e207.p.ssafy.io/".replace(/\//g, '\\/')}\\/assets`),
                handler: 'StaleWhileRevalidate'
            }
        ]
      },
      manifest: {
        icons: [
          {
            src: "/moneybox-192.png",
            type: "image/png",
            sizes: "192x192",
          },
          {
            src: "/moneybox-192.png",
            type: "image/png",
            sizes: "192x192",
            purpose: "maskable",
          },
          {
            src: "/moneybox-512.png",
            type: "image/png",
            sizes: "512x512",
          },
          {
            src: "/moneybox-512.png",
            type: "image/png",
            sizes: "512x512",
            purpose: "maskable",
          },
        ],
      },
    }),
  ],
});
