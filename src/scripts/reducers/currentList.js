import constants from '../constants';
import initialState from '../initialState';

export default (state, action) => {
	
	const newState = Object.assign({}, state);
	switch(action.type) {
		case constants.SWITCH_LISTS:
			console.log(action.payload.title);
			newState.title = action.payload.title
			// newState.title = Date.now();
			return newState;
		default:
			return state || initialState().currentList;
	}
	
}