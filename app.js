let express = require('express');
let ejs = require('ejs');
let mongoose = require('mongoose');
let encrypt = require('mongoose-encryption');

let User = require('./models/User');

let app = express();

app.use(express.static("public"));
app.use(express.urlencoded({extended: true}));

app.set('view engine', 'ejs');

mongoose.connect('mongodb://localhost:27017/secrets', {useNewUrlParser: true, useUnifiedTopology: true});

app.get('/', (req, res) => {
  res.render('home');
});

app.get('/login', (req, res) => {
  res.render('login');
});


app.post('/login', (req, res) => {
  let username = req.body.username;
  let password = req.body.password;

  User.findOne({email: username}, (err, foundUser) => {
    if (err) {
      console.log(err);
    } else {
      if (foundUser) {
        if (foundUser.password === password) {
          res.render('secrets');
        }
      }
    }
  });
});

app.get('/register', (req, res) => {
  res.render('register');
});

app.post('/register', (req, res) => {
  let user = new User({email: req.body.username, password: req.body.password});
  user.save((err) => {
    if (err) {console.log(err);}else{res.render('secrets');}
  });
});

app.listen(3000, () => {
  console.log("Serveur correctly started !");
});
