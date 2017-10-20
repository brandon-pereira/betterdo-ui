module.exports = {
	paths: {
		src: {
			root: './src',
			scripts: './src/scripts/app.js',
			html: './src/html/*.html',
			svg: './src/svgs/*.svg',
			media: './src/media/**/*'
		},
		dist: './dist',
		watch: {
			scripts: ['./src/scripts/*.js', './src/styles/*.scss'],
			html: ['./src/html/**/*.html', './src/styles/critical.css'],
			svg: './src/svgs/*.svg',
			media: './src/media/**/*'
		}
	},
	naming: {
		scripts: 'bundle.min.js',
		svgs: 'icons.svg'
	}
}