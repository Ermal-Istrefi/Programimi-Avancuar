const express = require('express');
const router = express.Router();
const orderItemController = require('../controllers/orderItemController');
const userController = require('../controllers/userController');

router.post('/', userController.authMiddleware(['admin']), orderItemController.createOrderItem);
router.get('/', userController.authMiddleware(), orderItemController.getAllOrderItems);
router.get('/:id', userController.authMiddleware(), orderItemController.getOrderItemById);
router.put('/:id', userController.authMiddleware(['admin']), orderItemController.updateOrderItem);
router.delete('/:id', userController.authMiddleware(['admin']), orderItemController.deleteOrderItemById);

module.exports = router;
