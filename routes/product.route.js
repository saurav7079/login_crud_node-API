const express = require("express")
const router = express.Router()

const { createProduct, fetchProduct, fetchProductById, upadateProduct, deleteProduct } = require("../controller/product.controller")

router.post('/', createProduct)
router.get('/', fetchProduct)
router.get('/:id', fetchProductById)
router.put('/:id', upadateProduct)
router.delete('/:id', deleteProduct)

module.exports = router