/* jshint esversion: 6 */

const mongoClient = require('mongodb').MongoClient();
const mongoURL = 'mongodb://localhost:27017/galleryMeta';

mongoClient.connect(mongoURL, function(err, mdb){
  console.log('mongoDB is', mdb);
  mdb.collection('photoMetas').insertOne({name:'1greatsublimename'});
  photoMetas = mdb.collection('photoMetas');
});

module.exports = {
  photoMetas: () => photoMetas
};
