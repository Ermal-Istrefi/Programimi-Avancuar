const express = require('express');
const router = express.Router();
const purchaseOrderController = require('../controllers/purchaseOrderController');
const userController = require('../controllers/userController');

router.post('/', userController.authMiddleware(['admin']), purchaseOrderController.createPurchaseOrder);
router.get('/', userController.authMiddleware(), purchaseOrderController.getAllPurchaseOrders);
router.get('/:id', userController.authMiddleware(), purchaseOrderController.getPurchaseOrderById);
router.put('/:id', userController.authMiddleware(['admin']), purchaseOrderController.updatePurchaseOrder);
router.delete('/:id', userController.authMiddleware(['admin']), purchaseOrderController.deletePurchaseOrderById);

module.exports = router;
