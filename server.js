'use strict';

const express = require('express');

// Constants
const PORT = 8080;

// App
const app = express();

const accounts = {
    user: "Wilhelm",
    accounts: [
        {
            type: "Smart Access",
            balance: "-52135.87"
        },
        {
            type: "Savings Maximiser",
            balance: "0.42"
        }
    ]
}

const users = {
    users: ["Wilhelm", "Patrick", "Jim"]
}

app.get('/getAccounts', (req, res) => {res.send(accounts)});
app.get('/getUsers', (req, res) => {res.send(users)});

app.listen(PORT);
console.log('Running on http://localhost:' + PORT);