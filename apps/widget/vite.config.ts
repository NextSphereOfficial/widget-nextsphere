import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";

export default defineConfig({
  plugins: [react()],
  root: ".",                 // usa index.html nella root di apps/widget
  publicDir: "public",
  server: {
    port: 5173,
    strictPort: true,
    host: true,
    proxy: {
      "/api": { target: "http://localhost:8081", changeOrigin: true }
    }
  },
  build: {
    // ❗ forza modalità "app", NON library
    lib: false as any,
    outDir: "dist",
    emptyOutDir: true,
    rollupOptions: {
      // ❗ indica esplicitamente l'entry html
      input: {
        main: resolve(__dirname, "index.html"),
      },
    },
  },
});

