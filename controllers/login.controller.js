const User = require('../models/user.model');
const bcrypt = require('bcrypt');
const jwt = require('../services/jwt.service');

const login = (req, res) => {
    let { email, password } = req.body;
    let message = 'Usuario y/o contraseña incorrectos.';

    User.findOne({ email }, (err, user) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        if (!user) {
            return res.status(400).json({
                ok: false,
                err: { message }
            });
        }

        if (!bcrypt.compareSync(password, user.password)) {
            return res.status(400).json({
                ok: false,
                err: { message }
            });
        }

        let token = jwt.createToken(user);

        res.json({
            ok: true,
            user,
            token
        });
    });

}

module.exports = {
    login
};