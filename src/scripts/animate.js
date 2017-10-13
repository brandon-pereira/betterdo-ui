export default () => document.querySelector('.flash').animate([
	{opacity: 0},
	{opacity: 1}
], {
	duration: 1000,
	iterations: Infinity,
	direction: 'alternate'
});