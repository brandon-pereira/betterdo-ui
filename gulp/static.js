module.exports = function(config, gulp) {
    const browserSync = require('browser-sync').get('server');

    gulp.task('static', () =>
        gulp
            .src(config.paths.src.static)
            .pipe(gulp.dest(config.paths.dist))
            .pipe(browserSync.stream())
    );

    gulp.task('watch:static', () =>
        gulp.watch(config.paths.watch.static, gulp.parallel('static'))
    );
};
