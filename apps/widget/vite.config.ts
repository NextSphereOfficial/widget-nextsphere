import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  root: ".",                 // usa index.html in apps/widget
  publicDir: "public",
  server: {
    port: 5173,
    strictPort: true,
    host: true,
    proxy: { "/api": { target: "http://localhost:8081", changeOrigin: true } }
  },
  build: {
    outDir: "dist",
    emptyOutDir: true,
    rollupOptions: {
      // punta direttamente all’HTML (niente path/__dirname)
      input: "index.html"
    }
  }
});

