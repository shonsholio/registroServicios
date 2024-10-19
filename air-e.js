const fs = require('fs')

const datosRecibo = {

  apto: '501A',
  fecha_actual: '08/05/2024',
  lectura_actual: 38929,
  fecha_anterior: '08/04/2024',
  lectura_anterior: 38555,
  dias_facturados: 30,
  valor_factura: 505240

}

const nochesDirekto = 0
const nochesAirBnB = 21
const nochesRentadas = nochesDirekto + nochesAirBnB


let consumo = datosRecibo.lectura_actual - datosRecibo.lectura_anterior
let valorKw = Math.floor(datosRecibo.valor_factura / consumo)
let consumoDia = Math.floor(consumo / nochesRentadas)
let valorDia = Math.floor(datosRecibo.valor_factura / nochesRentadas)

let dataFactura = {
  apto: datosRecibo.apto,
  fecha_actual: datosRecibo.fecha_actual,
  lectura_actual: datosRecibo.lectura_actual,
  fecha_anterior: datosRecibo.fecha_anterior,
  lectura_anterior: datosRecibo.lectura_anterior,
  dias_facturados: datosRecibo.dias_facturados,
  valor_factura: datosRecibo.valor_factura,
  nochesRentadas: nochesRentadas,
  nochesDirekto: nochesDirekto,
  nochesAirBnB: nochesAirBnB,
  consumoTotal: consumo,
  kwDia: consumoDia,
  valorKw: valorKw,
  valorDia: valorDia
}

console.log('El valor del KW fue de $ ', valorKw)
console.log('El valor de servicio por dia fue de ', valorDia)
console.log(dataFactura)

const jsonString = JSON.stringify(dataFactura)

let nombre = dataFactura.apto
let apellido = dataFactura.fecha_actual.split('/')
console.log(apellido)


let nombreArchivo = nombre + apellido[1] + apellido[2]



fs.writeFile(`./${nombreArchivo}.txt`, jsonString, (err) => {
  if (err) {
    console.error('Error al escribir el archivo:', err);
    return;
  }
  console.log(`Archivo creado exitosamente en ./${nombreArchivo}.txt`);
});

