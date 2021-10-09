/* eslint-disable import/no-commonjs */
/* eslint-env node */
module.exports = {
    swSrc: 'dist/service-worker.js',
    globDirectory: 'dist/',
    globPatterns: ['**/*.{js,json,html,png,xml,css,ico,webmanifest}'],
    swDest: 'dist/service-worker.js'
};
