module.exports = function(config, gulp) {
    const browserSync = require('browser-sync').get('server');
    const proxyMiddleware = require('http-proxy-middleware');

    gulp.task('server', () => {
        const proxy = proxyMiddleware('/api', {
            target: 'http://localhost:8000'
        });
        return browserSync.init({
            server: {
                baseDir: config.paths.dist,
                middleware: [proxy]
            }
        });
    });
};
