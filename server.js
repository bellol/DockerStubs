'use strict';

const express   = require('express');
const mocks     = require('./Mockerfile');
const path      = require('path');
const chalk     = require('chalk');
const app       = express();
const PORT      = 8080;

// Helpers
const quote = (text) => "\"" + text + "\"";

registerMockerfileStubs();
registerGUI();
app.listen(PORT);
console.log('\nDONE:\t\tListening on port ' + PORT + "\n");

function registerMockerfileStubs(){
    // Register Calls from Mockerfile
    for (let mock of mocks.cases) {
        switch (mock.request.type) {
            case "GET":
                printRegisterSuccess(mock.request.type, mock.request.path);
                app.get(mock.request.path, (req, res) => res.send(mock.response.body));
                break;

            case "POST":
                printRegisterSuccess(mock.request.type, mock.request.path);
                app.post(mock.request.path, (req, res) => res.send(mock.response.body));
                break;

            default:
                printRegisterFail(mock.request.type, mock.request.path);
                break;
        }
    }
}

function registerGUI() {
    const indexPath = path.join(__dirname, 'index.html');
    const publicPath = express.static(path.join(__dirname, 'dist'));

    app.use('/dist', publicPath);
    app.get("/", (_, res) => {
        res.sendFile(indexPath);
    });
}

function printRegisterSuccess (type, path) {
    console.log(chalk.green("SUCCESS:\tRegistered call of type " 
        + quote(type) + " and path " + quote(path)));
}

function printRegisterFail (type, path) {
    console.error(chalk.red("ERROR:\t\tCould not register call of type " 
        + quote(type) + " and path " + quote(path)));
}