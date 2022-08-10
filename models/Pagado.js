const mongoose = require('mongoose');

const PagadoSchema = new mongoose.Schema({
    CIP: Number,
    Nombre: String,
    Cohorte: String,
    Carrera: String,
    Entradas: Number,
    Cobrador: String
});

const Pagado = mongoose.model('Pagado', PagadoSchema);

module.exports = Pagado;