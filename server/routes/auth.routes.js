const {Router}=require('express')
const jwt=require('jsonwebtoken')
const User=require('../models/User')
const {check, validationResult}=require('express-validator')
const bcrypt=require('bcryptjs');
const { replicationStart } = require('pg-protocol/dist/messages');
const router=new Router();
require ('dotenv').config()

router.post(
    '/register',
    [
        check('email','Некорректный email').isEmail(),
        check('password','Минимальная длина 6 символов').isLength({min:6})
    ],
 async(req, resp)=>{
    try {
        const errors=validationResult(req)
        if(!errors.isEmpty()){
            resp.status(500)
            .json({
                errors:errors.array(),
                message:"Некорректные данные при регистрации"
            })
        }
        const {email, password}=req.body
        const candidate=User.findOne(email)
        if(candidate){
          return  resp.status(400).json('Пользователь существует')            
        }
    } catch (error) {
        resp.status(500).json({message:"Error..."})        
    }
    const hashPassword=await bcrypt.hash(password)
    const user=new User({email, password:hashPasswords})
    user.save()
})

router.post(
    '/login',
    [
        check('email','Некорректный email').normalizeEmail().isEmail(),
        check('password','Некорректный пароль').exists(),
    ],
    async (req, resp)=>{
    try {
        const[email, password]=req.body
        const errors=validationResult(req)
        if(!errors.isEmpty()){
            return resp.status(500).json({
                errors:errors.array(),
                message:"Некорректные данные"
            })
        }
        const user=await User.findOne(email)
        if(!user){
            return resp.status(500).json({message:"Некорректный email"})
        }
       const isMatch=await bcrypt.compare(password, user.password)
       if(!isMatch){
           return resp.status(500).json({message:"Некорректный пароль"})
       }
       const token=jwt.sign(
           {userId:user.is},
           process.env.jwtSecret,
           {expiresIn:'1h'}
       )
       resp.json({token, userId:user.id})

    } catch (error) {
        resp.status(500).json({message:"Error..."})
    }
})
module.exports=router