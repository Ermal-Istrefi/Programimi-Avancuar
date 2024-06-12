const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProductsInOrderSchema = new Schema({
    orderId: { type: Schema.Types.ObjectId, ref: 'PurchaseOrder', required: true },
    productId: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
    quantity: { type: Number, required: true }
});

module.exports = mongoose.model('ProductsInOrder', ProductsInOrderSchema);
