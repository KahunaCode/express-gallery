/* jshint esversion: 6 */

const express = require('express');
const bp = require('body-parser');
const PORT = process.env.PORT || 3000;

const app = express();






const server = app.listen(PORT, () =>{
  console.log(`server running on port ${PORT}`);
});