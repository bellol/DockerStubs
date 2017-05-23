'use strict';
const express = require('express');
const mocks = require('./Mockerfile');
const app = express();
const PORT = 8080;

// Helpers
const quote = (text) => "\"" + text + "\"";

// Register Calls
for (let mock of mocks.cases) {
    switch (mock.request.type) {
        case "GET":
            console.log("SUCCESS:\tRegistered call of type " 
                + quote(mock.request.type) + " and path " + quote(mock.request.path));
            app.get(mock.request.path, (req, res) => res.send(mock.response.body));
            break;

        case "POST":
            console.log("SUCCESS:\tRegistered call of type " 
                + quote(mock.request.type) + " and path " + quote(mock.request.path));
            app.post(mock.request.path, (req, res) => res.send(mock.response.body));
            break;

        default:
            console.log("ERROR:\t\tCould not register call of type " 
                + quote(mock.request.type) + " and path " + quote(mock.request.path));
            break;
    }
}


// Go
app.listen(PORT);
console.log('DONE:\t\tListening on port ' + PORT);
