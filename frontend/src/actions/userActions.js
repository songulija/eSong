import axios from "axios"

export const login = (email, password) => async (dispatch) => {
    try {
        dispatch({//first dispatch action with type/name USER_LOGIN_REQUEST. reducer will caught it. and set loading to true
            type: 'USER_LOGIN_REQUEST'
        })

        //then we want to dispatch 'USER_LOGIN_SUCCESS' but we need to check data first
        //but when we're sending data we want to send it in headers

        const config = {//but for now we set content type to application/json'
            headers: {
                'Content-Type': 'application/json'
            }
        }


        //we want to make post request and pass object with email and password. and as third argument pass config
        //this post request will return json data. _id,name,email .. TOKEN
        const { data } = await axios.post('/api/users/login', { email, password }, config)

        dispatch({//dispatch action with type/name USER_LOGIN_SUCCESS. and send data as payload
            type: 'USER_LOGIN_SUCCESS',
            payload: data
        })

        //then we want to set our user to local storage. set this 'userInfo' and pass data as as string(json)
        localStorage.setItem('userInfo', JSON.stringify(data));


    } catch (error) {//if something fails then dispatch action with type/name PRODUCT_DETAILS_FAIL and pass error data as payload
        console.log(error)
        dispatch({
            type: 'USER_LOGIN_FAIL',
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        });
    }
}

export const logout = () => (dispatch) => {

    localStorage.removeItem('userInfo')
    dispatch({ type: 'USER_LOGOUT' })

}


export const register = (name, email, password) => async (dispatch) => {

    try {

        dispatch({
            type: 'USER_REGISTER_REQUEST'
        })

        const config = {
            headers: {
                'Content-Type': 'application/json',
            }
        }

        const { data } = await axios.post('/api/users',
            { name, email, password },
            config
        )

        dispatch({
            type: 'USER_REGISTER_SUCCESS',
            payload: data,
        })

        dispatch({
            type: 'USER_LOGIN_SUCCESS',
            payload: data,
        })

        localStorage.setItem('userInfo', JSON.stringify(data))

    } catch (error) {
        dispatch({
            type: 'USER_REGISTER_FAIL',
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        })
    }

}


export const getUserDetails = (id) => async (dispatch, getState) => {

    try {

        dispatch({
            type: 'USER_DETAILS_REQUEST'
        })

        const { userLogin: { userInfo } } = getState();

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.get(`/api/users/${id}`, config
        )

        dispatch({
            type: 'USER_DETAILS_SUCCESS',
            payload: data,
        })

    } catch (error) {
        dispatch({
            type: 'USER_DETAILS_FAIL',
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        })
    }

}


export const updateUserProfile = (user) => async (dispatch, getState) => {

    try {

        dispatch({
            type: 'USER_UPDATE_PROFILE_REQUEST'
        })

        const { userLogin: { userInfo } } = getState();

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.put(`/api/users/profile`, user, config
        )

        dispatch({
            type: 'USER_UPDATE_PROFILE_SUCCESS',
            payload: data,
        })

    } catch (error) {
        dispatch({
            type: 'USER_UPDATE_PROFILE_FAIL',
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        })
    }

}

