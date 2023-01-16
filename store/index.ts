import { applyMiddleware, createStore, compose, combineReducers } from 'redux'
import thunk from "redux-thunk";
import TodoReducer from './reducers/TodoReducer'

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

const composeEnhancers = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

export const reducers = combineReducers({
  TodoReducer
})

// create the store
const store = createStore(TodoReducer, composeEnhancers(applyMiddleware(thunk)));

export default store;