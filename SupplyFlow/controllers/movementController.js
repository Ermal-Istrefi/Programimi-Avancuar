const Movement = require('../models/movement');

// Create a new movement
exports.createMovement = async (req, res) => {
    try {
        const { supply, sourceWarehouse, destinationWarehouse, quantity, movementDate } = req.body;
        const movement = new Movement({ supply, sourceWarehouse, destinationWarehouse, quantity, movementDate });
        await movement.save();
        res.status(201).json(movement);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// Get all movements
exports.getAllMovements = async (req, res) => {
    try {
        const movements = await Movement.find();
        res.json(movements);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Get one movement by ID
exports.getMovementById = async (req, res) => {
    try {
        const movement = await Movement.findById(req.params.id);
        if (!movement) {
            return res.status(404).json({ message: 'Movement not found' });
        }
        res.json(movement);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Update a movement by ID
exports.updateMovement = async (req, res) => {
    try {
        const { supply, sourceWarehouse, destinationWarehouse, quantity, movementDate } = req.body;
        const movement = await Movement.findById(req.params.id);
        if (!movement) {
            return res.status(404).json({ message: 'Movement not found' });
        }
        movement.supply = supply;
        movement.sourceWarehouse = sourceWarehouse;
        movement.destinationWarehouse = destinationWarehouse;
        movement.quantity = quantity;
        movement.movementDate = movementDate;
        await movement.save();
        res.json(movement);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// Delete movement by ID
exports.deleteMovementById = async (req, res) => {
    try {
      const movement = await Movement.findByIdAndDelete(req.params.id);
      if (!movement) {
        return res.status(404).json({ message: 'Movement not found' });
      }
      res.json({ message: 'Movement deleted' });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };