const config = require('./config');
const webpack = require('webpack');
const OfflinePlugin = require('offline-plugin');

const getPlugins = () => {
    const plugins = [
        new webpack.optimize.MinChunkSizePlugin({
            minChunkSize: 10000
        }),
        new webpack.optimize.ModuleConcatenationPlugin(), // scope hoisting
        new webpack.DefinePlugin({
            'process.env.PRODUCTION': JSON.stringify(config.isProduction),
            'process.env.ROOT_APP_DIR': JSON.stringify(
                config.isProduction ? '/betterdo/' : '/'
            )
        })
    ];

    if (!config.isProduction) {
        plugins.push(new webpack.SourceMapDevToolPlugin());
    } else {
        plugins.push(
            new OfflinePlugin({
                ServiceWorker: {
                    output: '../sw.js',
                    events: true
                },
                externals: ['/', '/app', '/app/manifest.json']
            })
        );
    }

    return plugins;
};

module.exports = {
    mode: config.isProduction ? 'production' : 'development',
    devtool: config.isProduction ? false : 'eval-source-map',
    entry: config.paths.src.scripts,
    output: {
        publicPath: 'scripts/',
        filename: config.naming.scripts
    },
    node: {
        fs: 'empty'
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
                            ],
                            plugins: [
                                'add-module-exports', // export default will allow you to import without typing .default
                                '@babel/plugin-syntax-dynamic-import'
                            ]
                        }
                    }
                ]
            },
            {
                test: /\.scss$/,
                use: ['style-loader', 'css-loader', 'sass-loader']
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
