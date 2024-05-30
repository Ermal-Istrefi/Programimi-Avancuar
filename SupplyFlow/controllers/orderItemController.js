const OrderItem = require('../models/orderItem');

// Create a new order item
exports.createOrderItem = async (req, res) => {
    try {
        const { order, supply, quantity, unitPrice } = req.body;
        const orderItem = new OrderItem({ order, supply, quantity, unitPrice });
        await orderItem.save();
        res.status(201).json(orderItem);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// Get all order items
exports.getAllOrderItems = async (req, res) => {
    try {
        const orderItems = await OrderItem.find();
        res.json(orderItems);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Get one order item by ID
exports.getOrderItemById = async (req, res) => {
    try {
        const orderItem = await OrderItem.findById(req.params.id);
        if (!orderItem) {
            return res.status(404).json({ message: 'Order item not found' });
        }
        res.json(orderItem);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Update an order item by ID
exports.updateOrderItem = async (req, res) => {
    try {
        const { order, supply, quantity, unitPrice } = req.body;
        const orderItem = await OrderItem.findById(req.params.id);
        if (!orderItem) {
            return res.status(404).json({ message: 'Order item not found' });
        }
        orderItem.order = order;
        orderItem.supply = supply;
        orderItem.quantity = quantity;
        orderItem.unitPrice = unitPrice;
        await orderItem.save();
        res.json(orderItem);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// Delete an order item by ID
exports.deleteOrderItem = async (req, res) => {
    try {
        const orderItem = await OrderItem.findById(req.params.id);
        if (!orderItem) {
            return res.status(404).json({ message: 'Order item not found' });
        }
        await orderItem.remove();
        res.json({ message: 'Order item deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
