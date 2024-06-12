const Supply = require('../models/supply');
const Product = require('../models/product');
const Movement = require('../models/movement');

exports.getStockReport = async (req, res) => {
    try {
        const supplies = await Supply.find().populate('productId').populate('warehouseId');
        res.json(supplies);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.getTransferReport = async (req, res) => {
    try {
        const movements = await Movement.find().populate('productId').populate('fromWarehouse').populate('toWarehouse');
        res.json(movements);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
