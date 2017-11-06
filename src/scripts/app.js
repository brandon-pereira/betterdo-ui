const requiredDependencies = [ // Dependencies which are required before app ready
	// TODO: Turn this into an Object
	// that way you can require like .then({react})
	// import('dep1')
];
const optionalDependencies = [ // Dependencies which can be loaded async
	import('../styles/app.scss')
];

Promise.all(requiredDependencies)
	.then(() => { // .then(([dep1, dep2]) =>
		// all requiredDependencies imported
		document.body.classList.add('loaded')
		
	})
	.catch((err) => console.error("Failed to load dependencies.", err))
	
Promise.all(optionalDependencies)
	.catch((err) => console.error("Failed to load dependencies.", err));