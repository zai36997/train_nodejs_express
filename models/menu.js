const mongoose = require('mongoose')
const Schema = mongoose.Schema

const schema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
        trim: true
    },
    price:{
        type: Schema.Types.Decimal128
    },
    shop:{
        type:Schema.Types.ObjectId,
        ref: 'Shop',
    }
})

const Menu = mongoose.model("Menu", schema,"manus");
module.exports = Menu 