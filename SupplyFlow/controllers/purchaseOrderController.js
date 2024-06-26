const PurchaseOrder = require('../models/purchaseOrder');

// Create a new purchase order
exports.createPurchaseOrder = async (req, res) => {
    try {
        const { orderDate, warehouseId, supplierId, products, totalCost } = req.body;
        const purchaseOrder = new PurchaseOrder({ orderDate, warehouseId, supplierId, products, totalCost });
        await purchaseOrder.save();
        res.status(201).json(purchaseOrder);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// Get all purchase orders
exports.getAllPurchaseOrders = async (req, res) => {
    try {
        const purchaseOrders = await PurchaseOrder.find()
            .populate('warehouseId')
            .populate('supplierId')
            .populate('products.productId');
        res.json(purchaseOrders);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Get one purchase order by ID
exports.getPurchaseOrderById = async (req, res) => {
    try {
        const purchaseOrder = await PurchaseOrder.findById(req.params.id)
            .populate('warehouseId')
            .populate('supplierId')
            .populate('products.productId');
        if (!purchaseOrder) {
            return res.status(404).json({ message: 'Purchase order not found' });
        }
        res.json(purchaseOrder);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Update a purchase order by ID
exports.updatePurchaseOrder = async (req, res) => {
    try {
        const { orderDate, warehouseId, supplierId, products, totalCost } = req.body;
        const purchaseOrder = await PurchaseOrder.findById(req.params.id);
        if (!purchaseOrder) {
            return res.status(404).json({ message: 'Purchase order not found' });
        }
        purchaseOrder.orderDate = orderDate;
        purchaseOrder.warehouseId = warehouseId;
        purchaseOrder.supplierId = supplierId;
        purchaseOrder.products = products;
        purchaseOrder.totalCost = totalCost;
        await purchaseOrder.save();
        res.json(purchaseOrder);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// Delete purchase order by ID
exports.deletePurchaseOrderById = async (req, res) => {
    try {
        const purchaseOrder = await PurchaseOrder.findByIdAndDelete(req.params.id);
        if (!purchaseOrder) {
            return res.status(404).json({ message: 'Purchase Order not found' });
        }
        res.json({ message: 'Purchase Order deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
