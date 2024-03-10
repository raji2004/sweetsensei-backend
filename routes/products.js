const express = require("express");
const router = express.Router();
const product = require('../controllers/products')

router.route('/product')
.post(product.createProduct)
.put(product.updateProduct)
.delete(product.deleteProduct)

module.exports = router;