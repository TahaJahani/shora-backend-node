const transactionController = require('../controllers/transactionController')
const withAbility = require('../middlewares/withAbility')
const withAuthentication = require('../middlewares/withAuthentication');
var router = require('express').Router();
router.use(withAuthentication)
router.use(withAbility(['owner', 'financial']))

router.get('/', transactionController.getTransactions)
router.post('/add', transactionController.addTransaction)

module.exports = router;
