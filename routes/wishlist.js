const express = require("express");
const router = express.Router();
const Wishlist = require('../controllers/wishlist')

router.route('/wishlist/:userId')
.get(Wishlist.getWishlist)
.post(Wishlist.createOrAddToWishlist)
.put(Wishlist.updateWishlist)
.delete(Wishlist.deleteFromWishlist)
router.route('/orders/:userId')
.get(Wishlist.getOrders)

module.exports = router;