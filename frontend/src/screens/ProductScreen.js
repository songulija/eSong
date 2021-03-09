import React from 'react'
import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';//helps to make HTTP request to server
import { Row, Col, Image, ListGroup, Card, Button, Form } from 'react-bootstrap'
import Rating from '../components/Rating.js'
import { listProductDetails } from '../actions/productActions.js';//import action to dispatch it

//import products from '../products.js'

// creating ProductScreen component as function
function ProductScreen({ history, match }) {//find in products array where product _id is equal to whatever is after /product/:id (id) we can get that id


    const [qty, setQty] = useState(1);//initial value of use state(qty) and function to update initial value.by default value is (0)

    const dispatch = useDispatch();//function to dispatch actions to reducer

    //useSelector is function that gives acces to entire state(store).and we can pullout productDetails state from it
    const productDetails = useSelector(state => state.productDetails);
    const { loading, error, product } = productDetails;//seperating loading error and product from productDetails    

    //WHATEVER WE PUT HERE WILL RUN ASS SOON AS COMPONENT LOADS
    //IT RUNS AT FIRST RENDER AND AFTER EVERY UPDATE
    useEffect(function () {
        dispatch(listProductDetails(match.params.id));//dispatch action. reducer will return new state depending on action type.
        //we also pass product id
    }, [dispatch, match]);
    //passing array of dependencies. example [test] so it will fire of useEffect function when value of it (test) changes

    const addToCartHandler = function () {
        history.push(`/cart/${match.params.id}?qty=${qty}`)
        //history push will just redirect to /cart/5adavddcdcdt44/qty=2   its example
    }




    return (
        <div>
            <Link className='btn btn-light my-3' to='/'>
                Go Back
            </Link>
            {loading ? <h1>Loading...</h1> : error ? <h2>{error}</h2> : (
                <Row>
                    <Col md={6}>
                        <Image src={product.image} alt={product.name} fluid />
                    </Col>
                    <Col md={3}>
                        <ListGroup variant='fluid'>
                            <ListGroup.Item>
                                <h3>{product.name}</h3>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Rating value={product.rating} text={product.numReviews} />
                            </ListGroup.Item>
                            <ListGroup.Item>
                                Price: ${product.price}
                            </ListGroup.Item>
                            <ListGroup.Item>
                                Description: ${product.description}
                            </ListGroup.Item>
                        </ListGroup>

                    </Col>
                    <Col md={3}>
                        <Card>
                            <ListGroup variant='flush'>
                                <ListGroup.Item>
                                    <Row>
                                        <Col>
                                            Price:
                            </Col>
                                        <Col>
                                            <strong>{product.price}</strong>
                                        </Col>
                                    </Row>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <Row>
                                        <Col>Status</Col>
                                        <Col>
                                            {product.countInStock > 0 ? 'In Stock' : 'Out Of Stock'}
                                        </Col>
                                    </Row>
                                </ListGroup.Item>
                                {product.countInStock > 0 && (
                                    <ListGroup.Item>
                                        <Row>
                                            <Col>Qty</Col>
                                            <Col>
                                                <Form.Control as='select' value={qty} onChange={(e) =>
                                                    setQty(e.target.value)}>
                                                    {[...Array(product.countInStock).keys()].map((x) => (
                                                        <option key={x + 1} value={x + 1}>{x + 1}</option>
                                                    ))}
                                                </Form.Control>
                                            </Col>
                                        </Row>
                                    </ListGroup.Item>
                                )}
                                <ListGroup.Item>
                                    <Button onClick={addToCartHandler} className='btn-block' type='button' disabled={product.countInStock === 0}>
                                        Add To Cart
                                    </Button>
                                </ListGroup.Item>
                            </ListGroup>
                        </Card>

                    </Col>
                </Row>

            )}

        </div>
    )//we have three columns in row. one takes 50% of screen. other two 25% each
}

export default ProductScreen
