const Supply = require('../models/supply');

// Create a new supply
exports.createSupply = async (req, res) => {
    try {
        const { productId, supplierId, quantity } = req.body;

        // Create a new supply instance
        const supply = new Supply({ productId, supplierId, quantity });
        await supply.save();

        // Update warehouse stock
        const warehouse = await Warehouse.findOne({}); // You should find the appropriate warehouse based on your application logic
        if (!warehouse) {
            throw new Error('Warehouse not found');
        }

        // Check if the product already exists in the warehouse stock
        const existingStock = warehouse.stock.find(item => item.productId.toString() === productId.toString());
        if (existingStock) {
            existingStock.quantity += quantity; // Increase existing stock quantity
        } else {
            warehouse.stock.push({ productId, quantity }); // Add new product to warehouse stock
        }

        await warehouse.save();

        res.status(201).json(supply);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// Get all supplies
exports.getAllSupplies = async (req, res) => {
    try {
        const supplies = await Supply.find();
        res.json(supplies);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Get one supply by ID
exports.getSupplyById = async (req, res) => {
    try {
        const supply = await Supply.findById(req.params.id);
        if (!supply) {
            return res.status(404).json({ message: 'Supply not found' });
        }
        res.json(supply);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Update a supply by ID
exports.updateSupply = async (req, res) => {
    try {
        const { name, description, quantity, unitPrice, supplier } = req.body;
        const supply = await Supply.findById(req.params.id);
        if (!supply) {
            return res.status(404).json({ message: 'Supply not found' });
        }
        supply.name = name;
        supply.description = description;
        supply.quantity = quantity;
        supply.unitPrice = unitPrice;
        supply.supplier = supplier;
        await supply.save();
        res.json(supply);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// Delete supply by ID
exports.deleteSupplyById = async (req, res) => {
    try {
      const supply = await Supply.findByIdAndDelete(req.params.id);
      if (!supply) {
        return res.status(404).json({ message: 'Supply not found' });
      }
      res.json({ message: 'Supply deleted' });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };
