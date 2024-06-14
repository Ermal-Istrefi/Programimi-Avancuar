const Supply = require('../models/supply');
const Product = require('../models/product');
const Movement = require('../models/movement');

exports.getStockReport = async (req, res) => {
    try {
        const { warehouseId } = req.params;

        const query = warehouseId ? { warehouseId } : {}; 

        const supplies = await Supply.find(query).populate('products.productId').populate('warehouseId');
        
        res.json(supplies);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.getTransferReport = async (req, res) => {
    try {

        const { warehouseId } = req.params;
        const query = warehouseId ? { $or: [{ fromWarehouse: warehouseId }, { toWarehouse: warehouseId }] } : {}; 

        const movements = await Movement.find(query).populate('productId').populate('fromWarehouse').populate('toWarehouse');
        
        res.json(movements);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
