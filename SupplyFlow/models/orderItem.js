const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderItemSchema = new Schema({
    order: {
        type: Schema.Types.ObjectId,
        ref: 'PurchaseOrder'
    },
    supply: {
        type: Schema.Types.ObjectId,
        ref: 'Supply'
    },
    quantity: Number,
    unitPrice: Number
});

module.exports = mongoose.model('OrderItem', orderItemSchema);
