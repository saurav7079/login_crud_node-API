const mongoose = require("mongoose")
const schema = mongoose.Schema
const bcrypt = require("bcryptjs")

const userSchema = new schema({
    fullname: {
        type: String,
        require: true,
        trim: true
    }, 
    email:{
        type: String,
        require: true,
        trim: true,
        index: true,
        unique: true
    },
    password: {
        type: String,
        require: true,
        trim: true
    }
}, {timestamps: true})

userSchema.pre('save', async function(next){
    this.password = await bcrypt.hash(this.password.toString(), 12)
    next()
})

const UserSchema = mongoose.model('user', userSchema)

module.exports = UserSchema
