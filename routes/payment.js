const express = require("express");
const router = express.Router();
const payment = require('../controllers/payment')

router.route('/payment')
.post(payment.Payments)


module.exports = router;