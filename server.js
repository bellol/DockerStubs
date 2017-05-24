'use strict';

const express   = require('express');
const mocks     = require('./Mockerfile');
const chalk     = require('chalk');
const app       = express();
const PORT      = 8080;

// Helpers
const quote = (text) => "\"" + text + "\"";

// Register Calls
for (let mock of mocks.cases) {
    switch (mock.request.type) {
        case "GET":
            console.log(chalk.green("SUCCESS:\tRegistered call of type " 
                + quote(mock.request.type) + " and path " + quote(mock.request.path)));
            app.get(mock.request.path, (req, res) => res.send(mock.response.body));
            break;

        case "POST":
            console.log(chalk.green("SUCCESS:\tRegistered call of type " 
                + quote(mock.request.type) + " and path " + quote(mock.request.path)));
            app.post(mock.request.path, (req, res) => res.send(mock.response.body));
            break;

        default:
            console.error(chalk.red("ERROR:\t\tCould not register call of type " 
                + quote(mock.request.type) + " and path " + quote(mock.request.path)));
            break;
    }
}


// Go
app.listen(PORT);
console.log('\nDONE:\t\tListening on port ' + PORT + "\n");
