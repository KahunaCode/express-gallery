/* jshint esversion: 6 */

const express = require('express');
const router = express.Router();

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
});



module.exports = router;
