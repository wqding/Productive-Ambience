import React, { useState } from 'react';
import {Container, Navbar, Nav, Col, Row, NavDropdown} from 'react-bootstrap'
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import SoundTile from './SoundTile'
import tilesConfig from './tilesConfig.js'
import Login from './Login.js'
import Register from './Register.js'
import Save from './Save.js'
import CustomSnackbar from './CustomSnackbar.js';
import Favorites from './Favorites.js';
import env from '../env.js'

// import {Link} from 'react-router-dom';

import '../styling/landing.css'

const Landing = () => {
    const [config, setConfig] = useState(tilesConfig)
    const [showLogin, setShowLogin] = useState(false);
    const [showRegister, setShowRegister] = useState(false);
    const [currentUser, setCurrentUser] = useState(null);
    const [showSave, setShowSave] = useState(false);
    const [showSnackbar, setShowSnackbar] = useState(false);
    const [snackbarType, setSnackbarType] = useState({variant: null, message: null})
    const [showFavorites, setShowFavorites] = useState(false);
    const [favorites, setFavorites] = useState();


    const openLogin = () => {
      setShowLogin(true);
    };
      
    const closeLogin = () => {
        setShowLogin(false);
    };

    const openRegister = () => {
        setShowLogin(false);
        setShowRegister(true);
    };

    const closeRegister = () => {
        setShowLogin(true);
        setShowRegister(false);
    };

    const openSave = () => {
        if(currentUser === null || sessionStorage.getItem('token') === null){
            openSnackbar('warning', 'You must log in to save an environment')
            return;
        }
        setShowSave(true)
    }

    const closeSave = () => {
        setShowSave(false)
    }

    const openSnackbar = (variant, message) => {
        setSnackbarType({variant: variant, message: message})
        setShowSnackbar(true);
    };
  
    const closeSnackbar = () => {
      setShowSnackbar(false);
    };

    const openFavorites = () => {
        if(currentUser === null || sessionStorage.getItem('token') === null){
            openSnackbar('warning', 'You must log in to see your favorites')
            return;
        }
        getFavorites();
        setShowFavorites(true)
    }

    const closeFavorites = () => {
        setShowFavorites(false)
    }

    const logout = () => {
        setCurrentUser(null);
        sessionStorage.clear();
    }

    const getFavorites = () => {
        var token = sessionStorage.getItem('token');
        console.log(token)
    
        var xhr = new XMLHttpRequest();
        //no credentials cause cors error otherwise
        // xhr.withCredentials = true;

        xhr.addEventListener("readystatechange", function () {
            if (this.readyState === 4) {
                setFavorites(JSON.parse(xhr.response))
            }
        });

        xhr.open("POST", `${env.baseUrl}/getSavedFavorites`);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.setRequestHeader("Authorization", `Bearer ${token}`);

        xhr.send(JSON.stringify({username: currentUser}));
    }
    
    const populateGrid = () => {
        let gridLayout = []
        let temp = Object.values(config);
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
                        <Nav.Link onClick={openFavorites}>Favorites</Nav.Link>
                        {currentUser == null?
                            <Nav.Link onClick={openLogin}>Login</Nav.Link>
                            :
                            <NavDropdown title={currentUser} id="nav-dropdown" drop='left'>
                                <NavDropdown.Item onClick={logout}>Logout</NavDropdown.Item>
                            </NavDropdown>
                        }
                        
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
                <Row>
                    <Col>
                        <ButtonGroup variant="text" color='primary' style={{textDecorationColor: 'white'}}>
                            <Button>Timer</Button>
                            <Button onClick={openSave}>Save</Button>
                            <Button>Random</Button>
                        </ButtonGroup>
                    </Col>  
                </Row>
                {populateGrid().map((row, rowIdx) => (
                    <Row className="soundTile-row" key={rowIdx}>
                        {row.map((col, colIdx) => (
                            <Col id={col.name} md={{span: 3}} style={{margin: "30px"}} key={colIdx}>
                                <SoundTile
                                    config={config}
                                    setConfig={setConfig}
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
            
            <Login 
                showLogin={showLogin} 
                closeLogin={closeLogin} 
                openRegister={openRegister} 
                setCurrentUser={setCurrentUser}
                openSnackbar={openSnackbar}
            />
            <Register showRegister={showRegister} closeRegister={closeRegister} openSnackbar={openSnackbar}/>
            <Save showSave={showSave} closeSave={closeSave} config={config} currentUser={currentUser} openSnackbar={openSnackbar}/>
            <CustomSnackbar showSnackbar={showSnackbar} closeSnackbar={closeSnackbar} variant={snackbarType.variant} message={snackbarType.message}/>
            <Favorites showFavorites={showFavorites} closeFavorites={closeFavorites} username={currentUser} setConfig={setConfig} favorites={favorites}/>
        </div>
    )
}

export default Landing;