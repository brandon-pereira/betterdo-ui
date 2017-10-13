module.exports = function(config, gulp) {

	const browserSync = require('browser-sync').get("server");
	
	gulp.task('media', () =>
		gulp.src(config.paths.src.media)
			.pipe(gulp.dest(config.paths.dist))
			.pipe(browserSync.stream())
	);
	
	gulp.task('watch:media', () =>
		gulp.watch(config.paths.watch.media, gulp.parallel('media'))
	);
	
};