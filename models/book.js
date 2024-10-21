const mongoose = require('mongoose')

const UserScheme = new mongoose.Schema({
  apto: String,  
  huesped: String,
  checkIn: String,
  checkOut: String,
  pax: Number,
  valorReserva: Number,
  channel: String
})

const book = mongoose.model('book', UserScheme)

module.exports = book


