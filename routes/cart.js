const express = require("express");
const router = express.Router();
const cart = require('../controllers/cart')

router.route('/cart/:userId')
.get(cart.getCart)
.post(cart.createOrAddToCart)
.put(cart.updateCart)
.delete(cart.deleteFromCart)

module.exports = router;