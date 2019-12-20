import React, {useState} from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import LoginSnackbar from './LoginSnackbar.js';
import axios from 'axios';
import env from '../env.js'

export default function Login(props) {
    // const [snackbarOpen, setSnackbarOpen] = useState(false);

    // const handleCloseSnackbar = (event, reason) => {
    //     if (reason === 'clickaway') {
    //         return;
    //     }
    //     setSnackbarOpen(false);
    // };

    const [username, setLogin] = useState();
    const [password, setPassword] = useState();
    const [confirmPW, setConfirmPW] = useState();

    const handleRegisterClick = () => {
        if(!username || !password || !confirmPW){
            alert("please enter username/password");
            // setSnackbarOpen(true);
            // return(
            //     <div>
            //         <LoginSnackbar open={snackbarOpen} handleClose={handleCloseSnackbar}/>
            //     </div>
            // )
            return
        }
        if(password != confirmPW){
            alert("passwords must match")
            return
        }

        axios.post(`${env.baseUrl}/register`, {
            username: username,
            password: password,
        })
        .then((res) => {
            if(res.status < 300){
                console.log('registered!');

                props.closeRegister()
                //snack bar
            }
        });
        
    }


    return (
        <Dialog open={props.showRegister} onClose={props.closeRegister} aria-labelledby="form-dialog-title">
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
                <TextField
                    className="outlined-textarea"
                    label="Confirm Password"
                    type="Password"
                    variant="outlined"
                    fullWidth
                    size="small"
                    style={{padding:"5px"}}
                    onChange={(e) => {setConfirmPW(e.target.value)}}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleRegisterClick} color="primary" style={{marginRight:"auto"}}>Register</Button>
                <Button onClick={props.closeRegister} color="primary">Cancel</Button>
            </DialogActions>
        </Dialog>
    );
}