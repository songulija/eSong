import React, {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import {Form, Button, Row, Col, FormGroup} from 'react-bootstrap'
import {useDispatch, useSelector} from 'react-redux'
import {} from '../actions/userActions.js'
import FormContainer from '../components/FormContainer.js'

function LoginScreen() {
    //useState has initial value and function to update initial value
    const [email, setEmail] = useState('')//by default both will be strings
    const [password, setPassword] = useState('')



    return (//creating form inside F
        <FormContainer>
            <Form onSubmit={submitHandler}>
                <Form.Group controlId='email'>

                </Form.Group>
            </Form>
        </FormContainer>
    )
}

export default LoginScreen
