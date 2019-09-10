const mongoose = require('mongoose')
const schema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    photo:{
        type: String
        
    },
    location:{
       lat:{
        type: Number
       },
       lgn:{
        type: Number
       }
    }
},
{timestamps: true})
const Shop = mongoose.model("Shop", schema);
module.exports = Shop