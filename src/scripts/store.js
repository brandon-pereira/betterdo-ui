import {combineReducers, createStore} from 'redux';
import initialState from './initialState';
import currentList from './reducers/currentList'
import modals from './reducers/modals'
import lists from './reducers/lists'

const rootReducer = combineReducers({
  currentList,
  lists,
  modals
});

export default createStore(rootReducer, initialState())