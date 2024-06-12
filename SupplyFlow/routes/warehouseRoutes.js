const express = require('express');
const router = express.Router();
const warehouseController = require('../controllers/warehouseController');
const userController = require('../controllers/userController');

router.post('/', userController.authMiddleware(['admin']), warehouseController.createWarehouse);
router.get('/', userController.authMiddleware(), warehouseController.getAllWarehouses);
router.get('/:id', userController.authMiddleware(), warehouseController.getWarehouseById);
router.put('/:id', userController.authMiddleware(['admin']), warehouseController.updateWarehouse);
router.delete('/:id', userController.authMiddleware(['admin']), warehouseController.deleteWarehouseById);

module.exports = router;
