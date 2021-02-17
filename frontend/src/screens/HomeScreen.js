import React from 'react'
// import Product from '../components/Product.js'
import { Row, Col, Button } from 'react-bootstrap';
import products from '../products.js';
import Product from '../components/Product'



// creating HomeScreen component as function
function HomeScreen() {
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
