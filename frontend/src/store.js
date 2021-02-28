import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import {composeWithDevTools} from 'redux-devtools-extension';


//thunk allows to make asynchronous request.
const reducer = combineReducers({});

const initialState = {};

const middleware = [thunk];//thunk will allow to make async request in Actions

//we pass combineReducer to global state(Store). second we want to add initial state
// Note: this API requires redux@>=3.1.0
//const store = createStore(rootReducer, applyMiddleware(thunk));
const store = createStore(reducer,initialState,composeWithDevTools(applyMiddleware([...middleware])));

export default store;//export to use in another file(index.js)
