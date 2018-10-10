module.exports = function(config, gulp) {
    const browserSync = require('browser-sync').get('server');

    gulp.task('server', () =>
        browserSync.init({
            server: {
                baseDir: config.paths.dist
            }
        })
    );
};
