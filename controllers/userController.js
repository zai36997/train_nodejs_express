const User = require('../models/user')
exports.register = async (req,res,next) =>{
    //const {name} = req.body
    const user = await User.find()
    res.json({
        data: user
    })
    
}