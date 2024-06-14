const ProductsInOrder = require('../models/productsInOrder');

// Create a new ProductsInOrder
exports.createProductsInOrder = async (req, res) => {
    try {
        const { orderId, productId, quantity } = req.body;
        const productsInOrder = new ProductsInOrder({ orderId, productId, quantity });
        await productsInOrder.save();
        res.status(201).json(productsInOrder);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// Get all ProductsInOrder
exports.getAllProductsInOrder = async (req, res) => {
    try {
        const productsInOrder = await ProductsInOrder.find().populate('orderId').populate('productId');
        res.json(productsInOrder);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Get one ProductsInOrder by ID
exports.getProductsInOrderById = async (req, res) => {
    try {
        const productsInOrder = await ProductsInOrder.findById(req.params.id).populate('orderId').populate('productId');
        if (!productsInOrder) {
            return res.status(404).json({ message: 'Products in Order not found' });
        }
        res.json(productsInOrder);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Update a ProductsInOrder by ID
exports.updateProductsInOrder = async (req, res) => {
    try {
        const { orderId, productId, quantity } = req.body;
        const productsInOrder = await ProductsInOrder.findById(req.params.id);
        if (!productsInOrder) {
            return res.status(404).json({ message: 'Products in Order not found' });
        }
        productsInOrder.orderId = orderId;
        productsInOrder.productId = productId;
        productsInOrder.quantity = quantity;
        await productsInOrder.save();
        res.json(productsInOrder);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// Delete ProductsInOrder by ID
exports.deleteProductsInOrderById = async (req, res) => {
    try {
        const productsInOrder = await ProductsInOrder.findByIdAndDelete(req.params.id);
        if (!productsInOrder) {
            return res.status(404).json({ message: 'Products in Order not found' });
        }
        res.json({ message: 'Products in Order deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
