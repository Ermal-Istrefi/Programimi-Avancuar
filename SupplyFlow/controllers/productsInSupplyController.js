const Supply = require('../models/supply');

// Create products in a supply
exports.createProductsInSupply = async (req, res) => {
    try {
        const { supplierId, products } = req.body;
        const supply = new Supply({ supplierId, products });
        await supply.save();
        res.status(201).json(supply);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// Get all products in a supply
exports.getAllProductsInSupply = async (req, res) => {
    try {
        const supply = await Supply.findById(req.params.supplyId).populate('products.productId');
        if (!supply) {
            return res.status(404).json({ message: 'Supply not found' });
        }
        res.json(supply.products);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Update a product in a supply by ID
exports.updateProductInSupply = async (req, res) => {
    try {
        const { productId, quantity } = req.body;
        const supply = await Supply.findById(req.params.supplyId);
        if (!supply) {
            return res.status(404).json({ message: 'Supply not found' });
        }
        const product = supply.products.id(req.params.productId);
        if (!product) {
            return res.status(404).json({ message: 'Product not found in supply' });
        }
        product.productId = productId;
        product.quantity = quantity;
        await supply.save();
        res.json(product);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// Delete a product in a supply by ID
exports.deleteProductInSupplyById = async (req, res) => {
    try {
        const supply = await Supply.findById(req.params.supplyId);
        if (!supply) {
            return res.status(404).json({ message: 'Supply not found' });
        }
        supply.products.pull(req.params.productId);
        await supply.save();
        res.json({ message: 'Product deleted from supply' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
