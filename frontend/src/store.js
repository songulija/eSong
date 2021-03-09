import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { productListReducer } from './reducers/productReducers.js';
import { productDetailsReducer } from './reducers/productReducers.js'
import { cartReducer } from './reducers/cartReducers.js'


//thunk allows to make asynchronous request. adding productList reducer to it
const reducer = combineReducers({
    productList: productListReducer,
    productDetails: productDetailsReducer,
    cart: cartReducer
});
//we want to get cartItems from localStorage if they are there. if they are there we need to convert JSON string into object
const cartItemsFromStorage = localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : [];//if they are not found in localStorage it will just be empty array


//this is where we can get our cart items. so that will be loaded when store is loaded
const initialState = {//so in cart state we will have cartItems equal to all items stored in localStorage
    cart: { cartItems: cartItemsFromStorage }
};

const middleware = [thunk];//thunk will allow to make async request in Actions

//we pass combineReducer to global state(Store). second we want to add initial state
// Note: this API requires redux@>=3.1.0
//const store = createStore(rootReducer, applyMiddleware(thunk));
const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)));

export default store;//export to use in another file(index.js)
