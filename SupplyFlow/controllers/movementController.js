const Movement = require('../models/movement');
const Warehouse = require('../models/warehouse');

// Create a new movement
exports.createMovement = async (req, res) => {
    try {
        const { productId, fromWarehouse, toWarehouse, quantity, date } = req.body;

        // Verifikimi i nivelit te stokut në depon burimore
        const sourceWarehouse = await Warehouse.findById(fromWarehouse);
        const sourceStock = sourceWarehouse.stock.find(item => item.productId.equals(productId));
        if (!sourceStock || sourceStock.quantity < quantity) {
            return res.status(400).json({ message: 'Insufficient stock in source warehouse' });
        }

        // Reduktimi i sasise nga depo burimore
        sourceStock.quantity -= quantity;
        await sourceWarehouse.save();

        // Shtimi i stokut ne depon destinuese
        const destinationWarehouse = await Warehouse.findById(toWarehouse);
        const destinationStock = destinationWarehouse.stock.find(item => item.productId.equals(productId));
        if (destinationStock) {
            destinationStock.quantity += quantity;
        } else {
            destinationWarehouse.stock.push({ productId, quantity });
        }
        await destinationWarehouse.save();

        // Krijimi i nje recordi apo regjistrimi te nje transferi
        const movement = new Movement({ productId, fromWarehouse, toWarehouse, quantity, date });
        await movement.save();

        res.status(201).json(movement);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// Get all movements
exports.getAllMovements = async (req, res) => {
    try {
        const movements = await Movement.find().populate('productId').populate('fromWarehouse').populate('toWarehouse');
        res.json(movements);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Get one movement by ID
exports.getMovementById = async (req, res) => {
    try {
        const movement = await Movement.findById(req.params.id).populate('productId').populate('fromWarehouse').populate('toWarehouse');
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
        const { productId, fromWarehouse, toWarehouse, quantity, date } = req.body;
        const movement = await Movement.findById(req.params.id);
        if (!movement) {
            return res.status(404).json({ message: 'Movement not found' });
        }

        // Rregullimi i nivelit te stokut ne depon burimore dhe ate destinuese
        const originalMovement = movement;
        const originalSourceWarehouse = await Warehouse.findById(originalMovement.fromWarehouse);
        const originalSourceStock = originalSourceWarehouse.stock.find(item => item.productId.equals(originalMovement.productId));
        originalSourceStock.quantity += originalMovement.quantity;
        await originalSourceWarehouse.save();

        const originalDestinationWarehouse = await Warehouse.findById(originalMovement.toWarehouse);
        const originalDestinationStock = originalDestinationWarehouse.stock.find(item => item.productId.equals(originalMovement.productId));
        originalDestinationStock.quantity -= originalMovement.quantity;
        await originalDestinationWarehouse.save();

        // Then, apply the updated movement
        const updatedSourceWarehouse = await Warehouse.findById(fromWarehouse);
        const updatedSourceStock = updatedSourceWarehouse.stock.find(item => item.productId.equals(productId));
        if (!updatedSourceStock || updatedSourceStock.quantity < quantity) {
            return res.status(400).json({ message: 'Insufficient stock in updated source warehouse' });
        }
        updatedSourceStock.quantity -= quantity;
        await updatedSourceWarehouse.save();

        const updatedDestinationWarehouse = await Warehouse.findById(toWarehouse);
        const updatedDestinationStock = updatedDestinationWarehouse.stock.find(item => item.productId.equals(productId));
        if (updatedDestinationStock) {
            updatedDestinationStock.quantity += quantity;
        } else {
            updatedDestinationWarehouse.stock.push({ productId, quantity });
        }
        await updatedDestinationWarehouse.save();

        movement.productId = productId;
        movement.fromWarehouse = fromWarehouse;
        movement.toWarehouse = toWarehouse;
        movement.quantity = quantity;
        movement.date = date;
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

        // Revert stock adjustments
        const sourceWarehouse = await Warehouse.findById(movement.fromWarehouse);
        const sourceStock = sourceWarehouse.stock.find(item => item.productId.equals(movement.productId));
        sourceStock.quantity += movement.quantity;
        await sourceWarehouse.save();

        const destinationWarehouse = await Warehouse.findById(movement.toWarehouse);
        const destinationStock = destinationWarehouse.stock.find(item => item.productId.equals(movement.productId));
        destinationStock.quantity -= movement.quantity;
        await destinationWarehouse.save();

        res.json({ message: 'Movement deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
