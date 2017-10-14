const config = require('./config');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
	entry: config.paths.src.scripts,
	devtool: 'source-map',
	output: {
		publicPath: '/scripts/',
		filename: config.naming.scripts
	},
	module: {
		rules: [
			{
				test: /\.js?$/,
				exclude: /node_modules/,
				use: [{
					loader: 'babel-loader',
					options: {
						presets: [["env", {
								"targets": {
								"browsers": ["last 2 versions"]
							}
						}]],
						plugins: [
							"add-module-exports", // export default will allow you to import without typing .default
							"dynamic-import-webpack"
						]
					}
				}]
			},
			{
				test: /\.scss$/,
				// use: ExtractTextPlugin.extract({
				// 	fallback: 'style-loader',
				// 	use: ['css-loader', 'sass-loader']
				// })
				use: ["style-loader", "css-loader", "sass-loader"]
			}
		]
	},
	plugins: [
		new webpack.optimize.UglifyJsPlugin({
			minimize: true,
			sourceMap: true
		}),
		new webpack.optimize.MinChunkSizePlugin({
			minChunkSize: 50000
		}),
    new webpack.optimize.ModuleConcatenationPlugin(), // scope hoisting
    // new ExtractTextPlugin('critical.css')
	]
}