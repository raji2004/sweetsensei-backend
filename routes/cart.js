const express = require("express");
const router = express.Router();
const cart = require('../controllers/cart')

router.route('/cart')
.post(cart.createOrAddToCart)
.put(cart.updateCart)
.delete(cart.deleteFromCart)

module.exports = router;