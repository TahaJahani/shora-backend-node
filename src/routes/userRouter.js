const withAuthentication = require('../middlewares/withAuthentication')
const withAbility = require('../middlewares/withAbility')
const userController = require('../controllers/userController')
var router = require('express').Router();
router.use(withAuthentication)



module.exports = router;
