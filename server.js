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


// app.listen(PORT);
// console.log('\nDONE:\t\tListening on port ' + PORT + "\n");


// function registerMockerfileStubs(){
//     for (let mock of mocks.cases) {
//         switch (mock.request.type) {
//             case "GET":
//                 printRegisterSuccess(mock.request.type, mock.request.path);
//                 app.get(mock.request.path, (req, res) => res.send(mock.response.body));
//                 break;
//             case "POST":
//                 printRegisterSuccess(mock.request.type, mock.request.path);
//                 app.post(mock.request.path, (req, res) => res.send(mock.response.body));
//                 break;
//             default:
//                 printRegisterFail(mock.request.type, mock.request.path);
//                 break;
//         }
//     }
// }

// function printRegisterSuccess (type, path) {
//     console.log(chalk.green("SUCCESS:\tRegistered call of type " 
//         + quote(type) + " and path " + quote(path)));
// }

// function printRegisterFail (type, path) {
//     console.error(chalk.red("ERROR:\t\tCould not register call of type " 
//         + quote(type) + " and path " + quote(path)));
// }