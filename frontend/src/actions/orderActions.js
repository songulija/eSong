
import axios from 'axios'
//creating Action. Action is just function that returns object.
//we give type/name to action. we have to pass order 
export const createOrder = (order) => async (dispatch, getState) => {

    try {
        //dispatch action with type/name ..
        dispatch({
            type: 'ORDER_CREATE_REQUEST'
        })

        const { userLogin: { userInfo } } = getState();//get user info

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }//setting authorization to our token

        const { data } = await axios.post(`/api/orders`, order, config)//make post request to /api/orders route and pass order and config

        dispatch({//dispatch action and pass data as payload
            type: 'ORDER_CREATE_SUCCESS',
            payload: data,
        })

    } catch (error) {
        dispatch({
            type: 'ORDER_CREATE_FAIL',
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        })
    }

}


//pass oder id
export const getOrderDetails = (id) => async (dispatch, getState) => {

    try {
        //dispatch action with type/name ..
        dispatch({
            type: 'ORDER_DETAILS_REQUEST'
        })

        const { userLogin: { userInfo } } = getState();//get user info. so we can pass token in headers

        const config = {
            headers: {//its get request we dont need to have content-type
                Authorization: `Bearer ${userInfo.token}`
            }
        }//setting authorization to our token

        const { data } = await axios.get(`/api/orders/${id}`, config)//make get request to /api/orders/${id} route and pass config

        dispatch({//dispatch action and pass data as payload
            type: 'ORDER_DETAILS_SUCCESS',
            payload: data,
        })

    } catch (error) {
        dispatch({
            type: 'ORDER_DETAILS_FAIL',
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        })
    }

}


//pass order and payment result that will come from paypal
export const payOrder = (orderId, paymentResult) => async (dispatch, getState) => {

    try {
        //dispatch action with type/name ..
        dispatch({
            type: 'ORDER_PAY_REQUEST'
        })

        const { userLogin: { userInfo } } = getState();//get user info. so we can pass token in headers

        const config = {
            headers: {//its post request we need to have content-type
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }//setting authorization to our token

        const { data } = await axios.put(`/api/orders/${orderId}/pay`, paymentResult, config)//make get request to /api/orders/${id}/pay route and pass config
        //pass paymentResult. we dont pass order becouse its already there

        dispatch({//dispatch action and pass data as payload
            type: 'ORDER_PAY_SUCCESS',
            payload: data,
        })

    } catch (error) {
        dispatch({
            type: 'ORDER_PAY_FAIL',
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        })
    }

}
