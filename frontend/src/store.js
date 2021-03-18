import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { productListReducer } from './reducers/productReducers.js';
import { productDetailsReducer } from './reducers/productReducers.js'
import { cartReducer } from './reducers/cartReducers.js'
import { userLoginReducer, userRegisterReducer } from './reducers/usersReducer.js'

//thunk allows to make asynchronous request. adding productList reducer to it
//we combine all reducers into one with combineReducers. becouse store can take one reducer.
//so it's one big reducer that contains all reducers that we specify
const reducer = combineReducers({
    productList: productListReducer,
    productDetails: productDetailsReducer,
    cart: cartReducer,
    userLogin: userLoginReducer,
    userRegister: userRegisterReducer
});//for example we'll have userLoginReducer set as userLogin. we just giving it name. you can keep it same if want

//we want to get cartItems from localStorage if they are there. if they are there we need to convert JSON string into object
const cartItemsFromStorage = localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : [];//if they are not found in localStorage it will just be empty array

//we want to get userInfo from localStorage if they are there. if they are there we need to convert JSON string into object
const userInfoFromStorage = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null;//if they are not found in localStorage it will just be null

//this is where we can get our cart items. so that will be loaded when store is loaded
const initialState = {//so in cart state we will have cartItems equal to all items stored in localStorage
    cart: { cartItems: cartItemsFromStorage },
    userLogin: { userInfo: userInfoFromStorage }
};//and we want to add our userInfoFromStorage to initial state. add userLogin and inside set userInfo to userInfoFromStorage
//so that data will always come from local storage if its there

const middleware = [thunk];//thunk will allow to make async request in Actions

//we pass combineReducer to global state(Store). second we want to add initial state
// Note: this API requires redux@>=3.1.0
//const store = createStore(rootReducer, applyMiddleware(thunk));
const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)));

export default store;//export to use in another file(index.js)
