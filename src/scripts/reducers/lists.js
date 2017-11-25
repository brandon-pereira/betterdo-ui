import initialState from '../initialState';

export default (state, action) => {
	
	const newState = Object.assign({}, state);
	switch(action.type) {
		
		default:
			return state || initialState().lists;
	}
	
} //https://babeljs.io/docs/plugins/transform-object-rest-spread/