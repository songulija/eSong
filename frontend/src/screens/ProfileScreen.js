import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button, Row, Col, FormGroup } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { getUserDetails } from '../actions/userActions.js'

function ProfileScreen({ location, history }) {
    //useState has initial value and function to update initial value
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')//by default both will be strings
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [message, setMessage] = useState(null)//message will appear in register is unsuccesful

    const dispatch = useDispatch();//to dispatch actions to reducer

    ////useSelector is function. we 'll access entire state(Store). we can just pull out state.userDetails
    const userDetails = useSelector(state => state.userDetails)
    const { loading, error, user } = userDetails;//we want to distructure userDetails to these


    ////useSelector is function. we 'll access entire state(Store). we can just pull out state.userLogin
    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin;//we want to distructure userLogin to these
    //to check if user is logged in or not


    //we want to redirect if we already logged in
    useEffect(() => {
        if (!userInfo) {//if user doesnt have userInfo then he's not logged in
            history.push('/login')//redirect to /login route
        }else{
            //check for user
            if(!user.name){//dispatch getUserDetails, pass profile. so in action it will send get request to /api/users/profile
                dispatch(getUserDetails('profile'));
            }else{//if we do have user then
                setName(user.name);
                setEmail(user.email)

            }
        }
    }, [dispatch, history, userInfo, user])//if userInfo or user changes we want to call this function

    const submitHandler = function (e) {
        e.preventDefault();//prevemnt default behaviour when submit button is clicked. preved refresh of page

        if (password !== confirmPassword) {
            setMessage('Passwords do not match')
        } else {//if password and confirmPassword match then
            //DISPATCH REGISTER action. pass name, email and password that user typed
            //this is where we'll dispatch update profile
             
        }



    }

    return (//creating form inside F
        <Row>
            <Col md={3}>
<h2>User Profile</h2>
            {message && <h2>{message}</h2>}
            {error && <h2>{error}</h2>}
            {loading && <h2>Loading</h2>}
            <Form onSubmit={submitHandler}>
                <Form.Group controlId='name'>
                    <Form.Label>Name</Form.Label>
                    <Form.Control type='name' placeholder='Enter name' value={name} onChange={(e) => setName(e.target.value)}>
                    </Form.Control>
                </Form.Group>

                <Form.Group controlId='email'>
                    <Form.Label>Email Adress</Form.Label>
                    <Form.Control type='email' placeholder='Enter email' value={email} onChange={(e) => setEmail(e.target.value)}>
                    </Form.Control>
                </Form.Group>


                <Form.Group controlId='password'>
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type='password'
                        placeholder='Enter password'
                        value={password} onChange={(e) => setPassword(e.target.value)}>
                    </Form.Control>
                </Form.Group>

                <Form.Group controlId='confirmPassword'>
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control
                        type='password'
                        placeholder='Confirm password'
                        value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}>
                    </Form.Control>
                </Form.Group>


                <Button type='submit' variant='primary'>
                    Update
                </Button>
            </Form>
            </Col>
            <Col md={9}>
                <h2>My Orders</h2>
            </Col>
        </Row>
    )//if you have redirect value then it'll send you to /register?.. whatever redirect value is
}

export default ProfileScreen
