var express = require('express');
var router = express.Router();
const userController = require('../controller/userController');

//post
router.post('/signup',userController.signUp);
// router.post('/signin',userController.signIn);

module.exports = router;
