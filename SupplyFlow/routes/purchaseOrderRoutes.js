const express = require('express');
const router = express.Router();
const purchaseOrderController = require('../controllers/purchaseOrderController');

// Define routes for purchase orders
router.post('/', purchaseOrderController.createPurchaseOrder);
router.get('/', purchaseOrderController.getAllPurchaseOrders);
router.get('/:id', purchaseOrderController.getPurchaseOrderById);
router.put('/:id', purchaseOrderController.updatePurchaseOrder);
router.delete('/:id', purchaseOrderController.deletePurchaseOrder);

module.exports = router;
