import axios from 'axios';

//create Action. Its just function that returns object.
//we give type/name to action. function will take id and qty(quantity)
export const addToCart = (id, qty) => async (dispatch, getState) => {
    //we will be saving our cart to local storage. along with dispatch we can use getState. that allows to get
    //entire state tree. anything from store
    const { data } = await axios.get(`/api/products/${id}`);//making get request to server to get data of particular item from database
    dispatch({//dispatch action. give type/name to action
        type: 'CART_ADD_ITEM',
        payload: {//we send data to reducer as payload. send product which is data._id(from db), data.name and more
            product: data._id,
            name: data.name,
            image: data.image,
            price: data.price,
            countInStock: data.countInStock,
            qty
        }//and in that send data will also be qty(quantity) that we added to cart
    })

    //once we dispatch action we want to save it in local storage
    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));
    //we will save it as cart items. we save entire cart. we acces it through getState().cart.cartItems\
    //it will give us json object. we stringify it becouse in localStorage we can save only strings
    //once we take it out we'll use json parse. to parse it back to javascript
}

//create Action. Its just function that returns object.
//we give type/name to action. function will take id of item
export const removeFromCart = (id) => (dispatch, getState) => {
    //along with dispatch we can use getState. that allows to get entire state tree. anything from store
    dispatch({//dispatch action. give type/name to action
        type: 'CART_REMOVE_ITEM',
        payload: id,//we send data to reducer as payload. that data is id of item
    })
    //once we dispatch action we want to save it in local storage
    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
    //so after action is dispatched it will return back here to execute rest of code. 
    //after deletion we want to save it in local storage
}
