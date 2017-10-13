module.exports = function(config, gulp) {
		
	const sass = require('gulp-sass');
	const cleanCSS = require('gulp-clean-css');
	const browserSync = require('browser-sync').get("server");
	const autoprefixer = require('gulp-autoprefixer');
	
	gulp.task('styles', () =>
		gulp.src(config.paths.src.styles)
			.pipe(sass().on('error', sass.logError))
			.pipe(autoprefixer({
				browsers: ['last 2 versions']
			}))
			.pipe(cleanCSS())
			.pipe(gulp.dest(config.paths.dist + '/styles'))
			.pipe(browserSync.stream())
	);

	gulp.task('watch:styles', () =>
		gulp.watch(config.paths.watch.styles, gulp.series('styles', 'html'))
	);
		
};