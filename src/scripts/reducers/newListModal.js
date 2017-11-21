import initialState from '../initialState';

export default (state, action) => {
	
	const newState = Object.assign({}, state);
	switch(action.type) {
		case 'OPEN_NEW_LIST_MODAL':
			newState.newListModalVisible = true;
			return newState;
		default:
			return state || initialState().lists;
	}
	
}