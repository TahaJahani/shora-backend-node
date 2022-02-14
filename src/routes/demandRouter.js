const withAuthentication = require('../middlewares/withAuthentication')
const withAbility = require('../middlewares/withAbility')
const demandController = require('../controllers/demandController')
const categoryController = require('../controllers/categoryController')
var router = require('express').Router();
router.use(withAuthentication)


router.get('/:id', demandController.get);
router.get('/', demandController.getAll);
router.post('/', demandController.addDemand);
router.post('/like/:id', demandController.likeDemand)
router.delete('/unlike/:id', demandController.unlikeDemand)
router.post('/ban-user/:demand_id', withAbility(['owner', 'admin']), demandController.banUser)
router.delete('/:id', withAbility(['owner', 'admin']), demandController.delete)
router.post('/status', withAbility(['owner', 'admin']), demandController.changeStatus)

router.get('/categories', categoryController.get)

module.exports = router;
