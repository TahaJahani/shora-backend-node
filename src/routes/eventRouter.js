const withAuthentication = require('../middlewares/withAuthentication')
const withAbility = require('../middlewares/withAbility')
const eventController = require('../controllers/eventController')
var router = require('express').Router();
router.use(withAuthentication)
rouoter.use(withAbility(['owner', 'welfare']))


router.get('/', eventController.getAll)
router.post('/', eventController.add)
router.delete('/:id', eventController.delete)
router.put('/', eventController.edit)
router.post('/register', eventController.registerUser)

module.exports = router;
