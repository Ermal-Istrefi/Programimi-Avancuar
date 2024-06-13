const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const stockSchema = new Schema({
    productId: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
    quantity: { type: Number, required: true, default: 0 }
});

const warehouseSchema = new Schema({
    location: String,
    capacity: Number,
    contactInfo: String,
    stock: [stockSchema]  
});

module.exports = mongoose.model('Warehouse', warehouseSchema);
