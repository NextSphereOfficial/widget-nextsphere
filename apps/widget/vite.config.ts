import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig(({ mode }) => {
  // Carica anche le env NON prefissate da VITE_ (es. VERCEL_GIT_COMMIT_SHA)
  const env = loadEnv(mode, process.cwd(), "");
  const commit =
    env.VITE_COMMIT_SHA ||
    env.VERCEL_GIT_COMMIT_SHA ||
    process.env.VERCEL_GIT_COMMIT_SHA ||
    "dev";

  return {
    plugins: [react()],
    root: ".", // usa index.html in apps/widget
    publicDir: "public",
    server: {
      port: 5173,
      strictPort: true,
      host: true,
      proxy: { "/api": { target: "http://localhost:8081", changeOrigin: true } },
    },
    build: {
      outDir: "dist",
      emptyOutDir: true,
      sourcemap: false,
      rollupOptions: {
        // punta direttamente all’HTML (niente path/__dirname)
        input: "index.html",
      },
    },
    define: {
      // Forza l'inlining nel bundle (niente accesso runtime)
      "import.meta.env.VITE_COMMIT_SHA": JSON.stringify(commit),
    },
  };
});
