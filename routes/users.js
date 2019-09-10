var express = require('express');
var router = express.Router();
const userController = require('../controllers/userController')
const {body} = require('express-validator')
/* GET users listing. */
router.post('/register',
body('name').not().isEmpty().withMessage('Please input name'),
body('email').not().isEmpty().withMessage('Please input email'),
body('password').not().isEmpty().withMessage('Please input password'),
 userController.register)
 

module.exports = router;
