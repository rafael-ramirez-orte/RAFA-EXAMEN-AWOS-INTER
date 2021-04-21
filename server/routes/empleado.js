const express = require('express')
const _ = require('underscore');
const empleado = require('../models/empleado');
const Empleado = require('../models/empleado'); //modelo
const app = express();

app.get('/empleado', function(req, res) {
    Empleado.find({ activo: true }).exec((err, empleados) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                msg: 'Ocurrio un error al momento de consultar',
                err
            })
        }

        res.json({
            ok: true,
            msg: 'Lista de empleados obtenida con exito',
            conteo: empleados.length,
            empleados
        })
    })
})

app.post('/empleado', function(req, res) {
    let body = req.body;
    let emp = new Empleado({
        id_usuario: body.id_usuario,
        id_departamento: body.id_departamento,
        nombre_del_puesto: body.nombre_del_puesto,
        anios_servicio: body.anios_servicio,
        hora_entrada: body.hora_entrada,
        hora_salida: body.hora_salida
    })

    emp.save((err, empDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                msg: 'ocurrio un error',
                err
            })
        }

        res.json({
            ok: true,
            msg: 'Se inserto el empleado correctamente',
            empDB
        })
    })
})

app.put('/empleado/:id', function(req, res) {
    let id = req.params.id;
    let body = _.pick(req.body, ['nombre_del_puesto', 'anios_servicio', 'hora_entrada', 'hora_salida']); //los campos que se pueden modificar

    Empleado.findByIdAndUpdate(id, body, { new: true, runValidators: true, context: 'query' },
        (err, empDB) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    msg: 'Ocurrio un error al actualizar',
                    err
                })
            }

            res.json({
                ok: true,
                msg: 'El empleado se actualizo con exito',
                empleado: empDB
            })
        })
})

app.delete('/empleado/:id', function(req, res) {
    //   let id = req.params.id;

    //   Usuario.deleteOne({_id: id}, (err, usuarioBorrado) => {
    //    
    //   })

    let id = req.params.id;

    Empleado.findByIdAndUpdate(id, { activo: false }, { new: true, runValidators: true, context: 'query' },
        (err, empDB) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    msg: 'Error al momento de eliminar',
                    err
                })
            }

            res.json({
                ok: true,
                msg: 'Empleado eliminado con exito',
                empDB
            })
        })
})

module.exports = app;