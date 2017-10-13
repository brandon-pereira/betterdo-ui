const gulp = require('gulp');
const config = require('./config');
require('browser-sync').create("server");

require('./gulp/clean')(config, gulp);
require('./gulp/scripts')(config, gulp);
require('./gulp/styles')(config, gulp);
require('./gulp/html')(config, gulp);
require('./gulp/svgs')(config, gulp);
require('./gulp/media')(config, gulp);
require('./gulp/server')(config, gulp);

gulp.task('build', gulp.series('clean', gulp.parallel('scripts', 'styles', 'svg', 'media'), 'html'));
gulp.task('watch', gulp.parallel('watch:styles', 'watch:html', 'watch:scripts', 'watch:svg', 'watch:media'));
gulp.task('serve', gulp.series('build', gulp.parallel('watch', 'server')));
gulp.task('default', gulp.series('build'));