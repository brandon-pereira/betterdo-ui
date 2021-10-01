/* eslint-disable import/no-commonjs */
/* eslint-env node */
module.exports = {
    swSrc: 'build/service-worker.js',
    globDirectory: 'build/',
    globPatterns: ['**/*.{js,json,html,png,xml,css,ico,webmanifest}'],
    swDest: 'build/service-worker.js'
};
