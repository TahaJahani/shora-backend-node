var userController = require('../controllers/usercontroller');
var express = require('express');
var router = express.Router();

const authRouter = require('./authRouter')
const demandRouter = require('./demandRouter')
const eventRouter = require('./eventRouter')
const lostAndFoundRouter = require('./lostAndFoundRouter')
const lockerRouter = require('./lockerRouter')
const transactionRouter = require('./transactionRouter')

var bodyParser = require('body-parser');
router.use(bodyParser.json())

/* GET home page. */
router.get('/', userController.register);

router.use('/auth', authRouter)
router.use('/demands', demandRouter)
router.use('/events', eventRouter)
router.use('/lost-and-found', lostAndFoundRouter)
router.use('/lockers', lockerRouter)
router.use('/transactions', transactionRouter)


module.exports = router;
