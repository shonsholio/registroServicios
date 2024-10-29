const express = require('express')
const router = express.Router()
const fs = require('fs')
const mongoose = require('mongoose')
const factura = require('../models/aire.js')
const book = require('../models/book.js')
const aptos = require('../UserRepository.js')
const meses = require('../src/meses.json')

router.get('/', (req,res) => {
  res.render('index')
})

router.get('/logIn', (req,res) => {
  res.render('login')
})

router.get('/logIn/air-e', (req,res) => {
  res.render('air-e', {
    aptos
  })
})

router.get('/logIn/recibosAire', async(req,res) => {
  const facturas = await factura.find({}).sort({ lectura_actual: -1 })
  res.render('air-eRecibos', {
    facturas
  })
})

router.post('/nuevaFactura', async(req,res) => {

  const bill = { ...req.body }
  
  try {
    factura.create({ 
      apto: bill.apto,
      operador: bill.operador,
      fecha_actual: bill.fecha_actual,
      lectura_actual: bill.lectura_actual,
      fecha_anterior: bill.fecha_anterior,
      lectura_anterior: bill.lectura_anterior,
      dias_facturados: bill.dias_facturados,
      valor_factura: bill.valor_factura
    })
  } catch {}

  res.redirect('/logIn/recibosAire')

})

router.get('/logIn/nuevaReserva', (req,res) => {
  res.render('reservas', {
    aptos
  })
})

router.post('/logIn/nuevaReserva', async(req, res) => {
  const reserva = { ...req.body }

  try {
    book.create({
      apto: reserva.apto,
      huesped: reserva.huesped,
      checkIn: reserva.checkIn,
      checkOut: reserva.checkOut,
      pax: reserva.pax,
      valorReserva: reserva.valorReserva,
      channel: reserva.channel
    }) 
  } catch{}

  res.redirect('/logIn')
})

router.get('/logIn/reservas', async(req,res) => {
  const reservas = await book.find({}).sort({ checkIn: -1 })
  res.render('reservasTodas', {
    reservas
  })})

router.get('/logIn/reservasTodas', async(req,res) => {
  const reservas = await book.find({}).sort({ checkIn: -1 })
  res.render('reservasTodas', {
    reservas
  })
})

router.get('/logIn/calcula', (req,res) => {
  res.render('calculadora')  
})

router.get('/logIn/dataReservas', async(req,res) => {
  const reservas = await book.find({}).sort({ checkIn: -1 })
  res.render('reservasData', {
    reservas,
    meses
  })})

module.exports = router