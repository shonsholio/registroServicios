const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const router = require('./routes/main.js')
const path = require('path')
const exp = require('constants')
const cors = require('cors')

const app = express()
dotenv.config({ path: './config.env' })

mongoose.connect(process.env.MONGODB_URI)
  .then(connection => {
    console.log('Enchufaos a Mongo papa')
  })
  .catch('Error conectando a mongo')

app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(cors())


app.set('port', process.env.PORT || 3000)
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, './views'))

app.use('/', router)

app.listen(app.get('port'), () => {
  console.log('Conectados')
})