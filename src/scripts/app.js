 import Greeting from './components/greeting';
 
 export default (React, reactDOM) => {
	reactDOM.render(
		<Greeting />,
		document.querySelector('#app')
	);
}
