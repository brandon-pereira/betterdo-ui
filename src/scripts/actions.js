const constants = require('./constants');

export default {
	click: () => ({type: "CLICK"}),
	openNewListModal: () => ({ type: "OPEN_NEW_LIST_MODAL"}),
	closeModals: () => ({ type: "CLOSE_MODALS"}),
	switchList: (list) => ({type: constants.SWITCH_LISTS, payload: list})
}