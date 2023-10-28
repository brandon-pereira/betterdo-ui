import path from 'path';

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';
import markdown from 'vite-plugin-markdown';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
    plugins: [
        svgr({ include: '**/*.svg' }),
        react(),
        markdown({ mode: 'html' }),
        VitePWA({
            strategies: 'injectManifest',
            srcDir: 'src',
            filename: './service-worker.ts',
            registerType: 'autoUpdate'
        })
    ],
    resolve: {
        alias: {
            '@components': path.resolve(__dirname, '/src/components'),
            '@hooks': path.resolve(__dirname, '/src/hooks'),
            '@utilities': path.resolve(__dirname, '/src/utilities'),
            '@customTypes': path.resolve(__dirname, '/src/customTypes')
        }
    },
    esbuild: {
        logOverride: { 'this-is-undefined-in-esm': 'silent' }
    },
    define: {
        __VERSION__: `"${process.env.npm_package_version}"`,
        __SERVER_URL__: `"${
            process.env.NODE_ENV === 'production'
                ? 'https://betterdo.app'
                : 'http://localhost:8000'
        }"`
    },
    base: './',
    server: {
        port: 8080
    }
});
