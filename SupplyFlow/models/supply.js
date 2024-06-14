const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProductsInSupplySchema = new Schema({
    productId: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
    quantity: { type: Number, required: true }
});

const SupplySchema = new Schema({
    supplierId: { type: Schema.Types.ObjectId, ref: 'Supplier', required: true },
    warehouseId: { type: Schema.Types.ObjectId, ref: 'Warehouse', required: true },
    products: [ProductsInSupplySchema],
    date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Supply', SupplySchema);
