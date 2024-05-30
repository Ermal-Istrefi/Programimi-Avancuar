const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const movementSchema = new Schema({
    supply: {
        type: Schema.Types.ObjectId,
        ref: 'Supply'
    },
    sourceWarehouse: {
        type: Schema.Types.ObjectId,
        ref: 'Warehouse'
    },
    destinationWarehouse: {
        type: Schema.Types.ObjectId,
        ref: 'Warehouse'
    },
    quantity: Number,
    movementDate: Date
});

module.exports = mongoose.model('Movement', movementSchema);
