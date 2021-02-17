import React from 'react';//import react module to use JSX code
import { Col, Container, Row } from 'react-bootstrap';

// create Footer component as function and export it
function Footer() {
    return (
        <footer>
            <Container>
                <Row>
                    <Col className='text-center py-3'>
                        Copyright &copy; Vinted
                    </Col>
                </Row>
            </Container>
        </footer>
    )
}

export default Footer
