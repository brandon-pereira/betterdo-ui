module.exports = function(config, gulp) {
	
	gulp.task('login', () =>
		gulp.src(config.paths.loginSrc)
			.pipe(gulp.dest(config.paths.loginDist))
	);
	
	gulp.task('watch:login', () =>
		gulp.watch(config.paths.watch.loginSrc, gulp.parallel('login'))
	);
	
};