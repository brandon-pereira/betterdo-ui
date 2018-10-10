module.exports = function(config, gulp) {
    const browserSync = require('browser-sync').get('server');
    const webpack = require('webpack-stream');

    gulp.task('scripts', () =>
        gulp
            .src(config.paths.src.scripts)
            .pipe(
                webpack(require('../webpack.config.js'), require('webpack')).on(
                    'error',
                    function() {
                        this.emit('end');
                    }
                )
            )
            .pipe(gulp.dest(config.paths.dist + '/scripts'))
            .pipe(browserSync.stream())
    );

    gulp.task('watch:scripts', () =>
        gulp.watch(config.paths.watch.scripts, gulp.parallel('scripts'))
    );
};
