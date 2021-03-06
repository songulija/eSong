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



//reducer will take care of all Actions related to orderReducer. //and second is action that was dispatched
export const orderListMyReducer = (state = { orders: [] }, action) => {//state will be emtpy orders array
    switch (action.type) {//depending on action type/name that was dispatched we return different state
        case 'ORDER_LIST_MY_REQUEST':
            return {//return whaterver is already in state and loading true
                loading: true
            }
        case 'ORDER_LIST_MY_SUCCESS':
            return {//return orders, and set orders to data of dispatched action sent as payload
                loading: false,//return success true
                orders: action.payload
            }
        case 'ORDER_LIST_MY_FAIL':
            return {
                loading: false,
                error: action.payload
            }
        case 'ORDER_LIST_MY_RESET':
            return { orders: [] }//return emtpy orders array
        default:
            return state
    }
}

//reducer will take care of all Actions related to orderListReducer. //and second is action that was dispatched
//state is array of orders
export const orderListReducer = (state = { orders: [] }, action) => {
    switch (action.type) {
        case 'ORDER_LIST_REQUEST':
            return {
                loading: true,
            }
        case 'ORDER_LIST_SUCCESS'://return orders array, its equal to dispatched action data dispatched as payload
            return {
                loading: false,
                orders: action.payload,
            }
        case 'ORDER_LIST_FAIL':
            return {
                loading: false,
                error: action.payload,
            }
        default:
            return state
    }
}





//reducer will take care of all Actions related to orderDeliverReducer. //and second is action that was dispatched
export const orderDeliverReducer = (state = {}, action) => {
    switch (action.type) {//depending on action type/name that was dispatched we return different state
        case 'ORDER_DELIVER_REQUEST':
            return {//return whaterver is already in state and loading true
                loading: true
            }
        case 'ORDER_DELIVER_SUCCESS':
            return {//return success true, and set order to data of dispatched action sent as payload
                loading: false,//return success true
                success: true
            }
        case 'ORDER_DELIVER_FAIL':
            return {
                loading: false,
                error: action.payload
            }
        case 'ORDER_DELIVER_RESET':
            return {}//return empty object
        default:
            return state
    }
}
