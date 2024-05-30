const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const purchaseOrderSchema = new Schema({
    orderDate: Date,
    supplier: {
        type: Schema.Types.ObjectId,
        ref: 'Supplier'
    },
    totalCost: Number
});

module.exports = mongoose.model('PurchaseOrder', purchaseOrderSchema);
