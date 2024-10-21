const express = require('express')
const mongoose = require('mongoose')
const router = require('./routes/main.js')
const path = require('path')
const exp = require('constants')
const cors = require('cors')

const app = express()
process.loadEnvFile()

mongoose.connect(process.env.MONGODB_URI)
  .then(connection => {
    console.log('Enchufaos a Mongo papa')
  })
  .catch('Error conectando a mongo')

app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(cors())
app.use('/', router)

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, './views'))

app.set('port', process.env.port || 3000)

app.listen(app.get('port'), () => {
  console.log('Conectados')
})