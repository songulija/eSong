//creating reducer. first paraemeter is how our state will look like. what is initial state of productListReducer
//reducer will take care of all Actions related to productListReducer
export const productListReducer = (state = { products: [] }, action) => {
    switch (action.type) {
        case 'PRODUCT_LIST_REQUEST':
            return { loading: true, products: [] }
        case 'PRODUCT_LIST_SUCCESS':
            return {
                loading: false,
                products: action.payload.products,
                pages: action.payload.pages,
                page: action.payload.page,
            }
        case 'PRODUCT_LIST_FAIL':
            return { loading: false, error: action.payload }
        default:
            return state
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


export const productDeleteReducer = (state = {}, action) => {
    switch (action.type) {
        case 'PRODUCT_DELETE_REQUEST':
            return { loading: true }
        case 'PRODUCT_DELETE_SUCCESS':
            return { loading: false, success: true }//set success to true
        case 'PRODUCT_DELETE_FAIL':
            return { loading: false, error: action.payload }
        default:
            return state
    }
}

//reducer will take care of all Actions related to productCreateReducer
export const productCreateReducer = (state = {}, action) => {
    switch (action.type) {
        case 'PRODUCT_CREATE_REQUEST':
            return { loading: true }
        case 'PRODUCT_CREATE_SUCCESS':
            return { loading: false, success: true, product: action.payload }
        case 'PRODUCT_CREATE_FAIL':
            return { loading: false, error: action.payload }
        case 'PRODUCT_CREATE_RESET':
            return {}
        default:
            return state
    }
}

//reducer will catch all actions   related to productUpdateReducer. its state is product object
export const productUpdateReducer = (state = { product: {} }, action) => {
    switch (action.type) {
        case 'PRODUCT_UPDATE_REQUEST':
            return { loading: true }
        case 'PRODUCT_UPDATE_SUCCESS'://if success return product, its equal to dispatched action data send as payload
            return { loading: false, success: true, product: action.payload }
        case 'PRODUCT_UPDATE_FAIL':
            return { loading: false, error: action.payload }
        case 'PRODUCT_UPDATE_RESET':
            return { product: {} }
        default:
            return state
    }
}



//reducer will catch all actions   related to productReviewCreateReducer
export const productReviewCreateReducer = (state = {}, action) => {
    switch (action.type) {
        case 'PRODUCT_CREATE_REVIEW_REQUEST':
            return { loading: true }
        case 'PRODUCT_CREATE_REVIEW_SUCCESS'://it will return success true 
            return { loading: false, success: true }
        case 'PRODUCT_CREATE_REVIEW_FAIL':
            return { loading: false, error: action.payload }
        case 'PRODUCT_CREATE_REVIEW_RESET':
            return {}
        default:
            return state
    }
}

//reducer will catch all actions   related to productTopRatedReducer. its state equals to products array
export const productTopRatedReducer = (state = { products: [] }, action) => {
    switch (action.type) {
        case 'PRODUCT_TOP_REQUEST'://return empty products array
            return { loading: true, products: [] }
        case 'PRODUCT_TOP_SUCCESS'://return products, its equal to dispatched action data send as payload
            return { loading: false, products: action.payload }
        case 'PRODUCT_TOP_FAIL':
            return { loading: false, error: action.payload }
        default:
            return state
    }
}