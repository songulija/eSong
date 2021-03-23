import React from 'react'
import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';//helps to make HTTP request to server
import { Row, Col, Image, ListGroup, Card, Button, Form } from 'react-bootstrap'
import Rating from '../components/Rating.js'
import Message from '../components/Message.js'
import Loader from '../components/Loader.js'
import { listProductDetails, createProductReview } from '../actions/productActions.js';//import action to dispatch it
import { set } from 'mongoose';
import Meta from '../components/Meta.js';

//import products from '../products.js'

// creating ProductScreen component as function
function ProductScreen({ history, match }) {//find in products array where product _id is equal to whatever is after /product/:id (id) we can get that id


    const [qty, setQty] = useState(1);//initial value of use state(qty) and function to update initial value.by default value is (0)
    const [rating, setRating] = useState(0)
    const [comment, setComment] = useState('')
    const dispatch = useDispatch();//function to dispatch actions to reducer

    //useSelector is function that gives acces to entire state(store).and we can pullout productDetails state from it
    const productDetails = useSelector((state) => state.productDetails)
    const { loading, error, product } = productDetails

    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin

    //can pullout productDetails state from entire state(store)
    const productReviewCreate = useSelector((state) => state.productReviewCreate)
    const {
        success: successProductReview,
        loading: loadingProductReview,
        error: errorProductReview,
    } = productReviewCreate


    useEffect(function () {

        if (successProductReview) {
            //everytime successProductReview changes it triggers this useEffect function
            alert('Review submited')//clear Raiting and comment
            setRating(0)
            setComment('')
            //dispatch({ type: 'PRODUCT_CREATE_REVIEW_RESET' })//dispatch action, reducer will catch it and reset state
        }

        if (!product._id || product._id !== match.params.id) {
            dispatch(listProductDetails(match.params.id))//dispatch action. reducer will return new state depending on action type.
            dispatch({ type: 'PRODUCT_CREATE_REVIEW_RESET' })
        }
    }, [dispatch, match, successProductReview]);//if successProductReview changes it will fire of useEffect function
    //passing array of dependencies. example [test] so it will fire of useEffect function when value of it (test) changes

    const addToCartHandler = function () {
        history.push(`/cart/${match.params.id}?qty=${qty}`)
        //history push will just redirect to /cart/5adavddcdcdt44/qty=2   its example
    }

    //it will take event (e). When submiting it will give us alot of data about click event
    const submitHandler = (e) => {
        e.preventDefault();
        //we can get param (productId) from url /product/:id and pass to action we want to dispatch
        dispatch(createProductReview(match.params.id, {
            rating,
            comment,
        })
        )
        //and pass review object. which has to have comment and raiting
    }


    return (
        <>
            <Link className='btn btn-light my-3' to='/'>
                Go Back
            </Link>
            {loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> : (
                <>
                    <Meta title={product.name} />
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

                    <Row>
                        <Col md={6}>
                            <h2>Reviews</h2>
                            {product.reviews.length === 0 && <Message>No Reviews</Message>}
                            <ListGroup variant='flush'>
                                {product.reviews.map((review) => (
                                    <ListGroup.Item key={review._id}>
                                        <strong>{review.name}</strong>
                                        <Rating value={review.rating} />
                                        <p>{review.createdAt.substring(0, 10)}</p>
                                        <p>{review.comment}</p>
                                    </ListGroup.Item>
                                ))}
                                <ListGroup.Item>
                                    <h2>Write a Customer Review</h2>
                                    {successProductReview && (
                                        <Message variant='success'>
                                            Review submitted successfully
                                        </Message>
                                    )}
                                    {loadingProductReview && <Loader />}
                                    {errorProductReview && (
                                        <Message variant='danger'>{errorProductReview}</Message>
                                    )}
                                    {userInfo ? (
                                        <Form onSubmit={submitHandler}>
                                            <Form.Group controlId='rating'>
                                                <Form.Label>Rating</Form.Label>
                                                <Form.Control
                                                    as='select'
                                                    value={rating}
                                                    onChange={(e) => setRating(e.target.value)}
                                                >
                                                    <option value=''>Select...</option>
                                                    <option value='1'>1 - Poor</option>
                                                    <option value='2'>2 - Fair</option>
                                                    <option value='3'>3 - Good</option>
                                                    <option value='4'>4 - Very Good</option>
                                                    <option value='5'>5 - Excellent</option>
                                                </Form.Control>
                                            </Form.Group>
                                            <Form.Group controlId='comment'>
                                                <Form.Label>Comment</Form.Label>
                                                <Form.Control
                                                    as='textarea'
                                                    row='3'
                                                    value={comment}
                                                    onChange={(e) => setComment(e.target.value)}
                                                ></Form.Control>
                                            </Form.Group>
                                            <Button
                                                disabled={loadingProductReview}
                                                type='submit'
                                                variant='primary'
                                            >
                                                Submit
                      </Button>
                                        </Form>
                                    ) : (
                                        <Message>
                                            Please <Link to='/login'>sign in</Link> to write a review{' '}
                                        </Message>
                                    )}
                                </ListGroup.Item>
                            </ListGroup>
                        </Col>
                    </Row>
                </>


            )}

        </>
    )//we have three columns in row. one takes 50% of screen. other two 25% each
}

export default ProductScreen
