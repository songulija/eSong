import React from 'react'
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';//importing these functions to be able dispatch actions. other 
import axios from 'axios';//helps to make HTTP request to server
// import Product from '../components/Product.js'

import { Row, Col, Button } from 'react-bootstrap';
import { listProducts } from '../actions/productActions.js'
import Product from '../components/Product'



// creating HomeScreen component as function
function HomeScreen() {

    const dispatch = useDispatch();//dispatch function will allow to dispatch actions

    //WHATEVER WE PUT HERE WILL RUN ASS SOON AS COMPONENT LOADS
    //IT RUNS AT FIRST RENDER AND AFTER EVERY UPDATE
    useEffect(function () {
        //dispatch listProducts action. When our aciton will be dispatched
        //reducer will handle that action
        dispatch(listProducts());
    }, [dispatch])
    //passing array of dependencies. example [test] so it will fire of useEffect function when value of it (test) changes

    //useSelector is function. we 'll access entire state(Store). we can just pull out state.productList
    const productList = useSelector(state => state.productList);

    //we want loading, eror, products This is all part of state that could be send down
    const { loading, error, products } = productList;

    return (
        <>
            <h1>Latest Products</h1>

            <Row>
                {products.map((product) =>
                    <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                        <Product product={product} />
                    </Col>
                )}
            </Row>
            }



        </>
    )//on small screen row will have 1 column, on mid 2 columns, on large 3 columns
}//creating Product components and passing  properties with values

export default HomeScreen
