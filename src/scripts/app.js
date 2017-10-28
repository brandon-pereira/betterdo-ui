const requiredDependencies = [ // Dependencies which are required before app ready
	import('./lib/animate')
];
const optionalDependencies = [ // Dependencies which can be loaded async
	import('../styles/app.scss')
];

Promise.all(requiredDependencies)
	.then(([animate]) => {
		console.info("Application Ready");
		animate(document.querySelector('svg'), [
			{opacity: 0},
			{opacity: 1}
		], {
			duration: 1000,
			iterations: Infinity,
			direction: 'alternate'
		});
	})
	.catch((err) => console.error("Failed to load dependencies.", err))
	
Promise.all(optionalDependencies)
	.catch((err) => console.error("Failed to load dependencies.", err));