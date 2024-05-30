const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const warehouseSchema = new Schema({
    location: String,
    capacity: Number,
    contactInfo: String
});

module.exports = mongoose.model('Warehouse', warehouseSchema);
