const express = require("express");
const router = express.Router();
const user = require('../controllers/user')

router.route('/login')
    .post(user.login)
router.route('/register')
    .post(user.register)
router.route('/editprofile')
    .post(user.editprofile)
router.route('/getprofile')
    .post(user.getprofile)
router.route('/emailAuth')
    .post(user.emailAuth)
router.route('/resetPassword')
    .post(user.resetPassword)


module.exports = router;
