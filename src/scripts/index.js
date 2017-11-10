const requiredDependencies = [ // Dependencies which are required before app ready
	import('./app'),
	import('react'),
	import('react-dom'),
	import('react-redux'),
	import('redux')
];
const optionalDependencies = [ // Dependencies which can be loaded async
	import('../styles/app.scss')
];

Promise.all(requiredDependencies)
	.then(([app, React, reactDOM]) => {
		console.log("Loaded");
		document.body.classList.add('loaded');
		app(React, reactDOM);
	})
	.catch((err) => console.error("Failed to load dependencies.", err))
	
Promise.all(optionalDependencies)
	.catch((err) => console.error("Failed to load dependencies.", err));