const express = require('express');
const router = express.Router();
const movementController = require('../controllers/movementController');

// Define routes for movements
router.post('/', movementController.createMovement);
router.get('/', movementController.getAllMovements);
router.get('/:id', movementController.getMovementById);
router.put('/:id', movementController.updateMovement);
router.delete('/:id', movementController.deleteMovement);

module.exports = router;
