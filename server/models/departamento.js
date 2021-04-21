const { ObjectId } = require('bson');
const mongoose = require('mongoose');
const { object } = require('underscore');

let Schema = mongoose.Schema;

let departamentoSchema = new Schema({
    id_jefe_de_area: {
        type: String,
        required: [true, 'Es obligatorio insertar el id jefe ']
    },
    nombre: {
        type: String,
        required: [true, 'Es obligatorio insertar el nombre']
    },
    numero_empleados: {
        type: Number,
        required: [true, 'Es obligatorio insertar elnumero de empleados']
    },
    extension_telefonica: {
        type: Number,
        required: [true, 'Es obligatorio insertar la ectension telefonica']
    },
    activo: {
        type: Boolean,
        default: true
    }
})

module.exports = mongoose.model('Departamento', departamentoSchema);