'use strict';

const express = require('express');

// Constants
const PORT = 8080;

// App
const app = express();

app.get('/patty', function (req, res) {
  var patty = {
      pattySays: "Hello There"
  };
  res.send(patty);
});

app.get('/wil', function(req, res) {
    var wil = {
        wilSays: "Do it"
    };
    res.send(wil);
});

app.listen(PORT);
console.log('Running on http://localhost:' + PORT);