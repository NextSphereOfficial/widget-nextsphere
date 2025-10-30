import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import path from "node:path";

export default defineConfig(({ mode }) => {
  // Carica anche env NON prefissate da VITE_ (es. VERCEL_GIT_COMMIT_SHA)
  const env = loadEnv(mode, process.cwd(), "");
  const commit =
    env.VITE_COMMIT_SHA ||
    env.VERCEL_GIT_COMMIT_SHA ||
    process.env.VERCEL_GIT_COMMIT_SHA ||
    "dev";

  return {
    plugins: [react()],
    root: ".", // index.html si trova nella root del widget
    publicDir: "public",
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "src"), // 👈 alias per import "@/..."
      },
    },
    server: {
      port: 5173,
      strictPort: true,
      host: true,
      // In dev chiami fetch('/chat') e Vite lo gira all'API locale
      proxy: { "/chat": { target: "http://localhost:8081", changeOrigin: true } },
    },
    build: {
      outDir: "dist",
      emptyOutDir: true,
      sourcemap: false,
      rollupOptions: {
        input: "index.html",
      },
    },
    define: {
      // Inline della commit nel bundle
      "import.meta.env.VITE_COMMIT_SHA": JSON.stringify(commit),
    },
  };
});

