import React, {useState} from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import env from '../env.js'

export default function Save(props) {

    const [configName, setConfigName] = useState();

    const saveConfig = () => {
        var token = sessionStorage.getItem('token');
        console.log(token)

        var name_and_config = {
            name: configName,
            config: props.config
        };

        var xhr = new XMLHttpRequest();
        //no credentials cause cors error otherwise
        // xhr.withCredentials = true;

        xhr.addEventListener("readystatechange", function () {
            if (this.readyState === 4) {
                props.openSnackbar('success', `Successfully saved ${configName}!`);
                props.closeSave();
            }
        });

        xhr.open("POST", `${env.baseUrl}/saveConfig`);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.setRequestHeader("Authorization", `Bearer ${token}`);

        xhr.send(JSON.stringify({username: props.currentUser, name_and_config: name_and_config}));

        // const header = {
        //     'Content-Type': 'application/json',
        //     'Authorization': `Bearer ${token}`,
        // };

        // axios.post(`${env.baseUrl}/saveConfig`, {
        //     headers: header,
        //     config: config
        // })
        // .then((res) => {
        //     if(res.status === 200){
        //         console.log("saved successfully")

        //         //snackbar here
        //     }
        // });
    }


    return (
        <Dialog open={props.showSave} onClose={props.closeSave} aria-labelledby="form-dialog-title">
            <DialogContent>
                <DialogContentText>
                    Give your environment a name
                </DialogContentText>
                
                <TextField
                    autoFocus
                    className="outlined-textarea"
                    label="Name"
                    variant="outlined"
                    fullWidth
                    size="small"
                    style={{padding:"5px"}}
                    onChange={(e) => {setConfigName(e.target.value)}}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={saveConfig} color="primary" style={{marginRight:"auto"}}>Save</Button>
                <Button onClick={props.closeSave} color="primary">Cancel</Button>
            </DialogActions>
        </Dialog>
    );
}