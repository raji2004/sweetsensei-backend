const express = require("express");
const router = express.Router();
const user = require('../controllers/user')

router.route('/login')
    .post(user.login)
router.route('/register')
    .post(user.register)


module.exports = router;
