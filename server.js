const express = require('express');
const path = require('path');

const mongoose = require('mongoose');
const logger = require('morgan')
const bodyParser = require('body-parser')
const User = require('./UserSchema.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


const app = express();

// Serve the static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));

app.post('/login', async(req, res) => {
    const result = await User.find({username: req.body.username});
  
    if(result[0] == undefined || result.length == 0){
      console.log("user does not exist");
      res.status(401).send("user does not exist");
      return;
    }
  
    //VERY IMPORTANT: when i changed app.get to app.post for login(cause industry
    //standards apparently) the code broke and so I had to add await before
    //the result[0] to fix it.
    try {
      if(await bcrypt.compare(req.body.password, await result[0].password)) {
        console.log(result[0]);
        // res.send({currentUser: result[0].username});
        console.log("successful login");
  
        // jwt.sign({user: req.body.username}, secretkey, (err, token) => {
        //   res.json({
        //     token
        //   });
        // });
  
      } else {
        console.log("failed login");
        res.status(400).send('failed login');
      }
    } catch {
      res.status(500).send("some error");
      console.log("some error");
    }
});

// Handles any requests that don't match the available
app.get('*', (req,res) =>{
    res.sendFile(path.join(__dirname+'/public/index.html'));
});

const port = process.env.PORT || 5000;
app.listen(port);

console.log('App is listening on port ' + port);
