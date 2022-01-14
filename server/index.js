require('dotenv').config()
const express= require ('express')
const mongoose=require('mongoose')


const PORT=process.env.PORT||5000


const app=new express()
app.use('/api/auth',require('./routes/auth.routes'))
async function start(){
    try {
        await mongoose.connect(process.env.MONGO_URI,{})
        app.listen(PORT,()=>console.log(PORT))
        console.log('ok')

    } catch (error) {
        console.log('---------',error)
        process.exit(1)
    }
}
start()
