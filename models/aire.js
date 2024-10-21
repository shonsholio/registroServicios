const mongoose = require('mongoose')

const UserScheme = new mongoose.Schema({
  apto: String,
  fecha_actual: String,
  lectura_actual: Number,
  fecha_anterior: String,
  lectura_anterior: Number,
  dias_facturados: Number,
  valor_factura: Number,
  nochesRentadas: Number,
  consumoTotal: Number,
  kwDia: Number,
  valorKw: Number,
  valorDia: Number

})

const factura = mongoose.model('factura', UserScheme)

module.exports = factura


