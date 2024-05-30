const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const locationSchema = new Schema({
    name: String,
    address: String
});

module.exports = mongoose.model('Location', locationSchema);