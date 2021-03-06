import React, { useEffect } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Table, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message.js'
import Loader from '../components/Loader.js'
import { listProducts, deleteProduct, createProduct } from '../actions/productActions.js'
import Paginate from '../components/Paginate.js'

function ProductListScreen({ history, match }) {
    //get pageNumber(params)
    const pageNumber = match.params.pageNumber || 1;
    const dispatch = useDispatch()

    //useSelector is function that gives acces to entire state(store).and we can pullout productList state from it
    const productList = useSelector((state) => state.productList)
    const { loading, error, products, page, pages } = productList

    //useSelector is function that gives acces to entire state(store).and we can pullout productDelete state from it
    const productDelete = useSelector((state) => state.productDelete)
    const { loading: loadingDelete, error: errorDelete, success: successDelete } = productDelete

    //useSelector is function that gives acces to entire state(store).and we can pullout productCreate state from it
    const productCreate = useSelector((state) => state.productCreate)
    const {
        loading: loadingCreate,
        error: errorCreate,
        success: successCreate,
        product: createdProduct,
    } = productCreate;//destructure

    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin

    //when component loads up it will trigger this function
    useEffect(() => {
        dispatch({ type: 'PRODUCT_CREATE_RESET' })

        if (!userInfo || !userInfo.isAdmin) {//if there is userInfo and if user is admin
            history.push('/login')
        }

        if (successCreate) {
            history.push(`/admin/product/${createdProduct._id}/edit`)
        } else {
            dispatch(listProducts('', pageNumber))//pass keyword(empty) amd page number which should be from url(params)
        }
    }, [dispatch, history, userInfo, successDelete, successCreate, createdProduct, pageNumber])//if one of these changed we want to run useEffect again. like successDelete changes. so list users would reload

    //provide user id, to then dispatch action to delete user by its id
    const deleteHandler = (productId) => {
        if (window.confirm('Are you sure')) {//if you confirm then dispatch deleteUser action, pass userId
            //DELETE PRODUCTS
            dispatch(deleteProduct(productId))
        }
    }

    const createProductHandler = () => {
        dispatch(createProduct())//dispatch create product action. simply create product with sample data
    }
    return (
        <>
            <Row className='align-items-center'>
                <Col>
                    <h1>Products</h1>
                </Col>
                <Col className='text-right'>
                    <Button className='my-3' onClick={createProductHandler}>
                        <i className='fas fa-plus'></i>Create Product</Button>
                </Col>
            </Row>
            {loadingDelete && <Loader />}
            {errorDelete && <Message variant='danger'>{errorDelete}</Message>}
            {loadingCreate && <Loader />}
            {errorCreate && <Message variant='danger'>{errorCreate}</Message>}
            {loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message>
                : (
                    <>
                        <Table striped bordered hover responsive className='table-sm'>
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>NAME</th>
                                    <th>PRICE</th>
                                    <th>CATEGORY</th>
                                    <th>BRAND</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {products.map((product) => (
                                    <tr key={product._id}>
                                        <td>{product._id}</td>
                                        <td>{product.name}</td>
                                        <td>
                                            ${product.price}
                                        </td>
                                        <td>
                                            {product.category}
                                        </td>
                                        <td>
                                            {product.brand}
                                        </td>
                                        <td>
                                            <LinkContainer to={`/admin/product/${product._id}/edit`}>
                                                <Button variant='light' className='btn-sm'>
                                                    <i className='fas fa-edit'></i>
                                                </Button>
                                            </LinkContainer>
                                            <Button variant='danger' className='btn-sm' onClick={() => deleteHandler(product._id)}>
                                                <i className='fas fa-trash'></i>
                                            </Button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                        <Paginate pages={pages} page={page} isAdmin={true} />
                    </>
                )}
        </>
    )
}

export default ProductListScreen
