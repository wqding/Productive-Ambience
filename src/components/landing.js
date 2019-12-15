import React, { useState } from 'react';
import {Link} from 'react-router-dom';

import {Container, Navbar, Nav, Col, Row} from 'react-bootstrap'
import SoundTile from './SoundTile'

import  tilesConfig from './tilesConfig.js'

import '../styling/landing.css'

const Landing = (props) => {
    const [tiles, setTiles] = useState(tilesConfig);
    // const activeStates, volumeStates = [];
    // tiles.forEach( tile => {
    //     activeStates.push({
    //         name:tile.name,
    //         active:
    //     })
    // })

    const changeVolume = (event, newVolume) => {
      //change the array somehow depending on the parameters passed to it
        

    //   setTiles
    }

    const toggleActive = (name) => {
        tiles.
        setVolume(newValue);
    };
    
    const populateGrid = (currState) => {
        let gridLayout = []

        for(let row=0; row < currState.length/3; row++){
            let rowArr = []
            for(let col=0; col < 3; col++){
                rowArr.push(currState[row*3 + col])
            }
            gridLayout.push(rowArr)
        }
        return gridLayout
    }

    return (
        <div id="landing">
            {/* {console.log(tilesCon)} */}
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
            
            <Container id="soundTile-container" style={{width: "70%", textAlign: "center"}}>
                {populateGrid(tiles).map((row) => (
                    <Row className="soundTile-row">
                        {row.map((col) => (
                            <Col id={col.name} style={{margin: "30px"}}>
                                <SoundTile
                                    name={col.name}
                                    icon={col.icon} 
                                    sound={col.sound} 
                                    active={col.active} 
                                    volume={col.volume} 
                                    toggleActive={toggleActive}
                                    changeVolume={changeVolume}
                                />
                            </Col>
                        ))}
                    </Row>
                ))}
            </Container>
        </div>
    )
}

export default Landing;