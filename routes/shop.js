var express = require('express');
var router = express.Router();
const shopController = require('../controllers/shopController')

router.get('/',shopController.index)

router.get('/menu',shopController.menu)
// /api/shop/???
router.get('/:id',shopController.getShopWithMenu)

router.post('/shop',shopController.store)

module.exports = router
