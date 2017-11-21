import {combineReducers, createStore} from 'redux';
import initialState from './initialState';
import currentList from './reducers/currentList'
import newListModal from './reducers/currentList'
import lists from './reducers/lists'

const rootReducer = combineReducers({
  currentList,
  lists,
  newListModalVisible: newListModal
});

export default createStore(rootReducer, initialState())