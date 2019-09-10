const User = require('../models/user')

exports.register = async (req,res,next) =>{
    try {
    const {name,email,password} = req.body
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