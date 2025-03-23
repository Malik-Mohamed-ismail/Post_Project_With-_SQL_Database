const express = require("express");
const router = express.Router();
const userController = require('../controller/userController')




router.get('/signIn', userController.signIn_get)
router.post('/signIn', userController.signIn_post)

router.get('/singup', userController.singUp_get)
router.post('/singup', userController.singUp_post)

router.get('/logout', userController.logout_get)


module.exports = router;