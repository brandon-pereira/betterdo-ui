// Async load the app.scss (non-critical) styles
import('../styles/app.scss');

// Example of code splitting
import('./lib/animate').then((animate) => animate(document.querySelector('svg'), [
	{opacity: 0},
	{opacity: 1}
], {
	duration: 1000,
	iterations: Infinity,
	direction: 'alternate'
}));