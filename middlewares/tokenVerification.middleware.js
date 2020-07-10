'use strict'

const jwt = require('jwt-simple');
const moment = require('moment');
const config = require('../config/config');

exports.ensureAuth = function(req, res, next) {

    if (!req.headers.authorization) {
        return res.status(401).send({ message: 'Acceso denegado, no tiene autorización para acceder.' });
    }

    var token = req.headers.authorization.replace(/['"]+/g, '');

    try {
        var payload = jwt.decode(token, config.SEED_TOKEN);

        if (payload.exp <= moment().unix()) {
            return res.status(401).send({ message: 'El token ha expirado.' });
        }
    } catch (ex) {
        return res.status(401).send({ message: 'Token Inválido' });
    }

    req.user = payload;
    next();
}