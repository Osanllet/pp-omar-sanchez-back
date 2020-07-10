'use strict'

const User = require('../models/user.model');
const bcrypt = require('bcrypt');
const moment = require('moment');

const createUser = (req, res) => {
    let params = req.body;
    let user = new User(params);

    const salt = bcrypt.genSaltSync(10);
    user.password = bcrypt.hashSync(params.password, salt);
    user.creation_date = moment().toISOString();

    user.save((err, userStored) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                message: 'Error al crear el usuario.',
                err
            });
        }
        return res.status(201).json({ ok: true, data: userStored });
    })

};

const getUsers = (req, res) => {
    const searchedTerms = !req.query.searchedTerms ? null : req.query.searchedTerms;
    let query = {};

    if (searchedTerms) {
        let regex = new RegExp(searchedTerms.replace(' ', '|'), 'i');
        query = {
            $or: [
                { name: regex },
                { hobby: regex }
            ]
        }
    }

    User.find(query, (err, users) => {
        if (err) {
            return res.status(500).json({ ok: false, message: "Error cargando usuarios." }, err);
        }
        if (!users) {
            return res.status(400).json({ ok: false, message: "No existen usuarios registrados." })
        } else {
            return res.status(200).json({ ok: true, users });
        }

    });
};

const deleteUser = (req, res) => {
    const id = req.params.id;

    User.findByIdAndDelete(id, (err, delatedUser) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                message: 'Error eliminando usuario.',
                err
            });
        }

        if (!delatedUser) {
            return res.status(400).json({
                ok: false,
                message: 'Usuario no encontrado.'
            })
        }

        return res.json({
            ok: true,
            usuario: delatedUser
        });
    });
};

const searchMalesAndOverEighteen = (req, res) => {
    const searchedDate = moment().subtract(3, "days").toISOString();
    const query = [{
        $match: {
            $and: [
                { "age": { "$gt": 18 } },
                { "gender": "M" },
                { "creation_date": { "$gte": new Date(searchedDate) } }

            ]
        }
    }, {
        $group: {
            _id: "$hobby",
            users: {
                $push: {
                    name: "$name",
                    phone_number: "$phone_number",
                    hobby: "$hobby"
                }
            }
        }

    }];

    User.aggregate(query, (err, users) => {
        if (err) {
            res.status(500).send({
                ok: false,
                message: 'Error en la petición'
            });
        } else {
            if (!users) {
                res.status(404).send({
                    ok: false,
                    message: 'No hay usuarios registrados que cumplan aniversario este mes'
                });
            } else {
                res.status(200).send({
                    ok: true,
                    data: users
                });
            }
        }
    });

}

module.exports = {
    createUser,
    getUsers,
    deleteUser,
    searchMalesAndOverEighteen
};


// {
//     $and: [
//         { "age": { "$gt": 18 } },
//         { "gender": "M" },
//         { "creation_date": { "$gte": { "$date": "2020-07-07T01:42:14.303Z" } } }
//     ]
// }