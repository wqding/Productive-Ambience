const API_PORT = 5000;

const express = require('express');
const path = require('path');

const mongoose = require('mongoose');
const logger = require('morgan')
const bodyParser = require('body-parser')
const User = require('./UserSchema.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cors = require('cors');

const app = express();

app.use(cors())

// Serve the static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));

// bodyParser, parses the request body to be a readable json format
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(logger('dev'));

const dbRoute = "mongodb+srv://user:userPassword@cluster0-3xizq.mongodb.net/test?retryWrites=true&w=majority";
mongoose.connect(dbRoute, { useUnifiedTopology: true, useNewUrlParser: true });
let db = mongoose.connection;
db.once('open', () => console.log('connected to db'));
db.on('error', console.error.bind(console, "MongoDB connection error: "));

app.post('/login', async (req, res) => {
  console.log(req.body)
  const result = await User.find({username: req.body.username});

  if(result[0] == undefined || result.length == 0){
    console.log("user does not exist");
    res.status(401).send("user does not exist");
    return;
  }

  // VERY IMPORTANT: when i changed app.get to app.post for login(cause industry
  // standards apparently) the code broke and so I had to add await before
  // the result[0] to fix it.
  // try {
  //   if(await bcrypt.compare(req.body.password, await result[0].password)) {
  //     console.log(result[0]);
  //     // res.send({currentUser: result[0].username});
  //     console.log("successful login");

  //     // jwt.sign({user: req.body.username}, secretkey, (err, token) => {
  //     //   res.json({
  //     //     token
  //     //   });
  //     // });

  //   } else {
  //     console.log("failed login");
  //     res.status(400).send('failed login');
  //   }
  // } catch {
  //   res.status(500).send("some error");
  //   console.log("some error");
  // }
});

app.post('/register', async (req, res) => {
  const result = await User.find({username: req.body.username});

  if(result[0] != undefined){
    console.log("username is taken");
    res.status(401).send("username is taken");
    return;
  }
  
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10)
    const user = new User({
      _id: new mongoose.Types.ObjectId(),
      username: req.body.username,
      password: hashedPassword 
    });

    user.save();
    res.status(201).send("password bcrypted");
  } catch {
    res.status(500).send("some error: " + err);
  }
});

// Handles any requests that don't match the available
app.get('*', (req,res) =>{
    res.sendFile(path.join(__dirname+'/public/index.html'));
});

app.listen(API_PORT, () => console.log(`LISTENING ON PORT ${API_PORT}`));

