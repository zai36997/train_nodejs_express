
const Setting = require('../models/setting')
exports.index = async (req,res,next) => {
     //const {name,age} = req.body
     const setting = await Setting.find()
     
    
    // let setting = new User
    // setting.name = name
    // setting.age = age
   
    // await setting.save()
    // console.log(req.body)

    res.status(200).json({
        data: setting
    })
}