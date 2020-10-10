/* eslint-disable import/no-commonjs */
const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const OfflinePlugin = require('offline-plugin');

const isProduction = process.env.NODE_ENV === 'production';

module.exports = {
    mode: isProduction ? 'production' : 'development',
    devtool: isProduction ? false : 'eval-source-map',
    entry: './scripts/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.min.js'
    },
    devServer: {
        contentBase: './dist',
        proxy: {
            '/api': 'http://localhost:8000'
        },
        stats: 'minimal',
        historyApiFallback: true
    },
    module: {
        rules: [
            {
                test: /\.js?$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: [
                                '@babel/preset-env',
                                '@babel/preset-react',
                                'mobx'
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
    plugins: getPlugins(),
    resolve: {
        alias: {
            '@hooks': path.resolve(process.cwd(), 'scripts/hooks'),
            '@components': path.resolve(process.cwd(), 'scripts/components'),
            '@utilities': path.resolve(process.cwd(), 'scripts/utilities')
        }
    }
};

function getPlugins() {
    const plugins = [
        new webpack.optimize.MinChunkSizePlugin({
            minChunkSize: 10000
        }),
        new webpack.DefinePlugin({
            'process.env.PRODUCTION': JSON.stringify(isProduction),
            'process.env.ROOT_APP_DIR': JSON.stringify('/')
        }),
        new CopyPlugin(['static']),
        new HtmlWebpackPlugin({
            template: 'index.html',
            base: false,
            minify: true
            // filename: 'static/index.html'
        })
    ];

    if (!isProduction) {
        plugins.push(new webpack.SourceMapDevToolPlugin());
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
