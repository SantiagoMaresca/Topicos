const DB = require('./models/DB');
var express = require('express');
var app = express();

DB();
app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
  });