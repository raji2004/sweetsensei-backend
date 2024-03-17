const express = require("express");
const router = express.Router();
const Wishlist = require('../controllers/wishlist')

router.route('/wishlist')
.post(Wishlist.createOrAddToWishlist)
.put(Wishlist.updateWishlist)
.delete(Wishlist.deleteFromWishlist)

module.exports = router;