import React from 'react'
import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react';
import axios from 'axios';//helps to make HTTP request to server
import { Row, Col, Image, ListGroup, Card, Button } from 'react-bootstrap'
import Rating from '../components/Rating.js'
//import products from '../products.js'

// creating ProductScreen component as function
function ProductScreen(props) {//find in products array where product _id is equal to whatever is after /product/:id (id) we can get that id
    //const product = products.find((p) => p._id === props.match.params.id);

    //setting useState. it has initial value(product) and function
    //to update initial value. By default i set it to be JS object
    const [product, setProduct] = useState({});

    //WHATEVER WE PUT HERE WILL RUN ASS SOON AS COMPONENT LOADS
    //IT RUNS AT FIRST RENDER AND AFTER EVERY UPDATE
    useEffect(function () {
        //creating asynchronous function. becouse we'll need to use await to wait
        //until it gets info/data
        const fetchProduct = async function () {
            //it will make http get request to /api/products/.. to whatever is passed after it(param)
            // route and will receive all products. Wait until it gets product with that id
            const res = await axios.get(`/api/products/${props.match.params.id}`);
            setProduct(res.data);//updating initial value(products) to what we get from /api/products
        }
        //and we of course have to call this function inside useEffect
        //so ASS SOON AS COMPONENT LOADS it will run this fetchProduct function
        fetchProduct();
    }, [])
    //passing array of dependencies. example [test] so it will fire of useEffect function when value of it (test) changes



    return (
        <div>
            <Link className='btn btn-light my-3' to='/'>
                Go Back
            </Link>
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
                            <ListGroup.Item>
                                <Button className='btn-block' type='button' disabled={product.countInStock === 0}>
                                    Add To Cart
                                </Button>
                            </ListGroup.Item>
                        </ListGroup>
                    </Card>

                </Col>
            </Row>
        </div>
    )//we have three columns in row. one takes 50% of screen. other two 25% each
}

export default ProductScreen
