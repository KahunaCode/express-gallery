/* jshint esversion: 6 */

const express = require('express');
const bp = require('body-parser');
const methodOverride = require('method-override');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const exphbs = require('express-handlebars');
const bcrypt = require('bcrypt');

const PORT = process.env.PORT || 3000;
const db = require('./models');
const {Gallery, User} = db;

const app = express();

app.use(session({
  secret: 'keyboard cat'
}));

app.use(passport.initialize());
app.use(passport.session());

const hbs = exphbs.create({
  defaultLayout: 'main',
  extname: '.hbs'
});

app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');

app.use(bp.urlencoded());

app.use(express.static('public'));

const galleryRoutes = require('./routes/galleryRoutes.js');

app.use(methodOverride('X-HTTP-Method-Override'));

app.use(methodOverride(function (req, res) {
  console.log('please work', req.body);
  if (req.body && typeof req.body === 'object' && '_method' in req.body) {
    // look in urlencoded POST bodies and delete it
    var method = req.body._method;
    console.log(method);
    delete req.body._method;
    return method;
  }
}));

app.use('/', galleryRoutes);

app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(
  function (username, password, done){
    console.log('client side username', username);
    console.log('client side password', password);
    User.findOne({
      where: {
        username: username// where db column username is equal to function's username
      }
    }).then((user) =>{
      bcrypt.compare(password, user.password)
        .then(result =>{
          console.log('username/pw correct');
          return done(null, user);
        }).catch(err =>{
          return done(null, false, {message: 'incorrect password'});
        });
    }).catch((err)=>{
      console.log('user not found');
      console.log(err);
      return done(null, false, {message: 'incorrect username'});
    });
  }
));

passport.serializeUser(function(user, done) {
  console.log('serializing the user into session');
  done(null, user.id);
});

passport.deserializeUser(function(userId, done) {
  console.log('adding user information into req object');
  User.findOne({
    where: {
      id: userId
    }
  }).then((user) =>{
    return done(null, {
      id: user.id,
      username: user.username
    });
  }).catch((err)=>{
    done(err, user);
  });
});

const server = app.listen(PORT, () =>{
  db.sequelize.sync();
  console.log(`server running on port ${PORT}`);
});