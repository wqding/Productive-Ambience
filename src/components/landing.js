import React from 'react';
import {Link} from 'react-router-dom';

import Jumbotron from 'react-bootstrap/Jumbotron';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar'
import Button from 'react-bootstrap/Button'
import Nav from 'react-bootstrap/Nav'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'

import '../styling/landing.css'
import { strict } from 'assert';

const Landing = (props) => {

    var tileItems = [
        [
            {
                name: "fire",
                active: true,
                sound: "../sounds/fire",
                image: "",
            },
            {
                name: "river",
                active: true,
                sound: "../sounds/river",
                image: "",
            },
            {
                name: "train",
                active: true,
                sound: "../sounds/train",
                image: "",
            }
        ],
        [

        ],
        [
            
        ]
    ]

    return (
        <div id="landing">
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
            
            <Container id="landing-intro">
                {/* maybe make this section slightly darker if possible and blend edges into the background */}
                <h2>Remove Distractions</h2>
                <p>
                    Create the perfect sonic environment get work done
                </p>
            </Container>
            
            <Container id="soundTile-container">
                {tileItems.map((row) => (
                    <Row className="soundTile-row">
                        {row.map((col) => (
                            <Col id={col.name}>
                                {/* <soundTile image={col.image} sound={col.sound} active={col.active}/> */}
                                hello
                            </Col>
                        ))}
                    </Row>
                ))}
            </Container>
        </div>
    )
}

export default Landing;