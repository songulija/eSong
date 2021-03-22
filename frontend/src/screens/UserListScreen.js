import React, { useEffect } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Table, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message.js'
import Loader from '../components/Loader.js'
import { listUsers, deleteUser } from '../actions/userActions.js'

function UserListScreen({ history }) {
    const dispatch = useDispatch()

    //useSelector is function that gives acces to entire state(store).and we can pullout userList state from it
    const userList = useSelector((state) => state.userList)
    const { loading, error, users } = userList

    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin

    //useSelector is function that gives acces to entire state(store).and we can pullout userDelete state from it
    const userDelete = useSelector((state) => state.userDelete)
    const { success: successDelete } = userDelete

    //when component loads up it will trigger this function
    useEffect(() => {
        if (userInfo && userInfo.isAdmin) {//if there is userInfo and if user is admin
            dispatch(listUsers())//dispatch listUsers action(to get all users from db) reducer will catch action and return new state
        } else {//if not admin or not logged in then
            history.push('/login')
        }
    }, [dispatch, history, successDelete, userInfo])//if one of these changed we want to run useEffect again. like successDelete changes. so list users would reload

    //provide user id, to then dispatch action to delete user by its id
    const deleteHandler = (userId) => {
        if (window.confirm('Are you sure')) {//if you confirm then dispatch deleteUser action, pass userId
            dispatch(deleteUser(userId))
        }
    }
    return (
        <>
            <h1>Users</h1>
            {loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message>
                : (
                    <Table striped bordered hover responsive className='table-sm'>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>NAME</th>
                                <th>EMAIL</th>
                                <th>ADMIN</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user) => (
                                <tr key={user._id}>
                                    <td>{user._id}</td>
                                    <td>{user.name}</td>
                                    <td><a href={`mailto:${user.email}`}>{user.email}</a></td>
                                    <td>
                                        {user.isAdmin ? (<i className='fas fa-check' style={{ color: 'green' }}>

                                        </i>) : (
                                            <i class='fas fa-times' style={{ color: 'red' }}></i>
                                        )}
                                    </td>
                                    <td>
                                        <LinkContainer to={`/admin/user/${user._id}/edit`}>
                                            <Button variant='light' className='btn-sm'>
                                                <i className='fas fa-edit'></i>
                                            </Button>
                                        </LinkContainer>
                                        <Button variant='danger' className='btn-sm' onClick={() => deleteHandler(user._id)}>
                                            <i className='fas fa-trash'></i>
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                )}
        </>
    )
}

export default UserListScreen
