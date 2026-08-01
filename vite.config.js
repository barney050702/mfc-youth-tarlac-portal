import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
    base: '/mfc-youth-tarlac-portal/',
    root: './',
    plugins: [
        react(),
        VitePWA({
            registerType: 'autoUpdate',
            devOptions: {
                enabled: true,
            },
            workbox: {
                globPatterns: ['**/*.{js,css,html,ico,png,svg,woff,woff2,ttf,json,mp4}'],
                maximumFileSizeToCacheInBytes: 10 * 1024 * 1024,
                skipWaiting: true,
                clientsClaim: true,
            },
        })
    ],
    build: {
        outDir: 'dist',
        emptyOutDir: true,
        rollupOptions: {
            input: 'index.html',
        },
    },
    server: {
        port: 3000,
        open: true,
    },
});
