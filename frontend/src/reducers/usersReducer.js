

//creating reducer. first paraemeter is how our state will look like. what is initial state of usersReducer
//reducer will take care of all Actions related to userReducer. //and second is action that was dispatched
//our initial state will just be emty object
export const userLoginReducer = (state = {}, action) => {
    switch (action.type) {//switching action type/name that was dispatched
        //depending on action type/name we'll return different state
        case 'USER_LOGIN_REQUEST'://when action name is USER_LOGIN_REQUEST, return loading true
            return { loading: true }
        case 'USER_LOGIN_SUCCESS'://if success loading false, and set userInfo to action.payload which is user data from dispatched action set as payload
            return { loading: false, userInfo: action.payload }//if success action will have user data on it as payload
        case 'USER_LOGIN_FAIL':
            return { loading: false, error: action.payload }//if fail dispatched action will have error data on it. as payload
        case 'USER_LOGOUT':
            return {}//if dispatched action type/name is USER_LOGOUT return empty object
        default:
            return state
    }
}


//creating reducer. first paraemeter is how our state will look like. what is initial state of userRegisterReducer
//reducer will take care of all Actions related to userRegisterReducer. //and second is action that was dispatched
export const userRegisterReducer = (state = {}, action) => {
    switch (action.type) {//switching action type/name that was dispatched
        case 'USER_REGISTER_REQUEST'://when action name is USER_REGISTER_REQUEST, return loading true
            return { loading: true }
        case 'USER_REGISTER_SUCCESS'://if success loading false, and set userInfo to action.payload which is user data from dispatched action set as payload
            return { loading: false, userInfo: action.payload }//if success action will have user data on it as payload
        case 'USER_REGISTER_FAIL':
            return { loading: false, error: action.payload }//if fail dispatched action will have error data on it. as payload
        default:
            return state
    }
}



//creating reducer. first paraemeter is how our state will look like. what is initial state of userDetailsReducer
//reducer will take care of all Actions related to userDetailsReducer. //and second is action that was dispatched
export const userDetailsReducer = (state = {user: {} }, action) => {//initial state is user object(empty)
    switch (action.type) {
        case 'USER_DETAILS_REQUEST':
            return { ...state, loading: true }//we'll have whatever is in initial state, loading true
        case 'USER_DETAILS_SUCCESS'://if success loading false, and set userInfo to action.payload which is user data from dispatched action set as payload
            return { loading: false, user: action.payload }//if success action will have user data on it as payload
        case 'USER_DETAILS_FAIL':
            return { loading: false, error: action.payload }//if fail dispatched action will have error data on it. as payload
        default:
            return state
    }
}






