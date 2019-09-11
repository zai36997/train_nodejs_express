const Shop = require('../models/shop')
const config = require('../config/index')
const Menu = require('../models/menu')
exports.index = async (req,res,next) =>{
    const shop = await Shop.find().select('name photo location').sort({_id:-1})
    const shapWithPhotoDomain = await shop.map((shop, index) => {
return {
    id: shop._id,
    name: shop.name,
    photo: config.DOMAIN + /images/+ shop.photo,
    location: shop.location
}
    })

    return res.status(200).json({
        data: shapWithPhotoDomain
    })

}
 exports.menu = async(req,res,next) => {

// res.send("ok")
// const menu = await Menu.find()
// const menu = await Menu.find().select('+name -price')
// const menu = await Menu.find().where('price').gte(50) // มากกว่าเท่ากับ 50
// const menu = await Menu.find().where('price').lte(50) // น้อยกว่าเท่ากับ 50

// const menu = await Menu.find({
//     price: {
//         $gte: 60
//     }
// })

const menu = await Menu.find().populate('shop','name location').sort({price: -1}) //การjoin -1จากมากไปน้อยDESC 1 น้อยไปมากASC

return res.status(200).json({
    data: menu
})
 }

 exports.getShopWithMenu = async (req,res,next) => {

    const shopWithMenu = await Shop.findOne({ _id: req.params.id }).populate('manus')
    return res.status(200).json({
        data: shopWithMenu
    })
 }

 exports.store = async (req,res,next) => {

    try {
        let shop = new Shop(req.body)
        await shop.save()

        return res.status(200).json({
            mgs: "sucessfully!!"
        })
    } catch (error) {
        next(error)
    }
 }

