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
{
    timestamps: true,
    collection: 'shops',
    toJSON:{
        virtuals: true
    },
    toObject:{
        virtuals:true
    }
})

schema.virtual('manus',{
    ref: 'Menu',
    localField: '_id',
    foreignField: 'shop'
})
const Shop = mongoose.model("Shop", schema,"shops");
module.exports = Shop