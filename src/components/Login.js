import React, {useState} from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import axios from 'axios';
import env from '../env.js'

export default function Register(props) {
    const [username, setLogin] = useState();
    const [password, setPassword] = useState();

    const handleLoginClick = () => {
        if(!username || !password){
            props.openSnackbar('warning', 'Username or password cannot be empty');
            return
        }
        
        axios.post(`${env.baseUrl}/login`, {
            username: username,
            password: password,
        })
        .then(res => {
            if(res.status === 200){
                props.setCurrentUser(res.data.currentUser);
                sessionStorage.clear();
                sessionStorage.setItem('token', res.data.token);
                
                props.openSnackbar('success', `Welcome back ${res.data.currentUser}!`);
                props.closeLogin();
            }
        })
        .catch(err => {
            props.openSnackbar('error', "Login failed")
        });
    };

    return (
        <Dialog open={props.showLogin} aria-labelledby="form-dialog-title">
            <DialogContent>
                <DialogContentText>
                    Login to save your favorite environments
                </DialogContentText>
                
                <TextField
                    autoFocus
                    className="outlined-textarea"
                    label="Username"
                    variant="outlined"
                    fullWidth
                    size="small"
                    style={{padding:"5px"}}
                    onChange={(e) => {setLogin(e.target.value)}}
                />
                <TextField
                    className="outlined-textarea"
                    label="Password"
                    type="password"
                    variant="outlined"
                    fullWidth
                    size="small"
                    style={{padding:"5px"}}
                    onChange={(e) => {setPassword(e.target.value)}}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={props.openRegister} color="primary" style={{marginRight:"auto"}}>Register</Button>
                <Button onClick={handleLoginClick} color="primary">Login</Button>
                <Button onClick={props.closeLogin} color="primary">Cancel</Button>
            </DialogActions>
        </Dialog>
    );
}