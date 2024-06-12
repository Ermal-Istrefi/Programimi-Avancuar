const express = require('express');
const router = express.Router();
const supplyController = require('../controllers/supplyController');
const userController = require('../controllers/userController');

router.post('/', userController.authMiddleware(['admin']), supplyController.createSupply);
router.get('/', userController.authMiddleware(), supplyController.getAllSupplies);
router.get('/:id', userController.authMiddleware(), supplyController.getSupplyById);
router.put('/:id', userController.authMiddleware(['admin']), supplyController.updateSupply);
router.delete('/:id', userController.authMiddleware(['admin']), supplyController.deleteSupplyById);

module.exports = router;
