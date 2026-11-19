import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import { copyFileSync, mkdirSync } from 'node:fs'
import { resolve } from 'node:path'

// GitHub Pages has no SPA fallback. Copy index.html to each client route so
// deep links (e.g. /about-me) load with a 200, and to 404.html as a catch-all.
const SPA_ROUTES = ['about-me']
const ghPagesRoutes = (): Plugin => ({
  name: 'gh-pages-routes',
  apply: 'build',
  closeBundle() {
    const dist = resolve(__dirname, 'dist')
    const index = resolve(dist, 'index.html')
    for (const route of SPA_ROUTES) {
      mkdirSync(resolve(dist, route), { recursive: true })
      copyFileSync(index, resolve(dist, route, 'index.html'))
    }
    copyFileSync(index, resolve(dist, '404.html'))
  }
})

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), ghPagesRoutes()],
  base: '/',
  build: {
    outDir: 'dist',
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          motion: ['framer-motion']
        }
      }
    }
  }
})
