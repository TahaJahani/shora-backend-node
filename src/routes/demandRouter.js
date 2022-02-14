const withAuthentication = require('../middlewares/withAuthentication')
const withAbility = require('../middlewares/withAbility')
const demandController = require('../controllers/demandController')
var router = require('express').Router();
router.use(withAuthentication)


router.get('/:id', demandController.get);
router.get('/', demandController.getAll);

module.exports = router;
