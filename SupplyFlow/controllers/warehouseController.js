const Warehouse = require('../models/warehouse');

// Create a new warehouse
exports.createWarehouse = async (req, res) => {
    try {
        const { location, capacity, contactInfo } = req.body;
        const warehouse = new Warehouse({ location, capacity, contactInfo });
        await warehouse.save();
        res.status(201).json(warehouse);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// Get all warehouses
exports.getAllWarehouses = async (req, res) => {
    try {
        const warehouses = await Warehouse.find();
        res.json(warehouses);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Get one warehouse by ID
exports.getWarehouseById = async (req, res) => {
    try {
        const warehouse = await Warehouse.findById(req.params.id);
        if (!warehouse) {
            return res.status(404).json({ message: 'Warehouse not found' });
        }
        res.json(warehouse);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Update a warehouse by ID
exports.updateWarehouse = async (req, res) => {
    try {
        const { location, capacity, contactInfo } = req.body;
        const warehouse = await Warehouse.findById(req.params.id);
        if (!warehouse) {
            return res.status(404).json({ message: 'Warehouse not found' });
        }
        warehouse.location = location;
        warehouse.capacity = capacity;
        warehouse.contactInfo = contactInfo;
        await warehouse.save();
        res.json(warehouse);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// Delete a warehouse by ID
exports.deleteWarehouse = async (req, res) => {
    try {
        const warehouse = await Warehouse.findById(req.params.id);
        if (!warehouse) {
            return res.status(404).json({ message: 'Warehouse not found' });
        }
        await warehouse.remove();
        res.json({ message: 'Warehouse deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
