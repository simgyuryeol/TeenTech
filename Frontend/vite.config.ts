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
        importScripts: ["my-custom-sw.js"],
      },
      manifest: {
        display: "standalone",
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
