const ProductSchema = require("../model/product.model")
const createProduct = async (req, res)=>{
    try{
        const product = new ProductSchema(req.body)
        await product.save()
        res.json(product)
    }
    catch(err){
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
}

const fetchProduct = async (req, res)=>{
    try{
        const product = await ProductSchema.find()
        if (!product)
            return res.status(401).json({
                success: false,
                message: "All Product is Not found"
            })
        res.json(product)
    }
    catch(err){
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
}

const fetchProductById = async (req, res)=>{
    try{
        const product = await ProductSchema.findById(req.id.params)
        if (!product)
            return res.status(401).json({
                success: false,
                message: "Product is not found"
            })
    }
    catch(err){
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
}

const upadateProduct = async(req, res)=>{
    try{
        const product = await ProductSchema.findByIdAndUpdate(req.id.params, req.body, {new: true})
        if (!product)
            return res.status(401).json({
                success: false,
                message: "failed to update"
            })
        res.json(product)
    }
    catch(err){
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
}

const deleteProduct = async (req, res)=>{
    try{
        const product = await ProductSchema.findByIdAndDelete(req.id.params)
        if (!product)
            return res.status(401).json({
                success: false,
                message: "failed to delete"
            })
        res.json(product)
    }
    catch(err){
        res.status(500).josn({
            success: false,
            message: err.message
        })
    }
}

module.exports = {
    createProduct,
    fetchProduct,
    fetchProductById,
    upadateProduct,
    deleteProduct
}