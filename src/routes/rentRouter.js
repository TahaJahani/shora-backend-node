const withAuthentication = require('../middlewares/withAuthentication')
const withAbility = require('../middlewares/withAbility')
const rentController = require('../controllers/rentController')
var router = require('express').Router();
router.use(withAuthentication)
router.use(withAbility(['owner', 'financial']))

router.get('/', rentController.getRents)
router.post('/add', rentController.addRent)
router.post('/return', rentController.returnRent)


module.exports = router;
