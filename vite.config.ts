import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import path from "node:path";
import { defineConfig, lazyPlugins } from "vite-plus";

export default defineConfig({
  fmt: {
    sortImports: {
      groups: [
        "type-import",
        ["value-builtin", "value-external"],
        "type-internal",
        "value-internal",
        ["type-parent", "type-sibling", "type-index"],
        ["value-parent", "value-sibling", "value-index"],
        "unknown",
      ],
    },
    sortTailwindcss: {
      stylesheet: "./src/Style.css",
      functions: ["clsx", "cn", "cva"],
      preserveWhitespace: true,
    },
  },

  lint: {
    plugins: ["typescript", "react", "jsx-a11y", "oxc"],
    env: {
      browser: true,
      es2022: true,
    },
    globals: {
      chrome: "readonly",
    },
    options: {
      typeAware: true,
      typeCheck: true,
    },
    categories: {
      correctness: "error",
      suspicious: "warn",
    },
    rules: {
      "eslint/no-unused-vars": [
        "warn",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
        },
      ],
      "eslint/no-debugger": "error",
      "eslint/eqeqeq": "error",
      "eslint/no-console": "off",
      "react/rules-of-hooks": "error",
      "react/exhaustive-deps": "warn",
      "react/jsx-key": "error",
      "react/no-array-index-key": "warn",
      "typescript/no-explicit-any": "warn",
      "typescript/consistent-type-imports": "error",
      "typescript/no-floating-promises": "error",
      "typescript/no-misused-promises": "error",
      "typescript/await-thenable": "error",
      "vite-plus/prefer-vite-plus-imports": "error",
    },
    ignorePatterns: ["dist", "node_modules", "src/components/ui"],
    jsPlugins: [
      {
        name: "vite-plus",
        specifier: "vite-plus/oxlint-plugin",
      },
    ],
  },

  plugins: lazyPlugins(() => [react(), tailwindcss()]),

  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "./src"),
    },
  },

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
