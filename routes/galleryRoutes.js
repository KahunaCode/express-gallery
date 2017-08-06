/* jshint esversion: 6 */

const express = require('express');
const router = express.Router();
const bp = require('body-parser');

const db = require('../models');
const Gallery = db.Gallery;

router
.get('/gallery/:id/edit', (req,res) =>{
  console.log(`GET edit page for id ${req.params.id}`);

  //bring up an edit page for the ID queried and update the field forms

  res.end();
})
.get('/gallery/new', (req,res) =>{
  console.log('GET gallery/new');

  //insert stuff here to generate the form for a new pic and then submit it

  res.end();
})
.get('/gallery/:id', (req,res) =>{
  Gallery.findById(parseInt(req.params.id))
    .then((pic) =>{
      console.log(pic);
      res.end();
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
    res.end();
  })
  .catch((err) =>{
    console.log(err);
  });
})
.post('/gallery', (req,res) =>{
  Gallery.create({
    author: req.body.author,
    link: req.body.link,
    description: req.body.description
  })
  .then((data) =>{
    console.log(data);
    console.log('inserted a new record');
    res.end();
  })
  .catch((err) => {
    console.log(err);
  });
})
.put('/gallery/:id', (req,res) =>{
  console.log(`PUT request for ${req.params.id}`);
});

module.exports = router;
