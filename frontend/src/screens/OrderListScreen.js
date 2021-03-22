import React, { useEffect } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Table, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message.js'
import Loader from '../components/Loader.js'
import { listOrders } from '../actions/orderActions.js'

function OrderListScreen({ history }) {
    const dispatch = useDispatch()

    //useSelector is function that gives acces to entire state(store).and we can pullout orderList state from it
    const orderList = useSelector((state) => state.orderList)
    const { loading, error, orders } = orderList//destructure to get orders ...

    const userLogin = useSelector((state) => state.userLogin)//get userLogin state
    const { userInfo } = userLogin


    //when component loads up it will trigger this function
    useEffect(() => {
        if (userInfo && userInfo.isAdmin) {//if there is userInfo and if user is admin
            dispatch(listOrders())//dispatch listUsers action(to get all users from db) reducer will catch action and return new state
        } else {//if not admin or not logged in then
            history.push('/login')
        }
    }, [dispatch, history, userInfo])//if one of these changed we want to run useEffect again. like successDelete changes. so list users would reload


    return (
        <>
            <h1>Orders</h1>
            {loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message>
                : (
                    <Table striped bordered hover responsive className='table-sm'>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>USER</th>
                                <th>DATE</th>
                                <th>TOTAL</th>
                                <th>PAID</th>
                                <th>DELIVERED</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map((order) => (
                                <tr key={order._id}>
                                    <td>{order._id}</td>
                                    <td>{order.user && order.user.name}</td>
                                    <td>
                                        {order.createdAt.substring(0, 10)}
                                    </td>
                                    <td>
                                        ${order.totalPrice}
                                    </td>
                                    <td>
                                        {order.isPaid ? (
                                            order.paidAt.substring(0, 10)
                                        ) : (
                                            <i class='fas fa-times' style={{ color: 'red' }}></i>
                                        )}
                                    </td>
                                    <td>
                                        {order.isDelivered ? (
                                            order.deliveredAt.substring(0, 10)
                                        ) : (
                                            <i class='fas fa-times' style={{ color: 'red' }}></i>
                                        )}
                                    </td>
                                    <td>
                                        <LinkContainer to={`/order/${order._id}`}>
                                            <Button variant='light' className='btn-sm'>
                                                Details
                                            </Button>
                                        </LinkContainer>

                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                )}
        </>
    )
}

export default OrderListScreen
