import initialState from '../initialState';

export default (state, action) => {
	
	const newState = Object.assign({}, state);
	switch(action.type) {
		case 'CLICK':
			console.log("CLICK REDUCER", state);
			newState.title = Date.now();
			return newState;
		default:
			return state || initialState().lists;
	}
	
} //https://babeljs.io/docs/plugins/transform-object-rest-spread/