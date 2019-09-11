var express = require('express');
var router = express.Router();
const userController = require('../controllers/userController')
const {body} = require('express-validator')
const passportJWT = require('../middlewares/passoprtJWT')
/* GET users listing. */
router.post('/register',
body('name').not().isEmpty().withMessage('Please input name'),
body('email').not().isEmpty().withMessage('Please input email').isEmail().withMessage('Wrong format Email'),
body('password').not().isEmpty().withMessage('Please input password').isLength({min: 3}).withMessage('Password is more then 3 charecter'),
body('rold').not().isEmpty().withMessage('Please input rold'),
 userController.register)
 
 router.post('/login',userController.login)
 router.get('/me',passportJWT.isLogin,userController.me)
module.exports = router;
