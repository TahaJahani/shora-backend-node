const userController = require('../controllers/usercontroller')
var router = require('express').Router();


router.post('/login', userController.login);

module.exports = router;
