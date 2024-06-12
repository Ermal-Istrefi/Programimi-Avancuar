const express = require('express');
const router = express.Router();
const supplierController = require('../controllers/supplierController');
const userController = require('../controllers/userController');

router.post('/', userController.authMiddleware(['admin']), supplierController.createSupplier);
router.get('/', userController.authMiddleware(), supplierController.getAllSuppliers);
router.get('/:id', userController.authMiddleware(), supplierController.getSupplierById);
router.put('/:id', userController.authMiddleware(['admin']), supplierController.updateSupplier);
router.delete('/:id', userController.authMiddleware(['admin']), supplierController.deleteSupplier);

module.exports = router;
