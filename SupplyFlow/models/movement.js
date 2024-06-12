const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MovementSchema = new Schema({
    fromWarehouse: { type: Schema.Types.ObjectId, ref: 'Warehouse', required: true },
    toWarehouse: { type: Schema.Types.ObjectId, ref: 'Warehouse', required: true },
    productId: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
    quantity: { type: Number, required: true },
    date: { type: Date, required: true, default: Date.now }
});

module.exports = mongoose.model('Movement', MovementSchema);
