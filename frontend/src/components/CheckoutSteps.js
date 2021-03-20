import React from 'react'
import { Nav } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

//it will take 4 different screens
function CheckoutSteps({ step1, step2, step3, step4 }) {
    //if step one is passed in, go to login screen to login, if step1 not passed show sign in but it's disabled link
    //only steps you are currently in will be active. others will be disabled 
    return (
        <Nav className='justify-content=center mb-4'>
            <Nav.Item>
                {step1 ? (
                    <LinkContainer to='/login'>
                        <Nav.Link>Sign In</Nav.Link>
                    </LinkContainer>
                ) : <Nav.Link disabled>Sign In</Nav.Link>}
            </Nav.Item>
            <Nav.Item>
                {step2 ? (
                    <LinkContainer to='/shipping'>
                        <Nav.Link>Shipping</Nav.Link>
                    </LinkContainer>
                ) : <Nav.Link disabled>Shipping</Nav.Link>}
            </Nav.Item>
            <Nav.Item>
                {step3 ? (
                    <LinkContainer to='/payment'>
                        <Nav.Link>Payment</Nav.Link>
                    </LinkContainer>
                ) : <Nav.Link disabled>Payment</Nav.Link>}
            </Nav.Item>
            <Nav.Item>
                {step4 ? (
                    <LinkContainer to='/placeorder'>
                        <Nav.Link>Place Order</Nav.Link>
                    </LinkContainer>
                ) : <Nav.Link disabled>Place Order</Nav.Link>}
            </Nav.Item>
        </Nav>
    )
}

export default CheckoutSteps
