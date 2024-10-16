const mongoose = require("mongoose")
const schema = mongoose.Schema

const productSchema = new schema({
    title:{
        type: String,
        require: true,
        trim: true
    },
    description:{
        type: String,
        require: true,
        trim: true
    },
    price:{
        type: Number,
        require: true,
        trim: true
    },
    discount:{
        type: Number,
        require: true,
        trim: true,
        default: 0
    }
}, {timestamps: true})

const ProductSchema = mongoose.model('product', productSchema)

module.exports = ProductSchema