module.exports = function(config, gulp) {
    const del = require('del');

    gulp.task('clean', () => del([config.paths.dist]));
};
