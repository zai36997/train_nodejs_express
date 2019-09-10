var express = require('express');
var router = express.Router();
const settingController = require('../controllers/settingController')

router.get('/',settingController.index)
module.exports = router;
