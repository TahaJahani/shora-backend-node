var userController = require('../controllers/usercontroller');
var express = require('express');
var router = express.Router();

const authRouter = require('./authRouter')

var bodyParser = require('body-parser')
router.use(bodyParser.json())

/* GET home page. */
router.get('/', userController.register);

router.use('/auth', authRouter)

module.exports = router;
