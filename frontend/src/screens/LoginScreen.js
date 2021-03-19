import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button, Row, Col, FormGroup } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { login } from '../actions/userActions.js'
import FormContainer from '../components/FormContainer.js'

function LoginScreen({ location, history }) {
    //useState has initial value and function to update initial value
    const [email, setEmail] = useState('')//by default both will be strings
    const [password, setPassword] = useState('')

    const dispatch = useDispatch();//to dispatch actions to reducer

    ////useSelector is function. we 'll access entire state(Store). we can just pull out state.userLogin
    const userLogin = useSelector(state => state.userLogin)
    const { loading, error, userInfo } = userLogin;//we want to distructure userLogin to these

    //check the query string. if there is then take left size of query which is number
    const redirect = location.search ? location.search.split('=')[1] : '/';

    //we want to redirect if we already logged in
    useEffect(() => {
        if (userInfo) {//if user info exist than means we already are logged in
            history.push(redirect)//redirect to whatever is in redirect
        }
    }, [history, userInfo, redirect])//if userInfo changed we want to redirect

    const submitHandler = (e)=> {
        e.preventDefault();//prevemnt default behaviour when submit button is clicked. preved refresh of page
        //DISPATCH LOGIN action. pass email and password that user typed
        dispatch(login(email, password));
    }

    return (//creating form inside F
        <FormContainer>
            <h1>Sign In</h1>
            {error && <h2>{error}</h2>}
            {loading && <h2>Loading</h2>}
            <Form onSubmit={submitHandler}>
                <Form.Group controlId='email'>
                    <Form.Label>Email Adress</Form.Label>
                    <Form.Control type='email' placeholder='Enter email' value={email} onChange={(e) => setEmail(e.target.value)}>
                    </Form.Control>
                </Form.Group>


                <Form.Group controlId='password'>
                    <Form.Label>Password</Form.Label>
                    <Form.Control type='password' placeholder='Enter password' value={password} onChange={(e) => setPassword(e.target.value)}>
                    </Form.Control>
                </Form.Group>


                <Button type='submit' variant='primary'>
                    Sign In
                </Button>
            </Form>
            <Row className='py-3'>
                <Col>
                    New Customer? <Link to={redirect ? `/register?redirect=${redirect}` : '/register'}>Register</Link>
                </Col>
            </Row>
        </FormContainer>
    )//if you have redirect value then it'll send you to /register?.. whatever redirect value is
}

export default LoginScreen
