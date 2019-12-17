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

    const [username, setLogin] = useState("");
    const [password, setPassword] = useState("");

    const handleLoginClick = () => {
        if(!username || !password){
            alert("please enter username/password");
            // setSnackbarOpen(true);
            // return(
            //     <div>
            //         <LoginSnackbar open={snackbarOpen} handleClose={handleCloseSnackbar}/>
            //     </div>
            // )
            return
        }
        console.log(`${env.baseUrl}/login`)
        axios.post((`${env.baseUrl}/login`), {
            username: username,
            password: password,
        })
        .then((res) => {
            if(res.status === 200){
                console.log('logged in!');
                //set current user state in parent state
                
                // console.log("currentUser: " + currentUser);
            }
        });
    };


    return (
        <Dialog open={props.open} onClose={props.handleClose} aria-labelledby="form-dialog-title">
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
                <Button onClick={handleLoginClick} color="primary">
                    Login
                </Button>
                <Button onClick={props.handleClose} color="primary">
                    Cancel
                </Button>
            </DialogActions>
        </Dialog>
    );
}