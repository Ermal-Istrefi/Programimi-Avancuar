const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SupplySchema = new Schema({
    productId: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
    supplierId: { type: Schema.Types.ObjectId, ref: 'Supplier', required: true },
    quantity: { type: Number, required: true },
    date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Supply', SupplySchema);
