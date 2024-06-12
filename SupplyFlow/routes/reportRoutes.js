const express = require('express');
const router = express.Router();
const reportController = require('../controllers/reportController');
const userController = require('../controllers/userController');

router.get('/stock', userController.authMiddleware(['admin']), reportController.getStockReport);
router.get('/transfers', userController.authMiddleware(['admin']), reportController.getTransferReport);

module.exports = router;
