const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const schema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
        trim: true
    },
    email:{
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    password:{
        type: String,
        required: true,
        trim: true
    }
})

schema.methods.encryptPassword = async function(password){
    const salt = await bcrypt.genSalt(5)
    const hash = await bcrypt.hash(password,salt)
    return hash
}

const User = mongoose.model("User", schema);
module.exports = User 