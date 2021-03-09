//creating reducer. first paraemeter is how our state will look like. what is initial state of productListReducer
//reducer will take care of all Actions related to productListReducer
export const productListReducer = (state = { products: [] }, action) => {//and second is action
    switch (action.type) {
        case 'PRODUCT_LIST_REQUEST':
            return { loading: true, products: [] }
        case 'PRODUCT_LIST_SUCCESS'://if success dispatched action will have products data on it. as payload
            return { loading: false, products: action.payload }//loading false becouse it loaded
        case 'PRODUCT_LIST_FAIL':
            return { loading: false, error: action.payload }//if fail dispatched action will have error data on it. as payload
        default:
            return state;//return initial state
    }

}

//creating reducer. first paraemeter is how our state will look like. what is initial state of productDetauksReducer. it will be product object
//which will also have reviews array inside it
//reducer will take care of all Actions related to productDetauksReducer
export const productDetailsReducer = (state = { product: { reviews: [] } }, action) => {
    switch (action.type) {//depending on dispatched action type we will return different state(next state)
        case 'PRODUCT_DETAILS_REQUEST':
            return { loading: true, ...state };//return loading true and whatever is in current state
        case 'PRODUCT_DETAILS_SUCCESS'://if action type/name is success. return loading false, and product which
            return { loading: false, product: action.payload };//equals to action.payload data that was dispatched with action
        case 'PRODUCT_DETAILS_FAIL':
            return { loading: false, error: action.payload };//return error which equal to payload data that was dispatched with action
        default:
            return state;
    }

}