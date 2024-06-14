const Supply = require('../models/supply');
const Warehouse = require('../models/warehouse');

// Create a new supply
exports.createSupply = async (req, res) => {
    try {
        const { supplierId, warehouseId, products } = req.body;

        // Validate products array
        if (!Array.isArray(products) || products.length === 0) {
            throw new Error('Products array is required and must not be empty.');
        }

        // Calculate total quantity for the supply
        const totalQuantity = products.reduce((total, product) => total + product.quantity, 0);

        // Create supply
        const supply = new Supply({ supplierId, warehouseId, products, totalQuantity });
        await supply.save();

        // Update stock in warehouse
        const warehouse = await Warehouse.findById(warehouseId);
        if (!warehouse) {
            throw new Error(`Warehouse with ID ${warehouseId} not found`);
        }

        for (const product of products) {
            const { productId, quantity } = product;

            // Check if product already exists in warehouse stock
            const existingStock = warehouse.stock.find(item => item.productId.toString() === productId.toString());
            if (existingStock) {
                existingStock.quantity += quantity;
            } else {
                warehouse.stock.push({ productId, quantity });
            }
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
        const { supplierId, warehouseId, products } = req.body;
        const supply = await Supply.findById(req.params.id);
        if (!supply) {
            return res.status(404).json({ message: 'Supply not found' });
        }

        // Remove existing products from warehouse stock
        const warehouse = await Warehouse.findById(supply.warehouseId);
        if (!warehouse) {
            throw new Error(`Warehouse with ID ${supply.warehouseId} not found`);
        }

        for (const product of supply.products) {
            const { productId, quantity } = product;
            const existingStock = warehouse.stock.find(item => item.productId.toString() === productId.toString());
            if (existingStock) {
                existingStock.quantity -= quantity;
                if (existingStock.quantity <= 0) {
                    warehouse.stock.pull(existingStock._id);
                }
            }
        }

        await warehouse.save();

        // Update supply with new data
        supply.supplierId = supplierId;
        supply.warehouseId = warehouseId;
        supply.products = products;
        supply.totalQuantity = products.reduce((total, product) => total + product.quantity, 0);
        await supply.save();

        // Update warehouse stock with new products
        for (const product of products) {
            const { productId, quantity } = product;
            const existingStock = warehouse.stock.find(item => item.productId.toString() === productId.toString());
            if (existingStock) {
                existingStock.quantity += quantity;
            } else {
                warehouse.stock.push({ productId, quantity });
            }
        }

        await warehouse.save();

        res.json(supply);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// Delete a supply by ID
exports.deleteSupplyById = async (req, res) => {
    try {
        const supply = await Supply.findById(req.params.id);
        if (!supply) {
            return res.status(404).json({ message: 'Supply not found' });
        }

        // Remove products from warehouse stock
        const warehouse = await Warehouse.findById(supply.warehouseId);
        if (!warehouse) {
            throw new Error(`Warehouse with ID ${supply.warehouseId} not found`);
        }

        for (const product of supply.products) {
            const { productId, quantity } = product;
            const existingStock = warehouse.stock.find(item => item.productId.toString() === productId.toString());
            if (existingStock) {
                existingStock.quantity -= quantity;
                if (existingStock.quantity <= 0) {
                    warehouse.stock.pull(existingStock._id);
                }
            }
        }

        await warehouse.save();

        // Delete supply
        await supply.remove();

        res.json({ message: 'Supply deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
