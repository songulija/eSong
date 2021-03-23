import React from 'react';
import { Card, Button } from 'react-bootstrap';//importing Card and Button components 
import { Link } from 'react-router-dom';//to use Link instead of a href, so it will not do reload
//from react-bootstrap module
import Rating from './Rating.js'

// create Product component as function, getting hold of properties
function Product(props) {//that are beeing passed to this component



    return (
        <div>
            <Card className='my-3 p-3 rounded'>
                <Link to={`/product/${props.product._id}`}>
                    <Card.Img variant="top" src={props.product.image} style={{ with: '280px', height: '330px' }} />
                </Link>
                <Card.Body>
                    <Link to={`/product/${props.product._id}`}>
                        <Card.Title as='div'>
                            <strong>{props.product.name}</strong>
                        </Card.Title>
                    </Link>
                    <Card.Text as='div'>
                        <div className='my-3'>
                            <Rating value={props.product.rating} text={`${props.product.numReviews} reviews`} />

                        </div>
                    </Card.Text>
                    <Card.Text as='h3'>{props.product.price}</Card.Text>

                </Card.Body>
            </Card>
        </div>
    )
}

export default Product
