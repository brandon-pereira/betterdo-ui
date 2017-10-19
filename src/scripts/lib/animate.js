/**
 * Function to call the native Element.animate function.
 * Only fires if the animate feature is supported... if you're
 * wanting to use this you should use a polyfill for unsupported
 * browsers.
 * @param  {Element} el Element to call .animate on.
 * @param  {Options} args Arguments to be sent directly to Element.animate.
 * @return {Element}
 */
export default (el, ...args) => {
	if (el && 'animate' in el) {
		return el.animate(...args)
	}
	return el;
}