const Supplier = require('../models/supplier');

// Create a new supplier
exports.createSupplier = async (req, res) => {
    try {
        const { name, contactInfo, email, phone, address } = req.body; // Include email and phone
        const supplier = new Supplier({ name, contactInfo, email, phone, address }); // Pass all required fields
        await supplier.save();
        res.status(201).json(supplier);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// Get all suppliers
exports.getAllSuppliers = async (req, res) => {
    try {
        const suppliers = await Supplier.find();
        res.json(suppliers);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Get one supplier by ID
exports.getSupplierById = async (req, res) => {
    try {
        const supplier = await Supplier.findById(req.params.id);
        if (!supplier) {
            return res.status(404).json({ message: 'Supplier not found' });
        }
        res.json(supplier);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Update a supplier by ID
exports.updateSupplier = async (req, res) => {
    try {
        const { name, contactInfo, email, phone, address } = req.body; // Include email and phone
        const supplier = await Supplier.findById(req.params.id);
        if (!supplier) {
            return res.status(404).json({ message: 'Supplier not found' });
        }
        supplier.name = name;
        supplier.contactInfo = contactInfo;
        supplier.email = email; 
        supplier.phone = phone; 
        supplier.address = address;
        await supplier.save();
        res.json(supplier);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// Delete a supplier by ID
exports.deleteSupplier = async (req, res) => {
    try {
        const supplier = await Supplier.findByIdAndDelete(req.params.id);
        if (!supplier) {
            return res.status(404).json({ message: 'Supplier not found' });
        }
        res.json({ message: 'Supplier deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
