const withAuthentication = require('../middlewares/withAuthentication')
const withAbility = require('../middlewares/withAbility')
const userController = require('../controllers/userController')
var router = require('express').Router();
router.use(withAuthentication)

router.get('/', withAbility(['admin', 'owner']), userController.getUsers)
router.get('/student_numbers', withAbility(['financial', 'owner', 'admin']), userController.getAllUsersStudentNumber)
router.post('/ban/:id', withAbility(['owner', 'admin']), userController.banUser)
router.post('/unban/:id', withAbility(['owner', 'admin']), userController.unbanUser)


module.exports = router;
