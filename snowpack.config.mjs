// Snowpack Configuration File
// See all supported options: https://www.snowpack.dev/reference/configuration

/** @type {import("snowpack").SnowpackUserConfig } */
export default {
    alias: {
        '@components': './scripts/components',
        '@hooks': './scripts/hooks',
        '@utilities': './scripts/utilities'
    },
    packageOptions: {
        polyfillNode: true
    },
    plugins: [
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
        SERVER_URL: 'http://localhost:8000'
    }
    // mount``: {
    // static: { url: '/static', static: true, resolve: false }
    /* ... */
    // },
    // plugins: [
    //   /* ... */
    // ],
    // packageOptions: {
    //   /* ... */
    // },
    // devOptions: {
    //   /* ... */
    // },
    // buildOptions: {
    //   /* ... */
    // },
};
