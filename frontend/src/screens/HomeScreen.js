import React from 'react'
import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';//importing these functions to be able dispatch actions. other 
import axios from 'axios';//helps to make HTTP request to server
// import Product from '../components/Product.js'

import { Row, Col, Button } from 'react-bootstrap';
import { listProducts } from '../actions/productActions.js'
import Product from '../components/Product'
import Loader from '../components/Loader.js';
import Message from '../components/Message.js';
import Paginate from '../components/Paginate.js';
import ProductCarousel from '../components/ProductCarousel.js';
import Meta from '../components/Meta.js';



// creating HomeScreen component as function
function HomeScreen({ match }) {

    //Getting keyword(param) from url. /search/:keyword. we go to HomeScreen so we can get it
    const keyword = match.params.keyword;
    const pageNumber = match.params.pageNumber || 1;//Getting pageNumber(param) from url. or use 1

    const dispatch = useDispatch();//dispatch function will allow to dispatch actions

    //useSelector is function. we 'll access entire state(Store). we can just pull out state.productList
    const productList = useSelector(state => state.productList);
    const { loading, error, products, page, pages } = productList;//destructuring

    //WHATEVER WE PUT HERE WILL RUN ASS SOON AS COMPONENT LOADS
    //IT RUNS AT FIRST RENDER AND AFTER EVERY UPDATE
    useEffect(function () {
        //dispatch listProducts action. When our aciton will be dispatched
        dispatch(listProducts(keyword, pageNumber));//pass keyword to listProducts action
    }, [dispatch, keyword, pageNumber])//when keyword,pageNumber is changed it'll trigger this function again
    //passing array of dependencies. example [test] so it will fire of useEffect function when value of it (test) changes


    return (
        <>
            <Meta />
            {!keyword ? <ProductCarousel /> : <Link to='/' className='btn btn-light'>Go Back </Link>}
            <h1>Latest Products</h1>
            {loading ? (
                <Loader />
            ) : error ? (
                <Message variant='danger'>{error}</Message>
            ) : (
                <>
                    <Row>
                        {products.map((product) =>
                            <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                                <Product product={product} />
                            </Col>
                        )}
                    </Row>
                    <Paginate pages={pages} page={page} keyword={keyword ? keyword : ''} />
                </>

            )}

        </>
    )//on small screen row will have 1 column, on mid 2 columns, on large 3 columns
}//creating Product components and passing  properties with values

export default HomeScreen
