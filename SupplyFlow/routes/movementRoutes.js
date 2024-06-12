const express = require('express');
const router = express.Router();
const movementController = require('../controllers/movementController');
const userController = require('../controllers/userController');

router.post('/', userController.authMiddleware(['admin']), movementController.createMovement);
router.get('/', userController.authMiddleware(), movementController.getAllMovements);
router.get('/:id', userController.authMiddleware(), movementController.getMovementById);
router.put('/:id', userController.authMiddleware(['admin']), movementController.updateMovement);
router.delete('/:id', userController.authMiddleware(['admin']), movementController.deleteMovementById);

module.exports = router;
