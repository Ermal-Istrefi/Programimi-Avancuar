const express = require('express');
const router = express.Router();
const orderItemController = require('../controllers/orderItemController');

// Define routes for order items
router.post('/', orderItemController.createOrderItem);
router.get('/', orderItemController.getAllOrderItems);
router.get('/:id', orderItemController.getOrderItemById);
router.put('/:id', orderItemController.updateOrderItem);
router.delete('/:id', orderItemController.deleteOrderItem);

module.exports = router;
