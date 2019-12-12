import React from 'react';
import {Link} from 'react-router-dom';

import Jumbotron from 'react-bootstrap/Jumbotron';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar'
import Button from 'react-bootstrap/Button'
import Nav from 'react-bootstrap/Nav'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'

const Landing = (props) => {
    return (
        <div>
            <Navbar bg="light" variant="light">
                <Navbar.Brand href="#home">Productive Ambience</Navbar.Brand>
                <Nav className="mr-auto justify-content-end">
                    <Nav.Item>
                        <Nav.Link href="#home">Home</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link href="#home">Home</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link href="#features">Features</Nav.Link>
                    </Nav.Item>
                    
                   
                </Nav>
            </Navbar>
            <Jumbotron fluid>
                <Container>
                    <h3>Remove Distractions</h3>
                    <p>
                        Create the perfect sonic environment get work done
                    </p>
                </Container>
             </Jumbotron>

             <Container>
                <Row>
                    <Col>1 of 3</Col>
                    <Col>2 of 3</Col>
                    <Col>3 of 3</Col>
                </Row>
                <Row>
                    <Col>1 of 3</Col>
                    <Col>2 of 3</Col>
                    <Col>3 of 3</Col>
                </Row>
                <Row>
                    <Col>1 of 3</Col>
                    <Col>2 of 3</Col>
                    <Col>3 of 3</Col>
                </Row><Row>
                    <Col>1 of 3</Col>
                    <Col>2 of 3</Col>
                    <Col>3 of 3</Col>
                </Row>
            </Container>
        </div>
    )
}

export default Landing;