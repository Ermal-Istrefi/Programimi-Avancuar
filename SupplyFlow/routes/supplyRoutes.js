const express = require('express');
const router = express.Router();
const supplyController = require('../controllers/supplyController');

// Define routes for supplies
router.post('/', supplyController.createSupply);
router.get('/', supplyController.getAllSupplies);
router.get('/:id', supplyController.getSupplyById);
router.put('/:id', supplyController.updateSupply);
router.delete('/:id', supplyController.deleteSupply);

module.exports = router;
