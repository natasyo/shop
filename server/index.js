require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const bodyParser = require('body-parser')


const PORT = process.env.PORT || 5000
const app = new express()
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())
app.use((req, resp, next) => {
    console.log(req.body)
    next() //Если не вызвать - запрос дальше не пойдет
  })
app.use(cors()).use(require('./routes/auth.routes'))

async function start() {
    try {
        const mongoClient = await mongoose.connect(process.env.MONGO_URI, {})
        app.listen(PORT, () => console.log(PORT))
    } catch (error) {
        process.exit(1)
    }
}
start()
