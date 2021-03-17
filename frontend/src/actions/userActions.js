
import axios from 'axios'

//creating Action. Action is just function that returns object.
//we give type/name to action. login function will take email and password
//and inside that function we have async function with dispach. so we can dispatch actions to reducer from here too
export const login = (email, password) => async (dispatch) => {
    try {
        dispatch({//first dispatch action with type/name USER_LOGIN_REQUEST. reducer will caught it. and set loading to true
            type: 'USER_LOGIN_REQUEST'
        })

        //then we want to dispatch 'USER_LOGIN_SUCCESS' but we need to check data first
        //but when we're sending data we want to send it in headers
        const config = {//but for now we set content type to application/json'
            headers: {
                'Content-Type': 'Application.json'
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
        localStorage.setItem('serInfo', JSON.stringify(data));


    } catch (error) {//if something fails then dispatch action with type/name PRODUCT_DETAILS_FAIL and pass error data as payload
        console.log(error)
        dispatch({
            type: 'PRODUCT_DETAILS_FAIL',
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        });
    }
}

