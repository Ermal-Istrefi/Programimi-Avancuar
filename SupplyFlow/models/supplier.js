const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const supplierSchema = new Schema({
    name: String,
    contactInfo: String,
    address: String
});

module.exports = mongoose.model('Supplier', supplierSchema);
