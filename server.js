/* jshint esversion: 6 */

const express = require('express');
const bp = require('body-parser');
const PORT = process.env.PORT || 3000;
const db = require('./models');
const Gallery = db.Gallery;

const app = express();
app.use(bp.urlencoded());

const galleryRoutes = require('./routes/galleryRoutes.js');

app.use('/', galleryRoutes);

const server = app.listen(PORT, () =>{
  db.sequelize.sync();
  console.log(`server running on port ${PORT}`);
});