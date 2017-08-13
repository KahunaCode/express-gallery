/* jshint esversion: 6 */

const express = require('express');
const router = express.Router();
const bp = require('body-parser');
const path = require('path');

const db = require('../models');
const Gallery = db.Gallery;

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const app = express();

router
.get('/login', (req,res) =>{
  res.sendFile(path.resolve('./public/login.html'));
})
.post('/login', passport.authenticate('local', {
  successRedirect: '/gallery/new',
  failureRedirect: '/login'
}))
.get('/gallery/:id/edit', userAuthenticated, (req,res) =>{
  console.log(`GET edit page for id ${req.params.id}`);
  Gallery.findById(parseInt(req.params.id))
  .then((photo) =>{
    console.log('querying for detail by ID');
    res.render('edit', {photo: photo});
  }).catch((err) =>{
    console.log(err);
  });
})
.put('/gallery/:id/edit', userAuthenticated, (req,res) =>{
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
    console.log('inserted a new record');
    res.end();
  })
  .catch((err) => {
    console.log(err);
  });
})
.delete('/gallery/:id', userAuthenticated, (req,res) => {
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
