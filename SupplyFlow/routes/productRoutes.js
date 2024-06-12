const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const userController = require('../controllers/userController');

router.post('/', userController.authMiddleware(['admin']), productController.createProduct);
router.get('/', userController.authMiddleware(), productController.getAllProducts);
router.get('/:id', userController.authMiddleware(), productController.getProductById);
router.put('/:id', userController.authMiddleware(['admin']), productController.updateProduct);
router.delete('/:id', userController.authMiddleware(['admin']), productController.deleteProduct);

module.exports = router;
