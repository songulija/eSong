import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { PayPalButton } from 'react-paypal-button-v2'
import { Link } from 'react-router-dom'
import { Row, Col, ListGroup, Image, Card, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../components/Loader.js'
import Message from '../components/Message.js'
import { getOrderDetails, payOrder, deliverOrder } from '../actions/orderActions.js'


//match to get params(id) from url. /api/orders/....
function OrderScreen({ match, history}) {

    const orderId = match.params.id;
    //useState initial value and function to update initial value. by default value false
    const [sdkReady, setSdkReady] = useState(false)

    const dispatch = useDispatch();

    //useSelector is function that gives acces to entire state(store).and we can pullout  orderDetails state from it.
    const orderDetails = useSelector((state) => state.orderDetails)
    const { order, loading, error } = orderDetails;//so we will get order details

    //useSelector is function that gives acces to entire state(store).and we can pullout  orderPay state from it.
    const orderPay = useSelector((state) => state.orderPay)
    const { loading: loadingPay, success: successPay } = orderPay;//so we'll get loading and success from it. rename those becouse we already have them from other state

    //useSelector is function that gives acces to entire state(store).and we can pullout  orderDeliver state from it.
    const orderDeliver = useSelector((state) => state.orderDeliver)
  const { loading: loadingDeliver, success: successDeliver } = orderDeliver

    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin
  

    if (!loading) {//if no loading then
        const addDecimals = (num) => {
            return (Math.round(num * 100) / 100).toFixed(2);
        }

        //Calculate prices. loop through array of cartItems. reduce takes accumilator and current item, 
        order.itemsPrice = addDecimals(order.orderItems.reduce((acc, item) => acc + item.price * item.qty, 0))//0 is just start of accumilator
    }


    useEffect(() => {
        if (!userInfo) {
            history.push('/login')
          }
        const addPaypalScript = async function () {
            //fetch client id from backend
            const { data: clientId } = await axios.get('/api/config/paypal')
            //to connect you to paypal you need <script src="https://www.paypal.com/sdk/js?client-id=YOUR_CLIENT_ID"></script>
            const script = document.createElement('script');//create element named script
            script.type = 'text/javascript';//add type to that element 
            script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`;//using paypal script and passing clientId
            script.async = true;//to make that script async
            script.onload = () => {//once it loads setSdkReady, it'll tell if its loaded or not
                setSdkReady(true)
            }
            document.body.appendChild(script);//dynamically adding paypal script to body(html)
            //we'll have peace of state when sdk is ready. that paypal gives us
        }

        if (!order || successPay || successDeliver || order._id !== orderId) {//if order isnt there or if we have success pay than dispatch this
            dispatch({ type: 'ORDER_PAY_RESET' })//if we dont do this it will keep refreshing
            dispatch({ type: 'ORDER_DELIVER_RESET' })//dispatching to reset orderDeliver state
            dispatch(getOrderDetails(orderId))//it will load order again but it'll be paid
        } else if (!order.isPaid) {//if order is not paid
            if (!window.paypal) {//check if paypal script is there
                addPaypalScript();//ADD paypal script
            } else {//if it already has paypal script 
                setSdkReady(true)
            }
        }
        //dispatch action, and pass to it orderId. action will get order from db and reducer will catch dispatched action and return new state
        /*if (!order || order._id !== orderId) {
            dispatch(getOrderDetails(orderId))
        }*/
    }, [dispatch, orderId, successPay, successDeliver, order, history, userInfo])//if order or orderId is changed it will call this useEffect function

    //it takes from paypal paymentResult
    const successPaymentHandler = (paymentResult) => {
        console.log(paymentResult)
        //dispatch payOrder action, give orderId and paymentResult that we get from paypal
        dispatch(payOrder(orderId, paymentResult))
    }


    const deliverHandler = () =>{
        dispatch(deliverOrder(order))
    }

    return loading ? <Loader /> : error ? <Message variant='danger'>{error}
    </Message> : <>
        <h1>Order {order._id}</h1>
        <Row>
            <Col md={8}>
                <ListGroup variant='flush'>
                    <ListGroup.Item>
                        <h2>Shipping</h2>
                        <p>
                            <strong>Name: </strong> {order.user.name}
                        </p>
                        <p>
                            <strong>Email: </strong> {' '}
                            <a href={`mailto:${order.user.email}`}> {order.user.email}</a>
                        </p>
                        <p>
                            <strong>Address </strong>
                            {order.shippingAddress.address},
                                {order.shippingAddress.city} {order.shippingAddress.postalCode},
                                 {order.shippingAddress.country}
                        </p>
                        {order.isDelivered ? <Message variant='success'>Delivered on {order.isDelivered}</Message> :
                            <Message variant='danger'>Not Delivered</Message>
                        }
                    </ListGroup.Item>

                    <ListGroup.Item>
                        <h2>Payment Method</h2>
                        <p>
                            <strong>Method: </strong>
                            {order.paymentMethod}
                        </p>
                        {order.isPaid ? <Message variant='success'>Paid on {order.paidAt}</Message> :
                            <Message variant='danger'>Not Paid</Message>
                        }
                    </ListGroup.Item>

                    <ListGroup.Item>
                        <h2>Order Items</h2>
                        {order.orderItems.length === 0 ?
                            <Message>Order is empty</Message> : (
                                <ListGroup variant='flush'>
                                    {order.orderItems.map((item, index) => (
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
                                    ${order.itemsPrice}
                                </Col>
                            </Row>
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <Row>
                                <Col>Shipping</Col>
                                <Col>
                                    ${order.shippingPrice}
                                </Col>
                            </Row>
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <Row>
                                <Col>Tax</Col>
                                <Col>
                                    ${order.taxPrice}
                                </Col>
                            </Row>
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <Row>
                                <Col>Total</Col>
                                <Col>
                                    ${order.totalPrice}
                                </Col>
                            </Row>
                        </ListGroup.Item>
                        {!order.isPaid && (
                            <ListGroup.Item>
                                {loadingPay && <Loader />}
                                {!sdkReady ? <Loader /> : (
                                    <PayPalButton amount={order.totalPrice} onSuccess=
                                        {successPaymentHandler} />
                                )}
                            </ListGroup.Item>
                        )}
                        {loadingDeliver && <Loader />}
                        {userInfo && userInfo.isAdmin && order.isPaid && !order.isDelivered && (
                            <ListGroup.Item>
                                <Button type='button' className='btn btn-block' onClick={deliverHandler}>Mark As Delivered</Button>
                            </ListGroup.Item>
                        )}

                    </ListGroup>
                </Card>
            </Col>
        </Row>


    </>
}

export default OrderScreen
