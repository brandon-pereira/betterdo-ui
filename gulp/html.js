module.exports = function(config, gulp) {
	
	const extender = require('gulp-html-extend');
	const inlinesource = require('gulp-inline-source');
	const browserSync = require('browser-sync').get("server");
	
	gulp.task('html', () =>
		gulp.src(config.paths.src.html)
			.pipe(extender())
			.pipe(inlinesource({
				rootpath: config.paths.dist
			}))
			.pipe(gulp.dest(config.paths.dist))
			.pipe(browserSync.stream())
	);
	
	gulp.task('watch:html', () =>
		gulp.watch(config.paths.watch.html, gulp.parallel('html'))
	);
	
};