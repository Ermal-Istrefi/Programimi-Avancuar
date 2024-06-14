const express = require('express');
const router = express.Router();
const productsInOrderController = require('../controllers/productsInOrderController');
const userController = require('../controllers/userController');

router.post('/', userController.authMiddleware(['admin']), productsInOrderController.createProductsInOrder);
router.get('/', userController.authMiddleware(), productsInOrderController.getAllProductsInOrder);
router.get('/:id', userController.authMiddleware(), productsInOrderController.getProductsInOrderById);
router.put('/:id', userController.authMiddleware(['admin']), productsInOrderController.updateProductsInOrder);
router.delete('/:id', userController.authMiddleware(['admin']), productsInOrderController.deleteProductsInOrderById);

module.exports = router;
