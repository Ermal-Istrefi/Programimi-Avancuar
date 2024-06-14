const express = require('express');
const router = express.Router();
const productsInSupplyController = require('../controllers/productsInSupplyController');
const userController = require('../controllers/userController');

router.post('/', userController.authMiddleware(['admin']), productsInSupplyController.createProductsInSupply);
router.get('/:supplyId', userController.authMiddleware(), productsInSupplyController.getAllProductsInSupply);
router.put('/:supplyId/:productId', userController.authMiddleware(['admin']), productsInSupplyController.updateProductInSupply);
router.delete('/:supplyId/:productId', userController.authMiddleware(['admin']), productsInSupplyController.deleteProductInSupplyById);

module.exports = router;
