/* jshint esversion: 6 */

const express = require('express');
const router = express.Router();
const bp = require('body-parser');

const db = require('../models');
const Gallery = db.Gallery;

router
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
.post('/', (req,res) =>{
  Gallery.create({
    author: req.body.author,
    link: req.body.link,
    description: req.body.description
  })
  .then((data) =>{
    console.log(data);
    console.log('inserted a new record');
  })
  .catch((err) => {
    console.log(err);
  });
});

module.exports = router;
