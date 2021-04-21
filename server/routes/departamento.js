const express = require('express')
const _ = require('underscore');
const Departamento = require('../models/departamento'); //modelo
const app = express();

app.get('/departamento', function(req, res) {
    Departamento.find({ activo: true }).exec((err, departamentos) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                msg: 'Ocurrio un error al momento de consultar el departamento',
                err
            })
        }

        res.json({
            ok: true,
            msg: 'Lista de departamentos se obtuvo con exito',
            conteo: departamentos.length,
            departamentos
        })
    })
})

app.post('/departamento', function(req, res) {
    let body = req.body;
    let depa = new Departamento({
        id_jefe_de_area: body.id_jefe_de_area,
        nombre: body.nombre,
        numero_empleados: body.numero_empleados,
        extension_telefonica: body.extension_telefonica,


    })

    depa.save((err, depaDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                msg: 'ocurrio un error',
                err
            })
        }

        res.json({
            ok: true,
            msg: 'Se inserto el departamento correctamente',
            depaDB
        })
    })
})

app.put('/departamento/:id', function(req, res) {
    let id = req.params.id;
    let body = _.pick(req.body, ['nombre', 'numero_empleados', 'extension_telefonica']); //los campos que se pueden modificar

    Departamento.findByIdAndUpdate(id, body, { new: true, runValidators: true, context: 'query' },
        (err, depaDB) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    msg: 'Ocurrio un error al actualizar',
                    err
                })
            }

            res.json({
                ok: true,
                msg: 'El departamento se actualizo con exito',
                departamento: depaDB
            })
        })
})

app.delete('/departamento/:id', function(req, res) {
    //   let id = req.params.id;

    //   Usuario.deleteOne({_id: id}, (err, usuarioBorrado) => {
    //    
    //   })

    let id = req.params.id;

    Departamento.findByIdAndUpdate(id, { activo: false }, { new: true, runValidators: true, context: 'query' },
        (err, depaDB) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    msg: 'Error al momento de eliminar',
                    err
                })
            }

            res.json({
                ok: true,
                msg: 'Departamento eliminado con exito',
                depaDB
            })
        })
})

module.exports = app;