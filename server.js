'use strict';

const express    = require('express');
const mocks      = require('./Mockerfile');
const path       = require('path');
const chalk      = require('chalk');
const _          = require('lodash');
const PORT       = 8080;
const bodyParser = require('body-parser');
const quote = (text) => "\"" + text + "\"";

module.exports = {
  app: function() {
    const app = express();
    
    // Static Assets
    const indexPath = path.join(__dirname, 'index.html');
    const publicPath = express.static(path.join(__dirname, 'dist'));
    app.use('/dist', publicPath);

    app.get("/", (_, res) => {
      res.sendFile(indexPath);
    });

    app.post("/mockerAdd", (request, response) => {
      switch(request.body.method) {
        case "POST":
          app.post(request.body.endpoint, (req, res) => {
            if(_.isEqual(request.body.body, req.body)) res.send(request.body.response);
            else res.send("Bad Request");
          });
          break;
        case "GET":
          app.get(request.body.endpoint, (req, res) => res.send(request.body.body));
          break;
        default:
          response.send({
            
          });
      }
      response.send("Added " + request.body.method + " Endpoint");
    });
    return app;
  }
}