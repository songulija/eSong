//creating Action. Action is just function that returns object.
//we give type/name to action
import axios from 'axios'

export const listProducts = () => async (dispatch) => {
    try {
        dispatch({ type: 'PRODUCT_LIST_REQUEST' });
        const { data } = await axios.get('/api/products');//making get request to this route which will return all products from db
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