module.exports = function(config, gulp) {
    const nunjucks = require('gulp-nunjucks-render');
    const inlinesource = require('gulp-inline-source');
    const htmlmin = require('gulp-htmlmin');
    const browserSync = require('browser-sync').get('server');

    gulp.task('html', () =>
        gulp
            .src(config.paths.src.html)
            .pipe(
                nunjucks({
                    path: ['./src/html', './src']
                })
            )
            .on('error', function(err) {
                console.log(
                    '\x1b[31m',
                    'nunjucksRender error: ',
                    err.message,
                    '\x1b[0m'
                );
                this.emit('end');
            })
            .pipe(
                inlinesource({
                    rootpath: config.paths.src.root
                }).on('error', function(err) {
                    console.log(
                        '\x1b[31m',
                        'criticalCSS error: ',
                        err.message,
                        '\x1b[0m'
                    );
                    this.emit('end');
                })
            )
            .pipe(htmlmin({ collapseWhitespace: true }))
            .pipe(gulp.dest(config.paths.dist))
            .pipe(browserSync.stream())
    );

    gulp.task('watch:html', () =>
        gulp.watch(config.paths.watch.html, gulp.parallel('html'))
    );
};
