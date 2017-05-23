'use strict';
const express = require('express');
const mocks = require('./Mockerfile');
const app = express();
const PORT = 8080;

for (let mock of mocks.cases) {
    app.get(mock.request.path, (req, res) => {
        res.send(mock.response.body);
    });
}

app.listen(PORT);
console.log('Running on http://localhost:' + PORT);