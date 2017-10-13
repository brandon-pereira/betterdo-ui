module.exports = {
	paths: {
		src: {
			scripts: './src/scripts/app.js',
			html: './src/html/*.html',
			styles: ['./src/styles/app.scss', './src/styles/critical.scss'],
			svg: './src/svgs/*.svg',
			media: './src/media/**/*'
		},
		dist: './dist',
		watch: {
			scripts: './src/scripts/*.js',
			html: './src/html/**/*.html',
			styles: './src/styles/*.scss',
			svg: './src/svgs/*.svg',
			media: './src/media/**/*'
		}
	},
	naming: {
		styles: 'styles/bundle.min.css',
		scripts: 'bundle.min.js',
		svgs: 'icons.svg'
	}
}