const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const supplySchema = new Schema({
    name: String,
    description: String,
    quantity: Number,
    unitPrice: Number,
    supplier: {
        type: Schema.Types.ObjectId,
        ref: 'Supplier'
    }
});

module.exports = mongoose.model('Supply', supplySchema);
