import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    strictPort: true,
    host: true,
    proxy: {
      '/api': {
        target: 'http://localhost:8080',
        changeOrigin: true
      }
    }
  },
  build: {
    lib: {
      entry: 'src/main.tsx',
      name: 'NextSphereWidget',
      formats: ['es']
    },
    rollupOptions: {
      external: [],
    }
  }
})
