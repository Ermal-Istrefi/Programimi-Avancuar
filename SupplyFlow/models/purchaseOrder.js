const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productInOrderSchema = new Schema({
    productId: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
    quantity: { type: Number, required: true }
});

const purchaseOrderSchema = new Schema({
    orderDate: { type: Date, required: true, default: Date.now },
    warehouseId: { type: Schema.Types.ObjectId, ref: 'Warehouse', required: true },
    supplierId: { type: Schema.Types.ObjectId, ref: 'Supplier', required: true },
    products: [productInOrderSchema],
    totalCost: { type: Number, required: true }
});

module.exports = mongoose.model('PurchaseOrder', purchaseOrderSchema);
