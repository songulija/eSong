import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message.js'
import Loader from '../components/Loader.js'
import { listProductDetails, updateProduct } from '../actions/productActions.js'
import FormContainer from '../components/FormContainer.js'

function ProductEditScreen({ match, history }) {

    const productId = match.params.id;//get product id from url(params)
    //use state initial value and function to update initial value
    const [name, setName] = useState('')
    const [price, setPrice] = useState(0)
    const [image, setImage] = useState('')
    const [brand, setBrand] = useState('')
    const [category, setCategory] = useState('')
    const [countInStock, setCountInStock] = useState(0)
    const [description, setDescription] = useState('')
    const [uploading, setUploading] = useState(false)

    const dispatch = useDispatch()
    //useSelector is function that gives acces to entire state(store).ican pullout productDetails state from it
    const productDetails = useSelector((state) => state.productDetails)
    const { loading, error, product } = productDetails//destructure to product ..

    const productUpdate = useSelector((state) => state.productUpdate)
    const { loading: loadingUpdate, error: errorUpdate, success: successUpdate } = productUpdate//destructure to 

    //when component load function is triggered
    useEffect(() => {
        //checking for product name, make sure that ...
        if (successUpdate) {//if update was succesful
            //useEffect will be triggered if successUpdate changes. so it keeps track 
            dispatch({ type: 'PRODUCT_UPDATE_RESET' })//if it changed then dispatch action ..
            history.push('/admin/productlist')
        } else {
            if (!product.name || product._id !== productId) {
                dispatch(listProductDetails(productId))//dispatch action and provide productId
            } else {//else set all fields
                setName(product.name)
                setPrice(product.price)
                setImage(product.image)
                setBrand(product.brand)
                setCategory(product.category)
                setCountInStock(product.countInStock)
                setDescription(product.description)
            }
        }


    }, [dispatch, history, productId, product, successUpdate])//if userInfo changed we want to redirect

    const uploadFileHandler = async (e) => {
        const file = e.target.files[0];//getting access to selected files. usually array. we want single file(image)
        const formData = new FormData()
        formData.append('image', file)
        setUploading(true)//setting uploading state value to true
        try {
            const config = {//create config
                headers: {//when you upload image it has to have content type of multipart/form-data
                    'Content-Type': 'multipart/form-data',
                }
            }
            //make put request to /api/upload route, pass formData(image) and config
            const { data } = await axios.post('/api/upload', formData, config)
            setImage(data)//setImage path to that data 
            setUploading(false)//becouse we done uploading
        } catch (error) {
            console.log(error)
            setUploading(false)//never ending spinner
        }
    }

    const submitHandler = function (e) {
        e.preventDefault();//prevemnt default behaviour when submit button is clicked. preved refresh of page
        //UPDATE PRODUCT. on submit handler we have to dispatch updateProduct action
        dispatch(updateProduct({//and it takes to pass product object 
            _id: productId,
            name,
            price,
            image,
            brand,
            category,
            description,
            countInStock
        }))
    }

    return (
        <>
            <Link to='/admin/productlist' className='btn btn-light my-3'>
                Go Back
          </Link>
            <FormContainer>
                <h1>Edit Product</h1>
                {loadingUpdate && <Loader />}
                {errorUpdate && <Message variant='danger'>{error}</Message>}
                {loading ? (
                    <Loader />
                ) : error ? (
                    <Message variant='danger'>{error}</Message>
                ) : (
                    <Form onSubmit={submitHandler}>
                        <Form.Group controlId='name'>
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                type='name'
                                placeholder='Enter name'
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            ></Form.Control>
                        </Form.Group>

                        <Form.Group controlId='price'>
                            <Form.Label>Price</Form.Label>
                            <Form.Control
                                type='number'
                                placeholder='Enter price'
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                            ></Form.Control>
                        </Form.Group>

                        <Form.Group controlId='image'>
                            <Form.Label>Image</Form.Label>
                            <Form.Control
                                type='text'
                                placeholder='Enter image url'
                                value={image}
                                onChange={(e) => setImage(e.target.value)}
                            ></Form.Control>
                            <Form.File id='image-file' label='Choose file' custom
                                onChange={uploadFileHandler}>
                            </Form.File>
                            {uploading && <Loader />}
                        </Form.Group>


                        <Form.Group controlId='brand'>
                            <Form.Label>Brand</Form.Label>
                            <Form.Control
                                type='text'
                                placeholder='Enter brand'
                                value={brand}
                                onChange={(e) => setBrand(e.target.value)}
                            ></Form.Control>
                        </Form.Group>

                        <Form.Group controlId='countInStock'>
                            <Form.Label>Count in stock</Form.Label>
                            <Form.Control
                                type='number'
                                placeholder='Enter count in stock'
                                value={countInStock}
                                onChange={(e) => setCountInStock(e.target.value)}
                            ></Form.Control>
                        </Form.Group>


                        <Form.Group controlId='category'>
                            <Form.Label>Category</Form.Label>
                            <Form.Control
                                type='text'
                                placeholder='Enter category'
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                            ></Form.Control>
                        </Form.Group>

                        <Form.Group controlId='description'>
                            <Form.Label>Description</Form.Label>
                            <Form.Control
                                type='text'
                                placeholder='Enter description'
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            ></Form.Control>
                        </Form.Group>

                        <Button type='submit' variant='primary'>
                            Update
                </Button>
                    </Form>
                )}
            </FormContainer>
        </>
    )
}

export default ProductEditScreen
