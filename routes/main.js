const express = require('express')
const router = express.Router()
const fs = require('fs')
const mongoose = require('mongoose')
const factura = require('../models/aire.js')
const aptos = require('../UserRepository.js')

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
  const facturas = await factura.find({})
  res.render('air-eRecibos', {
    facturas
  })
})

router.post('/nuevaFactura', async(req,res) => {

  const bill = { ...req.body }
  
  try {
    factura.create({ 
      apto: bill.apto,
      fecha_actual: bill.fecha_actual,
      lectura_actual: bill.lectura_actual,
      fecha_anterior: bill.fecha_anterior,
      dias_facturados: bill.dias_facturados,
      valor_factura: bill.valor_factura
    })
  } catch {}

  res.redirect('/logIn')

})

router.get('/logIn/reservas', (req,res) => {
  res.render('reservas')
})

router.post('/nuevaReserva', (req, res) => {

})

module.exports = router