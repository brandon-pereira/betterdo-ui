const config = require('./config');
const webpack = require('webpack');
const OfflinePlugin = require('offline-plugin');

const getPlugins = () => {
    const plugins = [
        new webpack.optimize.MinChunkSizePlugin({
            minChunkSize: 10000
        }),
        new webpack.DefinePlugin({
            'process.env.PRODUCTION': JSON.stringify(config.isProduction),
            'process.env.ROOT_APP_DIR': JSON.stringify('/')
        })
    ];

    if (!config.isProduction) {
        plugins.push(new webpack.SourceMapDevToolPlugin());
    }
    // } else {
    const publicPath = config.isProduction ? `/app/` : '';
    plugins.push(
        new OfflinePlugin({
            ServiceWorker: {
                entry: './src/scripts/service-worker.js',
                output: '../sw.js',
                events: true,
                publicPath: `${publicPath}sw.js`
            },
            publicPath: `${publicPath}scripts/`,
            externals: ['../', '../manifest.json']
        })
    );
    // }

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
