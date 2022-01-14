/* global process */

// Snowpack Configuration File
// See all supported options: https://www.snowpack.dev/reference/configuration

/** @type {import("snowpack").SnowpackUserConfig } */
export default {
    alias: {
        '@components': './scripts/components',
        '@hooks': './scripts/hooks',
        '@utilities': './scripts/utilities',
        '@types/*': ['./types']
    },
    packageOptions: {
        polyfillNode: true
    },
    plugins: [
        '@snowpack/plugin-typescript',
        [
            'snowpack-plugin-svgr',
            {
                svgrOptions: {
                    icon: true,
                    titleProp: true
                }
            }
        ],
        'snowpack-plugin-markdown-import'
    ],
    env: {
        VERSION: process.env.npm_package_version,
        SERVER_URL:
            process.env.NODE_ENV === 'production'
                ? 'https://betterdo.app'
                : 'http://localhost:8000'
    },
    optimize: {
        minify: true,
        target: 'es2020'
    },
    exclude: ['**/.git/**/*'],
    buildOptions: {
        out: 'dist'
    }
};
