const express = require('express')
const _ = require('underscore');
const usuario = require('../models/usuario');
const Usuario = require('../models/usuario'); //modelo
const app = express();

app.get('/usuario', function(req, res) {
    Usuario.find({ activo: true }).exec((err, usuarios) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                msg: 'Ocurrio un error al momento de consultar',
                err
            })
        }

        res.json({
            ok: true,
            msg: 'Lista de usuarios obtenida con exito',
            conteo: usuarios.length,
            usuarios
        })
    })
})

app.post('/usuario', function(req, res) {
    let body = req.body;
    let usr = new Usuario({
        nombre: body.nombre,
        primer_apellido: body.primer_apellido,
        segundo_apellido: body.segundo_apellido,
        edad: body.edad,
        curp: body.curp,
        telefono: body.telefono,
        mail: body.mail
    })

    usr.save((err, usrDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                msg: 'ocurrio un error',
                err
            })
        }

        res.json({
            ok: true,
            msg: 'Se inserto el usuario correctamente',
            usrDB
        })
    })
})

app.put('/usuario/:id', function(req, res) {
    let id = req.params.id;
    let body = _.pick(req.body, ['nombre', 'primer_apellido', 'segundo_apellido', 'edad']); //los campos que se pueden modificar

    Usuario.findByIdAndUpdate(id, body, { new: true, runValidators: true, context: 'query' },
        (err, usrDB) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    msg: 'Ocurrio un error al actualizar',
                    err
                })
            }

            res.json({
                ok: true,
                msg: 'El usuario se actualizo con exito',
                usuario: usrDB
            })
        })
})

app.delete('/usuario/:id', function(req, res) {
    //   let id = req.params.id;

    //   Usuario.deleteOne({_id: id}, (err, usuarioBorrado) => {
    //    
    //   })

    let id = req.params.id;

    Usuario.findByIdAndUpdate(id, { activo: false }, { new: true, runValidators: true, context: 'query' },
        (err, usrDB) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    msg: 'Error al momento de eliminar',
                    err
                })
            }

            res.json({
                ok: true,
                msg: 'Usuario eliminado con exito',
                usrDB
            })
        })
})

module.exports = app;