import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
/*, server: {
    proxy: {
      "/api/quote": {
        target: "https://zenquotes.io",
        changeOrigin: true,
        rewrite: () => "/api/random",
      },
    }},*/
export default defineConfig({
  plugins: [react()],
  base: "./",
  build: {
    outDir: "../dist",
    emptyOutDir: true,
  },
});
