const API_PORT = 5000;

const express = require('express');
const path = require('path');

const mongoose = require('mongoose');
const logger = require('morgan')
const bodyParser = require('body-parser')
const Users = require('./UserSchema.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const app = express();

const secretkey = "secretkey"
const dbRoute = "mongodb+srv://user:userPassword@cluster0-3xizq.mongodb.net/test?retryWrites=true&w=majority";


app.use(cors());

// Serve the static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));

// bodyParser, parses the request body to be a readable json format
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(logger('dev'));

mongoose.connect(dbRoute, { useUnifiedTopology: true, useNewUrlParser: true, useFindAndModify: false });
var db = mongoose.connection;
db.once('open', () => console.log('connected to db'));
db.on('error', console.error.bind(console, "MongoDB connection error: "));

app.post('/login', async (req, res) => {
  console.log(req.body)

  const result = await Users.find({username: req.body.username});
  if(result[0] == undefined || result.length == 0){
    res.status(400).send("Invalid username/password");
    return;
  }

  // VERY IMPORTANT: when i changed app.get to app.post for login(cause industry
  // standards apparently) the code broke and so I had to add await before
  // the result[0] to fix it.
  try {
    if(await bcrypt.compare(req.body.password, await result[0].password)) {
      const data ={currentUser: req.body.username}

      jwt.sign(data, secretkey, { expiresIn: '2h' }, (err, token) => {
        res.json({
          token: token,
          //TODO: the token already stores the currentUser so just get it from the token instead
          currentUser: req.body.username
        });
      });

    } else {
      res.status(400).send("Invalid username/password");
    }
  } catch (err){
    console.log(err);
    res.status(500).send(err);
  }
});

app.post('/register', async (req, res) => {

  let userExists = await Users.exists({username: req.body.username});
  if(!userExists){
    res.status(403).send("Username is taken");
    return;
  }
  
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10)
    const user = new Users({
      _id: new mongoose.Types.ObjectId(),
      username: req.body.username,
      password: hashedPassword,
      savedConfigs: []
    });

    user.save();
    res.status(201).send("user created");
  } catch (err){
    res.status(500).send(err);
  }
});

app.post("/saveConfig", verifyToken, (req, res) => {
  console.log(req.body);
  jwt.verify(req.token, secretkey, async (err, authData) => {
    if(err) {
      res.status(403).send(err);
    } else {

      //save to mongo db
      let userExists = await Users.exists({username: req.body.username});
      if(!userExists){
        console.log("user does not exist");
        res.status(401).send("user does not exist");
        return;
      }

      Users.findOneAndUpdate(
        {username: req.body.username}, 
        {$push: {savedConfigs: req.body.name_and_config}},
        function (err, data) {
          if (err) {
              return res.status(500).send(err);
          }
          if (!data) {
              return res.status(404).end();
          }
          return res.status(200).send(data);
      });
     }
  });
})

function verifyToken(req, res, next) {
  // Get auth header value
  const bearerHeader = req.headers['authorization'];
  if(typeof bearerHeader !== 'undefined') {
    const bearer = bearerHeader.split(' ');
    // Get token from array
    const bearerToken = bearer[1];
    // Set token
    req.token = bearerToken;
    // Next middleware
    next();
  } else {
    res.sendStatus(403);
  }
}

// Handles any requests that don't match the available
app.get('*', (req,res) =>{
    res.sendFile(path.join(__dirname+'/public/index.html'));
});

app.listen(API_PORT, () => console.log(`LISTENING ON PORT ${API_PORT}`));

