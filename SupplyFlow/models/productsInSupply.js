const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProductsInSupplySchema = new Schema({
    supplyId: { type: Schema.Types.ObjectId, ref: 'Supply', required: true },
    productId: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
    quantity: { type: Number, required: true }
});

module.exports = mongoose.model('ProductsInSupply', ProductsInSupplySchema);
