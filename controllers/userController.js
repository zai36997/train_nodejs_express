const User = require('../models/user')
const {validationResult} = require('express-validator')
exports.register = async (req,res,next) =>{
    try {
    const {name,email,password} = req.body


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
    if (!user) {
        const error = new Error('Email not found')
        error.statusCode = 401
        throw error
    }

    const validPassword = await user.validPassword(password)
if(!validPassword){
    const error = new Error('Password or Email incorrect')
        error.statusCode = 401
        throw error
}
res.json({
    message: "ok"
})
    
} catch (error) {
    next(error)
    
}
}