import React, { useState } from 'react';
import {Link} from 'react-router-dom';
import {Container, Navbar, Nav, Col, Row} from 'react-bootstrap'
import SoundTile from './SoundTile'
import  tilesConfig from './tilesConfig.js'
import Login from './LoginRegister.js'

import '../styling/landing.css'

const Landing = (props) => {
    const [open, setOpen] = useState(false);

    const handleOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };
    
    const populateGrid = () => {
        let gridLayout = []
        let temp = Object.values(tilesConfig);
        for(let row=0; row < temp.length/3; row++){
            let rowArr = []
            for(let col=0; col < 3; col++){
                if(temp[row*3 + col] === undefined){
                    break;
                }
                rowArr.push(temp[row*3 + col])
            }
            gridLayout.push(rowArr)
        }
        return gridLayout
    };

    return (
        <div id="landing">
            <Navbar bg="light" style={{paddingBottom: "0px", paddingTop: "0px"}}>
                <Navbar.Brand href="#home">Productive Ambience</Navbar.Brand>
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="mr-auto"></Nav>
                    <Nav>
                        <Nav.Link onClick={handleOpen}>Favorites</Nav.Link>
                        <Nav.Link onClick={handleOpen}>Login</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
            
            <Container id="landing-intro">
                {/* maybe make this section slightly darker if possible and blend edges into the background */}
                <h2>Remove Distractions</h2>
                <p>
                    Create the perfect sonic environment get work done
                </p>
            </Container>
            
            <Container id="soundTile-container" style={{width: "60%", textAlign: "center"}}>
                {populateGrid().map((row, rowIdx) => (
                    <Row className="soundTile-row" key={rowIdx}>
                        {row.map((col, colIdx) => (
                            <Col id={col.name} md={{span: 3}} style={{margin: "30px"}} key={colIdx}>
                                <SoundTile
                                    name={col.name}
                                    icon={col.icon} 
                                    sound={col.sound} 
                                    active={col.active} 
                                    volume={col.volume} 
                                />
                            </Col>
                        ))}
                    </Row>
                ))}
            </Container>
            <Login open={open} handleClose={handleClose}></Login>
        </div>
    )
}

export default Landing;