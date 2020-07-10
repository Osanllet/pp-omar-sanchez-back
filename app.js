'use strict'

var express = require('express');
var bodyParser = require('body-parser');

var app = express();

// Routes
let user_routes = require('./routes/user.routes');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Allow Cross Domain
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*') //Permite el acceso a la api 
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});

app.use('/api', user_routes);

module.exports = app;