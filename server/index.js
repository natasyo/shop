require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const bodyParser = require('body-parser')
const cookieParser =require('cookie-parser')
const User=require('./models/User')
const bcrypt = require("bcryptjs")


const PORT = process.env.PORT || 5000
const app = new express()
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())
app.use(cookieParser())
app.use((req, resp, next) => {
    next() //Если не вызвать - запрос дальше не пойдет
  })
app.use(cors()).use(require('./routes/auth.routes'))
app.use(require('./routes/admin.routes'))
async function start() {
    try {
        const mongoClient = await mongoose.connect(process.env.MONGO_URI, {})
        app.listen(PORT, () => console.log(PORT))
        
    } catch (error) {
        process.exit(1)
    }
}
start()
async function getAdmin(){
    const admins=await User.find({role:'admin'}).exec()
    if(admins.length===0){
       const hashPassword=await bcrypt.hash(process.env.adminPass, +process.env.hasPassword)
        const admin=new User({
            email:process.env.adminEmail,
            password: hashPassword,
            role:'admin'
        })
        console.log(admin)
       console.log(await admin.save())        
    }    
}

getAdmin()