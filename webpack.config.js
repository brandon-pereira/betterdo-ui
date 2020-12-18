/* eslint-disable import/no-commonjs */
/* eslint-env node */
require('dotenv').config();
const path = require('path');

const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const OfflinePlugin = require('offline-plugin');

const isProduction = process.env.NODE_ENV === 'production';

module.exports = {
    mode: isProduction ? 'production' : 'development',
    devtool: isProduction ? false : 'eval-cheap-source-map',
    entry: ['react-hot-loader/patch', './scripts/index.js'],
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.min.js',
        publicPath: '/'
    },
    devServer: {
        hot: true,
        historyApiFallback: true,
        contentBase: path.resolve(__dirname, 'dist'),
        stats: 'minimal',
        proxy: {
            '/auth': 'http://localhost:8000'
        }
    },
    resolve: {
        alias: createAliases()
    },
    module: {
        rules: [
            {
                test: /\.m?js/,
                resolve: {
                    fullySpecified: false
                }
            },
            {
                test: /\.js?$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            plugins: [
                                'babel-plugin-styled-components',
                                'react-hot-loader/babel',
                                'macros'
                            ],
                            presets: [
                                [
                                    '@babel/preset-env',
                                    {
                                        exclude: ['transform-regenerator']
                                    }
                                ],
                                '@babel/preset-react'
                            ]
                        }
                    }
                ]
            },
            {
                test: /\.svg$/,
                use: [
                    {
                        loader: '@svgr/webpack',
                        options: {
                            icon: true,
                            titleProp: true
                        }
                    }
                ]
            }
        ]
    },
    plugins: getPlugins()
};

function getPlugins() {
    const plugins = [
        new webpack.EnvironmentPlugin({
            NODE_ENV: 'development',
            SERVER_URL: isProduction
                ? 'https://tether.branclon.com'
                : 'http://localhost:8000',
            GOOGLE_ANALYTICS_ID: undefined,
            VERSION: process.env.npm_package_version
        }),
        new CopyPlugin({ patterns: ['static'] }),
        new HtmlWebpackPlugin({
            template: 'index.html',
            base: false,
            minify: true,
            GOOGLE_ANALYTICS_ID: process.env.GOOGLE_ANALYTICS_ID
        })
    ];

    if (!isProduction) {
        // plugins.push(new webpack.SourceMapDevToolPlugin());
    } else {
        const publicPath = isProduction ? `/app/` : '';
        plugins.push(
            new OfflinePlugin({
                ServiceWorker: {
                    entry: './scripts/service-worker.js',
                    output: 'service-worker.js',
                    events: true,
                    publicPath: `${publicPath}service-worker.js`
                },
                publicPath: publicPath + '/',
                externals: ['../', '../manifest.json']
            })
        );
    }

    return plugins;
}

function createAliases() {
    return {
        ...(isProduction ? {} : { 'react-dom': '@hot-loader/react-dom' }),
        '@components': path.resolve('./scripts/components'),
        '@hooks': path.resolve('./scripts/hooks'),
        '@utilities': path.resolve('./scripts/utilities')
    };
}
