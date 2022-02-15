const userController = require('../controllers/userController')
var router = require('express').Router();


router.post('/login', authController.login);

module.exports = router;
