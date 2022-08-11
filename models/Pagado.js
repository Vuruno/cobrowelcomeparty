const mongoose = require('mongoose');

const PagadoSchema = new mongoose.Schema({
    CIP: Number,
    Nombre: String,
    Cohorte: String,
    Carrera: String,
    Entradas: Number,
    Fecha: { type: Date, default: new Date() },
    Cobrador: String
});

const Pagado = mongoose.model('Pagado', PagadoSchema);

module.exports = Pagado;