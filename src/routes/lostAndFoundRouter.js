const withAuthentication = require('../middlewares/withAuthentication')
const withAbility = require('../middlewares/withAbility')
const lostAndFoundController = require('../controllers/lostAndFoundController')
var router = require('express').Router();
router.use(withAuthentication)


router.get('/', lostAndFoundController.getAll)
router.post('/', withAbility(['owner', 'admin', 'financial']), lostAndFoundController.add)
router.delete('/:found_id', withAbility(['owner', 'admin', 'financial']), lostAndFoundController.remove)
router.post('/:found_id', withAbility(['owner', 'admin', 'financial']), lostAndFoundController.return)

module.exports = router;
