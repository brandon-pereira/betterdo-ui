import path from 'path';

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from '@honkhonk/vite-plugin-svgr';
import markdown from 'vite-plugin-markdown';

export default defineConfig({
    plugins: [svgr({}), react(), markdown({ mode: 'html' })],
    resolve: {
        alias: {
            '@components': path.resolve(__dirname, '/scripts/components'),
            '@hooks': path.resolve(__dirname, '/scripts/hooks'),
            '@utilities': path.resolve(__dirname, '/scripts/utilities'),
            '@customTypes': path.resolve(__dirname, '/scripts/customTypes')
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
    server: {
        port: 8080
    }
});
