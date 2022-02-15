const authController = require('../controllers/authController')
var router = require('express').Router();


router.post('/login', authController.login);

module.exports = router;
