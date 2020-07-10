'use strict'

const express = require('express');
const loginControllers = require('../controllers/login.controller');
const userControllers = require('../controllers/user.controller');
const api = express.Router();

const md_auth = require('../middlewares/tokenVerification.middleware').ensureAuth;

api.post('/login', loginControllers.login);
api.post('/user', md_auth, userControllers.createUser);
api.get('/users', md_auth, userControllers.getUsers);
api.delete('/user/:id', md_auth, userControllers.deleteUser);
api.get('/searchMalesAndOverEighteen', md_auth, userControllers.searchMalesAndOverEighteen);

module.exports = api;