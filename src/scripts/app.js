const requiredDependencies = [ // Dependencies which are required before app ready
	import('react'),
	import('react-dom'),
	import('react-redux'),
];
const optionalDependencies = [ // Dependencies which can be loaded async
	import('../styles/app.scss')
];

Promise.all(requiredDependencies)
	.then(([React, reactDOM]) => {
		document.body.classList.add('loaded')
		reactDOM.render(
			<h1>Hello, world!</h1>,
			document.querySelector('#app')
		);
	})
	.catch((err) => console.error("Failed to load dependencies.", err))
	
Promise.all(optionalDependencies)
	.catch((err) => console.error("Failed to load dependencies.", err));