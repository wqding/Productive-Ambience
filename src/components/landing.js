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
        setTiles(
            tiles.find(tile => {
                if (tile.name ===name){
                    tile.active = !tile.active
                }
            })
        );
    };
    
    const populateGrid = () => {
        let gridLayout = []

        for(let row=0; row < tiles.length/3; row++){
            let rowArr = []
            for(let col=0; col < 3; col++){
                rowArr.push(tiles[row*3 + col])
            }
            gridLayout.push(rowArr)
        }
        return gridLayout
    };
    

    return (
        <div id="landing">
            {console.log("bruh: " +tiles)}
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
                {populateGrid().map((row, rowIdx) => (
                    <Row className="soundTile-row" key={rowIdx}>
                        {row.map((col, colIdx) => (
                            <Col id={col.name} style={{margin: "30px"}} key={colIdx}>
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