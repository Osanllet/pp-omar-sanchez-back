'use strict'

const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const moment = require('moment');

const Schema = mongoose.Schema;

const UserSchema = Schema({
    name: { type: String, required: [true, 'El nombre es requerido.'] },
    email: { type: String, unique: true, required: [true, 'El correo electrónico es requerido.'] },
    phone_number: { type: String, require: [true, 'El número telefónico es requerido.'] },
    password: { type: String, required: [true, 'La contraseña es necesaria.'] },
    age: { type: Number, require: [true, 'La edad es requerido.'] },
    gender: { type: String, enum: ['F', 'M'], required: [true, 'El género es requerido.'] },
    hobby: { type: String, require: [true, 'El pasatiempo es requerido.'] },
    creation_date: { type: Date }
});

// UserSchema.path('email').validate(
//     function(email) {
//         var emailRegex = /^[a-z0-9._%+-]+@[a-z0-9-]+.+.[a-z]{2,4}$/;
//         return emailRegex.test(email.text);
//     }, 'El email no cumple con el formato correcto.');

// UserSchema.path('phone_number').validate(
//     function(phone_number) {
//         const phoneRegex = /^[0-9]{10}$/;
//         return phoneRegex.test(phone_number.text);
//     }, 'El número telefónico no cumple con el formato correcto');

UserSchema.methods.toJSON = function() {
    let user = this;
    let userObject = user.toObject();
    delete userObject.password;
    return userObject;
}

UserSchema.plugin(uniqueValidator, { message: 'Este correo ya ha sido registrado previamente.' });

module.exports = mongoose.model('User', UserSchema);