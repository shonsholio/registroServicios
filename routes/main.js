const express = require('express')
const fs = require('fs')
const router = express.Router()
const aptos = require('../UserRepository.js')


router.get('/', (req,res) => {
  res.render('index', {
    aptos
  })
})

router.post('/nuevaFactura', (req,res) => {

  const factura = { ...req.body }

  let consumo = factura.lectura_actual - factura.lectura_anterior
  let valorKw = Math.floor(factura.valor_factura / consumo)
  let consumoDia = Math.floor(consumo / factura.nochesRentadas)
  let valorDia = Math.floor(factura.valor_factura / factura.nochesRentadas)

  let dataFactura = {
    apto: factura.apto,
    fecha_actual: factura.fecha_actual,
    lectura_actual: factura.lectura_actual,
    fecha_anterior: factura.fecha_anterior,
    lectura_anterior: factura.lectura_anterior,
    dias_facturados: factura.dias_facturados,
    valor_factura: factura.valor_factura,
    nochesRentadas: factura.nochesRentadas,
    consumoTotal: consumo,
    kwDia: consumoDia,
    valorKw: valorKw,
    valorDia: valorDia
  }

  const jsonString = JSON.stringify(dataFactura)

  let nombre = factura.apto

  let apellido = factura.fecha_actual.split('-')
  console.log(apellido)

  let nombreArchivo = nombre + '-' + apellido[1] + apellido[0]

  fs.writeFile(`./${nombreArchivo}.txt`, jsonString, (err) => {
    if (err) {
      console.error('Error al escribir el archivo:', err);
      return;
    }
    console.log(`Archivo creado exitosamente en ./${nombreArchivo}.txt`);
  });

  res.send(`Archivo creado exitosamente en ./${nombreArchivo}.txt`)
 
})

module.exports = router