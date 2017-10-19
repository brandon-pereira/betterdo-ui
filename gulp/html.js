module.exports = function(config, gulp) {
	
	const nunjucks = require('gulp-nunjucks-render');
	const inlinesource = require('gulp-inline-source');
	const htmlmin = require('gulp-htmlmin');
	const browserSync = require('browser-sync').get("server");
	
	gulp.task('html', () =>
		gulp.src(config.paths.src.html)
			.pipe(nunjucks({
				path: ['./src']
			}))
			.pipe(inlinesource({
				rootpath: config.paths.dist
			}))
			.pipe(htmlmin({collapseWhitespace: true}))
			.pipe(gulp.dest(config.paths.dist))
			.pipe(browserSync.stream())
	);
	
	gulp.task('watch:html', () =>
		gulp.watch(config.paths.watch.html, gulp.parallel('html'))
	);
	
};