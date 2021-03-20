import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Button, Row, Col, ListGroup, Image, Card } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { saveShippingAdress } from '../actions/cartActions.js'
import CheckoutSteps from '../components/CheckoutSteps.js'
import Message from '../components/Message.js'
import { createOrder } from '../actions/orderActions.js'

function PlaceOrderScreen({ history }) {
    const dispatch = useDispatch();

    //useSelector is function that gives acces to entire state(store).and we can pullout cart state from it.
    const cart = useSelector((state) => state.cart)

    const addDecimals = (num) => {
        return (Math.round(num * 100) / 100).toFixed(2);
    }

    //Calculate prices. loop through array of cartItems. reduce takes accumilator and current item, 
    cart.itemsPrice = addDecimals(cart.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0))//0 is just start of accumilator
    //Cart  shipping price. if itemsPrice is > 100. then free ship. else 100 dollars
    cart.shippingPrice = addDecimals(cart.itemsPrice > 100 ? 0 : 100)
    //cart.tax. we will just add 15 percent to. we want it to be number. With fixed we set it to 2 decimal points
    cart.taxPrice = addDecimals(Number((0.15 * cart.itemsPrice).toFixed(2)))

    cart.totalPrice = (Number(cart.itemsPrice) + Number(cart.shippingPrice) + Number(cart.taxPrice)).toFixed(2)

    //useSelector is function that gives acces to entire state(store).and we can pullout  orderCreate state from it.
    const orderCreate = useSelector((state) => state.orderCreate)
    const { order, success, error } = orderCreate;

    useEffect(() => {
        if (success) {//if everything went ok then
            history.push(`/order/${order._id}`)
        }
        // eslint-disable-next-line
    }, [history, success])//if history or success is changed it will call this useEffect function

    const placeOrderHandler = () => {
        //dispatch createOrder, and we pass object with bunch of items, reducer will catch it and return new state.
        dispatch(createOrder({
            orderItems: cart.cartItems,
            shippingAddress: cart.shippingAddress,
            paymentMethod: cart.paymentMethod,
            itemsPrice: cart.itemsPrice,
            shippingPrice: cart.shippingPrice,
            taxPrice: cart.taxPrice,
            totalPrice: cart.totalPrice
        }))
    }
    return (
        <>
            <CheckoutSteps step1 step2 step3 step4 />
            <Row>
                <Col md={8}>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <h2>Shipping</h2>
                            <p>
                                <strong>Address </strong>
                                {cart.shippingAddress.address},
                                {cart.shippingAddress.city} {cart.shippingAddress.postalCode},
                                 {cart.shippingAddress.country}
                            </p>
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <h2>Payment Method</h2>
                            <strong>Method: </strong>
                            {cart.paymentMethod}
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <h2>Order Items</h2>
                            {cart.cartItems.length === 0 ?
                                <Message>You cart is empty</Message> : (
                                    <ListGroup variant='flush'>
                                        {cart.cartItems.map((item, index) => (
                                            <ListGroup.Item key={index}>
                                                <Row>
                                                    <Col md={1}>
                                                        <Image src={item.image} alt={item.name} fluid rounded />
                                                    </Col>
                                                    <Col>
                                                        <Link to={`/product/${item.product}`}>
                                                            {item.name}
                                                        </Link>
                                                    </Col>
                                                    <Col md={4}>
                                                        {item.qty} x ${item.price} = ${item.qty * item.price}
                                                    </Col>
                                                </Row>
                                            </ListGroup.Item>
                                        ))}
                                    </ListGroup>
                                )}

                        </ListGroup.Item>
                    </ListGroup>
                </Col>

                <Col>
                    <Card>
                        <ListGroup variant='flush'>
                            <ListGroup.Item>
                                <h2>Order Summary</h2>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Items</Col>
                                    <Col>
                                        ${cart.itemsPrice}
                                    </Col>
                                </Row>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Row>
                                    <Col>Shipping</Col>
                                    <Col>
                                        ${cart.shippingPrice}
                                    </Col>
                                </Row>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Row>
                                    <Col>Tax</Col>
                                    <Col>
                                        ${cart.taxPrice}
                                    </Col>
                                </Row>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Row>
                                    <Col>Total</Col>
                                    <Col>
                                        ${cart.totalPrice}
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                {error && <Message variant='danger'>{error}</Message>}
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Button type='button' className='btn-block' disabled={cart.cartItems === 0}
                                    onClick={placeOrderHandler}>Place Order</Button>
                            </ListGroup.Item>
                        </ListGroup>
                    </Card>
                </Col>
            </Row>
        </>
    )
}

export default PlaceOrderScreen
