/* jshint esversion: 6 */

const express = require('express');
const bp = require('body-parser');
const methodOverride = require('method-override');

const PORT = process.env.PORT || 3000;
const db = require('./models');
const Gallery = db.Gallery;

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const app = express();
const exphbs = require('express-handlebars');

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




const server = app.listen(PORT, () =>{
  db.sequelize.sync();
  console.log(`server running on port ${PORT}`);
});