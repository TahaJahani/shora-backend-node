const demandController = require('../controllers/demandController')
var router = require('express').Router();


router.get('/:id', demandController.get);
router.get('/', demandController.getAll);

module.exports = router;
