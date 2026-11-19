import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { copyFileSync, mkdirSync } from 'node:fs';
import { resolve } from 'node:path';
// GitHub Pages has no SPA fallback. Copy index.html to each client route so
// deep links (e.g. /about-me) load with a 200, and to 404.html as a catch-all.
var SPA_ROUTES = ['about-me'];
var ghPagesRoutes = function () { return ({
    name: 'gh-pages-routes',
    apply: 'build',
    closeBundle: function () {
        var dist = resolve(__dirname, 'dist');
        var index = resolve(dist, 'index.html');
        for (var _i = 0, SPA_ROUTES_1 = SPA_ROUTES; _i < SPA_ROUTES_1.length; _i++) {
            var route = SPA_ROUTES_1[_i];
            mkdirSync(resolve(dist, route), { recursive: true });
            copyFileSync(index, resolve(dist, route, 'index.html'));
        }
        copyFileSync(index, resolve(dist, '404.html'));
    }
}); };
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
});
