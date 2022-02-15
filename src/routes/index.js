var userController = require('../controllers/userController');
var express = require('express');
var router = express.Router();

const authRouter = require('./authRouter')
const userRouter = require('./userRouter')
const demandRouter = require('./demandRouter')
const eventRouter = require('./eventRouter')
const lostAndFoundRouter = require('./lostAndFoundRouter')
const lockerRouter = require('./lockerRouter')
const transactionRouter = require('./transactionRouter')
const rentRouter = require('./rentRouter')

var bodyParser = require('body-parser');
router.use(bodyParser.json())

router.use('/auth', authRouter)
router.use('/users', userRouter)
router.use('/demands', demandRouter)
router.use('/events', eventRouter)
router.use('/lost-and-found', lostAndFoundRouter)
router.use('/lockers', lockerRouter)
router.use('/transactions', transactionRouter)
router.use('/rents', rentRouter)


module.exports = router;
