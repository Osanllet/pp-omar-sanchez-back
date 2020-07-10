'use strict'

const mongoose = require('mongoose');
const app = require('./app');
const config = require('./config/config');


mongoose.connect(config.URL_DB, { useNewUrlParser: true, useUnifiedTopology: true }, (err, res) => {
    if (err) {
        throw err;
    } else {
        console.log('Base de datos: \x1b[32m%s\x1b[0m', 'online')
        app.listen(config.PORT, () => {
            console.log(`Servidor escuchando por el puerto ${config.PORT}: \x1b[32m%s\x1b[0m `, 'online');
        });
    }
});