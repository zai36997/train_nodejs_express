const mongoose = require('mongoose')
const schema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
        trim: true
    },
    age:{
        type: Number,
        required: true,
        trim: true,
        unique: true
    },
    creted:{
        type: Date,
        default: Date.now
    }
})
const Setting = mongoose.model("Setting", schema);
module.exports = Setting