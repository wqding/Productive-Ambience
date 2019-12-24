import React, {useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import {Navbar, Nav, CardColumns, Card, ListGroup} from 'react-bootstrap'
import env from '../env.js'

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function Favorites(props) {
    
    const renderFavorites = () => {
        if(!props.favorites || props.favorites.length == 0){
            return(
                <Card style={{ width: '18rem' }}>
                    <Card.Body style={{color: "black"}}>
                        <Card.Title>No favorites</Card.Title>
                    </Card.Body>
                </Card>
            )
        }
        
        else{
            return props.favorites.map(fav => {
                return(
                    <Card style={{ width: '18rem' }}>
                        <Card.Body style={{color: "black"}}>
                            <Card.Title>{fav.configName}</Card.Title>
                        </Card.Body>
                        {Object.values(fav.config).map(sound => {
                            if(sound.active){
                                return(
                                    <ListGroup className="list-group-flush" style={{color: "black"}}>
                                        {sound.name + ": " + sound.volume}
                                    </ListGroup>
                                )
                            }
                        })}
                        
                        <Card.Body>
                            <Card.Link  href="#">Select</Card.Link>
                        </Card.Body>
                    </Card>
                )
            })
        }
    }

    return (        
        <Dialog fullScreen open={props.showFavorites} onClose={props.closeFavorites} TransitionComponent={Transition}>
            <Navbar bg="primary"  variant="dark">
                <IconButton edge="start" style={{color:"white"}} onClick={props.closeFavorites} aria-label="close">
                    <CloseIcon />
                </IconButton>
                <Navbar.Brand href="#home">Productive Ambience</Navbar.Brand>
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="mr-auto"></Nav>
                    <Nav>
                        <Button style={{color:"white"}}>save</Button>                 
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
            <CardColumns style={{
                width: "100vw", 
                height: "100%", 
                backgroundColor: "#A9A8DC",
                color: "white",
                textAlign: "center",
                paddingTop: "5%"
            }}>
                {renderFavorites()}
            </CardColumns>
      </Dialog>
           
    );
}