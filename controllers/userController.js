const User = require('../models/user')
const {validationResult} = require('express-validator')
const jwt = require('jsonwebtoken')
const config = require('../config/index')
exports.register = async (req,res,next) =>{
    try {
    const {name,email,password,rold} = req.body


const errorValidation = validationResult(req)
if (!errorValidation.isEmpty()) {
    const error =new Error('Please input requierd information')
   error.statusCode = 422
   error.validation = errorValidation.array();
   throw error
}


    const exitemail = await User.findOne({email:email})
    if(exitemail){
        const error = new Error('This email is not avaliable.')
        error.statusCode = 403
        throw error
    }
    let user = new User
    user.name = name
    user.email = email
    user.password = await user.encryptPassword(password)
    user.rold = rold
    await user.save()
    console.log(req.body)

    //const user = await User.find()
    res.status(201).json({
        data: user
    })
    } catch (error) {
        next(error)
    }
    
}

exports.login = async (req,res,next) =>{
try {
    const {email,password} =req.body
    const user = await User.findOne({
        email: email
    })
    //เช็ก user ว่าซ้ำมั้ย
    if (!user) {
        const error = new Error('Email not found')
        error.statusCode = 401
        throw error
    }
    //เช็ก email และ password
    const validPassword = await user.validPassword(password)
    if(!validPassword){
        const error = new Error('Password or Email incorrect')
            error.statusCode = 401
            throw error
    }
    //  สร้าง token
    const token = jwt.sign({
        id: user._id,
        rold: user.rold,  
    },config.JWT_SECRET,{expiresIn : '5 days'})
    
    const expires_in = jwt.decode(token)

    return res.json({
        access_token: token,
        expires_in: expires_in,
        token_type: 'Bearer',
        message: 'logined'
    })
    
} catch (error) {
    next(error)
    
}
}

exports.me = async (req,res,next) => {
    return res.json({
        user:{
            id : req.user.id,
            name: req.user.name,
            email: req.user.email,
            rold: req.user.rold
        }
    })
    }
   