import {combineReducers, createStore} from 'redux';
import initialState from './initialState';
import navigationReducer from './reducers/navigation'

const rootReducer = combineReducers({
  navigation: navigationReducer
});

export default createStore(rootReducer, initialState())