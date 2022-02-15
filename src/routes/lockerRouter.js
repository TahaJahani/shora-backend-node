const withAuthentication = require('../middlewares/withAuthentication')
const withAbility = require('../middlewares/withAbility')
const lockerController = require('../controllers/lockerController')
var router = require('express').Router();
router.use(withAuthentication)
rouoter.use(withAbility(['owner', 'financial']))

router.get('/', lockerController.getLockers)
router.get('/all', lockerController.getLockersStatus)

module.exports = router;
