/* jshint esversion: 6 */

const express = require('express');
const router = express.Router();
const bp = require('body-parser');
const path = require('path');

const db = require('../models');
const {Gallery, User} = db;

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const app = express();
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
      if (user.password === password){//if user object's password === password given from payload
        console.log('username and password successful using database');
        return done(null, user);
      }else{
        console.log('password was incorrect');
        return done(null, false, {message: 'incorrect password'});
      }
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




router
.get('/login', (req,res) =>{
  res.sendFile(path.resolve('./public/login.html'));
})
.post('/login', passport.authenticate('local', {
  successRedirect: '/edit',
  failureRedirect: '/login'
}))
.get('/gallery/:id/edit', (req,res) =>{
  console.log(`GET edit page for id ${req.params.id}`);
  Gallery.findById(parseInt(req.params.id))
  .then((photo) =>{
    console.log('querying for detail by ID');
    res.render('edit', {photo: photo});
  }).catch((err) =>{
    console.log(err);
  });
})
.put('/gallery/:id/edit', (req,res) =>{
  console.log('PUT sent to put route');
  Gallery.update({
    title: req.body.title,
    author: req.body.author,
    link: req.body.link,
    description: req.body.description
  }, {where: {
    id: req.params.id
  }})
  .then((gallery) =>{
    res.redirect(`/gallery/${req.params.id}`);
  })
  .catch((err) =>{
    console.log(err);
  });
})
.get('/gallery/new', (req,res) =>{
  console.log('GET gallery/new');
  res.render('new');
})
.get('/gallery/:id', (req,res) =>{
  Gallery.findById(parseInt(req.params.id))
    .then((detail) =>{
      console.log('detail is', detail);
      var toRender = {
        title: detail.title,
        author: detail.author,
        link: detail.link,
        description: detail.description
      };
      res.render('detail', toRender);
    })
    .catch((err) =>{
      console.log(err);
    });
})
.get('/', (req,res) =>{
  console.log('getting from /');
  Gallery.findAll()
  .then((gallery) => {
    console.log(gallery);
    res.render('index', {gallery:gallery});
  })
  .catch((err) =>{
    console.log(err);
  });
})
.post('/gallery', (req,res) =>{
  Gallery.create({
    title: req.body.title,
    author: req.body.author,
    link: req.body.link,
    description: req.body.description
  })
  .then((data) =>{
    //console.log(data);
    console.log('inserted a new record');
    res.end();
  })
  .catch((err) => {
    console.log(err);
  });
})
.delete('/gallery/:id', (req,res) => {
  console.log(`DELETE id number ${req.params.id}`);
  Gallery.destroy({
    where:{
      id: req.params.id
    }})
  .then((data)=>{
    console.log('deleted a record');
  })
  .catch((err) =>{
    console.log(err);
  });
  }
);

function userAuthenticated(req, res, next){
  if (req.isAuthenticated()){
    console.log('user is good');
    next();
  }else{
    console.log('user not good');
    res.redirect('/login');
  }
}

module.exports = router;
