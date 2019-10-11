const DB = require('./models/DB');
var express = require('express');
var bodyParser = require('body-parser')
var app = express();

DB();
app.use(bodyParser())
app.get('/', function (req, res) {
  res.send('Hello World!');
});

require('./routes/routes.js')(app);

app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
  });