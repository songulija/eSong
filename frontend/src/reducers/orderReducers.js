//creating reducer. first paraemeter is how our state will look like. what is initial state of orderReducer
//reducer will take care of all Actions related to orderReducer. //and second is action that was dispatched
export const orderCreateReducer = (state = {}, action) => {
    switch (action.type) {//depending on action type/name that was dispatched we return different state
        case 'ORDER_CREATE_REQUEST':
            return {
                loading: true
            }
        case 'ORDER_CREATE_SUCCESS':
            return {//return success true, and set order to data of dispatched action sent as payload
                loading: false,
                success: true,
                order: action.payload
            }
        case 'ORDER_CREATE_FAIL':
            return {
                loading: false,
                error: action.payload
            }
        default:
            return state
    }
}

//creating reducer. first paraemeter is how our state will look like. what is initial state of orderDetailsReducer. emtpy orderItems array and shippingAddress object
//reducer will take care of all Actions related to orderReducer. //and second is action that was dispatched
export const orderDetailsReducer = (state = { loading: true, orderItems: [], shippingAddress: {} }, action) => {
    switch (action.type) {//depending on action type/name that was dispatched we return different state
        case 'ORDER_DETAILS_REQUEST':
            return {//return whaterver is already in state and loading true
                ...state,
                loading: true
            }
        case 'ORDER_DETAILS_SUCCESS':
            return {//return success true, and set order to data of dispatched action sent as payload
                loading: false,
                order: action.payload
            }
        case 'ORDER_DETAILS_FAIL':
            return {
                loading: false,
                error: action.payload
            }
        default:
            return state
    }
}



//reducer will take care of all Actions related to orderReducer. //and second is action that was dispatched
export const orderPayReducer = (state = {}, action) => {
    switch (action.type) {//depending on action type/name that was dispatched we return different state
        case 'ORDER_PAY_REQUEST':
            return {//return whaterver is already in state and loading true
                loading: true
            }
        case 'ORDER_PAY_SUCCESS':
            return {//return success true, and set order to data of dispatched action sent as payload
                loading: false,//return success true
                success: true
            }
        case 'ORDER_PAY_FAIL':
            return {
                loading: false,
                error: action.payload
            }
        case 'ORDER_PAY_RESET':
            return {}//return empty object
        default:
            return state
    }
}