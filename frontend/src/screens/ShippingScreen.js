import React, { useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import FormContainer from '../components/FormContainer.js'
import { saveShippingAdress } from '../actions/cartActions.js'
import CheckoutSteps from '../components/CheckoutSteps.js'

//we'll need history to redirect to payment screen
function ShippingScreen({ history }) {

    //useSelector is function that gives acces to entire state(store).and we can pullout cart state from it. and we get shippinhAddress from it
    const cart = useSelector((state) => state.cart)
    const { shippingAddress } = cart;
    //useState initial value(adress), and function to update initial value
    //and we use shippingAddress of user that is lready saved in local storage and is in redux state
    const [address, setAddress] = useState(shippingAddress.address);
    const [city, setCity] = useState(shippingAddress.city);
    const [postCode, setPostCode] = useState(shippingAddress.postCode);
    const [country, setCountry] = useState(shippingAddress.country);

    const dispatch = useDispatch();
    const submitHandler = (e) => {
        e.preventDefault();//prevent default behaviour on submit(refreshing)
        dispatch(saveShippingAdress({ address, city, postCode, country }))//dispatch action with all form data
        history.push('/payment')
    }
    //use CheckoutSteps component. this is shipping screen which is second step. so we want to pass step1 and step2.
    //you need to pass whatever step you're in, and steps before that. 
    return <FormContainer>
        <CheckoutSteps step1 step2 />
        <h1>Shipping</h1>
        <Form onSubmit={submitHandler}>
            <Form.Group controlId='address'>
                <Form.Label>Address</Form.Label>
                <Form.Control type='address' placeholder='Enter address' value={address} required onChange={(e) => setAddress(e.target.value)}>
                </Form.Control>
            </Form.Group>

            <Form.Group controlId='city'>
                <Form.Label>City</Form.Label>
                <Form.Control type='city' placeholder='Enter city' value={city} required onChange={(e) => setCity(e.target.value)}>
                </Form.Control>
            </Form.Group>

            <Form.Group controlId='postCode'>
                <Form.Label>Post Code</Form.Label>
                <Form.Control type='postCode' placeholder='Enter post code' value={postCode} required onChange={(e) => setPostCode(e.target.value)}>
                </Form.Control>
            </Form.Group>

            <Form.Group controlId='country'>
                <Form.Label>Country</Form.Label>
                <Form.Control type='country' placeholder='Enter country' value={country} required onChange={(e) => setCountry(e.target.value)}>
                </Form.Control>
            </Form.Group>

            <Button type='submit' variant='primary'>
                Continue
            </Button>
        </Form>
    </FormContainer>
}

export default ShippingScreen
