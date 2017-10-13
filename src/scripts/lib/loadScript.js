/**
 *  Simple node.js style script loader for modern browsers
 **/
module.exports = (src) => new Promise((resolve, reject) => {
	const script = document.createElement('script');
	script.async = true;
	script.src = src;

	script.onerror = (err) => reject(`Failed to load ${src}, ${err}`);
	script.onload = resolve;
	
	document.getElementsByTagName("head")[0].appendChild(script);
});