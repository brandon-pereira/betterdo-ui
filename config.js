module.exports = {
    paths: {
        src: {
            root: './src',
            scripts: './src/scripts/index.js',
            html: './src/html/*.html',
            svg: './src/svgs/*.svg',
            static: './src/static/**/*'
        },
        dist: './dist',
        watch: {
            scripts: ['./src/scripts/**/*.js', './src/styles/**/*.scss'],
            html: ['./src/html/**/*.html', './src/styles/critical.css'],
            svg: './src/svgs/*.svg',
            static: './src/static/**/*'
        }
    },
    naming: {
        scripts: 'bundle.min.js',
        svgs: 'icons.svg'
    }
};
