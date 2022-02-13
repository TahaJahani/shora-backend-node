var userController = require('../controllers/usercontroller');
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', userController.register);

module.exports = router;
