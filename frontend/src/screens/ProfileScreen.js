import React, { useState, useEffect } from 'react'
import { Form, Button, Row, Col, FormGroup } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { getUserDetails, updateUserProfile } from '../actions/userActions.js'
import Message from '../components/Message.js'
import Loader from '../components/Loader.js'

const ProfileScreen = ({ history, location }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState(null);

    const dispatch = useDispatch()

    ////useSelector is function that gives acces to entire state(store).and we can pullout userDetails state from it
    const userDetails = useSelector((state) => state.userDetails)
    const { loading, error, user } = userDetails

    ////useSelector is function that gives acces to entire state(store).and we can pullout userLogin state from it
    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin

    ////useSelector is function that gives acces to entire state(store).and we can pullout userUpdateProfile state from it
    const userUpdateProfile = useSelector((state) => state.userUpdateProfile)
    const { success } = userUpdateProfile


    //when component is initialized it calls this function 
    useEffect(() => {
        if (!userInfo) {//if we dont have user logged
            history.push('/login')
        } else {
            if (!user.name) {
                dispatch(getUserDetails('profile'))
            } else {
                setName(user.name)
                setEmail(user.email)
            }
        }
    }, [dispatch, history, userInfo, user])
    //call this function when either of this is changed too

    const submitHandler = (e) => {
        e.preventDefault()//prevent default behaviour, screen refreshing

        if (password !== confirmPassword) {
            setMessage('password do not match')
        } else {//update user profile
            dispatch(updateUserProfile({ id: user._id, name, email, password }))
        }

    }

    return (
        <Row>
            <Col md={3}>
                <h2>User profile</h2>

                {message && <Message variant='danger'>{message}</Message>}
                {error && <Message variant='danger'>{error}</Message>}
                {success && <Message variant='success'>Profile Updated</Message>}
                {loading && <Loader />}
                <Form onSubmit={submitHandler}>
                    <Form.Group controlId='text'>
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                            type='name'
                            placeholder='Enter name'
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        >
                        </Form.Control>
                    </Form.Group>

                    <Form.Group controlId='email'>
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                            type='email'
                            placeholder='Enter email'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        >
                        </Form.Control>
                    </Form.Group>

                    <Form.Group controlId='Password'>
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type='password'
                            placeholder='Enter password'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        >

                        </Form.Control>

                    </Form.Group>


                    <Form.Group controlId='Password'>
                        <Form.Label>Confirm password</Form.Label>
                        <Form.Control
                            type='password'
                            placeholder='Confirm password'
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        >

                        </Form.Control>

                    </Form.Group>

                    <Button type='Submit' variant='primary'> Update</Button>

                </Form>

            </Col>

            <Col md={9}>
                <h2>My orders</h2>
            </Col>
        </Row>
    )
}


export default ProfileScreen
