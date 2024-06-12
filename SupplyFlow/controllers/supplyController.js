const Supply = require('../models/supply');

// Create a new supply
exports.createSupply = async (req, res) => {
    try {
        const { name, description, quantity, unitPrice, supplier } = req.body;
        const supply = new Supply({ name, description, quantity, unitPrice, supplier });
        await supply.save();
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
