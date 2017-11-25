import initialState from '../initialState';

export default (state, action) => {
	const newState = Object.assign({}, state);
	switch(action.type) {
		case 'CLOSE_MODALS':
			newState.newList.visible = false;
			newState.listSettings.visible = false;
			newState.appSettings.visible = false;
			return newState;
		case 'OPEN_NEW_LIST_MODAL':
			newState.newList.visible = true;
			return newState;
		default:
			return state || initialState().modals;
	}
	
}