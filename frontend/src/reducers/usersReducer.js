//creating reducer. first paraemeter is how our state will look like. what is initial state of usersReducer
//reducer will take care of all Actions related to userReducer. //and second is action that was dispatched
//our initial state will just be emty object
export const UserLoginReducer = (state = {}, action) => {
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

export const UserRegisterReducer = (state = {}, action) => {

    switch (action.type) {
        case 'USER_REGISTER_REQUEST':
            return { loading: true };
        case 'USER_REGISTER_SUCCESS':
            return { loading: false, UserInfo: action.payload };
        case 'USER_REGISTER_FAIL':
            return { loading: false, error: action.payload };

        default:
            return state
    }

}


export const UserDetailsReducer = (state = { user: {} }, action) => {

    switch (action.type) {
        case 'USER_DETAILS_REQUEST':
            return { ...state, loading: true };
        case 'USER_DETAILS_SUCCESS':
            return { loading: false, user: action.payload };

        case 'USER_DETAILS_FAIL':
            return { loading: false, error: action.payload };
        case 'USER_DETAILS_RESET':
            return { useer: {} }//return empty user object

        default:
            return state
    }

}


export const UserUpdateProfileReducer = (state = {}, action) => {

    switch (action.type) {
        case 'USER_UPDATE_PROFILE_REQUEST':
            return { loading: true };
        case 'USER_UPDATE_PROFILE_SUCCESS':
            return { loading: false, success: true, userInfo: action.payload };
        case 'USER_UPDATE_PROFILE_FAIL':
            return { loading: false, error: action.payload };
        default:
            return state
    }

}



export const userListReducer = (state = { users: [] }, action) => {
    switch (action.type) {
        case 'USER_LIST_REQUEST':
            return { loading: true };
        case 'USER_LIST_SUCCESS'://if dispatched action type/name .., then loading false, set users to dispatched action data set as payload
            return { loading: false, users: action.payload };
        case 'USER_LIST_FAIL':
            return { loading: false, error: action.payload };
        case 'USER_LIST_RESET':
            return { users: [] };//return empty users array
        default:
            return state
    }

}



export const userDeleteReducer = (state = {}, action) => {
    switch (action.type) {
        case 'USER_DELETE_REQUEST':
            return { loading: true };
        case 'USER_DELETE_SUCCESS'://if dispatched action type/name .., then loading false, and success = true
            return { loading: false, success: true };
        case 'USER_DELETE_FAIL':
            return { loading: false, error: action.payload };
        default:
            return state
    }
}


export const userUpdateReducer = (state = { user: {} }, action) => {
    switch (action.type) {
        case 'USER_UPDATE_REQUEST':
            return { loading: true }
        case 'USER_UPDATE_SUCCESS':
            return { loading: false, success: true }
        case 'USER_UPDATE_FAIL':
            return { loading: false, error: action.payload }
        case 'USER_UPDATE_RESET':
            return {
                user: {},
            }
        default:
            return state
    }
}