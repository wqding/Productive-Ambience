import React, {useState} from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import CustomizedSnackbars from 'LoginSnackbar';

export default function Login(props) {
    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");

    const handleLoginClick = () => {
        if(!login || !password){
            return(
                <div>
                    <CustomizedSnackbars/>
                    {/* <MySnackbarContentWrapper
                        variant="warning"
                        className={classes.margin}
                        message="This is a warning message!"
                    /> */}
                </div>
            )
        }
        //wrong pass
        else if(true){
            return(
                <div>
                   
                </div>
            )
        }
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