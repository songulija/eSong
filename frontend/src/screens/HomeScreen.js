import React from 'react'
import { useState, useEffect } from 'react';
import axios from 'axios';//helps to make HTTP request to server
// import Product from '../components/Product.js'
import { Row, Col, Button } from 'react-bootstrap';
import Product from '../components/Product'



// creating HomeScreen component as function
function HomeScreen() {
    //setting useState. it has initial value(products) and function
    //to update initial value. By default i set it to be empty array
    const [products, setProducts] = useState([]);

    //WHATEVER WE PUT HERE WILL RUN ASS SOON AS COMPONENT LOADS
    //IT RUNS AT FIRST RENDER AND AFTER EVERY UPDATE
    useEffect(function () {
        //creating asynchronous function. becouse we'll need to use await to wait
        //until it gets info/data
        const fetchProducts = async function () {
            //it will make http get request to /api/products route and will receive all products
            const res = await axios.get('/api/products');//wait until it gets them
            setProducts(res.data);//updating initial value(products) to what we get from /api/products
        }
        //and we of course have to call this function inside useEffect
        //so ASS SOON AS COMPONENT LOADS it will run this fetchProducts function
        fetchProducts();
    }, [])
    //passing array of dependencies. example [test] so it will fire of useEffect function when value of it (test) changes

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


        </>
    )//on small screen row will have 1 column, on mid 2 columns, on large 3 columns
}//creating Product components and passing  properties with values

export default HomeScreen
