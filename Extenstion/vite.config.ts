import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "node:path";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: { alias: { "@": path.resolve(import.meta.dirname, "./src") } },
  server: {
    proxy: {
      "/brave-suggest": {
        target: "https://search.brave.com",
        changeOrigin: true,
        rewrite: (p) => p.replace(/^\/brave-suggest/, "/api/suggest"),
      },
      "/google-suggest": {
        target: "https://suggestqueries.google.com",
        changeOrigin: true,
        rewrite: (p) => p.replace(/^\/google-suggest/, "/complete/search"),
      },
      "/ddg-suggest": {
        target: "https://duckduckgo.com",
        changeOrigin: true,
        rewrite: (p) => p.replace(/^\/ddg-suggest/, "/ac/"),
      },
      "/bing-suggest": {
        target: "https://api.bing.com",
        changeOrigin: true,
        rewrite: (p) => p.replace(/^\/bing-suggest/, "/osjson.aspx"),
      },
    },
  },
  base: "./",
  build: {
    outDir: "../dist",
    emptyOutDir: true,
  },
});
