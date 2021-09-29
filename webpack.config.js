/* eslint-disable import/no-commonjs */
/* eslint-env node */
require('dotenv').config();
const path = require('path');

const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const { InjectManifest } = require('workbox-webpack-plugin');
const isProduction = process.env.NODE_ENV === 'production';

module.exports = {
    mode: isProduction ? 'production' : 'development',
    devtool: isProduction ? undefined : 'eval-cheap-source-map',
    entry: ['react-hot-loader/patch', './scripts/index.js'],
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.min.js',
        publicPath: isProduction ? '/app/' : '/'
    },
    devServer: {
        hot: true,
        historyApiFallback: true,
        static: path.resolve(__dirname, 'dist'),
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
            },
            {
                test: /\.md$/,
                use: [
                    {
                        loader: 'html-loader'
                    },
                    {
                        loader: 'markdown-loader',
                        options: {
                            /* your options here */
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
                ? 'http://localhost:8000'
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

    if (isProduction) {
        plugins.push(
            new InjectManifest({
                swSrc: './scripts/service-worker.js',
                maximumFileSizeToCacheInBytes: 6000000
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
