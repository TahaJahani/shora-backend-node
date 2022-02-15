const userController = require('../controllers/userController');
const withAbility = require('../middlewares/withAbility');
const withAuthentication = require('../middlewares/withAuthentication');
var router = require('express').Router();


router.post('/login', userController.login);
router.post('/send-reset-mail', userController.sendResetEmail)
router.post('/reset-pass', userController.resetPassword)
router.get('/check-login', userController.checkLogin)


router.post('/complete-info', withAuthentication, userController.completeUserInfo)
router.post('/change-password', withAuthentication, userController.changePassword)
router.post('/logout', withAuthentication, userController.logout)
router.get('/:student_number', withAuthentication, withAbility(['admin', 'owner']), userController.getUser)

module.exports = router;
