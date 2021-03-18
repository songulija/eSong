import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button, Row, Col, FormGroup } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { register } from '../actions/userActions.js'
import FormContainer from '../components/FormContainer.js'

function RegisterScreen({ location, history }) {
    //useState has initial value and function to update initial value
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')//by default both will be strings
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [message, setMessage] = useState(null)//message will appear in register is unsuccesful

    const dispatch = useDispatch();//to dispatch actions to reducer

    ////useSelector is function. we 'll access entire state(Store). we can just pull out state.userRegister
    const userRegister = useSelector(state => state.userRegister)
    const { loading, error, userInfo } = userRegister;//we want to distructure userLogin to these

    //check the query string. if there is then take left size of query which is number
    const redirect = location.search ? location.search.split('=')[1] : '/';

    //we want to redirect if we already logged in
    useEffect(() => {
        if (userInfo) {//if user info exist than means we already are logged in
            history.push(redirect)//redirect to whatever is in redirect
        }
    }, [history, userInfo, redirect])//if userInfo changed we want to redirect

    const submitHandler = function (e) {
        e.preventDefault();//prevemnt default behaviour when submit button is clicked. preved refresh of page

        if (password !== confirmPassword) {
            setMessage('Passwords do not match')
        } else {//if password and confirmPassword match then
            //DISPATCH REGISTER action. pass name, email and password that user typed
            dispatch(register(name, email, password))
        }



    }

    return (//creating form inside F
        <FormContainer>
            <h1>Sign UP</h1>
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
                    Register
                </Button>
            </Form>
            <Row className='py-3'>
                <Col>
                    Have an Account? <Link to={redirect ? `/login?redirect=${redirect}` : '/login'}>Login</Link>
                </Col>
            </Row>
        </FormContainer>
    )//if you have redirect value then it'll send you to /register?.. whatever redirect value is
}

export default RegisterScreen
