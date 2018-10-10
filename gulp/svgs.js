module.exports = function(config, gulp) {
    const browserSync = require('browser-sync').get('server');
    const svgstore = require('gulp-svgstore');
    const rename = require('gulp-rename');

    gulp.task('svg', () =>
        gulp
            .src(config.paths.src.svg)
            .pipe(svgstore())
            .pipe(rename(config.naming.svgs))
            .pipe(gulp.dest(config.paths.dist))
            .pipe(browserSync.stream())
    );

    gulp.task('watch:svg', () =>
        gulp.watch(config.paths.watch.svg, gulp.parallel('svg'))
    );
};
