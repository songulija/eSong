
import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Row, Col, ListGroup, Image, Form, Button, Card, ListGroupItem } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { addToCart, removeFromCart } from '../actions/cartActions.js'
import { productDetailsReducer } from '../reducers/productReducers.js'

//we want to get product id(match.params.id). we want to get qty=  to get that query string we can get it with location.search
function CartScreen({ match, location, history }) {//and we want history to redirect

    const productId = match.params.id;//getting /cart/... (id) with match.params.id its just parameter
    //but there is not always will be id

    const qty = location.search ? Number(location.search.split('=')[1]) : 1;//it will query params (qty=....). it will return ?qty=.... We only want number that's inside
    //we split it to ?qty and ..(number). we get [1] that is number. ELSE quantity will just be 1

    //function to dispatch actions to reducer
    const dispatch = useDispatch();

    //useSelector is function that gives acces to entire state(store).and we can pullout cartItems state from it
    const cart = useSelector(state => state.cart);//getting cart state from store
    const { cartItems } = cart;//we want to get cartItems from cart state
    console.log(cartItems)

    //WHATEVER WE PUT HERE WILL RUN ASS SOON AS COMPONENT LOADS
    //IT RUNS AT FIRST RENDER AND AFTER EVERY UPDATE
    useEffect(() => {
        //we only want to dispatch if there is productId. if it's regular cart page we dont want to dispatch to add to cart
        if (productId) {
            dispatch(addToCart(productId, qty));//dispatch action (addToCart), passing productId and qty(quantity). reducer will return new state depending on action type.
        }
    }, [dispatch, productId, qty]);//when dispatch, productId or qty changes call this useEffect function

    const removeFromCartHandler = function (id) {//function that will take id. it will remove Item from cart
        dispatch(removeFromCart(id));//dispatch removeFromCart action. passing id of item. reducer will return new state depending on action type.
    }

    const checkoutHandler = function () {
        //basically if they are not logged in they will log in. if they are login they going to go to shipping
        history.push('/login?redirect=shipping');//use history to redirect to /login route
    }

    return (//we will have three columns. one that takes 8/12 of screen. and other two take 2/12 of screen each 
        <Row>
            <Col md={8}>
                <h1>Shopping Cart</h1>
                {cartItems.length === 0 ? <h2>You cart is empty<Link to='/'>Go Back</Link></h2> : (
                    <ListGroup variant='flush'>
                        {cartItems.map(item => (//for each item in cartItems add ListGroup.Item. and we add key=item.product(id) which is id
                            <ListGroup.Item key={item.product}>
                                <Row>
                                    <Col md={2}>
                                        <Image src={item.image} alt={item.name} fluid rounded />
                                    </Col>
                                    <Col md={3}>
                                        <Link to={`/product/${item.product}`}>{item.name}</Link>
                                    </Col>
                                    <Col md={2}>
                                        ${item.price}
                                    </Col>
                                    <Col md={2}>
                                        <Form.Control as='select' value={item.qty} onChange={(e) => dispatch(addToCart(item.product, Number(e.target.value)))}>
                                            {[...Array(item.countInStock).keys()].map((x) => (
                                                <option key={x + 1} value={x + 1}>{x + 1}</option>
                                            ))}
                                        </Form.Control>
                                    </Col>
                                    <Col md={2}>
                                        <Button type='button' variant='light' onClick={() =>
                                            removeFromCartHandler(item.product)}>
                                            <i className='fas fa-trash'></i>
                                        </Button>
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                        ))}
                    </ListGroup>
                )}
            </Col>
            <Col md={4}>
                <Card>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <h2>Subtotal ({cartItems.reduce((acc, item) => acc + item.qty, 0)})
                            items</h2>
                            ${cartItems.reduce((acc, item) => acc + item.qty * item.price, 0).toFixed(2)}
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Button type='button' className='btn-block' disabled={cartItems.length === 0} onClick={checkoutHandler}>Proceed To Checkout</Button>
                        </ListGroup.Item>
                    </ListGroup>
                </Card>
            </Col>

        </Row>
    )
}

export default CartScreen



