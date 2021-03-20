import React, { useState } from 'react'
import { Form, Button, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import FormContainer from '../components/FormContainer.js'
import { savePaymentMethod } from '../actions/cartActions.js'
import CheckoutSteps from '../components/CheckoutSteps.js'

//we'll need history to redirect to payment screen
function PaymentScreen({ history }) {

    //useSelector is function that gives acces to entire state(store).and we can pullout cart state from it. and we get shippinhAddress from it
    const cart = useSelector((state) => state.cart)
    const { shippingAddress } = cart;//get shippingAdress

    if (!shippingAddress) {//if there is no shippingAdress in state 
        history.push('/shipping')
    }

    //useState initial value(adress), and function to update initial value. default will be Paypal
    const [paymentMethod, setPaymentMethod] = useState('PayPal')

    const dispatch = useDispatch();
    const submitHandler = (e) => {
        e.preventDefault();//prevent default behaviour on submit(refreshing)
        dispatch(savePaymentMethod(paymentMethod))//dispatch action with with paymentMethod
        history.push('/placeorder')//redirect to /placeorder route
    }
    //use CheckoutSteps component. this is PaymentScreen screen which is third step. so we want to pass step1 and step2 and step3.
    //you need to pass whatever step you're in, and steps before that. 
    return <FormContainer>
        <CheckoutSteps step1 step2 step3 />
        <h1>Payment Method</h1>
        <Form onSubmit={submitHandler}>
            <Form.Group>
                <Form.Label as='legend'>Select Method</Form.Label>

                <Col>
                    <Form.Check type='radio' label='PayPal or Credit Card' id='PayPal'
                        name='paymentMethod' value='PayPal' checked onChange={(e) =>
                            setPaymentMethod(e.target.value)}>

                    </Form.Check>
                </Col>
            </Form.Group>
            <Button type='submit' variant='primary'>
                Continue
            </Button>
        </Form>
    </FormContainer>
}

export default PaymentScreen
