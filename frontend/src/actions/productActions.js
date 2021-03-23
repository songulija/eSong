//creating Action. Action is just function that returns object.
//we give type/name to action
import axios from 'axios'

//we can pass keyword and pageNumber. but its default.
export const listProducts = (keyword = '', pageNumber = '') => async (dispatch) => {
    try {
        dispatch({ type: 'PRODUCT_LIST_REQUEST' });
        //we pass query string to request . if you have more than 1. then after first just ad &
        const { data } = await axios.get(`/api/products?keyword=${keyword}&pageNumber=${pageNumber}`);//making get request to this route which will return all products from db
        dispatch({ type: 'PRODUCT_LIST_SUCCESS', payload: data });//when distaching this action we will send data as payload
    } catch (error) {
        dispatch({
            type: 'PRODUCT_LIST_FAIL',
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        });
    }
}





//create Action. Its just function that returns object.
//we give type/name to action
export const listProductDetails = (id) => async (dispatch) => {//when we'll want to dispatch this acion we'll need to provide id(productId)
    try {
        //dispatch request that just makes loading true. REDUCER WILL catch it and depending on it return new state. 
        dispatch({ type: 'PRODUCT_DETAILS_REQUEST' });//in this case it will make loading to true
        const { data } = await axios.get(`/api/products/${id}`);//make get request to server. to /api/products/...(id) route

        //dispatch request that type/name of action will be this. and we send data to reducer as payload. REDUCER WILL catch it and depending on it return new state. 
        dispatch({ type: 'PRODUCT_DETAILS_SUCCESS', payload: data });//in this case it will make loading to false and 
    } catch (error) {
        dispatch({
            type: 'PRODUCT_DETAILS_FAIL',
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        });

    }
}


//it will take product id
export const deleteProduct = (id) => async (dispatch, getState) => {
    try {
        dispatch({
            type: 'PRODUCT_DELETE_REQUEST',
        })

        //getting userInfo state from userLogin
        const {
            userLogin: { userInfo },
        } = getState()

        const config = {
            headers: {//passing authorization token
                Authorization: `Bearer ${userInfo.token}`,
            },
        }
        //make delete request to /api/products/${id} route, and we pass token(config)
        await axios.delete(`/api/products/${id}`, config)

        dispatch({//we dont need to pass anything when dispatch
            type: 'PRODUCT_DELETE_SUCCESS',
        })
    } catch (error) {
        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message
        dispatch({
            type: 'PRODUCT_DELETE_FAIL',
            payload: message,
        })
    }
}




//it will createProduct. just sample product
export const createProduct = () => async (dispatch, getState) => {
    try {
        dispatch({
            type: 'PRODUCT_CREATE_REQUEST',
        })

        //getting userInfo state from userLogin
        const {
            userLogin: { userInfo },
        } = getState()

        const config = {
            headers: {//passing authorization token which we need
                Authorization: `Bearer ${userInfo.token}`,
            },
        }
        //make post request to /api/products route, and we pass token(config)
        const { data } = await axios.post(`/api/products`, {}, config)
        //passing empty object, we making post request not sending data

        dispatch({//we dont need to pass anything when dispatch
            type: 'PRODUCT_CREATE_SUCCESS',
            payload: data
        })
    } catch (error) {
        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message
        dispatch({
            type: 'PRODUCT_CREATE_FAIL',
            payload: message,
        })
    }
}

//this action takes product object
export const updateProduct = (product) => async (dispatch, getState) => {
    try {
        dispatch({//dispatch action with type/name ..
            type: 'PRODUCT_UPDATE_REQUEST',
        })

        const {
            userLogin: { userInfo },
        } = getState()//get userLogin state from store, then destructure to userInfo

        const config = {//we add content type to header
            headers: {//get token from userInfo and pass it to authorization
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`,
            },
        }
        //make put request to /api/products/${product._id}, passing product object id
        const { data } = await axios.put(
            `/api/products/${product._id}`,
            product,
            config
        )//then we pass product object we want to update and token(config)

        dispatch({//dispatch action with type/name and pass data as payload
            type: 'PRODUCT_UPDATE_SUCCESS',
            payload: data,
        })
        dispatch({ type: 'PRODUCT_DETAILS_SUCCESS', payload: data })
        //dispatch action with type/name PRODUCT_DETAILS_SUCCESS to change state of productDetails and pass new data
    } catch (error) {
        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message
        dispatch({
            type: 'PRODUCT_UPDATE_FAIL',
            payload: message,
        })
    }
}


//action will take productId and review object with data
export const createProductReview = (productId, review) => async (dispatch, getState) => {
    try {
        dispatch({//dispatch action with type/name ..
            type: 'PRODUCT_CREATE_REVIEW_REQUEST',
        })

        const {
            userLogin: { userInfo },
        } = getState()//get userLogin state from store, then destructure to userInfo

        const config = {//we add content type to header and token
            headers: {//get token from userInfo and pass it to authorization
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`,
            },
        }
        //make post request to /api/products/${product._id}, passing review object and token(config)
        await axios.post(`/api/products/${productId}/reviews`, review, config)
        //then we pass product object we want to update and token(config)

        dispatch({//dispatch action with type/name and pass we dont pass data becouse we dont get data from post request
            type: 'PRODUCT_CREATE_REVIEW_SUCCESS'
        })
    } catch (error) {
        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message
        dispatch({
            type: 'PRODUCT_CREATE_REVIEW_FAIL',
            payload: message,
        })
    }
}




//we can pass keyword and pageNumber. but its default.
export const listTopProducts = () => async (dispatch) => {
    try {
        dispatch({ type: 'PRODUCT_TOP_REQUEST' });

        const { data } = await axios.get(`/api/products/top`);//making get request to this route which will return 3 top products from db
        dispatch({ type: 'PRODUCT_TOP_SUCCESS', payload: data });//when distaching this action we will send data as payload
    } catch (error) {
        dispatch({
            type: 'PRODUCT_TOP_FAIL',
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        });
    }
}
