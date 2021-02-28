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
