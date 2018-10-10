const dependencies = new Map();
dependencies.set('app', import('./app'));
dependencies.set('styles', import('../styles/app.scss'));

Promise.all(dependencies.values())
    .then(values => setMapToResolvedValues(values))
    .then(() => ejectCriticalCss())
    .then(() => {
        dependencies.get('app')(dependencies);
        document.body.classList.add('loaded');
    })
    .catch(err => console.error('Failed to load dependencies.', err));

/**
 * We take the resolved values from Promise.all and we
 * inject those values back into the map. Since
 * we know that order is guaranteed, this should always map
 * 1-1 by index.
 * @param {Array} values
 */
const setMapToResolvedValues = values => {
    Array.from(dependencies.keys()).forEach((key, i) => {
        dependencies.set(key, values[i].default);
    });
};

/**
 * We remove the "critical.css" file from the page
 * once our app is ready. This is useful because usually the files
 * either cause duplicate code or un-prefixed code.
 */
const ejectCriticalCss = () => {
    document.querySelector('#critical-css').remove();
};
