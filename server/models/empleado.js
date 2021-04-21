const mongoose = require('mongoose');

let Schema = mongoose.Schema;

let empleadoSchema = new Schema({
    id_usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario'
    },
    id_departamento: {
        type: Schema.Types.ObjectId,
        ref: 'Departamento'
    },
    nombre_del_puesto: {
        type: String,
        required: [true, 'Es obligatorio el nombre del puesto']
    },
    anios_servicio: {
        type: Number,
        required: [true, 'Es obligatorio los años de servicio']
    },
    hora_entrada: {
        type: Number,
        required: [true, 'Es obligatorio la hora de entrada']
    },
    hora_salida: {
        type: Number,
        required: [true, 'Es obligatorio la hora de salida']
    },
    activo: {
        type: Boolean,
        default: true
    }
})

module.exports = mongoose.model('Empleado', empleadoSchema);