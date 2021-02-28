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