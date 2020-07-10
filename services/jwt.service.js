'use strict'

const jwt = require('jwt-simple');
const moment = require('moment');
const config = require('../config/config');

exports.createToken = function(user) {
    let currentUser = {
        name: user.name,
        email: user.email,
        creation_date: user.creation_date
    }
    const payload = {
        sub: currentUser,
        iat: moment().unix(),
        exp: moment().add(12, 'hours').unix()
    }

    return jwt.encode(payload, config.SEED_TOKEN);
};