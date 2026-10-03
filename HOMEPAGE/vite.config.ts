import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  root: "public/html",
  build: {
    outDir: "../../dist", // one extra ../ since root is now 2 levels deep
    emptyOutDir: true,
  },
});
